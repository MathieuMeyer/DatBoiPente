var Board = require('./board.js');

var GameManagerModule = function (env) {
	this.env = env;
	this.gameState = {
		players: {
			playerOne: null,
			playerTwo: null
		},
		board: new Board(),
		clamps: {
			playerOne: 0,
			playerTwo: 0
		},
		lastPlayed: {
			timestamp: null,
			playerNumber: null,
			x: 0,
			y: 0
		},
		startTimestamp: null,
		playing: false,
		winner: null,
		turns: 0
	}
};

module.exports = GameManagerModule;