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
        "#imgDelete{position: fixed; top: 130px; right: 30px; width: 100px; height: 100px; background: rgba(255, 0, 0, 0); z-index: 1001; box-shadow: 0 0 10px rgba(204,204,204,0.5); line-height: 66px;}" +
        "#showBig{z-index: 999;top: 0px; left: 0; position: fixed; width: 100%; height: 100%;background: rgba(0, 0, 0, 0.9);}" +
        "#showBig img{height: 100%; display: block; margin: auto;}" +
        ".currentImg{position: fixed; height: 100%; max-width: 100%; z-index: 1000; top: 0; left: 0; right: 0; margin: auto;}" +
        ".fordel{border: 5px red solid;}" +
        "div#imgNext {position: fixed; bottom: 10px; left: 10px;;width:120px;z-index: 1000;}" +
        "div#imgPre {position: fixed; top: 10px; left: 10px;width:120px;z-index: 1000;}" +
        "div#imgNext img,div#imgPre img{ max-width: 100px;max-height: 100px; margin: 10px ;opacity:0.5;}" +
        "#imgControll{z-index: 1000; position: fixed; top: 10px; right: 30px; width: 100px; height: 100px; background: rgba(24,24,24,0); box-shadow: 0 0 10px rgba(204, 204, 204, 0.5); line-height: 50px;}";
    $('.xpictureCss').remove();
    $('<style class=xpictureCss >' + cssText + '</style>').appendTo('head');
    var title = match.title != '' ? $(match.title).text() : document.title;
    imgContent.html('<div id="imgContent_title" >' + title + '</div>');
    // changeShow();
    imagesInit();
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
        var img = $('<img class=display_img src=' + src + ' />');
        img.appendTo('#imgContent');
    });

};
var imgControllInit = function() {
    $('#imgControll').remove();
    $('<div id=imgControll ><div id=info ></div></div>').appendTo('#imgContent');
    total = $('#imgContent .display_img').size() - 1;
    current = 0;
    var setCurrent = function() {
        $('#imgContent .display_img').filter(function(index) {
            if ($(this).hasClass('currentImg')) {
                current = index;
                return true;
            }
        });
        total = $('#imgContent .display_img').size() - 1;
    };
    var getCurrentImg = function() {
        return $($('#imgContent .display_img')[current]);
    };
    var showCurrent = function() {
        $('#info').text((current + 1) + ' / ' + (total + 1));
    };
    var showBig = function() {
        if ($('#showBig').size() == 0) {
            $('<div id=showBig></div>').appendTo('#imgContent');
        }
        $('.currentImg').removeClass('currentImg');
        getCurrentImg().addClass('currentImg');
    };
    var imgDeleteInit = function() {
        if ($('#imgDelete').size() == 0) {
            $('<div id=imgDelete>Delete</div>').appendTo('#showBig');
        }
        $('#imgDelete').click(function() {
            $('.fordel').remove();
            total = $('#imgContent .display_img').size() - 1;
            if (current > total) {
                current = 0;
            }
            showCurrent();
            showBig();
        });
    };
    var showCurrentNormol = function() {
        window.onmousewheel = function(e) {
            $('#imgContent .display_img').filter(function(index) {
                var top = $(this).offset().top;
                var bottom = $(this).offset().top + $(this).height();
                // console.log(top,bottom,e.pageY);
                if (top < e.pageY && bottom > e.pageY) {
                    current = index;
                    return true;
                }
            });
            showCurrent();
        };

    };
    var getImgSrc = function(i) {
        if (i < 0) {
            i = total + i;
        } else if (i > total) {
            i = i - total - 1;
        }
        return $('#imgContent .display_img')[i].src;
    };
    var imgListInit = function() {
        if ($('#imgPre').size() == 0) {
            $('<div id=imgPre ></div>').appendTo('#imgControll');
        }
        $('#imgPre').html('');
        if ($('#imgNext').size() == 0) {
            $('<div id=imgNext ></div>').appendTo('#imgControll');
        }
        $('#imgNext').html('');
        for (var i = -2; i <= 2; i++) {
            var dst = current + i;
            if (dst > total) {
                dst = dst - total - 1;
            } else if (dst < 0) {
                dst = total + 1 + dst;
            }
            var img = $('<img src="' + getImgSrc(dst) + '" alt="" />');
            if ($($('.display_img')[dst]).hasClass('fordel')) {
                img.addClass('fordel');
            }
            if (i < 0) {
                $('#imgPre').append(img);
            } else if (i > 0) {
                $('#imgNext').append(img);
            }
        }
    };
    showCurrentNormol();
    $('#imgContent .display_img').click(function() {
        if ($(this).hasClass('fordel')) {
            $(this).removeClass('fordel');
        } else {
            $(this).addClass('fordel');
        }
    });
    $('#imgContent .display_img').mouseenter(function() {
        img = $(this);
        img.addClass('currentImg');
        setCurrent();
        showCurrent();
        showBig();
        window.onmousewheel = function(e) {
            if (e.wheelDelta < 0) {
                current++;
            } else {
                current--;
            }
            if (current > total) {
                current = 0;
            } else if (current < 0) {
                current = total;
            }
            showCurrent();
            showBig();
            imgListInit();
        };
        imgDeleteInit();
        imgListInit();
    });
    $('#imgControll').mouseenter(function() {
        $('#showBig,#imgNext,#imgPre').remove();
        $('.currentImg').removeClass('currentImg');
        $(window).scrollTop(getCurrentImg().offset().top);
        showCurrentNormol();
    });
    $('#imgControll').click(function() {
        $('#imgContent .display_img').off('mouseenter');
        $(this).remove();
        imgContent.siblings().remove();
    });
}

imgContentInit();
imgControllInit();
