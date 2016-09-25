$(document).ready(function(){
  var editor = null;
  var defaultCode =
    '/*\n' +
    ' *   You can replace the following code with whatever you would like\n' +
    ' *   to inject into other web pages.\n' +
    ' */\n' +
    '\n' +
    '\n' +
    '/*  An example script\n' +
    ' *\n' +
    ' *  A small logger function that takes a message and an optional\n' +
    ' *  JSON object and logs it out to the console (if the console\n' +
    ' *  is available).\n' +
    ' *\n' +
    ' *  @param {string} msg a message to log to the console\n' +
    ' *  @param {object} obj an optional JSON object to log to the console\n' +
    ' */\n' +
    '\n' +
    'window.__wi_log = function(msg, obj) {\n' +
    '   if (!console || !console.log) return;\n' +
    '   var style="font-size:1.2em;font-weight:bold;color:purple;";\n' +
    '   if (obj) {\n' +
    '     console.log("%c" + msg + ": %o", style, obj);\n' +
    '   } else {\n' +
    '     console.log("%c" + msg, style);\n' +
    '   }\n' +
    '};\n';

  chrome.storage.sync.get({
    code: defaultCode
  }, function(items) {
    editor = CodeMirror.fromTextArea(txtCode, {
      mode: 'javascript',
      lineNumbers: true,
      autofocus: true
    });
    editor.setValue(items.code);
    editor.on('change', function(){
      $('#save').removeClass('saved').addClass('dirty');
    });
  });

  var timer;

  function say(msg){
    clearTimeout(timer);
    $('#msg').fadeOut(400, function(){
      $('#msg').text(msg);
      $('#msg').fadeIn();
      clearTimeout(timer);
      timer = setTimeout(function() {
        $('#msg').fadeOut();
      }, 2600);
    });
  }

  $('#save').click(function(){
    chrome.storage.sync.set({
      code: editor.getValue()
    }, function() {
      $('#save').removeClass('dirty').addClass('saved');
      say("It's all saved up.");
    });
  });

  $('#beautify').click(function(){
    editor.setValue(js_beautify(editor.getValue(), {
      indent_size: 2,
      preserve_newlines: false
    }));
    say("Isn't it beautiful?");
  });

});
