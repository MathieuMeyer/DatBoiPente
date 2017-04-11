var BoardModule = function () {
    this.states = {
        Empty: 0,
        PlayerOne: 1,
        PlayerTwo: 2
    };

    this.board = [];
    for (var x = 1; x <= 19; x++) {
        var row = []
        for (var y = 1; y <= 19; y++) {
            row[y] = this.states.Empty;
        }
        this.board[x] = row;
    }
    this.board[2][3] = this.states.PlayerOne;
};

BoardModule.prototype.LogBoard = function() {
    for (var x = 1; x <= 19; x++) {
        var toLog = "";
        for (var y = 1; y <= 19; y++)
            toLog += this.board[y][x] + " ";
        console.log(toLog);
    }
}

BoardModule.prototype.CanPlace = function(x, y) {
    return this.board[x][y] == this.states.Empty;
}

module.exports = BoardModule;