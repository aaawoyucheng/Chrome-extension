//初始化$('#imgcontent')
(function() {
    if ($('#imgcontent').size() == 0) {
        $('<div id="imgcontent" ></div>').appendTo('body');
    }
    $('<style class=xpictureCss >\
    #imgcontent{background:#fcfcfe;text-align: center;padding:1px 24px;margin: auto;width: 720px;position: absolute;top: 0;right: 0;left: 0}\
    #imgcontent_title{border:none;font-weight:bold;line-height:  30px;font-size:21px;padding:20px 0px;border-bottom: 1px solid rgba(233, 230, 232, 0.37)}\
    .display_none{display:none!important}\
    .display_img{width: 720px;margin: 20px auto;border-radius: 8px;background: black}\
    .display_img img{max-width: 720px;display: block;margin:auto}\
    </style>').appendTo('head');
    $('#imgcontent').html('<div id="imgcontent_title" >' + document.title + '</div>');
})();
var total = 1;

function addImage(obj) {
    console.log(obj);
    if (obj.tagName == "IMG") {
        var img = $("<img src=" + obj.src + " />");
    } else if (typeof obj == 'string' & obj != '') {
        var img = $('<img src=' + obj + ' />');
    }
    if (typeof img == "object") {
        console.log();
        if (img[0].naturalWidth >= 720) {
            img.css('border-radius', '5px');
        }
        $("<div class='display_img'></div>")
            .append(img)
            .appendTo('#imgcontent');
        // $("<div style=''>picture:" + total + "</div>")
        //     .appendTo('#imgcontent');
        total++;
    }
}
if (/ /.exec(document.URL) != null) {
    $('body img').each(function(i, o) {
        if (o.naturalWidth > 200) addImage(o);
    })
}else if (/duitang.com/.exec(document.URL) != null) {
    $('.j .mbpho .a img').each(function(i, o) {
       addImage(o.src.replace(/thumb.+?\./,''));
    })
} else {
    $('body img').each(function(i, o) {
        if (o.naturalWidth > 200) addImage(o);
    })
}
$('#imgcontent').siblings().addClass('display_none');
