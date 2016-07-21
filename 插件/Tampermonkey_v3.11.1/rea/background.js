(function(g) {
    var d = g.FEATURES;
    g.extend({
        extension: {
            onConnect: {
                addListener: function(a) {
                    return chrome.runtime.onConnect.addListener(a)
                }
            },
            onConnectExternal: {
                addListener: function(a) {
                    return chrome.runtime.onConnectExternal.addListener(a)
                }
            },
            manifest: chrome.runtime.getManifest(),
            inIncognitoContext: chrome.extension.inIncognitoContext,
            getViews: function(a) {
                return chrome.extension.getViews(a)
            },
            isAllowedFileSchemeAccess: function(a) {
                return chrome.extension.isAllowedFileSchemeAccess(a)
            },
            urls: {
                prepareForReport: function(a) {
                    return a
                }
            }
        },
        runtime: {
            onInstalled: {
                addListener: function(a) {
                    chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener(a)
                }
            },
            onUpdateAvailable: {
                addListener: function(a) {
                    chrome.runtime.onUpdateAvailable && chrome.runtime.onUpdateAvailable.addListener(a)
                }
            }
        },
        tabs: {
            onActivated: {
                addListener: function(a) {
                    return chrome.tabs.onActivated.addListener(a)
                }
            },
            onUpdated: {
                addListener: function(a) {
                    return chrome.tabs.onUpdated.addListener(a)
                }
            },
            onReplaced: {
                addListener: function(a) {
                    if (chrome.tabs.onReplaced) return chrome.tabs.onReplaced.addListener(a)
                }
            },
            onRemoved: {
                addListener: function(a) {
                    return chrome.tabs.onRemoved.addListener(a)
                }
            },
            create: function(a, b) {
                return chrome.tabs.create(a, b)
            },
            update: function(a, b, c) {
                return chrome.tabs.update(a, b, c)
            },
            remove: function(a, b) {
                return chrome.tabs.remove(a, b)
            },
            highlight: function(a, b) {
                if (a && a.tabs) {
                    a.tabs instanceof Array || (a.tabs = [a.tabs]);
                    var c = [],
                        d, f = function() {
                            if (a.tabs.length) {
                                var e = a.tabs.pop();
                                chrome.tabs.get(e, function(a) {
                                    void 0 === d && (d = a.windowId);
                                    a.windowId === d && c.push(a.index);
                                    f()
                                })
                            } else return chrome.tabs.highlight({
                                windowId: d,
                                tabs: c
                            }, b)
                        };
                    f()
                } else b && b()
            },
            getSelected: function(a, b) {
                return chrome.tabs.getSelected(a, b)
            },
            query: function(a, b) {
                return chrome.tabs.query(a, b)
            },
            sendMessage: function(a, b, c) {
                return chrome.tabs.sendMessage(a, b, c)
            }
        },
        webRequest: {
            onBeforeRequest: {
                addListener: function(a, b, c) {
                    return chrome.webRequest.onBeforeRequest.addListener(a, b, c)
                },
                removeListener: function(a) {
                    return chrome.webRequest.onBeforeRequest.removeListener(a)
                }
            },
            onBeforeSendHeaders: {
                addListener: function(a, b, c) {
                    return chrome.webRequest.onBeforeSendHeaders.addListener(a,
                        b, c)
                },
                removeListener: function(a) {
                    return chrome.webRequest.onBeforeSendHeaders.removeListener(a)
                }
            },
            onHeadersReceived: {
                addListener: function(a, b, c) {
                    return chrome.webRequest.onHeadersReceived.addListener(a, b, c)
                },
                removeListener: function(a) {
                    return chrome.webRequest.onHeadersReceived.removeListener(a)
                }
            },
            onCompleted: {
                addListener: function(a, b, c) {
                    return chrome.webRequest.onCompleted.addListener(a, b, c)
                },
                removeListener: function(a) {
                    return chrome.webRequest.onCompleted.removeListener(a)
                }
            },
            handlerBehaviorChanged: function(a) {
                return chrome.webRequest.handlerBehaviorChanged(a)
            }
        },
        webNavigation: {
            supported: !!chrome.webNavigation,
            onCommitted: {
                addListener: function(a) {
                    if (chrome.webNavigation.onCommitted) return chrome.webNavigation.onCommitted.addListener(a)
                }
            }
        },
        browserAction: {
            setIcon: function(a, b) {
                return chrome.browserAction.setIcon(a, b)
            },
            setTitle: function(a) {
                return chrome.browserAction.setTitle(a)
            },
            
            setBadgeBackgroundColor: function(a) {
                return chrome.browserAction.setBadgeBackgroundColor(a)
            },
            setPopup: function(a) {
                return chrome.browserAction.setPopup(a)
            }
        },
        storage: {
            onChanged: {
                addListener: function(a) {
                    return chrome.storage.onChanged.addListener(a)
                }
            },
            local: {
                set: function(a, b) {
                    return chrome.storage.local.set(a, b)
                },
                get: function(a, b) {
                    return chrome.storage.local.get(a, b)
                },
                remove: function(a, b) {
                    return chrome.storage.local.remove(a, b)
                },
                clear: function(a) {
                    return chrome.storage.local.clear(a)
                }
            },
            sync: {
                set: function(a, b) {
                    return chrome.storage.sync.set(a, b)
                },
                get: function(a, b) {
                    return chrome.storage.sync.get(a, b)
                },
                remove: function(a, b) {
                    return chrome.storage.sync.remove(a,
                        b)
                },
                clear: function(a) {
                    return chrome.storage.sync.clear(a)
                }
            }
        },
        syncFileSystem: {
            onFileStatusChanged: {
                addListener: function(a) {
                    return chrome.syncFileSystem.onFileStatusChanged.addListener(a)
                }
            },
            onServiceStatusChanged: {
                addListener: function(a) {
                    return chrome.syncFileSystem.onServiceStatusChanged.addListener(a)
                }
            },
            supported: !!chrome.syncFileSystem
        },
        contentSettings: {
            javascript: {
                set: function(a, b) {
                    return chrome.contentSettings.javascript.set(a, b)
                },
                get: function(a, b) {
                    return chrome.contentSettings.javascript.get(a,
                        b)
                },
                clear: function(a, b) {
                    return chrome.contentSettings.javascript.clear(a, b)
                }
            }
        },
        downloads: {
            onChanged: {
                addListener: function(a) {
                    return chrome.downloads.onChanged.addListener(a)
                }
            },
            download: function(a, b) {
                return chrome.downloads.download(a, b)
            }
        },
        management: {
            getAll: function(a) {
                return chrome.management.getAll(a)
            },
            setEnabled: function(a, b, c) {
                return chrome.management.setEnabled(a, b, c)
            },
            uninstall: function(a, b, c) {
                return chrome.management.uninstall(a, b, c)
            }
        },
        notifications: {
            onPermissionLevelChanged: {
                addListener: function(a) {
                    return chrome.notifications.onPermissionLevelChanged.addListener(a)
                }
            },
            onClicked: {
                addListener: function(a) {
                    return chrome.notifications.onClicked.addListener(a)
                }
            },
            onClosed: {
                addListener: function(a) {
                    return chrome.notifications.onClosed.addListener(a)
                }
            },
            supported: !!(chrome.notifications && chrome.notifications.getPermissionLevel && chrome.notifications.onPermissionLevelChanged && chrome.notifications.onClicked),
            getPermissionLevel: function(a) {
                return chrome.notifications.getPermissionLevel(a)
            },
            create: function(a, b, c) {
                return chrome.notifications.create(a, b, c)
            },
            clear: function(a, b) {
                return chrome.notifications.clear(a,
                    b)
            }
        },
        contextMenus: function() {
            var a = !!(d.RUNTIME.CONTEXT_MENU && chrome.contextMenus && chrome.contextMenus.create && chrome.contextMenus.update && chrome.contextMenus.remove);
            return a ? {
                supported: a,
                create: function(a, c) {
                    return chrome.contextMenus.create(a, c)
                },
                update: function(a, c, d) {
                    return chrome.contextMenus.update(a, c, d)
                },
                remove: function(a, c) {
                    return chrome.contextMenus.remove(a, c)
                },
                removeAll: function(a) {
                    return chrome.contextMenus.removeAll(a)
                },
                onClicked: {
                    addListener: function(a) {
                        return chrome.contextMenus.onClicked.addListener(a)
                    }
                }
            } : {
                supported: !1
            }
        }(),
        permissions: {
            getAll: function(a) {
                return chrome.permissions.getAll(a)
            },
            request: function(a, b) {
                return chrome.permissions.request(a, b)
            },
            remove: function(a, b) {
                return chrome.permissions.remove(a, b)
            }
        },
        i18n: {
            native_support: !0,
            getMessage: function() {
                return chrome.i18n.getMessage.apply(this, arguments)
            },
            getUILanguage: function() {
                return chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : null
            },
            getAcceptLanguages: function(a) {
                return chrome.i18n.getAcceptLanguages ? chrome.i18n.getAcceptLanguages(a) :
                    a([])
            }
        },
        idle: {
            queryState: function(a, b) {
                return chrome.idle.queryState(a, b)
            }
        },
        other: function() {
            var a = {
                openDatabase: function(a, c, d, f) {
                    var e = window.openDatabase;
                    if (e) return e(a, c, d, f)
                },
                requestFileSystem: function(a, c, d, f) {
                    var e = window.requestFileSystem || window.webkitRequestFileSystem;
                    if (e) return e(a, c, d, f);
                    f("not supported")
                }
            };
            a.__defineGetter__("webkitNotifications", function() {
                return window.webkitNotifications
            });
            return a
        }()
    });
    (function() {
        try {
            d.HTML5.LOCALSTORAGE = window.localStorage
        } catch (a) {
            console.warn("prep: window.localStorage will be unavailable")
        }
        d.DB.USE =
            d.DB.DEFAULT;
        try {
            d.HTML5.LOCALSTORAGE && (d.DB.NO_WARNING = "nowarning" === d.HTML5.LOCALSTORAGE.getItem("#brokenprofile"), d.DB.USE = d.HTML5.LOCALSTORAGE.getItem(d.CONSTANTS.STORAGE.TYPE) || d.DB.DEFAULT)
        } catch (b) {
            console.warn("prep: error at storage type detection", b)
        }
        g.extension.isAllowedFileSchemeAccess(function(a) {
            d.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS = a;
            d.INITIALIZED = !0
        })
    })()
})(window.rea);