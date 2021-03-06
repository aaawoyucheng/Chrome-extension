window.requestFileSystem || (window.requestFileSystem = window.webkitRequestFileSystem);
Registry.require("promise layout convert xmlhttprequest crcrc curtain cache layout/default/tabview layout/default/htmlutil helper statistics i18n syncinfo uri layout/default/layout_helper porter hinter".split(" "), function() {
    var z = rea.FEATURES,
        I = Registry.get("promise"),
        t = Registry.get("crcrc").cr,
        h = Registry.get("crcrc").crc,
        Ia = Registry.get("layout/default/tabview"),
        n = Registry.get("layout/default/htmlutil"),
        Za = Registry.get("statistics"),
        sa = Registry.get("syncinfo"),
        $a = Registry.get("convert"),
        ta = Registry.get("cache"),
        u = Registry.get("curtain"),
        e = Registry.get("i18n"),
        x = Registry.get("helper"),
        ua = Registry.get("uri"),
        U = Registry.get("porter"),
        va = Registry.get("hinter"),
        Ja = Registry.get("layout"),
        wa = Registry.get("layout/default/layout_helper"),
        N = wa.images;
    Ja.render(function() {
        wa.addStyle();
        wa.addFont();
        var ma = {},
            q = {},
            D = [],
            xa = "0.0.0",
            Z = {},
            Ka = {},
            V = {},
            ba = !0,
            ja = !1,
            O, w = {},
            E = function(a, b) {
                if (w[a] && w[a][b]) return w[a][b].apply(this, Array.prototype.slice.call(arguments, 2));
                console.log("option: WARN: unable to find callback '" +
                    b + "' for id '" + a + "'")
            };
        window.addEventListener("keydown", function(a) {
            var b, c, d = !1;
            if ("keydown" == a.type) {
                if (39 == a.keyCode && !a.ctrlKey && a.altKey && !a.shiftKey) {
                    if (c = O.getNextTab()) c.select(), d = !0
                } else if (37 == a.keyCode && !a.ctrlKey && a.altKey && !a.shiftKey) {
                    if (c = O.getPreviousTab()) c.select(), d = !0
                } else if (112 == a.keyCode)(b = O.getTabById("help")) && b.select(), d = !0;
                else if ((38 == a.keyCode || 40 == a.keyCode) && a.shiftKey) {
                    b = O.getTabById("dashboard");
                    if (!b.isSelected()) return;
                    if ((b = H.length && H[H.length - 1]) && (b = $(b)) &&
                        (d = !0, c = b.closest("tr"), c.length)) {
                        var l;
                        38 == a.keyCode ? (c = c.prev("tr"), l = !0) : (c = c.next("tr"), l = !1);
                        if (c.length) {
                            var g, f = c.find('input[name="scriptselectors"]'); - 1 != H.indexOf(f[0]) ? (H.pop(), b.prop("checked", !1), b.removeClass("selected"), g = b) : f.length && (f.prop("checked", !0), f.addClass("selected"), H.push(f[0]), void 0 === H.direction && (H.direction = l), g = f);
                            g && (n.isScrolledIntoView(c, {
                                padding: 100
                            }) || $("html, body").animate({
                                scrollTop: l ? c.offset().top - 100 - c.height() : c.offset().top - $(window).height() + 100 + 2 *
                                    c.height()
                            }, 0), w.multiselect.single_click())
                        }
                    }
                }
                if (d) return a.stopPropagation(), a.preventDefault(), !1
            }
        }, !1);
        var ca, J = function() {
            var a = {};
            window.onhashchange = function() {
                ca = x.getUrlArgs(!0);
                Object.keys(a).forEach(function(d) {
                    d = a[d];
                    b.is(d.main, d.sub) && d.fn()
                })
            };
            window.onhashchange();
            var b = {
                    set: function(a, c) {
                        var g = b.get(),
                            f;
                        f = "object" === typeof a ? [a.main, a.sub].filter(function(a) {
                            return a
                        }) : arguments;
                        if (g.main !== f[0] || g.sub !== f[1]) !f[0] && f[1] ? b.setSub(f[1]) : window.location.hash = "nav=" + Array.prototype.join.call(f,
                            "+")
                    },
                    setSub: function(a) {
                        var c = b.get();
                        c.sub !== a && (window.location.hash = "nav=" + (c.main ? c.main : "") + "+" + a)
                    },
                    get: function() {
                        var a = ca.nav ? ca.nav.split("+") : [];
                        return {
                            main: a[0],
                            sub: a[1]
                        }
                    },
                    is: function(a, c) {
                        var g = b.get(),
                            f = !c || g.sub === c;
                        return (!a || g.main === a) && f
                    },
                    isSub: function(a) {
                        return b.is(null, a)
                    },
                    registerListener: function(d, c, g) {
                        void 0 === g && (g = c, c = null);
                        var f = [d, c].join("+");
                        a[f] = {
                            main: d,
                            sub: c,
                            fn: g
                        };
                        b.is(d, c) && g();
                        return f
                    },
                    unregisterListener: function(b) {
                        delete a[b]
                    },
                    clear: function() {
                        b.set("")
                    }
                },
                c =
                b.get();
            D.push(function() {
                var a = O.getTabById(c.main);
                if (a) return a.select();
                if (c.main)(a = O.getTabById("dashboard")) && a.select(), D.push(function() {
                    window.setTimeout(function() {
                        b.set(c)
                    }, 1)
                });
                else window.onhashchange()
            });
            return b
        }();
        (function() {
            D.push(function() {
                q.statistics_enabled && Za.init("opt", xa)
            })
        })();
        var ya = x.getDebouncer(1E3),
            za = function() {
                for (; D.length;) try {
                    D.shift()()
                } catch (a) {
                    console.warn("doneListeners:", a)
                }
            },
            ab = function(a, b) {
                var c = t("input", a.name, a.id, "Save");
                c.inserted || (c.type = "button",
                    c.section = a, c.value = e.getMessage("Save"), c.addEventListener("click", function() {
                        if (!b || !b.warning || ka(b.warning)) {
                            var a = Array.prototype.slice.call(this.section.getElementsByTagName("textarea")),
                                c = function(b) {
                                    b.each(function(b, c) {
                                        a.push(c)
                                    })
                                };
                            c($("#" + this.section.id).find("input"));
                            c($("#" + this.section.id).find("select"));
                            for (var c = [], g = [], f = 0; f < a.length; f++) {
                                var m = null,
                                    k = a[f],
                                    e = k.key;
                                if (-1 == g.indexOf(k)) {
                                    if ("textarea" == k.tagName.toLowerCase()) k.named ? (k = document.getElementsByName(k.name), m = [], x.each(k,
                                        function(a, b) {
                                            m.push({
                                                name: a.named_name,
                                                value: a.value
                                            });
                                            g.push(a)
                                        })) : m = k.array ? k.value.split("\n").map(function(a) {
                                        return a.trim()
                                    }).filter(function(a) {
                                        return a
                                    }) : k.value;
                                    else if ("checkbox" == k.getAttribute("type")) m = k.checked;
                                    else if ("select" == k.getAttribute("type")) {
                                        var h = 0;
                                        0 <= k.selectedIndex && k.selectedIndex < k.options.length && (h = k.selectedIndex);
                                        m = k[h] ? k[h].value : k.options[0].value
                                    } else "button" != k.getAttribute("type") && (m = k.value);
                                    e && c.push(na(e, m, b && b.reload))
                                }
                            }
                            b && b.reload && (u.wait(), I.when(c).done(function() {
                                rea.page.reload()
                            }))
                        }
                    }, !1));
                return c
            },
            db = function(a) {
                var b = function(a, b, d, c, k) {
                        var l, m = h("th", "settingsth", a.name, a.id, b),
                            f = h("a", "settingsth_a", a.name, a.id, b + "_a");
                        f.setAttribute("name", "settingsth_a" + a.name);
                        var g = h("a", "settingsth_a_up", a.name, a.id, b + "_a_up");
                        g.setAttribute("name", "settingsth_a_up" + a.name);
                        var e = h("a", "settingsth_a_down", a.name, a.id, b + "_a_down");
                        e.setAttribute("name", "settingsth_a_down" + a.name);
                        var r = function() {
                                var b = document.getElementsByName("settingsth_a_up" + a.name),
                                    c = document.getElementsByName("settingsth_a_down" +
                                        a.name);
                                for (l = 0; l < b.length; l++) b[l].style.display = "none";
                                for (l = 0; l < c.length; l++) c[l].style.display = "none";
                                "up" == ea() ? g.style.display = "" : e.style.display = ""
                            },
                            p = function() {
                                r()
                            };
                        b = function() {
                            window.setTimeout(function() {
                                aa() == c ? Na("down" == ea() ? "up" : "down") : Oa(c);
                                Pa(p)
                            }, 1)
                        };
                        m.inserted || (m.appendChild(f), m.appendChild(e), m.appendChild(g), f.addEventListener("click", b), g.addEventListener("click", b), e.addEventListener("click", b), f.textContent = d + " ", f.href = "#", g.innerHTML = "&#x25B4;", g.href = "#", e.innerHTML =
                            "&#x25BE;", e.href = "#");
                        k && !aa() ? (Oa(c), Na("up"), window.setTimeout(r, 1)) : c == aa() && window.setTimeout(r, 1);
                        return m
                    },
                    c, d, l, g, f;
                g = t("tbody", a.name, a.id, "body");
                f = t("thead", a.name, a.id, "head");
                if (a.scriptTab) {
                    var m = cb(a);
                    c = h("table", "scripttable multiselect", a.name, a.id, "main");
                    var k = h("th", "script_sel", a.name, a.id, "thead_sel");
                    k.appendChild(m.selAllm);
                    l = h("tr", "multiselectrow scripttr", a.name, a.id, "filler_multi");
                    var r = h("th", "", a.name, a.id, "thead_multi");
                    r.setAttribute("colspan", "12");
                    r.appendChild(m.actionBox);
                    l.appendChild(k);
                    l.appendChild(r);
                    k = h("th", "script_sel", a.name, a.id, "thead_sel");
                    k.appendChild(m.selAll);
                    var m = b(a, "thead_pos", "#", "pos"),
                        r = b(a, "thead_en", "", "enabled"),
                        p = b(a, "thead_name", e.getMessage("Name"), "name", !0),
                        y = b(a, "thead_ver", e.getMessage("Version"), "ver"),
                        W = h("th", "settingsth", a.name, a.id, "thead_type");
                    W.textContent = e.getMessage("Type");
                    var A = h("th", "settingsth", a.name, a.id, "thead_sync");
                    A.textContent = "";
                    var n = b(a, "thead_sites", e.getMessage("Sites"), "sites");
                    n.width = "25%";
                    var L = h("th",
                        "settingsth", a.name, a.id, "thead_features");
                    L.textContent = e.getMessage("Features");
                    var B = b(a, "thead_homepage", e.getMessage("Homepage"), "homepage"),
                        b = b(a, "thead_updated", e.getMessage("Last_updated"), "updated"),
                        v = h("th", "settingsth", a.name, a.id, "thead_sort"),
                        F = h("span", "sorting", a.name, a.id, "thead_sort_span");
                    F.textContent = e.getMessage("Sort");
                    "pos" == aa() && "up" == ea() || F.setAttribute("style", "display: none;");
                    v.appendChild(F);
                    F = h("th", "settingsth", a.name, a.id, "thead_del");
                    F.textContent = e.getMessage("Actions");
                    D.push(function() {
                        q.sync_enabled && (A.textContent = e.getMessage("Imported"))
                    });
                    d = h("tr", "scripttr multiselectreplaced", a.name, a.id, "filler");
                    x.each([k, m, r, p, y, W, A, n, L, B, b, v, F], function(a, b) {
                        d.appendChild(a)
                    });
                    f.appendChild(l);
                    f.appendChild(d);
                    d.inserted || (w.multiselect.checkScroll = function(a) {
                        a = $(f).is(":visible") && $(l).is(":visible") && $(window).scrollTop() > $(f).offset().top;
                        $(l).toggleClass("multiscrolling", a)
                    }, $(window).scroll(w.multiselect.checkScroll))
                } else c = h("table", "settingstable", a.name, a.id,
                    "main");
                c.appendChild(f);
                c.appendChild(g);
                return {
                    table: c,
                    head: f,
                    body: g
                }
            },
            Qa = function(a, b, c, d) {
                var l, g, f, m, k, e = [];
                if (b.divider) return null;
                b.image && (b.imageURL = N.get(b.image));
                if (b.checkbox) f = function() {
                    var a = !0,
                        b = this;
                    b.warning && (a = ka(b.warning), a || (b.checked = !b.checked));
                    a && na(this.key, b.checked, b.reload).always(function() {
                        b.reload && rea.page.reload()
                    })
                }, c && c.need_save && (f = g = null), l = n.createCheckbox(b.name, b, f), e.push(l.elem);
                else if (b.button) l = n.createButton(b.name, b, function() {
                    var a = !0,
                        b = this;
                    b.warning &&
                        (a = ka(b.warning));
                    a && eb(b.key, b.data, b.ignore).always(function() {
                        b.reload && rea.page.reload()
                    })
                }), e.push(l);
                else if (b.named) l = n.createNamedSettings(b.name, b), e.push({
                    element: l.elem,
                    validation: l.label
                }), c && (c.need_save = !0);
                else if (b.input) l = n.createTextarea(b.name, b), e.push({
                    element: l.elem,
                    validation: l.label
                }), c && (c.need_save = !0);
                else if (b.text) l = n.createInput(b.name, b), e.push(l.elem), c && (c.need_save = !0);
                else if (b.color) l = n.createColorChooser(b.name, b), e.push(l.elem), c && (c.need_save = !0);
                else if (b.password) l =
                    n.createPassword(b.name, b), e.push(l.elem), c && (c.need_save = !0);
                else if (b.select) g = function() {
                    var a = !0,
                        b = this;
                    b.warning && (a = ka(b.warning), a || (b.value = b.oldvalue));
                    a && na(b.key, n.getValue(b), b.reload).always(function() {
                        b.reload && rea.page.reload()
                    })
                }, c && c.need_save && (g = b.enabler ? function() {
                    var a = document.getElementsByName("enabled_by_" + this.key),
                        b = (this.selectedIndex < this.options.length ? this.options[this.selectedIndex] : this.options[0]).getAttribute("enables"),
                        c = b ? JSON.parse(b) : {};
                    x.each(a, function(a) {
                        void 0 ===
                            c[a.key] || c[a.key] ? a.setAttribute("style", x.staticVars.visible) : a.setAttribute("style", x.staticVars.invisible)
                    })
                } : null), l = n.createDropDown(b.name, b, b.select, g, function() {
                    var a = !0;
                    this.selectedOptions.length && this.selectedOptions[0].warning && this.selectedOptions[0].value !== this.oldvalue && (a = ka(this.selectedOptions[0].warning), a || (this.value = this.previousValue || this.oldvalue));
                    this.previousValue = this.value
                }), e.push(l.elem), a && b.enabler && function() {
                    var a = g,
                        b = l;
                    D.push(function() {
                        a.apply(b.select, [])
                    })
                }();
                else if (b.url) f = t("a", b.name, b.id), f.href = "#", f.url = b.url, f.newtab = b.newtab, f.inserted || (g = function() {
                    Ba(this.url, this.newtab)
                }, f.addEventListener("click", g)), f.textContent = b.name, e = Array(13), e[3] = f;
                else if (b.main_menu_item) {
                    f = t("div", b.name, b.id);
                    f.textContent = b.name;
                    m = db(b);
                    k = t("div", b.name, b.id, "tab_content");
                    k.appendChild(m.table);
                    var p = null,
                        y = d.appendTab(b.id, f, k, function() {
                            p && (ma.global ? p() : D.push(p));
                            J.set(b.id)
                        });
                    J.registerListener(b.id, function() {
                        y.select()
                    });
                    b.referrer && (p = function() {
                        p =
                            null;
                        u.wait();
                        oa({
                            referrer: b.referrer
                        }, function(b) {
                            b.items && b.items.forEach(function(b) {
                                Qa(a, b, c, d)
                            });
                            za();
                            u.hide()
                        })
                    });
                    b.items && pa(m.body, b.items, null, d);
                    !ma.global && b.selected_default && D.push(function() {
                        d.getSelectedTab() || y.select()
                    })
                } else b.sub_menu_item ? (m = h("div", "section", b.name, b.id, "section"), f = h("div", "section_head", b.name, b.id, "head"), k = h("table", "section_content", b.name, b.id, "content"), f.textContent = b.name, m.appendChild(f), b.desc && n.setHelp(b.desc, f, f, b), m.appendChild(k), pa(k, b.items,
                        b, d), b.need_save && k.appendChild(ab(k, b)), e.push(m)) : b.userscript || b.nativeScript ? (e = fb(b, a, d), b.userscript && (V[b.uuid] = {
                        dom: a,
                        script: b
                    }), a.setAttribute("class", "scripttr"), b.nnew ? a.setAttribute("style", "display: none;") : ya.is("script_refresh") || (D.push(function() {
                        Ca.init(x.map(V, function(a) {
                            return a.script
                        }));
                        w.multiselect.single_click();
                        Pa();
                        ma.scripts = !0;
                        ya.clear()
                    }), ya.add("script_refresh"))) : b.version ? (xa = b.value, h("div", "version", "version", "version").textContent = "v" + xa + " by Jan Biniok") : b.globalhint ?
                    Ra({
                        text: b.value,
                        title: b.description,
                        onclick: b.info_url ? function() {
                            Ba(b.info_url, !0)
                        } : null,
                        image: b.image
                    }) : (f = t("span", "", b.uuid || b.id + b.name), f.textContent = b.name, e = Array(13), e[3] = f);
                e.forEach(function(a) {
                    if (a) {
                        void 0 !== b.level && (a.element || a).setAttribute("style", b.level > q.configMode ? x.staticVars.invisible : x.staticVars.visible || "");
                        if (b.hint) {
                            var c = t("span", "", b.uuid || b.id + b.name, "hint");
                            c.textContent = b.hint;
                            a.appendChild(c)
                        }
                        b.validation && gb(b, a.validation || a.element || a);
                        b.width && a.setAttribute("class",
                            "width-172-" + b.width)
                    }
                });
                a && (k = a.getAttribute("class"), f = " hide", !1 === b.visible ? k = (k || "") + f : k && (k = k.replace(f, "")), a.setAttribute("class", k));
                return e
            },
            pa = function(a, b, c, d) {
                Object.keys(b).forEach(function(l) {
                    var e = b[l],
                        f = a ? h("tr", "settingstr", e.uuid || e.id + e.name, "pi") : null;
                    (l = Qa(f, e, c, d)) && l.length && (a && a.appendChild(f), x.each(l, function(a, b) {
                        var c = a,
                            d = "";
                        "Object" === x.toType(a) && (c = a.element, d = a.style || "");
                        d = h("td", d + "settingstd", "", e.uuid || e.id + e.name, b);
                        a && d.appendChild(c);
                        f && f.appendChild(d)
                    }))
                })
            },
            ka = function(a) {
                var b = a.msg || a;
                if (a.once) {
                    if (Ka[b]) return !0;
                    Ka[b] = !0
                }
                var b = confirm(b),
                    c = {};
                b && a.ok ? c = a.ok : !b && a.cancel && (c = a.cancel);
                if (a.ok || a.cancel) b = !0;
                c.url && sendMessage({
                    method: "newTab",
                    url: c.url
                }, function(a) {});
                return b
            },
            gb = function(a, b) {
                var c;
                a.validation && (a.validation.url && (c = function() {
                    Ba(this.url, !0)
                }), a.validation.image && (a.validation.imageURL = N.get(a.validation.image)), c = n.createAfterIcon(a, c)) && (c.url = a.validation ? a.validation.url : void 0, b.appendChild(c))
            },
            hb = function(a) {
                return {
                    source: a.code,
                    meta: {
                        name: a.name,
                        uuid: a.uuid,
                        modified: a.lastModified,
                        file_url: a.file_url && a.file_url.trim() ? a.file_url : void 0
                    },
                    storage: a.storage,
                    options: a.options,
                    settings: {
                        enabled: a.enabled,
                        position: a.position
                    }
                }
            },
            qa = function(a, b) {
                var c = I(),
                    d = [];
                ib(a, b).done(function(a) {
                    a.scripts.forEach(function(a) {
                        a.uuid && a.userscript && !a.system && !a.nnew && (a.code && "" != a.code.trim() ? d.push(hb(a)) : console.log("options: Strange script: " + a.name))
                    });
                    c.resolve({
                        scripts: d,
                        global_settings: a.global_settings
                    })
                }).fail(function() {
                    c.reject()
                });
                return c.promise()
            },
            jb = function(a) {
                var b, c, d = t("div", "help", "help", "tab_help_h");
                d.textContent = e.getMessage("Help");
                var l = t("div", "help", "help", "tab_help");
                return a.appendTab("help", d, l, function() {
                    J.set("help");
                    if (!c) {
                        u.wait();
                        var a = h("div", "section", "help", "help", "ta"),
                            d = h("div", "section_head", "help", "help", "head_ta"),
                            m = h("div", "section_content", "help", "help", "content_ta");
                        d.textContent = e.getMessage("Editor");
                        a.appendChild([d, m]);
                        var k = h("dl", "dl-horizontal shortcuts", "help", "help", "dl");
                        m.appendChild(k);
                        d = h("dt", "keymapping", "help", "help", "dt_mapping");
                        b = h("dd", "keymapping", "help", "help", "dd_mapping");
                        d.textContent = e.getMessage("Key_Mapping");
                        b.textContent = q.editor_keyMap;
                        k.appendChild([d, b]);
                        if ("vim" == q.editor_keyMap) b = h("dd", "keymapping", "help", "help", "dd_unsup"), b.textContent = e.getMessage("Please_check_the_0editor0_documentation_for_more_details_", "VIM"), k.appendChild(b);
                        else if ("emacs" == q.editor_keyMap) b = h("dd", "keymapping", "help", "help", "dd_unsup"), b.textContent = e.getMessage("Please_check_the_0editor0_documentation_for_more_details_",
                            "Emacs"), k.appendChild(b);
                        else {
                            var r = [];
                            c = {};
                            var p = function(a) {
                                a = a.split(/-+/);
                                var b = a.pop(),
                                    c = [],
                                    d = ""; - 1 != (d = ["up", "down", "left", "right"].indexOf(b.toLowerCase())) && c.push("#cursor");
                                b.toLowerCase().match(/f[0-9]{1,2}/) && c.push("#function");
                                return c.length ? c.join("-") + a.join("-") + d + b : ("0000" + (100 - Math.min(b.length, 4))).slice(-4) + b + a.join("-")
                            };
                            [{
                                Esc: "backOrClose",
                                "Alt-Left": "previousTab",
                                "Alt-Right": "nextTab"
                            }, CodeMirror.keyMap[q.editor_keyMap], CodeMirror.keyMap.pcDefault, CodeMirror.keyMap["default"]].forEach(function(a) {
                                Object.keys(a).forEach(function(b) {
                                    c[b] ||
                                        "fallthrough" == b || (r.push({
                                            name: b,
                                            fn: a[b].replace ? a[b].replace(/([A-Z])/g, " $1").replace(/ [A-Z]/g, function(a) {
                                                return a.toLowerCase()
                                            }) : a[b],
                                            sort: p(b)
                                        }), c[b] = !0)
                                })
                            });
                            r.sort(function(a, b) {
                                return a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0
                            });
                            r.forEach(function(a) {
                                var b = t("dt", "help", "help", "dt_" + a.sort),
                                    c = t("dd", "help", "help", "dd_" + a.sort);
                                b.textContent = a.name;
                                c.textContent = a.fn;
                                k.appendChild([b, c])
                            })
                        }
                        l.appendChild(a);
                        u.hide()
                    }
                })
            },
            lb = function(a) {
                var b = t("div", "utils", "utils", "tab_util_h");
                b.textContent = e.getMessage("Utilities");
                var c = t("div", "utils", "utils", "tab_util");
                a.appendTab("utils", b, c, function() {
                    J.set("utils")
                }).show();
                a = h("div", "tv_util", "utils", "utils", "tab_util_cont");
                var d = function(a) {
                        var b = I(),
                            c = new FileReader;
                        c.onload = function(a) {
                            b.resolve(a.target.result)
                        };
                        c.readAsText(a);
                        return b.promise()
                    },
                    l = n.createButton("utils", "utils_i_ta", e.getMessage("Import"), function() {
                        U.json.read(W.value).then(function(a) {
                            return Da(a, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err && x.alert(a.err)
                        }).fail(function() {
                            x.alert(e.getMessage("Unable_to_parse_this_"))
                        })
                    }),
                    g = n.createFileSelect(e.getMessage("Import"), {
                        name: "zip",
                        id: "utils"
                    }, function(a) {
                        u.wait();
                        for (var b = 0, c; c = a[b]; b++) U.zip.read(c).progress(function(a) {
                            u.wait(Math.floor(a.item / a.of * 100) + "%")
                        }).then(function(a) {
                            return Da({
                                scripts: x.map(a.scripts, function(a) {
                                    var b = a.meta || {},
                                        c = a.settings || {};
                                    return {
                                        source: a.source,
                                        name: b.name,
                                        uuid: b.uuid,
                                        file_url: b.file_url,
                                        options: a.options,
                                        storage: a.storage,
                                        lastModified: b.modified,
                                        enabled: c.enabled,
                                        position: c.position
                                    }
                                }),
                                global_settings: a.global_settings
                            }, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err &&
                                x.alert(a.err)
                        }).fail(function() {
                            x.alert(e.getMessage("Unable_to_parse_this_"))
                        }).always(u.hide)
                    }),
                    f = n.createFileSelect(e.getMessage("Import"), {
                        name: "file",
                        id: "utils"
                    }, function(a) {
                        for (var b = 0, c; c = a[b]; b++) d(c).then(function(a) {
                            return U.json.read(a)
                        }).then(function(a) {
                            return Da(a, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err && x.alert(a.err)
                        }).fail(function() {
                            x.alert(e.getMessage("Unable_to_parse_this_"))
                        })
                    }),
                    b = n.createButton("utils", "utils_i_url", e.getMessage("Import"), function() {
                        u.wait();
                        return kb(B.value, {
                            reload: !0
                        }).fail(function(a) {
                            a = a.err ? a.err : e.getMessage("Unable_to_parse_this_");
                            x.alert(a)
                        }).always(u.hide)
                    }),
                    m = n.createButton("utils", "utils_e_ta", e.getMessage("Export"), function() {
                        qa(null, {
                            storage: ba,
                            global_settings: ja
                        }).then(function(a) {
                            return U.json.create(a.scripts, a.global_settings)
                        }).done(function(a) {
                            W.value = a
                        })
                    }),
                    k = n.createButton("utils", "utils_e_file", e.getMessage("Export"), function() {
                        qa(null, {
                            storage: ba,
                            global_settings: ja
                        }).then(function(a) {
                            return U.json.download(a.scripts, a.global_settings)
                        })
                    }),
                    r = n.createButton("utils", "utils_e_zip", e.getMessage("Export"), function() {
                        qa(null, {
                            storage: ba,
                            global_settings: ja
                        }).then(function(a) {
                            u.wait();
                            return U.zip.download(a.scripts, a.global_settings).progress(function(a) {
                                u.wait(Math.floor(a.item / a.of * 100) + "%")
                            })
                        }).always(function() {
                            u.hide()
                        })
                    }),
                    p = n.createCheckbox(e.getMessage("Include_TM_settings"), {
                        id: "utils_e_export_tm_settings",
                        enabled: "true"
                    }, function() {
                        ja = this.checked
                    });
                p.elem.setAttribute("style", "padding-left: 2px");
                p.input.checked = ja;
                var y = n.createCheckbox(e.getMessage("Include_script_storage"), {
                    id: "utils_e_export_storage",
                    enabled: "true"
                }, function() {
                    ba = this.checked
                });
                y.elem.setAttribute("style", "padding-left: 2px; display: inline");
                y.input.checked = ba;
                var W = h("textarea", "importta", "utils", "utils", "ta");
                W.setAttribute("spellcheck", "false");
                var A = h("div", "section", "utils", "utils", "ta"),
                    C = h("div", "section_head", "utils", "utils", "head_ta"),
                    L = h("div", "section_content", "utils", "utils", "content_ta");
                C.textContent = e.getMessage("General");
                L.appendChild(y.elem);
                L.appendChild(p.elem);
                A.appendChild(C);
                A.appendChild(L);
                p = h("div", "section", "utils", "utils", "ta");
                y = h("div", "section_head", "utils", "utils", "head_ta");
                C = h("div", "section_content", "utils", "utils", "content_ta");
                y.textContent = e.getMessage("TextArea");
                C.appendChild(m);
                C.appendChild(l);
                C.appendChild(W);
                p.appendChild(y);
                p.appendChild(C);
                l = h("div", "section", "utils", "utils", "sb");
                m = h("div", "section_head", "utils", "utils", "head_sb");
                y = h("div", "section_content", "utils", "utils", "content_sb");
                m.textContent = e.getMessage("Zip");
                l.appendChild(m);
                l.appendChild(y);
                y.appendChild(r);
                y.appendChild(g.elem);
                g = h("div", "section", "utils", "utils", "fi");
                r = h("div", "section_head", "utils", "utils", "head_fi");
                m = h("div", "section_content", "utils", "utils", "content_fi");
                r.textContent = e.getMessage("File");
                g.appendChild(r);
                g.appendChild(m);
                m.appendChild(k);
                m.appendChild(f.elem);
                var B = h("input", "updateurl_input", "utils", "utils", "url");
                B.setAttribute("type", "text");
                B.setAttribute("spellcheck", "false");
                f = h("div", "section", "utils", "utils", "ur");
                k = h("div", "section_head", "utils", "utils",
                    "head_ur");
                r = h("div", "section_content", "utils", "utils", "content_ur");
                k.textContent = e.getMessage("URL");
                f.appendChild(k);
                f.appendChild(r);
                r.appendChild(B);
                r.appendChild(b);
                a.appendChild(A);
                z.RUNTIME.CAN_SAVEAS_ZIP && a.appendChild(l);
                "undefined" !== typeof Blob && a.appendChild(g);
                a.appendChild(p);
                a.appendChild(f);
                x.each([p], function(a) {
                    var b = a.getAttribute("class"),
                        b = 50 > q.configMode ? b + " hide" : b.replace(" hide", "");
                    a.setAttribute("class", b)
                });
                c.appendChild(a)
            },
            mb = function() {
                var a = document.getElementById("options"),
                    b = h("div", "content_wrapper", "options", "main");
                if (a) {
                    var c = a.parentNode;
                    c.removeChild(a);
                    c.appendChild(b);
                    document.body.setAttribute("class", "main")
                }
                var a = h("div", "head_container", "opt", "head_container"),
                    c = h("div", "tv_container_fit", "opt", "tv_container"),
                    d = t("a", "head_link", "heads", "head_link");
                d.href = "http://tampermonkey.net";
                d.target = "_blank";
                var e = h("div", "float", "heads", "head1"),
                    g = h("img", "banner", "heads");
                g.src = rea.extension.getURL("images/icon128.png");
                var f = h("div", "float head", "heads", "head2"),
                    m = h("div", "header_title", "heads"),
                    k = h("div", "version", "version", "version");
                k.textContent = " by Jan Biniok";
                var r = t("div", "search", "box", "");
                m.textContent = "Tampermonkey";
                e.appendChild(g);
                f.appendChild(m);
                f.appendChild(k);
                d.appendChild(e);
                d.appendChild(f);
                a.appendChild(d);
                a.appendChild(r);
                b.appendChild(a);
                b.appendChild(c);
                O = Ia.create("_main", c);
                D.unshift(function() {
                    lb(O);
                    jb(O)
                });
                D.push(function() {
                    void 0 !== ca.contribute && window.setTimeout(Sa, 100);
                    ma.global = !0
                })
            },
            Q = function(a, b, c, d) {
                void 0 === d && (d = {});
                var l = b.item,
                    g = l.uuid + (d.orig || "") + b.id,
                    f = (d.orig ? "orig_" : "use_") + b.id,
                    m = function(a) {
                        return "select_" + x.createUniqueId(a, l.uuid) + "_sel1"
                    },
                    k = h("div", "cludes", a, g, "cb1"),
                    r = t("span", a, g, "cb2");
                if (d.orig) {
                    var p = "merge_" + b.id,
                        p = n.createCheckbox(a, {
                            id: p,
                            uuid: l.uuid,
                            enabled: l.options && l.options.override && l.options.override[p] ? !0 : !1
                        }, function() {
                            if ("checkbox" == this.type) {
                                var a = {};
                                a[this.key] = this.checked;
                                fa(this.uuid, a)
                            }
                        });
                    r.appendChild(p.elem)
                } else r.textContent = a;
                var y = h("select", "cludes", f, l.uuid, "sel1");
                y.innerHTML = "";
                y.setAttribute("size", "6");
                y.setAttribute("multiple", "true");
                for (f = 0; f < c.length; f++) p = document.createElement("option"), p.value = p.text = c[f], y.appendChild(p);
                k.appendChild(r);
                l.desc && n.setHelp(l.desc, k, r, l);
                k.appendChild(y);
                var q = function(a) {
                        var b = [];
                        a = a && a.options;
                        for (var c = 0, d = a.length; c < d; c++) a[c].selected && b.push(a[c]);
                        return b
                    },
                    f = function() {
                        var a = m("use_" + ("excludes" == b.id ? "includes" : "excludes")),
                            c = document.getElementById(a),
                            a = q(y),
                            d = !1,
                            e = "matches" == b.id;
                        a.forEach(function(a) {
                            var b =
                                e ? "/" + ua.getRegExpFromMatch(a.value) + "/" : a.value;
                            a && !c.querySelector('option[value="' + b + '"]') && (a = a.cloneNode(!0), e && (a.value = b, a.textContent = b), c.appendChild(a), d = !0)
                        });
                        d && C()
                    },
                    p = function() {
                        var a = prompt(e.getMessage("Enter_the_new_rule"));
                        if (a) {
                            var b = document.createElement("option");
                            b.value = b.text = a.trim();
                            y.appendChild(b);
                            C()
                        }
                    },
                    r = function() {
                        var a = y.options[y.selectedIndex];
                        if (a) {
                            var b = prompt(e.getMessage("Enter_the_new_rule"), a.value);
                            b && (a.value = a.text = b.trim(), C())
                        }
                    };
                c = function() {
                    var a = !1;
                    q(y).forEach(function(b) {
                        b &&
                            (b.parentNode.removeChild(b), a = !0)
                    });
                    a && C()
                };
                var A = function(a) {
                        for (var b = [], c = 0; c < a.options.length; c++) b.push(a.options[c].value);
                        return b
                    },
                    C = function() {
                        var a = {
                            includes: A(document.getElementById(m("use_includes"))),
                            matches: A(document.getElementById(m("use_matches"))),
                            excludes: A(document.getElementById(m("use_excludes"))),
                            connects: A(document.getElementById(m("use_connects"))),
                            temp_connects: A(document.getElementById(m("use_temp_connects"))),
                            blockers: A(document.getElementById(m("use_blockers")))
                        };
                        fa(l.uuid,
                            a);
                        return !0
                    };
                d.other_name ? (a = t("button", a, g, "btn1"), a.textContent = e.getMessage("Add_as_0clude0", d.other_name), a.addEventListener("click", f, !1), k.appendChild(a)) : d.orig || (d = t("button", a, g, "btn2"), d.textContent = e.getMessage("Add") + "...", d.addEventListener("click", p, !1), k.appendChild(d), d = t("button", a, g, "btn3"), d.textContent = e.getMessage("Edit") + "...", d.addEventListener("click", r, !1), k.appendChild(d), a = t("button", a, g, "btn4"), a.textContent = e.getMessage("Remove"), a.addEventListener("click", c, !1), k.appendChild(a));
                return {
                    elem: k
                }
            },
            Ea = function(a) {
                return a.homepage ? a.homepage : a.namespace && 0 == a.namespace.search(/https?:\/\//) ? a.namespace : null
            };
        ta.create("sites").setOptions({
            timeout: 600,
            check_interval: 300,
            retimeout_on_get: !0
        }).init();
        var Ca = function() {
                var a = {},
                    b = function(a) {
                        return 7 > a.toString().length ? b("0" + a) : a
                    },
                    c = function(a) {
                        if (a.includes || a.matches) {
                            for (var b = {}, c = [], e = a.includes.length ? a.includes : a.matches, m = 0; m < e.length; m++) {
                                var k = e[m];
                                if (k) {
                                    var h = ta.items.sites.get(k),
                                        p = void 0 !== h ? h : n.getInfoFromUrl(k);
                                    void 0 ===
                                        h && ta.items.sites.set(k, p);
                                    p && p.dom ? b[p.dom] || (b[p.dom] = !0, c.push({
                                        include: k,
                                        info: p
                                    })) : c.push({
                                        include: k
                                    })
                                } else console.log("o: Warn: script '" + a.name + "' has invalid include (index: " + m + ")")
                            }
                            return c
                        }
                    };
                return {
                    init: function(b) {
                        a = {};
                        b.forEach(function(b) {
                            (b = c(b)) && b.length && b.forEach(function(b) {
                                b.info && (a[b.info.dom] = (a[b.info.dom] || 0) + 1)
                            })
                        })
                    },
                    get: function(d) {
                        d = c(d);
                        if (!d || !d.length) return b(0);
                        d = x.map(d, function(b) {
                            return b.info ? {
                                score: 1E3 * a[b.info.dom] + b.info.dom.charCodeAt(0) || 0,
                                dom: b.info.dom
                            } : {
                                score: 0,
                                dom: ""
                            }
                        }).sort(function(a, b) {
                            return b.score - a.score
                        })[0];
                        return b(d.score) + d.dom
                    },
                    topIcons: function(b, e) {
                        var g, f = [],
                            m = c(b);
                        if (!m || !m.length) return [];
                        m = x.map(m, function(b) {
                            b.score = b.info ? a[b.info.dom] || 0 : 0;
                            return b
                        }).sort(function(a, b) {
                            return b.score - a.score
                        });
                        x.each(m, function(a) {
                            var c = a.info;
                            if (0 == e--) return a = h("span", "", b.uuid, "tbc"), a.textContent = "...", f.push(a), !1;
                            if (c) {
                                if ("*" == c.tld) return g = n.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", b.uuid, a.include, a.include),
                                    f.push(g), !1;
                                var m = "com",
                                    y = "";
                                "*" != c.tld && "tld" != c.tld && (m = c.tld);
                                c.subdom.length && (y = c.subdom.join(".") + ".");
                                var q = ("chrome://favicon/http://" + y + c.dom + "." + m + "/").replace(/\*/g, ""),
                                    c = ("http://" + y + c.dom + "." + m + "/favicon.ico").replace(/\*/g, ""),
                                    q = [c, q];
                                if (0 == c.search("http://userscripts.org/") || 0 == c.search("http://userscripts.com/")) q = N.origin("uso");
                                g = n.createFavicon(q, "", b.uuid, a.include, a.include)
                            } else g = n.createFavicon("?", "", b.uuid, a.include, a.include);
                            f.push(g)
                        });
                        return f
                    }
                }
            }(),
            aa = function() {
                if (z.HTML5.LOCALSTORAGE) return z.HTML5.LOCALSTORAGE.getItem("sort_key")
            },
            ea = function() {
                if (z.HTML5.LOCALSTORAGE) return z.HTML5.LOCALSTORAGE.getItem("sort_sequence")
            },
            Oa = function(a) {
                if (z.HTML5.LOCALSTORAGE) return z.HTML5.LOCALSTORAGE.setItem("sort_key", a)
            },
            Na = function(a) {
                if (z.HTML5.LOCALSTORAGE) return z.HTML5.LOCALSTORAGE.setItem("sort_sequence", a)
            },
            Pa = function(a) {
                var b = function(a, c) {
                        return a.tagName == c ? a : a.parentNode ? b(a.parentNode, c) : null
                    },
                    c = null,
                    d = [],
                    l = 0,
                    g = Date.now();
                Object.keys(V).forEach(function(a) {
                    var k = V[a];
                    if (k)
                        if (a = b(k.dom, "TR")) {
                            var f = b(a, "TBODY");
                            c ? f && c != f &&
                                console.warn("options: different parents?!?!") : c = f;
                            l++;
                            f = g - parseInt(k.script.lastUpdated);
                            isNaN(f) && (f = 0);
                            var h = parseInt(k.script.version);
                            isNaN(h) && (h = 0);
                            d.push({
                                tr: a,
                                sites: Ca.get(k.script),
                                position: k.script.position ? k.script.position : 1E3 + l,
                                name: e.getTranslation(k.script, "name").toLowerCase(),
                                homepage: [k.script.origin ? ua.parse(k.script.origin.url).hostname : "z", Ea(k.script) ? ua.parse(Ea(k.script)).hostname : "z"].join("_"),
                                updated: f,
                                version: h
                            });
                            a.inserted = !1;
                            a.parentNode && a.parentNode.removeChild(a)
                        } else console.log("options: unable to sort script at pos " +
                            k.pos);
                    else console.warn("options: something went wrong!", a)
                });
                d = function(a) {
                    var b;
                    b = function(a) {
                        return function(b, c) {
                            return b[a] - c[a]
                        }
                    };
                    var c = function(a) {
                            return function(b, c) {
                                return b[a] < c[a] ? -1 : b[a] > c[a] ? 1 : 0
                            }
                        },
                        d = aa();
                    b = "pos" == d ? b("position") : "ver" == d ? b("version") : "updated" == d ? b("updated") : c(d);
                    a.sort(b);
                    return a
                }(d);
                "down" == ea() && (d = d.reverse());
                for (var f = 0; f < l; f++) c.appendChild(d[f].tr);
                $(".sorting").each(function(a, b) {
                    var c = $(b),
                        d = "pos" == aa() && "up" == ea();
                    c[d ? "fadeIn" : "fadeOut"]()
                });
                a && a()
            },
            qb =
            function(a, b, c, d, l) {
                c = t("div", b.uuid, "script_tab_head");
                var g = c.inserted,
                    f = h("div", "heading", b.uuid, "heading"),
                    m = h("img", "nameNicon64", b.uuid, "heading_icon"),
                    k = b.icon64 ? b.icon64 : b.icon;
                m.src = k;
                var r = h("div", "nameNname64", b.uuid, "heading_name");
                r.textContent = e.getTranslation(b, "name");
                k && f.appendChild(m);
                f.appendChild(r);
                m = h("div", "author", b.uuid, "author");
                b.author ? m.textContent = "by " + b.author : b.copyright && (m.innerHTML = "&copy; ", m.textContent += b.copyright);
                var k = h("table", "noborder p100100", b.uuid,
                        "table"),
                    r = h("tr", "script_tab_head", b.uuid, "tr1"),
                    p = h("tr", "details", b.uuid, "tr2"),
                    n = h("td", "", b.uuid, "td1"),
                    u = h("td", "", b.uuid, "td2");
                f.appendChild(m);
                c.appendChild(f);
                n.appendChild(c);
                r.appendChild(n);
                p.appendChild(u);
                k.appendChild(r);
                k.appendChild(p);
                d.appendChild(k);
                var A = Ia.create("_details" + b.uuid, u, {
                        tv: "tv tv_alt",
                        tv_table: "tv_table tv_table_alt",
                        tr_tabs: "tr_tabs tr_tabs_alt",
                        tr_content: "tr_content tr_content_alt",
                        td_content: "td_content td_content_alt",
                        td_tabs: "td_tabs td_tabs_alt",
                        tv_tabs_align: "tv_tabs_align tv_tabs_align_alt",
                        tv_tabs_fill: "tv_tabs_fill tv_tabs_fill_alt",
                        tv_tabs_table: "tv_tabs_table tv_tabs_table_alt",
                        tv_contents: "tv_contents tv_contents_alt",
                        tv_tab_selected: "tv_tab tv_selected tv_tab_alt tv_selected_alt",
                        tv_tab_close: "",
                        tv_tab: "tv_tab tv_tab_alt",
                        tv_content: "tv_content tv_content_alt"
                    }),
                    C = nb(b, A, l),
                    w = b.nnew || b.system ? {} : ob(b, A),
                    B = b.nnew || b.system || !b.requires.length && !b.resources.length ? {} : pb(b, A);
                if (g) return Z["tab" + b.uuid];
                var v = function(b) {
                    var c = !1;
                    if ("keydown" == b.type && a.isSelected()) {
                        if (27 == b.keyCode) q.editor_enabled &&
                            "vim" == q.editor_keyMap || (window.setTimeout(l, 1), c = !0);
                        else if (q.editor_enabled) {
                            var d = {
                                    save: !0,
                                    find: !0,
                                    findNext: !0,
                                    findPrev: !0,
                                    replace: !0,
                                    replaceAll: !0
                                },
                                e = C.getEditor(),
                                f = CodeMirror.keyName(b);
                            e && !e.hasFocus() && "handled" == CodeMirror.lookupKey(f, e.getOption("keyMap"), function(a) {
                                if (d[a]) return e.execCommand(a), !0
                            }) && (c = !0)
                        } else 83 == b.keyCode && b.ctrlKey && (f = C.getEditor()) && (f.save(), c = !0);
                        if (c) return b.stopPropagation(), b.preventDefault(), !1
                    }
                };
                d = {
                    onShow: function() {
                        x.each([w, C, B], function(a) {
                            if (a.onShow) a.onShow()
                        });
                        window.addEventListener("keydown", v, !1)
                    },
                    onClose: function(a) {
                        var b;
                        x.each([w, C, B], function(c) {
                            if (c.onClose && c.onClose(a)) return b = !0, !1
                        });
                        b || window.removeEventListener("keydown", v, !0);
                        return b
                    },
                    afterSelect: function() {
                        if (b.uuid) {
                            var a = J.get().sub,
                                c = A.getTabById(a);
                            J.set(b.uuid, (c ? a : null) || "editor")
                        }
                        x.each([w, C, B], function(a) {
                            a.afterSelect && a.afterSelect()
                        })
                    }
                };
                return Z["tab" + b.uuid] = d
            },
            ob = function(a, b) {
                var c = t("div", a.uuid, "script_setting_h"),
                    d = t("div", a.uuid, "script_settings_c");
                c.textContent = e.getMessage("Settings");
                var l, g = function() {
                        if ("checkbox" == this.type || "button" == this.type) l = {}, l[this.key] = !this.oldvalue, fa(this.uuid, l);
                        else if ("text" == this.type || "textarea" == this.type || "select-one" == this.type) {
                            var a = n.getValue(this);
                            l = {};
                            l[this.key] = a;
                            fa(this.uuid, l)
                        }
                    },
                    f = n.createPosition(e.getMessage("Position_") + ": ", {
                        id: "position",
                        uuid: a.uuid,
                        name: "pos",
                        pos: a.position,
                        posof: a.positionof
                    }, g),
                    m = n.createDropDown(e.getMessage("Run_at"), {
                        id: "run_at",
                        uuid: a.uuid,
                        name: "run-at",
                        value: a.run_at
                    }, [{
                        name: "document-start",
                        value: "document-start"
                    }, {
                        name: "document-body",
                        value: "document-body"
                    }, {
                        name: "document-end",
                        value: "document-end"
                    }, {
                        name: "document-idle",
                        value: "document-idle"
                    }, {
                        name: "context-menu",
                        value: "context-menu"
                    }, {
                        name: e.getMessage("Default"),
                        value: null
                    }], g),
                    k = n.createDropDown(e.getMessage("No_frames"), {
                        id: "noframes",
                        uuid: a.uuid,
                        name: "no_frames",
                        value: a.noframes
                    }, [{
                        name: e.getMessage("Yes"),
                        value: !0
                    }, {
                        name: e.getMessage("No"),
                        value: !1
                    }, {
                        name: e.getMessage("Default"),
                        value: null
                    }], g),
                    r = function(b) {
                        return (a.options && a.options.override ? a.options.override[b] :
                            null) || []
                    },
                    p = Q(e.getMessage("Original_includes"), {
                        id: "includes",
                        item: a
                    }, r("orig_includes"), {
                        orig: !0,
                        other_name: e.getMessage("User_excludes")
                    }),
                    q = Q(e.getMessage("Original_matches"), {
                        id: "matches",
                        item: a
                    }, r("orig_matches"), {
                        orig: !0,
                        other_name: e.getMessage("User_excludes")
                    }),
                    u = Q(e.getMessage("Original_excludes"), {
                        id: "excludes",
                        item: a
                    }, r("orig_excludes"), {
                        orig: !0,
                        other_name: e.getMessage("User_includes")
                    }),
                    A = h("div", "clear", a.uuid, "clear"),
                    C = Q(e.getMessage("User_includes"), {
                        id: "includes",
                        item: a
                    }, r("use_includes")),
                    x = Q(e.getMessage("User_matches"), {
                        id: "matches",
                        item: a
                    }, r("use_matches")),
                    w = Q(e.getMessage("User_excludes"), {
                        id: "excludes",
                        item: a
                    }, r("use_excludes")),
                    v = Q(e.getMessage("Original_domain_whitelist"), {
                        id: "connects",
                        item: a
                    }, a.connects, {
                        orig: !0
                    }),
                    F = Q(e.getMessage("Temporary_domain_whitelist"), {
                        id: "temp_connects",
                        item: a
                    }, a.temp_connects),
                    D = Q(e.getMessage("User_domain_whitelist"), {
                        id: "connects",
                        item: a
                    }, r("use_connects")),
                    r = Q(e.getMessage("User_domain_blacklist"), {
                        id: "blockers",
                        item: a
                    }, r("use_blockers")),
                    E =
                    n.createCheckbox(e.getMessage("Apply_compatibility_options_to_required_script_too"), {
                        id: "compatopts_for_requires",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compatopts_for_requires
                    }, g),
                    X = n.createCheckbox(e.getMessage("Fix_wrappedJSObject_property_access"), {
                        id: "compat_wrappedjsobject",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_wrappedjsobject
                    }, g),
                    G = n.createCheckbox(e.getMessage("Convert_CDATA_sections_into_a_chrome_compatible_format"), {
                        id: "compat_metadata",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_metadata
                    }, g),
                    da = n.createCheckbox(e.getMessage("Replace_for_each_statements"), {
                        id: "compat_foreach",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_foreach
                    }, g),
                    M = n.createCheckbox(e.getMessage("Fix_for_var_in_statements"), {
                        id: "compat_forvarin",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_forvarin
                    }, g),
                    Y = n.createCheckbox(e.getMessage("Convert_Array_Assignements"), {
                        id: "compat_arrayleft",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_arrayleft
                    }, g),
                    P = n.createCheckbox(e.getMessage("Add_toSource_function_to_Object_Prototype"), {
                        id: "compat_prototypes",
                        uuid: a.uuid,
                        name: "",
                        enabled: a.compat_prototypes
                    }, g),
                    z = [E, X, G,
                        da, M, Y, P
                    ],
                    E = h("div", "section", a.uuid, "ta_opt"),
                    G = h("div", "section_head", a.uuid, "head_ta_opt"),
                    X = h("div", "section_content", a.uuid, "content_ta_opt");
                G.textContent = e.getMessage("Settings");
                E.appendChild(G);
                E.appendChild(X);
                G = h("div", "section", a.uuid, "ta_cludes");
                M = h("div", "section_head", a.uuid, "head_ta_cludes");
                da = h("div", "section_content", a.uuid, "content_ta_cludes");
                M.textContent = e.getMessage("Includes_Excludes");
                G.appendChild(M);
                G.appendChild(da);
                M = h("div", "section", a.uuid, "ta_security");
                P = h("div",
                    "section_head", a.uuid, "head_ta_security");
                Y = h("div", "section_content", a.uuid, "content_ta_security");
                P.textContent = e.getMessage("XHR_Security");
                M.appendChild(P);
                M.appendChild(Y);
                var P = h("div", "section", a.uuid, "ta_compat"),
                    I = h("div", "section_head", a.uuid, "head_ta_compat"),
                    Ma = h("div", "section_content", a.uuid, "content_ta_compat");
                I.textContent = e.getMessage("GM_compat_options_");
                P.appendChild(I);
                P.appendChild(Ma);
                X.appendChild(f);
                X.appendChild(m.elem);
                X.appendChild(k.elem);
                da.appendChild([p.elem, q.elem,
                    u.elem, A, C.elem, x.elem, w.elem
                ]);
                Y.appendChild([v.elem, F.elem, D.elem, r.elem]);
                d.appendChild([E, G, M]);
                for (f = 0; f < z.length; f++) Ma.appendChild(z[f].elem);
                a.awareOfChrome && Object.keys(z).forEach(function(a) {
                    z[a].input.setAttribute("disabled", "disabled");
                    z[a].elem.setAttribute("title", e.getMessage("This_script_runs_in_Chrome_mode"))
                });
                d.appendChild(P);
                var Aa = n.createTextarea(null, {
                    name: "",
                    uuid: a.uuid,
                    id: "comment",
                    value: a.options.comment
                });
                Aa.elem.setAttribute("class", "script_setting_wrapper");
                f = t("div",
                    a.uuid, "save");
                m = n.createButton("save_button", a.uuid, e.getMessage("Save"), function() {
                    g.apply(Aa.textarea, [])
                });
                f.appendChild(m);
                m = h("div", "section", a.uuid, "ta_comment");
                k = h("div", "section_head", a.uuid, "head_ta_comment");
                p = h("div", "section_content", a.uuid, "content_ta_comment");
                k.textContent = e.getMessage("Comment");
                m.appendChild(k);
                m.appendChild(p);
                p.appendChild(Aa.elem);
                p.appendChild(f);
                d.appendChild(m);
                f = h("div", "section", a.uuid, "ta_det");
                m = h("div", "section_head", a.uuid, "head_ta_det");
                k = h("div", "section_content",
                    a.uuid, "content_ta_det");
                m.textContent = e.getMessage("Details");
                f.appendChild(m);
                f.appendChild(k);
                m.textContent = e.getMessage("Details");
                var La = h("table", "script_details", a.uuid, "script_details");
                [{
                    label: e.getMessage("Size"),
                    value: (a.code ? a.code : a).length + " Bytes"
                }, {
                    label: e.getMessage("UUID"),
                    value: a.uuid
                }].forEach(function(b) {
                    var c = h("tr", "external_desc", a.uuid, b.label, "tr"),
                        d = h("td", "external_desc", a.uuid, b.label, "td1"),
                        e = h("td", "", a.uuid, b.label, "td2");
                    d.textContent = b.label;
                    e.textContent = b.value;
                    c.appendChild(d);
                    c.appendChild(e);
                    La.appendChild(c)
                });
                k.appendChild(La);
                d.appendChild(f);
                var bb = b.appendTab("settings", c, d, function() {
                    J.setSub("settings")
                });
                J.registerListener(a.uuid, "settings", function() {
                    bb.select()
                });
                return {}
            },
            Ta = function(a, b) {
                var c = h("table", "script_desc", a.uuid, "outer_req2html"),
                    d = 0,
                    l = [{
                        label: e.getMessage("URL"),
                        prop: "display_url"
                    }, {
                        label: e.getMessage("Size"),
                        prop: "data",
                        fn: function(a) {
                            var b = "?";
                            a && (void 0 !== a.length ? b = a.length : void 0 !== a.content && (b = a.content.length));
                            return b +
                                " Bytes"
                        }
                    }, {
                        label: e.getMessage("Subresource_Integrity"),
                        prop: "sri",
                        fn: function(a) {
                            return a ? a.type + "=" + a.value : e.getMessage("_not_set_")
                        }
                    }, {
                        label: e.getMessage("Last_updated"),
                        prop: "ts",
                        fn: function(a) {
                            return a ? (new Date(a)).toString() : "?"
                        }
                    }];
                a[b].forEach(function(f) {
                    var k = d + b;
                    l.forEach(function(b) {
                        var d = h("tr", "external_desc", a.uuid, b.prop, "tr" + k),
                            e = h("td", "external_desc", a.uuid, b.prop, "td1" + k),
                            l = h("td", "", a.uuid, b.prop, "td2" + k);
                        e.textContent = b.label;
                        l.textContent = (b.fn ? b.fn : function(a) {
                            return a
                        })(f[b.prop]);
                        d.appendChild(e);
                        d.appendChild(l);
                        c.appendChild(d)
                    });
                    var g = h("tr", "external_desc_buttons", a.uuid, f.url, "tr" + k),
                        p = h("td", "", a.uuid, "buttons", "td" + k);
                    g.appendChild(p);
                    c.appendChild(g);
                    if (f.ts) {
                        var g = t("div", a.uuid, "delete_external" + k),
                            q = n.createButton(a.uuid, "delete_external" + x.createUniqueId(f.url) + k, e.getMessage("Delete"), function() {
                                rb(a.uuid, f.url);
                                q.parentNode && q.parentNode.removeChild(q)
                            });
                        g.appendChild(q);
                        p.appendChild(g)
                    }
                    d++
                });
                if (!d) {
                    var g = h("tr", "script_desc", a.uuid, d, "tr"),
                        f = h("td", "script_desc",
                            a.uuid, d, "td1");
                    f.textContent = e.getMessage("No_entry_found");
                    g.appendChild(f);
                    c.appendChild(g)
                }
                return c
            },
            pb = function(a, b) {
                var c = t("div", "", a.uuid, "script_external_h");
                c.textContent = e.getMessage("Externals");
                var d = t("div", "", a.uuid, "script_externals_c"),
                    l = h("div", "section", a.uuid, "ta_requires"),
                    g = h("div", "section_head", a.uuid, "head_ta_requires"),
                    f = h("div", "section_content", a.uuid, "content_ta_requires");
                g.textContent = e.getMessage("Requires");
                l.appendChild(g);
                l.appendChild(f);
                f.appendChild(Ta(a, "requires"));
                var g = h("div", "section", a.uuid, "ta_resources"),
                    f = h("div", "section_head", a.uuid, "head_ta_resources"),
                    m = h("div", "section_content", a.uuid, "content_ta_resources");
                f.textContent = e.getMessage("Resources");
                g.appendChild(f);
                g.appendChild(m);
                m.appendChild(Ta(a, "resources"));
                d.appendChild(l);
                d.appendChild(g);
                var k = b.appendTab("externals", c, d, function() {
                    J.setSub("externals")
                });
                J.registerListener(a.uuid, "externals", function() {
                    k.select()
                });
                return {}
            },
            Ua = function(a) {
                if(ca.url){
                    var url=$a.Base64.decode(ca.url);
                    url=url.match(/.+\//)+'*';
                    var site=url.match(/\/\/(.+?)\//)[1];
                    a=a.replace('NewUserscript',site);
                }
                return a.replace("<$URL$>", ca.url ? url :
                    "http://*/*")
            },
            nb = function(a, b, c) {
                var d = h("tr", "editor_container p100100", a.uuid, "container");
                if (!a.nnew && E(a.uuid, "lastI")) return Z["editor" + a.uuid] || {};
                a.nnew && (a.code = Ua(q.script_templates[0].value));
                var l = t("div", a.uuid, "script_editor_h"),
                    g = l.inserted;
                l.textContent = e.getMessage("Editor");
                var f = t("div", a.uuid, "script_editor_c"),
                    m = h("tr", "editormenubar", a.uuid, "container_menu"),
                    k = h("table", "editor_container_o p100100 noborder", a.uuid, "container_o");
                k.appendChild(m);
                k.appendChild(d);
                f.appendChild(k);
                var r = function() {
                        var b = !1;
                        d.editor && (b = q.editor_enabled ? b | (d.editor.changed && d.editor.mirror.historySize().undo) : d.editor.value != a.code);
                        return b
                    },
                    p = function(b) {
                        E(a.uuid, "saveEm")
                    },
                    y = function(a, b, d) {
                        c && c(b, d)
                    },
                    k = n.createImageButton(a.uuid, "save_to_disk", e.getMessage("Save_to_disk"), rea.extension.getURL("/layout/default/images/harddrive2.png"), function() {
                        E(a.uuid, "saveToDisk")
                    }),
                    W = n.createImageButton(a.uuid, "save", e.getMessage("Save"), rea.extension.getURL("/layout/default/images/filesave.png"), p),
                    A = n.createImageButton(a.uuid, "cancel", e.getMessage("Editor_reset"), rea.extension.getURL("/layout/default/images/editor_cancel.png"), function() {
                        confirm(e.getMessage("Really_reset_all_changes_")) && d.editor && (q.editor_enabled ? d.editor.mirror.setValue(a.code) : d.editor.value = a.code)
                    }),
                    C = n.createImageButton(a.uuid, "reset", e.getMessage("Full_reset"), rea.extension.getURL("/layout/default/images/script_cancel.png"), function() {
                        confirm(e.getMessage("Really_factory_reset_this_script_")) && w[a.uuid].fullReset(function(a) {
                            a.cleaned &&
                                y(null, !0, !1)
                        })
                    }),
                    L = n.createImageButton(a.uuid, "close_script", e.getMessage("Close"), rea.extension.getURL("/layout/default/images/exit.png"), y),
                    B = n.createImageButton(a.uuid, "lint_script", e.getMessage("Run_syntax_check"), rea.extension.getURL("/layout/default/images/check.png"), function() {
                        window.setTimeout(function() {
                            var a;
                            q.editor_enabled && (a = d.editor) && (u.wait(), window.setTimeout(function() {
                                a.mirror.performLint(!0);
                                var b = window.JSHINT.errors;
                                if (b && b.length) {
                                    1 === b.length ? Va(e.getMessage("One_error_or_hint_was_found_")) :
                                        Va(e.getMessage("0count0_errors_or_hints_were_found_", b.length));
                                    for (var c, d = 0; c = b[d]; d++)
                                        if (1 < c.line) {
                                            a.mirror.setCursor(c.line - 1, c.character - 1);
                                            a.mirror.focus();
                                            break
                                        }
                                } else Wa(e.getMessage("No_syntax_errors_were_found_"));
                                u.hide()
                            }, 100))
                        }, 1)
                    }),
                    v;
                a.nnew && (v = n.createDropDown(null, {
                    value: q.script_templates[0].name,
                    uuid: "template-select",
                    name: "template-select"
                }, q.script_templates.map(function(a) {
                    return {
                        name: a.name,
                        value: a.name
                    }
                }), function() {
                    var a = this;
                    if (r() && !confirm(e.getMessage("Really_reset_all_changes_"))) a.value =
                        a.oldvalue;
                    else {
                        var b = null;
                        q.script_templates.map(function(c) {
                            c.name === a.value && (b = Ua(c.value))
                        });
                        b ? (this.oldvalue = a.value, d.editor && (q.editor_enabled ? (d.editor.mirror.setValue(b), d.editor.changed = !1) : d.editor.value = b)) : a.value = a.oldvalue
                    }
                }));
                var F = n.createInput(e.getMessage("Update_URL_"), {
                    id: "file_url",
                    uuid: a.uuid,
                    name: "uu",
                    value: a.file_url
                });
                F.input.setAttribute("class", "updateurl_input");
                F.elem.setAttribute("class", "updateurl");
                var z = h("textarea", "editorta", a.uuid);
                z.setAttribute("wrap", "off");
                z.setAttribute("spellcheck", "false");
                var D = h("td", "editor_outer", a.uuid, "edit"),
                    X = h("div", "editor_100 editor_border", a.uuid, "edit"),
                    G = h("div", "editormenu", a.uuid, "editormenu");
                D.appendChild(X);
                m.appendChild(G);
                m.appendChild(F.elem);
                d.inserted || (X.appendChild(z), d.appendChild(D));
                w[a.uuid].saveToDisk = function() {
                    if (d.editor) {
                        var b = q.editor_enabled ? d.editor.mirror.getValue() : d.editor.value;
                        u.wait();
                        U.plain.download(a.name, b).always(function() {
                            u.hide()
                        })
                    }
                };
                a.system || (w[a.uuid].saveEm = function(b) {
                    if (d.editor) {
                        var c = !0;
                        q.showFixedSrc && (c = confirm(e.getMessage("Do_you_really_want_to_store_fixed_code_", e.getMessage("Show_fixed_source"))));
                        var f = q.editor_enabled ? d.editor.mirror.getValue() : d.editor.value;
                        c && Fa(a.uuid, f, {
                            old_url: F.input ? F.input.oldvalue : "",
                            new_url: F.input ? F.input.value : "",
                            clean: !1,
                            new_script: a.nnew,
                            auto_save: b && b.auto_save,
                            reload: !0,
                            lastModified: w[a.uuid].saveEm_lastModified
                        }).done(function(c) {
                            c.installed ? a.nnew ? y(null, !0, !1) : (d.editor.changed = !1, c.lastModified && (a.lastModified = c.lastModified)) : c.aborted ||
                                b && b.auto_save || (c.messages && c.messages.errors && c.messages.errors.length ? x.alert(c.messages.errors.join("\n")) : x.alert(e.getMessage("Unable_to_parse_this_")))
                        });
                        return c
                    }
                }, G.appendChild(k), G.appendChild(W), G.appendChild(A));
                a.nnew || G.appendChild(C);
                G.appendChild(L);
                !a.system && q.editor_enabled && G.appendChild(B);
                a.nnew && G.appendChild(v.elem);
                var da = b.appendTab("editor", l, f, function() {
                    J.setSub("editor")
                });
                J.registerListener(a.uuid, "editor", function() {
                    da.select();
                    q.editor_enabled && d.editor && (d.editor.refresh(),
                        d.editor.mirror.focus())
                });
                if (g) return Z["editor" + a.uuid];
                var M, Y, P = function(a, b, c, d) {
                        a = d.getValue();
                        if (a.length < q.editor_autoLintMaxLen) {
                            if (!Y) {
                                var e = d.getHelper(CodeMirror.Pos(0, 0), "lint");
                                Y = window.setTimeout(function() {
                                    Y = null;
                                    M = !0;
                                    var f = e(a, c, d);
                                    b(f)
                                }, 1)
                            }
                        } else M && (b([]), M = !1)
                    },
                    H = function(a) {
                        na("editor_theme", a, !0).done(function() {
                            Wa("Theme switched to " + a)
                        })
                    },
                    K = function() {
                        q.editor_autoSave && r() && E(a.uuid, "saveEm", {
                            auto_save: !0
                        })
                    };
                b = {
                    getEditor: function() {
                        if (d.editor) return q.editor_enabled ? d.editor.mirror : {
                            save: p
                        }
                    },
                    onShow: function() {
                        (function() {
                            if (a.referrer && void 0 === a.code) {
                                var b = I();
                                oa({
                                    referrer: a.referrer,
                                    uuid: a.uuid
                                }, function(c) {
                                    c.items ? (a.code = c.items[0], b.resolve()) : b.reject();
                                    u.hide()
                                });
                                return b.promise()
                            }
                            return I.Pledge()
                        })().done(function() {
                            var b = f.getElementsByTagName("textarea");
                            w[a.uuid].lastI = function() {
                                return a
                            };
                            if (b.length && !d.editor) {
                                var b = b[0],
                                    c = function() {
                                        d.editor && (d.editor.changed = !0)
                                    };
                                if (q.editor_enabled) {
                                    var l = b.parentNode;
                                    l.removeChild(b);
                                    d.editor = new MirrorFrame(l, {
                                        theme: q.editor_theme,
                                        fontSize: q.editor_fontSize,
                                        themeOptions: {
                                            all: Ja.editorThemes,
                                            onChange: H
                                        },
                                        value: a.code,
                                        indentUnit: Number(q.editor_indentUnit),
                                        indentWithTabs: "tabs" == q.editor_indentWithTabs,
                                        smartIndent: "classic" != q.editor_tabMode,
                                        indentByTab: "indent" == q.editor_tabMode,
                                        electricChars: "true" == q.editor_electricChars.toString(),
                                        lineNumbers: !0,
                                        lineWrapping: q.editor_lineWrapping,
                                        extraKeys: {
                                            Enter: "newlineAndIndentContinueComment"
                                        },
                                        keyMap: q.editor_keyMap,
                                        gutters: ["gutter", "CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                                        matchBrackets: !0,
                                        foldGutter: !0,
                                        styleActiveLine: !0,
                                        specifyMoreJsTokens: !0,
                                        styleSelectedText: !0,
                                        hintOptions: {
                                            keywords: va.globals
                                        },
                                        lint: {
                                            lintOnChange: q.editor_autoLint,
                                            async: q.editor_autoLint,
                                            getAnnotations: P,
                                            globals: va.globals,
                                            jshint_options: va.options
                                        },
                                        showTrailingSpace: q.editor_highlightTrailingWhitespace
                                    }, {
                                        save: p,
                                        close: y
                                    }, {
                                        change: c,
                                        blur: K
                                    }, e.getMessage)
                                } else d.editor = b, b.value = a.code
                            }
                        }).fail(function() {
                            y(null, !1, !0)
                        })
                    },
                    onClose: function(b) {
                        var c = function() {
                            d.editor = null;
                            delete w[a.uuid].lastI
                        };
                        if (!b &&
                            r()) return (b = confirm(e.getMessage("There_are_unsaved_changed_"))) && c(), !b;
                        c();
                        return !1
                    }
                };
                return Z["editor" + a.uuid] = b
            },
            fb = function(a, b, c) {
                w[a.uuid] || (w[a.uuid] = {});
                var d, l, g = a.icon && !a.nativeScript,
                    f = ["script_name"];
                a.nativeScript || f.push("clickable");
                a.blacklisted && f.push("crossedout");
                var m = h("span", f.join(" "), a.uuid, "sname"),
                    k = h("img", "nameNicon16 icon16", a.uuid, "sname_img"),
                    r = h("span", g ? "nameNname16" : "", a.uuid, "sname_name"),
                    p = Ea(a),
                    f = e.getTranslation(a, "name");
                r.textContent = 35 < f.length ? f.substr(0,
                    35) + "..." : f;
                f = t("span", a.uuid, "spos");
                f.textContent = a.position || "";
                var y = t("span", a.uuid, "sversion");
                y.textContent = a.version ? a.version : "";
                g && (k.src = a.icon, m.appendChild(k));
                var g = [],
                    u = function() {
                        window.setTimeout(function() {
                            for (var d = Object.keys(V), e, f = 0; e = d[f]; f++)
                                if (e = V[e].script, e.uuid == a.uuid) {
                                    pa(b, [e], null, c);
                                    break
                                }
                            za()
                        }, 1)
                    },
                    A = function(b, c) {
                        void 0 === c && (c = !b);
                        a.uuid && J.is(a.uuid) && J.clear();
                        l && l.onClose && l.onClose(b) || (d && (d.remove(), d = null), delete Z["tab" + a.uuid], delete Z["editor" + a.uuid], m.parentNode &&
                            m.parentNode.removeChild(m), c && u())
                    },
                    C = function() {
                        l && l.afterSelect && l.afterSelect()
                    },
                    L = w[a.uuid].scriptClick = function(f, k) {
                        if (!d) {
                            var g = null;
                            a.nnew ? (g = h("div", "head_icon", a.uuid, "details_h"), g.appendChild(n.createImage(a.imageURL, "", a.uuid, "new_script_head"))) : g = t("div", a.uuid, "details_h");
                            var m = t("div", a.uuid, "details_c");
                            d = c.insertTab(null, a.uuid, g, m, C, a.nnew ? null : A);
                            a.nnew || d.setHeading(e.getMessage("Edit") + " - " + (25 < a.name.length ? a.name.substr(0, 25) + "..." : a.name));
                            l = qb(d, a, b, m, A)
                        }
                        if (l && l.onShow) l.onShow();
                        d.show();
                        f && 1 == f.button || k || d.select();
                        r.setAttribute("open", "true")
                    };
                "true" == r.getAttribute("open") && L(null, !0);
                var k = function(a, b) {
                        var c = a.getTime(),
                            d = b.getTime(),
                            e = Math.abs(c - d),
                            c = Math.round(e / 6E4),
                            d = Math.round(e / 36E5),
                            e = Math.round(e / 864E5);
                        return 60 >= c ? c + " min" : 48 >= d ? d + " h" : e + " d"
                    },
                    B = t("span", "", a.uuid, "last_updated", !0),
                    v = "";
                if (a.nativeScript || a.nnew || a.system) v = "";
                else if (w[a.uuid].scriptUpdate = function() {
                        var b = B.textContent;
                        B.textContent = "";
                        B.appendChild(n.createImage(rea.extension.getURL("/layout/default/images/download.gif"),
                            "down", a.uuid));
                        sb(a.uuid, function(c) {
                            B.textContent = b;
                            c ? (B.style.color = "green", B.title = e.getMessage("There_is_an_update_for_0name0_avaiable_", a.name), A(!0), Xa()) : (B.style.color = "red", B.title = e.getMessage("No_update_found__sry_"))
                        })
                    }, B.addEventListener("click", function() {
                        E(a.uuid, "scriptUpdate")
                    }), B.setAttribute("class", "clickable"), B.title = e.getMessage("Check_for_Updates"), a.lastUpdated) try {
                    v = k(new Date, new Date(a.lastUpdated))
                } catch (G) {
                    console.log("o: error calculating time " + G.message)
                } else v = "?";
                B.textContent = v;
                var F = t("div", a.uuid, "imported"),
                    z = "";
                D.push(function() {
                    q.sync_enabled && (z = a.nativeScript || a.nnew || a.system ? "" : a.sync && a.sync.imported ? !0 === a.sync.imported || a.sync.imported == sa.types.ePASTEBIN ? '<img src="https://pastebin.com/favicon.ico" class="icon16" title="pastebin.com"/>' : a.sync.imported == sa.types.eCHROMESYNC ? '<img src="https://www.google.com/images/icons/product/chrome-16.png" class="icon16" title="Google Sync"/>' : a.sync.imported == sa.types.eGOOGLE_DRIVE ? '<img src="https://www.google.com/images/icons/product/drive-16.png" class="icon16" title="Google Drive"/>' :
                        '<img src="' + rea.extension.getURL("/layout/default/images/update.png") + '" class="icon16" />' : "", F.innerHTML = z, F = null)
                });
                k = t("span", a.uuid, "hp");
                if (a.origin) {
                    v = t("a", a.uuid, "hp");
                    v.setAttribute("href", a.origin.url);
                    v.setAttribute("target", "_blank");
                    var I = n.createImage(N.origin(a.origin.token), "", a.uuid, a.origin.token, "");
                    v.appendChild(I);
                    k.appendChild(v)
                }
                p && (v = t("a", a.uuid, "hp"), v.setAttribute("href", p), v.setAttribute("target", "_blank"), p = n.createImage(rea.extension.getURL("/layout/default/images/home.png"),
                    "", a.uuid, "hp", ""), v.appendChild(p), k.appendChild(v));
                w[a.uuid].saveEm_lastModified = a.lastModified;
                w[a.uuid].fullReset = function(c) {
                    Fa(a.uuid, null, {
                        clean: !0,
                        reload: !0
                    }).done(c || function() {});
                    b.parentNode.removeChild(b)
                };
                w[a.uuid].reportAnIssue = function(b) {
                    tb(a.uuid, b)
                };
                w[a.uuid].deleteScript = function(c, d) {
                    var f;
                    a.nativeScript ? (f = d || confirm(e.getMessage("Really_delete_0name0__", a.name)), 1 == f && (Ga(a.uuid, "installed", "false"), b.parentNode.removeChild(b))) : (f = d || confirm(e.getMessage("Really_delete_0name0__",
                        a.name)), 1 == f && (Fa(a.uuid, null, {
                        reload: !d
                    }), b.parentNode.removeChild(b)))
                };
                p = [];
                if (a.nativeScript) {
                    w[a.uuid].importNativeScript = function(c, d) {
                        1 == (d || confirm(e.getMessage("Really_import_0name0__", a.name))) && (Ga(a.uuid, "imported", "true"), b.parentNode.removeChild(b))
                    };
                    var H = n.createImage(N.get("import"), "", a.uuid, "import", e.getMessage("Import"), function() {
                        E(a.uuid, "importNativeScript")
                    });
                    n.addClass(H, "hidden");
                    p.push(H);
                    D.push(function() {
                        q.native_import && n.toggleClass(H, "hidden")
                    })
                }
                a.nnew || a.system ||
                    a.nativeScript || (v = n.createImage(N.get("edit"), "", a.uuid, "edit", e.getMessage("Edit"), function() {
                        E(a.uuid, "scriptClick")
                    }), p.push(v));
                a.nnew || a.system || (v = n.createImage(N.get("delete"), "", a.uuid, "delete", e.getMessage("Delete"), function() {
                    E(a.uuid, "deleteScript")
                }), p.push(v));
                a.nnew || a.system || !a.origin || a.supportURL === a.origin.issue_url || (v = n.createImage(N.get("flag"), "", a.uuid, "issue", e.getMessage("Report_an_issue_to_the_script_hoster_"), function() {
                    E(a.uuid, "reportAnIssue", "hoster")
                }), p.push(v));
                a.nnew || a.system || !a.supportURL || (v = n.createImage(N.get("bug"), "", a.uuid, "bug", e.getMessage("Report_a_bug"), function() {
                    E(a.uuid, "reportAnIssue", "author")
                }), p.push(v));
                m.inserted || a.nativeScript || m.addEventListener("click", L);
                m.appendChild(r);
                v = [a.name];
                a.description && v.push(e.getTranslation(a, "description"));
                a.blacklisted && (v = [e.getMessage("This_script_is_blacklisted_")]);
                m.title = v.join("\n\n").replace(/\"/, "");
                g.push(a.nnew || a.system ? null : {
                    element: ub(a),
                    style: "script_sel"
                });
                g.push(f);
                g.push(function() {
                    var b =
                        null,
                        b = a.blacklisted ? "enabler_warning" : a.enabled ? a.contexter ? "enabler_enabled enabler_later" : "enabler_enabled" : "enabler_disabled",
                        c = a.blacklisted ? e.getMessage("This_script_is_blacklisted_") : a.enabled ? e.getMessage("Enabled") : e.getMessage("Disabled"),
                        b = n.createEnabler(b, a.uuid, "enabled", {
                            append: "enabled",
                            disabled: a.blacklisted,
                            title: c,
                            on: e.getMessage("On"),
                            off: e.getMessage("Off")
                        }, function() {
                            E(a.uuid, a.nativeScript ? "switchNativeEnabled" : "switchEnabled")
                        });
                    w[a.uuid].switchEnabled = function(b, c, d) {
                        void 0 ===
                            c && (c = !a.enabled);
                        fa(a.uuid, {
                            enabled: c
                        }, d)
                    };
                    w[a.uuid].switchNativeEnabled = function(b, c, d) {
                        void 0 === c && (c = !a.enabled);
                        Ga(a.uuid, "enabled", c, d)
                    };
                    return b
                }());
                g.push(m);
                g.push(y);
                g.push(vb(a));
                g.push(F);
                g.push(wb(a));
                g.push(xb(a));
                g.push(k);
                g.push(B);
                g.push(yb(a));
                g.push(function(a, b) {
                    var c = t("span", a.uuid, "wrap");
                    b && ("Array" === x.toType(b) ? x.each(b, function(a, b) {
                        c.appendChild(a)
                    }) : c.appendChild(b));
                    return c
                }(a, p));
                for (f = g.length; 10 > f; f++) g.push(null);
                J.registerListener(a.uuid, function() {
                    L()
                });
                a.nnew &&
                    D.push(function() {
                        L(null, !0)
                    });
                return g
            },
            vb = function(a) {
                var b = t("span", "", a.uuid, "pos_type", !0);
                if (a.nnew) return b;
                a.nativeScript ? (a = n.createImage(a.icon, "", a.uuid, "chrome_ext", e.getMessage("This_is_a_chrome_extension")), b.appendChild(a)) : a.userscript && (a = n.createImage("images/txt.png", "", a.uuid, "user_script", e.getMessage("This_is_a_userscript")), b.appendChild(a));
                return b
            },
            xb = function(a) {
                var b, c, d = t("span", "", a.uuid, "pos_features", !0);
                if (a.nnew) return d;
                a.system && (b = n.createImage(rea.extension.getURL("/layout/default/images/lock.png"),
                    "", a.uuid, "lock", e.getMessage("This_is_a_system_script")), d.appendChild(b));
                a.warnings && a.warnings.forEach(function(a, c) {
                    b = n.createImage(rea.extension.getURL("/layout/default/images/critical.png"), "compat", c.uuid, "warning_" + c, a);
                    $(b).addClass("flashing");
                    d.appendChild(b)
                });
                if (a.awareOfChrome || a.nativeScript) b = n.createImage("https://www.google.com/images/icons/product/chrome-16.png", "", a.uuid, "chrome_mode", e.getMessage("This_script_runs_in_Chrome_mode")), d.appendChild(b);
                if (a.nativeScript) return d;
                a.requires.length && (b = n.createImage(rea.extension.getURL("/layout/default/images/script_download.png"), "", a.uuid, "requires", x.map(x.select(a.requires, function(a) {
                    return a && a.url
                }), function(a) {
                    return a.url
                }).join("\n")), d.appendChild(b));
                a.resources.length && (b = n.createImage(rea.extension.getURL("/layout/default/images/resources.png"), "", a.uuid, "resources", x.map(x.select(a.resources, function(a) {
                    return a && a.url
                }), function(a) {
                    return a.url
                }).join("\n")), d.appendChild(b));
                var l = !1,
                    g = {
                        includes: !0,
                        matches: !0
                    };
                for (c in g)
                    if (a[c]) {
                        for (g = 0; g < a[c].length; g++)
                            if (a[c][g] && (-1 != a[c][g].search("https") || -1 != a[c][g].search(/^\*:\/\//))) {
                                b = n.createImage(rea.extension.getURL("/layout/default/images/halfencrypted.png"), "", a.uuid, "encrypt", e.getMessage("This_script_has_access_to_https_pages"));
                                d.appendChild(b);
                                l = !0;
                                break
                            }
                        if (l) break
                    }
                var f = {};
                a.grant.forEach(function(a) {
                    f[a] = !0
                });
                f.GM_xmlhttpRequest && (b = n.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", a.uuid, "web", e.getMessage("This_script_has_full_web_access")),
                    d.appendChild(b));
                f.GM_setValue && (b = n.createImage(rea.extension.getURL("/layout/default/images/db.png"), "", a.uuid, "db", e.getMessage("This_script_stores_data")), d.appendChild(b));
                f.unsafeWindow && (b = n.createImage(rea.extension.getURL("/layout/default/images/windowlist.png"), "", a.uuid, "unsafeWindow", e.getMessage("This_script_has_access_to_webpage_scripts")), d.appendChild(b));
                for (c in a.options)
                    if (-1 != c.search("compat_") && a.options[c]) {
                        b = n.createImage(rea.extension.getURL("/layout/default/images/critical.png"),
                            "compat", a.uuid, "crit", e.getMessage("One_or_more_compatibility_options_are_set"));
                        d.appendChild(b);
                        break
                    }
                return d
            },
            Ra = function(a) {
                var b = "global_hint_" + (a.class ? a.class : "warning"),
                    c = Date.now(),
                    d = h("span", ["global_hint", b].join(" "), "globalhint", c),
                    b = t("span", "globalhint_c", c),
                    e = t("span", "globalhint_t", c);
                a.title && (e.title = a.title);
                a.image && b.appendChild(n.createImage(N.get(a.image), "globalhint", "icon" + c));
                e.textContent = a.text;
                a.onclick && !e.inserted && e.addEventListener("click", a.onclick);
                b.appendChild(e);
                d.appendChild(b);
                var g = $(d).hide().appendTo(document.body);
                window.setTimeout(function() {
                    g.slideDown()
                }, g.delay ? g.delay : 1);
                a.timeout && window.setTimeout(function() {
                    g.slideUp(function() {
                        g.remove()
                    });
                    a.done && a.done(d)
                }, a.timeout);
                return g
            },
            Ya = !1,
            Sa = function() {
                if (!Ya) {
                    var a = e.getLocale(),
                        b = $("<div>").hide(),
                        c = function(a) {
                            a ? (b.html(""), b.append($('<div class="contrib_iframe" style="font-size: 2.5em;"></div>').append($('<div style="padding-top: 150px;">').text(a))), window.setTimeout(c, 1E3)) : (b.fadeOut(1E3),
                                window.setTimeout(u.hideDialog, 1E3))
                        },
                        a = $('<iframe src="https://tampermonkey.net/contrib.php?embedded=true' + (a ? "&locale=" + a : "") + '" class="contrib_iframe"></iframe>'),
                        d = [$('<button class="contrib_button">').html(e.getMessage("Remind_me_later")).click(function() {
                            ga("later", {});
                            c(e.getMessage("Ok"))
                        }), $('<button class="contrib_button">').html(e.getMessage("I_contributed_already")).click(function() {
                            ga("contributed", {});
                            c(e.getMessage("Thank_you_very_much_"))
                        }), $('<button class="contrib_button">').html(e.getMessage("I_dont_want_to_contribute")).click(function() {
                            ga("hide", {});
                            c(e.getMessage("Ok"))
                        })],
                        l = function() {
                            g && window.clearTimeout(g);
                            d.forEach(function(a, b) {
                                a.prop("disabled", !1)
                            })
                        };
                    d.forEach(function(a, b) {
                        a.prop("disabled", !0)
                    });
                    b.append(a, d);
                    a.bind("load", l);
                    var g = window.setTimeout(function() {
                            g = null;
                            l()
                        }, 15E3),
                        f = function() {
                            var a = u.dialog(b[0]);
                            !0 === a ? (b.fadeIn(1E3), ga("dialog", {})) : void 0 === a && window.setTimeout(f, 500);
                            Ya = !0
                        };
                    f();
                    window.addEventListener("message", function(a) {
                        var d = a.data.clicked || a.data.type,
                            f = a.data.amount,
                            l = a.data.currency;
                        d && (a.data.success ?
                            "stripe" == d && (a = $(".contrib_iframe"), d = a.data("oheight"), !d || 0 > d || 1E3 < d || a.animate({
                                height: d
                            }, 1E3)) : (ga("clicked", d, {
                                amount: f || "?",
                                currency: l || "?"
                            }), $(".contrib_button").remove(), b.append($('<button class="contrib_button">').html(e.getMessage("Ok")).click(function() {
                                ga("contributed", {});
                                c()
                            })), "stripe" == d && (a = $(".contrib_iframe"), a.data("oheight", a.height()), a.animate({
                                height: 740
                            }, 1E3))))
                    }, !1)
                }
            },
            zb = function() {
                var a = null,
                    b = null,
                    c = null,
                    d = 0,
                    e = 0,
                    g = 0,
                    f = function(b) {
                        var d = c.x + b.pageX;
                        a.style.top = c.y + b.pageY +
                            "px";
                        a.style.left = d + "px"
                    },
                    h, k, r, p = function(c) {
                        if (a && !h) {
                            var t, u = null,
                                x, v, w, z;
                            f(c);
                            k && (window.clearTimeout(k), k = null);
                            for (; u != g;) u = g, x = b.previousSibling, v = b.nextSibling, w = b.parentNode, z = q(b), c.pageY > z.y + d + e && v ? (w.removeChild(v), w.insertBefore(v, b), g++, t = !1) : c.pageY < z.y && 1 < g && (w.removeChild(x), v ? w.insertBefore(x, v) : w.appendChild(x), g--, t = !0);
                            u = Math.min(.03 * document.documentElement.clientHeight, 100);
                            if (void 0 !== t) {
                                v = t ? $(x) : $(v);
                                if (v.length && !n.isScrolledIntoView(v, {
                                        padding: u
                                    })) {
                                    t = t ? v.offset().top - u -
                                        v.height() : v.offset().top - document.documentElement.clientHeight + u + 2 * v.height();
                                    h = !0;
                                    var D = t - document.body.scrollTop;
                                    $("html, body").animate({
                                        scrollTop: t
                                    }, 0, function() {
                                        window.setTimeout(function() {
                                            h = !1;
                                            k = window.setTimeout(function() {
                                                k = null;
                                                r === c && p({
                                                    pageX: r.pageX,
                                                    pageY: r.pageY + D
                                                })
                                            }, 100)
                                        }, 100)
                                    })
                                }
                                c.stopPropagation && (c.stopPropagation(), c.preventDefault());
                                r = c;
                                return !1
                            }
                        }
                    },
                    q = function(a) {
                        a = a.getBoundingClientRect();
                        return {
                            x: a.left + window.pageXOffset,
                            y: a.top + window.pageYOffset
                        }
                    },
                    t = function(d) {
                        a.style.position =
                            "static";
                        var e = {};
                        e[a.key] = g;
                        fa(a.uuid, e);
                        a = b = c = null;
                        document.removeEventListener("mousemove", p);
                        document.removeEventListener("scroll", p);
                        document.removeEventListener("mouseup", t);
                        d.stopPropagation();
                        d.preventDefault();
                        return !1
                    };
                return {
                    start: function(k, h) {
                        var m = this.parentNode.parentNode,
                            n = m.parentNode,
                            r = n.parentNode.parentNode;
                        a = this;
                        b = n;
                        d = b.offsetHeight;
                        e = b.offsetHeight - m.clientHeight;
                        c = q(r);
                        c.x = -c.x - a.offsetWidth / 2;
                        c.y = -c.y - b.offsetHeight / 2 + 2 * e;
                        a.style.position = "absolute";
                        f(k);
                        g = h;
                        document.addEventListener("mousemove",
                            p);
                        document.addEventListener("scroll", p);
                        document.addEventListener("mouseup", t);
                        k.stopPropagation();
                        k.preventDefault();
                        return !1
                    }
                }
            }(),
            yb = function(a) {
                var b = h("span", "sorting", "", a.uuid, "pos_images", !0);
                if (a.nnew || a.nativeScript) return b;
                "pos" == aa() && "up" == ea() || b.setAttribute("style", "display: none;");
                if (1 < a.position || a.position < a.positionof) {
                    var c = h("span", "clickable movable", "position", a.uuid, !0);
                    c.innerHTML = "&#9776;";
                    c.title = e.getMessage("Click_here_to_move_this_script");
                    c.uuid = a.uuid;
                    c.key = "position";
                    c.addEventListener("mousedown", function(b) {
                        zb.start.apply(this, [b, a.position])
                    });
                    b.appendChild(c)
                }
                return b
            },
            wb = function(a) {
                var b = t("span", "", a.uuid, "site_images"),
                    c = null;
                b.inserted && (c = b, c.setAttribute("id", c.id + "foo"), b = t("span", "", a.uuid, "site_images"));
                Ca.topIcons(a, 7).forEach(function(a) {
                    b.appendChild(a, !0)
                });
                c && c.parentNode.removeChild(c);
                return b
            },
            H = [],
            ub = function(a) {
                var b = t("input", "", a.uuid, "sel");
                b.type = "checkbox";
                b.s_id = a.uuid;
                b.name = "scriptselectors";
                b.s_type = a.nativeScript ? "n" : "s";
                b.inserted ||
                    b.addEventListener("click", function() {
                        H = [];
                        b && H.push(b);
                        w.multiselect.single_click()
                    });
                return b
            },
            cb = function(a) {
                var b = h("input", "multiselectcb", "sms", "all", null),
                    c = h("input", "multiselectcb", "sms2", "all", null);
                b.inserted || (b.type = "checkbox", b.addEventListener("click", w.multiselect.un_selectAll), c.type = "checkbox", c.addEventListener("click", w.multiselect.un_selectAll));
                var d = 0,
                    l = [{
                        name: e.getMessage("__Please_choose__"),
                        value: 0
                    }, {
                        name: e.getMessage("Enable"),
                        value: 1
                    }, {
                        name: e.getMessage("Disable"),
                        value: 2
                    }, {
                        name: e.getMessage("Toggle_Enable"),
                        value: 7
                    }];
                (z.RUNTIME.CAN_SAVEAS_ZIP || "undefined" !== typeof Blob) && l.push({
                    name: e.getMessage("Export"),
                    value: 3
                });
                l = l.concat([{
                    name: e.getMessage("Trigger_Update"),
                    value: 5
                }, {
                    name: e.getMessage("Factory_Reset"),
                    value: 8
                }, {
                    name: e.getMessage("Remove"),
                    value: 6
                }]);
                l = n.createDropDown(e.getMessage("Apply_this_action_to_the_selected_scripts"), {
                    value: 0,
                    uuid: "sms-select",
                    name: "select"
                }, l, function() {
                    0 == this.value ? g.setAttribute("disabled", "true") : g.removeAttribute("disabled");
                    d =
                        this.value
                });
                l.elem.setAttribute("class", "float");
                l.elem.setAttribute("style", "display: inline-block;");
                var g = n.createButton("MultiSelectButton", "button", e.getMessage("Start"), function() {
                    if (0 == d) console.log("option: ?!?!");
                    else {
                        var a = null;
                        6 == d ? a = e.getMessage("Really_delete_the_selected_items_") : 8 == d && (a = e.getMessage("Really_factory_reset_the_selected_items_"));
                        if (!a || confirm(a)) {
                            for (var b = document.getElementsByName("scriptselectors"), c = [], a = 0; a < b.length; a++) c.push(b[a]);
                            for (var b = {}, l, g = !1, h = 100,
                                    a = 0; a < c.length; a++)
                                if (c[a].checked)
                                    if (1 == d || 2 == d || 7 == d) {
                                        l = "n" == c[a].s_type ? "switchNativeEnabled" : "switchEnabled";
                                        var n;
                                        if (7 == d) {
                                            var q = V[c[a].s_id] ? V[c[a].s_id].script : null;
                                            q && (n = !q.enabled)
                                        } else n = 1 == d;
                                        void 0 !== n && (E(c[a].s_id, l, null, n, !1), g = !0)
                                    } else 3 == d ? b[c[a].s_id] = !0 : 5 == d ? (l = "scriptUpdate", E(c[a].s_id, l)) : 6 == d ? (l = "deleteScript", E(c[a].s_id, l, null, !0), g = !0, h = 1500) : 8 == d && (l = "fullReset", E(c[a].s_id, l), g = !0, h = 1500);
                            3 == d && (u.wait(), qa(b, {
                                storage: ba
                            }).then(function(a) {
                                u.wait();
                                return z.RUNTIME.CAN_SAVEAS_ZIP ?
                                    U.zip.download(a.scripts).progress(function(a) {
                                        u.wait(Math.floor(a.item / a.of * 100) + "%")
                                    }) : U.json.download(a.scripts)
                            }).always(function() {
                                u.hide()
                            }));
                            g && (u.wait(e.getMessage("Please_wait___")), window.setTimeout(function() {
                                Xa()
                            }, h))
                        }
                    }
                });
                g.setAttribute("class", "action_button");
                g.setAttribute("disabled", "true");
                a = t("div", a.name, a.id, "actions");
                a.setAttribute("style", "display: inline-block;");
                a.appendChild(l.elem);
                a.appendChild(g);
                return {
                    selAllm: c,
                    selAll: b,
                    actionBox: a
                }
            };
        (function() {
            var a = 0;
            w.multiselect = {};
            w.multiselect.toggleRow = function(a) {
                var c = $(".multiselect");
                a ? c.addClass("multiselectvisible") : c.removeClass("multiselectvisible")
            };
            w.multiselect.single_click = function() {
                for (var b = 0, c = document.getElementsByName("scriptselectors"), d = !0, e = !1, g = !1, f = !0, h = !1, k = !1, n = 0, p = 0; p < c.length; p++) {
                    "n" == c[p].s_type ? (g = !0, d = d && c[p].checked, e = e || c[p].checked) : "s" == c[p].s_type && (k = !0, f = f && c[p].checked, h = h || c[p].checked);
                    var q = $(c[p]).closest("tr");
                    c[p].checked ? (n++, q.addClass("selected")) : q.removeClass("selected")
                }!g ||
                    !d || k && !f && h || (b += 1);
                !k || !f || g && !d && e || (b += 2);
                b != a && (a = b, $(".multiselectcb").prop("checked", 0 != b ? "checked" : ""));
                w.multiselect.toggleRow(n);
                w.multiselect.checkScroll && w.multiselect.checkScroll()
            };
            w.multiselect.un_selectAll = function() {
                3 < ++a && (a = 0);
                var b = !1,
                    c = 0,
                    d = document.getElementsByName("scriptselectors");
                H = [];
                for (var e = 0; e < d.length; e++) {
                    0 != e || 1 != a && 3 != a || "s" != d[e].s_type || 3 < ++a && (a = 0);
                    b |= "s" == d[e].s_type;
                    d[e].checked = 3 == a || 1 == a && "n" == d[e].s_type || 2 == a && "s" == d[e].s_type;
                    var g = $(d[e]).closest("tr");
                    d[e].checked ? (c++, g.addClass("selected"), H.push(d[e])) : g.removeClass("selected")
                }
                1 < a && !b && (a = 0);
                $(".multiselectcb").prop("checked", 0 != a ? "checked" : "");
                w.multiselect.toggleRow(c)
            }
        })();
        var ha = null,
            R = function() {
                ha && (window.clearTimeout(ha), ha = null)
            },
            ra = null,
            S = function() {
                Ha(e.getMessage("Operation_completed_successfully"), "button_ok", "notice")
            },
            Wa = function(a, b) {
                void 0 === b && (b = "button_ok");
                Ha(a, b, "information", 8E3)
            },
            Va = function(a, b) {
                void 0 === b && (b = "error");
                Ha(a, b, "warning", 8E3)
            },
            Ha = function(a, b, c, d) {
                void 0 ===
                    d && (d = 3E3);
                ra && $(ra).remove();
                ra = Ra({
                    text: a,
                    image: b,
                    class: c,
                    delay: 500,
                    timeout: d,
                    done: function() {
                        ra = null
                    }
                })
            },
            T = function() {
                ha || (ha = window.setTimeout(function() {
                    ha = null;
                    u.wait(e.getMessage("Please_wait___"))
                }, 500))
            },
            la = null,
            ia = null,
            K = function(a, b) {
                null != la ? (window.clearTimeout(la), la = null, K(a ? a : ia.items, a ? b : ia.with_scripts)) : (ia = {
                    items: a,
                    with_scripts: b
                }, la = window.setTimeout(function() {
                    la = null;
                    ia.with_scripts && (V = {});
                    pa(null, ia.items, null, O);
                    u.hide();
                    za();
                    ia = null
                }, 50))
            },
            ga = function(a, b, c) {
                var d = I();
                sendMessage({
                    method: "begEvent",
                    action: a,
                    type: b,
                    extra: c
                }, function(a) {
                    d.resolve(a)
                });
                return d.promise()
            },
            Ba = function(a, b) {
                try {
                    var c = function() {
                        b && z.OPTIONPAGE.CLOSE_ALLOWED && window.close()
                    };
                    b ? sendMessage({
                        method: "newTab",
                        url: a
                    }, c) : rea.tabs.getSelected(null, function(d) {
                        rea.tabs.sendMessage(d.id, {
                            method: "loadUrl",
                            url: a,
                            newtab: b
                        }, c)
                    })
                } catch (d) {
                    console.log("lU: " + d.message)
                }
            },
            kb = function(a, b) {
                var c = I();
                try {
                    T(), sendMessage({
                        method: "installScript",
                        url: a,
                        reload: b.reload
                    }, function(a) {
                        R();
                        a.items ? (S(), K(a.items, !1)) : u.hide();
                        a.err ? c.reject(a) :
                            c.resolve(a)
                    })
                } catch (d) {
                    console.log("sS: " + d.message), c.reject({
                        err: d.message
                    })
                }
                return c.promise()
            },
            ib = function(a, b) {
                var c = I();
                try {
                    T(), sendMessage({
                        method: "exportToJson",
                        ids: a,
                        options: b
                    }, function(a) {
                        S();
                        R();
                        u.hide();
                        a.json ? c.resolve(a.json) : c.reject()
                    })
                } catch (d) {
                    console.log("eJ: " + d.message), c.reject({})
                }
                return c.promise()
            },
            Da = function(a, b) {
                var c = I();
                try {
                    T(), sendMessage({
                        method: "importFromJson",
                        json: a,
                        reload: b.reload
                    }, function(a) {
                        R();
                        a.reload ? window.setTimeout(function() {
                                rea.page.reload()
                            }, 500) : a.items ?
                            (S(), K(a.items, !0)) : u.hide();
                        a.err ? c.reject(a) : c.resolve(a)
                    })
                } catch (d) {
                    console.log("sS: " + d.message), c.reject({
                        err: d.message
                    })
                }
                return c.promise()
            },
            Fa = function(a, b, c) {
                var d = I();
                void 0 === c.reload && (c.reload = !0);
                try {
                    var e = c.new_url && c.new_url != c.old_url ? c.new_url : "";
                    c.auto_save || T();
                    sendMessage({
                        method: "saveScript",
                        uuid: a,
                        code: b,
                        clean: c.clean,
                        force: c.force,
                        new_script: c.new_script,
                        auto_save: c.auto_save,
                        force_url: e,
                        lastModified: c.lastModified,
                        reload: c.reload
                    }, function(a) {
                        c.auto_save || (S(), R());
                        a.items ?
                            K(a.items, !0) : u.hide();
                        !b && c.reload && u.hide();
                        d.resolve(a)
                    })
                } catch (g) {
                    console.log("sS: " + g.message), d.reject({
                        err: g.message
                    })
                }
                return d.promise()
            },
            na = function(a, b, c) {
                var d = I();
                try {
                    T(), sendMessage({
                        method: "setOption",
                        name: a,
                        value: b
                    }, function(a) {
                        R();
                        S();
                        q = a.options || q;
                        !c && a.items ? K(a.items, !1) : u.hide();
                        d.resolve(a)
                    })
                } catch (e) {
                    console.log("sO: " + e.message), d.reject({
                        err: e.message
                    })
                }
                return d.promise()
            },
            eb = function(a, b, c) {
                var d = I();
                try {
                    T(), sendMessage({
                        method: "buttonPress",
                        name: a,
                        data: b
                    }, function(a) {
                        R();
                        !c && a.items ? (S(), K(a.items, !1)) : u.hide();
                        d.resolve(a)
                    })
                } catch (e) {
                    console.log("sO: " + e.message), d.reject({
                        err: e.message
                    })
                }
                return d.promise()
            },
            oa = function(a, b) {
                T();
                sendMessage({
                    method: "loadTree",
                    complete: a.complete,
                    uuid: a.uuid,
                    referrer: a.referrer
                }, function(a) {
                    R();
                    q = a.options || q;
                    a.i18n && e.setLocale(a.i18n);
                    a.items ? a.begging && D.push(function() {
                        window.setTimeout(Sa, 100)
                    }) : a.error ? alert(a.error) : confirm(e.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href =
                        "http://tampermonkey.net/bug");
                    b(a)
                })
            },
            Xa = function() {
                oa({
                    referrer: "options.scripts"
                }, function(a) {
                    a.items ? K(a.items, !0) : u.hide()
                })
            },
            fa = function(a, b, c) {
                void 0 == c && (c = !0);
                try {
                    a = {
                        method: "modifyScriptOptions",
                        uuid: a,
                        reload: c
                    };
                    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                    T();
                    sendMessage(a, function(a) {
                        R();
                        q = a.options || q;
                        a.i18n && e.setLocale(a.i18n);
                        S();
                        a.items ? K(a.items, !0) : u.hide()
                    })
                } catch (h) {
                    console.log("mSo: " + h.message)
                }
            },
            Ga = function(a, b, c, d) {
                void 0 === d && (d = !0);
                try {
                    a = {
                        method: "modifyNativeScript",
                        nid: a,
                        actionid: b,
                        value: c,
                        reload: d
                    }, T(), sendMessage(a, function(a) {
                        R();
                        S();
                        a.items ? K(a.items, !0) : u.hide()
                    })
                } catch (e) {
                    console.log("mSo: " + e.message)
                }
            },
            rb = function(a, b) {
                try {
                    T(), sendMessage({
                        method: "buttonPress",
                        name: "externals_delete",
                        scriptuid: a,
                        safe_url: b
                    }, function(a) {
                        R();
                        S();
                        a.items ? K(a.items, !1) : u.hide()
                    })
                } catch (c) {
                    console.log("dEx: " + c.message)
                }
            },
            sb = function(a, b) {
                try {
                    sendMessage({
                        method: "buttonPress",
                        name: "run_script_updates",
                        scriptuid: a
                    }, function(a) {
                        S();
                        b && b(a.updatable)
                    })
                } catch (c) {
                    console.log("rSu: " +
                        c.message)
                }
            },
            tb = function(a, b, c) {
                try {
                    sendMessage({
                        method: "reportAnIssue",
                        uuid: a,
                        to: b
                    }, function(a) {
                        c && c()
                    })
                } catch (d) {
                    console.log("rRi: " + d.message)
                }
            };
        rea.extension.onMessage.addListener(function(a, b, c) {
            if ("updateOptions" == a.method) q = a.options || q, K(a.items, !1), c({});
            else if ("confirm" == a.method) x.confirm(a.msg, function(a) {
                c({
                    confirm: a
                })
            });
            else if ("showMsg" == a.method) x.alert(a.msg), c({});
            else return !1;
            return !0
        });
        (function() {
            oa({
                referrer: "options"
            }, function(a) {
                mb();
                a.items ? K(a.items, !1) : u.hide()
            })
        })()
    })
});
