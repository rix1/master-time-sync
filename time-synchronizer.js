var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

var PORT = 8081;

app.listen(PORT);
console.log('Server listening at http://localhost:' + PORT);

function handler (req, res) {
	console.log('request', req.url);
	res.writeHead(404);
	res.end('Not found');
}

io.on('connection', function (socket) {
	console.log('socket connection with '+ socket.handshake.headers.origin +' established');
	socket.on('timesync', function (data) {
		console.log('message', data);
		socket.emit('timesync', {
			id: data && 'id' in data ? data.id : null,
			result: Date.now()
		});
	});
});
