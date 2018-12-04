const rosConnection = require('../adapters/rosConnection');
const unknown = require('../interactions/unknown');
const aboutWilly = require('../interactions/aboutWilly');
const mapInformation = require('../interactions/map');
const scheduleInformation = require('../interactions/schedule');
const directionsInformation = require('../interactions/directions');
const joke = require('../interactions/joke');
const survey = require('../interactions/survey');

class processToInteraction {

    /**
     * Constructor to process text to a interaction.
     * @param io socket connection.
     */
    constructor(io) {
        this.interactions = {
            'about': new aboutWilly(io),
            'map_information': new mapInformation(io),
            'schedule': new scheduleInformation(io),
            'directions': new directionsInformation(io),
            'joke': new joke(io),
            'survey': new survey(io)
        };
        this.unknown = new unknown(io);

        this.currentInteraction = null;
    }

    /**
     * Process the text input to check which interaction should be activated.
     * @param text
     */
    processText(text) {
        // Don't activate an other interaction when a interaction is working.
        if (this.currentInteraction) {
            return;
        }

        for (let name in this.interactions) {
            var interaction = this.interactions[name];

            if (interaction.activateOnInput(text)) {
                this.activateInteraction(interaction);
                return;
            }
        }

        this.activateInteraction(this.unknown);
    }

    /**
     * Activate a interaction.
     * @param interaction
     */
    activateInteraction(interaction) {
        this.currentInteraction = interaction;
        this.currentInteraction.activate();
        this.currentInteraction.processor = this;
    }

    /**
     * Stop a interaction.
     */
    stopInteraction() {
        this.currentInteraction = null;
        rosConnection.changeRosActive(0);
    }

    /**
     * When some node publish on the clear text topic.
     * @param text
     */
    textInput(text) {
        if (this.currentInteraction) {
            this.currentInteraction.textInput(text);
        }
    }

}

module.exports = processToInteraction;