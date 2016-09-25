Array.prototype.unique = function() {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

var getSelect = function(url, selector) {
    var doms;
    $.ajax({
        url: url,
        async: false,
        success: function(msg) {
            doms = $((new DOMParser()).parseFromString(msg, 'text/html')).find(selector);
        }
    });
    return doms;
}

var getPages = function(pid) {
    var link = 'http://www.pixiv.net/member_illust.php?id=' + pid + '&type=all';
    var pages = new Array();
    pages.push(link);
    $('.pager-container .page-list li a').each(function() {
        pages.push(this.href);
    })
    return pages.unique();
}
var getPages2 = function(pid) {
    var link = 'http://www.pixiv.net/member_illust.php?id=' + pid + '&type=all';
    var pages = new Array();
    $('.pager-container .page-list li a').each(function() {
        pages.push(this.href);
    })
    return pages.unique();
}

var getImages = function(pages) {
    // var images = new Array();
    var images = '';
    for (var i = 0; i < pages.length; i++) {
        console.log(pages[i]);
        var imgurls = new Array();
        getSelect(pages[i], '.image-item a').each(function() {
            imgurls.push($(this).attr('href'));
        });
        imgurls = imgurls.unique();
        for (var j = 0; j < imgurls.length; j++) {
            var imgurl=imgurls[j];
            var img = getSelect(imgurl, '.original-image');
            if (img.length == 0) {
                var pid = imgurl.match(/illust_id=(\d+)/)[1];
                imgurl = 'http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=' + pid + '&page=1';
                img = getSelect(imgurl, 'img');
            }
            if (img == undefined) {
                var pid = imgurl.match(/illust_id=(\d+)/)[1];
                imgurl = 'http://www.pixiv.net/member_illust.php?mode=big&illust_id=' + pid ;
                console.log(imgurl);
                img = getSelect(imgurl, '._layout-thumbnail img');
            }
            var imgsrc=$(img).attr('src')!=undefined?$(img).attr('src'):$(img).data('src');
            imgsrc=imgsrc.replace(/pixiv.net.+img-master/,'pixiv.net\/img-original');
            imgsrc=imgsrc.replace(/_master.+\./,'\.');
            console.log(imgsrc);
            images+=imgsrc+'<br>';
        }
    }
    return images
}
var getImages2 = function(pages) {
    // var images = new Array();
    var images = '';
    for (var i = 0; i < pages.length; i++) {
        console.log(pages[i]);
        var doms=getSelect(pages[i],'.image-item');
        console.log(doms);
        doms.appendTo('._image-items');
    }
}
var pid = location.search.match(/id=(\d+)/)[1];
var pages = getPages2(pid);
getImages2(pages);
// var images = getImages();
// document.write(images);

