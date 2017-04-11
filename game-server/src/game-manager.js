var Board = require('./board.js');
var Player = require('./player.js');

var GameManagerModule = function(env) {
	this.env = env;
	this.gameState = {};

	this.ResetState();
};

GameManagerModule.prototype.AddPlayer = function(playerName) {
	if (this.gameState.players[0] === null) {
		this.gameState.players[0] = new Player(playerName);
		return { status: 200, player: this.gameState.players[0], playerIndex: 1 };
	}

	if (this.gameState.players[1] === null) {
		this.gameState.players[1] = new Player(playerName);
		return { status: 200, player: this.gameState.players[1], playerIndex: 2 };
	}

	return { status: 401, player: null, playerIndex: null };
}

GameManagerModule.prototype.StartGame = function () {
	this.gameState.playing = true;
	this.gameState.startTimestamp = new Date().getTime();
	this.gameState.startingPlayer = this.gameState.players[Math.floor((Math.random() * 2) + 1)];
}

GameManagerModule.prototype.Play = function(x, y, playerId) {
	if (!this.gameState.playing) { return { status: 401 }; }

	var player = this.gameState.players.find(player => player.id === playerId);
	if (player === undefined) { return { status: 401 }; }
	if (this.gameState.lastPlayed.playerId === player.id) { return { status: 406 }; }
	if (!this.gameState.board.CanPlace(x, y)) { return { status: 406 }; }
}

GameManagerModule.prototype.ResetState = function() {
	this.gameState = {
		startTimestamp: null,
		playing: false,
		turns: 0,
		board: new Board(),
		startingPlayer: null,
		players: [
			null, null
		],
		lastPlayed: {
			timestamp: null,
			playerId: null,
			x: 0,
			y: 0
		},
		winner: null
	}
}

module.exports = GameManagerModule;