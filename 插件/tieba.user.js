function mer() {
    load = false;
    var a = document.links;
    var url = '';
    for (i in a) try {
        if (a[i].innerHTML.indexOf('下一') != -1) {
            url = a[i].href;
            a[i].remove()
        }
    } catch (e) {};
    if (url != '') {
        document.getElementById('thread_theme_7').innerHTML = '加载中';
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true)
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 0) {}
            if (xmlhttp.readyState == 4) {
                doms = (new DOMParser()).parseFromString(xmlhttp.responseText, "text/html");
                d = doms.getElementsByClassName('j_lzl_container');
                while (d[0]) d[0].remove();
                document.getElementsByClassName('left_section')[0].innerHTML += doms.getElementsByClassName('left_section')[0].innerHTML;
                document.getElementById('thread_theme_7').innerHTML = doms.getElementById('thread_theme_7').innerHTML;
                setInterval(function() {
                    load = true;
                }, 1000);
            }
        }
        xmlhttp.send();
    }
}
var load = true;
if (document.URL.indexOf('http://tieba.baidu.com/p') != -1) {
    window.onscroll = function() {
        if ((document.body.offsetHeight - document.body.scrollTop < 700) && load) mer();
    }
}