const interactionBase = require('./interactionBase');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

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
     * Active this interaction.
     */
    activate() {
        super.activate();

        // Change the frontend of Willy.
        this.io.emit('changeFormat', {
            willy_height: '30%',
            content_height: '70%',
        });

        var content = '';
        if (fs.existsSync(path.resolve('public' + this.path))) {
            content = pug.renderFile('views/image.pug', {
                url: this.path,
            });
        }
        else {
            console.log("Can't find the map image on path " + path.resolve('public' + this.path));
            content = pug.renderFile('views/information.pug', {
                h1: 'Sorry ik kan je niet helpen want ik kan de kaart niet vinden.',
            });
        }
        this.io.emit('changeContent', content)

        // Speak the information about the map.
        // @TODO: speak the information.
    }

}

module.exports = map;