GM_addStyle('.xx{z-index:99999;float: right; height: 10px; width: 10px;}');
GM_addStyle('.fordel{-webkit-filter:brightness(.5)}');
GM_addStyle('.fordel_temp{display:none!important}');
GM_addStyle('#controll_location{z-index: 99999; position: fixed; top: 110px; right: 10px; font-size: 14px; text-align: center;}');
GM_addStyle('#controll_location span{background: rgba(117, 117, 117, 0.4); padding: 20px;  margin: 5px;}');
$('.xx,#controll_location').remove();
$('div,td').prepend('<img class=xx src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAJAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9YP2ibv4kat8eLyz0zWPF1j8IJorCx8TXWi2C/wBraVcFblz/AGfKv77yJA9ot1NHHI8IZPJKk3Mtp9MWUC2tnDHG0kkcaBVZ5DIzADAJYklj7kkmpKjPWsaVHklKV279+nkvI9XMM0eKo0qPJGKpq3upLm0S5pWWsnbV9VbS92//2Q==" alt="" />');
var fordel='';
$('<div id="controll_location" ></div>').appendTo('body');
$('<span id="cancel">cancel</span>').appendTo('#controll_location');
$('<span id="over">over</span>').appendTo('#controll_location');
$('.xx').hover(function(e){
    $(this).parent().addClass('fordel');
    fordel='.'+$(this).parent().attr('class').replace(/ /,'.').replace('.fordel','');
    $('#delAll').html('delAll<br>'+fordel);
    var top=e.clientY;
    var left=e.clientX;
    $('#delAll').css({
        position:'fixed',
        top:top,
        left:left
    });
},function(){
    $(this).parent().removeClass('fordel')
})
$('.xx').click(function(){
    $('.fordel_temp').remove();
    $(this).parent().addClass('fordel_temp');
});
$('#cancel').click(function(){
    $('.fordel_temp').removeClass('fordel_temp');
});
$('#over').click(function(){
    $('#controll_location,.xx').remove();
});
// var $dellAll=$('<span id="delAll">delAll</span>');
// $dellAll.click(function(){
//     console.log(fordel);
//     $('.fordel_temp').remove();
//     $(fordel).addClass('fordel_temp');
// }).appendTo('#controll_location');
$('#over').mouseenter(function(){
    console.log(c);
});
