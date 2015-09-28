'use strict';

var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var def = require(__dirname + '/../../defines');
var config = require(__dirname + '/config');

var jwtSecret = config.get(def.CONFIG_OPTIONS.JWT_SECRET);

module.exports.sign = function sign(payload) {
    return jwt.sign(payload, jwtSecret);
};

module.exports.verify = function verify(token) {

    return new Promise(function(resolve, reject) {
        jwt.verify(token, jwtSecret, function(err, decoded) {

            if(err) {
                reject(err);
            } else {
                resolve(decoded);
            }

        });
    });
};
