$.fn.clean=function(){
    var max_width=$(this).width();
    var p=$(this).parents();
    p.siblings().hide();
    p.css('max-width',max_width+'px');
    $(this).siblings().hide();
}