// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    var custom_url = encodeURIComponent(tab.url);
    var action_url = custom_url.replace("%s", encodeURIComponent(action_url));
    action_url = 'http://www.flvcd.com/parse.php?kw=' + custom_url;
    console.log('Custom url: ' + action_url);
    chrome.tabs.create({
        url: action_url
    });
});