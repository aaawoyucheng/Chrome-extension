var site = {
    modle: {
        forfill: '',
        forappend: '',
        list: '',
        next: ''
    },
    openstack: {
        css: '.container{margin:0}',
        selector: '.col-sm-push-4',
        forfill: '',
        foradd: '.col-sm-push-4:last',
        list: '',
        fordel: '.docs-byline,.docs-license,.docs-actions-wrapper,.fa',
        next: 'a:has(i.fa-angle-double-right):last'
    }
}
site = site['openstack']
GM_addStyle(site.css);
if ($('#url').size() == 0) {
    $('<div id=url url=' + window.location.href.match('http.+/') + '/></div>').appendTo('body');
}
var currentPath=$('#url').attr('url');
var url = $(site.next).attr('href');
$.ajax({
    url: url,
    async: false,
    success: function(html) {
        $(site.fordel).remove();
        if (url.match('../') != null) {
            url=url.replace('../','');
            currentPath=currentPath.split('/').slice(0,-2).join('/')+'/';
            $('#url').attr('url',currentPath);
        }
        var dom = $((new DOMParser()).parseFromString(html, 'text/html')).find(site.selector);
        dom.find('img').each(function(i, e) {
            if($(e).attr('src').match('http.+')==null){
                e.src=currentPath+$(e).attr('src');
            }
        });
        dom.find('a').each(function(i,e){
            if($(e).attr('href').match('http.+')==null){
                e.href=currentPath+$(e).attr('href');
            }
        });
        var foradd = $(site.foradd);
        foradd.html(foradd.html() + dom.html());
    }
});
/*GM_addStyle('#loadnext{position: fixed; top: 20px; right: 20px; background-color: #ccc; width: 100px; height: 100px; z-index: 99999; opacity: 0.5;}');
var initNext = function() {
        $('#loadnext').remove();
        $("<div id='loadnext'>LoadNext</div>").appendTo('body');
        $('#loadnext').click(function(){
            loadNext();
        });
};
var loadNext = function() {
    var url = $(info.url).attr('href');
    $.ajax({
        url: url,
        type: 'get',
        success: function(msg) {
            var dom = $((new DOMParser()).parseFromString(msg, 'text/html'));
            dom.find(info.find).insertBefore(info.before);
            $(info.replace).replaceWith(dom.find(info.replace));
        }
    });
};
var info = {
    url: $('.next').last().find('a'),
    find: '.author.clearfix',
    before: '.pager:last',
    replace: '.pager:last'
}
initNext();*/
// loadNext(info);
// window.onscroll = function() {
//     var next = $('.pull-right a').last();
//     var distance = $(window).height() + $(document).scrollTop() - next.height() - next.offset().top;
//         console.log(distance);
//     if (0<distance&&distance<400) {
//         var url=next.attr('href');
//         next.parent().remove();
//         $.ajax({
//             url: url,
//             // async: false,
//             success: function(msg) {
//                 var dom = $((new DOMParser()).parseFromString(msg, 'text/html')).find('.detail-main');
//                 dom.insertAfter($('.detail-main').last());
//             }
//         });
//     }
// }
// GM_addStyle('.detail-headfix{position:inherit!important;}');
// var site = {
//     jikexueyuan: {
//         list: '.detail-left',
//         root: '.detail-main',
//         selector: '.markdown-body',
//     },
//     openstack: {
//         list: '#table-of-contents',
//         root: '.container.docs-book-wrapper',
//         selector: '.col-sm-push-4',
//     },
// }
// site = site['jikexueyuan'];
// site = site['openstack'];
// $('.forfill').remove();
// if($('#forfillcontent').size()==0){
//     $('<div id=forfillcontent ></div>').appendTo('body');
// }
// var $forfillcontent=$('#forfillcontent');
// $forfillcontent.empty();
// $(site.list).find('a').each(function() {
//     var item = $(this);
//     item.attr('url', this.href);
//     $('<div id="'+item.text()+'" url="'+item.attr('url')+'"></div>')
//     .attr('class', 'forfill')
//     .appendTo($forfillcontent);
// });
// $('.forfill').each(function(index,elem){
//     console.log(elem);
//     var forfill=$(elem);
//     $.ajax({
//         url:forfill.attr('url'),
//         success:function(msg){
//             var dom=$((new DOMParser()).parseFromString(msg, 'text/html')).find(site.selector);
//             console.log(dom);
//             forfill.html(dom);
//         }
//     });
// });
