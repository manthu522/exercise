var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./utility/logger');
var config = require('./config');
var expressValidator = require('express-validator');
var cors = require('cors');

var app = express();

logger.info("App starting.");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // automatically supports pre-flighting

// Add routes
require('./routes')(app);

// error handlers
app.disable('x-powered-by');

//Invalid request URI or Invalid Method
app.get('/*', function(req, res, next) {
	res.json([ {
		status : "error",
		message : 'Invalid API request!'
	} ]);
});

app.use(function(err, req, res, next) {

			if (err instanceof Error) {
				res.send({
					status : "error",
					message : err.message
				});
			} else {
				res.send({
					status : err.status,
					message : err.message,
					errors : err.errors
				});
			}

});

app.listen(config.port);

logger.info("Application is running: " + config.url);

module.exports = app;
