var run = function() {
    chrome.tabs.insertCSS({
        file: 'typo.css'
    });
    chrome.tabs.executeScript({
        file: "jquery-1.9.1.min.js"
    });
    chrome.tabs.executeScript({
        file: "clean.js"
    });

}

chrome.browserAction.onClicked.addListener(function(tab) {
    run();
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(localStorage['auto']);
    if (localStorage['auto'] == 'true') {
        run();
    }
});
