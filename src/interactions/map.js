const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');

class map extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        super(io);
        this.path = '/assets/map.png';
    }

    /**
     * If this interaction should activate on this text input.
     * @param text
     * @returns {boolean}
     */
    activateOnInput(text) {
        var regex = /(plattegrond)|(waar moet ik heen)/i;
        return text.match(regex);
    }

    /**
     * Active this interaction.
     */
    activate() {
        super.activate();
        var interaction = this;

        // Change the frontend of Willy.
        this.io.emit('changeFormat', screenSize.small);

        var content = '';
        if (fs.existsSync(path.resolve('public' + this.path))) {
            content = pug.renderFile('views/image.pug', {
                url: this.path,
            });
            rosConnection.rosSpeak('Ik heb het volgende voor je gevonden');
        }
        else {
            var message = 'Sorry ik kan je niet helpen want ik kan de kaart niet vinden.';
            console.log("Can't find the map image on path " + path.resolve('public' + this.path));
            content = pug.renderFile('views/information.pug', {
                h1: message,
            });
            rosConnection.rosSpeak(message);
       }
        this.io.emit('changeContent', content);

        setTimeout(function () {
            interaction.stop();
        }, 10000);
    }
}

module.exports = map;