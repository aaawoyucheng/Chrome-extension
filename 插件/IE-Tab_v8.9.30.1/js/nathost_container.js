/*
 * nathost_container.js
 *
 * Script for the container that will use the Native Host for rendering the WebBrowser control.
 *
*/

var NativeHostContainer = {
    BW: null,  // The background window
    windowId: null,
    tabId: null,
    isAttached: false,
    realTitle: '',
    hostWindowId: null,
    hideAddressBar: false,

    ATTACH_RETRY_TIMEOUT: 50,
    DISCONNECT_MESSAGE_WAIT: 3000,  // Don't show the disconnect message right away

    // We have a resize delay to deal with an obscure case:
    //    If you zoom in on the container page, you get the resize before
    //    the page has fully repainted.  So the anchor color line is still on the screen
    //    and we find it at the old location, thus we end up positioning the IE window
    //    where it WAS, not where it currently is.  You can see this by zooming the address
    //    bar out and then it happens when you zoom back in.
    RESIZE_DELAY: 50,

    // Nav-complete can cause an asynchronous hash change.  If it does, then we need
    // to ignore it and not re-navigate the host (in case it is in the process of redirecting
    // itself, in which case we will break thre redirect).  So we ignore url changes that
    // happened as a result of nav-complete, but only for a certain period.
    navCompleteChanges: {},
    NAV_COMPLETE_CHANGE_WAIT: 2000,

    ONE_DAY_MS: 1000 * 3600 * 24,

    buildContainerUrl: function(childUrl, popupId) {
        var containerPage = 'nhc.htm';
        var containerUrl = chrome.extension.getURL(containerPage);
        if (popupId) {
            containerUrl += '#p=' + popupId + '&';
        } else {
            containerUrl += '#';
        }
        containerUrl += 'url=' + childUrl;
        return containerUrl;
    },

    navigateContainer: function(childUrl) {
        // Navigate the top frame so this navigation gets into the history and the
        // back / forward queue.
        // Be sure to only do this if the URL changed, otherwise we end up with an additional / duplicate
        // history entry.
        var newUrl = this.buildContainerUrl(childUrl);
        if (newUrl != window.top.location.href) {
            window.top.location = this.buildContainerUrl(childUrl);
        }
    },

    extractChildUrl: function() {
        var regex = /[#&]url=([^&].*)/;
        var url = document.location.href.toString();
        var match = url.match(regex);
        if(match) {
            return match[1];
        } else {
            return 'about:blank';
        }
    },

    updateAddressBar: function() {
        var url = this.extractChildUrl();
        $('#address-box').val(url);
    },

    handleResize: function() {
        window.setTimeout(function() {
            var msgResize = {
                type: 'RESIZE',
                innerWidth: this.getIEWidth(),
                innerHeight: this.getIEHeight()
            };
            NativeHost.postMessage(msgResize);
        }.bind(this), this.RESIZE_DELAY);
    },

    restoreTitle: function() {
        document.title = this.realTitle;
    },

    onReturnToChrome: function() {
        window.top.location = this.extractChildUrl();
    },

    onBookmark: function() {
    },

    navigateHost: function(url) {
        if (this.currentHostUrl != url) {
            this.currentHostUrl = url;
            NativeHost.postMessage({ type: 'NAVIGATE', url: url });
        }
    },

    sendOptions: function() {
        var msg = {
            type: 'OPTIONS',
            options: {
                'autourl-list':         Settings.get('autourl-list'),
                'exclusion-list':       Settings.get('exclusion-list'),
                'enable-chrome-popups': Settings.get('enable-chrome-popups'),
                'only-auto-urls':       Settings.get('only-auto-urls'),
                'enable-dep':           Settings.get('enable-dep'),
                'enable-atl-dep':       Settings.get('enable-atl-dep'),
                'show-status-text':     Settings.get('show-status-text'),
                'enable-direct-invoke': Settings.get('enable-direct-invoke')
            }
        }
        NativeHost.postMessage(msg);
    },

    getIEWidth: function() {
        return Math.floor(window.innerWidth * window.devicePixelRatio);
    },

    getIEHeight: function() {
        var topHeight = this.hideAddressBar ? 1 : $('#address-bar')[0].offsetHeight;

        return Math.floor( (window.innerHeight - topHeight) * window.devicePixelRatio );
    },

    tryAttach: function() {
        if (this.isAttached) {
            return;
        }
        // Check whether we are the active tab
        chrome.tabs.getCurrent(function(tab) {
            // We can't attach if we don't have a window id or aren't active
            if (!tab.active || !this.windowId) {
                this.restoreTitle();
                return;
            }

            // Remember the title change is asynchronous, so don't keep changing it or the helper
            // will never find it.  We may have to retry several times to find the window after
            // a single title change
            if (document.title.indexOf('ietaba:') == -1) {
                this.realTitle = document.title;
                document.title = 'ietaba:' + Background.getNextIETabId();
            }

            var msg = {
                type: 'ATTACH',
                tabTitle: document.title,
                innerWidth: this.getIEWidth(),
                innerHeight: this.getIEHeight()
            }
            NativeHost.postMessage(msg);
        }.bind(this));
    },

    openNewWindow: function(url, features, popupInfo) {
        // If the full-window option is on or there are no features then use a full window
        var fullWindow = Settings.get('enable-use-full-window-popups') || !features;

        // Open in Chrome if the only-auto-urls value is set and this is not an auto URL
        var openInChrome = Settings.get("only-auto-urls") && !Background.isAutoURL(url);
        if (!openInChrome) {
            // Store the popup info so the popup can find it
            var popupId = Background.getNextIETabId();
            Background.popupInfo[popupId] = popupInfo;
            url = this.buildContainerUrl(url, popupId);
        }

        // See if we should just open the pop-up in a tab
        var openInTab = Settings.get('open-popups-in-tab');
        if (openInTab) {
            chrome.tabs.create({ url: url, active: true });
            return;
        }

        // Build the window creation options
        var createOptions = {};
        if (fullWindow) {
            createOptions = { url: url };
        } else {
            // Find the options for creating the popup window
            var arrFeatures = features.split(',');
            createOptions = {
                url: url,
                focused: true,
                type: 'popup'
            }
            for (var i=0; i < arrFeatures.length; i++) {
                var parts = arrFeatures[i].split('=');
                if (typeof(parts[1]) == 'undefined')
                    continue;
                var value = parseInt(parts[1]);
                if (isNaN(value))
                    continue;
                switch(parts[0]) {
                    case 'left':
                    case 'right':
                    case 'top':
                        createOptions[parts[0]] = value;
                        break;
                    case 'width':
                        createOptions.width = value + 16;
                        break;
                    case 'height':
                        createOptions.height = value + 40;
                        break;
                }
            }
        }
        chrome.windows.create(createOptions);
    },

    setTitle: function(newTitle) {
        this.realTitle = newTitle;
        if (document.title.indexOf('ietaba:') == -1) {
            document.title = newTitle;
        }
    },

    onDisconnected: function() {
        // During shutdown, since the port was opened by the background page, it's possible
        // for the window object to be null here.
        if (window) {
            window.setTimeout(function() {
                $('#helper-disconnected').css('display', 'block');
            }, this.DISCONNECT_MESSAGE_WAIT);
        }
    },

    onNativeMessage: function(msg, fnResponse) {
        // Only handle messages from our host window
        if (msg.hostWindowId && (msg.hostWindowId != this.hostWindowId)) {
            return;
        }

        switch(msg.type) {
            case 'TITLE_CHANGE':
                this.setTitle(msg.newTitle);
                break;
            case 'NAVIGATE_COMPLETE':
                // Update the current URL to "msg.url" and set this url in the address bar
                this.navCompleteChanges[msg.url] = true;
                window.setTimeout(function() {
                    delete this.navCompleteChanges[msg.url];
                }.bind(this), this.NAV_COMPLETE_CHANGE_WAIT);
                this.navigateContainer(msg.url);
                this.updateAddressBar();
                break;
            case 'NEW_WINDOW':
                this.openNewWindow(msg.url, msg.features, { hostWindowId: msg.popupHostWindowId, port: NativeHost._port });
                break;
            case 'RETURN_TO_CHROME':
                window.top.location = msg.url;
                break;
            case 'WINDOW_CLOSING':
                window.setTimeout(function() {
                    window.close();
                }, 300);
                break;
            case 'BEFORENAVIGATE2':
                /*
                 if (!window.theBP.Settings.get("only-auto-urls") || window.theBP.Background.isAutoURL(url)) {
                 // Allow the URL to open in IE
                 fnResponse({ result: true });
                 return;
                 } else {
                 // Cancel the IE navigation and open this URL in Chrome
                 window.location.href = url;
                 fnResponse({ result: false });
                 }
                 */
                break;
            case 'CLOSED':
                console.log('CLOSED, disconnecting');
                NativeHost.disconnect();
                break;
            case 'CMDLINE':
                console.log('CMDLINE = ' + msg.value);
                break;
            case 'ATTACH_SUCCESS':
                this.isAttached = true;
                this.restoreTitle();
                break;
            case 'ATTACH_FAILED_METRO':
            case 'ATTACH_RETRY':
                window.setTimeout(function() {
                    this.tryAttach();
                }.bind(this), this.ATTACH_RETRY_TIMEOUT);
                break;
            case '_DISCONNECTED':
                this.onDisconnected();
                break;
        }
    },

    initHostWindow: function(fnContinue) {
        // If we have popup info, then we already have a host window
        if (this.popupInfo) {
            fnContinue();
            return;
        }

        // Create a new host window.  It will initially be invisible.
        var anchorColor = this.hideAddressBar ? [ 0xad, 0xae, 0xad ] : [ 0x6b, 0x92, 0xe7 ];
        var msgCreate = {
            type: 'CREATE',
            anchorColor: anchorColor
        }
        NativeHost.sendMessage(msgCreate, function(msgResult) {
            if (msgResult.type == 'CREATE_SUCCESS') {
                this.hostWindowId = msgResult.hostWindowId;
                NativeHost.setIncludeWithAll({ hostWindowId: this.hostWindowId });
                fnContinue();
            } else {
                // Treat this like we were disconnected.
                this.onDisconnected();
            }
        }.bind(this));
    },

    onAddressEnter: function() {
        var url = $('#addres-box').val();
        this.navigateContainer(url);
        this.navigateHost(url);
    },

    finalInit: function() {
        // Supply the options
        this.sendOptions();

        // Listen for host messages
        NativeHost.addListener(function(msg, fnResponse) {
            this.onNativeMessage(msg, fnResponse);
        }.bind(this));

        // Listen for activation changes which the helpers uses to hide/show the host window
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            if (activeInfo.windowId != this.windowId) {
                return;
            }

            if (activeInfo.tabId != this.tabId) {
                NativeHost.postMessage({ type: 'TABDEACTIVATED' });
            } else {
                if (!this.isAttached) {
                    // We have to attach first
                    this.tryAttach();
                } else {
                    NativeHost.postMessage({ type: 'TABACTIVATED' });
                }
            }
        }.bind(this));

        // Tell the helper when we are detached so it can hide the window
        chrome.tabs.onDetached.addListener(function(tabId, detachInfo) {
            console.log('onDetached: ' + tabId);
            if (tabId != this.tabId) {
                return;
            }
            this.windowId = null;
            this.isAttached = false;
            console.log("Detached");
            NativeHost.postMessage({ type: 'DETACH' });
        }.bind(this));

        // Tell the helper to re-attach to the new tab
        chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {
            if (tabId != this.tabId) {
                return;
            }
            this.windowId = attachInfo.newWindowId;
            console.log('onAttached: ' + tabId);
            this.tryAttach();
        }.bind(this));

        window.onresize = this.handleResize.bind(this);
        // Handle focus change like resize.  We need this to fix the Z-Order on window restore, otherwise
        // the IE Tab window will end up behind the hidden hack RenderWidgetHostHWND and will be inactive.
        window.addEventListener('focus', function() {
            this.handleResize();
        }.bind(this), false);

        window.onhashchange = function() {
            var url = this.extractChildUrl();

            // If this change came from nav-complete then just update the address bar
            if (this.navCompleteChanges[url]) {
                delete this.navCompleteChanges[url];
                this.updateAddressBar();
                return;
            }
            this.navigateHost(this.extractChildUrl());
        }.bind(this);

        // Attach the host control to this window
        this.tryAttach();

        this.updateAddressBar();
        if (!this.isPopup()) {
            this.navigateHost(this.extractChildUrl());
        }
    },

    initCurrentTab: function(fnContinue) {
        chrome.tabs.getCurrent(function(tab) {
            this.tabId = tab.id;
            this.windowId = tab.windowId;
            fnContinue();
        }.bind(this));
    },

    initNativeHost: function(fnContinue) {
        // Popups connect to the existing port
        if (this.popupInfo) {
            NativeHost.connectExisting(this.popupInfo.port);
            // Include the popup's host window id with all requests
            NativeHost.setIncludeWithAll({ hostWindowId: this.popupInfo.hostWindowId });
            fnContinue();
            return;
        }

        // Normal window connection
        NativeHost.connect(function(result) {
            if (result == 'OK') {
                NativeHost.sendMessage({ type: 'INITREGISTRY' });
                // If we have never initialized the registry, then re-connect
                if (!IETAB.Storage.get('regInitialized3')) {
                    IETAB.Storage.set('regInitialized3', true);
                    this.initNativeHost(fnContinue);
                    return;
                } else {
                    fnContinue();
                }
            } else {
                var childUrl = this.extractChildUrl();
                var chromeVersion = { major: parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10) };
                var infoUrl = '/nativehostrequired.html#url=' + childUrl;
                if (chromeVersion.major < 34) {
                    infoUrl = '/nativehostrequired_msi.html#url=' + childUrl;
                }
                window.top.location = infoUrl;

            }
        }.bind(this));
    },

    getPopupId: function() {
        var regex = /[^#]*#p=([^&]*)/;
        var match = document.location.href.match(regex);
        return match ? match[1] : null;
    },

    isPopup: function() {
        return !!this.getPopupId();
    },

    //
    // We have to wait for information about this popup from our Creator.  Tab is Great!
    //
    popupInit: function(fnCallback) {
        var popupId = this.getPopupId();
        if (popupId) {
            this.popupInfo = Background.popupInfo[popupId];
            this.hostWindowId = this.popupInfo.hostWindowId;
            delete Background.popupInfo[popupId];
        }
        fnCallback();
    },

    isPlatformSupported: function() {
        return (window.navigator.platform.toLowerCase().indexOf('win') == 0);
    },

    dealWithUnsupportedPlatform: function() {
        var url = 'http://www.ietab.net/notsupported';
        // Uninstall if it is less than 10 minutes old.  This takes care of uninstalling for recent
        // installs, but it doesn't uninstall for users who may inadvertently click the button
        // while on an unsupported platform (which uninstalls across all sync'd devices).
        var firstSeen = IETAB.Storage.get("firstSeen");
        if (firstSeen) {
            var age = (new Date()).getTime() - firstSeen;
            age = age / (1000 * 60);
            if (age < 10) {
                Background.uninstallSelf();
                url += '?uninstalled=1';
            }
        }
        window.top.location = url;
    },

    getDayString: function(time) {
        var date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    },

    didShowReminderToday: function() {
        var lastShown = IETAB.Storage.get('ab-regtest-1-lastshown');
        if (!lastShown) {
            return false;
        }
        var lastDay = this.getDayString(lastShown);

        var now = (new Date()).getTime();
        var thisDay = this.getDayString(now);

        return (thisDay == lastDay);
    },

    shouldShowRegReminder: function() {
        // Only show a reg reminder if they are in the regtest
        if (!IETAB.Storage.get('ab-regtest-1'))
            return false;

        // No reg reminder for users with a license of course!
        var key = Settings.get('license-key');
        if (key)
            return false;

        // Don't show a reg-reminder for 30 days.
        var now = (new Date()).getTime();
        var firstSeen = IETAB.Storage.get('firstSeen');
        if ( (now - firstSeen) < this.ONE_DAY_MS * 30)
            return false;

        // Finally, only show it if we didn't show one yet today
        return !this.didShowReminderToday();
    },

    initRegReminder: function() {
        // Update last-shown
        var now = (new Date()).getTime();
        IETAB.Storage.set('ab-regtest-1-lastshown', now);

        // Update shown count
        var n = IETAB.Storage.get('ab-regtest-1-regcount');
        if (!n) n = 0;
        n++;
        IETAB.Storage.set('ab-regtest-1-regcount', n);

        // Set the count as a cookie on ietab.net
        var cookieExpire = now + (1000 * 3600 * 24 * 60);  // Expires in two months
        // Convert expiration to seconds
        cookieExpire = cookieExpire / 1000;
        chrome.cookies.set({
            url: 'http://www.ietab.net/',
            name: 'ab-regtest-1-regcount',
            value: n.toString(),
            domain: '.ietab.net',
            expirationDate: cookieExpire
        });

        $('#reg-reminder2').css('display', 'block');
        $('#buy-now').click(function() {
            this.initNormal();
        }.bind(this));
        $('#remind-later').click(function() {
            chrome.tabs.create({ url: 'http://www.ietab.net/pricing?fr=reglater', active: false });
            this.initNormal();
        }.bind(this));
    },

    initNormal: function() {
        $('#reg-reminder2').css('display', 'none');

        if (!this.isPlatformSupported()) {
            this.dealWithUnsupportedPlatform();
            return;
        }

        var chromeVersion = { major: parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10) };
        if (chromeVersion.major < 29) {
            window.top.location = '/chrome-too-old.html';
            return;
        }

        this.hideAddressBar = Settings.get('hide-addr-bar');
        // Hide the address bar before we do other initialization to avoid flicker
        if (this.hideAddressBar) {
            $('#address-bar').css('display', 'none');
            $('#no-address-bar-anchor').css('display', 'block');
        }

        this.setTitle(this.extractChildUrl());

        this.popupInit(function() {
            this.initNativeHost(function() {
                this.initCurrentTab(function() {
                    this.initHostWindow(function() {
                        this.finalInit();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    init: function() {
        this.BW = chrome.extension.getBackgroundPage();
        window.Background = this.BW.Background;
        window.Settings = this.BW.Settings;

        if (this.shouldShowRegReminder()) {
            this.initRegReminder();
        } else {
            this.initNormal();
        }
    }
}

window.onload = function() {
    NativeHostContainer.init();
}
