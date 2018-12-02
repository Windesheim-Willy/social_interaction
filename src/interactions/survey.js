const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const rosConnection = require('../adapters/rosConnection');
const csv = require('csvtojson')

class survey extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     */
    constructor(io) {
        super(io);

        this.csvPath = path.join(__dirname, 'assets', 'survey.csv');
        this.surveyQuestions = [];
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
        var survey = this;

        // Change the frontend of Willy.
        this.io.emit('changeFormat', screenSize.small);

        csv().fromFile(this.csvPath)
            .then((jsonObj)=>{
                survey.surveyQuestions = jsonObj;

                survey.welcome();
            });

        // Speak the information about the map.
        // @TODO: speak the information.

        // setTimeout(function () {
        //     rosConnection.changeRosActive(0);
        // }, 10000);
    }

    /**
     * Welcome the user with a message.
     */
    welcome() {
        var survey = this;

        var text = 'Bedankt dat je een enquete wil invullen. Ik heb ' + this.surveyQuestions.length + ' vragen voor je.';
        var small_text = 'Het is alleen mogelijk om antwoorden te geven in A, B, C of D';

        var content = pug.renderFile('views/information.pug', {
            h1: text,
            h3: small_text,
        });
        this.io.emit('changeContent', content);

        // @TODO: speak the information.

        // Start the survey.
        setTimeout(function () {
            survey.startSurvey();
        }, 5000);
    }

    /**
     * Start the survey with all the questions.
     */
    startSurvey() {
        var question = this.surveyQuestions[0];

        var content = pug.renderFile('views/survey.pug', {
            question: question.question,
            answers: [
                question.answer_1,
                question.answer_2,
                question.answer_3,
                question.answer_4
            ],
        });
        this.io.emit('changeContent', content);
    }

}

module.exports = survey;