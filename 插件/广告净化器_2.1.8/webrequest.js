!function(){"use strict";function e(e){var t=e.tab,r=e.requestUrl,s=e.requestType;if(s!==vAPI.RequestTypes.DOCUMENT&&s!==vAPI.RequestTypes.SUBDOCUMENT||(f.push(e),c.recordFrame(t,e.frameId,r,s)),s===vAPI.RequestTypes.DOCUMENT)return R.notifyListeners(o.UPDATE_TAB_BUTTON_STATE,t,!0),!0;if(!vAPI.UrlUtils.isHttpRequest(r))return!0;var u=c.getFrameUrl(t,e.requestFrameId),l=d.getRuleForRequest(t,r,u,s);d.postProcessRequest(t,r,u,s,l);var n=d.getBlockedResponseByRule(l);return n||f.push(e),n}function t(e){for(var t={loadtime:null,RequestTypes:null,tab:null},r=0;r<f.length;r++){var s=f[r];s.requestUrl===e.url&&(t.loadtime=e.timeStamp-s.requestTime,t.tab=s.tab,t.RequestTypes=s.requestType,f.splice(r-f.length,1))}return t.loadtime=Math.round(t.loadtime),t}function r(e){var r=t(e),s=e.url;d.filteringLogEventUpdate(r.tab,s,r.RequestTypes,r.loadtime)}function s(e){var t=e.tab,r=e.requestUrl,s=e.requestType,u=r;if(s!==vAPI.RequestTypes.DOCUMENT&&s!==vAPI.RequestTypes.SUBDOCUMENT||c.recordFrame(t,e.frameId,r,s),!vAPI.UrlUtils.isHttpRequest(r))return t=null,s=null,u=null,!0;var l=c.getFrameUrl(t,e.requestFrameId),n=d.getRuleForRequest(t,r,l,"REDIRECT");return null!=n&&null!=n.RedirectUrls?(u=r.replace(n.urlRegExp,n.RedirectUrls),{redirectUrl:u}):(n=d.getRuleForRequest(t,r,l,"BCOUNT"),null!=n&&null!=n.BCount?(v++,!(v>1&&v%Number(n.BCount)==0)):void 0)}function u(e){var t=e.tab,r=e.requestHeaders;if("DOCUMENT"===e.requestType){var s=vAPI.platformUtils.findHeaderByName(r,"Referer");s&&c.recordFrameReferrerHeader(t,s.value)}}function l(e){var t=e.tab,r=e.requestUrl,s=e.responseHeaders,u=e.requestType,l=c.getFrameUrl(t,e.requestFrameId);if(d.processRequestResponse(t,r,l,u,s),u===vAPI.RequestTypes.DOCUMENT||u===vAPI.RequestTypes.SUBDOCUMENT)return n(e)}function n(e){if(!vAPI.platformUtils.isEdgeBeforeCreatorsUpdate()){var t=e.tab,r=e.responseHeaders||[],s=c.getFrameUrl(t,e.frameId),u=null,l=!1;if(vAPI.ext.webRequest.webSocketSupported||(u=d.getRuleForRequest(t,"ws://yiclearwebsocket.check",s,vAPI.RequestTypes.WEBSOCKET),l=d.isRequestBlockedByRule(u)),l||(u=d.getRuleForRequest(t,"blob:yiclearblob.check",s,vAPI.RequestTypes.SCRIPT),l=d.isRequestBlockedByRule(u)),l||(u=d.getRuleForRequest(t,"stun:yiclearwebrtc.check",s,vAPI.RequestTypes.WEBRTC),l=d.isRequestBlockedByRule(u)),u&&yiclear.filteringLog.addEvent(t,"content-security-policy-check",s,vAPI.RequestTypes.OTHER,u),l){var n={name:"Content-Security-Policy",value:"connect-src http: https:; frame-src http: https:; child-src http: https:"};return r.push(n),{responseHeaders:r,modifiedHeaders:[n]}}}}function i(e){if(!e)return null;var t=decodeURIComponent(vAPI.StringUtils.substringAfter(e,"#")),r=vAPI.StringUtils.substringBefore(t,";"),s=vAPI.StringUtils.substringAfter(t,";");return{filterId:r,ruleText:s}}function a(e){if(!c.isIncognitoTab(e.tab)){var t=c.getFrameDomain(e.tab),r=i(e.requestUrl);r&&yiclearAPI.filterRulesHitCount.addRuleHit(t,r.ruleText,r.filterId)}}var o=vAPI.EventNotifierTypes,c=yiclear.framesMap,d=yiclear.webRequestService,R=vAPI.EventNotifier,p=vAPI.ext.webRequest,f=[],v=1;p.onCompleted.addListener(r,{urls:["<all_urls>"]},["responseHeaders"]),p.onBeforeRequest.addListener(e,["<all_urls>"]),p.onBeforeRequest.addListener(s,["<all_urls>"]),p.onBeforeSendHeaders.addListener(u,["<all_urls>"]),p.onHeadersReceived.addListener(l,["<all_urls>"]);var T=vAPI.ext.getURL("elemhidehit.png");p.onBeforeRequest.addListener(a,[T]);var q=null;R.addListener(function(e){switch(e){case o.ADD_RULE:case o.ADD_RULES:case o.REMOVE_RULE:case o.UPDATE_FILTER_RULES:case o.ENABLE_FILTER:case o.DISABLE_FILTER:null!=q&&clearTimeout(q),q=setTimeout(function(){q=null,p.handlerBehaviorChanged()},3e3)}}),function(){function e(r,s,u,l,n){var i=null;t||(i={frameId:s}),vAPI.ext.tabs.sendMessage(r,l,function(t){if(!t){if(--n<=0)return;setTimeout(function(){e(r,s,u,l,n)},10)}})}var t=vAPI.platformUtils.isEdgeBrowser();vAPI.ext.webNavigation.onCommitted.addListener(function(r,s,u){if(0===s||!t){var l=d.processGetSelectorsAndScripts({tabId:r},u,{filter:["scripts"]});l.scripts&&0!==l.scripts.length&&(l.type="injectScripts",e(r,s,u,l,5))}})}()}();