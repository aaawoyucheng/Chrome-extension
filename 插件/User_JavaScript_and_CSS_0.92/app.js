'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

chrome.storage.local.get(null, function (items) {
	// MIGRATE //
	if (!items['sites']) {
		migrateToNewVersion(function () {
			if (chrome.tabs) {
				chrome.tabs.reload();
			}
		});
	}
});

// Save props to domain
function saveProps(domain, props, callback) {
	chrome.storage.local.get(null, function (data) {
		if (data.sites[domain]) {
			$.extend(data.sites[domain], props);
			if (props.libs && props.libs.length != 0) {
				$.extend(data.sites[domain]['libs'], props.libs);
			}
		} else {
			data.sites[domain] = props;
		}
		chrome.storage.local.set(data, function () {
			if (callback) {
				callback();
			}
		});
	});
}

// Remove
function removeDomain(domain, callback) {
	chrome.storage.local.get(null, function (data) {
		if (data.sites[domain]) {
			delete data.sites[domain];
		}
		chrome.storage.local.set(data, function () {
			if (callback) {
				callback();
			}
		});
	});
}

// Add-update libs
function setLib(lib, callback) {
	chrome.storage.local.get(null, function (data) {
		data.libs[lib.name] = {
			src: lib.src,
			order: lib.order
		};
		chrome.storage.local.set(data, function () {
			if (callback) {
				callback();
			}
		});
	});
}

// Remove lib
function removeLib(lib, callback) {
	chrome.storage.local.get(null, function (data) {
		if (data.libs[lib]) {
			delete data.libs[lib];
		}
		chrome.storage.local.set(data, function () {
			if (callback) {
				callback();
			}
		});
	});
}

// For popup

var CustomJavaScript = function () {
	function CustomJavaScript(url) {
		_classCallCheck(this, CustomJavaScript);

		this.url = url;
		this.domain = this.getDomain();
	}

	// Format full URL to "domain.zone"
	/*getDomain() {
 	let url = this.url,
 		fullDomain,
 		domain,
 		zone;
 
 	if (url.indexOf("://") > -1) {
 		fullDomain = url.split('/')[2];
 	} else {
 		fullDomain = url.split('/')[0];
 	}
 	
 	fullDomain = fullDomain.split(':')[0].split('.');
 	domain = fullDomain[fullDomain.length - 2];
 	zone = fullDomain[fullDomain.length - 1];
 
 	if( domain != undefined && zone != undefined) {
 		return domain + '.' + zone;
 	} else {
 		return false;
 	}
 }*/


	CustomJavaScript.prototype.getDomain = function getDomain() {
		var url = _getDomain(this.url);
		if (url && url != undefined && ~url.indexOf('.')) {
			return url;
		}
		return false;
	};

	// Convert JS to base64


	CustomJavaScript.prototype.toBase64 = function toBase64(script) {
		var b64 = 'data:text/javascript';
		try {
			b64 += ';base64,' + btoa(script);
		} catch (e) {
			b64 += ';charset=utf-8,' + encodeURIComponent(script);
		}
		return b64;
	};

	// Inject JS to document


	CustomJavaScript.prototype.setScript = function setScript(src, elem) {
		var script = document.createElement("script");
		script.src = src;
		script.async = false;
		elem.appendChild(script);
	};

	return CustomJavaScript;
}();

// For options


var ModalWorker = function () {
	function ModalWorker() {
		_classCallCheck(this, ModalWorker);

		this.domain = null;
		this.type = null;
		this.dataEditor = null;
	}

	ModalWorker.prototype.openModal = function openModal(domain, type) {
		var close = chrome.i18n.getMessage('close'),
		    save = chrome.i18n.getMessage('save');

		var modal = '<div class="popupWrapper"><div class="popup"><div class="btns-row"><h1 class="modal-h1">' + domain + '</h1><div id="btn_close" class="btn close">' + close + '</div><div id="btn_submit" class="btn">' + save + '</div></div><div id="popupEditor"></div></div></div>',
		    editor = this.dataEditor;
		$('body').attr('style', 'overflow:hidden');
		$('#popupFrame').append(modal);
		editor = ace.edit("popupEditor");
		editor.$blockScrolling = Infinity;
		editor.setTheme("ace/theme/tomorrow");

		if (type == 'js') editor.getSession().setMode("ace/mode/javascript");else editor.getSession().setMode("ace/mode/css");

		chrome.storage.local.get(null, function (data) {
			if (data.sites[domain]) {
				var response = data.sites[domain];
				if (type == 'js') editor.setValue(response.js);else editor.setValue(response.css);
			}
		});

		this.domain = domain;
		this.type = type;
		this.dataEditor = editor;
	};

	ModalWorker.prototype.saveModal = function saveModal(callback) {
		var code = this.dataEditor.getValue() || '',
		    props = {};

		props[this.type] = code;
		props['draft' + this.type] = code;

		saveProps(this.domain, props, callback);
	};

	ModalWorker.prototype.closeModal = function closeModal() {
		$('body').removeAttr('style');
		$('#popupFrame').empty();
	};

	return ModalWorker;
}();

function btnConstructor(state, type, text) {
	state = state ? 'on' : 'off';
	return '<div class="edit-btn ' + state + ' ' + type + '">' + text + '</div>';
}

// Migration to new DB
function migrateToNewVersion(callback) {
	chrome.storage.local.get(null, function (items) {

		var data = {
			sites: {},
			libs: {
				'jQuery 3.0.0': { get src() {
						return chrome.extension.getURL('js/jquery-3.0.0.min.js');
					}, order: 5 }
			}
		};

		if (Object.keys(items).length !== 0) {
			for (var key in items) {
				if (key != 'sites' && key != 'libs' && key != 'version') {
					var response = JSON.parse(items[key]);
					response.libs = response.jquery ? ['jQuery 3.0.0'] : null;
					if (response.hasOwnProperty("jquery")) delete response.jquery;
					data.sites[key] = response;
				}
			}
		}

		chrome.storage.local.clear(function () {
			chrome.storage.local.set(data, function (data) {
				if (callback) {
					callback();
				}
			});
		});
	});
}

// For jquery
function jqueryAutoStart() {
	// Locales
	$('*[data-msg]').text(function () {
		return chrome.i18n.getMessage($(this).attr('data-msg'));
	});

	// Material click
	var ink, d, x, y;
	$(".js-click-effect").click(function (e) {
		if ($(this).find(".ink").length == 0) {
			$(this).prepend("<span class='ink'></span>");
		}
		ink = $(this).find(".ink");
		ink.removeClass("animate");
		if (!ink.height() && !ink.width()) {
			d = Math.max($(this).outerWidth(), $(this).outerHeight());
			ink.css({ height: d, width: d });
		}
		x = e.pageX - $(this).offset().left - ink.width() / 2;
		y = e.pageY - $(this).offset().top - ink.height() / 2;
		ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
	});
}

// Tabs

var makeMTabs = function () {
	function makeMTabs(active) {
		_classCallCheck(this, makeMTabs);

		this.titles = $('.js-tabs__title');
		this.contents = $('.js-tabs__content');
		this.activeTab = active ? this.titles[active] : this.titles.first();
		this.activeClass = 'js-tabs_active';
		this.activeLine = $('<div/>').addClass('js-tabs_active-line').appendTo('.js-tabs__titles');
		this.init();
	}

	makeMTabs.prototype.init = function init() {
		this.activate(this.activeTab);
		this.hideNotActive();
		this.titles.on("click", $.proxy(this.clickHandler, this));
	};

	makeMTabs.prototype.getActiveContent = function getActiveContent() {
		return this.contents[this.titles.index(this.activeTab)];
	};

	makeMTabs.prototype.hideNotActive = function hideNotActive() {
		$(this.getActiveContent()).addClass(this.activeClass).siblings().removeClass(this.activeClass);
	};

	makeMTabs.prototype.clickHandler = function clickHandler(event) {
		var title = $(event.target);
		this.activate(title[0]);
	};

	makeMTabs.prototype.activate = function activate(tab, callback) {
		this.activeTab = tab;
		$(this.activeTab).addClass(this.activeClass).siblings().removeClass(this.activeClass);
		var width = $(this.activeTab).outerWidth(),
		    pos = $(this.activeTab).position();
		this.activeLine.css({ width: width, "transform": "translateX(" + pos.left + "px)" });
		this.hideNotActive();
	};

	return makeMTabs;
}();

function getQueryParams(qs) {
	qs = qs.split('+').join(' ');

	var params = {},
	    tokens,
	    re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

// New method get domain
function getHostName(url) {
	var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		return match[2];
	} else {
		return null;
	}
}

function _getDomain(url) {
	var hostName = getHostName(url);
	var domain = hostName;

	if (hostName != null) {
		var parts = hostName.split('.').reverse();

		if (parts != null && parts.length > 1) {
			domain = parts[1] + '.' + parts[0];

			if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
				domain = parts[2] + '.' + domain;
			}
		}
	}

	return domain;
}