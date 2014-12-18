var express = require('express');
var app = express();

app.use(express.static('.'));

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8000;
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var server = app.listen(port, ipaddr, function() {
	console.log('Listening on port %d', port);
});