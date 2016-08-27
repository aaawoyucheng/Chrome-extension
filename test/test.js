function get(url,selector){
    var html=$.get(url);
    var dom=$((new DOMParser()).parseFromString(html, 'text/html'))//.find(selector);
    console.log(dom);
    return dom;
}
$('.next').remove();
$('.cms_pages').each(function(i,o){
    $('<div class=next link='+o.href+'></div>').insertBefore('.relevant_information');
})
$('.next').each(function(i,o){
    var dom=$(o);
    $.ajax({
        url:dom.attr('link'),
        success:function(msg){
            dom.html($((new DOMParser()).parseFromString(msg, 'text/html')).find('.newstext'));
        }
    });
});
