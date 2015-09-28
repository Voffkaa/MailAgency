'use strict';

var express = require('express');

var def = require(__dirname + '/../lib/defines');

var login = express.Router({
    caseSensitive: true,
    strict: true
});

login.get('/', function(req, res) {

    var sc = req.signedCookies;

    if(sc['sessionId']) {

        res.redirect('/');

    } else {
        res.render('login', {
            authUrl: def.AUTH_URL,
            authTimeout: def.AUTH_TIMEOUT
        });
    }
});

module.exports = login;
