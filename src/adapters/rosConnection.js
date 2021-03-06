const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const EventEmitter = require('events');
const striptags = require('striptags');

/**
 * Create a adapter between the social interaction and ROS.
 */
class rosConnection extends EventEmitter {
    constructor() {
        super();
        this._is_active_publish = null;
        this._speech_publish = null;
        this._move_publish = null;
    }

    /**
     * Set if ROS is active or not.
     * @param value
     */
    changeRosActive(value) {
        value = parseInt(value);
        console.log('rosIsActive!!!!! ' + value);

        const msg = new std_msgs.Int32();
        msg.data = value;
        this._is_active_publish.publish(msg);
        this.emit('rosIsActive', 0);
    }

    /**
     * Send data over the topic
     * @param value as string
     */
    rosSpeak(value) {
        console.log('Message is: ' + value)
        value = striptags(value);
        const msg = new std_msgs.String();
        msg.data = value;
        this._speech_publish.publish(msg);
    }

    /**
     * Send move data over the topic
     * @param value as string
     */
    moveCommand(value) {
        console.log('Move command is: ' + value)
        const msg = new std_msgs.String();
        msg.data = value;
        this._move_publish.publish(msg);
    }

    /**
     * Listen to ROS and emit a change when the is_active changes.
     */
    listener() {
        // Register node with ROS master
        rosnodejs.initNode('/social_interaction')
            .then((rosNode) => {
                this._is_active_publish = rosNode.advertise('/interaction/is_active', std_msgs.Int32);
                this._speech_publish = rosNode.advertise('/speech', std_msgs.String);
                this._move_publish = rosNode.advertise('/move_action', std_msgs.String);

                // Subscribe to the is_active topic.
                rosNode.subscribe('/interaction/is_active', std_msgs.Int32, (msg) => {
                    var is_active = parseInt(msg.data);
                    console.log('Received rosIsActive input ' + is_active);

                    this.emit('rosIsActive', is_active);
                });

                // Subscribe to the clear_text topic.
                rosNode.subscribe('/interaction/clear_text', std_msgs.String, (msg) => {
                    var data = msg.data;
                    console.log('Received rosAction input ' + data);

                    this.emit('rosTextInput', data);
                });

                rosNode.subscribe('/speech',std_msgs.String, (msg) => {
                    var data = msg.data;
                    console.log('speech ' + data);
                });
            });
    }
}

module.exports = new rosConnection();
