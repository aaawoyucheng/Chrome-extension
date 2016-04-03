info='.tminfo,.upinfo,.v-title-info';
$('.v-title').parents().slice(0, 3).css('padding','0');
$('.player-wrapper').css('padding','0');
$('.main-inner,.scontent,.player').width(1200);
$('.player').height(600);
$('.player-wrapper').css({
    background:'none',
    border:'none'
})
$('body').scrollTop($('.main-inner').offset().top);
$(info).hide();