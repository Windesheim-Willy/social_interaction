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
});