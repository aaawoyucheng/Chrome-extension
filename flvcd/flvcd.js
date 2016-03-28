var custom_url = encodeURIComponent(document.URL);
var action_url = custom_url.replace("%s", encodeURIComponent(action_url));
action_url = 'http://www.flvcd.com/parse.php?kw=' + custom_url;
console.log('Custom url: ' + action_url);
chrome.tabs.create({
    url: action_url
});