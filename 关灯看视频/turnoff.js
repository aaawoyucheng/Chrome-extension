function show() {
    $('<div id=lightareoff style=width:100%;height:100%;left:0;top:0;position:fixed;opacity:.8;z-index:99999;background:#000; ></div>').appendTo('body');
    $('#lightareoff').click(hide);
    $('[type=application\\/x-shockwave-flash]').addClass('flashplayer');
    $('body').css('overflow', 'hidden');
}

function hide() {
    $('#lightareoff').remove();
    $('[type=application\\/x-shockwave-flash]').removeClass('flashplayer');
    $('body').css('overflow', 'auto');
}
if ($('[type=application\\/x-shockwave-flash]').size() > 0) {
    if ($('#lightareoff').size() == 0) {
        show();
    } else {
        hide();
    }
}
console.log();


function EmbedPlayer(g, f, k) {
    g = {};
    var j = $("#bofqi").contents().filter(function() {
            return 3 == this.nodeType
        }),
        h = j.text().match(/\[flashvars\](.*)\[\/flashvars\]/);
    null != h && (k = k + "&" + h[1], j.remove());
    k = k.split("&");
    for (j = 0; j < k.length; j++) {
        "" != k[j] && (h = k[j].split("="), g[h[0]] = h[1])
    }
    swfobject.embedSWF(f, "player_placeholder", "950", "482", "0", "", g, {
        bgcolor: "#ffffff",
        allowfullscreeninteractive: "true",
        allowfullscreen: "true",
        quality: "high",
        allowscriptaccess: "always",
        wmode: "direct"
    }, {
        "class": "player"
    })
}
