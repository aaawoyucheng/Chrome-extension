var down = function(url, name) {
    var options = {
        url: url,
        filename: name + '.mp4',
        conflictAction: 'overwrite',
        saveAs: false,
    }
    chrome.downloads.download(options);
}
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "jquery-1.9.1.min.js"
    });
    chrome.tabs.executeScript(tab.id, {
        file: "test.js"
    });
    console.log(tab.document.body.innerHTML);
    // var a=document.body.innerHTML.match(/'http.+tumblr_.+?'|"http.+tumblr_.+?"/ig)
    // for(var i in a){
    //     $('<iframe style=display:none; src='+a[i]+' frameborder="0"></iframe>').appendTo('body');
    // }
});
