var routes = require('./routes');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var http = require('http');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets'));

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
  app.use(logger('dev'));
}

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

var default_port = 8081;
if (app.get('env') === 'development') {
    default_port = 8080;
}

var port = process.env.PORT || default_port;
app.set('port', 8888);

// Start server
app.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
