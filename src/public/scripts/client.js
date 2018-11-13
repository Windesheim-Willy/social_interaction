$(document).ready(function () {
    var socket = io.connect(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port);

    socket.on('rosIsActive', function (rosIsActive) {
        var $body = $('body');
        // Change the body class if ROS is active or not.
        if (rosIsActive) {
            $body.addClass('ros-is-active')
                .removeClass('ros-is-not-active');
        }
        else {
            $body.removeClass('ros-is-active')
                .addClass('ros-is-not-active');
        }
    });
});