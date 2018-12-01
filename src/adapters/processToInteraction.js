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
            'joke': new joke(io)
            'survey': new survey(io)
        };

        this.unknown = new unknown(io);
    }

    processText(text) {
        for (let name in this.interactions) {
            var interaction = this.interactions[name];

            if (interaction.activateOnInput(text)) {
                interaction.activate();
                return;
            }
        }

        this.unknown.activate();
    }

}

module.exports = processToInteraction;