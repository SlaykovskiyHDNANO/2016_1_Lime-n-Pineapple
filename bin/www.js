var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';


var app = require('../server');
var debug = require('debug')('LimeNPineapple:server');
var http = require('http');
var express = require('express');


app.set('port', PORT);

//Application server
var server = http.createServer(app);

server.listen(PORT, HOSTNAME, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT)
});
server.on('error', onError);
server.on('listening', onListening);


// triggers on error event
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;


    var bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle errors on startup phase (basically, just explains failure and exits)
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' address is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Debug function triggers on listen() events.
// TODO: remove when production
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}