/**
 * @author liuqiang
 * @date   2015-06-18
 */

 if (IsNewVersion()) {
   setInterval(function () {
     if (!hostConnected) {
       connect();
     } else if (port) {
       postMessage({
         'testing': 1
       });
     }
   }, 2000);
 }

var lastTimeStamp;
var browserName = "";

INIT();

var port = null;
var hostConnected = false;

function INIT() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
 	      	  lastTimeStamp = xhr.responseText.split(" ")[1];
        }
  }
  var url = chrome.extension.getURL("test.txt") +'#'+ new Date().getTime();
  xhr.open('GET', url, true);
  xhr.send();
}

function checkSetting(text)
{
	var param = text.split(" ");
	var msg =  param[0];
	var time = param[1];
	if (param.length > 2) {
		browserName = param[2];
	}
	if (time != lastTimeStamp) {
		if (msg == "GETWORD") {
      		chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendRequest(tab.id, {'action' : "onmsg"}, function(response) {
				});
			});
		}
		lastTimeStamp = time;
	}
}

function sendToDict(url) {
    url += 'src=' + browserName + '&';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
}

function sendWord(word, offset) {
    var url = 'http://127.0.0.1:55000/word='+word+'&offset='+offset+'&';
    sendToDict(url);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.action == "word") {
    if (request.msg != "") {
	    sendWord(request.msg, request.offset);
    }
  }
});

function postMessage(message) {
  if (!port)
    return;
  try {
    var err;
    port.postMessage(message);
  } catch (ex) {
    err = ex;
  }
  if (err) {
    port = null;
    hostConnected = false;
  }
}

function connect() {
  if (port || (!IsNewVersion() && !IsLBBrowser()))
    return;
  hostConnected = true;
  var host = 'com.kingsoft.ciba_messaging_host';
  port = chrome.runtime.connectNative(host);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnect);
  port.postMessage({
    'browser': IsLBBrowser() ? 'liebao' : 'chrome'
  });
}

window.addEventListener('unload', function (e) {
  disconnect();
}, false);

function disconnect() {
  if (port) {
    port.disconnect();
    port = null;
    hostConnected = false;
  }
}

function onNativeMessage(response) {
  if (typeof response != 'object')
    return;
  var timestamp = response['timestamp'];
  if (!timestamp || typeof timestamp != 'string')
    return;
  checkSetting(timestamp);
}

function onDisconnect(response) {
  console.log('disconnect', response, JSON.stringify(response));
  port = null;
  hostConnected = false;
}

function GetBrowserMajorVersion() {
  var ver = navigator.userAgent.match(/(?:chrome\/)([\d.]+)/i);
  if (!ver || !ver[1])
    return;
  var major = ver[1];
  if (!major)
    return;
  return major.split('.')[0];
}

function IsLBBrowser() {
  var lbBrowser = navigator.userAgent.match(/lbbrowser/i);
  if (!lbBrowser || !lbBrowser[0])
    return false;
  return lbBrowser[0].toLowerCase() == 'lbbrowser';
}

function IsNewVersion() {
  var v = GetBrowserMajorVersion();
  return v && v >= 37;
}
