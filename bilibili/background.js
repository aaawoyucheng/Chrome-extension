chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.match(/bilibili\/av/i)) {
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: 'bilibili.js'
    })
})
