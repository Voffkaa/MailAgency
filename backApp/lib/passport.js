'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');

var def = require(__dirname + '/../../defines');
var BackendError = require(__dirname + '/error').BackendError;
var logger = require(__dirname + '/logger').getLogger('[lib: passport]');
var token = require(__dirname + '/token');
var session = require(__dirname + '/session');

var UsersController = require(__dirname + '/../controllers/users');

function verifyLocal(email, password, done) {

    logger.debug("verifyLocal: " + email + ":" + password);

    return UsersController.authenticateUser(email, password)
        .then(function(u) {
            return done(null, u);
        })
        .catch(function(err) {
            return done(err);
        });
}

passport.authenticateLocal = function(req, res, next) {

    if( !(Object.keys(req.body).length === 2) ||
        !req.body.email ||
        !req.body.password ||
        !(req.body.email.length <= def.MAXIMAL_EMAIL_LENGTH) ||
        !validator.isEmail(req.body.email) ||
        !validator.isLength(req.body.password, def.PASSWORD_LENGTH_RANGE.MIN, def.PASSWORD_LENGTH_RANGE.MAX) ||
        !validator.isAlphanumeric(req.body.password)) {

        var backendError = new BackendError("Invalid credentials format");
        return next(backendError)

    }

    return passport.authenticate('local', {session: false}, function(err, user) {

        logger.debug("authenticateLocal: err: " + err);
        logger.debug("authenticateLocal: user: " + user);

        if(err || !user) {

            var backendError = new BackendError();

            backendError.message = user ? err.message : "Invalid credentials";

            return next(backendError);
        } else {

            return session.createSession()
                .then(function(sessionData) {

                        var tokenData = {
                            userId: user.get('id'),
                            sessionId: sessionData.sessionId
                        };

                        var answer = {
                            access_token: token.sign(tokenData)
                        };

                        logger.info("authenticateLocal: new session: userId: %s, sessionId: %s",
                            tokenData.userId,
                            tokenData.sessionId);

                        res.cookie('sessionId', sessionData.sessionId, {signed: true, httpOnly: true});

                        res.sendAnswer(answer);
                    })
                .catch(function(err) {
                        var backendError = new BackendError(err.message);
                        return next(backendError)
                    });

        }

    })(req, res, next);
};

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, verifyLocal));

module.exports = passport;
