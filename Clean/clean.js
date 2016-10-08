matched={
    '':{
        delete:'',
        css:'',
        extra:''
    },
    'http://tieba.baidu.com/p/':{
        delete:'#head,#com_userbar,#tb_nav,.card_top_wrap.clearfix.card_top_theme2,.tbui_aside_float_bar,.right_section,#tb_rich_poster_container,.footer,.d_author',
        css:'#j_core_title_wrap{position:static!important}.pb_content,.content,.thread_theme_5,.thread_theme_7,.pb_footer{width:740px}.d_post_content_main{width:720px}.core_reply_wrapper{width: 705px;}.BDE_Image{max-width: 700px;}.d_author{display: none;}',
        extra:"$('.BDE_Image').removeAttr('width').removeAttr('height'); var pn=window.location.href.match(/pn=(\\d+)/)!=null?window.location.href.match(/pn=(\\d+)/)[1]:1; var title=$('h3[title]').attr('title').replace('回复：','')+pn; $('h3[title]').text(title); document.title=title;"
    },
}

for(var i in matched){
    if(window.location.href.match(i)!=null){
        match=matched[i]
    }
}
GM_addStyle(match.css);
eval(match.extra);
var url=$('.tP').last().next().attr('href');
$.ajax({
    url:url,
    type:'post',
    async:false,
    success:function(msg){
        var doms=$((new DOMParser()).parseFromString(msg, 'text/html'));
        var pb_content=doms.find('.pb_content');
        var pb_footer=doms.find('.pb_footer');
        pb_content.appendTo('.content.clearfix');
        pb_footer.appendTo('.content.clearfix');
    }
});
$(match.delete).remove();