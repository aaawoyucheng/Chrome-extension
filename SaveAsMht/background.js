chrome.browserAction.onClicked.addListener(function(tab) {
    // alert();
    chrome.pageCapture.saveAsMHTML({
        tabId: tab.id
    }, function(blob) {
        var options = {
            url: URL.createObjectURL(blob),
            filename: 'mht/'+tab.title.replace(/\/|\?|:|~/ig,'') + '.mht',
            conflictAction: 'overwrite',
            saveAs: false,
        }
        chrome.downloads.download(options, function(){
            if(localStorage['auto']=='true'){
                chrome.tabs.remove(tab.id);
            }
        });
    })
});
