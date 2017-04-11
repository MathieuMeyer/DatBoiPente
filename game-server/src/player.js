var shortid = require('shortid');

var PlayerModule = function (playerName) {
    this.id = shortid.generate();
    this.name = playerName;
    this.clampScore = 0;
};

module.exports = PlayerModule;