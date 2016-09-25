$(document).ready(function(){
  var defaultCode =
    '/*\n' +
    ' *   You can replace the following code with whatever you would like\n' +
    ' *   to inject into other web pages.\n' +
    ' */\n' +
    '\n' +
    '\n' +
    '/*  An example script\n' +
    ' *\n' +
    ' *  A small logger function that takes a message and an optional\n' +
    ' *  JSON object and logs it out to the console (if the console\n' +
    ' *  is available).\n' +
    ' *\n' +
    ' *  @param {string} msg a message to log to the console\n' +
    ' *  @param {object} obj an optional JSON object to log to the console\n' +
    ' */\n' +
    '\n' +
    'window.__wi_log = function(msg, obj) {\n' +
    '   if (!console || !console.log) return;\n' +
    '   var style="font-size:1.2em;font-weight:bold;color:purple;";\n' +
    '   if (obj) {\n' +
    '     console.log("%c" + msg + ": %o", style, obj);\n' +
    '   } else {\n' +
    '     console.log("%c" + msg, style);\n' +
    '   }\n' +
    '};\n';

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name == 'code'){
      chrome.storage.sync.get({
        code: defaultCode
      }, function(items){
        sendResponse({code: items.code});
      });
    }
    return true;
  });
});
