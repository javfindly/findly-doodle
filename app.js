var express = require('express');
var app = express();

app.use(express.static('.'));

var port = parseInt(process.env.PORT) || 8000;

var server = app.listen(port, function() {
	console.log('Listening on port %d', port);
});