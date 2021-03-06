'use strict';
var trup, init, lfgs, sycl, cfgo, uris, clip, dast, perm, blak, scbr, exts, down;
Registry.require("promise statistics convert xmlhttprequest downloads cache storage uri compat parser layout helper syncinfo notify asker i18n native".split(" "), function() {
    var l = Registry.log,
        q = rea.FEATURES,
        ga = function() {
            var a = [],
                m = !0,
                c = function(a, c, f) {
                    var b = {
                        title: a.join("\n\n")
                    };
                    c.path = rea.extension.getURL("images/icon" + (c.frag ? "_" + c.frag : "") + ".png");
                    l.warn(a.join("\n"));
                    rea.browserAction.setIcon({
                        path: c.path
                    });
                    rea.browserAction.setTitle(b);
                    c = function(b, f, c) {
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
                    f || rea.extension.onMessage.addListener(c)
                };
            return {
                run: function() {
                    try {
                        Registry.verify("5271").length && (m = !1, c(["Tampermonkey detected that browser is caching some outdated code parts.", "In order to avoid unexpected behavior TM will be kept paused until your browser was restarted."], {
                            frag: "paused"
                        }))
                    } catch (a) {
                        m = !1, l.error(a.message)
                    }
                    if ("chromeStorage" == q.DB.USE && !q.DB.NO_WARNING) {
                        var d =
                            function() {
                                if (!r) return window.setTimeout(d, 2E3);
                                r.isWorking().fail(function() {
                                    confirm("Tampermonkey detected that the extension storage is unreliable!\n\nUnfortunately this means that all your settings and userscripts are inaccessible at the moment.\n\nDo you want to visit the FAQ entry that explains how to recover from that?") && rea.tabs.create({
                                        url: "http://tampermonkey.net/faq#Q206"
                                    }, function() {});
                                    c(["Tampermonkey detected that the extension storage is unreliable!"], {
                                        frag: "paused"
                                    }, !0)
                                })
                            };
                        window.setTimeout(d,
                            1E3)
                    }
                    return m
                },
                pause: c,
                setWarning: function(c, h, f) {
                    a.push({
                        text: c,
                        description: h,
                        url: f
                    })
                },
                getWarnings: function() {
                    return a
                }
            }
        }();
    if (ga.run()) {
        var n = Registry.get("promise"),
            v = Registry.get("helper"),
            J = Registry.get("cache"),
            K = Registry.get("statistics"),
            r = Registry.get("storage"),
            P = Registry.get("notify"),
            ba = Registry.get("asker"),
            L = Registry.get("native"),
            Ba = Registry.get("permission"),
            ra = Registry.get("layout"),
            A = Registry.get("uri"),
            e = Registry.get("i18n"),
            E = Registry.get("downloads");
        uris = A;
        down = E;
        perm = Ba;
        dast =
            r;
        var sa = v.createUUID(),
            M = {},
            V = {};
        l.debug("Starting background fred @" + sa);
        J.create("rundata").setOptions({
            timeout: 180,
            check_interval: 120,
            retimeout_on_get: !0
        }).init();
        J.create("regexp").setOptions({
            timeout: 3600,
            check_interval: 120,
            retimeout_on_get: !0
        }).init();
        var Da = function() {
                var a = n(),
                    m, c, d = rea.extension.manifest.version,
                    h = r.getSchemaVersion(),
                    f = h;
                r.getVersion("0.0.0.0").then(function(a) {
                    c = a;
                    m = y.versionCmp(d, c) == y.versionCmp.eNEWER;
                    return r.isWiped()
                }).then(function(a) {
                    !m && a && (a = ["Tampermonkey detected inconsistencies that indicate that your browser wiped the extension database!",
                        "You can continue to use Tampermonkey normally, but your settings and scripts might be lost. Click here to get more information.", "http://tampermonkey.net/faq.php#Q207"
                    ], l.warn(a.join("\n")), ga.setWarning.apply(this, a))
                }).always(function() {
                    var b = [],
                        p = 0,
                        k = function() {
                            if (p < b.length) {
                                var c = b[p].schema;
                                b[p].cond(c) ? b[p].fn().done(function() {
                                    c && (l.log("Converted database from", f, "to", c), f = c);
                                    p++;
                                    k()
                                }).fail(function() {
                                    a.reject()
                                }) : (p++, k())
                            }
                        },
                        t = function() {
                            l.warn("Incognito mode detected. Database conversion can only be done in non-incognito mode! Stopping now...");
                            ga.pause(["Tampermonkey needs to convert its database but this can't be done in incogonito mode!", "Please open a non-incognito mode window and/or restart your browser."], {
                                frag: "paused"
                            })
                        },
                        b = [{
                            cond: function() {
                                return m && !q.RUNTIME.FIREFOX && !q.RUNTIME.EDGE && "chromeStorage" == q.DB.USE && !r.getValue(q.CONSTANTS.STORAGE.LEGACY_VERSION) && y.versionCmp("3.5.3603", c) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                rea.extension.inIncognitoContext ? (t(), a.reject()) : (l.log("Update database..."), f = "3.5.3603", r.migrate("sql",
                                    "chromeStorage").done(function() {
                                    l.log("Copied config for default usage of chrome storage");
                                    a.resolve()
                                }));
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return m && y.versionCmp("3.6.3650", f) == y.versionCmp.eNEWER && y.versionCmp("3.5.3650", c) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                if (rea.extension.inIncognitoContext) t(), a.reject();
                                else {
                                    f = "3.6.3650";
                                    var b = [];
                                    [{
                                        o: "TM_config",
                                        n: q.CONSTANTS.STORAGE.CONFIG
                                    }, {
                                        o: "TM_update_check",
                                        n: q.CONSTANTS.STORAGE.UPDATE
                                    }, {
                                        o: "TM_version"
                                    }, {
                                        o: "TM_unload_ts"
                                    }].forEach(function(a) {
                                        if (a.n) {
                                            var f =
                                                r.getValue(a.o);
                                            void 0 !== f && b.push(r.setValue(a.n, f))
                                        }
                                        b.push(r.deleteValue(a.o))
                                    });
                                    var k = /@re$/,
                                        d = [];
                                    r.listValues().forEach(function(a) {
                                        -1 != a.search(k) && (a = a.replace(k, ""), d.push(a))
                                    });
                                    d.forEach(function(a) {
                                        var f = r.getValue(a + "@st"),
                                            c = r.getValue(a),
                                            k = r.getValue(a + "@re"),
                                            d = r.getValue(a + "@source"),
                                            p = z.getUidByName(a) || v.createUUID();
                                        b.push(r.deleteValue(a + "@st"));
                                        b.push(r.deleteValue(a));
                                        b.push(r.deleteValue(a + "@re"));
                                        b.push(r.deleteValue(a + "@source"));
                                        c && k && d ? (b.push(r.setValue(q.CONSTANTS.PREFIX.SCRIPT_UID +
                                            p, a)), b.push(r.setValue(q.CONSTANTS.PREFIX.COND + p, k)), b.push(r.setValue(q.CONSTANTS.PREFIX.STORE + p, f)), b.push(r.setValue(q.CONSTANTS.PREFIX.SCRIPT + p, d)), b.push(r.setValue(q.CONSTANTS.PREFIX.META + p, c))) : l.warn("invalid script entry", {
                                            source: d,
                                            meta: c,
                                            cond: k
                                        })
                                    });
                                    k = /@st$/;
                                    r.listValues().forEach(function(a) {
                                        -1 != a.search(k) && b.push(r.deleteValue(a))
                                    });
                                    n.when(b).done(function() {
                                        l.log("Converted database from", c, "to", f);
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "3.7.0",
                            cond: function(a) {
                                return y.versionCmp(a,
                                    f) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                if (rea.extension.inIncognitoContext) t(), a.reject();
                                else {
                                    var b = [],
                                        f = new RegExp("^" + q.CONSTANTS.PREFIX.META);
                                    r.listValues().forEach(function(a) {
                                        if (-1 != a.search(f)) {
                                            var c = r.getValue(a);
                                            c.options && c.options.override && !c.options.override.orig_run_at && (c.options.override.orig_run_at = c.options.run_at || "document-idle", c.options.run_at = null, b.push(r.setValue(a, c)))
                                        }
                                    });
                                    n.when(b).done(function() {
                                        a.resolve()
                                    })
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4258",
                            cond: function(a) {
                                return y.versionCmp(a,
                                    f) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                if (rea.extension.inIncognitoContext) t(), a.reject();
                                else {
                                    var b = r.getValue(q.CONSTANTS.STORAGE.CONFIG);
                                    b && b.sync_enabled && 2 == b.sync_type && (b.sync_version = 1, r.setValue(q.CONSTANTS.STORAGE.CONFIG, b));
                                    a.resolve()
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4526",
                            cond: function(a) {
                                return m && q.RUNTIME.SAFARI && "chromeStorage" == q.DB.USE && y.versionCmp(a, f) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                if (rea.extension.inIncognitoContext) t(), a.reject();
                                else {
                                    l.log("Update database...");
                                    var b = r.migrate("localStorage", "chromeStorage").done(function() {
                                        l.log("Copied config for default usage of setting storage")
                                    });
                                    a.consume(b)
                                }
                                return a.promise()
                            }
                        }, {
                            schema: "4871",
                            cond: function(a) {
                                return m && y.versionCmp(a, f) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n(),
                                    b, f, c = r.getValue(q.CONSTANTS.STORAGE.CONFIG);
                                c && c.scriptTemplate && (f = g.getDefaults()) && (b = f.script_templates) && b[0] && b[0].value && (b[0].value = c.scriptTemplate, delete c.scriptTemplate, r.setValue(q.CONSTANTS.STORAGE.CONFIG, c));
                                a.resolve();
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return m || y.versionCmp(f, h) == y.versionCmp.eNEWER
                            },
                            fn: function() {
                                var a = n();
                                r.setVersion(d, f).done(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }
                        }, {
                            cond: function() {
                                return m
                            },
                            fn: function() {
                                l.log("First run of version " + d + "!");
                                Ca.scheduleNotification(c, "0.0.0.0" == c);
                                return n.Pledge()
                            }
                        }, {
                            cond: function() {
                                return !0
                            },
                            fn: function() {
                                var b = n();
                                a.resolve();
                                window.setTimeout(b.resolve, q.MISC.TIMEOUT);
                                return b.promise()
                            }
                        }];
                    k()
                });
                return a.promise()
            },
            ia = function() {
                return {
                    get: function(a,
                        m) {
                        var c = (0 == a) + "#" + m,
                            d = J.items.rundata.getj(c);
                        if (d) d = d.oldret;
                        else {
                            var d = [],
                                h = 0,
                                f = {};
                            if (m)
                                for (var b = w.determineScriptsToRun(m), p = 0; p < b.length; p++) {
                                    var k = b[p];
                                    k.enabled ? k.evilness && k.evilness >= g.values.script_blacklist_severity || 0 != a && (!0 === k.options.noframes || null === k.options.noframes && !0 === k.options.override.orig_noframes) || w.isContexter(k) || (f[k.name] = !0, d.push(k)) : h++
                                }
                            d = {
                                runners: d,
                                disabled: h,
                                script_map: f
                            };
                            m && J.items.rundata.setj(c, {
                                frameId: a,
                                oldret: d
                            })
                        }
                        return d
                    },
                    answer: function(a) {
                        a = v.select(a,
                            function(a) {
                                return a
                            });
                        var m = [{
                            m: "native",
                            t: [E.staticVars.DEFAULT, E.staticVars.NATIVE]
                        }, {
                            m: "disabled",
                            t: [E.staticVars.OFF]
                        }, {
                            m: "browser",
                            t: [E.staticVars.CHROME]
                        }].filter(function(a) {
                            if (-1 != a.t.indexOf(g.values.downloads_mode)) return !0
                        }).map(function(a) {
                            return a.m
                        })[0] || "disabled";
                        return {
                            scripts: a,
                            contexters: ha.getContexterCount(),
                            raw: {},
                            inIncognitoContext: rea.extension.inIncognitoContext,
                            downloadMode: m,
                            enforce_strict_mode: "on" == g.values.runtime_strict_mode,
                            measure_scripts: g.values.debug,
                            logLevel: g.values.logLevel,
                            version: rea.extension.manifest.version
                        }
                    },
                    getContexters: function(a, m) {
                        for (var c = [], d = w.determineScriptsToRun(m), h = 0; h < d.length; h++) {
                            var f = d[h];
                            f.enabled && (0 == a || !0 !== f.options.noframes && (null !== f.options.noframes || !0 !== f.options.override.orig_noframes)) && w.isContexter(f) && c.push(f)
                        }
                        return c
                    }
                }
            }(),
            B = function() {
                var a = {},
                    m = 1,
                    c = m++,
                    d = m++,
                    h = m++,
                    f = m++,
                    b = m++,
                    p = m++,
                    k = m++,
                    t = function() {
                        var a = {
                            frames: {
                                0: {
                                    state: c
                                }
                            },
                            tabs: {
                                reset_ts: Date.now()
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
                    e = {
                        updateStats: function(b, f, c, k) {
                            a[b].stats.running += c;
                            a[b].stats.disabled += k;
                            a[b].contexts.onUnload[f] = a[b].contexts.onUnload[f] || [];
                            a[b].contexts.onUnload[f].push(function() {
                                a[b].stats.running -= c;
                                a[b].stats.disabled -= k
                            });
                            a[b].tabs.ts = Date.now()
                        },
                        updateMaps: function(b, f, c) {
                            var k = 1,
                                d = function(f, c) {
                                    void 0 === a[b].maps[c] && 1 === k && (a[b].maps[c] = 0);
                                    a[b].maps[c] += k
                                };
                            v.each(c, d);
                            a[b].contexts.onUnload[f] =
                                a[b].contexts.onUnload[f] || [];
                            a[b].contexts.onUnload[f].push(function() {
                                a[b] && (k = -1, v.each(c, d))
                            })
                        },
                        updateUrls: function(b, f, c) {
                            var k = function(k) {
                                1 === k && (void 0 === a[b].urls[c] ? a[b].urls[c] = {
                                    frameId: f,
                                    count: 0
                                } : 0 === f && (a[b].urls[c].frameId = f));
                                a[b].urls[c].count += k;
                                a[b].urls.length = -1
                            };
                            k(1);
                            a[b].contexts.onUnload[f] = a[b].contexts.onUnload[f] || [];
                            a[b].contexts.onUnload[f].push(function() {
                                a[b] && k(-1)
                            })
                        },
                        determine: function(b, f, c) {
                            var k = null;
                            da.isAllowed(c) ? k = c : (l.debug("This URL is filtered by the security settings:",
                                c, "-> Do nothing!"), B.set.forbidden(b, f));
                            f = ia.get(f, k);
                            a[b].scripts[c] = f;
                            return f.runners.length
                        },
                        run: function(a, b, f, c, k) {
                            a = [];
                            for (b = 0; b < c.length; b++) a.push(ta.bundle({
                                url: f
                            }, c[b]));
                            var d;
                            n.when(a).always(function(a) {
                                k ? k(a) : d = a
                            });
                            return d
                        }
                    },
                    u = {},
                    x = {},
                    ca = {},
                    O = {},
                    F = {
                        listeners: {
                            once: {
                                whenReady: function(b, f) {
                                    if (!a[b] || a[b].frames[0].state < h) F.listeners.once.onReady(b, f);
                                    else f()
                                },
                                onReady: function(a, b) {
                                    var f = function(a) {
                                            F.listeners.remove.onCommited(c);
                                            F.listeners.remove.onCompleted(k);
                                            a && b()
                                        },
                                        c = F.listeners.add.onCommited(function(b) {
                                            b ===
                                                a && f(!0)
                                        }),
                                        k = F.listeners.add.onCompleted(function(b) {
                                            b === a && f(!0)
                                        })
                                }
                            },
                            add: {
                                onReset: function(a) {
                                    var b = v.createUUID();
                                    u[b] = a;
                                    return b
                                },
                                onCommited: function(a) {
                                    var b = v.createUUID();
                                    x[b] = a;
                                    return b
                                },
                                onCompleted: function(a) {
                                    var b = v.createUUID();
                                    ca[b] = a;
                                    return b
                                },
                                onRemoved: function(a) {
                                    var b = v.createUUID();
                                    O[b] = a;
                                    return b
                                }
                            },
                            remove: function() {
                                return {
                                    onReset: function(a) {
                                        delete u[a]
                                    },
                                    onCommited: function(a) {
                                        delete x[a]
                                    },
                                    onCompleted: function(a) {
                                        delete ca[a]
                                    },
                                    onRemoved: function(a) {
                                        delete O[a]
                                    }
                                }
                            }()
                        },
                        events: {
                            reset: function(b,
                                f) {
                                a[b] = t();
                                a[b].frames[0].state = c;
                                v.each(u, function(a) {
                                    a && a(b, f)
                                })
                            },
                            response: function(b, f, k) {
                                if (g.values.enabled) {
                                    a[b] = a[b] || t();
                                    a[b].frames[f] = a[b].frames[f] || {};
                                    var p = a[b].frames[f].state || c;
                                    a[b].frames[f].state = d;
                                    0 === f && (a[b].tabs.response_ts = Date.now());
                                    k = A.woHash(k);
                                    p < d && e.determine(b, f, k);
                                    return (b = a[b].scripts[k]) ? b.runners.length : 0
                                }
                            },
                            commited: function(b, f, k) {
                                if (g.values.enabled) {
                                    var p = A.parse(k);
                                    if ("http:" === p.protocol || "https:" === p.protocol || "file:" === p.protocol) a[b] = a[b] || t(), a[b].frames[f] =
                                        a[b].frames[f] || {}, p = a[b].frames[f].state || c, p >= h || (a[b].frames[f].state = h, p < d && (k = A.woHash(k), e.determine(b, f, k)), v.each(x, function(a) {
                                            a && a(b)
                                        }))
                                }
                            },
                            loading: function(b, k, p) {
                                if (g.values.enabled) {
                                    var h = A.parse(p);
                                    "http:" !== h.protocol && "https:" !== h.protocol && "file:" !== h.protocol || 0 !== k || "file:" !== h.protocol || (a[b] = a[b] || t(), a[b].frames[k] = a[b].frames[k] || {}, h = a[b].frames[k].state || c, h >= f || (a[b].frames[k].state = f, h < d && (p = A.woHash(p), e.determine(b, k, p))))
                                }
                            },
                            run: function(f, c, k, d, p) {
                                if (g.values.enabled) {
                                    k =
                                        0 === c || q.RUNTIME.EXEC_SCRIPT_FRAME_SUPPORT ? c : k;
                                    a[f] = a[f] || t();
                                    a[f].frames[k] = a[f].frames[k] || {};
                                    var h = A.woHash(d);
                                    d = a[f].scripts[h];
                                    if (!d && (e.determine(f, c, h), d = a[f].scripts[h], !d)) {
                                        l.warn("tv: no script run info for tab " + f + " @ " + h, l.D ? a[f].scripts : "");
                                        return
                                    }
                                    a[f].frames[k].state = b;
                                    e.updateMaps(f, k, d.script_map);
                                    e.updateUrls(f, k, h);
                                    e.updateStats(f, k, d.runners.length, d.disabled);
                                    var m = function(b) {
                                        a[f] && delete a[f].scripts[h];
                                        p && p(b)
                                    };
                                    c = e.run(f, c, h, d.runners, p ? function(b) {
                                        m(b)
                                    } : null);
                                    !p && c && m(c);
                                    return c
                                }
                            },
                            complete: function(f, k, d) {
                                d = A.parse(d);
                                if (g.values.enabled && ("http:" === d.protocol || "https:" === d.protocol || "file:" === d.protocol)) {
                                    if (0 === k) {
                                        a[f] = a[f] || t();
                                        a[f].frames[k] = a[f].frames[k] || {};
                                        var h = a[f].frames[k].state || c;
                                        a[f].frames[k].state = p;
                                        if (!B.get.empty(f) && B.get.stats(f).running) {
                                            if (h < b) {
                                                l.warn("tv: no script run info!");
                                                return
                                            }
                                            "file:" === d.protocol ? window.setTimeout(function() {
                                                rea.tabs.sendMessage(f, {
                                                    method: "onLoad",
                                                    frameId: k
                                                }, function() {})
                                            }, 500) : rea.tabs.sendMessage(f, {
                                                    method: "onLoad",
                                                    frameId: k
                                                },
                                                function() {})
                                        }
                                    }
                                    v.each(ca, function(b) {
                                        b && b(f)
                                    })
                                }
                            },
                            unload: function(b, f, c) {
                                f = 0 === f || q.RUNTIME.EXEC_SCRIPT_FRAME_SUPPORT ? f : c;
                                a[b] = a[b] || t();
                                a[b].frames[f] = a[b].frames[f] || {};
                                a[b].frames[f].state = k;
                                if (a[b] && a[b].contexts.onUnload[f]) {
                                    for (c = 0; c < a[b].contexts.onUnload[f].length; c++) a[b].contexts.onUnload[f][c]();
                                    a[b].contexts.onUnload[f] = []
                                }
                            },
                            remove: function(b) {
                                delete a[b];
                                v.each(O, function(a) {
                                    a && a(b)
                                })
                            }
                        },
                        set: {
                            extra: function(b, f, c, k) {
                                a[b] = a[b] || t();
                                null === f ? a[b].extra[c] = k : (a[b].extra[c] = a[b].extra[c] || {}, a[b].extra[c][f] = k)
                            },
                            blocker: function(b) {
                                F.set.extra(b, null, "blocker", !0)
                            },
                            forbidden: function(b, a) {
                                0 === a && F.set.extra(b, null, "forbidden", !0)
                            }
                        },
                        get: {
                            extra: function(b, f, c, k) {
                                void 0 === k && (k = null);
                                var d = null,
                                    d = (a[b] ? a[b].extra : {})[c];
                                null !== f && d && (d = d[f]);
                                return d || k
                            },
                            empty: function(b) {
                                var f = !0;
                                if (a[b] && 0 != a[b].urls.length) {
                                    if (-1 == a[b].urls.length) return a[b].urls.length = 0, v.each(a[b].urls, function(f, c) {
                                        "length" !== c && 0 < f.count && a[b].urls.length++
                                    }), F.get.empty(b);
                                    f = !1
                                }
                                return f
                            },
                            urls: function(b) {
                                return a[b] ?
                                    a[b].urls : {}
                            },
                            stats: function(b, f) {
                                var c = {};
                                if (a[b] && (c.running = a[b].stats.running, c.disabled = a[b].stats.disabled, f)) {
                                    c.unique = 0;
                                    for (var k in a[b].maps) a[b].maps.hasOwnProperty(k) && 0 < a[b].maps[k] && c.unique++
                                }
                                return c
                            },
                            tabs: function() {
                                var b = {};
                                v.each(a, function(a, f) {
                                    b[f] = {
                                        ts: a.response_ts
                                    }
                                });
                                return b
                            },
                            blocker: function(b) {
                                return F.get.extra(b, null, "blocker")
                            },
                            forbidden: function(b) {
                                return F.get.extra(b, null, "forbidden")
                            }
                        }
                    };
                return F
            }(),
            la = function() {
                return {
                    isScriptUrl: function(a) {
                        if (!a || -1 != a.search(/\#bypass=true/) ||
                            -1 != a.search(q.REQUESTS.GET_INTERNAL_PAGE_REGEXP()) || "data:" === a.substr(0, 5)) return !1;
                        a = a.split(/[\?#$]/)[0];
                        var m = -1 != a.search(/.+\.user\.(js\#|js\?|js$)/) || -1 != a.search(/.+\.tamper\.(js\#|js\?|js$)/);
                        return m ? !(-1 != a.search(/^htt[ps]{1,2}:\/\/code\.google\.com/) || -1 != a.search(/^htt[ps]{1,2}:\/\/github\.com/) && !w.determineOriginOfUrl(a)) : m
                    }
                }
            }(),
            ua = function() {
                var a = function(a) {
                    var c = n(),
                        d = Date.now();
                    a.url += -1 != a.url.search("\\?") ? "&" : "?";
                    a.url += "ts=" + d;
                    var d = function(b) {
                            if (4 == b.readyState && (200 ==
                                    b.status || 0 == b.status))
                                if ("arraybuffer" == h.responseType) {
                                    if (b.response) {
                                        c.resolve({
                                            decoded: !0,
                                            encoding: a.encoding,
                                            content: H.arrbuf2str(b.response, a.encoding)
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
                        h = {
                            method: "GET",
                            retries: 0,
                            responseType: "arraybuffer",
                            url: a.url
                        };
                    if (a.sync) {
                        var f = S(h, {});
                        4 == f.readyState && 0 == f.status && f.error && (delete h.responseType, f = S(h, {}));
                        d(f)
                    } else S(h, {
                        ondone: d
                    });
                    return c.promise()
                };
                return {
                    getSource: function(e) {
                        "string" === typeof e && (e = {
                            url: e
                        });
                        return a(e)
                    }
                }
            }();
        lfgs = ua;
        var da = function() {
                return {
                    init: function() {
                        var a = function() {
                            J.items.regexp.remove("PageFilter")
                        };
                        g.addChangeListener("forbiddenPages", a);
                        g.addChangeListener("page_whitelist", a);
                        g.addChangeListener("page_filter_mode", a)
                    },
                    isAllowed: function(a) {
                        var e = !1,
                            c = !1,
                            d = 0 != g.values.forbiddenPages.length,
                            h = 0 != g.values.page_whitelist.length;
                        switch (g.values.page_filter_mode) {
                            case "black":
                                c = d;
                                break;
                            case "off":
                                break;
                            case "white":
                                e =
                                    h;
                                break;
                            default:
                                e = h, c = d
                        }(d = J.items.regexp.get("PageFilter")) || (d = w.regexify({
                            inc: e ? g.values.page_whitelist : void 0,
                            exc: c ? g.values.forbiddenPages : void 0
                        }), J.items.regexp.set("PageFilter", d));
                        return !c && !e || w.validUrl(a, d)
                    }
                }
            }(),
            Q = function() {
                var a = function(a, d) {
                        var h = !1;
                        if (d.length) return (h = "/" == d.substr(0, 1) ? w.matchUrl(a, w.convertToRegExp(d)) : -1 != a.search(d)) && l.debug('black: entry "' + d + '" matched'), h
                    },
                    m = {
                        init: function() {
                            var a = n(),
                                d = function() {
                                    "server" === g.values.script_blacklist_type && window.setTimeout(m.checkUpdate,
                                        2E4)
                                };
                            d();
                            g.addChangeListener("script_blacklist_type", d);
                            a.resolve();
                            return a.promise()
                        },
                        getWarningsFor: function(c) {
                            var d = [];
                            c && v.each(g.values.script_blacklist_server, function(h) {
                                if (h) {
                                    var f = e.getUiLocale(),
                                        b;
                                    v.each(h.rules, function(f) {
                                        b |= a(c, f);
                                        return 1 != b
                                    });
                                    b && (h.reasons ? d.push(h.reasons[f] || h.reasons.en) : h.reason && d.push(h.reason))
                                }
                            });
                            return d
                        },
                        getEvilnessOf: function(c) {
                            if ("off" === g.values.script_blacklist_type) return !1;
                            if (!c) return 0;
                            var d = !1,
                                h = 0;
                            v.each(g.values.require_blacklist, function(f) {
                                d |=
                                    a(c, f);
                                return 1 != d
                            });
                            d ? h = 11 : "server" === g.values.script_blacklist_type && v.each(g.values.script_blacklist_server, function(f) {
                                if (f && (v.each(f.rules, function(b) {
                                        d |= a(c, b);
                                        return 1 != d
                                    }), d)) return h = f.severity, !1
                            });
                            return Number(h)
                        },
                        checkUpdate: function(a) {
                            var d = n(),
                                h = W.getConfig(),
                                f;
                            if (a || 6048E5 < Date.now() - h.black.last) {
                                var b = function(b, a) {
                                    var f = n();
                                    S({
                                        method: "GET",
                                        url: b,
                                        nocache: a,
                                        retries: q.XMLHTTPREQUEST.RETRIES,
                                        overrideMimeType: "text/plain; charset=x-user-defined"
                                    }, {
                                        ondone: function(b) {
                                            f.resolve(b)
                                        }
                                    });
                                    return f.promise()
                                };
                                b("https://blacklist.tampermonkey.net/get.php?version=get").then(function(d) {
                                    if (4 == d.readyState && 200 == d.status) {
                                        try {
                                            f = JSON.parse(d.responseText).version
                                        } catch (k) {
                                            l.warn("black: unable to parse version response! " + d.responseText)
                                        }
                                        l.info("black: local version: " + h.black.version + " remote: " + f);
                                        if (f > h.black.version || a) return b("https://blacklist.tampermonkey.net/get.php", !0)
                                    }
                                }).then(function(b) {
                                    if (b && 4 == b.readyState && 200 == b.status) try {
                                        var a = JSON.parse(b.responseText);
                                        a && a.blacklist &&
                                            1 == a.version && (g.values.script_blacklist_server = a.blacklist);
                                        l.info("black: updated blacklist to ", a)
                                    } catch (f) {
                                        l.warn("black: blacklist update failed! ", b.responseText)
                                    }
                                }).always(function() {
                                    h = W.getConfig();
                                    h.black.last = Date.now();
                                    h.black.version = f || h.black.version;
                                    W.setConfig(h);
                                    d.resolve()
                                })
                            } else d.resolve();
                            return d.promise()
                        }
                    };
                return m
            }();
        blak = Q;
        var Ea = function() {
                for (var a = [], e = [], c = 0; c < a.length; c++) {
                    var d = Registry.getRaw("system/" + a[c] + ".tamper.js");
                    d && e.push(d)
                }
                return e
            },
            G = function() {
                var a = 0,
                    m = [],
                    c = {
                        to: null,
                        force: null,
                        t: 0
                    },
                    d = {},
                    h = function(b) {
                        l.debug("sync: import", b.uuid, b.name, b.url);
                        var a = {
                                imported: g.values.sync_type
                            },
                            f = {},
                            c;
                        for (c in u.SYNCED) !0 === u.SYNCED[c] && (f[c] = b.options[c]);
                        return w.installFromUrl(b.url, {
                            uuid: b.uuid,
                            ask: !1,
                            internal: !0,
                            sync: a,
                            force_options: f
                        }, {
                            silent_fail: !0
                        })
                    },
                    f = function(b) {
                        l.debug("sync: export", b.name, b.url);
                        return I.add(b)
                    },
                    b = function(b) {
                        var a = b.downloadURL ? b.downloadURL.split("#")[0] : null,
                            f = b.fileURL ? b.fileURL.split("#")[0] : null,
                            c = v.select([f, a], function(b) {
                                if (!b ||
                                    "file:" !== A.parse(b).protocol) return b
                            })[0],
                            a = {
                                uuid: b.uuid,
                                name: b.name,
                                options: {},
                                durl: a,
                                furl: f,
                                url: c
                            },
                            k;
                        for (k in u.SYNCED) !0 === u.SYNCED[k] && null !== b.options[k] && (a.options[k] = b.options[k]);
                        return a
                    },
                    p = function() {
                        var a = [];
                        z.getUidList().forEach(function(f) {
                            f = z.getByUid(f);
                            f.script && f.cond && a.push(b(f.script))
                        });
                        return a
                    },
                    k = function(b) {
                        if (u.enabled)
                            if (0 < a) b && u.addSyncDoneCallback(function(a) {
                                a && u.sync(50, b)
                            });
                            else {
                                a++;
                                var c = null,
                                    k = null,
                                    t = !0,
                                    C = {},
                                    q = function(b) {
                                        if (b) {
                                            (b = b.split("#")[0]) && (b = b.toLowerCase());
                                            for (var a = 0; a < c.length; a++) {
                                                var f = c[a].furl ? c[a].furl.toLowerCase() : null,
                                                    k = c[a].durl ? c[a].durl.toLowerCase() : null;
                                                if (f == b || k == b) return c[a]
                                            }
                                        }
                                        return null
                                    },
                                    r = function(b) {
                                        if (b)
                                            for (var a = 0; a < k.length; a++)
                                                if (k[a].uuid == b) return k[a];
                                        return null
                                    },
                                    v = function(b) {
                                        if (b) {
                                            b = b.split("#")[0];
                                            for (var a = 0; a < k.length; a++)
                                                if (k[a].url == b) return k[a]
                                        }
                                        return null
                                    },
                                    y = function(b) {
                                        if (!b) return null;
                                        for (var a = 0; a < c.length; a++)
                                            if (c[a].uuid == b) return c[a]
                                    };
                                (function() {
                                    c = p();
                                    return I.list().done(function(b) {
                                        k = b
                                    }).fail(function() {
                                        l.warn("sync: unable to get remotelist!")
                                    })
                                })().then(function() {
                                    for (var b =
                                            n(), a = [], f = 0; f < k.length; f++) a.push(function() {
                                        var b, a = k[f],
                                            c = !1,
                                            p = !1,
                                            t = 2 == g.values.sync_version ? y(a.uuid) : q(a.url);
                                        if (t)
                                            if (c = !0, C[a.url] = !0, a.uuid && (C[a.uuid] = !0), a.content && H.MD5(a.content) != H.MD5(t.textContent)) p = !0;
                                            else
                                                for (b in u.SYNCED)
                                                    if (!0 === u.SYNCED[b] && t.options[b] != a.options[b]) {
                                                        p = !0;
                                                        break
                                                    }
                                        if (c)
                                            if (a.options.removed) l.debug("sync: remove local script", a.uuid, a.name, a.url), w.doRemove(t.uuid, !1);
                                            else if (p)
                                            if (l.debug("sync: update local script", a.uuid, a.name, a.url), p = z.getByUid(t.uuid), p.script &&
                                                p.cond) {
                                                for (b in u.SYNCED) !0 === u.SYNCED[b] && (p.script.options[b] = a.options[b]);
                                                a.content && (p.script.textContent = a.content);
                                                w.doModify(p.script.uuid, p.script, !1)
                                            } else l.warn(e.getMessage("fatal_error") + "(" + t.name + ")!!!");
                                        if (!c && !a.options.removed)
                                            if (b = n(), d[a.url] || a.uuid && d[a.uuid]) l.warn("sync: skip previously failed import", a);
                                            else return h(a).done(function(b) {
                                                b || (l.warn("sync: unable to import", a), d[a.url] = !0, a.uuid && (d[a.uuid] = !0))
                                            }).fail(function() {
                                                l.warn("sync: unable to load", a);
                                                d[a.url] = !0;
                                                a.uuid && (d[a.uuid] = !0)
                                            }).always(b.resolve), b.promise();
                                        return n.Pledge()
                                    }());
                                    n.when(a).done(function() {
                                        b.resolve()
                                    });
                                    return b.promise()
                                }).then(function() {
                                    c = p();
                                    return n.Pledge()
                                }).then(function() {
                                    if (!I.isWritable()) return n.Pledge();
                                    for (var b = n(), a = [], k = 0; k < c.length; k++) a.push(function() {
                                        var b = c[k],
                                            a = !1;
                                        if (!b.url || C[b.url] || C[b.uuid]) return n.Pledge();
                                        if (2 == g.values.sync_version ? r(b.uuid) : v(b.url)) a = !0;
                                        return a ? n.Pledge() : f(b).done(function(b) {})
                                    }());
                                    n.when(a).done(function() {
                                        b.resolve()
                                    });
                                    return b.promise()
                                }).fail(function() {
                                    t = !1
                                }).done(function() {
                                    t = !0
                                }).always(function() {
                                    l.debug("sync: finished");
                                    if (0 == --a)
                                        for (var b = t; m.length;) m.shift()(b)
                                })
                            }
                    },
                    t = function() {
                        u.enabled && u.sync(500, !0)
                    },
                    C = null,
                    u = {
                        enabled: !1,
                        SYNCED: {
                            comment: !0
                        },
                        createTeslaData: function() {
                            for (var b = n(), a = [], f = p(), c = 0; c < f.length; c++)
                                if (f[c].url) {
                                    var k = JSON.stringify(f[c].options),
                                        k = f[c].name.replace(/\|/g, "!") + "|" + k + "|" + f[c].url.replace(/\|/g, "%7C");
                                    a.push(k)
                                }
                            b.resolve(a);
                            return b.promise()
                        },
                        configChangeListener: function() {
                            C || (C = window.setTimeout(function() {
                                C =
                                    null;
                                u.init().done(function() {
                                    u.enabled && u.sync(3E3)
                                })
                            }, 3E3))
                        },
                        init: function() {
                            var b = n();
                            u.enabled = !1;
                            (function() {
                                return g.values.sync_enabled && g.values.sync_type ? I.init(g.values.sync_type, g.values.sync_version, g.values.sync_id).done(function(b) {
                                    u.enabled = b;
                                    u.enabled ? I.addChangeListener(t) : l.warn("sync: init failed!")
                                }) : n.Pledge()
                            })().always(function() {
                                b.resolve(u.enabled)
                            });
                            return b.promise()
                        },
                        finalize: function() {},
                        reset: function() {
                            return I.reset()
                        },
                        addSyncDoneCallback: function(b) {
                            m.push(b)
                        },
                        sync: function(b,
                            a) {
                            var f = Date.now();
                            b = b || 500;
                            a = c.force || a;
                            c.to ? (window.clearTimeout(c.to), c.ts < f + b && (b = c.ts - f, 1 > b && (b = 1))) : l.debug("sync: schedule sync for run in " + b + " ms");
                            c.force = a;
                            c.ts = f + b;
                            c.to = window.setTimeout(function() {
                                k(c.force);
                                c.to = null;
                                c.force = null
                            }, b)
                        },
                        scriptAddedCb: function(a, c) {
                            if (u.enabled && I.isWritable()) {
                                var k = b(c);
                                k.url && A.parse(k.url).protocol.match(/https?:/) && f(k)
                            }
                        },
                        scriptChangedCb: function(a, c, k) {
                            if (u.enabled && I.isWritable() && (a = b(c), a.url))
                                for (var d in u.SYNCED)
                                    if (!0 === u.SYNCED[d] && c.options[d] !=
                                        k.options[d]) {
                                        f(a);
                                        break
                                    }
                        },
                        scriptRemovedCb: function(a, f) {
                            if (u.enabled && I.isWritable()) {
                                var c = b(f);
                                c.url && (l.debug("sync: remove", c.name, c.url), I.remove(c))
                            }
                        }
                    };
                return u
            }();
        sycl = G;
        var Fa = function() {
                g.addChangeListener("sync_enabled", G.configChangeListener);
                g.addChangeListener("sync_type", G.configChangeListener);
                g.addChangeListener("sync_id", G.configChangeListener);
                g.addChangeListener("sync_version", G.configChangeListener);
                g.addChangeListener("logLevel", function() {
                    l.set(g.values.logLevel)
                });
                g.addChangeListener("i18n",
                    function() {
                        e.setLocale(g.values.i18n)
                    });
                g.addChangeListener("native_import_path", function() {
                    L.setPath(g.values.native_import_path)
                });
                g.addChangeListener("incognito_mode", function() {
                    va()
                });
                g.addChangeListener("statistics_enabled", function() {
                    K.setEnabled(g.values.statistics_enabled)
                });
                g.addChangeListener("require_blacklist", w.blackCheckAll);
                g.addChangeListener("script_blacklist_server", w.blackCheckAll);
                g.addChangeListener("script_blacklist_type", w.blackCheckAll);
                g.addChangeListener("downloads_extension_whitelist",
                    E.config_changed_listener);
                g.addChangeListener("downloads_mode", E.config_changed_listener);
                g.addChangeListener("webrequest_modHeaders", function(a, e, c, d) {
                    d.done(window.setTimeout(T.reset, 1))
                })
            },
            g = function() {
                var a = {},
                    e = {
                        enabled: !0,
                        configMode: 0,
                        debug: !1,
                        logLevel: 0,
                        showFixedSrc: !1,
                        webrequest_modHeaders: "yes",
                        webrequest_fixCSP: "yes",
                        notification_showUpdate: "changelog",
                        notification_silentScriptUpdate: !0,
                        script_templates: [{
                            name: "ECMAScript 5",
                            value: "// ==UserScript==\n"+
                            "// @name         NewUserscript\n"+
                            "// @namespace    http://tampermonkey.net/\n"+
                            "// @version      0.1\n"+
                            "// @description  try to take over the world!\n"+
                            "// @author       You\n"+
                            "// @match        <$URL$>\n"+
                            "// @grant        GM_addStyle\n"+
                            "// @grant        GM_download\n"+
                            "// ==/UserScript==\n"
                            // +
                            // "\n"+
                            // "(function() {\n"+
                            // "    'use strict';\n"+
                            // "\n"+
                            // "\n"+
                            // "})();"
                        }, {
                            name: "ECMAScript 6",
                            value: "// ==UserScript==\n// @name         New ES6-Userscript\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  shows how to use babel compiler\n// @author       You\n// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js\n// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js\n// @match        <$URL$>\n// ==/UserScript==\n\n/* jshint ignore:start */\nvar inline_src = (<><![CDATA[\n/* jshint ignore:end */\n/* jshint esnext: true */\n\n// Your code here...\n\n/* jshint ignore:start */\n]]\x3e</>).toString();\nvar c = babel.transform(inline_src);\neval(c.code);\n/* jshint ignore:end */"
                        }, {
                            name: "CoffeeScript",
                            value: "// ==UserScript==\n// @name         New Coffee-Userscript\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  shows how to use coffeescript compiler\n// @author       You\n// @require      http://coffeescript.org/extras/coffee-script.js\n// @match        <$URL$>\n// ==/UserScript==\n/* jshint ignore:start */\nvar inline_src = (<><![CDATA[\n\n// Your code here\n\n]]\x3e</>).toString();\nvar compiled = this.CoffeeScript.compile(inline_src);\neval(compiled);\n/* jshint ignore:end */"
                        }],
                        scriptUpdateCheckPeriod: 864E5,
                        scriptUpdateHideNotificationAfter: 15E3,
                        scriptUpdateCheckDisabled: !1,
                        scriptUrlDetection: "auto",
                        runtime_strict_mode: "byscript",
                        autoReload: !1,
                        appearance_badges: "running",
                        appearance_badge_color: "gcal" === rea.runtime.short_id ? "#444" : "#ee3131",
                        editor_enabled: !0,
                        editor_fontSize: 100,
                        editor_theme: "default",
                        editor_keyMap: "windows",
                        editor_indentUnit: 4,
                        editor_indentWithTabs: !1,
                        editor_tabMode: "indent",
                        editor_electricChars: !0,
                        editor_autoSave: !1,
                        editor_easySave: !0,
                        editor_autoLint: !0,
                        editor_autoLintMaxLen: 5E4,
                        editor_lineWrapping: !1,
                        editor_highlightTrailingWhitespace: !0,
                        native_import: !0,
                        native_import_path: null,
                        native_import_post_action: "disable",
                        i18n: null,
                        action_menu_columns: 2 <= q.ACTIONMENU.COLUMNS ? 2 : 1,
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
                        require_sri_mode: "supported",
                        script_blacklist_server: [],
                        script_blacklist_type: "server",
                        script_blacklist_severity: 4,
                        connect_mode: "ask",
                        page_filter_mode: "black",
                        page_whitelist: ["/https?:\\/\\/greasyfork\\.org\\/.*/", "http://xkcd.com/970/"],
                        forbiddenPages: "*example.org/* *paypal.tld/* *stripe.com/* https://*deutsche-bank-24.tld/* https://*bankofamerica.tld/* /^.*:\\/\\/apis\\.google\\.com\\/((?!render)([^\\/]+)\\/)+([^\\/]+)?$/ *://www.facebook.com/plugins/* *://platform.twitter.com/widgets/*".split(" ")
                    },
                    c = function(c, f) {
                        var b = r.getValue(q.CONSTANTS.STORAGE.CONFIG, {}),
                            d = void 0 === b[c] ? e[c] : b[c];
                        b[c] = f;
                        var k = r.setValue(q.CONSTANTS.STORAGE.CONFIG, b);
                        a[c] && JSON.stringify(d) != JSON.stringify(f) && a[c].forEach(function(b) {
                            try {
                                b(c, d, f, k)
                            } catch (a) {
                                l.warn("config: changeListener error", a)
                            }
                        })
                    },
                    d = {
                        init: function() {
                            var a = n();
                            d.values = {};
                            d.__defineGetter__("snapshot", function() {
                                return v.assign({}, d.values)
                            });
                            for (var f in e) e.hasOwnProperty(f) && function() {
                                var b = f;
                                d.values.__defineGetter__(b, function() {
                                    var a = r.getValue(q.CONSTANTS.STORAGE.CONFIG, {});
                                    return void 0 === a[b] ? e[b] : a[b]
                                });
                                d.values.__defineSetter__(b, function(a) {
                                    c(b, a)
                                })
                            }();
                            d.initialized = !0;
                            var b = Ea();
                            Object.keys(b).forEach(function(a) {
                                var f = b[a];
                                window.setTimeout(function() {
                                    w.doSave({
                                        url: null,
                                        src: f,
                                        ask: !1,
                                        replace: !0,
                                        internal: !0
                                    })
                                }, 1)
                            });
                            a.resolve();
                            return a.promise()
                        },
                        getDefaults: function() {
                            return e
                        },
                        addChangeListener: function(c, f) {
                            a[c] || (a[c] = []);
                            a[c].push(f)
                        }
                    };
                return d
            }(),
            S = function(a, e) {
                return ja(a, e, {
                    internal: !0
                })
            },
            ea = function() {
                var a = {},
                    e = function(b) {
                        var a = b.split(".");
                        if (3 >
                            a.length || A.isIp(b)) return b;
                        b = A.isSecondLevelDomain(a.slice(-2).join(".")) ? -3 : -2;
                        return a.slice(b).join(".")
                    },
                    c = function(b) {
                        return b && -1 != b.indexOf("*")
                    },
                    d = function() {
                        var b = n();
                        rea.tabs.getSelected(null, function(a) {
                            b.resolve(a)
                        });
                        return b.promise()
                    },
                    h = function(b) {
                        var a = n();
                        da.isAllowed(b) ? a.resolve({
                            allowed: !0
                        }) : a.resolve({
                            allowed: !1
                        });
                        return a.promise()
                    },
                    f = function(b, a) {
                        var f = function(b) {
                            return b ? b.map(function(b) {
                                if (b.match(/^'?self'?$/)) b = A.parse(a.url).hostname || null;
                                else if ("'none'" == b) b = "none";
                                else if (-1 === ["none", "localhost", "*"].indexOf(b) && (1 > b.indexOf(".") || 1 === (b.match(/\./g) || []).length && A.isSecondLevelDomain(b))) return null;
                                return b
                            }) : []
                        };
                        return {
                            connects: b.options.override.merge_connects && "paranoid" != g.values.connect_mode ? f(b.connects) : [],
                            userconnects: f(b.options.override.use_connects),
                            blockers: f(b.options.override.use_blockers)
                        }
                    },
                    b = function(b, f, k) {
                        var d = n(),
                            p = function() {
                                d.resolve({
                                    permitted: !0
                                })
                            },
                            t = function(b) {
                                d.resolve({
                                    permitted: !1,
                                    reason: b
                                })
                            },
                            h = function() {
                                d.resolve({
                                    unknown: !0
                                })
                            },
                            e, m = function(b, a) {
                                var f = null,
                                    c = A.isIp(b);
                                a.every(function(a) {
                                    if (a.a)
                                        for (var k = 0; k < a.a.length; k++)
                                            if (a.a[k] && (c ? a.a[k] === b : -1 != b.search(new RegExp("(^|.+\\.)" + v.escapeForRegExp(a.a[k]) + "$")))) return f = a.blocker ? t : p, !1;
                                    return !0
                                });
                                return f
                            };
                        if ("off" == g.values.connect_mode) p();
                        else if ((e = A.parse(k)) && e.hostname)
                            if ((k = m(e.hostname, [{
                                    a: a[b.uuid]
                                }])) || (k = c(a[b.uuid]) ? p : null)) k();
                            else if (0 === f.connects.length && 0 === f.userconnects.length && 0 === f.blockers.length) "casual" == g.values.connect_mode ? p() : "strict" ==
                            g.values.connect_mode ? t("No @connects given, but strict mode enabled") : h();
                        else if (-1 != f.connects.indexOf("none")) t("None value found");
                        else {
                            if ("casual" != g.values.connect_mode || c(f.blockers) || !(k = c(f.connects) ? p : null))(k = c(f.userconnects) ? p : null) || (k = m(e.hostname, [{
                                a: f.blockers,
                                blocker: !0
                            }, {
                                a: f.connects
                            }, {
                                a: f.userconnects
                            }]) || h);
                            k()
                        } else t("URL can not be parsed");
                        return d.promise()
                    },
                    p = function() {
                        var b = function(b) {
                                for (var a = 0; a < t.length; a++)
                                    if (t[a].tabId === b) return t.splice(a, 1)[0];
                                return t.pop()
                            },
                            a;
                        d().then(function(f) {
                            for (; !k && (a = b(f.id));) a.fn()
                        })
                    },
                    k, t = [],
                    C = function(b, f, h, g, u) {
                        var C, q = n(),
                            r = function() {
                                q.resolve({
                                    approved: !0
                                })
                            },
                            v = function() {
                                q.resolve({
                                    forbidden: !0
                                })
                            };
                        l.debug('cor: "' + b.name + '" is asking for permission to access', g, f);
                        if ((C = A.parse(g)) && C.hostname) {
                            var y = e(C.hostname),
                                z = f.tab ? f.tab.id : null;
                            k = !0;
                            d().then(function(a) {
                                return ba.askForConnect({
                                    src_url: f.url,
                                    hostname: C.hostname,
                                    domain: y,
                                    all_domains: c(h.connects),
                                    tabid: z,
                                    active: z === a.id,
                                    timeout: u,
                                    url: g,
                                    settings_url: rea.extension.getURL("options.html") +
                                        "#nav=" + b.uuid + "+settings",
                                    connect_url: "http://tampermonkey.net/documentation.php#_connect",
                                    script: {
                                        name: b.name,
                                        uuid: b.uuid,
                                        icon: b.icon64 || b.icon || rea.extension.getURL("images/txt.png")
                                    }
                                })
                            }).done(function(f) {
                                var c, k = f.whole_domain ? y : C.hostname;
                                f.allow ? f.once ? (l.debug('cor: allowing "' + b.name + '" to access', k, "once"), r()) : f.temporary ? (l.debug('cor: allowing "' + b.name + '" to access', k, "temporarily"), void 0 === a[b.uuid] && (a[b.uuid] = []), -1 == a[b.uuid].indexOf(k) && a[b.uuid].push(k), r()) : (c = r, f.all_domains ?
                                    (l.debug('cor: allowing "' + b.name + '" to access all domains always'), b.options.override.use_connects.push("*")) : (l.debug('cor: allowing "' + b.name + '" to access', k, "always"), b.options.override.use_connects.push(k), c = r)) : f.once || f.aborted ? (l.debug('cor: denying "' + b.name + '" to access', k, "once"), v()) : (b.options.override.use_blockers || (b.options.override.use_blockers = []), c = v, f.all_domains ? (l.debug('cor: denying "' + b.name + '" to access any domains (additional) domain'), b.options.override.use_blockers.push("*")) :
                                    (l.debug('cor: denying "' + b.name + '" to access', k, "always"), b.options.override.use_blockers.push(k)));
                                c && w.doModify(b.uuid, b, !1).always(c)
                            }).fail(v).always(function() {
                                k = !1;
                                t.length && window.setTimeout(p, 1)
                            })
                        } else v();
                        return q.promise()
                    },
                    u = function(a, d, p, e) {
                        var m = f(a, d),
                            q = arguments;
                        return h(p).then(function(f) {
                            if (!0 !== f.allowed) return n.Breach("URL is blacklisted");
                            var c, k;
                            return (c = A.parse(p)) && c.origin && (k = A.parse(d.url)) && k.origin && c.origin === k.origin ? n.Pledge({
                                permitted: !0
                            }) : b(a, m, p)
                        }).then(function(b) {
                            if (!1 ===
                                b.permitted) return n.Breach("URL is not permitted" + (b.reason ? ": " + b.reason : ""));
                            if (!0 === b.permitted) return n.Pledge();
                            if (0 === m.connects.length || c(m.connects)) {
                                if (-1 == ["ask", "paranoid"].indexOf(g.values.connect_mode)) return n.Breach();
                                if (c(m.blockers)) return n.Breach("URL was permanently blocked by the user");
                                if (k) {
                                    l.debug('cor: queuing access permission check from "' + a.name + '" to', p, d);
                                    var f = n();
                                    t.push({
                                        tabId: d.tab ? d.tab.id : null,
                                        fn: function() {
                                            f.consume(u.apply(this, q))
                                        }
                                    });
                                    return f.promise()
                                }
                                return C(a,
                                    d, m, p, e).then(function(b) {
                                    return !0 === b.approved ? n.Pledge() : n.Breach("Request was blocked by the user")
                                })
                            }
                            return n.Breach("URL is not a part of the @connect list")
                        })
                    };
                return {
                    getSessionConnects: function(b) {
                        return a[b] || []
                    },
                    setSessionConnects: function(b, f) {
                        a[b] = f || []
                    },
                    purgeAppeals: function(b) {
                        t = t.filter(function(a) {
                            return a.tabId !== b
                        })
                    },
                    exec: function(b, a, f, c) {
                        var k, d, p, t, h = b.url,
                            e = [],
                            m = Math.max(Math.min(b.timeout || 0, 6E4), 2E4),
                            g = function() {
                                for (var b; !p && !t && (b = e.shift());) b()
                            },
                            C = function(a, f) {
                                var k = 'Refused to connect to "' +
                                    (f || b.url) + '": ' + (a || "Blocked by @connect CORS check"),
                                    d = ma.makeErrorResponse(k);
                                ["onerror", "ondone"].forEach(function(b) {
                                    if (c[b]) c[b]({
                                        response: d,
                                        exception: k
                                    })
                                })
                            };
                        if (!(f && f.url && f.tab && b.url && a && (d = z.getByUid(a)) && d.script && d.cond)) return C();
                        u(d.script, f, b.url, m).done(function() {
                            var a = {};
                            Object.keys(c).forEach(function(b) {
                                a[b] = function(x) {
                                    var n = arguments;
                                    p || (t ? e.push(function() {
                                        a[b].apply(this, n)
                                    }) : function() {
                                        return x && x.finalUrl && h !== x.finalUrl ? (t = !0, u(d.script, f, x.finalUrl, m).fail(function() {
                                            p ||
                                                (k && k.abort(), p = !0, C("Request was redirected to a not whitelisted URL", x.finalUrl), l.warn("cor: request to", h, "was redirect to a not whitelisted URL", x.finalUrl))
                                        }).always(function() {
                                            h = x.finalUrl;
                                            t = !1;
                                            e.length && window.setTimeout(g, 1)
                                        })) : {
                                            always: function(b) {
                                                b()
                                            }
                                        }
                                    }().always(function() {
                                        if (!p) c[b]({
                                            response: x
                                        })
                                    }))
                                }
                            });
                            k = ja(b, a)
                        }).fail(function(b) {
                            C(b);
                            l.warn("cor: access to", h, "was denied")
                        });
                        return {
                            abort: function() {
                                p = !0;
                                k && k.abort()
                            }
                        }
                    }
                }
            }(),
            na = function() {
                var a = function(b) {
                        var a = [];
                        b = new DataView(b);
                        for (var f =
                                0; f < b.byteLength; f += 4) {
                            var c = ("00000000" + b.getUint32(f).toString(16)).slice(-8);
                            a.push(c)
                        }
                        return a.join("")
                    },
                    e = {
                        md5: function(b, a) {
                            return n.Pledge(H.MD5(b, a))
                        }
                    },
                    c = {};
                ["SHA-1", "SHA-256", "SHA-384", "SHA-512"].forEach(function(b) {
                    var f = b.toLowerCase().replace("-", "");
                    c[f] = function() {
                        var f = function(f, c) {
                            var k = n();
                            window.crypto.subtle.digest(b, H.str2arrbuf(f, c)).then(function(b) {
                                k.resolve(a(b))
                            }, function() {
                                k.reject()
                            });
                            return k.promise()
                        };
                        try {
                            return f("").then(function(b) {
                                if (b && b.substr(0, 4).toLowerCase().match(/[0-9a-f]{4,4}/)) return f
                            })
                        } catch (c) {
                            return n.Breach()
                        }
                    }
                });
                var d = function(b) {
                        return -1 != Object.keys(e).indexOf(b)
                    },
                    h = function(b) {
                        return function() {
                            if (!1 !== f) {
                                var a = arguments,
                                    c = n();
                                f.push(function() {
                                    c.consume(b.apply(this, a))
                                });
                                return c.promise()
                            }
                            return b.apply(this, arguments)
                        }
                    },
                    f = [];
                return {
                    init: function() {
                        l.D && Object.keys(e).forEach(function(b) {
                            l.debug("sri:", b, "is supported")
                        });
                        return n.sidebyside(Object.keys(c).map(function(b) {
                            return c[b]().done(function(a) {
                                l.debug("sri:", b, "is supported");
                                e[b] = a
                            }).fail(function() {
                                l.debug("sri:", b, "is unsupported")
                            })
                        })).always(function() {
                            f.forEach(function(b) {
                                b()
                            });
                            f = !1
                        })
                    },
                    isSupported: h(function(b) {
                        return n.Pledge(d(b))
                    }),
                    getHash: h(function(b, f) {
                        var c = n();
                        "string" === typeof b && (b = A.parse(b));
                        if (b && b.hash) {
                            for (var e, h, m = b.hash.replace(/^#/, "").split(/,|;/g), g = 0; g < m.length; g++)
                                if ((h = m[g].match(/([^=|:|-]+)[=|:|-](.+)/)) && 3 == h.length && d(h[1])) {
                                    e = h[2];
                                    if (!/^[0-9a-fA-F]+$/.exec(e)) {
                                        var l;
                                        var q = decodeURIComponent(e);
                                        try {
                                            l = a(H.str2arrbuf(H.Base64.decode(q)))
                                        } catch (F) {
                                            l = null
                                        }
                                        e = l || e
                                    }
                                    e = {
                                        type: h[1],
                                        value: e
                                    }
                                }
                            c.resolve(e || (f ? e : {
                                type: "unsupported",
                                value: ""
                            }))
                        } else c.resolve();
                        return c.promise()
                    }),
                    check: h(function(b, a, f) {
                        return a && b && d(b.type) ? e[b.type](a, f).then(function(a, f) {
                            return ((f = a === b.value) ? n.Pledge : n.Breach)(f || {
                                type: b.type,
                                value: a
                            })
                        }) : n.Breach()
                    })
                }
            }(),
            N = function() {
                var a = {
                        key: function(b, a) {
                            return q.CONSTANTS.PREFIX.EXTERNAL + v.select([b, a ? H.MD5(a) : null], function(b) {
                                return b
                            }).join(":")
                        },
                        list: function(b) {
                            var a = new RegExp("^" + b);
                            return v.select(r.listValues(), function(b) {
                                return -1 != b.search(a)
                            })
                        },
                        set: function(b, f, c) {
                            b = a.key(b, f);
                            var d = {};
                            v.each(c, function(b, a) {
                                "content" ==
                                a && (a = "base", b = H.encodeS(b));
                                d[a] = b
                            });
                            r.setValue(b, {
                                ts: Date.now(),
                                url: f,
                                resource: d
                            })
                        },
                        get: function(b, f) {
                            var c = a.key(b, f),
                                c = r.getValue(c),
                                d;
                            if (c && c.resource) {
                                var e = {};
                                v.each(c.resource, function(b, a) {
                                    "base" == a && (a = "content", b = H.decodeS(b));
                                    e[a] = b
                                });
                                d = {
                                    ts: c.ts,
                                    url: c.url,
                                    data: e
                                }
                            }
                            return d
                        },
                        clean: function(b, f) {
                            var c = a.key(b, f);
                            r.deleteValue(c)
                        },
                        cleanAll: function(b, f) {
                            var c, d = a.list(a.key(b));
                            if (f) {
                                var e = {};
                                v.each(f, function(f) {
                                    f = a.key(b, f);
                                    e[f] = !0
                                });
                                c = [];
                                v.each(d, function(b) {
                                    e[b] || c.push(b)
                                })
                            } else c = d;
                            c.forEach(function(b) {
                                r.deleteValue(b)
                            })
                        }
                    },
                    e = function(b, a) {
                        var f = n(),
                            c = {
                                method: "GET",
                                url: b,
                                retries: q.XMLHTTPREQUEST.RETRIES,
                                nocache: !1,
                                responseType: a.via_arraybuffer ? "arraybuffer" : void 0
                            },
                            d = function(c) {
                                var d = {
                                    content: ""
                                };
                                if (4 != c.readyState || 200 != c.status && 0 != c.status || c.error) f.reject(d);
                                else {
                                    for (var e, h = c.responseHeaders ? c.responseHeaders.split("\n") : [], t = 0; t < h.length; t++) {
                                        var m = h[t].split(":"),
                                            g = m.shift() || "",
                                            m = m.join(":") || "";
                                        if ("content-type" == g.trim().toLowerCase() && -1 != m.search("image")) {
                                            e =
                                                m.trim();
                                            break
                                        }
                                    }
                                    if (!e) {
                                        var n;
                                        b.match(".*.(ico|jpg|jpeg)+($|\\?|#).*") ? e = "image/x-icon" : (n = b.match(".*.(gif|png)+($|\\?|#).*")) ? e = "image/" + n[1] : -1 != b.search(".js") ? e = "text/javascript" : (n = b.match(".*.(css|html|xml)+($|\\?|#).*")) ? e = "text/" + n[1] : v.isLocalImage(b) && (e = "image/x-icon")
                                    }
                                    d.meta = e;
                                    d.content = a.via_arraybuffer ? H.arrbuf2str(c.response, a.encoding) : c.responseText;
                                    f.resolve(d)
                                }
                            },
                            e = function() {
                                f.reject({})
                            };
                        a.sync ? d(S(c, {})) : (c.timeout = g.values.require_timeout, S(c, {
                            onload: d,
                            onerror: e,
                            ontimeout: e
                        }));
                        return f.promise()
                    },
                    c = v.getDebouncer(9E3),
                    d = function(b, f, c) {
                        c.no_storage = !0;
                        h(b, f, c).done(function(c) {
                            a.set(b, f, c.resource)
                        }).fail(function(a) {
                            l.warn("externals: update.failed :(", b, f, a)
                        }).always(function() {
                            var c = a.get(b, f);
                            c && c.data ? a.set(b, f, c.data) : l.warn("externals: should never happen!")
                        })
                    },
                    h = function(b, f, k) {
                        var h = n(),
                            C = A.parse(f),
                            u = {
                                sync: k.sync
                            },
                            x;
                        na.getHash(C, "supported" == g.values.require_sri_mode).done(function(n) {
                            if (f)
                                if (Q.getEvilnessOf(f) >= g.values.script_blacklist_severity) u.resource = {
                                    blacklisted: !0,
                                    content: ""
                                }, h.reject(u);
                                else if ("enforce" != g.values.require_sri_mode || n)
                                if (!k.no_storage && "file:" !== C.protocol && (x = a.get(b, f))) {
                                    var O = a.key(b, f),
                                        r = Date.now();
                                    0 < g.values.external_update_interval && r - x.ts > g.values.external_update_interval && !c.is(O) && (1 < g.values.external_update_interval && c.add(O), l.debug("externals: resource needs update", f, (new Date(x.ts)).toISOString(), (new Date(r)).toISOString()), window.setTimeout(function() {
                                        d(b, f, k)
                                    }, 3E3));
                                    u.resource = x.data;
                                    u.resource.forbidden || u.resource.blacklisted ?
                                        h.reject(u) : h.resolve(u)
                                } else u.sync = !1, "file:" == C.protocol && -1 == f.search(q.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) ? (q.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || l.warn("externals: Access to local files is forbidden! Loading the following @resource may fail:", f, "-> more info:", "http://tampermonkey.net/faq.php#Q204"), O = ua.getSource({
                                    url: f,
                                    encoding: k.encoding
                                })) : O = e(f, {
                                    via_arraybuffer: k.via_arraybuffer,
                                    encoding: k.encoding
                                }), O.done(function(c) {
                                    n && (c.sri = n);
                                    var d = function(c) {
                                        !k.no_storage && C.protocol && "file:" !==
                                            C.protocol && -1 == f.search(q.REQUESTS.GET_INTERNAL_PATH_REGEXP(!0)) && a.set(b, f, c)
                                    };
                                    n && -1 != ["supported", "given"].indexOf(g.values.require_sri_mode) ? na.check(n, c.content, k.encoding).done(function() {
                                        u.resource = c;
                                        d(u.resource);
                                        h.resolve(u)
                                    }).fail(function(b) {
                                        u.resource = {
                                            forbidden: !0,
                                            sri: {
                                                mode: g.values.require_sri_mode,
                                                type: n.type,
                                                value: "invalid"
                                            },
                                            determined: b,
                                            content: ""
                                        };
                                        d(u.resource);
                                        h.reject(u)
                                    }) : (u.resource = c, d(u.resource), h.resolve(u))
                                }).fail(function(a) {
                                    l.debug("externals: get.failed", b, f, a);
                                    u.resource = {
                                        failed: !0,
                                        content: ""
                                    };
                                    h.reject(u)
                                });
                            else u.resource = {
                                forbidden: !0,
                                sri: {
                                    mode: g.values.require_sri_mode
                                },
                                content: ""
                            }, h.reject(u);
                            else u.resource = {
                                forbidden: !0,
                                content: ""
                            }, h.reject(u)
                        });
                        return h.promise()
                    },
                    f = {
                        getElement: function(b, f) {
                            return a.get(b, f)
                        },
                        cleanElement: function(b, f) {
                            return a.clean(b, f)
                        },
                        dropAll: function(b) {
                            a.cleanAll(b);
                            return n.Pledge()
                        },
                        dropAllBut: function(b, f) {
                            a.cleanAll(b, f);
                            return n.Pledge()
                        },
                        loadResources: function(b, a) {
                            var c = n();
                            f.getResources(b, a).always(function() {
                                c.resolve()
                            });
                            return c.promise()
                        },
                        loadRequires: function(b, a) {
                            var c = n();
                            f.getRequires(b, a).always(function() {
                                c.resolve()
                            });
                            return c.promise()
                        },
                        getResources: function(b, a) {
                            var f = {
                                    elements: []
                                },
                                c = n(),
                                d = [],
                                e = {
                                    via_arraybuffer: !0,
                                    sync: !0
                                };
                            a.forEach(function(a) {
                                var c = a.url || A.sanitize(a.unsafe_url, a.abs_url),
                                    p = {
                                        name: a.name,
                                        url: c
                                    },
                                    c = h(b, c, e),
                                    m = n();
                                c.done(function(b) {
                                    b = b.resource;
                                    p.content = b.content;
                                    p.meta = b.meta || "application"
                                }).fail(function(b) {
                                    b.resource && b.resource.forbidden ? b.resource.sri ? l.warn("externals: can't load @resource",
                                        a.name, "from URL", a.unsafe_url, "due to a SRI error") : l.warn("externals: can't load @resource", a.name, "from forbidden URL", a.unsafe_url) : b.resource && b.resource.blacklisted ? l.warn("externals: can't load @resource", a.name, "from blacklisted URL", a.unsafe_url) : (l.warn("externals: can't load @resource", a.name, "from URL", a.unsafe_url), p.failed = !0);
                                    p.content = null
                                }).always(function(b) {
                                    e.sync &= b.sync;
                                    f.elements.push(p);
                                    m.resolve()
                                });
                                d.push(m)
                            });
                            n.when(d).always(function() {
                                f.sync = e.sync;
                                c.resolve(f)
                            });
                            return c.promise()
                        },
                        getRequires: function(b, a) {
                            var f = {
                                    elements: []
                                },
                                c = n(),
                                d = [],
                                e = {
                                    encoding: "UTF-8",
                                    sync: !0
                                };
                            v.each(a, function(a, c) {
                                var p = a.url || A.sanitize(a.unsafe_url, a.abs_url),
                                    m = {},
                                    p = h(b, p, e),
                                    t = n();
                                p.done(function(b) {
                                    m.textContent = b.resource.content || ""
                                }).fail(function(b) {
                                    b.resource && b.resource.forbidden ? b.resource.sri ? (m.textContent = "// this @require's (\"" + encodeURIComponent(a.unsafe_url) + '") SRI check failed!\n', l.warn("externals: can't load @require from URL", a.unsafe_url, "due to a SRI error")) : (m.textContent = '// this @require ("' +
                                        encodeURIComponent(a.unsafe_url) + '") is not allowed!\n', l.warn("externals: can't load @require from forbidden URL", a.unsafe_url)) : b.resource && b.resource.blacklisted ? (m.textContent = '// this @require ("' + encodeURIComponent(a.unsafe_url) + '") is blacklisted!\n', l.warn("externals: can't load @require from blacklisted URL", a.unsafe_url)) : (m.textContent = '// this @require ("' + encodeURIComponent(a.unsafe_url) + '") could not be loaded!\n', l.warn("externals: can't load @require from URL", a.unsafe_url))
                                }).always(function(b) {
                                    e.sync &=
                                        b.sync;
                                    f.elements[c] = m;
                                    t.resolve()
                                });
                                d.push(t)
                            });
                            n.when(d).always(function() {
                                f.sync = e.sync;
                                f.elements = f.elements.filter(function(b) {
                                    return b
                                });
                                c.resolve(f)
                            });
                            return c.promise()
                        }
                    };
                return f
            }();
        exts = N;
        var ta = function() {
                var a = function(a, d, e) {
                        var f = n(),
                            b = [];
                        e.forEach(function(f) {
                            f = f.textContent || "";
                            f = ka.mkCompat(f, a.options.compatopts_for_requires ? a : null, "off" != g.values.runtime_strict_mode);
                            b.push(f)
                        });
                        e = "\n" + b.join("\n") + "\n";
                        var p = z.getStorageByUid(a.uuid);
                        d = ka.mkCompat(d, a, "off" != g.values.runtime_strict_mode);
                        if (g.values.debug) {
                            d = d.split("\n");
                            for (var k = !1, m, l = 0; l < d.length; l++)
                                if (m = d[l], !m.match(/^\s*$|^\s*\/\/\s*|^\s*\/\*.*\*\/\s*$|^\s*["']+use strict["']+;*\s*$/))
                                    if (m.match(/^\s*\/\*/) && (k = !0), k)
                                        if (m.match(/\*\/\s*$/)) k = !1;
                                        else {
                                            if (-1 != (m = m.search(/\*\//))) {
                                                d[l] = v.insert(d[l], m + 2, 0, "debugger;");
                                                break
                                            }
                                        } else {
                                d[l] = "debugger;" + d[l];
                                break
                            }
                            d = d.join("\n")
                        }
                        f.resolve({
                            header: a.header,
                            code: d,
                            requires: e,
                            storage: p,
                            script: a
                        });
                        return f.promise()
                    },
                    e = {};
                return {
                    bundle: function(c, d) {
                        var h, f, b = !0;
                        if (h = e[d.uuid]) return h;
                        var p = {},
                            k = "includes matches requires resources excludes connects textContent".split(" ");
                        Object.keys(d).forEach(function(b) {
                            -1 == k.indexOf(b) && ("options" == b ? (p[b] = JSON.parse(JSON.stringify(d[b])), p[b].run_at = p[b].run_at || d.options.override.orig_run_at || "document-idle") : p[b] = d[b])
                        });
                        h = N.getResources(p.uuid, d.resources).then(function(a) {
                            b && !a.sync && (l.debug("ri: uncached @external detected -> fast script start disabled"), b = a.sync);
                            p.resources = a.elements;
                            return N.getRequires(p.uuid, d.requires)
                        }).then(function(f) {
                            b &&
                                !f.sync && (l.debug("ri: uncached @external detected -> fast script start disabled"), b = f.sync);
                            f = f.elements;
                            l.debug("run script " + p.name + " @ " + c.url);
                            return a(p, d.textContent, f)
                        }).always(function() {
                            f = !0;
                            delete e[p.uuid]
                        });
                        f || (e[p.uuid] = h);
                        return h
                    }
                }
            }(),
            wa = function() {
                var a = rea.extension.getViews({
                    type: "popup"
                });
                a && a.length && rea.extension.sendMessage({
                    method: "updateActions"
                }, function() {})
            },
            W = function() {
                return {
                    getConfig: function() {
                        var a = {
                                version: 0,
                                last: 0
                            },
                            e = {
                                scripts: 0
                            },
                            c = r.getValue(q.CONSTANTS.STORAGE.UPDATE,
                                e);
                        "object" !== typeof c && (c = e);
                        c || (c = e);
                        void 0 == c.black && (c.black = a);
                        void 0 == c.scripts && (c.scripts = 0);
                        return c
                    },
                    setConfig: function(a) {
                        a && r.setValue(q.CONSTANTS.STORAGE.UPDATE, a)
                    }
                }
            }(),
            X = function() {
                var a = function(a, h) {
                        var f = 0,
                            b = 0;
                        if (a) {
                            var p = e.getMessage("Script_Update"),
                                k = e.getMessage("Check_for_userscripts_updates") + "...";
                            P.show(p, k, rea.extension.getURL("images/icon128.png"), 1E4)
                        }
                        p = z.getUidList().map(function(a) {
                            var d, k, p, m, r, F;
                            l.info("update: check for script updates @", a);
                            return function() {
                                m = z.getByUid(a);
                                if (!m.script || !m.cond) return l.warn("update: inconsistent script entry", a, m), n.Breach();
                                var b = !g.values.scriptUpdateCheckDisabled && !m.script.enabled && !h;
                                return h && m.script.uuid !== h || b || !(F = w.determineSourceURL(m.script)) ? n.Breach() : n.Pledge()
                            }().then(function() {
                                var b = w.determineMetaURL(m.script);
                                if (!b) return n.Pledge();
                                var a = n();
                                ja({
                                    method: "GET",
                                    retries: q.XMLHTTPREQUEST.RETRIES,
                                    timeout: 1E3 * q.SCRIPT_DOWNLOAD.TIMEOUT,
                                    nocache: !0,
                                    headers: {
                                        Accept: "text/x-userscript-meta, */*"
                                    },
                                    url: b
                                }, {
                                    ondone: function(f) {
                                        4 ==
                                            f.readyState && 200 == f.status ? r = y.processMetaHeader(f.responseText) : l.warn("update: unable to find meta data @ " + b + " req.status = " + f.status);
                                        a.resolve()
                                    }
                                });
                                return a.promise()
                            }).then(function() {
                                var b = !!r,
                                    a = b && !!r.version,
                                    f = a && (!m.script.version || y.versionCmp(r.version, m.script.version) == y.versionCmp.eNEWER);
                                return b && a && !f ? n.Breach() : n.Pledge()
                            }).then(function() {
                                return c.getScriptFromURL(F).fail(function() {
                                    l.warn("update: failed", m.script.name, F)
                                })
                            }).then(function(b) {
                                var a;
                                var c = m.script.uuid;
                                a = y.createScriptFromSrc(b);
                                a = a.name && "" != a.name && void 0 !== a.version ? (c = z.getMetaByUid(c)) && c.system ? null : a.options.compat_uW_gmonkey ? y.versionCmp.eERROR : -1 != a.name.search("@") ? y.versionCmp.eERROR : c && a.version == c.version ? y.versionCmp.eEQUAL : c && y.versionCmp(a.version, c.version) == y.versionCmp.eOLDER ? y.versionCmp.eOLDER : y.versionCmp.eNEWER : y.versionCmp.eERROR;
                                return a == y.versionCmp.eNEWER ? (f++, d = m.script.name, k = F, p = b, n.Pledge()) : n.Breach()
                            }).then(function() {
                                if (g.values.notification_silentScriptUpdate) return n.Pledge();
                                var b = e.getMessage("There_is_an_update_for_0name0_avaiable_",
                                        d) + "\n" + e.getMessage("Click_here_to_install_it_"),
                                    a = e.getMessage("Just_another_service_provided_by_your_friendly_script_updater_") + ":",
                                    f = n();
                                P.show(a, b, rea.extension.getURL("images/icon128.png"), g.values.scriptUpdateHideNotificationAfter, f.resolve);
                                return f.promise()
                            }).then(function(f) {
                                var c = a || m.script.uuid;
                                return void 0 === f || f.clicked ? w.doSave({
                                    url: k,
                                    uuid: c,
                                    replace: !c,
                                    src: p,
                                    ask: !g.values.notification_silentScriptUpdate
                                }).done(function(a) {
                                    a && a.installed && b++
                                }) : n.Breach()
                            })
                        });
                        return n.sidebyside(p).then(function() {
                            0 ==
                                f && a && (l.debug("No update found"), P.show("Narf!", e.getMessage("No_update_found__sry_"), rea.extension.getURL("images/icon128.png"), 1E4));
                            return {
                                found: f,
                                installed: b
                            }
                        })
                    },
                    m = null,
                    c = {
                        check: function(c, h, f) {
                            if (!c && 0 >= g.values.scriptUpdateCheckPeriod) return n.Breach();
                            var b = W.getConfig();
                            if (!c && Date.now() - b.scripts < Math.max(g.values.scriptUpdateCheckPeriod, 36E5)) return n.Breach();
                            var p = n();
                            c = function() {
                                k && (window.clearTimeout(k), k = null);
                                m && m.cancel();
                                a(h, f).done(function(b) {
                                    p.resolve(b.installed)
                                }).fail(function() {
                                    p.resolve(null)
                                });
                                b = W.getConfig();
                                b.scripts = Date.now();
                                W.setConfig(b)
                            };
                            var k, m, l = function() {
                                m = null;
                                var b = e.getMessage("Script_Update"),
                                    a = e.getMessage("Waiting_for_sync_to_finish") + "...";
                                m = P.show(b, a, rea.extension.getURL("images/icon128.png"), 6E4)
                            };
                            G.enabled ? (G.addSyncDoneCallback(c), G.sync(50, !1), h && (k = window.setTimeout(l, 500))) : c();
                            return p.promise()
                        },
                        getScriptFromURL: function(a) {
                            var c = n();
                            S({
                                method: "GET",
                                retries: q.XMLHTTPREQUEST.RETRIES,
                                timeout: 1E3 * q.SCRIPT_DOWNLOAD.TIMEOUT,
                                nocache: !0,
                                headers: {
                                    Accept: "text/x-userscript, */*"
                                },
                                url: a
                            }, {
                                onload: function(a) {
                                    4 != a.readyState || 200 != a.status && 0 != a.status || a.error ? c.reject() : c.resolve(a.responseText)
                                },
                                onerror: function(a) {
                                    c.reject({
                                        error: !0,
                                        responseText: a.responseText
                                    })
                                },
                                ontimeout: function() {
                                    c.reject({
                                        timeout: !0,
                                        responseText: ""
                                    })
                                }
                            });
                            return c.promise()
                        },
                        init: function() {
                            var a = function() {
                                m && (window.clearTimeout(m), m = null);
                                0 < g.values.scriptUpdateCheckPeriod && (m = window.setTimeout(function() {
                                    m = null;
                                    c.check();
                                    a()
                                }, 36E5))
                            };
                            a();
                            g.addChangeListener("scriptUpdateCheckPeriod", a)
                        }
                    };
                return c
            }();
        trup = X;
        var w = function() {
                var a = function(a) {
                        a.sort(function(b, a) {
                            return b.position - a.position
                        });
                        return a
                    },
                    m = function(a) {
                        void 0 === a.ask && (a.ask = !0);
                        if (void 0 === a.url || null == a.url) a.url = "";
                        "" === a.force_url && (a.force_url = null);
                        var b = y.createScriptFromSrc(a.src),
                            c = null,
                            d = {
                                heading: null,
                                errors: [],
                                info: [],
                                warnings: [],
                                flags: {}
                            },
                            m = n(),
                            C = Date.now(),
                            u = a.save && !a.ask && g.values.editor_easySave,
                            x = a.uuid,
                            q;
                        b.name && void 0 != b.version ? q = n.Pledge() : (d.errors.push(e.getMessage("Invalid_UserScript__Sry_") + "\n\n"), a.name &&
                            d.errors.push(e.getMessage("Script_name_0name0", a.name) + "\n\n"), a.url && d.errors.push(e.getMessage("Downloaded_from_0url0", a.url)), l.warn("scriptman: invalid userscript", d, b), q = n.Breach());
                        q.then(function() {
                            a.replace && !x && (x = z.getUidsByName(b.name, b.namespace)[0]);
                            if (x) c = z.getMetaByUid(x);
                            else if (b.uuid) x = b.uuid;
                            else if (a.replace) x = v.createUUID();
                            else return l.warn("scriptman: neither UUID, @uuid nor replace option set"), n.Breach();
                            if ("" !== x.replace(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/,
                                    "")) return l.warn("scriptman: invalid UUID", x), n.Breach();
                            if (!a.clean && !a.defaultscript && c && c.system) return n.Breach()
                        }).then(function() {
                            if (a.clean && a.name && a.name != b.name || -1 != b.name.search("\n")) return d.errors.push(e.getMessage("Invalid_UserScript_name__Sry_")), n.Breach()
                        }).then(function() {
                            if (b.options.compat_uW_gmonkey) return d.errors.push(e.getMessage("This_script_uses_uW_gm_api_")), n.Breach()
                        }).then(function() {
                            if (c) {
                                c.name != b.name && (d.flags.renamed = !0);
                                if (c.lastModified && void 0 !== a.lastModified &&
                                    c.lastModified !== a.lastModified) {
                                    var h = e.getMessage("some_secs");
                                    try {
                                        var m = Math.max(1, Math.floor((C - c.lastModified) / 1E3));
                                        isNaN(m) || (h = m)
                                    } catch (t) {}
                                    d.warnings.push(e.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_", h));
                                    d.flags.forceAsk = !0
                                }
                                b.version == c.version && (a.save ? d.flags.modification = !0 : d.flags.reset = !0);
                                a.clean && (d.flags.factory = !0)
                            } else d.flags.first_install = !0;
                            if (!(b.includes.length || b.matches.length || u || a.internal)) return d.errors.push(e.getMessage("This_script_does_not_provide_any__include_information_")),
                                n.Breach();
                            d.flags.sync = !!a.sync;
                            d.flags.internal = a.internal;
                            d.flags.ask = a.ask
                        }).then(function() {
                            b.uuid = x;
                            b.system = a.defaultscript;
                            b.evilness = w.getEvilness(b);
                            b.position = w.determineLastPosition() + 1;
                            b.lastUpdated = a.force_meta && a.force_meta.lastUpdated || C;
                            d.flags.factory || d.flags.reset ? c && (b.lastUpdated = c.lastUpdated) : (a.force_url && (b.updateURL = null, b.downloadURL = a.force_url), c && (b.options.override = c.options.override, b.options.comment = c.options.comment));
                            ["includes", "excludes", "matches", "connects"].forEach(function(a) {
                                b.options.override["orig_" +
                                    a] = b[a]
                            });
                            b.options.override.orig_noframes = b.options.noframes;
                            b.options.override.orig_run_at = b.options.run_at || "document-idle";
                            b.options.noframes = null;
                            b.options.run_at = null
                        }).then(function() {
                            if (c && (b.fileURL = c.fileURL, b.position = c.position, c.sync && (b.sync = c.sync), !d.flags.factory && !d.flags.reset)) {
                                b.enabled = c.enabled;
                                b.options.noframes = c.options.noframes;
                                b.options.run_at = c.options.run_at;
                                b.options.awareOfChrome || (b.options.compat_forvarin = c.options.compat_forvarin);
                                a.save && !a.force_url && (b.downloadURL =
                                    c.downloadURL || b.downloadURL);
                                var m = h.determineMetaURL(c),
                                    t = h.determineMetaURL(b),
                                    m = m ? A.woHash(m) : m,
                                    t = t ? A.woHash(t) : t;
                                m == t || u || a.internal || d.warnings.push(e.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0", [m, t]))
                            }
                        }).then(function() {
                            if (c && !d.flags.factory && b.version == c.version && (a.defaultscript || a.noreinstall)) return n.Breach()
                        }).then(function() {
                            c ? (d.flags.factory || d.flags.reset ? (d.flags.reset ? (d.heading = e.getMessage("You_are_about_to_reinstall_a_UserScript_"), d.flags.reinstall = !0) : (d.heading = e.getMessage("You_are_about_to_install_a_UserScript_"), d.flags.install = !0), a.internal || d.warnings.splice(0, 0, e.getMessage("All_script_settings_will_be_reset_"))) : d.flags.modification ? d.heading = e.getMessage("You_are_about_to_modify_a_UserScript_") : y.versionCmp(b.version, c.version) == y.versionCmp.eOLDER ? (d.heading = e.getMessage("You_are_about_to_downgrade_a_UserScript"), d.flags.downgrade = !0, u || a.internal || d.warnings.splice(0, 0, e.getMessage("The_downgraded_script_might_have_problems_to_read_its_stored_data_"))) :
                                (d.heading = e.getMessage("You_are_about_to_update_a_UserScript_"), d.flags.update = !0), d.info.push({
                                    label: e.getMessage("Installed_Version_"),
                                    value: "v" + c.version
                                })) : (d.heading = e.getMessage("You_are_about_to_install_a_UserScript_"), u || a.internal || (d.info.splice(0, 0, e.getMessage("Malicious_scripts_can_violate_your_privacy_")), Q.getWarningsFor(h.determineSourceURL(b)).forEach(function(a) {
                                d.warnings.splice(0, 0, a)
                            })), d.flags.install = !0);
                            d.flags.install ? d.action = e.getMessage("Install") : d.flags.reinstall ? d.action =
                                e.getMessage("Reinstall") : d.flags.modification ? d.action = e.getMessage("Modify") : d.flags.downgrade ? d.action = e.getMessage("Downgrade") : d.flags.update && (d.action = e.getMessage("Update"))
                        }).then(function() {
                            a.url && (b.fileURL = a.url);
                            a.sync && (b.sync = a.sync);
                            a.force_options && v.copy(a.force_options, b.options, (new y.Script).options, !0);
                            a.force_settings && v.copy(a.force_settings, b, ["enabled", "position"]);
                            b = w.mergeCludes(b)
                        }).then(function() {
                            var a = !1,
                                f;
                            for (f in b.options)
                                if (-1 != f.search("compat_") && !0 === b.options[f]) {
                                    a = !0;
                                    break
                                }
                            a && d.info.push({
                                label: e.getMessage("Note"),
                                value: e.getMessage("A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")
                            })
                        }).then(function() {
                            ["requires", "resources"].forEach(function(a) {
                                b[a] = v.map(b[a], function(a) {
                                    a.unsafe_url = a.url;
                                    a.abs_url = b.fileURL ? b.fileURL.split("/").slice(0, -1).join("/") : null;
                                    a.url = null;
                                    return a
                                })
                            })
                        }).done(function() {
                            m.resolve({
                                script: b,
                                messages: d,
                                short_info: [{
                                    label: e.getMessage("Author"),
                                    prop: "author"
                                }, {
                                    label: e.getMessage("Description"),
                                    prop: "description"
                                }, {
                                    label: e.getMessage("Source"),
                                    prop: "fileURL"
                                }]
                            })
                        }).fail(function() {
                            m.reject({
                                messages: d
                            })
                        });
                        return m.promise()
                    },
                    c = function(a) {
                        var b = n(),
                            c = a.messages,
                            d = a.script,
                            e = !c.flags.internal,
                            m = function() {
                                var a = h.doModify(d.uuid, d, e) || {};
                                c.flags.modification || N.dropAll(d.uuid);
                                (c.flags.first_install || c.flags.factory) && z.setStorageByUid(d.uuid, {
                                    ts: Date.now()
                                });
                                return a
                            },
                            g = {
                                lastModified: void 0,
                                installed: !0,
                                renamed: c.flags.renamed
                            };
                        c.warnings.length || c.flags.ask ? ba.install(a).done(function(a) {
                            a.ok &&
                                m();
                            g.installed = a.ok;
                            g.aborted = a.aborted;
                            b.resolve(g)
                        }).fail(function(a) {
                            b.reject(a)
                        }) : (m(), b.resolve(g));
                        return b.promise()
                    },
                    d = v.getDebouncer(1E3),
                    h = {
                        determineSourceURL: function(a) {
                            return a ? v.select([a.downloadURL, a.fileURL], function(a) {
                                if (!a || "file:" !== A.parse(a).protocol) return a
                            })[0] : null
                        },
                        determineMetaURL: function(a) {
                            if (!a) return null;
                            var b, c = w.determineOrigin(a);
                            c && c.meta_header ? b = a.fileURL : !a.fileURL || c && !c.meta_url || (b = a.fileURL.replace(".user.js", ".meta.js"), a.fileURL == b && (b = a.fileURL.replace(".tamper.js",
                                ".meta.js")), a.fileURL == b && (b = null));
                            return v.select([a.updateURL, a.downloadURL, b], function(a) {
                                if (!a || "file:" !== A.parse(a).protocol) return a
                            })[0]
                        },
                        mergeCludes: function(a) {
                            var b, c, d = a.options.override;
                            ["includes", "excludes", "matches"].forEach(function(b) {
                                a[b] = d["merge_" + b] && d["orig_" + b] ? d["orig_" + b].slice() : []
                            });
                            if (d.use_includes)
                                for (b = 0; b < d.use_includes.length; b++) c = a.excludes.indexOf(d.use_includes[b]), 0 <= c && a.excludes.splice(c, 1), a.includes.push(d.use_includes[b]);
                            if (d.use_matches)
                                for (b = 0; b < d.use_matches.length; b++) c =
                                    a.excludes.indexOf(d.use_matches[b]), 0 <= c && a.excludes.splice(c, 1), a.matches.push(d.use_matches[b]);
                            if (d.use_excludes)
                                for (b = 0; b < d.use_excludes.length; b++) a.excludes.push(d.use_excludes[b]);
                            return a
                        },
                        doSave: function(a) {
                            return m(a).then(c)
                        },
                        doRemove: function(a, b) {
                            z.removeByUid(a, b);
                            z.setStorageByUid(a, null);
                            N.dropAll(a);
                            return n.Pledge()
                        },
                        doModify: function(a, b, c) {
                            void 0 === c && (c = !0);
                            z.setByUid(a, b, c);
                            return c ? N.loadResources(a, b.resources).then(function() {
                                return N.loadRequires(a, b.requires)
                            }).then(function() {
                                var c = [].concat(b.resources).concat(b.requires).map(function(a) {
                                    return A.sanitize(a.unsafe_url, a.abs_url)
                                });
                                return N.dropAllBut(a, c)
                            }) : n.Pledge()
                        },
                        exportToJson: function(a, b) {
                            var c = n(),
                                d = w.determineScriptsToRun(null);
                            a && (d = v.select(d, function(b) {
                                return a[b.uuid]
                            }));
                            d = oa(d, !0);
                            b && !b.storage || d.forEach(function(a) {
                                a.storage = z.getStorageByUid(a.uuid)
                            });
                            d = {
                                scripts: d
                            };
                            if (!b || b.global_settings) d.global_settings = r.getValue(q.CONSTANTS.STORAGE.CONFIG, {});
                            c.resolve(d);
                            return c.promise()
                        },
                        importFromJson: function(a) {
                            if (!a ||
                                !a.scripts || !a.scripts.length) return n.Breach();
                            for (var b = {}, d = [], e = {}, h = 0, g; g = a.scripts[h]; h++) try {
                                var u = n();
                                "new-user-script" != g.uuid && (g.storage && (e[g.uuid] = g.storage), m({
                                        uuid: g.uuid,
                                        name: g.name,
                                        src: g.source,
                                        force_settings: {
                                            enabled: g.enabled,
                                            position: g.position
                                        },
                                        force_options: g.options,
                                        force_meta: {
                                            lastUpdated: g.lastModified
                                        },
                                        replace: !0,
                                        url: g.file_url || g.update_url,
                                        ask: !1
                                    }).done(function(a) {
                                        b[v.createUUID()] = a;
                                        u.resolve()
                                    }).fail(function(a) {
                                        l.warn("import: Error @ script", g.name, a);
                                        u.resolve()
                                    }),
                                    d.push(u.promise()))
                            } catch (ca) {
                                l.warn("import: Error while importing script", g.name, ca)
                            }
                            var x = function() {
                                var a = n();
                                n.when(d).always(function() {
                                    a.resolve()
                                });
                                return a.promise()
                            }().then(function() {
                                return ba.import(b, a.global_settings)
                            }).then(function(a) {
                                var f = n(),
                                    d = [],
                                    h = [];
                                if (a.ok)
                                    for (var m = 0, p; p = a.import_ids[m]; m++)(function() {
                                        var a = p;
                                        if (b[a]) {
                                            b[a].messages.warnings = [];
                                            var f = c(b[a]).done(function() {
                                                var c;
                                                (c = b[a].script.uuid) && e[c] && (c = z.setStorageByUid(c, {
                                                    data: e[c].data || {},
                                                    ts: Date.now()
                                                }), h.push(c))
                                            });
                                            d.push(f)
                                        }
                                    })();
                                n.when(d).always(function() {
                                    w.reorderScripts();
                                    n.when(h).always(function() {
                                        f.resolve(a)
                                    })
                                });
                                return f.promise()
                            }).then(function(b) {
                                return a.global_settings && b.global_settings ? (b = r.setValue(q.CONSTANTS.STORAGE.CONFIG, a.global_settings).then(function() {
                                    x.done(function() {
                                        window.setTimeout(T.reset, 1)
                                    });
                                    return n.Pledge({
                                        global_settings: !0
                                    })
                                }), r.setTemporary(!0), b) : n.Pledge({})
                            });
                            return x
                        },
                        installFromUrl: function(a, b, c) {
                            var k = n(),
                                m = A.parse(a),
                                g = {
                                    messages: {
                                        errors: [e.getMessage("Unable_to_load_script_from_url_0url0",
                                            a)],
                                        warnings: []
                                    }
                                };
                            b = b || {};
                            c = c || {};
                            var u = [a, JSON.stringify(b)].join("_");
                            if (d.is(u)) return l.debug("scriptman: de-bounced installFromUrl", a), n.Breach();
                            d.add(u);
                            if (!m.protocol.match(/(https?|file):/)) return l.warn("scriptman: can't install from ", a), n.Breach(g);
                            "file:" != m.protocol || q.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || l.warn("scriptman: Access to local files is forbidden! Loading the following script for installation may fail:", a, "-> more info:", "http://tampermonkey.net/faq.php#Q204");
                            var x = function(a,
                                b) {
                                if (!a)
                                    if (b) a = g, "file:" != m.protocol || q.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS || a.messages.warnings.unshift(e.getMessage("Tampermonkey_has_no_file_access_permission_"));
                                    else {
                                        k.reject();
                                        return
                                    }
                                a.heading = e.getMessage("You_are_about_to_install_a_UserScript_");
                                c.silent_fail ? k.reject(a) : ba.installError(a).always(function(a) {
                                    k.reject(a)
                                })
                            };
                            X.getScriptFromURL(a).done(function(c) {
                                var d = {
                                    url: a,
                                    src: c,
                                    ask: !0,
                                    replace: !0
                                };
                                b && v.each(b, function(a, c) {
                                    d[c] = b[c]
                                });
                                h.doSave(d).done(function(a) {
                                    k.resolve(a.installed)
                                }).fail(x)
                            }).fail(function(a) {
                                x(null,
                                    a)
                            });
                            return k.promise()
                        },
                        determineLastPosition: function() {
                            var a = 0;
                            z.getUidList().forEach(function(b) {
                                var c = z.getByUid(b);
                                c.script && c.cond ? c.script.position && c.script.position > a && (a = c.script.position) : l.warn("scriptman: inconsistent script entry", b)
                            });
                            var b = new y.Script;
                            b.position > a && (a = b.position);
                            return a
                        },
                        convertToRegExp: function(a, b) {
                            var c, d;
                            try {
                                !b && 1 < a.length && "/" == a.substr(0, 1) ? c = new RegExp(".*" + a.replace(/^\//g, "").replace(/\/$/g, "") + ".*", "i") : b ? (d = A.getRegExpFromMatch(a), c = new RegExp(d)) : (d =
                                    A.getRegExpFromInclude(a), c = new RegExp(d, "i"))
                            } catch (e) {
                                return l.warn("scriptman: invalid regexp ", a), !1
                            }
                            return c
                        },
                        matchUrl: function(a, b) {
                            return "" === a.replace(b, "")
                        },
                        regexify: function(a, b) {
                            var c = {},
                                d = {
                                    inc: "rinc",
                                    match: "rinc",
                                    exc: "rexc"
                                };
                            Object.keys(d).forEach(function(e) {
                                var m = a[e] && a[e].length ? a[e].map(function(a) {
                                    return h.convertToRegExp(a, "match" === e)
                                }).filter(function(a) {
                                    return !1 !== a
                                }) : null;
                                if (m || b) c[d[e]] = (c[d[e]] || []).concat(m || [])
                            });
                            return c
                        },
                        validUrl: function(a, b, c) {
                            var d = !1;
                            if (b.rinc) {
                                if (b.rinc.every(function(b) {
                                        return h.matchUrl(a,
                                            b) ? (l.debug('scriptman: @include "' + b + '" matched' + (c ? " (" + c + ")" : '"')), d = !0, !1) : !0
                                    }), !d) return d
                            } else d = !0;
                            b.rexc && b.rexc.every(function(b) {
                                return h.matchUrl(a, b) ? (l.debug('scriptman: @exclude "' + b + '" matched' + (c ? " (" + c + ")" : '"')), d = !1) : !0
                            });
                            return d
                        },
                        getEvilness: function(a) {
                            var b = 0;
                            return a.fileURL && (b = Q.getEvilnessOf(a.fileURL)) || a.downloadURL && (b = Q.getEvilnessOf(a.downloadURL)) || a.updateURL && (b = Q.getEvilnessOf(a.updateURL)) ? (l.debug("scriptman: found blacklisted script", a), b) : 0
                        },
                        blackCheckAll: function() {
                            z.getUidList().forEach(function(a) {
                                var b =
                                    z.getByUid(a);
                                if (b.script && b.cond) {
                                    var c = w.getEvilness(b.script);
                                    if (c !== b.script.evilness) {
                                        if (c || void 0 !== b.script.evilness) l.debug("scriptman: write blacklist state of ", b.script.name, c), c && K.tS(b.script.name, c, "b");
                                        b.script.evilness = c;
                                        h.doModify(a, b.script, !1)
                                    }
                                }
                            })
                        },
                        reorderScripts: function(c, b) {
                            var d = h.determineScriptsToRun();
                            if (c)
                                for (var e = 0; e < d.length; e++) {
                                    var m = d[e];
                                    m.uuid == c && (m.position = Number(b) + (m.position < b ? .5 : -.5))
                                }
                            d = a(d);
                            e = 1;
                            for (m = 0; m < d.length; m++) {
                                var g = d[m];
                                g.position = e++;
                                h.doModify(g.uuid,
                                    g, !1)
                            }
                        },
                        getUniqueScriptsForTab: function(a) {
                            var b = [];
                            B.get.empty(a.id) ? l.debug("bg: WARN: Tabs.get.urls[" + a.id + "] is empty!") : v.each(B.get.urls(a.id), function(a, c) {
                                if (da.isAllowed(c))
                                    for (var f = w.determineScriptsToRun(c), d = 0; d < f.length && (0 === a.frameId || !0 !== f[d].options.noframes && (null !== f[d].options.noframes || !0 !== f[d].options.override.orig_noframes)); d++) {
                                        for (var e = !1, h = 0; h < b.length; h++)
                                            if (b[h].uuid == f[d].uuid) {
                                                e = !0;
                                                break
                                            }
                                        e || b.push(f[d])
                                    }
                            });
                            return b
                        },
                        determineScriptsToRun: function(c) {
                            var b = [];
                            l.debug("scriptman: determineScriptsToRun @" +
                                c);
                            z.getUidList().forEach(function(a) {
                                if (c) {
                                    var d = J.items.regexp.get(a);
                                    if (!d) {
                                        if (!(d = r.getValue(q.CONSTANTS.PREFIX.COND + a, null))) return;
                                        d = h.regexify(d, !0);
                                        J.items.regexp.set(a, d)
                                    }
                                    if (!h.validUrl(c, d, a)) return
                                }
                                d = z.getByUid(a);
                                d.script && d.cond ? b.push(d.script) : l.warn("scriptman: inconsistent script entry", a, d)
                            });
                            return a(b)
                        },
                        isContexter: function(a) {
                            return a.options && ("context-menu" === a.options.run_at || null === a.options.run_at && "context-menu" === a.options.override.orig_run_at)
                        },
                        determineOrigin: function(a) {
                            return h.determineOriginOfUrl(a.fileURL ||
                                a.downloadURL || a.updateURL)
                        },
                        determineOriginOfUrl: function(a) {
                            if (a) {
                                var b = a.match(/https?:\/\/userscripts\.org\/scripts\/(source|version)\/([0-9]{1,9})\.user\.js/) || a.match(/https?:\/\/userscripts-mirror\.org\/scripts\/(source|version)\/([0-9]{1,9})\.user\.js/);
                                if (b && 3 == b.length) return {
                                    id: b[2],
                                    token: "uso",
                                    meta_url: !0,
                                    url: "http://userscripts-mirror.org/scripts/show/" + b[2],
                                    issue_url: "http://contactbyweb.com/userscripts-mirror"
                                };
                                if ((b = a.match(/https?:\/\/greasyfork\.org\/scripts\/([^/]+)\/code\/.*\.user\.js/)) &&
                                    2 == b.length) return {
                                    id: b[1],
                                    token: "gf",
                                    meta_url: !0,
                                    url: "https://greasyfork.org/scripts/" + b[1],
                                    issue_url: "https://greasyfork.org/scripts/" + b[1] + "/feedback"
                                };
                                if ((b = a.match(/https?:\/\/openuserjs\.org\/install\/([^/]+)+\/(.*)\.user\.js/)) && 3 == b.length) return b.shift(), {
                                    id: b.join("/"),
                                    token: "ouj",
                                    meta_header: !0,
                                    url: "https://openuserjs.org/scripts/" + b[0] + "/" + b[1],
                                    issue_url: "https://openuserjs.org/scripts/" + b[0] + "/" + b[1] + "/issues"
                                };
                                if ((b = a.match(/https?:\/\/monkeyguts\.com\/(codepages\/)?([0-9]{1,9})\.user\.js/)) &&
                                    3 == b.length) return {
                                    id: b[2],
                                    token: "mog",
                                    meta_url: !0,
                                    url: "https://monkeyguts.com/code.php?id=" + b[2],
                                    issue_url: "https://monkeyguts.com/code.php?nav=rev&id=" + b[2]
                                };
                                if ((a = a.match(/https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/.*\.user\.js/) || a.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/.*\.user\.js/) || a.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+)\/releases\/download\/.*\.user\.js/)) && 3 == a.length) return a.shift(), {
                                    id: a.join("/"),
                                    token: "gh",
                                    url: "https://github.com/" + a.join("/"),
                                    issue_url: "https://github.com/" + a.join("/") + "/issues"
                                }
                            }
                        }
                    };
                return h
            }(),
            z = function() {
                var a = [],
                    e = {
                        init: function() {
                            r.addDifferentOriginChangeListener(q.CONSTANTS.PREFIX.STORE, function(a, d) {
                                if (d && d.hasOwnProperty("value") && d.origin) {
                                    var h = a.replace(q.CONSTANTS.PREFIX.STORE, ""),
                                        f;
                                    for (f in d.value.data) d.value.data.hasOwnProperty(f) && function() {
                                        var a = f,
                                            c = d.value.data[f];
                                        e.notifyStorageListeners({
                                            uuid: h
                                        }, null, function(f) {
                                            var e = {
                                                data: {},
                                                ts: 0
                                            };
                                            e.data[a] = c;
                                            e.ts = d.value.data.ts;
                                            var h = {
                                                storage: e
                                            };
                                            void 0 === e.data[a] &&
                                                (h.removed = a);
                                            f(h)
                                        })
                                    }()
                                }
                            })
                        },
                        getUidList: function() {
                            var a = new RegExp("^" + q.CONSTANTS.PREFIX.SCRIPT_UID),
                                d = [];
                            r.listValues().forEach(function(e) {
                                -1 != e.search(a) && d.push(e.replace(a, ""))
                            });
                            return d
                        },
                        getUidsByName: function(a, d) {
                            var h = [];
                            e.getUidList().forEach(function(f) {
                                var b = e.getMetaByUid(f);
                                !b || b.name != a || d && d != b.namespace || h.push(f)
                            });
                            return h
                        },
                        getUidByName: function(a) {
                            l.warn("sb: deprecated fn");
                            return e.getUidsByName(a)[0]
                        },
                        getStorageByUid: function(a) {
                            a = r.getValue(q.CONSTANTS.PREFIX.STORE + a, {
                                ts: 0,
                                data: {}
                            });
                            "undefined" === typeof a.ts && (a.ts = 0);
                            "undefined" === typeof a.data && (a.data = {});
                            return a
                        },
                        setStorageByUid: function(a, d) {
                            return d ? r.setValue(q.CONSTANTS.PREFIX.STORE + a, d) : r.deleteValue(q.CONSTANTS.PREFIX.STORE + a)
                        },
                        getMetaByUid: function(a) {
                            return r.getValue(q.CONSTANTS.PREFIX.META + a, null)
                        },
                        getByUid: function(a) {
                            if (!a) return l.error("sb: no UUID set"), {};
                            var d, e = r.getValue(q.CONSTANTS.PREFIX.META + a, null);
                            if (e) {
                                var f = function(a) {
                                    if (a)
                                        for (var c = 0, f = null; f = a[c]; c++) delete f.loaded, delete f.textContent,
                                            delete f.resURL, delete f.resText
                                };
                                f(e.requires);
                                f(e.resources);
                                e.uuid = a;
                                e.options.override.use_connects || (e.connects = e.connects || [], e.options.override.merge_connects = !0, e.options.override.use_connects = []);
                                e.grant = e.grant || [];
                                e.textContent = r.getValue(q.CONSTANTS.PREFIX.SCRIPT + a, e.textContent);
                                e.textContent && (d = e)
                            }
                            return {
                                script: d,
                                cond: r.getValue(q.CONSTANTS.PREFIX.COND + a, null)
                            }
                        },
                        setByUid: function(a, d, e) {
                            var f = {};
                            if (!a) return l.error("sb: no UUID set", d), f;
                            if (null === d.textContent || void 0 === d.textContent) throw Error("No script code set!");
                            var b = r.getValue(q.CONSTANTS.PREFIX.META + a),
                                m = !b;
                            r.setValue(q.CONSTANTS.PREFIX.SCRIPT_UID + a, d.name);
                            r.setValue(q.CONSTANTS.PREFIX.COND + a, {
                                inc: d.includes,
                                match: d.matches,
                                exc: d.excludes
                            });
                            r.setValue(q.CONSTANTS.PREFIX.SCRIPT + a, d.textContent);
                            var k = v.copy(d, {});
                            k.textContent = null;
                            e && (f.lastModified = Date.now(), k.lastModified = f.lastModified);
                            r.setValue(q.CONSTANTS.PREFIX.META + a, k);
                            e && (ha.onScriptsChanged(), m ? G.scriptAddedCb(d.name, d) : G.scriptChangedCb(d.name, d, b), g.values && K.tS(d.name, d.fileURL, m ? "i" :
                                "u"));
                            J.items.rundata.removeAll();
                            J.items.regexp.remove(a);
                            return f
                        },
                        removeByUid: function(a, d) {
                            void 0 === d && (d = !0);
                            var h = e.getByUid(a);
                            r.deleteValue(q.CONSTANTS.PREFIX.SCRIPT_UID + a);
                            r.deleteValue(q.CONSTANTS.PREFIX.COND + a);
                            r.deleteValue(q.CONSTANTS.PREFIX.SCRIPT + a);
                            r.deleteValue(q.CONSTANTS.PREFIX.META + a);
                            r.deleteValue(q.CONSTANTS.PREFIX.STORE + a);
                            d && (ha.onScriptsChanged(), h.script && h.cond && (G.scriptRemovedCb(h.script.name, h.script), g.values && K.tS(h.script.name, null, "r")));
                            J.items.rundata.removeAll();
                            J.items.regexp.remove(a);
                            return {}
                        },
                        addStorageListener: function(c, d, e, f, b) {
                            a.push({
                                tabid: c,
                                id: d,
                                uuid: e,
                                time: f,
                                response: b
                            })
                        },
                        removeStorageListeners: function(c, d) {
                            void 0 === d && (d = !0);
                            var e = a;
                            a = [];
                            e.forEach(function(f) {
                                try {
                                    void 0 !== c.tabid && c.tabid !== f.tabid || void 0 !== c.uuid && c.uuid !== f.uuid || void 0 !== c.id && c.id !== f.id ? a.push(f) : d && f.response({})
                                } catch (b) {
                                    l.debug("sb: listener clear for script", c, "failed! Page reload?!")
                                }
                            })
                        },
                        notifyStorageListeners: function(c, d, e) {
                            c = c || {};
                            d = d || {};
                            a.forEach(function(a) {
                                try {
                                    void 0 !==
                                        d.uuid && a.uuid === d.uuid || void 0 !== d.tabid && a.tabid === d.tabid || void 0 !== d.id && a.id === d.id || void 0 !== c.tabid && c.tabid !== a.tabid || void 0 !== c.uuid && c.uuid !== a.uuid || void 0 !== c.id && c.id !== a.id || e && e(a.response)
                                } catch (b) {
                                    l.warn("sb: listener notification for script", c, "failed! Page reload?!")
                                }
                            })
                        }
                    };
                return e
            }();
        scbr = z;
        var xa = function() {
                var a = function(a, c) {
                    var d = null,
                        e = a.sender,
                        f = this,
                        b = function(b) {
                            try {
                                a.postMessage(b)
                            } catch (c) {
                                l.debug("bg: Error sending port (" + a.name + ") message", b)
                            }
                        };
                    if ("xhr" == c.method) {
                        var g = !1,
                            k = function() {
                                a.disconnect()
                            };
                        c.details.convertBinary = !0;
                        c.details.partialSize = c.details.partialSize || q.XMLHTTPREQUEST.PARTIAL_SIZE;
                        var t = {};
                        Object.keys(c.callbacks).forEach(function(a) {
                            var f = "ondone" === a;
                            if (c.callbacks[a] || f || "onload" === a) t[a] = function(c) {
                                c = {
                                    data: c.response,
                                    exception: c.exception
                                };
                                c[a] = !0;
                                b(c);
                                f && k()
                            }
                        });
                        t.ondone || (t.ondone = k);
                        var r = function(a) {
                                var b = n(),
                                    c = [];
                                rea.cookies.getAll({
                                    url: a
                                }, function(a) {
                                    c = c.concat(a);
                                    b.resolve(c)
                                });
                                return b.promise()
                            },
                            u;
                        c.details.url = A.sanitize(c.details.url,
                            c.url || e.url || null, ["http:", "https:"]) || c.details.url;
                        (function() {
                            return c.details.cookie && c.details.url ? r(c.details.url).then(function(a) {
                                a = a.map(function(a) {
                                    return a.name + "=" + encodeURIComponent(a.value)
                                }).concat([c.details.cookie]).join(";");
                                delete c.details.cookie;
                                c.details.headers = c.details.headers || {};
                                c.details.headers.cookie = a
                            }) : n.Pledge()
                        })().then(function() {
                            g || (u = ea.exec(c.details, c.uuid, e || {}, t))
                        });
                        d = function() {
                            g = !0;
                            u && u.abort()
                        }
                    } else if ("download" == c.method) E.start(c.details, {
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
                    else if ("addStorageListener" == c.method) e.tab ? (z.addStorageListener(e.tab.id, c.id, c.uuid, Date.now(), b), d = function() {
                        z.removeStorageListeners({
                            uuid: c.uuid,
                            id: c.id
                        }, !1)
                    }) : b({
                        error: !0
                    });
                    else if ("saveStorageKey" == c.method) {
                        if (e.tab) {
                            if (c.uuid) {
                                var x = z.getStorageByUid(c.uuid);
                                x.data[c.key] = c.value;
                                x.ts = c.ts;
                                z.setStorageByUid(c.uuid,
                                    x);
                                z.notifyStorageListeners({
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
                                    var f = {
                                        storage: b
                                    };
                                    void 0 === b.data[c.key] && (f.removed = c.key);
                                    a(f)
                                })
                            }
                        } else l.warn("storage: unable to save storage due to empty tabID!");
                        b({})
                    } else if ("openInTab" == c.method) {
                        d = ["active"];
                        x = {
                            url: c.details.url
                        };
                        if (c.details.options) {
                            for (var v = 0; v < d.length; v++) void 0 !== c.details.options[d[v]] && (x[d[v]] = c.details.options[d[v]]);
                            c.details.options.insert && (x.index = e.tab.index + 1)
                        }
                        d = function() {
                            f.disconnected = !0;
                            f.tabId && delete V[f.tabId]
                        };
                        rea.tabs.create(x, function(a) {
                            f.tabId = a.id;
                            V[a.id] = {
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
                        if (f.tabId) {
                            var w = 3,
                                y = function() {
                                    B.listeners.once.whenReady(f.tabId, function() {
                                        rea.tabs.sendMessage(f.tabId, {
                                            method: "setForeignAttr",
                                            attr: "name",
                                            value: c.name
                                        }, function(a) {
                                            a ? b({
                                                name: c.name
                                            }) : 0 < w-- ? y() : l.warn("foreignAttr: error setting attr")
                                        })
                                    })
                                };
                            y()
                        }
                    } else "closeTab" == c.method ? (f.tabId && V[f.tabId] && rea.tabs.remove(f.tabId), b({}),
                        window.setTimeout(function() {
                            try {
                                f.disconnected || a.disconnect()
                            } catch (b) {}
                            f.disconnected = !0
                        }, 1E3)) : "registerMenuCommand" == c.method && (e.tab ? (Y.add(e.tab.id, c.name, c.accessKey, c.menuId, b), wa(), d = function() {
                        Y.clearById(c.menuId);
                        wa()
                    }) : (l.warn("Unable to register menu cmd due to empty tabID!"), a.disconnect()));
                    d && a.onDisconnect.addListener(d)
                };
                return function(e) {
                    if (D.late) {
                        var c = {};
                        e.onMessage.addListener(function(d) {
                            a.apply(c, [e, d])
                        })
                    } else D.registerLateCallback(function() {
                        xa(e)
                    })
                }
            }(),
            aa = {
                ping: {
                    allow: {
                        insecure: !0
                    },
                    exec: function(a, e, c) {
                        c({
                            pong: !0,
                            instanceID: sa,
                            config: {
                                layout: g.values.layout
                            }
                        })
                    }
                },
                newTab: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
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
                    exec: function(a, e, c) {
                        e.tab && a.uuid ? (M[e.tab.id] || (M[e.tab.id] = {}), M[e.tab.id][a.uuid] || (M[e.tab.id][a.uuid] = {}), c({
                            data: M[e.tab.id][a.uuid]
                        })) : (l.warn("bg: unable to process request", e, a), c({
                            data: null
                        }))
                    }
                },
                getTabs: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, e, c) {
                        if (a.uuid) {
                            var d = {};
                            Object.keys(M).forEach(function(c) {
                                d[c] = {};
                                d[c] = M[c][a.uuid]
                            });
                            c({
                                data: d
                            })
                        } else l.warn("bg: unable to process request", e, a), c({
                            data: null
                        })
                    }
                },
                setTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, e, c) {
                        if (e.tab && a.uuid) {
                            M[e.tab.id] || (M[e.tab.id] = {});
                            var d = {};
                            a.tab && Object.keys(a.tab).forEach(function(c) {
                                d[c] = a.tab[c]
                            });
                            M[e.tab.id][a.uuid] = d
                        } else l.warn("bg: unable to process request", e, a);
                        c({})
                    }
                },
                focusTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, e, c) {
                        (a = e && e.tab ? e.tab.id : null) ? rea.tabs.update(a, {
                            active: !0
                        }, function() {
                            c({
                                error: rea.runtime.lastError
                            })
                        }): c({
                            error: "internal error"
                        })
                    }
                },
                closeTab: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, e, c) {
                        var d = e && e.tab ? e.tab.id : null;
                        d ? rea.tabs.query({
                            windowType: "normal"
                        }, function(a) {
                            1 >= a.length ? (l.warn("bg:", "refused to close last tab!"), c({
                                error: "refused to close last tab!"
                            })) : rea.tabs.remove(d, function() {
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
                    exec: function(a, e, c) {
                        e.tab ? pa.copy(a.data) : l.warn("bg: unable to process request", e, a);
                        c({})
                    }
                },
                setOption: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        e = "options" == e.extpage ||
                            "options" == a.origin;
                        g.values[a.name] = a.value;
                        e ? U.create("options.settings").done(function(a) {
                            c({
                                items: a,
                                options: g.snapshot
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: g.snapshot
                            })
                        }) : c({})
                    }
                },
                reportAnIssue: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        var d, h, f;
                        a.uuid && (d = z.getByUid(a.uuid)) && d.script && d.cond && (e = w.determineOrigin(d.script), "author" == a.to && d.script.supportURL ? (h = {
                            url: d.script.supportURL
                        }, f = e ? [a.to, e.token, e.id].join(":") : [a.to, h.url].join(":")) : e && (h = e, f = [h.token, h.id].join(":")), h && (K.tS(d.script.name,
                            f, "m"), rea.tabs.create({
                            url: h.issue_url || h.url,
                            active: !0
                        }, function() {})));
                        c({})
                    }
                },
                begEvent: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        if ("dialog" == a.action) Z.dialog.shown(a.extra);
                        else if ("clicked" == a.action) {
                            var d, h;
                            a.extra && (d = a.extra.amount, h = a.extra.currency);
                            Z.clicked(a.type, d, h)
                        } else if (Z.button[a.action]) Z.button[a.action](a.extra);
                        else l.warn("bg: Warning: unknown request ", a);
                        c({})
                    }
                },
                buttonPress: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        var d = function() {
                            c({})
                        };
                        if ("reset_simple" == a.name) T.reset(d);
                        else if ("reset_factory" == a.name) T.factoryReset(d);
                        else if ("create_tesla_data" == a.name) G.createTeslaData().done(function(a) {
                            pa.copy({
                                content: H.UTF8.encode(a.join("<br>")),
                                type: "html"
                            });
                            d()
                        });
                        else if ("reset_chrome_sync" == a.name) G.reset().always(d);
                        else if ("install_tests" == a.name)(e = fa.framework.prepare(w.doSave, q.RUNTIME.BROWSER, q.RUNTIME.BROWSER_VERSION, d)) && l.error(e);
                        else if ("enabled" == a.name) g.values[a.name] = !g.values[a.name], c({});
                        else if ("installFromUrl" == a.name) w.installFromUrl(a.data).always(function() {
                            c({})
                        });
                        else if ("externals_delete" == a.name) N.cleanElement(a.scriptuid, a.safe_url), U.create("options.scripts").done(function(a) {
                            c({
                                items: a,
                                options: g.snapshot
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: g.snapshot
                            })
                        });
                        else if ("focus_tab" == a.name) aa.focusTab.exec({}, {
                            tab: {
                                id: a.tabid
                            }
                        }, c);
                        else if ("run_script_updates" == a.name)
                            if (a.scriptuid) {
                                var h;
                                X.check(!0, !1, a.scriptuid).done(function(a) {
                                    h = a
                                }).always(function() {
                                    c({
                                        scriptuid: a.scriptuid,
                                        updatable: h
                                    })
                                })
                            } else X.check(!0, !0), c({});
                        else l.warn("bg: Warning: unknown button " +
                            a.name), c({})
                    }
                },
                loadTree: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        U.create(a.referrer, {
                            complete: a.complete,
                            uuid: a.uuid
                        }).done(function(a) {
                            c({
                                items: a,
                                i18n: g.values.i18n,
                                options: g.snapshot,
                                begging: Z.needed()
                            })
                        }).fail(function(a) {
                            c({
                                error: a,
                                options: g.snapshot
                            })
                        })
                    }
                },
                modifyScriptOptions: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        if (a.uuid) {
                            var d = "options" == e.extpage || "options" == a.origin,
                                h = void 0 == a.reload || 1 == a.reload,
                                f = z.getByUid(a.uuid);
                            if (f.script && f.cond) {
                                var b = !1,
                                    p = new y.Script;
                                Object.keys(p.options).forEach(function(b) {
                                    void 0 !==
                                        a[b] && (f.script.options[b] = a[b])
                                });
                                Object.keys(p.options.override).forEach(function(c) {
                                    -1 != c.search("merge_") && void 0 !== a[c] && (f.script.options.override[c] = a[c], b = !0)
                                });
                                ["includes", "excludes", "matches"].forEach(function(c) {
                                    void 0 !== a[c] && (b = !0, f.script.options.override["use_" + c] = a[c])
                                });
                                ["connects", "blockers"].forEach(function(b) {
                                    void 0 !== a[b] && (f.script.options.override["use_" + b] = a[b])
                                });
                                b && (f.script = w.mergeCludes(f.script));
                                a.temp_connects && ea.setSessionConnects(f.script.uuid, a.temp_connects);
                                void 0 !==
                                    a.enabled && (f.script.enabled = a.enabled);
                                w.doModify(f.script.uuid, f.script, !1).done(function() {
                                    h ? (void 0 !== a.position && w.reorderScripts(a.uuid, a.position), d ? aa.loadTree.exec({
                                        referrer: "options.scripts"
                                    }, e, c) : rea.tabs.getSelected(null, function(b) {
                                        U.create("actions").done(function(a) {
                                            c({
                                                items: a,
                                                i18n: g.values.i18n,
                                                options: {
                                                    enabled: g.values.enabled,
                                                    layout: g.values.layout
                                                }
                                            })
                                        }).fail(function() {
                                            c({
                                                i18n: g.values.i18n,
                                                options: {
                                                    enabled: g.values.enabled,
                                                    layout: g.values.layout
                                                }
                                            })
                                        });
                                        a.uuid && g.values.autoReload &&
                                            rea.tabs.sendMessage(b.id, {
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
                    exec: function(a, m, c) {
                        if (a.nid) {
                            var d = void 0 == a.reload || 1 == a.reload;
                            L.getUserscriptById(a.nid).then(function(c) {
                                if (c)
                                    if ("installed" == a.actionid) {
                                        if ("false" == a.value) return L.uninstall(c)
                                    } else {
                                        if ("enabled" == a.actionid) return L.setEnabled(c, a.value);
                                        if ("imported" == a.actionid && "true" == a.value) {
                                            var f = L.getUserscriptSource(c);
                                            if (f) return w.doSave({
                                                src: f,
                                                ask: !0,
                                                replace: !0
                                            }).then(function(a) {
                                                if (a.installed) {
                                                    if ("disable" == g.values.native_import_post_action) return L.setEnabled(c, !1);
                                                    if ("uninstall" == g.values.native_import_post_action) return L.uninstall(c)
                                                }
                                            });
                                            rea.tabs.sendMessage(m.tab.id, {
                                                method: "showMsg",
                                                msg: e.getMessage("Please_double_check_the_native_script_import_settings__")
                                            }, function() {})
                                        }
                                    } else d = !1;
                                return n.Pledge()
                            }).always(function() {
                                d ? aa.loadTree.exec({
                                    referrer: "options.scripts"
                                }, m, c) : c({})
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
                    exec: function(a, m, c) {
                        var d = void 0 === a.reload || !!a.reload,
                            h = function(a) {
                                d ? U.create("options.scripts").done(function(b) {
                                    a.items = b;
                                    a.options = g.snapshot;
                                    c(a)
                                }).fail(function(a) {
                                    c({
                                        error: a,
                                        options: g.snapshot
                                    })
                                }) : c({})
                            };
                        if (a.clean) {
                            l.debug("bg: clean userscript " + a.uuid);
                            m = z.getByUid(a.uuid);
                            var f = function(b) {
                                U.create("options.scripts").done(function(f) {
                                    c({
                                        cleaned: b.installed,
                                        items: f,
                                        options: g.snapshot
                                    });
                                    b.installed && z.notifyStorageListeners({
                                        uuid: a.uuid
                                    }, null, function(b) {
                                        b({
                                            storage: z.getStorageByUid(a.uuid)
                                        })
                                    })
                                }).fail(function(a) {
                                    c({
                                        error: a,
                                        options: g.snapshot
                                    })
                                })
                            };
                            m.script && m.cond ? w.doSave({
                                name: a.name,
                                uuid: a.uuid,
                                src: m.script.textContent,
                                clean: !0,
                                ask: !1,
                                internal: !0,
                                save: !0
                            }).always(function(a) {
                                f(a || {
                                    installed: !1
                                })
                            }) : (l.error(e.getMessage("fatal_error") + " (" + a.uuid + ")!!!"), f({
                                installed: !1
                            }))
                        } else if (a.code) {
                            var b = c;
                            d && (b = function(a) {
                                w.reorderScripts();
                                h(a)
                            });
                            a.new_script && (a.uuid = v.createUUID());
                            w.doSave({
                                name: a.name,
                                uuid: a.uuid,
                                force_url: a.force_url,
                                src: a.code,
                                ask: !g.values.editor_easySave,
                                lastModified: a.lastModified,
                                save: !0
                            }).always(function(a) {
                                b(a || {
                                    installed: !1
                                })
                            })
                        } else a.auto_save || (w.doRemove(a.uuid), w.reorderScripts()), h({})
                    }
                },
                exportToJson: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        w.exportToJson(a.ids, a.options).done(function(a) {
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
                    exec: function(a, m, c) {
                        var d = void 0 === a.reload || !!a.reload;
                        w.importFromJson(a.json).fail(function(a) {
                            c({
                                error: a || e.getMessage("An_error_occured_during_import_")
                            })
                        }).done(function(a) {
                            var f = {
                                reload: a.global_settings
                            };
                            d && !f.reload ? U.create("options.scripts").done(function(a) {
                                f.items =
                                    a;
                                f.options = g.snapshot;
                                c(f)
                            }).fail(function(a) {
                                c({
                                    error: a,
                                    options: g.snapshot
                                })
                            }) : c(f)
                        })
                    }
                },
                askCom: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        ba.onMessage(a.data).always(function(a) {
                            a.i18n = g.values.i18n;
                            a.options = {
                                statistics_enabled: g.values.statistics_enabled
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
                    exec: function(a, m, c) {
                        if (m.tab) {
                            var d = {};
                            w.installFromUrl(a.url, {}, {
                                silent_fail: !0
                            }).done(function(a) {
                                d = {
                                    data: null,
                                    found: !0,
                                    installed: a
                                }
                            }).fail(function(a) {
                                d.err =
                                    a && a.messages && a.messages.errors ? a.messages.errors[0] : e.getMessage("Unable_to_parse_this_")
                            }).always(function() {
                                c(d)
                            })
                        } else l.warn("bg: Error: unable to install script due to empty tabID!")
                    }
                },
                execMenuCmd: {
                    allow: {
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        (a = Y.getById(a.id)) ? a.response({
                            run: !0,
                            menuId: a.id
                        }): l.warn("bg: Error: unable to find MC id " + a.id);
                        c({})
                    }
                },
                unLoad: {
                    allow: {
                        script: !0
                    },
                    exec: function(a, e) {
                        a.topframe || a.id && B.events.unload(e.tab.id, e.tab.frameId, a.id)
                    }
                },
                prepare: {
                    allow: {
                        script: !0
                    },
                    exec: function(a,
                        e, c) {
                        if (e.tab) {
                            var d = a.topframe ? 0 : null,
                                h = A.woHash(a.url);
                            B.events.run(e.tab.id, d, a.id, h, function(a) {
                                a = ia.answer(a);
                                c(a);
                                R.setIcon(e.tab.id);
                                R.setBadge(e.tab.id)
                            });
                            return !0
                        }
                        c({});
                        return !1
                    }
                },
                notification: {
                    allow: {
                        script: !0,
                        extpage: !0
                    },
                    exec: function(a, e, c) {
                        var d = a.image ? a.image : rea.extension.getURL("images/icon128.png");
                        (function() {
                            var c = n();
                            a.highlight && e.tab ? P.highlight(e.tab.id, c.resolve) : c.resolve();
                            return c.promise()
                        })().then(function() {
                            var c = n();
                            a.text ? P.show(a.title, a.text, d, a.timeout, c.resolve) :
                                c.resolve();
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
                    exec: function(a, e, c) {
                        (function() {
                            var a = n();
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
                handler: function(a, e, c) {
                    if (!D.late) return D.registerLateCallback(function() {
                        aa.handler(a, e, c)
                    }), !0;
                    var d = aa[a.method];
                    if (d)
                        if (d.allow && d.exec) {
                            var h =
                                rea.runtime.id,
                                h = !q.REQUESTS.HAS_SENDER_ID && e.tab || e.id === h,
                                f = null,
                                b = q.REQUESTS.INTERNAL_PAGE_PROTOCOL + "//",
                                g = q.REQUESTS.GET_INTERNAL_PAGE_REGEXP(),
                                k = e.url ? e.url : e.tab ? e.tab.url : null;
                            if (b = h && (k ? 0 == k.search(b) : !0)) k ? (g = k.match(g)) && 2 == g.length && (f = g[1]) : f = "*", e.extpage = f;
                            g = "options" == f;
                            if ("background" == f || d.allow.insecure || d.allow.extpage && b || d.allow.options && g || d.allow.script && h && !b) {
                                if (d = d.exec(a, e, c), void 0 !== d) return d
                            } else return !1 === a.topframe && (b || g) || l.warn("back: this context doesn't have the permission to call \"" +
                                a.method + '"'), !1
                        } else return l.warn("b: invalid implementation of " + a.method), !1;
                    else return l.warn("back: unknown method " + a.method), !1;
                    return !0
                }
            },
            ya = function() {
                var a = [{
                        name: e.getMessage("Default"),
                        value: "default"
                    }],
                    g = !1,
                    c = {
                        default: e.getMessage("Default"),
                        solarized: "Solarized",
                        monokai: "Monokai",
                        mdnlike: "MDN-like",
                        eclipse: "Eclipse",
                        railscasts: "RailsCasts"
                    };
                return {
                    getLayouts: function() {
                        if (!g) {
                            var c = ra.getLayouts().map(function(a) {
                                return {
                                    name: a.charAt(0).toUpperCase() + a.slice(1),
                                    value: a
                                }
                            });
                            a = a.concat(c);
                            g = !0
                        }
                        return a
                    },
                    getEditorThemes: function() {
                        return ra.editorThemes.map(function(a) {
                            return {
                                name: c[a] || a,
                                value: a
                            }
                        })
                    }
                }
            }(),
            Y = function() {
                var a = [];
                return {
                    add: function(e, c, d, g, f) {
                        a.push({
                            tabId: e,
                            name: c,
                            accessKey: d,
                            id: g,
                            response: f
                        })
                    },
                    list: function() {
                        return a
                    },
                    listByTabId: function(e) {
                        var c = {};
                        return a.filter(function(a) {
                            return a.tabId == e && !c[a.name] && (c[a.name] = !0)
                        })
                    },
                    clearByTabId: function(e) {
                        a = a.filter(function(a) {
                            return a.tabId != e
                        })
                    },
                    getByTabId: function(e) {
                        return a.filter(function(a) {
                            return a.tabId == e
                        })[0]
                    },
                    clearById: function(e) {
                        a = a.filter(function(a) {
                            return a.id != e
                        })
                    },
                    getById: function(e) {
                        return a.filter(function(a) {
                            return a.id == e
                        })[0]
                    }
                }
            }(),
            Ga = function() {
                return {
                    create: function() {
                        var a, m, c, d, h, f, b, p, k, t, n, l, x, r;
                        t = null;
                        a = {
                            name: e.getMessage("General"),
                            sub_menu_item: !0,
                            items: []
                        };
                        a.items.push({
                            name: e.getMessage("Config_Mode"),
                            id: "configMode",
                            level: 0,
                            option: !0,
                            select: [{
                                name: e.getMessage("Novice"),
                                value: 0
                            }, {
                                name: e.getMessage("Beginner"),
                                value: 50
                            }, {
                                name: e.getMessage("Advanced"),
                                value: 100
                            }],
                            value: g.values.configMode,
                            desc: e.getMessage("Changes_the_number_of_visible_config_options")
                        });
                        a.items.push({
                            name: e.getMessage("Language"),
                            id: "i18n",
                            level: 0,
                            option: !0,
                            reload: !0,
                            warning: e.getMessage("A_reload_is_required"),
                            select: [{
                                name: "Browser Default",
                                value: null
                            }].concat(e.supported),
                            value: g.values.i18n,
                            validation: {
                                image: "info",
                                opacity: .9,
                                msg: e.getMessage("Your_language_is_not_supported__Click_here_to_get_intructions_how_to_translate_TM_"),
                                url: "http://tampermonkey.net/faq.php#Q500"
                            }
                        });
                        a.items.push({
                            name: e.getMessage("Auto_reload_on_script_enabled"),
                            level: 20,
                            id: "autoReload",
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.autoReload,
                            desc: e.getMessage("Auto_reload_on_script_enabled_desc")
                        });
                        a.items.push({
                            name: e.getMessage("Anonymous_statistics"),
                            level: 0,
                            id: "statistics_enabled",
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.statistics_enabled,
                            validation: {
                                image: "info",
                                opacity: .9,
                                msg: e.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics_via_Google_Analytics"),
                                url: "http://tampermonkey.net/privacy.php#extension"
                            }
                        });
                        a.items.push({
                            name: e.getMessage("Debug_scripts"),
                            level: 100,
                            id: "debug",
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.debug,
                            desc: ""
                        });
                        a.items.push({
                            name: e.getMessage("Show_fixed_source"),
                            level: 100,
                            id: "showFixedSrc",
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.showFixedSrc,
                            desc: ""
                        });
                        a.items.push({
                            name: e.getMessage("LogLevel"),
                            id: "logLevel",
                            level: 0,
                            option: !0,
                            select: [{
                                name: e.getMessage("Debug"),
                                value: 60
                            }, {
                                name: e.getMessage("Warning"),
                                value: 30
                            }, {
                                name: e.getMessage("Error"),
                                value: 0
                            }],
                            value: g.values.logLevel,
                            desc: ""
                        });
                        q.OPTIONS.NATIVE_SCRIPT_IMPORT && (m = {
                            name: e.getMessage("Native_Script_Import"),
                            sub_menu_item: !0,
                            need_save: !0,
                            items: []
                        }, t = {}, g.values.native_import && (t = !0 === q.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS ? {
                            image: "button_ok",
                            msg: e.getMessage("TM_has_access_to_file_URIs")
                        } : {
                            image: "critical",
                            msg: e.getMessage("Tampermonkey_needs_access_to_file_URIs__Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q204"
                        }), m.items.push({
                            name: e.getMessage("Enable_Native_Script_Import"),
                            id: "native_import",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.native_import,
                            validation: t
                        }), m.items.push({
                            name: e.getMessage("Post_Import_Action"),
                            id: "native_import_post_action",
                            level: 0,
                            option: !0,
                            select: [{
                                name: e.getMessage("None"),
                                value: "none"
                            }, {
                                name: e.getMessage("Disable_Extension"),
                                value: "disable"
                            }, {
                                name: e.getMessage("Uninstall_Extension"),
                                value: "uninstall"
                            }],
                            value: g.values.native_import_post_action,
                            desc: e.getMessage("What_action_should_be_done_after_a_native_userscript_was_imported_sucessfully_")
                        }), t = {}, g.values.native_import && (t = L.isPathValid() ? {
                            image: "button_ok",
                            msg: e.getMessage("Everything_is_setup_correctly_")
                        } : {
                            image: "critical",
                            msg: e.getMessage("Tampermonkey_needs_to_know_the_absolute_path_to_your_browser_profile_folder_Visit_the_FAQ_"),
                            url: "http://tampermonkey.net/faq.php#Q205"
                        }), m.items.push({
                            name: e.getMessage("Browser_Profile_Path"),
                            id: "native_import_path",
                            level: 0,
                            option: !0,
                            text: !0,
                            width: 2,
                            value: g.values.native_import_path,
                            validation: t
                        }));
                        q.OPTIONS.HAS_TESLA && (l = {
                                name: e.getMessage("TESLA"),
                                sub_menu_item: !0,
                                level: 50,
                                need_save: !0,
                                items: []
                            }, l.items.push({
                                name: e.getMessage("Enable_TESLA"),
                                id: "sync_enabled",
                                level: 50,
                                option: !0,
                                checkbox: !0,
                                enabled: g.values.sync_enabled,
                                desc: e.getMessage("Tampermonkey_External_Script_List_Access")
                            }),
                            c = [{
                                name: "pastebin.com",
                                value: I.types.ePASTEBIN,
                                enable: {
                                    sync_id: !0,
                                    sync_version: !1,
                                    create_tesla_data: !0
                                }
                            }, {
                                name: "Chrome Sync",
                                value: I.types.eCHROMESYNC,
                                enable: {
                                    sync_id: !1,
                                    sync_version: !0,
                                    create_tesla_data: !1
                                }
                            }], q.SYNC.GOOGLE_DRIVE.SUPPORTED && c.push({
                                name: "Google Drive (Beta)",
                                value: I.types.eGOOGLEDRIVE,
                                enable: {
                                    sync_id: !1,
                                    sync_version: !1,
                                    create_tesla_data: !1
                                }
                            }), l.items.push({
                                name: e.getMessage("Sync_Type"),
                                id: "sync_type",
                                enabler: !0,
                                level: 50,
                                option: !0,
                                select: c,
                                value: g.values.sync_type
                            }), l.items.push({
                                name: e.getMessage("Sync_Id"),
                                id: "sync_id",
                                enabledBy: "sync_type",
                                level: 50,
                                text: !0,
                                value: g.values.sync_id,
                                option: !0
                            }), l.items.push({
                                name: e.getMessage("Sync_Version"),
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
                                    warning: e.getMessage("This_sync_version_may_multiply_each_script_that_is_present_at_more_than_one_Tampermonkey_instance__Do_you_really_want_to_continue_")
                                }],
                                value: g.values.sync_version,
                                desc: e.getMessage("Different_sync_versions_are_not_compatible_to_each_other_")
                            }),
                            l.items.push({
                                name: e.getMessage("Create_Exportable_Data"),
                                id: "create_tesla_data",
                                enabledBy: "sync_type",
                                button: !0,
                                ignore: !0,
                                level: 60,
                                warning: e.getMessage("Copy_exportable_data_to_clipboard_Ok_")
                            }));
                        f = {
                            name: e.getMessage("Appearance"),
                            sub_menu_item: !0,
                            items: []
                        };
                        f.items.push({
                            name: e.getMessage("Layout"),
                            id: "layout",
                            level: 0,
                            option: !0,
                            select: ya.getLayouts(),
                            value: g.values.layout,
                            desc: ""
                        });
                        t = {};
                        "off" == g.values.notification_showUpdate && (t = {
                            image: "critical",
                            msg: e.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")
                        });
                        f.items.push({
                            name: e.getMessage("Update_Notification"),
                            id: "notification_showUpdate",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }, {
                                name: e.getMessage("Show_notification"),
                                value: "notification"
                            }, {
                                name: e.getMessage("Open_changelog"),
                                value: "changelog"
                            }],
                            value: g.values.notification_showUpdate,
                            validation: t
                        });
                        b = {
                            name: e.getMessage("Action_Menu"),
                            sub_menu_item: !0,
                            items: [],
                            level: 50
                        };
                        b.items.push({
                            name: e.getMessage("Hide_disabled_scripts"),
                            id: "action_menu_scripts_hide_disabled",
                            level: 100,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.action_menu_scripts_hide_disabled,
                            desc: ""
                        });
                        b.items.push({
                            name: e.getMessage("Columns"),
                            id: "action_menu_columns",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("1"),
                                value: "1"
                            }, {
                                name: e.getMessage("2"),
                                value: "2"
                            }, {
                                name: e.getMessage("3"),
                                value: "3"
                            }].filter(function(a) {
                                return a.value <= q.ACTIONMENU.COLUMNS
                            }),
                            value: g.values.action_menu_columns
                        });
                        b.items.push({
                            name: e.getMessage("Script_order"),
                            id: "action_menu_scripts_sort",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Position_"),
                                value: "position"
                            }, {
                                name: e.getMessage("Name"),
                                value: "name"
                            }, {
                                name: e.getMessage("Enabled"),
                                value: "enabled"
                            }],
                            value: g.values.action_menu_scripts_sort
                        });
                        b.items.push({
                            name: e.getMessage("Icon_badge_info"),
                            id: "appearance_badges",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }, {
                                name: e.getMessage("Running_scripts"),
                                value: "running"
                            }, {
                                name: e.getMessage("Unique_running_scripts"),
                                value: "running_unique"
                            }, {
                                name: e.getMessage("Disabled_scripts"),
                                value: "disabled"
                            }],
                            value: g.values.appearance_badges
                        });
                        (q.RUNTIME.CHROME || q.RUNTIME.FIREFOX) && b.items.push({
                            name: e.getMessage("Icon_badge_color"),
                            id: "appearance_badge_color",
                            level: 100,
                            color: !0,
                            value: g.values.appearance_badge_color
                        });
                        c = {
                            name: e.getMessage("Editor"),
                            sub_menu_item: !0,
                            level: 20,
                            need_save: !0,
                            items: [],
                            warning: e.getMessage("A_reload_is_required"),
                            reload: !0
                        };
                        c.items.push({
                            name: e.getMessage("Enable_Editor"),
                            id: "editor_enabled",
                            level: 100,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_enabled,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Theme"),
                            id: "editor_theme",
                            level: 50,
                            option: !0,
                            select: ya.getEditorThemes(),
                            value: g.values.editor_theme
                        });
                        c.items.push({
                            name: e.getMessage("Font_Size"),
                            id: "editor_fontSize",
                            level: 50,
                            option: !0,
                            select: [{
                                name: "50%",
                                value: 50
                            }, {
                                name: "70%",
                                value: 70
                            }, {
                                name: "80%",
                                value: 80
                            }, {
                                name: "90%",
                                value: 90
                            }, {
                                name: "100%",
                                value: 100
                            }, {
                                name: "110%",
                                value: 110
                            }, {
                                name: "120%",
                                value: 120
                            }, {
                                name: "150%",
                                value: 150
                            }],
                            value: g.values.editor_fontSize
                        });
                        c.items.push({
                            name: e.getMessage("Key_Mapping"),
                            id: "editor_keyMap",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Windows"),
                                value: "windows"
                            }, {
                                name: e.getMessage("Sublime"),
                                value: "sublime"
                            }, {
                                name: e.getMessage("Emacs"),
                                value: "emacs"
                            }, {
                                name: e.getMessage("Vim"),
                                value: "vim"
                            }],
                            value: g.values.editor_keyMap
                        });
                        c.items.push({
                            name: e.getMessage("Indentation_Width"),
                            id: "editor_indentUnit",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("1"),
                                value: 1
                            }, {
                                name: e.getMessage("2"),
                                value: 2
                            }, {
                                name: e.getMessage("3"),
                                value: 3
                            }, {
                                name: e.getMessage("4"),
                                value: 4
                            }, {
                                name: e.getMessage("5"),
                                value: 5
                            }, {
                                name: e.getMessage("6"),
                                value: 6
                            }, {
                                name: e.getMessage("7"),
                                value: 7
                            }, {
                                name: e.getMessage("8"),
                                value: 8
                            }, {
                                name: e.getMessage("9"),
                                value: 9
                            }, {
                                name: e.getMessage("10"),
                                value: 10
                            }, {
                                name: e.getMessage("11"),
                                value: 11
                            }],
                            value: g.values.editor_indentUnit,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Indent_with"),
                            id: "editor_indentWithTabs",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Tabs"),
                                value: "tabs"
                            }, {
                                name: e.getMessage("Spaces"),
                                value: "spaces"
                            }],
                            value: g.values.editor_indentWithTabs,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("TabMode"),
                            id: "editor_tabMode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Classic"),
                                value: "classic"
                            }, {
                                name: e.getMessage("Smart"),
                                value: "smart"
                            }, {
                                name: e.getMessage("Indent"),
                                value: "indent"
                            }],
                            value: g.values.editor_tabMode,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Line_break"),
                            id: "editor_lineWrapping",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_lineWrapping,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Reindent_on_typing"),
                            id: "editor_electricChars",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_electricChars,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Enable_autoSave"),
                            id: "editor_autoSave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_autoSave,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Enable_easySave"),
                            id: "editor_easySave",
                            level: 20,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_easySave,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Highlight_trailing_whitespace"),
                            id: "editor_highlightTrailingWhitespace",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_highlightTrailingWhitespace,
                            desc: ""
                        });
                        c.items.push({
                            name: e.getMessage("Auto_syntax_check_on_typing"),
                            id: "editor_autoLint",
                            level: 50,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.editor_autoLint,
                            desc: e.getMessage("Enable_this_option_to_automatically_check_the_code_on_typing_")
                        });
                        c.items.push({
                            name: e.getMessage("Auto_syntax_check_max_length"),
                            id: "editor_autoLintMaxLen",
                            level: 50,
                            option: !0,
                            text: !0,
                            value: g.values.editor_autoLintMaxLen,
                            desc: e.getMessage("Check_only_scripts_up_to_this_size_automatically_")
                        });
                        h = {
                            name: e.getMessage("Script_Update"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        h.items.push({
                            name: e.getMessage("Check_disabled_scripts"),
                            id: "scriptUpdateCheckDisabled",
                            level: 0,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.scriptUpdateCheckDisabled,
                            desc: ""
                        });
                        h.items.push({
                            name: e.getMessage("Dont_ask_me_for_simple_script_updates"),
                            id: "notification_silentScriptUpdate",
                            level: 80,
                            option: !0,
                            checkbox: !0,
                            enabled: g.values.notification_silentScriptUpdate,
                            desc: ""
                        });
                        h.items.push({
                            name: e.getMessage("Check_interval"),
                            id: "scriptUpdateCheckPeriod",
                            level: 0,
                            option: !0,
                            select: [{
                                name: e.getMessage("Never"),
                                value: 0
                            }, {
                                name: e.getMessage("Every_6_Hours"),
                                value: 216E5
                            }, {
                                name: e.getMessage("Every_12_Hour"),
                                value: 432E5
                            }, {
                                name: e.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: e.getMessage("Every_Week"),
                                value: 6048E5
                            }],
                            value: g.values.scriptUpdateCheckPeriod,
                            desc: ""
                        });
                        h.items.push({
                            name: e.getMessage("Hide_notification_after"),
                            id: "scriptUpdateHideNotificationAfter",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Never"),
                                value: 0
                            }, {
                                name: e.getMessage("15_Seconds"),
                                value: 15E3
                            }, {
                                name: e.getMessage("30_Seconds"),
                                value: 3E4
                            }, {
                                name: e.getMessage("1_Minute"),
                                value: 6E4
                            }, {
                                name: e.getMessage("5_Minutes"),
                                value: 3E5
                            }, {
                                name: e.getMessage("1_Hour"),
                                value: 36E5
                            }],
                            value: g.values.scriptUpdateHideNotificationAfter,
                            desc: ""
                        });
                        d = {
                            name: e.getMessage("Externals"),
                            sub_menu_item: !0,
                            level: 0,
                            items: []
                        };
                        d.items.push({
                            name: e.getMessage("Update_interval"),
                            id: "external_update_interval",
                            level: 0,
                            option: !0,
                            select: [{
                                name: e.getMessage("Always"),
                                value: 1
                            }, {
                                name: e.getMessage("Every_Day"),
                                value: 864E5
                            }, {
                                name: e.getMessage("Every_Week"),
                                value: 6048E5
                            }, {
                                name: e.getMessage("Every_Month"),
                                value: 2592E6
                            }, {
                                name: e.getMessage("Never"),
                                value: 0
                            }],
                            value: g.values.external_update_interval,
                            desc: ""
                        });
                        p = {
                            name: e.getMessage("Security"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        q.OPTIONS.HAS_CSP && (p.items.push({
                            name: e.getMessage("Add_TM_to_CSP"),
                            id: "webrequest_fixCSP",
                            level: 80,
                            option: !0,
                            select: [{
                                name: e.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: e.getMessage("No"),
                                value: "no"
                            }],
                            value: g.values.webrequest_fixCSP,
                            desc: e.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")
                        }), p.items.push({
                            name: e.getMessage("Allow_headers_to_be_modified_by_scripts"),
                            id: "webrequest_modHeaders",
                            level: 80,
                            option: !0,
                            reload: !0,
                            select: [{
                                name: e.getMessage("Yes"),
                                value: "yes"
                            }, {
                                name: e.getMessage("Auto"),
                                value: "auto"
                            }, {
                                name: e.getMessage("No"),
                                value: "no"
                            }],
                            value: g.values.webrequest_modHeaders,
                            warning: e.getMessage("Tampermonkey_needs_to_be_restarted_to_make_this_change_apply_Do_you_want_to_continue_"),
                            desc: ""
                        }));
                        p.items.push({
                            name: e.getMessage("Subresource_Integrity"),
                            id: "require_sri_mode",
                            level: 80,
                            option: !0,
                            select: [{
                                name: e.getMessage("Disabled"),
                                value: "ignore"
                            }, {
                                name: e.getMessage("Validate_if_supported"),
                                value: "supported"
                            }, {
                                name: e.getMessage("Validate_if_given"),
                                value: "given"
                            }, {
                                name: e.getMessage("Enforce"),
                                value: "enforce"
                            }],
                            value: g.values.require_sri_mode,
                            desc: e.getMessage("Script_authors_can_secure_external_resources_by_adding_a_SRI_hash_to_the_URL_")
                        });
                        p.items.push({
                            name: e.getMessage("connect_mode"),
                            id: "connect_mode",
                            level: 50,
                            option: !0,
                            select: (80 <= g.values.configMode || -1 != ["off", "casual"].indexOf(g.values.connect_mode) ? [{
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }, {
                                name: e.getMessage("Casual"),
                                value: "casual"
                            }] : []).concat([{
                                name: e.getMessage("Ask_if_unknown"),
                                value: "ask"
                            }, {
                                name: e.getMessage("Strict"),
                                value: "strict"
                            }, {
                                name: e.getMessage("Always_ask"),
                                value: "paranoid"
                            }]),
                            value: g.values.connect_mode,
                            desc: ""
                        });
                        q.RUNTIME.INCOGNITO_MODE && !rea.extension.inIncognitoContext && (t = "temporary" == g.values.incognito_mode ? {} : {
                            image: "critical",
                            msg: "Permanent mode is still a BETA feature!"
                        }, p.items.push({
                            name: e.getMessage("Store_data_in_incognito_mode"),
                            id: "incognito_mode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Temporary"),
                                value: "temporary"
                            }, {
                                name: e.getMessage("Permanent"),
                                value: "permanent"
                            }],
                            value: g.values.incognito_mode,
                            validation: t
                        }));
                        p.items.push({
                            name: e.getMessage("Page_Filter_Mode"),
                            id: "page_filter_mode",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }, {
                                name: e.getMessage("Blacklist"),
                                value: "black"
                            }, {
                                name: e.getMessage("Whitelist"),
                                value: "white"
                            }, {
                                name: e.getMessage("Both"),
                                value: "black+white"
                            }],
                            value: g.values.page_filter_mode,
                            desc: ""
                        });
                        p.items.push({
                            name: e.getMessage("Whitelisted_Pages"),
                            id: "page_whitelist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: g.values.page_whitelist,
                            desc: ""
                        });
                        p.items.push({
                            name: e.getMessage("Blacklisted_Pages"),
                            id: "forbiddenPages",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: g.values.forbiddenPages,
                            desc: ""
                        });
                        k = {
                            name: e.getMessage("BlackCheck"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        k.items.push({
                            name: e.getMessage("Script_Blacklist_Source"),
                            id: "script_blacklist_type",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }, {
                                name: e.getMessage("Server_And_Manual"),
                                value: "server"
                            }, {
                                name: e.getMessage("Only_Manual"),
                                value: "only_manual"
                            }],
                            value: g.values.script_blacklist_type
                        });
                        k.items.push({
                            name: e.getMessage("Blacklist_Severity"),
                            id: "script_blacklist_severity",
                            level: 50,
                            option: !0,
                            select: [{
                                name: e.getMessage("severity_1"),
                                value: 1
                            }, {
                                name: e.getMessage("severity_2"),
                                value: 2
                            }, {
                                name: e.getMessage("severity_3"),
                                value: 3
                            }, {
                                name: e.getMessage("severity_4"),
                                value: 4
                            }, {
                                name: e.getMessage("severity_5"),
                                value: 5
                            }, {
                                name: e.getMessage("severity_6"),
                                value: 6
                            }, {
                                name: e.getMessage("severity_7"),
                                value: 7
                            }, {
                                name: e.getMessage("severity_8"),
                                value: 8
                            }, {
                                name: e.getMessage("severity_9"),
                                value: 9
                            }, {
                                name: e.getMessage("severity_10"),
                                value: 10
                            }],
                            value: g.values.script_blacklist_severity
                        });
                        k.items.push({
                            name: e.getMessage("Manual_Script_Blacklist"),
                            id: "require_blacklist",
                            level: 50,
                            option: !0,
                            input: !0,
                            array: !0,
                            value: g.values.require_blacklist,
                            desc: ""
                        });
                        if (q.OPTIONS.CAN_DOWNLOAD) {
                            var w = !1;
                            t = {};
                            v.map("exe sh crx com bat scr".split(" "), function(a) {
                                return "name." + a
                            }).forEach(function(a) {
                                w |= E.is_whitelisted(a)
                            });
                            w && (t = {
                                image: "critical",
                                msg: e.getMessage("Your_whitelist_seems_to_include_executable_files_This_means_your_userscripts_may_download_malware_or_spyware_to_your_harddisk_")
                            });
                            r = {
                                name: e.getMessage("Downloads") + " BETA",
                                sub_menu_item: !0,
                                level: 50,
                                items: []
                            };
                            r.items.push({
                                name: e.getMessage("Download_Mode"),
                                id: "downloads_mode",
                                level: 50,
                                option: !0,
                                select: v.select([{
                                    name: e.getMessage("Default"),
                                    value: E.staticVars.DEFAULT
                                }, {
                                    name: e.getMessage("Disabled"),
                                    value: E.staticVars.OFF
                                }, {
                                    name: e.getMessage("Native"),
                                    value: E.staticVars.NATIVE
                                }, {
                                    name: e.getMessage("Browser_API"),
                                    value: rea.downloads.supported ? E.staticVars.CHROME : null
                                }], function(a) {
                                    return a.value
                                }),
                                value: g.values.downloads_mode,
                                desc: e.getMessage("The_Browser_API_mode_requires_a_special_permission_")
                            });
                            r.items.push({
                                name: e.getMessage("Whitelisted_File_Extensions"),
                                id: "downloads_extension_whitelist",
                                level: 50,
                                option: !0,
                                input: !0,
                                array: !0,
                                value: g.values.downloads_extension_whitelist,
                                desc: e.getMessage("Only_files_with_these_extensions_can_be_saved_to_the_harddisk_Be_careful_to_not_allow_file_extensions_that_represent_executables_at_your_operating_system_"),
                                validation: t
                            })
                        }
                        n = {
                            name: e.getMessage("Experimental"),
                            sub_menu_item: !0,
                            level: 80,
                            items: []
                        };
                        n.items.push({
                            name: e.getMessage("strict_mode"),
                            id: "runtime_strict_mode",
                            level: 80,
                            option: !0,
                            select: [{
                                name: e.getMessage("Default"),
                                value: "byscript"
                            }, {
                                name: e.getMessage("Always"),
                                value: "on"
                            }, {
                                name: e.getMessage("Disabled"),
                                value: "off"
                            }],
                            value: g.values.runtime_strict_mode
                        });
                        t = {
                            name: e.getMessage("Userscripts"),
                            sub_menu_item: !0,
                            level: 80,
                            items: []
                        };
                        t.items.push({
                            name: e.getMessage("Script_URL_detection"),
                            id: "scriptUrlDetection",
                            level: 80,
                            option: !0,
                            select: [{
                                name: e.getMessage("Auto"),
                                value: "auto"
                            }, {
                                name: e.getMessage("Disabled"),
                                value: "manual"
                            }],
                            value: g.values.scriptUrlDetection
                        });
                        t.items.push({
                            name: e.getMessage("New_script_template_"),
                            id: "script_templates",
                            level: 80,
                            option: !0,
                            input: !0,
                            array: !0,
                            named: !0,
                            value: g.values.script_templates
                        });
                        x = {
                            name: e.getMessage("Reset_Section"),
                            sub_menu_item: !0,
                            level: 50,
                            items: []
                        };
                        x.items.push({
                            name: e.getMessage("Restart_Tampermonkey"),
                            id: "reset_simple",
                            level: 50,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: e.getMessage("This_will_restart_Tampermonkey_Ok_")
                        });
                        x.items.push({
                            name: e.getMessage("Factory_Reset"),
                            id: "reset_factory",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: e.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")
                        });
                        q.OPTIONS.HAS_TESLA && x.items.push({
                            name: e.getMessage("Chrome_Sync_Reset"),
                            id: "reset_chrome_sync",
                            level: 80,
                            button: !0,
                            reload: !0,
                            value: 0,
                            warning: e.getMessage("This_will_remove_all_stored_data_from_google_sync_Ok_")
                        });
                        fa && x.items.push({
                            name: "Install Tests",
                            id: "install_tests",
                            level: 80,
                            button: !0,
                            reload: !1,
                            ignore: !0,
                            value: 0,
                            warning: "This will install a lot of test scripts!"
                        });
                        return [a, f, b, h, d, void 0, l, m, void 0, c, p, k, r, t, n, x].filter(function(a) {
                            return !!a
                        })
                    }
                }
            }(),
            U = function() {
                return {
                    create: function(a, m) {
                        a = a || "";
                        m = m || {};
                        var c = function(a) {
                                return n.onebyone(a).fail(function() {
                                    l.warn("tree: wait failed!")
                                }).then(function(a) {
                                    return a.filter(function(a) {
                                        return a
                                    })
                                })
                            },
                            d = function(a, b) {
                                for (var c = a.replace(/\.$/, "").split("."), d = h; c.length;) {
                                    var e = c.shift();
                                    if (d[e]) {
                                        if ("function" === typeof d[e]) return function() {
                                            return d[e](m, !b)
                                        };
                                        d = d[e];
                                        c.length || c.unshift("root")
                                    } else return l.warn("tree: unable to find", a, m),
                                        function() {
                                            return n.Pledge([])
                                        }
                                }
                                l.warn("tree: unable to find", a, m);
                                return function() {
                                    return n.Pledge([])
                                }
                            },
                            h = {
                                actions: {
                                    root: function() {
                                        var a = n();
                                        rea.tabs.getSelected(null, function(b) {
                                            m.tab = b;
                                            b = c([d("actions.general"), d("actions.scripts"), d("actions.commands")]);
                                            a.consume(b)
                                        });
                                        return a.promise()
                                    },
                                    general: function() {
                                        var a = m.tab,
                                            b = a ? a.url : null,
                                            c = b && 4 < b.length && "" == b.substr(0, 4).replace(/file|http/, "") ? b : "",
                                            a = [],
                                            d = {
                                                name: "enabled",
                                                sub_menu_item: !0,
                                                pos: "top",
                                                items: []
                                            };
                                        d.items.push({
                                            name: e.getMessage("Enabled"),
                                            display: g.values.enabled ? null : "greyed",
                                            id: "enabled",
                                            button: !0,
                                            reload: !0,
                                            enabler: !0
                                        });
                                        a.push(d);
                                        "manual" == g.values.scriptUrlDetection && la.isScriptUrl(b) && d.items.push({
                                            name: e.getMessage("Install_this_script"),
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
                                            name: e.getMessage("Dashboard"),
                                            image: "utilities",
                                            url: rea.extension.getURL("options.html") +
                                                "#" + ["url=" + H.Base64.encode(c), "nav=dashboard"].join("&"),
                                            newtab: !0
                                        });
                                        c = "version=" + rea.extension.manifest.version + "&ext=" + rea.runtime.short_id;
                                        b.items.push({
                                            image: "info",
                                            urls: [{
                                                name: " " + e.getMessage("Help"),
                                                url: "http://tampermonkey.net/faq.php?" + c,
                                                newtab: !0
                                            }, {
                                                name: " " + e.getMessage("Changelog"),
                                                url: "http://tampermonkey.net/changelog.php?" + c,
                                                newtab: !0
                                            }]
                                        });
                                        a.push(b);
                                        return n.Pledge(a)
                                    },
                                    scripts: function() {
                                        var a = m.tab,
                                            b = a ? a.url : null,
                                            c = [],
                                            d = b && 4 < b.length && "" == b.substr(0, 4).replace(/file|http/, "") ? b : "",
                                            h, l = {
                                                name: "scripts",
                                                sub_menu_item: !0,
                                                pos: "center",
                                                items: []
                                            },
                                            a = w.getUniqueScriptsForTab(a),
                                            u = ia.getContexters(0, null),
                                            a = oa([].concat(a).concat(u)),
                                            x;
                                        "position" != g.values.action_menu_scripts_sort && ("name" == g.values.action_menu_scripts_sort ? x = function(a, b) {
                                            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
                                        } : "enabled" == g.values.action_menu_scripts_sort && (x = function(a, b) {
                                            return b.enabled - a.enabled
                                        }));
                                        g.values.action_menu_scripts_hide_disabled && (a = a.filter(function(a) {
                                            return a.enabled
                                        }));
                                        x && a.sort(x);
                                        !g.values.action_menu_scripts_hide_disabled && 2 < Math.min(g.values.action_menu_columns, q.ACTIONMENU.COLUMNS) ? (h = {
                                            name: "scripts_right",
                                            sub_menu_item: !0,
                                            pos: "right",
                                            items: []
                                        }, a.forEach(function(a) {
                                            (a.enabled ? l : h).items.push(a)
                                        }), c.push(l), h.items.length && c.push(h)) : (h = l, l.items = l.items.concat(a), c.push(l));
                                        g.values.enabled && !a.length && b && (da.isAllowed(b) ? l.items.push({
                                            name: e.getMessage("No_script_is_running"),
                                            image: "info"
                                        }) : l.items.push({
                                            name: e.getMessage("This_page_is_blacklisted_at_the_security_settings"),
                                            image: "critical"
                                        }));
                                        b = e.getLocale();
                                        g.values.enabled && ("3" == g.values.action_menu_columns || 100 > g.values.configMode || !a.length) && (a.length ? (x = {
                                            name: "scripts_new",
                                            sub_menu_item: !0,
                                            pos: "center",
                                            items: []
                                        }, c.push(x)) : x = l, x.items.push({
                                            name: e.getMessage("Get_new_scripts___"),
                                            image: "script_download",
                                            url: "http://tampermonkey.net/scripts.php" + (b ? "?locale=" + b : ""),
                                            newtab: !0
                                        }), x.items.push({
                                            name: e.getMessage("Add_new_script___"),
                                            image: "script_add",
                                            url: rea.extension.getURL("options.html") + "#url=" + H.Base64.encode(d) +
                                                "&nav=new-user-script",
                                            newtab: !0
                                        }));
                                        return n.Pledge(c)
                                    },
                                    commands: function() {
                                        var a = m.tab,
                                            b = [],
                                            c = e.getLocale(),
                                            d = {
                                                name: "commands",
                                                id: "commands",
                                                sub_menu_item: !0,
                                                pos: "left",
                                                items: []
                                            },
                                            h = a.id,
                                            a = [],
                                            h = null == h || void 0 == h ? Y.list() : Y.listByTabId(h),
                                            l;
                                        for (l in h)
                                            if (h.hasOwnProperty(l)) {
                                                var q = h[l];
                                                a.push({
                                                    name: q.name,
                                                    id: q.id,
                                                    accessKey: q.accessKey,
                                                    image: "menu_cmd",
                                                    menucmd: !0
                                                })
                                            }
                                        a.length && (d.items = a);
                                        d.items.push({
                                            name: e.getMessage("Check_for_userscripts_updates"),
                                            id: "run_script_updates",
                                            button: !0,
                                            image: "update"
                                        });
                                        80 <= g.values.configMode && d.items.push({
                                            name: e.getMessage("Report_a_bug"),
                                            image: "bug",
                                            url: "http://tampermonkey.net/bug",
                                            newtab: !0
                                        });
                                        d.items.push({
                                            name: e.getMessage("Please_consider_a_contribution"),
                                            image: "contrib",
                                            url: "http://tampermonkey.net/contrib.php" + (c ? "?locale=" + c : ""),
                                            newtab: !0
                                        });
                                        b.push(d);
                                        return n.Pledge(b)
                                    }
                                },
                                options: {
                                    root: function() {
                                        return c([d("options.general"), d("options.verification"), d("options.scripts"), d("options.settings")])
                                    },
                                    general: function() {
                                        var a = [];
                                        a.push({
                                            name: "Version",
                                            id: null,
                                            version: !0,
                                            value: rea.extension.manifest.version
                                        });
                                        rea.extension.inIncognitoContext && "temporary" == g.values.incognito_mode && a.push({
                                            globalhint: !0,
                                            image: "critical",
                                            value: e.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")
                                        });
                                        return n.Pledge(a)
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
                                        return n.Pledge(a)
                                    },
                                    scripts: {
                                        root: function(a, b) {
                                            var h = n(),
                                                g = {
                                                    name: e.getMessage("Installed_userscripts"),
                                                    main_menu_item: !0,
                                                    scriptTab: !0,
                                                    id: "dashboard"
                                                };
                                            (function() {
                                                if (a.complete || !b) return c(v.map(["options.scripts.natives", "options.scripts.userscripts", "options.scripts.new"], function(a) {
                                                    return d(a)
                                                }));
                                                g.referrer = "options.scripts";
                                                g.partial = !0;
                                                return c([d("options.scripts.new")])
                                            })().done(function(a) {
                                                g.items = a;
                                                h.resolve([g])
                                            }).fail(h.reject);
                                            return h.promise()
                                        },
                                        "new": function() {
                                            var a = [];
                                            a.push({
                                                name: e.getMessage("New_userscript"),
                                                id: null,
                                                image: "script_add",
                                                icon: rea.extension.getURL("images/txt.png"),
                                                nnew: !0,
                                                uuid: "new-user-script",
                                                position: -1,
                                                positionof: q.RUNTIME.MAX_SCRIPTS,
                                                enabled: !0,
                                                userscript: !0
                                            });
                                            return n.Pledge(a)
                                        },
                                        natives: function() {
                                            var a = [],
                                                b = n();
                                            L.getAllUserscripts().always(function(c) {
                                                c = c || [];
                                                c.forEach(function(b) {
                                                    a.push({
                                                        name: b.name,
                                                        uuid: b.id,
                                                        icon: b.icon,
                                                        code: null,
                                                        position: 0,
                                                        positionof: q.RUNTIME.MAX_SCRIPTS,
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
                                                    c = oa(w.determineScriptsToRun(null), !0, c),
                                                    d = c.length,
                                                    h = e.getLocale();
                                                c.push({
                                                    name: e.getMessage("No_script_is_installed"),
                                                    image: "info",
                                                    visible: !d
                                                });
                                                c.push({
                                                    name: e.getMessage("Get_some_scripts___"),
                                                    image: "edit_add",
                                                    url: "http://tampermonkey.net/scripts.php" + (h ? "?locale=" + h : ""),
                                                    newtab: !0,
                                                    visible: !d
                                                });
                                                return n.Pledge(c)
                                            },
                                            source: function(a) {
                                                if (!a.uuid) return n.Pledge([]);
                                                a = z.getByUid(a.uuid);
                                                if (a.script && a.cond) return a = g.values.showFixedSrc ?
                                                    ka.mkCompat(a.script.textContent, a.script, "off" != g.values.runtime_strict_mode) : a.script.textContent, n.Pledge([a]);
                                                l.warn("tree: unable to process ", a);
                                                return n.Breach()
                                            }
                                        }
                                    },
                                    settings: function(a, b) {
                                        var c = n(),
                                            d = {
                                                name: e.getMessage("Settings"),
                                                main_menu_item: !0,
                                                id: "settings",
                                                selected_default: !0
                                            },
                                            h;
                                        a.complete || !b ? h = n.Pledge(Ga.create()) : (d.referrer = "options.settings", h = n.Pledge());
                                        h.done(function(a) {
                                            d.items = a;
                                            c.resolve([d])
                                        }).fail(c.reject);
                                        return c.promise()
                                    }
                                }
                            };
                        l.debug("tree: loading", a, m);
                        return d(a, !0)()
                    }
                }
            }(),
            oa = function(a, e, c) {
                var d = [],
                    h = new y.Script;
                ["author", "copyright"].forEach(function(a) {
                    h[a] = !1
                });
                Object.keys(a).forEach(function(f) {
                    var b = a[f],
                        l;
                    if (e) {
                        l = {};
                        var k = ["textContent", "requires", "resources"];
                        Object.keys(h).forEach(function(a) {
                            -1 == k.indexOf(a) && (v.toType(h[a]), l[a] = b[a])
                        });
                        c ? (l.referrer = c, l.length = b.textContent.length) : l.code = b.textContent;
                        ["requires", "resources"].forEach(function(a) {
                            l[a] = v.map(b[a], function(a) {
                                var c = a.url || A.sanitize(a.unsafe_url, a.abs_url),
                                    d = N.getElement(b.uuid, c),
                                    e = 0,
                                    f =
                                    null,
                                    h = null;
                                d && d.data && (d.data.content && (e = d.data.content.length), h = d.data.sri, f = d.ts);
                                return {
                                    display_url: a.url || a.unsafe_url,
                                    url: c,
                                    data: {
                                        length: e
                                    },
                                    sri: h,
                                    ts: f
                                }
                            })
                        });
                        l.origin = w.determineOrigin(b);
                        l.contexter = w.isContexter(b);
                        l.temp_connects = ea.getSessionConnects(b.uuid)
                    } else l = {
                        name: b.name,
                        uuid: b.uuid,
                        system: b.system,
                        support: !!b.supportURL,
                        origin: !!w.determineOrigin(b),
                        contexter: w.isContexter(b),
                        enabled: b.enabled,
                        position: b.position
                    };
                    l.blacklisted = b.evilness >= g.values.script_blacklist_severity;
                    b.evilness &&
                        (l.warnings = Q.getWarningsFor(w.determineSourceURL(b)));
                    l.file_url = b.downloadURL || b.fileURL;
                    l.positionof = a.length;
                    l.userscript = !0;
                    b.icon64 || b.icon || (l.icon64 = rea.extension.getURL("images/txt.png"));
                    b.options && Object.keys(h.options).forEach(function(a) {
                        l[a] = b.options[a]
                    });
                    d.push(l)
                });
                return d
            },
            pa = {
                copy: function(a) {
                    var e = document.createElement("iframe"),
                        c = document.body || document.documentElement || document;
                    c.appendChild(e);
                    try {
                        e.contentDocument.designMode = "on", "html" == a.type ? (e.setAttribute("sandbox",
                            "allow-same-origin"), e.contentDocument.documentElement.innerHTML = a.content, e.contentDocument.execCommand("selectAll", !1, null)) : e.contentDocument.oncopy = function(c) {
                            c.clipboardData.setData(a.mimetype || "text/plain", a.content);
                            c.preventDefault()
                        }, e.contentDocument.execCommand("copy", !1, null), e.contentDocument.designMode = "off"
                    } catch (d) {
                        l.warn("bg: clipboard Error: " + d.message)
                    }
                    c.removeChild(e);
                    e = null
                }
            };
        clip = pa;
        var T = {
                run: function(a, e) {
                    var c = 1,
                        d = function() {
                            0 == --c && (e && e(), rea.page.reload())
                        };
                    if ("config" ==
                        a) {
                        var h = r.listValues();
                        Object.keys(h).forEach(function(a) {
                            a = h[a]; - 1 == a.search(q.CONSTANTS.PREFIX.SCRIPT) && -1 == a.search(q.CONSTANTS.PREFIX.COND) && -1 == a.search(q.CONSTANTS.PREFIX.STORE) && -1 == a.search(q.CONSTANTS.PREFIX.META) && (c++, r.deleteValue(a).always(d))
                        })
                    } else "factory" == a && (c++, E.remove_permission().done(d), c++, r.factoryReset().always(d));
                    d()
                },
                reset: function(a) {
                    T.run(null, a)
                },
                factoryReset: function(a) {
                    T.run("factory", a)
                },
                configReset: function(a) {
                    T.run("config", a)
                }
            },
            R = function() {
                var a = function() {
                        rea.runtime.lastError &&
                            void 0
                    },
                    m = {
                        init: function() {
                            m.setIcon();
                            var a = g.values.appearance_badge_color || "#ee3131";
                            "#" !== a[0] && (a = "#" + a);
                            rea.browserAction.setBadgeBackgroundColor({
                                color: a
                            })
                        },
                        setIcon: function(c) {
                            var d, h;
                            h = null;
                            var f = d = !1;
                            void 0 === c || B.get.empty(c) || (d = B.get.blocker(c), f = B.get.forbidden(c));
                            f ? (d = "_forbidden", h = e.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")) : d ? (d = "_blocker", h = e.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")) :
                                d = g.values.enabled && void 0 !== c ? "" : "_grey";
                            l.debug("badge: set icon " + d);
                            d = {
                                path: rea.extension.getURL("images/icon" + d + ".png")
                            };
                            h = {
                                title: h ? h : rea.extension.manifest.name
                            };
                            null != c && (d.tabId = c, h.tabId = c);
                            try {
                                rea.browserAction.setIcon(d, a), rea.browserAction.setTitle(h)
                            } catch (b) {
                                l.warn("bg: ERROR while setIcon! " + b.message)
                            }
                        },
                        setBadge: function(a) {
                            var d = 0;
                            "off" == g.values.appearance_badges ? d = 0 : "running" == g.values.appearance_badges ? a && !B.get.empty(a) && (d = B.get.stats(a).running) : "running_unique" == g.values.appearance_badges ?
                                a && !B.get.empty(a) && (d = B.get.stats(a, !0).unique) : "disabled" == g.values.appearance_badges && a && !B.get.empty(a) && (d = B.get.stats(a).disabled);
                            l.debug("badge: set " + d);
                            d ? rea.browserAction.setBadgeText({
                                text: d.toString(),
                                tabId: a
                            }) : rea.browserAction.setBadgeText({
                                text: "",
                                tabId: a
                            })
                        }
                    };
                return m
            }(),
            Z = function() {
                var a = null,
                    e = {
                        init: function() {
                            a = r.getValue(q.CONSTANTS.STORAGE.BEGGING, null);
                            if (!a) {
                                a = {};
                                var c = Date.now(),
                                    d = c;
                                v.each(w.determineScriptsToRun(null), function(a) {
                                    a.lastUpdated && a.lastUpdated < d && (d = a.lastUpdated)
                                });
                                d !== c ? (l.debug("beg: first action found at " + (new Date(d)).toISOString()), a.first_run = {
                                    type: "from_script",
                                    ts: d
                                }) : a.first_run = {
                                    type: "from_init",
                                    ts: c
                                };
                                e.save()
                            }
                        },
                        save: function() {
                            r.setValue(q.CONSTANTS.STORAGE.BEGGING, a)
                        },
                        needed: function() {
                            var c = Date.now(),
                                d = a.first_run ? a.first_run.ts + 12096E5 < c : !0,
                                e = !a.hide,
                                f = !a.contributed,
                                c = a.later ? a.later.ts + 12096E5 < c : !0;
                            return !q.RUNTIME.DOLPHIN && d && e && f && c
                        },
                        clicked: function(a, d, e) {
                            K.tG("clicked", a, d + e)
                        },
                        dialog: {
                            shown: function(c) {
                                var d = Date.now();
                                a.dialog = {
                                    ts: d,
                                    extra: c
                                };
                                e.save();
                                K.tG("dialog")
                            }
                        },
                        button: function() {
                            var c = {};
                            ["contributed", "later", "hide"].forEach(function(d) {
                                c[d] = function(c) {
                                    var f = Date.now();
                                    a[d] = {
                                        ts: f,
                                        extra: c
                                    };
                                    e.save();
                                    K.tG("button", d)
                                }
                            });
                            return c
                        }()
                    };
                return e
            }(),
            ha = function() {
                var a = function(a, b) {
                        l.debug(a, b);
                        if (b && a.menuItemId) {
                            var c = z.getByUid(a.menuItemId);
                            c && c.script ? ta.bundle({
                                url: a.frameUrl || a.pageUrl || "<unknown>"
                            }, c.script, !0).then(function(c) {
                                var d = n();
                                c.method = "executeScript";
                                a.frameUrl ? c.url = A.woHash(a.frameUrl) : c.topframe = !0;
                                rea.tabs.sendMessage(b.id,
                                    c, d.resolve);
                                return d.promise()
                            }) : l.debug("ctxm: unable to find script " + a.menuItemId, a, b)
                        }
                    },
                    e = [],
                    c = null,
                    d = !1,
                    h = function(a) {
                        var b = [];
                        v.each(a, function(a) {
                            var d = n();
                            rea.contextMenus.create({
                                id: a.uuid,
                                contexts: ["all"],
                                parentId: c,
                                title: a.name,
                                type: "normal",
                                documentUrlPatterns: ["http://*/*", "https://*/*", "file://*/*"]
                            }, function() {
                                d.resolve()
                            });
                            e.push(a.uuid);
                            b.push(d.promise())
                        });
                        return n.when(b)
                    },
                    f = function() {
                        var a = n();
                        rea.contextMenus.removeAll(function() {
                            c = null;
                            a.resolve()
                        });
                        return a.promise()
                    },
                    b =
                    function() {
                        var a = n();
                        f().then(function() {
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
                    g = function() {
                        var a = ia.getContexters(0, null);
                        if (a.length) {
                            var d;
                            d = c ? n.Pledge() : b();
                            return d.then(function() {
                                return h(a)
                            })
                        }
                        return f().then(k.clean)
                    },
                    k = {
                        init: function() {
                            rea.contextMenus.supported && (k.clean().then(g).then(function() {
                                d = !0
                            }), rea.contextMenus.onClicked.addListener(a))
                        },
                        clean: function() {
                            var a = n();
                            e.forEach(function(a) {
                                rea.contextMenus.remove(a)
                            });
                            e = [];
                            a.resolve();
                            return a.promise()
                        },
                        onScriptsChanged: function() {
                            if (rea.contextMenus.supported && d) return k.clean().then(g)
                        },
                        getContexterCount: function() {
                            return e.length
                        }
                    };
                return k
            }(),
            qa = function() {
                var a = {},
                    e = ("TM_" + v.createUUID().substr(0, 5)).toLowerCase(),
                    c = ["x-webkit-csp", "x-content-security-policy", "content-security-policy"],
                    d = {
                        getPrefix: function() {
                            return e
                        },
                        onBeforeSendHeaders_xml: function(a) {
                            var c = [];
                            a = a.requestHeaders || [];
                            var b, d = {},
                                g = new RegExp("^" + e);
                            a = a.filter(function(a) {
                                if (a.name && 0 == a.name.search(g)) b = a.name.replace(g, ""), d[b.toLowerCase()] = !0, c.push({
                                    name: b,
                                    value: a.value
                                });
                                else return !0
                            });
                            if (c.length) return {
                                requestHeaders: a.filter(function(a) {
                                    return !a.name || !d[a.name.toLowerCase()]
                                }).concat(c)
                            }
                        },
                        onBeforeRequest_main_frame: function(a) {
                            if (D.late) {
                                if (B.events.reset(a.tabId, !0), 0 < a.tabId && "POST" != a.method && "auto" == g.values.scriptUrlDetection && la.isScriptUrl(a.url)) return w.installFromUrl(a.url, {}, {
                                    silent_fail: !0
                                }).fail(function(c) {
                                    l.info("webRequest: user script detected @ " +
                                        a.url + " was invalid", c ? c.messages : "");
                                    rea.tabs.update(a.tabId, {
                                        url: a.url + "#bypass=true"
                                    }, function() {})
                                }), {
                                    redirectUrl: "javascript:history.back()"
                                }
                            } else D.registerLateCallback(function() {
                                d.onBeforeRequest_main_frame(a)
                            })
                        },
                        onHeadersReceived_frame_xml: function(e) {
                            if (D.late) {
                                var f = e.responseHeaders || [];
                                if ("xmlhttprequest" == e.type) {
                                    if (a[e.requestId]) return f.push({
                                        name: "TM-finalURL" + rea.runtime.short_id,
                                        value: a[e.requestId]
                                    }), delete a[e.requestId], {
                                        responseHeaders: f
                                    }
                                } else {
                                    var b, g, k;
                                    f.forEach(function(a) {
                                        a.name &&
                                            a.value && (a = a.name.toLowerCase(), -1 != c.indexOf(a) ? k = !0 : "location" == a && (g = !0))
                                    });
                                    if (!g && B.events.response(e.tabId, e.frameId, e.url) && k && (f.forEach(function(a, d) {
                                            if (a.name && a.value) {
                                                var e = a.name.toLowerCase();
                                                if (-1 != c.indexOf(e)) {
                                                    var g = !1,
                                                        h, k, e = a.value.split(";").map(function(a, c) {
                                                            var d = a.trim();
                                                            if (0 === d.search(/^script-src /)) {
                                                                h = !0;
                                                                var e = -1 != d.search(/'unsafe-eval'/),
                                                                    f = -1 != d.search(/'none'/);
                                                                if (!e || f) return b = g = !0, d.replace(/script-src /, "script-src 'unsafe-eval' ").replace(/ 'none'/, "")
                                                            } else 0 === d.search(/^default-src /) &&
                                                                (k = {
                                                                    i: c,
                                                                    v: d
                                                                });
                                                            return d
                                                        });
                                                    k && !h && (e.splice(k.i + 1, 0, k.v.replace(/default-src /, "script-src 'unsafe-eval' ").replace(/ 'none'/, "")), b = g = !0);
                                                    f[d] = {
                                                        name: a.name,
                                                        value: g ? e.join(";") : a.value
                                                    }
                                                }
                                            }
                                        }), b)) return {
                                        responseHeaders: f
                                    }
                                }
                            } else D.registerLateCallback(function() {
                                d.onHeadersReceived_frame_xml(e)
                            })
                        },
                        onBeforeRedirect_xml: function(c) {
                            a[c.requestId] = c.redirectUrl
                        },
                        onResponseStarted_frame: function(a) {
                            a.fromCache && B.events.response(a.tabId, a.frameId, a.url)
                        },
                        onErrorOccurredListener_main_frame: function() {
                            var a =
                                /ERR_NAME_NOT_RESOLVED/,
                                c = /^([a-z0-9][a-z0-9\-]*[a-z0-9]\.{0,3})*(\.[a-z0-9\-]{2,15})+$/i,
                                b = v.getDebouncer(3E5);
                            return function(d) {
                                var e, g; - 1 === ["gcal"].indexOf(rea.runtime.short_id) && !q.RUNTIME.EDGE && "http" === d.url.substr(0, 4) && a.exec(d.error) && (e = A.woPath(d.url).replace(/https?:\/\//, "")) && c.exec(e) && !b.is(e, !0) && (g = w.regexify({
                                    inc: ["*.tld/*"]
                                })) && w.validUrl(d.url, g) && (g = B.events.response(d.tabId, d.frameId || 0, d.url), K.tN(e, d.error, g));
                                B.events.reset(d.tabId, !0)
                            }
                        }(),
                        init: function(a) {
                            try {
                                a ? (rea.webRequest.onBeforeRequest.addListener(d.onBeforeRequest_main_frame, {
                                    urls: ["<all_urls>"],
                                    types: ["main_frame"]
                                }, ["blocking"]), rea.webRequest.onHeadersReceived.addListener(d.onHeadersReceived_frame_xml, {
                                    urls: ["<all_urls>"],
                                    types: ["main_frame", "sub_frame", "xmlhttprequest"]
                                }, ["blocking", "responseHeaders"]), rea.webRequest.onBeforeRedirect.addListener(d.onBeforeRedirect_xml, {
                                    urls: ["<all_urls>"],
                                    types: ["xmlhttprequest"]
                                }, []), rea.webRequest.onResponseStarted.addListener(d.onResponseStarted_frame, {
                                    urls: ["<all_urls>"],
                                    types: ["main_frame", "sub_frame"]
                                }, []), rea.webRequest.onErrorOccurred.addListener(d.onErrorOccurredListener_main_frame, {
                                    urls: ["<all_urls>"],
                                    types: ["main_frame"]
                                })) : "no" != g.values.webrequest_modHeaders && rea.webRequest.onBeforeSendHeaders.addListener(d.onBeforeSendHeaders_xml, {
                                    urls: ["<all_urls>"],
                                    types: ["xmlhttprequest"]
                                }, ["blocking", "requestHeaders"]), rea.webRequest.handlerBehaviorChanged()
                            } catch (c) {
                                l.warn("webRequest: error initializings", c.message)
                            }
                        }
                    };
                return d
            }(),
            Ha = function() {
                var a = function(a) {
                    B.events.commited(a.tabId, a.frameId, a.url)
                };
                return {
                    init: function() {
                        rea.webNavigation.supported && rea.webNavigation.onCommitted.addListener(a)
                    }
                }
            }(),
            D = {
                late: !1,
                callbacks: [],
                init: function() {},
                registerLateCallback: function(a) {
                    l.debug("toea: register callback");
                    D.callbacks.push(a)
                },
                setReady: function() {
                    l.debug("toea: run " + D.callbacks.length + " callbacks");
                    D.late = !0;
                    for (var a = 0; a < D.callbacks.length; a++) D.callbacks[a]();
                    D.callbacks = []
                }
            },
            Ia = function() {
                var a = !1,
                    e = null,
                    c = function() {
                        a || (l.debug("Unloader.onbeforeunload()"), e && e(), a = !0)
                    };
                return {
                    init: function(a) {
                        e = a;
                        window.addEventListener("beforeunload", c, !1)
                    }
                }
            }(),
            Ca = function() {
                var a = rea.extension.manifest.version,
                    m = null,
                    c = !1,
                    d = !1,
                    h = function() {
                        if (D.late) {
                            var b = "version=" + a + "&ext=" + rea.runtime.short_id + "&updated=true",
                                f;
                            c ? (f = "http://tampermonkey.net/installed.php?" + b, d = !0) : (b += "&old=" + m, f = "http://tampermonkey.net/changelog.php?" + b);
                            "off" != g.values.notification_showUpdate && ("notification" == g.values.notification_showUpdate ? P.showUpdate(e.getMessage("Updated_to__0version0", a), e.getMessage("Click_here_to_see_the_recent_changes"), rea.extension.getURL("images/icon128.png"), function(a) {
                                a.clicked && rea.tabs.create({
                                        url: f
                                    },
                                    function() {})
                            }) : "changelog" == g.values.notification_showUpdate && (d || (f += "&intr=true"), d = !0, rea.tabs.create({
                                url: f,
                                active: d
                            }, function() {})))
                        } else D.registerLateCallback(h)
                    },
                    f = function() {
                        var a = null,
                            b, c = n(),
                            d = function(d) {
                                b && (d || null !== a) && (d || window.clearTimeout(b), b = null, c.resolve(!!a))
                            };
                        rea.idle.queryState(q.MISC.IDLE_TIMEOUT, function(b) {
                            a = "active" == b;
                            d()
                        });
                        b = window.setTimeout(function() {
                            d(!0)
                        }, 300);
                        return c.promise()
                    },
                    b = function(a) {
                        D.late ? (l.debug("upd: onInstalled", a), a || (a = {
                                reason: "mandatory_argument_is_not_set"
                            }),
                            "chrome_update" == a.reason ? K.tB({
                                updated: !0
                            }) : "install" != a.reason && "update" != a.reason || u.scheduleNotification(a.previousVersion, "install" == a.reason)) : D.registerLateCallback(function() {
                            b(a)
                        })
                    },
                    p = function() {
                        var a = n(),
                            b = function() {
                                var b = Date.now(),
                                    c = r.getValue(q.CONSTANTS.STORAGE.LAST_START, 0),
                                    b = Math.round((b - c) / 1E3),
                                    c = b <= q.MISC.DISTURBANCE_ALLOWED;
                                l.debug("upd: restart?", c, "(", b, "seconds ago)");
                                a.resolve(c)
                            };
                        D.late ? b() : D.registerLateCallback(b);
                        return a.promise()
                    }(),
                    k = function() {
                        var a = !1,
                            b = !1;
                        f().then(function(a) {
                            b =
                                a;
                            return p
                        }).then(function(b) {
                            a = b
                        }).always(function() {
                            d = !b || a;
                            h();
                            v = !0
                        })
                    },
                    t = null,
                    v = !1,
                    u = {
                        scheduleNotification: function(a, b) {
                            v || (m = a, c |= b, t && window.clearTimeout(t), t = window.setTimeout(k, 1E3))
                        }
                    };
                rea.runtime.onInstalled.addListener(b);
                rea.runtime.onUpdateAvailable.addListener(function(a) {
                    l.info("An update to version", a.version, "is available");
                    window.setTimeout(function() {
                        P.show(e.getMessage("Update"), e.getMessage("0name0_0version0_is_available__Please_re_start_your_browser_to_update_", rea.extension.manifest.name,
                            a.version), rea.extension.getURL("images/icon128.png"), 6E4)
                    }, 864E5)
                });
                (function() {
                    D.registerLateCallback(function() {
                        r.setValue(q.CONSTANTS.STORAGE.LAST_START, Date.now())
                    })
                })();
                return u
            }(),
            Ja = function(a) {
                "toggle-enable" == a && (g.values.enabled = !g.values.enabled)
            },
            za = function(a, e, c) {
                D.late ? ("auto" == g.values.scriptUrlDetection && la.isScriptUrl(c.url) && w.installFromUrl(c.url), c.url ? "loading" == e.status ? B.events.loading(c.id, 0, c.url) : "complete" == e.status && B.events.complete(c.id, 0, c.url) : l.warn("tabUpdateListener: no tab url set! ",
                    c)) : window.setTimeout(function() {
                    za(a, e, c)
                }, 100)
            },
            Ka = function(a, e) {
                Aa(e, {});
                R.setIcon(a);
                R.setBadge(a)
            },
            Aa = function(a, e) {
                V[a] && (V[a].onClose(), delete V[a]);
                B.events.remove(a)
            },
            va = function() {
                var a = "temporary" == g.values.incognito_mode && rea.extension.inIncognitoContext;
                r.setTemporary(a);
                a && (g.values.native_import = !1, g.values.sync_enabled = !1, g.values.scriptUpdateCheckPeriod = 0, g.values.sync_type = 0, g.values.statistics_enabled = !1)
            },
            La = function() {
                l.set(g.values.logLevel);
                e.setLocale(g.values.i18n);
                L.setPath(g.values.native_import_path);
                K.init("bg", rea.extension.manifest.version);
                K.setEnabled(g.values.statistics_enabled);
                B.listeners.add.onReset(function(a, c) {
                    Y.clearByTabId(a);
                    z.removeStorageListeners({
                        tabid: a
                    }, !1);
                    c || R.setIcon(a)
                });
                var a = function(a) {
                    R.setIcon(a);
                    R.setBadge(a)
                };
                B.listeners.add.onCommited(a);
                B.listeners.add.onCompleted(a);
                B.listeners.add.onCompleted(ea.purgeAppeals);
                B.listeners.add.onRemoved(ea.purgeAppeals);
                G.init().done(function(a) {
                    a && G.sync()
                });
                da.init();
                Q.init();
                z.init();
                a = function() {
                    E.set_mode(g.values.downloads_mode);
                    E.set_whitelist(g.values.downloads_extension_whitelist)
                };
                a();
                E.config_changed_listener = a;
                Ha.init();
                na.init();
                qa.init();
                ha.init();
                Z.init();
                X.init()
            },
            H, ja, ma, ka, y, I, fa;
        init = function() {
            D.init();
            qa.init(!0);
            rea.tabs.onUpdated.addListener(za);
            rea.tabs.onReplaced.addListener(Ka);
            rea.tabs.onRemoved.addListener(Aa);
            rea.extension.onMessage.addListener(aa.handler);
            rea.extension.onConnect.addListener(xa);
            rea.extension.onConnectExternal.addListener(function(a) {
                a.disconnect()
            });
            rea.commands.supported && rea.commands.onCommand.addListener(Ja);
            Ia.init(function() {
                G.finalize()
            });
            H = Registry.get("convert");
            ma = Registry.get("xmlhttprequest", qa.getPrefix(), q.RUNTIME.FIREFOX);
            ja = ma.run;
            ka = Registry.get("compat", q);
            y = Registry.get("parser");
            I = Registry.get("syncinfo");
            fa = Registry.get("test");
            rea.browserAction.setIcon({
                path: rea.extension.getURL("images/icon_grey.png")
            });
            rea.browserAction.setPopup({
                popup: "action.html"
            });
            rea.browserAction.setTitle({
                title: "Tampermonkey"
            });
            r.init().then(function() {
                return Da()
            }).then(function() {
                return g.init()
            }).then(function() {
                cfgo =
                    g;
                va();
                La();
                Fa();
                R.init();
                window.setTimeout(X.check, 1E4);
                l.debug("Listeners registered!");
                window.setTimeout(D.setReady, 1);
                if (fa && Registry.isDevVersion("test")) {
                    var a = fa.framework.prepare(w.doSave, q.RUNTIME.BROWSER, q.RUNTIME.BROWSER_VERSION);
                    a && l.error(a)
                }
            })
        };
        init()
    }
});
