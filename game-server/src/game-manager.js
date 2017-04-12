var Board = require('./board.js');
var Player = require('./player.js');

var GameManagerModule = function(env) {
	this.env = env;
	this.gameState = {};

	this.ResetState();
	this.gameState.board.LogBoard();
};

GameManagerModule.prototype.AddPlayer = function(playerName) {
	if (this.gameState.players[0] === null) {
		this.gameState.players[0] = new Player(playerName, 1);
		return { status: 200, player: this.gameState.players[0] };
	}

	if (this.gameState.players[1] === null) {
		this.gameState.players[1] = new Player(playerName, 2);
		this.StartGame();
		return { status: 200, player: this.gameState.players[1] };
	}

	return { status: 401, player: null, playerIndex: null };
}

GameManagerModule.prototype.StartGame = function () {
	this.gameState.playing = true;
	this.gameState.startTimestamp = new Date().getTime();

	var startingPlayer = Math.floor((Math.random() * 2) + 1);
	this.gameState.lastPlayed.playerId = this.gameState.players[(startingPlayer == 1 ? 2 : 1) - 1].id;

	console.log("P1: " + this.gameState.players[0].id + " | P2: " + this.gameState.players[1].id + " | Starting: " + startingPlayer);
}

GameManagerModule.prototype.Play = function(x, y, playerId) {
	if (!this.gameState.playing) { return { status: 401 }; }

	var parsedX = parseInt(x);
	var parsedY = parseInt(y);
	if (parsedX === NaN || parsedY === NaN) { return { status: 406 }; }

	var player = this.gameState.players.find(player => player.id === playerId);
	if (player === undefined) { return { status: 401 }; }
	if (this.gameState.lastPlayed.playerId === player.id) {return { status: 406 }; }

	if (!this.gameState.board.CanPlace(this.gameState.turnNumber, parsedX, parsedY)) { return { status: 406 }; }

	this.PlacePiece(parsedX, parsedY, player);
	return { status: 200 };
}

GameManagerModule.prototype.PlacePiece = function(x, y, player) {
    this.gameState.board.board[x][y] = player.playerIndex;
	this.UpdateGameState(x, y, player);
}

GameManagerModule.prototype.UpdateGameState = function(x, y, player) {
	var neighbouringPieces = this.gameState.board.GetNeighbouringPieces(x, y);

	this.gameState.board.LogBoard();

	this.CheckWinConditions(player, this.CheckWinningMove(neighbouringPieces, player));
	this.SetLastTurnValues(x, y, player);
}

GameManagerModule.prototype.CheckWinningMove = function(neighbouringPieces, player) {
	// Loop through x:y neighbours
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			// If same color -> produce unit vector x:y to same color coordinate
			if (!(i === 0 && j === 0) && neighbouringPieces[i][j].value == player.playerIndex) {
				var vector = { xAxis: i, yAxis: j };
				var xPlusVector = neighbouringPieces[i][j].coordinates.x;
				var yPlusVector = neighbouringPieces[i][j].coordinates.y;

				// Keep going in that direction until coordinate != player index then invert the vector
				while (this.gameState.board.board[xPlusVector][yPlusVector] == player.playerIndex) {
					xPlusVector += vector.xAxis;
					yPlusVector += vector.yAxis;
				}

				var following = 0;
				var invertedVector = { xAxis: vector.xAxis * -1, yAxis: vector.yAxis * -1 };
				xPlusVector += invertedVector.xAxis;
				yPlusVector += invertedVector.yAxis;
				while (this.gameState.board.board[xPlusVector][yPlusVector] == player.playerIndex) {
					xPlusVector += invertedVector.xAxis;
					yPlusVector += invertedVector.yAxis;
					following++;
				}
				
				// If 5 pieces -> winning move, if not continue looping x:y neighbours
				if (following >= 5) {
					return true;
				}
			}
		}
	}
}

GameManagerModule.prototype.CheckWinConditions = function(player, winningMove) {
	if (winningMove || player.clampScore === 5) {
		this.gameState.winner = player;
	}
}

GameManagerModule.prototype.SetLastTurnValues = function(x, y, player) {
	this.gameState.lastPlayed.timestamp = new Date().getTime();
	this.gameState.lastPlayed.playerId = player.id;
	this.gameState.lastPlayed.x = x;
	this.gameState.lastPlayed.y = y;
	this.gameState.turnNumber++;
}

GameManagerModule.prototype.ResetState = function() {
	this.gameState = {
		startTimestamp: null,
		playing: false,
		turnNumber: 0,
		board: new Board(),
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