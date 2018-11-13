const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const EventEmitter = require('events');

/**
 * Create a adapter between the social interaction and ROS.
 */
class rosIsActive extends EventEmitter {
    constructor() {
        super();
        this._rosIsActive = 0;
    }

    /**
     * Set if ROS is active.
     * @param value
     */
    set rosIsActive(value) {
        this._rosIsActive = value;
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
        rosnodejs.initNode('/social_interaction/is_active')
            .then((rosNode) => {
                rosNode.subscribe('/interaction/is_active', std_msgs.Int32, (msg) => {
                    this._rosIsActive = parseInt(msg.data);
                    console.log('Received rosIsActive input ' + this.rosIsActive);

                    this.emit('rosIsActive', this.rosIsActive);
                });
            });
    }
}

module.exports = new rosIsActive();