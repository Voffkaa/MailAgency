'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

express.response.sendAnswer = function(answer) {
    this.json(answer);
};

var def = require(__dirname + '/lib/defines');
var config = require(__dirname + '/lib/config');
var logger = require(__dirname + '/lib/logger');
var ServerError = require(__dirname + '/lib/error').ServerError;
var BackendError = require(__dirname + '/lib/error').BackendError;

var authRoute = require(__dirname + '/routes/auth');
var loginRoute = require(__dirname + '/routes/login');
var indexRoute = require(__dirname + '/routes/index');

var app = express();

app.config = config;
app.log = logger.getLogger('[app]');

if(logger.isLogRequests()) {
    app.use(logger.getRequestsLogger('[requests]'));
    app.log.info("Requests logging enabled");
}

app.set('trust proxy', app.config.get(def.CONFIG_OPTIONS.IS_BEHIND_PROXY));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(cookieParser(app.config.get(def.CONFIG_OPTIONS.COOKIE_SECRET)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var staticDir = app.config.get(def.CONFIG_OPTIONS.STATIC_DIR);

if(staticDir) {
    app.use('/static', express.static(staticDir));
}

app.use('/auth', authRoute);
app.use('/login', loginRoute);
app.use('/', indexRoute);

app.use(function (req, res, next) {
    next(new ServerError("Not found: " + req.path, def.RESPONSE_CODES.NOT_FOUND));
});

app.use(function (err, req, res, next) {

    if(err instanceof BackendError) {

        if(err.stack) {
            app.log.error("BackendError stack: ", err.stack);
        }

        app.log.error("BackendError message: ", err.message);
        app.log.error("BackendError responseCode: ", err.responseCode);

        res.status(err.responseCode);
        res.sendAnswer({message: err.message});
    } else {
        next(err);
    }
});

app.use(function (err, req, res) {
    app.log.error(err.stack);
    res.status(def.RESPONSE_CODES.SERVER_ERROR).send("Server error");
});

module.exports = app;
