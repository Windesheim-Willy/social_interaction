const unknown = require('../interactions/unknown');
const aboutWilly = require('../interactions/aboutWilly');
const mapInformation = require('../interactions/map');

class processToInteraction {

    /**
     * Constructor to process text to a interaction.
     * @param io socket connection.
     */
    constructor(io) {
        this.interactions = {
            'about': new aboutWilly(io),
            'map_information': new mapInformation(io)
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