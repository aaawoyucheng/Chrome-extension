GM_addStyle('.xx{z-index:99999;float: right; height: 10px; width: 10px;}');
GM_addStyle('.fordel{border:1px red solid}');
GM_addStyle('.fordel2{display:none!important}');
GM_addStyle('#cancel{z-index:99999;line-height: 50px; position: fixed; width: 50px; height: 50px; top: 110px; right: 65px; background: rgba(117, 117, 117, 0.4); font-size: 14px;text-align: center;}');
GM_addStyle('#over{z-index:99999;line-height: 50px; position: fixed; width: 50px; height: 50px; top: 110px; right: 10px; background: rgba(117, 117, 117, 0.4); font-size: 14px;text-align: center;}');
// $('*').hover(function() {
//     $(this).addClass('fordel');
//     $(this).parents().removeClass('fordel');
// }, function() {
//     $(this).removeClass('fordel')
// })
// $(document).keydown(function(event) {
//     if(event.keyCode==46){
//         $('.fordel').addClass('fordel2');
//     }
// });
// $(document).click(function(event) {
//     $('.fordel').addClass('fordel2');
// });
$('.xx').remove();
$('div').prepend('<img class=xx src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAJAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9YP2ibv4kat8eLyz0zWPF1j8IJorCx8TXWi2C/wBraVcFblz/AGfKv77yJA9ot1NHHI8IZPJKk3Mtp9MWUC2tnDHG0kkcaBVZ5DIzADAJYklj7kkmpKjPWsaVHklKV279+nkvI9XMM0eKo0qPJGKpq3upLm0S5pWWsnbV9VbS92//2Q==" alt="" />');
$('.xx').hover(function(){
    $(this).parent().addClass('fordel')
},function(){
    $(this).parent().removeClass('fordel')
})
$('.xx').click(function(){
    $('.fordel2').remove();
    $(this).parent().addClass('fordel2');
});
$('<div id=cancel >cancel</div>').appendTo('body');
$('#cancel').click(function(){
    $('.fordel2').removeClass('fordel2');
});
$('<div id=over >over</div>').appendTo('body');
$('#over').click(function(){
    $('#cancel,.xx,#over').remove();
});
