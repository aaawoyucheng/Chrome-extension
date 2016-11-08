// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// 嵌入脚本
chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "script.js" });
});

chrome.browserAction.onClicked.addListener(function(tab) {
   window.open('http://www.apizza.cc/?f=chromeapp');
});

// 发送请求
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {});