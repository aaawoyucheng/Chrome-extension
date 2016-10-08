$.fn.insert2head = function() {
    $(this).appendTo('head');
}
$.fn.showOnly = function(maxWidth) {
    var dom = $(this);
    var maxWidth = maxWidth||$(this).width() + 'px';
    dom.siblings().hide();
    dom.css('margin', 'auto');
    dom.parents().each(function() {
        var dom2 = $(this);
        dom2.siblings().hide();
        dom2.css('max-width', maxWidth);
        if (dom2.css('min-width').replace('px', '') > maxWidth.replace('px', '')) {
            dom2.css('min-width', maxWidth);
        }
        dom2.css('margin', 'auto');
    });
    $('*').css('max-width', maxWidth);
}
$.fn.single = function(maxWidth) {
    var dom = $(this);
    var maxWidth =maxWidth|| $(this).width() + 'px';
    dom.siblings().hide();
    dom.css('margin', 'auto');
    var dom2 = dom.parent();
    dom2.css('max-width', maxWidth);
    if (dom2.css('min-width').replace('px', '') > maxWidth.replace('px', '')) {
        dom2.css('min-width', maxWidth);
    }
    dom2.css('margin', 'auto');
}
$.fn.log = function() {
    console.log(this);
}
var del = function(dom) {
    $(dom).remove();
}
var cssInsert = function(style) {
    $("<style>" + style + "</style>").insert2head();
}
var GM_addStyle=function(css){
    $('<style>'+css+'</style>').appendTo('head');
}