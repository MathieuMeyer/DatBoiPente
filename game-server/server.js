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
		res.setHeader('Content-Type', 'text/plain');
		res.send('Unauthorized');
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
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(action.turnInfo));
});

// Launch server
app.listen(env.port, function () {
	console.log('Server running on port ' + env.port)
});