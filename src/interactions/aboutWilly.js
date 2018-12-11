const interactionBase = require('./interactionBase');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');

class aboutWilly extends interactionBase {

    /**
     * If this interaction should activate on this text input.
     * @param text
     * @returns {boolean}
     */
    activateOnInput(text) {
        var regex = /(wie|wat) ben (jij|je)/i;
        return text.match(regex);
    }

    /**
     * Active this interaction.
     */
    activate() {
        super.activate();
        var interaction = this;

        // Change the frontend of Willy.
        this.io.emit('changeMood', 'red');
        this.io.emit('changeFormat', screenSize.full);
        this.io.emit('changeContent', '');

        rosConnection.rosSpeak('Hoi, ik ben Willy, de interactieve robot van Hogeschool Windesheim.');
        rosConnection.moveCommand('turn_around');

        setTimeout(function () {
            interaction.stop();
        }, 10000);
    }

}

module.exports = aboutWilly;
