var injectCss = function(href) {
    chrome.tabs.executeScript({
        code:
            'var elm = document.createElement("link");' +
            'elm.type = "text/css";' +
            'elm.rel = "stylesheet";' +
            'elm.href = "'+href+'";' +
            'document["head"].appendChild(elm);'
    });
}

var run = function() {
    injectCss(chrome.extension.getURL('typo.css'));
    chrome.tabs.executeScript({
        file:'jquery-1.9.1.min.js'
    });
    chrome.tabs.executeScript({
        file:'clean.js'
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    run();
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (localStorage['auto'] == 'true') {
        run();
    }
});
