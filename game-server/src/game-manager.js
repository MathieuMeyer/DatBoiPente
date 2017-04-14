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

	var startingPlayer = 2;//Math.floor((Math.random() * 2) + 1);
	this.gameState.lastPlayed.playerId = this.gameState.players[(startingPlayer == 1 ? 2 : 1) - 1].id;
	this.gameState.lastPlayed.timestamp = this.gameState.startTimestamp;

	console.log("P1: " + this.gameState.players[0].id + " | P2: " + this.gameState.players[1].id + " | Starting: " + startingPlayer);
}

GameManagerModule.prototype.Play = function(x, y, playerId) {
	if (!this.gameState.playing) { return { status: 401 }; }

	var parsedX = parseInt(x);
	var parsedY = parseInt(y);
	if (parsedX === NaN || parsedY === NaN) { return { status: 406 }; }

	var player = this.gameState.players.find(player => player.id === playerId);
	if (player === undefined) { return { status: 401 }; }
	if (this.gameState.lastPlayed.playerId === player.id) { return { status: 406 }; }

	if (!this.gameState.board.CanPlace(this.gameState.turnNumber, parsedX, parsedY)) { return { status: 406 }; }
	if (!this.PlacedInTime()) { 
		this.gameState.winner = this.gameState.players[(player.playerIndex == 1 ? 2 : 1) - 1];
		return { status: 406 };
	}

	this.PlacePiece(parsedX, parsedY, player);
	return { status: 200 };
}

GameManagerModule.prototype.PlacePiece = function(x, y, player) {
    this.gameState.board.board[x][y] = player.playerIndex;
	this.UpdateGameState(x, y, player);
}

GameManagerModule.prototype.PlacedInTime = function() {
	var elapsed = new Date().getTime() - this.gameState.lastPlayed.timestamp;
	return new Date().getTime() - this.gameState.lastPlayed.timestamp <= 10000;
}

GameManagerModule.prototype.UpdateGameState = function(x, y, player) {
	var neighbouringPieces = this.gameState.board.GetNeighbouringPieces(x, y);

	this.CheckWinConditions(player, this.CheckWinningMove(neighbouringPieces, player));
	this.CheckClamps(neighbouringPieces, player);
	this.SetLastTurnValues(x, y, player);

	this.gameState.board.LogBoard();
}

GameManagerModule.prototype.CheckWinConditions = function(player, winningMove) {
	if (winningMove || player.clampScore >= 5) {
		this.gameState.winner = player;
	}
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
				var following = 0;
				while (this.gameState.board.board[xPlusVector] !== undefined && this.gameState.board.board[xPlusVector][yPlusVector] == player.playerIndex) {
					xPlusVector += vector.xAxis;
					yPlusVector += vector.yAxis;
				}

				var invertedVector = { xAxis: vector.xAxis * -1, yAxis: vector.yAxis * -1 };
				xPlusVector += invertedVector.xAxis;
				yPlusVector += invertedVector.yAxis;
				while (this.gameState.board.board[xPlusVector][yPlusVector] == player.playerIndex) {
					xPlusVector += invertedVector.xAxis;
					yPlusVector += invertedVector.yAxis;
					following++;
				}

				if (following >= 5) {
					return true;
				}
			}
		}
	}

	return false;
}

GameManagerModule.prototype.CheckClamps = function(neighbouringPieces, player) {
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			var otherPlayerIndex = player.playerIndex == 1 ? 2 : 1;
			if (!(i === 0 && j === 0) && neighbouringPieces[i][j].value == otherPlayerIndex) {
				var vector = { xAxis: i, yAxis: j };
				var xPlusVector = neighbouringPieces[i][j].coordinates.x + vector.xAxis;
				var yPlusVector = neighbouringPieces[i][j].coordinates.y + vector.yAxis;

				if (this.gameState.board.board[xPlusVector] !== undefined && this.gameState.board.board[xPlusVector + vector.xAxis] !== undefined) {
					if (this.gameState.board.board[xPlusVector][yPlusVector] == otherPlayerIndex && 
							this.gameState.board.board[xPlusVector + vector.xAxis][yPlusVector + vector.yAxis] == player.playerIndex) {
						this.gameState.board.board[xPlusVector][yPlusVector] = this.gameState.board.states.Empty;
						this.gameState.board.board[neighbouringPieces[i][j].coordinates.x][neighbouringPieces[i][j].coordinates.y] = this.gameState.board.states.Empty;

						this.gameState.players[player.playerIndex - 1].clampScore++;
					}
				}
			}
		}
	}
}

GameManagerModule.prototype.SetLastTurnValues = function(x, y, player) {
	this.gameState.lastPlayed.timestamp = new Date().getTime();
	this.gameState.lastPlayed.playerId = player.id;
	this.gameState.lastPlayed.x = x;
	this.gameState.lastPlayed.y = y;
	this.gameState.turnNumber++;
}

GameManagerModule.prototype.GetTurnInfo = function(playerId) {
	var player = this.gameState.players.find(player => player.id === playerId);

	if (this.gameState.playing && new Date().getTime() - this.gameState.startTimestamp >= 600000) {
		this.gameState.prolongation = true;
		var scoreDifference = this.gameState.players[0].clampScore - this.gameState.players[1].clampScore;
		if (scoreDifference !== 0) {
			this.gameState.winner = scoreDifference > 0 ? this.gameState.players[0] : this.gameState.players[1];
		}
	}

	if (!this.PlacedInTime()) {
		this.gameState.winner = this.gameState.players[(player.playerIndex == 1 ? 2 : 1) - 1];
	}

	if (player !== undefined && this.gameState.playing) {
		return {
			status: 200,
			turnInfo: {
				code: 200,
				status: this.gameState.lastPlayed.playerId === player.id ? 0 : 1,
				tableau: this.gameState.board.board,
				nbTenaillesJ1: this.gameState.players[0].clampScore,
				nbTenaillesJ2: this.gameState.players[1].clampScore,
				dernierCoupX: this.gameState.lastPlayed.x,
				dernierCoupY: this.gameState.lastPlayed.y,
				prolongation: this.gameState.prolongation,
				finPartie: this.gameState.winner !== null,
				detailFinPartie: this.gameState.winner !== null ? this.gameState.winner.name + " a gagné!" : null,
				numTour: this.gameState.turnNumber
			}
		};
	}

	return { status: 401 };
}

GameManagerModule.prototype.ResetState = function() {
	this.gameState = {
		startTimestamp: null,
		playing: false,
		turnNumber: 0,
		board: new Board(),
		prolongation: false,
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