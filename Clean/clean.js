if (document.URL.match('lengxiaohua')) {
    document.title = $('.title').text();
    $('.left_wrap').parents().slice(0, -2).siblings().remove();
    $('.right_wrap,.nav_wrap').remove();
}
if (document.URL.match('jikexueyuan')) {
    if ($('.head-catalog li').size() > 0) {
        document.title = $('.head-catalog li').last().text();
    }
    $('.detail-wrapper').css('padding', '0');
    $('.detail-left,.detail-headfix,#jkcomments').remove();
}
if (document.URL.match('http://tieba.baidu.com/')) {
    $('#j_p_postlist').parents().slice(0,-2).siblings().remove();
    $('.d_author,.j_lzl_wrapper,.thread_recommend ,.share_btn_wrapper').remove();
}
