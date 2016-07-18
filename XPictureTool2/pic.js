//初始化$('#imgcontent')
var init = function() {
    if ($('#imgcontent').size() == 0) {
        $('<div id=imgcontent style="background:#fcfcfe;text-align: center;padding:1px 24px;margin: auto;width: 720px;position: absolute;top: 0;right: 0;left: 0" ></div>').appendTo('body');
        $('<style>.display_none{display:none}</style>').appendTo('head');
        $('<style>.display_img{width: 720px;margin: 20px auto;border-radius: 8px;background: black}</style>').appendTo('head');
    }
    $('#imgcontent').html("<div id=imgcontent_title style='border:none;font-weight:bold;line-height:  30px;font-size:21px;padding:20px 0px;border-bottom: 1px solid rgba(233, 230, 232, 0.37)'>" + document.title + "</div>");
}
init();
var total = 1;

function addImage(obj) {
    console.log(obj);
    if (obj.tagName == "IMG") {
        var img = $("<img src=" + obj.src + " />");
    } else if (typeof obj == 'string' & obj != '') {
        var img = $('<img src=' + obj + ' />');
    }
    if (typeof img == "object") {
        img.css({
            'border-radius': '5px',
            'max-width': '720px',
            'display': 'block',
            'margin':'auto'
        });
        $("<div class='display_img'></div>")
            .append(img)
            .appendTo('#imgcontent');
        // $("<div style=''>picture:" + total + "</div>")
        //     .appendTo('#imgcontent');
        total++;
    }
}
if (/[repaik].+thread/.exec(document.URL) != null) {
    $('.favatar').remove()
    $('body img').each(function(i, o) {
        if ($(o).width() > 200) addImage(o);
    })
    $('#imgcontent').siblings().addClass('display_none');
} else if (/pan.+s/.exec(document.URL) != null) {
    $('div[data-extname=jpg] [data-thumb]').each(function(i, o) {
        addImage($(o).data('thumb').replace(/size=.+&/, 'size=c9999_u9999&'));
    })
    $('*').css('overflow', 'auto');
    $('#imgcontent').siblings().addClass('display_none');
} else if (/file/.exec(document.URL) != null) {
    var html = '<style>img{max-width:720px;display:block;margin:auto;}</style>';
    var links = document.links;
    for (var i = 3; i < links.length; i++) {
        html += '<img src=' + links[i].href + ' alt=none /><br>';
    }
    document.body.innerHTML = html;
} else if (/test/.exec(document.URL) != null) {
    $('#imgcontent').siblings().addClass('display_none');
} else if (/u17.com/.exec(document.URL) != null) {
    $('.square_pic').each(function() {
        var url = this.src.replace('square.', '');
        console.log(url);
        if (url != '') {
            addImage(url);
        } else {
            addImage($(this).attr('name').replace('square.', ''));
        }
    });
    $('#imgcontent').siblings().addClass('display_none');
} else if (/itbbs.pconline/.exec(document.URL) != null) {
    $('.topiccontent img').each(function(i, o) {
        $(o).attr('src', function() {
            return $(o).attr('src').replace(/_\d+x\d+/, '');
        });
        $('#Jguide').remove();
        addImage(o);
    })
    $('#imgcontent').siblings().addClass('display_none');
} else {
    $('body img').each(function(i, o) {
        if ($(o).width() > 200) addImage(o);
    })
    $('#imgcontent').siblings().addClass('display_none');
}
