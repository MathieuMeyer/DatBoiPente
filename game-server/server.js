var express = require('express');
var app = express();

var env = require('./config.json');

var GameManager = require('./src/game-manager.js');
var gameManager = new GameManager(env);

app.get('/connect/:playerName', function(req, res) {
	var action = gameManager.AddPlayer(req.params.playerName);

	res.status(action.status);
	if (action.player !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			idJoueur: action.player.id,
			nomJoueur: action.player.name,
			numJoueur: action.player.playerIndex,
			code: action.status
		}));
	}
	else {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ code: action.status }));
	}
});

app.get('/play/:x/:y/:playerId', function(req, res) {
	var action = gameManager.Play(req.params.x, req.params.y, req.params.playerId);
	
	res.status(action.status);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ code: action.status }));
});

app.get('/turn/:playerId', function(req, res) {
	var action = gameManager.GetTurnInfo(req.params.playerId);

	res.status(action.status);
	console.log(action);
	if (action.turnInfo !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ 
				code: action.status,
				status: action.turnInfo.status,
				tableau: action.turnInfo.board,
				nbTenaillesJ1: action.turnInfo.tenailleJ1,
				nbTenaillesJ2: action.turnInfo.tenailleJ2,
				dernierCoupX: action.turnInfo.lastPlayed.x,
				dernierCoupY: action.turnInfo.lastPlayed.y,
				prolongation: action.turnInfo.prolongation,
				finPartie: action.turnInfo.endGame,
				detailFinPartie: action.turnInfo.detailEndGame,
				numTour: action.turnInfo.turnNumber
			}));
	}
	else {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({code: action.status}));
	}
});

// Launch server
app.listen(env.port, function () {
	console.log('Server running on port ' + env.port)
});