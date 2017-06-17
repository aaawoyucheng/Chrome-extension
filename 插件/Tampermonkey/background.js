'use strict';
var trup, init, lfgs, sycl, cfgo, uris, clip, dast, perm, blak, scbr, exts, down, D = !1;
Registry.require("promise statistics convert xmlhttprequest downloads cache storage uri compat parser helper syncinfo notify asker i18n native".split(" "), function() {
    var pa = function(a) {
            D |= 60 <= a;
            J.debug(!1);
            q.debug(D, !1);
            P.debug(D)
        },
        n = rea.FEATURES,
        ea = function() {
            var a = [],
                g = !0,
                c = function(a, c, e) {
                    var b = {
                        title: a.join("\n\n")
                    };
                    console.warn(a.join("\n"));
                    rea.browserAction.setIcon(c);
                    rea.browserAction.setTitle(b);
                    c = function(b, e, c) {
                        b = {
                            name: "1",
                            sub_menu_item: !0,
                            pos: "left",
                            items: []
                        };
                        b.items.push({
                            name: a[0],
                            image: "info"
                        });
                        1 < a.length && b.items.push({
                            name: a[1]
                        });
                        c({
                            items: [b],
                            options: {
                                enabled: !1
                            }
                        })
                    };
                    e || rea.extension.onMessage.addListener(c)
                };
            return {
                run: function() {
                    try {
                        if (Registry.verify("0").length) {
                            var a = {
                                path: rea.extension.getURL("images/icon_paused.png")
                            };
                            g = !1;
                            c(["Tampermonkey detected that browser is caching some outdated code parts.", "In order to avoid unexpected behavior TM will be kept paused until your browser was restarted."], a)
                        }
                    } catch (d) {
                        g = !1, console.error(d.message)
                    }
                    "chromeStorage" != n.DB.USE ||
                        n.DB.NO_WARNING || window.setTimeout(function() {
                            q.isWorking().fail(function() {
                                confirm("Tampermonkey detected that the extension storage is unreliable!\n\nUnfortunately this means that all your settings and userscripts are inaccessible at the moment.\n\nDo you want to visit the FAQ entry that explains how to recover from that?") && rea.tabs.create({
                                    url: "http://tampermonkey.net/faq#Q206"
                                }, function() {});
                                var a = {
                                    path: rea.extension.getURL("images/icon_paused.png")
                                };
                                c(["Tampermonkey detected that the extension storage is unreliable!"],
                                    a, !0)
                            })
                        }, 1E3);
                    return g
                },
                pause: c,
                setWarning: function(c, g, e) {
                    a.push({
                        text: c,
                        description: g,
                        url: e
                    })
                },
                getWarnings: function() {
                    return a
                }
            }
        }();
    if (ea.run()) {
        var K = n.WEBREQUEST,
            m = Registry.get("promise"),
            s = Registry.get("helper"),
            T = Registry.get("cache"),
            M = Registry.get("statistics"),
            q = Registry.get("storage"),
            P = Registry.get("notify"),
            fa = Registry.get("asker"),
            N = Registry.get("native"),
            Q = Registry.get("permission");
        perm = Q;
        dast = q;
        var qa = s.createUUID(),
            O = {},
            X = {};
        D && console.debug("Starting background fred @" + qa);
        T.create("rundata").setOptions({
            timeout: 180,
            check_interval: 120,
            retimeout_on_get: !0
        }).init();
        T.create("resources").setOptions({
            timeout: 1800,
            check_interval: 300
        }).init();
        var Ba = function() {
                var a = m(),
                    g, c, h = rea.extension.manifest.version,
                    d = q.getSchemaVersion(),
                    e = d;
                q.getVersion("0.0.0.0").then(function(a) {
                    c = a;
                    g = w.versionCmp(h, c) == w.versionCmp.eNEWER;
                    return q.isWiped()
                }).then(function(a) {
                    !g && a && (a = ["Tampermonkey detected inconsistencies that indicate that your browser wiped the extension database!", "You can continue to use Tampermonkey normally, but your settings and scripts might be lost. Click here to get more information.",
                        "http://tampermonkey.net/faq.php#Q207"
                    ], console.warn(a.join("\n")), ea.setWarning.apply(this, a))
                }).always(function() {
                    var b = [],
                        k = 0,
                        l = function() {
                            if (k < b.length) {
                                var c = b[k].schema;
                                b[k].cond(c) ? b[k].fn().done(function() {
                                    c && (console.log("Converted database from", e, "to", c), e = c);
                                    k++;
                                    l()
                                }).fail(function() {
                                    a.reject()
                                }) : (k++, l())
                            }
                        },
                        u = function() {
                            console.warn("Incognito mode detected. Database conversion can only be done in non-incognito mode! Stopping now...");
                            var a = {
                                path: rea.extension.getURL("images/icon_paused.png")
                            };
                            ea.pause(["Tampermonkey needs to convert its database but this can't be done in incogonito mode!", "Please open a non-incognito mode window and/or restart your browser."], a)
                        },
                        b = [{
                            cond: function() {
                                return g && !n.RUNTIME.FIREFOX && "chromeStorage" == n.DB.USE && !q.getValue(n.CONSTANTS.STORAGE.LEGACY_VERSION) && w.versionCmp("3.5.3603", c) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m();
                                rea.extension.inIncognitoContext ? (u(), a.reject()) : (console.log("Update database..."), e = "3.5.3603", q.migrate("sql", "chromeStorage").done(function() {
                                    console.log("Copied config for default usage of chrome storage");
                                    a.resolve()
                                }));
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return g && w.versionCmp("3.6.3650", e) == w.versionCmp.eNEWER && w.versionCmp("3.5.3650", c) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) u(), a.reject();
                                else {
                                    e = "3.6.3650";
                                    var b = [];
                                    [{
                                        o: "TM_config",
                                        n: n.CONSTANTS.STORAGE.CONFIG
                                    }, {
                                        o: "TM_update_check",
                                        n: n.CONSTANTS.STORAGE.UPDATE
                                    }, {
                                        o: "TM_version"
                                    }, {
                                        o: "TM_unload_ts"
                                    }].forEach(function(a) {
                                        if (a.n) {
                                            var e = q.getValue(a.o);
                                            void 0 !== e && b.push(q.setValue(a.n, e))
                                        }
                                        b.push(q.deleteValue(a.o))
                                    });
                                    var k = /@re$/,
                                        l = [];
                                    q.listValues().forEach(function(a) {
                                        -1 != a.search(k) && (a = a.replace(k, ""), l.push(a))
                                    });
                                    l.forEach(function(a) {
                                        var e = q.getValue(a + "@st"),
                                            c = q.getValue(a),
                                            k = q.getValue(a + "@re"),
                                            l = q.getValue(a + "@source"),
                                            g = x.getUidByName(a) || s.createUUID();
                                        b.push(q.deleteValue(a + "@st"));
                                        b.push(q.deleteValue(a));
                                        b.push(q.deleteValue(a + "@re"));
                                        b.push(q.deleteValue(a + "@source"));
                                        c && k && l ? (b.push(q.setValue(n.CONSTANTS.PREFIX.SCRIPT_UID + g, a)), b.push(q.setValue(n.CONSTANTS.PREFIX.COND + g, k)), b.push(q.setValue(n.CONSTANTS.PREFIX.STORE +
                                            g, e)), b.push(q.setValue(n.CONSTANTS.PREFIX.SCRIPT + g, l)), b.push(q.setValue(n.CONSTANTS.PREFIX.META + g, c))) : console.warn("invalid script entry", {
                                            source: l,
                                            meta: c,
                                            cond: k
                                        })
                                    });
                                    k = /@st$/;
                                    q.listValues().forEach(function(a) {
                                        -1 != a.search(k) && b.push(q.deleteValue(a))
                                    });
                                    m.when(b).done(function() {
                                        console.log("Converted database from", c, "to", e);
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "3.7.0",
                            cond: function(a) {
                                return w.versionCmp(a, e) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) u(),
                                    a.reject();
                                else {
                                    var b = [],
                                        e = RegExp("^" + n.CONSTANTS.PREFIX.META);
                                    q.listValues().forEach(function(a) {
                                        if (-1 != a.search(e)) {
                                            var c = q.getValue(a);
                                            c.options && c.options.override && !c.options.override.orig_run_at && (c.options.override.orig_run_at = c.options.run_at || "document-idle", c.options.run_at = null, b.push(q.setValue(a, c)))
                                        }
                                    });
                                    m.when(b).done(function() {
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4258",
                            cond: function(a) {
                                return w.versionCmp(a, e) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) u(),
                                    a.reject();
                                else {
                                    var b = q.getValue(n.CONSTANTS.STORAGE.CONFIG);
                                    b && b.sync_enabled && 2 == b.sync_type && (b.sync_version = 1, q.setValue(n.CONSTANTS.STORAGE.CONFIG, b));
                                    a.resolve()
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4526",
                            cond: function(a) {
                                return g && n.RUNTIME.SAFARI && "chromeStorage" == n.DB.USE && w.versionCmp(a, e) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m();
                                rea.extension.inIncognitoContext ? (u(), a.reject()) : (console.log("Update database..."), q.migrate("localStorage", "chromeStorage").done(function() {
                                    console.log("Copied config for default usage of setting storage");
                                    a.resolve()
                                }).fail(a.reject));
                                return a.promise()
                            }
                        }, {
                            schema: "4871",
                            cond: function(a) {
                                return g && w.versionCmp(a, e) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = m(),
                                    b, e, c = q.getValue(n.CONSTANTS.STORAGE.CONFIG);
                                c && c.scriptTemplate && (e = f.getDefaults()) && (b = e.script_templates) && b[0] && b[0].value && (b[0].value = c.scriptTemplate, delete c.scriptTemplate, q.setValue(n.CONSTANTS.STORAGE.CONFIG, c));
                                a.resolve();
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return g || w.versionCmp(e, d) == w.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a =
                                    m();
                                q.setVersion(h, e).done(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return g
                            },
                            fn: function() {
                                console.log("First run of version " + h + "!");
                                Aa.scheduleNotification(c, "0.0.0.0" == c);
                                return m.Pledge()
                            }
                        }, {
                            cond: function() {
                                return !0
                            },
                            fn: function() {
                                var b = m();
                                a.resolve();
                                window.setTimeout(b.resolve, n.MISC.TIMEOUT);
                                return b.promise()
                            }
                        }];
                    l()
                });
                return a.promise()
            },
            ga = function() {
                var a = {
                    get: function(a, c) {
                        var h = (0 == a) + "#" + c,
                            d = T.items.rundata.getj(h);
                        if (d) d.oldret.user_agent[a] = d.oldret.user_agent[d.frameId],
                            d = d.oldret;
                        else {
                            var d = [],
                                e = 0,
                                b = {},
                                k = {};
                            if (c)
                                for (var l = v.determineScriptsToRun(c), u = 0; u < l.length; u++) {
                                    var t = l[u];
                                    t.enabled ? t.evilness && t.evilness >= f.values.script_blacklist_severity || 0 != a && (!0 === t.options.noframes || null === t.options.noframes && !0 === t.options.override.orig_noframes) || v.isContexter(t) || (t.options.user_agent && (k[a] = t.options.user_agent), b[t.name] = !0, d.push(t)) : e++
                                }
                            d = {
                                runners: d,
                                disabled: e,
                                script_map: b,
                                user_agent: k
                            };
                            c && T.items.rundata.setj(h, {
                                frameId: a,
                                oldret: d
                            })
                        }
                        return d
                    },
                    getUserAgent: function(g,
                        c) {
                        return a.get(g, c).user_agent
                    },
                    getContexters: function(a, c) {
                        for (var h = [], d = v.determineScriptsToRun(c), e = 0; e < d.length; e++) {
                            var b = d[e];
                            b.enabled && (0 == a || !0 !== b.options.noframes && (null !== b.options.noframes || !0 !== b.options.override.orig_noframes)) && v.isContexter(b) && h.push(b)
                        }
                        return h
                    }
                };
                return a
            }(),
            z = function() {
                var a = {},
                    g = 1,
                    c = g++,
                    h = g++,
                    d = g++,
                    e = g++,
                    b = g++,
                    k = g++,
                    l = g++,
                    u = g++,
                    t = function() {
                        var a = {
                            frames: {
                                0: {
                                    state: c
                                }
                            },
                            tabs: {
                                reset_ts: (new Date).getTime()
                            },
                            scripts: {},
                            urls: {},
                            maps: {},
                            contexts: {
                                onUnload: {}
                            },
                            stats: {
                                running: 0,
                                disabled: 0
                            },
                            extra: {}
                        };
                        Object.defineProperties(a.urls, {
                            length: {
                                value: 0,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        });
                        return a
                    },
                    r = {},
                    E = {},
                    F = {},
                    B = {
                        listeners: {
                            once: {
                                whenReady: function(b, c) {
                                    if (!a[b] || a[b].frames[0].state < e) B.listeners.once.onReady(b, c);
                                    else c()
                                },
                                onReady: function(a, b) {
                                    var c = function(a) {
                                            B.listeners.remove.onCommited(e);
                                            B.listeners.remove.onCompleted(k);
                                            a && b()
                                        },
                                        e = B.listeners.add.onCommited(function(b) {
                                            b === a && c(!0)
                                        }),
                                        k = B.listeners.add.onCompleted(function(b) {
                                            b === a && c(!0)
                                        })
                                }
                            },
                            add: {
                                onReset: function(a) {
                                    var b =
                                        s.createUUID();
                                    r[b] = a;
                                    return b
                                },
                                onCommited: function(a) {
                                    var b = s.createUUID();
                                    E[b] = a;
                                    return b
                                },
                                onCompleted: function(a) {
                                    var b = s.createUUID();
                                    F[b] = a;
                                    return b
                                }
                            },
                            remove: function() {
                                return {
                                    onReset: function(a) {
                                        delete r[a]
                                    },
                                    onCommited: function(a) {
                                        delete E[a]
                                    },
                                    onCompleted: function(a) {
                                        delete F[a]
                                    }
                                }
                            }()
                        },
                        events: {
                            reset: function(b, e) {
                                a[b] = t();
                                a[b].frames[0].state = c;
                                s.each(r, function(a) {
                                    a && a(b, e)
                                })
                            },
                            request: function(b, e, c) {
                                f.values.enabled && (a[b] = a[b] || t(), a[b].frames[e] = a[b].frames[e] || {}, a[b].frames[e].state = h,
                                    c = A.woHash(c), ha.isAllowed(c) && (c = ga.getUserAgent(e, c), c[e] && B.set.extra(b, e, "user_agent", c[e])))
                            },
                            response: function(b, e, k) {
                                if (f.values.enabled) {
                                    a[b] = a[b] || t();
                                    a[b].frames[e] = a[b].frames[e] || {};
                                    var l = a[b].frames[e].state || c;
                                    a[b].frames[e].state = d;
                                    0 === e && (a[b].tabs.response_ts = (new Date).getTime());
                                    k = A.woHash(k);
                                    l < d && B.scripts.determine(b, e, k);
                                    return (b = a[b].scripts[k]) ? b.runners.length : 0
                                }
                            },
                            commited: function(b, k, l) {
                                if (f.values.enabled) {
                                    var g = A.parse(l);
                                    if ("http:" === g.protocol || "https:" === g.protocol ||
                                        "file:" === g.protocol) a[b] = a[b] || t(), a[b].frames[k] = a[b].frames[k] || {}, g = a[b].frames[k].state || c, a[b].frames[k].state = e, g < d && (l = A.woHash(l), B.scripts.determine(b, k, l)), s.each(E, function(a) {
                                        a && a(b)
                                    })
                                }
                            },
                            loading: function(e, k, l) {
                                if (f.values.enabled) {
                                    var g = A.parse(l);
                                    "http:" !== g.protocol && "https:" !== g.protocol && "file:" !== g.protocol || 0 !== k || "file:" !== g.protocol || (a[e] = a[e] || t(), a[e].frames[k] = a[e].frames[k] || {}, g = a[e].frames[k].state || c, a[e].frames[k].state = b, g < d && (l = A.woHash(l), B.scripts.determine(e, k,
                                        l)))
                                }
                            },
                            run: function(b, e, c, l, g) {
                                if (f.values.enabled) {
                                    var h = 0 === e ? e : c;
                                    a[b] = a[b] || t();
                                    a[b].frames[h] = a[b].frames[h] || {};
                                    a[b].frames[h].state = k;
                                    var d = A.woHash(l);
                                    l = a[b].scripts[d];
                                    if (!l && (B.scripts.determine(b, e, d), l = a[b].scripts[d], !l)) {
                                        console.warn("tv: no script run info for tab " + b + " @ " + d, D ? a[b].scripts : "");
                                        return
                                    }
                                    B.scripts.updateMaps(b, c, l.script_map);
                                    B.scripts.updateUrls(b, c, d);
                                    B.scripts.updateStats(b, c, l.runners.length, l.disabled);
                                    B.scripts.run(b, e, c, d, l.runners, function(e) {
                                        a[b] && delete a[b].scripts[d];
                                        g(e)
                                    })
                                }
                            },
                            complete: function(b, e, g) {
                                g = A.parse(g);
                                if (f.values.enabled && ("http:" === g.protocol || "https:" === g.protocol || "file:" === g.protocol)) {
                                    if (0 === e) {
                                        a[b] = a[b] || t();
                                        a[b].frames[e] = a[b].frames[e] || {};
                                        var h = a[b].frames[e].state || c;
                                        a[b].frames[e].state = l;
                                        if (!z.get.empty(b) && z.get.stats(b).running) {
                                            if (h < k) {
                                                console.warn("tv: no script run info!");
                                                return
                                            }
                                            "file:" === g.protocol ? window.setTimeout(function() {
                                                rea.tabs.sendMessage(b, {
                                                    method: "onLoad",
                                                    frameId: e
                                                }, function() {})
                                            }, 500) : (rea.tabs.sendMessage(b, {
                                                method: "onLoad",
                                                frameId: e
                                            }, function() {}), G.runCheck && rea.contentSettings.javascript.clear({}))
                                        }
                                    }
                                    s.each(F, function(a) {
                                        a && a(b)
                                    })
                                }
                            },
                            unload: function(b, e, c) {
                                e = 0 === e ? e : c;
                                a[b] = a[b] || t();
                                a[b].frames[e] = a[b].frames[e] || {};
                                a[b].frames[e].state = u;
                                if (a[b] && a[b].contexts.onUnload[c]) {
                                    for (e = 0; e < a[b].contexts.onUnload[c].length; e++) a[b].contexts.onUnload[c][e]();
                                    a[b].contexts.onUnload[c] = []
                                }
                            },
                            remove: function(b) {
                                delete a[b]
                            }
                        },
                        scripts: {
                            updateStats: function(b, e, c, k) {
                                a[b].stats.running += c;
                                a[b].stats.disabled += k;
                                a[b].contexts.onUnload[e] =
                                    a[b].contexts.onUnload[e] || [];
                                a[b].contexts.onUnload[e].push(function() {
                                    a[b].stats.running -= c;
                                    a[b].stats.disabled -= k
                                });
                                a[b].tabs.ts = (new Date).getTime()
                            },
                            updateMaps: function(b, e, c) {
                                var k = 1,
                                    l = function(e, c) {
                                        void 0 === a[b].maps[c] && 1 === k && (a[b].maps[c] = 0);
                                        a[b].maps[c] += k
                                    };
                                s.each(c, l);
                                a[b].contexts.onUnload[e] = a[b].contexts.onUnload[e] || [];
                                a[b].contexts.onUnload[e].push(function() {
                                    a[b] && (k = -1, s.each(c, l))
                                })
                            },
                            updateUrls: function(b, e, c) {
                                var k = 1,
                                    l = function() {
                                        void 0 === a[b].urls[c] && 1 === k && (a[b].urls[c] = 0);
                                        a[b].urls[c] += k;
                                        a[b].urls.length = -1
                                    };
                                l();
                                a[b].contexts.onUnload[e] = a[b].contexts.onUnload[e] || [];
                                a[b].contexts.onUnload[e].push(function() {
                                    a[b] && (k = -1, l())
                                })
                            },
                            determine: function(b, e, c) {
                                var k = null;
                                ha.isAllowed(c) ? k = c : (D && console.log("This URL is filtered by the security settings:", c, "-> Do nothing!"), z.set.forbidden(b, e));
                                e = ga.get(e, k);
                                a[b].scripts[c] = e;
                                return e.runners.length
                            },
                            run: function(a, b, e, c, k, l) {
                                a = [];
                                b = n.RUNTIME.ALLOWS_FAST_DOCUMENT_START && f.values.runtime_fastDocumentStart;
                                for (e = 0; e < k.length; e++) {
                                    var g =
                                        k[e];
                                    a.push(ra.bundle({
                                        url: c
                                    }, g, b && ("document-start" === g.options.run_at || !g.options.run_at && "document-start" === g.options.override.orig_run_at)))
                                }
                                m.when(a).always(l)
                            }
                        },
                        set: {
                            extra: function(b, e, c, k) {
                                a[b] = a[b] || t();
                                null === e ? a[b].extra[c] = k : (a[b].extra[c] = a[b].extra[c] || {}, a[b].extra[c][e] = k)
                            },
                            blocker: function(a) {
                                B.set.extra(a, null, "blocker", !0)
                            },
                            forbidden: function(a, b) {
                                0 === b && B.set.extra(a, null, "forbidden", !0)
                            }
                        },
                        get: {
                            extra: function(b, e, c, k) {
                                void 0 === k && (k = null);
                                var l = null,
                                    l = (a[b] ? a[b].extra : {})[c];
                                null !==
                                    e && l && (l = l[e]);
                                return l || k
                            },
                            empty: function(b) {
                                var e = !0;
                                if (a[b] && 0 != a[b].urls.length) {
                                    if (-1 == a[b].urls.length) return a[b].urls.length = 0, s.each(a[b].urls, function(e, c) {
                                        "length" !== c && 0 < e && a[b].urls.length++
                                    }), B.get.empty(b);
                                    e = !1
                                }
                                return e
                            },
                            urls: function(b) {
                                return a[b] ? a[b].urls : {}
                            },
                            stats: function(b, e) {
                                var c = {};
                                if (a[b] && (c.running = a[b].stats.running, c.disabled = a[b].stats.disabled, e)) {
                                    c.unique = 0;
                                    for (var k in a[b].maps) a[b].maps.hasOwnProperty(k) && 0 < a[b].maps[k] && c.unique++
                                }
                                return c
                            },
                            tabs: function() {
                                var b = {};
                                s.each(a, function(a, e) {
                                    b[e] = {
                                        ts: a.response_ts
                                    }
                                });
                                return b
                            },
                            blocker: function(a) {
                                return B.get.extra(a, null, "blocker")
                            },
                            forbidden: function(a) {
                                return B.get.extra(a, null, "forbidden")
                            },
                            user_agent: function(a, b) {
                                return B.get.extra(a, b, "user_agent")
                            }
                        }
                    };
                return B
            }(),
            ma = function() {
                return {
                    isScriptUrl: function(a) {
                        if (!a || -1 != a.search(/\#bypass=true/) || -1 != a.search(n.REQUESTS.GET_INTERNAL_PAGE_REGEXP())) return !1;
                        a = a.split(/[\?#$]/)[0];
                        var g = -1 != a.search(/.+\.user\.(js\#|js\?|js$)/) || -1 != a.search(/.+\.tamper\.(js\#|js\?|js$)/);
                        return g ? !(-1 != a.search(/^htt[ps]{1,2}:\/\/code\.google\.com/) || -1 != a.search(/^htt[ps]{1,2}:\/\/github\.com/) && -1 == a.search(/^htt[ps]{1,2}:\/\/github\.com\/[a-zA-Z0-9%-]\/[a-zA-Z0-9%-]\/raw\//)) : g
                    }
                }
            }(),
            sa = function() {
                var a = function(a) {
                    var c = m(),
                        h = (new Date).getTime();
                    a.url += -1 != a.url.search("\\?") ? "&" : "?";
                    a.url += "ts=" + h;
                    var h = function(b) {
                            if (4 == b.readyState && (200 == b.status || 0 == b.status))
                                if ("arraybuffer" == d.responseType) {
                                    if (b.response) {
                                        c.resolve({
                                            decoded: !0,
                                            encoding: a.encoding,
                                            content: L.arrbuf2str(b.response,
                                                a.encoding)
                                        });
                                        return
                                    }
                                } else if (null !== b.response && void 0 !== b.response) {
                                c.resolve({
                                    decoded: !0,
                                    encoding: a.encoding,
                                    content: b.response
                                });
                                return
                            }
                            c.reject({
                                content: ""
                            })
                        },
                        d = {
                            method: "GET",
                            retries: 0,
                            responseType: "arraybuffer",
                            url: a.url
                        };
                    if (a.sync) {
                        var e = U(d, {});
                        4 == e.readyState && 403 == e.status && (delete d.responseType, e = U(d, {}));
                        h(e)
                    } else U(d, {
                        ondone: h
                    });
                    return c.promise()
                };
                return {
                    getSource: function(g) {
                        "string" === typeof g && (g = {
                            url: g
                        });
                        return a(g)
                    }
                }
            }();
        lfgs = sa;
        var ha = function() {
                return {
                    isAllowed: function(a) {
                        var g = !1,
                            c = !1,
                            d = 0 != f.values.forbiddenPages.length,
                            p = 0 != f.values.page_whitelist.length;
                        switch (f.values.page_filter_mode) {
                            case "black":
                                c = d;
                                break;
                            case "off":
                                break;
                            case "white":
                                g = p;
                                break;
                            default:
                                g = p, c = d
                        }
                        d = {
                            inc: g ? f.values.page_whitelist : void 0,
                            exc: c ? f.values.forbiddenPages : void 0
                        };
                        return !c && !g || v.validUrl(a, d)
                    }
                }
            }(),
            Z = function() {
                var a = {
                    init: function() {
                        var g = m(),
                            c = function() {
                                "server" === f.values.script_blacklist_type && window.setTimeout(a.checkUpdate, 2E4)
                            };
                        c();
                        f.addChangeListener("script_blacklist_type", c);
                        g.resolve();
                        return g.promise()
                    },
                    getEvilnessOf: function(a) {
                        if ("off" === f.values.script_blacklist_type) return !1;
                        if (!a) return 0;
                        var c = !1,
                            d = 0,
                            p = function(e) {
                                var b = !1;
                                if (e.length) return (b = "/" == e.substr(0, 1) ? v.matchUrl(a, e) : -1 != a.search(e)) && console.debug('black: entry "' + e + '" matched'), c |= b, !0 != c
                            };
                        s.each(f.values.require_blacklist, p);
                        c ? d = 11 : "server" === f.values.script_blacklist_type && s.each(f.values.script_blacklist_server, function(a) {
                            if (a && (s.each(a.rules, function(a) {
                                    p(a);
                                    return !0 != c
                                }), c)) return d = a.severity, !1
                        });
                        return Number(d)
                    },
                    checkUpdate: function(a) {
                        var c = m(),
                            d = Y.getConfig(),
                            p;
                        if (a || 6048E5 < (new Date).getTime() - d.black.last) {
                            var e = function(a) {
                                var e = m();
                                U({
                                    method: "GET",
                                    url: a,
                                    retries: n.XMLHTTPREQUEST.RETRIES,
                                    overrideMimeType: "text/plain; charset=x-user-defined"
                                }, {
                                    ondone: function(a) {
                                        e.resolve(a)
                                    }
                                });
                                return e.promise()
                            };
                            e("https://blacklist.tampermonkey.net/get.php?version=get").then(function(b) {
                                if (4 == b.readyState && 200 == b.status) {
                                    try {
                                        p = JSON.parse(b.responseText).version
                                    } catch (c) {
                                        console.log("black: unable to parse version response! " +
                                            b.responseText)
                                    }
                                    console.log("black: local version: " + d.black.version + " remote: " + p);
                                    if (p > d.black.version || a) return e("https://blacklist.tampermonkey.net/get.php")
                                }
                            }).then(function(a) {
                                if (a && 4 == a.readyState && 200 == a.status) try {
                                    var e = JSON.parse(a.responseText);
                                    e && e.blacklist && 1 == e.version && (f.values.script_blacklist_server = e.blacklist);
                                    console.log("black: updated blacklist to ", e)
                                } catch (c) {
                                    console.log("black: blacklist update failed! ", a.responseText)
                                }
                            }).always(function() {
                                d = Y.getConfig();
                                d.black.last =
                                    (new Date).getTime();
                                d.black.version = p || d.black.version;
                                Y.setConfig(d);
                                c.resolve()
                            })
                        } else c.resolve();
                        return c.promise()
                    }
                };
                return a
            }();
        blak = Z;
        var Ca = function() {
                for (var a = [], d = [], c = 0; c < a.length; c++) {
                    var h = Registry.getRaw("system/" + a[c] + ".tamper.js");
                    h && d.push(h)
                }
                return d
            },
            I = function() {
                var a = 0,
                    g = [],
                    c = {
                        to: null,
                        force: null,
                        t: 0
                    },
                    h = {},
                    p = function(a) {
                        D && console.debug("sync: import", a.uuid, a.name, a.url);
                        var b = {
                                imported: f.values.sync_type
                            },
                            e = {},
                            c;
                        for (c in r.SYNCED) !0 === r.SYNCED[c] && (e[c] = a.options[c]);
                        return v.installFromUrl(a.url, {
                            uuid: a.uuid,
                            ask: !1,
                            internal: !0,
                            sync: b,
                            force_options: e
                        }, {
                            silent_fail: !0
                        })
                    },
                    e = function(a) {
                        D && console.debug("sync: export", a.name, a.url);
                        return J.add(a)
                    },
                    b = function(a) {
                        var b = a.downloadURL ? a.downloadURL.split("#")[0] : null,
                            e = a.fileURL ? a.fileURL.split("#")[0] : null,
                            c = s.select([e, b], function(a) {
                                if (!a || "file:" !== A.parse(a).protocol) return a
                            })[0],
                            b = {
                                uuid: a.uuid,
                                name: a.name,
                                options: {},
                                durl: b,
                                furl: e,
                                url: c
                            },
                            k;
                        for (k in r.SYNCED) !0 === r.SYNCED[k] && null !== a.options[k] && (b.options[k] = a.options[k]);
                        return b
                    },
                    k = function() {
                        var a = [];
                        x.getUidList().forEach(function(e) {
                            e = x.getByUid(e);
                            e.script && e.cond && a.push(b(e.script))
                        });
                        return a
                    },
                    l = function(b) {
                        if (r.enabled)
                            if (0 < a) b && r.addSyncDoneCallback(function(a) {
                                a && r.sync(50, b)
                            });
                            else {
                                a++;
                                var c = null,
                                    l = null,
                                    u = !0,
                                    t = {},
                                    n = function(a) {
                                        if (a) {
                                            (a = a.split("#")[0]) && (a = a.toLowerCase());
                                            for (var b = 0; b < c.length; b++) {
                                                var e = c[b].furl ? c[b].furl.toLowerCase() : null,
                                                    k = c[b].durl ? c[b].durl.toLowerCase() : null;
                                                if (e == a || k == a) return c[b]
                                            }
                                        }
                                        return null
                                    },
                                    q = function(a) {
                                        if (a)
                                            for (var b = 0; b < l.length; b++)
                                                if (l[b].uuid ==
                                                    a) return l[b];
                                        return null
                                    },
                                    s = function(a) {
                                        if (a) {
                                            a = a.split("#")[0];
                                            for (var b = 0; b < l.length; b++)
                                                if (l[b].url == a) return l[b]
                                        }
                                        return null
                                    },
                                    w = function(a) {
                                        if (!a) return null;
                                        for (var b = 0; b < c.length; b++)
                                            if (c[b].uuid == a) return c[b]
                                    };
                                (function() {
                                    c = k();
                                    return J.list().done(function(a) {
                                        l = a
                                    }).fail(function() {
                                        D && console.error("sync: unable to get remotelist!")
                                    })
                                })().then(function() {
                                    for (var a = m(), b = [], e = 0; e < l.length; e++) b.push(function() {
                                        var a, b = l[e],
                                            c = !1,
                                            k = !1,
                                            g = 2 == f.values.sync_version ? w(b.uuid) : n(b.url);
                                        if (g)
                                            if (c = !0, t[b.url] = !0, b.uuid && (t[b.uuid] = !0), b.content && L.MD5(b.content) != L.MD5(g.textContent)) k = !0;
                                            else
                                                for (a in r.SYNCED)
                                                    if (!0 === r.SYNCED[a] && g.options[a] != b.options[a]) {
                                                        k = !0;
                                                        break
                                                    }
                                        if (c)
                                            if (b.options.removed) D && console.debug("sync: remove local script", b.uuid, b.name, b.url), v.doRemove(g.uuid, !1);
                                            else if (k)
                                            if (D && console.debug("sync: update local script", b.uuid, b.name, b.url), k = x.getByUid(g.uuid), k.script && k.cond) {
                                                for (a in r.SYNCED) !0 === r.SYNCED[a] && (k.script.options[a] = b.options[a]);
                                                b.content && (k.script.textContent =
                                                    b.content);
                                                v.doModify(k.script.uuid, k.script, !1)
                                            } else console.log(d.getMessage("fatal_error") + "(" + g.name + ")!!!");
                                        if (!c && !b.options.removed)
                                            if (a = m(), h[b.url] || b.uuid && h[b.uuid]) D && console.warn("sync: skip previously failed import", b);
                                            else return p(b).done(function(a) {
                                                a || (D && console.warn("sync: unable to import", b), h[b.url] = !0, b.uuid && (h[b.uuid] = !0))
                                            }).fail(function() {
                                                D && console.warn("sync: unable to load", b);
                                                h[b.url] = !0;
                                                b.uuid && (h[b.uuid] = !0)
                                            }).always(a.resolve), a.promise();
                                        return m.Pledge()
                                    }());
                                    m.when(b).done(function() {
                                        a.resolve()
                                    });
                                    return a.promise()
                                }).then(function() {
                                    c = k();
                                    return m.Pledge()
                                }).then(function() {
                                    if (!J.isWritable()) return m.Pledge();
                                    for (var a = m(), b = [], k = 0; k < c.length; k++) b.push(function() {
                                        var a = c[k],
                                            b = !1;
                                        if (!a.url || t[a.url] || t[a.uuid]) return m.Pledge();
                                        if (2 == f.values.sync_version ? q(a.uuid) : s(a.url)) b = !0;
                                        return b ? m.Pledge() : e(a).done(function(a) {})
                                    }());
                                    m.when(b).done(function() {
                                        a.resolve()
                                    });
                                    return a.promise()
                                }).fail(function() {
                                    u = !1
                                }).done(function() {
                                    u = !0
                                }).always(function() {
                                    D && console.debug("sync: finished");
                                    if (0 ==
                                        --a)
                                        for (var b = u; g.length;) g.shift()(b)
                                })
                            }
                    },
                    u = function() {
                        r.enabled && r.sync(500, !0)
                    },
                    t = null,
                    r = {
                        enabled: !1,
                        SYNCED: {
                            comment: !0
                        },
                        createTeslaData: function() {
                            for (var a = m(), b = [], e = k(), c = 0; c < e.length; c++)
                                if (e[c].url) {
                                    var l = JSON.stringify(e[c].options),
                                        l = e[c].name.replace(/\|/g, "!") + "|" + l + "|" + e[c].url.replace(/\|/g, "%7C");
                                    b.push(l)
                                }
                            a.resolve(b);
                            return a.promise()
                        },
                        configChangeListener: function() {
                            t || (t = window.setTimeout(function() {
                                t = null;
                                r.init().done(function() {
                                    r.enabled && r.sync(3E3)
                                })
                            }, 3E3))
                        },
                        init: function() {
                            var a =
                                m();
                            r.enabled = !1;
                            (function() {
                                return f.values.sync_enabled && f.values.sync_type ? J.init(f.values.sync_type, f.values.sync_version, f.values.sync_id).done(function(a) {
                                    r.enabled = a;
                                    r.enabled ? J.addChangeListener(u) : console.warn("sync: init failed!")
                                }) : m.Pledge()
                            })().always(function() {
                                a.resolve(r.enabled)
                            });
                            return a.promise()
                        },
                        finalize: function() {},
                        reset: function() {
                            return J.reset()
                        },
                        addSyncDoneCallback: function(a) {
                            g.push(a)
                        },
                        sync: function(a, b) {
                            var e = (new Date).getTime();
                            a = a || 500;
                            b = c.force || b;
                            c.to ? (window.clearTimeout(c.to),
                                c.ts < e + a && (a = c.ts - e, 1 > a && (a = 1))) : D && console.debug("sync: schedule sync for run in " + a + " ms");
                            c.force = b;
                            c.ts = e + a;
                            c.to = window.setTimeout(function() {
                                l(c.force);
                                c.to = null;
                                c.force = null
                            }, a)
                        },
                        scriptAddedCb: function(a, c) {
                            if (r.enabled && J.isWritable()) {
                                var k = b(c);
                                k.url && A.parse(k.url).protocol.match(/https?:/) && e(k)
                            }
                        },
                        scriptChangedCb: function(a, c, k) {
                            if (r.enabled && J.isWritable() && (a = b(c), a.url))
                                for (var l in r.SYNCED)
                                    if (!0 === r.SYNCED[l] && c.options[l] != k.options[l]) {
                                        e(a);
                                        break
                                    }
                        },
                        scriptRemovedCb: function(a, e) {
                            if (r.enabled &&
                                J.isWritable()) {
                                var c = b(e);
                                c.url && (D && console.debug("sync: remove", c.name, c.url), J.remove(c))
                            }
                        }
                    };
                return r
            }();
        sycl = I;
        var Da = function() {
                f.addChangeListener("scriptblocker_overwrite", G.init);
                f.addChangeListener("sync_enabled", I.configChangeListener);
                f.addChangeListener("sync_type", I.configChangeListener);
                f.addChangeListener("sync_id", I.configChangeListener);
                f.addChangeListener("sync_version", I.configChangeListener);
                f.addChangeListener("logLevel", function() {
                    pa(f.values.logLevel)
                });
                f.addChangeListener("i18n",
                    function() {
                        d.setLocale(f.values.i18n)
                    });
                f.addChangeListener("native_import_path", function() {
                    N.setPath(f.values.native_import_path)
                });
                f.addChangeListener("incognito_mode", function() {
                    ta()
                });
                f.addChangeListener("statistics_enabled", function() {
                    M.setEnabled(f.values.statistics_enabled)
                });
                f.addChangeListener("require_blacklist", v.blackCheckAll);
                f.addChangeListener("script_blacklist_server", v.blackCheckAll);
                f.addChangeListener("script_blacklist_type", v.blackCheckAll);
                f.addChangeListener("downloads_extension_whitelist",
                    H.config_changed_listener);
                f.addChangeListener("downloads_mode", H.config_changed_listener)
            },
            f = function() {
                var a = {},
                    d = {
                        enabled: !0,
                        configMode: 0,
                        safeUrls: !0,
                        tryToFixUrl: !0,
                        debug: !1,
                        logLevel: 0,
                        showFixedSrc: !1,
                        webrequest_modHeaders: "yes",
                        webrequest_fixCSP: "yes",
                        scriptblocker_overwrite: "no",
                        notification_showUpdate: "changelog",
                        notification_silentScriptUpdate: !0,
                        script_templates: [{
                            name: "ECMAScript 5",
                            value: "// ==UserScript==\n// @name         New Userscript\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  try to take over the world!\n// @author       You\n// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.js\n// @match        <$URL$>\n// @grant        GM_addStyle\n// @grant        GM_download\n// ==/UserScript==\n'use strict';\n"
                        }, {
                            name: "ECMAScript 6",
                            value: "// ==UserScript==\n// @name         New ES6-Userscript\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  shows how to use babel compiler\n// @author       You\n// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js\n// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js\n// @match        <$URL$>\n// ==/UserScript==\n\n/* jshint ignore:start */\nvar inline_src = (<><![CDATA[\n/* jshint ignore:end */\n/* jshint esnext:true */\n\n// Your code here...\n\n/* jshint ignore:start */\n]]\x3e</>).toString();\nvar c = babel.transform(inline_src);\neval(c.code);\n/* jshint ignore:end */"
                        }, {
                            name: "CoffeeScript",
                            value: "// ==UserScript==\n// @name         New Coffee-Userscript\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  shows how to use coffeescript compiler\n// @author       You\n// @require      http://coffeescript.org/extras/coffee-script.js\n// @match        <$URL$>\n// ==/UserScript==\n/* jshint ignore:start */\nvar inline_src = (<><![CDATA[\n\n// Your code here\n\n]]\x3e</>).toString();\nvar compiled = this.CoffeeScript.compile(inline_src);\neval(compiled);\n/* jshint ignore:end */"
                        }],
                        scriptUpdateCheckPeriod: 864E5,
                        scriptUpdateHideNotificationAfter: 15E3,
                        scriptUpdateCheckDisabled: !1,
                        scriptUrlDetection: "auto",
                        runtime_fastDocumentStart: !0,
                        runtime_strict_mode: "byscript",
                        runtime_strong_mode: "default",
                        autoReload: !1,
                        appearance_badges: "running",
                        appearance_badge_color: "gcal" === rea.runtime.short_id ? "#444" : "#ee3131",
                        editor_enabled: !0,
                        editor_keyMap: "windows",
                        editor_indentUnit: 4,
                        editor_indentWithTabs: !1,
                        editor_tabMode: "indent",
                        editor_electricChars: !0,
                        editor_autoSave: !1,
                        editor_easySave: !0,
                        native_import: !0,
                        native_import_path: null,
                        native_import_post_action: "disable",
                        i18n: null,
                        action_menu_columns: 2 <= n.ACTIONMENU.COLUMNS ? 2 : 1,
                        action_menu_scripts_hide_disabled: !1,
                        action_menu_scripts_sort: "position",
                        incognito_mode: "temporary",
                        layout: "default",
                        sync_enabled: !1,
                        sync_type: 2,
                        sync_version: 2,
                        sync_id: "",
                        statistics_enabled: !0,
                        downloads_mode: "default",
                        downloads_extension_whitelist: "/^[^\\.]*$/ /\\.mp[34]$/ .wav /\\.(avi|mkv|flv|divx|mpe?g|webm)$/ /\\.(ico|gif|png|jpe?g)/ /\\.(srt|sub|idx)$/ .txt .iso .zip /\\.r(ar|[0-9]{2,2})$/".split(" "),
                        external_update_interval: 6048E5,
                        require_timeout: 2E4,
                        require_blacklist: ["/^https?:\\/\\/example.com(:[0-9]{1,5})?\\/.*/"],
                        script_blacklist_server: [],
                        script_blacklist_type: "server",
                        script_blacklist_severity: 4,
                        page_filter_mode: "black",
                        page_whitelist: ["/https?:\\/\\/greasyfork\\.org\\/.*/", "http://xkcd.com/970/"],
                        forbiddenPages: "*.paypal.tld/* https://*deutsche-bank-24.tld/* https://*bankamerica.tld/* /^.*:\\/\\/apis\\.google\\.com\\/((?!render)([^\\/]+)\\/)+([^\\/]+)?$/ *://www.facebook.com/plugins/* *://platform.twitter.com/widgets/*".split(" ")
                    },
                    c = function(c, e) {
                        var b = q.getValue(n.CONSTANTS.STORAGE.CONFIG, {}),
                            k = void 0 === b[c] ? d[c] : b[c];
                        b[c] = e;
                        q.setValue(n.CONSTANTS.STORAGE.CONFIG, b);
                        a[c] && JSON.stringify(k) != JSON.stringify(e) && a[c].forEach(function(a) {
                            try {
                                a(c, k, e)
                            } catch (b) {
                                console.warn("config: changeListener error", b)
                            }
                        })
                    },
                    h = {
                        init: function() {
                            var a = m();
                            h.values = {};
                            for (var e in d) d.hasOwnProperty(e) && function() {
                                var a = e;
                                h.values.__defineGetter__(a, function() {
                                    var b = q.getValue(n.CONSTANTS.STORAGE.CONFIG, {});
                                    return void 0 === b[a] ? d[a] : b[a]
                                });
                                h.values.__defineSetter__(a,
                                    function(b) {
                                        c(a, b)
                                    })
                            }();
                            h.images = {};
                            h.images.icon = "images/icon.png";
                            h.initialized = !0;
                            var b = Ca(),
                                k;
                            for (k in b) {
                                var l = b[k];
                                window.setTimeout(function() {
                                    v.doSave({
                                        url: null,
                                        src: l,
                                        ask: !1,
                                        replace: !0,
                                        internal: !0
                                    })
                                }, 1)
                            }
                            a.resolve();
                            return a.promise()
                        },
                        getDefaults: function() {
                            return d
                        },
                        addChangeListener: function(c, e) {
                            a[c] || (a[c] = []);
                            a[c].push(e)
                        }
                    };
                return h
            }(),
            U = function(a, d) {
                return ba(a, d, {
                    internal: !0
                })
            },
            R = function() {
                var a = {
                        key: function(a, e) {
                            return n.CONSTANTS.PREFIX.EXTERNAL + s.select([a, e ? L.MD5(e) : null], function(a) {
                                return a
                            }).join(":")
                        },
                        list: function(a) {
                            var e = RegExp("^" + a);
                            return s.select(q.listValues(), function(a) {
                                return -1 != a.search(e)
                            })
                        },
                        set: function(b, e, c) {
                            b = a.key(b, e);
                            var d = {};
                            s.each(c, function(a, b) {
                                "content" == b && (b = "base", a = L.encodeS(a));
                                d[b] = a
                            });
                            q.setValue(b, {
                                ts: (new Date).getTime(),
                                url: e,
                                resource: d
                            })
                        },
                        get: function(b, e) {
                            var c = a.key(b, e),
                                c = q.getValue(c),
                                d;
                            if (c && c.resource) {
                                var g = {};
                                s.each(c.resource, function(a, b) {
                                    "base" == b && (b = "content", a = L.decodeS(a));
                                    g[b] = a
                                });
                                d = {
                                    ts: c.ts,
                                    url: c.url,
                                    data: g
                                }
                            }
                            return d
                        },
                        clean: function(b, e) {
                            var c =
                                a.key(b, e);
                            q.deleteValue(c)
                        },
                        cleanAll: function(b, e) {
                            var c, d = a.list(a.key(b));
                            if (e) {
                                var g = {};
                                s.each(e, function(e) {
                                    e = a.key(b, e);
                                    g[e] = !0
                                });
                                c = [];
                                s.each(d, function(a) {
                                    g[a] || c.push(a)
                                })
                            } else c = d;
                            c.forEach(function(a) {
                                q.deleteValue(a)
                            })
                        }
                    },
                    d = function(a, e) {
                        var c = m(),
                            d = {
                                method: "GET",
                                url: a,
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                responseType: e.via_arraybuffer ? "arraybuffer" : void 0
                            },
                            g = function(d) {
                                var g = {
                                    content: ""
                                };
                                if (4 != d.readyState || 200 != d.status && 0 != d.status) c.reject(g);
                                else {
                                    var h, p = d.responseHeaders ? d.responseHeaders.split("\n") :
                                        null,
                                        f;
                                    for (f in p) {
                                        var u = p[f].split(":"),
                                            t = u.shift() || "",
                                            u = u.join(":") || "";
                                        if ("content-type" == t.trim().toLowerCase() && -1 != u.search("image")) {
                                            h = u.trim();
                                            break
                                        }
                                    }
                                    h || (-1 != a.search(".ico$") || -1 != a.search(".jpg$") ? h = "image/x-icon" : -1 != a.search(".gif$") ? h = "image/gif" : -1 != a.search(".png$") ? h = "image/png" : s.isLocalImage(a) && (h = "image/x-icon"));
                                    g.meta = h;
                                    g.content = e.via_arraybuffer ? L.arrbuf2str(d.response) : d.responseText;
                                    c.resolve(g)
                                }
                            },
                            h = function() {
                                c.reject({})
                            };
                        e.sync ? g(U(d, {})) : (d.timeout = f.values.require_timeout,
                            U(d, {
                                onload: g,
                                onerror: h,
                                ontimeout: h
                            }));
                        return c.promise()
                    },
                    c = s.getDebouncer(9E3),
                    h = function(b, e, c) {
                        c.no_storage = !0;
                        p(b, e, c).done(function(c) {
                            a.set(b, e, c.resource)
                        }).fail(function() {}).always(function() {
                            var c = a.get(b, e);
                            c && c.data ? a.set(b, e, c.data) : console.warn("externals: should never happen!")
                        })
                    },
                    p = function(b, e, l) {
                        var p = m(),
                            t = A.parse(e),
                            r = {
                                sync: l.sync
                            },
                            E;
                        if (e)
                            if (Z.getEvilnessOf(e) >= f.values.script_blacklist_severity) r.resource = {
                                blacklisted: !0,
                                content: ""
                            }, p.reject(r);
                            else if (!l.no_storage && "file:" !==
                            t.protocol && (E = a.get(b, e))) {
                            var F = a.key(b, e),
                                B = (new Date).getTime();
                            0 < f.values.external_update_interval && B - E.ts > f.values.external_update_interval && !c.is(F) && (1 < f.values.external_update_interval && c.add(F), D && console.log("externals: resource needs update", e, (new Date(E.ts)).toISOString(), (new Date(B)).toISOString()), window.setTimeout(function() {
                                h(b, e, l)
                            }, 3E3));
                            r.resource = E.data;
                            p.resolve(r)
                        } else r.sync = !1, "file:" == t.protocol && -1 == e.search(n.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) ? (n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS ||
                            console.warn("externals: Access to local files is forbidden! Loading the following @resource may fail:", e, "-> more info:", "http://tampermonkey.net/faq.php#Q204"), E = sa.getSource({
                                url: e,
                                encoding: l.encoding
                            })) : E = d(e, {
                            via_arraybuffer: l.via_arraybuffer
                        }), E.done(function(c) {
                            !l.no_storage && t.protocol && "file:" !== t.protocol && -1 == e.search(n.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) && a.set(b, e, c);
                            r.resource = c;
                            p.resolve(r)
                        }).fail(function(a) {
                            D && console.log("externals: get.failed", b, e, a);
                            r.resource = {
                                failed: !0,
                                content: ""
                            };
                            p.reject(r)
                        });
                        else r.resource = {
                            forbidden: !0,
                            content: ""
                        }, p.reject(r);
                        return p.promise()
                    },
                    e = {
                        getElement: function(b, e) {
                            return a.get(b, e)
                        },
                        cleanElement: function(b, e) {
                            return a.clean(b, e)
                        },
                        dropAll: function(b) {
                            a.cleanAll(b);
                            return m.Pledge()
                        },
                        dropAllBut: function(b, e) {
                            a.cleanAll(b, e);
                            return m.Pledge()
                        },
                        loadResources: function(a, c) {
                            var d = m();
                            e.getResources(a, c).always(function() {
                                d.resolve()
                            });
                            return d.promise()
                        },
                        loadRequires: function(a, c) {
                            var d = m();
                            e.getRequires(a, c).always(function() {
                                d.resolve()
                            });
                            return d.promise()
                        },
                        getResources: function(a, e) {
                            var c = {
                                    elements: []
                                },
                                d = m(),
                                g = [],
                                h = {
                                    via_arraybuffer: !0,
                                    sync: !0
                                };
                            e.forEach(function(e) {
                                var d = {
                                        name: e.name
                                    },
                                    k = p(a, e.url, h),
                                    f = m();
                                k.done(function(a) {
                                    a = a.resource;
                                    var b = [e.url, a.content.length].join(),
                                        c = T.items.resources.get(b) || {};
                                    try {
                                        d.resText = c.resText ? c.resText : L.UTF8.decode(a.content)
                                    } catch (k) {
                                        d.resText = ""
                                    }
                                    try {
                                        d.resURL = c.resUrl ? c.resURL : a.meta ? "data:" + a.meta + ";base64," + L.Base64.encode(a.content) : L.Base64.encode(a.content)
                                    } catch (l) {
                                        d.resURL = e.url
                                    }
                                    T.items.resources.set(b, {
                                        resText: d.resText,
                                        resURL: d.resURL
                                    })
                                }).fail(function(a) {
                                    a.resource && a.resource.forbidden ? console.warn("externals: can't load @resource", e.name, "from forbidden URL", e.unsafe_url) : a.resource && a.resource.blacklisted ? console.warn("externals: can't load @resource", e.name, "from blacklisted URL", e.unsafe_url) : console.warn("externals: can't load @resource", e.name, "from URL", e.unsafe_url);
                                    d.resText = "";
                                    d.resURL = ""
                                }).always(function(a) {
                                    h.sync &= a.sync;
                                    c.elements.push(d);
                                    f.resolve()
                                });
                                g.push(f)
                            });
                            m.when(g).always(function() {
                                c.sync =
                                    h.sync;
                                d.resolve(c)
                            });
                            return d.promise()
                        },
                        getRequires: function(a, e) {
                            var c = {
                                    elements: []
                                },
                                d = m(),
                                g = [],
                                h = {
                                    encoding: "UTF-8",
                                    sync: !0
                                };
                            s.each(e, function(e, d) {
                                var k = {},
                                    f = p(a, e.url, h),
                                    u = m();
                                f.done(function(a) {
                                    k.textContent = a.resource.content || ""
                                }).fail(function(a) {
                                    a.resource && a.resource.forbidden ? (k.textContent = '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") is not allowed!\n', console.warn("externals: can't load @require from forbidden URL", e.unsafe_url)) : a.resource && a.resource.blacklisted ? (k.textContent =
                                        '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") is blacklisted!\n', console.warn("externals: can't load @require from blacklisted URL", e.unsafe_url)) : (k.textContent = '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") could not be loaded!\n', console.warn("externals: can't load @require from URL", e.unsafe_url))
                                }).always(function(a) {
                                    h.sync &= a.sync;
                                    c.elements[d] = k;
                                    u.resolve()
                                });
                                g.push(u)
                            });
                            m.when(g).always(function() {
                                c.sync = h.sync;
                                c.elements = c.elements.filter(function(a) {
                                    return a
                                });
                                d.resolve(c)
                            });
                            return d.promise()
                        }
                    };
                return e
            }();
        exts = R;
        var ra = function() {
                var a = function(a, c, d) {
                    var p = m(),
                        e = [];
                    d.forEach(function(b) {
                        b = b.textContent || "";
                        b = ia.mkCompat(b, a.options.compatopts_for_requires ? a : null, "off" != f.values.runtime_strict_mode);
                        e.push(b)
                    });
                    d = "\n" + e.join("\n") + "\n";
                    var b = x.getStorageByUid(a.uuid);
                    c = ia.mkCompat(c, a, "off" != f.values.runtime_strict_mode);
                    f.values.debug && (c = "debugger;\n" + c);
                    p.resolve({
                        header: a.header,
                        code: c,
                        requires: d,
                        storage: b,
                        script: a
                    });
                    return p.promise()
                };
                return {
                    bundle: function(d,
                        c, h) {
                        var p = {},
                            e;
                        for (e in c) "includes" != e && "matches" != e && "requires" != e && "resources" != e && "excludes" != e && "textContent" != e && ("options" == e ? (p[e] = JSON.parse(JSON.stringify(c[e])), p[e].run_at = p[e].run_at || c.options.override.orig_run_at || "document-idle") : p[e] = c[e]);
                        return R.getResources(p.uuid, c.resources).then(function(a) {
                            h && !a.sync && (D && console.warn("ri: uncached @external detected -> fast script start disabled"), h = a.sync);
                            p.resources = a.elements;
                            return R.getRequires(p.uuid, c.requires)
                        }).then(function(b) {
                            h &&
                                !b.sync && (D && console.warn("ri: uncached @external detected -> fast script start disabled"), h = b.sync);
                            b = b.elements;
                            console.log("run script " + p.name + " @ " + d.url);
                            return a(p, c.textContent, b)
                        })
                    }
                }
            }(),
            ua = function(a) {
                a && (a += (-1 == a.search("\\?") ? "?" : "&") + "ts=" + (new Date).getTime());
                return a
            },
            va = function() {
                var a = rea.extension.getViews({
                    type: "popup"
                });
                a && a.length && rea.extension.sendMessage({
                    method: "updateActions"
                }, function() {})
            },
            Y = function() {
                return {
                    getConfig: function() {
                        var a = {
                                version: 0,
                                last: 0
                            },
                            d = {
                                scripts: 0
                            },
                            c = q.getValue(n.CONSTANTS.STORAGE.UPDATE, d);
                        "object" !== typeof c && (c = d);
                        c || (c = d);
                        void 0 == c.black && (c.black = a);
                        void 0 == c.scripts && (c.scripts = 0);
                        return c
                    },
                    setConfig: function(a) {
                        a && q.setValue(n.CONSTANTS.STORAGE.UPDATE, a)
                    }
                }
            }(),
            ja = function() {
                var a = function(a, c) {
                    var h = 0,
                        p = 0;
                    if (a) {
                        var e = d.getMessage("Script_Update"),
                            b = d.getMessage("Check_for_userscripts_updates") + "...";
                        P.show(e, b, rea.extension.getURL("images/icon128.png"), 1E4)
                    }
                    e = x.getUidList().map(function(a) {
                        var b, e, g, r, E;
                        console.log("update: check for script updates @",
                            a);
                        return function() {
                            r = x.getByUid(a);
                            if (!r.script || !r.cond) return console.warn("update: inconsistent script entry", a, r), m.Breach();
                            var b = !f.values.scriptUpdateCheckDisabled && !r.script.enabled && !c;
                            return c && r.script.uuid !== c || b || !v.determineSourceURL(r.script) ? m.Breach() : m.Pledge()
                        }().then(function() {
                            var a = v.determineMetaURL(r, !0);
                            if (!a) return m.Pledge();
                            var b = m();
                            ba({
                                method: "GET",
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                headers: {
                                    Accept: "text/x-userscript-meta"
                                },
                                url: a
                            }, {
                                ondone: function(e) {
                                    4 == e.readyState && 200 == e.status ? E = w.processMetaHeader(e.responseText) : console.log("update: unable to find meta data @ " + a + " req.status = " + e.status);
                                    b.resolve()
                                }
                            });
                            return b.promise()
                        }).then(function() {
                            var a = !!E,
                                b = a && !!E.version,
                                e = b && (!r.script.version || w.versionCmp(E.version, r.script.version) == w.versionCmp.eNEWER);
                            return a && b && !e ? m.Breach() : m.Pledge()
                        }).then(function() {
                            var a = m(),
                                b = {
                                    method: "GET",
                                    retries: n.XMLHTTPREQUEST.RETRIES,
                                    timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                    url: v.determineSourceURL(r.script, !0)
                                };
                            ba(b, {
                                ondone: function(e) {
                                    4 == e.readyState && 200 == e.status ? a.resolve(e.responseText) : (console.log("update: failed", r.script.name, b.url), a.reject())
                                }
                            });
                            return a.promise()
                        }).then(function(a) {
                            var c;
                            var d = r.script.uuid;
                            c = w.createScriptFromSrc(a);
                            c = c.name && "" != c.name && void 0 !== c.version ? (d = x.getMetaByUid(d)) && d.system ? null : c.options.compat_uW_gmonkey ? w.versionCmp.eERROR : -1 != c.name.search("@") ? w.versionCmp.eERROR : d && c.version == d.version ? w.versionCmp.eEQUAL : d && w.versionCmp(c.version, d.version) == w.versionCmp.eOLDER ?
                                w.versionCmp.eOLDER : w.versionCmp.eNEWER : w.versionCmp.eERROR;
                            return c == w.versionCmp.eNEWER ? (h++, b = r.script.name, e = v.determineSourceURL(r.script), g = a, m.Pledge()) : m.Breach()
                        }).then(function() {
                            if (f.values.notification_silentScriptUpdate) return m.Pledge();
                            var a = d.getMessage("There_is_an_update_for_0name0_avaiable_", b) + "\n" + d.getMessage("Click_here_to_install_it_"),
                                e = d.getMessage("Just_another_service_provided_by_your_friendly_script_updater_") + ":",
                                c = m();
                            P.show(e, a, rea.extension.getURL("images/icon128.png"),
                                f.values.scriptUpdateHideNotificationAfter, c.resolve);
                            return c.promise()
                        }).then(function(b) {
                            var c = a || r.script.uuid;
                            return void 0 === b || b.clicked ? v.doSave({
                                url: e,
                                uuid: c,
                                replace: !c,
                                src: g,
                                ask: !f.values.notification_silentScriptUpdate
                            }).done(function(a) {
                                a && a.installed && p++
                            }) : m.Breach()
                        })
                    });
                    return m.sidebyside(e).then(function() {
                        0 == h && a && (D && console.debug("No update found"), P.show("Narf!", d.getMessage("No_update_found__sry_"), rea.extension.getURL("images/icon128.png"), 1E4));
                        return {
                            found: h,
                            installed: p
                        }
                    })
                };
                return {
                    check: function(g, c, h) {
                        if (!g && !f.values.scriptUpdateCheckPeriod) return m.Breach();
                        var p = Y.getConfig();
                        if (!g && (new Date).getTime() - p.scripts < f.values.scriptUpdateCheckPeriod) return m.Breach();
                        var e = m();
                        g = function() {
                            b && (window.clearTimeout(b), b = null);
                            k && k.cancel();
                            a(c, h).done(function(a) {
                                e.resolve(a.installed)
                            }).fail(function() {
                                e.resolve(null)
                            });
                            p = Y.getConfig();
                            p.scripts = (new Date).getTime();
                            Y.setConfig(p)
                        };
                        var b, k, l = function() {
                            k = null;
                            var a = d.getMessage("Script_Update"),
                                b = d.getMessage("Waiting_for_sync_to_finish") +
                                "...";
                            k = P.show(a, b, rea.extension.getURL("images/icon128.png"), 6E4)
                        };
                        I.enabled ? (I.addSyncDoneCallback(g), I.sync(50, !1), c && (b = window.setTimeout(l, 500))) : g();
                        return e.promise()
                    }
                }
            }();
        trup = ja;
        var v = function() {
                var a = function(a) {
                        a.sort(function(a, e) {
                            return a.position - e.position
                        });
                        return a
                    },
                    g = function(a) {
                        void 0 === a.ask && (a.ask = !0);
                        if (void 0 === a.url || null == a.url) a.url = "";
                        "" === a.force_url && (a.force_url = null);
                        var b = w.createScriptFromSrc(a.src),
                            c = null,
                            l = {
                                heading: null,
                                errors: [],
                                info: [],
                                warnings: [],
                                flags: {}
                            },
                            g =
                            m(),
                            h = (new Date).getTime(),
                            r = a.save && !a.ask && f.values.editor_easySave,
                            n = a.uuid,
                            F;
                        b.name && void 0 != b.version ? F = m.Pledge() : (l.errors.push(d.getMessage("Invalid_UserScript__Sry_") + "\n\n"), a.name && l.errors.push(d.getMessage("Script_name_0url0", a.name) + "\n\n"), a.url && l.errors.push(d.getMessage("Downloaded_from_0url0", a.url)), console.warn("scriptman: invalid userscript", l, b), F = m.Breach());
                        F.then(function() {
                            a.replace && !n && (n = x.getUidsByName(b.name, b.namespace)[0]);
                            if (n) c = x.getMetaByUid(n);
                            else if (b.uuid) n =
                                b.uuid;
                            else if (a.replace) n = s.createUUID();
                            else return console.error("scriptman: neither UUID, @uuid nor replace option set"), m.Breach();
                            if ("" !== n.replace(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/, "")) return console.error("scriptman: invalid UUID", n), m.Breach();
                            if (!a.clean && !a.defaultscript && c && c.system) return m.Breach()
                        }).then(function() {
                            if (a.clean && a.name && a.name != b.name || -1 != b.name.search("\n")) return l.errors.push(d.getMessage("Invalid_UserScript_name__Sry_")), m.Breach()
                        }).then(function() {
                            if (b.options.compat_uW_gmonkey) return l.errors.push(d.getMessage("This_script_uses_uW_gm_api_")),
                                m.Breach()
                        }).then(function() {
                            if (c) {
                                c.name != b.name && (l.flags.renamed = !0);
                                if (c.lastModified && void 0 !== a.lastModified && c.lastModified !== a.lastModified) {
                                    var g = d.getMessage("some_secs");
                                    try {
                                        var p = Math.max(1, Math.floor((h - c.lastModified) / 1E3));
                                        isNaN(p) || (g = p)
                                    } catch (f) {}
                                    l.warnings.push(d.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_", g));
                                    l.flags.forceAsk = !0
                                }
                                b.version == c.version && (a.save ? l.flags.modification = !0 : l.flags.reset = !0);
                                a.clean && (l.flags.factory = !0)
                            } else l.flags.first_install = !0;
                            b.includes.length || b.matches.length || (g = "/" + A.staticVars.urlAllHttp_ + "/", r || a.internal || l.warnings.push(d.getMessage("This_script_does_not_provide_any__include_information_") + "\n" + d.getMessage("Tampermonkey_assumes_0urlAllHttp0_in_order_to_continue_", g)), b.includes.push(g));
                            l.flags.sync = !!a.sync;
                            l.flags.internal = a.internal;
                            l.flags.ask = a.ask
                        }).then(function() {
                            b.uuid = n;
                            b.lastUpdated = a.force_meta && a.force_meta.lastModified || h;
                            b.system = a.defaultscript;
                            b.evilness = v.getEvilness(b);
                            b.position = v.determineLastPosition() +
                                1;
                            l.flags.factory || l.flags.reset || (a.force_url && (b.updateURL = null, b.downloadURL = a.force_url), c && (b.options.override = c.options.override, b.options.comment = c.options.comment));
                            b.options.override.orig_includes = b.includes;
                            b.options.override.orig_excludes = b.excludes;
                            b.options.override.orig_matches = b.matches;
                            b.options.override.orig_noframes = b.options.noframes;
                            b.options.override.orig_run_at = b.options.run_at || "document-idle";
                            b.options.noframes = null;
                            b.options.run_at = null
                        }).then(function() {
                            if (c && (b.fileURL =
                                    c.fileURL, b.position = c.position, c.sync && (b.sync = c.sync), !l.flags.factory && !l.flags.reset)) {
                                b.enabled = c.enabled;
                                b.options.noframes = c.options.noframes;
                                b.options.run_at = c.options.run_at;
                                b.options.awareOfChrome || (b.options.compat_forvarin = c.options.compat_forvarin);
                                a.save && !a.force_url && (b.downloadURL = c.downloadURL || b.downloadURL);
                                var g = p.determineMetaURL(c),
                                    h = p.determineMetaURL(b),
                                    g = g ? A.woHash(g) : g,
                                    h = h ? A.woHash(h) : h;
                                g == h || r || a.internal || l.warnings.push(d.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0", [g, h]))
                            }
                        }).then(function() {
                            if (c && !l.flags.factory && b.version == c.version && (a.defaultscript || a.noreinstall)) return m.Breach()
                        }).then(function() {
                            c ? (l.flags.factory || l.flags.reset ? (l.flags.reset ? (l.heading = d.getMessage("You_are_about_to_reinstall_a_UserScript_"), l.flags.reinstall = !0) : (l.heading = d.getMessage("You_are_about_to_install_a_UserScript_"), l.flags.install = !0), a.internal || l.warnings.splice(0, 0, d.getMessage("All_script_settings_will_be_reset_"))) : l.flags.modification ? l.heading = d.getMessage("You_are_about_to_modify_a_UserScript_") :
                                w.versionCmp(b.version, c.version) == w.versionCmp.eOLDER ? (l.heading = d.getMessage("You_are_about_to_downgrade_a_UserScript"), l.flags.downgrade = !0, r || a.internal || l.warnings.splice(0, 0, d.getMessage("The_downgraded_script_might_have_problems_to_read_its_stored_data_"))) : (l.heading = d.getMessage("You_are_about_to_update_a_UserScript_"), l.flags.update = !0), l.info.push({
                                    label: d.getMessage("Installed_Version_"),
                                    value: "v" + c.version
                                })) : (l.heading = d.getMessage("You_are_about_to_install_a_UserScript_"), r || a.internal ||
                                l.info.splice(0, 0, d.getMessage("Malicious_scripts_can_violate_your_privacy_")), l.flags.install = !0);
                            l.flags.install ? l.action = d.getMessage("Install") : l.flags.reinstall ? l.action = d.getMessage("Reinstall") : l.flags.modification ? l.action = d.getMessage("Modify") : l.flags.downgrade ? l.action = d.getMessage("Downgrade") : l.flags.update && (l.action = d.getMessage("Update"))
                        }).then(function() {
                            a.url && (b.fileURL = a.url);
                            a.sync && (b.sync = a.sync);
                            a.force_options && s.copy(a.force_options, b.options, (new w.Script).options, !0);
                            a.force_settings && s.copy(a.force_settings, b, ["enabled", "position"]);
                            b = v.mergeCludes(b)
                        }).then(function() {
                            var a = !1,
                                c;
                            for (c in b.options)
                                if (-1 != c.search("compat_") && !0 === b.options[c]) {
                                    a = !0;
                                    break
                                }
                            a && l.info.push({
                                label: d.getMessage("Note"),
                                value: d.getMessage("A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")
                            })
                        }).then(function() {
                            ["requires", "resources"].forEach(function(a) {
                                b[a] = s.map(b[a], function(a) {
                                    a.unsafe_url = a.url;
                                    a.url = A.sanitize(a.unsafe_url, b.fileURL ?
                                        b.fileURL.split("/").slice(0, -1).join("/") : null);
                                    return a
                                })
                            })
                        }).done(function() {
                            g.resolve({
                                script: b,
                                messages: l,
                                short_info: [{
                                    label: d.getMessage("Author"),
                                    prop: "author"
                                }, {
                                    label: d.getMessage("Description"),
                                    prop: "description"
                                }, {
                                    label: d.getMessage("Source"),
                                    prop: "fileURL"
                                }]
                            })
                        }).fail(function() {
                            g.reject({
                                messages: l
                            })
                        });
                        return g.promise()
                    },
                    c = function(a) {
                        var b = m(),
                            c = a.messages,
                            d = a.script,
                            g = !c.flags.internal,
                            h = function() {
                                var a = p.doModify(d.uuid, d, g) || {};
                                (c.flags.first_install || c.flags.factory) && x.setStorageByUid(d.uuid, {
                                    ts: (new Date).getTime()
                                });
                                return a
                            },
                            f = {
                                lastModified: void 0,
                                installed: !0,
                                renamed: c.flags.renamed
                            };
                        c.warnings.length || c.flags.ask ? fa.install(a).done(function(a) {
                            a.ok && h();
                            f.installed = a.ok;
                            f.aborted = a.aborted;
                            b.resolve(f)
                        }).fail(function(a) {
                            b.reject(a)
                        }) : (h(), b.resolve(f));
                        return b.promise()
                    },
                    h = s.getDebouncer(1E3),
                    p = {
                        determineSourceURL: function(a, b) {
                            if (!a) return null;
                            var c = s.select([a.downloadURL, a.fileURL], function(a) {
                                if (!a || "file:" !== A.parse(a).protocol) return a
                            })[0];
                            return c && b ? ua(c) : c
                        },
                        determineMetaURL: function(a,
                            b) {
                            if (!a) return null;
                            var c;
                            a.fileURL && (c = a.fileURL.replace(".user.js", ".meta.js"), a.fileURL == c && (c = a.fileURL.replace(".tamper.js", ".meta.js")), a.fileURL == c && (c = null));
                            return (c = s.select([a.updateURL, a.downloadURL, c], function(a) {
                                if (!a || "file:" !== A.parse(a).protocol) return a
                            })[0]) && b ? ua(c) : c
                        },
                        mergeCludes: function(a) {
                            var b, c, d = a.options.override;
                            a.includes = d.merge_includes && d.orig_includes ? d.orig_includes.slice() : [];
                            a.excludes = d.merge_excludes && d.orig_excludes ? d.orig_excludes.slice() : [];
                            a.matches = d.merge_matches &&
                                d.orig_matches ? d.orig_matches.slice() : [];
                            for (b = 0; b < d.use_includes.length; b++) c = a.excludes.indexOf(d.use_includes[b]), 0 <= c && a.excludes.splice(c, 1), a.includes.push(d.use_includes[b]);
                            if ("undefined" !== typeof d.use_matches)
                                for (b = 0; b < d.use_matches.length; b++) c = a.excludes.indexOf(d.use_matches[b]), 0 <= c && a.excludes.splice(c, 1), a.matches.push(d.use_matches[b]);
                            for (b = 0; b < d.use_excludes.length; b++) a.excludes.push(d.use_excludes[b]);
                            return a
                        },
                        doSave: function(a) {
                            return g(a).then(c)
                        },
                        doRemove: function(a, b) {
                            x.removeByUid(a,
                                b);
                            x.setStorageByUid(a, null);
                            R.dropAll(a);
                            return m.Pledge()
                        },
                        doModify: function(a, b, c) {
                            void 0 === c && (c = !0);
                            x.setByUid(a, b, c);
                            return c ? R.loadResources(a, b.resources).then(function() {
                                return R.loadRequires(a, b.requires)
                            }).then(function() {
                                return R.dropAllBut(a, s.map([].concat(b.resources).concat(b.requires), function(a) {
                                    return a.url
                                }))
                            }) : m.Pledge()
                        },
                        exportToJson: function(a, b) {
                            var c = m(),
                                d = v.determineScriptsToRun(null);
                            a && (d = s.select(d, function(b) {
                                return a[b.uuid]
                            }));
                            d = na(d, !0);
                            b && !b.storage || d.forEach(function(a) {
                                a.storage =
                                    x.getStorageByUid(a.uuid)
                            });
                            d = {
                                scripts: d
                            };
                            if (!b || b.global_settings) d.global_settings = q.getValue(n.CONSTANTS.STORAGE.CONFIG, {});
                            c.resolve(d);
                            return c.promise()
                        },
                        importFromJson: function(a) {
                            if (!a || !a.scripts || !a.scripts.length) return m.Breach();
                            for (var b = {}, d = [], h = {}, p = 0, f; f = a.scripts[p]; p++) try {
                                var r = m();
                                "new-user-script" != f.uuid && (f.storage && (h[f.uuid] = f.storage), g({
                                    uuid: f.uuid,
                                    name: f.name,
                                    src: f.source,
                                    force_settings: {
                                        enabled: f.enabled,
                                        position: f.position
                                    },
                                    force_options: f.options,
                                    force_meta: {
                                        lastModified: f.lastModified
                                    },
                                    replace: !0,
                                    url: f.file_url || f.update_url,
                                    ask: !1
                                }).done(function(a) {
                                    b[s.createUUID()] = a;
                                    r.resolve()
                                }).fail(function(a) {
                                    console.warn("import: Error @ script", f.name, a);
                                    r.resolve()
                                }), d.push(r.promise()))
                            } catch (E) {
                                console.log("import: Error while importing script", f.name, E)
                            }
                            var F = function() {
                                var a = m();
                                m.when(d).always(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }().then(function() {
                                return fa.import(b, a.global_settings)
                            }).then(function(a) {
                                var e = m(),
                                    d = [],
                                    g = [];
                                if (a.ok)
                                    for (var k = 0, f; f = a.import_ids[k]; k++)(function() {
                                        var a =
                                            f;
                                        if (b[a]) {
                                            b[a].messages.warnings = [];
                                            var e = c(b[a]).done(function() {
                                                var c;
                                                (c = b[a].script.uuid) && h[c] && (c = x.setStorageByUid(c, {
                                                    data: h[c].data || {},
                                                    ts: (new Date).getTime()
                                                }), g.push(c))
                                            });
                                            d.push(e)
                                        }
                                    })();
                                m.when(d).always(function() {
                                    v.reorderScripts();
                                    m.when(g).always(function() {
                                        e.resolve(a)
                                    })
                                });
                                return e.promise()
                            }).then(function(b) {
                                return a.global_settings && b.global_settings ? (b = q.setValue(n.CONSTANTS.STORAGE.CONFIG, a.global_settings).then(function() {
                                        F.done(function() {
                                            window.setTimeout(V.reset, 1)
                                        });
                                        return m.Pledge({
                                            global_settings: !0
                                        })
                                    }),
                                    q.setTemporary(!0), b) : m.Pledge({})
                            });
                            return F
                        },
                        installFromUrl: function(a, b, c) {
                            var g = m(),
                                f = A.parse(a),
                                t = {
                                    messages: {
                                        errors: [d.getMessage("Unable_to_load_script_from_url_0url0", a)],
                                        warnings: []
                                    }
                                };
                            b = b || {};
                            c = c || {};
                            var r = [a, JSON.stringify(b)].join("_");
                            if (h.is(r)) return D && console.log("scriptman: de-bounced installFromUrl", a), m.Breach();
                            h.add(r);
                            if (!f.protocol.match(/(https?|file):/)) return console.warn("scriptman: can't install from ", a), m.Breach(t);
                            "file:" != f.protocol || n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS ||
                                console.warn("scriptman: Access to local files is forbidden! Loading the following script for installation may fail:", a, "-> more info:", "http://tampermonkey.net/faq.php#Q204");
                            var q = function(a, b) {
                                    if (!a)
                                        if (b) a = t, "file:" != f.protocol || n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || a.messages.warnings.unshift(d.getMessage("Tampermonkey_has_no_file_access_permission_"));
                                        else {
                                            g.reject();
                                            return
                                        }
                                    a.heading = d.getMessage("You_are_about_to_install_a_UserScript_");
                                    c.silent_fail ? g.reject(a) : fa.installError(a).always(function(a) {
                                        g.reject(a)
                                    })
                                },
                                r = function(a) {
                                    q(null, a)
                                };
                            U({
                                method: "GET",
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                url: a
                            }, {
                                onload: function(c) {
                                    if (4 == c.readyState)
                                        if (200 == c.status || 0 == c.status) {
                                            var d = {
                                                url: a,
                                                src: c.responseText,
                                                ask: !0,
                                                replace: !0
                                            };
                                            b && s.each(b, function(a, c) {
                                                d[c] = b[c]
                                            });
                                            p.doSave(d).done(function(a) {
                                                g.resolve(a.installed)
                                            }).fail(q)
                                        } else g.reject()
                                },
                                onerror: r,
                                ontimeout: r
                            });
                            return g.promise()
                        },
                        determineLastPosition: function() {
                            var a = 0;
                            x.getUidList().forEach(function(b) {
                                var c = x.getByUid(b);
                                c.script &&
                                    c.cond ? c.script.position && c.script.position > a && (a = c.script.position) : console.warn("scriptman: inconsistent script entry", b)
                            });
                            var b = new w.Script;
                            b.position > a && (a = b.position);
                            return a
                        },
                        matchUrl: function(a, b, c) {
                            var d, g;
                            try {
                                !c && 1 < b.length && "/" == b.substr(0, 1) ? d = RegExp(".*" + b.replace(/^\//g, "").replace(/\/$/g, "") + ".*", "i") : c ? (g = A.getRegExpFromMatch(b), d = RegExp(g)) : (g = A.getRegExpFromInclude(b, {
                                    tryToFixUrl: f.values.tryToFixUrl,
                                    safeUrls: f.values.safeUrls
                                }), d = RegExp(g, "i"))
                            } catch (h) {
                                return console.warn("scriptman: invalid regexp ",
                                    b), !1
                            }
                            return "" === a.replace(d, "")
                        },
                        validUrl: function(a, b, c) {
                            var d, g = !1;
                            if (b.inc || b.match) {
                                for (d in b.inc)
                                    if ("string" !== typeof b.inc[d]) console.warn("scriptman: include[" + d + '] "' + b.inc[d] + '" ' + (c ? "@" + c + " " : "") + "can't be compared to \"" + a + '"');
                                    else if (p.matchUrl(a, b.inc[d])) {
                                    D && console.log('scriptman: @include "' + b.inc[d] + '" matched' + (c ? " (" + c + ")" : '"'));
                                    g = !0;
                                    break
                                }
                                if (b.match)
                                    for (d in b.match)
                                        if ("string" !== typeof b.match[d]) console.warn("scriptman: match[" + d + '] "' + b.match[d] + '" ' + (c ? "@" + c + " " : "") + "can't be compared to \"" +
                                            a + '"');
                                        else if (p.matchUrl(a, b.match[d], !0)) {
                                    D && console.log('scriptman: @match "' + b.match[d] + '" matched' + (c ? " (" + c + ")" : '"'));
                                    g = !0;
                                    break
                                }
                                if (!g) return g
                            } else g = !0;
                            for (d in b.exc)
                                if (p.matchUrl(a, b.exc[d])) {
                                    D && console.log('scriptman: @exclude "' + b.exc[d] + '" matched' + (c ? " (" + c + ")" : '"'));
                                    g = !1;
                                    break
                                }
                            return g
                        },
                        getEvilness: function(a) {
                            var b = 0;
                            return a.fileURL && (b = Z.getEvilnessOf(a.fileURL)) || a.downloadURL && (b = Z.getEvilnessOf(a.downloadURL)) || a.updateURL && (b = Z.getEvilnessOf(a.updateURL)) ? (D && console.log("scriptman: found blacklisted script",
                                a), b) : 0
                        },
                        blackCheckAll: function() {
                            x.getUidList().forEach(function(a) {
                                var b = x.getByUid(a);
                                if (b.script && b.cond) {
                                    var c = v.getEvilness(b.script);
                                    if (c !== b.script.evilness) {
                                        if (c || void 0 !== b.script.evilness) D && console.log("scriptman: write blacklist state of ", b.script.name, c), c && M.tS(b.script.name, c, "b");
                                        b.script.evilness = c;
                                        p.doModify(a, b.script, !1)
                                    }
                                }
                            })
                        },
                        reorderScripts: function(c, b) {
                            var d = p.determineScriptsToRun();
                            if (c)
                                for (var g = 0; g < d.length; g++) {
                                    var h = d[g];
                                    h.uuid == c && (h.position = Number(b) + (h.position < b ?
                                        0.5 : -0.5))
                                }
                            d = a(d);
                            g = 1;
                            for (h = 0; h < d.length; h++) {
                                var f = d[h];
                                f.position = g++;
                                p.doModify(f.uuid, f, !1)
                            }
                        },
                        getUniqueScriptsForTab: function(a) {
                            var b = [];
                            z.get.empty(a.id) ? console.warn("bg: WARN: Tabs.get.urls[" + a.id + "] is empty!") : s.each(z.get.urls(a.id), function(a, c) {
                                if (ha.isAllowed(c))
                                    for (var e = v.determineScriptsToRun(c), d = 0; d < e.length; d++) {
                                        for (var g = !1, h = 0; h < b.length; h++)
                                            if (b[h].uuid == e[d].uuid) {
                                                g = !0;
                                                break
                                            }
                                        g || b.push(e[d])
                                    }
                            });
                            return b
                        },
                        determineScriptsToRun: function(c) {
                            var b = [];
                            D && console.log("scriptman: determineScriptsToRun @" +
                                c);
                            x.getUidList().forEach(function(a) {
                                if (c) {
                                    var d = q.getValue(n.CONSTANTS.PREFIX.COND + a, null);
                                    if (!d || !p.validUrl(c, d, a)) return
                                }
                                d = x.getByUid(a);
                                d.script && d.cond ? b.push(d.script) : console.warn("scriptman: inconsistent script entry", a, d)
                            });
                            return a(b)
                        },
                        isContexter: function(a) {
                            return a.options && ("context-menu" === a.options.run_at || null === a.options.run_at && "context-menu" === a.options.override.orig_run_at)
                        },
                        determineOrigin: function(a) {
                            if (a = a.fileURL || a.downloadURL || a.updateURL) {
                                var b = a.match(/https?:\/\/userscripts\.org\/scripts\/(source|version)\/([0-9]{1,9})\.user\.js/) ||
                                    a.match(/https?:\/\/userscripts-mirror\.org\/scripts\/(source|version)\/([0-9]{1,9})\.user\.js/);
                                if (b && 3 == b.length) return {
                                    id: b[2],
                                    token: "uso",
                                    url: "http://userscripts-mirror.org/scripts/show/" + b[2],
                                    issue_url: "http://contactbyweb.com/userscripts-mirror"
                                };
                                if ((b = a.match(/https?:\/\/greasyfork\.org\/scripts\/([^/]+)\/code\/.*\.user\.js/)) && 2 == b.length) return {
                                    id: b[1],
                                    token: "gf",
                                    url: "https://greasyfork.org/scripts/" + b[1],
                                    issue_url: "https://greasyfork.org/scripts/" + b[1] + "/feedback"
                                };
                                if ((b = a.match(/https?:\/\/openuserjs\.org\/install\/([^/]+)+\/(.*)\.user\.js/)) &&
                                    3 == b.length) return b.shift(), {
                                    id: b.join("/"),
                                    token: "ouj",
                                    url: "https://openuserjs.org/scripts/" + b[0] + "/" + b[1],
                                    issue_url: "https://openuserjs.org/scripts/" + b[0] + "/" + b[1] + "/issues"
                                };
                                if ((b = a.match(/https?:\/\/monkeyguts\.com\/(codepages\/)?([0-9]{1,9})\.user\.js/)) && 3 == b.length) return {
                                    id: b[2],
                                    token: "mog",
                                    url: "https://monkeyguts.com/code.php?id=" + b[2],
                                    issue_url: "https://monkeyguts.com/code.php?nav=rev&id=" + b[2]
                                };
                                if ((a = a.match(/https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/.*\.user\.js/) || a.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/.*\.user\.js/)) &&
                                    3 == a.length) return a.shift(), {
                                    id: a.join("/"),
                                    token: "gh",
                                    url: "https://github.com/" + a.join("/"),
                                    issue_url: "https://github.com/" + a.join("/") + "/issues"
                                }
                            }
                        }
                    };
                return p
            }(),
            x = function() {
                var a = [],
                    d = {
                        init: function() {
                            q.addDifferentOriginChangeListener(n.CONSTANTS.PREFIX.STORE, function(a, h) {
                                if (h && h.hasOwnProperty("value") && h.origin) {
                                    var f = a.replace(n.CONSTANTS.PREFIX.STORE, ""),
                                        e;
                                    for (e in h.value.data) h.value.data.hasOwnProperty(e) && function() {
                                        var a = e,
                                            c = h.value.data[e];
                                        d.notifyStorageListeners({
                                            uuid: f
                                        }, null, function(e) {
                                            var d = {
                                                data: {},
                                                ts: 0
                                            };
                                            d.data[a] = c;
                                            d.ts = h.value.data.ts;
                                            var g = {
                                                storage: d
                                            };
                                            void 0 === d.data[a] && (g.removed = a);
                                            e(g)
                                        })
                                    }()
                                }
                            })
                        },
                        getUidList: function() {
                            var a = RegExp("^" + n.CONSTANTS.PREFIX.SCRIPT_UID),
                                d = [];
                            q.listValues().forEach(function(g) {
                                -1 != g.search(a) && d.push(g.replace(a, ""))
                            });
                            return d
                        },
                        getUidsByName: function(a, h) {
                            var f = [];
                            d.getUidList().forEach(function(e) {
                                var b = d.getMetaByUid(e);
                                !b || b.name != a || h && h != b.namespace || f.push(e)
                            });
                            return f
                        },
                        getUidByName: function(a) {
                            console.warn("sb: deprecated fn");
                            return d.getUidsByName(a)[0]
                        },
                        getStorageByUid: function(a) {
                            a = q.getValue(n.CONSTANTS.PREFIX.STORE + a, {
                                ts: 0,
                                data: {}
                            });
                            "undefined" === typeof a.ts && (a.ts = 0);
                            "undefined" === typeof a.data && (a.data = {});
                            return a
                        },
                        setStorageByUid: function(a, d) {
                            return d ? q.setValue(n.CONSTANTS.PREFIX.STORE + a, d) : q.deleteValue(n.CONSTANTS.PREFIX.STORE + a)
                        },
                        getMetaByUid: function(a) {
                            return q.getValue(n.CONSTANTS.PREFIX.META + a, null)
                        },
                        getByUid: function(a) {
                            if (!a) return console.error("sb: no UUID set"), {};
                            var d, g = q.getValue(n.CONSTANTS.PREFIX.META + a, null);
                            if (g) {
                                var e =
                                    function(a) {
                                        if (a)
                                            for (var c = 0, d = null; d = a[c]; c++) delete d.loaded, delete d.textContent, delete d.resURL, delete d.resText
                                    };
                                e(g.requires);
                                e(g.resources);
                                g.uuid = a;
                                g.textContent = q.getValue(n.CONSTANTS.PREFIX.SCRIPT + a, g.textContent);
                                g.textContent && (d = g)
                            }
                            return {
                                script: d,
                                cond: q.getValue(n.CONSTANTS.PREFIX.COND + a, null)
                            }
                        },
                        setByUid: function(a, d, g) {
                            var e = {};
                            if (!a) return console.error("sb: no UUID set", d), e;
                            var b = q.getValue(n.CONSTANTS.PREFIX.META + a),
                                k = !b;
                            q.setValue(n.CONSTANTS.PREFIX.SCRIPT_UID + a, d.name);
                            q.setValue(n.CONSTANTS.PREFIX.COND +
                                a, {
                                    inc: d.includes,
                                    match: d.matches,
                                    exc: d.excludes
                                });
                            q.setValue(n.CONSTANTS.PREFIX.SCRIPT + a, d.textContent);
                            d.textContent = null;
                            g && (e.lastModified = (new Date).getTime(), d.lastModified = e.lastModified);
                            q.setValue(n.CONSTANTS.PREFIX.META + a, d);
                            g && (ka.onScriptsChanged(), k ? I.scriptAddedCb(d.name, d) : I.scriptChangedCb(d.name, d, b), f.values && M.tS(d.name, d.fileURL, k ? "i" : "u"));
                            T.items.rundata.removeAll();
                            return e
                        },
                        removeByUid: function(a, h) {
                            void 0 === h && (h = !0);
                            var p = d.getByUid(a);
                            q.deleteValue(n.CONSTANTS.PREFIX.SCRIPT_UID +
                                a);
                            q.deleteValue(n.CONSTANTS.PREFIX.COND + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.SCRIPT + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.META + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.STORE + a);
                            h && (ka.onScriptsChanged(), p.script && p.cond && I.scriptRemovedCb(p.script.name, p.script), f.values && M.tS(p.script.name, null, "r"));
                            T.items.rundata.removeAll();
                            return {}
                        },
                        addStorageListener: function(c, d, g, e, b) {
                            a.push({
                                tabid: c,
                                id: d,
                                uuid: g,
                                time: e,
                                response: b
                            })
                        },
                        removeStorageListeners: function(c, d) {
                            void 0 === d && (d = !0);
                            var g = a;
                            a = [];
                            for (var e in g) {
                                var b =
                                    g[e];
                                try {
                                    void 0 !== c.tabid && c.tabid !== b.tabid || void 0 !== c.uuid && c.uuid !== b.uuid || void 0 !== c.id && c.id !== b.id ? a.push(b) : d && b.response({})
                                } catch (f) {
                                    D && console.debug("sb: listener clear for script", c, "failed! Page reload?!")
                                }
                            }
                        },
                        notifyStorageListeners: function(c, d, g) {
                            c = c || {};
                            d = d || {};
                            for (var e in a) {
                                var b = a[e];
                                try {
                                    void 0 !== d.uuid && b.uuid === d.uuid || void 0 !== d.tabid && b.tabid === d.tabid || void 0 !== d.id && b.id === d.id || void 0 !== c.tabid && c.tabid !== b.tabid || void 0 !== c.uuid && c.uuid !== b.uuid || void 0 !== c.id && c.id !==
                                        b.id || g && g(b.response)
                                } catch (f) {
                                    console.log("sb: listener notification for script", c, "failed! Page reload?!")
                                }
                            }
                        }
                    };
                return d
            }();
        scbr = x;
        var wa = function() {
                var a = function(a, c) {
                    var h = null,
                        f = a.sender,
                        e = this,
                        b = function(b) {
                            try {
                                a.postMessage(b)
                            } catch (c) {}
                        };
                    if ("xhr" == c.method) {
                        var k = function() {
                            a.disconnect()
                        };
                        c.details.convertBinary = !0;
                        c.details.partialSize = c.details.partialSize || n.XMLHTTPREQUEST.PARTIAL_SIZE;
                        var l = {};
                        Object.keys(c.callbacks).forEach(function(a) {
                            l[a] = function(c) {
                                c = {
                                    data: c
                                };
                                c[a] = !0;
                                b(c);
                                "ondone" ===
                                a && k()
                            }
                        });
                        l.ondone || (l.ondone = k);
                        ba(c.details, l)
                    } else if ("download" == c.method) H.start(c.details, {
                        onload: function(a) {
                            b({
                                load: !0,
                                data: a
                            })
                        },
                        onprogress: function(a) {
                            b({
                                progress: !0,
                                data: a
                            })
                        },
                        onerror: function(a) {
                            b({
                                error: !0,
                                data: a
                            })
                        },
                        ontimeout: function(a) {
                            b({
                                timeout: !0,
                                data: a
                            })
                        },
                        ondone: function() {
                            a.disconnect()
                        }
                    });
                    else if ("addStorageListener" == c.method) f.tab ? (x.addStorageListener(f.tab.id, c.id, c.uuid, (new Date).getTime(), b), h = function() {
                        x.removeStorageListeners({
                            uuid: c.uuid,
                            id: c.id
                        }, !1)
                    }) : (console.log(d.getMessage("Unable_to_load_storage_due_to_empty_tabID_")),
                        b({
                            error: !0
                        }));
                    else if ("removeStorageListener" == c.method) f.tab ? (x.removeStorageListeners({
                        uuid: c.uuid,
                        id: c.id
                    }), b({
                        error: !1
                    })) : (console.warn("Unable to remove storage listener due to empty tabID!"), b({
                        error: !0
                    }));
                    else if ("saveStorageKey" == c.method) f.tab ? c.uuid && (f = x.getStorageByUid(c.uuid), f.data[c.key] = c.value, f.ts = c.ts, x.setStorageByUid(c.uuid, f), x.notifyStorageListeners({
                        uuid: c.uuid
                    }, {
                        id: c.id
                    }, function(a) {
                        var b = {
                            data: {},
                            ts: 0
                        };
                        b.data[c.key] = c.value;
                        b.ts = c.ts;
                        var d = {
                            storage: b
                        };
                        void 0 === b.data[c.key] &&
                            (d.removed = c.key);
                        a(d)
                    })) : console.log(d.getMessage("Unable_to_save_storage_due_to_empty_tabID_")), b({});
                    else if ("openInTab" == c.method) {
                        var h = ["active"],
                            u = {
                                url: c.details.url
                            };
                        if (c.details.options) {
                            for (var m = 0; m < h.length; m++) void 0 !== c.details.options[h[m]] && (u[h[m]] = c.details.options[h[m]]);
                            c.details.options.insert && (u.index = f.tab.index + 1)
                        }
                        h = function() {
                            e.disconnected = !0;
                            e.tabId && delete X[e.tabId]
                        };
                        rea.tabs.create(u, function(a) {
                            e.tabId = a.id;
                            X[a.id] = {
                                onClose: function() {
                                    b({
                                        close: !0
                                    })
                                }
                            };
                            b({
                                success: !0,
                                tabId: a.id
                            })
                        })
                    } else if ("nameTab" == c.method) {
                        if (e.tabId) {
                            var r = 3,
                                q = function() {
                                    z.listeners.once.whenReady(e.tabId, function() {
                                        rea.tabs.sendMessage(e.tabId, {
                                            method: "setForeignAttr",
                                            attr: "name",
                                            value: c.name
                                        }, function(a) {
                                            a ? b({
                                                name: c.name
                                            }) : 0 < r-- ? q() : D && console.warn("foreignAttr: error setting attr")
                                        })
                                    })
                                };
                            q()
                        }
                    } else "closeTab" == c.method ? (e.tabId && X[e.tabId] && rea.tabs.remove(e.tabId), b({}), window.setTimeout(function() {
                            try {
                                e.disconnected || a.disconnect()
                            } catch (b) {}
                            e.disconnected = !0
                        }, 1E3)) : "registerMenuCmd" ==
                        c.method && (f.tab ? ($.add(f.tab.id, f.tab.url, c.name, c.accessKey, c.menuId, b), va(), h = function() {
                            $.clearById(c.menuId);
                            va()
                        }) : (console.log("Unable to register menu cmd due to empty tabID!"), b({
                            run: !1
                        })));
                    h && a.onDisconnect.addListener(h)
                };
                return function(d) {
                    if (C.late) {
                        var c = {};
                        d.onMessage.addListener(function(h) {
                            a.apply(c, [d, h])
                        })
                    } else C.registerLateCallback(function() {
                        wa(d)
                    })
                }
            }(),
            da = {
                ping: {
                    allow: {
                        insecure: !0
                    },
                    exec: function(a, d, c) {
                        c({
                            pong: !0,
                            instanceID: qa,
                            config: {
                                layout: f.values.layout
                            }
                        })
                    }
                },
                newTab: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        rea.tabs.create({
                            url: a.url
                        }, function(a) {
                            c({
                                tabId: a.id
                            })
                        })
                    }
                },
                getTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        d.tab && a.uid ? (O[d.tab.id] || (O[d.tab.id] = {}), O[d.tab.id][a.uid] || (O[d.tab.id][a.uid] = {}), c({
                            data: O[d.tab.id][a.uid]
                        })) : (console.log("bg: unable to process request", d, a), c({
                            data: null
                        }))
                    }
                },
                getTabs: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        if (a.uid) {
                            d = {};
                            for (var h in O) d[h] = {}, d[h] = O[h][a.uid];
                            c({
                                data: d
                            })
                        } else console.log("bg: unable to process request", d, a), c({
                            data: null
                        })
                    }
                },
                setTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        if (d.tab && a.uid) {
                            O[d.tab.id] || (O[d.tab.id] = {});
                            var h = {},
                                f;
                            for (f in a.tab) h[f] = a.tab[f];
                            O[d.tab.id][a.uid] = h
                        } else console.log("bg: unable to process request", d, a);
                        c({})
                    }
                },
                closeTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        var h = d && d.tab ? d.tab.id : null;
                        h ? rea.tabs.query({
                            windowType: "normal"
                        }, function(a) {
                            1 >= a.length ? (console.warn("bg:", "refused to close last tab!"), c({
                                error: "refused to close last tab!"
                            })) : rea.tabs.remove(h, function() {
                                c({})
                            })
                        }) : c({
                            error: "internal error"
                        })
                    }
                },
                copyToClipboard: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        d.tab ? oa.copy(a.data) : console.log("bg: unable to process request", d, a);
                        c({})
                    }
                },
                setOption: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        d = "options" == d.extpage || "options" == a.origin;
                        f.values[a.name] = a.value;
                        d ? W.create("options.settings").done(function(a) {
                            c({
                                items: a,
                                options: f.values
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: f.values
                            })
                        }) : c({})
                    }
                },
                reportAnIssue: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        var h, f, e;
                        a.uuid && (h = x.getByUid(a.uuid)) && h.script && h.cond && (d = v.determineOrigin(h.script),
                            "author" == a.to && h.script.supportURL ? (f = {
                                url: h.script.supportURL
                            }, e = d ? [a.to, d.token, d.id].join(":") : [a.to, f.url].join(":")) : d && (f = d, e = [f.token, f.id].join(":")), f && (M.tS(h.script.name, e, "m"), rea.tabs.create({
                                url: f.issue_url || f.url,
                                active: !0
                            }, function() {})));
                        c({})
                    }
                },
                begEvent: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        if ("dialog" == a.action) aa.dialog.shown(a.extra);
                        else if ("clicked" == a.action) {
                            var h, f;
                            a.extra && (h = a.extra.amount, f = a.extra.currency);
                            aa.clicked(a.type, h, f)
                        } else if (aa.button[a.action]) aa.button[a.action](a.extra);
                        else console.log("bg: Warning: unknown request ", a);
                        c({})
                    }
                },
                buttonPress: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        var h = function() {
                            c({})
                        };
                        if ("reset_simple" == a.name) V.reset(h);
                        else if ("reset_factory" == a.name) V.factoryReset(h);
                        else if ("create_tesla_data" == a.name) I.createTeslaData().done(function(a) {
                            oa.copy({
                                content: L.UTF8.encode(a.join("<br>")),
                                type: "html"
                            });
                            h()
                        });
                        else if ("reset_chrome_sync" == a.name) I.reset().always(h);
                        else if ("install_tests" == a.name)(d = ca.framework.prepare(v.doSave, n.RUNTIME.BROWSER,
                            h)) && console.error(d);
                        else if ("enabled" == a.name) f.values[a.name] = !f.values[a.name], c({});
                        else if ("installFromUrl" == a.name) v.installFromUrl(a.data).always(function() {
                            c({})
                        });
                        else if ("externals_delete" == a.name) R.cleanElement(a.scriptuid, a.url), W.create("options.scripts").done(function(a) {
                            c({
                                items: a,
                                options: f.values
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: f.values
                            })
                        });
                        else if ("run_script_updates" == a.name)
                            if (a.scriptuid) {
                                var p;
                                ja.check(!0, !1, a.scriptuid).done(function(a) {
                                    p = a
                                }).always(function() {
                                    c({
                                        scriptuid: a.scriptuid,
                                        updatable: p
                                    })
                                })
                            } else ja.check(!0, !0), c({});
                        else console.log("bg: Warning: unknown button " + a.name), c({})
                    }
                },
                loadTree: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        W.create(a.referrer, {
                            complete: a.complete,
                            uuid: a.uuid
                        }).done(function(a) {
                            c({
                                items: a,
                                i18n: f.values.i18n,
                                options: f.values,
                                begging: aa.needed()
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: f.values
                            })
                        })
                    }
                },
                modifyScriptOptions: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        if (a.uuid) {
                            var h = "options" == d.extpage || "options" == a.origin,
                                p = void 0 == a.reload || !0 == a.reload,
                                e = x.getByUid(a.uuid);
                            if (e.script && e.cond) {
                                var b = !1,
                                    k = new w.Script;
                                Object.keys(k.options).forEach(function(b) {
                                    "undefined" !== typeof a[b] && (e.script.options[b] = a[b])
                                });
                                Object.keys(k.options.override).forEach(function(c) {
                                    -1 != c.search("merge_") && "undefined" !== typeof a[c] && (e.script.options.override[c] = a[c], b = !0)
                                });
                                "undefined" !== typeof a.enabled && (e.script.enabled = a.enabled);
                                "undefined" !== typeof a.includes && (e.script.options.override.use_includes = a.includes, e.script.options.override.use_excludes = a.excludes,
                                    e.script.options.override.use_matches = a.matches, b = !0);
                                b && (e.script = v.mergeCludes(e.script));
                                v.doModify(e.script.uuid, e.script).done(function() {
                                    p ? (void 0 !== a.position && v.reorderScripts(a.uuid, a.position), h ? da.loadTree.exec({
                                        referrer: "options.scripts"
                                    }, d, c) : rea.tabs.getSelected(null, function(b) {
                                        W.create("actions").done(function(a) {
                                            c({
                                                items: a,
                                                i18n: f.values.i18n,
                                                options: {
                                                    enabled: f.values.enabled,
                                                    layout: f.values.layout
                                                }
                                            })
                                        }).fail(function() {
                                            c({
                                                i18n: f.values.i18n,
                                                options: {
                                                    enabled: f.values.enabled,
                                                    layout: f.values.layout
                                                }
                                            })
                                        });
                                        a.uuid && f.values.autoReload && rea.tabs.sendMessage(b.id, {
                                            method: "reload",
                                            frameId: 0
                                        }, function() {})
                                    })) : c({})
                                }).fail(function() {
                                    c({})
                                });
                                return !0
                            }
                        }
                        c({})
                    }
                },
                modifyNativeScript: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, g, c) {
                        if (a.nid) {
                            var h = void 0 == a.reload || !0 == a.reload;
                            N.getUserscriptById(a.nid).then(function(c) {
                                if (c)
                                    if ("installed" == a.actionid) {
                                        if ("false" == a.value) return N.uninstall(c)
                                    } else {
                                        if ("enabled" == a.actionid) return N.setEnabled(c, a.value);
                                        if ("imported" == a.actionid && "true" == a.value) {
                                            var e = N.getUserscriptSource(c);
                                            if (e) return v.doSave({
                                                src: e,
                                                ask: !0,
                                                replace: !0
                                            }).then(function(a) {
                                                if (a.installed) {
                                                    if ("disable" == f.values.native_import_post_action) return N.setEnabled(c, !1);
                                                    if ("uninstall" == f.values.native_import_post_action) return N.uninstall(c)
                                                }
                                            });
                                            rea.tabs.sendMessage(g.tab.id, {
                                                method: "showMsg",
                                                msg: d.getMessage("Please_double_check_the_native_script_import_settings__")
                                            }, function() {})
                                        }
                                    } else h = !1;
                                return m.Pledge()
                            }).always(function() {
                                h ? da.loadTree.exec({
                                    referrer: "options.scripts"
                                }, g, c) : c({})
                            });
                            return !0
                        }
                        c({})
                    }
                },
                saveScript: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, g, c) {
                        var h = void 0 === a.reload || !!a.reload,
                            p = function(a) {
                                h ? W.create("options.scripts").done(function(b) {
                                    a.items = b;
                                    a.options = f.values;
                                    c(a)
                                }).fail(function(a) {
                                    c({
                                        error: a,
                                        options: f.values
                                    })
                                }) : c({})
                            };
                        if (a.clean) {
                            D && console.debug("bg: clean userscript " + a.uuid);
                            g = x.getByUid(a.uuid);
                            var e = function(b) {
                                W.create("options.scripts").done(function(d) {
                                    c({
                                        cleaned: b.installed,
                                        items: d,
                                        options: f.values
                                    });
                                    b.installed && x.notifyStorageListeners({
                                        uuid: a.uuid
                                    }, null, function(b) {
                                        b({
                                            storage: x.getStorageByUid(a.uuid)
                                        })
                                    })
                                }).fail(function(a) {
                                    c({
                                        error: a,
                                        options: f.values
                                    })
                                })
                            };
                            g.script && g.cond ? v.doSave({
                                name: a.name,
                                uuid: a.uuid,
                                src: g.script.textContent,
                                clean: !0,
                                ask: !0,
                                save: !0
                            }).always(function(a) {
                                e(a || {
                                    installed: !1
                                })
                            }) : (console.error(d.getMessage("fatal_error") + " (" + a.uuid + ")!!!"), e({
                                installed: !1
                            }))
                        } else if (a.code) {
                            var b = c;
                            h && (b = function(a) {
                                v.reorderScripts();
                                p(a)
                            });
                            a.new_script && (a.uuid = s.createUUID());
                            v.doSave({
                                name: a.name,
                                uuid: a.uuid,
                                force_url: a.force_url,
                                src: a.code,
                                ask: !f.values.editor_easySave,
                                lastModified: a.lastModified,
                                save: !0
                            }).always(function(a) {
                                b(a || {
                                    installed: !1
                                })
                            })
                        } else v.doRemove(a.uuid), v.reorderScripts(), p({})
                    }
                },
                exportToJson: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        v.exportToJson(a.ids, a.options).done(function(a) {
                            c({
                                json: a
                            })
                        }).fail(function() {
                            c({})
                        })
                    }
                },
                importFromJson: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, g, c) {
                        var h = void 0 === a.reload || !!a.reload;
                        v.importFromJson(a.json).fail(function(a) {
                            c({
                                error: a || d.getMessage("An_error_occured_during_import_")
                            })
                        }).done(function(a) {
                            var d = {
                                reload: a.global_settings
                            };
                            h && !d.reload ? W.create("options.scripts").done(function(a) {
                                d.items =
                                    a;
                                d.options = f.values;
                                c(d)
                            }).fail(function(a) {
                                c({
                                    error: a,
                                    options: f.values
                                })
                            }) : c(d)
                        })
                    }
                },
                askCom: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        fa.onMessage(a.data).always(function(a) {
                            a.i18n = f.values.i18n;
                            a.options = {
                                statistics_enabled: f.values.statistics_enabled
                            };
                            a.ext = {
                                version: rea.extension.manifest.version
                            };
                            c(a)
                        })
                    }
                },
                installScript: {
                    allow: {
                        insecure: !0
                    },
                    exec: function(a, g, c) {
                        if (g.tab) {
                            var h = {};
                            v.installFromUrl(a.url, {}, {
                                silent_fail: !0
                            }).done(function(a) {
                                h = {
                                    data: null,
                                    found: !0,
                                    installed: a
                                }
                            }).fail(function(a) {
                                h.err =
                                    a && a.messages && a.messages.errors ? a.messages.errors[0] : d.getMessage("Unable_to_parse_this_")
                            }).always(function() {
                                c(h)
                            })
                        } else console.log(d.getMessage("Unable_to_install_script_due_to_empty_tabID_"))
                    }
                },
                execMenuCmd: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        (a = $.getById(a.id)) ? a.response({
                            run: !0,
                            menuId: a.id
                        }): console.error("bg: Error: unable to find MC id " + a.id);
                        c({})
                    }
                },
                getWebRequestInfo: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        d.tab ? c({
                            webRequest: K
                        }) : (console.log("Unable to run scripts due to empty tab id"),
                            c({}))
                    }
                },
                unLoad: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d) {
                        a.topframe || a.id && z.events.unload(d.tab.id, d.tab.frameId, a.id)
                    }
                },
                prepare: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, c) {
                        if (d.tab) {
                            var h = a.topframe ? 0 : null,
                                p = A.woHash(a.url);
                            z.events.run(d.tab.id, h, a.id, p, function(e) {
                                e = s.select(e, function(a) {
                                    return a
                                });
                                var b = [{
                                        m: "native",
                                        t: [H.staticVars.DEFAULT, H.staticVars.NATIVE]
                                    }, {
                                        m: "disabled",
                                        t: [H.staticVars.OFF]
                                    }, {
                                        m: "browser",
                                        t: [H.staticVars.CHROME]
                                    }].filter(function(a) {
                                        if (-1 != a.t.indexOf(f.values.downloads_mode)) return !0
                                    }).map(function(a) {
                                        return a.m
                                    })[0] ||
                                    "disabled",
                                    b = {
                                        scripts: e,
                                        contexters: ka.getContexterCount(),
                                        raw: {},
                                        inIncognitoContext: rea.extension.inIncognitoContext,
                                        downloadMode: b,
                                        enforce_strict_mode: "on" == f.values.runtime_strict_mode,
                                        use_strong_mode: "on" == f.values.runtime_strong_mode,
                                        logLevel: f.values.logLevel,
                                        version: rea.extension.manifest.version
                                    };
                                if (a.raw && e.length)
                                    for (e = 0; e < a.raw.length; e++) b.raw[a.raw[e]] = Registry.getRaw(a.raw[e]);
                                c(b);
                                S.setIcon(d.tab.id);
                                S.setBadge(d.tab.id)
                            });
                            return !0
                        }
                        c({});
                        return !1
                    }
                },
                scriptBlockerDetected: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, g, c) {
                        a.xml_style_detected || -1 != a.url.search("\\.xml$") ? console.warn("blocker: unable to get unsafeWindow...") : G.requestPermissionEx(function(a, g) {
                            var e = a && g ? d.getMessage("Please_reload_this_page_in_order_to_run_your_userscripts_") : null;
                            c({
                                alert: e
                            })
                        });
                        z.set.blocker(g.tab.id);
                        S.setIcon(g.tab.id)
                    }
                },
                notification: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        var h = a.image ? a.image : rea.extension.getURL("images/icon128.png");
                        (function() {
                            var c = m();
                            a.highlight && d.tab ? P.highlight(d.tab.id,
                                c.resolve) : c.resolve();
                            return c.promise()
                        })().then(function() {
                            var c = m();
                            a.text ? P.show(a.title, a.text, h, a.timeout, c.resolve) : c.resolve();
                            return c.promise()
                        }).always(function(a) {
                            c({
                                clicked: a && a.clicked
                            })
                        })
                    }
                },
                syntaxCheck: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, d, c) {
                        (function() {
                            var a = m();
                            Registry.require("hinter", function() {
                                a.resolve(Registry.get("hinter"))
                            });
                            return a.promise()
                        })().then(function(c) {
                            return c.hint(a.code, {
                                maxerr: 999
                            }, {})
                        }).always(function(a) {
                            c({
                                errors: a
                            })
                        })
                    }
                },
                handler: function(a, d,
                    c) {
                    if (!C.late) return C.registerLateCallback(function() {
                        da.handler(a, d, c)
                    }), !0;
                    var h = da[a.method];
                    if (h)
                        if (h.allow && h.exec) {
                            var f = rea.runtime.id,
                                f = !n.REQUESTS.HAS_SENDER_ID && d.tab || d.id === f,
                                e = null,
                                b = n.REQUESTS.INTERNAL_PAGE_PROTOCOL + "//",
                                k = n.REQUESTS.GET_INTERNAL_PAGE_REGEXP(),
                                l = d.url ? d.url : d.tab ? d.tab.url : null,
                                b = f && l && 0 == l.search(b);
                            f && b && (d.tab ? (k = d.tab.url.match(k)) && 2 == k.length && (e = k[1]) : e = "*", d.extpage = e);
                            k = "options" == e;
                            if ("background" == e || h.allow.insecure || h.allow.extpage && b || h.allow.options &&
                                k || h.allow.script && f && !b) {
                                if (h = h.exec(a, d, c), void 0 !== h) return h
                            } else return (!1 !== a.topframe || !b && !k) && D && console.warn("back: this context doesn't have the permission to call \"" + a.method + '"'), !1
                        } else return console.log("b: invalid implementation of " + a.method), !1;
                    else return console.log("back: unknown method " + a.method), !1;
                    return !0
                }
            },
            Ea = function() {
                var a = [],
                    g = ["test"],
                    c = !1;
                return {
                    getLayouts: function() {
                        c || (a.push({
                            name: d.getMessage("Default"),
                            value: "default"
                        }), Registry.isDevVersion("helper") && g.forEach(function(c) {
                            Registry.getRaw("layout/" +
                                c + "/options.js") && a.push({
                                name: c.charAt(0).toUpperCase() + c.slice(1),
                                value: c
                            })
                        }), c = !0);
                        return a
                    }
                }
            }(),
            $ = function() {
                var a = [];
                return {
                    add: function(d, c, f, p, e, b) {
                        a.push({
                            tabId: d,
                            url: c,
                            name: f,
                            accessKey: p,
                            id: e,
                            response: b
                        })
                    },
                    list: function() {
                        return a
                    },
                    listByTabId: function(d) {
                        var c = {};
                        return a.filter(function(a) {
                            return a.tabId == d && !c[a.name] && (c[a.name] = !0)
                        })
                    },
                    clearByTabId: function(d) {
                        a = a.filter(function(a) {
                            return a.tabId != d
                        })
                    },
                    getByTabId: function(d) {
                        return a.filter(function(a) {
                            return a.tabId == d
                        })[0]
                    },
                    clearById: function(d) {
                        a =
                            a.filter(function(a) {
                                return a.id != d
                            })
                    },
                    getById: function(d) {
                        return a.filter(function(a) {
                            return a.id == d
                        })[0]
                    }
                }
            }(),
            Fa = function() {
                return {
                    create: function() {
                        var a, g, c, h, p, e, b, k, l, u, m, r, q, F;
                        u = null;
                        a = {
                            name: d.getMessage("General"),
                            sub_menu_item: !0,
                            items: []
                        };
                        a.items.push({
                            name: d.getMessage("Config_Mode"),
                            id: "configMode",
                            level: 0,
                            option: !0,
                            select: [{
                                name: d.getMessage("Novice"),
                                value: 0
                            }, {
                                name: d.getMessage("Beginner"),
                                value: 50
                            }, {
                                name: d.getMessage("Advanced"),
                                value: 100
                            }],
                            value: f.values.configMode,
                            desc: d.getMessage("Changes_the_number_of_visible_config_options")
                        });
                        a.items.push({
                            name: "Language",
                            id: "i18n",
                            level: 0,
                            option: !0,
                            reload: !0,
                            warning: {
                                msg: d.getMessage("A_reload_is_required")
                            },
                            select: [{
                                name: "Browser Default",
                                value: null
                            }, {
                                name: d.getOriginalMessage("English"),
                                value: "en"
                            }, {
                                name: d.getOriginalMessage("German"),
                                value: "de"
                            }, {
                                name: d.getOriginalMessage("French"),
                                value: "fr"
                            }, {
                                name: d.getOriginalMessage("Italian"),
                                value: "it"
                            }, {
                                name: d.getOriginalMessage("Russian"),
                                value: "ru"
                            }, {
                                name: d.getOriginalMessage("Czech"),
                                value: "cs"
                            }, {
                                name: d.getOriginalMessage("Polish"),
                                value: "pl"
                            }, {
                                name: d.getOriginalMessage("Spanish"),
                                value: "es"
                            }, {
                                name: d.getOriginalMessage("Magyar"),
                                value: "hu"
                            }, {
                                name: d.getOriginalMessage("Portuguese_Brazil"),
                                value: "pt-br"
                            }, {
                                name: d.getOriginalMessage("Chinese__Simplified_"),
                                value: "zh_CN"
                            }, {
                                name: d.getOriginalMessage("Chinese__Traditional_"),
                                value: "zh_TW"
                            }, {
                                name: d.getOriginalMessage("Japanese"),
                                value: "ja"
                            }],
                            value: f.values.i18n,
                            validation: {
                                image: "info",
                                opacity: 0.9,
                                msg: d.getMessage("Your_language_is_not_supported__Click_here_to_get_intructions_how_to_translate_TM_"),
                                url: "http://tampermonkey.net/faq.php#Q500"
                            }
                        });
                        a.items.push({
                            name: d.getMessage("Make_includes_more_safe"),
                            id: "safeUrls",
                            level: 60,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.safeUrls,
                            desc: d.getMessage("Includes_more_safe_example")
                        });
                        a.items.push({
                            name: d.getMessage("Fix_includes"),
                            id: "tryToFixUrl",
                            level: 60,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.tryToFixUrl,
                            desc: d.getMessage("Fix_includes_example")
                        });
                        a.items.push({
                            name: d.getMessage("Auto_reload_on_script_enabled"),
                            level: 20,
                            id: "autoReload",
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.autoReload,
                            desc: d.getMessage("Auto_reload_on_script_enabled_desc")
                        });
                        a.items.push({
                            name: d.getMessage("Anonymous_statistics"),
                            level: 0,
                            id: "statistics_enabled",
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.statistics_enabled,
                            desc: d.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics_via_Google_Analytics")
                        });
                        a.items.push({
                            name: d.getMessage("Debug_scripts"),
                            level: 100,
                            id: "debug",
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.debug,
                            desc: ""
                        });
                        a.items.push({
                            name: d.getMessage("Show_fixed_source"),
                            level: 100,
                            id: "showFixedSrc",
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.showFixedSrc,
                            desc: ""
                        });
                        a.items.push({
                            name: d.getMessage("LogLevel"),
                            id: "logLevel",
                            level: 0,
                            option: !0,
                            select: [{
                                name: d.getMessage("Debug"),
                                value: 60
                            }, {
                                name: d.getMessage("Error"),
                                value: 0
                            }],
                            value: f.values.logLevel,
                            desc: ""
                        });
                        n.OPTIONS.NATIVE_SCRIPT_IMPORT && (g = {
                            name: d.getMessage("Native_Script_Import"),
                            sub_menu_item: !0,
                            need_save: !0,
                            items: []
                        }, u = {}, f.values.native_import && (u = !0 === n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS ? {
                            image: "button_ok",
                            msg: d.getMessage("TM_has_access_to_file_URIs")
                        } : {
                            image: "critical",
                            msg: d.getMessage("Tampermonkey_needs_access_to_file_URIs__Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q204"
                        }), g.items.push({
                            name: d.getMessage("Enable_Native_Script_Import"),
                            id: "native_import",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.native_import,
                            validation: u
                        }), g.items.push({
                            name: d.getMessage("Post_Import_Action"),
                            id: "native_import_post_action",
                            level: 0,
                            option: !0,
                            select: [{
                                name: d.getMessage("None"),
                                value: "none"
                            }, {
                                name: d.getMessage("Disable_Extension"),
                                value: "disable"
                            }, {
                                name: d.getMessage("Uninstall_Extension"),
                                value: "uninstall"
                            }],
                            value: f.values.native_import_post_action,
                            desc: d.getMessage("What_action_should_be_done_after_a_native_userscript_was_imported_sucessfully_")
                        }), u = {}, f.values.native_import && (u = N.isPathValid() ? {
                            image: "button_ok",
                            msg: d.getMessage("Everything_is_setup_correctly_")
                        } : {
                            image: "critical",
                            msg: d.getMessage("Tampermonkey_needs_to_know_the_absolute_path_to_your_browser_profile_folder_Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q205"
                        }), g.items.push({
                            name: d.getMessage("Browser_Profile_Path"),
                            id: "native_import_path",
                            level: 0,
                            option: !0,
                            text: !0,
                            width: 2,
                            value: f.values.native_import_path,
                            validation: u
                        }));
                        n.OPTIONS.HAS_TESLA && (r = {
                            name: d.getMessage("TESLA"),
                            sub_menu_item: !0,
                            level: 50,
                            need_save: !0,
                            items: []
                        }, r.items.push({
                            name: d.getMessage("Enable_TESLA"),
                            id: "sync_enabled",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.sync_enabled,
                            desc: d.getMessage("Tampermonkey_External_Script_List_Access")
                        }), c = [{
                            name: "pastebin.com",
                            value: J.types.ePASTEBIN,
                            enable: {
                                sync_id: !0,
                                sync_version: !1,
                                create_tesla_data: !0
                            }
                        }, {
                            name: "Chrome Sync",
                            value: J.types.eCHROMESYNC,
                            enable: {
                                sync_id: !1,
                                sync_version: !0,
                                create_tesla_data: !1
                            }
                        }], n.SYNC.GOOGLE_DRIVE.SUPPORTED && c.push({
                            name: "Google Drive (Beta)",
                            value: J.types.eGOOGLEDRIVE,
                            enable: {
                                sync_id: !1,
                                sync_version: !1,
                                create_tesla_data: !1
                            }
                        }), r.items.push({
                            name: d.getMessage("Sync_Type"),
                            id: "sync_type",
                            enabler: !0,
                            level: 50,
                            option: !0,
                            select: c,
                            value: f.values.sync_type
                        }), r.items.push({
                            name: d.getMessage("Sync_Id"),
                            id: "sync_id",
                            enabledBy: "sync_type",
                            level: 50,
                            text: !0,
                            value: f.values.sync_id,
                            option: !0
                        }), r.items.push({
                            name: d.getMessage("Sync_Version"),
                            id: "sync_version",
                            enabledBy: "sync_type",
                            level: 50,
                            option: !0,
                            select: [{
                                name: "v1 - Legacy",
                                value: 1
                            }, {
                                name: "v2 - Beta",
                                value: 2,
                                warning: {
                                    msg: d.getMessage("This_sync_version_may_multiply_each_script_that_is_present_at_more_than_one_Tampermonkey_instance__Do_you_really_want_to_continue_")
                                }
                            }],
                            value: f.values.sync_version,
                            desc: d.getMessage("Different_sync_versions_are_not_compatible_to_each_other_")
                        }), r.items.push({
                            name: d.getMessage("Create_Exportable_Data"),
                            id: "create_tesla_data",
                            enabledBy: "sync_type",
                            button: !0,
                            ignore: !0,
                            level: 60,
                            warning: {
                                msg: d.getMessage("Copy_exportable_data_to_clipboard_Ok_")
                            }
                        }));
                        e = {
                            name: d.getMessage("Appearance"),
                            sub_menu_item: !0,
                            items: []
                        };
                        e.items.push({
                            name: d.getMessage("Layout"),
                            id: "layout",
                            level: 0,
                            option: !0,
                            select: Ea.getLayouts(),
                            value: f.values.layout,
                            desc: ""
                        });
                        u = {};
                        "off" == f.values.notification_showUpdate && (u = {
                            image: "critical",
                            msg: d.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")
                        });
                        e.items.push({
                            name: d.getMessage("Update_Notification"),
                            id: "notification_showUpdate",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Off"),
                                value: "off"
                            }, {
                                name: d.getMessage("Show_notification"),
                                value: "notification"
                            }, {
                                name: d.getMessage("Open_changelog"),
                                value: "changelog"
                            }],
                            value: f.values.notification_showUpdate,
                            validation: u
                        });
                        b = {
                            name: d.getMessage("Action_Menu"),
                            sub_menu_item: !0,
                            items: [],
                            level: 50
                        };
                        b.items.push({
                            name: d.getMessage("Hide_disabled_scripts"),
                            id: "action_menu_scripts_hide_disabled",
                            level: 100,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.action_menu_scripts_hide_disabled,
                            desc: ""
                        });
                        b.items.push({
                            name: d.getMessage("Columns"),
                            id: "action_menu_columns",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("1"),
                                value: "1"
                            }, {
                                name: d.getMessage("2"),
                                value: "2"
                            }, {
                                name: d.getMessage("3"),
                                value: "3"
                            }].filter(function(a) {
                                return a.value <= n.ACTIONMENU.COLUMNS
                            }),
                            value: f.values.action_menu_columns
                        });
                        b.items.push({
                            name: d.getMessage("Script_order"),
                            id: "action_menu_scripts_sort",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Position_"),
                                value: "position"
                            }, {
                                name: d.getMessage("Name"),
                                value: "name"
                            }, {
                                name: d.getMessage("Enabled"),
                                value: "enabled"
                            }],
                            value: f.values.action_menu_scripts_sort
                        });
                        b.items.push({
                            name: d.getMessage("Icon_badge_info"),
                            id: "appearance_badges",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Off"),
                                value: "off"
                            }, {
                                name: d.getMessage("Running_scripts"),
                                value: "running"
                            }, {
                                name: d.getMessage("Unique_running_scripts"),
                                value: "running_unique"
                            }, {
                                name: d.getMessage("Disabled_scripts"),
                                value: "disabled"
                            }],
                            value: f.values.appearance_badges
                        });
                        b.items.push({
                            name: d.getMessage("Icon_badge_color"),
                            id: "appearance_badge_color",
                            level: 100,
                            color: !0,
                            value: f.values.appearance_badge_color
                        });
                        c = {
                            name: d.getMessage("Editor"),
                            sub_menu_item: !0,
                            level: 20,
                            need_save: !0,
                            items: [],
                            warning: {
                                msg: d.getMessage("A_reload_is_required")
                            },
                            reload: !0
                        };
                        c.items.push({
                            name: d.getMessage("Enable_Editor"),
                            id: "editor_enabled",
                            level: 100,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.editor_enabled,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("Key_Mapping"),
                            id: "editor_keyMap",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Windows"),
                                value: "windows"
                            }, {
                                name: d.getMessage("Emacs"),
                                value: "emacs"
                            }, {
                                name: d.getMessage("Vim"),
                                value: "vim"
                            }],
                            value: f.values.editor_keyMap
                        });
                        c.items.push({
                            name: d.getMessage("Indentation_Width"),
                            id: "editor_indentUnit",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("1"),
                                value: 1
                            }, {
                                name: d.getMessage("2"),
                                value: 2
                            }, {
                                name: d.getMessage("3"),
                                value: 3
                            }, {
                                name: d.getMessage("4"),
                                value: 4
                            }, {
                                name: d.getMessage("5"),
                                value: 5
                            }, {
                                name: d.getMessage("6"),
                                value: 6
                            }, {
                                name: d.getMessage("7"),
                                value: 7
                            }, {
                                name: d.getMessage("8"),
                                value: 8
                            }, {
                                name: d.getMessage("9"),
                                value: 9
                            }, {
                                name: d.getMessage("10"),
                                value: 10
                            }, {
                                name: d.getMessage("11"),
                                value: 11
                            }],
                            value: f.values.editor_indentUnit,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("Indent_with"),
                            id: "editor_indentWithTabs",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Tabs"),
                                value: "tabs"
                            }, {
                                name: d.getMessage("Spaces"),
                                value: "spaces"
                            }],
                            value: f.values.editor_indentWithTabs,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("TabMode"),
                            id: "editor_tabMode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Classic"),
                                value: "classic"
                            }, {
                                name: d.getMessage("Smart"),
                                value: "smart"
                            }, {
                                name: d.getMessage("Indent"),
                                value: "indent"
                            }],
                            value: f.values.editor_tabMode,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("Reindent_on_typing"),
                            id: "editor_electricChars",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.editor_electricChars,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("Enable_autoSave"),
                            id: "editor_autoSave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.editor_autoSave,
                            desc: ""
                        });
                        c.items.push({
                            name: d.getMessage("Enable_easySave"),
                            id: "editor_easySave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.editor_easySave,
                            desc: ""
                        });
                        p = {
                            name: d.getMessage("Script_Update"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        p.items.push({
                            name: d.getMessage("Check_disabled_scripts"),
                            id: "scriptUpdateCheckDisabled",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.scriptUpdateCheckDisabled,
                            desc: ""
                        });
                        p.items.push({
                            name: d.getMessage("Dont_ask_me_for_simple_script_updates"),
                            id: "notification_silentScriptUpdate",
                            level: 80,
                            option: !0,
                            checkbox: !0,
                            enabled: f.values.notification_silentScriptUpdate,
                            desc: ""
                        });
                        p.items.push({
                            name: d.getMessage("Check_interval"),
                            id: "scriptUpdateCheckPeriod",
                            level: 0,
                            option: !0,
                            select: [{
                                name: d.getMessage("Never"),
                                value: 0
                            }, {
                                name: d.getMessage("Every_Hour"),
                                value: 36E5
                            }, {
                                name: d.getMessage("Every_6_Hours"),
                                value: 216E5
                            }, {
                                name: d.getMessage("Every_12_Hour"),
                                value: 432E5
                            }, {
                                name: d.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: d.getMessage("Every_Week"),
                                value: 6048E5
                            }],
                            value: f.values.scriptUpdateCheckPeriod,
                            desc: ""
                        });
                        p.items.push({
                            name: d.getMessage("Hide_notification_after"),
                            id: "scriptUpdateHideNotificationAfter",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Never"),
                                value: 0
                            }, {
                                name: d.getMessage("15_Seconds"),
                                value: 15E3
                            }, {
                                name: d.getMessage("30_Seconds"),
                                value: 3E4
                            }, {
                                name: d.getMessage("1_Minute"),
                                value: 6E4
                            }, {
                                name: d.getMessage("5_Minutes"),
                                value: 3E5
                            }, {
                                name: d.getMessage("1_Hour"),
                                value: 36E5
                            }],
                            value: f.values.scriptUpdateHideNotificationAfter,
                            desc: ""
                        });
                        h = {
                            name: d.getMessage("Externals"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        h.items.push({
                            name: d.getMessage("Update_interval"),
                            id: "external_update_interval",
                            level: 0,
                            option: !0,
                            select: [{
                                name: d.getMessage("Always"),
                                value: 1
                            }, {
                                name: d.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: d.getMessage("Every_Week"),
                                value: 6048E5
                            }, {
                                name: d.getMessage("Every_Month"),
                                value: 2592E6
                            }, {
                                name: d.getMessage("Never"),
                                value: 0
                            }],
                            value: f.values.external_update_interval,
                            desc: ""
                        });
                        k = {
                            name: d.getMessage("Security"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        n.OPTIONS.HAS_CSP && (k.items.push({
                            name: d.getMessage("Allow_overwrite_javascript_settings"),
                            id: "scriptblocker_overwrite",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: d.getMessage("No"),
                                value: "no"
                            }],
                            value: f.values.scriptblocker_overwrite,
                            desc: d.getMessage("Tampermonkey_can_not_work_when_javascript_is_disabled")
                        }), k.items.push({
                            name: d.getMessage("Add_TM_to_CSP"),
                            id: "webrequest_fixCSP",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: d.getMessage("No"),
                                value: "no"
                            }],
                            value: f.values.webrequest_fixCSP,
                            desc: d.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")
                        }), k.items.push({
                            name: d.getMessage("Allow_headers_to_be_modified_by_scripts"),
                            id: "webrequest_modHeaders",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: d.getMessage("Auto"),
                                value: "auto"
                            }, {
                                name: d.getMessage("No"),
                                value: "no"
                            }],
                            value: f.values.webrequest_modHeaders,
                            desc: ""
                        }));
                        n.RUNTIME.INCOGNITO_MODE && !rea.extension.inIncognitoContext && (u = "temporary" == f.values.incognito_mode ? {} : {
                            image: "critical",
                            msg: "Permanent mode is still a BETA feature!"
                        }, k.items.push({
                            name: d.getMessage("Store_data_in_incognito_mode"),
                            id: "incognito_mode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Temporary"),
                                value: "temporary"
                            }, {
                                name: d.getMessage("Permanent"),
                                value: "permanent"
                            }],
                            value: f.values.incognito_mode,
                            validation: u
                        }));
                        k.items.push({
                            name: d.getMessage("Page_Filter_Mode"),
                            id: "page_filter_mode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Off"),
                                value: "off"
                            }, {
                                name: d.getMessage("Blacklist"),
                                value: "black"
                            }, {
                                name: d.getMessage("Whitelist"),
                                value: "white"
                            }, {
                                name: d.getMessage("Both"),
                                value: "black+white"
                            }],
                            value: f.values.page_filter_mode,
                            desc: ""
                        });
                        k.items.push({
                            name: d.getMessage("Whitelisted_Pages"),
                            id: "page_whitelist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: f.values.page_whitelist,
                            desc: ""
                        });
                        k.items.push({
                            name: d.getMessage("Blacklisted_Pages"),
                            id: "forbiddenPages",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: f.values.forbiddenPages,
                            desc: ""
                        });
                        l = {
                            name: d.getMessage("BlackCheck"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        l.items.push({
                            name: d.getMessage("Script_Blacklist_Source"),
                            id: "script_blacklist_type",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("Off"),
                                value: "off"
                            }, {
                                name: d.getMessage("Server_And_Manual"),
                                value: "server"
                            }, {
                                name: d.getMessage("Only_Manual"),
                                value: "only_manual"
                            }],
                            value: f.values.script_blacklist_type
                        });
                        l.items.push({
                            name: d.getMessage("Blacklist_Severity"),
                            id: "script_blacklist_severity",
                            level: 50,
                            option: !0,
                            select: [{
                                name: d.getMessage("severity_1"),
                                value: 1
                            }, {
                                name: d.getMessage("severity_2"),
                                value: 2
                            }, {
                                name: d.getMessage("severity_3"),
                                value: 3
                            }, {
                                name: d.getMessage("severity_4"),
                                value: 4
                            }, {
                                name: d.getMessage("severity_5"),
                                value: 5
                            }, {
                                name: d.getMessage("severity_6"),
                                value: 6
                            }, {
                                name: d.getMessage("severity_7"),
                                value: 7
                            }, {
                                name: d.getMessage("severity_8"),
                                value: 8
                            }, {
                                name: d.getMessage("severity_9"),
                                value: 9
                            }, {
                                name: d.getMessage("severity_10"),
                                value: 10
                            }],
                            value: f.values.script_blacklist_severity
                        });
                        l.items.push({
                            name: d.getMessage("Manual_Script_Blacklist"),
                            id: "require_blacklist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: f.values.require_blacklist,
                            desc: ""
                        });
                        if (n.OPTIONS.CAN_DOWNLOAD) {
                            var B = !1;
                            u = {};
                            s.map("exe sh crx com bat scr".split(" "), function(a) {
                                return "name." + a
                            }).forEach(function(a) {
                                B |= H.is_whitelisted(a)
                            });
                            B && (u = {
                                image: "critical",
                                msg: d.getMessage("Your_whitelist_seems_to_include_executable_files_This_means_your_userscripts_may_download_malware_or_spyware_to_your_harddisk_")
                            });
                            F = {
                                name: d.getMessage("Downloads") + " BETA",
                                sub_menu_item: !0,
                                level: 50,
                                items: []
                            };
                            F.items.push({
                                name: d.getMessage("Download_Mode"),
                                id: "downloads_mode",
                                level: 50,
                                option: !0,
                                select: s.select([{
                                    name: d.getMessage("Default"),
                                    value: H.staticVars.DEFAULT
                                }, {
                                    name: d.getMessage("Off"),
                                    value: H.staticVars.OFF
                                }, {
                                    name: d.getMessage("Native"),
                                    value: H.staticVars.NATIVE
                                }, {
                                    name: d.getMessage("Browser_API"),
                                    value: n.DOWNLOAD.SUPPORTED ? H.staticVars.CHROME : null
                                }], function(a) {
                                    return a.value
                                }),
                                value: f.values.downloads_mode,
                                desc: d.getMessage("The_Browser_API_mode_requires_a_special_permission_") + '\n"Default" is "Native".'
                            });
                            F.items.push({
                                name: d.getMessage("Whitelisted_File_Extensions"),
                                id: "downloads_extension_whitelist",
                                level: 50,
                                option: !0,
                                input: !0,
                                array: !0,
                                value: f.values.downloads_extension_whitelist,
                                desc: d.getMessage("Only_files_with_these_extensions_can_be_saved_to_the_harddisk_Be_careful_to_not_allow_file_extensions_that_represent_executables_at_your_operating_system_"),
                                validation: u
                            })
                        }
                        m = {
                            name: d.getMessage("Experimental"),
                            sub_menu_item: !0,
                            level: 80,
                            items: []
                        };
                        m.items.push({
                            name: d.getMessage("strict_mode"),
                            id: "runtime_strict_mode",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Default"),
                                value: "byscript"
                            }, {
                                name: d.getMessage("Always"),
                                value: "on"
                            }, {
                                name: d.getMessage("Off"),
                                value: "off"
                            }],
                            value: f.values.runtime_strict_mode
                        });
                        m.items.push({
                            name: d.getMessage("strong_mode"),
                            id: "runtime_strong_mode",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Default"),
                                value: "off"
                            }, {
                                name: d.getMessage("Enabled"),
                                value: "on"
                            }],
                            value: f.values.runtime_strong_mode
                        });
                        u = {
                            name: d.getMessage("Userscripts"),
                            sub_menu_item: !0,
                            level: 80,
                            items: []
                        };
                        u.items.push({
                            name: d.getMessage("Script_URL_detection"),
                            id: "scriptUrlDetection",
                            level: 80,
                            option: !0,
                            select: [{
                                name: d.getMessage("Auto"),
                                value: "auto"
                            }, {
                                name: d.getMessage("Off"),
                                value: "manual"
                            }],
                            value: f.values.scriptUrlDetection
                        });
                        u.items.push({
                            name: d.getMessage("New_script_template_"),
                            id: "script_templates",
                            level: 80,
                            option: !0,
                            input: !0,
                            array: !0,
                            named: !0,
                            value: f.values.script_templates
                        });
                        q = {
                            name: d.getMessage("Reset_Section"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        q.items.push({
                            name: d.getMessage("Restart_Tampermonkey"),
                            id: "reset_simple",
                            level: 50,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: d.getMessage("This_will_restart_Tampermonkey_Ok_")
                            }
                        });
                        q.items.push({
                            name: d.getMessage("Factory_Reset"),
                            id: "reset_factory",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: d.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")
                            }
                        });
                        n.OPTIONS.HAS_TESLA && q.items.push({
                            name: d.getMessage("Chrome_Sync_Reset"),
                            id: "reset_chrome_sync",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: d.getMessage("This_will_remove_all_stored_data_from_google_sync_Ok_")
                            }
                        });
                        ca && q.items.push({
                            name: "Install Tests",
                            id: "install_tests",
                            level: 80,
                            button: !0,
                            reload: !1,
                            ignore: !0,
                            value: 0,
                            warning: {
                                msg: "This will install a lot of test scripts!"
                            }
                        });
                        return [a, e, b, p, h, void 0, r, g, void 0, c, k, l, F, u, m, q].filter(function(a) {
                            return !!a
                        })
                    }
                }
            }(),
            W = function() {
                return {
                    create: function(a, g) {
                        a = a || "";
                        g = g || {};
                        var c = function(a) {
                                return m.onebyone(a).fail(function() {
                                    console.warn("tree: wait failed!")
                                })
                            },
                            h = function(a, b) {
                                for (var c = a.replace(/\.$/, "").split("."), d = p; c.length;) {
                                    var f = c.shift();
                                    if (d[f]) {
                                        if ("function" === typeof d[f]) return function() {
                                            return d[f](g, !b)
                                        };
                                        d = d[f];
                                        c.length || c.unshift("root")
                                    } else return console.warn("tree: unable to find", a, g),
                                        function() {
                                            return m.Pledge([])
                                        }
                                }
                                console.warn("tree: unable to find", a, g);
                                return function() {
                                    return m.Pledge([])
                                }
                            },
                            p = {
                                actions: {
                                    root: function() {
                                        var a = m();
                                        rea.tabs.getSelected(null, function(b) {
                                            g.tab = b;
                                            c([h("actions.general"), h("actions.scripts"), h("actions.commands")]).done(function(b) {
                                                a.resolve(b)
                                            }).fail(a.reject)
                                        });
                                        return a.promise()
                                    },
                                    general: function() {
                                        var a = g.tab,
                                            b = a ? a.url : null,
                                            c = b && 4 < b.length && "" == b.substr(0, 4).replace(/file|http/, "") ? b : "",
                                            a = [],
                                            h = {
                                                name: "enabled",
                                                sub_menu_item: !0,
                                                pos: "top",
                                                items: []
                                            };
                                        h.items.push({
                                            name: d.getMessage("Enabled"),
                                            display: f.values.enabled ? null : "greyed",
                                            id: "enabled",
                                            button: !0,
                                            reload: !0,
                                            enabler: !0
                                        });
                                        a.push(h);
                                        "manual" == f.values.scriptUrlDetection && ma.isScriptUrl(b) && h.items.push({
                                            name: d.getMessage("Install_this_script"),
                                            image: "script_download",
                                            id: "installFromUrl",
                                            data: b,
                                            button: !0,
                                            reload: !0
                                        });
                                        b = {
                                            name: "about",
                                            sub_menu_item: !0,
                                            pos: "bottom",
                                            items: []
                                        };
                                        b.items.push({
                                            name: d.getMessage("Dashboard"),
                                            image: "utilities",
                                            url: rea.extension.getURL("options.html") + "?" + ["url=" + encodeURIComponent(c), "selected=dashboard"].join("&"),
                                            newtab: !0
                                        });
                                        c = "version=" + rea.extension.manifest.version + "&ext=" + rea.runtime.short_id;
                                        b.items.push({
                                            image: "info",
                                            urls: [{
                                                name: " " + d.getMessage("Help"),
                                                url: "http://tampermonkey.net/faq.php?" + c,
                                                newtab: !0
                                            }, {
                                                name: " " + d.getMessage("Changelog"),
                                                url: "http://tampermonkey.net/changelog.php?" +
                                                    c,
                                                newtab: !0
                                            }]
                                        });
                                        a.push(b);
                                        return m.Pledge(a)
                                    },
                                    scripts: function() {
                                        var a = g.tab,
                                            b = a ? a.url : null,
                                            c = [],
                                            h = b && 4 < b.length && "" == b.substr(0, 4).replace(/file|http/, "") ? b : "",
                                            p, t = {
                                                name: "scripts",
                                                sub_menu_item: !0,
                                                pos: "center",
                                                items: []
                                            },
                                            a = v.getUniqueScriptsForTab(a),
                                            r = ga.getContexters(0, null),
                                            a = na([].concat(a).concat(r)),
                                            q;
                                        "position" != f.values.action_menu_scripts_sort && ("name" == f.values.action_menu_scripts_sort ? q = function(a, b) {
                                            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ?
                                                1 : 0
                                        } : "enabled" == f.values.action_menu_scripts_sort && (q = function(a, b) {
                                            return b.enabled - a.enabled
                                        }));
                                        f.values.action_menu_scripts_hide_disabled && (a = a.filter(function(a) {
                                            return a.enabled
                                        }));
                                        q && a.sort(q);
                                        !f.values.action_menu_scripts_hide_disabled && 2 < Math.min(f.values.action_menu_columns, n.ACTIONMENU.COLUMNS) ? (p = {
                                            name: "scripts_right",
                                            sub_menu_item: !0,
                                            pos: "right",
                                            items: []
                                        }, a.forEach(function(a) {
                                            (a.enabled ? t : p).items.push(a)
                                        }), c.push(t), p.items.length && c.push(p)) : (p = t, t.items = t.items.concat(a), c.push(t));
                                        f.values.enabled && !a.length && b && (ha.isAllowed(b) ? t.items.push({
                                            name: d.getMessage("No_script_is_running"),
                                            image: "info"
                                        }) : t.items.push({
                                            name: d.getMessage("This_page_is_blacklisted_at_the_security_settings"),
                                            image: "critical"
                                        }));
                                        f.values.enabled && ("3" == f.values.action_menu_columns || 100 > f.values.configMode || !a.length) && (t.items.push({
                                            name: d.getMessage("Get_new_scripts___"),
                                            image: "script_download",
                                            url: "http://tampermonkey.net/scripts.php",
                                            newtab: !0
                                        }), t.items.push({
                                            name: d.getMessage("Add_new_script___"),
                                            image: "script_add",
                                            url: rea.extension.getURL("options.html") + "?url=" + encodeURIComponent(h) + "#open=new-user-script",
                                            newtab: !0
                                        }));
                                        return m.Pledge(c)
                                    },
                                    commands: function() {
                                        var a = g.tab,
                                            b = [],
                                            c = d.getLocale(),
                                            f = {
                                                name: "commands",
                                                id: "commands",
                                                sub_menu_item: !0,
                                                pos: "left",
                                                items: []
                                            },
                                            h = a.id,
                                            a = [],
                                            h = null == h || void 0 == h ? $.list() : $.listByTabId(h),
                                            p;
                                        for (p in h)
                                            if (h.hasOwnProperty(p)) {
                                                var r = h[p];
                                                a.push({
                                                    name: r.name,
                                                    id: r.id,
                                                    accessKey: r.accessKey,
                                                    image: "menu_cmd",
                                                    menucmd: !0
                                                })
                                            }
                                        a.length && (f.items = a);
                                        f.items.push({
                                            name: d.getMessage("Check_for_userscripts_updates"),
                                            id: "run_script_updates",
                                            button: !0,
                                            image: "update"
                                        });
                                        f.items.push({
                                            name: d.getMessage("Report_a_bug"),
                                            image: "bug",
                                            url: "http://tampermonkey.net/bug",
                                            newtab: !0
                                        });
                                        f.items.push({
                                            name: d.getMessage("Please_consider_a_contribution"),
                                            image: "contrib",
                                            url: "http://tampermonkey.net/contrib.php" + (c ? "?locale=" + c : ""),
                                            newtab: !0
                                        });
                                        b.push(f);
                                        return m.Pledge(b)
                                    }
                                },
                                options: {
                                    root: function() {
                                        return c([h("options.general"), h("options.verification"), h("options.scripts"), h("options.settings")])
                                    },
                                    general: function() {
                                        var a = [];
                                        a.push({
                                            name: "Version",
                                            id: null,
                                            version: !0,
                                            value: rea.extension.manifest.version
                                        });
                                        rea.extension.inIncognitoContext && "temporary" == f.values.incognito_mode && a.push({
                                            globalhint: !0,
                                            image: "critical",
                                            value: d.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")
                                        });
                                        return m.Pledge(a)
                                    },
                                    verification: function() {
                                        var a = [];
                                        ea.getWarnings().forEach(function(b) {
                                            a.push({
                                                globalhint: !0,
                                                image: "critical",
                                                value: b.text,
                                                description: b.description,
                                                info_url: b.url
                                            })
                                        });
                                        return m.Pledge(a)
                                    },
                                    scripts: {
                                        root: function(a, b) {
                                            var g =
                                                m(),
                                                f = {
                                                    name: d.getMessage("Installed_userscripts"),
                                                    main_menu_item: !0,
                                                    scriptTab: !0,
                                                    id: "dashboard"
                                                };
                                            (function() {
                                                if (a.complete || !b) return c(s.map(["options.scripts.natives", "options.scripts.userscripts", "options.scripts.new"], function(a) {
                                                    return h(a)
                                                }));
                                                f.referrer = "options.scripts";
                                                f.partial = !0;
                                                return c([h("options.scripts.new")])
                                            })().done(function(a) {
                                                f.items = a;
                                                g.resolve([f])
                                            }).fail(g.reject);
                                            return g.promise()
                                        },
                                        "new": function() {
                                            var a = [];
                                            a.push({
                                                name: d.getMessage("New_userscript"),
                                                id: null,
                                                image: "script_add",
                                                icon: rea.extension.getURL("images/txt.png"),
                                                nnew: !0,
                                                uuid: "new-user-script",
                                                position: -1,
                                                positionof: n.RUNTIME.MAX_SCRIPTS,
                                                enabled: !0,
                                                userscript: !0
                                            });
                                            return m.Pledge(a)
                                        },
                                        natives: function() {
                                            var a = [],
                                                b = m();
                                            N.getAllUserscripts().always(function(c) {
                                                c = c || [];
                                                c.forEach(function(b) {
                                                    a.push({
                                                        name: b.name,
                                                        uuid: b.id,
                                                        icon: b.icon,
                                                        code: null,
                                                        position: 0,
                                                        positionof: n.RUNTIME.MAX_SCRIPTS,
                                                        enabled: b.enabled,
                                                        version: b.version,
                                                        description: b.description,
                                                        nativeScript: !0
                                                    })
                                                });
                                                b.resolve(a)
                                            });
                                            return b.promise()
                                        },
                                        userscripts: {
                                            root: function(a,
                                                b) {
                                                var c = a.complete || !b ? null : "options.scripts.userscripts.source",
                                                    c = na(v.determineScriptsToRun(null), !0, c),
                                                    g = c.length;
                                                c.push({
                                                    name: d.getMessage("No_script_is_installed"),
                                                    image: "info",
                                                    visible: !g
                                                });
                                                c.push({
                                                    name: d.getMessage("Get_some_scripts___"),
                                                    image: "edit_add",
                                                    url: "http://tampermonkey.net/scripts.php",
                                                    newtab: !0,
                                                    visible: !g
                                                });
                                                return m.Pledge(c)
                                            },
                                            source: function(a) {
                                                if (!a.uuid) return m.Pledge([]);
                                                a = x.getByUid(a.uuid);
                                                if (a.script && a.cond) return a = f.values.showFixedSrc ? ia.mkCompat(a.script.textContent,
                                                    a.script, "off" != f.values.runtime_strict_mode) : a.script.textContent, m.Pledge([a]);
                                                console.warn("tree: unable to process ", a);
                                                return m.Breach()
                                            }
                                        }
                                    },
                                    settings: function(a, b) {
                                        var c = m(),
                                            g = {
                                                name: d.getMessage("Settings"),
                                                main_menu_item: !0,
                                                id: "settings",
                                                selected_default: !0
                                            },
                                            f;
                                        a.complete || !b ? f = m.Pledge(Fa.create()) : (g.referrer = "options.settings", f = m.Pledge());
                                        f.done(function(a) {
                                            g.items = a;
                                            c.resolve([g])
                                        }).fail(c.reject);
                                        return c.promise()
                                    }
                                }
                            };
                        D && console.log("tree: loading", a, g);
                        return h(a, !0)()
                    }
                }
            }(),
            na = function(a,
                d, c) {
                var h = [],
                    p = new w.Script;
                ["author", "copyright"].forEach(function(a) {
                    p[a] = !1
                });
                for (var e in a) {
                    var b = a[e],
                        k;
                    if (d) {
                        k = {};
                        for (var l in p) p.hasOwnProperty(l) && "textContent" != l && "requires" != l && "resources" != l && (s.toType(p[l]), k[l] = b[l]);
                        c ? (k.referrer = c, k.length = b.textContent.length) : k.code = b.textContent;
                        ["requires", "resources"].forEach(function(a) {
                            k[a] = s.map(b[a], function(a) {
                                var c = R.getElement(b.uuid, a.url);
                                return {
                                    url: a.url,
                                    data: {
                                        length: c && c.data && c.data.content ? c.data.content.length : 0
                                    },
                                    ts: c ? c.ts : null
                                }
                            })
                        });
                        k.origin = v.determineOrigin(b);
                        k.contexter = v.isContexter(b)
                    } else k = {
                        name: b.name,
                        uuid: b.uuid,
                        system: b.system,
                        support: !!b.supportURL,
                        origin: !!v.determineOrigin(b),
                        contexter: v.isContexter(b),
                        enabled: b.enabled,
                        position: b.position
                    };
                    k.blacklisted = b.evilness >= f.values.script_blacklist_severity;
                    k.file_url = b.downloadURL || b.fileURL;
                    k.positionof = a.length;
                    k.userscript = !0;
                    k.user_agent = b.options.user_agent;
                    b.icon64 || b.icon || (k.icon64 = rea.extension.getURL(k.user_agent ? "images/user_agent.png" : "images/txt.png"));
                    b.options &&
                        Object.keys(p.options).forEach(function(a) {
                            k[a] = b.options[a]
                        });
                    h.push(k)
                }
                return h
            },
            oa = {
                copy: function(a) {
                    var d = document.createElement("iframe"),
                        c = document.body || document.documentElement || document;
                    c.appendChild(d);
                    try {
                        d.contentDocument.designMode = "on", "html" == a.type ? (d.setAttribute("sandbox", "allow-same-origin"), d.contentDocument.documentElement.innerHTML = a.content, d.contentDocument.execCommand("selectAll", !1, null)) : d.contentDocument.oncopy = function(c) {
                            c.clipboardData.setData(a.mimetype || "text/plain",
                                a.content);
                            c.preventDefault()
                        }, d.contentDocument.execCommand("copy", !1, null), d.contentDocument.designMode = "off"
                    } catch (f) {
                        console.error("bg: clipboard Error: " + f.message)
                    }
                    c.removeChild(d);
                    d = null
                }
            };
        clip = oa;
        var G = {
                asked: !1,
                runCheck: !1,
                hasPermission: !1,
                init: function() {
                    Q.has(Q.permContentSettings).done(function(a) {
                        G.hasPermission = a;
                        G.runCheck = G.hasPermission && "yes" == f.values.scriptblocker_overwrite;
                        D && console.log("bg: contentSettings: runCheck = " + G.runCheck + " hasPerm = " + G.hasPermission)
                    })
                },
                askForPermission: function(a) {
                    Q.ask(Q.permContentSettings,
                        d.getMessage("A_script_blocker_was_detected_"), d.getMessage("Click_here_to_allow_TM_to_override_the_script_blocker")).done(a)
                },
                requestPermissionEx: function(a) {
                    "yes" != f.values.scriptblocker_overwrite ? a && a() : Q.has(Q.permContentSettings).done(function(d) {
                        G.asked ? a && a(d, !1) : d ? a(d, !1) : G.askForPermission(function(c) {
                            a && a(c, !0);
                            c && !G.runCheck && (G.runCheck = !0, V.reset())
                        });
                        G.asked = !0
                    })
                },
                remove: function(a) {
                    Q.remove(Q.permContentSettings).done(a)
                }
            },
            V = {
                run: function(a, d) {
                    var c = 1,
                        f = function() {
                            0 == --c && (d && d(), window.location.reload())
                        };
                    if ("config" == a) {
                        var p = q.listValues(),
                            e;
                        for (e in p) {
                            var b = p[e]; - 1 != b.search(n.CONSTANTS.PREFIX.SCRIPT) && -1 != b.search(n.CONSTANTS.PREFIX.COND) && -1 != b.search(n.CONSTANTS.PREFIX.STORE) && -1 != b.search(n.CONSTANTS.PREFIX.META) && (c++, q.deleteValue(b).always(f))
                        }
                    } else "factory" == a && (G.hasPermission && (c++, G.remove(f)), c++, H.remove_permission().done(f), c++, q.factoryReset().always(f));
                    f()
                },
                reset: function(a) {
                    V.run(null, a)
                },
                factoryReset: function(a) {
                    V.run("factory", a)
                },
                configReset: function(a) {
                    V.run("config", a)
                }
            },
            S = function() {
                var a = function() {
                        rea.runtime.lastError && void 0
                    },
                    g = {
                        init: function() {
                            g.setIcon();
                            var a = f.values.appearance_badge_color || "#ee3131";
                            "#" !== a[0] && (a = "#" + a);
                            rea.browserAction.setBadgeBackgroundColor({
                                color: a
                            })
                        },
                        setIcon: function(c) {
                            var g, p;
                            p = null;
                            var e = g = !1;
                            void 0 === c || z.get.empty(c) || (g = z.get.blocker(c), e = z.get.forbidden(c));
                            e ? (g = "images/icon_forbidden.png", p = d.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")) : g ? (g = "images/icon_blocker.png", p = d.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")) :
                                g = f.values.enabled && void 0 !== c ? "images/icon.png" : "images/icon_grey.png";
                            D && console.log("badge: set icon " + g);
                            g = {
                                path: rea.extension.getURL(g)
                            };
                            p = {
                                title: p ? p : rea.extension.manifest.name
                            };
                            null != c && (g.tabId = c, p.tabId = c);
                            try {
                                rea.browserAction.setIcon(g, a), rea.browserAction.setTitle(p)
                            } catch (b) {
                                console.warn("bg: ERROR while setIcon! " + b.message)
                            }
                        },
                        setBadge: function(a) {
                            var d = 0;
                            "off" == f.values.appearance_badges ? d = 0 : "running" == f.values.appearance_badges ? a && !z.get.empty(a) && (d = z.get.stats(a).running) : "running_unique" ==
                                f.values.appearance_badges ? a && !z.get.empty(a) && (d = z.get.stats(a, !0).unique) : "disabled" == f.values.appearance_badges && a && !z.get.empty(a) && (d = z.get.stats(a).disabled);
                            D && console.log("badge: set " + d);
                            d ? rea.browserAction.setBadgeText({
                                text: d.toString(),
                                tabId: a
                            }) : rea.browserAction.setBadgeText({
                                text: "",
                                tabId: a
                            })
                        }
                    };
                return g
            }(),
            aa = function() {
                var a = null,
                    d = {
                        init: function() {
                            a = q.getValue(n.CONSTANTS.STORAGE.BEGGING, null);
                            if (!a) {
                                a = {};
                                var c = (new Date).getTime(),
                                    f = c;
                                s.each(v.determineScriptsToRun(null), function(a) {
                                    a.lastUpdated &&
                                        a.lastUpdated < f && (f = a.lastUpdated)
                                });
                                f !== c ? (D && console.log("beg: first action found at " + (new Date(f)).toISOString()), a.first_run = {
                                    type: "from_script",
                                    ts: f
                                }) : a.first_run = {
                                    type: "from_init",
                                    ts: c
                                };
                                d.save()
                            }
                        },
                        save: function() {
                            q.setValue(n.CONSTANTS.STORAGE.BEGGING, a)
                        },
                        needed: function() {
                            var c = (new Date).getTime(),
                                d = a.first_run ? a.first_run.ts + 12096E5 < c : !0,
                                f = !a.hide,
                                e = !a.contributed,
                                c = a.later ? a.later.ts + 12096E5 < c : !0;
                            return !n.RUNTIME.DOLPHIN && d && f && e && c
                        },
                        clicked: function(a, d, f) {
                            M.tG("clicked", a, d + f)
                        },
                        dialog: {
                            shown: function(c) {
                                var f =
                                    (new Date).getTime();
                                a.dialog = {
                                    ts: f,
                                    extra: c
                                };
                                d.save();
                                M.tG("dialog")
                            }
                        },
                        button: function() {
                            var c = {};
                            ["contributed", "later", "hide"].forEach(function(f) {
                                c[f] = function(c) {
                                    var e = (new Date).getTime();
                                    a[f] = {
                                        ts: e,
                                        extra: c
                                    };
                                    d.save();
                                    M.tG("button", f)
                                }
                            });
                            return c
                        }()
                    };
                return d
            }(),
            ka = function() {
                var a = function(a, b) {
                        console.log(a, b);
                        if (b && a.menuItemId) {
                            var c = a.menuItemId,
                                d = x.getByUid(c);
                            d && d.script ? ra.bundle({
                                url: a.frameUrl || a.pageUrl || "<unknown>"
                            }, d.script, !0).then(function(c) {
                                var d = m();
                                c.method = "executeScript";
                                a.frameUrl ? c.url = A.woHash(a.frameUrl) : c.topframe = !0;
                                rea.tabs.sendMessage(b.id, c, d.resolve);
                                return d.promise()
                            }).then(function() {
                                rea.contextMenus.remove(c)
                            }) : D && console.warn("ctxm: unable to find script " + a.menuItemId, a, b)
                        }
                    },
                    d = [],
                    c = null,
                    f = !1,
                    p = function(a) {
                        var b = [];
                        s.each(a, function(a) {
                            var e = m();
                            rea.contextMenus.create({
                                id: a.uuid,
                                contexts: ["all"],
                                parentId: c,
                                title: a.name,
                                type: "normal",
                                documentUrlPatterns: ["http://*/*", "https://*/*", "file://*/*"]
                            }, function() {
                                e.resolve()
                            });
                            d.push(a.uuid);
                            b.push(e.promise())
                        });
                        return m.when(b)
                    },
                    e = function() {
                        var a = m();
                        rea.contextMenus.removeAll(function() {
                            c = null;
                            a.resolve()
                        });
                        return a.promise()
                    },
                    b = function() {
                        var a = m();
                        e().then(function() {
                            c = rea.contextMenus.create({
                                contexts: ["all"],
                                title: "Tampermonkey",
                                type: "normal",
                                documentUrlPatterns: ["http://*/*", "https://*/*", "file://*/*"]
                            }, function() {
                                a.resolve()
                            })
                        });
                        return a.promise()
                    },
                    k = function() {
                        var a = ga.getContexters(0, null);
                        if (a.length) {
                            var d;
                            d = c ? m.Pledge() : b();
                            return d.then(function() {
                                return p(a)
                            })
                        }
                        return e().then(l.clean)
                    },
                    l = {
                        init: function() {
                            rea.contextMenus.supported && (l.clean().then(k).then(function() {
                                f = !0
                            }), rea.contextMenus.onClicked.addListener(a))
                        },
                        clean: function() {
                            var a = m();
                            d.forEach(function(a) {
                                rea.contextMenus.remove(a)
                            });
                            d = [];
                            a.resolve();
                            return a.promise()
                        },
                        onScriptsChanged: function() {
                            if (rea.contextMenus.supported && f) return l.clean().then(k)
                        },
                        getContexterCount: function() {
                            return d.length
                        }
                    };
                return l
            }(),
            y = {
                infoChanged: [],
                redirects: {},
                addInfoChangedListener: function(a) {
                    y.infoChanged.push(a)
                },
                runInfoChangedListener: function() {
                    for (var a =
                            0; a < y.infoChanged.length; a++) y.infoChanged[a](K)
                },
                detectRedirectToCache: function(a) {
                    C.registerLateCallback(function() {
                        y.detectRedirect(a)
                    })
                },
                detectRedirect: function(a) {
                    var d = a.responseHeaders || [],
                        c = a.requestId,
                        h = !1,
                        p = !1,
                        e = !1,
                        b = "xmlhttprequest" == a.type,
                        k = "main_frame" == a.type || "sub_frame" == a.type;
                    if (!b && !k && "no" == f.values.webrequest_fixCSP) return {};
                    b && y.redirects[c] && (h = !0);
                    for (var l = {}, m = 0; m < d.length; m++) {
                        var n = d[m];
                        if (n.name) {
                            var r = n.name.toLowerCase();
                            if ("location" == r)
                                if (k) p = !0;
                                else {
                                    if (b) {
                                        h && window.clearTimeout(y.redirects[c].to);
                                        if (m = n.value || window.encodeURI(L.arrbuf2str(n.binaryValue))) n = m, A.parse(n).protocol || (m = A.parse(a.url), n = A.parse(n), n = A.woHash(A.rel2abs(m, n))), y.redirects[c] = {
                                            url: n,
                                            to: window.setTimeout(function() {
                                                delete y.redirects[c]
                                            }, 1E4)
                                        };
                                        break
                                    }
                                } else if (k && "yes" == f.values.webrequest_fixCSP && n.value && ("x-webkit-csp" == r || "x-content-security-policy" == r || "content-security-policy" == r)) {
                                var q = !1,
                                    r = n.value.split(";").map(function(a) {
                                        var b = a.trim();
                                        if (0 == b.search(/^script-src /)) {
                                            var c = -1 != b.search(/'unsafe-eval'/),
                                                d = -1 != b.search(/'none'/);
                                            if (!c || d) return q = !0, b.replace(/script-src /, "script-src 'unsafe-eval' ").replace(/ 'none'/, "")
                                        }
                                        return a.trim()
                                    }),
                                    r = q ? r.join(";") : n.value;
                                l[m] = {
                                    name: n.name,
                                    value: r
                                }
                            }
                        }
                    }
                    if (k && !p) {
                        if (z.events.response(a.tabId, a.frameId, a.url)) {
                            var e = !0,
                                s;
                            for (s in l) D && console.log("csp: replace ", d[s], "with", l[s]), d[s] = l[s]
                        }
                    } else b && h && (d.push({
                        name: "TM-finalURL" + rea.runtime.short_id,
                        value: y.redirects[c].url
                    }), e = !0);
                    return e ? {
                        responseHeaders: d
                    } : {}
                },
                headerFix: function(a) {
                    var d = G.runCheck,
                        c = "main_frame" ==
                        a.type || "sub_frame" == a.type;
                    c && d && (d = A.parse(a.url).origin + "/*", rea.contentSettings.javascript.set({
                        primaryPattern: d,
                        setting: "allow"
                    }));
                    var f = c && z.get.user_agent(a.tabId, a.frameId),
                        m = K.headers && "xmlhttprequest" == a.type;
                    if (!f && !m) return {};
                    var d = !1,
                        c = {},
                        e = [],
                        b = RegExp("^" + K.prefix),
                        k;
                    f && (k = z.get.user_agent(a.tabId, a.frameId));
                    for (var l = a.requestHeaders || [], n = 0; n < l.length; n++) a = l[n], a.name && (m && 0 == a.name.search(b) ? e.push(a) : f && "user-agent" == a.name.toLowerCase() ? (d = !0, c[a.name] = k) : c[a.name] = a.value);
                    if (m)
                        for (k =
                            0; k < e.length; k++) a = e[k], d = !0, c[a.name.replace(b, "")] = a.value;
                    if (d) {
                        k = [];
                        for (var q in c) c.hasOwnProperty(q) && "" != q && k.push({
                            name: q,
                            value: c[q]
                        });
                        return {
                            requestHeaders: k
                        }
                    }
                    return {}
                },
                sucRequest: function(a) {
                    0 < a.tabId && console.log("bg: " + a.requestId + " print " + a.type + " request of tabId " + a.tabId + " to " + a.url)
                },
                checkRequestForUserscript: function(a) {
                    var d = "main_frame" == a.type;
                    if (d && 0 < a.tabId && "POST" != a.method && "auto" == f.values.scriptUrlDetection && ma.isScriptUrl(a.url)) return v.installFromUrl(a.url, {}, {
                        silent_fail: !0
                    }).fail(function() {
                        rea.tabs.update(a.tabId, {
                            url: a.url + "#bypass=true"
                        }, function() {})
                    }), {
                        redirectUrl: "javascript:history.back()"
                    };
                    d && z.events.reset(a.tabId, !0);
                    z.events.request(a.tabId, a.frameId, a.url);
                    return {}
                },
                removeWebRequestListeners: function() {
                    if (K.use) try {
                        y.preCleanup(), rea.webRequest.onBeforeRequest.removeListener(y.checkRequestForUserscript), rea.webRequest.onBeforeSendHeaders.removeListener(y.headerFix), rea.webRequest.onHeadersReceived.removeListener(y.detectRedirect)
                    } catch (a) {}
                    K.headers = !1;
                    y.runInfoChangedListener()
                },
                preInit: function() {
                    K.use &&
                        (y.tmp_cache = !0, rea.webRequest.onHeadersReceived.addListener(y.detectRedirectToCache, {
                            urls: ["http://*/*", "https://*/*"]
                        }, ["responseHeaders", "blocking"]), rea.webRequest.handlerBehaviorChanged())
                },
                preCleanup: function() {
                    if (K.use && y.tmp_cache) try {
                        rea.webRequest.onHeadersReceived.removeListener(y.detectRedirectToCache), delete y.tmp_cache
                    } catch (a) {
                        D && console.log("bg: error cleaning pre-initialized webRequest listener", a)
                    }
                },
                init: function(a) {
                    if (K.use) try {
                        y.preCleanup(), rea.webRequest.onBeforeRequest.addListener(y.checkRequestForUserscript, {
                                urls: ["http://*/*", "https://*/*", "file://*/*"],
                                types: ["main_frame", "sub_frame"]
                            }, ["blocking"]), rea.webRequest.onBeforeSendHeaders.addListener(y.headerFix, {
                                urls: ["http://*/*", "https://*/*", "file://*/*"]
                            }, ["requestHeaders", "blocking"]), rea.webRequest.onHeadersReceived.addListener(y.detectRedirect, {
                                urls: ["http://*/*", "https://*/*"]
                            }, ["responseHeaders", "blocking"]), rea.webRequest.handlerBehaviorChanged(), K.headers = a && rea.webRequest.headerModificationSupported, K.id = s.createUUID(), K.testprefix = K.prefix +
                            s.createUUID(), K.prefix = y.prefix + K.id + "_", y.runInfoChangedListener()
                    } catch (d) {
                        D && console.error("bg: error initializing webRequests " + d.message), y.removeWebRequestListeners()
                    }
                },
                finalize: function() {
                    y.removeWebRequestListeners()
                }
            },
            xa = {
                onCommittedListener: function(a) {
                    z.events.commited(a.tabId, a.frameId, a.url)
                },
                init: function() {
                    rea.webNavigation.supported && rea.webNavigation.onCommitted.addListener(xa.onCommittedListener)
                }
            },
            C = {
                late: !1,
                callbacks: [],
                init: function() {},
                registerLateCallback: function(a) {
                    D && console.log("toea: register callback");
                    C.callbacks.push(a)
                },
                setReady: function() {
                    D && console.debug("toea: run " + C.callbacks.length + " callbacks");
                    C.late = !0;
                    for (var a = 0; a < C.callbacks.length; a++) C.callbacks[a]();
                    C.callbacks = []
                }
            },
            Ga = function() {
                var a = !1,
                    d = null,
                    c = function() {
                        a || (D && console.debug("Unloader.onbeforeunload()"), d && d(), a = !0)
                    };
                return {
                    init: function(a) {
                        d = a;
                        window.addEventListener("beforeunload", c, !1)
                    }
                }
            }(),
            Aa = function() {
                var a = rea.extension.manifest.version,
                    g = null,
                    c = !1,
                    h = !1,
                    p = function() {
                        if (C.late) {
                            var b = "version=" + a + "&ext=" + rea.runtime.short_id +
                                "&updated=true",
                                e;
                            c ? (e = "http://tampermonkey.net/installed.php?" + b, h = !0) : (b += "&old=" + g, e = "http://tampermonkey.net/changelog.php?" + b);
                            // "off" != f.values.notification_showUpdate && ("notification" == f.values.notification_showUpdate ? P.showUpdate(d.getMessage("Updated_to__0version0", a), d.getMessage("Click_here_to_see_the_recent_changes"), rea.extension.getURL("images/icon128.png"), function(a) {
                            //     a.clicked && rea.tabs.create({
                            //         url: e
                            //     }, function() {})
                            // }) : "changelog" == f.values.notification_showUpdate && (h || (e += "&intr=true"),
                            //     h = !0, rea.tabs.create({
                            //         url: e,
                            //         active: h
                            //     }, function() {})))
                        } else C.registerLateCallback(p)
                    },
                    e = function() {
                        var a = null,
                            b, c = m(),
                            d = function(d) {
                                b && (d || null !== a) && (d || window.clearTimeout(b), b = null, c.resolve(!!a))
                            };
                        rea.idle.queryState(n.MISC.IDLE_TIMEOUT, function(b) {
                            a = "active" == b;
                            d()
                        });
                        b = window.setTimeout(function() {
                            d(!0)
                        }, 300);
                        return c.promise()
                    },
                    b = function(a) {
                        C.late ? (D && console.log("upd: onInstalled", a), a || (a = {
                                reason: "mandatory_argument_is_not_set"
                            }), "chrome_update" == a.reason ? M.tB({
                                updated: !0
                            }) : "install" != a.reason &&
                            "update" != a.reason || r.scheduleNotification(a.previousVersion, "install" == a.reason)) : C.registerLateCallback(function() {
                            b(a)
                        })
                    },
                    k = function() {
                        var a = m(),
                            b = function() {
                                var b = (new Date).getTime(),
                                    c = q.getValue(n.CONSTANTS.STORAGE.LAST_START, 0),
                                    b = Math.round((b - c) / 1E3),
                                    c = b <= n.MISC.DISTURBANCE_ALLOWED;
                                D && console.log("upd: restart?", c, "(", b, "seconds ago)");
                                a.resolve(c)
                            };
                        C.late ? b() : C.registerLateCallback(b);
                        return a.promise()
                    }(),
                    l = function() {
                        var a = !1,
                            b = !1;
                        e().then(function(a) {
                            b = a;
                            return k
                        }).then(function(b) {
                            a =
                                b
                        }).always(function() {
                            h = !b || a;
                            p();
                            t = !0
                        })
                    },
                    s = null,
                    t = !1,
                    r = {
                        scheduleNotification: function(a, b) {
                            t || (g = a, c |= b, s && window.clearTimeout(s), s = window.setTimeout(l, 1E3))
                        }
                    };
                rea.runtime.onInstalled.addListener(b);
                rea.runtime.onUpdateAvailable.addListener(function(a) {
                    console.log("An update to version", a.version, "is available");
                    window.setTimeout(function() {
                        P.show(d.getMessage("Update"), d.getMessage("0name0_0version0_is_available__Please_re_start_your_browser_to_update_", rea.extension.manifest.name, a.version), rea.extension.getURL("images/icon128.png"),
                            6E4)
                    }, 864E5)
                });
                (function() {
                    C.registerLateCallback(function() {
                        q.setValue(n.CONSTANTS.STORAGE.LAST_START, (new Date).getTime())
                    })
                })();
                return r
            }(),
            Ha = function(a) {
                "toggle-enable" == a && (f.values.enabled = !f.values.enabled)
            },
            ya = function(a, d, c) {
                C.late ? ("auto" == f.values.scriptUrlDetection && ma.isScriptUrl(c.url) && v.installFromUrl(c.url), "loading" == d.status ? z.events.loading(c.id, 0, c.url) : "complete" == d.status && z.events.complete(c.id, 0, c.url)) : window.setTimeout(function() {
                    ya(a, d, c)
                }, 100)
            },
            Ia = function(a, d) {
                za(d, {});
                S.setIcon(a);
                S.setBadge(a)
            },
            za = function(a, d) {
                X[a] && (X[a].onClose(), delete X[a]);
                z.events.remove(a)
            },
            ta = function() {
                var a = "temporary" == f.values.incognito_mode && rea.extension.inIncognitoContext;
                q.setTemporary(a);
                a && (f.values.native_import = !1, f.values.sync_enabled = !1, f.values.scriptUpdateCheckPeriod = 0, f.values.sync_type = 0, f.values.statistics_enabled = !1)
            },
            Ja = function() {
                pa(f.values.logLevel);
                d.setLocale(f.values.i18n || n.LOCALE.DEFAULT);
                N.setPath(f.values.native_import_path);
                M.init("bg", rea.extension.manifest.version);
                M.setEnabled(f.values.statistics_enabled);
                G.init();
                z.listeners.add.onReset(function(a, c) {
                    $.clearByTabId(a);
                    x.removeStorageListeners({
                        tabid: a
                    }, !1);
                    c || S.setIcon(a)
                });
                var a = function(a) {
                    S.setIcon(a);
                    S.setBadge(a)
                };
                z.listeners.add.onCommited(a);
                z.listeners.add.onCompleted(a);
                I.init().done(function(a) {
                    a && I.sync()
                });
                Z.init();
                x.init();
                a = function() {
                    H.set_mode(f.values.downloads_mode);
                    H.set_whitelist(f.values.downloads_extension_whitelist)
                };
                a();
                H.config_changed_listener = a;
                xa.init();
                y.addInfoChangedListener(function(a) {
                    la &&
                        la.setWebRequest(a)
                });
                y.init("no" != f.values.webrequest_modHeaders);
                ka.init();
                aa.init()
            },
            A = Registry.get("uri"),
            H = Registry.get("downloads");
        uris = A;
        down = H;
        var L, ba, la, ia, w, J, d, ca;
        init = function() {
            C.init();
            y.preInit();
            rea.tabs.onUpdated.addListener(ya);
            rea.tabs.onReplaced.addListener(Ia);
            rea.tabs.onRemoved.addListener(za);
            rea.extension.onMessage.addListener(da.handler);
            rea.extension.onConnect.addListener(wa);
            rea.extension.onConnectExternal.addListener(function(a) {
                a.disconnect()
            });
            rea.commands.supported &&
                rea.commands.onCommand.addListener(Ha);
            Ga.init(function() {
                y.finalize();
                I.finalize()
            });
            L = Registry.get("convert");
            d = Registry.get("i18n");
            la = Registry.get("xmlhttprequest");
            ba = la.run;
            ia = Registry.get("compat", n);
            w = Registry.get("parser");
            J = Registry.get("syncinfo");
            ca = Registry.get("test");
            rea.browserAction.setIcon({
                path: rea.extension.getURL("images/icon_grey.png")
            });
            rea.browserAction.setPopup({
                popup: "action.html"
            });
            rea.browserAction.setTitle({
                title: "Tampermonkey"
            });
            q.init().then(function() {
                return Ba()
            }).then(function() {
                return f.init()
            }).then(function() {
                cfgo =
                    f;
                ta();
                Ja();
                Da();
                S.init();
                window.setTimeout(ja.check, 1E4);
                D && console.debug("Listeners registered!");
                window.setTimeout(C.setReady, 1);
                if (ca && Registry.isDevVersion("test")) {
                    var a = ca.framework.prepare(v.doSave, n.RUNTIME.BROWSER);
                    a && console.error(a)
                }
            })
        };
        init()
    }
});
