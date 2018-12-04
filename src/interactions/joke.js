const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');

class joke extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        super(io);
        this.jokes = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', 'jokes.json')));
    }

    /**
     * If this interaction should activate on this text input.
     * @param text
     * @returns {boolean}
     */
    activateOnInput(text) {
        var regex = /(grap|mop)/i;
        return text.match(regex);
    }

    /**
     * Active this interaction.
     */
    activate() {
        super.activate();
        var io = this.io;
        var interaction = this;

        // Change the frontend of Willy.
        io.emit('changeFormat', screenSize.large);

        var joke = this.jokes[Math.floor(Math.random() * this.jokes.length)];

        var content = pug.renderFile('views/information.pug', {
            h1: joke,
        });
        io.emit('changeContent', content);
        io.emit('confetti', true);
        
        rosConnection.rosSpeak(joke);

        setTimeout(function () {
            interaction.stop();
            io.emit('confetti', false);
        }, 10000);
    }
}

module.exports = joke;