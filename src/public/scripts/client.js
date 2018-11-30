$(document).ready(function () {
    var socket = io.connect(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port);

    /**
     * Socket event for changing the mood of Willy.
     */
    socket.on('changeMood', function (mood) {
        var $body = $('body');

        $body.declasse(/mood-/)
            .addClass('mood-' + mood);
        console.log($body);
    });

    /**
     * Socket event for changing the content.
     */
    socket.on('changeContent', function (content) {
        var $content = $('#content');

        $content.animate({'opacity': 0}, 500, function () {
            $content.html(content);
        }).animate({'opacity': 1}, 500);
    });

    /**
     * Socket event for changing the format of the layout.
     */
    socket.on('changeFormat', function (data) {
        var $willy = $('.willy-row');
        var $content = $('#content');

        $willy.css('height', data.willy_height);
        $content.css('height', data.content_height);
    });

    /**
     * Socket event for changing the text after a input.
     */
    socket.on('textInput', function (data) {
        var $content = $('#text-input');

        $content.html(data);
        $content.show('slow');

        setTimeout(function() {
            $content.hide('slow');
        }, 10000);
    });

    socket.on('confetti', function (enable) {
        var $body = $('body');

        if (enable) {
            for (let i = 0; i < 300; i++) {
                $('<div>')
                    .addClass('confetti')
                    .addClass('confetti-' + i)
                    .prependTo($body);
            }
        }
        else {
            $('.confetti').remove();
        }

    });

    /**
     * Remove a class with a regex.
     *
     * @param re
     * @returns {*}
     */
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList;
            for (var i = c.length-1; i >= 0; i--){
                var classe = "" + c[i];

                if (classe.match(re)) {
                    c.remove(classe)
                }
            }
        });
    }

});
