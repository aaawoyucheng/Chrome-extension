!function(e,t){"use strict";e.filterClasses={createFilter:function(t,r,i,l,s,a,n,o,c){var u=new e.YiclearFilter(t);return u.name=r,u.description=i,u.enabled=l,u.installed=s,u.lastUpdateTime=a,u.RuleCount=n,u.subscriptionUrl=o,u.version=c,u},getAllyiclearFilters:function(e){var r=t.AntiBannerFiltersId,i=t.LocalStorage,l=[],s=e.getGroups(),a=JSON.parse(i.getItem("filters-state"));l.push(this.createFilter(r.USER_FILTER_ID,"","")),l.push(this.createFilter(r.WHITE_LIST_FILTER_ID,"",""));for(var n=0;n<s.length;n++){var o=s[n];o.title=o.title||o.name,a&&a[o.filterId]?l.push(this.createFilter(o.filterId,o.title,o.specialization,a[o.filterId].enabled,a[o.filterId].installed,o.lastUpdateTime,o.RuleCount,o.subscriptionUrl,o.version)):l.push(this.createFilter(o.filterId,o.title,o.specialization,!1,!1,o.lastUpdateTime,o.RuleCount,o.subscriptionUrl,o.version))}return l}},e.YiclearFilter=function(e){this.filterId=e,this.name=null,this.description=null,this.version=null,this.lastUpdateTime=null,this.lastCheckTime=null,this.enabled=!1,this.subscriptionUrl=null,this.version=null};var r=e.FilterLSUtils={FILTERS_STATE_PROP:"filters-state",FILTERS_VERSION_PROP:"filters-version",getFiltersVersionInfo:function(){var e=t.Log,i=t.LocalStorage,l=Object.create(null);try{var s=i.getItem(r.FILTERS_VERSION_PROP);s&&(l=JSON.parse(s))}catch(t){e.error("Error retrieve filters version info, cause {0}",t)}return l},getFiltersStateInfo:function(){var e=t.Log,i=t.LocalStorage,l=Object.create(null);try{var s=i.getItem(r.FILTERS_STATE_PROP);s&&(l=JSON.parse(s))}catch(t){e.error("Error retrieve filters state info, cause {0}",t)}return l},updateFilterVersionInfo:function(e){var i=r.getFiltersVersionInfo(),l=t.LocalStorage;i[e.filterId]={version:e.version,lastCheckTime:e.lastCheckTime,lastUpdateTime:e.lastUpdateTime},l.setItem(r.FILTERS_VERSION_PROP,JSON.stringify(i))},updateFilterStateInfo:function(e){var i=r.getFiltersStateInfo(),l=t.LocalStorage;i[e.filterId]={loaded:e.loaded,enabled:e.enabled,installed:e.installed},l.setItem(r.FILTERS_STATE_PROP,JSON.stringify(i))}}}(yiclearAPI,vAPI);