$(function() {
    $('#auto')[0].checked=localStorage['auto']=='true';
    console.log(localStorage['auto']);
    $('#auto').click(function() {
            localStorage['auto'] = $('#auto')[0].checked;
    })
})
