!function(e,r){"use strict";e.FilterStorage={FILE_PATH:"filters.ini",CSS_FILE_PATH:"elementsHide.css",_loading:!1,_cssSaving:!1,saveFilterRules:function(t,i,s){var n=r.Log,l=e.FilterStorage._getFilePath(t),a=r.FileStorage;a.write(l,i,function(e){e&&n.error("Error write filters to file {0} cause: {1}",l,a.translateError(e)),s&&s()})},loadFilterRules:function(t,i){var s=r.Log,n=r.FileStorage,l=e.FilterStorage._getFilePath(t);n.read(l,function(e,r){e&&s.error("Error while reading rules from file {0} cause: {1}",l,n.translateError(e)),i(r)}.bind(this))},saveStyleSheetToDisk:function(t,i){if(!this._cssSaving){this._cssSaving=!0;var s=r.Log,n=r.FileStorage,l=e.FilterStorage.CSS_FILE_PATH;n.write(l,t,function(e){return e&&e.error?void s.error("Error write css styleSheet to file {0} cause: {1}",l,n.translateError(e.error)):(i(),void(this._cssSaving=!1))}.bind(this))}},loadFromDisk:function(i){var s=r.Log,n=r.FileStorage,l=e.FilterStorage.FILE_PATH,a=new t;n.readFromFileWithListener(l,a,function(e){e&&s.error("Error read filters from file {0} cause: {1}",l,n.translateError(e)),i(a.antiBannerFilters||[])}.bind(this))},_getFilePath:function(e){return"filterrules_"+e+".txt"}};var t=function(){this.currentSection=null,this.currentFilter=null,this.currentRules=null,this.antiBannerFilters=[]};t.Sections={FILTER_START:"[FILTER]",FILTER_END:"[/FILTER]",RULES_START:"[RULES]",RULES_END:"[/RULES]"},t.fromObject=function(e){var r={filterId:e.filterId-0};return r.version="0.0.0.0","version"in e&&(r.version=e.version),"lastUpdateTime"in e&&(r.lastUpdateTime=e.lastUpdateTime-0),"lastCheckTime"in e&&(r.lastCheckTime=e.lastCheckTime-0),r.disabled="true"==e.disabled,r},t.prototype={process:function(r){var i=e.FilterRuleBuilder;switch(r){case t.Sections.FILTER_START:this.currentFilter=Object.create(null),this.currentSection=t.Sections.FILTER_START;break;case t.Sections.RULES_START:this.currentRules=[],this.currentSection=t.Sections.RULES_START;break;case t.Sections.FILTER_END:if(this.currentFilter){var s=t.fromObject(this.currentFilter);null!==s&&(s.filterRules=this.currentRules,this.antiBannerFilters.push(s))}this.currentFilter=null,this.currentRules=null,this.currentSection=null;break;case t.Sections.RULES_END:break;default:switch(this.currentSection){case t.Sections.FILTER_START:if(r&&this.currentFilter){var n=/^(\w+)=(.*)$/.exec(r);this.currentFilter[n[1]]=n[2]}break;case t.Sections.RULES_START:if(r&&this.currentRules){var l=i.createRule(r,this.currentFilter.filterId-0);null!==l&&this.currentRules.push(l)}}}}}}(yiclearAPI,vAPI);