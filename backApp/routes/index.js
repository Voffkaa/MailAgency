//'use strict';
//
//var express = require('express');
//var validator = require('validator');
//
//var def = require(__dirname + '/../lib/defines');
//var config = require(__dirname + '/../lib/config');
//var logger = require(__dirname + '/../lib/logger').getLogger('[routes: index]');
//
//var index = express.Router({
//    caseSensitive: true,
//    strict: true
//});
//
//index.get('*', function (req, res, next) {
//
//    var sc = req.signedCookies;
//
//    var a = req.path.replace('/','').split('/');
//    var moduleName = a[0] || def.INDEX_MODULE;
//
//    logger.debug("path: ", req.path);
//    logger.debug("moduleName: ", moduleName);
//
//    if(!validator.isIn(moduleName, def.ALLOWED_MODULES)) {
//        return next();
//    }
//
//    if(sc['sessionId']) {
//
//        res.render('index', {
//            moduleName: moduleName,
//            apiUrl: config.get('apiUrl') || req.protocol + "://" + req.headers['host'] + "/api"
//        });
//
//    } else {
//        res.cookie('originalUrl', req.originalUrl, {
//            signed: false,
//            httpOnly: false,
//            maxAge: def.ORIGINAL_URL_COOKIE_MAX_AGE
//        });
//        res.redirect('/login');
//    }
//
//});
//
//module.exports = index;
