(function(){var n={encode:function(a){return window.unescape(window.encodeURIComponent(a))},decode:function(a){return window.decodeURIComponent(window.escape(a))}},u=function(){return function(a){function g(a,d){var c,e,b,f,g;b=a&2147483648;f=d&2147483648;c=a&1073741824;e=d&1073741824;g=(a&1073741823)+(d&1073741823);return c&e?g^2147483648^b^f:c|e?g&1073741824?g^3221225472^b^f:g^1073741824^b^f:g^b^f}function h(a,b,d,c,e,f,h){a=g(a,g(g(b&d|~b&c,e),h));return g(a<<f|a>>>32-f,b)}function k(a,b,d,c,e,
f,h){a=g(a,g(g(b&c|d&~c,e),h));return g(a<<f|a>>>32-f,b)}function l(a,b,c,d,e,f,h){a=g(a,g(g(b^c^d,e),h));return g(a<<f|a>>>32-f,b)}function m(a,b,c,d,e,f,h){a=g(a,g(g(c^(b|~d),e),h));return g(a<<f|a>>>32-f,b)}function p(a){var b="",c="",d;for(d=0;3>=d;d++)c=a>>>8*d&255,c="0"+c.toString(16),b+=c.substr(c.length-2,2);return b}var f=[],q,r,s,t,d,c,e,b;a=function(a){a=a.replace(/\r\n/g,"\n");return n.encode(a)}(a);f=function(a){var b,c=a.length;b=c+8;for(var d=16*((b-b%64)/64+1),e=Array(d-1),f=0,g=0;g<
c;)b=(g-g%4)/4,f=g%4*8,e[b]|=a.charCodeAt(g)<<f,g++;b=(g-g%4)/4;e[b]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(a);d=1732584193;c=4023233417;e=2562383102;b=271733878;for(a=0;a<f.length;a+=16)q=d,r=c,s=e,t=b,d=h(d,c,e,b,f[a+0],7,3614090360),b=h(b,d,c,e,f[a+1],12,3905402710),e=h(e,b,d,c,f[a+2],17,606105819),c=h(c,e,b,d,f[a+3],22,3250441966),d=h(d,c,e,b,f[a+4],7,4118548399),b=h(b,d,c,e,f[a+5],12,1200080426),e=h(e,b,d,c,f[a+6],17,2821735955),c=h(c,e,b,d,f[a+7],22,4249261313),d=h(d,c,e,b,f[a+8],7,
1770035416),b=h(b,d,c,e,f[a+9],12,2336552879),e=h(e,b,d,c,f[a+10],17,4294925233),c=h(c,e,b,d,f[a+11],22,2304563134),d=h(d,c,e,b,f[a+12],7,1804603682),b=h(b,d,c,e,f[a+13],12,4254626195),e=h(e,b,d,c,f[a+14],17,2792965006),c=h(c,e,b,d,f[a+15],22,1236535329),d=k(d,c,e,b,f[a+1],5,4129170786),b=k(b,d,c,e,f[a+6],9,3225465664),e=k(e,b,d,c,f[a+11],14,643717713),c=k(c,e,b,d,f[a+0],20,3921069994),d=k(d,c,e,b,f[a+5],5,3593408605),b=k(b,d,c,e,f[a+10],9,38016083),e=k(e,b,d,c,f[a+15],14,3634488961),c=k(c,e,b,d,
f[a+4],20,3889429448),d=k(d,c,e,b,f[a+9],5,568446438),b=k(b,d,c,e,f[a+14],9,3275163606),e=k(e,b,d,c,f[a+3],14,4107603335),c=k(c,e,b,d,f[a+8],20,1163531501),d=k(d,c,e,b,f[a+13],5,2850285829),b=k(b,d,c,e,f[a+2],9,4243563512),e=k(e,b,d,c,f[a+7],14,1735328473),c=k(c,e,b,d,f[a+12],20,2368359562),d=l(d,c,e,b,f[a+5],4,4294588738),b=l(b,d,c,e,f[a+8],11,2272392833),e=l(e,b,d,c,f[a+11],16,1839030562),c=l(c,e,b,d,f[a+14],23,4259657740),d=l(d,c,e,b,f[a+1],4,2763975236),b=l(b,d,c,e,f[a+4],11,1272893353),e=l(e,
b,d,c,f[a+7],16,4139469664),c=l(c,e,b,d,f[a+10],23,3200236656),d=l(d,c,e,b,f[a+13],4,681279174),b=l(b,d,c,e,f[a+0],11,3936430074),e=l(e,b,d,c,f[a+3],16,3572445317),c=l(c,e,b,d,f[a+6],23,76029189),d=l(d,c,e,b,f[a+9],4,3654602809),b=l(b,d,c,e,f[a+12],11,3873151461),e=l(e,b,d,c,f[a+15],16,530742520),c=l(c,e,b,d,f[a+2],23,3299628645),d=m(d,c,e,b,f[a+0],6,4096336452),b=m(b,d,c,e,f[a+7],10,1126891415),e=m(e,b,d,c,f[a+14],15,2878612391),c=m(c,e,b,d,f[a+5],21,4237533241),d=m(d,c,e,b,f[a+12],6,1700485571),
b=m(b,d,c,e,f[a+3],10,2399980690),e=m(e,b,d,c,f[a+10],15,4293915773),c=m(c,e,b,d,f[a+1],21,2240044497),d=m(d,c,e,b,f[a+8],6,1873313359),b=m(b,d,c,e,f[a+15],10,4264355552),e=m(e,b,d,c,f[a+6],15,2734768916),c=m(c,e,b,d,f[a+13],21,1309151649),d=m(d,c,e,b,f[a+4],6,4149444226),b=m(b,d,c,e,f[a+11],10,3174756917),e=m(e,b,d,c,f[a+2],15,718787259),c=m(c,e,b,d,f[a+9],21,3951481745),d=g(d,q),c=g(c,r),e=g(e,s),b=g(b,t);return(p(d)+p(c)+p(e)+p(b)).toLowerCase()}}();Registry.register("convert","229",
{UTF8:n,Base64:{encode:function(a){for(var g="",h=0;h<a.length;h++)g+=String.fromCharCode(a.charCodeAt(h)&255);return window.btoa(g)},decode:function(a){return window.atob(a)}},encode:function(a){return window.escape(a)},decode:function(a){return window.unescape(a)},encodeR:function(a){return a},decodeR:function(a){return a},encodeS:function(a){return window.btoa(n.encode(a))},decodeS:function(a){return n.decode(window.atob(a))},MD5:u,arrbuf2str:function(a,g){try{for(var h=new Uint8Array(a),k="",
l=0;l<h.length;l+=32687)k+=String.fromCharCode.apply(null,h.subarray(l,l+32687));"UTF-8"==g&&(k=n.decode(k));return k}catch(m){}return null}})})();
