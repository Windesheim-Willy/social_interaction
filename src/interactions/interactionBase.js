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
}

module.exports = interactionBase;