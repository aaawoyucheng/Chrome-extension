function get(url,selector){
    var html=$.get(url);
    var dom=$((new DOMParser()).parseFromString(html, 'text/html'));//.find(selector);
    return dom;
}
console.log(get('http://acg.178.com/201106/102559759807.html','.news_box'));