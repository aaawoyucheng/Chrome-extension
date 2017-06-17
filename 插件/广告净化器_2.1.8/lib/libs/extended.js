var ExtendedCss=function(e){var t=function(){var e=function(e){var t=Object.create(null),n=/([^:;]+?):([^;]+?);/g;e+=";";for(var r;null!==(r=n.exec(e));){var o=r[1].trim(),i=r[2].trim();t[o]=i}return t},t=function(t){if(!t)throw"CssParser: empty cssText parameter";for(var n,r=[],o=/(.*?){(.*?)}/g;null!==(n=o.exec(t));){var i=Object.create(null);i.selectors=n[1].trim();var u=n[2].trim();i.style=e(u),r.push(i)}return r};return{parseCss:t,parseStyle:e}}(),n=function(){var t,n=e.MutationObserver||e.WebKitMutationObserver,r=e.addEventListener,o=function(e,t){if(!n)return null;var r=function(e,n){if(e.length){var r=e[0].target;n.disconnect();for(var o=e.length;o--;){var i=e[o];i.attributeName===t&&r.setAttribute(i.attributeName,i.oldValue)}n.observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:[t]})}},o=new n(r);return o.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:[t]}),o},i=function(e){document.body&&(n?(t=new n(function(t){t&&t.length&&e()}),t.observe(document.body,{childList:!0,subtree:!0,attributes:!1})):r&&(document.addEventListener("DOMNodeInserted",e,!1),document.addEventListener("DOMNodeRemoved",e,!1)))},u=function(e){t?t.disconnect():r&&(document.removeEventListener("DOMNodeInserted",e,!1),document.removeEventListener("DOMNodeRemoved",e,!1))};return{observeDom:function(e){document.body?i(e):document.addEventListener("DOMContentLoaded",function(){i(e)})},disconnectDom:u,protectAttribute:o}}(),r=function(){var e={maskStartUrl:"||",maskPipe:"|",maskSeparator:"^",maskAnySymbol:"*",regexAnySymbol:".*",regexSeparator:"([^ a-zA-Z0-9.%]|$)",regexStartUrl:"^(http|https|ws|wss)://([a-z0-9-_.]+\\.)?",regexStartString:"^",regexEndString:"$"},t=[".","+","?","$","{","}","(",")","[","]","\\","/"],n=new RegExp("["+t.join("\\")+"]","g"),r=function(e){return e.replace(n,"\\$&")},o=function(e,t){return e&&0===e.indexOf(t)},i=function(e,t){if(!e||!t)return!1;if(e.endsWith)return e.endsWith(t);var n=String(t),r=e.lastIndexOf(n);return r>=0&&r===e.length-n.length},u=function(e,t,n){return e?e.split(t).join(n):e},l=function(t){var n=r(t);return n=o(n,e.maskStartUrl)?n.substring(0,e.maskStartUrl.length)+u(n.substring(e.maskStartUrl.length,n.length-1),"|","\\|")+n.substring(n.length-1):o(n,e.maskPipe)?n.substring(0,e.maskPipe.length)+u(n.substring(e.maskPipe.length,n.length-1),"|","\\|")+n.substring(n.length-1):u(n.substring(0,n.length-1),"|","\\|")+n.substring(n.length-1),n=u(n,e.maskAnySymbol,e.regexAnySymbol),n=u(n,e.maskSeparator,e.regexSeparator),o(n,e.maskStartUrl)?n=e.regexStartUrl+n.substring(e.maskStartUrl.length):o(n,e.maskPipe)&&(n=e.regexStartString+n.substring(e.maskPipe.length)),i(n,e.maskPipe)&&(n=n.substring(0,n.length-1)+e.regexEndString),n};return{createRegexText:l,regexConfiguration:e}}(),o=function(e){function t(e,t,n,r){var o,i,u,l,a,s,c,d=t&&t.ownerDocument,g=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==g&&9!==g&&11!==g)return n;if(!r&&((t?t.ownerDocument||t:z)!==P&&I(t),t=t||P,k)){if(11!==g&&(a=ve.exec(e)))if(o=a[1]){if(9===g){if(!(u=t.getElementById(o)))return n;if(u.id===o)return n.push(u),n}else if(d&&(u=d.getElementById(o))&&F(t,u)&&u.id===o)return n.push(u),n}else{if(a[2])return Q.apply(n,t.getElementsByTagName(e)),n;if((o=a[3])&&w.getElementsByClassName&&t.getElementsByClassName)return Q.apply(n,t.getElementsByClassName(o)),n}if(w.qsa&&!W[e+" "]&&(!B||!B.test(e))){if(1!==g)d=t,c=e;else if("object"!==t.nodeName.toLowerCase()){for((l=t.getAttribute("id"))?l=l.replace(Se,we):t.setAttribute("id",l=H),s=A(e),i=s.length;i--;)s[i]="#"+l+" "+p(s[i]);c=s.join(","),d=ye.test(e)&&f(t.parentNode)||t}if(c)try{return Q.apply(n,d.querySelectorAll(c)),n}catch(e){}finally{l===H&&t.removeAttribute("id")}}}return T(e.replace(le,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>N.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[H]=!0,e}function o(e){var t=P.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function i(e,t){for(var n=e.split("|"),r=n.length;r--;)N.attrHandle[n[r]]=t}function u(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function l(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function a(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function s(e){return function(t){return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&Ee(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var o,i=e([],n.length,t),u=i.length;u--;)n[o=i[u]]&&(n[o]=!(r[o]=n[o]))})})}function f(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function p(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function g(e,t,n){var r=t.dir,o=t.next,i=o||r,u=n&&"parentNode"===i,l=j++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||u)return e(t,n,o);return!1}:function(t,n,a){var s,c,f,d=[U,l];if(a){for(;t=t[r];)if((1===t.nodeType||u)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||u)if(f=t[H]||(t[H]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),o&&o===t.nodeName.toLowerCase())t=t[r]||t;else{if((s=c[i])&&s[0]===U&&s[1]===l)return d[2]=s[2];if(c[i]=d,d[2]=e(t,n,a))return!0}return!1}}function h(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var o=0,i=n.length;o<i;o++)t(e,n[o],r);return r}function v(e,t,n,r,o){for(var i,u=[],l=0,a=e.length,s=null!=t;l<a;l++)(i=e[l])&&(n&&!n(i,r,o)||(u.push(i),s&&t.push(l)));return u}function y(e,t,n,o,i,u){return o&&!o[H]&&(o=y(o)),i&&!i[H]&&(i=y(i,u)),r(function(r,u,l,a){var s,c,f,d=[],p=[],g=u.length,h=r||m(t||"*",l.nodeType?[l]:l,[]),y=!e||!r&&t?h:v(h,d,e,l,a),b=n?i||(r?e:g||o)?[]:u:y;if(n&&n(y,b,l,a),o)for(s=v(b,p),o(s,[],l,a),c=s.length;c--;)(f=s[c])&&(b[p[c]]=!(y[p[c]]=f));if(r){if(i||e){if(i){for(s=[],c=b.length;c--;)(f=b[c])&&s.push(y[c]=f);i(null,b=[],s,a)}for(c=b.length;c--;)(f=b[c])&&(s=i?ee(r,f):d[c])>-1&&(r[s]=!(u[s]=f))}}else b=v(b===u?b.splice(g,b.length):b),i?i(null,u,b,a):Q.apply(u,b)})}function b(e){for(var t,n,r,o=e.length,i=N.relative[e[0].type],u=i||N.relative[" "],l=i?1:0,a=g(function(e){return e===t},u,!0),s=g(function(e){return ee(t,e)>-1},u,!0),c=[function(e,n,r){var o=!i&&(r||n!==L)||((t=n).nodeType?a(e,n,r):s(e,n,r));return t=null,o}];l<o;l++)if(n=N.relative[e[l].type])c=[g(h(c),n)];else{if(n=N.filter[e[l].type].apply(null,e[l].matches),n[H]){for(r=++l;r<o&&!N.relative[e[r].type];r++);return y(l>1&&h(c),l>1&&p(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(le,"$1"),n,l<r&&b(e.slice(l,r)),r<o&&b(e=e.slice(r)),r<o&&p(e))}c.push(n)}return h(c)}function x(e,n){var o=n.length>0,i=e.length>0,u=function(r,u,l,a,s){var c,f,d,p=0,g="0",h=r&&[],m=[],y=L,b=r||i&&N.find.TAG("*",s),x=U+=null==y?1:Math.random()||.1,S=b.length;for(s&&(L=u===P||u||s);g!==S&&null!=(c=b[g]);g++){if(i&&c){for(f=0,u||c.ownerDocument===P||(I(c),l=!k);d=e[f++];)if(d(c,u||P,l)){a.push(c);break}s&&(U=x)}o&&((c=!d&&c)&&p--,r&&h.push(c))}if(p+=g,o&&g!==p){for(f=0;d=n[f++];)d(h,m,u,l);if(r){if(p>0)for(;g--;)h[g]||m[g]||(m[g]=Z.call(a));m=v(m)}Q.apply(a,m),s&&!r&&m.length>0&&p+n.length>1&&t.uniqueSort(a)}return s&&(U=x,L=y),h};return o?r(u):u}var S,w,N,E,C,A,D,T,L,O,q,I,P,R,k,B,M,$,F,H="sizzle"+1*new Date,z=e.document,U=0,j=0,V=n(),G=n(),W=n(),_=function(e,t){return e===t&&(q=!0),0},K={}.hasOwnProperty,X=[],Z=X.pop,J=X.push,Q=X.push,Y=X.slice,ee=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",oe="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+re+"))|)"+ne+"*\\]",ie=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",ue=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ae=new RegExp("^"+ne+"*,"+ne+"*"),se=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ce=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),fe=new RegExp(ie),de=new RegExp("^"+re+"$"),pe={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re+"|[*])"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+ie),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,he=/^h\d$/i,me=/^[^{]+\{\s*\[native \w/,ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,be=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),xe=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},Se=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,we=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},Ne=function(){I()},Ee=g(function(e){return e.disabled===!0&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{Q.apply(X=Y.call(z.childNodes),z.childNodes),X[z.childNodes.length].nodeType}catch(e){Q={apply:X.length?function(e,t){J.apply(e,Y.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}w=t.support={},C=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},I=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:z;return r!==P&&9===r.nodeType&&r.documentElement?(P=r,R=P.documentElement,k=!C(P),z!==P&&(n=P.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ne,!1):n.attachEvent&&n.attachEvent("onunload",Ne)),w.attributes=o(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=o(function(e){return e.appendChild(P.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=me.test(P.getElementsByClassName),w.getById=o(function(e){return R.appendChild(e).id=H,!P.getElementsByName||!P.getElementsByName(H).length}),w.getById?(N.filter.ID=function(e){var t=e.replace(be,xe);return function(e){return e.getAttribute("id")===t}},N.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&k){var n=t.getElementById(e);return n?[n]:[]}}):(N.filter.ID=function(e){var t=e.replace(be,xe);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},N.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&k){var n,r,o,i=t.getElementById(e);if(i){if(n=i.getAttributeNode("id"),n&&n.value===e)return[i];for(o=t.getElementsByName(e),r=0;i=o[r++];)if(n=i.getAttributeNode("id"),n&&n.value===e)return[i]}return[]}}),N.find.TAG=w.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},N.find.CLASS=w.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&k)return t.getElementsByClassName(e)},M=[],B=[],(w.qsa=me.test(P.querySelectorAll))&&(o(function(e){R.appendChild(e).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&B.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||B.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+H+"-]").length||B.push("~="),e.querySelectorAll(":checked").length||B.push(":checked"),e.querySelectorAll("a#"+H+"+*").length||B.push(".#.+[+~]")}),o(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=P.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&B.push("name"+ne+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&B.push(":enabled",":disabled"),R.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&B.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),B.push(",.*:")})),(w.matchesSelector=me.test($=R.matches||R.webkitMatchesSelector||R.mozMatchesSelector||R.oMatchesSelector||R.msMatchesSelector))&&o(function(e){w.disconnectedMatch=$.call(e,"*"),$.call(e,"[s!='']:x"),M.push("!=",ie)}),B=B.length&&new RegExp(B.join("|")),M=M.length&&new RegExp(M.join("|")),t=me.test(R.compareDocumentPosition),F=t||me.test(R.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},_=t?function(e,t){if(e===t)return q=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===P||e.ownerDocument===z&&F(z,e)?-1:t===P||t.ownerDocument===z&&F(z,t)?1:O?ee(O,e)-ee(O,t):0:4&n?-1:1)}:function(e,t){if(e===t)return q=!0,0;var n,r=0,o=e.parentNode,i=t.parentNode,l=[e],a=[t];if(!o||!i)return e===P?-1:t===P?1:o?-1:i?1:O?ee(O,e)-ee(O,t):0;if(o===i)return u(e,t);for(n=e;n=n.parentNode;)l.unshift(n);for(n=t;n=n.parentNode;)a.unshift(n);for(;l[r]===a[r];)r++;return r?u(l[r],a[r]):l[r]===z?-1:a[r]===z?1:0},P):P},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==P&&I(e),n=n.replace(ce,"='$1']"),w.matchesSelector&&k&&!W[n+" "]&&(!M||!M.test(n))&&(!B||!B.test(n)))try{var r=$.call(e,n);if(r||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return t(n,P,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==P&&I(e),F(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==P&&I(e);var n=N.attrHandle[t.toLowerCase()],r=n&&K.call(N.attrHandle,t.toLowerCase())?n(e,t,!k):void 0;return void 0!==r?r:w.attributes||!k?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.escape=function(e){return(e+"").replace(Se,we)},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,o=0;if(q=!w.detectDuplicates,O=!w.sortStable&&e.slice(0),e.sort(_),q){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return O=null,e},E=t.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=E(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=E(t);return n},N=t.selectors={cacheLength:50,createPseudo:r,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(be,xe),e[3]=(e[3]||e[4]||e[5]||"").replace(be,xe),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&fe.test(n)&&(t=A(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(be,xe).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=V[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&V(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(o){var i=t.attr(o,e);return null==i?"!="===n:!n||(i+="","="===n?i===r:"!="===n?i!==r:"^="===n?r&&0===i.indexOf(r):"*="===n?r&&i.indexOf(r)>-1:"$="===n?r&&i.slice(-r.length)===r:"~="===n?(" "+i.replace(ue," ")+" ").indexOf(r)>-1:"|="===n&&(i===r||i.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),u="last"!==e.slice(-4),l="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,a){var s,c,f,d,p,g,h=i!==u?"nextSibling":"previousSibling",m=t.parentNode,v=l&&t.nodeName.toLowerCase(),y=!a&&!l,b=!1;if(m){if(i){for(;h;){for(d=t;d=d[h];)if(l?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;g=h="only"===e&&!g&&"nextSibling"}return!0}if(g=[u?m.firstChild:m.lastChild],u&&y){for(d=m,f=d[H]||(d[H]={}),c=f[d.uniqueID]||(f[d.uniqueID]={}),s=c[e]||[],p=s[0]===U&&s[1],b=p&&s[2],d=p&&m.childNodes[p];d=++p&&d&&d[h]||(b=p=0)||g.pop();)if(1===d.nodeType&&++b&&d===t){c[e]=[U,p,b];break}}else if(y&&(d=t,f=d[H]||(d[H]={}),c=f[d.uniqueID]||(f[d.uniqueID]={}),s=c[e]||[],p=s[0]===U&&s[1],b=p),b===!1)for(;(d=++p&&d&&d[h]||(b=p=0)||g.pop())&&((l?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(y&&(f=d[H]||(d[H]={}),c=f[d.uniqueID]||(f[d.uniqueID]={}),c[e]=[U,b]),d!==t)););return b-=o,b===r||b%r===0&&b/r>=0}}},PSEUDO:function(e,n){var o,i=N.pseudos[e]||N.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return i[H]?i(n):i.length>1?(o=[e,e,"",n],N.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,o=i(e,n),u=o.length;u--;)r=ee(e,o[u]),e[r]=!(t[r]=o[u])}):function(e){return i(e,0,o)}):i}},pseudos:{not:r(function(e){var t=[],n=[],o=D(e.replace(le,"$1"));return o[H]?r(function(e,t,n,r){for(var i,u=o(e,null,r,[]),l=e.length;l--;)(i=u[l])&&(e[l]=!(t[l]=i))}):function(e,r,i){return t[0]=e,o(t,null,i,n),t[0]=null,!n.pop()}}),has:r(function(e){return"string"==typeof e&&t.compile(e),function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(be,xe),function(t){return(t.textContent||t.innerText||E(t)).indexOf(e)>-1}}),lang:r(function(e){return de.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(be,xe).toLowerCase(),function(t){var n;do if(n=k?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===R},focus:function(e){return e===P.activeElement&&(!P.hasFocus||P.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:s(!1),disabled:s(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!N.pseudos.empty(e)},header:function(e){return he.test(e.nodeName)},input:function(e){return ge.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[n<0?n+t:n]}),even:c(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},N.pseudos.nth=N.pseudos.eq;for(S in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})N.pseudos[S]=l(S);for(S in{submit:!0,reset:!0})N.pseudos[S]=a(S);return d.prototype=N.filters=N.pseudos,N.setFilters=new d,A=t.tokenize=function(e,n){var r,o,i,u,l,a,s,c=G[e+" "];if(c)return n?0:c.slice(0);for(l=e,a=[],s=N.preFilter;l;){r&&!(o=ae.exec(l))||(o&&(l=l.slice(o[0].length)||l),a.push(i=[])),r=!1,(o=se.exec(l))&&(r=o.shift(),i.push({value:r,type:o[0].replace(le," ")}),l=l.slice(r.length));for(u in N.filter)!(o=pe[u].exec(l))||s[u]&&!(o=s[u](o))||(r=o.shift(),i.push({value:r,type:u,matches:o}),l=l.slice(r.length));if(!r)break}return n?l.length:l?t.error(e):G(e,a).slice(0)},D=t.compile=function(e,t){var n,r=[],o=[],i=W[e+" "];if(!i){for(t||(t=A(e)),n=t.length;n--;)i=b(t[n]),i[H]?r.push(i):o.push(i);i=W(e,x(o,r)),i.selector=e}return i},T=t.select=function(e,t,n,r){var o,i,u,l,a,s="function"==typeof e&&e,c=!r&&A(e=s.selector||e);if(n=n||[],1===c.length){if(i=c[0]=c[0].slice(0),i.length>2&&"ID"===(u=i[0]).type&&9===t.nodeType&&k&&N.relative[i[1].type]){if(t=(N.find.ID(u.matches[0].replace(be,xe),t)||[])[0],!t)return n;s&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(o=pe.needsContext.test(e)?0:i.length;o--&&(u=i[o],!N.relative[l=u.type]);)if((a=N.find[l])&&(r=a(u.matches[0].replace(be,xe),ye.test(i[0].type)&&f(t.parentNode)||t))){if(i.splice(o,1),e=r.length&&p(i),!e)return Q.apply(n,r),n;break}}return(s||D(e,c))(r,t,!k,n,!t||ye.test(e)&&f(t.parentNode)||t),n},w.sortStable=H.split("").sort(_).join("")===H,w.detectDuplicates=!!q,I(),w.sortDetached=o(function(e){return 1&e.compareDocumentPosition(P.createElement("fieldset"))}),o(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||i("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&o(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||i("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),o(function(e){return null==e.getAttribute("disabled")})||i(te,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e),i=function(e,t){var n=navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&!navigator.userAgent.match("CriOS")&&e.getMatchedCSSRules,o=function(t,n){for(var r=[],o=e.getMatchedCSSRules(t,n)||[],i=o.length;i--;)for(var u=o[i].style,l=u.length;l--;){var a=u[l];r[a]=u.getPropertyValue(a),r.push(a)}return r.sort(),r.getPropertyValue=function(e){return r[e]},r},i=function(e){return"string"==typeof e&&e.length>1&&'"'===e[0]&&'"'===e[e.length-1]&&(e=e.substring(1,e.length-1)),e},u=function(e){if("string"!=typeof e||e.indexOf('url("')<0)return e;var t=/url\(\"(.*?)\"\)/g;return e.replace(t,"url($1)")},l=function(t,r){var i;return i=n&&r?o(t,r):e.getComputedStyle(t,r)},a=function(e,t,n){var r=l(e,t);if(!r)return null;var o=r.getPropertyValue(n);return o=u(o),"content"===n&&(o=i(o)),o},s=function(e,t){var n,o;try{var i=e.split(":",2);n=i[0].trim();var u=r.createRegexText(i[1].trim());o=new RegExp(u,"i")}catch(t){"undefined"!=typeof console&&console.error&&console.error("StylePropertyMatcher: invalid match string "+e)}var l=function(e){if(!o||!n)return!1;var r=a(e,t,n);return r&&o.test(r)};this.matches=l},c=function(e){e.selectors.pseudos["matches-css"]=e.selectors.createPseudo(function(e){var t=new s(e);return function(e){return t.matches(e)}}),e.selectors.pseudos["matches-css-before"]=e.selectors.createPseudo(function(e){var t=new s(e,":before");return function(e){return t.matches(e)}}),e.selectors.pseudos["matches-css-after"]=e.selectors.createPseudo(function(e){var t=new s(e,":after");return function(e){return t.matches(e)}})};return{extendSizzle:c}}(e,document),u=function(){var e=[":has",":contains",":matches-css"];i.extendSizzle(o);var t=function(e,t,n,r){var o=new RegExp("([^\\\\]|^)\\\\"+n,"g");return r=r.replace(o,"$1"+n),":"+t+"("+r+")"},n=function(t){if("ID"===t.type||"CLASS"===t.type||"ATTR"===t.type||"TAG"===t.type||"CHILD"===t.type)return!0;if("PSEUDO"===t.type){for(var n=e.length;n--;)if(t.value.indexOf(e[n])>=0)return!1;return!0}return!1},r=function(e){return" "===e.type||">"===e.type},u=function(e,t,n){e=e||"",t&&(e+=t.value);for(var r=0;r<n.length;r++)e+=n[r].value;return e},l=function(e){var t=o.tokenize(e);if(1!==t.length)return{simple:null,relation:null,complex:e,selectorText:e};t=t[0];for(var i="",l="",a=[],s=[],c=null,f=0;f<t.length;f++){var d=t[f];s.length>0||!n(d)&&!r(d)?(a.length>0&&(s=s.concat(a),a=[]),s.push(d)):r(d)?(i=u(i,c,a),a=[],c=d):a.push(d)}if(a.length>0&&(i=u(i,c,a),c=null),l=u(l,null,s),!i)return{simple:null,relation:null,complex:e,selectorText:e};try{document.querySelector(i)}catch(t){return{simple:null,relation:null,complex:e,selectorText:e}}return{simple:i,relation:null===c?null:c.type,complex:""===l?null:l,selectorText:e}},a=function(e){try{var n=/\[-ext-([a-z-_]+)=(["'])((?:(?=(\\?))\4.)*?)\2\]/g,r=e.replace(n,t),i=l(r);return o.compile(e),i.complex&&o.compile(i.complex),i}catch(t){return"undefined"!=typeof console&&console.error&&console.error("Extended selector is invalid: "+e),null}},s=function(e){var t=[],n=document.querySelectorAll(e.simple);if(!n||!n.length)return t;for(var r=n.length;r--;){var i=n[r],u=o(e.complex,i);if(">"===e.relation)for(var l=u.length;l--;){var a=u[l];a.parentNode===i&&t.push(a)}else t=t.concat(u)}return o.uniqueSort(t)};return function(e){var t=a(e);this.compiledSelector=t,this.selectorText=null==t?null:t.selectorText,this.querySelectorAll=function(){return null===t?[]:t.simple?t.complex?s(t):document.querySelectorAll(t.simple):o(t.complex)},this.matches=function(e){return o.matchesSelector(e,t.selectorText)}}}(),l=function(r){var o,i=[],l=[],a=function(e,t){var n=e.indexOf(t,e.length-t.length);return n>=0?e.substring(0,n):e},s=function(e){for(var n=[],r=t.parseCss(e),o=r.length;o--;){var i=r[o],l=Object.create(null);l.selector=new u(i.selectors),l.style=i.style,n.push(l)}return n},c=function(e){for(var t=l.length;t--;){var n=l[t];if(n.node===e)return n}return null},f=function(e){if(!e.protectionObserver){var t=e.node,r=e.rule.style;for(var o in r)if("undefined"!=typeof t.style.getPropertyValue(o)){var i=r[o];i=a(i.trim(),"!important").trim(),t.style.setProperty(o,i,"important")}e.protectionObserver=n.protectAttribute(t,"style")}},d=function(e){e.protectionObserver&&e.protectionObserver.disconnect(),e.node.style.cssText=e.originalStyle},p=function(e){for(var t=e.selector,n=t.querySelectorAll(),r=n.length;r--;){var o=n[r],i=c(o);if(i)f(i);else{var u=o.style.cssText;i={node:o,rule:e,originalStyle:u,protectionObserver:null},f(i),l.push(i)}}return n},g=function(e){for(var t=[],n=e.length;n--;){var r=e[n],o=p(r);t=t.concat(o)}for(var i=l.length;i--;){var u=l[i];t.indexOf(u.node)===-1&&(d(u),l.splice(i,1))}},h=!1,m=0,v=function(){h&&(h=!1,g(i),m=(new Date).getTime())},y=function(){e.requestAnimationFrame?e.requestAnimationFrame(v):v()},b=function(){if(!h){h=!0;var e=(new Date).getTime()-m,t=50-e;t>0?setTimeout(function(){y()},t):y()}},x=function(){o||(o=!0,n.observeDom(b))},S=function(){g(i),x(),"complete"!==document.readyState&&document.addEventListener("DOMContentLoaded",function(){g(i)})},w=function(){o&&(n.disconnectDom(b),o=!1);for(var e=l.length;e--;){var t=l[e];d(t)}};i=s(r),this.dispose=w,this.apply=S,this.getAffectedElements=function(){return l}};return l}(window);