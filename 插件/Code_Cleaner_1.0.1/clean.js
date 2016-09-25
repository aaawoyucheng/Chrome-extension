//简化选择器
var $ = function(id){
    if('string' == typeof id || id instanceof String){
        return document.getElementById(id);
    }else if(id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

var codeCache = [];  //每步操作的缓存，用于后退操作

var Clearner = {
    clean: function(str/*被替换的字符串*/,regEx/*正则*/,replaceStr/*可选：替换字符*/){   //通用clean方法
        if(str && typeof str === 'string'){
            if(replaceStr && typeof replaceStr === 'string'){
                str = str.replace(regEx, replaceStr);
            }else{
                str = str.replace(regEx,'');
            }
            return str;
        }else{
            return '';
        }
    },
    cleanAttr: function(str,attrName/*传入属性名称*/,replaceStr/*可选：替换字符*/){   //去掉属性和值
        if(str && typeof str === 'string' && attrName && typeof attrName === 'string'){
            var reg = new RegExp('(\\s'+attrName+'\\s*=\\s*(([\"\'][^\"\'>]*[\'\"])|(\\w*)))','ig');

            if(replaceStr && typeof replaceStr === 'string'){
                str = this.clean(str,reg,replaceStr);
            }else{
                str = this.clean(str,reg);
            }
            return str;
        }else{
            return '';
        }
    },
    cleanTag: function(str,tagName){  //删除特定标签，不包括自闭和的标签
        if(str && typeof str === 'string' && tagName && typeof tagName === 'string'){
            var reg = new RegExp('<'+ tagName +'[^>]*>(.|\\n)*?(?=<\\/'+ tagName +'>)<\\/'+ tagName +'>','ig');
            return this.clean(str,reg);
        }
    },
    cleanClassName: function(str){  //去掉class
        return this.cleanAttr(str,'class',' class=""');  //cleanAttr会去掉属性前面的空格，所以这里要补回来
    },
    cleanId: function(str){   //去掉ID
        return this.cleanAttr(str,'id');
    },
    cleanInlineStyle: function(str){  //去掉行内样式
        return this.cleanAttr(str,'style');
    },
    cleanTable: function(str){  //去掉表格多余标签
        str = this.cleanAttr(str,'valign');
        str = this.cleanAttr(str,'align');
        str = this.cleanAttr(str,'height');
        str = this.cleanAttr(str,'width');
        return str;
    },
    cleanLink: function(str){  //去掉 a 中的 href 和 title
        str = this.cleanAttr(str,'href',' href="#"');
        str = this.cleanAttr(str,'title',' title=""');
        return str;
    },
    cleanImg: function(str){  //去掉 img 中的 alt，src，title
        str = this.cleanAttr(str,'alt',' alt=""');
        str = this.cleanAttr(str,'src',' src=""');
        str = this.cleanAttr(str,'title',' title=""');
        return str;
    },
    cleanScript: function(str){  //清除 script 标签
        return this.cleanTag(str,'script');
    },
    cleanText: function(str,replace/*替换文字*/){  //去掉全部文本内容，目前仅支持 FF,Chrome，IE9
        var dom = document.createElement('div');
        dom.innerHTML = str;

        function deep(node){
            if(node.tagName != 'SCRIPT'){   //script标签中的内容会被当成文本节点
                for(var i=0,j=node.childNodes.length; i<j; ++i){
                    if(node.childNodes[i] && node.childNodes[i].nodeType == 3){
                        if(node.childNodes[i].nodeValue.replace(/(^\s*)|(\s*$)/,'').length == 0) continue;
                        replace?node.childNodes[i].nodeValue = replace:node.childNodes[i].nodeValue = '';
                    }else if(node.childNodes[i] && node.childNodes[i].nodeType == 1){
                        deep(node.childNodes[i]);
                    }
                }
            }
        }
        deep(dom);
        return dom.innerHTML;
    },
    cleanBr: function(str){  //清除br
        return this.clean(str,/<br\s*\/?>\n*/ig);
    },
    cleanSpaceRow: function(str){  //清除空行，感谢 Kaiye 提供正则
        return this.clean(str,/(\r?\n(\s)*)+(?=\r?\n)/ig);
    },
    cleanHtmlComment: function(str){  //清除html注释
        return this.clean(str,/<!--[^-]*(.|\n)*?(?=-->)-->/ig);
    },
    cleanAllCustomAttr: function(str){   //强过滤，只保留常见属性
        var attrListReg = /\sclass|\stitle|\ssrc|\salt|\shref|\starget|\stype|\sname|\svalue|\schecked|\sdisabled|\smothod|\saction|\sfor|\srel|\sref|\scolspan|\srowspan|\scellpadding|\scellspacing/i;

        //被删除的属性列表，已去重
        var deleteAttr = '';

        //对所有形如 xxx='xxx'的属性进行操作，不能处理独立的属性，如：checked,disabled 等
        //属性中可能同时包含单双引号 如 onclick = "alert('haha');";
        str = str.replace(/(\s\w+(\-)?\w+\s*=\s*'[^'>]*')|(\s\w+(\-)?\w+\s*=\s*"[^">]*")|(\s\\w+(\-)?\w+\s*=\s*\w*)/ig,function(attr){
            if(attrListReg.test(attr.split('=')[0])){
                return attr.split('=')[0]=='href' ? attr.split('=')[0] + '="#"': attr.split('=')[0] + '=""';
            }else{
                if(deleteAttr.indexOf(attr.split('=')[0])<0){
                    deleteAttr = deleteAttr + ' | ' + attr.split('=')[0];
                }
                return '';
            }
        });
        return {'str':str, 'deleteAttr': deleteAttr};
    }
};

//保存操作记录
var saveRecord = function(){
    if($('code').value != codeCache[codeCache.length-1]){
        codeCache.push($('code').value);
        $('btn_back').disabled = false;
    }
};

//展开收起
var toggleFold = function(trigger,contentId){
    if(trigger && contentId && $(contentId).style){
        if($(contentId).style.display == 'none'){
            $(contentId).style.display = 'block';
        }else if($(contentId).style.display = 'block'){
            $(contentId).style.display = 'none';
        }
    }
};

//初始化函数
var init = function(){
    //高级选项面板
    $('advanced').onclick = function(){
        toggleFold(this,'advanced_panel');
    };

    //代码区域检测 TODO: 增加更高级的校验
    $('code').onkeyup = function(){
        $('btn_clear').disabled = !(this.value!='');
    };

    $('code').onfocus = function(){
        $('tips').style.display = 'none';
    };

    //清空代码区域
    $('btn_clear').onclick = function(){
        saveRecord();
        $('code').value = '';
        this.disabled = true;
    };

    //常见属性清除
    $('btn_clean_attr').onclick = function(){
        if($('code').value == ''){
            alert('请添加要清理的代码');
            return;
        }
        var tag = $('common_attr').value;

        if(tag!=''){
            saveRecord();
            $('code').value = Clearner.cleanAttr($('code').value,tag);
        }else{
            alert('请输入属性名称，属性值会自动清除');
        }
    };

    //清除全部自定义属性
    $('btn_clean_all_custom').onclick = function(){
        if($('code').value == ''){
            alert('请添加要清理的代码');
            return;
        }
        saveRecord();
        var ret = Clearner.cleanAllCustomAttr($('code').value);
        if(ret && ret.deleteAttr!=''){
            $('code').value = ret.str;
            alert('已删除标签：'+ ret.deleteAttr);
        }else{
            alert('代码已不包含自定义标签');
        }
    };

    //自定义匹配
    $('btn_custom').onclick = function(){
        if($('code').value == ''){
            alert('请添加要清理的代码');
            return;
        }
        if($('custom_reg').value == ''){
            alert('请输入正则表达式');
        }else{
            var reg = new RegExp($('custom_reg').value,"ig");
            saveRecord();
            $('code').value = Clearner.clean($('code').value,reg,$('custom_replace').value);
        }
    };

    //代码自动补全
    $('common_attr').onkeyup = function(event){
        var evt = event || window.event;
        if($('code').value!=''&& evt.keyCode!= '8'){
            var reg = new RegExp('\\b'+this.value + '\\S*\\s*(?=\\=)','ig');
            var match = $('code').value.match(reg);

            if(match){
                $('common_attr_tip').innerHTML = match[0];
            }

            if(evt.keyCode == '13'){
                var tag = $('common_attr').value = $('common_attr_tip').innerHTML;
            }
        }
    };

    //执行选中
    $('btn_replace_all').onclick = function(){
        if($('code').value == ''){
            alert('请添加要清理的代码');
            return;
        }
        var optList = $('opt').getElementsByTagName('li');
        saveRecord();

        var cache = $('code').value;
        for(var i=0,j=optList.length; i<j; ++i){
            if(optList[i].getElementsByTagName('input')[0].checked){
                cache = Clearner[optList[i].getElementsByTagName('input')[0].value](cache);
            }
        }
        $('code').value = cache;
    };

    //全部选中与取消全选
    var isSelectAll = true;
    $('btn_dis_all').onclick = function(){
        var optList = $('opt').getElementsByTagName('li');

        if(isSelectAll){
            for(var i=0,j=optList.length; i<j; ++i){
                optList[i].getElementsByTagName('input')[0].checked = false;
            }
            this.innerHTML = '全部选中';
        }else{
            for(var k=0,m=optList.length; k<m; ++k){
                optList[k].getElementsByTagName('input')[0].checked = true;
            }
            this.innerHTML = '取消全选';
        }
        isSelectAll = !isSelectAll;
    };

    //替换全部文本
    $('btn_custom_txt').onclick = function(){
        saveRecord();
        $('code').value = Clearner.cleanText($('code').value,$('custom_txt').value);
    };

    //撤销操作
    $('btn_back').onclick = function(){
        if(codeCache.length>1 && typeof codeCache[codeCache.length-1] !== 'undefined'){
            $('code').value = codeCache.pop();
        }else if(codeCache.length == 1){
            $('code').value = codeCache.pop();
            $('btn_back').disabled = true;
        }

        if($('btn_clear').disabled && $('code').value != ''){
            $('btn_clear').disabled = false;
        }
    };
};

window.onload = function(){
    init();
};