Registry.require(["crcrc","helper","layout/default/layout_helper"],function(){var l=Registry.get("crcrc").cr,h=Registry.get("crcrc").crc,r=Registry.get("helper"),t=Registry.get("layout/default/layout_helper").images,n=function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id,d=l("div",a.name,e,"input");d.key=a.id;var f=l("input",a.name,e,"input",!0);b=b.split("##");f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.oldvalue=a.value;f.value=void 0!=a.value?a.value:"";f.type="text";c&&!f.inserted&&f.addEventListener("change",
c);c=h("span","optiondesc",a.name,e,"s1");e=l("span",a.name,e,"s2");c.textContent=b[0]+":";1<b.length&&(e.textContent=b[1]);d.appendChild(c);d.appendChild(f);d.appendChild(e);a.enabledBy&&d.setAttribute("name","enabled_by_"+a.enabledBy);return{elem:d,input:f}},u=function(b,a,c){b=null;b=h("input","button",a.name,(a.uuid?a.uuid:"")+a.id,"bu",!0);b.name=a.name;b.uuid=a.uuid;b.key=a.id;b.type="button";b.value=a.name;b.data=a.data;b.reload=a.reload;b.ignore=a.ignore||a.reload;b.warning=a.warning;a.enabledBy&&
b.setAttribute("name","enabled_by_"+a.enabledBy);!b.inserted&&c&&b.addEventListener("click",c);return b},v=function(b,a,c,e){var d=null,d=h("input","button",b,a,"bu",!0);d.name=b;d.key=a;d.type="button";d.value=c;!d.inserted&&e&&d.addEventListener("click",e);return d},s=function(b,a){var c=(b.uuid?b.uuid:"")+b.id,e,d;if(d=b.after||b.validation)e=b.validation?"validation":"help",e=h("span",e,b.name,c,e,!0),d.imageURL&&(c=['background-image: url("'+d.imageURL+'")'],d.opacity&&c.push("opacity: "+d.opacity),
e.setAttribute("style",c.join(";"))),e&&(a&&e.addEventListener("click",a),d.msg&&e.setAttribute("title",d.msg));return e},w=function(b){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[b]||b},q=function(b,a,c,e){var d=(e.uuid?e.uuid:"")+e.id;a.title=b;(b=s({after:{imageURL:t.get("help")},name:e.name,id:d}))&&c.appendChild(b)};Registry.register("layout/default/htmlutil","0",{getInfoFromUrl:function(b){if(-1!=b.search(/\/\^?(http(s|s\?|\.\+)?|\.\*):\/\/(\.\*)*\$?\/?$/)||-1!=b.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)||
-1!=b.search(/\*:\/\/(\*\/\*|\*)*$/)||"*"==b)return{dom:"*",tld:"*"};0==b.search(/\//)&&(b=b.replace(/\([^\)]*\)[\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/\[[^\]]*\][\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/^\/|\/$|\^|\$|\\\?.*|#.*|\?|\(|\)|\+|\\|\.\*|/g,""));b=b.replace(/^\*:\/\//,"http://");0!=b.search("http")&&(b="http://"+b);b=b.split("/");if(3>b.length)return null;b=b[2].split(".");if(2>b.length)return null;var a=b[b.length-1],c=b[b.length-2];"*"!==c&&(c=c.replace(/\*/g,""));for(var e=[],d=b.length-
3;0<=d&&-1==b[d].search("\\*");d--)e.push(b[d]);return{tld:a,dom:c,subdom:e.reverse()}},safeTagsReplace:function(b){return b.replace(/[&<>]/g,w)},addClass:function(b,a){var c=b.getAttribute("class")||"";-1==c.search(RegExp("[ \t]*"+a+"[ \t]*"))&&(c=(c?c+" ":"")+a);b.setAttribute("class",c)},toggleClass:function(b,a){var c=b.getAttribute("class")||"",e=RegExp("[ \t]*"+a+"[ \t]*"),c=-1!=c.search(e)?c.replace(e,""):(c?c+" ":"")+a;b.setAttribute("class",c)},setHelp:q,createAfterIcon:s,createEnabler:function(b,
a,c,e,d,f,k){b=h("div","clickable enabler "+b,a,c,e,"wrap",!0);d&&(b.title=d);b.key=c;b.uuid=a;b.alt=" ?";b.textContent=k;f&&b.addEventListener("click",f);return b},createImage:function(b,a,c,e,d,f){e=h("img","icon16",a,c,e,!0);e.setAttribute("src",b);f&&(b=e.getAttribute("class")||"",e.setAttribute("class",b+" clickable"));d&&(e.title=d);e.key=c;e.name=a;e.alt=" ?";f&&(e.addEventListener("click",f),e.href="#");return e},createFavicon:function(b,a,c,e){var d=h("img","icon16",a,c,r.filter(e,/[a-zA-Z0-9]/g));
if(d.inserted)return d;"Array"!==r.toType(b)&&(b=[b]);a=function(){if(0!=b.length){var a=b.shift();d.setAttribute("src",a)}};d.addEventListener("error",a);a();e&&(d.title=e);d.alt=" ?";return d},createFileInput:function(b,a,c){b=h("input","import","file",null,null,!0);b.inserted||(b.type="file",c&&b.addEventListener("change",c));return b},createNamedSettings:function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id,d=h("div","settingsta",a.name,e,"named_wrapper"),f=h("div","named",a.name,e,"named_settings"),
k=[],g=l("span",a.name,e,"s1");b&&(g.textContent=b+":");a.desc&&q(a.desc,g,g,a);d.appendChild(g);d.appendChild(f);d.key=a.id;a.value.forEach(function(b){var d=h("div","",a.name+b.name,e,"named",!0),g=h("div","",a.name+b.name,e,"named_label",!0);g.textContent=b.name;d.appendChild(g);g=l("textarea",a.name+b.name,e,"textarea",!0);g.name=a.name;g.key=a.id;g.named_name=b.name;g.uuid=a.uuid;g.named=!0;g.oldvalue=b.value||"";g.value=b.value||"";c&&!g.inserted&&g.addEventListener("change",c);d.appendChild(g);
f.appendChild(d);k.push(g)});return{elem:d,textareas:k,label:g}},createTextarea:function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id,d=l("div",a.name,e,"textarea");d.key=a.id;var f=h("textarea","settingsta",a.name,e,"textarea",!0);f.name=a.name;f.key=a.id;f.uuid=a.uuid;f.array=a.array;f.oldvalue=a.value;f.value=void 0!=a.value?a.array?a.value.join("\n"):a.value:"";c&&!f.inserted&&f.addEventListener("change",c);c=l("span",a.name,e,"s1");b&&(c.textContent=b+":");a.desc&&q(a.desc,c,c,a);d.appendChild(c);d.appendChild(f);
return{elem:d,textarea:f,label:c}},createFileSelect:function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id,d=l("input",a.name,e,"file"),f=function(a){c(a.target.files)};d.inserted||(d.type="file",d.addEventListener("change",f,!1));return b?(f=l("div",a.name,e,"input"),a=l("span",a.name,e,"s1"),a.textContent=b+":",f.appendChild(a),f.appendChild(d),{elem:f,input:d}):{elem:d}},createInput:n,createColorChooser:function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id;b=n(b,a,c);var d=function(){c&&c.apply(this,arguments);
var a=(this.value.match(/[a-fA-F0-9]+/)||"")[0];a&&-1!=[3,6].indexOf(a.length)&&f.setAttribute("style","background-color: #"+a+";")};b.input.inserted||b.input.addEventListener("keyup",d);var f=h("span","color_choosed",a.name,e,"col");b.col=f;b.elem.appendChild(b.col);d.call(b.input);return b},createPassword:function(b,a,c){b=n(b,a,c);b.input.setAttribute("type","password");return b},createCheckbox:function(b,a,c){var e=(a.uuid?a.uuid:"")+a.id,d=h("div","checkbox",a.name,e,"cb1");d.key=a.id;var f=
l("input",a.name,e,"cb",!0);f.title=a.desc?a.desc:"";f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.reload=a.reload;f.warning=a.warning;f.oldvalue=a.enabled;f.checked=a.enabled;f.type="checkbox";f.valtype="boolean";c&&!f.inserted&&f.addEventListener("click",c);c=h("span","checkbox_desc",a.name,e,"cb2");c.textContent=b;a.desc&&q(a.desc,d,c,a);d.appendChild(f);d.appendChild(c);return{elem:d,input:f}},createDropDown:function(b,a,c,e,d){var f=(a.uuid?a.uuid:"")+a.id,k=l("div",a.name,f,"outer_dd");k.key=a.id;
var g=l("select",a.name,f,"dd",!0),n=!1,m;for(m in c){var p=l("option",a.name,c[m].name,"dd"+f,!0);p.textContent=r.decodeHtml(c[m].name);p.value=c[m].value;p.warning=c[m].warning;n|=!!c[m].warning;c[m].enabledBy&&p.setAttribute("name","enabled_by_"+c[m].enabledBy);a.enabler&&c[m].enable&&p.setAttribute("enables",JSON.stringify(c[m].enable));c[m].value==a.value&&(p.selected=!0);g.appendChild(p)}g.key=a.id;g.name=a.name;g.uuid=a.uuid;g.reload=a.reload;g.warning=a.warning;g.oldvalue=a.value;g.valtype=
"native";g.inserted||(e&&g.addEventListener("change",e),n&&d&&g.addEventListener("change",d));null!==b&&(c=h("span","optiondesc",a.name,f,"inner_dd"),c.textContent=b+": ",k.appendChild(c));k.appendChild(g);a.desc&&q(a.desc,k,k,a);a.enabledBy&&k.setAttribute("name","enabled_by_"+a.enabledBy);return{elem:k,select:g}},createImageButton:function(b,a,c,e,d){var f=null,k=null,g=null,f=h("button","imgbutton button",b,a,"bu",!0),k=h("div","imgbutton_container",b,a,"bu_container");k.appendChild(f);f.uuid=
b;f.key=a;g=h("img","imgbutton_image",b,a,"bu_img",!0);g.src=e;f.appendChild(g);f.setAttribute("title",c);g.setAttribute("title",c);!f.inserted&&d&&f.addEventListener("click",d);return k},createButton:function(b,a,c,e){return"Object"===r.toType(a)?u.apply(this,arguments):v.apply(this,arguments)},createPosition:function(b,a,c){for(var e=(a.uuid?a.uuid:"")+a.id,d=l("div",a.name,e,"pos1"),f=l("select",a.name,e,"pos",!0),k=1;k<=a.posof;k++){var g=l("option",a.name,e,"opt"+k);g.textContent=k;k==a.pos&&
(g.selected=!0);f.appendChild(g)}f.key=a.id;f.uuid=a.uuid;f.name=a.name;c&&!f.inserted&&f.addEventListener("change",c);a=h("span","optiondesc",a.name,e,"pos2");a.textContent=b;d.appendChild(a);d.appendChild(f);return d},createSearchBox:function(b){var a=h("div","searchbox","search_inner"),c=h("div","searchbox_mv","search_inner_mv"),e=h("input","searchbox_input","search_input"),d=h("input","searchbox_button","search_button");e.type="text";e.value=b;d.type="button";d.value="Go";var f=function(){window.location=
window.location.origin+window.location.pathname+"?url="+encodeURIComponent(e.value)};d.addEventListener("click",f);e.addEventListener("keyup",function(a){a&&13==a.keyCode&&f()});c.appendChild(e);c.appendChild(d);a.appendChild(c);return a}})});
