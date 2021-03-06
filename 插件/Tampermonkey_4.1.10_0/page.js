Registry.registerRaw("page.js", "5271", {
    inject: function(a) {
        var v = document.createElement("script");
        v.textContent = a;
        (document.head || document.body || document.documentElement || document).appendChild(v);
        v.parentNode.removeChild(v)
    },
    backup: function(a, v, k, D) {
        var c = {
                safeWindow: {},
                safeDocument: {},
                eval: eval,
                Context: {
                    D: D
                },
                exec_fn: function(a, b, I) {
                    m(new c.safeWindow.Function(a), b, I)
                },
                exec_csp: function(a, b, I) {
                    var g = "__u__" + 19831207 * c.Context.M_r();
                    c.Message.send("csp", {
                        id: g,
                        src: a
                    });
                    c.exec_script(g, b,
                        I)
                },
                exec_script: function(a, b, c) {
                    var g = window[a];
                    delete window[a];
                    m(g, b, c)
                }
            },
            m, b, x, A, l;
        (function() {
            var d = function(a) {
                    var b = function(b) {
                        return m(a, b, m(x.wrappedJSObject, arguments, [1]))
                    };
                    b.wrappedJSObject = a;
                    return b
                },
                K = {
                    F_a: m = function() {
                        var b = a.Function.apply;
                        return function(a, c, d) {
                            a.apply === b ? c = a.apply(c, d) : (a[k] = b, c = a[k](c, d), delete a[k]);
                            return c
                        }
                    }(),
                    E_u: function(b, d) {
                        var k = "__u__" + (19831206 * c.Context.M_r() + 1);
                        if (c.exec_eval) {
                            var m = k + "_";
                            window[m] = d;
                            var e = c.Context.F_c(c.Context.eval, window, "(function() {" +
                                b + '}).apply(window["' + m + '"])');
                            delete a[k];
                            delete a[m];
                            return e
                        }
                        c.exec_csp(b, d)
                    },
                    F_c: d(a.Function.call),
                    F_b: b = d(a.Function.bind),
                    F_tS: d(a.Function.toString),
                    A_fE: d(a.Array.prototype.forEach),
                    A_sl: x = d(a.Array.prototype.slice),
                    A_sp: d(a.Array.prototype.splice),
                    A_sh: d(a.Array.prototype.shift),
                    A_j: d(a.Array.prototype.join),
                    A_pu: d(a.Array.prototype.push),
                    A_po: d(a.Array.prototype.pop),
                    A_m: d(a.Array.prototype.map),
                    A_c: d(a.Array.prototype.concat),
                    A_f: d(a.Array.prototype.filter),
                    A_iO: d(a.Array.prototype.indexOf),
                    O_k: a.Object.keys,
                    O_dP: a.Object.defineProperties,
                    O_gOPN: a.Object.getOwnPropertyNames,
                    O_gOPD: a.Object.getOwnPropertyDescriptor,
                    O_dG: d(a.Object.prototype.__defineGetter__),
                    O_dS: d(a.Object.prototype.__defineSetter__),
                    O_tS: d(a.Object.prototype.toString),
                    J_p: l = a.JSON.parse,
                    J_s: A = a.JSON.stringify,
                    c_l: a.console.log.bind(a.console),
                    c_i: a.console.info.bind(a.console),
                    c_w: a.console.warn.bind(a.console),
                    c_e: a.console.error.bind(a.console),
                    c_d: a.console.debug.bind(a.console),
                    M_f: a.Math.floor,
                    M_r: a.Math.random,
                    M_m: a.Math.max,
                    N_tS: d(a.Number.prototype.toString),
                    R_rAAB: d(a.FileReader.prototype.readAsArrayBuffer),
                    S_fCC: a.String.fromCharCode,
                    S_m: d(a.String.prototype.match),
                    S_su: d(a.String.prototype.substr),
                    S_sp: d(a.String.prototype.split),
                    S_r: d(a.String.prototype.replace),
                    S_cCA: d(a.String.prototype.charCodeAt),
                    S_tLC: d(a.String.prototype.toLowerCase),
                    S_tUC: d(a.String.prototype.toUpperCase),
                    D_pFS: d(a.DOMParser.prototype.parseFromString),
                    X_o: d(a.XMLHttpRequest.prototype.open),
                    X_sRH: d(a.XMLHttpRequest.prototype.setRequestHeader),
                    X_oMT: d(a.XMLHttpRequest.prototype.overrideMimeType),
                    X_gARH: d(a.XMLHttpRequest.prototype.getAllResponseHeaders),
                    X_gRH: d(a.XMLHttpRequest.prototype.getResponseHeader),
                    X_s: d(a.XMLHttpRequest.prototype.send),
                    X_a: d(a.XMLHttpRequest.prototype.abort),
                    D_n: a.Date.now
                };
            Object.keys(K).forEach(function(a) {
                c.Context[a] = K[a]
            });
            "String Array Object Number parseInt JSON Math Date Event MutationEvent console location Error Uint8Array Blob FileReader DOMParser XMLHttpRequest Function RegExp frames self top document location".split(" ").forEach(function(b) {
                c.safeWindow[b] =
                    a[b]
            });
            "postMessage addEventListener removeEventListener setTimeout setInterval clearTimeout clearInterval alert prompt confirm encodeURIComponent decodeURIComponent encodeURI decodeURI escape unescape atob btoa close".split(" ").forEach(function(b) {
                var d = a[b];
                c.safeWindow[b] = function() {
                    return m(d, a, arguments)
                }
            });
            c.createSafeDocument = function(a) {
                ["createEvent", "createElement", "dispatchEvent", "addEventListener", "removeEventListener"].forEach(function(b) {
                    var d = a[b];
                    c.safeDocument[b] = function() {
                        return m(d,
                            a, arguments)
                    }
                })
            };
            c.createSafeDocument(v)
        })();
        try {
            c.Message = function(a, b) {
                var c = function() {
                        return m(b.dispatchEvent, b, arguments)
                    },
                    g = function() {
                        return m(b.addEventListener, b, arguments)
                    },
                    k = function() {
                        return m(b.removeEventListener, b, arguments)
                    },
                    v = function(a, c) {
                        var d = b.createEvent("MutationEvent");
                        d.initMutationEvent(a, !1, !1, null, null, null, A(c), d.ADDITION);
                        return d
                    },
                    e = function(a, b) {
                        var c;
                        a && (c = W[a]) && (c(b), delete W[a])
                    },
                    x, D, J, O, ba = 1,
                    W = {};
                return {
                    init: function(a) {
                        O || (O = a);
                        J = "2C_" + O;
                        D = "2P_" + O;
                        g(D, function(a) {
                            var b =
                                l(a.attrName);
                            "message.response" == b.m ? e(b.r, b.a) : x && x(b, b.r ? function(a) {
                                a = v(J, {
                                    m: "message.response",
                                    a: a,
                                    r: b.r
                                });
                                c(a)
                            } : function() {})
                        }, !1)
                    },
                    send: function(a, b, d) {
                        if (d) {
                            var e = ++ba;
                            W[ba] = d;
                            d = e
                        } else d = null;
                        a = v(J, {
                            m: a,
                            a: b,
                            r: d
                        });
                        c(a)
                    },
                    onMessage: {
                        addListener: function(a) {
                            x = a
                        }
                    },
                    cleanup: function() {
                        k(D, x, !1)
                    }
                }
            }(c.safeWindow, c.safeDocument), c.Message.init(k), c.Message.onMessage.addListener(function(a) {
                if (c)
                    if ("load" == a.m) c.Context.pageLoaded = !0;
                    else if ("DOMContentLoaded" == a.m) c.Context.domContentLoaded = !0;
                else if ("cleanup" ==
                    a.m) c.Message.cleanup(), c = null;
                else if ("next" == a.m)
                    if (a.a.id) c.exec_script(a.a.id, c), c.exec_eval = !1;
                    else {
                        if (void 0 === c.exec_eval) try {
                            c.exec_eval = b(c.eval, window)("true")
                        } catch (k) {
                            c.exec_eval = !1
                        }
                        c.exec_eval ? c.exec_fn(a.a.src, c) : c.exec_csp(a.a.src, c)
                    }
            })
        } catch (d) {}
    },
    next: function(a, v, k, D, c, m, b, x, A, l, d, K, I, g, ja) {
        var G = "";
        x && (G += "var V = true;\n");
        l && (G += "var EV = true;\n");
        A && (G += "var ENV = true;\n");
        l = "";
        if (I || "complete" == document.readyState) l += "Context.pageLoaded |= true;\nContext.domContentLoaded |= true;\n";
        else if (g || "interactive" == document.readyState) l += "Context.domContentLoaded |= true;\n";
        return ['var backup = this;\n(function TM_back() {var Context = backup.Context;\nvar copy = function(src) {"use strict";var props = Context.O_gOPN(src);for (var kk, ii=0; (kk=props[ii]) !== undefined; ii++) {Context[kk] = src[kk];};};copy(backup);with (Context) {(function() {"use strict";copy({Context: Context,V:', x ? "true" : "false", ",ENV:", A ? "true" : "false", ",TS:", d ? "true" : "false", ",D:", K ? "true" : "false", ",use:", m,
            ",windowProps:", D, ",scripts:", v, ",powers:", k, ",_content: false,flags:", c, ',write_listeners: []});var cleanup = function(evt) {Message.cleanup();safeWindow.removeEventListener("unload", cleanup, false);};safeWindow.addEventListener("unload", cleanup, false);Context.write_listeners.push(function(d) {Context.createSafeDocument(d);Message.init();});', G + ("var logLevel = " + b + ";\n") + ('var contextId = "' + a + '";\n') + "var Event = function() {};var Window = function() {};Window.prototype = {};" + l + "(" + ja + ")(Context, contextId);\n",
            "})();};})()"
        ].join("")
    },
    environment: function(a, v) {
        var k = a.V,
            D = a.EV,
            c = a.D,
            m = a.Message,
            b = a.safeWindow,
            x = a.safeDocument,
            A = a.flags,
            l = a.F_a,
            d = a.F_c,
            K = a.F_b,
            I = a.F_tS,
            g = a.A_fE,
            ja = a.A_sl,
            G = a.A_sp,
            e = a.A_pu,
            xa = a.A_po,
            la = a.A_sh,
            J = a.A_j,
            O = a.A_f,
            ba = a.A_iO,
            W = a.A_m,
            wa = a.A_c,
            B = a.O_k,
            V = a.O_dP,
            ya = a.O_gOPN,
            ma = a.O_gOPD,
            ca = a.O_dG,
            na = a.O_dS,
            za = a.O_tS,
            X = a.J_p,
            da = a.J_s,
            t = a.c_l,
            Aa = a.c_i,
            L = a.c_w,
            Y = a.c_e,
            r = a.c_d,
            Ba = a.M_f,
            ea = a.M_r,
            oa = a.M_m,
            fa = a.S_fCC,
            ga = a.S_m,
            Z = a.S_su,
            pa = a.S_sp,
            R = a.S_r,
            qa = a.S_cCA,
            ra = a.S_tLC,
            Ca = a.S_tUC,
            Da = a.R_rAAB,
            Ea = a.D_pFS,
            Fa = a.X_o,
            Ga = a.X_sRH,
            Ha = a.X_oMT,
            Ia = a.X_gARH,
            Ja = a.X_gRH,
            Ka = a.X_s,
            La = a.X_a,
            Ma = a.N_tS,
            ha = a.D_n;
        a.domContentLoaded |= 0;
        a.pageLoaded |= 0;
        a.domNodeInserted |= 0;
        a.props = {};
        var S = function() {
            var d = [],
                aa = function(a) {
                    if (document.body) a && (a(), a = null);
                    else {
                        var b = ["load", "DOMNodeInserted", "DOMContentLoaded"],
                            c = function() {
                                g(b, function(a) {
                                    x.removeEventListener(a, c, !1)
                                });
                                aa(a)
                            };
                        g(b, function(a) {
                            x.addEventListener(a, c, !1)
                        })
                    }
                },
                Na = function(c) {
                    e(d, function() {
                        b.setTimeout(c, 1)
                    });
                    a.domContentLoaded && k.runListeners()
                },
                k = {
                    runListeners: function() {
                        for (var a; a = la(d);) a()
                    },
                    run: function(b) {
                        var u = function() {
                            Oa.create(b)
                        };
                        "document-start" == b.script.options.run_at ? (c && r('env: run "' + b.script.name + '" ASAP -> document-start'), u()) : "document-body" == b.script.options.run_at ? (c && r('env: schedule "' + b.script.name + '" for document-body'), aa(u)) : "context-menu" == b.script.options.run_at ? (c && r('env: run "' + b.script.name + '" ASAP -> context-menu'), u()) : "document-end" == b.script.options.run_at ? (c && r('env: schedule "' + b.script.name + '" for document-end'),
                            e(d, u), a.domContentLoaded && k.runListeners()) : (c && r('env: schedule "' + b.script.name + '" for document-idle'), Na(u))
                    }
                };
            return k
        }();
        (k || c) && r("env: initialized (content, id:" + Z(v, 0, 10) + "..., " + b.location.origin + b.location.pathname + ") ");
        var U = {
                createUUID: function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                        var b = 16 * ea() | 0;
                        return Ma("x" == a ? b : b & 3 | 8, 16)
                    })
                },
                toType: function(a) {
                    return ga(za(a, {}), new b.RegExp("\\s([a-z|A-Z]+)"))[1]
                }
            },
            P = {
                UTF8: {
                    encode: function(a) {
                        return b.unescape(b.encodeURIComponent(a))
                    },
                    decode: function(a) {
                        return b.decodeURIComponent(b.escape(a))
                    }
                },
                Base64: {
                    encode: function(a) {
                        for (var c = "", d = 0; d < a.length; d++) c += fa(qa(a, d) & 255);
                        return b.btoa(c)
                    },
                    decode: function(a) {
                        return b.atob(a)
                    }
                },
                str2arrbuf: function(a) {
                    for (var c = new b.Uint8Array(a.length), d = 0; d < a.length; d++) c[d] = qa(a, d);
                    return c.buffer
                },
                arrbuf2str: function(a) {
                    var c = "";
                    a = new b.Uint8Array(a);
                    for (var d = 0; d < a.length; d += 32687) c += l(fa, null, a.subarray(d, d + 32687));
                    return c
                }
            },
            Q = function() {
                var a = {},
                    b, d = function(b) {
                        var c = [],
                            d = [],
                            k = function() {
                                aa =
                                    d = c = null;
                                delete a[b]
                            },
                            aa = {
                                postMessage: function(a) {
                                    m.send("port.message", {
                                        response_id: b,
                                        value: a
                                    })
                                },
                                onMessage: {
                                    addListener: function(a) {
                                        e(c, a)
                                    }
                                },
                                onDisconnect: {
                                    addListener: function(a) {
                                        e(d, a)
                                    }
                                },
                                disconnect: function() {
                                    m.send("port.message", {
                                        response_id: b,
                                        disconnect: !0
                                    });
                                    k()
                                }
                            };
                        a[b] = {
                            message: function(a) {
                                c && g(c, function(b) {
                                    b(a)
                                })
                            },
                            disconnect: function(a) {
                                d && g(d, function(b) {
                                    b(a)
                                });
                                k()
                            }
                        };
                        return aa
                    };
                return {
                    message: function(e) {
                        var k;
                        e.connect ? b && b(e.destination, d(e.response_id)) : (k = a[e.response_id]) ? e.disconnect ?
                            k.disconnect() : k.message(e.value) : c && L("ports: unkown id", e.response_id, e)
                    },
                    connect: function(a) {
                        var b = U.createUUID();
                        m.send("port.message", {
                            response_id: b,
                            connect: !0,
                            destination: a
                        });
                        return d(b)
                    },
                    onConnect: {
                        addListener: function(a) {
                            b = a
                        }
                    }
                }
            }(),
            ka = function() {
                var a = {
                    objs: {},
                    push: function(b, c) {
                        0 !== c && 1 !== c && (c = 0);
                        var d = Ba(19831206 * ea() + 1);
                        a.objs[d] = {
                            fn: b,
                            prio: c
                        };
                        return d
                    },
                    remove: function(b) {
                        delete a.objs[b]
                    },
                    get: function(b) {
                        for (var c = [], d = 0; 1 >= d; d++) g(B(a.objs), function(k) {
                            a.objs[k].prio !== d || void 0 !== b &&
                                k != b || e(c, a.objs[k].fn)
                        });
                        return void 0 === b ? c : c[0]
                    },
                    finalize: function(b) {
                        if (void 0 === b) {
                            b = a.get();
                            for (var c = 0; c < b.length; c++) b[c]()
                        } else return a.objs[b] && (c = a.objs[b].fn(), delete a.objs[b]), c
                    }
                };
                return a
            }(),
            N = function() {
                var a = function() {
                        var a = 0,
                            c = {},
                            d = {
                                register: function(e, g, m) {
                                    var l = Q.connect("registerMenuCommand");
                                    l.onMessage.addListener(function(a) {
                                        "run" === a && b.setTimeout(g, 1)
                                    });
                                    l.onDisconnect.addListener(function() {
                                        d.unregister(C)
                                    });
                                    l.postMessage({
                                        method: "register",
                                        name: e,
                                        accessKey: m
                                    });
                                    k && t("env: registerMenuCommand " +
                                        I(g));
                                    var C = ++a;
                                    c[C] = l.disconnect;
                                    return C
                                },
                                unregister: function(a) {
                                    k && t("env: registerMenuCommand " + a);
                                    var b;
                                    if (b = c[a]) b(), delete c[a]
                                }
                            };
                        return d
                    }(),
                    d = function(a, b) {
                        var d = null,
                            k = !1,
                            g = null,
                            m, l = function() {
                                var a = [];
                                return {
                                    run: function(b) {
                                        b && e(a, b);
                                        if (d)
                                            for (; a.length;) xa(a)()
                                    }
                                }
                            }(),
                            C = Q.connect("openInTab");
                        C.onMessage.addListener(function(a) {
                            a.tabId ? k ? H() : (d = a.tabId, l.run()) : a.name ? m = a.name : a.close && (k = !0, g && (g(), g = void 0))
                        });
                        C.onDisconnect.addListener(function() {
                            C = null
                        });
                        C.postMessage({
                            method: "openTab",
                            url: a,
                            options: b
                        });
                        var H = function() {
                                C && C.postMessage({
                                    method: "closeTab"
                                })
                            },
                            z = {};
                        V(z, {
                            close: {
                                value: function() {
                                    k ? c && r("env: attempt to close already closed tab!") : (k = !0, H())
                                }
                            },
                            closed: {
                                get: function() {
                                    return k
                                }
                            },
                            onclose: {
                                get: function() {
                                    return g
                                },
                                set: function(a) {
                                    g = a
                                }
                            },
                            name: {
                                get: function() {
                                    return m
                                },
                                set: function(a) {
                                    l.run(function() {
                                        C && C.postMessage({
                                            method: "nameTab",
                                            name: a
                                        })
                                    })
                                }
                            }
                        });
                        return z
                    },
                    x = function(a, b) {
                        var c = "Object" === U.toType(a) ? a : {
                                url: a,
                                name: b
                            },
                            d = function(a, b) {
                                b = b || {};
                                a && setTimeout(function() {
                                    l(a,
                                        b, [b])
                                }, 1)
                            },
                            e = Q.connect("download");
                        e.onMessage.addListener(function(a) {
                            try {
                                a.load ? c.onload && d(c.onload, a.data) : a.progress ? c.onprogress && d(c.onprogress, a.data) : a.timeout ? c.ontimeout && d(c.ontimeout, a.data) : c.onerror && d(c.onerror, a.data)
                            } catch (b) {
                                t("env: Error: TM_download - ", b, c)
                            }
                        });
                        e.onDisconnect.addListener(function() {
                            e = null
                        });
                        e.postMessage({
                            details: c
                        });
                        return {
                            abort: function() {
                                e && e.disconnect();
                                e = null
                            }
                        }
                    },
                    D = {};
                return {
                    log: t,
                    addStyle: function(a, b) {
                        m.send("addStyle", {
                            css: a
                        }, b ? function() {
                            b()
                        } : null)
                    },
                    closeTab: function(a) {
                        m.send("closeTab", null, a ? function() {
                            a()
                        } : null)
                    },
                    focusTab: function(a) {
                        m.send("focusTab", null, a ? function() {
                            a()
                        } : null)
                    },
                    setClipboard: function(a, b, c) {
                        m.send("setClipboard", {
                            content: a,
                            info: b,
                            id: v
                        }, c ? function() {
                            c()
                        } : null)
                    },
                    syntaxCheck: function(a, b) {
                        m.send("syntaxCheck", {
                            code: a
                        }, function(a) {
                            b(a)
                        })
                    },
                    of: function(r) {
                        var u = r.script,
                            F = function() {
                                var a = [],
                                    d = r.storage,
                                    z = 0,
                                    y = function(a, c) {
                                        if ("string" === typeof a) {
                                            var d = a[0];
                                            a = Z(a, 1);
                                            switch (d) {
                                                case "b":
                                                    return "true" === a;
                                                case "n":
                                                    return b.Number(a);
                                                case "o":
                                                    try {
                                                        return X(a)
                                                    } catch (p) {
                                                        t("values: parseValueFromStorage: " + p)
                                                    }
                                                    return c;
                                                default:
                                                    return a
                                            }
                                        } else return c
                                    },
                                    T = function(b, d, sa, p) {
                                        d != sa && g(a, function(a) {
                                            if (a && a.key == b && a.cb) try {
                                                a.cb(b, y(d), y(sa), p)
                                            } catch (z) {
                                                c && L('values: change listener of "' + b + '" failed with: ' + z.message)
                                            }
                                        })
                                    },
                                    M = function(a) {
                                        f.postMessage({
                                            method: "saveStorageKey",
                                            uuid: u.uuid,
                                            key: a,
                                            value: d.data[a],
                                            id: v,
                                            ts: d.ts
                                        })
                                    },
                                    f = Q.connect("values");
                                f.onMessage.addListener(function(a) {
                                    a.storage && g(B(a.storage.data), function(b) {
                                        var c = d.data[b];
                                        d.data[b] = a.storage.data[b];
                                        var p = d.data[b];
                                        k && t("values: message - config key " + b + ": " + c + " -> " + p);
                                        T(b, c, p, !0)
                                    });
                                    a.removed && (d[a.removed] = void 0)
                                });
                                f.onDisconnect.addListener(function() {
                                    c && t("values: port disconnected")
                                });
                                f.postMessage({
                                    method: "addStorageListener",
                                    uuid: u.uuid,
                                    id: v
                                });
                                return {
                                    set: function(a, b) {
                                        var c = d.data[a];
                                        d.ts = ha();
                                        var p = d.data,
                                            h;
                                        a: {
                                            h = b;
                                            var z = (typeof h)[0];
                                            switch (z) {
                                                case "o":
                                                    try {
                                                        h = z + da(h)
                                                    } catch (C) {
                                                        t(C);
                                                        h = void 0;
                                                        break a
                                                    }
                                                    break;
                                                default:
                                                    h = z + h
                                            }
                                        }
                                        p[a] = h;
                                        M(a);
                                        T(a, c, d.data[a], !1)
                                    },
                                    get: function(a,
                                        b) {
                                        return y(d.data[a], b)
                                    },
                                    remove: function(a) {
                                        var b = d.data[a];
                                        d.ts = ha();
                                        delete d.data[a];
                                        M(a);
                                        T(a, b, d.data[a], !1)
                                    },
                                    list: function() {
                                        return B(d.data)
                                    },
                                    registerChangeListener: function(b, c) {
                                        var d = ++z;
                                        e(a, {
                                            id: d,
                                            key: b,
                                            cb: c
                                        });
                                        return d
                                    },
                                    unregisterChangeListener: function(b) {
                                        a = O(a, function(a) {
                                            return a.id !== b ? !0 : !1
                                        })
                                    }
                                }
                            }(),
                            G = function() {
                                return {
                                    getText: function(a) {
                                        for (var b = 0; b < u.resources.length; b++) {
                                            var c = u.resources[b];
                                            if (c.name == a && !c.failed) {
                                                try {
                                                    if (null !== c.content) return P.UTF8.decode(c.content)
                                                } catch (d) {}
                                                return ""
                                            }
                                        }
                                        return null
                                    },
                                    getURL: function(a) {
                                        for (var b = 0; b < u.resources.length; b++) {
                                            var c = u.resources[b];
                                            if (c.name == a && !c.failed) {
                                                if (null === c.content) return "";
                                                try {
                                                    return "data:" + (c.meta || "application") + ";base64," + P.Base64.encode(c.content)
                                                } catch (d) {}
                                                return c.url
                                            }
                                        }
                                        return null
                                    }
                                }
                            }(),
                            I = function() {
                                return {
                                    set: function(a, b) {
                                        m.send("tabsSet", {
                                            uuid: u.uuid,
                                            tab: a
                                        }, b ? function() {
                                            b()
                                        } : null)
                                    },
                                    get: function(a) {
                                        m.send("tabsGet", {
                                            uuid: u.uuid
                                        }, a ? function(b) {
                                            a(b || {})
                                        } : null)
                                    },
                                    getAll: function(a) {
                                        m.send("tabsGetAll", {
                                            uuid: u.uuid
                                        }, a ? function(b) {
                                            a(b || {})
                                        } : null)
                                    }
                                }
                            }(),
                            K = function(a) {
                                var c = !1,
                                    d = a.context;
                                delete a.context;
                                var y = function() {
                                        var a = {};
                                        g(B(b.XMLHttpRequest.__proto__), function(b) {
                                            a[b] = !0
                                        });
                                        var c = function() {};
                                        g(B(b.XMLHttpRequest), function(d) {
                                            a[d] || (c[d] = b.XMLHttpRequest[d])
                                        });
                                        return c
                                    }(),
                                    T = function() {
                                        c = !0
                                    },
                                    M = function(a, d) {
                                        d = d || {};
                                        a && !c && b.setTimeout(function() {
                                            d.__proto__ = y;
                                            l(a, d, [d])
                                        }, 1)
                                    };
                                "object" === typeof a.url && a.url.href && (a.url = a.url.href);
                                var f = function(a, c) {
                                        var d = new b.FileReader;
                                        d.onload = function() {
                                            c(P.arrbuf2str(d.result))
                                        };
                                        Da(d,
                                            a)
                                    },
                                    q = function(a, c) {
                                        var d, E, z, e = U.toType(a);
                                        if ("Blob" === e || "File" === e) f(a, function(b) {
                                            c({
                                                type: e,
                                                value: b,
                                                meta: a.type,
                                                name: a.name,
                                                lastModified: a.lastModified
                                            })
                                        });
                                        else if ("FormData" === e)
                                            if (E = a.keys && a.getAll ? a.keys() : null) {
                                                var n, w = {};
                                                for (d = []; !(n = E.next()).done;) d.push(n.value);
                                                z = function() {
                                                    if (d.length) {
                                                        var b = d.pop(),
                                                            n = a.getAll(b); - 1 === b.search(/\[\]$/) && (n = n[0]);
                                                        q(n, function(a) {
                                                            w[b] = a;
                                                            z()
                                                        })
                                                    } else c({
                                                        type: "FormData",
                                                        value: w
                                                    })
                                                };
                                                z()
                                            } else c({
                                                error: e
                                            });
                                        else if (!(e = U.toType(a)) || "Array" !== e && "Object" !== e) c({
                                            value: a
                                        });
                                        else {
                                            var H, y, k = 0;
                                            E = 0;
                                            "Object" === e ? (d = B(a), y = function(a) {
                                                return a < d.length ? d[a] : null
                                            }, H = {}) : (y = function(b) {
                                                return b < a.length ? b : null
                                            }, H = []);
                                            z = function() {
                                                var d = y(k);
                                                null === d ? c({
                                                    type: e,
                                                    value: H
                                                }) : q(a[d], function(a) {
                                                    a.error ? c(a) : (H[d] = a, k++, 1024 > E++ ? z() : (E = 0, b.setTimeout(z, 1)))
                                                })
                                            };
                                            z()
                                        }
                                    },
                                    w = !0;
                                (function(b) {
                                    if (!a.data) return b();
                                    q(a.data, function(c) {
                                        c.error ? (w = !1, L("GM_xmlhttpRequest:", "unable to handle data type " + c.error + ". Going to use default xhr as fallback.")) : (a.binary && (c.type = "Blob"), a.data = c, a.data_type =
                                            "typified");
                                        b()
                                    })
                                })(function() {
                                    if (!c)
                                        if (w) {
                                            var f = Q.connect("xhr"),
                                                p = [];
                                            a.headers && g(B(a.headers), function(b) {
                                                "cookie" === ra(b) && (a.cookie = a.headers[b], delete a.headers[b])
                                            });
                                            f.postMessage({
                                                method: "xhr",
                                                details: a,
                                                callbacks: {
                                                    onloadstart: !!a.onloadstart,
                                                    onload: !!a.onload,
                                                    onreadystatechange: !!a.onreadystatechange,
                                                    onerror: !0,
                                                    ontimeout: !!a.ontimeout,
                                                    onprogress: !!a.onprogress,
                                                    onpartial: !0
                                                },
                                                id: v,
                                                url: b.location.href,
                                                uuid: u.uuid
                                            });
                                            f.onMessage.addListener(function(c) {
                                                c.data && d && (c.data.context = d);
                                                if (c.data &&
                                                    c.onload) {
                                                    p.length && (c.data.response_data = J(p, ""), p = null);
                                                    if (c.data.response_data) {
                                                        var h = c.data.response_data;
                                                        ["response_data"].forEach(function(a) {
                                                            delete c.data[a]
                                                        });
                                                        var f = {
                                                            response: function(c) {
                                                                var d = a.responseType ? ra(a.responseType) : "";
                                                                return "arraybuffer" == d ? P.str2arrbuf(c) : "blob" == d ? new b.Blob([P.str2arrbuf(c)]) : "json" == d ? X(c) : c
                                                            },
                                                            responseText: function(a) {
                                                                return a
                                                            },
                                                            responseXML: function(a) {
                                                                var c = new b.DOMParser;
                                                                return Ea(c, a, "text/xml")
                                                            }
                                                        };
                                                        g(B(f), function(a) {
                                                            ca(c.data, a, function() {
                                                                try {
                                                                    return f[a](h)
                                                                } catch (b) {
                                                                    L("GM_xmlhttpRequest: ",
                                                                        b)
                                                                }
                                                            })
                                                        })
                                                    }
                                                    M(a.onreadystatechange, c.data);
                                                    M(a.onload, c.data)
                                                } else if (c.onreadystatechange) 4 != c.data.readyState && M(a.onreadystatechange, c.data);
                                                else if (c.onpartial) e(p, c.data.partial);
                                                else if (c.onerror) c.exception && Y(c.exception), M(a.onerror, c.data);
                                                else {
                                                    var n = O(["onloadstart", "onprogress", "ontimeout"], function(a) {
                                                        return !!c[a]
                                                    })[0] || "onerror";
                                                    M(a[n], c.data)
                                                }
                                            });
                                            k && f.onDisconnect.addListener(function() {
                                                t("env: TM_xmlhttpRequest.onDisconnect! :)")
                                            });
                                            T = function() {
                                                f && f.disconnect();
                                                f = null;
                                                c = !0
                                            }
                                        } else {
                                            var h =
                                                new b.XMLHttpRequest;
                                            void 0 === a.async && (a.async = !0);
                                            Fa(h, a.method, a.url, a.async, a.user, a.password);
                                            a.headers && g(B(a.headers), function(b) {
                                                Ga(h, b, a.headers[b])
                                            });
                                            a.overrideMimeType && Ha(h, a.overrideMimeType);
                                            a.responseType && (h.responseType = a.responseType);
                                            "abort error load loadstart progress readystatechange timeout".split(" ").forEach(function(b) {
                                                h["on" + b] = function() {
                                                    var c = "",
                                                        p = a.url;
                                                    if (2 < h.readyState && (c = Ia(h), 4 == h.readyState)) {
                                                        c && (c = R(c, /TM-finalURL[0-9a-zA-Z]*\: .*[\r\n]{1,2}/, ""));
                                                        var n = Ja(h, "TM-finalURL" +
                                                            A.short_id);
                                                        n && (p = n)
                                                    }
                                                    c = {
                                                        readyState: h.readyState,
                                                        status: "",
                                                        statusText: "",
                                                        responseHeaders: c,
                                                        finalUrl: p,
                                                        context: d
                                                    };
                                                    4 == h.readyState && (h.responseType ? c.response = h.response : (c.responseText = h.responseText, c.responseXML = h.responseXML), c.status = h.status, c.statusText = h.statusText);
                                                    M(a["on" + b], c)
                                                }
                                            });
                                            Ka(h, a.data);
                                            T = function() {
                                                La(h);
                                                c = !0
                                            }
                                        }
                                });
                                return {
                                    abort: function() {
                                        T()
                                    }
                                }
                            },
                            N = function(a, b, c, d, e) {
                                var k = null,
                                    f = {
                                        id: v
                                    },
                                    q = ["timeout", "text", "image", "title", "highlight"],
                                    w = null;
                                "object" === typeof a ? w = a : "object" === typeof e &&
                                    (w = e);
                                w ? (g(q, function(a) {
                                    f[a] = w[a]
                                }), k = w.ondone, d = w.onclick, "function" === typeof b && (k = b)) : ("number" === typeof e && (f.timeout = e), f.image = c, f.title = b, f.text = a);
                                f.text && (f.image = f.image || u.icon64 || u.icon, f.title = f.title || u.name);
                                f.text || f.highlight ? m.send("notification", f, function(a) {
                                    d && a.clicked && d();
                                    k && k(!0 === a.clicked)
                                }) : L("GM_notification: neither a message text nor the hightlight options was given!")
                            };
                        D[r.script.uuid] = D[r.script.uuid] || {
                            getInfo: function() {
                                var a = r.script,
                                    b = {
                                        observers: 1,
                                        id: 1,
                                        enabled: 1,
                                        hash: 1,
                                        fileURL: 1
                                    },
                                    c = {
                                        script: {}
                                    };
                                g(B(a), function(d) {
                                    b[d] || (c.script[d] = a[d])
                                });
                                var d = a.options.updateURL || a.options.fileURL;
                                c.script["run-at"] = a.options.override.run_at || a.options.run_at;
                                c.script.excludes = a.options.override.orig_excludes;
                                c.script.includes = a.options.override.orig_includes;
                                c.script.matches = a.options.override.orig_matches;
                                c.script.grant = a.grant;
                                c.script.unwrap = !1;
                                c.scriptMetaStr = r.header;
                                c.scriptSource = r.code;
                                c.scriptWillUpdate = !!d;
                                c.scriptUpdateURL = d;
                                c.version = A.version;
                                c.scriptHandler =
                                    "Tampermonkey";
                                c.isIncognito = A.inIncognitoContext;
                                c.downloadMode = A.downloadMode;
                                return c
                            }(),
                            registerMenuCommand: a.register,
                            unregisterMenuCommand: a.unregister,
                            download: x,
                            openInTab: d,
                            setValue: F.set,
                            getValue: F.get,
                            deleteValue: F.remove,
                            listValues: F.list,
                            addValueChangeListener: F.registerChangeListener,
                            removeValueChangeListener: F.unregisterChangeListener,
                            getResourceText: G.getText,
                            getResourceURL: G.getURL,
                            notification: N,
                            xmlhttpRequest: K,
                            setTab: I.set,
                            getTab: I.get,
                            getTabs: I.getAll
                        };
                        return D[r.script.uuid]
                    }
                }
            }(),
            Oa = function() {
                var v = function(a, b, c) {
                        for (var d in b) {
                            var e = ma(b, d);
                            e && e.get && !A.sandbox_allow_getters || ("function" === typeof b[d] ? a[d] = K(b[d], b) : function() {
                                var c = d;
                                ca(a, c, function() {
                                    return b[c]
                                })
                            }())
                        }
                        g(B(c), function(b) {
                            a[b] = c[b]
                        });
                        return a
                    },
                    x = function(a, c, d, e) {
                        var k = {
                            attrChange: 0,
                            attrName: null,
                            bubbles: !0,
                            cancelBubble: !1,
                            cancelable: !1,
                            clipboardData: void 0,
                            currentTarget: null,
                            defaultPrevented: !1,
                            eventPhase: 0,
                            newValue: null,
                            prevValue: null,
                            relatedNode: null,
                            returnValue: !0,
                            srcElement: null,
                            target: null,
                            timeStamp: ha()
                        };
                        d = "string" === typeof d ? new b.Function(d) : d;
                        var f = new Event;
                        g(B(k), function(a) {
                            f[a] = k[a]
                        });
                        g(B(c), function(a) {
                            f[a] = c[a]
                        });
                        f.type = a;
                        l(d, e, [f])
                    },
                    Q = function(a, b, c) {
                        void 0 === c && (c = function(a) {
                            return a
                        });
                        var d = {
                            GM_info: !0
                        };
                        g(a, function(a) {
                            d[a] = !0
                        });
                        return O(b, function(a) {
                            return d[c(a.name)]
                        })
                    },
                    P = function(a, b) {
                        void 0 === b && (b = 100);
                        return b && a && (a == document || P(a.parentNode, b - 1))
                    },
                    S = function() {
                        var b = null;
                        return function(c) {
                            b || (b = {
                                instance: c,
                                is_open: !1
                            }, g(["write", "writeln", "open", "close"], function(d) {
                                b[d] = c[d];
                                c[d] = function() {
                                    var e = !1; - 1 != ["write", "writeln", "open"].indexOf(d) ? b.is_open ? e = !0 : b.is_open = !0 : "close" === d && (b.is_open = !1);
                                    !e && b.is_open && m.send("document.write");
                                    var k = document.documentElement,
                                        f = l(b[d], c, arguments);
                                    if (!e && b.is_open) return k !== document.documentElement && (b.instance !== c && (b = null, S(document)), g(a.write_listeners, function(a) {
                                        a(document)
                                    })), f
                                }
                            }))
                        }
                    }(),
                    u = {},
                    F = [],
                    X = function(g, z, y, m) {
                        if (!g.__addEventListener) {
                            V(g, {
                                __addEventListener: {
                                    value: g.addEventListener,
                                    enumerable: !1,
                                    configurable: !1
                                },
                                __removeEventListener: {
                                    value: g.removeEventListener,
                                    enumerable: !1,
                                    configurable: !1
                                }
                            });
                            var l = [],
                                f = function(a) {
                                    for (var b = 0; b < l.length; b++)
                                        if (l[b].fn === a) return b
                                };
                            g.removeEventListener = function(a, b, c) {
                                c = !!c;
                                var d, e;
                                if (void 0 !== (d = f(b)) && (e = l[d].listeners)) {
                                    if (b = e[a + "-" + c]) this.__removeEventListener(a, b, c), delete e[a + "-" + c];
                                    ya(e).length || G(l, d, 1)
                                } else this.__removeEventListener(a, b, c)
                            };
                            var q = function(a, c, d, h) {
                                if (c) {
                                    var f = F.length;
                                    c = b.parseInt(J(["DOMContentLoaded" == d ? 1 : 2, h ? 1 : 2, h ? c : 3 - c, ha()], "0"));
                                    for (d =
                                        0; d < F.length; d++)
                                        if (h = F[d], !h || !h.prio || h.prio > c) {
                                            f = d;
                                            break
                                        }
                                    G(F, f, 0, {
                                        prio: c,
                                        fn: a
                                    })
                                } else e(F, {
                                    fn: a
                                })
                            };
                            g.addEventListener = function(w, g, p) {
                                (k || D) && t("env: addEventListener " + w);
                                if ("load" == w || "DOMContentLoaded" == w || "DOMNodeInserted" == w) {
                                    p = !!p;
                                    var h = !0,
                                        E = this;
                                    if (!m) try {
                                        try {
                                            throw new b.Error;
                                        } catch (ia) {
                                            var H = /tms_[0-9a-f_]+/,
                                                r = ia.stack || ia.stacktrace;
                                            if (r)
                                                for (var n = pa(r, "\n"), ta, r = 0; r < n.length && (!(ta = ga(n[r], H)) || !(m = u[ta[0]])); r++);
                                            else {
                                                var ua = function(a, d) {
                                                        void 0 === d && (d = 10);
                                                        if (0 === d) return null;
                                                        if (a.caller) {
                                                            var h,
                                                                e;
                                                            try {
                                                                return e = I(a.caller), ga(e, new b.RegExp("^function[^(]+")) && (void 0).length && (h = ga((void 0)[0], H)) ? h[0] : ua(a.caller, d - 1)
                                                            } catch (n) {
                                                                c && L("env: unable to detect caller context", n)
                                                            }
                                                        }
                                                        return null
                                                    },
                                                    va;
                                                if (va = ua(arguments.callee)) m = u[va]
                                            }
                                        }
                                    } catch (ia) {
                                        c && Y("env: Error: event " + w, ia)
                                    }
                                    m && "document-idle" !== m.run_at && (n = null, "load" == w ? a.pageLoaded && (n = function() {
                                        var a = E.document || E;
                                        (k || D) && t("env: postLoadEvent!");
                                        a = a || document;
                                        x("load", {
                                            attrName: "null",
                                            newValue: "null",
                                            prevValue: "null",
                                            eventPhase: b.Event.AT_TARGET,
                                            attrChange: b.MutationEvent.ADDITION,
                                            target: a,
                                            relatedNode: a,
                                            srcElement: a
                                        }, g, E)
                                    }, h = !1, q(n, z, w, p)) : "DOMContentLoaded" == w && a.domContentLoaded && (n = function() {
                                        var a = E.document || E;
                                        (k || D) && t("env: postDomEventListener!");
                                        a = a || document;
                                        x("DOMContentLoaded", {
                                            attrName: "null",
                                            newValue: "null",
                                            prevValue: "null",
                                            eventPhase: b.Event.AT_TARGET,
                                            attrChange: b.MutationEvent.ADDITION,
                                            target: a,
                                            relatedNode: a,
                                            srcElement: a
                                        }, g, E)
                                    }, h = !1, q(n, z, w, p)), n && (b.setTimeout(function() {
                                        if (F.length) {
                                            var a = la(F);
                                            a && a.fn && a.fn()
                                        }
                                    }, 1), h = !1));
                                    h && (n = function(a) {
                                        return d(g, this, y(a))
                                    }, void 0 === (h = f(g)) && (h = l.length, e(l, {
                                        fn: g,
                                        listeners: {}
                                    })), l[h].listeners[w + "-" + p] = n, this.__addEventListener(w, n, p))
                                } else this.__addEventListener(w, g, p)
                            };
                            ka.push(function() {
                                g.removeEventListener = g.__removeEventListener;
                                g.addEventListener = g.__addEventListener
                            })
                        }
                    },
                    ea = function(a) {
                        a.__evaluate || (V(a, {
                            __evaluate: {
                                value: a.evaluate,
                                enumerable: !1,
                                configurable: !1
                            }
                        }), a.evaluate = function(a, b, c, d, e) {
                            k && t("env: document.evaluate " + a);
                            b || (b = this);
                            var q;
                            if ("undefined" != typeof XPathResult) {
                                var g =
                                    a,
                                    m = null;
                                try {
                                    q = this.__evaluate(g, b, c, d, e)
                                } catch (h) {
                                    m = h
                                }
                                var p = !1;
                                try {
                                    p |= !!q.snapshotLength
                                } catch (h) {}
                                try {
                                    p |= !!q.singleNodeValue
                                } catch (h) {}
                                if (p || "." == a[0] || P(b)) k && t("env: queried document for " + g);
                                else {
                                    k && t("env: query added elem for " + g);
                                    g = ("/" == a[0] ? "." : "./") + a;
                                    try {
                                        q = this.__evaluate(g, b, c, d, e)
                                    } catch (h) {}
                                }
                                k && t("env: query returned ", q, m);
                                if (!p && m) throw m;
                            } else k && t("env: XPathResult == undefined, but selectNodes via ", a), q = b.selectNodes(a);
                            return q
                        }, ka.push(function() {
                            a.evaluate = a.__evaluate
                        }))
                    },
                    fa = function(c, d) {
                        var e = ["eval"],
                            m = {};
                        g(c, function(a) {
                            a.context_prop && (m[(a.name.split(".") || [])[1]] = !0)
                        });
                        var t = function(a, b, c, d) {
                                var h = function(c) {
                                        return c === b ? a : c
                                    },
                                    f = function(a, b, c, d) {
                                        c || (c = a);
                                        var h = function() {
                                            var h = l(a[b], c, arguments);
                                            d && (h = d(h));
                                            return h
                                        };
                                        h.__proto__ = a[b];
                                        h.prototype = a[b].prototype;
                                        return h
                                    },
                                    z = function(c) {
                                        var d, h, e = null,
                                            e = function(e) {
                                                d = e;
                                                h = function() {
                                                    return l(e, a, arguments)
                                                };
                                                b[c] = h
                                            };
                                        ca(a, c, function() {
                                            return void 0 === d || h !== b[c] ? b[c] : d
                                        });
                                        na(a, c, e)
                                    },
                                    t = function(c, d) {
                                        var e, f = null,
                                            p = null,
                                            f = "function" === typeof d.get ? d.get : function() {
                                                d.opts && d.opts.get_cb && l(d.opts.get_cb, this, [arguments, t]);
                                                return void 0 === e ? h(b[c]) : e
                                            };
                                        "function" === typeof d.set ? p = d.set : d.get || (p = function(a) {
                                            e = a
                                        });
                                        f && ca(a, c, f);
                                        p && na(a, c, p)
                                    };
                                g(B(d), function(a) {
                                    c[a] = c[a] || !1 !== d[a]
                                });
                                g(B(c), function(n) {
                                    if (!1 !== d[n]) {
                                        var g, l = {};
                                        try {
                                            var u = ma(b, n);
                                            try {
                                                if (!(g = d[n]) || g.needs_grant && !0 !== m[n])
                                                    if (u && u.get)
                                                        if (A.sandbox_allow_getters) l.get = !0;
                                                        else {
                                                            k && r("sandbox: ignore getter", n, u);
                                                            return
                                                        } else "function" === typeof b[n] ? c[n].proto ?
                                                    l.wrap = !0 : b[n].prototype && !u.enumerable || -1 != ba(e, n) || !b[n].bind ? l.direct = !0 : l.bind = !0 : "number" === typeof b[n] || "string" === typeof b[n] ? l.get = !0 : c[n].event ? l.event = !0 : l.direct = !0;
                                                else if (g.wrap) l.wrap = !0, l.that = g.that;
                                                else if (g.direct) l.direct = !0;
                                                else if (g.enhance) l.enhance = g.enhance;
                                                else if (g.get || g.set) l.get = g.get, l.set = g.set, l.opts = g.opts
                                            } catch (H) {
                                                l.get = !0
                                            }
                                            l.enhance ? (k && r("sandbox: original[" + n + "] -> enhanced reference"), a[n] = l.enhance) : u && u.get && !A.sandbox_allow_getters ? k && r("sandbox: ignore getter",
                                                n, u) : l.event ? (k && r("sandbox: original[" + n + "] -> event reference"), z(n)) : l.get || l.set ? (k && r("sandbox: original[" + n + "] -> " + ("function" === typeof l.get || "function" === typeof l.set ? "enhanced " : "") + "getter/setter reference"), t(n, l)) : l.wrap ? (k && r("sandbox: original[" + n + "] -> wrapped reference "), a[n] = f(b, n, l.that, h)) : l.direct ? (k && r("sandbox: original[" + n + "] -> direct reference"), a[n] = h(b[n])) : l.bind && (k && r("sandbox: original[" + n + "] -> bound reference"), a[n] = K(b[n], b))
                                        } catch (H) {
                                            L("env: error while creating a new sandbox: " +
                                                H.message)
                                        }
                                    }
                                });
                                return a
                            },
                            f = function(a, c, d, e, h) {
                                var f = c[d];
                                e && "string" === typeof f ? c[d] = new b.Function(f) : h && (c[d] = function() {
                                    return l(f, h, arguments)
                                });
                                return l(a, window, c)
                            };
                        return function() {
                            var c = new Window,
                                e = {
                                    setTimeout: {
                                        enhance: function() {
                                            return f(b.setTimeout, arguments, 0, !0, c)
                                        }
                                    },
                                    setInterval: {
                                        enhance: function() {
                                            return f(b.setInterval, arguments, 0, !0, c)
                                        }
                                    },
                                    close: {
                                        needs_grant: !0,
                                        get: function() {
                                            return b.self == b.top ? function(a) {
                                                return N.closeTab(a)
                                            } : b.close
                                        }
                                    },
                                    focus: {
                                        needs_grant: !0,
                                        get: function() {
                                            return function(a) {
                                                return N.focusTab(a)
                                            }
                                        }
                                    },
                                    location: {
                                        get: !0,
                                        set: function(a) {
                                            b.location.href = a
                                        }
                                    },
                                    document: {
                                        get: function() {
                                            var a = b.document;
                                            d(a);
                                            return a
                                        }
                                    },
                                    clearInterval: {
                                        get: function() {
                                            return b.clearInterval
                                        }
                                    },
                                    clearTimeout: {
                                        get: function() {
                                            return b.clearTimeout
                                        }
                                    },
                                    addEventListener: {
                                        enhance: function() {
                                            return f(b.addEventListener, arguments, 1, !0)
                                        }
                                    },
                                    removeEventListener: {
                                        enhance: function() {
                                            return f(b.removeEventListener, arguments, 1, !0)
                                        }
                                    }
                                };
                            (function() {
                                var a = oa(b.frames.length, 7);
                                e.length = {
                                    get: !0,
                                    opts: {
                                        get_cb: function(c, d) {
                                            for (var e = b.frames.length,
                                                    f = a; f < e; f++) d(b.String(f), {
                                                get: !0
                                            });
                                            a = oa(e, a)
                                        }
                                    }
                                };
                                for (var c = 0; c < a; c++) e[b.String(c)] = {
                                    get: !0
                                }
                            })();
                            g(B(b), function(a) {
                                b[a] != window && (e[a] = e[a] || {
                                    enhance: b[a]
                                })
                            });
                            var k = t(c, window, a.windowProps, e),
                                p = {
                                    context: k,
                                    filter: function(a) {
                                        return a == window ? k : a
                                    },
                                    filterEvent: function(a) {
                                        var b = {},
                                            c;
                                        for (c in a)
                                            if ("function" === typeof a[c]) b[c] = function() {
                                                var b = c;
                                                return function() {
                                                    return l(a[b], a, arguments)
                                                }
                                            }();
                                            else {
                                                var d = p.filter(a[c]);
                                                b[c] = d
                                            }
                                        return b
                                    }
                                };
                            return p
                        }()
                    },
                    Z = function() {
                        return v({}, b.console, {
                            debug: r,
                            log: t,
                            info: Aa,
                            warn: L,
                            error: Y
                        })
                    },
                    C = function(a, d, k, m, r, f) {
                        var q = null,
                            u = function() {
                                return "[Tampermonkey property]"
                            };
                        try {
                            var t = m.sandboxes[a.uuid],
                                p = ["context", "fapply"],
                                h = [void 0, void 0];
                            g(m.elements[a.uuid], function(a) {
                                a.name ? (a.overwrite ? (e(p, a.name), e(h, a.value)) : a.context_prop || (t[a.name] = a.value, e(p, a.name), e(h, "context." + a.name)), a.protect && t[a.name] && (t[a.name].toString = u)) : c && L("env: WARN: unexpected item in props elem: " + da(a))
                            });
                            var E, q = ['(function(context, fapply, console) {with (context) {(function(module) {"use strict";try {\n',
                                    A.measure_scripts ? 'console.time("' + (E = "SCRIPT RUN TIME[" + a.name.replace(/\W+/g, " ") + "]") + '");\n' : "", "fapply(module, context, [", J(h, ","), "]);", A.measure_scripts ? 'console.timeEnd("' + E + '");\n' : "", "} catch (e) {if (e.message && e.stack) {console.error(\"ERROR: Execution of script '", R(a.name, new b.RegExp("[\"']", "g"), "\\$1"), '\' failed! " + e.message);console.log(e.stack.replace(/(\\\\(eval at )?<anonymous>[: ]?)|([\\s.]*at Object.tms_[\\s\\S.]*)/g, ""));} else {console.error(e);}}\n})(function ', f,
                                    "(", J(p, ","), ") {", A.enforce_strict_mode ? '"use strict";\n' : "", k, d, "\n})}})(this.context, this.fapply, this.console)"
                                ].join(""),
                                v = {
                                    context: t,
                                    fapply: l,
                                    console: Z()
                                };
                            if (r) r(q, v);
                            else {
                                var x = new b.Function(q);
                                l(x, v)
                            }
                        } catch (n) {
                            N.syntaxCheck(J([k, d], ""), function(e) {
                                var h = "";
                                if (e.errors) {
                                    var f = pa(k, "\n").length - 1,
                                        p = "";
                                    e.errors && g(B(e.errors), function(a) {
                                        if ((a = e.errors[a]) && 0 <= a.line && a.reason) {
                                            var b = a.line;
                                            p += J([b > f ? "script:" : "require:", " (", a.code, ") ", R(a.reason, /.$/, ""), " on line: ", b > f ? b - f : b, " at character: ",
                                                a.character, "\n"
                                            ], "")
                                        }
                                    });
                                    h = "JSHINT output:\n" + p
                                } else h = d;
                                var l = n.stack ? R(n.stack, /(\\(eval at )?<anonymous>[: ]?)|([\s.]*at Object.tms_[\s\S.]*)/g, "") : "";
                                c || e.errors ? Y('Syntax error @ "' + a.name + '"!\n##########################\n' + h + "##########################\n\n" + l) : Y('Syntax error @ "' + a.name + '"!\n\n', l);
                                b.setTimeout(function() {
                                    throw n;
                                }, 1)
                            })
                        }
                    };
                return {
                    create: function(d) {
                        var m = d.script,
                            y = [],
                            v = -1 !== m.grant.indexOf("none") ? function(b, c) {
                                a.E_u(b, c)
                            } : null,
                            x = m.namespace + "_" + !!v;
                        void 0 === a.props[x] && (a.props[x] = {
                            sandboxes: {},
                            elements: {}
                        }, ka.push(function() {
                            a.props[x] = null
                        }));
                        e(y, {
                            name: "CDATA",
                            value: function(a) {
                                this.src = a;
                                this.toXMLString = this.toString = function() {
                                    return this.src
                                }
                            }
                        });
                        e(y, {
                            name: "uneval",
                            value: function(a) {
                                try {
                                    return "\\$1 = " + da(a) + ";"
                                } catch (b) {
                                    t(b)
                                }
                            }
                        });
                        e(y, {
                            name: "define",
                            value: void 0
                        });
                        e(y, {
                            name: "module",
                            value: void 0
                        });
                        var f = [],
                            q = N.of(d);
                        if (!v) {
                            e(y, {
                                name: "window",
                                value: "context",
                                overwrite: !0
                            });
                            var w = {
                                window: window
                            };
                            g(B(w), function(a) {
                                var b = R(a, /^(.)/g, function(a) {
                                    return Ca(a)
                                });
                                e(y, {
                                    name: "unsafe" +
                                        b,
                                    value: w[a]
                                })
                            });
                            e(y, {
                                name: "console",
                                value: Z()
                            });
                            e(y, {
                                name: "cloneInto",
                                value: function(a) {
                                    return a
                                }
                            });
                            e(y, {
                                name: "exportFunction",
                                value: function(a, b, c) {
                                    c && void 0 !== c.defineAs && (b[c.defineAs] = a);
                                    return a
                                }
                            });
                            e(y, {
                                name: "createObjectIn",
                                value: function(a, b) {
                                    var c = {};
                                    b && void 0 !== b.defineAs && (a[b.defineAs] = c);
                                    return c
                                }
                            });
                            e(f, {
                                name: "GM_addStyle",
                                value: N.addStyle
                            });
                            e(f, {
                                name: "GM_deleteValue",
                                value: q.deleteValue
                            });
                            e(f, {
                                name: "GM_listValues",
                                value: q.listValues
                            });
                            e(f, {
                                name: "GM_getValue",
                                value: q.getValue
                            });
                            e(f, {
                                name: "GM_setValue",
                                value: q.setValue
                            });
                            e(f, {
                                name: "GM_log",
                                value: N.log
                            });
                            e(f, {
                                name: "GM_registerMenuCommand",
                                value: q.registerMenuCommand
                            });
                            e(f, {
                                name: "GM_unregisterMenuCommand",
                                value: q.unregisterMenuCommand
                            });
                            e(f, {
                                name: "GM_openInTab",
                                value: q.openInTab
                            });
                            e(f, {
                                name: "GM_addValueChangeListener",
                                value: q.addValueChangeListener
                            });
                            e(f, {
                                name: "GM_removeValueChangeListener",
                                value: q.removeValueChangeListener
                            });
                            e(f, {
                                name: "GM_xmlhttpRequest",
                                value: q.xmlhttpRequest
                            });
                            e(f, {
                                name: "GM_download",
                                value: q.download
                            });
                            e(f, {
                                name: "GM_setClipboard",
                                value: N.setClipboard
                            });
                            e(f, {
                                name: "GM_getTab",
                                value: q.getTab
                            });
                            e(f, {
                                name: "GM_setTab",
                                value: q.setTab
                            });
                            e(f, {
                                name: "GM_saveTab",
                                value: q.setTab
                            });
                            e(f, {
                                name: "GM_getTabs",
                                value: q.getTabs
                            });
                            e(f, {
                                name: "GM_notification",
                                value: q.notification
                            });
                            e(f, {
                                name: "GM_getResourceText",
                                value: q.getResourceText
                            });
                            e(f, {
                                name: "GM_getResourceURL",
                                value: q.getResourceURL
                            });
                            e(f, {
                                name: "window.close",
                                context_prop: !0
                            });
                            e(f, {
                                name: "window.focus",
                                context_prop: !0
                            })
                        }
                        e(f, {
                            name: "GM_info",
                            value: q.getInfo
                        });
                        y = wa(y, Q(m.grant, W(f, function(a) {
                            a.protect = !0;
                            return a
                        })));
                        m.options.compat_prototypes && ((k || c) && t("env: option: add toSource"), b.Object.prototype.toSource || V(b.Object.prototype, {
                            toSource: {
                                value: function() {
                                    var a = U.toType(this);
                                    if ("String" === a) return '(String("' + R(this, new b.RegExp('"', "g"), '\\"') + '"))';
                                    if ("Number" === a) return '(Number("' + b.Number(this) + '"))';
                                    if ("Array" === a) {
                                        for (var a = "(new Array(", c = 0; c < this.length; c++) {
                                            var d = U.toType(this[c]),
                                                a = "Null" === d ? a + "null" : "Undefined" === d ? a + "undefined" : a + this[c].toSource();
                                            c + 1 < this.length && (a += ",")
                                        }
                                        return a +
                                            "))"
                                    }
                                    return 'JSON.parse(unescape("' + b.escape(da(this)) + '"))'
                                },
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), (k || c) && t("env: option: add some array generics"), g("indexOf lastIndexOf filter forEach every map some slice".split(" "), function(a) {
                            if ("function" !== typeof b.Array[a]) {
                                var c = {};
                                c[a] = {
                                    value: function(c) {
                                        return l(b.Array.prototype[a], c, l(ja.wrappedJSObject, arguments, [1]))
                                    },
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                };
                                V(b.Array, c)
                            }
                        }));
                        f = "";
                        if (v) q = new Window;
                        else {
                            var A = fa(y, function(a) {
                                    ea(a);
                                    S(a);
                                    X(a,
                                        2, A.filterEvent)
                                }),
                                q = {
                                    run_at: m.options.run_at,
                                    uuid: m.uuid
                                },
                                f = "tms_" + R(m.uuid, /-/g, "_");
                            u[f] = q;
                            X(A.context, 1, A.filterEvent, q);
                            q = A.context
                        }
                        a.props[x].sandboxes[m.uuid] = q;
                        a.props[x].elements[m.uuid] = y;
                        (k || c) && r("env: execute script " + m.name + " @ the " + (v ? "un" : "") + "safe context now!");
                        C(m, d.code, d.requires, a.props[x], v, f)
                    }
                }
            }();
        m.onMessage.addListener(function(a) {
            var b = a.a;
            "load" == a.m ? S.runListeners() : "DOMContentLoaded" == a.m ? S.runListeners() : "setForeignAttr" == a.m ? window[b.attr] = b.value : "port.message" ==
                a.m ? Q.message(b) : "executeScript" == a.m ? S.run(a.a) : c && t("env: unkown method", a)
        });
        c && t("Tampermonkey started");
        a.scripts.forEach(function(a) {
            S.run(a)
        })
    }
});
