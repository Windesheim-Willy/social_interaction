const interactionBase = require('./interactionBase');
const pug = require('pug');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');

class unknown extends interactionBase {

    /**
     * Active this interaction.
     */
    activate() {
        super.activate();
        var interaction = this;

        // Change the frontend of Willy.
        this.io.emit('changeMood', 'gray');
        this.io.emit('changeFormat', screenSize.large);

        var content = pug.renderFile('views/information.pug', {
            h1: 'Sorry ik begrijp je niet',
        });
        this.io.emit('changeContent', content)

        // Speak the information.
        // @TODO: speak the information.

        setTimeout(function () {
            interaction.stop();
        }, 3000);
    }

}

module.exports = unknown;