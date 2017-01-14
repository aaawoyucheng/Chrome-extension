// $('.BDE_Image').each(function() {
//     try {
//         this.src = 'http://imgsrc.baidu.com/forum/' + this.src.match(/pic\/item.+/)[0];
//         $(this).removeAttr('width').removeAttr('height').css('max-width', '700px');
//     }catch(e) {}
// });
var total=$('.l_reply_num span:first').next().text();
var i=0;
while(i<total){
    i++;
    var url=window.location.hostname+window.location.pathname+'?pn='+i;
    console.log(url);
}
