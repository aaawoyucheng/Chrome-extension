function dl(ml, mi) {
    mi = mi.replace('&lt;', '<');
    mi = mi.replace('&#62;', '>');
    mi = mi.replace('&#38;', '&');
    var ot = "";
    for (var j = 0; j < mi.length; j++) ot += String.fromCharCode(ml[mi.charCodeAt(j) - 48]);
    location.href = ot;
    // console.log(ot);
}
