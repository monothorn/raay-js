var express = require('express');
var path = require('path');
var config = require('./config');
var log = require('./core/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressPath = require('express-path');
var routes = require('./routes');
var managedRoutes = require('./utilities/routeManagerUtility').handle(routes);
var db = require('./db').db;
global.__basedir = __dirname;//base directory

var app = express();
app.set('config', config);

if (process.env.NODE_ENV !== 'production') {
    var swaggerUi = require('swagger-ui-express');
    var swaggerDocument = require('./swagger.json');
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

var helmet = require('helmet')
app.use(helmet())

app.use(function (req, res, next) {
    log.info("Request Received: %s %s", req.method, req.url);
    req.log = log;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
expressPath(app, managedRoutes, {verbose: true});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.send({status_code: 404, message: "Not found", data: null});
});

// error handler
app.use(function (err, req, res, next) {
    log.error({
        method: req.method,
        url: req.url,
        payload: req.body,
        error_code: err.status,
        message: err.message,
        trace: err.stack
    });
    res.status(err.status || 500);
    res.send({status_code: err.status, message: err.message, data: null});
});


module.exports = app;
