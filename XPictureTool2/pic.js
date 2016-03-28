//初始化$('#imgcontent')
(function() {
    if ($('#imgcontent').size() == 0)
        $('<div id=imgcontent></div>').appendTo($('body'));
    $('#imgcontent').css({
            'background': '#fcfcfe',
            'text-align': 'center',
            'padding': ' 1px 12px',
            'margin': 'auto',
            'width': '720px',
            'position': 'absolute',
            'top': '0',
            'right': '0',
            'left': '0'

        })
        .html("<div id=imgcontent_title style='border:none;font-weight:bold;line-height:  30px;font-size:21px;padding:20px 0px;border-bottom: 1px solid rgba(233, 230, 232, 0.37)'>" + document.title + "</div>");
})();
$('<style>.display_none{display:none}</style>').appendTo($('head'))

function insert2imgcontent(obj) {
    console.log(obj);
    if (obj.tagName == "IMG") {
        var img = $("<img src=" + obj.src + " />");
    } else if (typeof obj == 'string') {
        var img = $('<img src=' + obj + ' />');
    }
    if (typeof img == "object") {
        img.css({
            'border-radius': '5px',
            'max-width': '640px'
        });
        $("<div></div>")
            .css({
                'width': '640px',
                'margin': '20px auto',
                'border-radius': '8px',
                'background': 'black'
            })
            .append(img)
            .appendTo($('#imgcontent'));
    }
}
if (/[repaik].+thread/.exec(document.URL) != null) {
    $('.favatar').remove()
    $('body img').each(function(i, o) {
        if ($(o).width() > 200) insert2imgcontent(o);
    })
    $('#imgcontent').siblings().addClass('display_none');
} else if (/pan.+s/.exec(document.URL) != null) {
    $('div[data-extname=jpg] [data-thumb]').each(function(i, o) {
        insert2imgcontent($(o).data('thumb').replace(/size=.+&/, 'size=c9999_u9999&'));
    })
    $('*').css('overflow', 'auto');
    $('#imgcontent').siblings().addClass('display_none');
} else if (/file/.exec(document.URL) != null) {
    var html = '<style>img{max-width:640px;display:block;margin:auto;}</style>';
    var links = document.links;
    for (var i = 3; i < links.length; i++) {
        html += '<img src=' + links[i].href + ' alt=none /><br>';
    }
    document.body.innerHTML = html;
} else if (/test/.exec(document.URL) != null) {
    $('#imgcontent').siblings().addClass('display_none');
} else {
    $('body img').each(function(i, o) {
        if ($(o).width() > 200) insert2imgcontent(o);
    })
    $('#imgcontent').siblings().addClass('display_none');
}
