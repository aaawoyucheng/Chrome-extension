'use strict';

(function () {

	var userStyles = new CustomJavaScript(location.href),
	    domain = userStyles.domain,
	    storage = chrome.storage.local;

	storage.get(null, function (data) {
		if (data.sites[domain]) {
			(function () {

				// Response  
				var response = data.sites[domain];

				if (!response.disabled) {
					if (response.js) {

						// Inject JS after DOM ready
						document.onreadystatechange = function () {
							if (document.readyState == "interactive") {

								// If has libs
								if (response.libs) {
									(function () {
										var allLibs = data.libs,
										    enabledLibs = [];

										// Collect enabled libs
										response.libs.forEach(function (i) {
											if (allLibs[i]) {
												enabledLibs.push({
													src: allLibs[i]['src'],
													order: allLibs[i]['order']
												});
											}
										});

										// Sort libs
										if (enabledLibs.length > 1) {
											enabledLibs.sort(compareLibsOrder);
										}

										// Include enabled libs
										enabledLibs.forEach(function (i) {
											userStyles.setScript(i.src, document.head);
										});
									})();
								}

								var scriptBase64 = userStyles.toBase64(response.js);
								userStyles.setScript(scriptBase64, document.body);
							}
						};
					}

					if (response.css) {

						var css = response.css,
						    style = document.createElement('style');

						style.type = 'text/css';
						style.appendChild(document.createTextNode(css));

						document.head.appendChild(style);
					}
				}
			})();
		}
	});

	function compareLibsOrder(a, b) {
		return a.order - b.order;
	}
})();