var express = require('express');
var app = express();

var env = require('./config.json');

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.listen(env.port, function () {
	console.log('Example app listening on port 3000!')
})
