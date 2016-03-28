chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.insertCSS({
    //     file: "event.css"
    // });
    chrome.tabs.executeScript({
        file: "script.js"
    });
});
