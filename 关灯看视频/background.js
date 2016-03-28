function turn(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "turnoff.js"
    });

}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.match(/bilibili/i)) {
        if (tabId != null) {
            chrome.tabs.insertCSS(tabId, {
                file: "turnoff.css"
            });
            chrome.tabs.executeScript(tabId, {
                file: "jquery-1.9.1.min.js"
            });
            console.log(localStorage['auto']);
            if (localStorage['auto'] == 'true') {
                turn(tabId);
            }
            chrome.pageAction.show(tabId);
        }
    }
});
chrome.pageAction.onClicked.addListener(function(tabs) {
    turn(tabs.id);
});
