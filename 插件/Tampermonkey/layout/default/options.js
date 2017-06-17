window.requestFileSystem || (window.requestFileSystem = window.webkitRequestFileSystem);
Registry.require("promise layout xmlhttprequest crcrc curtain cache layout/default/tabview layout/default/htmlutil helper statistics i18n syncinfo uri layout/default/layout_helper porter".split(" "), function() {
    var G = rea.FEATURES,
        z = Registry.get("promise"),
        q = Registry.get("crcrc").cr,
        g = Registry.get("crcrc").crc,
        na = Registry.get("layout/default/tabview"),
        n = Registry.get("layout/default/htmlutil"),
        Sa = Registry.get("statistics"),
        oa = Registry.get("syncinfo"),
        pa = Registry.get("cache"),
        r = Registry.get("curtain"),
        e = Registry.get("i18n"),
        s = Registry.get("helper"),
        qa = Registry.get("uri"),
        P = Registry.get("porter"),
        ra = Registry.get("layout"),
        sa = Registry.get("layout/default/layout_helper"),
        Q = sa.images;
    ra.render(function() {
        sa.addStyle();
        sa.addFont();
        var da = {},
            w = {},
            E = [],
            ta = "0.0.0",
            V = {},
            Ga = {},
            R = {},
            W = !0,
            ea = !1,
            v = {},
            J = function(a, b) {
                if (v[a] && v[a][b]) return v[a][b].apply(this, Array.prototype.slice.call(arguments, 2));
                console.log("option: WARN: unable to find callback '" + b + "' for id '" + a + "'")
            },
            L, Ha = function() {
                L = s.getUrlArgs(!0)
            };
        window.onhashchange = Ha;
        Ha();
        L.open && (L.selected = "dashboard");
        (function() {
            E.push(function() {
                w.statistics_enabled && Sa.init("opt", ta)
            })
        })();
        var ua = s.getDebouncer(1E3),
            va = function() {
                for (; E.length;) try {
                    E.shift()()
                } catch (a) {
                    console.warn("doneListeners:", a)
                }
            },
            ra = function(a, b) {
                var c = q("input", a.name, a.id, "Save");
                c.inserted || (c.type = "button", c.section = a, c.value = e.getMessage("Save"), c.addEventListener("click", function() {
                    if (!b || !b.warning || fa(b.warning)) {
                        var a = Array.prototype.slice.call(this.section.getElementsByTagName("textarea")),
                            c = function(b) {
                                b.each(function(b, c) {
                                    a.push(c)
                                })
                            };
                        c($("#" + this.section.id).find("input"));
                        c($("#" + this.section.id).find("select"));
                        for (var c = [], f = [], k = 0; k < a.length; k++) {
                            var m = null,
                                h = a[k],
                                e = h.key;
                            if (-1 == f.indexOf(h)) {
                                if ("textarea" == h.tagName.toLowerCase()) h.named ? (h = document.getElementsByName(h.name), m = [], s.each(h, function(a, b) {
                                    m.push({
                                        name: a.named_name,
                                        value: a.value
                                    });
                                    f.push(a)
                                })) : m = h.array ? h.value.split("\n").map(function(a) {
                                    return a.trim()
                                }).filter(function(a) {
                                    return a
                                }) : h.value;
                                else if ("checkbox" ==
                                    h.getAttribute("type")) m = h.checked;
                                else if ("select" == h.getAttribute("type")) {
                                    var g = 0;
                                    0 <= h.selectedIndex && h.selectedIndex < h.options.length && (g = h.selectedIndex);
                                    m = h[g] ? h[g].value : h.options[0].value
                                } else "button" != h.getAttribute("type") && (m = h.value);
                                e && c.push(wa(e, m, b && b.reload))
                            }
                        }
                        b && b.reload && (r.wait(), z.when(c).done(function() {
                            window.location.reload()
                        }))
                    }
                }, !1));
                return c
            },
            Ua = function(a) {
                var b = function(a, b, c, d, l) {
                        var f = g("th", "settingsth", a.name, a.id, b),
                            h = g("a", "settingsth_a", a.name, a.id, b + "_a");
                        h.setAttribute("name",
                            "settingsth_a" + a.name);
                        var m = g("a", "settingsth_a_up", a.name, a.id, b + "_a_up");
                        m.setAttribute("name", "settingsth_a_up" + a.name);
                        var k = g("a", "settingsth_a_down", a.name, a.id, b + "_a_down");
                        k.setAttribute("name", "settingsth_a_down" + a.name);
                        var e = function() {
                                for (var b = document.getElementsByName("settingsth_a_up" + a.name), c = document.getElementsByName("settingsth_a_down" + a.name), d = 0; d < b.length; d++) b[d].style.display = "none";
                                for (d = 0; d < c.length; d++) c[d].style.display = "none";
                                "up" == X() ? m.style.display = "" : k.style.display =
                                    ""
                            },
                            t = function() {
                                e()
                            };
                        b = function() {
                            window.setTimeout(function() {
                                T() == d ? Ia("down" == X() ? "up" : "down") : Ja(d);
                                Ka(t)
                            }, 1)
                        };
                        f.inserted || (f.appendChild(h), f.appendChild(k), f.appendChild(m), h.addEventListener("click", b), m.addEventListener("click", b), k.addEventListener("click", b), h.textContent = c + " ", h.href = "#", m.innerHTML = "&#x25B4;", m.href = "#", k.innerHTML = "&#x25BE;", k.href = "#");
                        l && !T() ? (Ja(d), Ia("up"), window.setTimeout(e, 1)) : d == T() && window.setTimeout(e, 1);
                        return f
                    },
                    c, d, l, f, k;
                f = q("tbody", a.name, a.id, "body");
                k = q("thead", a.name, a.id, "head");
                if (a.scriptTab) {
                    var m = Ta(a);
                    c = g("table", "scripttable", a.name, a.id, "main");
                    var h = g("th", "script_sel", a.name, a.id, "thead_sel");
                    h.appendChild(m.selAllm);
                    l = g("tr", "multiselect settingstr filler", a.name, a.id, "filler_multi");
                    var t = g("th", "", a.name, a.id, "thead_multi");
                    t.setAttribute("colspan", "9");
                    t.appendChild(m.actionBox);
                    $(l).hide();
                    l.setAttribute("name", "multiselectcol");
                    l.appendChild(h);
                    l.appendChild(t);
                    h = g("th", "script_sel", a.name, a.id, "thead_sel");
                    h.appendChild(m.selAll);
                    var m = b(a, "thead_en", "#", "pos"),
                        t = b(a, "thead_name", e.getMessage("Name"), "name", !0),
                        p = b(a, "thead_ver", e.getMessage("Version"), "ver"),
                        x = g("th", "settingsth", a.name, a.id, "thead_type");
                    x.textContent = e.getMessage("Type");
                    var I = g("th", "settingsth", a.name, a.id, "thead_sync");
                    I.textContent = "";
                    var n = b(a, "thead_sites", e.getMessage("Sites"), "sites");
                    n.width = "25%";
                    var H = g("th", "settingsth", a.name, a.id, "thead_features");
                    H.textContent = e.getMessage("Features");
                    var U = b(a, "thead_homepage", e.getMessage("Homepage"), "homepage"),
                        b = b(a, "thead_updated", e.getMessage("Last_Updated"), "updated"),
                        y = g("th", "settingsth", a.name, a.id, "thead_sort"),
                        u = g("span", "sorting", a.name, a.id, "thead_sort_span");
                    u.textContent = e.getMessage("Sort");
                    "pos" == T() && "up" == X() || u.setAttribute("style", "display: none;");
                    y.appendChild(u);
                    u = g("th", "settingsth", a.name, a.id, "thead_del");
                    u.textContent = e.getMessage("Actions");
                    E.push(function() {
                        w.sync_enabled && (I.textContent = e.getMessage("Imported"))
                    });
                    d = g("tr", "settingstr filler", a.name, a.id, "filler");
                    d.setAttribute("style",
                        "height: 36px;");
                    d.setAttribute("name", "multiselectcol_hide");
                    s.each([h, m, t, p, x, I, n, H, U, b, y, u], function(a, b) {
                        d.appendChild(a)
                    });
                    k.appendChild(l);
                    k.appendChild(d);
                    k.setAttribute("name", "multiselectrow");
                    d.inserted || (v.multiselect.checkScroll = function(a) {
                        a = $(k).is(":visible") && $(l).is(":visible") && $(window).scrollTop() > $(k).offset().top;
                        $(l).toggleClass("multi_scrolling", a)
                    }, $(window).scroll(v.multiselect.checkScroll))
                } else c = g("table", "settingstable", a.name, a.id, "main");
                c.appendChild(k);
                c.appendChild(f);
                return {
                    table: c,
                    head: k,
                    body: f
                }
            },
            La = function(a, b, c, d) {
                var l = [],
                    f = function() {
                        [0, 1].forEach(function() {
                            l.unshift(null)
                        })
                    };
                if (b.divider) return null;
                b.image && (b.imageURL = Q.get(b.image));
                if (b.checkbox) {
                    f = function() {
                        var a = !0,
                            b = this;
                        b.warning && (a = fa(b.warning), a || (b.checked = !b.checked));
                        a && wa(this.key, b.checked, b.reload).always(function() {
                            b.reload && window.location.reload()
                        })
                    };
                    c && c.need_save && (f = m = null);
                    var k = n.createCheckbox(b.name, b, f);
                    l.push(k.elem)
                } else if (b.button) k = n.createButton(b.name, b, function() {
                    var a = !0,
                        b = this;
                    b.warning && (a = fa(b.warning));
                    a && Va(b.key, b.data, b.ignore).always(function() {
                        b.reload && window.location.reload()
                    })
                }), l.push(k);
                else if (b.named) k = n.createNamedSettings(b.name, b), l.push({
                    element: k.elem,
                    validation: k.label
                }), c && (c.need_save = !0);
                else if (b.input) k = n.createTextarea(b.name, b), l.push({
                    element: k.elem,
                    validation: k.label
                }), c && (c.need_save = !0);
                else if (b.text) k = n.createInput(b.name, b), l.push(k.elem), c && (c.need_save = !0);
                else if (b.color) k = n.createColorChooser(b.name, b), l.push(k.elem), c &&
                    (c.need_save = !0);
                else if (b.password) k = n.createPassword(b.name, b), l.push(k.elem), c && (c.need_save = !0);
                else if (b.select) {
                    var m = function() {
                        var a = !0,
                            b = this;
                        b.warning && (a = fa(b.warning), a || (b.value = b.oldvalue));
                        a && wa(b.key, b.value, b.reload).always(function() {
                            b.reload && window.location.reload()
                        })
                    };
                    c && c.need_save && (m = b.enabler ? function() {
                        var a = document.getElementsByName("enabled_by_" + this.key),
                            b = (this.selectedIndex < this.options.length ? this.options[this.selectedIndex] : this.options[0]).getAttribute("enables"),
                            d = b ? JSON.parse(b) : {};
                        s.each(a, function(a) {
                            void 0 === d[a.key] || d[a.key] ? a.setAttribute("style", s.staticVars.visible) : a.setAttribute("style", s.staticVars.invisible)
                        })
                    } : null);
                    k = n.createDropDown(b.name, b, b.select, m, function() {
                        var a = !0;
                        this.selectedOptions.length && this.selectedOptions[0].warning && this.selectedOptions[0].value !== this.oldvalue && (a = fa(this.selectedOptions[0].warning), a || (this.value = this.previousValue || this.oldvalue));
                        this.previousValue = this.value
                    });
                    l.push(k.elem);
                    a && b.enabler && function() {
                        var a =
                            m,
                            b = k;
                        E.push(function() {
                            a.apply(b.select, [])
                        })
                    }()
                } else if (b.url) {
                    var h = q("a", b.name, b.id);
                    h.href = "#";
                    h.url = b.url;
                    h.newtab = b.newtab;
                    h.inserted || (m = function() {
                        ya(this.url, this.newtab)
                    }, h.addEventListener("click", m));
                    h.textContent = b.name;
                    l.push(h);
                    f()
                } else if (b.main_menu_item) {
                    f = q("div", b.name, b.id);
                    f.textContent = b.name;
                    var h = Ua(b),
                        e = q("div", b.name, b.id, "tab_content");
                    e.appendChild(h.table);
                    var p = null,
                        f = d.appendTab(b.id, f, e, function() {
                            p && (da.global ? p() : E.push(p))
                        });
                    b.referrer && (p = function() {
                        p = null;
                        r.wait();
                        ja({
                            referrer: b.referrer
                        }, function(b) {
                            b.items && b.items.forEach(function(b) {
                                La(a, b, c, d)
                            });
                            va();
                            r.hide()
                        })
                    });
                    b.items && ka(h.body, b.items, null, d);
                    da.global || !b.selected_default || L.selected || f.select()
                } else if (b.sub_menu_item) h = g("div", "section", b.name, b.id, "section"), f = g("div", "section_head", b.name, b.id, "head"), e = g("table", "section_content", b.name, b.id, "content"), f.textContent = b.name, h.appendChild(f), b.desc && n.setHelp(b.desc, f, f, b), h.appendChild(e), ka(e, b.items, b, d), b.need_save && e.appendChild(ra(e, b)),
                    l.push(h);
                else if (b.userscript || b.nativeScript || b.user_agent) {
                    l = Wa(b, a, d);
                    if (b.userscript || b.user_agent) R[b.uuid] = {
                        dom: a,
                        script: b
                    };
                    a.setAttribute("class", "scripttr");
                    b.nnew ? a.setAttribute("style", "display: none;") : ua.is("script_refresh") || (E.push(function() {
                        za.init(s.map(R, function(a) {
                            return a.script
                        }));
                        v.multiselect.single_click();
                        Ka();
                        da.scripts = !0;
                        ua.clear()
                    }), ua.add("script_refresh"))
                } else b.version ? (ta = b.value, g("div", "version", "version", "version").textContent = "v" + ta + " by Jan Biniok") : b.globalhint ?
                    Ma({
                        text: b.value,
                        title: b.description,
                        onclick: b.info_url ? function() {
                            ya(b.info_url, !0)
                        } : null,
                        image: b.image
                    }) : (h = q("span", "", b.uuid || b.id + b.name), h.textContent = b.name, l.push(h), f());
                l.forEach(function(a) {
                    if (a) {
                        void 0 !== b.level && (a.element || a).setAttribute("style", b.level > w.configMode ? s.staticVars.invisible : s.staticVars.visible || "");
                        if (b.hint) {
                            var d = q("span", "", b.uuid || b.id + b.name, "hint");
                            d.textContent = b.hint;
                            a.appendChild(d)
                        }
                        b.validation && Xa(b, a.validation || a.element || a);
                        b.width && a.setAttribute("class",
                            "width-172-" + b.width)
                    }
                });
                a && (e = a.getAttribute("class"), f = " hide", !1 === b.visible ? e = (e || "") + f : e && (e = e.replace(f, "")), a.setAttribute("class", e));
                return l
            },
            ka = function(a, b, c, d) {
                for (var l in b) {
                    var f = b[l],
                        e = a ? g("tr", "settingstr", f.uuid || f.id + f.name, "pi") : null,
                        m = La(e, f, c, d);
                    m && m.length && (a && a.appendChild(e), s.each(m, function(a, b) {
                        var d = a,
                            c = "";
                        "Object" === s.toType(a) && (d = a.element, c = a.style || "");
                        c = g("td", c + "settingstd", "", f.uuid || f.id + f.name, b);
                        a && c.appendChild(d);
                        e && e.appendChild(c)
                    }))
                }
            },
            fa = function(a) {
                if (a.once) {
                    if (Ga[a.msg]) return !0;
                    Ga[a.msg] = !0
                }
                var b = confirm(a.msg),
                    c = {};
                b && a.ok ? c = a.ok : !b && a.cancel && (c = a.cancel);
                if (a.ok || a.cancel) b = !0;
                c.url && sendMessage({
                    method: "newTab",
                    url: c.url
                }, function(a) {});
                return b
            },
            Xa = function(a, b) {
                var c;
                a.validation && (a.validation.url && (c = function() {
                    ya(this.url, !0)
                }), a.validation.image && (a.validation.imageURL = Q.get(a.validation.image)), c = n.createAfterIcon(a, c)) && (c.url = a.validation ? a.validation.url : void 0, b.appendChild(c))
            },
            Ya = function(a) {
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
            la = function(a, b) {
                var c = z(),
                    d = [];
                Za(a, b).done(function(a) {
                    a.scripts.forEach(function(a) {
                        !a.uuid || !a.userscript && !a.user_agent || a.system || a.nnew || (a.code && "" != a.code.trim() ? d.push(Ya(a)) : console.log("options: Strange script: " + a.name))
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
            ab = function(a) {
                var b =
                    q("div", "utils", "utils", "tab_util_h");
                b.textContent = e.getMessage("Utilities");
                var c = q("div", "utils", "utils", "tab_util");
                a.appendTab("util_tabutils", b, c).show();
                a = g("div", "tv_util", "utils", "utils", "tab_util_cont");
                var d = function(a) {
                        var b = z(),
                            d = new FileReader;
                        d.onload = function(a) {
                            b.resolve(a.target.result)
                        };
                        d.readAsText(a);
                        return b.promise()
                    },
                    l = n.createButton("utils", "utils_i_ta", e.getMessage("Import"), function() {
                        P.json.read(I.value).then(function(a) {
                            return Aa(a, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err &&
                                s.alert(a.err)
                        }).fail(function() {
                            s.alert(e.getMessage("Unable_to_parse_this_"))
                        })
                    }),
                    f = n.createFileSelect(e.getMessage("Import"), {
                        name: "zip",
                        id: "utils"
                    }, function(a) {
                        r.wait();
                        for (var b = 0, d; d = a[b]; b++) P.zip.read(d).progress(function(a) {
                            r.wait(Math.floor(a.item / a.of * 100) + "%")
                        }).then(function(a) {
                            return Aa({
                                scripts: s.map(a.scripts, function(a) {
                                    var b = a.meta || {},
                                        d = a.settings || {};
                                    return {
                                        source: a.source,
                                        name: b.name,
                                        uuid: b.uuid,
                                        file_url: b.file_url,
                                        options: a.options,
                                        storage: a.storage,
                                        lastModified: b.modified,
                                        enabled: d.enabled,
                                        position: d.position
                                    }
                                }),
                                global_settings: a.global_settings
                            }, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err && s.alert(a.err)
                        }).fail(function() {
                            s.alert(e.getMessage("Unable_to_parse_this_"))
                        }).always(r.hide)
                    }),
                    k = n.createFileSelect(e.getMessage("Import"), {
                        name: "file",
                        id: "utils"
                    }, function(a) {
                        for (var b = 0, c; c = a[b]; b++) d(c).then(function(a) {
                            return P.json.read(a)
                        }).then(function(a) {
                            return Aa(a, {
                                reload: !0
                            })
                        }).done(function(a) {
                            a.err && s.alert(a.err)
                        }).fail(function() {
                            s.alert(e.getMessage("Unable_to_parse_this_"))
                        })
                    }),
                    b =
                    n.createButton("utils", "utils_i_url", e.getMessage("Import"), function() {
                        r.wait();
                        return $a(y.value, {
                            reload: !0
                        }).fail(function(a) {
                            a = a.err ? a.err : e.getMessage("Unable_to_parse_this_");
                            s.alert(a)
                        }).always(r.hide)
                    }),
                    m = n.createButton("utils", "utils_e_ta", e.getMessage("Export"), function() {
                        la(null, {
                            storage: W,
                            global_settings: ea
                        }).then(function(a) {
                            return P.json.create(a.scripts, a.global_settings)
                        }).done(function(a) {
                            I.value = a
                        })
                    }),
                    h = n.createButton("utils", "utils_e_file", e.getMessage("Export"), function() {
                        la(null, {
                            storage: W,
                            global_settings: ea
                        }).then(function(a) {
                            return P.json.download(a.scripts, a.global_settings)
                        })
                    }),
                    t = n.createButton("utils", "utils_e_zip", e.getMessage("Export"), function() {
                        la(null, {
                            storage: W,
                            global_settings: ea
                        }).then(function(a) {
                            r.wait();
                            return P.zip.download(a.scripts, a.global_settings).progress(function(a) {
                                r.wait(Math.floor(a.item / a.of * 100) + "%")
                            })
                        }).always(function() {
                            r.hide()
                        })
                    }),
                    p = n.createCheckbox(e.getMessage("Include_TM_settings"), {
                        id: "utils_e_export_tm_settings",
                        enabled: "true"
                    }, function() {
                        ea =
                            this.checked
                    });
                p.elem.setAttribute("style", "padding-left: 15px; display: inline");
                p.input.checked = ea;
                var x = n.createCheckbox(e.getMessage("Include_script_storage"), {
                    id: "utils_e_export_storage",
                    enabled: "true"
                }, function() {
                    W = this.checked
                });
                x.elem.setAttribute("style", "padding-left: 15px; display: inline");
                x.input.checked = W;
                var I = g("textarea", "importta", "utils", "utils", "ta"),
                    C = g("div", "section", "utils", "utils", "ta"),
                    H = g("div", "section_head", "utils", "utils", "head_ta"),
                    U = g("div", "section_content", "utils",
                        "utils", "content_ta");
                H.textContent = e.getMessage("General");
                U.appendChild(x.elem);
                U.appendChild(p.elem);
                C.appendChild(H);
                C.appendChild(U);
                p = g("div", "section", "utils", "utils", "ta");
                x = g("div", "section_head", "utils", "utils", "head_ta");
                H = g("div", "section_content", "utils", "utils", "content_ta");
                x.textContent = e.getMessage("TextArea");
                H.appendChild(m);
                H.appendChild(l);
                H.appendChild(I);
                p.appendChild(x);
                p.appendChild(H);
                l = g("div", "section", "utils", "utils", "sb");
                m = g("div", "section_head", "utils", "utils", "head_sb");
                x = g("div", "section_content", "utils", "utils", "content_sb");
                m.textContent = e.getMessage("Zip");
                l.appendChild(m);
                l.appendChild(x);
                x.appendChild(t);
                x.appendChild(f.elem);
                f = g("div", "section", "utils", "utils", "fi");
                t = g("div", "section_head", "utils", "utils", "head_fi");
                m = g("div", "section_content", "utils", "utils", "content_fi");
                t.textContent = e.getMessage("File");
                f.appendChild(t);
                f.appendChild(m);
                m.appendChild(h);
                m.appendChild(k.elem);
                var y = g("input", "updateurl_input", "utils", "utils", "url"),
                    k = g("div", "section",
                        "utils", "utils", "ur"),
                    h = g("div", "section_head", "utils", "utils", "head_ur"),
                    t = g("div", "section_content", "utils", "utils", "content_ur");
                h.textContent = e.getMessage("URL");
                k.appendChild(h);
                k.appendChild(t);
                t.appendChild(y);
                t.appendChild(b);
                a.appendChild(C);
                G.RUNTIME.CAN_SAVEAS_ZIP && a.appendChild(l);
                "undefined" !== typeof Blob && a.appendChild(f);
                a.appendChild(p);
                a.appendChild(k);
                s.each([p], function(a) {
                    var b = a.getAttribute("class"),
                        b = 50 > w.configMode ? b + " hide" : b.replace(" hide", "");
                    a.setAttribute("class", b)
                });
                c.appendChild(a)
            },
            bb = function() {
                var a = document.getElementById("options"),
                    b = g("div", "content_wrapper", "options", "main");
                if (a) {
                    var c = a.parentNode;
                    c.removeChild(a);
                    c.appendChild(b);
                    document.body.setAttribute("class", "main")
                }
                var a = g("div", "head_container", "opt", "head_container"),
                    c = g("div", "tv_container", "opt", "tv_container"),
                    d = q("a", "head_link", "heads", "head_link");
                d.href = "http://tampermonkey.net";
                d.target = "_blank";
                var l = g("div", "float", "heads", "head1"),
                    f = g("img", "banner", "heads");
                f.src = rea.extension.getURL("images/icon128.png");
                var e = g("div", "float head", "heads", "head2"),
                    m = g("div", "header_title", "heads"),
                    h = g("div", "version", "version", "version");
                h.textContent = " by Jan Biniok";
                var t = q("div", "search", "box", "");
                m.textContent = "Tampermonkey";
                l.appendChild(f);
                e.appendChild(m);
                e.appendChild(h);
                d.appendChild(l);
                d.appendChild(e);
                a.appendChild(d);
                a.appendChild(t);
                b.appendChild(a);
                b.appendChild(c);
                var p = na.create("_main", c);
                E.push(function() {
                    ab(p);
                    if (L.selected) {
                        var a = p.getTabById(L.selected);
                        a && a.select()
                    }
                    void 0 !== L.contribute && window.setTimeout(Na,
                        100);
                    da.global = !0
                })
            },
            Z = function(a, b, c) {
                var d = b.item,
                    l = d.uuid + b.id,
                    f = (c ? "orig_" : "use_") + b.id,
                    k = function(a) {
                        return "select_" + s.createUniqueId(a, d.uuid) + "_sel1"
                    },
                    m = g("div", "cludes", a, l, "cb1");
                if (document.getElementById(k(f))) return {
                    elem: m
                };
                var h = q("span", d.name, l, "cb2");
                if (c) {
                    var t = "merge_" + b.id;
                    a = n.createCheckbox(a, {
                        id: t,
                        uuid: d.uuid,
                        enabled: d.options && d.options.override && d.options.override[t] ? !0 : !1
                    }, function() {
                        if ("checkbox" == this.type) {
                            var a = {};
                            a[this.key] = !this.oldvalue;
                            Y(this.uuid, a)
                        }
                    });
                    h.appendChild(a.elem)
                } else h.textContent =
                    a;
                a = d.options && d.options.override && d.options.override[f] ? d.options.override[f] : [];
                var p = g("select", "cludes", f, d.uuid, "sel1");
                p.setAttribute("size", "6");
                p.setAttribute("multiple", "true");
                for (f = 0; f < a.length; f++) t = document.createElement("option"), t.value = t.text = a[f], p.appendChild(t);
                m.appendChild(h);
                d.desc && n.setHelp(d.desc, m, h, d);
                m.appendChild(p);
                var x = function(a) {
                    var b = [];
                    a = a && a.options;
                    for (var d = 0, c = a.length; d < c; d++) a[d].selected && b.push(a[d]);
                    return b
                };
                a = function() {
                    var a = k("use_" + ("excludes" == b.id ?
                            "includes" : "excludes")),
                        d = document.getElementById(a),
                        a = x(p),
                        c = !1,
                        l = "matches" == b.id;
                    a.forEach(function(a) {
                        var b = l ? "/" + qa.getRegExpFromMatch(a.value) + "/" : a.value;
                        a && !d.querySelector('option[value="' + b + '"]') && (a = a.cloneNode(!0), l && (a.value = b, a.textContent = b), d.appendChild(a), c = !0)
                    });
                    c && C()
                };
                var t = function() {
                        var a = prompt(e.getMessage("Enter_the_new_rule"));
                        if (a) {
                            var b = document.createElement("option");
                            b.value = b.text = a.trim();
                            p.appendChild(b);
                            C()
                        }
                    },
                    f = function() {
                        var a = p.options[p.selectedIndex];
                        if (a) {
                            var b =
                                prompt(e.getMessage("Enter_the_new_rule"), a.value);
                            b && (a.value = a.text = b.trim(), C())
                        }
                    },
                    h = function() {
                        var a = !1;
                        x(p).forEach(function(b) {
                            b && (b.parentNode.removeChild(b), a = !0)
                        });
                        a && C()
                    },
                    I = function(a) {
                        for (var b = [], d = 0; d < a.options.length; d++) b.push(a.options[d].value);
                        return b
                    },
                    C = function() {
                        var a = {
                            includes: I(document.getElementById(k("use_includes"))),
                            matches: I(document.getElementById(k("use_matches"))),
                            excludes: I(document.getElementById(k("use_excludes")))
                        };
                        Y(d.uuid, a);
                        return !0
                    };
                c ? (l = q("button", d.name,
                    l, "btn1"), l.textContent = e.getMessage("Add_as_0clude0", c), l.addEventListener("click", a, !1)) : (c = q("button", d.name, l, "btn2"), c.textContent = e.getMessage("Add") + "...", c.addEventListener("click", t, !1), m.appendChild(c), c = q("button", d.name, l, "btn3"), c.textContent = e.getMessage("Edit") + "...", c.addEventListener("click", f, !1), m.appendChild(c), l = q("button", d.name, l, "btn4"), l.textContent = e.getMessage("Remove"), l.addEventListener("click", h, !1));
                m.appendChild(l);
                return {
                    elem: m
                }
            },
            Ba = function(a) {
                return a.homepage ? a.homepage :
                    a.namespace && 0 == a.namespace.search(/https?:\/\//) ? a.namespace : null
            };
        pa.create("sites").setOptions({
            timeout: 600,
            check_interval: 300,
            retimeout_on_get: !0
        }).init();
        var za = function() {
                var a = {},
                    b = function(a) {
                        return 7 > a.toString().length ? b("0" + a) : a
                    },
                    c = function(a) {
                        if (a.includes || a.matches) {
                            for (var b = {}, c = [], e = a.includes.length ? a.includes : a.matches, m = 0; m < e.length; m++) {
                                var h = e[m];
                                if (h) {
                                    var g = pa.items.sites.get(h),
                                        p = void 0 !== g ? g : n.getInfoFromUrl(h);
                                    void 0 === g && pa.items.sites.set(h, p);
                                    p && p.dom ? b[p.dom] || (b[p.dom] = !0, c.push({
                                        include: h,
                                        info: p
                                    })) : c.push({
                                        include: h
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
                        d = s.map(d, function(b) {
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
                    topIcons: function(b, l) {
                        var e = [],
                            k = c(b);
                        if (!k || !k.length) return [];
                        k = s.map(k, function(b) {
                            b.score = b.info ? a[b.info.dom] || 0 : 0;
                            return b
                        }).sort(function(a, b) {
                            return b.score - a.score
                        });
                        s.each(k, function(a) {
                            var c = a.info;
                            if (0 == l--) return a = g("span", "", b.uuid, "tbc"), a.textContent = "...", e.push(a), !1;
                            if (c) {
                                if ("*" == c.tld) return a = n.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", b.uuid, a.include, a.include), e.push(a), !1;
                                var k = "com",
                                    p = "";
                                "*" != c.tld && "tld" != c.tld && (k =
                                    c.tld);
                                c.subdom.length && (p = c.subdom.join(".") + ".");
                                var x = ("chrome://favicon/http://" + p + c.dom + "." + k + "/").replace(/\*/g, ""),
                                    c = ("http://" + p + c.dom + "." + k + "/favicon.ico").replace(/\*/g, ""),
                                    x = [c, x];
                                if (0 == c.search("http://userscripts.org/") || 0 == c.search("http://userscripts.com/")) x = Q.origin("uso");
                                a = n.createFavicon(x, "", b.uuid, a.include, a.include)
                            } else a = n.createFavicon("?", "", b.uuid, a.include, a.include);
                            e.push(a)
                        });
                        return e
                    }
                }
            }(),
            T = function() {
                if (G.HTML5.LOCALSTORAGE) return G.HTML5.LOCALSTORAGE.getItem("sort_key")
            },
            X = function() {
                if (G.HTML5.LOCALSTORAGE) return G.HTML5.LOCALSTORAGE.getItem("sort_sequence")
            },
            Ja = function(a) {
                if (G.HTML5.LOCALSTORAGE) return G.HTML5.LOCALSTORAGE.setItem("sort_key", a)
            },
            Ia = function(a) {
                if (G.HTML5.LOCALSTORAGE) return G.HTML5.LOCALSTORAGE.setItem("sort_sequence", a)
            },
            Ka = function(a) {
                var b = function(a, c) {
                        return a.tagName == c ? a : a.parentNode ? b(a.parentNode, c) : null
                    },
                    c = null,
                    d = [],
                    l = 0,
                    f = (new Date).getTime(),
                    k;
                for (k in R) {
                    var m = R[k];
                    if (m) {
                        var h = b(m.dom, "TR");
                        if (h) {
                            var g = b(h, "TBODY");
                            c ? g && c != g && console.warn("options: different parents?!?!") :
                                c = g;
                            l++;
                            g = f - parseInt(m.script.lastUpdated);
                            isNaN(g) && (g = 0);
                            var p = parseInt(m.script.version);
                            isNaN(p) && (p = 0);
                            d.push({
                                tr: h,
                                sites: za.get(m.script),
                                position: m.script.position ? m.script.position : 1E3 + l,
                                name: e.getTranslation(m.script, "name").toLowerCase(),
                                homepage: [m.script.origin ? qa.parse(m.script.origin.url).hostname : "z", Ba(m.script) ? qa.parse(Ba(m.script)).hostname : "z"].join("_"),
                                updated: g,
                                version: p
                            });
                            h.inserted = !1;
                            h.parentNode && h.parentNode.removeChild(h)
                        } else console.log("options: unable to sort script at pos " +
                            m.pos)
                    } else console.warn("options: something went wrong!", k)
                }
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
                        d = T();
                    b = "pos" == d ? b("position") : "ver" == d ? b("version") : "updated" == d ? b("updated") : c(d);
                    a.sort(b);
                    return a
                }(d);
                "down" == X() && (d = d.reverse());
                for (f = 0; f < l; f++) c.appendChild(d[f].tr);
                $(".sorting").each(function(a, b) {
                    var c = $(b),
                        d = "pos" == T() && "up" == X();
                    c[d ? "fadeIn" : "fadeOut"]()
                });
                a && a()
            },
            fb = function(a,
                b, c, d, l) {
                var f = g("div", "", b.name, b.uuid, "script_tab_head");
                c = f.inserted;
                var k = g("div", "heading", b.uuid, "heading"),
                    m = g("img", "nameNicon64", b.uuid, "heading_icon"),
                    h = b.icon64 ? b.icon64 : b.icon;
                m.src = h;
                var t = g("div", "nameNname64", b.uuid, "heading_name");
                t.textContent = e.getTranslation(b, "name");
                h && k.appendChild(m);
                k.appendChild(t);
                m = g("div", "author", b.uuid, "author");
                b.author ? m.textContent = "by " + b.author : b.copyright && (m.innerHTML = "&copy; ", m.textContent += b.copyright);
                var h = g("table", "noborder p100100", b.uuid,
                        "table"),
                    t = g("tr", "script_tab_head", b.uuid, "tr1"),
                    p = g("tr", "details", b.uuid, "tr2"),
                    n = g("td", "", b.uuid, "td1"),
                    q = g("td", "", b.uuid, "td2");
                k.appendChild(m);
                f.appendChild(k);
                n.appendChild(f);
                t.appendChild(n);
                p.appendChild(q);
                h.appendChild(t);
                h.appendChild(p);
                d.appendChild(h);
                d = na.create("_details" + s.createUniqueId(b.name, b.uuid), q, {
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
                });
                var C = cb(b, d, l),
                    r = b.nnew || b.system ? {} : db(b, d),
                    v = b.nnew || b.system || !b.requires.length && !b.resources.length ? {} : eb(b, d);
                if (c) return V["tab" + b.uuid];
                var y = function(b) {
                    var c = !1;
                    if ("keydown" == b.type) {
                        if (27 == b.keyCode) "windows" == w.editor_keyMap && "textarea" !== b.srcElement.tagName.toLowerCase() && (a.isSelected() && window.setTimeout(l, 1), c = !0);
                        else if (a.isSelected()) {
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
                        }
                        if (c) return b.stopPropagation(), b.preventDefault(), !1
                    }
                };
                d = {
                    onShow: function() {
                        s.each([r,
                            C, v
                        ], function(a) {
                            if (a.onShow) a.onShow()
                        });
                        window.addEventListener("keydown", y, !1)
                    },
                    onClose: function(a) {
                        var b;
                        s.each([r, C, v], function(c) {
                            if (c.onClose && c.onClose(a)) return b = !0, !1
                        });
                        b || window.removeEventListener("keydown", y, !0);
                        return b
                    },
                    afterSelect: function() {
                        s.each([r, C, v], function(a) {
                            a.afterSelect && a.afterSelect()
                        })
                    }
                };
                return V["tab" + b.uuid] = d
            },
            db = function(a, b) {
                var c = q("div", a.name, a.uuid, "script_setting_h"),
                    d = q("div", a.name, a.uuid, "script_settings_c");
                c.textContent = e.getMessage("Settings");
                var l =
                    q("div", a.name, a.uuid, "tab_content_settings"),
                    f = function() {
                        if ("checkbox" == this.type || "button" == this.type) {
                            var a = {};
                            a[this.key] = !this.oldvalue;
                            Y(this.uuid, a)
                        } else if ("text" == this.type || "textarea" == this.type || "select-one" == this.type) {
                            var b = this.value;
                            if ("native" === this.valtype)
                                if ("undefined" === b) b = void 0;
                                else if ("null" === b) b = null;
                            else try {
                                b = JSON.parse(b)
                            } catch (c) {}
                            a = {};
                            a[this.key] = b;
                            Y(this.uuid, a)
                        }
                    },
                    k = n.createPosition(e.getMessage("Position_") + ": ", {
                        id: "position",
                        uuid: a.uuid,
                        name: a.name,
                        pos: a.position,
                        posof: a.positionof
                    }, f),
                    m = n.createDropDown(e.getMessage("Run_at"), {
                        id: "run_at",
                        uuid: a.uuid,
                        name: a.name,
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
                    }], f),
                    h = n.createDropDown(e.getMessage("No_frames"), {
                        id: "noframes",
                        uuid: a.uuid,
                        name: a.name,
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
                    }], f),
                    t = Z(e.getMessage("Original_includes"), {
                        id: "includes",
                        item: a
                    }, e.getMessage("User_excludes")),
                    p = Z(e.getMessage("Original_matches"), {
                        id: "matches",
                        item: a
                    }, e.getMessage("User_excludes")),
                    x = Z(e.getMessage("Original_excludes"), {
                        id: "excludes",
                        item: a
                    }, e.getMessage("User_includes")),
                    s = g("div", "clear", a.name, a.uuid, "clear"),
                    r = Z(e.getMessage("User_includes"), {
                        id: "includes",
                        item: a
                    }),
                    w = Z(e.getMessage("User_matches"), {
                        id: "matches",
                        item: a
                    }),
                    v = Z(e.getMessage("User_excludes"), {
                        id: "excludes",
                        item: a
                    }),
                    y = n.createCheckbox(e.getMessage("Apply_compatibility_options_to_required_script_too"), {
                        id: "compatopts_for_requires",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compatopts_for_requires
                    }, f),
                    u = n.createCheckbox(e.getMessage("Fix_wrappedJSObject_property_access"), {
                        id: "compat_wrappedjsobject",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_wrappedjsobject
                    }, f),
                    A = n.createCheckbox(e.getMessage("Convert_CDATA_sections_into_a_chrome_compatible_format"), {
                        id: "compat_metadata",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_metadata
                    }, f),
                    B = n.createCheckbox(e.getMessage("Replace_for_each_statements"), {
                        id: "compat_foreach",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_foreach
                    }, f),
                    F = n.createCheckbox(e.getMessage("Fix_for_var_in_statements"), {
                        id: "compat_forvarin",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_forvarin
                    }, f),
                    z = n.createCheckbox(e.getMessage("Convert_Array_Assignements"), {
                        id: "compat_arrayleft",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_arrayleft
                    }, f),
                    D = n.createCheckbox(e.getMessage("Add_toSource_function_to_Object_Prototype"), {
                        id: "compat_prototypes",
                        uuid: a.uuid,
                        name: a.name,
                        enabled: a.compat_prototypes
                    }, f),
                    y = [y, u, A, B, F, z, D],
                    u = g("div", "section", a.name, a.uuid, "ta_opt"),
                    B = g("div", "section_head", a.name, a.uuid, "head_ta_opt"),
                    A = g("div", "section_content", a.name, a.uuid, "content_ta_opt");
                B.textContent = e.getMessage("Settings");
                u.appendChild(B);
                u.appendChild(A);
                B = g("div", "section", a.name, a.uuid, "ta_cludes");
                z = g("div", "section_head", a.name, a.uuid, "head_ta_cludes");
                F = g("div", "section_content", a.name, a.uuid, "content_ta_cludes");
                z.textContent =
                    e.getMessage("Includes_Excludes");
                B.appendChild(z);
                B.appendChild(F);
                var z = g("div", "section", a.name, a.uuid, "ta_compat"),
                    ha = g("div", "section_head", a.name, a.uuid, "head_ta_compat"),
                    D = g("div", "section_content", a.name, a.uuid, "content_ta_compat");
                ha.textContent = e.getMessage("GM_compat_options_");
                z.appendChild(ha);
                z.appendChild(D);
                A.appendChild(k);
                a.user_agent || A.appendChild(m.elem);
                A.appendChild(h.elem);
                F.appendChild(t.elem);
                F.appendChild(p.elem);
                F.appendChild(x.elem);
                F.appendChild(s);
                F.appendChild(r.elem);
                F.appendChild(w.elem);
                F.appendChild(v.elem);
                l.appendChild(u);
                l.appendChild(B);
                if (!a.user_agent) {
                    for (k = 0; k < y.length; k++) D.appendChild(y[k].elem);
                    if (a.awareOfChrome)
                        for (var S in y) y[S].input.setAttribute("disabled", "disabled"), y[S].elem.setAttribute("title", e.getMessage("This_script_runs_in_Chrome_mode"));
                    l.appendChild(z)
                }
                var ia = {
                        name: a.name,
                        uuid: a.uuid,
                        id: "comment",
                        value: a.options.comment
                    },
                    xa = n.createTextarea(null, ia);
                xa.elem.setAttribute("class", "script_setting_wrapper");
                S = q("div", a.name, a.uuid, "save");
                k = n.createButton(a.name, a.uuid, e.getMessage("Save"), function() {
                    f.apply(xa.textarea, [])
                });
                S.appendChild(k);
                k = g("div", "section", a.name, a.uuid, "ta_comment");
                m = g("div", "section_head", a.name, a.uuid, "head_ta_comment");
                h = g("div", "section_content", a.name, a.uuid, "content_ta_comment");
                m.textContent = e.getMessage("Comment");
                k.appendChild(m);
                k.appendChild(h);
                h.appendChild(xa.elem);
                h.appendChild(S);
                l.appendChild(k);
                S = g("div", "section", a.name, a.uuid, "ta_det");
                k = g("div", "section_head", a.name, a.uuid, "head_ta_det");
                m = g("div", "section_content", a.name, a.uuid, "content_ta_det");
                k.textContent = e.getMessage("Details");
                S.appendChild(k);
                S.appendChild(m);
                k.textContent = e.getMessage("Details");
                ia = g("table", "script_details", a.name, a.uuid, "script_details");
                [{
                    label: e.getMessage("Size"),
                    value: (a.code ? a.code : a).length + " Bytes"
                }, {
                    label: e.getMessage("UUID"),
                    value: a.uuid
                }].forEach(function(b) {
                    var c = g("tr", "external_desc", a.uuid, b.label, "tr"),
                        d = g("td", "external_desc", a.uuid, b.label, "td1"),
                        e = g("td", "", a.uuid, b.label, "td2");
                    d.textContent =
                        b.label;
                    e.textContent = b.value;
                    c.appendChild(d);
                    c.appendChild(e);
                    ia.appendChild(c)
                });
                m.appendChild(ia);
                l.appendChild(S);
                d.appendChild(l);
                b.appendTab("script_settings_tab" + a.uuid, c, d);
                return {}
            },
            Oa = function(a, b) {
                var c = g("table", "script_desc", a.name, a.uuid, "outer_req2html"),
                    d = 0,
                    l = [{
                        label: e.getMessage("URL"),
                        prop: "url"
                    }, {
                        label: e.getMessage("Size"),
                        prop: "data",
                        fn: function(a) {
                            var b = "?";
                            a && (void 0 !== a.length ? b = a.length : void 0 !== a.content && (b = a.content.length));
                            return b + " Bytes"
                        }
                    }, {
                        label: e.getMessage("Last_updated"),
                        prop: "ts",
                        fn: function(a) {
                            return a ? (new Date(a)).toString() : "?"
                        }
                    }];
                a[b].forEach(function(f) {
                    var h = d + b;
                    l.forEach(function(b) {
                        var d = g("tr", "external_desc", a.uuid, b.prop, "tr" + h),
                            e = g("td", "external_desc", a.uuid, b.prop, "td1" + h),
                            l = g("td", "", a.uuid, b.prop, "td2" + h);
                        e.textContent = b.label;
                        l.textContent = (b.fn ? b.fn : function(a) {
                            return a
                        })(f[b.prop]);
                        d.appendChild(e);
                        d.appendChild(l);
                        c.appendChild(d)
                    });
                    var k = g("tr", "external_desc_buttons", a.uuid, f.url, "tr" + h),
                        p = g("td", "", a.uuid, "buttons", "td" + h);
                    k.appendChild(p);
                    c.appendChild(k);
                    if (f.ts) {
                        var k = q("div", a.name, a.uuid, "delete_external" + h),
                            x = n.createButton(a.uuid, "delete_external" + s.createUniqueId(f.url) + h, e.getMessage("Delete"), function() {
                                gb(a.uuid, f.url);
                                x.parentNode && x.parentNode.removeChild(x)
                            });
                        k.appendChild(x);
                        p.appendChild(k)
                    }
                    d++
                });
                if (!d) {
                    var f = g("tr", "script_desc", a.uuid, d, "tr"),
                        k = g("td", "script_desc", a.uuid, d, "td1");
                    k.textContent = e.getMessage("No_entry_found");
                    f.appendChild(k);
                    c.appendChild(f)
                }
                return c
            },
            eb = function(a, b) {
                var c = q("div", "", a.uuid, "script_external_h");
                c.textContent = e.getMessage("Externals");
                var d = q("div", "", a.uuid, "script_externals_c"),
                    l = g("div", "section", a.name, a.uuid, "ta_requires"),
                    f = g("div", "section_head", a.name, a.uuid, "head_ta_requires"),
                    k = g("div", "section_content", a.name, a.uuid, "content_ta_requires");
                f.textContent = e.getMessage("Requires");
                l.appendChild(f);
                l.appendChild(k);
                k.appendChild(Oa(a, "requires"));
                var f = g("div", "section", a.name, a.uuid, "ta_resources"),
                    k = g("div", "section_head", a.name, a.uuid, "head_ta_resources"),
                    m = g("div", "section_content",
                        a.name, a.uuid, "content_ta_resources");
                k.textContent = e.getMessage("Resources");
                f.appendChild(k);
                f.appendChild(m);
                m.appendChild(Oa(a, "resources"));
                k = q("div", "", a.uuid, "tab_content_settings");
                k.appendChild(l);
                k.appendChild(f);
                d.appendChild(k);
                b.appendTab("script_externals_tab" + a.uuid, c, d);
                return {}
            },
            cb = function(a, b, c) {
                var d = g("tr", "editor_container p100100", a.name, a.uuid, "container");
                if (!a.nnew && J(a.uuid, "lastI")) return [];
                a.nnew && (a.code = w.script_templates[0].value.replace("<$URL$>", L.url.match(/http.+\//)+'*' || "http://*/*").replace('New Userscript',L.url.match(/\/\/(.+?)\//)[1]));
                var l = q("div", a.name, a.uuid, "script_editor_h"),
                    f = l.inserted;
                l.textContent = e.getMessage("Editor");
                var k = q("div", a.name, a.uuid, "script_editor_c"),
                    m = g("tr", "editormenubar", a.name, a.uuid, "container_menu"),
                    h = g("table", "editor_container_o p100100 noborder", a.name, a.uuid, "container_o");
                h.appendChild(m);
                h.appendChild(d);
                k.appendChild(h);
                var t = function() {
                        var b = !1;
                        w.editor_enabled ? d.editor && (b |= d.editor.changed && d.editor.mirror.historySize().undo) : b = B.value != a.code;
                        return b
                    },
                    p = function(b) {
                        J(a.uuid, "saveEm")
                    },
                    x = function(a, b, d) {
                        c && c(b, d)
                    },
                    h = n.createImageButton(a.uuid, "save_to_disk", e.getMessage("Save_to_disk"), rea.extension.getURL("/layout/default/images/harddrive2.png"), function(b) {
                        b = d.editor && w.editor_enabled ? d.editor.mirror.getValue() : B.value;
                        r.wait();
                        P.plain.download(a.name, b).always(function() {
                            r.hide()
                        })
                    }),
                    I = n.createImageButton(a.uuid, "save", e.getMessage("Save"), rea.extension.getURL("/layout/default/images/filesave.png"), p),
                    C = n.createImageButton(a.uuid, "cancel", e.getMessage("Editor_reset"), rea.extension.getURL("/layout/default/images/editor_cancel.png"),
                        function() {
                            confirm(e.getMessage("Really_reset_all_changes_")) && (d.editor && w.editor_enabled ? d.editor.mirror.setValue(a.code) : B.textContent = a.code)
                        }),
                    H = n.createImageButton(a.uuid, "reset", e.getMessage("Full_reset"), rea.extension.getURL("/layout/default/images/script_cancel.png"), function() {
                        Ca(a.uuid, null, {
                            old_url: A.input ? A.input.oldvalue : "",
                            new_url: A.input ? A.input.value : "",
                            clean: !0,
                            reload: !0
                        }).done(function(a) {
                            a.cleaned && x(null, !0, !1)
                        });
                        v[a.uuid].fullReset()
                    }),
                    U = n.createImageButton(a.uuid, "close_script",
                        e.getMessage("Close"), rea.extension.getURL("/layout/default/images/exit.png"), x),
                    y = n.createImageButton(a.uuid, "lint_script", e.getMessage("Run_syntax_check"), rea.extension.getURL("/layout/default/images/check.png"), function() {
                        window.setTimeout(function() {
                            d.editor && w.editor_enabled && (r.wait(), window.setTimeout(function() {
                                Da.run(d.editor).always(r.hide)
                            }, 1))
                        }, 1)
                    }),
                    u;
                a.nnew && (u = {
                    value: w.script_templates[0].name,
                    uuid: "template-select",
                    name: "template-select"
                }, u = n.createDropDown(null, u, w.script_templates.map(function(a) {
                    return {
                        name: a.name,
                        value: a.name
                    }
                }), function() {
                    var a = this;
                    if (t() && !confirm(e.getMessage("Really_reset_all_changes_"))) a.value = a.oldvalue;
                    else {
                        var b = null;
                        w.script_templates.map(function(c) {
                            c.name === a.value && (b = c.value.replace("<$URL$>", L.url.match(/http.+\//)+'*' || "http://*/*").replace('New Userscript',L.url.match(/\/\/(.+?)\//)[1]))
                        });
                        b ? (this.oldvalue = a.value, d.editor && w.editor_enabled ? (d.editor.mirror.setValue(b), d.editor.changed = !1) : B.textContent = b) : a.value = a.oldvalue
                    }
                }));
                var A = n.createInput(e.getMessage("Update_URL_"), {
                    id: "file_url",
                    uuid: a.uuid,
                    name: a.name,
                    value: a.file_url
                });
                A.input.setAttribute("class",
                    "updateurl_input");
                A.elem.setAttribute("class", "updateurl");
                var B = g("textarea", "editorta", a.name, a.uuid);
                B.setAttribute("wrap", "off");
                var F = g("td", "editor_outer", a.name, a.uuid, "edit"),
                    E = g("div", "editor_100 editor_border", a.name, a.uuid, "edit"),
                    D = g("div", "editormenu", a.name, a.uuid, "editormenu");
                F.appendChild(E);
                m.appendChild(D);
                m.appendChild(A.elem);
                d.inserted || (E.appendChild(B), d.appendChild(F));
                a.system || (v[a.uuid].saveEm = function() {
                    var b = !0;
                    w.showFixedSrc && !a.user_agent && (b = confirm(e.getMessage("Do_you_really_want_to_store_fixed_code_",
                        e.getMessage("Show_fixed_source"))));
                    var c = d.editor && w.editor_enabled ? d.editor.mirror.getValue() : B.value;
                    b && Ca(a.uuid, c, {
                        old_url: A.input ? A.input.oldvalue : "",
                        new_url: A.input ? A.input.value : "",
                        clean: !1,
                        new_script: a.nnew,
                        reload: !0,
                        lastModified: v[a.uuid].saveEm_lastModified
                    }).done(function(b) {
                        b.installed ? a.nnew || b.renamed ? x(null, !0, !1) : (d.editor.changed = !1, b.lastModified && (a.lastModified = b.lastModified)) : b.aborted || (b.messages && b.messages.errors && b.messages.errors.length ? s.alert(b.messages.errors.join("\n")) :
                            s.alert(e.getMessage("Unable_to_parse_this_")))
                    });
                    return b
                }, D.appendChild(h), D.appendChild(I), D.appendChild(C));
                a.nnew || D.appendChild(H);
                D.appendChild(U);
                !a.system && w.editor_enabled && D.appendChild(y);
                a.nnew && D.appendChild(u.elem);
                b.appendTab("script_editor_tab" + a.uuid, l, k).select();
                if (f) return V["editor" + a.uuid];
                var ha = function() {
                    w.editor_autoSave && t() && J(a.uuid, "saveEm")
                };
                u = {
                    getEditor: function() {
                        if (d.editor) return d.editor.mirror
                    },
                    afterSelect: function() {
                        d.editor && d.editor.refresh()
                    },
                    onShow: function() {
                        (function() {
                            if (a.referrer &&
                                void 0 === a.code) {
                                var b = z();
                                ja({
                                    referrer: a.referrer,
                                    uuid: a.uuid
                                }, function(c) {
                                    c.items ? (a.code = c.items[0], b.resolve()) : b.reject();
                                    r.hide()
                                });
                                return b.promise()
                            }
                            return z.Pledge()
                        })().done(function() {
                            var b = k.getElementsByTagName("textarea");
                            v[a.uuid].lastI = function() {
                                return a
                            };
                            if (b.length && !d.editor) {
                                var b = b[0],
                                    c = function() {
                                        d.editor && (d.editor.changed = !0)
                                    };
                                if (w.editor_enabled) {
                                    var l = b.parentNode,
                                        f = {
                                            search: e.getMessage("Search"),
                                            replace: e.getMessage("Replace"),
                                            jump: e.getMessage("Jump_to_line"),
                                            macro: e.getMessage("Insert_constructor"),
                                            reindentall: e.getMessage("Auto_Indent_all")
                                        };
                                    l.removeChild(b);
                                    d.editor = new MirrorFrame(l, {
                                        value: a.code,
                                        indentUnit: Number(w.editor_indentUnit),
                                        indentWithTabs: "tabs" == w.editor_indentWithTabs,
                                        smartIndent: "classic" != w.editor_tabMode,
                                        indentByTab: "indent" == w.editor_tabMode,
                                        electricChars: "true" == w.editor_electricChars.toString(),
                                        lineNumbers: !0,
                                        extraKeys: {
                                            Enter: "newlineAndIndentContinueComment"
                                        },
                                        keyMap: w.editor_keyMap,
                                        gutters: ["gutter", "CodeMirror-linenumbers"],
                                        matchBrackets: !0
                                    }, {
                                        save: p,
                                        close: x
                                    }, {
                                        change: c,
                                        blur: ha
                                    }, f)
                                } else b.value = a.code
                            }
                        }).fail(function() {
                            x(null, !1, !0)
                        })
                    },
                    onClose: function(b) {
                        var c = function() {
                            d.editor = null;
                            delete v[a.uuid].lastI
                        };
                        if (!b && t()) return (b = confirm(e.getMessage("There_are_unsaved_changed_"))) && c(), !b;
                        c();
                        return !1
                    }
                };
                return V["editor" + a.uuid] = u
            },
            Wa = function(a, b, c) {
                v[a.uuid] || (v[a.uuid] = {});
                var d, l, f = a.icon && !a.nativeScript,
                    k = ["script_name"];
                a.nativeScript || k.push("clickable");
                a.blacklisted && k.push("crossedout");
                var m = g("span", k.join(" "), "", a.uuid, "sname"),
                    h = g("img", "nameNicon16 icon16",
                        "", a.uuid, "sname_img"),
                    t = g("span", f ? "nameNname16" : "", "", a.uuid, "sname_name"),
                    p = Ba(a),
                    k = e.getTranslation(a, "name");
                t.textContent = 35 < k.length ? k.substr(0, 35) + "..." : k;
                k = q("span", "", a.uuid, "sversion");
                k.textContent = a.version ? a.version : "";
                f && (h.src = a.icon, m.appendChild(h));
                var f = [],
                    x = function() {
                        d && (d.remove(), d = null);
                        delete V["tab" + a.uuid];
                        delete V["editor" + a.uuid]
                    },
                    r = function() {
                        window.setTimeout(function() {
                            for (var d in R) {
                                var e = R[d].script;
                                if (e.uuid == a.uuid) {
                                    ka(b, [e], null, c);
                                    break
                                }
                            }
                            va()
                        }, 1)
                    },
                    C = function(b,
                        c) {
                        void 0 === c && (c = !b);
                        a.uuid && s.getUrlArgs(!0).open == a.uuid && (window.location.hash = "");
                        l && l.onClose && l.onClose(b) || (x(), m.parentNode && m.parentNode.removeChild(m), c && r())
                    },
                    H = function() {
                        l && l.afterSelect && l.afterSelect()
                    },
                    z = function(f, h) {
                        if (!d) {
                            var k = null;
                            a.nnew ? (k = g("div", "head_icon", "", a.uuid, "details_h"), k.appendChild(n.createImage(a.imageURL, "", a.uuid, "new_script_head"))) : k = g("div", "", "", a.uuid, "details_h");
                            var m = q("div", "", a.uuid, "details_c");
                            d = c.insertTab(null, "details_" + a.uuid, k, m, H, a.nnew ? null :
                                C);
                            a.nnew || d.setHeading(e.getMessage("Edit") + " - " + (25 < a.name.length ? a.name.substr(0, 25) + "..." : a.name));
                            l = fb(d, a, b, m, C)
                        }
                        if (l && l.onShow) l.onShow();
                        d.show();
                        f && 1 == f.button || h || d.select();
                        t.setAttribute("open", "true");
                        !a.nnew && a.uuid && (window.location.hash = "open=" + a.uuid)
                    };
                "true" == t.getAttribute("open") && z(null, !0);
                var h = function(a, b) {
                        var c = a.getTime(),
                            d = b.getTime(),
                            e = Math.abs(c - d),
                            c = Math.round(e / 6E4),
                            d = Math.round(e / 36E5),
                            e = Math.round(e / 864E5);
                        return 60 >= c ? c + " min" : 48 >= d ? d + " h" : e + " d"
                    },
                    y = q("span", "",
                        a.uuid, "last_updated"),
                    u = "";
                if (a.nativeScript || a.nnew || a.system) u = "";
                else if (t.inserted || (y.addEventListener("click", function() {
                        J(a.uuid, "scriptUpdate")
                    }), y.setAttribute("class", "clickable"), y.title = e.getMessage("Check_for_Updates")), v[a.uuid].scriptUpdate = function() {
                        var b = y.textContent;
                        y.textContent = "";
                        y.appendChild(n.createImage(rea.extension.getURL("/layout/default/images/download.gif"), "down", a.uuid));
                        hb(a.uuid, function(c) {
                            y.textContent = b;
                            c ? (y.style.color = "green", y.title = e.getMessage("There_is_an_update_for_0name0_avaiable_",
                                a.name), x(), m.parentNode && m.parentNode.removeChild(m), Pa()) : (y.style.color = "red", y.title = e.getMessage("No_update_found__sry_"))
                        })
                    }, a.lastUpdated) try {
                    u = h(new Date, new Date(a.lastUpdated))
                } catch (A) {
                    console.log("o: error calculating time " + A.message)
                } else u = "?";
                y.textContent = u;
                var B = q("div", "", a.uuid, "imported"),
                    F = "";
                E.push(function() {
                    w.sync_enabled && (F = a.nativeScript || a.nnew || a.system ? "" : a.sync && a.sync.imported ? !0 === a.sync.imported || a.sync.imported == oa.types.ePASTEBIN ? '<img src="https://pastebin.com/favicon.ico" class="icon16" title="pastebin.com"/>' :
                        a.sync.imported == oa.types.eCHROMESYNC ? '<img src="https://www.google.com/images/icons/product/chrome-16.png" class="icon16" title="Google Sync"/>' : a.sync.imported == oa.types.eGOOGLE_DRIVE ? '<img src="https://www.google.com/images/icons/product/drive-16.png" class="icon16" title="Google Drive"/>' : '<img src="' + rea.extension.getURL("/layout/default/images/update.png") + '" class="icon16" />' : "", B.innerHTML = F, B = null)
                });
                h = q("span", "", a.uuid, "hp");
                if (a.origin) {
                    u = q("a", "", a.uuid, "hp");
                    u.setAttribute("href", a.origin.url);
                    u.setAttribute("target", "_blank");
                    var G = n.createImage(Q.origin(a.origin.token), "", a.uuid, a.origin.token, "");
                    u.appendChild(G);
                    h.appendChild(u)
                }
                p && (u = q("a", "", a.uuid, "hp"), u.setAttribute("href", p), u.setAttribute("target", "_blank"), p = n.createImage(rea.extension.getURL("/layout/default/images/home.png"), "", a.uuid, "hp", ""), u.appendChild(p), h.appendChild(u));
                v[a.uuid].saveEm_lastModified = a.lastModified;
                v[a.uuid].fullReset = function() {
                    b.parentNode.removeChild(b)
                };
                v[a.uuid].reportAnIssue = function(b) {
                    ib(a.uuid,
                        b)
                };
                v[a.uuid].deleteScript = function(c, d) {
                    if (a.nativeScript) {
                        var l = d || confirm(e.getMessage("Really_delete_0name0__", a.name));
                        !0 == l && (Ea(a.uuid, "installed", "false"), b.parentNode.removeChild(b))
                    } else l = d || confirm(e.getMessage("Really_delete_0name0__", a.name)), !0 == l && (Ca(a.uuid, null, {
                        reload: !d
                    }), b.parentNode.removeChild(b))
                };
                p = [];
                if (a.nativeScript) {
                    v[a.uuid].importNativeScript = function(c, d) {
                        !0 == (d || confirm(e.getMessage("Really_import_0name0__", a.name))) && (Ea(a.uuid, "imported", "true"), b.parentNode.removeChild(b))
                    };
                    var D = n.createImage(Q.get("import"), "", a.uuid, "import", e.getMessage("Import"), function() {
                        J(a.uuid, "importNativeScript")
                    });
                    n.addClass(D, "hidden");
                    p.push(D);
                    E.push(function() {
                        w.native_import && n.toggleClass(D, "hidden")
                    })
                }
                a.nnew || a.system || (u = n.createImage(Q.get("delete"), "", a.uuid, "delete", e.getMessage("Delete"), function() {
                    J(a.uuid, "deleteScript")
                }), p.push(u));
                a.nnew || a.system || !a.origin || a.supportURL === a.origin.issue_url || (u = n.createImage(Q.get("flag"), "", a.uuid, "issue", e.getMessage("Report_an_issue_to_the_script_hoster_"),
                    function() {
                        J(a.uuid, "reportAnIssue", "hoster")
                    }), p.push(u));
                a.nnew || a.system || !a.supportURL || (u = n.createImage(Q.get("bug"), "", a.uuid, "bug", e.getMessage("Report_a_bug"), function() {
                    J(a.uuid, "reportAnIssue", "author")
                }), p.push(u));
                m.inserted || a.nativeScript || m.addEventListener("click", z);
                m.appendChild(t);
                u = [a.name];
                a.description && u.push(e.getTranslation(a, "description"));
                a.blacklisted && (u = [e.getMessage("This_script_is_blacklisted_")]);
                m.title = u.join("\n\n").replace(/\"/, "");
                f.push(a.nnew || a.system ? null : {
                    element: jb(a),
                    style: "script_sel"
                });
                f.push(function() {
                    var b = null,
                        b = a.blacklisted ? "enabler_warning" : a.enabled ? a.contexter ? "enabler_later" : "enabler_enabled" : "enabler_disabled",
                        c = a.blacklisted ? e.getMessage("This_script_is_blacklisted_") : a.enabled ? e.getMessage("Enabled") : e.getMessage("Disabled"),
                        d = a.position,
                        b = n.createEnabler(b, a.uuid, "enabled", "enabled", c, function() {
                            J(a.uuid, a.nativeScript ? "switchNativeEnabled" : "switchEnabled")
                        }, a.nativeScript ? "" : d);
                    v[a.uuid].switchEnabled = function(b, c, d) {
                        void 0 === c &&
                            (c = !a.enabled);
                        Y(a.uuid, {
                            enabled: c
                        }, d)
                    };
                    v[a.uuid].switchNativeEnabled = function(b, c, d) {
                        void 0 === c && (c = !a.enabled);
                        Ea(a.uuid, "enabled", c, d)
                    };
                    return b
                }());
                f.push(m);
                f.push(k);
                f.push(kb(a));
                f.push(B);
                f.push(lb(a));
                f.push(mb(a));
                f.push(h);
                f.push(y);
                f.push(nb(a));
                f.push(function(a, b) {
                    var c = q("span", "", a.uuid, "wrap");
                    b && ("Array" === s.toType(b) ? s.each(b, function(a, b) {
                        c.appendChild(a)
                    }) : c.appendChild(b));
                    return c
                }(a, p));
                for (k = f.length; 10 > k; k++) f.push(null);
                !da.scripts && L.open && a.uuid === L.open ? E.push(z) : a.nnew &&
                    E.push(function() {
                        z(null, !0)
                    });
                return f
            },
            kb = function(a) {
                var b = q("span", "", a.uuid, "pos_type", !0);
                if (a.nnew) return b;
                a.user_agent ? (a = n.createImage("images/user_agent.png", "", a.uuid, "user_agent", e.getMessage("This_only_changes_the_user_agent_string")), b.appendChild(a)) : a.nativeScript ? (a = n.createImage(a.icon, "", a.uuid, "chrome_ext", e.getMessage("This_is_a_chrome_extension")), b.appendChild(a)) : a.userscript && (a = n.createImage("images/txt.png", "", a.uuid, "user_agent", e.getMessage("This_is_a_userscript")), b.appendChild(a));
                return b
            },
            mb = function(a) {
                var b = q("span", "", a.uuid, "pos_features", !0);
                if (a.nnew) return b;
                if (a.system) {
                    var c = n.createImage(rea.extension.getURL("/layout/default/images/lock.png"), "", a.uuid, "lock", e.getMessage("This_is_a_system_script"));
                    b.appendChild(c)
                }
                if (a.awareOfChrome || a.nativeScript) c = n.createImage("https://www.google.com/images/icons/product/chrome-16.png", "", a.uuid, "chrome_mode", e.getMessage("This_script_runs_in_Chrome_mode")), b.appendChild(c);
                if (a.nativeScript) return b;
                a.requires.length && (c =
                    n.createImage(rea.extension.getURL("/layout/default/images/script_download.png"), "", a.uuid, "requires", s.map(s.select(a.requires, function(a) {
                        return a && a.url
                    }), function(a) {
                        return a.url
                    }).join("\n")), b.appendChild(c));
                a.resources.length && (c = n.createImage(rea.extension.getURL("/layout/default/images/resources.png"), "", a.uuid, "resources", s.map(s.select(a.resources, function(a) {
                    return a && a.url
                }), function(a) {
                    return a.url
                }).join("\n")), b.appendChild(c));
                var c = !1,
                    d = {
                        includes: !0,
                        matches: !0
                    },
                    l;
                for (l in d)
                    if (a[l]) {
                        for (d =
                            0; d < a[l].length; d++)
                            if (a[l][d] && (-1 != a[l][d].search("https") || -1 != a[l][d].search(/^\*:\/\//))) {
                                c = n.createImage(rea.extension.getURL("/layout/default/images/halfencrypted.png"), "", a.uuid, "encrypt", e.getMessage("This_script_has_access_to_https_pages"));
                                b.appendChild(c);
                                c = !0;
                                break
                            }
                        if (c) break
                    }
                if (a.user_agent) return b;
                if (a.grant && a.grant.length) {
                    var f = {};
                    a.grant.forEach(function(a) {
                        f[a] = !0
                    });
                    f.GM_xmlhttpRequest && (c = n.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", a.uuid, "web", e.getMessage("This_script_has_full_web_access")),
                        b.appendChild(c));
                    f.GM_setValue && (c = n.createImage(rea.extension.getURL("/layout/default/images/db.png"), "", a.uuid, "db", e.getMessage("This_script_stores_data")), b.appendChild(c));
                    f.unsafeWindow && (c = n.createImage(rea.extension.getURL("/layout/default/images/windowlist.png"), "", a.uuid, "unsafeWindow", e.getMessage("This_script_has_access_to_webpage_scripts")), b.appendChild(c))
                } else c = n.createImage(rea.extension.getURL("/layout/default/images/critical.png"), "grant", a.uuid, "crit", e.getMessage("This_script_has_no_grant_header_set_")),
                    b.appendChild(c);
                for (l in a.options)
                    if (-1 != l.search("compat_") && a.options[l]) {
                        c = n.createImage(rea.extension.getURL("/layout/default/images/critical.png"), "compat", a.uuid, "crit", e.getMessage("One_or_more_compatibility_options_are_set"));
                        b.appendChild(c);
                        break
                    }
                return b
            },
            Ma = function(a) {
                var b = "global_hint_" + (a.class ? a.class : "warning"),
                    c = (new Date).getTime(),
                    d = g("span", ["global_hint", b].join(" "), "globalhint", c),
                    b = q("span", "globalhint_c", c),
                    e = q("span", "globalhint_t", c);
                a.title && (e.title = a.title);
                a.image &&
                    b.appendChild(n.createImage(Q.get(a.image), "globalhint", "icon" + c));
                e.textContent = a.text;
                a.onclick && !e.inserted && e.addEventListener("click", a.onclick);
                b.appendChild(e);
                d.appendChild(b);
                var f = $(d).hide().appendTo(document.body);
                window.setTimeout(function() {
                    f.slideDown()
                }, f.delay ? f.delay : 1);
                a.timeout && window.setTimeout(function() {
                    f.slideUp(function() {
                        f.remove()
                    });
                    a.done && a.done(d)
                }, a.timeout);
                return f
            },
            Qa = !1,
            Na = function() {
                if (!Qa) {
                    var a = e.getLocale(),
                        b = $("<div>").hide(),
                        c = function(a) {
                            a ? (b.html(""), b.append($('<div class="contrib_iframe" style="font-size: 2.5em;"></div>').append($('<div style="padding-top: 150px;">').text(a))),
                                window.setTimeout(c, 1E3)) : (b.fadeOut(1E3), window.setTimeout(r.hideDialog, 1E3))
                        },
                        a = $('<iframe src="https://tampermonkey.net/contrib.php?embedded=true' + (a ? "&locale=" + a : "") + '" class="contrib_iframe"></iframe>'),
                        d = [$('<button class="contrib_button">').html(e.getMessage("Remind_me_later")).click(function() {
                                aa("later", {});
                                c(e.getMessage("Ok"))
                            }), $('<button class="contrib_button">').html(e.getMessage("I_contributed_already")).click(function() {
                                aa("contributed", {});
                                c(e.getMessage("Thank_you_very_much_"))
                            }),
                            $('<button class="contrib_button">').html(e.getMessage("I_dont_want_to_contribute")).click(function() {
                                aa("hide", {});
                                c(e.getMessage("Ok"))
                            })
                        ],
                        l = function() {
                            f && window.clearTimeout(f);
                            d.forEach(function(a, b) {
                                a.prop("disabled", !1)
                            })
                        };
                    d.forEach(function(a, b) {
                        a.prop("disabled", !0)
                    });
                    b.append(a, d);
                    a.bind("load", l);
                    var f = window.setTimeout(function() {
                            f = null;
                            l()
                        }, 15E3),
                        k = function() {
                            var a = r.dialog(b[0]);
                            !0 === a ? (b.fadeIn(1E3), aa("dialog", {})) : void 0 === a && window.setTimeout(k, 500);
                            Qa = !0
                        };
                    k();
                    window.addEventListener("message",
                        function(a) {
                            var d = a.data.clicked || a.data.type,
                                l = a.data.amount,
                                f = a.data.currency;
                            d && (a.data.success ? "stripe" == d && (a = $(".contrib_iframe"), d = a.data("oheight"), !d || 0 > d || 1E3 < d || a.animate({
                                height: d
                            }, 1E3)) : (aa("clicked", d, {
                                amount: l || "?",
                                currency: f || "?"
                            }), $(".contrib_button").remove(), b.append($('<button class="contrib_button">').html(e.getMessage("Ok")).click(function() {
                                aa("contributed", {});
                                c()
                            })), "stripe" == d && (a = $(".contrib_iframe"), a.data("oheight", a.height()), a.animate({
                                height: 740
                            }, 1E3))))
                        }, !1)
                }
            },
            ob =
            function() {
                var a = null,
                    b = null,
                    c = null,
                    d = 0,
                    e = 0,
                    f = function(b) {
                        var d = c.x + b.pageX;
                        a.style.top = c.y + b.pageY + "px";
                        a.style.left = d + "px"
                    },
                    k = function(c) {
                        if (a) {
                            var k = null;
                            for (f(c); k != e;) {
                                var k = e,
                                    h = b.previousSibling,
                                    g = b.nextSibling,
                                    n = b.parentNode,
                                    q = m(b);
                                c.pageY > q.y + d && g ? (n.removeChild(g), n.insertBefore(g, b), e++) : c.pageY < q.y && 1 < e && (n.removeChild(h), g ? n.insertBefore(h, g) : n.appendChild(h), e--)
                            }
                        }
                    },
                    m = function(a) {
                        for (var b = a.offsetLeft, c = a.offsetTop; a = a.offsetParent;) b += a.offsetLeft, c += a.offsetTop;
                        return {
                            x: b,
                            y: c
                        }
                    },
                    h = {
                        start: function() {
                            document.addEventListener("mousemove", k);
                            document.addEventListener("scroll", k)
                        },
                        stop: function() {
                            document.removeEventListener("mousemove", k);
                            document.removeEventListener("scroll", k)
                        },
                        handleEvent: function(k, g) {
                            if (a) {
                                a.style.position = "static";
                                var n = {};
                                n[a.key] = e;
                                Y(a.uuid, n);
                                a = b = c = null;
                                h.stop()
                            } else h.start(), a = this, b = a.parentNode.parentNode.parentNode, d = b.offsetHeight, c = m(b.parentNode.parentNode), c.x = -c.x - a.offsetWidth / 2, c.y = -c.y - a.offsetHeight / 2, a.style.position = "absolute", f(k), e =
                                g
                        }
                    };
                return h
            }(),
            nb = function(a) {
                var b = g("span", "sorting", "", a.uuid, "pos_images", !0);
                if (a.nnew || a.nativeScript) return b;
                "pos" == T() && "up" == X() || b.setAttribute("style", "display: none;");
                if (1 < a.position || a.position < a.positionof) {
                    var c = g("span", "clickable movable", "position", a.uuid, !0);
                    c.innerHTML = "&#9776;";
                    c.title = e.getMessage("Click_here_to_move_this_script");
                    c.uuid = a.uuid;
                    c.key = "position";
                    c.addEventListener("click", function(b) {
                        ob.handleEvent.apply(this, [b, a.position])
                    });
                    b.appendChild(c)
                }
                return b
            },
            lb =
            function(a) {
                var b = q("span", "", a.uuid, "site_images"),
                    c = null;
                b.inserted && (c = b, c.setAttribute("id", c.id + "foo"), b = q("span", "", a.uuid, "site_images"));
                za.topIcons(a, 7).forEach(function(a) {
                    b.appendChild(a, !0)
                });
                c && c.parentNode.removeChild(c);
                return b
            },
            jb = function(a) {
                var b = q("input", "", a.uuid, "sel");
                b.type = "checkbox";
                b.s_id = a.uuid;
                b.name = "scriptselectors";
                b.s_type = a.nativeScript ? "n" : "s";
                b.inserted || b.addEventListener("click", function() {
                    v.multiselect.single_click()
                });
                return b
            },
            Ta = function(a) {
                var b = g("input",
                        "multiselectcb", "sms", "all", null),
                    c = g("input", "multiselectcb", "sms2", "all", null);
                b.inserted || (b.type = "checkbox", b.addEventListener("click", v.multiselect.un_selectAll), c.type = "checkbox", c.addEventListener("click", v.multiselect.un_selectAll));
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
                (G.RUNTIME.CAN_SAVEAS_ZIP || "undefined" !== typeof Blob) && l.push({
                    name: e.getMessage("Export"),
                    value: 3
                });
                l = l.concat([{
                    name: e.getMessage("Trigger_Update"),
                    value: 5
                }, {
                    name: e.getMessage("Remove"),
                    value: 6
                }]);
                l = n.createDropDown(e.getMessage("Apply_this_action_to_the_selected_scripts"), {
                    value: 0,
                    uuid: "sms-select",
                    name: "select"
                }, l, function() {
                    0 == this.value ? f.setAttribute("disabled", "true") : f.removeAttribute("disabled");
                    d = this.value
                });
                l.elem.setAttribute("class", "float");
                l.elem.setAttribute("style", "display: inline-block;");
                var f = n.createButton("MultiSelectButton", "button", e.getMessage("Start"), function() {
                    if (0 ==
                        d) console.log("option: ?!?!");
                    else if (6 != d || confirm(e.getMessage("Really_delete_the_selected_items_"))) {
                        for (var a = document.getElementsByName("scriptselectors"), b = [], c = 0; c < a.length; c++) b.push(a[c]);
                        for (var a = {}, l, f = !1, g = 100, c = 0; c < b.length; c++)
                            if (b[c].checked)
                                if (1 == d || 2 == d || 7 == d) {
                                    l = "n" == b[c].s_type ? "switchNativeEnabled" : "switchEnabled";
                                    var n;
                                    if (7 == d) {
                                        var q = R[b[c].s_id] ? R[b[c].s_id].script : null;
                                        q && (n = !q.enabled)
                                    } else n = 1 == d;
                                    void 0 !== n && (J(b[c].s_id, l, null, n, !1), f = !0)
                                } else 3 == d ? a[b[c].s_id] = !0 : 5 == d ? (l =
                                    "scriptUpdate", J(b[c].s_id, l)) : 6 == d && (l = "deleteScript", J(b[c].s_id, l, null, !0), f = !0, g = 1500);
                        3 == d && (r.wait(), la(a, {
                            storage: W
                        }).then(function(a) {
                            r.wait();
                            return G.RUNTIME.CAN_SAVEAS_ZIP ? P.zip.download(a.scripts).progress(function(a) {
                                r.wait(Math.floor(a.item / a.of * 100) + "%")
                            }) : P.json.download(a.scripts)
                        }).always(function() {
                            r.hide()
                        }));
                        f && (r.wait(e.getMessage("Please_wait___")), window.setTimeout(function() {
                            Pa()
                        }, g))
                    }
                });
                f.setAttribute("class", "action_button");
                f.setAttribute("disabled", "true");
                a = q("div", a.name,
                    a.id, "actions");
                a.setAttribute("style", "display: inline-block;");
                a.appendChild(l.elem);
                a.appendChild(f);
                return {
                    selAllm: c,
                    selAll: b,
                    actionBox: a
                }
            };
        (function() {
            var a = 0;
            v.multiselect = {};
            v.multiselect.toggleRow = function(a) {
                var c = $(document.getElementsByName("multiselectcol") || []);
                a ? c.show() : c.hide()
            };
            v.multiselect.single_click = function() {
                for (var b = 0, c = document.getElementsByName("scriptselectors"), d = !0, e = !1, f = !1, k = !0, g = !1, h = !1, n = 0, p = 0; p < c.length; p++) "n" == c[p].s_type ? (f = !0, d = d && c[p].checked, e = e || c[p].checked) :
                    "s" == c[p].s_type && (h = !0, k = k && c[p].checked, g = g || c[p].checked), c[p].checked && n++;
                !f || !d || h && !k && g || (b += 1);
                !h || !k || f && !d && e || (b += 2);
                b != a && (a = b, $(".multiselectcb").prop("checked", 0 != b ? "checked" : ""));
                v.multiselect.toggleRow(n);
                v.multiselect.checkScroll && v.multiselect.checkScroll()
            };
            v.multiselect.un_selectAll = function() {
                3 < ++a && (a = 0);
                for (var b = !1, c = 0, d = document.getElementsByName("scriptselectors"), e = 0; e < d.length; e++) 0 != e || 1 != a && 3 != a || "s" != d[e].s_type || 3 < ++a && (a = 0), b |= "s" == d[e].s_type, d[e].checked = 3 == a ||
                    1 == a && "n" == d[e].s_type || 2 == a && "s" == d[e].s_type, d[e].checked && c++;
                1 < a && !b && (a = 0);
                $(".multiselectcb").prop("checked", 0 != a ? "checked" : "");
                v.multiselect.toggleRow(c)
            }
        })();
        var Da = {
                cleanGutters: function(a, b) {
                    a.clearGutter("gutter")
                },
                setGutters: function(a, b) {
                    for (var c in b)
                        if (b.hasOwnProperty(c)) {
                            var d = b[c],
                                l = 0,
                                f = null,
                                k = [];
                            d.marks = [];
                            for (var g = 0; g < d.length; g++) {
                                var h = "",
                                    n = d[g];
                                n.stop ? (f = "no", l = 3) : n.warn ? (1 > l && (f = "critical", l = 1), h = e.getMessage("Warning") + ": ") : n.info ? (0 == l && (f = "info"), h = e.getMessage("Info") +
                                    ": ") : 2 > l && (f = "error", l = 2, h = e.getMessage("Error") + ": ");
                                k.push((1 < d.length ? h : "") + n.text.replace(/\"/g, '\\"'));
                                n.stop || d.marks.push(a.markText({
                                    line: n.line - 1,
                                    ch: n.character - 1
                                }, {
                                    line: n.line - 1,
                                    ch: n.character - 1 + n.evle
                                }, {
                                    className: "CodeMirror-highlight-" + f
                                }))
                            }
                            d = $("<span>").append($("<span>").attr("class", "editor_gutter").attr("title", k.join("\n\n")).append($("<span>").attr("width", "15px").append($("<img>").attr("class", "editor_gutter_img").attr("src", rea.extension.getURL("/layout/default/images/" + f + ".png")))))[0];
                            a.setGutterMarker(Number(c) - 1, "gutter", d)
                        }
                    return b
                },
                run: function(a) {
                    a.oldGutters && Da.cleanGutters(a.mirror, a.oldGutters);
                    return function() {
                        var a = z();
                        Registry.require("hinter", function() {
                            a.resolve(Registry.get("hinter"))
                        });
                        return a.promise()
                    }().then(function(b) {
                        return b.hint(a.mirror.getValue(), {
                            maxerr: 1E4
                        }, {})
                    }).done(function(b) {
                        if (b && b.length) {
                            var c = null,
                                d = {};
                            s.each(b, function(a) {
                                if (a && 1 < a.line) {
                                    var b = a.line,
                                        e = a.character;
                                    c || (c = {
                                        line: b,
                                        ch: e
                                    });
                                    var g = 0,
                                        h = a.reason.toLowerCase(),
                                        n = -1 != h.search("mixed spaces and tabs"),
                                        p = 0;
                                    try {
                                        var q = !!a.evidence && !n;
                                        if (q)
                                            for (var r = 0, s = 0; r < e && s < e; r++, s++) 9 == a.evidence.charCodeAt(r) && (s += w.editor_indentUnit - 1, g += 1);
                                        e -= g * (w.editor_indentUnit - 1);
                                        if (q || n) var v = a.evidence.length > e ? a.evidence.substr(e - 1) : "",
                                            z = n ? v.match(/([ \t])*/) : v.match(/([a-zA-Z0-9_])*/),
                                            p = z && z.length ? z[0].length : 0
                                    } catch (y) {
                                        console.log("jshint: error parsing source " + y.message)
                                    }
                                    g = p || 1;
                                    a = {
                                        line: b,
                                        stop: 0 == h.search("stopping"),
                                        info: n || -1 != h.search("forgotten") || -1 != h.search("not necessary") || -1 != h.search("unnecessary") ||
                                            -1 != h.search("better written") || -1 != h.search("bad line breaking") || -1 != h.search("semicolon"),
                                        warn: "(error)" != a.id || -1 != h.search("unreachable") || -1 != h.search("to compare with") || -1 != h.search("can be") || -1 != h.search("is preferable") || -1 != h.search("already defined"),
                                        character: e,
                                        evle: g,
                                        text: a.code + ": " + a.reason.replace(/.$/, "")
                                    };
                                    a.stop && b++;
                                    d[b] || (d[b] = []);
                                    d[b].push(a)
                                }
                            });
                            a.oldGutters = Da.setGutters(a.mirror, d);
                            c && (a.mirror.setCursor(c.line - 1, c.ch - 1), a.mirror.focus());
                            1 === b.length ? Ra(e.getMessage("One_error_or_hint_was_found_")) :
                                Ra(e.getMessage("0x0_errors_or_hints_were_found_", b.length))
                        } else pb(e.getMessage("No_syntax_errors_were_found_"))
                    })
                }
            },
            ba = null,
            M = function() {
                ba && (window.clearTimeout(ba), ba = null)
            },
            ma = null,
            N = function() {
                Fa(e.getMessage("Operation_completed_successfully"), "button_ok", "notice")
            },
            pb = function(a, b) {
                void 0 === b && (b = "button_ok");
                Fa(a, b, "information", 8E3)
            },
            Ra = function(a, b) {
                void 0 === b && (b = "error");
                Fa(a, b, "warning", 8E3)
            },
            Fa = function(a, b, c, d) {
                void 0 === d && (d = 3E3);
                ma && $(ma).remove();
                ma = Ma({
                    text: a,
                    image: b,
                    class: c,
                    delay: 500,
                    timeout: d,
                    done: function() {
                        ma = null
                    }
                })
            },
            O = function() {
                ba || (ba = window.setTimeout(function() {
                    ba = null;
                    r.wait(e.getMessage("Please_wait___"))
                }, 500))
            },
            ga = null,
            ca = null,
            K = function(a, b) {
                null != ga ? (window.clearTimeout(ga), ga = null, K(a ? a : ca.items, a ? b : ca.with_scripts)) : (ca = {
                    items: a,
                    with_scripts: b
                }, ga = window.setTimeout(function() {
                    ga = null;
                    ca.with_scripts && (R = {});
                    var a = ca.items,
                        b = na.create("_main", g("div", "tv_container_fit", "opt", "tv_container"));
                    ka(null, a, null, b);
                    r.hide();
                    va();
                    ca = null
                }, 50))
            },
            aa = function(a,
                b, c) {
                var d = z();
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
            ya = function(a, b) {
                try {
                    var c = function() {
                        b && G.OPTIONPAGE.CLOSE_ALLOWED && window.close()
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
            $a = function(a, b) {
                var c = z();
                try {
                    O(), sendMessage({
                        method: "installScript",
                        url: a,
                        reload: b.reload
                    }, function(a) {
                        M();
                        a.items ?
                            (N(), K(a.items, !1)) : r.hide();
                        a.err ? c.reject(a) : c.resolve(a)
                    })
                } catch (d) {
                    console.log("sS: " + d.message), c.reject({
                        err: d.message
                    })
                }
                return c.promise()
            },
            Za = function(a, b) {
                var c = z();
                try {
                    O(), sendMessage({
                        method: "exportToJson",
                        ids: a,
                        options: b
                    }, function(a) {
                        N();
                        M();
                        r.hide();
                        a.json ? c.resolve(a.json) : c.reject()
                    })
                } catch (d) {
                    console.log("eJ: " + d.message), c.reject({})
                }
                return c.promise()
            },
            Aa = function(a, b) {
                var c = z();
                try {
                    O(), sendMessage({
                        method: "importFromJson",
                        json: a,
                        reload: b.reload
                    }, function(a) {
                        M();
                        a.reload ? window.setTimeout(function() {
                                window.location.reload()
                            },
                            500) : a.items ? (N(), K(a.items, !0)) : r.hide();
                        a.err ? c.reject(a) : c.resolve(a)
                    })
                } catch (d) {
                    console.log("sS: " + d.message), c.reject({
                        err: d.message
                    })
                }
                return c.promise()
            },
            Ca = function(a, b, c) {
                var d = z();
                void 0 === c.reload && (c.reload = !0);
                try {
                    var e = c.new_url && c.new_url != c.old_url ? c.new_url : "";
                    O();
                    sendMessage({
                        method: "saveScript",
                        uuid: a,
                        code: b,
                        clean: c.clean,
                        force: c.force,
                        new_script: c.new_script,
                        force_url: e,
                        lastModified: c.lastModified,
                        reload: c.reload
                    }, function(a) {
                        M();
                        N();
                        a.items ? K(a.items, !0) : r.hide();
                        !b && c.reload &&
                            r.hide();
                        d.resolve(a)
                    })
                } catch (f) {
                    console.log("sS: " + f.message), d.reject({
                        err: f.message
                    })
                }
                return d.promise()
            },
            wa = function(a, b, c) {
                var d = z();
                try {
                    O(), sendMessage({
                        method: "setOption",
                        name: a,
                        value: b
                    }, function(a) {
                        M();
                        N();
                        w = a.options || w;
                        !c && a.items ? K(a.items, !1) : r.hide();
                        d.resolve(a)
                    })
                } catch (e) {
                    console.log("sO: " + e.message), d.reject({
                        err: e.message
                    })
                }
                return d.promise()
            },
            Va = function(a, b, c) {
                var d = z();
                try {
                    O(), sendMessage({
                        method: "buttonPress",
                        name: a,
                        data: b
                    }, function(a) {
                        M();
                        !c && a.items ? (N(), K(a.items, !1)) : r.hide();
                        d.resolve(a)
                    })
                } catch (e) {
                    console.log("sO: " + e.message), d.reject({
                        err: e.message
                    })
                }
                return d.promise()
            },
            ja = function(a, b) {
                O();
                sendMessage({
                    method: "loadTree",
                    complete: a.complete,
                    uuid: a.uuid,
                    referrer: a.referrer
                }, function(a) {
                    M();
                    w = a.options || w;
                    a.i18n && e.setLocale(a.i18n);
                    a.items ? a.begging && E.push(function() {
                        window.setTimeout(Na, 100)
                    }) : a.error ? alert(a.error) : confirm(e.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href = "http://tampermonkey.net/bug");
                    b(a)
                })
            },
            Pa = function() {
                ja({
                    referrer: "options.scripts"
                }, function(a) {
                    a.items ? K(a.items, !0) : r.hide()
                })
            },
            Y = function(a, b, c) {
                void 0 == c && (c = !0);
                try {
                    a = {
                        method: "modifyScriptOptions",
                        uuid: a,
                        reload: c
                    };
                    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                    O();
                    sendMessage(a, function(a) {
                        M();
                        w = a.options || w;
                        a.i18n && e.setLocale(a.i18n);
                        N();
                        a.items ? K(a.items, !0) : r.hide()
                    })
                } catch (g) {
                    console.log("mSo: " + g.message)
                }
            },
            Ea = function(a, b, c, d) {
                void 0 === d && (d = !0);
                try {
                    a = {
                        method: "modifyNativeScript",
                        nid: a,
                        actionid: b,
                        value: c,
                        reload: d
                    }, O(), sendMessage(a,
                        function(a) {
                            M();
                            N();
                            a.items ? K(a.items, !0) : r.hide()
                        })
                } catch (e) {
                    console.log("mSo: " + e.message)
                }
            },
            gb = function(a, b) {
                try {
                    O(), sendMessage({
                        method: "buttonPress",
                        name: "externals_delete",
                        scriptuid: a,
                        url: b
                    }, function(a) {
                        M();
                        N();
                        a.items ? K(a.items, !1) : r.hide()
                    })
                } catch (c) {
                    console.log("dEx: " + c.message)
                }
            },
            hb = function(a, b) {
                try {
                    sendMessage({
                        method: "buttonPress",
                        name: "run_script_updates",
                        scriptuid: a
                    }, function(a) {
                        N();
                        b && b(a.updatable)
                    })
                } catch (c) {
                    console.log("rSu: " + c.message)
                }
            },
            ib = function(a, b, c) {
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
            if ("updateOptions" == a.method) w = a.options || w, K(a.items, !1), c({});
            else if ("confirm" == a.method) s.confirm(a.msg, function(a) {
                c({
                    confirm: a
                })
            });
            else if ("showMsg" == a.method) s.alert(a.msg), c({});
            else return !1;
            return !0
        });
        (function() {
            ja({
                referrer: "options"
            }, function(a) {
                bb();
                a.items ? K(a.items, !1) : r.hide()
            })
        })()
    })
});
