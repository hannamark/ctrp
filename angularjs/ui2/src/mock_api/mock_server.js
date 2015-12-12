/*jshint node:true*/

'use strict';
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7203;
var routes;

var environment = process.env.NODE_ENV;

server.use(favicon(__dirname + '/favicon.ico'));
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(compress());
server.use(logger('dev'));
server.use(cors());
server.use(errorHandler.init);

routes = require('./routes/index')(server);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

server.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        server.use(express.static('./build/'));
        server.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        server.use(express.static('./src/')); //equivalent to client
        server.use(express.static('./'));
        server.use(express.static('./tmp'));
        server.use('/*', express.static('./src/index.html'));
        break;
}

server.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
