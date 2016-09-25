'use strict';

$(function () {

    jqueryAutoStart();

    var flag_jquery = document.getElementById('flag_jquery'),
        flag_disable = document.getElementById('flag_disable'),
        btn_submit = document.getElementById('btn_submit'),
        btn_clear = document.getElementById('btn_clear'),
        cssOnly = false,
        alreadySaved = false,
        userStyles = void 0,
        domain = void 0,
        activeTab = void 0;

    // Initialize
    chrome.tabs.getSelected(null, function (tab) {

        userStyles = new CustomJavaScript(tab.url);
        domain = userStyles.domain;
        title.innerHTML = domain;

        // On error
        if (!domain) {
            $('#ok').hide();
            $('#error').show();
        }
    });

    // 袪械写邪泻褌芯褉 JS
    var inputJS = ace.edit("inputJS");
    inputJS.setTheme("ace/theme/tomorrow");
    inputJS.getSession().setMode("ace/mode/javascript");
    inputJS.$blockScrolling = Infinity;

    // 袪械写邪泻褌芯褉 CSS
    var inputCSS = ace.edit("inputCSS");
    inputCSS.setTheme("ace/theme/tomorrow");
    inputCSS.getSession().setMode("ace/mode/css");
    inputCSS.$blockScrolling = Infinity;

    // 袟邪谐褉褍蟹泻邪
    chrome.storage.local.get(null, function (data) {

        // Load libs
        if (!jQuery.isEmptyObject(data.libs)) {
            var q = 0;
            for (var key in data.libs) {
                var lib = data.libs[key],
                    input = '<input class="checkbox libs__element" type="checkbox" name="libs[]" value="' + key + '" id="lib' + q + '">',
                    name = '<label for="lib' + q + '">' + key + '</label>';
                $('#listLibs').append('<li>' + input + name + '</li>');
                q++;
            }
        }

        if (data.sites[domain]) {

            // 袛谢褟 邪胁褌芯褋芯褏褉邪薪械薪懈褟
            alreadySaved = true;

            // Response
            var response = data.sites[domain],
                isDraft = false;
            //console.log(response);

            // "Disabled" checkbox
            if (response.disabled) $(flag_disable).prop('checked', true);

            // Load JavaScript
            if (!inputJS.getValue()) {
                var setjs = void 0;
                if (response.draftjs && response.draftjs != response.js) {
                    setjs = response.draftjs;
                    isDraft = true;
                } else {
                    setjs = response.js;
                }
                inputJS.setValue(setjs);
            }

            // Load CSS
            if (!inputCSS.getValue()) {
                var setcss = void 0;
                if (response.draftcss && response.draftcss != response.css) {
                    setcss = response.draftcss;
                    isDraft = true;
                } else {
                    setcss = response.css;
                }
                inputCSS.setValue(setcss);
            }

            // Turn on libs
            if (response.libs) {
                response.libs.forEach(function (i) {
                    $('input[value="' + i + '"]').prop("checked", true);
                });
            }

            // Set active tab
            if (!inputJS.getValue() && inputCSS.getValue()) {
                activeTab = 1;
            } else {
                activeTab = 0;
            }
        } else {
            // Set tab JS active
            activeTab = 0;
        }

        // 小芯褏褉邪薪械薪懈械 褔械褉薪芯胁懈泻邪
        setInterval(function () {
            if (inputJS.getValue() || inputCSS.getValue()) {
                (function () {
                    var prefs = {
                        //js: inputJS.getValue() || "",
                        draftjs: inputJS.getValue() || "",
                        //css: inputCSS.getValue() || "",
                        draftcss: inputCSS.getValue() || "",
                        disabled: flag_disable.checked
                    };
                    prefs.libs = [];
                    $('.libs__element:checked').each(function (i) {
                        prefs.libs[i] = $(this).val();
                    });

                    /* 袧邪 褋谢褍褔邪泄, 械褋谢懈 邪胁褌芯褋芯褏褉邪薪械薪懈械 写械谢邪械褌褋褟 写谢褟 薪芯胁芯谐芯 写芯屑械薪邪 */
                    if (!alreadySaved) {
                        prefs.js = inputJS.getValue() || "";
                        prefs.css = inputCSS.getValue() || "";
                    }
                    /* */

                    saveProps(domain, prefs, function () {});
                })();
            }
        }, 1000);

        // TABS
        var tabs = new makeMTabs(activeTab);
    });

    // Options
    document.querySelector('#settings').addEventListener("click", function () {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    // 小芯褏褉邪薪懈薪懈械
    btn_submit.onclick = function () {
        if (inputJS.getValue() || inputCSS.getValue()) {
            (function () {
                var prefs = {
                    js: inputJS.getValue() || "",
                    draftjs: inputJS.getValue() || "",
                    css: inputCSS.getValue() || "",
                    draftcss: inputCSS.getValue() || "",
                    disabled: flag_disable.checked
                };
                prefs.libs = [];
                $('.libs__element:checked').each(function (i) {
                    prefs.libs[i] = $(this).val();
                });

                saveProps(domain, prefs, function () {
                    chrome.tabs.reload();
                    window.close();
                });
            })();
        }
    };

    // 袨褔懈褋褌泻邪
    btn_clear.onclick = function () {
        removeDomain(domain, function () {
            chrome.tabs.reload();
            window.close();
        });
    };
});