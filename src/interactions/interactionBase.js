/**
 * Base class for the interactions of Willy.
 */
class interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        this.io = io;
        this._processor = null;
    }

    get processor() {
        return this._processor;
    }

    set processor(value) {
        this._processor = value;
    }

    /**
     * If this interaction should activate on this text input.
     * @param text
     * @returns {boolean}
     */
    activateOnInput(text) {
        return false;
    }

    /**
     * Active this interaction.
     */
    activate() {}

    /**
     * Stop this interaction.
     */
    stop() {
        this._processor.stopInteraction();
    }

    /**
     * When some node publish on the clear text topic.
     * @param text
     */
    textInput(text) {}

}

module.exports = interactionBase;