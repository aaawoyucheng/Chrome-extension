!function(){function t(t){return!!confirm("你确定需要添加"+t+"订阅组？")}function e(t){for(var e=null,n=null,r=0;r<t.length;r++){var i=t[r].split("=",2);if(2===i.length)switch(i[0]){case"title":e=decodeURIComponent(i[1]);break;case"location":n=decodeURIComponent(i[1])}}return{title:e,url:n}}if(document instanceof HTMLDocument){var n=function(n){if(2!==n.button){for(var r=n.target;r&&!(r instanceof HTMLAnchorElement);)r=r.parentNode;if(r){if("http:"===r.protocol||"https:"===r.protocol){if("subscribe.adblockplus.org"!==r.host||"/"!==r.pathname)return}else if(!/^abp:\/*subscribe\/*\?/i.test(r.href))return;n.preventDefault(),n.stopPropagation();var i;if(r.search)i=r.search.substring(1).split("&");else{var o=r.href,a=o.indexOf("?");i=o.substring(a+1).split("&")}var l=e(i),s=l.url,c=l.title||s;s&&t(c.trim())&&contentPage.sendMessage({type:"addfilterUrl1",url:s.trim(),title:c.trim()},function(t){alert("订阅组添加成功！")})}}};document.addEventListener("click",n)}}();