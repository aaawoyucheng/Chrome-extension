!function(e){"use strict";e.YiclearApplication=function(r){this.serviceClient=new e.ClientService,this.framesMap=r},e.YiclearApplication.prototype={YICLEAR_APP_HEADER:"X-Yiclear-Filtered",YICLEAR_RULE_HEADER:"X-Yiclear-Rule",INTEGRATION_MODE_FULL:"FULL",INTEGRATION_MODE_DEFAULT:"DEFAULT",INTEGRATION_MODE_OLD:"OLD",yiclearProductName:null,yiclearAppVersion:null,yiclearIntegrationDetected:!1,checkHeaders:function(e,r,i){this._detectYiclearApplication(e,r,i)},_detectYiclearApplication:function(e,r,i){var l=null,t=null,a=i;if(a&&(a=null),r)for(var n=0;n<r.length;n++){var c=r[n];if(c.value)switch(c.name){case this.YICLEAR_APP_HEADER:l=c.value;break;case this.YICLEAR_RULE_HEADER:t=c.value}}if(!l)return this.framesMap.recordYiclearIntegrationForTab(e,!1,!1,!1,null,null,!1),null},parseYiclearRuleFromHeaders:function(e){if(e)for(var r=0;r<e.length;r++){var i=e[r];switch(i.name){case this.YICLEAR_RULE_HEADER:return this._createRuleFromHeader(i.value)}}return null},_createRuleFromHeader:function(r){for(var i=e.FilterRuleBuilder,l=r.split("; "),t=Object.create(null),a=0;a<l.length;a++){var n=l[a].split("=");t[n[0]]=decodeURIComponent(n[1])}return i.createRule(t.rule,t.filterId-0)},shouldOverrideReferrer:function(e){return this.framesMap.isTabyiclearWhiteListed(e)}}}(yiclearAPI);