$(function() {

	jqueryAutoStart();

	let flag_jquery = document.getElementById('flag_jquery'),
		flag_disable = document.getElementById('flag_disable'),
		btn_submit = document.getElementById('btn_submit'),
		btn_clear = document.getElementById('btn_clear'),
		cssOnly = false,
		alreadySaved = false,
		userStyles,
		domain,
		activeTab;

	// Initialize
	chrome.tabs.getSelected(null,function(tab) {

		userStyles = new CustomJavaScript( tab.url );
		domain = userStyles.domain;
		title.innerHTML = domain;

		// On error
		if( !domain ) {
			$('#ok').hide();
			$('#error').show();
		}
	});

	// Редактор JS
	var inputJS = ace.edit("inputJS");
	inputJS.setTheme("ace/theme/tomorrow");
	inputJS.getSession().setMode("ace/mode/javascript");
	inputJS.$blockScrolling = Infinity;

	// Редактор CSS
	var inputCSS = ace.edit("inputCSS");
	inputCSS.setTheme("ace/theme/tomorrow");
	inputCSS.getSession().setMode("ace/mode/css");
	inputCSS.$blockScrolling = Infinity;

	// Загрузка
	chrome.storage.local.get(null, function(data) {

		// Load libs
		if( !jQuery.isEmptyObject(data.libs) ) {
			let q = 0;
			for (let key in data.libs) {
				let lib = data.libs[key],
					input = '<input class="checkbox libs__element" type="checkbox" name="libs[]" value="'+key+'" id="lib'+q+'">',
					name = '<label for="lib'+q+'">'+key+'</label>'; 
				$('#listLibs').append('<li>'+input+name+'</li>');
				q++;
			}
		}

		if(data.sites[domain]) {

			// Для автосохранения
			alreadySaved = true;

			// Response
			let response = data.sites[domain],
				isDraft = false;
			//console.log(response);

			// "Disabled" checkbox
			if(response.disabled)
				$(flag_disable).prop('checked', true);

			// Load JavaScript
			if ( !inputJS.getValue() ) {
				let setjs;
				if( response.draftjs && response.draftjs != response.js ) {
					setjs = response.draftjs;
					isDraft = true;
				} else {
					setjs = response.js;
				}
				inputJS.setValue( setjs );
			}

			// Load CSS
			if ( !inputCSS.getValue() ) {
				let setcss;
				if( response.draftcss && response.draftcss != response.css ) {
					setcss = response.draftcss;
					isDraft = true;
				} else {
					setcss = response.css;
				}
				inputCSS.setValue( setcss );
			}

			// Turn on libs
			if(response.libs) {
				response.libs.forEach(function(i) {
					$('input[value="'+i+'"]').prop("checked", true);
				});
			}

			// Set active tab
			if (!inputJS.getValue() && inputCSS.getValue()) {
				activeTab = 1;
			} else {
				activeTab = 0;
			}

		} else {
			// Set tab JS active
			activeTab = 0;
		}

		// Сохранение черновика
		setInterval( function() {
			if ( inputJS.getValue() || inputCSS.getValue() ) {
				let prefs = {
					//js: inputJS.getValue() || "",
					draftjs: inputJS.getValue() || "",
					//css: inputCSS.getValue() || "",
					draftcss: inputCSS.getValue() || "",
					disabled: flag_disable.checked
				};
				prefs.libs = [];
				$('.libs__element:checked').each(function(i) {
					prefs.libs[i] = $(this).val();
				});

				/* На случай, если автосохранение делается для нового домена */
				if(!alreadySaved) {
					prefs.js = inputJS.getValue() || "";
					prefs.css = inputCSS.getValue() || "";
				}
				/* */

				saveProps(domain, prefs, function(){});	
			}
		}, 1000);

		// TABS
		let tabs = new makeMTabs(activeTab);
	});

	// Options
	document.querySelector('#settings').addEventListener( "click", function() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});

	// Сохраниние
	btn_submit.onclick = function() {
		if ( inputJS.getValue() || inputCSS.getValue() ) {
			let prefs = {
				js: inputJS.getValue() || "",
				draftjs: inputJS.getValue() || "",
				css: inputCSS.getValue() || "",
				draftcss: inputCSS.getValue() || "",
				disabled: flag_disable.checked
			};
			prefs.libs = [];
			$('.libs__element:checked').each(function(i) {
				prefs.libs[i] = $(this).val();
			});

			saveProps(domain, prefs, function(){
				chrome.tabs.reload();
				window.close();
			});	
		}
	};

	// Очистка
	btn_clear.onclick = function() {
		removeDomain(domain, function() {
			chrome.tabs.reload();
			window.close();
		});	
	}

});