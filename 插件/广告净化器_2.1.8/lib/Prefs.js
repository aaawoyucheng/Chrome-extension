!function(e,r){"use strict";e.Prefs={csspath:"chrome-extension://",platform:"chromium",locale:r.ext.i18n.getMessage("@@ui_locale"),appId:r.ext.i18n.getMessage("@@extension_id"),version:r.ext.app.getVersion(),localSubscriptionsPath:r.ext.getURL("subscriptions.xml"),speedupStartup:function(){return!0},getBrowser:function(){if(!e.Prefs.browser){var r,s=navigator.userAgent;if(r=s.toLowerCase().indexOf("yabrowser")>=0?"YaBrowser":s.toLowerCase().indexOf("opera")>=0||s.toLowerCase().indexOf("opr")>=0?"Opera":s.indexOf("Safari")>=0&&s.indexOf("Chrome")<0?"Safari":"Chrome",e.Prefs.browser=r,"Safari"==r){var t=function(){var e=s.indexOf("Version/");if(0==e)return"";var r=s.indexOf(" ",e);return s.substring(e+8,r>0?r:s.length)};e.Prefs.safariVersion=t()}}return e.Prefs.browser},collapseByContentScript:!0,useGlobalStyleSheet:!1}}(yiclearAPI,vAPI);