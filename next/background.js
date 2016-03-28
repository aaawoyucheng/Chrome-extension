chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "jquery-1.9.1.min.js"
    });
    chrome.tabs.executeScript(tab.id, {
        file: "next.js"
    });
});
