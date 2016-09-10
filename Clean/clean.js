if (document.URL.match('http://tieba.baidu.com/')) {
    $('#container').showOnly('600px');
    $('.d_post_content_main').single();
    $('.d_post_content_main').css('max-width', '565px');
    $('.pb_content').css('border-left', '1px solid #e5e5e5');
    $('#thread_theme_5,#tb_nav,.card_top_wrap.clearfix.card_top_theme2,.right_section,.pb_footer,.plat_head,.p_mtail ').remove();
}
