var showOnly = function(dom) {
    $(dom).siblings().hide();
    $(dom).parents().siblings().hide();
    $(dom).parents().css('max-width', $(dom).width() + 'px');
    $(dom).css('margin', 'auto');
    $(dom).parents().css('margin', 'auto');
}
var del = function(dom) {
    $(dom).remove();
}
var cssInsert = function(style) {
    $("<style>" + style + "</style>").appendTo('head')
}
if (document.URL.match('http://tieba.baidu.com/')) {
    cssInsert('#j_core_title_wrap{position:static!important;}');
    showOnly('#container');
    del('.right_section,.card_top_wrap,#tb_nav,.d_author,#tb_rich_poster_container,#footer,.share_btn_wrapper');
    $('.d_post_content').css('font-size', '18px');
    $('.pb_content,.content,#container,.wrap2,#thread_theme_5,#thread_theme_7,.pb_footer,.wrap1').width(740);
    $('.core_reply,.core_reply_tail,.j_lzl_container,.p_content').width(700);
}
