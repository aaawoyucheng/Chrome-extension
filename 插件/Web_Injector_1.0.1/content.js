var elt = document.createElement("script");
chrome.runtime.sendMessage({name: 'code'}, function(response){
  elt.innerHTML = response.code;
  document.head.appendChild(elt);  
});