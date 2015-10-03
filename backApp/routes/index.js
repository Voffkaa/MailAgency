'use strict';

var express = require('express');

var def = require(__dirname + '/../../defines');
var config = require(__dirname + '/../lib/config');

var index = express.Router({
    caseSensitive: true,
    strict: true
});

index.get('*', function (req, res) {

    var sc = req.signedCookies;

    if(sc['sessionId']) {

        res.render('index', {
            authUrl:     def.AUTH_URL,
            authTimeout: def.AUTH_TIMEOUT
        });

    } else {
        res.cookie('originalUrl', req.originalUrl, {
            signed: false,
            httpOnly: false,
            maxAge: def.ORIGINAL_URL_COOKIE_MAX_AGE
        });
        res.redirect('/login');
    }

});

module.exports = index;
