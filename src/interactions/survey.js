const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const csv = require('csvtojson');

class survey extends interactionBase {

    /**
     * Constructor of interaction base.
     * @param io socket connection.
     * @param processor
     */
    constructor(io, processor) {
        super(io, processor);

        this.csvPathQuestions = path.join(__dirname, 'assets', 'survey.csv');
        this.surveyQuestions = [];
        this.isActive = false;
        this.currentQuestion = 0;
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
        this.io.emit('changeMood', 'gray');

        csv().fromFile(this.csvPathQuestions)
            .then((jsonObj)=>{
                survey.surveyQuestions = jsonObj;

                survey.welcome();
            });
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
        this.currentQuestion = 0;
        this.isActive = true;
        this.showQuestion();
    }

    /**
     * Show a single question.
     */
    showQuestion() {
        // When the current question id is longer than the questions list stop the survey.
        if (this.surveyQuestions.length <= this.currentQuestion || this.surveyQuestions[this.currentQuestion] === undefined) {
            this.stopSurvey();
            return;
        }

        var question = this.surveyQuestions[this.currentQuestion];
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

    /**
     * Stop the survey.
     */
    stopSurvey() {
        this.isActive = false;

        var interaction = this;
        var text = 'Bedankt dat je mijn enquete hebt ingevuld. Nog een fijne dag!';

        var content = pug.renderFile('views/information.pug', {
            h1: text,
        });
        this.io.emit('changeContent', content);

        // @TODO: speak the information.

        // Start the survey.
        setTimeout(function () {
            interaction.stop();
        }, 5000);
    }


    textInput(text) {
        super.textInput(text);

        if (!this.isActive) {
            return;
        }

        var regex = /^[a-z]$/i;
        if (text.match(regex)) {
            // Save the answer to csv file.

            this.currentQuestion++;
            this.showQuestion();
        }
    }
}

module.exports = survey;