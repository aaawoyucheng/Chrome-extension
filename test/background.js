var run=function(tabId){
        chrome.tabs.executeScript(tabId, {
            file: "jquery-1.9.1.min.js"
        });
        chrome.tabs.executeScript(tabId, {
            file: "base.js"
        });
        chrome.tabs.executeScript(tabId, {
            file: "test.js"
        });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (localStorage['auto'] == 'true') {
        run(tab.id);
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
        run(tab.id);
});
