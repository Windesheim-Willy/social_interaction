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
     * Active this interaction.
     */
    activate() {}
}

module.exports = interactionBase;