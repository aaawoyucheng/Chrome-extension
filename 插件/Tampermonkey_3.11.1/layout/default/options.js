window.requestFileSystem || (window.requestFileSystem = window.webkitRequestFileSystem);
Registry.require("promise layout xmlhttprequest crcrc curtain cache layout/default/tabview layout/default/htmlutil helper statistics i18n syncinfo uri layout/default/layout_helper porter".split(" "), function() {
            var fa = rea.FEATURES,
                G = Registry.get("promise"),
                r = Registry.get("crcrc").cr,
                h = Registry.get("crcrc").crc,
                ka = Registry.get("layout/default/tabview"),
                l = Registry.get("layout/default/htmlutil"),
                La = Registry.get("statistics"),
                la = Registry.get("syncinfo"),
                ma = Registry.get("cache"),
                s = Registry.get("curtain"),
                e = Registry.get("i18n"),
                t = Registry.get("helper"),
                na = Registry.get("uri"),
                M = Registry.get("porter"),
                oa = Registry.get("layout"),
                pa = Registry.get("layout/default/layout_helper"),
                N = pa.images;
            oa.render(function() {
                pa.addStyle();
                pa.addFont();
                var Z = {},
                    w = {},
                    z = [],
                    qa = "0.0.0",
                    R = {},
                    Ca = {},
                    O = {},
                    S = !0,
                    aa = !1,
                    v = {},
                    C = function(a, b) {
                        if (v[a] && v[a][b]) return v[a][b].apply(this, Array.prototype.slice.call(arguments, 2));
                        console.log("option: WARN: unable to find callback '" + b + "' for id '" + a + "'")
                    },
                    J, Da = function() {
                        J = t.getUrlArgs(!0)
                    };
                window.onhashchange = Da;
                Da();
                J.open && (J.selected = "dashboard");
                (function() {
                    z.push(function() {
                        w.statistics_enabled && La.init("opt", qa)
                    })
                })();
                var ra = t.getDebouncer(1E3),
                    sa = function() {
                        for (; z.length;) try {
                            z.shift()()
                        } catch (a) {
                            console.warn("doneListeners:", a)
                        }
                    },
                    oa = function(a, b) {
                        var c = r("input", a.name, a.id, "Save");
                        c.inserted || (c.type = "button", c.section = a, c.value = e.getMessage("Save"), c.addEventListener("click", function() {
                            if (!b || !b.warning || ba(b.warning)) {
                                var a = Array.prototype.slice.call(this.section.getElementsByTagName("textarea")),
                                    c = function(b) {
                                        b.each(function(b, c) {
                                            a.push(c)
                                        })
                                    };
                                c($("#" + this.section.id).find("input"));
                                c($("#" + this.section.id).find("select"));
                                for (c = 0; c < a.length; c++) {
                                    var f = null,
                                        k = a[c],
                                        m = k.key;
                                    "textarea" == k.tagName.toLowerCase() ? f = k.array ? k.value.split("\n").map(function(a) {
                                            return a.trim()
                                        }).filter(function(a) {
                                            return a
                                        }) : k.value : "checkbox" == k.getAttribute("type") ? f = k.checked : "select" == k.getAttribute("type") ? (f = 0, 0 <= k.selectedIndex && k.selectedIndex < k.options.length && (f = k.selectedIndex), f = k[f] ? k[f].value : k.options[0].value) :
                                        "button" != k.getAttribute("type") && (f = k.value);
                                    m && ta(m, f, b && b.reload)
                                }
                                b && b.reload && window.location.reload()
                            }
                        }, !1));
                        return c
                    },
                    Na = function(a) {
                        var b = function(a, b, c, d, f) {
                                var g = h("th", "settingsth", a.name, a.id, b),
                                    k = h("a", "settingsth_a", a.name, a.id, b + "_a");
                                k.setAttribute("name", "settingsth_a" + a.name);
                                var m = h("a", "settingsth_a_up", a.name, a.id, b + "_a_up");
                                m.setAttribute("name", "settingsth_a_up" + a.name);
                                var e = h("a", "settingsth_a_down", a.name, a.id, b + "_a_down");
                                e.setAttribute("name", "settingsth_a_down" + a.name);
                                var q = function() {
                                        for (var b = document.getElementsByName("settingsth_a_up" + a.name), c = document.getElementsByName("settingsth_a_down" + a.name), d = 0; d < b.length; d++) b[d].style.display = "none";
                                        for (d = 0; d < c.length; d++) c[d].style.display = "none";
                                        "up" == T() ? m.style.display = "" : e.style.display = ""
                                    },
                                    n = function() {
                                        q()
                                    };
                                b = function() {
                                    window.setTimeout(function() {
                                        if (Q() == d) {
                                            var a = "down" == T() ? "up" : "down";
                                            localStorage.setItem("sort_sequence", a)
                                        } else localStorage.setItem("sort_key", d);
                                        Ea(n)
                                    }, 1)
                                };
                                g.inserted || (g.appendChild(k),
                                    g.appendChild(e), g.appendChild(m), k.addEventListener("click", b), m.addEventListener("click", b), e.addEventListener("click", b), k.textContent = c + " ", k.href = "#", m.innerHTML = "&#x25B4;", m.href = "#", e.innerHTML = "&#x25BE;", e.href = "#");
                                f && !Q() ? (localStorage.setItem("sort_key", d), localStorage.setItem("sort_sequence", "up"), window.setTimeout(q, 1)) : d == Q() && window.setTimeout(q, 1);
                                return g
                            },
                            c, d, g, f, k;
                        f = r("tbody", a.name, a.id, "body");
                        k = r("thead", a.name, a.id, "head");
                        if (a.scriptTab) {
                            var m = Ma(a);
                            c = h("table", "scripttable",
                                a.name, a.id, "main");
                            var q = h("th", "script_sel", a.name, a.id, "thead_sel");
                            q.appendChild(m.selAllm);
                            g = h("tr", "multiselect settingstr filler", a.name, a.id, "filler_multi");
                            var n = h("th", "", a.name, a.id, "thead_multi");
                            n.setAttribute("colspan", "9");
                            n.appendChild(m.actionBox);
                            $(g).hide();
                            g.setAttribute("name", "multiselectcol");
                            g.appendChild(q);
                            g.appendChild(n);
                            q = h("th", "script_sel", a.name, a.id, "thead_sel");
                            q.appendChild(m.selAll);
                            var m = b(a, "thead_en", "#", "pos"),
                                n = b(a, "thead_name", e.getMessage("Name"), "name", !0),
                                p = b(a, "thead_ver", e.getMessage("Version"), "ver"),
                                y = h("th", "settingsth", a.name, a.id, "thead_type");
                            y.textContent = e.getMessage("Type");
                            var l = h("th", "settingsth", a.name, a.id, "thead_sync");
                            l.textContent = "";
                            var A = b(a, "thead_sites", e.getMessage("Sites"), "sites");
                            A.width = "25%";
                            var H = h("th", "settingsth", a.name, a.id, "thead_features");
                            H.textContent = e.getMessage("Features");
                            var da = b(a, "thead_homepage", e.getMessage("Homepage"), "homepage"),
                                b = b(a, "thead_updated", e.getMessage("Last_Updated"), "updated"),
                                x = h("th",
                                    "settingsth", a.name, a.id, "thead_sort"),
                                u = h("span", "sorting", a.name, a.id, "thead_sort_span");
                            u.textContent = e.getMessage("Sort");
                            "pos" == Q() && "up" == T() || u.setAttribute("style", "display: none;");
                            x.appendChild(u);
                            u = h("th", "settingsth", a.name, a.id, "thead_del");
                            u.textContent = e.getMessage("Actions");
                            z.push(function() {
                                w.sync_enabled && (l.textContent = e.getMessage("Imported"))
                            });
                            d = h("tr", "settingstr filler", a.name, a.id, "filler");
                            d.setAttribute("style", "height: 36px;");
                            d.setAttribute("name", "multiselectcol_hide");
                            t.each([q, m, n, p, y, l, A, H, da, b, x, u], function(a, b) {
                                d.appendChild(a)
                            });
                            k.appendChild(g);
                            k.appendChild(d);
                            k.setAttribute("name", "multiselectrow");
                            d.inserted || (v.multiselect.checkScroll = function(a) {
                                a = $(k).is(":visible") && $(g).is(":visible") && $(window).scrollTop() > $(k).offset().top;
                                $(g).toggleClass("multi_scrolling", a)
                            }, $(window).scroll(v.multiselect.checkScroll))
                        } else c = h("table", "settingstable", a.name, a.id, "main"), d = h("tr", "settingstr filler", a.name, a.id, "filler"), f.appendChild(d);
                        c.appendChild(k);
                        c.appendChild(f);
                        return {
                            table: c,
                            head: k,
                            body: f
                        }
                    },
                    Fa = function(a, b, c, d) {
                        var g = [],
                            f = function() {
                                [0, 1].forEach(function() {
                                    g.unshift(null)
                                })
                            };
                        if (b.divider) return null;
                        b.image && (b.imageURL = N.get(b.image));
                        if (b.checkbox) {
                            f = function() {
                                var a = !0;
                                this.warning && (a = ba(this.warning), a || (this.checked = !this.checked));
                                a && (ta(this.key, this.checked, this.reload), this.reload && window.location.reload())
                            };
                            c && c.need_save && (f = m = null);
                            var k = l.createCheckbox(b.name, b, f);
                            g.push(k.elem)
                        } else if (b.button) k = l.createButton(b.name, b, function() {
                            var a = !0;
                            this.warning && (a = ba(this.warning));
                            a && Oa(this.key, !0, this.ignore, this.reload)
                        }), g.push(k);
                        else if (b.input) k = l.createTextarea(b.name, b), g.push({
                            element: k.elem,
                            validation: k.label
                        }), c && (c.need_save = !0);
                        else if (b.text) k = l.createInput(b.name, b), g.push(k.elem), c && (c.need_save = !0);
                        else if (b.color) k = l.createColorChooser(b.name, b), g.push(k.elem), c && (c.need_save = !0);
                        else if (b.password) k = l.createPassword(b.name, b), g.push(k.elem), c && (c.need_save = !0);
                        else if (b.select) {
                            var m = function() {
                                var a = !0;
                                this.warning &&
                                    (a = ba(this.warning), a || (this.value = this.oldvalue));
                                a && (ta(this.key, this.value, this.reload), this.reload && window.location.reload())
                            };
                            c && c.need_save && (m = b.enabler ? function() {
                                    var a = document.getElementsByName("enabled_by_" + this.key),
                                        b = (this.selectedIndex < this.options.length ? this.options[this.selectedIndex] : this.options[0]).getAttribute("enables"),
                                        d = b ? JSON.parse(b) : {};
                                    t.each(a, function(a) {
                                        void 0 === d[a.key] || d[a.key] ? a.setAttribute("style", t.staticVars.visible) : a.setAttribute("style", t.staticVars.invisible)
                                    })
                                } :
                                null);
                            k = l.createDropDown(b.name, b, b.select, m, function() {
                                var a = !0;
                                this.selectedOptions.length && this.selectedOptions[0].warning && this.selectedOptions[0].value !== this.oldvalue && (a = ba(this.selectedOptions[0].warning), a || (this.value = this.previousValue || this.oldvalue));
                                this.previousValue = this.value
                            });
                            g.push(k.elem);
                            a && b.enabler && function() {
                                var a = m,
                                    b = k;
                                z.push(function() {
                                    a.apply(b.select, [])
                                })
                            }()
                        } else if (b.url) {
                            var e = r("a", b.name, b.id);
                            e.href = "#";
                            e.url = b.url;
                            e.newtab = b.newtab;
                            e.inserted || (m = function() {
                                va(this.url,
                                    this.newtab)
                            }, e.addEventListener("click", m));
                            e.textContent = b.name;
                            g.push(e);
                            f()
                        } else if (b.main_menu_item) {
                            f = r("span", b.name, b.id);
                            f.textContent = b.name;
                            var e = Na(b),
                                n = r("div", b.name, b.id, "tab_content");
                            n.appendChild(e.table);
                            var p = null,
                                f = d.appendTab(b.id, f, n, function() {
                                    p && (Z.global ? p() : z.push(p))
                                });
                            b.referrer && (p = function() {
                                p = null;
                                s.wait();
                                ga({
                                    referrer: b.referrer
                                }, function(b) {
                                    b.items && b.items.forEach(function(b) {
                                        Fa(a, b, c, d)
                                    });
                                    sa();
                                    s.hide()
                                })
                            });
                            b.items && ha(e.body, b.items, null, d);
                            Z.global || !b.selected_default ||
                                J.selected || f.select()
                        } else if (b.sub_menu_item) e = h("div", "section", b.name, b.id), f = h("div", "section_head", b.name, b.id, "head"), n = h("table", "section_content", b.name, b.id, "content"), f.textContent = b.name, e.appendChild(f), b.desc && l.setHelp(b.desc, f, f, b), e.appendChild(n), ha(n, b.items, b, d), b.need_save && n.appendChild(oa(n, b)), g.push(e);
                        else if (b.userscript || b.nativeScript || b.user_agent) {
                            g = Pa(b, a, d);
                            if (b.userscript || b.user_agent) O[b.uuid] = {
                                dom: a,
                                script: b
                            };
                            a.setAttribute("class", "scripttr");
                            b.nnew ? a.setAttribute("style",
                                "display: none;") : ra.is("script_refresh") || (z.push(function() {
                                wa.init(t.map(O, function(a) {
                                    return a.script
                                }));
                                v.multiselect.single_click();
                                Ea();
                                Z.scripts = !0;
                                ra.clear()
                            }), ra.add("script_refresh"))
                        } else b.version ? (qa = b.value, h("div", "version", "version", "version").textContent = "v" + qa + " by Jan Biniok") : b.globalhint ? Ga({
                            text: b.value,
                            title: b.description,
                            onclick: b.info_url ? function() {
                                va(b.info_url, !0)
                            } : null,
                            image: b.image
                        }) : (e = r("span", "", b.uuid || b.id + b.name), e.textContent = b.name, g.push(e), f());
                        g.forEach(function(a) {
                            if (a) {
                                void 0 !==
                                    b.level && (a.element || a).setAttribute("style", b.level > w.configMode ? t.staticVars.invisible : t.staticVars.visible || "");
                                if (b.hint) {
                                    var d = r("span", "", b.uuid || b.id + b.name, "hint");
                                    d.textContent = b.hint;
                                    a.appendChild(d)
                                }
                                b.validation && Qa(b, a.validation || a.element || a);
                                b.width && a.setAttribute("class", "width-172-" + b.width)
                            }
                        });
                        a && (n = a.getAttribute("class"), f = " hide", !1 === b.visible ? n = (n || "") + f : n && (n = n.replace(f, "")), a.setAttribute("class", n));
                        return g
                    },
                    ha = function(a, b, c, d) {
                        for (var g in b) {
                            var f = b[g],
                                k = a ? r("tr", "",
                                    f.uuid || f.id + f.name, "pi") : null,
                                m = Fa(k, f, c, d);
                            m && m.length && (a && a.appendChild(k), t.each(m, function(a, b) {
                                var d = a,
                                    c = "";
                                "Object" === t.toType(a) && (d = a.element, c = a.style);
                                c = h("td", c, "", f.uuid || f.id + f.name, b);
                                a && c.appendChild(d);
                                k && k.appendChild(c)
                            }))
                        }
                    },
                    ba = function(a) {
                        if (a.once) {
                            if (Ca[a.msg]) return !0;
                            Ca[a.msg] = !0
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
                    Qa = function(a, b) {
                        var c;
                        a.validation &&
                            (a.validation.url && (c = function() {
                                va(this.url, !0)
                            }), a.validation.image && (a.validation.imageURL = N.get(a.validation.image)), c = l.createAfterIcon(a, c)) && (c.url = a.validation ? a.validation.url : void 0, b.appendChild(c))
                    },
                    Ra = function(a) {
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
                    ia = function(a, b) {
                        var c = G(),
                            d = [];
                        Sa(a, b).done(function(a) {
                            a.scripts.forEach(function(a) {
                                !a.uuid ||
                                    !a.userscript && !a.user_agent || a.system || a.nnew || (a.code && "" != a.code.trim() ? d.push(Ra(a)) : console.log("options: Strange script: " + a.name))
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
                    Ua = function(a) {
                        var b = r("div", "utils", "utils", "tab_util_h");
                        b.textContent = e.getMessage("Utilities");
                        var c = r("div", "utils", "utils", "tab_util");
                        a.appendTab("util_tabutils", b, c).show();
                        a = h("div", "tv_util", "utils", "utils", "tab_util_cont");
                        var d = function(a) {
                                var b =
                                    G(),
                                    d = new FileReader;
                                d.onload = function(a) {
                                    b.resolve(a.target.result)
                                };
                                d.readAsText(a);
                                return b.promise()
                            },
                            g = l.createButton("utils", "utils_i_ta", e.getMessage("Import"), function() {
                                M.json.read(P.value).then(function(a) {
                                    return xa(a, {
                                        reload: !0
                                    })
                                }).done(function(a) {
                                    a.err && t.alert(a.err)
                                }).fail(function() {
                                    t.alert(e.getMessage("Unable_to_parse_this_"))
                                })
                            }),
                            f = l.createFileSelect(e.getMessage("Import"), {
                                name: "zip",
                                id: "utils"
                            }, function(a) {
                                s.wait();
                                for (var b = 0, d; d = a[b]; b++) M.zip.read(d).progress(function(a) {
                                    s.wait(Math.floor(a.item /
                                        a.of * 100) + "%")
                                }).then(function(a) {
                                    return xa({
                                        scripts: t.map(a.scripts, function(a) {
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
                                    a.err && t.alert(a.err)
                                }).fail(function() {
                                    t.alert(e.getMessage("Unable_to_parse_this_"))
                                }).always(s.hide)
                            }),
                            k = l.createFileSelect(e.getMessage("Import"), {
                                name: "file",
                                id: "utils"
                            }, function(a) {
                                for (var b = 0, c; c = a[b]; b++) d(c).then(function(a) {
                                    return M.json.read(a)
                                }).then(function(a) {
                                    return xa(a, {
                                        reload: !0
                                    })
                                }).done(function(a) {
                                    a.err && t.alert(a.err)
                                }).fail(function() {
                                    t.alert(e.getMessage("Unable_to_parse_this_"))
                                })
                            }),
                            b = l.createButton("utils", "utils_i_url", e.getMessage("Import"), function() {
                                s.wait();
                                return Ta(x.value, {
                                    reload: !0
                                }).fail(function(a) {
                                    a = a.err ? a.err : e.getMessage("Unable_to_parse_this_");
                                    t.alert(a)
                                }).always(s.hide)
                            }),
                            m = l.createButton("utils", "utils_e_ta", e.getMessage("Export"),
                                function() {
                                    ia(null, {
                                        storage: S,
                                        global_settings: aa
                                    }).then(function(a) {
                                        return M.json.create(a.scripts, a.global_settings)
                                    }).done(function(a) {
                                        P.value = a
                                    })
                                }),
                            q = l.createButton("utils", "utils_e_file", e.getMessage("Export"), function() {
                                ia(null, {
                                    storage: S,
                                    global_settings: aa
                                }).then(function(a) {
                                    return M.json.download(a.scripts, a.global_settings)
                                })
                            }),
                            n = l.createButton("utils", "utils_e_zip", e.getMessage("Export"), function() {
                                ia(null, {
                                    storage: S,
                                    global_settings: aa
                                }).then(function(a) {
                                    s.wait();
                                    return M.zip.download(a.scripts,
                                        a.global_settings).progress(function(a) {
                                        s.wait(Math.floor(a.item / a.of * 100) + "%")
                                    })
                                }).always(function() {
                                    s.hide()
                                })
                            }),
                            p = l.createCheckbox(e.getMessage("Include_TM_settings"), {
                                id: "utils_e_export_tm_settings",
                                enabled: "true"
                            }, function() {
                                aa = this.checked
                            });
                        p.elem.setAttribute("style", "padding-left: 15px; display: inline");
                        p.input.checked = aa;
                        var y = l.createCheckbox(e.getMessage("Include_script_storage"), {
                            id: "utils_e_export_storage",
                            enabled: "true"
                        }, function() {
                            S = this.checked
                        });
                        y.elem.setAttribute("style", "padding-left: 15px; display: inline");
                        y.input.checked = S;
                        var P = h("textarea", "importta", "utils", "utils", "ta"),
                            A = h("div", "section", "utils", "utils", "ta"),
                            H = h("div", "section_head", "utils", "utils", "head_ta"),
                            da = h("div", "section_content", "utils", "utils", "content_ta");
                        H.textContent = e.getMessage("General");
                        da.appendChild(y.elem);
                        da.appendChild(p.elem);
                        A.appendChild(H);
                        A.appendChild(da);
                        p = h("div", "section", "utils", "utils", "ta");
                        y = h("div", "section_head", "utils", "utils", "head_ta");
                        H = h("div", "section_content", "utils", "utils", "content_ta");
                        y.textContent =
                            e.getMessage("TextArea");
                        H.appendChild(m);
                        H.appendChild(g);
                        H.appendChild(P);
                        p.appendChild(y);
                        p.appendChild(H);
                        g = h("div", "section", "utils", "utils", "sb");
                        m = h("div", "section_head", "utils", "utils", "head_sb");
                        y = h("div", "section_content", "utils", "utils", "content_sb");
                        m.textContent = e.getMessage("Zip");
                        g.appendChild(m);
                        g.appendChild(y);
                        y.appendChild(n);
                        y.appendChild(f.elem);
                        f = h("div", "section", "utils", "utils", "fi");
                        n = h("div", "section_head", "utils", "utils", "head_fi");
                        m = h("div", "section_content", "utils", "utils",
                            "content_fi");
                        n.textContent = e.getMessage("File");
                        f.appendChild(n);
                        f.appendChild(m);
                        m.appendChild(q);
                        m.appendChild(k.elem);
                        var x = h("input", "updateurl_input", "utils", "utils", "url"),
                            k = h("div", "section", "utils", "utils", "ur"),
                            q = h("div", "section_head", "utils", "utils", "head_ur"),
                            n = h("div", "section_content", "utils", "utils", "content_ur");
                        q.textContent = e.getMessage("URL");
                        k.appendChild(q);
                        k.appendChild(n);
                        n.appendChild(x);
                        n.appendChild(b);
                        a.appendChild(A);
                        fa.RUNTIME.CAN_SAVEAS_ZIP && a.appendChild(g);
                        "undefined" !==
                        typeof Blob && a.appendChild(f);
                        a.appendChild(p);
                        a.appendChild(k);
                        t.each([p], function(a) {
                            var b = a.getAttribute("class"),
                                b = 50 > w.configMode ? b + " hide" : b.replace(" hide", "");
                            a.setAttribute("class", b)
                        });
                        c.appendChild(a)
                    },
                    Va = function() {
                        var a = document.getElementById("options"),
                            b = h("div", "main_container p100100", "options", "main");
                        if (a) {
                            var c = a.parentNode;
                            c.removeChild(a);
                            c.appendChild(b);
                            document.body.setAttribute("class", "main")
                        }
                        var a = h("div", "head_container", "opt", "head_container"),
                            c = h("div", "tv_container",
                                "opt", "tv_container"),
                            d = r("a", "head_link", "heads", "head_link");
                        d.href = "http://tampermonkey.net";
                        d.target = "_blank";
                        var g = h("div", "float margin4", "heads", "head1"),
                            f = h("img", "banner", "heads");
                        f.src = rea.extension.getURL("images/icon128.png");
                        var k = h("div", "float head margin4", "heads", "head2"),
                            m = r("div", "heads"),
                            e = h("div", "version", "version", "version");
                        e.textContent = " by Jan Biniok";
                        var n = r("div", "search", "box", "");
                        m.textContent = "Tampermonkey";
                        g.appendChild(f);
                        k.appendChild(m);
                        k.appendChild(e);
                        d.appendChild(g);
                        d.appendChild(k);
                        a.appendChild(d);
                        a.appendChild(n);
                        b.appendChild(a);
                        b.appendChild(c);
                        var p = ka.create("_main", c);
                        z.push(function() {
                            Ua(p);
                            if (J.selected) {
                                var a = p.getTabById(J.selected);
                                a && a.select()
                            }
                            void 0 !== J.contribute && window.setTimeout(Ha, 100);
                            Z.global = !0
                        })
                    },
                    V = function(a, b, c) {
                        var d = b.item,
                            g = d.uuid + b.id,
                            f = (c ? "orig_" : "use_") + b.id,
                            k = function(a) {
                                return "select_" + t.createUniqueId(a, d.uuid) + "_sel1"
                            },
                            m = h("div", "cludes", a, g, "cb1");
                        if (document.getElementById(k(f))) return {
                            elem: m
                        };
                        var q = r("span", d.name, g, "cb2");
                        if (c) {
                            var n = "merge_" + b.id;
                            a = l.createCheckbox(a, {
                                id: n,
                                uuid: d.uuid,
                                enabled: d.options && d.options.override && d.options.override[n] ? !0 : !1
                            }, function() {
                                if ("checkbox" == this.type) {
                                    var a = {};
                                    a[this.key] = !this.oldvalue;
                                    U(this.uuid, a)
                                }
                            });
                            q.appendChild(a.elem)
                        } else q.textContent = a;
                        a = d.options && d.options.override && d.options.override[f] ? d.options.override[f] : [];
                        var p = h("select", "cludes", f, d.uuid, "sel1");
                        p.setAttribute("size", "6");
                        p.setAttribute("multiple", "true");
                        for (f = 0; f < a.length; f++) n = document.createElement("option"),
                            n.value = n.text = a[f], p.appendChild(n);
                        m.appendChild(q);
                        d.desc && l.setHelp(d.desc, m, q, d);
                        m.appendChild(p);
                        var y = function(a) {
                            var b = [];
                            a = a && a.options;
                            for (var d = 0, c = a.length; d < c; d++) a[d].selected && b.push(a[d]);
                            return b
                        };
                        a = function() {
                            var a = k("use_" + ("excludes" == b.id ? "includes" : "excludes")),
                                d = document.getElementById(a),
                                a = y(p),
                                c = !1,
                                g = "matches" == b.id;
                            a.forEach(function(a) {
                                var b = g ? "/" + na.getRegExpFromMatch(a.value) + "/" : a.value;
                                a && !d.querySelector('option[value="' + b + '"]') && (a = a.cloneNode(!0), g && (a.value = b, a.textContent =
                                    b), d.appendChild(a), c = !0)
                            });
                            c && A()
                        };
                        var n = function() {
                                var a = prompt(e.getMessage("Enter_the_new_rule"));
                                if (a) {
                                    var b = document.createElement("option");
                                    b.value = b.text = a.trim();
                                    p.appendChild(b);
                                    A()
                                }
                            },
                            f = function() {
                                var a = p.options[p.selectedIndex];
                                if (a) {
                                    var b = prompt(e.getMessage("Enter_the_new_rule"), a.value);
                                    b && (a.value = a.text = b.trim(), A())
                                }
                            },
                            q = function() {
                                var a = !1;
                                y(p).forEach(function(b) {
                                    b && (b.parentNode.removeChild(b), a = !0)
                                });
                                a && A()
                            },
                            P = function(a) {
                                for (var b = [], d = 0; d < a.options.length; d++) b.push(a.options[d].value);
                                return b
                            },
                            A = function() {
                                var a = {
                                    includes: P(document.getElementById(k("use_includes"))),
                                    matches: P(document.getElementById(k("use_matches"))),
                                    excludes: P(document.getElementById(k("use_excludes")))
                                };
                                U(d.uuid, a);
                                return !0
                            };
                        c ? (g = r("button", d.name, g, "btn1"), g.textContent = e.getMessage("Add_as_0clude0", c), g.addEventListener("click", a, !1)) : (c = r("button", d.name, g, "btn2"), c.textContent = e.getMessage("Add") + "...", c.addEventListener("click", n, !1), m.appendChild(c), c = r("button", d.name, g, "btn3"), c.textContent = e.getMessage("Edit") +
                            "...", c.addEventListener("click", f, !1), m.appendChild(c), g = r("button", d.name, g, "btn4"), g.textContent = e.getMessage("Remove"), g.addEventListener("click", q, !1));
                        m.appendChild(g);
                        return {
                            elem: m
                        }
                    },
                    ya = function(a) {
                        return a.homepage ? a.homepage : a.namespace && 0 == a.namespace.search(/https?:\/\//) ? a.namespace : null
                    };
                ma.create("sites").setOptions({
                    timeout: 600,
                    check_interval: 300,
                    retimeout_on_get: !0
                }).init();
                var wa = function() {
                        var a = {},
                            b = function(a) {
                                return 7 > a.toString().length ? b("0" + a) : a
                            },
                            c = function(a) {
                                if (a.includes ||
                                    a.matches) {
                                    for (var b = {}, c = [], k = a.includes.length ? a.includes : a.matches, e = 0; e < k.length; e++) {
                                        var q = k[e];
                                        if (q) {
                                            var n = ma.items.sites.get(q),
                                                h = void 0 !== n ? n : l.getInfoFromUrl(q);
                                            void 0 === n && ma.items.sites.set(q, h);
                                            h && h.dom ? b[h.dom] || (b[h.dom] = !0, c.push({
                                                include: q,
                                                info: h
                                            })) : c.push({
                                                include: q
                                            })
                                        } else console.log("o: Warn: script '" + a.name + "' has invalid include (index: " + e + ")")
                                    }
                                    return c
                                }
                            };
                        return {
                            init: function(b) {
                                a = {};
                                b.forEach(function(b) {
                                    (b = c(b)) && b.length && b.forEach(function(b) {
                                        b.info && (a[b.info.dom] = (a[b.info.dom] ||
                                            0) + 1)
                                    })
                                })
                            },
                            get: function(d) {
                                d = c(d);
                                if (!d || !d.length) return b(0);
                                d = t.map(d, function(b) {
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
                            topIcons: function(b, g) {
                                var f = [],
                                    e = c(b);
                                if (!e || !e.length) return [];
                                e = t.map(e, function(b) {
                                    b.score = b.info ? a[b.info.dom] || 0 : 0;
                                    return b
                                }).sort(function(a, b) {
                                    return b.score - a.score
                                });
                                t.each(e, function(a) {
                                    var c = a.info;
                                    if (0 == g--) return a = h("span", "", b.uuid,
                                        "tbc"), a.textContent = "...", f.push(a), !1;
                                    if (c) {
                                        if ("*" == c.tld) return a = l.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", b.uuid, a.include, a.include), f.push(a), !1;
                                        var e = "com",
                                            k = "";
                                        "*" != c.tld && "tld" != c.tld && (e = c.tld);
                                        c.subdom.length && (k = c.subdom.join(".") + ".");
                                        var y = ("chrome://favicon/http://" + k + c.dom + "." + e + "/").replace(/\*/g, ""),
                                            c = ("http://" + k + c.dom + "." + e + "/favicon.ico").replace(/\*/g, ""),
                                            y = [c, y];
                                        if (0 == c.search("http://userscripts.org/") || 0 == c.search("http://userscripts.com/")) y =
                                            N.origin("uso");
                                        a = l.createFavicon(y, "", b.uuid, a.include, a.include)
                                    } else a = l.createFavicon("?", "", b.uuid, a.include, a.include);
                                    f.push(a)
                                });
                                return f
                            }
                        }
                    }(),
                    Q = function() {
                        return localStorage.getItem("sort_key")
                    },
                    T = function() {
                        return localStorage.getItem("sort_sequence")
                    },
                    Ea = function(a) {
                        var b = function(a, c) {
                                return a.tagName == c ? a : a.parentNode ? b(a.parentNode, c) : null
                            },
                            c = null,
                            d = [],
                            g = 0,
                            f = (new Date).getTime(),
                            k;
                        for (k in O) {
                            var m = O[k];
                            if (m) {
                                var h = b(m.dom, "TR");
                                if (h) {
                                    var n = b(h, "TBODY");
                                    c ? n && c != n && console.warn("options: different parents?!?!") :
                                        c = n;
                                    g++;
                                    n = f - parseInt(m.script.lastUpdated);
                                    isNaN(n) && (n = 0);
                                    var p = parseInt(m.script.version);
                                    isNaN(p) && (p = 0);
                                    d.push({
                                        tr: h,
                                        sites: wa.get(m.script),
                                        position: m.script.position ? m.script.position : 1E3 + g,
                                        name: e.getTranslation(m.script, "name").toLowerCase(),
                                        homepage: [m.script.origin ? na.parse(m.script.origin.url).hostname : "z", ya(m.script) ? na.parse(ya(m.script)).hostname : "z"].join("_"),
                                        updated: n,
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
                                d = Q();
                            b = "pos" == d ? b("position") : "ver" == d ? b("version") : "updated" == d ? b("updated") : c(d);
                            a.sort(b);
                            return a
                        }(d);
                        "down" == T() && (d = d.reverse());
                        for (f = 0; f < g; f++) c.appendChild(d[f].tr);
                        $(".sorting").each(function(a, b) {
                            var c = $(b),
                                d = "pos" == Q() && "up" == T();
                            c[d ? "fadeIn" : "fadeOut"]()
                        });
                        a && a()
                    },
                    Za = function(a,
                        b, c, d, g) {
                        var f = h("div", "", b.name, b.uuid, "script_tab_head");
                        c = f.inserted;
                        var k = h("div", "heading", b.uuid, "heading"),
                            m = h("img", "nameNicon64", b.uuid, "heading_icon"),
                            q = b.icon64 ? b.icon64 : b.icon;
                        m.src = q;
                        var n = h("div", "nameNname64", b.uuid, "heading_name");
                        n.textContent = e.getTranslation(b, "name");
                        q && k.appendChild(m);
                        k.appendChild(n);
                        m = h("div", "author", b.uuid, "author");
                        b.author ? m.textContent = "by " + b.author : b.copyright && (m.innerHTML = "&copy; ", m.textContent += b.copyright);
                        var q = h("table", "noborder p100100", b.uuid,
                                "table"),
                            n = h("tr", "script_tab_head", b.uuid, "tr1"),
                            p = h("tr", "details", b.uuid, "tr2"),
                            l = h("td", "", b.uuid, "td1"),
                            r = h("td", "", b.uuid, "td2");
                        k.appendChild(m);
                        f.appendChild(k);
                        l.appendChild(f);
                        n.appendChild(l);
                        p.appendChild(r);
                        q.appendChild(n);
                        q.appendChild(p);
                        d.appendChild(q);
                        d = ka.create("_details" + t.createUniqueId(b.name, b.uuid), r, {
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
                        var A = Wa(b, d, g),
                            s = b.nnew || b.system ? {} : Xa(b, d),
                            v = b.nnew || b.system || !b.requires.length && !b.resources.length ? {} : Ya(b, d);
                        if (c) return R["tab" + b.uuid];
                        var x = function(b) {
                            var c = !1;
                            if ("keydown" == b.type && (27 == b.keyCode && "windows" == w.editor_keyMap && "textarea" !== b.srcElement.tagName.toLowerCase() && (a.isSelected() && window.setTimeout(g, 1), c = !0), c)) return b.stopPropagation(), b.preventDefault(), !1
                        };
                        d = {
                            onShow: function() {
                                t.each([s, A, v], function(a) {
                                    if (a.onShow) a.onShow()
                                });
                                window.addEventListener("keydown", x, !1)
                            },
                            onClose: function(a) {
                                var b;
                                t.each([s, A, v], function(c) {
                                    if (c.onClose && c.onClose(a)) return b = !0, !1
                                });
                                b || window.removeEventListener("keydown", x, !0);
                                return b
                            },
                            afterSelect: function() {
                                t.each([s,
                                    A, v
                                ], function(a) {
                                    a.afterSelect && a.afterSelect()
                                })
                            }
                        };
                        return R["tab" + b.uuid] = d
                    },
                    Xa = function(a, b) {
                        var c = r("div", a.name, a.uuid, "script_setting_h"),
                            d = r("div", a.name, a.uuid, "script_settings_c");
                        c.textContent = e.getMessage("Settings");
                        var g = function() {
                                if ("checkbox" == this.type || "button" == this.type) {
                                    var a = {};
                                    a[this.key] = !this.oldvalue;
                                    U(this.uuid, a)
                                } else if ("text" == this.type || "textarea" == this.type || "select-one" == this.type) {
                                    var b = this.value;
                                    if ("native" === this.valtype)
                                        if ("undefined" === b) b = void 0;
                                        else if ("null" ===
                                        b) b = null;
                                    else try {
                                        b = JSON.parse(b)
                                    } catch (c) {}
                                    a = {};
                                    a[this.key] = b;
                                    U(this.uuid, a)
                                }
                            },
                            f = l.createPosition(e.getMessage("Position_") + ": ", {
                                id: "position",
                                uuid: a.uuid,
                                name: a.name,
                                pos: a.position,
                                posof: a.positionof
                            }, g),
                            k = l.createDropDown(e.getMessage("Run_at"), {
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
                            }], g),
                            m = l.createDropDown(e.getMessage("No_frames"), {
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
                            }], g),
                            q = V(e.getMessage("Original_includes"), {
                                id: "includes",
                                item: a
                            }, e.getMessage("User_excludes")),
                            n = V(e.getMessage("Original_matches"), {
                                id: "matches",
                                item: a
                            }, e.getMessage("User_excludes")),
                            p = V(e.getMessage("Original_excludes"), {
                                id: "excludes",
                                item: a
                            }, e.getMessage("User_includes")),
                            y = h("div", "clear", a.name, a.uuid, "clear"),
                            t = V(e.getMessage("User_includes"), {
                                id: "includes",
                                item: a
                            }),
                            s = V(e.getMessage("User_matches"), {
                                id: "matches",
                                item: a
                            }),
                            v = V(e.getMessage("User_excludes"), {
                                id: "excludes",
                                item: a
                            }),
                            w = l.createCheckbox(e.getMessage("Apply_compatibility_options_to_required_script_too"), {
                                id: "compatopts_for_requires",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compatopts_for_requires
                            }, g),
                            x = l.createCheckbox(e.getMessage("Fix_wrappedJSObject_property_access"), {
                                id: "compat_wrappedjsobject",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compat_wrappedjsobject
                            }, g),
                            u = l.createCheckbox(e.getMessage("Convert_CDATA_sections_into_a_chrome_compatible_format"), {
                                id: "compat_metadata",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compat_metadata
                            }, g),
                            z = l.createCheckbox(e.getMessage("Replace_for_each_statements"), {
                                id: "compat_foreach",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compat_foreach
                            }, g),
                            D = l.createCheckbox(e.getMessage("Fix_for_var_in_statements"), {
                                    id: "compat_forvarin",
                                    uuid: a.uuid,
                                    name: a.name,
                                    enabled: a.compat_forvarin
                                },
                                g),
                            E = l.createCheckbox(e.getMessage("Convert_Array_Assignements"), {
                                id: "compat_arrayleft",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compat_arrayleft
                            }, g),
                            F = l.createCheckbox(e.getMessage("Add_toSource_function_to_Object_Prototype"), {
                                id: "compat_prototypes",
                                uuid: a.uuid,
                                name: a.name,
                                enabled: a.compat_prototypes
                            }, g),
                            w = [w, x, u, z, D, E, F],
                            x = h("div", "section", a.name, a.uuid, "ta_opt"),
                            z = h("div", "section_head", a.name, a.uuid, "head_ta_opt"),
                            u = h("div", "section_content", a.name, a.uuid, "content_ta_opt");
                        z.textContent = e.getMessage("Settings");
                        x.appendChild(z);
                        x.appendChild(u);
                        z = h("div", "section", a.name, a.uuid, "ta_cludes");
                        D = h("div", "section_head", a.name, a.uuid, "head_ta_cludes");
                        F = h("div", "section_content", a.name, a.uuid, "content_ta_cludes");
                        D.textContent = e.getMessage("Includes_Excludes");
                        z.appendChild(D);
                        z.appendChild(F);
                        var D = h("div", "section", a.name, a.uuid, "ta_compat"),
                            C = h("div", "section_head", a.name, a.uuid, "head_ta_compat"),
                            E = h("div", "section_content", a.name, a.uuid, "content_ta_compat");
                        C.textContent = e.getMessage("GM_compat_options_");
                        D.appendChild(C);
                        D.appendChild(E);
                        u.appendChild(f);
                        a.user_agent || u.appendChild(k.elem);
                        u.appendChild(m.elem);
                        F.appendChild(q.elem);
                        F.appendChild(n.elem);
                        F.appendChild(p.elem);
                        F.appendChild(y);
                        F.appendChild(t.elem);
                        F.appendChild(s.elem);
                        F.appendChild(v.elem);
                        f = r("div", a.name, a.uuid, "tab_content_settings");
                        f.appendChild(x);
                        f.appendChild(z);
                        if (!a.user_agent) {
                            for (k = 0; k < w.length; k++) E.appendChild(w[k].elem);
                            if (a.awareOfChrome)
                                for (var ca in w) w[ca].input.setAttribute("disabled", "disabled"), w[ca].elem.setAttribute("title",
                                    e.getMessage("This_script_runs_in_Chrome_mode"));
                            f.appendChild(D)
                        }
                        var ua = l.createTextarea(null, {
                            name: a.name,
                            uuid: a.uuid,
                            id: "comment",
                            value: a.options.comment
                        });
                        ua.elem.setAttribute("class", "script_setting_wrapper");
                        ca = r("div", a.name, a.uuid, "save");
                        k = l.createButton(a.name, a.uuid, e.getMessage("Save"), function() {
                            g.apply(ua.textarea, [])
                        });
                        ca.appendChild(k);
                        k = h("div", "section", a.name, a.uuid, "ta_comment");
                        m = h("div", "section_head", a.name, a.uuid, "head_ta_comment");
                        q = h("div", "section_content", a.name, a.uuid,
                            "content_ta_comment");
                        m.textContent = e.getMessage("Comment");
                        k.appendChild(m);
                        k.appendChild(q);
                        q.appendChild(ua.elem);
                        q.appendChild(ca);
                        f.appendChild(k);
                        d.appendChild(f);
                        b.appendTab("script_settings_tab" + a.uuid, c, d);
                        return {}
                    },
                    Ia = function(a, b) {
                        var c = h("table", "script_desc", a.name, a.uuid, "outer_req2html"),
                            d = 0,
                            g = [{
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
                            var k = d + b;
                            g.forEach(function(b) {
                                var d = h("tr", "external_desc", a.uuid, b.prop, "tr" + k),
                                    g = h("td", "external_desc", a.uuid, b.prop, "td1" + k),
                                    e = h("td", "", a.uuid, b.prop, "td2" + k);
                                g.textContent = b.label;
                                e.textContent = (b.fn ? b.fn : function(a) {
                                    return a
                                })(f[b.prop]);
                                d.appendChild(g);
                                d.appendChild(e);
                                c.appendChild(d)
                            });
                            var n = h("tr", "external_desc_buttons", a.uuid, f.url, "tr" + k),
                                p = h("td", "", a.uuid,
                                    "buttons", "td" + k);
                            n.appendChild(p);
                            c.appendChild(n);
                            if (f.ts) {
                                var n = r("div", a.name, a.uuid, "delete_external" + k),
                                    y = l.createButton(a.uuid, "delete_external" + t.createUniqueId(f.url) + k, e.getMessage("Delete"), function() {
                                        $a(a.uuid, f.url);
                                        y.parentNode && y.parentNode.removeChild(y)
                                    });
                                n.appendChild(y);
                                p.appendChild(n)
                            }
                            d++
                        });
                        if (!d) {
                            var f = h("tr", "script_desc", a.uuid, d, "tr"),
                                k = h("td", "script_desc", a.uuid, d, "td1");
                            k.textContent = e.getMessage("No_entry_found");
                            f.appendChild(k);
                            c.appendChild(f)
                        }
                        return c
                    },
                    Ya = function(a,
                        b) {
                        var c = r("div", "", a.uuid, "script_external_h");
                        c.textContent = e.getMessage("Externals");
                        var d = r("div", "", a.uuid, "script_externals_c"),
                            g = h("div", "section", a.name, a.uuid, "ta_requires"),
                            f = h("div", "section_head", a.name, a.uuid, "head_ta_requires"),
                            k = h("div", "section_content", a.name, a.uuid, "content_ta_requires");
                        f.textContent = e.getMessage("Requires");
                        g.appendChild(f);
                        g.appendChild(k);
                        k.appendChild(Ia(a, "requires"));
                        var f = h("div", "section", a.name, a.uuid, "ta_resources"),
                            k = h("div", "section_head", a.name, a.uuid,
                                "head_ta_resources"),
                            m = h("div", "section_content", a.name, a.uuid, "content_ta_resources");
                        k.textContent = e.getMessage("Resources");
                        f.appendChild(k);
                        f.appendChild(m);
                        m.appendChild(Ia(a, "resources"));
                        k = r("div", "", a.uuid, "tab_content_settings");
                        k.appendChild(g);
                        k.appendChild(f);
                        d.appendChild(k);
                        b.appendTab("script_externals_tab" + a.uuid, c, d);
                        return {}
                    },
                    Wa = function(a, b, c) {
                        var d = h("tr", "editor_container p100100", a.name, a.uuid, "container");
                        if (!a.nnew && C(a.uuid, "lastI")) return [];
                        a.nnew && (a.code = a.code.replace('<$host$>',J.url.match(/\/\/(.+)\//)[1]).replace("<$URL$>",
                                J.url.match(/.+\//)[0]+'*'||"http://*/*"));
                        var g=r("div",a.name,a.uuid,"script_editor_h"),f=g.inserted;g.textContent=e.getMessage("Editor");var k=r("div",a.name,a.uuid,"script_editor_c"),m=h("tr","editormenubar",a.name,a.uuid,"container_menu"),q=h("table","editor_container_o p100100 noborder",a.name,a.uuid,"container_o");q.appendChild(m);q.appendChild(d);k.appendChild(q);var n=function(b){C(a.uuid,"saveEm")},p=function(a,b,d){c&&c(b,d)},q=l.createImageButton(a.uuid,"save_to_disk",e.getMessage("Save_to_disk"),rea.extension.getURL("/layout/default/images/harddrive2.png"),
                                    function(b) {
                                        b = d.editor && w.editor_enabled ? d.editor.mirror.getValue() : u.value;
                                        s.wait();
                                        M.plain.download(a.name, b).always(function() {
                                            s.hide()
                                        })
                                    }), y = l.createImageButton(a.uuid, "save", e.getMessage("Save"), rea.extension.getURL("/layout/default/images/filesave.png"), n), P = l.createImageButton(a.uuid, "cancel", e.getMessage("Editor_reset"), rea.extension.getURL("/layout/default/images/editor_cancel.png"), function() {
                                    confirm(e.getMessage("Really_reset_all_changes_")) && (d.editor && w.editor_enabled ? d.editor.mirror.setValue(a.code) :
                                        u.textContent = a.code)
                                }), A = l.createImageButton(a.uuid, "reset", e.getMessage("Full_reset"), rea.extension.getURL("/layout/default/images/script_cancel.png"), function() {
                                    za(a.uuid, null, {
                                        old_url: x.input ? x.input.oldvalue : "",
                                        new_url: x.input ? x.input.value : "",
                                        clean: !0,
                                        reload: !0
                                    }).done(function(a) {
                                        a.cleaned && p(null, !0, !1)
                                    });
                                    v[a.uuid].fullReset()
                                }), H = l.createImageButton(a.uuid, "close_script", e.getMessage("Close"), rea.extension.getURL("/layout/default/images/exit.png"), p), z = l.createImageButton(a.uuid, "lint_script",
                                    e.getMessage("Run_syntax_check"), rea.extension.getURL("/layout/default/images/check.png"),
                                    function() {
                                        window.setTimeout(function() {
                                            d.editor && w.editor_enabled && (s.wait(), window.setTimeout(function() {
                                                Aa.run(d.editor).always(s.hide)
                                            }, 1))
                                        }, 1)
                                    }), x = l.createInput(e.getMessage("Update_URL_"), {
                                    id: "file_url",
                                    uuid: a.uuid,
                                    name: a.name,
                                    value: a.file_url
                                }); x.input.setAttribute("class", "updateurl_input"); x.elem.setAttribute("class", "updateurl");
                                var u = h("textarea", "editorta", a.name, a.uuid); u.setAttribute("wrap", "off");
                                var B = h("td", "editor_outer", a.name, a.uuid, "edit"), D = h("div", "editor_100 editor_border", a.name, a.uuid, "edit"), E = h("div", "editormenu", a.name, a.uuid, "editormenu"); B.appendChild(D); m.appendChild(E); m.appendChild(x.elem); d.inserted || (D.appendChild(u), d.appendChild(B)); a.system || (v[a.uuid].saveEm = function() {
                                        var b = !0;
                                        w.showFixedSrc && !a.user_agent && (b = confirm(e.getMessage("Do_you_really_want_to_store_fixed_code_", e.getMessage("Show_fixed_source"))));
                                        var c = d.editor && w.editor_enabled ? d.editor.mirror.getValue() :
                                            u.value;
                                        b && za(a.uuid, c, {
                                            old_url: x.input ? x.input.oldvalue : "",
                                            new_url: x.input ? x.input.value : "",
                                            clean: !1,
                                            new_script: a.nnew,
                                            reload: !0,
                                            lastModified: v[a.uuid].saveEm_lastModified
                                        }).done(function(b) {
                                            b.installed ? a.nnew || b.renamed ? p(null, !0, !1) : (d.editor.changed = !1, b.lastModified && (a.lastModified = b.lastModified)) : b.aborted || (b.messages && b.messages.errors && b.messages.errors.length ? t.alert(b.messages.errors.join("\n")) : t.alert(e.getMessage("Unable_to_parse_this_")))
                                        });
                                        return b
                                    }, E.appendChild(q), E.appendChild(y),
                                    E.appendChild(P)); a.nnew || E.appendChild(A); E.appendChild(H); !a.system && w.editor_enabled && E.appendChild(z); b.appendTab("script_editor_tab" + a.uuid, g, k).select();
                                if (f) return R["editor" + a.uuid];
                                var F = function() {
                                    var b = !1;
                                    w.editor_enabled ? d.editor && (b |= d.editor.changed && d.editor.mirror.historySize().undo) : b = u.value != a.code;
                                    return b
                                }, I = function() {
                                    w.editor_autoSave && F() && C(a.uuid, "saveEm")
                                }; b = {
                                    afterSelect: function() {
                                        d.editor && d.editor.refresh()
                                    },
                                    onShow: function() {
                                        (function() {
                                            if (a.referrer && void 0 === a.code) {
                                                var b =
                                                    G();
                                                ga({
                                                    referrer: a.referrer,
                                                    uuid: a.uuid
                                                }, function(c) {
                                                    c.items ? (a.code = c.items[0], b.resolve()) : b.reject();
                                                    s.hide()
                                                });
                                                return b.promise()
                                            }
                                            return G.Pledge()
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
                                                    var f = b.parentNode,
                                                        g = {
                                                            search: e.getMessage("Search"),
                                                            replace: e.getMessage("Replace"),
                                                            jump: e.getMessage("Jump_to_line"),
                                                            macro: e.getMessage("Insert_constructor"),
                                                            reindentall: e.getMessage("Auto_Indent_all")
                                                        };
                                                    f.removeChild(b);
                                                    d.editor = new MirrorFrame(f, {
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
                                                        save: n,
                                                        close: p
                                                    }, {
                                                        change: c,
                                                        blur: I
                                                    }, g)
                                                } else b.value = a.code
                                            }
                                        }).fail(function() {
                                            p(null, !1, !0)
                                        })
                                    },
                                    onClose: function(b) {
                                        var c = function() {
                                            d.editor = null;
                                            delete v[a.uuid].lastI
                                        };
                                        if (!b && F()) return (b = confirm(e.getMessage("There_are_unsaved_changed_"))) && c(), !b;
                                        c();
                                        return !1
                                    }
                                };
                                return R["editor" + a.uuid] = b
                            }, Pa = function(a, b, c) {
                                v[a.uuid] || (v[a.uuid] = {});
                                var d, g, f = a.icon && !a.nativeScript,
                                    k = ["script_name"];
                                a.nativeScript || k.push("clickable");
                                a.blacklisted && k.push("crossedout");
                                var m = h("span", k.join(" "), "", a.uuid, "sname"),
                                    q = h("img", "nameNicon16 icon16",
                                        "", a.uuid, "sname_img"),
                                    n = h("span", f ? "nameNname16" : "", "", a.uuid, "sname_name"),
                                    p = ya(a),
                                    k = e.getTranslation(a, "name");
                                n.textContent = 35 < k.length ? k.substr(0, 35) + "..." : k;
                                k = r("span", "", a.uuid, "sversion");
                                k.textContent = a.version ? a.version : "";
                                f && (q.src = a.icon, m.appendChild(q));
                                var f = [],
                                    y = function() {
                                        d && (d.remove(), d = null);
                                        delete R["tab" + a.uuid];
                                        delete R["editor" + a.uuid]
                                    },
                                    s = function() {
                                        window.setTimeout(function() {
                                            for (var d in O) {
                                                var f = O[d].script;
                                                if (f.uuid == a.uuid) {
                                                    ha(b, [f], null, c);
                                                    break
                                                }
                                            }
                                            sa()
                                        }, 1)
                                    },
                                    A = function(b,
                                        c) {
                                        void 0 === c && (c = !b);
                                        a.uuid && t.getUrlArgs(!0).open == a.uuid && (window.location.hash = "");
                                        g && g.onClose && g.onClose(b) || (y(), m.parentNode && m.parentNode.removeChild(m), c && s())
                                    },
                                    H = function() {
                                        g && g.afterSelect && g.afterSelect()
                                    },
                                    B = function(f, k) {
                                        if (!d) {
                                            var m = null;
                                            a.nnew ? (m = h("div", "head_icon", "", a.uuid, "details_h"), m.appendChild(l.createImage(a.imageURL, "", a.uuid, "new_script_head"))) : m = h("div", "", "", a.uuid, "details_h");
                                            var q = r("div", "", a.uuid, "details_c");
                                            d = c.insertTab(null, "details_" + a.uuid, m, q, H, a.nnew ? null :
                                                A);
                                            a.nnew || d.setHeading(e.getMessage("Edit") + " - " + (25 < a.name.length ? a.name.substr(0, 25) + "..." : a.name));
                                            g = Za(d, a, b, q, A)
                                        }
                                        if (g && g.onShow) g.onShow();
                                        d.show();
                                        f && 1 == f.button || k || d.select();
                                        n.setAttribute("open", "true");
                                        !a.nnew && a.uuid && (window.location.hash = "open=" + a.uuid)
                                    };
                                "true" == n.getAttribute("open") && B(null, !0);
                                var q = function(a, b) {
                                        var c = a.getTime(),
                                            d = b.getTime(),
                                            f = Math.abs(c - d),
                                            c = Math.round(f / 6E4),
                                            d = Math.round(f / 36E5),
                                            f = Math.round(f / 864E5);
                                        return 60 >= c ? c + " min" : 48 >= d ? d + " h" : f + " d"
                                    },
                                    x = r("span", "",
                                        a.uuid, "last_updated"),
                                    u = "";
                                if (a.nativeScript || a.nnew || a.system) u = "";
                                else if (n.inserted || (x.addEventListener("click", function() {
                                        C(a.uuid, "scriptUpdate")
                                    }), x.setAttribute("class", "clickable"), x.title = e.getMessage("Check_for_Updates")), v[a.uuid].scriptUpdate = function() {
                                        var b = x.textContent;
                                        x.textContent = "";
                                        x.appendChild(l.createImage(rea.extension.getURL("/layout/default/images/download.gif"), "down", a.uuid));
                                        ab(a.uuid, function(c) {
                                            x.textContent = b;
                                            c ? (x.style.color = "green", x.title = e.getMessage("There_is_an_update_for_0name0_avaiable_",
                                                a.name), y(), m.parentNode && m.parentNode.removeChild(m), Ja()) : (x.style.color = "red", x.title = e.getMessage("No_update_found__sry_"))
                                        })
                                    }, a.lastUpdated) try {
                                    u = q(new Date, new Date(a.lastUpdated))
                                } catch (I) {
                                    console.log("o: error calculating time " + I.message)
                                } else u = "?";
                                x.textContent = u;
                                var D = r("div", "", a.uuid, "imported"),
                                    E = "";
                                z.push(function() {
                                    w.sync_enabled && (E = a.nativeScript || a.nnew || a.system ? "" : a.sync && a.sync.imported ? !0 === a.sync.imported || a.sync.imported == la.types.ePASTEBIN ? '<img src="https://pastebin.com/favicon.ico" class="icon16" title="pastebin.com"/>' :
                                        a.sync.imported == la.types.eCHROMESYNC ? '<img src="https://www.google.com/images/icons/product/chrome-16.png" class="icon16" title="Google Sync"/>' : a.sync.imported == la.types.eGOOGLE_DRIVE ? '<img src="https://www.google.com/images/icons/product/drive-16.png" class="icon16" title="Google Drive"/>' : '<img src="' + rea.extension.getURL("/layout/default/images/update.png") + '" class="icon16" />' : "", D.innerHTML = E, D = null)
                                });
                                q = r("span", "", a.uuid, "hp");
                                if (a.origin) {
                                    u = r("a", "", a.uuid, "hp");
                                    u.setAttribute("href", a.origin.url);
                                    u.setAttribute("target", "_blank");
                                    var F = l.createImage(N.origin(a.origin.token), "", a.uuid, a.origin.token, "");
                                    u.appendChild(F);
                                    q.appendChild(u)
                                }
                                p && (u = r("a", "", a.uuid, "hp"), u.setAttribute("href", p), u.setAttribute("target", "_blank"), p = l.createImage(rea.extension.getURL("/layout/default/images/home.png"), "", a.uuid, "hp", ""), u.appendChild(p), q.appendChild(u));
                                v[a.uuid].saveEm_lastModified = a.lastModified;
                                v[a.uuid].fullReset = function() {
                                    b.parentNode.removeChild(b)
                                };
                                v[a.uuid].reportAnIssue = function(b) {
                                    bb(a.uuid,
                                        b)
                                };
                                v[a.uuid].deleteScript = function(c, d) {
                                    if (a.nativeScript) {
                                        var f = d || confirm(e.getMessage("Really_delete_0name0__", a.name));
                                        !0 == f && (Ba(a.uuid, "installed", "false"), b.parentNode.removeChild(b))
                                    } else f = d || confirm(e.getMessage("Really_delete_0name0__", a.name)), !0 == f && (za(a.uuid, null, {
                                        reload: !d
                                    }), b.parentNode.removeChild(b))
                                };
                                p = [];
                                if (a.nativeScript) {
                                    v[a.uuid].importNativeScript = function(c, d) {
                                        !0 == (d || confirm(e.getMessage("Really_import_0name0__", a.name))) && (Ba(a.uuid, "imported", "true"), b.parentNode.removeChild(b))
                                    };
                                    var G = l.createImage(N.get("import"), "", a.uuid, "import", e.getMessage("Import"), function() {
                                        C(a.uuid, "importNativeScript")
                                    });
                                    l.addClass(G, "hidden");
                                    p.push(G);
                                    z.push(function() {
                                        w.native_import && l.toggleClass(G, "hidden")
                                    })
                                }
                                a.nnew || a.system || (u = l.createImage(N.get("delete"), "", a.uuid, "delete", e.getMessage("Delete"), function() {
                                    C(a.uuid, "deleteScript")
                                }), p.push(u));
                                a.nnew || a.system || !a.origin || (u = l.createImage(N.get("flag"), "", a.uuid, "issue", e.getMessage("Report_an_issue_to_the_script_hoster_"), function() {
                                    C(a.uuid,
                                        "reportAnIssue", "hoster")
                                }), p.push(u));
                                a.nnew || a.system || !a.supportURL || (u = l.createImage(N.get("bug"), "", a.uuid, "bug", e.getMessage("Report_a_bug"), function() {
                                    C(a.uuid, "reportAnIssue", "author")
                                }), p.push(u));
                                m.inserted || a.nativeScript || m.addEventListener("click", B);
                                m.appendChild(n);
                                u = [a.name];
                                a.description && u.push(e.getTranslation(a, "description"));
                                a.blacklisted && (u = [e.getMessage("This_script_is_blacklisted_")]);
                                m.title = u.join("\n\n").replace(/\"/, "");
                                f.push(a.nnew || a.system ? null : {
                                    element: cb(a),
                                    style: "script_sel"
                                });
                                f.push(function() {
                                    var b = null,
                                        b = a.blacklisted ? "enabler_warning" : a.enabled ? a.contexter ? "enabler_later" : "enabler_enabled" : "enabler_disabled",
                                        c = a.blacklisted ? e.getMessage("This_script_is_blacklisted_") : a.enabled ? e.getMessage("Enabled") : e.getMessage("Disabled"),
                                        d = a.position,
                                        b = l.createEnabler(b, a.uuid, "enabled", "enabled", c, function() {
                                            C(a.uuid, a.nativeScript ? "switchNativeEnabled" : "switchEnabled")
                                        }, a.nativeScript ? "" : d);
                                    v[a.uuid].switchEnabled = function(b, c, d) {
                                        void 0 === c && (c = !a.enabled);
                                        U(a.uuid, {
                                                enabled: c
                                            },
                                            d)
                                    };
                                    v[a.uuid].switchNativeEnabled = function(b, c, d) {
                                        void 0 === c && (c = !a.enabled);
                                        Ba(a.uuid, "enabled", c, d)
                                    };
                                    return b
                                }());
                                f.push(m);
                                f.push(k);
                                f.push(db(a));
                                f.push(D);
                                f.push(eb(a));
                                f.push(fb(a));
                                f.push(q);
                                f.push(x);
                                f.push(gb(a));
                                f.push(function(a, b) {
                                    var c = r("span", "", a.uuid, "wrap");
                                    b && ("Array" === t.toType(b) ? t.each(b, function(a, b) {
                                        c.appendChild(a)
                                    }) : c.appendChild(b));
                                    return c
                                }(a, p));
                                for (k = f.length; 10 > k; k++) f.push(null);
                                !Z.scripts && J.open && a.uuid === J.open ? z.push(B) : a.nnew && z.push(function() {
                                    B(null, !0)
                                });
                                return f
                            },
                            db = function(a) {
                                var b = r("span", "", a.uuid, "pos_type", !0);
                                if (a.nnew) return b;
                                a.user_agent ? (a = l.createImage("images/user_agent.png", "", a.uuid, "user_agent", e.getMessage("This_only_changes_the_user_agent_string")), b.appendChild(a)) : a.nativeScript ? (a = l.createImage(a.icon, "", a.uuid, "chrome_ext", e.getMessage("This_is_a_chrome_extension")), b.appendChild(a)) : a.userscript && (a = l.createImage("images/txt.png", "", a.uuid, "user_agent", e.getMessage("This_is_a_userscript")), b.appendChild(a));
                                return b
                            }, fb = function(a) {
                                var b =
                                    r("span", "", a.uuid, "pos_features", !0);
                                if (a.nnew) return b;
                                if (a.system) {
                                    var c = l.createImage(rea.extension.getURL("/layout/default/images/lock.png"), "", a.uuid, "lock", e.getMessage("This_is_a_system_script"));
                                    b.appendChild(c)
                                }
                                if (a.awareOfChrome || a.nativeScript) c = l.createImage("https://www.google.com/images/icons/product/chrome-16.png", "", a.uuid, "chrome_mode", e.getMessage("This_script_runs_in_Chrome_mode")), b.appendChild(c);
                                if (a.nativeScript) return b;
                                a.requires.length && (c = l.createImage(rea.extension.getURL("/layout/default/images/script_download.png"),
                                    "", a.uuid, "requires", t.map(t.select(a.requires, function(a) {
                                        return a && a.url
                                    }), function(a) {
                                        return a.url
                                    }).join("\n")), b.appendChild(c));
                                a.resources.length && (c = l.createImage(rea.extension.getURL("/layout/default/images/resources.png"), "", a.uuid, "resources", t.map(t.select(a.resources, function(a) {
                                    return a && a.url
                                }), function(a) {
                                    return a.url
                                }).join("\n")), b.appendChild(c));
                                var c = !1,
                                    d = {
                                        includes: !0,
                                        matches: !0
                                    },
                                    g;
                                for (g in d)
                                    if (a[g]) {
                                        for (d = 0; d < a[g].length; d++)
                                            if (a[g][d] && (-1 != a[g][d].search("https") || -1 != a[g][d].search(/^\*:\/\//))) {
                                                c =
                                                    l.createImage(rea.extension.getURL("/layout/default/images/halfencrypted.png"), "", a.uuid, "encrypt", e.getMessage("This_script_has_access_to_https_pages"));
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
                                    f.GM_xmlhttpRequest && (c = l.createImage(rea.extension.getURL("/layout/default/images/web.png"), "", a.uuid, "web", e.getMessage("This_script_has_full_web_access")), b.appendChild(c));
                                    f.GM_setValue && (c = l.createImage(rea.extension.getURL("/layout/default/images/db.png"),
                                        "", a.uuid, "db", e.getMessage("This_script_stores_data")), b.appendChild(c));
                                    f.unsafeWindow && (c = l.createImage(rea.extension.getURL("/layout/default/images/windowlist.png"), "", a.uuid, "unsafeWindow", e.getMessage("This_script_has_access_to_webpage_scripts")), b.appendChild(c))
                                } else c = l.createImage(rea.extension.getURL("/layout/default/images/critical.png"), "grant", a.uuid, "crit", e.getMessage("This_script_has_no_grant_header_set_")), b.appendChild(c);
                                for (g in a.options)
                                    if (-1 != g.search("compat_") && a.options[g]) {
                                        c =
                                            l.createImage(rea.extension.getURL("/layout/default/images/critical.png"), "compat", a.uuid, "crit", e.getMessage("One_or_more_compatibility_options_are_set"));
                                        b.appendChild(c);
                                        break
                                    }
                                return b
                            }, Ga = function(a) {
                                var b = "global_hint_" + (a.class ? a.class : "warning"),
                                    c = (new Date).getTime(),
                                    d = h("span", ["global_hint", b].join(" "), "globalhint", c),
                                    b = r("span", "globalhint_c", c),
                                    g = r("span", "globalhint_t", c);
                                a.title && (g.title = a.title);
                                a.image && b.appendChild(l.createImage(N.get(a.image), "globalhint", "icon" + c));
                                g.textContent =
                                    a.text;
                                a.onclick && !g.inserted && g.addEventListener("click", a.onclick);
                                b.appendChild(g);
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
                            }, Ka = !1, Ha = function() {
                                if (!Ka) {
                                    var a = e.getLocale(),
                                        b = $("<div>").hide(),
                                        c = function(a) {
                                            a ? (b.html(""), b.append($('<div class="contrib_iframe" style="font-size: 2.5em;"></div>').append($('<div style="padding-top: 150px;">').text(a))),
                                                window.setTimeout(c, 1E3)) : (b.fadeOut(1E3), window.setTimeout(s.hideDialog, 1E3))
                                        },
                                        a = $('<iframe src="https://tampermonkey.net/contrib.php?embedded=true' + (a ? "&locale=" + a : "") + '" class="contrib_iframe"></iframe>'),
                                        d = [$('<button class="contrib_button">').html(e.getMessage("I_contributed_already")).click(function() {
                                                W("contributed", {});
                                                c(e.getMessage("Thank_you_very_much_"))
                                            }), $('<button class="contrib_button">').html(e.getMessage("Remember_me_later")).click(function() {
                                                W("later", {});
                                                c(e.getMessage("Ok"))
                                            }),
                                            $('<button class="contrib_button">').html(e.getMessage("I_dont_want_to_contribute")).click(function() {
                                                W("hide", {});
                                                c(e.getMessage("Ok"))
                                            })
                                        ];
                                    d.forEach(function(a, b) {
                                        a.prop("disabled", !0)
                                    });
                                    b.append(a, d);
                                    a.bind("load", function() {
                                        d.forEach(function(a, b) {
                                            a.prop("disabled", !1)
                                        })
                                    });
                                    var g = function() {
                                        var a = s.dialog(b[0]);
                                        !0 === a ? (b.fadeIn(1E3), W("dialog", {})) : void 0 === a && window.setTimeout(g, 500);
                                        Ka = !0
                                    };
                                    g();
                                    window.addEventListener("message", function(a) {
                                        var d = a.data.clicked || a.data.type,
                                            g = a.data.amount,
                                            h = a.data.currency;
                                        d && (a.data.success ? "stripe" == d && (a = $(".contrib_iframe"), d = a.data("oheight"), !d || 0 > d || 1E3 < d || a.animate({
                                            height: d
                                        }, 1E3)) : (W("clicked", d, {
                                            amount: g || "?",
                                            currency: h || "?"
                                        }), $(".contrib_button").remove(), b.append($('<button class="contrib_button">').html(e.getMessage("Ok")).click(function() {
                                            W("contributed", {});
                                            c()
                                        })), "stripe" == d && (a = $(".contrib_iframe"), a.data("oheight", a.height()), a.animate({
                                            height: 740
                                        }, 1E3))))
                                    }, !1)
                                }
                            }, hb = function() {
                                var a = null,
                                    b = null,
                                    c = null,
                                    d = 0,
                                    g = 0,
                                    f = function(b) {
                                        var d = c.x + b.pageX;
                                        a.style.top =
                                            c.y + b.pageY + "px";
                                        a.style.left = d + "px"
                                    },
                                    e = function(c) {
                                        if (a) {
                                            var e = null;
                                            for (f(c); e != g;) {
                                                var e = g,
                                                    k = b.previousSibling,
                                                    h = b.nextSibling,
                                                    q = b.parentNode,
                                                    l = m(b);
                                                c.pageY > l.y + d && h ? (q.removeChild(h), q.insertBefore(h, b), g++) : c.pageY < l.y && 1 < g && (q.removeChild(k), h ? q.insertBefore(k, h) : q.appendChild(k), g--)
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
                                            document.addEventListener("mousemove", e);
                                            document.addEventListener("scroll",
                                                e)
                                        },
                                        stop: function() {
                                            document.removeEventListener("mousemove", e);
                                            document.removeEventListener("scroll", e)
                                        },
                                        handleEvent: function(e, k) {
                                            if (a) {
                                                a.style.position = "static";
                                                var l = {};
                                                l[a.key] = g;
                                                U(a.uuid, l);
                                                a = b = c = null;
                                                h.stop()
                                            } else h.start(), a = this, b = a.parentNode.parentNode.parentNode, d = b.offsetHeight, c = m(b.parentNode.parentNode), c.x = -c.x - a.offsetWidth / 2, c.y = -c.y - a.offsetHeight / 2, a.style.position = "absolute", f(e), g = k
                                        }
                                    };
                                return h
                            }(), gb = function(a) {
                                var b = h("span", "sorting", "", a.uuid, "pos_images", !0);
                                if (a.nnew ||
                                    a.nativeScript) return b;
                                "pos" == Q() && "up" == T() || b.setAttribute("style", "display: none;");
                                if (1 < a.position || a.position < a.positionof) {
                                    var c = h("span", "clickable movable", "position", a.uuid, !0);
                                    c.innerHTML = "&#9776;";
                                    c.title = e.getMessage("Click_here_to_move_this_script");
                                    c.uuid = a.uuid;
                                    c.key = "position";
                                    c.addEventListener("click", function(b) {
                                        hb.handleEvent.apply(this, [b, a.position])
                                    });
                                    b.appendChild(c)
                                }
                                return b
                            }, eb = function(a) {
                                var b = r("span", "", a.uuid, "site_images"),
                                    c = null;
                                b.inserted && (c = b, c.setAttribute("id",
                                    c.id + "foo"), b = r("span", "", a.uuid, "site_images"));
                                wa.topIcons(a, 7).forEach(function(a) {
                                    b.appendChild(a, !0)
                                });
                                c && c.parentNode.removeChild(c);
                                return b
                            }, cb = function(a) {
                                var b = r("input", "", a.uuid, "sel");
                                b.type = "checkbox";
                                b.s_id = a.uuid;
                                b.name = "scriptselectors";
                                b.s_type = a.nativeScript ? "n" : "s";
                                b.inserted || b.addEventListener("click", function() {
                                    v.multiselect.single_click()
                                });
                                return b
                            }, Ma = function(a) {
                                var b = h("input", "multiselectcb", "sms", "all", null),
                                    c = h("input", "multiselectcb", "sms2", "all", null);
                                b.inserted ||
                                    (b.type = "checkbox", b.addEventListener("click", v.multiselect.un_selectAll), c.type = "checkbox", c.addEventListener("click", v.multiselect.un_selectAll));
                                var d = 0,
                                    g = [{
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
                                (fa.RUNTIME.CAN_SAVEAS_ZIP || "undefined" !== typeof Blob) && g.push({
                                    name: e.getMessage("Export"),
                                    value: 3
                                });
                                g = g.concat([{
                                    name: e.getMessage("Trigger_Update"),
                                    value: 5
                                }, {
                                    name: e.getMessage("Remove"),
                                    value: 6
                                }]);
                                g = l.createDropDown(e.getMessage("Apply_this_action_to_the_selected_scripts"), {
                                    value: 0,
                                    uuid: "sms-select",
                                    name: "select"
                                }, g, function() {
                                    0 == this.value ? f.setAttribute("disabled", "true") : f.removeAttribute("disabled");
                                    d = this.value
                                });
                                g.elem.setAttribute("class", "float");
                                g.elem.setAttribute("style", "display: inline-block;");
                                var f = l.createButton("MultiSelectButton", "button", e.getMessage("Start"), function() {
                                    if (0 == d) console.log("option: ?!?!");
                                    else if (6 != d || confirm(e.getMessage("Really_delete_the_selected_items_"))) {
                                        for (var a =
                                                document.getElementsByName("scriptselectors"), b = [], c = 0; c < a.length; c++) b.push(a[c]);
                                        for (var a = {}, g, f = !1, h = 100, c = 0; c < b.length; c++)
                                            if (b[c].checked)
                                                if (1 == d || 2 == d || 7 == d) {
                                                    g = "n" == b[c].s_type ? "switchNativeEnabled" : "switchEnabled";
                                                    var l;
                                                    if (7 == d) {
                                                        var r = O[b[c].s_id] ? O[b[c].s_id].script : null;
                                                        r && (l = !r.enabled)
                                                    } else l = 1 == d;
                                                    void 0 !== l && (C(b[c].s_id, g, null, l, !1), f = !0)
                                                } else 3 == d ? a[b[c].s_id] = !0 : 5 == d ? (g = "scriptUpdate", C(b[c].s_id, g)) : 6 == d && (g = "deleteScript", C(b[c].s_id, g, null, !0), f = !0, h = 1500);
                                        3 == d && (s.wait(), ia(a, {
                                            storage: S
                                        }).then(function(a) {
                                            s.wait();
                                            return fa.RUNTIME.CAN_SAVEAS_ZIP ? M.zip.download(a.scripts).progress(function(a) {
                                                s.wait(Math.floor(a.item / a.of * 100) + "%")
                                            }) : M.json.download(a.scripts)
                                        }).always(function() {
                                            s.hide()
                                        }));
                                        f && (s.wait(e.getMessage("Please_wait___")), window.setTimeout(function() {
                                            Ja()
                                        }, h))
                                    }
                                });
                                f.setAttribute("class", "action_button");
                                f.setAttribute("disabled", "true");
                                a = r("div", a.name, a.id, "actions");
                                a.setAttribute("style", "display: inline-block;");
                                a.appendChild(g.elem);
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
                                    for (var b = 0, c = document.getElementsByName("scriptselectors"), d = !0, g = !1, e = !1, k = !0, h = !1, l = !1, n = 0, p = 0; p < c.length; p++) "n" == c[p].s_type ? (e = !0, d = d && c[p].checked, g = g || c[p].checked) : "s" == c[p].s_type && (l = !0, k = k && c[p].checked, h = h || c[p].checked), c[p].checked && n++;
                                    !e || !d || l && !k && h || (b += 1);
                                    !l || !k || e &&
                                        !d && g || (b += 2);
                                    b != a && (a = b, $(".multiselectcb").prop("checked", 0 != b ? "checked" : ""));
                                    v.multiselect.toggleRow(n);
                                    v.multiselect.checkScroll && v.multiselect.checkScroll()
                                };
                                v.multiselect.un_selectAll = function() {
                                    3 < ++a && (a = 0);
                                    for (var b = !1, c = 0, d = document.getElementsByName("scriptselectors"), e = 0; e < d.length; e++) 0 != e || 1 != a && 3 != a || "s" != d[e].s_type || 3 < ++a && (a = 0), b |= "s" == d[e].s_type, d[e].checked = 3 == a || 1 == a && "n" == d[e].s_type || 2 == a && "s" == d[e].s_type, d[e].checked && c++;
                                    1 < a && !b && (a = 0);
                                    $(".multiselectcb").prop("checked",
                                        0 != a ? "checked" : "");
                                    v.multiselect.toggleRow(c)
                                }
                            })();
                            var Aa = {
                                cleanGutters: function(a, b) {
                                    a.clearGutter("gutter")
                                },
                                setGutters: function(a, b) {
                                    for (var c in b)
                                        if (b.hasOwnProperty(c)) {
                                            var d = b[c],
                                                g = 0,
                                                f = null,
                                                k = [];
                                            d.marks = [];
                                            for (var h = 0; h < d.length; h++) {
                                                var l = "",
                                                    n = d[h];
                                                n.stop ? (f = "no", g = 3) : n.warn ? (1 > g && (f = "critical", g = 1), l = e.getMessage("Warning") + ": ") : n.info ? (0 == g && (f = "info"), l = e.getMessage("Info") + ": ") : 2 > g && (f = "error", g = 2, l = e.getMessage("Error") + ": ");
                                                k.push((1 < d.length ? l : "") + n.text.replace(/\"/g, '\\"'));
                                                n.stop ||
                                                    d.marks.push(a.markText({
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
                                    a.oldGutters && Aa.cleanGutters(a.mirror,
                                        a.oldGutters);
                                    return function() {
                                        var a = G();
                                        Registry.require("hinter", function() {
                                            a.resolve(Registry.get("hinter"))
                                        });
                                        return a.promise()
                                    }().then(function(b) {
                                        return b.hint(a.mirror.getValue(), {
                                            maxerr: 1E4
                                        }, {})
                                    }).done(function(b) {
                                        if (b) {
                                            var c = {};
                                            t.each(b, function(a) {
                                                if (a && 1 < a.line) {
                                                    var b = a.line,
                                                        e = a.character,
                                                        k = 0,
                                                        h = a.reason.toLowerCase(),
                                                        l = -1 != h.search("mixed spaces and tabs"),
                                                        n = 0;
                                                    try {
                                                        var p = !!a.evidence && !l;
                                                        if (p)
                                                            for (var r = 0, s = 0; r < e && s < e; r++, s++) 9 == a.evidence.charCodeAt(r) && (s += w.editor_indentUnit - 1, k += 1);
                                                        e -= k * (w.editor_indentUnit - 1);
                                                        if (p || l) var t = a.evidence.length > e ? a.evidence.substr(e - 1) : "",
                                                            v = l ? t.match(/([ \t])*/) : t.match(/([a-zA-Z0-9_])*/),
                                                            n = v && v.length ? v[0].length : 0
                                                    } catch (z) {
                                                        console.log("jshint: error parsing source " + z.message)
                                                    }
                                                    k = n || 1;
                                                    a = {
                                                        line: b,
                                                        stop: 0 == h.search("stopping"),
                                                        info: l || -1 != h.search("forgotten") || -1 != h.search("not necessary") || -1 != h.search("unnecessary") || -1 != h.search("better written") || -1 != h.search("bad line breaking") || -1 != h.search("semicolon"),
                                                        warn: "(error)" != a.id || -1 != h.search("unreachable") ||
                                                            -1 != h.search("to compare with") || -1 != h.search("can be") || -1 != h.search("is preferable") || -1 != h.search("already defined"),
                                                        character: e,
                                                        evle: k,
                                                        text: a.code + ": " + a.reason.replace(/.$/, "")
                                                    };
                                                    a.stop && b++;
                                                    c[b] || (c[b] = []);
                                                    c[b].push(a)
                                                }
                                            });
                                            a.oldGutters = Aa.setGutters(a.mirror, c)
                                        }
                                    })
                                }
                            }, X = null, I = function() {
                                X && (window.clearTimeout(X), X = null)
                            }, ja = null, K = function() {
                                ja && $(ja).remove();
                                ja = Ga({
                                    text: e.getMessage("Operation_completed_successfully"),
                                    image: "button_ok",
                                    class: "notice",
                                    delay: 500,
                                    timeout: 3E3,
                                    done: function() {
                                        ja =
                                            null
                                    }
                                })
                            }, L = function() {
                                X || (X = window.setTimeout(function() {
                                    X = null;
                                    s.wait(e.getMessage("Please_wait___"))
                                }, 500))
                            }, ea = null, Y = null, B = function(a, b) {
                                null != ea ? (window.clearTimeout(ea), ea = null, B(a ? a : Y.items, a ? b : Y.with_scripts)) : (Y = {
                                    items: a,
                                    with_scripts: b
                                }, ea = window.setTimeout(function() {
                                    ea = null;
                                    Y.with_scripts && (O = {});
                                    var a = Y.items,
                                        b = ka.create("_main", h("div", "tv_container", "opt", "tv_container"));
                                    ha(null, a, null, b);
                                    s.hide();
                                    sa();
                                    Y = null
                                }, 50))
                            }, W = function(a, b, c) {
                                var d = G();
                                sendMessage({
                                    method: "begEvent",
                                    action: a,
                                    type: b,
                                    extra: c
                                }, function(a) {
                                    d.resolve(a)
                                });
                                return d.promise()
                            }, va = function(a, b) {
                                try {
                                    var c = function() {
                                        b && fa.OPTIONPAGE.CLOSE_ALLOWED && window.close()
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
                            }, Ta = function(a, b) {
                                var c = G();
                                try {
                                    L(), sendMessage({
                                        method: "installScript",
                                        url: a,
                                        reload: b.reload
                                    }, function(a) {
                                        I();
                                        a.items ? (K(), B(a.items, !1)) : s.hide();
                                        a.err ? c.reject(a) : c.resolve(a)
                                    })
                                } catch (d) {
                                    console.log("sS: " +
                                        d.message), c.reject({
                                        err: d.message
                                    })
                                }
                                return c.promise()
                            }, Sa = function(a, b) {
                                var c = G();
                                try {
                                    L(), sendMessage({
                                        method: "exportToJson",
                                        ids: a,
                                        options: b
                                    }, function(a) {
                                        K();
                                        I();
                                        s.hide();
                                        a.json ? c.resolve(a.json) : c.reject()
                                    })
                                } catch (d) {
                                    console.log("eJ: " + d.message), c.reject({})
                                }
                                return c.promise()
                            }, xa = function(a, b) {
                                var c = G();
                                try {
                                    L(), sendMessage({
                                        method: "importFromJson",
                                        json: a,
                                        reload: b.reload
                                    }, function(a) {
                                        I();
                                        a.reload ? window.setTimeout(function() {
                                            window.location.reload()
                                        }, 500) : a.items ? (K(), B(a.items, !0)) : s.hide();
                                        a.err ? c.reject(a) : c.resolve(a)
                                    })
                                } catch (d) {
                                    console.log("sS: " + d.message), c.reject({
                                        err: d.message
                                    })
                                }
                                return c.promise()
                            }, za = function(a, b, c) {
                                var d = G();
                                void 0 === c.reload && (c.reload = !0);
                                try {
                                    var e = c.new_url && c.new_url != c.old_url ? c.new_url : "";
                                    L();
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
                                        I();
                                        K();
                                        a.items ? B(a.items, !0) : s.hide();
                                        !b && c.reload && s.hide();
                                        d.resolve(a)
                                    })
                                } catch (f) {
                                    console.log("sS: " +
                                        f.message), d.reject({
                                        err: f.message
                                    })
                                }
                                return d.promise()
                            }, ta = function(a, b, c) {
                                try {
                                    L(), sendMessage({
                                        method: "setOption",
                                        name: a,
                                        value: b
                                    }, function(a) {
                                        I();
                                        K();
                                        w = a.options || w;
                                        !c && a.items ? B(a.items, !1) : s.hide()
                                    })
                                } catch (d) {
                                    console.log("sO: " + d.message)
                                }
                            }, Oa = function(a, b, c, d) {
                                try {
                                    L(), sendMessage({
                                        method: "buttonPress",
                                        name: a
                                    }, function(a) {
                                        I();
                                        d ? window.location.reload() : !c && a.items ? (K(), B(a.items, !1)) : s.hide()
                                    })
                                } catch (e) {
                                    console.log("sO: " + e.message)
                                }
                            }, ga = function(a, b) {
                                L();
                                sendMessage({
                                    method: "loadTree",
                                    complete: a.complete,
                                    uuid: a.uuid,
                                    referrer: a.referrer
                                }, function(a) {
                                    I();
                                    w = a.options || w;
                                    a.i18n && e.setLocale(a.i18n);
                                    a.items ? a.begging && z.push(function() {
                                        window.setTimeout(Ha, 100)
                                    }) : a.error ? alert(a.error) : confirm(e.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href = "http://tampermonkey.net/bug");
                                    b(a)
                                })
                            }, Ja = function() {
                                ga({
                                    referrer: "options.scripts"
                                }, function(a) {
                                    a.items ? B(a.items, !0) : s.hide()
                                })
                            }, U = function(a, b, c) {
                                void 0 == c && (c = !0);
                                try {
                                    a = {
                                        method: "modifyScriptOptions",
                                        uuid: a,
                                        reload: c
                                    };
                                    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                                    L();
                                    sendMessage(a, function(a) {
                                        I();
                                        w = a.options || w;
                                        a.i18n && e.setLocale(a.i18n);
                                        K();
                                        a.items ? B(a.items, !0) : s.hide()
                                    })
                                } catch (g) {
                                    console.log("mSo: " + g.message)
                                }
                            }, Ba = function(a, b, c, d) {
                                void 0 === d && (d = !0);
                                try {
                                    a = {
                                        method: "modifyNativeScript",
                                        nid: a,
                                        actionid: b,
                                        value: c,
                                        reload: d
                                    }, L(), sendMessage(a, function(a) {
                                        I();
                                        K();
                                        a.items ? B(a.items, !0) : s.hide()
                                    })
                                } catch (e) {
                                    console.log("mSo: " + e.message)
                                }
                            }, $a = function(a, b) {
                                try {
                                    L(), sendMessage({
                                        method: "buttonPress",
                                        name: "externals_delete",
                                        scriptuid: a,
                                        url: b
                                    }, function(a) {
                                        I();
                                        K();
                                        a.items ? B(a.items, !1) : s.hide()
                                    })
                                } catch (c) {
                                    console.log("dEx: " + c.message)
                                }
                            }, ab = function(a, b) {
                                try {
                                    sendMessage({
                                        method: "buttonPress",
                                        name: "run_script_updates",
                                        scriptuid: a
                                    }, function(a) {
                                        K();
                                        b && b(a.updatable)
                                    })
                                } catch (c) {
                                    console.log("rSu: " + c.message)
                                }
                            }, bb = function(a, b, c) {
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
                            }; rea.extension.onMessage.addListener(function(a, b, c) {
                                if ("updateOptions" == a.method) w =
                                    a.options || w, B(a.items, !1), c({});
                                else if ("confirm" == a.method) t.confirm(a.msg, function(a) {
                                    c({
                                        confirm: a
                                    })
                                });
                                else if ("showMsg" == a.method) t.alert(a.msg), c({});
                                else return !1;
                                return !0
                            });
                            (function() {
                                ga({
                                    referrer: "options"
                                }, function(a) {
                                    Va();
                                    a.items ? B(a.items, !1) : s.hide()
                                })
                            })()
                        })
            });
