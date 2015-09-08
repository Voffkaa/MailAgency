'use strict';

var log4js = require('log4js');
var _ = require('lodash');

var config = require(__dirname + '/config');

var logOptions = config.get('logs');

module.exports.isLogRequests = function() {

    return !_.isEmpty(logOptions.requests);

};

module.exports.getLogger = function(name) {
    var l = log4js.getLogger(name);
    l.setLevel(logOptions.level);
    return l;
};

module.exports.getRequestsLogger = function(name) {
    var l = log4js.getLogger(name);

    return log4js.connectLogger(
        l,
        {
            level: log4js.levels[logOptions.requests.level],
            format: logOptions.requests.format
        });
};
