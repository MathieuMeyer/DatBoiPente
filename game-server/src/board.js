var BoardModule = function () {
	this.size = {
		x: { start: 0, end: 18 },
		y: { start: 0, end: 18 }
	}

	this.states = {
		Empty: 0,
		PlayerOne: 1,
		PlayerTwo: 2
	};

	this.board = [];
	this.ResetBoard();

	this.board[2][2] = this.states.PlayerTwo;
	this.board[3][3] = this.states.PlayerOne;
	this.board[4][4] = this.states.PlayerOne;
};

BoardModule.prototype.ResetBoard = function() {
	for (var x = this.size.x.start; x <= this.size.x.end; x++) {
		var row = []
		for (var y = this.size.y.start; y <= this.size.y.end; y++) {
			row[y] = this.states.Empty;
		}
		this.board[x] = row;
	}
}

BoardModule.prototype.LogBoard = function() {
	console.log("--- Board ---");
	for (var x = this.size.x.start; x <= this.size.x.end; x++) {
		var toLog = "";
		for (var y = this.size.y.start; y <= this.size.y.end; y++) {
			toLog += this.board[x][y] + " ";
		}
		console.log(toLog);
	}
}

BoardModule.prototype.CanPlace = function(turnNumber, x, y) {
	if (!(this.size.x.start <= x && x <= this.size.x.end || this.size.y.start <= y && y <= this.size.y.end)) { return false; }
	if (turnNumber == 0 && (x !== this.size.x.start + 9 || y !== this.size.y.start + 9)) { return false; }
	if (turnNumber == 2 && ((this.size.x.start + 7 <= x && x <= this.size.x.end - 7) && (this.size.y.start + 7 <= y && y <= this.size.y.end - 7))) { return false; }

	return this.board[x][y] !== undefined && this.board[x][y] == this.states.Empty;
}

BoardModule.prototype.GetNeighbouringPieces = function(x, y) {
	var neighbouringPieces = [];
	for (var i = -1; i <= 1; i++) {
		var row = [];
		var xCoord = eval(x + i);

		for (var j = -1; j <= 1; j++) {
			row[j] =  {
				value: this.board[xCoord] !== undefined ? this.board[xCoord][eval(y + j)] : undefined,
				coordinates: {
					x: x + i,
					y: y + j
				}
			}
		}

		neighbouringPieces[i] = row;
	}

	return neighbouringPieces;
}

module.exports = BoardModule;