const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const EventEmitter = require('events');

/**
 * Create a adapter between the social interaction and ROS for action commands.
 */
class rosAction extends EventEmitter {

    /**
     * Listen to ROS and emit a change when the action changes.
     */
    listener() {
        // Register node with ROS master
        rosnodejs.initNode('/social_interaction/action')
            .then((rosNode) => {
                rosNode.subscribe('/interaction/action', std_msgs.Int32, (msg) => {
                    var data = msg.data;
                    console.log('Received rosAction input ' + data);

                    this.emit('rosAction', data);
                });
            });
    }
}

module.exports = new rosAction();