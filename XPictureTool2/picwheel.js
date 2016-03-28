/*绑定事件*/
function addEvent(obj, sType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sType, fn, false);
    } else {
        obj.attachEvent('on' + sType, fn);
    }
};

function removeEvent(obj, sType, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(sType, fn, false);
    } else {
        obj.detachEvent('on' + sType, fn);
    }
};

function prEvent(ev) {
    var oEvent = ev || window.event;
    if (oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    return oEvent;
}
/*添加滑轮事件*/
function addWheelEvent(obj, callback) {
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        addEvent(obj, 'DOMMouseScroll', wheel);
    } else {
        addEvent(obj, 'mousewheel', wheel);
    }

    function wheel(ev) {
        var oEvent = prEvent(ev),
            delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
        callback && callback.call(oEvent, delta);
        return false;
    }
};
//鼠标拖拽
function drag(dom) {
    addEvent(dom, 'mousedown', function(ev) {
        var oEvent = prEvent(ev),
            oParent = dom.parentNode,
            disX = oEvent.clientX - dom.offsetLeft,
            disY = oEvent.clientY - dom.offsetTop,
            startMove = function(ev) {
                if (oParent.setCapture) {
                    oParent.setCapture();
                }
                var oEvent = ev || window.event,
                    l = oEvent.clientX - disX,
                    t = oEvent.clientY - disY;
                dom.style.left = l + 'px';
                dom.style.top = t + 'px';
                oParent.onselectstart = function() {
                    return false;
                }
            },
            endMove = function(ev) {
                if (oParent.releaseCapture) {
                    oParent.releaseCapture();
                }
                oParent.onselectstart = null;
                removeEvent(oParent, 'mousemove', startMove);
                removeEvent(oParent, 'mouseup', endMove);
            };
        addEvent(oParent, 'mousemove', startMove);
        addEvent(oParent, 'mouseup', endMove);
        return false;
    });
}
/*以鼠标位置为中心的滑轮放大功能*/
function wheelcontrol(dom) {
    addWheelEvent(dom, function(delta) {
        var normalwidth = $(dom).width()
        var ratioL = (this.clientX - dom.offsetLeft) / dom.offsetWidth,
            ratioT = (this.clientY - dom.offsetTop) / dom.offsetHeight,
            ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
            w = parseInt(dom.offsetWidth * ratioDelta),
            h = parseInt(dom.offsetHeight * ratioDelta),
            l = Math.round(this.clientX - (w * ratioL)),
            t = Math.round(this.clientY - (h * ratioT));
        with(dom.style) {
            width = w + 'px';
            height = h + 'px';
            left = l + 'px';
            top = t + 'px';
        }
    });
}
$('img').each(function() {
    wheelcontrol(this);
    drag(this);
})
$('img').each(function() {
    console.log(this.getAttribute('file'));
    if (this.getAttribute('file')!=null) {
        this.src = this.getAttribute('file');
    }
});
