$(function() {
    "use strict";
    // summernote editor
    $('.summernote').summernote({
        height: 280,
        focus: true,
        onpaste: function() {
            alert('You have pasted something to the editor');
        }
    });

    $('.inline-editor').summernote({
        airMode: true
    });

});
