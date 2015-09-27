'use strict';

var express = require('express');

var passport = require(__dirname + '/../lib/passport');

var auth = express.Router({
    caseSensitive: true,
    strict: true
});

auth.post('/session', passport.authenticateLocal);

//auth.delete('/session', function(req, res, next) {
//
//    var sc = req.signedCookies;
//
//    if(sc['sessionId']) {
//
//        res.clearCookie('sessionId');
//
//        res.sendAnswer({});
//
//    } else {
//        next();
//    }
//
//});

module.exports = auth;
