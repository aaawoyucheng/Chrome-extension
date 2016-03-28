var next = function() {
    var url, dom1, dom2, dom3;
    dom1 = $('body').find('*').filter(function(index) { //下一页dom
        return this.innerHTML.match(/下一页|下一章|下一篇|下一条|手气不错|next/);
    }).last();
    console.log(dom1);
    if (dom1[0] != undefined) {
        if (dom1[0].tagName == 'A') {
            url = dom1[0].href;
        } else {
            url = dom1.find('a')[0].href;
        }
        console.log(url);
        dom2 = dom1.parents().filter(function() { //待填充dom
            return $(this).height() > 800;
        }).first()[0];
        var forinsert = dom2.id!=""? '#' + dom2.id :'.' + dom2.className.replace(/\s+/ig, '.');
        console.log(dom2);
        if ('' != url) {
            $.ajax({
                url: url,
                async:false,
                success: function(data) {
                    var dom3 = $((new DOMParser()).parseFromString(data, 'text/html')).find(forinsert);
                    dom3.insertAfter(dom2);
                }
            });
        }
    }
}
var book = function() {

}
next();