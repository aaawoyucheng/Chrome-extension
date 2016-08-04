$.fn.clean=function(){
    var max_width=$(this).width();
    $(this).siblings().hide();
    $(this).parents().siblings().hide();
    $(this).parents().css('cssText',function(){return 'max-width:'+max_width+'px!important'});
    $(this).parents().css('cssText',function(){return 'background:white!important'});
}