var model = {
  playerOneName: "",
  playerTwoName: "",
  boardSize: 20,
  currentPlayerColor: 'white',
  currentMoveX: null,
  currentMoveY: null,
  pairsStolen: [],
  won: null,
  whiteStolenPairs: 0,
  blackStolenPairs: 0,
  pieces: {},

  currentOpponentColor: function() {
    if (this.currentPlayerColor == 'white') {
      return 'black';
    } else {
      return 'white';
    }
  },

  currentPlayerName: function() {
    if (this.currentPlayerColor == "white") {
      return this.playerOneName;
    } else {
      return this.playerTwoName;
    }
  },


  resetGame: function() {
    this.pieces = {};
    this.won = "";
    this.currentPlayerColor = "white";
    this.whiteStolenPairs = 0;
    this.blackStolenPairs = 0;
    this.currentPlayerHuman = true;
    this.won = null;
    this.pieces = {};
    this.pairsStolen = [];
    view.initializeBoard();
  }

}

var view = {

  initializeBoard: function() {
    var boardTarget = document.getElementById('gameBoard');
    boardTarget.innerHTML = "";
    for (var i = 1; i < model.boardSize; i ++) {
      var row = document.createElement('tr');
      for (var j = 1; j < model.boardSize; j ++) {
        var cell = document.createElement('td');
        var column = i.toString();
        var roww = j.toString();
        if (column.length < 2) {
          column = "0" + column;
        }
        if (roww.length < 2) {
          roww = "0" + roww;
        }
        var cellId = roww + column;
        cell.setAttribute('id', cellId);
        row.appendChild(cell);
      }
      boardTarget.appendChild(row);
    }

    this.resizeBoard();
    if (debug) console.log('Board initialized. First move: ' + model.currentPlayerColor);
    document.getElementById('stolenWhite').innerHTML = "";
    document.getElementById('stolenBlack').innerHTML = "";
    document.getElementById('options').innerHTML = "Options";
    this.displayMsg('');
    // this.displayMsg('Current move: ' + model.currentPlayerColor);
  },

  resizeBoard: function() {
    var $cells = $('#gameBoard td');
    $cells.height($cells.width());
  },

  placeStone: function(position, color) {
    position = document.getElementById(position);
    position.className = color;
  },

  removeStone: function(position) {
    position = document.getElementById(position); // 'cause now 'position' is returning the coordinates, not the acutal element
    position.className = '';
    console.log('removing ' + position);
  },

  displayMsg: function(message) {
    document.getElementById('msgArea').innerHTML = message;
  },

  updateMoveMsg: function() {
    console.log('updateMoveMsg');
    if (model.twoPlayer) {
      view.displayMsg('Current move: ' + model.currentPlayerName() + ' (' +  model.currentPlayerColor + ')');
    } else {
      view.displayMsg('Current move: ' + model.currentPlayerColor);
    }
  },

  // displayAuxMsg: function(message) {
  //   document.getElementById('auxMessageArea').innerHTML = message;
  // },

  displayStolenPairs: function() {
    console.log('processing stolen pairs images')
    var whiteString = "";
    var blackString = "";
    for (i = 0; i < model.whiteStolenPairs; i ++) {
      whiteString += '<img src="images/stolen-white.png" alt="Stolen White Pair">';
    }
    for (i = 0; i < model.blackStolenPairs; i ++) {
      blackString += '<img src="images/stolen-black.png" alt="Stolen White Pair">';
    }
    console.log(whiteString);
    console.log(blackString);
    document.getElementById('stolenWhite').innerHTML = whiteString;
    document.getElementById('stolenBlack').innerHTML = blackString;
  },

  displayWin: function() {
    var winString = 'Game over: ';
    if (model.twoPlayer) {
      winString += model.currentPlayerName() + ' (' +  model.currentPlayerColor + ') wins.';
    } else {
      if (model.currentPlayerHuman) {
        winString += 'You win. (' + model.currentPlayerColor + ')';
      } else {
        winString += 'Computer wins. (' + model.currentPlayerColor + ')';
      }
  }
  
  },

    }

    if (model.won) {
      model.resetGame();
    }



window.onload = function() {
  view.initializeBoard();
  $(window).resize(view.resizeBoard);
  var el = document.getElementById('gameBoard');
}