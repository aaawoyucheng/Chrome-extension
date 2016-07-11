var getInfo = function(dom) {
    if (dom.attr('id')) {
        info = '#' + dom.attr('id');
    } else {
        info = dom.attr('class') ? '.' + dom.attr('class').replace(/ /g, '.') : dom[0].tagName.toLowerCase();
        dom.parents().each(function(index, el) {
            if ($(this).attr('id')) {
                info = '#' + $(this).attr('id') + ' ' + info;
            } else if ($(this).attr('class')) {
                info = '.' + $(this).attr('class').replace(/ /g, '.') + ' ' + info;
            } else {
                info = this.tagName.toLowerCase() + ' ' + info;
            }
        });
    }
    return info;
}
var next = function() {
    var url, dom1, dom2, info;
    dom1 = $('body').find('*').filter(function() {
        return ['下一页', '下一章', '下一篇', '下一条', '手气不错', 'next'].indexOf(this.innerHTML)>-1;
    }).last();
    console.log(dom1);
    if (dom1[0].tagName == 'A') {
        url = dom1.attr('href');
    } else {
        url = dom1.find('a').attr('href')
    }
    if (url != undefined) {
        dom2 = dom1.parents().filter(function() {
            return $(this).height() > 1500;
        }).first();
        var info=getInfo(dom2);
        if (info != undefined) {
            $.ajax({
                url: url,
                async: false,
                success: function(msg) {
                    var dom3 = $((new DOMParser()).parseFromString(msg, 'text/html')).find(info);
                    if (dom3.html() != undefined) {
                        dom2.html(dom2.html() + dom3.html());
                    }
                }
            });
        }
    }
}
var book = function() {

}
next();
