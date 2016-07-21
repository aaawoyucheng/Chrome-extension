if (!$('#customCSS')[0]) {
    var customstyle = '#lightareoff{width:100%;height:100%;left:0;top:0;position:fixed;opacity:0.8;z-index:99999;background:undefined}';
    customstyle += '.flashplayer{width:100%!important;height:100%!important;position:fixed!important;top:0!important;bottom:0!important;left:0!important;right:0!important;margin:auto!important;z-index:100000!important}';
    $('<style id=customCSS >' + customstyle + '</style>').appendTo('head');
}
var dom = $('body').find('*').filter(function(index) {
    return $(this).attr('type') == "application/x-shockwave-flash";
})[0];
if (dom) {
    dom = $(dom);

    function show() {
        $('<div id=lightareoff ></div>').appendTo('body');
        $('#lightareoff').click(hide);
        $('body').css('overflow', 'hidden');
        dom.addClass('flashplayer');
    }

    function hide() {
        $('#lightareoff').remove();
        $('body').css('overflow', 'auto');
        dom.removeClass('flashplayer');
    }

    if ($('#lightareoff').size() == 0) {
        show();
    } else {
        hide();
    }
}
