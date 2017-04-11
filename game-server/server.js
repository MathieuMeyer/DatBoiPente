var express = require('express');
var app = express();

var env = require('./config.json');

app.get('/connect/:groupName', function(req, res) {
	res.send(req.params.groupName)
});

app.get('/play/:x/:y/:playerId', function(req, res) {
	res.send(req.params.playerId + ' played ' + req.params.x + ':' + req.params.y)
});

app.get('/turn/:playerId', function(req, res) {
	res.send(req.params.playerId)
});

// Launch server
app.listen(env.port, function () {
	console.log('Server running on port ' + env.port)
});