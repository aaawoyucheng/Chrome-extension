!function(e,t){"use strict";var i=e,s=t,r=s.platformUtils.isShadowDomSupported(),l=s.ext.app.getBrowserVersion()>34;e.WebRequestService=function(e,n,a,u){this.framesMap=e,this.antiBannerService=n,this.filteringLog=a,this.YiclearApplication=u,this.processRequestResponse=function(e,t,r,l,n){l==s.RequestTypes.DOCUMENT&&(this.YiclearApplication.checkHeaders(e,n,t),this.filteringLog.clearEventsForTab(e));var a=null,u=!1;if(this.framesMap.isTabyiclearDetected(e))a=this.YiclearApplication.parseYiclearRuleFromHeaders(n);else if(this.framesMap.isTabProtectionDisabled(e));else if(l==s.RequestTypes.DOCUMENT){a=this.framesMap.getFrameWhiteListRule(e);var o=this.framesMap.getFrameDomain(e);this.framesMap.isIncognitoTab(e)||i.filterRulesHitCount.addDomainView(o),u=!0}u&&this.filteringLog.addEvent(e,t,r,l,a)},this.filteringLogEventUpdate=function(e,t,i,s){var r=!0;r&&this.filteringLog.updateEvent(e,t,s)},this.processGetSelectorsAndScripts=function(e,t,i){var s=Object.create(null);if(!e)return s;if(!this.antiBannerService.isRequestFilterReady())return s.requestFilterReady=!1,s;if(this.framesMap.isTabyiclearDetected(e)||this.framesMap.isTabProtectionDisabled(e)||this.framesMap.isTabWhiteListed(e))return s;s={selectors:null,scripts:null,collapseAllElements:this.antiBannerService.shouldCollapseAllElements(),useShadowDom:!!r||l};var n=this.antiBannerService.getRequestFilter().findWhiteListRule(t,t,"GENERICHIDE"),a=this.antiBannerService.getRequestFilter().findWhiteListRule(t,t,"ELEMHIDE");a||(this.shouldLoadAllSelectors(s.collapseAllElements)?s.selectors=this.antiBannerService.getRequestFilter().getSelectorsForUrl(t,n):s.selectors=this.antiBannerService.getRequestFilter().getInjectedSelectorsForUrl(t,n));var u=i.filter.indexOf("scripts")>=0;if(u){var o=this.antiBannerService.getRequestFilter().findWhiteListRule(t,t,"JSINJECT");o||(s.scripts=this.antiBannerService.getRequestFilter().getScriptsForUrl(t))}return s},this.checkPageScriptWrapperRequest=function(e,t,i,s){if(!e)return!1;var r=this.getRuleForRequest(e,t,i,s);return this.filteringLog.addEvent(e,t,i,s,r),this.isRequestBlockedByRule(r)},this.getBlockedResponseByRule=function(e){return this.isRequestBlockedByRule(e)?e.emptyResponse?{redirectUrl:t.ext.getURL("elemhidehit.png")}:{cancel:!0}:null},this.shouldLoadAllSelectors=function(e){var t=s.platformUtils,r=i.userSettings;if(t.isFirefoxBrowser()&&r.collectHitsCount()||i.Prefs.useGlobalStyleSheet)return!1;var l=t.isContentBlockerEnabled();return!(!l||!e)||!l},this.processShouldCollapseMany=function(e,t,i){if(!e)return i;for(var s=0;s<i.length;s++){var r=i[s],l=this.getRuleForRequest(e,r.elementUrl,t,r.requestType);r.collapse=this.isRequestBlockedByRule(l)}return i},this.processShouldCollapse=function(e,t,i,s){if(!e)return!1;var r=this.getRuleForRequest(e,t,i,s);return this.isRequestBlockedByRule(r)},this.isRequestBlockedByRule=function(e){return e&&!e.whiteListRule},this.getRuleForRequest=function(e,t,s,r){if(this.framesMap.isTabyiclearDetected(e)||this.framesMap.isTabProtectionDisabled(e))return null;var l=null;return l=this.framesMap.isTabWhiteListed(e)?this.framesMap.getFrameWhiteListRule(e):this.antiBannerService.getRequestFilter().findRuleForRequest(t,s,r),null!=l&&null!=l.RedirectUrls&&"REDIRECT"==r&&i.userSettings.YoukuDanmu()&&l.RedirectUrls.indexOf("swf.jiajuchao.com.cn/player.swf")!=-1?null:l},this.postProcessRequest=function(e,t,r,l,n){var a=s.EventNotifier;if(!this.framesMap.isTabyiclearDetected(e)){this.isRequestBlockedByRule(n)&&a.notifyListeners(s.EventNotifierTypes.ADS_BLOCKED,n,e,1),this.filteringLog.addEvent(e,t,r,l,n);var u=s.FilterUtils,o=i.filterRulesHitCount;if(n&&!u.isUserFilterRule(n)&&!u.isWhiteListFilterRule(n)&&!this.framesMap.isIncognitoTab(e)){var c=this.framesMap.getFrameDomain(e);o.addRuleHit(c,n.ruleText,n.filterId,t)}}}}}(yiclearAPI,vAPI);