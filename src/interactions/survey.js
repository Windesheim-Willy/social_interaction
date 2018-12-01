const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');

class survey extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        super(io);
    }

    /**
     * If this interaction should activate on this text input.
     * @param text
     * @returns {boolean}
     */
    activateOnInput(text) {
        var regex = /(enquete)|(survey)|(onderzoek)/i;
        return text.match(regex);
    }


    /**
     * Active this interaction.
     */
    activate() {
        super.activate();

        // Change the frontend of Willy.
        this.io.emit('changeFormat', screenSize.small);
console.log('enquete!!!!');
        this.welcome();
        setTimeout(function () {
            rosConnection.changeRosActive(0);
        }, 2000);

        // Speak the information about the map.
        // @TODO: speak the information.

        setTimeout(function () {
            rosConnection.changeRosActive(0);
        }, 10000);
    }

    welcome() {
        var text = 'Bedankt dat je een enquete wil invullen. Ik heb ? vragen voor je.';
        var small_text = 'Je kan alleen antwoorden in A, B, C of D';

        var content = pug.renderFile('views/information.pug', {
            h1: text,
            h3: small_text,
        });
        this.io.emit('changeContent', content);

        // @TODO: speak the information.
    }

    startSurvey() {
        var question = 'Wat vindt je er van?';
        var answers = [
            'Niks',
            'Iets',
            'Veel',
            'Weinig'
        ];

        var content = pug.renderFile('views/survey.pug', {
            question: question,
            answers: answers,
        });
        this.io.emit('changeContent', content);
    }

}

module.exports = survey;