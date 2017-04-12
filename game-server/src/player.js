var shortid = require('shortid');

var PlayerModule = function (playerName, playerIndex) {
    this.id = shortid.generate();
    this.name = playerName;
    this.clampScore = 0;
    this.playerIndex = playerIndex;
};

module.exports = PlayerModule;