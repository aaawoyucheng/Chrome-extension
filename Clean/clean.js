if (document.URL.match('http://tieba.baidu.com/')) {
    var title = $('.core_title_txt').attr('title').replace(/回复：/, '');
    var p = location.search.match(/pn=(\d+)/);
    if (p != null) {
        title += p[1];
    } else if ($('.l_pager a').length > 0) {
        title += 1;
    }
    $('.core_title_txt').html(title);
    document.title = title;
    cssInsert('#j_core_title_wrap{position:static!important;}');
    $('#container').showOnly('600px');
    $('.d_post_content_main').single();
    $('.d_post_content_main').css('max-width', '565px');
    $('.pb_content').css('border-left', '1px solid #e5e5e5');
    $('#thread_theme_5,#tb_nav,.card_top_wrap.clearfix.card_top_theme2,.right_section,.pb_footer ').remove();
}
