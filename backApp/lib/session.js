'use strict';

var uuid = require('node-uuid');
var Promise = require('bluebird');

module.exports.createSession = function() {
    return new Promise(function(resolve) {

        var sessionData = {
            sessionId: uuid.v4()
        };

        resolve(sessionData);
    });
};
