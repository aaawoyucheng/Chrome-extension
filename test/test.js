$('div,p').each(function() {
    var dom = $(this);
    if ($(dom.children().length == 0)) {
        var size = dom.css('font-size');
        var dst = parseInt(size.match(/(\d+).+/)[1]) + 3 + 'px';
        dom.css('font-size', dst);
    }
})
