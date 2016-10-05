console.clear();
var matched = {
    '': {
        title: '',
        selector: '',
        parent: '',
        src: function(src) {
            return src.replace(/ /, '');
        }
    },
    'http://www.87dm.com/': {
        title: '',
        selector: '',
        parent: '#newsmain .content_box .content_text',
        src: function(src) {
            return src.replace(/ /, '');
        }
    },
    'http://www.gaonengfun.com/show/': {
        title: '.channel .title',
        selector: '',
        parent: '.row .detail',
        src: function(src) {
            return src.replace(/ /, '');
        }
    },
    'www.diyidan.com/main/post/': {
        title: '',
        selector: '',
        parent: '.user_post_content,.post_content_img',
        src: function(src) {
            return src.replace(/!webmedium/, '');
        }
    },
}
var match;
for (var i in matched) {
    if (window.location.href.match(i) != null) {
        match = matched[i];
    }
}
console.log(match);
var changeShow = function() {
    imgContent = $('#imgContent');
    if (imgContent.siblings().hasClass('display_none')) {
        imgContent.addClass('display_none');
        imgContent.siblings().removeClass('display_none');
    } else {
        imgContent.siblings().addClass('display_none');
        imgContent.removeClass('display_none');
    }
};
var imgContentInit = function() {
    if ($('#imgContent').size() == 0) {
        $('<div id="imgContent" ></div>').appendTo('body');
        changeShow();
    }
    imgContent = $('#imgContent');
    var cssText =
        "#imgContent{background:#fcfcfe;text-align: center;margin: auto;width: 720px;position: absolute;top: 0;right: 0;left: 0;box-shadow: 0 0 8px #e2e2e2;}" +
        "#imgContent_title{border: none; font-weight: bold; line-height: 30px; font-size: 21px; padding: 20px 0px; margin: 0 20px; border-bottom: 1px solid rgba(233, 230, 232, 0.37);}" +
        ".display_none{display:none!important}" +
        ".display_img{max-width: 680px;max-height:100%;display: block;margin: 20px auto;border-radius: 8px;box-shadow: 0 0 8px #ccc;}" +
        "#imgShow{z-index: 999;top: 0px; left: 0; position: fixed; width: 100%; height: 100%;background: rgba(0, 0, 0, 0.9);}" +
        "#imgShow img{max-height: 100%; display: block; margin: auto;}" +
        "#imgControll{z-index: 1000; position: fixed; top: 0; right: 10px; width: 300px; height: 100%; background: rgb(241, 241, 242); box-shadow: 0px 0px 10px #ccc; line-height: 40px;}" +
        "#imgControll:hover{background: rgba(24,24,24,0); box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);}";
    $('.xpictureCss').remove();
    $('<style class=xpictureCss >' + cssText + '</style>').appendTo('head');
    var title = match.title != '' ? $(match.title).text() : document.title;
    imgContent.html('<div id="imgContent_title" >' + title + '</div>');
    // changeShow();
};
var imagesInit = function() {
    var selector;
    if (match.selector != '') {
        selector = $(match.selector);
    } else if (match.parent != '') {
        selector = $(match.parent).find('img');
    } else {
        selector = $('body img');
    }
    selector.each(function() {
        var c = new Array();
        $(this).parents().each(function() {
            var id = $(this).attr('id') ? $(this).attr('id') : '';
            if (id != '') {
                c.push('#' + id);
            } else {
                id = $(this).attr('class') ? $(this).attr('class') : '';
                if (id != '') {
                    c.push('.' + id.replace(/ /i, '.'));
                }
            }
        });
        c = c.reverse().join(' ');
        console.log('parent:' + c);
        var src = match.src(this.src)
            // console.log(this.naturalWidth);
        var img = $('<img class=display_img src=' + src + ' />');
        img.appendTo('#imgContent');
        // $("<div style=''>picture:" + total + "</div>")
        //     .appendTo('#imgContent');
    });

};
var imageControllerInit = function() {
    $('#imgControll').remove();
    $('<div id=imgControll ></div>').appendTo('#imgContent');
    pic = {
        total: $('#imgContent img').size() - 2,
        current: 0
    };
    var getCurrent = function() {
        $('#imgContent img').filter(function(index) {
            var len = $(this).offset().top - $(document).scrollTop();
            if (0 < len && len < $(window).height() / 2) {
                pic.current = index;
                return true;
            }
        });
    }
    var showBig = function() {
        $('#imgShow img').attr('src', $('#imgContent img')[pic.current].src);
        $('#imgControll').text((pic.current + 1) + ' / ' + (pic.total + 1));
    }
    $('#imgControll').hover(function() {
        $('<div id=imgShow><img></div>').appendTo('#imgContent');
        window.onmousewheel = function(e) {
            if (e.wheelDelta < 0) {
                pic.current++;
            } else {
                pic.current--;
            }
            if (pic.current > pic.total) {
                pic.current = 0;
            } else if (pic.current < 0) {
                pic.current = pic.total;
            }
            $(window).scrollTop($($('#imgContent img')[pic.current]).offset().top);
            showBig();
        };
        getCurrent();
        showBig();

    }, function() {
        window.onmousewheel = function() {
            getCurrent();
            showBig();
        };
        $('#imgShow').remove();
        $(window).scrollTop($($('#imgContent img')[pic.current]).offset().top);
    });
}
imgContentInit();
imagesInit();
imageControllerInit();
imgContent.siblings().remove();
