const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const screenSize = require('../config/screenSize');
const csv = require('csvtojson');
const surveyInformation = require('./assets/survey');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
        this.timer = null;

        this.csvPathAnswers = path.join(__dirname, 'assets', 'survey_answers.csv');
        this.csvWriter = createCsvWriter({
            path: this.csvPathAnswers,
            append: true,
            header: [
                {id: 'survey', title: 'survey'},
                {id: 'timestamp', title: 'timestamp'},
                {id: 'question', title: 'question'},
                {id: 'answer_raw', title: 'answer_raw'},
                {id: 'answer', title: 'answer'}
            ]
        });
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

        var text = 'Bedankt dat je een enquete wil invullen over de ' + surveyInformation.name;

        var content = pug.renderFile('views/survey_information.pug', {
            name: text,
            description: surveyInformation.description,
            author: surveyInformation.author
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
        var survey = this;

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

        this.timer = setTimeout(function () {
            survey.stopSurvey();
        }, 20000);
    }

    /**
     * Stop the survey.
     */
    stopSurvey() {
        this.isActive = false;
        const date = new Date();

        if ((this.currentQuestion + 1) < this.surveyQuestions.length) {
            for (let i = this.currentQuestion; i < this.surveyQuestions.length; i++) {
                const question = this.surveyQuestions[i];

                this.csvWriter.writeRecords([
                    {
                        survey: surveyInformation.name,
                        timestamp: date.toISOString(),
                        question: question.question,
                    }
                ]);
            }
        }

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
        clearTimeout(this.timer);
        this.timer = null;

        const date = new Date();
        const question = this.surveyQuestions[this.currentQuestion];

        var regex = /^[a-z]$/i;
        if (text.match(regex)) {

            const answers = {
                'a': question.answer_1,
                'b': question.answer_2,
                'c': question.answer_3,
                'd': question.answer_4
            };
            let answerValue = null;
            if (text.toLowerCase() in answers) {
                answerValue = answers[text.toLowerCase()];
            }

            // Save the answer to csv file.
            const record = {
                survey: surveyInformation.name,
                timestamp: date.toISOString(),
                question: question.question,
                answer_raw: text,
                answer: answerValue
            };
            this.csvWriter.writeRecords([record]);

            this.currentQuestion++;
            this.showQuestion();
        }
        else {
            this.csvWriter.writeRecords([
                {
                    survey: surveyInformation.name,
                    timestamp: date.toISOString(),
                    question: question.question,
                    answer_raw: text,
                }
            ]);
        }
    }
}

module.exports = survey;