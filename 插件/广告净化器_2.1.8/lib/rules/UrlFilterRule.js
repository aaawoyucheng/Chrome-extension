!function(e,t){"use strict";function r(e){var r=t.StringUtils;try{if(/^[\x00-\x7F]+$/.test(e))return e;var i=l(e,!0);return i?r.replaceAll(e,i,s.toPunyCode(i)):""}catch(t){return T.error("Error getAsciiDomainRule from {0}, cause {1}",e,t),""}}function l(e,r){var l=t.StringUtils;try{var i,n=["http://www.","https://www.","http://","https://","||","//"],u=["/","^"],s=r?-1:0;for(i=0;i<n.length;i++){var R=n[i];if(l.startWith(e,R)){s=R.length;break}}if(r){var o="domain=",U=e.indexOf(o);if(U>-1&&e.indexOf("$")>-1&&(s=U+o.length),s==-1)return""}if(r){var c="redirect=",E=e.indexOf(c);if(E>-1&&e.indexOf("$")>-1&&(s=E+c.length),s==-1)return""}if(r){var O="reload=",p=e.indexOf(O);if(p>-1&&e.indexOf("$")>-1&&(s=p+O.length),s==-1)return""}if(r){var a="bcount=",h=e.indexOf(a);if(h>-1&&e.indexOf("$")>-1&&(s=h+a.length),s==-1)return""}if(r){var F="proxy=",y=e.indexOf(a);if(y>-1&&e.indexOf("$")>-1&&(s=y+F.length),s==-1)return""}var I=-1;for(i=0;i<u.length;i++){var L=u[i],P=e.indexOf(L,s);if(P>=0){I=P;break}}return I==-1?e.substring(s):e.substring(s,I)}catch(t){return T.error("Error parsing domain from {0}, cause {1}",e,t),""}}function i(e){for(var t="",r=e.split(/[*^|]/),l=0;l<r.length;l++){var i=r[l];i.length>t.length&&(t=i)}return t.toLowerCase()}function n(e){var t=e.match(/\/(.*)\/(\$.*)?/);if(!t||t.length<2)return null;var r=t[1],l="...";if(r.indexOf("(?")>=0||r.indexOf("(!?")>=0)return null;r=l+r,r=r.replace(/[^\\]\(.*[^\\]\)/,l),r=r.replace(/[^\\]\[.*[^\\]\]/,l),r=r.replace(/[^\\]\{.*[^\\]\}/,l),r=r.replace(/[^\\]\\[a-zA-Z]/,l);for(var i=r.split(/[\\^$*+?.()|[\]{}]/),n="",u=i.length;u--;){var s=i[u];s.length>n.length&&(n=s)}return n}function u(l){var i=t.StringUtils,n=e.BaseFilterRule,u=l,s=null,R=null;i.startWith(u,n.MASK_WHITE_LIST)&&(u=u.substring(n.MASK_WHITE_LIST.length),s=!0);var T=u.lastIndexOf(e.UrlFilterRule.OPTIONS_DELIMITER);if(T>=0){var o=u;u=u.substring(0,T),R=o.substring(T+1)}return u=r(u),{urlRuleText:u,options:R,whiteListRule:s}}var s=t.UrlUtils,R=e.Prefs,T=t.Log,o=t.SimpleRegex;e.UrlFilterRule=function(r,l){var s=t.StringUtils,R=e.BaseFilterRule;R.call(this,r,l),this.shortcut=null,this.permittedContentType=e.UrlFilterRule.contentTypes.ALL,this.restrictedContentType=0;var T=u(r);T.options&&this._loadOptions(T.options),T.whiteListRule&&(this.whiteListRule=!0);var o=T.urlRuleText;this.urlRuleText=o;var U=s.startWith(o,e.UrlFilterRule.MASK_REGEX_RULE)&&s.endWith(o,e.UrlFilterRule.MASK_REGEX_RULE);if(U){this.urlRegExpSource=o.substring(e.UrlFilterRule.MASK_REGEX_RULE.length,o.length-e.UrlFilterRule.MASK_REGEX_RULE.length);var c=this.getUrlRegExp();if(!c)throw"Illegal regexp rule";this.shortcut=n(o)}else this.shortcut=i(o)},e.UrlFilterRule.prototype=Object.create(e.BaseFilterRule.prototype),e.UrlFilterRule.prototype.getUrlRegExpSource=function(){if(!this.urlRegExpSource){var e=u(this.ruleText);this.urlRegExpSource=o.createRegex(e.urlRuleText)}return this.urlRegExpSource},e.UrlFilterRule.prototype.getUrlRegExp=function(){if(this.wrongUrlRegExp)return null;if(!this.urlRegExp){var t=this.getUrlRegExpSource();try{t&&e.UrlFilterRule.MASK_ANY_SYMBOL!=t?this.urlRegExp=new RegExp(t,this.matchCase?"":"i"):this.urlRegExp=new RegExp(e.UrlFilterRule.REGEXP_ANY_SYMBOL),delete this.urlRegExpSource}catch(e){return T.error("Error create regexp from {0}",t),this.wrongUrlRegExp=!0,null}}return this.urlRegExp},e.UrlFilterRule.prototype.getUrlRuleText=function(){return this.urlRuleText||(this.urlRuleText=u(this.ruleText).urlRuleText),this.urlRuleText},e.UrlFilterRule.prototype.isPermitted=function(r){var l=t.StringUtils,i=e.BaseFilterRule;if(l.isEmpty(r)){var n=this.hasPermittedDomains();if(this.whiteListRule&&!n)return!0;if(!this.checkThirdParty&&!n)return!0}return i.prototype.isPermitted.call(this,r)},e.UrlFilterRule.prototype.isFiltered=function(r,l,i){var n=t.StringUtils;if(this.checkThirdParty&&this.isThirdParty!=l)return!1;if(null!==this.shortcut&&!n.containsIgnoreCase(r,this.shortcut))return!1;var u=e.UrlFilterRule.contentTypes[i];if((this.permittedContentType&u)!=u)return!1;if(0!==this.restrictedContentType&&(this.restrictedContentType&u)==u)return!1;var s=this.getUrlRegExp();return!!s&&s.test(r)},e.UrlFilterRule.prototype._loadOptions=function(t){for(var r=e.BaseFilterRule,l=t.split(r.COMA_DELIMITER),i=0,n=0,u=0;u<l.length;u++){var s=l[u],R=s.split(r.EQUAL),T=R[0];switch(T){case e.UrlFilterRule.DOMAIN_OPTION:if(R.length>1){var o=R[1];R.length>2&&(o=R.slice(1).join(r.EQUAL)),this.loadDomains(o)}break;case e.UrlFilterRule.Redirect_OPTION:if(R.length>1){var U=R[1];R.length>2&&(U=R.slice(1).join(r.EQUAL)),this.setRedirectUrl(U)}i|=e.UrlFilterRule.contentTypes.REDIRECT;break;case e.UrlFilterRule.Reload_OPTION:if(R.length>1){var c=R[1];R.length>2&&(c=R.slice(1).join(r.EQUAL)),this.setReloadUrl(c)}i|=e.UrlFilterRule.contentTypes.RELOAD;break;case e.UrlFilterRule.BCount_OPTION:if(R.length>1){var E=R[1];R.length>2&&(E=R.slice(1).join(r.EQUAL)),this.setCountUrl(E)}i|=e.UrlFilterRule.contentTypes.BCOUNT;break;case e.UrlFilterRule.Proxy_OPTION:if(R.length>1){var O=R[1];R.length>2&&(O=R.slice(1).join(r.EQUAL)),this.setProxyUrl(O)}i|=e.UrlFilterRule.contentTypes.PROXY;break;case e.UrlFilterRule.THIRD_PARTY_OPTION:this.checkThirdParty=!0,this.isThirdParty=!0;break;case r.NOT_MARK+e.UrlFilterRule.THIRD_PARTY_OPTION:this.checkThirdParty=!0,this.isThirdParty=!1;break;case e.UrlFilterRule.MATCH_CASE_OPTION:this.matchCase=!0;break;case e.UrlFilterRule.IMPORTANT_OPTION:this.isImportant=!0;break;case e.UrlFilterRule.NOT_MARK+e.UrlFilterRule.IMPORTANT_OPTION:this.isImportant=!1;break;case e.UrlFilterRule.ELEMHIDE_OPTION:i|=e.UrlFilterRule.contentTypes.ELEMHIDE;break;case e.UrlFilterRule.GENERICHIDE_OPTION:i|=e.UrlFilterRule.contentTypes.GENERICHIDE;break;case e.UrlFilterRule.JSINJECT_OPTION:i|=e.UrlFilterRule.contentTypes.JSINJECT;break;case e.UrlFilterRule.URLBLOCK_OPTION:i|=e.UrlFilterRule.contentTypes.URLBLOCK;break;case e.UrlFilterRule.GENERICBLOCK_OPTION:i|=e.UrlFilterRule.contentTypes.GENERICBLOCK;break;case e.UrlFilterRule.DOCUMENT_OPTION:i|=e.UrlFilterRule.contentTypes.DOCUMENT;break;case e.UrlFilterRule.POPUP_OPTION:i|=e.UrlFilterRule.contentTypes.POPUP;break;case e.UrlFilterRule.EMPTY_OPTION:this.emptyResponse=!0;break;default:if(T=T.toUpperCase(),T in e.UrlFilterRule.contentTypes)i|=e.UrlFilterRule.contentTypes[T];else if(T[0]==r.NOT_MARK&&T.substring(1)in e.UrlFilterRule.contentTypes)n|=e.UrlFilterRule.contentTypes[T.substring(1)];else if(!(T in e.UrlFilterRule.ignoreOptions))throw"Unknown option: "+T}}i>0&&(this.permittedContentType=i),n>0&&(this.restrictedContentType=n)},e.UrlFilterRule.OPTIONS_DELIMITER="$",e.UrlFilterRule.DOMAIN_OPTION="domain",e.UrlFilterRule.THIRD_PARTY_OPTION="third-party",e.UrlFilterRule.MATCH_CASE_OPTION="match-case",e.UrlFilterRule.DOCUMENT_OPTION="document",e.UrlFilterRule.ELEMHIDE_OPTION="elemhide",e.UrlFilterRule.GENERICHIDE_OPTION="generichide",e.UrlFilterRule.URLBLOCK_OPTION="urlblock",e.UrlFilterRule.GENERICBLOCK_OPTION="genericblock",e.UrlFilterRule.JSINJECT_OPTION="jsinject",e.UrlFilterRule.POPUP_OPTION="popup",e.UrlFilterRule.IMPORTANT_OPTION="important",e.UrlFilterRule.MASK_ANY_SYMBOL="*",e.UrlFilterRule.REGEXP_ANY_SYMBOL=".*",e.UrlFilterRule.MASK_REGEX_RULE="/",e.UrlFilterRule.Redirect_OPTION="redirect",e.UrlFilterRule.Reload_OPTION="reload",e.UrlFilterRule.BCount_OPTION="bcount",e.UrlFilterRule.Proxy_OPTION="proxy",e.UrlFilterRule.EMPTY_OPTION="empty",e.UrlFilterRule.contentTypes={OTHER:1,SCRIPT:2,IMAGE:4,STYLESHEET:8,OBJECT:16,SUBDOCUMENT:32,XMLHTTPREQUEST:64,"OBJECT-SUBREQUEST":128,MEDIA:256,FONT:512,WEBSOCKET:1024,WEBRTC:2048,ELEMHIDE:1<<20,URLBLOCK:1<<21,JSINJECT:1<<22,POPUP:1<<23,GENERICHIDE:1<<24,GENERICBLOCK:1<<25,IMPORTANT:1<<26,REDIRECT:1<<27,RELOAD:1<<28,BCOUNT:1<<29,PROXY:1<<30},"chromium"!==R.platform&&"webkit"!=R.platform||(e.UrlFilterRule.contentTypes["OBJECT-SUBREQUEST"]=e.UrlFilterRule.contentTypes.OBJECT),"Firefox"===R.platform&&(e.UrlFilterRule.contentTypes["OBJECT-SUBREQUEST"]=e.UrlFilterRule.contentTypes.OBJECT),e.UrlFilterRule.ignoreOptions={BACKGROUND:!0,"~BACKGROUND":!0,COLLAPSE:!0,"~COLLAPSE":!0,"~DOCUMENT":!0,CONTENT:!0},e.UrlFilterRule.contentTypes.DOCUMENT=e.UrlFilterRule.contentTypes.ELEMHIDE|e.UrlFilterRule.contentTypes.URLBLOCK|e.UrlFilterRule.contentTypes.JSINJECT|e.UrlFilterRule.contentTypes.REDIRECT|e.UrlFilterRule.contentTypes.RELOAD|e.UrlFilterRule.contentTypes.BCOUNT|e.UrlFilterRule.contentTypes.PROXY,e.UrlFilterRule.contentTypes.DOCUMENT_LEVEL_EXCEPTIONS=e.UrlFilterRule.contentTypes.DOCUMENT|e.UrlFilterRule.contentTypes.GENERICHIDE|e.UrlFilterRule.contentTypes.GENERICBLOCK,e.UrlFilterRule.contentTypes.ALL=0,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.OTHER,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.SCRIPT,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.IMAGE,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.STYLESHEET,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.OBJECT,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.SUBDOCUMENT,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.XMLHTTPREQUEST,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes["OBJECT-SUBREQUEST"],e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.MEDIA,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.FONT,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.WEBSOCKET,e.UrlFilterRule.contentTypes.ALL|=e.UrlFilterRule.contentTypes.WEBRTC,e.UrlFilterRule.prototype.checkContentType=function(t){var r=e.UrlFilterRule.contentTypes[t];return 0!==(this.permittedContentType&r)&&!(0!==this.restrictedContentType&&(this.restrictedContentType&r)==r)}}(yiclearAPI,vAPI);