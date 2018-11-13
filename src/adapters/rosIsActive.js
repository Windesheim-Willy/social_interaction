const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

rosIsActive = function() {
    this.listener();
};
rosIsActive.isActive = false;

rosIsActive.listener = function() {
    // Register node with ROS master
    rosnodejs.initNode('/social_interaction/is_active')
        .then((rosNode) => {
            // Create ROS subscriber on the 'chatter' topic expecting String messages
            let sub = rosNode.subscribe('/interaction/is_active', std_msgs.String, (msg) => {
                console.log('Got msg on chatter: %j', msg);
            });
        });
};

module.exports = rosIsActive;
