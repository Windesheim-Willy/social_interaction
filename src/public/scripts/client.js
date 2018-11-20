$(document).ready(function () {
    var socket = io.connect(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port);

    socket.on('rosIsActive', function (data) {
        var $body = $('body');

        // Change the body class if ROS is active or not.
        if (data.is_active) {
            $body.addClass('ros-is-active')
                .removeClass('ros-is-not-active');
        }
        else {
            $body.removeClass('ros-is-active')
                .addClass('ros-is-not-active');
        }

        if (data.additional_content) {
            var $content = $('#additional-content');

            // $content.hide();
            $content.html(data.additional_content);
            // $content.show("slow");
        }
    });

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