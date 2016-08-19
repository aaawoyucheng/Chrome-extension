var trup, init, lfgs, sycl, cfgo, uris, clip, dast, perm, blak, scbr, exts, down, D = !1;
Registry.require("promise statistics convert xmlhttprequest downloads cache storage uri compat parser helper syncinfo notify asker i18n native".split(" "), function() {
    var pa = function(a) {
            D |= 60 <= a;
            J.debug(!1);
            q.debug(D, !1);
            P.debug(D)
        },
        n = rea.FEATURES,
        ga = function() {
            var a = [],
                d = !0,
                b = function(a, b, e) {
                    var c = {
                        title: a.join("\n\n")
                    };
                    console.warn(a.join("\n"));
                    rea.browserAction.setIcon(b);
                    rea.browserAction.setTitle(c);
                    b = function(c, e, b) {
                        c = {
                            name: "1",
                            sub_menu_item: !0,
                            pos: "left",
                            items: []
                        };
                        c.items.push({
                            name: a[0],
                            image: "info"
                        });
                        1 < a.length && c.items.push({
                            name: a[1]
                        });
                        b({
                            items: [c],
                            options: {
                                enabled: !1
                            }
                        })
                    };
                    e || rea.extension.onMessage.addListener(b)
                };
            return {
                run: function() {
                    try {
                        if (Registry.verify("0").length) {
                            var a = {
                                path: rea.extension.getURL("images/icon_paused.png")
                            };
                            d = !1;
                            b(["Tampermonkey detected that browser is caching some outdated code parts.", "In order to avoid unexpected behavior TM will be kept paused until your browser was restarted."], a)
                        }
                    } catch (k) {
                        d = !1, console.error(k.message)
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
                                b(["Tampermonkey detected that the extension storage is unreliable!"],
                                    a, !0)
                            })
                        }, 1E3);
                    return d
                },
                pause: b,
                setWarning: function(b, d, e) {
                    a.push({
                        text: b,
                        description: d,
                        url: e
                    })
                },
                getWarnings: function() {
                    return a
                }
            }
        }();
    if (ga.run()) {
        var H = n.WEBREQUEST;
        D && console.debug("Starting background fred @" + qa);
        var m = Registry.get("promise"),
            s = Registry.get("helper"),
            U = Registry.get("cache"),
            L = Registry.get("statistics"),
            q = Registry.get("storage"),
            P = Registry.get("notify"),
            ha = Registry.get("asker"),
            N = Registry.get("native"),
            Q = Registry.get("permission");
        perm = Q;
        dast = q;
        var qa = s.createUUID(),
            O = {},
            $ = {};
        U.create("rundata").setOptions({
            timeout: 180,
            check_interval: 120,
            retimeout_on_get: !0
        }).init();
        U.create("resources").setOptions({
            timeout: 1800,
            check_interval: 300
        }).init();
        var M = function(a, d) {
                for (var b = function(a) {
                        return a ? s.filter(a.replace(/-/g, "."), /[\.0-9]/g) : ""
                    }, h = b(a), b = b(d), h = h.split("."), b = b.split("."), k = h.length < b.length ? h.length : b.length, e = 0; e < k; e++) {
                    h.length < k && (h[e] = 0);
                    b.length < k && (b[e] = 0);
                    if (Number(h[e]) > Number(b[e])) return 1;
                    if (Number(h[e]) < Number(b[e])) return -1
                }
                return b.length < h.length ? 1 : 0
            },
            Ca = function() {
                var a = m(),
                    d, b, h = rea.extension.manifest.version,
                    k = q.getSchemaVersion(),
                    e = k;
                q.getVersion("0.0.0.0").then(function(a) {
                    b = a;
                    d = 1 == M(h, b);
                    return q.isWiped()
                }).then(function(a) {
                    !d && a && (a = ["Tampermonkey detected inconsistencies that indicate that your browser wiped the extension database!", "You can continue to use Tampermonkey normally, but your settings and scripts might be lost. Click here to get more information.", "http://tampermonkey.net/faq.php#Q207"], console.warn(a.join("\n")), ga.setWarning.apply(this, a))
                }).always(function() {
                    var c = [],
                        p = 0,
                        g = function() {
                            if (p <
                                c.length) {
                                var b = c[p].schema;
                                c[p].cond(b) ? c[p].fn().done(function() {
                                    b && (console.log("Converted database from", e, "to", b), e = b);
                                    p++;
                                    g()
                                }).fail(function() {
                                    a.reject()
                                }) : (p++, g())
                            }
                        },
                        f = function() {
                            console.warn("Incognito mode detected. Database conversion can only be done in non-incognito mode! Stopping now...");
                            var a = {
                                path: rea.extension.getURL("images/icon_paused.png")
                            };
                            ga.pause(["Tampermonkey needs to convert its database but this can't be done in incogonito mode!", "Please open a non-incognito mode window and/or restart your browser."],
                                a)
                        },
                        c = [{
                            cond: function() {
                                return d && "chromeStorage" == n.DB.USE && !q.getValue(n.CONSTANTS.STORAGE.LEGACY_VERSION) && 1 == M("3.5.3603", b)
                            },
                            fn: function() {
                                var a = m();
                                rea.extension.inIncognitoContext ? (f(), a.reject()) : (console.log("Update database..."), e = "3.5.3603", q.migrate("sql", "chromeStorage").done(function() {
                                    console.log("Copied config for default usage of chrome storage");
                                    a.resolve()
                                }));
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return d && 1 == M("3.6.3650", e) && 1 == M("3.5.3650", b)
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) f(),
                                    a.reject();
                                else {
                                    e = "3.6.3650";
                                    var c = [];
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
                                            void 0 !== e && c.push(q.setValue(a.n, e))
                                        }
                                        c.push(q.deleteValue(a.o))
                                    });
                                    var g = /@re$/,
                                        p = [];
                                    q.listValues().forEach(function(a) {
                                        -1 != a.search(g) && (a = a.replace(g, ""), p.push(a))
                                    });
                                    p.forEach(function(a) {
                                        var e = q.getValue(a + "@st"),
                                            b = q.getValue(a),
                                            g = q.getValue(a + "@re"),
                                            p = q.getValue(a + "@source"),
                                            d = u.getUidByName(a) || s.createUUID();
                                        c.push(q.deleteValue(a + "@st"));
                                        c.push(q.deleteValue(a));
                                        c.push(q.deleteValue(a + "@re"));
                                        c.push(q.deleteValue(a + "@source"));
                                        b && g && p ? (c.push(q.setValue(n.CONSTANTS.PREFIX.SCRIPT_UID + d, a)), c.push(q.setValue(n.CONSTANTS.PREFIX.COND + d, g)), c.push(q.setValue(n.CONSTANTS.PREFIX.STORE + d, e)), c.push(q.setValue(n.CONSTANTS.PREFIX.SCRIPT + d, p)), c.push(q.setValue(n.CONSTANTS.PREFIX.META + d, b))) : console.warn("invalid script entry", {
                                            source: p,
                                            meta: b,
                                            cond: g
                                        })
                                    });
                                    g = /@st$/;
                                    q.listValues().forEach(function(a) {
                                        -1 !=
                                            a.search(g) && c.push(q.deleteValue(a))
                                    });
                                    m.when(c).done(function() {
                                        console.log("Converted database from", b, "to", e);
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "3.7.0",
                            cond: function(a) {
                                return 1 == M(a, e)
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) f(), a.reject();
                                else {
                                    var c = [],
                                        e = RegExp("^" + n.CONSTANTS.PREFIX.META);
                                    q.listValues().forEach(function(a) {
                                        if (-1 != a.search(e)) {
                                            var b = q.getValue(a);
                                            b.options && b.options.override && !b.options.override.orig_run_at && (b.options.override.orig_run_at = b.options.run_at ||
                                                "document-idle", b.options.run_at = null, c.push(q.setValue(a, b)))
                                        }
                                    });
                                    m.when(c).done(function() {
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4258",
                            cond: function(a) {
                                return 1 == M(a, e)
                            },
                            fn: function() {
                                var a = m();
                                if (rea.extension.inIncognitoContext) f(), a.reject();
                                else {
                                    var c = q.getValue(n.CONSTANTS.STORAGE.CONFIG);
                                    c && c.sync_enabled && 2 == c.sync_type && (c.sync_version = 1, q.setValue(n.CONSTANTS.STORAGE.CONFIG, c));
                                    a.resolve()
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4526",
                            cond: function(a) {
                                return d && n.RUNTIME.SAFARI && "chromeStorage" ==
                                    n.DB.USE && 1 == M(a, e)
                            },
                            fn: function() {
                                var a = m();
                                rea.extension.inIncognitoContext ? (f(), a.reject()) : (console.log("Update database..."), q.migrate("localStorage", "chromeStorage").done(function() {
                                    console.log("Copied config for default usage of setting storage");
                                    a.resolve()
                                }).fail(a.reject));
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return d || 1 == M(e, k)
                            },
                            fn: function() {
                                var a = m();
                                q.setVersion(h, e).done(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return d
                            },
                            fn: function() {
                                console.log("First run of version " +
                                    h + "!");
                                Ba.scheduleNotification(b, "0.0.0.0" == b);
                                return m.Pledge()
                            }
                        }, {
                            cond: function() {
                                return !0
                            },
                            fn: function() {
                                var c = m();
                                a.resolve();
                                window.setTimeout(c.resolve, n.MISC.TIMEOUT);
                                return c.promise()
                            }
                        }];
                    g()
                });
                return a.promise()
            },
            ia = function() {
                var a = {
                    get: function(a, b) {
                        var h = (0 == a) + "#" + b,
                            k = U.items.rundata.getj(h);
                        if (k) k.oldret.user_agent[a] = k.oldret.user_agent[k.frameId], k = k.oldret;
                        else {
                            var k = [],
                                e = 0,
                                c = {},
                                p = {};
                            if (b)
                                for (var g = t.determineScriptsToRun(b), f = 0; f < g.length; f++) {
                                    var v = g[f];
                                    v.enabled ? v.evilness && v.evilness >=
                                        l.values.script_blacklist_severity || 0 != a && (!0 === v.options.noframes || null === v.options.noframes && !0 === v.options.override.orig_noframes) || t.isContexter(v) || (v.options.user_agent && (p[a] = v.options.user_agent), c[v.name] = !0, k.push(v)) : e++
                                }
                            k = {
                                runners: k,
                                disabled: e,
                                script_map: c,
                                user_agent: p
                            };
                            b && U.items.rundata.setj(h, {
                                frameId: a,
                                oldret: k
                            })
                        }
                        return k
                    },
                    getUserAgent: function(d, b) {
                        return a.get(d, b).user_agent
                    },
                    getContexters: function(a, b) {
                        for (var h = [], k = t.determineScriptsToRun(b), e = 0; e < k.length; e++) {
                            var c = k[e];
                            c.enabled &&
                                (0 == a || !0 !== c.options.noframes && (null !== c.options.noframes || !0 !== c.options.override.orig_noframes)) && t.isContexter(c) && h.push(c)
                        }
                        return h
                    }
                };
                return a
            }(),
            w = function() {
                var a = {},
                    d = 1,
                    b = d++,
                    h = d++,
                    k = d++,
                    e = d++,
                    c = d++,
                    p = d++,
                    g = d++,
                    f = d++,
                    v = function() {
                        var a = {
                            frames: {
                                0: {
                                    state: b
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
                    x = {},
                    R = {},
                    B = {
                        listeners: {
                            once: {
                                whenReady: function(c, b) {
                                    if (!a[c] || a[c].frames[0].state < e) B.listeners.once.onReady(c, b);
                                    else b()
                                },
                                onReady: function(a, c) {
                                    var e = function(a) {
                                            B.listeners.remove.onCommited(b);
                                            B.listeners.remove.onCompleted(g);
                                            a && c()
                                        },
                                        b = B.listeners.add.onCommited(function(c) {
                                            c === a && e(!0)
                                        }),
                                        g = B.listeners.add.onCompleted(function(c) {
                                            c === a && e(!0)
                                        })
                                }
                            },
                            add: {
                                onReset: function(a) {
                                    var c = s.createUUID();
                                    r[c] = a;
                                    return c
                                },
                                onCommited: function(a) {
                                    var c = s.createUUID();
                                    x[c] = a;
                                    return c
                                },
                                onCompleted: function(a) {
                                    var c =
                                        s.createUUID();
                                    R[c] = a;
                                    return c
                                }
                            },
                            remove: function() {
                                return {
                                    onReset: function(a) {
                                        delete r[a]
                                    },
                                    onCommited: function(a) {
                                        delete x[a]
                                    },
                                    onCompleted: function(a) {
                                        delete R[a]
                                    }
                                }
                            }()
                        },
                        events: {
                            reset: function(c, e) {
                                a[c] = v();
                                a[c].frames[0].state = b;
                                s.each(r, function(a, b) {
                                    a && a(c, e)
                                })
                            },
                            request: function(c, e, b) {
                                l.values.enabled && (a[c] = a[c] || v(), a[c].frames[e] = a[c].frames[e] || {}, a[c].frames[e].state = h, b = z.woHash(b), ja.isAllowed(b) && (b = ia.getUserAgent(e, b), b[e] && B.set.extra(c, e, "user_agent", b[e])))
                            },
                            response: function(c, e,
                                g) {
                                if (l.values.enabled) {
                                    a[c] = a[c] || v();
                                    a[c].frames[e] = a[c].frames[e] || {};
                                    var p = a[c].frames[e].state || b;
                                    a[c].frames[e].state = k;
                                    0 === e && (a[c].tabs.response_ts = (new Date).getTime());
                                    g = z.woHash(g);
                                    p < k && B.scripts.determine(c, e, g);
                                    return (c = a[c].scripts[g]) ? c.runners.length : 0
                                }
                            },
                            commited: function(c, g, p) {
                                if (l.values.enabled) {
                                    var d = z.parse(p);
                                    if ("http:" === d.protocol || "https:" === d.protocol || "file:" === d.protocol) a[c] = a[c] || v(), a[c].frames[g] = a[c].frames[g] || {}, d = a[c].frames[g].state || b, a[c].frames[g].state = e,
                                        d < k && (p = z.woHash(p), B.scripts.determine(c, g, p)), s.each(x, function(a, e) {
                                            a && a(c)
                                        })
                                }
                            },
                            loading: function(e, g, p) {
                                if (l.values.enabled) {
                                    var d = z.parse(p);
                                    "http:" !== d.protocol && "https:" !== d.protocol && "file:" !== d.protocol || 0 !== g || "file:" !== d.protocol || (a[e] = a[e] || v(), a[e].frames[g] = a[e].frames[g] || {}, d = a[e].frames[g].state || b, a[e].frames[g].state = c, d < k && (p = z.woHash(p), B.scripts.determine(e, g, p)))
                                }
                            },
                            run: function(c, e, b, g, d) {
                                if (l.values.enabled) {
                                    var h = 0 === e ? e : b;
                                    a[c] = a[c] || v();
                                    a[c].frames[h] = a[c].frames[h] || {};
                                    a[c].frames[h].state = p;
                                    var k = z.woHash(g);
                                    g = a[c].scripts[k];
                                    if (!g && (B.scripts.determine(c, e, k), g = a[c].scripts[k], !g)) {
                                        console.warn("tv: no script run info for tab " + c + " @ " + k, D ? a[c].scripts : "");
                                        return
                                    }
                                    B.scripts.updateMaps(c, b, g.script_map);
                                    B.scripts.updateUrls(c, b, k);
                                    B.scripts.updateStats(c, b, g.runners.length, g.disabled);
                                    B.scripts.run(c, e, b, k, g.runners, function(e) {
                                        a[c] && delete a[c].scripts[k];
                                        d(e)
                                    })
                                }
                            },
                            complete: function(c, e, d) {
                                d = z.parse(d);
                                if (l.values.enabled && ("http:" === d.protocol || "https:" === d.protocol ||
                                        "file:" === d.protocol)) {
                                    if (0 === e) {
                                        a[c] = a[c] || v();
                                        a[c].frames[e] = a[c].frames[e] || {};
                                        var h = a[c].frames[e].state || b;
                                        a[c].frames[e].state = g;
                                        if (!w.get.empty(c) && w.get.stats(c).running) {
                                            if (h < p) {
                                                console.warn("tv: no script run info!");
                                                return
                                            }
                                            "file:" === d.protocol ? window.setTimeout(function() {
                                                rea.tabs.sendMessage(c, {
                                                    method: "onLoad",
                                                    frameId: e
                                                }, function(a) {})
                                            }, 500) : (rea.tabs.sendMessage(c, {
                                                method: "onLoad",
                                                frameId: e
                                            }, function(a) {}), F.runCheck && rea.contentSettings.javascript.clear({}))
                                        }
                                    }
                                    s.each(R, function(a, e) {
                                        a &&
                                            a(c)
                                    })
                                }
                            },
                            unload: function(c, e, b) {
                                e = 0 === e ? e : b;
                                a[c] = a[c] || v();
                                a[c].frames[e] = a[c].frames[e] || {};
                                a[c].frames[e].state = f;
                                if (a[c] && a[c].contexts.onUnload[b]) {
                                    for (e = 0; e < a[c].contexts.onUnload[b].length; e++) a[c].contexts.onUnload[b][e]();
                                    a[c].contexts.onUnload[b] = []
                                }
                            },
                            remove: function(c) {
                                delete a[c]
                            }
                        },
                        scripts: {
                            updateStats: function(c, e, b, g) {
                                a[c].stats.running += b;
                                a[c].stats.disabled += g;
                                a[c].contexts.onUnload[e] = a[c].contexts.onUnload[e] || [];
                                a[c].contexts.onUnload[e].push(function() {
                                    a[c].stats.running -= b;
                                    a[c].stats.disabled -=
                                        g
                                });
                                a[c].tabs.ts = (new Date).getTime()
                            },
                            updateMaps: function(c, e, b) {
                                var g = 1,
                                    p = function(e, b) {
                                        void 0 === a[c].maps[b] && 1 === g && (a[c].maps[b] = 0);
                                        a[c].maps[b] += g
                                    };
                                s.each(b, p);
                                a[c].contexts.onUnload[e] = a[c].contexts.onUnload[e] || [];
                                a[c].contexts.onUnload[e].push(function() {
                                    a[c] && (g = -1, s.each(b, p))
                                })
                            },
                            updateUrls: function(c, e, b) {
                                var g = 1,
                                    p = function() {
                                        void 0 === a[c].urls[b] && 1 === g && (a[c].urls[b] = 0);
                                        a[c].urls[b] += g;
                                        a[c].urls.length = -1
                                    };
                                p();
                                a[c].contexts.onUnload[e] = a[c].contexts.onUnload[e] || [];
                                a[c].contexts.onUnload[e].push(function() {
                                    a[c] &&
                                        (g = -1, p())
                                })
                            },
                            determine: function(c, e, b) {
                                var g = null;
                                ja.isAllowed(b) ? g = b : (D && console.log("This URL is filtered by the security settings:", b, "-> Do nothing!"), w.set.forbidden(c, e));
                                e = ia.get(e, g);
                                a[c].scripts[b] = e;
                                return e.runners.length
                            },
                            run: function(a, c, e, b, g, p) {
                                a = [];
                                c = n.RUNTIME.ALLOWS_FAST_DOCUMENT_START && l.values.runtime_fastDocumentStart;
                                for (e = 0; e < g.length; e++) {
                                    var d = g[e];
                                    a.push(ra.bundle({
                                        url: b
                                    }, d, c && ("document-start" === d.options.run_at || !d.options.run_at && "document-start" === d.options.override.orig_run_at)))
                                }
                                m.when(a).always(p)
                            }
                        },
                        set: {
                            extra: function(c, e, b, g) {
                                a[c] = a[c] || v();
                                null === e ? a[c].extra[b] = g : (a[c].extra[b] = a[c].extra[b] || {}, a[c].extra[b][e] = g)
                            },
                            blocker: function(a, c) {
                                B.set.extra(a, null, "blocker", !0)
                            },
                            forbidden: function(a, c) {
                                0 === c && B.set.extra(a, null, "forbidden", !0)
                            }
                        },
                        get: {
                            extra: function(c, e, b, g) {
                                void 0 === g && (g = null);
                                var p = null,
                                    p = (a[c] ? a[c].extra : {})[b];
                                null !== e && p && (p = p[e]);
                                return p || g
                            },
                            empty: function(c) {
                                var e = !0;
                                if (a[c] && 0 != a[c].urls.length) {
                                    if (-1 == a[c].urls.length) return a[c].urls.length = 0, s.each(a[c].urls, function(e,
                                        b) {
                                        "length" !== b && 0 < e && a[c].urls.length++
                                    }), B.get.empty(c);
                                    e = !1
                                }
                                return e
                            },
                            urls: function(c) {
                                return a[c] ? a[c].urls : {}
                            },
                            stats: function(c, e) {
                                var b = {};
                                if (a[c] && (b.running = a[c].stats.running, b.disabled = a[c].stats.disabled, e)) {
                                    b.unique = 0;
                                    for (var g in a[c].maps) a[c].maps.hasOwnProperty(g) && 0 < a[c].maps[g] && b.unique++
                                }
                                return b
                            },
                            tabs: function() {
                                var c = {};
                                s.each(a, function(a, e) {
                                    c[e] = {
                                        ts: a.response_ts
                                    }
                                });
                                return c
                            },
                            blocker: function(a) {
                                return B.get.extra(a, null, "blocker")
                            },
                            forbidden: function(a, c, e) {
                                return B.get.extra(a,
                                    null, "forbidden")
                            },
                            user_agent: function(a, c) {
                                return B.get.extra(a, c, "user_agent")
                            }
                        }
                    };
                return B
            }(),
            sa = function() {
                return {
                    isScriptUrl: function(a) {
                        if (!a || -1 != a.search(/\#bypass=true/) || -1 != a.search(n.REQUESTS.GET_INTERNAL_PAGE_REGEXP())) return !1;
                        a = a.split(/[\?#$]/)[0];
                        var d = -1 != a.search(/\.user\.(js\#|js\?|js$)/) || -1 != a.search(/\.tamper\.(js\#|js\?|js$)/);
                        return d ? !(-1 != a.search(/^htt[ps]{1,2}:\/\/code\.google\.com/) || -1 != a.search(/^htt[ps]{1,2}:\/\/github\.com/) && -1 == a.search(/^htt[ps]{1,2}:\/\/github\.com\/[a-zA-Z0-9%-]\/[a-zA-Z0-9%-]\/raw\//)) :
                            d
                    }
                }
            }(),
            ta = function() {
                var a = function(a) {
                    var b = m(),
                        h = (new Date).getTime();
                    a.url += -1 != a.url.search("\\?") ? "&" : "?";
                    a.url += "ts=" + h;
                    var h = function(c) {
                            if (4 == c.readyState && (200 == c.status || 0 == c.status))
                                if ("arraybuffer" == k.responseType) {
                                    if (c.response) {
                                        b.resolve({
                                            decoded: !0,
                                            encoding: a.encoding,
                                            content: K.arrbuf2str(c.response, a.encoding)
                                        });
                                        return
                                    }
                                } else if (null !== c.response && void 0 !== c.response) {
                                b.resolve({
                                    decoded: !0,
                                    encoding: a.encoding,
                                    content: c.response
                                });
                                return
                            }
                            b.reject({
                                content: ""
                            })
                        },
                        k = {
                            method: "GET",
                            retries: 0,
                            responseType: "arraybuffer",
                            url: a.url
                        };
                    if (a.sync) {
                        var e = W(k, {});
                        4 == e.readyState && 403 == e.status && (delete k.responseType, e = W(k, {}));
                        h(e)
                    } else W(k, {
                        ondone: h
                    });
                    return b.promise()
                };
                return {
                    getSource: function(d) {
                        "string" === typeof d && (d = {
                            url: d
                        });
                        return a(d)
                    }
                }
            }();
        lfgs = ta;
        var ja = function() {
                return {
                    isAllowed: function(a) {
                        var d = !1,
                            b = !1,
                            h = 0 != l.values.forbiddenPages.length,
                            k = 0 != l.values.page_whitelist.length;
                        switch (l.values.page_filter_mode) {
                            case "black":
                                b = h;
                                break;
                            case "off":
                                break;
                            case "white":
                                d = k;
                                break;
                            default:
                                d =
                                    k, b = h
                        }
                        h = {
                            inc: d ? l.values.page_whitelist : void 0,
                            exc: b ? l.values.forbiddenPages : void 0
                        };
                        return !b && !d || t.validUrl(a, h)
                    }
                }
            }(),
            ba = function() {
                var a = {
                    init: function() {
                        var d = m(),
                            b = function() {
                                "server" === l.values.script_blacklist_type && window.setTimeout(a.checkUpdate, 2E4)
                            };
                        b();
                        l.addChangeListener("script_blacklist_type", b);
                        d.resolve();
                        return d.promise()
                    },
                    getEvilnessOf: function(a) {
                        if ("off" === l.values.script_blacklist_type) return !1;
                        if (!a) return 0;
                        var b = !1,
                            h = 0,
                            k = function(e) {
                                var c = !1;
                                if (e.length) return (c = "/" == e.substr(0,
                                    1) ? t.matchUrl(a, e) : -1 != a.search(e)) && console.debug('black: entry "' + e + '" matched'), b |= c, !0 != b
                            };
                        s.each(l.values.require_blacklist, k);
                        b ? h = 11 : "server" === l.values.script_blacklist_type && s.each(l.values.script_blacklist_server, function(a) {
                            if (a && (s.each(a.rules, function(a) {
                                    k(a);
                                    return !0 != b
                                }), b)) return h = a.severity, !1
                        });
                        return Number(h)
                    },
                    checkUpdate: function(a) {
                        var b = m(),
                            h = aa.getConfig(),
                            k;
                        if (a || 6048E5 < (new Date).getTime() - h.black.last) {
                            var e = function(a) {
                                var e = m();
                                W({
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
                            e("https://blacklist.tampermonkey.net/get.php?version=get").then(function(c) {
                                if (4 == c.readyState && 200 == c.status) {
                                    try {
                                        k = JSON.parse(c.responseText).version
                                    } catch (b) {
                                        console.log("black: unable to parse version response! " + c.responseText)
                                    }
                                    console.log("black: local version: " + h.black.version + " remote: " + k);
                                    if (k > h.black.version || a) return e("https://blacklist.tampermonkey.net/get.php")
                                }
                            }).then(function(a) {
                                if (a &&
                                    4 == a.readyState && 200 == a.status) try {
                                    var e = JSON.parse(a.responseText);
                                    e && e.blacklist && 1 == e.version && (l.values.script_blacklist_server = e.blacklist);
                                    console.log("black: updated blacklist to ", e)
                                } catch (b) {
                                    console.log("black: blacklist update failed! ", a.responseText)
                                }
                            }).always(function() {
                                h = aa.getConfig();
                                h.black.last = (new Date).getTime();
                                h.black.version = k || h.black.version;
                                aa.setConfig(h);
                                b.resolve()
                            })
                        } else b.resolve();
                        return b.promise()
                    }
                };
                return a
            }();
        blak = ba;
        var Da = function() {
                for (var a = [], d = [], b = 0; b < a.length; b++) {
                    var h =
                        Registry.getRaw("system/" + a[b] + ".tamper.js");
                    h && d.push(h)
                }
                return d
            },
            I = function() {
                var a = 0,
                    d = [],
                    b = {
                        to: null,
                        force: null,
                        t: 0
                    },
                    h = {},
                    k = function(a) {
                        D && console.debug("sync: import", a.uuid, a.name, a.url);
                        var c = {
                                imported: l.values.sync_type
                            },
                            e = {},
                            b;
                        for (b in r.SYNCED) !0 === r.SYNCED[b] && (e[b] = a.options[b]);
                        return t.installFromUrl(a.url, {
                            uuid: a.uuid,
                            ask: !1,
                            internal: !0,
                            sync: c,
                            force_options: e
                        }, {
                            silent_fail: !0
                        })
                    },
                    e = function(a) {
                        D && console.debug("sync: export", a.name, a.url);
                        return J.add(a)
                    },
                    c = function(a) {
                        var c = a.downloadURL ?
                            a.downloadURL.split("#")[0] : null,
                            e = a.fileURL ? a.fileURL.split("#")[0] : null,
                            b = s.select([e, c], function(a) {
                                if (!a || "file:" !== z.parse(a).protocol) return a
                            })[0],
                            c = {
                                uuid: a.uuid,
                                name: a.name,
                                options: {},
                                durl: c,
                                furl: e,
                                url: b
                            },
                            g;
                        for (g in r.SYNCED) !0 === r.SYNCED[g] && null !== a.options[g] && (c.options[g] = a.options[g]);
                        return c
                    },
                    p = function() {
                        var a = [];
                        u.getUidList().forEach(function(e) {
                            e = u.getByUid(e);
                            e.script && e.cond && a.push(c(e.script))
                        });
                        return a
                    },
                    g = function(c) {
                        if (r.enabled)
                            if (0 < a) c && r.addSyncDoneCallback(function(a) {
                                a &&
                                    r.sync(50, c)
                            });
                            else {
                                a++;
                                var b = null,
                                    g = null,
                                    A = !0,
                                    v = {},
                                    n = function(a) {
                                        if (a) {
                                            (a = a.split("#")[0]) && (a = a.toLowerCase());
                                            for (var c = 0; c < b.length; c++) {
                                                var e = b[c].furl ? b[c].furl.toLowerCase() : null,
                                                    g = b[c].durl ? b[c].durl.toLowerCase() : null;
                                                if (e == a || g == a) return b[c]
                                            }
                                        }
                                        return null
                                    },
                                    q = function(a) {
                                        if (a)
                                            for (var c = 0; c < g.length; c++)
                                                if (g[c].uuid == a) return g[c];
                                        return null
                                    },
                                    s = function(a) {
                                        if (a) {
                                            a = a.split("#")[0];
                                            for (var c = 0; c < g.length; c++)
                                                if (g[c].url == a) return g[c]
                                        }
                                        return null
                                    },
                                    w = function(a) {
                                        if (!a) return null;
                                        for (var c =
                                                0; c < b.length; c++)
                                            if (b[c].uuid == a) return b[c]
                                    };
                                (function() {
                                    b = p();
                                    return J.list().done(function(a) {
                                        g = a
                                    }).fail(function() {
                                        D && console.error("sync: unable to get remotelist!")
                                    })
                                })().then(function() {
                                    for (var a = m(), c = [], e = 0; e < g.length; e++) c.push(function() {
                                        var a = g[e],
                                            c = !1,
                                            b = !1,
                                            p = 2 == l.values.sync_version ? w(a.uuid) : n(a.url);
                                        if (p)
                                            if (c = !0, v[a.url] = !0, a.uuid && (v[a.uuid] = !0), a.content && K.MD5(a.content) != K.MD5(p.textContent)) b = !0;
                                            else
                                                for (var d in r.SYNCED)
                                                    if (!0 === r.SYNCED[d] && p.options[d] != a.options[d]) {
                                                        b = !0;
                                                        break
                                                    }
                                        if (c)
                                            if (a.options.removed) D &&
                                                console.debug("sync: remove local script", a.uuid, a.name, a.url), t.doRemove(p.uuid, !1);
                                            else if (b)
                                            if (D && console.debug("sync: update local script", a.uuid, a.name, a.url), b = u.getByUid(p.uuid), b.script && b.cond) {
                                                for (d in r.SYNCED) !0 === r.SYNCED[d] && (b.script.options[d] = a.options[d]);
                                                a.content && (b.script.textContent = a.content);
                                                t.doModify(b.script.uuid, b.script, !1)
                                            } else console.log(f.getMessage("fatal_error") + "(" + p.name + ")!!!");
                                        if (!c && !a.options.removed)
                                            if (c = m(), h[a.url] || a.uuid && h[a.uuid]) D && console.warn("sync: skip previously failed import",
                                                a);
                                            else return k(a).done(function(c) {
                                                c || (D && console.warn("sync: unable to import", a), h[a.url] = !0, a.uuid && (h[a.uuid] = !0))
                                            }).fail(function() {
                                                D && console.warn("sync: unable to load", a);
                                                h[a.url] = !0;
                                                a.uuid && (h[a.uuid] = !0)
                                            }).always(c.resolve), c.promise();
                                        return m.Pledge()
                                    }());
                                    m.when(c).done(function() {
                                        a.resolve()
                                    });
                                    return a.promise()
                                }).then(function() {
                                    b = p();
                                    return m.Pledge()
                                }).then(function() {
                                    if (!J.isWritable()) return m.Pledge();
                                    for (var a = m(), c = [], g = 0; g < b.length; g++) c.push(function() {
                                        var a = b[g],
                                            c = !1;
                                        if (!a.url ||
                                            v[a.url] || v[a.uuid]) return m.Pledge();
                                        if (2 == l.values.sync_version ? q(a.uuid) : s(a.url)) c = !0;
                                        return c ? m.Pledge() : e(a).done(function(a) {})
                                    }());
                                    m.when(c).done(function() {
                                        a.resolve()
                                    });
                                    return a.promise()
                                }).fail(function() {
                                    A = !1
                                }).done(function() {
                                    A = !0
                                }).always(function() {
                                    D && console.debug("sync: finished");
                                    if (0 == --a)
                                        for (var c = A; d.length;) d.shift()(c)
                                })
                            }
                    },
                    A = function(a, c) {
                        r.enabled && r.sync(500, !0)
                    },
                    v = null,
                    r = {
                        enabled: !1,
                        SYNCED: {
                            comment: !0
                        },
                        createTeslaData: function() {
                            for (var a = m(), c = [], e = p(), b = 0; b < e.length; b++)
                                if (e[b].url) {
                                    var g =
                                        JSON.stringify(e[b].options),
                                        g = e[b].name.replace(/\|/g, "!") + "|" + g + "|" + e[b].url.replace(/\|/g, "%7C");
                                    c.push(g)
                                }
                            a.resolve(c);
                            return a.promise()
                        },
                        configChangeListener: function(a, c, e) {
                            v || (v = window.setTimeout(function() {
                                v = null;
                                r.init().done(function() {
                                    r.enabled && r.sync(3E3)
                                })
                            }, 3E3))
                        },
                        init: function() {
                            var a = m();
                            r.enabled = !1;
                            (function() {
                                return l.values.sync_enabled && l.values.sync_type ? J.init(l.values.sync_type, l.values.sync_version, l.values.sync_id).done(function(a) {
                                    r.enabled = a;
                                    r.enabled ? J.addChangeListener(A) :
                                        console.warn("sync: init failed!")
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
                            d.push(a)
                        },
                        sync: function(a, c) {
                            var e = (new Date).getTime();
                            a = a || 500;
                            c = b.force || c;
                            b.to ? (window.clearTimeout(b.to), b.ts < e + a && (a = b.ts - e, 1 > a && (a = 1))) : D && console.debug("sync: schedule sync for run in " + a + " ms");
                            b.force = c;
                            b.ts = e + a;
                            b.to = window.setTimeout(function() {
                                g(b.force);
                                b.to = null;
                                b.force = null
                            }, a)
                        },
                        scriptAddedCb: function(a,
                            b) {
                            if (r.enabled && J.isWritable()) {
                                var g = c(b);
                                g.url && z.parse(g.url).protocol.match(/https?:/) && e(g)
                            }
                        },
                        scriptChangedCb: function(a, b, g) {
                            if (r.enabled && J.isWritable() && (a = c(b), a.url))
                                for (var p in r.SYNCED)
                                    if (!0 === r.SYNCED[p] && b.options[p] != g.options[p]) {
                                        e(a);
                                        break
                                    }
                        },
                        scriptRemovedCb: function(a, e) {
                            if (r.enabled && J.isWritable()) {
                                var b = c(e);
                                b.url && (D && console.debug("sync: remove", b.name, b.url), J.remove(b))
                            }
                        }
                    };
                return r
            }();
        sycl = I;
        var Ea = function(a) {
                l.addChangeListener("scriptblocker_overwrite", F.init);
                l.addChangeListener("sync_enabled",
                    I.configChangeListener);
                l.addChangeListener("sync_type", I.configChangeListener);
                l.addChangeListener("sync_id", I.configChangeListener);
                l.addChangeListener("sync_version", I.configChangeListener);
                l.addChangeListener("logLevel", function() {
                    pa(l.values.logLevel)
                });
                l.addChangeListener("i18n", function() {
                    f.setLocale(l.values.i18n)
                });
                l.addChangeListener("native_import_path", function() {
                    N.setPath(l.values.native_import_path)
                });
                l.addChangeListener("incognito_mode", function() {
                    ua()
                });
                l.addChangeListener("statistics_enabled",
                    function() {
                        L.setEnabled(l.values.statistics_enabled)
                    });
                l.addChangeListener("require_blacklist", t.blackCheckAll);
                l.addChangeListener("script_blacklist_server", t.blackCheckAll);
                l.addChangeListener("script_blacklist_type", t.blackCheckAll);
                l.addChangeListener("downloads_extension_whitelist", G.config_changed_listener);
                l.addChangeListener("downloads_mode", G.config_changed_listener)
            },
            l = function() {
                var a;
                a = "// ==UserScript==\n// @name         NewUserscript\n";
                a += "// @namespace    homepage\n";
                a += "// @version      1.0\n";
                a += "// @description  enter something useful\n";
                a += "// @author       You\n";
                a += "// @match        <$URL$>\n";
                a += "// @grant        none\n";
                a += "// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.3.js\n";
                a += "// ==/UserScript==\n\n";
                var d = {},
                    b = {
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
                        scriptTemplate: a,
                        scriptUpdateCheckPeriod: 864E5,
                        scriptUpdateHideNotificationAfter: 15E3,
                        scriptUpdateCheckDisabled: !1,
                        runtime_fastDocumentStart: !0,
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
                        incognito_mode: "temporary",
                        layout: "default",
                        sync_enabled: !1,
                        sync_type: 2,
                        sync_version: 2,
                        sync_id: "",
                        statistics_enabled: !0,
                        downloads_mode: "default",
                        downloads_extension_whitelist: "/^[^\\.]*$/ /\\.mp[34]$/ .wav /\\.(avi|mkv|flv|divx|mpe?g)$/ /\\.(ico|gif|png|jpe?g)/ /\\.(srt|sub|idx)$/ .txt .iso .zip /\\.r(ar|[0-9]{2,2})$/".split(" "),
                        external_update_interval: 6048E5,
                        require_timeout: 2E4,
                        require_blacklist: ["/^https?:\\/\\/example.com(:[0-9]{1,5})?\\/.*/"],
                        script_blacklist_server: [],
                        script_blacklist_type: "server",
                        script_blacklist_severity: 4,
                        page_filter_mode: "black",
                        page_whitelist: ["/https?:\\/\\/greasyfork\\.org\\/.*/",
                            "http://xkcd.com/970/"
                        ],
                        forbiddenPages: "*.paypal.tld/* https://*deutsche-bank-24.tld/* https://*bankamerica.tld/* /^.*:\\/\\/apis\\.google\\.com\\/((?!render)([^\\/]+)\\/)+([^\\/]+)?$/ *://www.facebook.com/plugins/* *://platform.twitter.com/widgets/*".split(" ")
                    },
                    h = function(a, c) {
                        var p = q.getValue(n.CONSTANTS.STORAGE.CONFIG, {}),
                            g = void 0 === p[a] ? b[a] : p[a];
                        d[a] && JSON.stringify(g) != JSON.stringify(c) && d[a].forEach(function(b) {
                            window.setTimeout(function() {
                                b(a, g, c)
                            }, 1)
                        });
                        p[a] = c;
                        q.setValue(n.CONSTANTS.STORAGE.CONFIG,
                            p)
                    },
                    k = {
                        init: function() {
                            var a = m();
                            k.values = {};
                            for (var c in b) b.hasOwnProperty(c) && function() {
                                var a = c;
                                k.values.__defineGetter__(a, function() {
                                    var c = q.getValue(n.CONSTANTS.STORAGE.CONFIG, {});
                                    return void 0 === c[a] ? b[a] : c[a]
                                });
                                k.values.__defineSetter__(a, function(c) {
                                    h(a, c)
                                })
                            }();
                            k.images = {};
                            k.images.icon = "images/icon.png";
                            k.initialized = !0;
                            var p = Da(),
                                g;
                            for (g in p) {
                                var d = p[g];
                                window.setTimeout(function() {
                                    t.doSave({
                                        url: null,
                                        src: d,
                                        ask: !1,
                                        replace: !0,
                                        internal: !0
                                    })
                                }, 1)
                            }
                            a.resolve();
                            return a.promise()
                        },
                        addChangeListener: function(a,
                            c) {
                            d[a] || (d[a] = []);
                            d[a].push(c)
                        }
                    };
                return k
            }(),
            W = function(a, d) {
                return da(a, d, {
                    internal: !0
                })
            },
            S = function() {
                var a = {
                        key: function(a, e) {
                            return n.CONSTANTS.PREFIX.EXTERNAL + s.select([a, e ? K.MD5(e) : null], function(a) {
                                return a
                            }).join(":")
                        },
                        list: function(a) {
                            var e = RegExp("^" + a);
                            return s.select(q.listValues(), function(a) {
                                return -1 != a.search(e)
                            })
                        },
                        set: function(c, e, b) {
                            c = a.key(c, e);
                            var d = {};
                            s.each(b, function(a, c) {
                                "content" == c && (c = "base", a = K.encodeS(a));
                                d[c] = a
                            });
                            q.setValue(c, {
                                ts: (new Date).getTime(),
                                url: e,
                                resource: d
                            })
                        },
                        get: function(c, e) {
                            var b = a.key(c, e),
                                b = q.getValue(b),
                                d;
                            if (b && b.resource) {
                                var h = {};
                                s.each(b.resource, function(a, c) {
                                    "base" == c && (c = "content", a = K.decodeS(a));
                                    h[c] = a
                                });
                                d = {
                                    ts: b.ts,
                                    url: b.url,
                                    data: h
                                }
                            }
                            return d
                        },
                        clean: function(c, e) {
                            var b = a.key(c, e);
                            q.deleteValue(b)
                        },
                        cleanAll: function(c, e) {
                            var b, d = a.list(a.key(c));
                            if (e) {
                                var h = {};
                                s.each(e, function(e) {
                                    e = a.key(c, e);
                                    h[e] = !0
                                });
                                b = [];
                                s.each(d, function(a) {
                                    h[a] || b.push(a)
                                })
                            } else b = d;
                            b.forEach(function(a) {
                                q.deleteValue(a)
                            })
                        }
                    },
                    d = function(a, e) {
                        var b = m(),
                            d = {
                                method: "GET",
                                url: a,
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                responseType: e.via_arraybuffer ? "arraybuffer" : void 0
                            },
                            h = function(d) {
                                var h = {
                                    content: ""
                                };
                                if (4 != d.readyState || 200 != d.status && 0 != d.status) b.reject(h);
                                else {
                                    var k, f = d.responseHeaders ? d.responseHeaders.split("\n") : null,
                                        l;
                                    for (l in f) {
                                        var A = f[l].split(":"),
                                            r = A.shift() || "",
                                            A = A.join(":") || "";
                                        if ("content-type" == r.trim().toLowerCase() && -1 != A.search("image")) {
                                            k = A.trim();
                                            break
                                        }
                                    }
                                    k || (-1 != a.search(".ico$") || -1 != a.search(".jpg$") ? k = "image/x-icon" : -1 != a.search(".gif$") ? k = "image/gif" : -1 !=
                                        a.search(".png$") ? k = "image/png" : s.isLocalImage(a) && (k = "image/x-icon"));
                                    h.meta = k;
                                    h.content = e.via_arraybuffer ? K.arrbuf2str(d.response) : d.responseText;
                                    b.resolve(h)
                                }
                            },
                            k = function(a) {
                                b.reject({})
                            };
                        e.sync ? h(W(d, {})) : (d.timeout = l.values.require_timeout, W(d, {
                            onload: h,
                            onerror: k,
                            ontimeout: k
                        }));
                        return b.promise()
                    },
                    b = s.getDebouncer(9E3),
                    h = function(c, e, b) {
                        b.no_storage = !0;
                        k(c, e, b).done(function(b) {
                            a.set(c, e, b.resource)
                        }).fail(function(a) {}).always(function(b) {
                            (b = a.get(c, e)) && b.data ? a.set(c, e, b.data) : console.warn("externals: should never happen!")
                        })
                    },
                    k = function(c, e, g) {
                        var k = m(),
                            f = z.parse(e),
                            r = {
                                sync: g.sync
                            },
                            x;
                        if (e)
                            if (ba.getEvilnessOf(e) >= l.values.script_blacklist_severity) r.resource = {
                                blacklisted: !0,
                                content: ""
                            }, k.reject(r);
                            else if (!g.no_storage && "file:" !== f.protocol && (x = a.get(c, e))) {
                            var R = a.key(c, e),
                                B = (new Date).getTime();
                            0 < l.values.external_update_interval && B - x.ts > l.values.external_update_interval && !b.is(R) && (1 < l.values.external_update_interval && b.add(R), D && console.log("externals: resource needs update", e, (new Date(x.ts)).toISOString(), (new Date(B)).toISOString()),
                                window.setTimeout(function() {
                                    h(c, e, g)
                                }, 3E3));
                            r.resource = x.data;
                            k.resolve(r)
                        } else r.sync = !1, "file:" == f.protocol && -1 == e.search(n.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) ? (n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || console.warn("externals: Access to local files is forbidden! Loading the following @resource may fail:", e, "-> more info:", "http://tampermonkey.net/faq.php#Q204"), x = ta.getSource({
                            url: e,
                            encoding: g.encoding
                        })) : x = d(e, {
                            via_arraybuffer: g.via_arraybuffer
                        }), x.done(function(b) {
                            !g.no_storage && f.protocol && "file:" !==
                                f.protocol && -1 == e.search(n.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) && a.set(c, e, b);
                            r.resource = b;
                            k.resolve(r)
                        }).fail(function(a) {
                            D && console.log("externals: get.failed", c, e, a);
                            r.resource = {
                                failed: !0,
                                content: ""
                            };
                            k.reject(r)
                        });
                        else r.resource = {
                            forbidden: !0,
                            content: ""
                        }, k.reject(r);
                        return k.promise()
                    },
                    e = {
                        getElement: function(c, e) {
                            return a.get(c, e)
                        },
                        cleanElement: function(c, e) {
                            return a.clean(c, e)
                        },
                        dropAll: function(c) {
                            a.cleanAll(c);
                            return m.Pledge()
                        },
                        dropAllBut: function(c, e) {
                            a.cleanAll(c, e);
                            return m.Pledge()
                        },
                        loadResources: function(a, b) {
                            var g = m();
                            e.getResources(a, b).always(function() {
                                g.resolve()
                            });
                            return g.promise()
                        },
                        loadRequires: function(a, b) {
                            var g = m();
                            e.getRequires(a, b).always(function() {
                                g.resolve()
                            });
                            return g.promise()
                        },
                        getResources: function(a, e) {
                            var b = {
                                    elements: []
                                },
                                d = m(),
                                h = [],
                                f = {
                                    via_arraybuffer: !0,
                                    sync: !0
                                };
                            e.forEach(function(e) {
                                var d = {
                                        name: e.name
                                    },
                                    p = k(a, e.url, f),
                                    l = m();
                                p.done(function(a) {
                                    a = a.resource;
                                    var c = [e.url, a.content.length].join(),
                                        b = U.items.resources.get(c) || {};
                                    try {
                                        d.resText = b.resText ? b.resText :
                                            K.UTF8.decode(a.content)
                                    } catch (g) {
                                        d.resText = ""
                                    }
                                    try {
                                        d.resURL = b.resUrl ? b.resURL : a.meta ? "data:" + a.meta + ";base64," + K.Base64.encode(a.content) : K.Base64.encode(a.content)
                                    } catch (h) {
                                        d.resURL = e.url
                                    }
                                    U.items.resources.set(c, {
                                        resText: d.resText,
                                        resURL: d.resURL
                                    })
                                }).fail(function(a) {
                                    a.resource && a.resource.forbidden ? console.warn("externals: can't load @resource", e.name, "from forbidden URL", e.unsafe_url) : a.resource && a.resource.blacklisted ? console.warn("externals: can't load @resource", e.name, "from blacklisted URL",
                                        e.unsafe_url) : console.warn("externals: can't load @resource", e.name, "from URL", e.unsafe_url);
                                    d.resText = "";
                                    d.resURL = ""
                                }).always(function(a) {
                                    f.sync &= a.sync;
                                    b.elements.push(d);
                                    l.resolve()
                                });
                                h.push(l)
                            });
                            m.when(h).always(function() {
                                b.sync = f.sync;
                                d.resolve(b)
                            });
                            return d.promise()
                        },
                        getRequires: function(a, e) {
                            var b = {
                                    elements: []
                                },
                                d = m(),
                                h = [],
                                f = {
                                    encoding: "UTF-8",
                                    sync: !0
                                };
                            s.each(e, function(e, d) {
                                var p = {},
                                    l = k(a, e.url, f),
                                    A = m();
                                l.done(function(a) {
                                    p.textContent = a.resource.content || ""
                                }).fail(function(a) {
                                    a.resource &&
                                        a.resource.forbidden ? (p.textContent = '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") is not allowed!\n', console.warn("externals: can't load @require from forbidden URL", e.unsafe_url)) : a.resource && a.resource.blacklisted ? (p.textContent = '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") is blacklisted!\n', console.warn("externals: can't load @require from blacklisted URL", e.unsafe_url)) : (p.textContent = '// this @require ("' + encodeURIComponent(e.unsafe_url) + '") could not be loaded!\n',
                                            console.warn("externals: can't load @require from URL", e.unsafe_url))
                                }).always(function(a) {
                                    f.sync &= a.sync;
                                    b.elements[d] = p;
                                    A.resolve()
                                });
                                h.push(A)
                            });
                            m.when(h).always(function() {
                                b.sync = f.sync;
                                b.elements = b.elements.filter(function(a) {
                                    return a
                                });
                                d.resolve(b)
                            });
                            return d.promise()
                        }
                    };
                return e
            }();
        exts = S;
        var ra = function() {
                var a = function(a, b, h) {
                    var k = m(),
                        e = [];
                    h.forEach(function(c) {
                        c = c.textContent || "";
                        c = ka.mkCompat(c, a.options.compatopts_for_requires ? a : null, !1);
                        e.push(c)
                    });
                    h = "\n" + e.join("\n") + "\n";
                    var c = u.getStorageByUid(a.uuid);
                    b = ka.mkCompat(b, a, !1);
                    l.values.debug && (b = "debugger;\n" + b);
                    k.resolve({
                        header: a.header,
                        code: b,
                        requires: h,
                        storage: c,
                        script: a
                    });
                    return k.promise()
                };
                return {
                    bundle: function(d, b, h) {
                        var k = {},
                            e;
                        for (e in b) "includes" != e && "matches" != e && "requires" != e && "resources" != e && "excludes" != e && "textContent" != e && ("options" == e ? (k[e] = JSON.parse(JSON.stringify(b[e])), k[e].run_at = k[e].run_at || b.options.override.orig_run_at || "document-idle") : k[e] = b[e]);
                        return S.getResources(k.uuid, b.resources).then(function(a) {
                            h && !a.sync && (D &&
                                console.warn("ri: uncached @external detected -> fast script start disabled"), h = a.sync);
                            k.resources = a.elements;
                            return S.getRequires(k.uuid, b.requires)
                        }).then(function(c) {
                            h && !c.sync && (D && console.warn("ri: uncached @external detected -> fast script start disabled"), h = c.sync);
                            c = c.elements;
                            console.log("run script " + k.name + " @ " + d.url);
                            return a(k, b.textContent, c)
                        })
                    }
                }
            }(),
            va = function(a) {
                a && (a += (-1 == a.search("\\?") ? "?" : "&") + "ts=" + (new Date).getTime());
                return a
            },
            wa = function() {
                var a = rea.extension.getViews({
                    type: "popup"
                });
                a && a.length && rea.extension.sendMessage({
                    method: "updateActions"
                }, function(a) {})
            },
            aa = function() {
                return {
                    getConfig: function() {
                        var a = {
                                version: 0,
                                last: 0
                            },
                            d = {
                                scripts: 0
                            },
                            b = q.getValue(n.CONSTANTS.STORAGE.UPDATE, d);
                        "object" !== typeof b && (b = d);
                        b || (b = d);
                        void 0 == b.black && (b.black = a);
                        void 0 == b.scripts && (b.scripts = 0);
                        return b
                    },
                    setConfig: function(a) {
                        a && q.setValue(n.CONSTANTS.STORAGE.UPDATE, a)
                    }
                }
            }(),
            X = {
                check: function(a, d, b, h) {
                    if (a || 0 != l.values.scriptUpdateCheckPeriod) {
                        var k = function(a) {
                            if (d) {
                                a = f.getMessage("Script_Update");
                                var c = f.getMessage("Check_for_userscripts_updates") + "...";
                                P.show(a, c, rea.extension.getURL("images/icon128.png"), 1E4)
                            }
                            console.log("update: check for script updates " + (b ? " for " + b : ""));
                            X.updateUserscripts(0, d, b, function(a, c) {
                                if (a) try {
                                    var e = b || c.uuid,
                                        d = function(a) {
                                            a.clicked && t.doSave({
                                                url: c.url,
                                                uuid: e,
                                                replace: !e,
                                                src: c.code,
                                                ask: !l.values.notification_silentScriptUpdate,
                                                hash: c.newhash
                                            })
                                        },
                                        k = f.getMessage("There_is_an_update_for_0name0_avaiable_", c.name) + "\n" + f.getMessage("Click_here_to_install_it_"),
                                        x = f.getMessage("Just_another_service_provided_by_your_friendly_script_updater_") +
                                        ":";
                                    l.values.notification_silentScriptUpdate ? d({
                                        clicked: !0
                                    }) : P.show(x, k, rea.extension.getURL("images/icon128.png"), l.values.scriptUpdateHideNotificationAfter, d)
                                } catch (m) {
                                    console.error("update: notification error " + m.message)
                                }
                                h && h(a)
                            })
                        };
                        (function() {
                            var e = aa.getConfig();
                            if (a || (new Date).getTime() - e.scripts > l.values.scriptUpdateCheckPeriod) {
                                var c = function() {
                                        b && (window.clearTimeout(b), b = null);
                                        g && g.cancel();
                                        k();
                                        e = aa.getConfig();
                                        e.scripts = (new Date).getTime();
                                        aa.setConfig(e)
                                    },
                                    b, g, A = function() {
                                        g = null;
                                        var a =
                                            f.getMessage("Script_Update"),
                                            c = f.getMessage("Waiting_for_sync_to_finish") + "...";
                                        g = P.show(a, c, rea.extension.getURL("images/icon128.png"), 6E4)
                                    };
                                I.enabled ? (I.addSyncDoneCallback(c), I.sync(50, !1), d && (b = window.setTimeout(A, 500))) : c()
                            } else h && (console.warn("update: check -> no force but callback"), window.setTimeout(h, 1))
                        })();
                        window.setTimeout(X.check, 3E5)
                    }
                },
                srcCmp: function(a, d) {
                    var b = V.createScriptFromSrc(d);
                    if (!b.name || "" == b.name || void 0 === b.version) return -2;
                    var h = u.getMetaByUid(a);
                    return h && h.system ?
                        null : b.options.compat_uW_gmonkey ? -2 : -1 != b.name.search("@") ? -2 : h && b.version == h.version ? 0 : h && -1 == M(b.version, h.version) ? -1 : 1
                },
                updateUserscripts: function(a, d, b, h) {
                    var k = 1,
                        e = 0,
                        c = function() {
                            0 == --k && 0 == e && (d && (D && console.debug("No update found"), P.show("Narf!", f.getMessage("No_update_found__sry_"), rea.extension.getURL("images/icon128.png"), 1E4)), h && window.setTimeout(h, 1))
                        },
                        p = function(a) {
                            var b = {
                                method: "GET",
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                url: t.determineSourceURL(a.script, !0)
                            };
                            k++;
                            (function() {
                                var g = t.determineSourceURL(a.script);
                                da(b, {
                                    ondone: function(b) {
                                        if (4 == b.readyState && 200 == b.status) {
                                            var d = X.srcCmp(a.script.uuid, b.responseText);
                                            if (1 == d || a.hash_different) {
                                                e++;
                                                h && h(!0, {
                                                    name: a.script.name,
                                                    url: g,
                                                    uuid: a.script.uuid,
                                                    code: b.responseText,
                                                    newhash: a.meta ? a.meta["uso:hash"] : null
                                                });
                                                return
                                            }
                                            0 == d && a.meta && (a.script.hash = a.meta["uso:hash"], t.doModify(a.script.uuid, a.script, !1))
                                        } else console.log(f.getMessage("UpdateCheck_of_0name0_Url_0url0_failed_", [a.script.name, g]));
                                        c()
                                    }
                                })
                            })()
                        },
                        g = function(a, c) {
                            var e = t.determineMetaURL(a, !0);
                            e ? da({
                                method: "GET",
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                headers: {
                                    Accept: "text/x-userscript-meta"
                                },
                                url: e
                            }, {
                                ondone: function(b) {
                                    a.meta = null;
                                    if (4 == b.readyState && 200 == b.status) {
                                        var g = V.processMetaHeader(b.responseText);
                                        a.meta = g;
                                        a.metasrc = b.responseText
                                    } else console.log("update: unable to find meta data @ " + e + " req.status = " + b.status);
                                    c(a)
                                }
                            }) : (a.meta = null, c(a))
                        },
                        A = function(a) {
                            k++;
                            g(a.script, function(e) {
                                var b = !!e.meta,
                                    g = b &&
                                    !!e.meta.version,
                                    d = g && (!a.script.version || 1 == M(e.meta.version, a.script.version)),
                                    h = b && (a.script.hash || !g) && !!e.meta["uso:hash"] && e.meta["uso:hash"] != a.script.hash;
                                if (!b || h || !g || d) a.meta = e.meta, a.metasrc = e.metasrc, a.hash_different = h, p(a);
                                c()
                            })
                        },
                        v = !1;
                    u.getUidList().forEach(function(a) {
                        var c = u.getByUid(a);
                        c.script && c.cond ? (a = !l.values.scriptUpdateCheckDisabled && !c.script.enabled && !b, b && c.script.uuid !== b || a || !t.determineSourceURL(c.script) || (v = !0, A(c))) : console.warn("update: inconsistent script entry",
                            a, c)
                    });
                    !v && b && h && window.setTimeout(h, 1);
                    c()
                }
            };
        trup = X;
        var t = function() {
                var a = function(a) {
                        a.sort(function(a, e) {
                            return a.position - e.position
                        });
                        return a
                    },
                    d = function(a) {
                        void 0 === a.ask && (a.ask = !0);
                        if (void 0 === a.url || null == a.url) a.url = "";
                        void 0 === a.hash && (a.hash = "");
                        "" === a.force_url && (a.force_url = null);
                        var c = V.createScriptFromSrc(a.src),
                            b, g = {
                                heading: null,
                                errors: [],
                                info: [],
                                warnings: [],
                                flags: {}
                            },
                            d = m(),
                            h = (new Date).getTime(),
                            r = a.save && !a.ask && l.values.editor_easySave,
                            x = a.uuid,
                            n;
                        c.name && void 0 != c.version ? n =
                            m.Pledge() : (g.errors.push(f.getMessage("Invalid_UserScript__Sry_") + "\n\n"), a.name && g.errors.push(f.getMessage("Script_name_0url0", a.name) + "\n\n"), a.url && g.errors.push(f.getMessage("Downloaded_from_0url0", a.url)), console.warn("scriptman: invalid userscript", g, c), n = m.Breach());
                        n.then(function() {
                            a.replace && !x && (x = u.getUidsByName(c.name, c.namespace)[0]);
                            b = x ? u.getMetaByUid(x) : null;
                            if (!x)
                                if (a.replace) x = s.createUUID();
                                else return console.error("scriptman: neither UUID nor replace option set"), m.Breach();
                            if ("" !== x.replace(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/, "")) return console.error("scriptman: invalid UUID", x), m.Breach();
                            if (!a.clean && !a.defaultscript && b && b.system) return m.Breach()
                        }).then(function() {
                            if (a.clean && a.name && a.name != c.name || -1 != c.name.search("\n")) return g.errors.push(f.getMessage("Invalid_UserScript_name__Sry_")), m.Breach()
                        }).then(function() {
                            if (c.options.compat_uW_gmonkey) return g.errors.push(f.getMessage("This_script_uses_uW_gm_api_")), m.Breach()
                        }).then(function() {
                            if (b) {
                                b.name !=
                                    c.name && (g.flags.renamed = !0);
                                if (b.lastModified && void 0 !== a.lastModified && b.lastModified !== a.lastModified) {
                                    var d = f.getMessage("some_secs");
                                    try {
                                        var k = Math.max(1, Math.floor((h - b.lastModified) / 1E3));
                                        isNaN(k) || (d = k)
                                    } catch (l) {}
                                    g.warnings.push(f.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_", d));
                                    g.flags.forceAsk = !0
                                }
                                g.flags.hashChanged = a.hash && b.hash != a.hash;
                                c.version != b.version || g.flags.hashChanged || (a.save ? g.flags.modification = !0 : g.flags.reset = !0);
                                a.clean && (g.flags.factory = !0)
                            } else g.flags.first_install = !0;
                            c.includes.length || c.matches.length || (d = "/" + z.staticVars.urlAllHttp_ + "/", r || a.internal || g.warnings.push(f.getMessage("This_script_does_not_provide_any__include_information_") + "\n" + f.getMessage("Tampermonkey_assumes_0urlAllHttp0_in_order_to_continue_", d)), c.includes.push(d));
                            g.flags.sync = !!a.sync;
                            g.flags.internal = a.internal;
                            g.flags.ask = a.ask
                        }).then(function() {
                            c.uuid = x;
                            c.hash = a.hash;
                            c.lastUpdated = a.force_meta && a.force_meta.lastModified || h;
                            c.system = a.defaultscript;
                            c.evilness = t.getEvilness(c);
                            c.position =
                                t.determineLastPosition() + 1;
                            g.flags.factory || g.flags.reset || (a.force_url && (c.updateURL = null, c.downloadURL = a.force_url), b && (c.options.override = b.options.override, c.options.comment = b.options.comment));
                            c.options.override.orig_includes = c.includes;
                            c.options.override.orig_excludes = c.excludes;
                            c.options.override.orig_matches = c.matches;
                            c = t.mergeCludes(c);
                            c.options.override.orig_noframes = c.options.noframes;
                            c.options.override.orig_run_at = c.options.run_at || "document-idle";
                            c.options.noframes = null;
                            c.options.run_at =
                                null
                        }).then(function() {
                            if (b && (c.fileURL = b.fileURL, c.hash = b.hash, c.position = b.position, b.sync && (c.sync = b.sync), !g.flags.factory && !g.flags.reset)) {
                                c.enabled = b.enabled;
                                c.options.noframes = b.options.noframes;
                                c.options.run_at = b.options.run_at;
                                c.options.awareOfChrome || (c.options.compat_forvarin = b.options.compat_forvarin);
                                a.save && !a.force_url && (c.downloadURL = b.downloadURL || c.downloadURL);
                                var d = k.determineMetaURL(b),
                                    h = k.determineMetaURL(c);
                                d == h || r || a.internal || g.warnings.push(f.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0", [d, h]))
                            }
                        }).then(function() {
                            if (b && !g.flags.factory && c.version == b.version && !g.flags.hashChanged && (a.defaultscript || a.noreinstall)) return m.Breach()
                        }).then(function() {
                            b ? (g.flags.factory || g.flags.reset ? (g.flags.reset ? (g.heading = f.getMessage("You_are_about_to_reinstall_a_UserScript_"), g.flags.reinstall = !0) : (g.heading = f.getMessage("You_are_about_to_install_a_UserScript_"), g.flags.install = !0), a.internal || g.warnings.splice(0, 0, f.getMessage("All_script_settings_will_be_reset_"))) : g.flags.modification ? g.heading =
                                f.getMessage("You_are_about_to_modify_a_UserScript_") : -1 == M(c.version, b.version) ? (g.heading = f.getMessage("You_are_about_to_downgrade_a_UserScript"), g.flags.downgrade = !0, r || a.internal || g.warnings.splice(0, 0, f.getMessage("The_downgraded_script_might_have_problems_to_read_its_stored_data_"))) : (g.heading = f.getMessage("You_are_about_to_update_a_UserScript_"), g.flags.update = !0), g.info.push({
                                    label: f.getMessage("Installed_Version_"),
                                    value: "v" + b.version
                                })) : (g.heading = f.getMessage("You_are_about_to_install_a_UserScript_"),
                                r || a.internal || g.warnings.splice(0, 0, f.getMessage("Malicious_scripts_can_violate_your_privacy_")), g.flags.install = !0);
                            g.flags.install ? g.action = f.getMessage("Install") : g.flags.reinstall ? g.action = f.getMessage("Reinstall") : g.flags.modification ? g.action = f.getMessage("Modify") : g.flags.downgrade ? g.action = f.getMessage("Downgrade") : g.flags.update && (g.action = f.getMessage("Update"))
                        }).then(function() {
                            a.url && (c.fileURL = a.url);
                            a.sync && (c.sync = a.sync);
                            a.force_options && s.copy(a.force_options, c.options, (new V.Script).options, !0);
                            a.force_settings && s.copy(a.force_settings, c, ["enabled", "position"])
                        }).then(function() {
                            var a = !1,
                                b;
                            for (b in c.options)
                                if (-1 != b.search("compat_") && !0 === c.options[b]) {
                                    a = !0;
                                    break
                                }
                            a && g.info.push({
                                label: f.getMessage("Note"),
                                value: f.getMessage("A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")
                            })
                        }).then(function() {
                            ["requires", "resources"].forEach(function(a) {
                                c[a] = s.map(c[a], function(a) {
                                    a.unsafe_url = a.url;
                                    a.url = z.sanitize(a.unsafe_url, c.fileURL);
                                    return a
                                })
                            })
                        }).done(function() {
                            d.resolve({
                                script: c,
                                messages: g,
                                short_info: [{
                                    label: f.getMessage("Author"),
                                    prop: "author"
                                }, {
                                    label: f.getMessage("Description"),
                                    prop: "description"
                                }, {
                                    label: f.getMessage("Source"),
                                    prop: "fileURL"
                                }]
                            })
                        }).fail(function() {
                            d.reject({
                                messages: g
                            })
                        });
                        return d.promise()
                    },
                    b = function(a) {
                        var c = m(),
                            b = a.messages,
                            g = a.script,
                            d = !b.flags.internal,
                            h = function() {
                                var a = k.doModify(g.uuid, g, d) || {};
                                (b.flags.first_install || b.flags.factory) && u.setStorageByUid(g.uuid, {
                                    ts: (new Date).getTime()
                                });
                                return a
                            },
                            f = {
                                lastModified: void 0,
                                installed: !0,
                                renamed: b.flags.renamed
                            };
                        b.warnings.length || b.flags.ask ? ha.install(a).done(function(a) {
                            a.ok && h();
                            f.installed = a.ok;
                            f.aborted = a.aborted;
                            c.resolve(f)
                        }).fail(function(a) {
                            c.reject(a)
                        }) : (h(), c.resolve(f));
                        return c.promise()
                    },
                    h = s.getDebouncer(1E3),
                    k = {
                        determineSourceURL: function(a, c) {
                            if (!a) return null;
                            var b = s.select([a.downloadURL, a.fileURL], function(a) {
                                if (!a || "file:" !== z.parse(a).protocol) return a
                            })[0];
                            return b && c ? va(b) : b
                        },
                        determineMetaURL: function(a, c) {
                            if (!a) return null;
                            var b;
                            a.fileURL && (b = a.fileURL.replace(".user.js", ".meta.js"),
                                a.fileURL == b && (b = a.fileURL.replace(".tamper.js", ".meta.js")), a.fileURL == b && (b = null));
                            return (b = s.select([a.updateURL, a.downloadURL, b], function(a) {
                                if (!a || "file:" !== z.parse(a).protocol) return a
                            })[0]) && c ? va(b) : b
                        },
                        mergeCludes: function(a) {
                            var c, b, g = a.options.override;
                            a.includes = g.merge_includes && g.orig_includes ? g.orig_includes.slice() : [];
                            a.excludes = g.merge_excludes && g.orig_excludes ? g.orig_excludes.slice() : [];
                            a.matches = g.merge_matches && g.orig_matches ? g.orig_matches.slice() : [];
                            for (c = 0; c < g.use_includes.length; c++) b =
                                a.excludes.indexOf(g.use_includes[c]), 0 <= b && a.excludes.splice(b, 1), a.includes.push(g.use_includes[c]);
                            if ("undefined" !== typeof g.use_matches)
                                for (c = 0; c < g.use_matches.length; c++) b = a.excludes.indexOf(g.use_matches[c]), 0 <= b && a.excludes.splice(b, 1), a.matches.push(g.use_matches[c]);
                            for (c = 0; c < g.use_excludes.length; c++) a.excludes.push(g.use_excludes[c]);
                            return a
                        },
                        doSave: function(a) {
                            return d(a).then(b)
                        },
                        doRemove: function(a, c) {
                            u.removeByUid(a, c);
                            u.setStorageByUid(a, null);
                            S.dropAll(a);
                            return m.Pledge()
                        },
                        doModify: function(a,
                            c, b) {
                            void 0 === b && (b = !0);
                            u.setByUid(a, c, b);
                            return b ? S.loadResources(a, c.resources).then(function() {
                                return S.loadRequires(a, c.requires)
                            }).then(function() {
                                return S.dropAllBut(a, s.map([].concat(c.resources).concat(c.requires), function(a) {
                                    return a.url
                                }))
                            }) : m.Pledge()
                        },
                        exportToJson: function(a, c) {
                            var b = m(),
                                g = t.determineScriptsToRun(null);
                            a && (g = s.select(g, function(c, b) {
                                return a[c.uuid]
                            }));
                            g = na(g, !0);
                            c && !c.storage || g.forEach(function(a) {
                                a.storage = u.getStorageByUid(a.uuid)
                            });
                            g = {
                                scripts: g
                            };
                            if (!c || c.global_settings) g.global_settings =
                                q.getValue(n.CONSTANTS.STORAGE.CONFIG, {});
                            b.resolve(g);
                            return b.promise()
                        },
                        importFromJson: function(a) {
                            if (!a || !a.scripts || !a.scripts.length) return m.Breach();
                            for (var c = {}, h = [], g = {}, k = 0, f; f = a.scripts[k]; k++) try {
                                var l = m();
                                "new-user-script" != f.uuid && (f.storage && (g[f.uuid] = f.storage), d({
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
                                    c[s.createUUID()] =
                                        a;
                                    l.resolve()
                                }).fail(function(a) {
                                    console.warn("import: Error @ script", f.name, a);
                                    l.resolve()
                                }), h.push(l.promise()))
                            } catch (x) {
                                console.log("import: Error while importing script", f.name, x)
                            }
                            var R = function() {
                                var a = m();
                                m.when(h).always(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }().then(function() {
                                return ha.import(c, a.global_settings)
                            }).then(function(a) {
                                var e = m(),
                                    d = [],
                                    h = [];
                                if (a.ok)
                                    for (var k = 0, f; f = a.import_ids[k]; k++)(function() {
                                        var a = f;
                                        if (c[a]) {
                                            c[a].messages.warnings = [];
                                            var e = b(c[a]).done(function() {
                                                var b;
                                                (b = c[a].script.uuid) && g[b] && (b = u.setStorageByUid(b, {
                                                    data: g[b].data || {},
                                                    ts: (new Date).getTime()
                                                }), h.push(b))
                                            });
                                            d.push(e)
                                        }
                                    })();
                                m.when(d).always(function() {
                                    t.reorderScripts();
                                    m.when(h).always(function() {
                                        e.resolve(a)
                                    })
                                });
                                return e.promise()
                            }).then(function(c) {
                                return a.global_settings && c.global_settings ? (c = q.setValue(n.CONSTANTS.STORAGE.CONFIG, a.global_settings).then(function() {
                                    R.done(function() {
                                        window.setTimeout(Y.reset, 1)
                                    });
                                    return m.Pledge({
                                        global_settings: !0
                                    })
                                }), q.setTemporary(!0), c) : m.Pledge({})
                            });
                            return R
                        },
                        installFromUrl: function(a, c, b) {
                            var g = m(),
                                d = z.parse(a),
                                l = {
                                    messages: {
                                        errors: [f.getMessage("Unable_to_load_script_from_url_0url0", a)],
                                        warnings: []
                                    }
                                };
                            c = c || {};
                            b = b || {};
                            var r = [a, JSON.stringify(c)].join("_");
                            if (h.is(r)) return D && console.log("scriptman: de-bounced installFromUrl", a), m.Breach();
                            h.add(r);
                            if (!d.protocol.match(/(https?|file):/)) return console.warn("scriptman: can't install from ", a), m.Breach(l);
                            "file:" != d.protocol || n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || console.warn("scriptman: Access to local files is forbidden! Loading the following script for installation may fail:",
                                a, "-> more info:", "http://tampermonkey.net/faq.php#Q204");
                            var x = function(a, c) {
                                    if (!a)
                                        if (c) a = l, "file:" != d.protocol || n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || a.messages.warnings.unshift(f.getMessage("Tampermonkey_has_no_file_access_permission_"));
                                        else {
                                            g.reject();
                                            return
                                        }
                                    a.heading = f.getMessage("You_are_about_to_install_a_UserScript_");
                                    b.silent_fail ? g.reject(a) : ha.installError(a).always(function(a) {
                                        g.reject(a)
                                    })
                                },
                                r = function(a) {
                                    x(null, a)
                                };
                            W({
                                method: "GET",
                                retries: n.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * n.SCRIPT_DOWNLOAD.TIMEOUT,
                                url: a
                            }, {
                                onload: function(b) {
                                    if (4 == b.readyState)
                                        if (200 == b.status || 0 == b.status) {
                                            var d = {
                                                url: a,
                                                src: b.responseText,
                                                ask: !0,
                                                replace: !0
                                            };
                                            c && s.each(c, function(a, b) {
                                                d[b] = c[b]
                                            });
                                            k.doSave(d).done(function(a) {
                                                g.resolve(a.installed)
                                            }).fail(x)
                                        } else g.reject()
                                },
                                onerror: r,
                                ontimeout: r
                            });
                            return g.promise()
                        },
                        determineLastPosition: function() {
                            var a = 0;
                            u.getUidList().forEach(function(c) {
                                var b = u.getByUid(c);
                                b.script && b.cond ? b.script.position && b.script.position > a && (a = b.script.position) : console.warn("scriptman: inconsistent script entry",
                                    c)
                            });
                            var c = new V.Script;
                            c.position > a && (a = c.position);
                            return a
                        },
                        matchUrl: function(a, c, b) {
                            var d, h;
                            try {
                                !b && 1 < c.length && "/" == c.substr(0, 1) ? d = RegExp(".*" + c.replace(/^\//g, "").replace(/\/$/g, "") + ".*", "i") : b ? (h = z.getRegExpFromMatch(c), d = RegExp(h)) : (h = z.getRegExpFromInclude(c, {
                                    tryToFixUrl: l.values.tryToFixUrl,
                                    safeUrls: l.values.safeUrls
                                }), d = RegExp(h, "i"))
                            } catch (k) {
                                return console.warn("scriptman: invalid regexp ", c), !1
                            }
                            return "" === a.replace(d, "")
                        },
                        validUrl: function(a, c, b) {
                            var d, h = !1;
                            if (c.inc || c.match) {
                                for (d in c.inc)
                                    if ("string" !==
                                        typeof c.inc[d]) console.warn("scriptman: include[" + d + "] '" + c.inc[d] + "' " + (b ? "@" + b + " " : "") + "can't be compared to '" + a + "'");
                                    else if (k.matchUrl(a, c.inc[d])) {
                                    D && console.log("scriptman: @include '" + c.inc[d] + "' matched" + (b ? " (" + b + ")" : ""));
                                    h = !0;
                                    break
                                }
                                if (c.match)
                                    for (d in c.match)
                                        if ("string" !== typeof c.match[d]) console.warn("scriptman: match[" + d + "] '" + c.match[d] + "' " + (b ? "@" + b + " " : "") + "can't be compared to '" + a + "'");
                                        else if (k.matchUrl(a, c.match[d], !0)) {
                                    D && console.log("scriptman: @match '" + c.match[d] + "' matched" +
                                        (b ? " (" + b + ")" : ""));
                                    h = !0;
                                    break
                                }
                                if (!h) return h
                            } else h = !0;
                            for (d in c.exc)
                                if (k.matchUrl(a, c.exc[d])) {
                                    D && console.log("scriptman: @exclude '" + c.exc[d] + "' matched" + (b ? " (" + b + ")" : ""));
                                    h = !1;
                                    break
                                }
                            return h
                        },
                        getEvilness: function(a) {
                            var c = 0;
                            return a.fileURL && (c = ba.getEvilnessOf(a.fileURL)) || a.downloadURL && (c = ba.getEvilnessOf(a.downloadURL)) || a.updateURL && (c = ba.getEvilnessOf(a.updateURL)) ? (D && console.log("scriptman: found blacklisted script", a), c) : 0
                        },
                        blackCheckAll: function() {
                            u.getUidList().forEach(function(a) {
                                var c =
                                    u.getByUid(a);
                                if (c.script && c.cond) {
                                    var b = t.getEvilness(c.script);
                                    if (b !== c.script.evilness) {
                                        if (b || void 0 !== c.script.evilness) D && console.log("scriptman: write blacklist state of ", c.script.name, b), b && L.tS(c.script.name, b, "b");
                                        c.script.evilness = b;
                                        k.doModify(a, c.script, !1)
                                    }
                                }
                            })
                        },
                        reorderScripts: function(b, c) {
                            var d = k.determineScriptsToRun();
                            if (b)
                                for (var g = 0; g < d.length; g++) {
                                    var h = d[g];
                                    h.uuid == b && (h.position = Number(c) + (h.position < c ? 0.5 : -0.5))
                                }
                            for (var d = a(d), f = 1, g = 0; g < d.length; g++) h = d[g], h.position = f++, k.doModify(h.uuid,
                                h, !1)
                        },
                        getUniqueScriptsForTab: function(a) {
                            var c = [];
                            w.get.empty(a.id) ? console.warn("bg: WARN: Tabs.get.urls[" + a.id + "] is empty!") : s.each(w.get.urls(a.id), function(a, b) {
                                if (ja.isAllowed(b))
                                    for (var e = t.determineScriptsToRun(b), d = 0; d < e.length; d++) {
                                        for (var h = !1, k = 0; k < c.length; k++)
                                            if (c[k].uuid == e[d].uuid) {
                                                h = !0;
                                                break
                                            }
                                        h || c.push(e[d])
                                    }
                            });
                            return c
                        },
                        determineScriptsToRun: function(b) {
                            var c = [];
                            D && console.log("scriptman: determineScriptsToRun @" + b);
                            u.getUidList().forEach(function(a) {
                                if (b) {
                                    var d = q.getValue(n.CONSTANTS.PREFIX.COND +
                                        a, null);
                                    if (!d || !k.validUrl(b, d, a)) return
                                }
                                d = u.getByUid(a);
                                d.script && d.cond ? c.push(d.script) : console.warn("scriptman: inconsistent script entry", a, d)
                            });
                            return a(c)
                        },
                        isContexter: function(a) {
                            return a.options && ("context-menu" === a.options.run_at || null === a.options.run_at && "context-menu" === a.options.override.orig_run_at)
                        },
                        determineOrigin: function(a) {
                            if (a = a.fileURL || a.downloadURL || a.updateURL) {
                                var c = a.match(/https?:\/\/userscripts\.org\/scripts\/(source|version)\/([0-9]{1,9})\.user\.js/);
                                if (c && 3 == c.length) return {
                                    id: c[2],
                                    token: "uso",
                                    url: "http://userscripts.org/scripts/show/" + c[2],
                                    issue_url: "http://userscripts.org/scripts/issues/" + c[2]
                                };
                                if ((c = a.match(/https?:\/\/greasyfork\.org\/scripts\/([^/]+)\/code\/.*\.user\.js/)) && 2 == c.length) return {
                                    id: c[1],
                                    token: "gf",
                                    url: "https://greasyfork.org/scripts/" + c[1],
                                    issue_url: "https://greasyfork.org/scripts/" + c[1] + "/feedback"
                                };
                                if ((c = a.match(/https?:\/\/openuserjs\.org\/install\/([^/]+)+\/(.*)\.user\.js/)) && 3 == c.length) return c.shift(), {
                                    id: c.join("/"),
                                    token: "ouj",
                                    url: "https://openuserjs.org/scripts/" +
                                        c[0] + "/" + c[1],
                                    issue_url: "https://openuserjs.org/scripts/" + c[0] + "/" + c[1] + "/issues"
                                };
                                if ((a = a.match(/https?:\/\/monkeyguts\.com\/(codepages\/)?([0-9]{1,9})\.user\.js/)) && 3 == a.length) return {
                                    id: a[2],
                                    token: "mog",
                                    url: "https://monkeyguts.com/code.php?id=" + a[2],
                                    issue_url: "https://monkeyguts.com/code.php?nav=rev&id=" + a[2]
                                }
                            }
                        }
                    };
                return k
            }(),
            u = function() {
                var a = [],
                    d = {
                        init: function() {
                            q.addDifferentOriginChangeListener(n.CONSTANTS.PREFIX.STORE, function(a, h) {
                                if (h && h.hasOwnProperty("value") && h.origin) {
                                    var k = a.replace(n.CONSTANTS.PREFIX.STORE,
                                            ""),
                                        e;
                                    for (e in h.value.data) h.value.data.hasOwnProperty(e) && function() {
                                        var a = e,
                                            b = h.value.data[e];
                                        d.notifyStorageListeners({
                                            uuid: k
                                        }, null, function(e) {
                                            var d = {
                                                data: {},
                                                ts: 0
                                            };
                                            d.data[a] = b;
                                            d.ts = h.value.data.ts;
                                            var k = {
                                                storage: d
                                            };
                                            void 0 === d.data[a] && (k.removed = a);
                                            e(k)
                                        })
                                    }()
                                }
                            })
                        },
                        getUidList: function() {
                            var a = RegExp("^" + n.CONSTANTS.PREFIX.SCRIPT_UID),
                                d = [];
                            q.listValues().forEach(function(k) {
                                -1 != k.search(a) && d.push(k.replace(a, ""))
                            });
                            return d
                        },
                        getUidsByName: function(a, h) {
                            var k = [];
                            d.getUidList().forEach(function(e) {
                                var c =
                                    d.getMetaByUid(e);
                                !c || c.name != a || h && h != c.namespace || k.push(e)
                            });
                            return k
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
                            return q.getValue(n.CONSTANTS.PREFIX.META +
                                a, null)
                        },
                        getByUid: function(a) {
                            if (!a) return console.error("sb: no UUID set"), {};
                            var d, k = q.getValue(n.CONSTANTS.PREFIX.META + a, null);
                            if (k) {
                                var e = function(a) {
                                    if (a)
                                        for (var b = 0, e = null; e = a[b]; b++) delete e.loaded, delete e.textContent, delete e.resURL, delete e.resText
                                };
                                e(k.requires);
                                e(k.resources);
                                k.uuid = a;
                                k.textContent = q.getValue(n.CONSTANTS.PREFIX.SCRIPT + a, k.textContent);
                                k.textContent && (d = k)
                            }
                            return {
                                script: d,
                                cond: q.getValue(n.CONSTANTS.PREFIX.COND + a, null)
                            }
                        },
                        setByUid: function(a, d, k) {
                            var e = {};
                            if (!a) return console.error("sb: no UUID set",
                                d), e;
                            var c = q.getValue(n.CONSTANTS.PREFIX.META + a),
                                f = !c;
                            q.setValue(n.CONSTANTS.PREFIX.SCRIPT_UID + a, d.name);
                            q.setValue(n.CONSTANTS.PREFIX.COND + a, {
                                inc: d.includes,
                                match: d.matches,
                                exc: d.excludes
                            });
                            q.setValue(n.CONSTANTS.PREFIX.SCRIPT + a, d.textContent);
                            d.textContent = null;
                            k && (e.lastModified = (new Date).getTime(), d.lastModified = e.lastModified);
                            q.setValue(n.CONSTANTS.PREFIX.META + a, d);
                            k && (la.onScriptsChanged(), f ? I.scriptAddedCb(d.name, d) : I.scriptChangedCb(d.name, d, c), l.values && L.tS(d.name, d.fileURL, f ? "i" : "u"));
                            U.items.rundata.removeAll();
                            return e
                        },
                        removeByUid: function(a, h) {
                            void 0 === h && (h = !0);
                            var k = d.getByUid(a);
                            q.deleteValue(n.CONSTANTS.PREFIX.SCRIPT_UID + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.COND + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.SCRIPT + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.META + a);
                            q.deleteValue(n.CONSTANTS.PREFIX.STORE + a);
                            h && (la.onScriptsChanged(), k.script && k.cond && I.scriptRemovedCb(k.script.name, k.script), l.values && L.tS(k.script.name, null, "r"));
                            U.items.rundata.removeAll();
                            return {}
                        },
                        addStorageListener: function(b,
                            d, k, e, c) {
                            a.push({
                                tabid: b,
                                id: d,
                                uuid: k,
                                time: e,
                                response: c
                            })
                        },
                        removeStorageListeners: function(b, d) {
                            void 0 === d && (d = !0);
                            var k = a;
                            a = [];
                            for (var e in k) {
                                var c = k[e];
                                try {
                                    void 0 !== b.tabid && b.tabid !== c.tabid || void 0 !== b.uuid && b.uuid !== c.uuid || void 0 !== b.id && b.id !== c.id ? a.push(c) : d && c.response({})
                                } catch (f) {
                                    D && console.debug("sb: listener clear for script", b, "failed! Page reload?!")
                                }
                            }
                        },
                        notifyStorageListeners: function(b, d, k) {
                            b = b || {};
                            d = d || {};
                            for (var e in a) {
                                var c = a[e];
                                try {
                                    void 0 !== d.uuid && c.uuid === d.uuid || void 0 !==
                                        d.tabid && c.tabid === d.tabid || void 0 !== d.id && c.id === d.id || void 0 !== b.tabid && b.tabid !== c.tabid || void 0 !== b.uuid && b.uuid !== c.uuid || void 0 !== b.id && b.id !== c.id || k && k(c.response)
                                } catch (f) {
                                    console.log("sb: listener notification for script", b, "failed! Page reload?!")
                                }
                            }
                        }
                    };
                return d
            }();
        scbr = u;
        var xa = function() {
                var a = function(a, b) {
                    var h = null,
                        k = a.sender,
                        e = this,
                        c = function(c) {
                            try {
                                a.postMessage(c)
                            } catch (b) {}
                        };
                    if ("xhr" == b.method) {
                        var k = function(a) {
                                c({
                                    error: !0,
                                    data: a
                                })
                            },
                            p = function(a) {
                                c({
                                    success: !0,
                                    data: a
                                })
                            },
                            g = function(a) {
                                c({
                                    progress: !0,
                                    data: a
                                })
                            },
                            l = function(a) {
                                c({
                                    timeout: !0,
                                    data: a
                                })
                            };
                        b.details.convertBinary = !0;
                        b.details.partialSize = b.details.partialSize || n.XMLHTTPREQUEST.PARTIAL_SIZE;
                        da(b.details, {
                            onload: p,
                            onpartial: function(a) {
                                c({
                                    partial: !0,
                                    data: a
                                })
                            },
                            onreadychange: function(a) {
                                c({
                                    change: !0,
                                    data: a
                                })
                            },
                            onprogress: g,
                            onerror: k,
                            ontimeout: l,
                            ondone: function() {
                                a.disconnect()
                            }
                        })
                    } else if ("download" == b.method) k = function(a) {
                        c({
                            error: !0,
                            data: a
                        })
                    }, p = function(a) {
                        c({
                            success: !0,
                            data: a
                        })
                    }, g = function(a) {
                        c({
                            progress: !0,
                            data: a
                        })
                    }, l = function(a) {
                        c({
                            timeout: !0,
                            data: a
                        })
                    }, G.start(b.details, {
                        onload: p,
                        onprogress: g,
                        onerror: k,
                        ontimeout: l,
                        ondone: function() {
                            a.disconnect()
                        }
                    });
                    else if ("addStorageListener" == b.method) k.tab ? (u.addStorageListener(k.tab.id, b.id, b.uuid, (new Date).getTime(), c), h = function() {
                        u.removeStorageListeners({
                            uuid: b.uuid,
                            id: b.id
                        }, !1)
                    }) : (console.log(f.getMessage("Unable_to_load_storage_due_to_empty_tabID_")), c({
                        error: !0
                    }));
                    else if ("removeStorageListener" == b.method) k.tab ? (u.removeStorageListeners({
                        uuid: b.uuid,
                        id: b.id
                    }), c({
                        error: !1
                    })) : (console.warn("Unable to remove storage listener due to empty tabID!"),
                        c({
                            error: !0
                        }));
                    else if ("saveStorageKey" == b.method) k.tab ? b.uuid && (k = u.getStorageByUid(b.uuid), k.data[b.key] = b.value, k.ts = b.ts, u.setStorageByUid(b.uuid, k), u.notifyStorageListeners({
                        uuid: b.uuid
                    }, {
                        id: b.id
                    }, function(a) {
                        var c = {
                            data: {},
                            ts: 0
                        };
                        c.data[b.key] = b.value;
                        c.ts = b.ts;
                        var e = {
                            storage: c
                        };
                        void 0 === c.data[b.key] && (e.removed = b.key);
                        a(e)
                    })) : console.log(f.getMessage("Unable_to_save_storage_due_to_empty_tabID_")), c({});
                    else if ("openInTab" == b.method) {
                        h = ["active"];
                        p = {
                            url: b.details.url
                        };
                        if (b.details.options) {
                            for (g =
                                0; g < h.length; g++) void 0 !== b.details.options[h[g]] && (p[h[g]] = b.details.options[h[g]]);
                            b.details.options.insert && (p.index = k.tab.index + 1)
                        }
                        h = function() {
                            e.disconnected = !0;
                            e.tabId && delete $[e.tabId]
                        };
                        rea.tabs.create(p, function(a) {
                            e.tabId = a.id;
                            $[a.id] = {
                                onClose: function() {
                                    c({
                                        close: !0
                                    })
                                }
                            };
                            c({
                                success: !0,
                                tabId: a.id
                            })
                        })
                    } else if ("nameTab" == b.method) {
                        if (e.tabId) {
                            var m = 3,
                                r = function() {
                                    w.listeners.once.whenReady(e.tabId, function() {
                                        rea.tabs.sendMessage(e.tabId, {
                                            method: "setForeignAttr",
                                            attr: "name",
                                            value: b.name
                                        }, function(a) {
                                            a ?
                                                c({
                                                    name: b.name
                                                }) : 0 < m-- ? r() : D && console.warn("foreignAttr: error setting attr")
                                        })
                                    })
                                };
                            r()
                        }
                    } else "closeTab" == b.method && (e.tabId && $[e.tabId] && rea.tabs.remove(e.tabId), c({}), window.setTimeout(function() {
                        try {
                            e.disconnected || a.disconnect()
                        } catch (c) {}
                        e.disconnected = !0
                    }, 1E3));
                    h && a.onDisconnect.addListener(h)
                };
                return function(d) {
                    if (C.late) {
                        var b = {};
                        d.onMessage.addListener(function(h) {
                            a.apply(b, [d, h])
                        })
                    } else C.registerLateCallback(function() {
                        xa(d)
                    })
                }
            }(),
            fa = {
                ping: {
                    allow: {
                        insecure: !0
                    },
                    exec: function(a, d, b) {
                        b({
                            pong: !0,
                            instanceID: qa,
                            config: {
                                layout: l.values.layout
                            }
                        })
                    }
                },
                newTab: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        rea.tabs.create({
                            url: a.url
                        }, function(a) {
                            b({
                                tabId: a.id
                            })
                        })
                    }
                },
                getTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        d.tab && a.uid ? (O[d.tab.id] || (O[d.tab.id] = {}), O[d.tab.id][a.uid] || (O[d.tab.id][a.uid] = {}), b({
                            data: O[d.tab.id][a.uid]
                        })) : (console.log("bg: unable to process request", d, a), b({
                            data: null
                        }))
                    }
                },
                getTabs: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        if (a.uid) {
                            d = {};
                            for (var h in O) d[h] = {}, d[h] = O[h][a.uid];
                            b({
                                data: d
                            })
                        } else console.log("bg: unable to process request",
                            d, a), b({
                            data: null
                        })
                    }
                },
                setTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        if (d.tab && a.uid) {
                            O[d.tab.id] || (O[d.tab.id] = {});
                            var h = {},
                                k;
                            for (k in a.tab) h[k] = a.tab[k];
                            O[d.tab.id][a.uid] = h
                        } else console.log("bg: unable to process request", d, a);
                        b({})
                    }
                },
                closeTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        var h = d && d.tab ? d.tab.id : null;
                        h ? rea.tabs.query({
                                windowType: "normal"
                            }, function(a) {
                                1 >= a.length ? (console.warn("bg:", "refused to close last tab!"), b({
                                    error: "refused to close last tab!"
                                })) : rea.tabs.remove(h, function() {
                                    b({})
                                })
                            }) :
                            b({
                                error: "internal error"
                            })
                    }
                },
                copyToClipboard: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        d.tab ? oa.copy(a.data) : console.log("bg: unable to process request", d, a);
                        b({})
                    }
                },
                setOption: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        d = "options" == d.extpage || "options" == a.origin;
                        l.values[a.name] = a.value;
                        d ? Z.create("options.settings").done(function(a) {
                            b({
                                items: a,
                                options: l.values
                            })
                        }).fail(function(a) {
                            b({
                                error: a,
                                options: l.values
                            })
                        }) : b({})
                    }
                },
                reportAnIssue: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        var h, k, e;
                        a.uuid &&
                            (h = u.getByUid(a.uuid)) && h.script && h.cond && (d = t.determineOrigin(h.script), "author" == a.to && h.script.supportURL ? (k = {
                                url: h.script.supportURL
                            }, e = d ? [a.to, d.token, d.id].join(":") : [a.to, k.url].join(":")) : d && (k = d, e = [k.token, k.id].join(":")), k && (L.tS(h.script.name, e, "m"), rea.tabs.create({
                                url: k.issue_url || k.url,
                                active: !0
                            }, function() {})));
                        b({})
                    }
                },
                begEvent: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        if ("dialog" == a.action) ca.dialog.shown(a.extra);
                        else if ("clicked" == a.action) {
                            var h, k;
                            a.extra && (h = a.extra.amount, k = a.extra.currency);
                            ca.clicked(a.type, h, k)
                        } else if (ca.button[a.action]) ca.button[a.action](a.extra);
                        else console.log("bg: Warning: unknown request ", a);
                        b({})
                    }
                },
                buttonPress: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        var h = function() {
                            b({})
                        };
                        "reset_simple" == a.name ? Y.reset(h) : "reset_factory" == a.name ? Y.factoryReset(h) : "create_tesla_data" == a.name ? I.createTeslaData().done(function(a) {
                            oa.copy({
                                content: K.UTF8.encode(a.join("<br>")),
                                type: "html"
                            });
                            h()
                        }) : "reset_chrome_sync" == a.name ? I.reset().always(h) : "install_tests" == a.name ? (d = ea.framework.prepare(t.doSave,
                            n.RUNTIME.BROWSER, h)) && console.error(d) : "enabled" == a.name ? (l.values[a.name] = !l.values[a.name], b({})) : "externals_delete" == a.name ? (S.cleanElement(a.scriptuid, a.url), Z.create("options.scripts").done(function(a) {
                            b({
                                items: a,
                                options: l.values
                            })
                        }).fail(function(a) {
                            b({
                                error: a,
                                options: l.values
                            })
                        })) : "run_script_updates" == a.name ? a.scriptuid ? (h = function(d) {
                            b({
                                scriptuid: a.scriptuid,
                                updatable: d
                            })
                        }, X.check(!0, !1, a.scriptuid, h)) : (X.check(!0, !0), b({})) : (console.log("bg: Warning: unknown button " + a.name), b({}))
                    }
                },
                loadTree: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        Z.create(a.referrer, {
                            complete: a.complete,
                            uuid: a.uuid
                        }).done(function(a) {
                            b({
                                items: a,
                                i18n: l.values.i18n,
                                options: l.values,
                                begging: ca.needed()
                            })
                        }).fail(function(a) {
                            b({
                                error: a,
                                options: l.values
                            })
                        })
                    }
                },
                modifyScriptOptions: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        if (a.uuid) {
                            var h = "options" == d.extpage || "options" == a.origin,
                                k = void 0 == a.reload || !0 == a.reload,
                                e = u.getByUid(a.uuid);
                            if (e.script && e.cond) {
                                var c = !1,
                                    f = new V.Script,
                                    g;
                                for (g in f.options) f.options.hasOwnProperty(g) && "undefined" !== typeof a[g] &&
                                    (e.script.options[g] = a[g]);
                                for (g in f.options.override) f.options.override.hasOwnProperty(g) && -1 != g.search("merge_") && "undefined" !== typeof a[g] && (e.script.options.override[g] = a[g], c = !0);
                                "undefined" !== typeof a.enabled && (e.script.enabled = a.enabled);
                                "undefined" !== typeof a.includes && (e.script.options.override.use_includes = a.includes, e.script.options.override.use_excludes = a.excludes, e.script.options.override.use_matches = a.matches, c = !0);
                                c && (e.script = t.mergeCludes(e.script));
                                t.doModify(e.script.uuid, e.script).done(function() {
                                    k ?
                                        (void 0 !== a.position && t.reorderScripts(a.uuid, a.position), h ? fa.loadTree.exec({
                                            referrer: "options.scripts"
                                        }, d, b) : rea.tabs.getSelected(null, function(c) {
                                            Z.create("actions").done(function(a) {
                                                b({
                                                    items: a,
                                                    i18n: l.values.i18n,
                                                    options: {
                                                        enabled: l.values.enabled,
                                                        layout: l.values.layout
                                                    }
                                                })
                                            }).fail(function() {
                                                b({
                                                    i18n: l.values.i18n,
                                                    options: {
                                                        enabled: l.values.enabled,
                                                        layout: l.values.layout
                                                    }
                                                })
                                            });
                                            a.uuid && l.values.autoReload && rea.tabs.sendMessage(c.id, {
                                                method: "reload",
                                                frameId: 0
                                            }, function(a) {})
                                        })) : b({})
                                }).fail(function() {
                                    b({})
                                });
                                return !0
                            }
                        }
                        b({})
                    }
                },
                modifyNativeScript: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        if (a.nid) {
                            var h = void 0 == a.reload || !0 == a.reload;
                            N.getUserscriptById(a.nid).then(function(b) {
                                if (b)
                                    if ("installed" == a.actionid) {
                                        if ("false" == a.value) return N.uninstall(b)
                                    } else {
                                        if ("enabled" == a.actionid) return N.setEnabled(b, a.value);
                                        if ("imported" == a.actionid && "true" == a.value) {
                                            var e = N.getUserscriptSource(b);
                                            if (e) return t.doSave({
                                                src: e,
                                                ask: !0,
                                                replace: !0
                                            }).then(function(a) {
                                                if (a.installed) {
                                                    if ("disable" == l.values.native_import_post_action) return N.setEnabled(b, !1);
                                                    if ("uninstall" == l.values.native_import_post_action) return N.uninstall(b)
                                                }
                                            });
                                            rea.tabs.sendMessage(d.tab.id, {
                                                method: "showMsg",
                                                msg: f.getMessage("Please_double_check_the_native_script_import_settings__")
                                            }, function(a) {})
                                        }
                                    } else h = !1;
                                return m.Pledge()
                            }).always(function() {
                                h ? fa.loadTree.exec({
                                    referrer: "options.scripts"
                                }, d, b) : b({})
                            });
                            return !0
                        }
                        b({})
                    }
                },
                saveScript: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        var h = void 0 === a.reload || !!a.reload,
                            k = function(a) {
                                h ? Z.create("options.scripts").done(function(e) {
                                    a.items =
                                        e;
                                    a.options = l.values;
                                    b(a)
                                }).fail(function(a) {
                                    b({
                                        error: a,
                                        options: l.values
                                    })
                                }) : b({})
                            };
                        if (a.clean) {
                            D && console.debug("bg: clean userscript " + a.uuid);
                            d = u.getByUid(a.uuid);
                            var e = function(c) {
                                Z.create("options.scripts").done(function(e) {
                                    b({
                                        cleaned: c.installed,
                                        items: e,
                                        options: l.values
                                    });
                                    c.installed && u.notifyStorageListeners({
                                        uuid: a.uuid
                                    }, null, function(c) {
                                        c({
                                            storage: u.getStorageByUid(a.uuid)
                                        })
                                    })
                                }).fail(function(a) {
                                    b({
                                        error: a,
                                        options: l.values
                                    })
                                })
                            };
                            d.script && d.cond ? t.doSave({
                                name: a.name,
                                uuid: a.uuid,
                                src: d.script.textContent,
                                clean: !0,
                                ask: !0,
                                save: !0
                            }).always(function(a) {
                                e(a || {
                                    installed: !1
                                })
                            }) : (console.error(f.getMessage("fatal_error") + " (" + a.uuid + ")!!!"), e({
                                installed: !1
                            }))
                        } else a.code ? (e = b, h && (e = function(a) {
                            t.reorderScripts();
                            k(a)
                        }), a.new_script && (a.uuid = s.createUUID()), t.doSave({
                            name: a.name,
                            uuid: a.uuid,
                            force_url: a.force_url,
                            src: a.code,
                            ask: !l.values.editor_easySave,
                            lastModified: a.lastModified,
                            save: !0
                        }).always(function(a) {
                            e(a || {
                                installed: !1
                            })
                        })) : (t.doRemove(a.uuid), t.reorderScripts(), k({}))
                    }
                },
                exportToJson: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        t.exportToJson(a.ids, a.options).done(function(a) {
                            b({
                                json: a
                            })
                        }).fail(function(a) {
                            b({})
                        })
                    }
                },
                importFromJson: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        var h = void 0 === a.reload || !!a.reload;
                        t.importFromJson(a.json).fail(function(a) {
                            b({
                                error: a || f.getMessage("An_error_occured_during_import_")
                            })
                        }).done(function(a) {
                            var e = {
                                reload: a.global_settings
                            };
                            h && !e.reload ? Z.create("options.scripts").done(function(a) {
                                    e.items = a;
                                    e.options = l.values;
                                    b(e)
                                }).fail(function(a) {
                                    b({
                                        error: a,
                                        options: l.values
                                    })
                                }) :
                                b(e)
                        })
                    }
                },
                askCom: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        ha.onMessage(a.data).always(function(a) {
                            a.i18n = l.values.i18n;
                            a.options = {
                                statistics_enabled: l.values.statistics_enabled
                            };
                            a.ext = {
                                version: rea.extension.manifest.version
                            };
                            b(a)
                        })
                    }
                },
                installScript: {
                    allow: {
                        insecure: !0
                    },
                    exec: function(a, d, b) {
                        if (d.tab) {
                            var h = {};
                            t.installFromUrl(a.url, {}, {
                                silent_fail: !0
                            }).done(function(a) {
                                h = {
                                    data: null,
                                    found: !0,
                                    installed: a
                                }
                            }).fail(function(a) {
                                h.err = a && a.messages && a.messages.errors ? a.messages.errors[0] : f.getMessage("Unable_to_parse_this_")
                            }).always(function() {
                                b(h)
                            })
                        } else console.log(f.getMessage("Unable_to_install_script_due_to_empty_tabID_"))
                    }
                },
                registerMenuCmd: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        d.tab ? (E.add({
                            tabId: d.tab.id,
                            url: d.tab.url,
                            name: a.name,
                            accessKey: a.accessKey,
                            id: a.menuId,
                            response: b
                        }), wa()) : (console.log("Unable to register menu cmd due to empty tabID!"), b({
                            run: !1
                        }))
                    }
                },
                unRegisterMenuCmd: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        E.clearById(a.id);
                        b({});
                        wa()
                    }
                },
                execMenuCmd: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        (a = E.getById(a.id)) ? a.response({
                            run: !0,
                            menuId: a.id
                        }): console.error("bg: Error: unable to find MC id " + a.id);
                        b({})
                    }
                },
                getWebRequestInfo: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        d.tab ? b({
                            webRequest: H
                        }) : (console.log("Unable to run scripts due to empty tab id"), b({}))
                    }
                },
                unLoad: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        a.topframe || a.id && w.events.unload(d.tab.id, d.tab.frameId, a.id)
                    }
                },
                prepare: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        if (d.tab) {
                            var h = a.topframe ? 0 : null,
                                f = z.woHash(a.url);
                            w.events.run(d.tab.id, h, a.id, f, function(e) {
                                e = s.select(e, function(a) {
                                    return a
                                });
                                var c = [{
                                        m: "native",
                                        t: [G.staticVars.DEFAULT, G.staticVars.NATIVE]
                                    }, {
                                        m: "disabled",
                                        t: [G.staticVars.OFF]
                                    }, {
                                        m: "browser",
                                        t: [G.staticVars.CHROME]
                                    }].filter(function(a, c) {
                                        if (-1 != a.t.indexOf(l.values.downloads_mode)) return !0
                                    }).map(function(a) {
                                        return a.m
                                    })[0] || "disabled",
                                    c = {
                                        scripts: e,
                                        contexters: la.getContexterCount(),
                                        raw: {},
                                        inIncognitoContext: rea.extension.inIncognitoContext,
                                        downloadMode: c,
                                        logLevel: l.values.logLevel
                                    };
                                if (a.raw && e.length)
                                    for (e = 0; e < a.raw.length; e++) c.raw[a.raw[e]] = Registry.getRaw(a.raw[e]);
                                b(c);
                                T.setIcon(d.tab.id);
                                T.setBadge(d.tab.id)
                            });
                            return !0
                        }
                        b({});
                        return !1
                    }
                },
                scriptBlockerDetected: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, d, b) {
                        a.xml_style_detected || -1 != a.url.search("\\.xml$") ? console.warn("blocker: unable to get unsafeWindow...") : F.requestPermissionEx(function(a, d) {
                            var e = a && d ? f.getMessage("Please_reload_this_page_in_order_to_run_your_userscripts_") : null;
                            b({
                                alert: e
                            })
                        });
                        w.set.blocker(d.tab.id);
                        T.setIcon(d.tab.id)
                    }
                },
                notification: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, d, b) {
                        var h = a.image ? a.image : rea.extension.getURL("images/icon128.png");
                        (function() {
                            var b =
                                m();
                            a.highlight && d.tab ? P.highlight(d.tab.id, b.resolve) : b.resolve();
                            return b.promise()
                        })().then(function() {
                            var b = m();
                            a.text ? P.show(a.title, a.text, h, a.timeout, b.resolve) : b.resolve();
                            return b.promise()
                        }).always(function(a) {
                            b({
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
                    exec: function(a, d, b) {
                        (function() {
                            var a = m();
                            Registry.require("hinter", function() {
                                a.resolve(Registry.get("hinter"))
                            });
                            return a.promise()
                        })().then(function(b) {
                            return b.hint(a.code, {
                                maxerr: 999
                            }, {})
                        }).always(function(a) {
                            b({
                                errors: a
                            })
                        })
                    }
                },
                handler: function(a, d, b) {
                    if (!C.late) return C.registerLateCallback(function() {
                        fa.handler(a, d, b)
                    }), !0;
                    var f = fa[a.method];
                    if (f)
                        if (f.allow && f.exec) {
                            var k = rea.runtime.id,
                                k = !n.REQUESTS.HAS_SENDER_ID && d.tab || d.id === k,
                                e = null,
                                c = n.REQUESTS.INTERNAL_PAGE_PROTOCOL + "//",
                                l = n.REQUESTS.GET_INTERNAL_PAGE_REGEXP(),
                                c = k && (!d.tab || 0 == d.tab.url.search(c));
                            k && c && (d.tab ? (l = d.tab.url.match(l)) && 2 == l.length && (e = l[1]) : e = "*", d.extpage = e);
                            l = "options" == e;
                            if ("background" == e || f.allow.insecure || f.allow.extpage && c || f.allow.options &&
                                l || f.allow.script && k && !c) {
                                if (f = f.exec(a, d, b), void 0 !== f) return f
                            } else return (!1 !== a.topframe || !c && !l) && D && console.warn("back: this context doesn't have the permission to call '" + a.method + "' "), !1
                        } else return console.log("b: invalid implementation of " + a.method), !1;
                    else return console.log("back: unknown method " + a.method), !1;
                    return !0
                }
            },
            Fa = function() {
                var a = [],
                    d = ["test"],
                    b = !1;
                return {
                    getLayouts: function() {
                        b || (a.push({
                            name: f.getMessage("Default"),
                            value: "default"
                        }), Registry.isDevVersion("helper") && d.forEach(function(b) {
                            Registry.getRaw("layout/" +
                                b + "/options.js") && a.push({
                                name: b.charAt(0).toUpperCase() + b.slice(1),
                                value: b
                            })
                        }), b = !0);
                        return a
                    }
                }
            }(),
            E = {
                commands: [],
                add: function(a) {
                    E.commands.push(a)
                },
                list: function() {
                    var a = [],
                        d;
                    for (d in E.commands) E.commands.hasOwnProperty(d) && a.push(E.commands[d]);
                    return a
                },
                listByTabId: function(a) {
                    var d = [],
                        b;
                    for (b in E.commands)
                        if (E.commands.hasOwnProperty(b)) {
                            var f = E.commands[b];
                            if (f.tabId == a) {
                                for (var k = !1, e = 0; e < d.length; e++)
                                    if (d[e].name == f.name) {
                                        k = !0;
                                        break
                                    }
                                k || d.push(f)
                            }
                        }
                    return d
                },
                clearByTabId: function(a) {
                    E.getByTabId(a)
                },
                getByTabId: function(a) {
                    var d = [],
                        b = E.commands;
                    E.commands = [];
                    for (var f in b)
                        if (b.hasOwnProperty(f)) {
                            var k = b[f];
                            k.tabId != a ? E.commands.push(k) : d.push(k)
                        }
                    return d
                },
                clearById: function(a) {
                    E.getById(a)
                },
                getById: function(a) {
                    var d = null,
                        b = E.commands;
                    E.commands = [];
                    for (var f in b)
                        if (b.hasOwnProperty(f)) {
                            var k = b[f];
                            k.id != a ? E.commands.push(k) : d = k
                        }
                    return d
                }
            },
            Ga = function() {
                return {
                    create: function() {
                        var a, d, b, h, k, e, c, p, g, A, m, r;
                        g = null;
                        a = {
                            name: f.getMessage("General"),
                            sub_menu_item: !0,
                            items: []
                        };
                        a.items.push({
                            name: f.getMessage("Config_Mode"),
                            id: "configMode",
                            level: 0,
                            option: !0,
                            select: [{
                                name: f.getMessage("Novice"),
                                value: 0
                            }, {
                                name: f.getMessage("Beginner"),
                                value: 50
                            }, {
                                name: f.getMessage("Advanced"),
                                value: 100
                            }],
                            value: l.values.configMode,
                            desc: f.getMessage("Changes_the_number_of_visible_config_options")
                        });
                        a.items.push({
                            name: "Language",
                            id: "i18n",
                            level: 0,
                            option: !0,
                            reload: !0,
                            warning: {
                                msg: f.getMessage("A_reload_is_required")
                            },
                            select: [{
                                name: "Browser Default",
                                value: null
                            }, {
                                name: f.getOriginalMessage("English"),
                                value: "en"
                            }, {
                                name: f.getOriginalMessage("German"),
                                value: "de"
                            }, {
                                name: f.getOriginalMessage("French"),
                                value: "fr"
                            }, {
                                name: f.getOriginalMessage("Italian"),
                                value: "it"
                            }, {
                                name: f.getOriginalMessage("Russian"),
                                value: "ru"
                            }, {
                                name: f.getOriginalMessage("Czech"),
                                value: "cs"
                            }, {
                                name: f.getOriginalMessage("Polish"),
                                value: "pl"
                            }, {
                                name: f.getOriginalMessage("Spanish"),
                                value: "es"
                            }, {
                                name: f.getOriginalMessage("Portuguese_Brazil"),
                                value: "pt-br"
                            }, {
                                name: f.getOriginalMessage("Chinese__Simplified_"),
                                value: "zh_CN"
                            }, {
                                name: f.getOriginalMessage("Chinese__Traditional_"),
                                value: "zh_TW"
                            }, {
                                name: f.getOriginalMessage("Japanese"),
                                value: "ja"
                            }],
                            value: l.values.i18n,
                            validation: {
                                image: "info",
                                opacity: 0.9,
                                msg: f.getMessage("Your_language_is_not_supported__Click_here_to_get_intructions_how_to_translate_TM_"),
                                url: "http://tampermonkey.net/faq.php#Q500"
                            }
                        });
                        a.items.push({
                            name: f.getMessage("Make_includes_more_safe"),
                            id: "safeUrls",
                            level: 60,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.safeUrls,
                            desc: f.getMessage("Includes_more_safe_example")
                        });
                        a.items.push({
                            name: f.getMessage("Fix_includes"),
                            id: "tryToFixUrl",
                            level: 60,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.tryToFixUrl,
                            desc: f.getMessage("Fix_includes_example")
                        });
                        a.items.push({
                            name: f.getMessage("Auto_reload_on_script_enabled"),
                            level: 20,
                            id: "autoReload",
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.autoReload,
                            desc: f.getMessage("Auto_reload_on_script_enabled_desc")
                        });
                        a.items.push({
                            name: f.getMessage("Anonymous_statistics"),
                            level: 0,
                            id: "statistics_enabled",
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.statistics_enabled,
                            desc: f.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics_via_Google_Analytics")
                        });
                        a.items.push({
                            name: f.getMessage("Debug_scripts"),
                            level: 100,
                            id: "debug",
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.debug,
                            desc: ""
                        });
                        a.items.push({
                            name: f.getMessage("Show_fixed_source"),
                            level: 100,
                            id: "showFixedSrc",
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.showFixedSrc,
                            desc: ""
                        });
                        a.items.push({
                            name: f.getMessage("LogLevel"),
                            id: "logLevel",
                            level: 0,
                            option: !0,
                            select: [{
                                name: f.getMessage("Debug"),
                                value: 60
                            }, {
                                name: f.getMessage("Error"),
                                value: 0
                            }],
                            value: l.values.logLevel,
                            desc: ""
                        });
                        n.OPTIONS.NATIVE_SCRIPT_IMPORT && (d = {
                            name: f.getMessage("Native_Script_Import"),
                            sub_menu_item: !0,
                            need_save: !0,
                            items: []
                        }, g = {}, l.values.native_import && (g = !0 === n.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS ? {
                            image: "button_ok",
                            msg: f.getMessage("TM_has_access_to_file_URIs")
                        } : {
                            image: "critical",
                            msg: f.getMessage("Tampermonkey_needs_access_to_file_URIs__Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q204"
                        }), d.items.push({
                            name: f.getMessage("Enable_Native_Script_Import"),
                            id: "native_import",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.native_import,
                            validation: g
                        }), d.items.push({
                            name: f.getMessage("Post_Import_Action"),
                            id: "native_import_post_action",
                            level: 0,
                            option: !0,
                            select: [{
                                name: f.getMessage("None"),
                                value: "none"
                            }, {
                                name: f.getMessage("Disable_Extension"),
                                value: "disable"
                            }, {
                                name: f.getMessage("Uninstall_Extension"),
                                value: "uninstall"
                            }],
                            value: l.values.native_import_post_action,
                            desc: f.getMessage("What_action_should_be_done_after_a_native_userscript_was_imported_sucessfully_")
                        }), g = {}, l.values.native_import && (g = N.isPathValid() ? {
                            image: "button_ok",
                            msg: f.getMessage("Everything_is_setup_correctly_")
                        } : {
                            image: "critical",
                            msg: f.getMessage("Tampermonkey_needs_to_know_the_absolute_path_to_your_browser_profile_folder_Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q205"
                        }), d.items.push({
                            name: f.getMessage("Browser_Profile_Path"),
                            id: "native_import_path",
                            level: 0,
                            option: !0,
                            text: !0,
                            width: 2,
                            value: l.values.native_import_path,
                            validation: g
                        }));
                        n.OPTIONS.HAS_TESLA && (A = {
                                name: f.getMessage("TESLA"),
                                sub_menu_item: !0,
                                level: 50,
                                need_save: !0,
                                items: []
                            }, A.items.push({
                                name: f.getMessage("Enable_TESLA"),
                                id: "sync_enabled",
                                level: 50,
                                option: !0,
                                checkbox: !0,
                                enabled: l.values.sync_enabled,
                                desc: f.getMessage("Tampermonkey_External_Script_List_Access")
                            }),
                            b = [{
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
                            }], n.SYNC.GOOGLE_DRIVE.SUPPORTED && b.push({
                                name: "Google Drive (Beta)",
                                value: J.types.eGOOGLEDRIVE,
                                enable: {
                                    sync_id: !1,
                                    sync_version: !1,
                                    create_tesla_data: !1
                                }
                            }), A.items.push({
                                name: f.getMessage("Sync_Type"),
                                id: "sync_type",
                                enabler: !0,
                                level: 50,
                                option: !0,
                                select: b,
                                value: l.values.sync_type
                            }), A.items.push({
                                name: f.getMessage("Sync_Id"),
                                id: "sync_id",
                                enabledBy: "sync_type",
                                level: 50,
                                text: !0,
                                value: l.values.sync_id,
                                option: !0
                            }), A.items.push({
                                name: f.getMessage("Sync_Version"),
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
                                        msg: f.getMessage("This_sync_version_may_multiply_each_script_that_is_present_at_more_than_one_Tampermonkey_instance__Do_you_really_want_to_continue_")
                                    }
                                }],
                                value: l.values.sync_version,
                                desc: f.getMessage("Different_sync_versions_are_not_compatible_to_each_other_")
                            }),
                            A.items.push({
                                name: f.getMessage("Create_Exportable_Data"),
                                id: "create_tesla_data",
                                enabledBy: "sync_type",
                                button: !0,
                                ignore: !0,
                                level: 60,
                                warning: {
                                    msg: f.getMessage("Copy_exportable_data_to_clipboard_Ok_")
                                }
                            }));
                        e = {
                            name: f.getMessage("Appearance"),
                            sub_menu_item: !0,
                            items: []
                        };
                        e.items.push({
                            name: f.getMessage("Layout"),
                            id: "layout",
                            level: 0,
                            option: !0,
                            select: Fa.getLayouts(),
                            value: l.values.layout,
                            desc: ""
                        });
                        g = {};
                        "off" == l.values.notification_showUpdate && (g = {
                            image: "critical",
                            msg: f.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")
                        });
                        e.items.push({
                            name: f.getMessage("Update_Notification"),
                            id: "notification_showUpdate",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Off"),
                                value: "off"
                            }, {
                                name: f.getMessage("Show_notification"),
                                value: "notification"
                            }, {
                                name: f.getMessage("Open_changelog"),
                                value: "changelog"
                            }],
                            value: l.values.notification_showUpdate,
                            validation: g
                        });
                        e.items.push({
                            name: f.getMessage("Icon_badge_info"),
                            id: "appearance_badges",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Off"),
                                value: "off"
                            }, {
                                name: f.getMessage("Running_scripts"),
                                value: "running"
                            }, {
                                name: f.getMessage("Unique_running_scripts"),
                                value: "running_unique"
                            }, {
                                name: f.getMessage("Disabled_scripts"),
                                value: "disabled"
                            }],
                            value: l.values.appearance_badges
                        });
                        e.items.push({
                            name: f.getMessage("Icon_badge_color"),
                            id: "appearance_badge_color",
                            level: 100,
                            color: !0,
                            value: l.values.appearance_badge_color
                        });
                        b = {
                            name: f.getMessage("Editor"),
                            sub_menu_item: !0,
                            level: 20,
                            need_save: !0,
                            items: [],
                            warning: {
                                msg: f.getMessage("A_reload_is_required")
                            },
                            reload: !0
                        };
                        b.items.push({
                            name: f.getMessage("Enable_Editor"),
                            id: "editor_enabled",
                            level: 100,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.editor_enabled,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("Key_Mapping"),
                            id: "editor_keyMap",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Windows"),
                                value: "windows"
                            }, {
                                name: f.getMessage("Emacs"),
                                value: "emacs"
                            }, {
                                name: f.getMessage("Vim"),
                                value: "vim"
                            }],
                            value: l.values.editor_keyMap
                        });
                        b.items.push({
                            name: f.getMessage("Indentation_Width"),
                            id: "editor_indentUnit",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("1"),
                                value: 1
                            }, {
                                name: f.getMessage("2"),
                                value: 2
                            }, {
                                name: f.getMessage("3"),
                                value: 3
                            }, {
                                name: f.getMessage("4"),
                                value: 4
                            }, {
                                name: f.getMessage("5"),
                                value: 5
                            }, {
                                name: f.getMessage("6"),
                                value: 6
                            }, {
                                name: f.getMessage("7"),
                                value: 7
                            }, {
                                name: f.getMessage("8"),
                                value: 8
                            }, {
                                name: f.getMessage("9"),
                                value: 9
                            }, {
                                name: f.getMessage("10"),
                                value: 10
                            }, {
                                name: f.getMessage("11"),
                                value: 11
                            }],
                            value: l.values.editor_indentUnit,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("Indent_with"),
                            id: "editor_indentWithTabs",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Tabs"),
                                value: "tabs"
                            }, {
                                name: f.getMessage("Spaces"),
                                value: "spaces"
                            }],
                            value: l.values.editor_indentWithTabs,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("TabMode"),
                            id: "editor_tabMode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Classic"),
                                value: "classic"
                            }, {
                                name: f.getMessage("Smart"),
                                value: "smart"
                            }, {
                                name: f.getMessage("Indent"),
                                value: "indent"
                            }],
                            value: l.values.editor_tabMode,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("Reindent_on_typing"),
                            id: "editor_electricChars",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.editor_electricChars,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("Enable_autoSave"),
                            id: "editor_autoSave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.editor_autoSave,
                            desc: ""
                        });
                        b.items.push({
                            name: f.getMessage("Enable_easySave"),
                            id: "editor_easySave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.editor_easySave,
                            desc: ""
                        });
                        k = {
                            name: f.getMessage("Script_Update"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        k.items.push({
                            name: f.getMessage("Check_disabled_scripts"),
                            id: "scriptUpdateCheckDisabled",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.scriptUpdateCheckDisabled,
                            desc: ""
                        });
                        k.items.push({
                            name: f.getMessage("Check_interval"),
                            id: "scriptUpdateCheckPeriod",
                            level: 0,
                            option: !0,
                            select: [{
                                name: f.getMessage("Never"),
                                value: 0
                            }, {
                                name: f.getMessage("Every_Hour"),
                                value: 36E5
                            }, {
                                name: f.getMessage("Every_6_Hours"),
                                value: 216E5
                            }, {
                                name: f.getMessage("Every_12_Hour"),
                                value: 432E5
                            }, {
                                name: f.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: f.getMessage("Every_Week"),
                                value: 6048E5
                            }],
                            value: l.values.scriptUpdateCheckPeriod,
                            desc: ""
                        });
                        k.items.push({
                            name: f.getMessage("Dont_ask_me_for_simple_script_updates"),
                            id: "notification_silentScriptUpdate",
                            level: 80,
                            option: !0,
                            checkbox: !0,
                            enabled: l.values.notification_silentScriptUpdate,
                            desc: ""
                        });
                        k.items.push({
                            name: f.getMessage("Hide_notification_after"),
                            id: "scriptUpdateHideNotificationAfter",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Never"),
                                value: 0
                            }, {
                                name: f.getMessage("15_Seconds"),
                                value: 15E3
                            }, {
                                name: f.getMessage("30_Seconds"),
                                value: 3E4
                            }, {
                                name: f.getMessage("1_Minute"),
                                value: 6E4
                            }, {
                                name: f.getMessage("5_Minutes"),
                                value: 3E5
                            }, {
                                name: f.getMessage("1_Hour"),
                                value: 36E5
                            }],
                            value: l.values.scriptUpdateHideNotificationAfter,
                            desc: ""
                        });
                        h = {
                            name: f.getMessage("Externals"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        h.items.push({
                            name: f.getMessage("Update_interval"),
                            id: "external_update_interval",
                            level: 0,
                            option: !0,
                            select: [{
                                name: f.getMessage("Always"),
                                value: 1
                            }, {
                                name: f.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: f.getMessage("Every_Week"),
                                value: 6048E5
                            }, {
                                name: f.getMessage("Every_Month"),
                                value: 2592E6
                            }, {
                                name: f.getMessage("Never"),
                                value: 0
                            }],
                            value: l.values.external_update_interval,
                            desc: ""
                        });
                        c = {
                            name: f.getMessage("Security"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        n.OPTIONS.HAS_CSP && (c.items.push({
                            name: f.getMessage("Allow_overwrite_javascript_settings"),
                            id: "scriptblocker_overwrite",
                            level: 80,
                            option: !0,
                            select: [{
                                name: f.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: f.getMessage("No"),
                                value: "no"
                            }],
                            value: l.values.scriptblocker_overwrite,
                            desc: f.getMessage("Tampermonkey_can_not_work_when_javascript_is_disabled")
                        }), c.items.push({
                            name: f.getMessage("Add_TM_to_CSP"),
                            id: "webrequest_fixCSP",
                            level: 80,
                            option: !0,
                            select: [{
                                name: f.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: f.getMessage("No"),
                                value: "no"
                            }],
                            value: l.values.webrequest_fixCSP,
                            desc: f.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")
                        }), c.items.push({
                            name: f.getMessage("Allow_headers_to_be_modified_by_scripts"),
                            id: "webrequest_modHeaders",
                            level: 80,
                            option: !0,
                            select: [{
                                name: f.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: f.getMessage("Auto"),
                                value: "auto"
                            }, {
                                name: f.getMessage("No"),
                                value: "no"
                            }],
                            value: l.values.webrequest_modHeaders,
                            desc: ""
                        }));
                        rea.extension.inIncognitoContext || (g = "temporary" ==
                            l.values.incognito_mode ? {} : {
                                image: "critical",
                                msg: "Permanent mode is still a BETA feature!"
                            }, c.items.push({
                                name: f.getMessage("Store_data_in_incognito_mode"),
                                id: "incognito_mode",
                                level: 50,
                                option: !0,
                                select: [{
                                    name: f.getMessage("Temporary"),
                                    value: "temporary"
                                }, {
                                    name: f.getMessage("Permanent"),
                                    value: "permanent"
                                }],
                                value: l.values.incognito_mode,
                                validation: g
                            }));
                        c.items.push({
                            name: f.getMessage("Page_Filter_Mode"),
                            id: "page_filter_mode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Off"),
                                value: "off"
                            }, {
                                name: f.getMessage("Blacklist"),
                                value: "black"
                            }, {
                                name: f.getMessage("Whitelist"),
                                value: "white"
                            }, {
                                name: f.getMessage("Both"),
                                value: "black+white"
                            }],
                            value: l.values.page_filter_mode,
                            desc: ""
                        });
                        c.items.push({
                            name: f.getMessage("Whitelisted_Pages"),
                            id: "page_whitelist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: l.values.page_whitelist,
                            desc: ""
                        });
                        c.items.push({
                            name: f.getMessage("Blacklisted_Pages"),
                            id: "forbiddenPages",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: l.values.forbiddenPages,
                            desc: ""
                        });
                        p = {
                            name: f.getMessage("BlackCheck"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        p.items.push({
                            name: f.getMessage("Script_Blacklist_Source"),
                            id: "script_blacklist_type",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("Off"),
                                value: "off"
                            }, {
                                name: f.getMessage("Server_And_Manual"),
                                value: "server"
                            }, {
                                name: f.getMessage("Only_Manual"),
                                value: "only_manual"
                            }],
                            value: l.values.script_blacklist_type
                        });
                        p.items.push({
                            name: f.getMessage("Blacklist_Severity"),
                            id: "script_blacklist_severity",
                            level: 50,
                            option: !0,
                            select: [{
                                name: f.getMessage("severity_1"),
                                value: 1
                            }, {
                                name: f.getMessage("severity_2"),
                                value: 2
                            }, {
                                name: f.getMessage("severity_3"),
                                value: 3
                            }, {
                                name: f.getMessage("severity_4"),
                                value: 4
                            }, {
                                name: f.getMessage("severity_5"),
                                value: 5
                            }, {
                                name: f.getMessage("severity_6"),
                                value: 6
                            }, {
                                name: f.getMessage("severity_7"),
                                value: 7
                            }, {
                                name: f.getMessage("severity_8"),
                                value: 8
                            }, {
                                name: f.getMessage("severity_9"),
                                value: 9
                            }, {
                                name: f.getMessage("severity_10"),
                                value: 10
                            }],
                            value: l.values.script_blacklist_severity
                        });
                        p.items.push({
                            name: f.getMessage("Manual_Script_Blacklist"),
                            id: "require_blacklist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: l.values.require_blacklist,
                            desc: ""
                        });
                        if (n.OPTIONS.CAN_DOWNLOAD) {
                            var q = !1;
                            g = {};
                            s.map("exe sh crx com bat scr".split(" "), function(a) {
                                return "name." + a
                            }).forEach(function(a) {
                                q |= G.is_whitelisted(a)
                            });
                            q && (g = {
                                image: "critical",
                                msg: f.getMessage("Your_whitelist_seems_to_include_executable_files_This_means_your_userscripts_may_download_malware_or_spyware_to_your_harddisk_")
                            });
                            r = {
                                name: f.getMessage("Downloads") + " BETA",
                                sub_menu_item: !0,
                                level: 50,
                                items: []
                            };
                            r.items.push({
                                name: f.getMessage("Download_Mode"),
                                id: "downloads_mode",
                                level: 50,
                                option: !0,
                                select: s.select([{
                                    name: f.getMessage("Default"),
                                    value: G.staticVars.DEFAULT
                                }, {
                                    name: f.getMessage("Off"),
                                    value: G.staticVars.OFF
                                }, {
                                    name: f.getMessage("Native"),
                                    value: G.staticVars.NATIVE
                                }, {
                                    name: f.getMessage("Browser_API"),
                                    value: n.DOWNLOAD.SUPPORTED ? G.staticVars.CHROME : null
                                }], function(a) {
                                    return a.value
                                }),
                                value: l.values.downloads_mode,
                                desc: f.getMessage("The_Browser_API_mode_requires_a_special_permission_") + "\n'Default' is 'Native'."
                            });
                            r.items.push({
                                name: f.getMessage("Whitelisted_File_Extensions"),
                                id: "downloads_extension_whitelist",
                                level: 50,
                                option: !0,
                                input: !0,
                                array: !0,
                                value: l.values.downloads_extension_whitelist,
                                desc: f.getMessage("Only_files_with_these_extensions_can_be_saved_to_the_harddisk_Be_careful_to_not_allow_file_extensions_that_represent_executables_at_your_operating_system_"),
                                validation: g
                            })
                        }
                        g = {
                            name: f.getMessage("Userscripts"),
                            sub_menu_item: !0,
                            level: 80,
                            items: []
                        };
                        g.items.push({
                            name: f.getMessage("New_script_template_"),
                            id: "scriptTemplate",
                            level: 80,
                            option: !0,
                            input: !0,
                            value: l.values.scriptTemplate
                        });
                        m = {
                            name: f.getMessage("Reset_Section"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        m.items.push({
                            name: f.getMessage("Restart_Tampermonkey"),
                            id: "reset_simple",
                            level: 50,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: f.getMessage("This_will_restart_Tampermonkey_Ok_")
                            }
                        });
                        m.items.push({
                            name: f.getMessage("Factory_Reset"),
                            id: "reset_factory",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: f.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")
                            }
                        });
                        n.OPTIONS.HAS_TESLA && m.items.push({
                            name: f.getMessage("Chrome_Sync_Reset"),
                            id: "reset_chrome_sync",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: {
                                msg: f.getMessage("This_will_remove_all_stored_data_from_google_sync_Ok_")
                            }
                        });
                        ea && m.items.push({
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
                        return s.select([a, e, k, h, void 0, A, d, void 0, b, c, p, r, g, m], function(a) {
                            return !!a
                        })
                    }
                }
            }(),
            Z = function() {
                return {
                    create: function(a, d) {
                        a = a || "";
                        d = d || {};
                        var b = function(a) {
                                var c = [],
                                    b = m();
                                a.reduce(function(a,
                                    b) {
                                    return a.then(b, function() {
                                        console.warn("tree: wait failed!")
                                    }).done(function(a) {
                                        a && (c = c.concat("Array" === s.toType(a) ? a : [a]))
                                    })
                                }, m.Pledge()).then(function() {
                                    b.resolve(c)
                                }).fail(b.reject);
                                return b.promise()
                            },
                            h = function(a, b) {
                                for (var f = a.replace(/\.$/, "").split("."), g = k; f.length;) {
                                    var h = f.shift();
                                    if (g[h]) {
                                        if ("function" === typeof g[h]) return function() {
                                            return g[h](d, !b)
                                        };
                                        g = g[h];
                                        f.length || f.unshift("root")
                                    } else return console.warn("tree: unable to find", a, d),
                                        function() {
                                            return m.Pledge([])
                                        }
                                }
                                console.warn("tree: unable to find",
                                    a, d);
                                return function() {
                                    return m.Pledge([])
                                }
                            },
                            k = {
                                actions: {
                                    root: function() {
                                        var a = m();
                                        rea.tabs.getSelected(null, function(c) {
                                            d.tab = c;
                                            b([h("actions.general"), h("actions.scripts"), h("actions.commands")]).done(function(b) {
                                                a.resolve(b)
                                            }).fail(a.reject)
                                        });
                                        return a.promise()
                                    },
                                    general: function() {
                                        var a = d.tab,
                                            b = (a = a ? a.url : null) && 4 < a.length && "" == a.substr(0, 4).replace(/file|http/, "") ? a : "",
                                            a = [],
                                            h = {
                                                name: "enabled",
                                                sub_menu_item: !0,
                                                pos: "top",
                                                items: []
                                            };
                                        h.items.push({
                                            name: f.getMessage("Enabled"),
                                            display: l.values.enabled ?
                                                null : "greyed",
                                            id: "enabled",
                                            button: !0,
                                            reload: !0,
                                            enabler: !0
                                        });
                                        a.push(h);
                                        h = {
                                            name: "about",
                                            sub_menu_item: !0,
                                            pos: "bottom",
                                            items: []
                                        };
                                        h.items.push({
                                            name: f.getMessage("Dashboard"),
                                            image: "utilities",
                                            url: rea.extension.getURL("options.html") + "?" + ["url=" + encodeURIComponent(b), "selected=dashboard"].join("&"),
                                            newtab: !0
                                        });
                                        b = "version=" + rea.extension.manifest.version + "&ext=" + rea.runtime.short_id;
                                        h.items.push({
                                            image: "info",
                                            urls: [{
                                                name: " " + f.getMessage("Help"),
                                                url: "http://tampermonkey.net/faq.php?" + b,
                                                newtab: !0
                                            }, {
                                                name: " " +
                                                    f.getMessage("Changelog"),
                                                url: "http://tampermonkey.net/changelog.php?" + b,
                                                newtab: !0
                                            }]
                                        });
                                        a.push(h);
                                        return m.Pledge(a)
                                    },
                                    scripts: function() {
                                        var a = d.tab,
                                            b = a ? a.url : null,
                                            h = [],
                                            g = b && 4 < b.length && "" == b.substr(0, 4).replace(/file|http/, "") ? b : "",
                                            k = {
                                                name: "scripts",
                                                sub_menu_item: !0,
                                                pos: "right",
                                                items: []
                                            },
                                            a = t.getUniqueScriptsForTab(a),
                                            n = ia.getContexters(0, null),
                                            a = na([].concat(a).concat(n));
                                        k.items = k.items.concat(a);
                                        l.values.enabled && !a.length && b && (ja.isAllowed(b) ? k.items.push({
                                            name: f.getMessage("No_script_is_running"),
                                            image: "info"
                                        }) : k.items.push({
                                            name: f.getMessage("This_page_is_blacklisted_at_the_security_settings"),
                                            image: "critical"
                                        }));
                                        l.values.enabled && (100 > l.values.configMode || !a.length) && (k.items.push({
                                            name: f.getMessage("Get_new_scripts___"),
                                            image: "script_download",
                                            url: "http://tampermonkey.net/scripts.php",
                                            newtab: !0
                                        }), k.items.push({
                                            name: f.getMessage("Add_new_script___"),
                                            image: "script_add",
                                            url: rea.extension.getURL("options.html") + "?url=" + encodeURIComponent(g) + "#open=new-user-script",
                                            newtab: !0
                                        }));
                                        h.push(k);
                                        return m.Pledge(h)
                                    },
                                    commands: function() {
                                        var a = d.tab,
                                            b = [],
                                            h = f.getLocale(),
                                            g = {
                                                name: "commands",
                                                id: "commands",
                                                sub_menu_item: !0,
                                                pos: "left",
                                                items: []
                                            },
                                            k = a.id,
                                            a = [],
                                            k = null == k || void 0 == k ? E.list() : E.listByTabId(k),
                                            l;
                                        for (l in k)
                                            if (k.hasOwnProperty(l)) {
                                                var n = k[l];
                                                a.push({
                                                    name: n.name,
                                                    id: n.id,
                                                    accessKey: n.accessKey,
                                                    image: "menu_cmd",
                                                    menucmd: !0
                                                })
                                            }
                                        a.length && (g.items = a);
                                        g.items.push({
                                            name: f.getMessage("Check_for_userscripts_updates"),
                                            id: "run_script_updates",
                                            button: !0,
                                            image: "update"
                                        });
                                        g.items.push({
                                            name: f.getMessage("Report_a_bug"),
                                            image: "bug",
                                            url: "http://tampermonkey.net/bug",
                                            newtab: !0
                                        });
                                        g.items.push({
                                            name: f.getMessage("Please_consider_a_contribution"),
                                            image: "contrib",
                                            url: "http://tampermonkey.net/contrib.php" + (h ? "?locale=" + h : ""),
                                            newtab: !0
                                        });
                                        b.push(g);
                                        return m.Pledge(b)
                                    }
                                },
                                options: {
                                    root: function() {
                                        return b([h("options.general"), h("options.verification"), h("options.scripts"), h("options.settings")])
                                    },
                                    general: function() {
                                        var a = [];
                                        a.push({
                                            name: "Version",
                                            id: null,
                                            version: !0,
                                            value: rea.extension.manifest.version
                                        });
                                        rea.extension.inIncognitoContext &&
                                            "temporary" == l.values.incognito_mode && a.push({
                                                globalhint: !0,
                                                image: "critical",
                                                value: f.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")
                                            });
                                        return m.Pledge(a)
                                    },
                                    verification: function() {
                                        var a = [];
                                        ga.getWarnings().forEach(function(b) {
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
                                        root: function(a, c) {
                                            var d = m(),
                                                g = {
                                                    name: f.getMessage("Installed_userscripts"),
                                                    main_menu_item: !0,
                                                    scriptTab: !0,
                                                    id: "dashboard"
                                                };
                                            (function() {
                                                if (a.complete || !c) return b(s.map(["options.scripts.natives", "options.scripts.userscripts", "options.scripts.new"], function(a) {
                                                    return h(a)
                                                }));
                                                g.referrer = "options.scripts";
                                                g.partial = !0;
                                                return b([h("options.scripts.new")])
                                            })().done(function(a) {
                                                g.items = a;
                                                d.resolve([g])
                                            }).fail(d.reject);
                                            return d.promise()
                                        },
                                        "new": function() {
                                            var a = [];
                                            a.push({
                                                name: f.getMessage("New_userscript"),
                                                id: null,
                                                image: "script_add",
                                                icon: rea.extension.getURL("images/txt.png"),
                                                code: l.values.scriptTemplate,
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
                                            N.getAllUserscripts().always(function(d) {
                                                d = d || [];
                                                d.forEach(function(b) {
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
                                            root: function(a, b) {
                                                var d = a.complete || !b ? null : "options.scripts.userscripts.source",
                                                    d = na(t.determineScriptsToRun(null), !0, d),
                                                    g = d.length;
                                                d.push({
                                                    name: f.getMessage("No_script_is_installed"),
                                                    image: "info",
                                                    visible: !g
                                                });
                                                d.push({
                                                    name: f.getMessage("Get_some_scripts___"),
                                                    image: "edit_add",
                                                    url: "http://tampermonkey.net/scripts.php",
                                                    newtab: !0,
                                                    visible: !g
                                                });
                                                return m.Pledge(d)
                                            },
                                            source: function(a) {
                                                if (!a.uuid) return m.Pledge([]);
                                                a = u.getByUid(a.uuid);
                                                if (a.script && a.cond) return a = l.values.showFixedSrc ? ka.mkCompat(a.script.textContent, a.script, !1) : a.script.textContent, m.Pledge([a]);
                                                console.warn("tree: unable to process ",
                                                    a);
                                                return m.Breach()
                                            }
                                        }
                                    },
                                    settings: function(a, b) {
                                        var d = m(),
                                            g = {
                                                name: f.getMessage("Settings"),
                                                main_menu_item: !0,
                                                id: "settings",
                                                selected_default: !0
                                            },
                                            h;
                                        a.complete || !b ? h = m.Pledge(Ga.create()) : (g.referrer = "options.settings", h = m.Pledge());
                                        h.done(function(a) {
                                            g.items = a;
                                            d.resolve([g])
                                        }).fail(d.reject);
                                        return d.promise()
                                    }
                                }
                            };
                        D && console.log("tree: loading", a, d);
                        return h(a, !0)()
                    }
                }
            }(),
            na = function(a, d, b) {
                var f = [],
                    k = new V.Script;
                ["author", "copyright"].forEach(function(a) {
                    k[a] = !1
                });
                for (var e in a) {
                    var c = a[e],
                        p;
                    if (d) {
                        p = {};
                        for (var g in k) k.hasOwnProperty(g) && "textContent" != g && "requires" != g && "resources" != g && (s.toType(k[g]), p[g] = c[g]);
                        b ? p.referrer = b : p.code = c.textContent;
                        ["requires", "resources"].forEach(function(a) {
                            p[a] = s.map(c[a], function(a) {
                                var b = S.getElement(c.uuid, a.url);
                                return {
                                    url: a.url,
                                    data: {
                                        length: b && b.data && b.data.content ? b.data.content.length : 0
                                    },
                                    ts: b ? b.ts : null
                                }
                            })
                        });
                        p.origin = t.determineOrigin(c);
                        p.contexter = t.isContexter(c)
                    } else p = {
                        name: c.name,
                        uuid: c.uuid,
                        system: c.system,
                        support: !!c.supportURL,
                        origin: !!t.determineOrigin(c),
                        contexter: t.isContexter(c),
                        enabled: c.enabled,
                        position: c.position
                    };
                    p.blacklisted = c.evilness >= l.values.script_blacklist_severity;
                    p.file_url = c.downloadURL || c.fileURL;
                    p.positionof = a.length;
                    p.userscript = !0;
                    p.user_agent = c.options.user_agent;
                    c.icon64 || c.icon || (p.icon64 = rea.extension.getURL(p.user_agent ? "images/user_agent.png" : "images/txt.png"));
                    if (c.options)
                        for (g in k.options) k.options.hasOwnProperty(g) && (p[g] = c.options[g]);
                    f.push(p)
                }
                return f
            },
            oa = {
                copy: function(a) {
                    var d = document.createElement("iframe");
                    document.body.appendChild(d);
                    try {
                        d.contentDocument.designMode = "on", "html" == a.type ? (d.setAttribute("sandbox", "allow-same-origin"), d.contentDocument.documentElement.innerHTML = a.content, d.contentDocument.execCommand("selectAll", !1, null)) : d.contentDocument.oncopy = function(b) {
                            b.clipboardData.setData(a.mimetype || "text/plain", a.content);
                            b.preventDefault()
                        }, d.contentDocument.execCommand("copy", !1, null), d.contentDocument.designMode = "off"
                    } catch (b) {
                        console.error("bg: clipboard Error: " + b.message)
                    }
                    d.parentNode.removeChild(d);
                    d = null
                }
            };
        clip = oa;
        var F = {
                asked: !1,
                runCheck: !1,
                hasPermission: !1,
                init: function() {
                    Q.has(Q.permContentSettings).done(function(a) {
                        F.hasPermission = a;
                        F.runCheck = F.hasPermission && "yes" == l.values.scriptblocker_overwrite;
                        D && console.log("bg: contentSettings: runCheck = " + F.runCheck + " hasPerm = " + F.hasPermission)
                    })
                },
                askForPermission: function(a) {
                    Q.ask(Q.permContentSettings, f.getMessage("A_script_blocker_was_detected_"), f.getMessage("Click_here_to_allow_TM_to_override_the_script_blocker")).done(a)
                },
                requestPermissionEx: function(a) {
                    "yes" !=
                    l.values.scriptblocker_overwrite ? a && a() : Q.has(Q.permContentSettings).done(function(d) {
                        F.asked ? a && a(d, !1) : d ? a(d, !1) : F.askForPermission(function(b) {
                            a && a(b, !0);
                            b && !F.runCheck && (F.runCheck = !0, Y.reset())
                        });
                        F.asked = !0
                    })
                },
                remove: function(a) {
                    Q.remove(Q.permContentSettings).done(a)
                }
            },
            Y = {
                run: function(a, d) {
                    var b = 1,
                        f = function() {
                            0 == --b && (d && d(), window.location.reload())
                        };
                    if ("config" == a) {
                        var k = q.listValues(),
                            e;
                        for (e in k) {
                            var c = k[e]; - 1 != c.search(n.CONSTANTS.PREFIX.SCRIPT) && -1 != c.search(n.CONSTANTS.PREFIX.COND) &&
                                -1 != c.search(n.CONSTANTS.PREFIX.STORE) && -1 != c.search(n.CONSTANTS.PREFIX.META) && (b++, q.deleteValue(c).always(f))
                        }
                    } else "factory" == a && (F.hasPermission && (b++, F.remove(f)), b++, G.remove_permission().done(f), b++, q.factoryReset().always(f));
                    f()
                },
                reset: function(a) {
                    Y.run(null, a)
                },
                factoryReset: function(a) {
                    Y.run("factory", a)
                },
                configReset: function(a) {
                    Y.run("config", a)
                }
            },
            T = function() {
                var a = function() {
                        rea.runtime.lastError && void 0
                    },
                    d = {},
                    b = {},
                    h = {
                        init: function() {
                            h.setIcon();
                            var a = l.values.appearance_badge_color ||
                                "#ee3131";
                            "#" !== a[0] && (a = "#" + a);
                            rea.browserAction.setBadgeBackgroundColor({
                                color: a
                            })
                        },
                        setIcon: function(d, e) {
                            b[d] && window.clearTimeout(b[d]);
                            b[d] = window.setTimeout(function() {
                                var c = e;
                                void 0 == c && (c = l);
                                var h;
                                h = null;
                                var g = !1,
                                    m = !1,
                                    n = !!w.get.empty(d);
                                d && !n && (g = w.get.blocker(d), m = w.get.forbidden(d));
                                m ? (c.images.icon = "images/icon_forbidden.png", h = f.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")) : g ? (c.images.icon = "images/icon_blocker.png", h = f.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")) :
                                    c.images.icon = l.values.enabled && !n ? "images/icon.png" : "images/icon_grey.png";
                                c = {
                                    path: rea.extension.getURL(c.images.icon)
                                };
                                h = {
                                    title: h ? h : rea.extension.manifest.name
                                };
                                null != d && (c.tabId = d, h.tabId = d);
                                try {
                                    rea.browserAction.setIcon(c, a), rea.browserAction.setTitle(h)
                                } catch (r) {
                                    console.warn("bg: ERROR while setIcon! " + r.message)
                                }
                                delete b[d]
                            }, 500)
                        },
                        setBadge: function(a) {
                            d[a] && window.clearTimeout(d[a]);
                            d[a] = window.setTimeout(function() {
                                var b = 0;
                                "off" == l.values.appearance_badges ? b = 0 : "running" == l.values.appearance_badges ?
                                    a && !w.get.empty(a) && (b = w.get.stats(a).running) : "running_unique" == l.values.appearance_badges ? a && !w.get.empty(a) && (b = w.get.stats(a, !0).unique) : "disabled" == l.values.appearance_badges && a && !w.get.empty(a) && (b = w.get.stats(a).disabled);
                                D && console.log("badge: set " + b);
                                
                                delete d[a]
                            }, 500)
                        }
                    };
                return h
            }(),
            ca = function() {
                var a = null,
                    d = {
                        init: function() {
                            a = q.getValue(n.CONSTANTS.STORAGE.BEGGING, null);
                            if (!a) {
                                a = {};
                                var b = (new Date).getTime(),
                                    f = b;
                                s.each(t.determineScriptsToRun(null), function(a, b) {
                                    a.lastUpdated && a.lastUpdated < f && (f = a.lastUpdated)
                                });
                                f !== b ? (D && console.log("beg: first action found at " + (new Date(f)).toISOString()), a.first_run = {
                                    type: "from_script",
                                    ts: f
                                }) : a.first_run = {
                                    type: "from_init",
                                    ts: b
                                };
                                d.save()
                            }
                        },
                        save: function() {
                            q.setValue(n.CONSTANTS.STORAGE.BEGGING, a)
                        },
                        needed: function() {
                            var b = (new Date).getTime(),
                                d = a.first_run ? a.first_run.ts + 12096E5 < b : !0,
                                f = !a.hide,
                                e = !a.contributed,
                                b = a.later ? a.later.ts + 12096E5 <
                                b : !0;
                            return !n.RUNTIME.DOLPHIN && d && f && e && b
                        },
                        clicked: function(a, d, f) {
                            L.tG("clicked", a, d + f)
                        },
                        dialog: {
                            shown: function(b) {
                                var f = (new Date).getTime();
                                a.dialog = {
                                    ts: f,
                                    extra: b
                                };
                                d.save();
                                L.tG("dialog")
                            }
                        },
                        button: function() {
                            var b = {};
                            ["contributed", "later", "hide"].forEach(function(f) {
                                b[f] = function(b) {
                                    var e = (new Date).getTime();
                                    a[f] = {
                                        ts: e,
                                        extra: b
                                    };
                                    d.save();
                                    L.tG("button", f)
                                }
                            });
                            return b
                        }()
                    };
                return d
            }(),
            la = function() {
                var a = function(a, b) {
                        console.log(a, b);
                        if (b && a.menuItemId) {
                            var c = a.menuItemId,
                                d = u.getByUid(c);
                            d && d.script ?
                                ra.bundle({
                                    url: a.frameUrl || a.pageUrl || "<unknown>"
                                }, d.script, !0).then(function(c) {
                                    var d = m();
                                    c.method = "executeScript";
                                    a.frameUrl ? c.url = z.woHash(a.frameUrl) : c.topframe = !0;
                                    rea.tabs.sendMessage(b.id, c, d.resolve);
                                    return d.promise()
                                }).then(function() {
                                    rea.contextMenus.remove(c)
                                }) : D && console.warn("ctxm: unable to find script " + a.menuItemId, a, b)
                        }
                    },
                    d = [],
                    b = null,
                    f = !1,
                    k = function(a) {
                        var c = [];
                        s.each(a, function(a, e) {
                            var f = m();
                            rea.contextMenus.create({
                                id: a.uuid,
                                contexts: ["all"],
                                parentId: b,
                                title: a.name,
                                type: "normal",
                                documentUrlPatterns: ["http://*/*", "https://*/*", "file://*/*"]
                            }, function() {
                                f.resolve()
                            });
                            d.push(a.uuid);
                            c.push(f.promise())
                        });
                        return m.when(c)
                    },
                    e = function() {
                        var a = m();
                        rea.contextMenus.removeAll(function() {
                            b = null;
                            a.resolve()
                        });
                        return a.promise()
                    },
                    c = function() {
                        var a = m();
                        e().then(function() {
                            b = rea.contextMenus.create({
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
                    l = function() {
                        var a = ia.getContexters(0,
                            null);
                        if (a.length) {
                            var d;
                            d = b ? m.Pledge() : c();
                            return d.then(function() {
                                return k(a)
                            })
                        }
                        return e().then(g.clean)
                    },
                    g = {
                        init: function() {
                            rea.contextMenus.supported && (g.clean().then(l).then(function() {
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
                            if (rea.contextMenus.supported && f) return g.clean().then(l)
                        },
                        getContexterCount: function() {
                            return d.length
                        }
                    };
                return g
            }(),
            y = {
                infoChanged: [],
                redirects: {},
                addInfoChangedListener: function(a) {
                    y.infoChanged.push(a)
                },
                runInfoChangedListener: function() {
                    for (var a = 0; a < y.infoChanged.length; a++) y.infoChanged[a](H)
                },
                detectRedirectToCache: function(a) {
                    C.registerLateCallback(function() {
                        y.detectRedirect(a)
                    })
                },
                detectRedirect: function(a) {
                    var d = a.responseHeaders || [],
                        b = a.requestId,
                        f = !1,
                        k = !1,
                        e = !1,
                        c = "xmlhttprequest" == a.type,
                        p = "main_frame" == a.type || "sub_frame" == a.type;
                    if (!c && !p && "no" == l.values.webrequest_fixCSP) return {};
                    c && y.redirects[b] &&
                        (f = !0);
                    for (var g = {}, m = 0; m < d.length; m++) {
                        var n = d[m];
                        if (n.name) {
                            var q = n.name.toLowerCase();
                            if ("location" == q)
                                if (p) k = !0;
                                else {
                                    if (c) {
                                        f && window.clearTimeout(y.redirects[b].to);
                                        if (m = n.value || window.encodeURI(K.arrbuf2str(n.binaryValue))) n = m, z.parse(n).protocol || (m = z.parse(a.url), n = z.parse(n), n = z.woHash(z.rel2abs(m, n))), y.redirects[b] = {
                                            url: n,
                                            to: window.setTimeout(function() {
                                                delete y.redirects[b]
                                            }, 1E4)
                                        };
                                        break
                                    }
                                } else if (p && "yes" == l.values.webrequest_fixCSP && ("x-webkit-csp" == q || "x-content-security-policy" == q ||
                                    "content-security-policy" == q)) {
                                var x = !1,
                                    q = n.value.split(";").map(function(a) {
                                        var b = a.trim();
                                        if (0 == b.search(/^script-src /)) {
                                            var c = -1 != b.search(/'unsafe-eval'/),
                                                d = -1 != b.search(/'none'/);
                                            if (!c || d) return x = !0, b.replace(/script-src /, "script-src 'unsafe-eval' ").replace(/ 'none'/, "")
                                        }
                                        return a.trim()
                                    }),
                                    q = x ? q.join(";") : n.value;
                                g[m] = {
                                    name: n.name,
                                    value: q
                                }
                            }
                        }
                    }
                    if (p && !k) {
                        if (w.events.response(a.tabId, a.frameId, a.url)) {
                            var e = !0,
                                s;
                            for (s in g) D && console.log("csp: replace ", d[s], "with", g[s]), d[s] = g[s]
                        }
                    } else c && f &&
                        (d.push({
                            name: "TM-finalURL" + rea.runtime.short_id,
                            value: y.redirects[b].url
                        }), e = !0);
                    return e ? {
                        responseHeaders: d
                    } : {}
                },
                headerFix: function(a) {
                    var d = F.runCheck,
                        b = "main_frame" == a.type || "sub_frame" == a.type;
                    b && d && (d = z.parse(a.url).origin + "/*", rea.contentSettings.javascript.set({
                        primaryPattern: d,
                        setting: "allow"
                    }));
                    var d = b && w.get.user_agent(a.tabId, a.frameId),
                        f = H.headers && "xmlhttprequest" == a.type;
                    if (!d && !f) return {};
                    var k = !1,
                        b = {},
                        e = [],
                        c = RegExp("^" + H.prefix),
                        l;
                    d && (l = w.get.user_agent(a.tabId, a.frameId));
                    a = a.requestHeaders ||
                        [];
                    for (var g = 0; g < a.length; g++) {
                        var m = a[g];
                        m.name && (f && 0 == m.name.search(c) ? e.push(m) : d && "user-agent" == m.name.toLowerCase() ? (k = !0, b[m.name] = l) : b[m.name] = m.value)
                    }
                    if (f)
                        for (g = 0; g < e.length; g++) m = e[g], k = !0, b[m.name.replace(c, "")] = m.value;
                    if (k) {
                        l = [];
                        for (var n in b) b.hasOwnProperty(n) && "" != n && l.push({
                            name: n,
                            value: b[n]
                        });
                        return {
                            requestHeaders: l
                        }
                    }
                    return {}
                },
                sucRequest: function(a) {
                    0 < a.tabId && console.log("bg: " + a.requestId + " print " + a.type + " request of tabId " + a.tabId + " to " + a.url)
                },
                checkRequestForUserscript: function(a) {
                    var d =
                        "main_frame" == a.type;
                    if (d && 0 < a.tabId && "POST" != a.method && sa.isScriptUrl(a.url)) return t.installFromUrl(a.url, {}, {
                        silent_fail: !0
                    }).fail(function() {
                        rea.tabs.update(a.tabId, {
                            url: a.url + "#bypass=true"
                        }, function() {})
                    }), {
                        redirectUrl: "javascript:history.back()"
                    };
                    d && w.events.reset(a.tabId, !0);
                    w.events.request(a.tabId, a.frameId, a.url);
                    return {}
                },
                removeWebRequestListeners: function() {
                    if (H.use) try {
                        y.preCleanup(), rea.webRequest.onBeforeRequest.removeListener(y.checkRequestForUserscript), rea.webRequest.onBeforeSendHeaders.removeListener(y.headerFix),
                            rea.webRequest.onHeadersReceived.removeListener(y.detectRedirect)
                    } catch (a) {}
                    H.headers = !1;
                    y.runInfoChangedListener()
                },
                preInit: function() {
                    H.use && (y.tmp_cache = !0, rea.webRequest.onHeadersReceived.addListener(y.detectRedirectToCache, {
                        urls: ["http://*/*", "https://*/*"]
                    }, ["responseHeaders", "blocking"]), rea.webRequest.handlerBehaviorChanged())
                },
                preCleanup: function() {
                    H.use && y.tmp_cache && (rea.webRequest.onHeadersReceived.removeListener(y.detectRedirectToCache), delete y.tmp_cache)
                },
                init: function(a) {
                    if (H.use) try {
                        y.preCleanup(),
                            rea.webRequest.onBeforeRequest.addListener(y.checkRequestForUserscript, {
                                urls: ["http://*/*", "https://*/*", "file://*/*"],
                                types: ["main_frame", "sub_frame"]
                            }, ["blocking"]), rea.webRequest.onBeforeSendHeaders.addListener(y.headerFix, {
                                urls: ["http://*/*", "https://*/*", "file://*/*"]
                            }, ["requestHeaders", "blocking"]), rea.webRequest.onHeadersReceived.addListener(y.detectRedirect, {
                                urls: ["http://*/*", "https://*/*"]
                            }, ["responseHeaders", "blocking"]), rea.webRequest.handlerBehaviorChanged(), H.headers = a, H.id = s.createUUID(),
                            H.testprefix = H.prefix + s.createUUID(), H.prefix = H.prefix + H.id + "_", y.runInfoChangedListener()
                    } catch (d) {
                        D && console.error("bg: error initializing webRequests " + d.message), y.removeWebRequestListeners()
                    }
                },
                finalize: function() {
                    y.removeWebRequestListeners()
                }
            },
            ya = {
                onCommittedListener: function(a) {
                    w.events.commited(a.tabId, a.frameId, a.url)
                },
                init: function() {
                    rea.webNavigation.supported && rea.webNavigation.onCommitted.addListener(ya.onCommittedListener)
                }
            },
            C = {
                late: !1,
                callbacks: [],
                init: function() {},
                registerLateCallback: function(a) {
                    D &&
                        console.log("toea: register callback");
                    C.callbacks.push(a)
                },
                setReady: function() {
                    D && console.debug("toea: run " + C.callbacks.length + " callbacks");
                    C.late = !0;
                    for (var a = 0; a < C.callbacks.length; a++) C.callbacks[a]();
                    C.callbacks = []
                }
            },
            Ha = function() {
                var a = !1,
                    d = null,
                    b = function() {
                        a || (D && console.debug("Unloader.onbeforeunload()"), d && d(), a = !0)
                    };
                return {
                    init: function(a) {
                        d = a;
                        window.addEventListener("beforeunload", b, !1)
                    }
                }
            }(),
            Ba = function() {
                var a = rea.extension.manifest.version,
                    d = null,
                    b = !1,
                    h = !1,
                    k = function() {
                        if (C.late) {
                            var c =
                                "version=" + a + "&ext=" + rea.runtime.short_id + "&updated=true",
                                e;
                            b ? (e = "http://tampermonkey.net/installed.php?" + c, h = !0) : (c += "&old=" + d, e = "http://tampermonkey.net/changelog.php?" + c);
                            "off" != l.values.notification_showUpdate && ("notification" == l.values.notification_showUpdate ? P.showUpdate(f.getMessage("Updated_to__0version0", a), f.getMessage("Click_here_to_see_the_recent_changes"), rea.extension.getURL("images/icon128.png"), function(a) {
                                    a.clicked && rea.tabs.create({
                                        url: e
                                    }, function() {})
                                }) : "changelog" == l.values.notification_showUpdate &&
                                (h || (e += "&intr=true"), h = !0, rea.tabs.create({
                                    url: e,
                                    active: h
                                }, function() {})))
                        } else C.registerLateCallback(k)
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
                    c = function(a) {
                        C.late ? (D && console.log("upd: onInstalled", a), a || (a = {
                                reason: "mandatory_argument_is_not_set"
                            }), "chrome_update" == a.reason ? L.tB({
                                updated: !0
                            }) :
                            "install" != a.reason && "update" != a.reason || r.scheduleNotification(a.previousVersion, "install" == a.reason)) : C.registerLateCallback(function() {
                            c(a)
                        })
                    },
                    p = function() {
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
                    g = function() {
                        var a = !1,
                            b = !1;
                        e().then(function(a) {
                            b = a;
                            return p
                        }).then(function(b) {
                            a =
                                b
                        }).always(function() {
                            h = !b || a;
                            k();
                            t = !0
                        })
                    },
                    s = null,
                    t = !1,
                    r = {
                        scheduleNotification: function(a, c) {
                            t || (d = a, b |= c, s && window.clearTimeout(s), s = window.setTimeout(g, 1E3))
                        }
                    };
                rea.runtime.onInstalled.addListener(c);
                rea.runtime.onUpdateAvailable.addListener(function(a) {
                    console.log("An update to version", a.version, "is available");
                    window.setTimeout(function() {
                        P.show(f.getMessage("Update"), f.getMessage("0name0_0version0_is_available__Please_re_start_your_browser_to_update_", rea.extension.manifest.name, a.version), rea.extension.getURL("images/icon128.png"),
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
            za = function(a, d, b) {
                C.late ? (sa.isScriptUrl(b.url) && t.installFromUrl(b.url), "loading" == d.status ? w.events.loading(b.id, 0, b.url) : "complete" == d.status && w.events.complete(b.id, 0, b.url)) : window.setTimeout(function() {
                    za(a, d, b)
                }, 100)
            },
            Ia = function(a, d) {
                Aa(d, {});
                T.setIcon(a);
                T.setBadge(a)
            },
            Aa = function(a, d) {
                $[a] && ($[a].onClose(), delete $[a]);
                w.events.remove(a)
            },
            ua = function() {
                var a =
                    "temporary" == l.values.incognito_mode && rea.extension.inIncognitoContext;
                q.setTemporary(a);
                a && (l.values.native_import = !1, l.values.sync_enabled = !1, l.values.scriptUpdateCheckPeriod = 0, l.values.sync_type = 0, l.values.statistics_enabled = !1)
            },
            Ja = function() {
                pa(l.values.logLevel);
                f.setLocale(l.values.i18n || n.LOCALE.DEFAULT);
                N.setPath(l.values.native_import_path);
                L.init("bg", rea.extension.manifest.version);
                L.setEnabled(l.values.statistics_enabled);
                F.init();
                w.listeners.add.onReset(function(a, b) {
                    E.clearByTabId(a);
                    u.removeStorageListeners({
                        tabid: a
                    }, !1);
                    b || T.setIcon(a)
                });
                var a = function(a) {
                    T.setIcon(a);
                    T.setBadge(a)
                };
                w.listeners.add.onCommited(a);
                w.listeners.add.onCompleted(a);
                I.init().done(function(a) {
                    a && I.sync()
                });
                ba.init();
                u.init();
                a = function() {
                    G.set_mode(l.values.downloads_mode);
                    G.set_whitelist(l.values.downloads_extension_whitelist)
                };
                a();
                G.config_changed_listener = a;
                ya.init();
                y.addInfoChangedListener(function(a) {
                    ma && ma.setWebRequest(a)
                });
                y.init("no" != l.values.webrequest_modHeaders);
                la.init();
                ca.init()
            },
            z =
            Registry.get("uri"),
            G = Registry.get("downloads");
        uris = z;
        down = G;
        var K, da, ma, ka, V, J, f, ea;
        init = function() {
            C.init();
            y.preInit();
            rea.tabs.onUpdated.addListener(za);
            rea.tabs.onReplaced.addListener(Ia);
            rea.tabs.onRemoved.addListener(Aa);
            rea.extension.onMessage.addListener(fa.handler);
            rea.extension.onConnect.addListener(xa);
            rea.extension.onConnectExternal.addListener(function(a) {
                a.disconnect()
            });
            Ha.init(function() {
                y.finalize();
                I.finalize()
            });
            K = Registry.get("convert");
            f = Registry.get("i18n");
            ma = Registry.get("xmlhttprequest");
            da = ma.run;
            ka = Registry.get("compat", n);
            V = Registry.get("parser");
            J = Registry.get("syncinfo");
            ea = Registry.get("test");
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
                return Ca()
            }).then(function() {
                return l.init()
            }).then(function() {
                cfgo = l;
                ua();
                Ja();
                Ea();
                T.init();
                window.setTimeout(X.check, 1E4);
                D && console.debug("Listeners registered!");
                window.setTimeout(C.setReady,
                    1);
                if (ea && Registry.isDevVersion("test")) {
                    var a = ea.framework.prepare(t.doSave, n.RUNTIME.BROWSER);
                    a && console.error(a)
                }
            })
        };
        init()
    }
});