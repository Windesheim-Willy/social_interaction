const interactionBase = require('./interactionBase');

class aboutWilly extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        super(io);
    }

    /**
     * Active this interaction.
     */
    activate() {
        super.activate();

        // Change the frontend of Willy.
        this.io.emit('changeMood', 'red');
        this.io.emit('changeFormat', {
            willy_height: '100%',
            content_height: '0%',
        });
        this.io.emit('changeContent', '')

        // Speak the information about Willy.
        // @TODO: speak the information.
    }

}

module.exports = aboutWilly;