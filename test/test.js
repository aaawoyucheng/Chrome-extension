var title = $('h3[title]').attr('title');
title = title.replace('回复：', '') + '_' + (window.location.href.match(/pn=(\d+)/) != null ? window.location.href.match(/pn=(\d+)/)[1] : 1);
document.title = title;
$('h3[title]').text(title);
$('#tb_nav,#tofrs_up,.right_section,.tbui_aside_float_bar,#com_userbar,#head,.card_top_wrap,.d_author,#tb_rich_poster_container,#footer').remove();
$('<style>#j_core_title_wrap{position:inherit!important}</style>').appendTo('head');
var doms = $('*').filter(function() {
    return $(this).width() >= 740
}).width(740).css({
    'margin': 'auto',
    'padding': 'none',
    // 'border':'none',
});
$('img.BDE_Image').each(function() {
    try {
        console.log(this);
        $(this).attr('src', function() {
            var pic = this.src.match(/([a-z0-9A-Z]+\.jpg)/)[1];
            console.log(pic);
            return 'http://imgsrc.baidu.com/forum/pic/item/' + pic;
        }).removeAttr('width').removeAttr('height').css('max-width', '700px');
    } finally {
    $('.d_post_content_main').width(705);
    $('.j_lzl_container').width(690);

    }
});
