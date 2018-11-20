const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const EventEmitter = require('events');

/**
 * Create a adapter between the social interaction and ROS.
 */
class rosConnection extends EventEmitter {
    constructor() {
        super();
        this._rosIsActive = 0;
        this._is_active_publish = null;
    }

    /**
     * Set if ROS is active or not.
     * @param value
     */
    set rosIsActive(value) {
        this._rosIsActive = value;

        const msg = new std_msgs.Int32();
        msg.data = parseInt(value);
        this._is_active_publish.publish(msg);
    }

    /**
     * Get if ros is active.
     * @returns {number}
     */
    get rosIsActive() {
        return this._rosIsActive;
    }

    /**
     * Listen to ROS and emit a change when the is_active changes.
     */
    listener() {
        // Register node with ROS master
        rosnodejs.initNode('/social_interaction')
            .then((rosNode) => {
                this._is_active_publish = rosNode.advertise('/interaction/is_active', std_msgs.Int32);

                // Subscribe to the is_active topic.
                rosNode.subscribe('/interaction/is_active', std_msgs.Int32, (msg) => {
                    this._rosIsActive = parseInt(msg.data);
                    console.log('Received rosIsActive input ' + this.rosIsActive);

                    this.emit('rosIsActive', this.rosIsActive);
                });

                // Subscribe to the clear_text topic.
                rosNode.subscribe('/interaction/clear_text', std_msgs.String, (msg) => {
                    var data = msg.data;
                    console.log('Received rosAction input ' + data);

                    this.emit('rosTextInput', data);
                });
            });
    }
}

module.exports = new rosConnection();