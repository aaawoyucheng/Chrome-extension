// var url=$('.current').last().next().attr('href');
// $.ajax({
//     url:url,
//     async:false,
//     success:function(html){
//         var dom=$((new DOMParser()).parseFromString(html, 'text/html')).find('#wrapper');
//         dom.insertBefore('#footermenu');
//     }
// });
GM_addStyle('#loadnext{position: fixed; top: 20px; right: 20px; background-color: #ccc; width: 100px; height: 100px; z-index: 99999; opacity: 0.5;}');
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
initNext();
// loadNext(info);
