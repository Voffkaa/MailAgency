'use strict';

var _ = require('underscore');

var password = require(__dirname + '/../lib/password');

var UserModel = require(__dirname + '/../models/user');

module.exports.readAll = function() {
    return UserModel.forge().fetchAll();
};

module.exports.createUser = function(email, plainTextPassword) {

    return password.encryptPassword(plainTextPassword)
        .then(function(hash) {
            var u = new UserModel({email: email, passwordHash: hash});

            return u.save(null, {method: 'insert'});
        });

};

module.exports.readUser = function(email) {

    return UserModel.forge()
        .where({email: email})
        .fetch({require: r});

};

module.exports.setSuperuser = function(email, isSuperuser) {

    return module.exports.readUser(email)
        .then(function(u) {

            u.set('isSuperuser', isSuperuser);

            return u.save(null, {method: 'update'});
        });

};

module.exports.deleteUser = function(email) {

    return UserModel.where({email: email}).destroy();

};

module.exports.setUserPassword = function(email, plainTextPassword) {

    return password.encryptPassword(plainTextPassword)
        .then(function(hash) {

            return module.exports.readUser(email)
                .then(function(u) {

                    u.set('passwordHash', hash);

                    return u.save(null, {method: 'update'});
                });
        });

};

module.exports.authenticateUser = function(email, plainTextPassword) {
    // Not "read" method because of require: false
    return UserModel.forge()
        .where({email: email})
        .fetch({require: false})
        .then(function(user) {

            if(_.isNull(user)) {
                return false;
            }

            var hash = user.get('passwordHash');

            return password.checkPassword(plainTextPassword, hash)
                .then(function(isValidPassword) {

                    return isValidPassword ? user : false;

                });

        });
};