'use strict';

var express = require('express');
var bodyParser = require('body-parser');

express.response.sendAnswer = function(answer) {
    this.json(answer);
};

var def = require(__dirname + '/lib/defines');
var config = require(__dirname + '/lib/config');
var logger = require(__dirname + '/lib/logger');
var ServerError = require(__dirname + '/lib/error').ServerError;

var app = express();

app.config = config;
app.log = logger.getLogger('[app]');

if(logger.isLogRequests()) {
    app.use(logger.getRequestsLogger('[requests]'));
    app.log.info("Requests logging enabled");
}

app.set('trust proxy', app.config.get(def.CONFIG_OPTIONS.IS_BEHIND_PROXY));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    next(new ServerError("Not found: " + req.path, def.RESPONSE_CODES.NOT_FOUND));
});

app.use(function (err, req, res, next) {

    if(err instanceof ServerError) {

        if(err.stack) {
            app.log.error("ServerError stack: ", err.stack);
        }

        app.log.error("ServerError responseCode: %s, message: ", err.responseCode, err.message);

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
