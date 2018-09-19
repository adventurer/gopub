

$(function() {
    // markdown editor
    var initContent = '<h4>Hello there</h4> ' +
        '<p>How are you? I have below task for you :</p> ' +
        '<p>Select from this text... Click the bold on THIS WORD and make THESE ONE italic, ' +
        'link GOOGLE to google.com, ' +
        'test to insert image (and try to tab after write the image description)</p>' +
        '<p>Test Preview And ending here...</p> ' +
        '<p>Click "List"</p> Enjoy!';

    $('#markdown-editor').text(toMarkdown(initContent));
});
