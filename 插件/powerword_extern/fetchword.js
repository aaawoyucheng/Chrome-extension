/**
 * @author liuqiang
 * @date   2016-06-18
 */

document.addEventListener("mousemove", mouse_move, true);

var clientX, clientY;
var clientLastX = 0;
var clientLastY = 0;
var lastTime = 0;
var bhasGrab = false;

/* grab word call back frome background */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action == "onmsg") {
		var word = grab_word();
		if (word.text && word.text.length > 0) {
			if (word.text > 300) {
				if (word.pos == -1) {
					word.text = word.substring(0, 300);
				} else {
					var start = Math.max(0, word.pos - 150);
					var end = Math.min(word.text.length, word.pos + 150);
					if (start == 0) {
						end = start + 300;
					} else if (end == word.text.length) {
						start = end - 300;
					}
					word.pos = word.pos - start;
					word.text = word.substring(start, end);
				}
			}

			if (clientX == clientLastX && clientY == clientLastY) {
			    return ;	
			}
			chrome.extension.sendRequest({action:"word", msg: word.text, offset: word.pos}, function(resonse) {}) // to background
			clientLastX = clientX;
			clientLastY = clientY;
		}
  }
});

/* grab word by mouse */
function grab_word() {
	var ret = { text: "", pos: -1};
	if (clientY  == 0 || clientY == 0) {
		return ret;
	}
	var r = document.caretRangeFromPoint(clientX, clientY);
	if (!r) {
		return ret;
	}
	if (r.startContainer.data) {
		var rcText = null;
		if (r.startContainer.getBoundingClientRect) {
			rcText = r.startContainer.getBoundingClientRect();
		} else if (r.startContainer.parentElement && r.startContainer.parentElement.getBoundingClientRect) {
			rcText = r.startContainer.parentElement.getBoundingClientRect();
		}
		if (rcText == null || (rcText && rcText.left < clientX && clientX < rcText.right && rcText.top < clientY && clientY < rcText.bottom)) {
			ret.text = r.startContainer.data;
			ret.pos = r.startOffset;
			return ret;
		}
	}
	return ret;
}

function mouse_move(event) {
  clientX = event.clientX, clientY = event.clientY;
}

;
