$(function() {

	/* DEBUG */ //$('#clear').click( function(){ chrome.storage.local.clear(); chrome.tabs.reload();} );

	jqueryAutoStart();

	// List of sites
	chrome.storage.local.get(null, function(items) {

		//console.log(items);

		// Websites
		if( !jQuery.isEmptyObject(items.sites) ) {
			for (let key in items.sites) {
				let response = items.sites[key];
				let	js = btnConstructor(response.js, 'js', 'JavaScript'),
					css = btnConstructor(response.css, 'css', 'CSS'),
					remove = btnConstructor(true, 'remove', '&times;'),
					right = '<div class="right">' + css + js + remove + '</div>',
					left = '<div class="left"><a href="http://' + key +'" target="_blank">' + key + '</a></div>';

				$('ul#siteList').append('<li class="clearfix" data-key="' + key + '">' + left + right +'</li>');
			}

			// Modal window
			let modal = new ModalWorker;

			// Close modal
			$('#popupFrame').on( "click", '.popupWrapper', function(e) { if(e.target.className == 'popupWrapper') modal.closeModal(); } );
			$('#popupFrame').on( "click", '#btn_close', function() { modal.closeModal(); } );

			// Save data in modal
			$('#popupFrame').on( "click", '#btn_submit', function() { 
				modal.saveModal(function(){
					chrome.tabs.reload();
				});
				
			});

			// Open JS
			$( "#siteList" ).on( "click", ".edit-btn.js", function() {
				let key = $(this).parents('li').attr('data-key');
				modal.openModal(key, 'js');
			});

			// Open CSS
			$( "#siteList" ).on( "click", ".edit-btn.css", function() {
				let key = $(this).parents('li').attr('data-key');
				modal.openModal(key, 'css');
			});

			// Remove element
			$( "#siteList" ).on( "click", ".edit-btn.remove", function() {
				let key = $(this).parents('li').attr('data-key'),
					answer = confirm("Remove data from " + key + "?");
				if(answer) {
					removeDomain(key, function(){
						chrome.tabs.reload();
					});
				}
			});
		} else {
			$('ul#siteList').append('<li>'+chrome.i18n.getMessage('no_sites')+'</li>');
		}

		// Libs
		updateLibsList();

		// Add libs
		$('#libsubmit').click(function(){
			if( $('#libname').val() && $('#libsrc').val() && $('#liborder').val() ) {
				let lib = {
					name: $('#libname').val(),
					src: $('#libsrc').val(),
					order: $('#liborder').val()
				}
				setLib(lib, function() {
					updateLibsList();
				});
			}
		});

		$("#liborder").keypress(function (e) {
			if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});

		// Remove libs
		$( "#libsList" ).on( "click", ".lib__remove", function(){
			removeLib( $(this).data('key'), updateLibsList );
		});

		// TABS
		let tabs = new makeMTabs();

		// Recovery link
		let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items)),
			textJson = chrome.i18n.getMessage('download_json');
		$('#download').append('<a href="data:' + data + '" download="custom_js_css_storage_v2.json" class="download-json"> '+textJson+'</a>');
		
		document.getElementById('loadJson').onchange = function (evt) {
			let tgt = evt.target || window.event.srcElement,
				files = tgt.files;

			if (FileReader && files && files.length) {
				let fr = new FileReader();
				fr.onload = function() {
					let result = fr.result,
						preDecode = result.replace('data:;base64,',''),
						decode = window.atob( preDecode ),
						utf8 = decodeURIComponent( escape( decode ) ),
						jsonResult = JSON.parse(utf8);

					chrome.storage.local.clear( function(){
						chrome.storage.local.set(jsonResult, function(){
							chrome.tabs.reload();
						});
					});					
				}
				fr.readAsDataURL(files[0]);
			}
		}

		// Update version
		var manifest = chrome.runtime.getManifest();
		$('#version').text(manifest.version);
		
		// Get sync from url
		var urlParam = getQueryParams(document.location.search);
		if(urlParam.getsync) {
			let key = $(this).parents('li').attr('data-key'),
				answer = confirm("Before load data from cloud current data will be removed. Are you sure?");
			if(answer) {
				chrome.storage.sync.get(null, function(items) { 
					chrome.storage.local.clear( function(){
						chrome.storage.local.set(items, function(){
							history.pushState(null, "", location.href.split("?")[0]);
							chrome.tabs.reload();
						});
					});
				});
			}
		}

	});

});

function updateLibsList(items) {
	chrome.storage.local.get(null, function(items) {

		if( !jQuery.isEmptyObject(items.libs) ) {
			let tSrc = chrome.i18n.getMessage('src'),
				tOrder = chrome.i18n.getMessage('order'),
				tNoLibs = chrome.i18n.getMessage('no_libs');
			$('#libsList').empty();
			for (let key in items.libs) {
				let lib = items.libs[key],
					libName = '<div class="lib__name">'+key+'</div>',
					libSrc = '<div class="lib__src">'+tSrc+': '+lib.src+'</div>',
					libOrder = '<div class="lib__src">'+tOrder+': '+lib.order+'</div>',
					libRemove = '<div class="lib__remove" data-key="'+key+'">&times;</div>';
				$('#libsList').append('<li>'+libName+libSrc+libOrder+libRemove+'</li>');
			}
		} else {
			$('#libsList').empty().append('<li>'+tNoLibs+'</li>');
		}

	});
}