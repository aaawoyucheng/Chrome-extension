var insertCSS = function(style) {
    style = style.replace(/;/ig, '!important;');
    $('<style>' + style + '</style>').appendTo('head');
}
var bookmode = function(index, content, show) {
    var style = '\
    #index_content{position:fixex;height:90%;top:5%;overflow-x:hidden;opacity:0;}\
    #index_content:hover{opacity:1;}\
    #book_content{width:720px;position:absolute;text-align:justify;left:300px;top:0;overflow-x:hidden;}\
    #book_content div{max-width:720px;}\
    \
    \
    ';
    insertCSS(style);
    $(index + ' ' + show).show();
    if ($('#book_content').size() == 0) {
        $('<div id=book_content ></div>').appendTo('body');
    }
    if ($('#index_content').size() == 0) {
        $(index).attr('id', 'index_content');
        $('#index_content').find('*').css('overflow', 'visible');
        $('#index_content').css('left', function() {
            return 300 - $(this).width() + 'px';
        })
    }
    $('#index_content a').each(function() {
        if ($(this).attr('href').match('http')) {
            $(this).attr({
                'url': function() {
                    return $(this).attr('href');
                },
                'href': function() {
                    return '#' + $(this).text().replace(/\s/ig, '');
                }
            });
            $('<div id=' + $(this).attr('href').replace('#', '') + ' url=' + $(this).attr('url') + ' ></div>').appendTo('#book_content');
        }
    });
    $('#book_content div[url]').each(function(i, d) {
        if ($(d).attr('url').match('http')) {
            var url = $(d).attr('url');
            var path = url.match('http.+\/');
            console.log(url);
            $.ajax({
                url: url,
                success: function(msg) {
                    var dom = $((new DOMParser()).parseFromString(msg, 'text/html')).find(content);
                    dom.find('img').each(function() {
                        if (!/http/.exec($(this).attr('src'))) {
                            $(this).attr('src', function() {
                                return path + $(this).attr('src');
                            })
                        }
                    })
                    dom.find('a').each(function() {
                        if (!/http/.exec($(this).attr('href'))) {
                            $(this).attr('href', function() {
                                return path + $(this).attr('href');
                            })
                        }
                    })
                    $(d).html(dom);
                }
            });
        }
    });
}
var hold = function(dom, width) {
    if (dom) {
        var width = width ? width : $(dom).width();
        if (width + 40 > $(window).width()) {
            width = $(window).width() - 100;
        }
        $(dom).parents().slice(0, -2).each(function() {
            $(this).siblings().remove();
            $(this).css({
                'width': width,
                'padding': '0',
                'margin': '0',
                'border': '0',
            });
        });
        $(dom).parent().find('*').filter(function() {
            return $(this).width() >= width;
        }).css({
            'width': width,
            'padding': '0',
            'margin': '0',
            'border': '0',
        });
        insertCSS('html{background-color:#Ffffff;width:' + width + 'px;margin:auto;padding:0px 20px;border:1px solid #DDDDDD;}');
    }
}
if ($('#typo').size() == 0) {
    $('<style id=typo >@charset "utf-8";p{text-align:adjust!important;font:300 20px 微软雅黑!important}code,pre,pre tt{font-family:Courier,"Courier New",monospace;font-size:16px;}pre{display:block;padding:1em 1.5em;font:300 18px 微软雅黑!important;-webkit-overflow-scrolling:touch}html.borderbox *,html.borderbox :after,html.borderbox :before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}article,aside,blockquote,body,button,code,dd,details,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,menu,nav,section{display:block}audio,canvas,video{display:inline-block}body,button,input,select,textarea{font:300 1em/1.8 PingFang SC,Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}blockquote{position:relative;margin:1em 3em 1em 2em;padding-left:1em;border-left:1px solid #1abc9c;color:#999;font-weight:400}@media only screen and (max-width:640px){blockquote{margin:1em 0}}abbr,acronym{border-bottom:1px dotted;font-variant:normal}abbr{cursor:help}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-weight:400;font-style:normal}ol,ul{list-style:none}caption,th{text-align:left}q:after,q:before{content:""}sub,sup{position:relative;font-size:75%;line-height:0}:root sub,:root sup{vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a{color:#1abc9c}a:hover{text-decoration:underline}.typo a{border-bottom:1px solid #1abc9c}.typo a:hover{color:#555;text-decoration:none;border-bottom-color:#555}a,ins{text-decoration:none}.typo-u,u{text-decoration:underline}mark{margin:0 5px;padding:2px;border-bottom:1px solid #ffedce;background:#fffdd1}hr{margin-bottom:.8em;height:10px;border:none;border-bottom:1px solid #cfcfcf}.typo-small,figcaption,small{color:#888;font-size:.9em}b,strong{color:#000;font-weight:700}[draggable]{cursor:move}.clearfix:after,.clearfix:before{display:table;content:""}.clearfix:after{clear:both}.clearfix{zoom:1}.textwrap,.textwrap td,.textwrap th{word-wrap:break-word;word-break:break-all}.textwrap-table{table-layout:fixed}.serif{font-family:Palatino,Optima,Georgia,serif}.typo dl,.typo form,.typo hr,.typo ol,.typo p,.typo pre,.typo table,.typo ul,.typo-dl,.typo-form,.typo-hr,.typo-ol,.typo-p,.typo-pre,.typo-table,.typo-ul,blockquote{margin-bottom:1.2em}h1,h2,h3,h4,h5,h6{color:#000;font-weight:100;font-family:PingFang SC,Verdana,Helvetica Neue,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif;line-height:1.35}.typo h1,.typo h2,.typo h3,.typo h4,.typo h5,.typo h6,.typo-h1,.typo-h2,.typo-h3,.typo-h4,.typo-h5,.typo-h6{margin-top:1.2em;margin-bottom:.6em;line-height:1.35}.typo h1,.typo-h1{font-size:2em}.typo h2,.typo-h2{font-size:1.8em}.typo h3,.typo-h3{font-size:1.6em}.typo h4,.typo-h4{font-size:1.4em}.typo h5,.typo h6,.typo-h5,.typo-h6{font-size:1.2em}.typo ul,.typo-ul{margin-left:1.3em;list-style:disc}.typo ol,.typo-ol{margin-left:1.9em;list-style:decimal}.typo li ol,.typo li ul,.typo-ol ol,.typo-ol ul,.typo-ul ol,.typo-ul ul{margin-bottom:.8em;margin-left:2em}.typo li ul,.typo-ol ul,.typo-ul ul{list-style:circle}.typo table caption,.typo table td,.typo table th,.typo-table td,.typo-table th{padding:.5em 1em;border:1px solid #ddd;color:#666}.typo table th,.typo-table th{background:#fbfbfb}.typo table thead th,.typo-table thead th{background:#f1f1f1}.typo table caption{border-bottom:none}.typo-input,.typo-textarea{border-radius:0;-webkit-appearance:none}.typo em,.typo-em,caption,legend{color:#000;font-weight:inherit}.typo-em{position:relative}.typo-em:after{position:absolute;top:.65em;left:0;overflow:hidden;width:100%;white-space:nowrap}.typo img{max-width:100%}</style>').appendTo('head');
}
