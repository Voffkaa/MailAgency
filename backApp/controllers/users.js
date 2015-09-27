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

module.exports.read = function(email) {

    return UserModel.forge()
        .where({email: email})
        .fetch({require: true});

};

module.exports.setSuperuser = function(email, isSuperuser) {

    return module.exports.read(email)
        .then(function(u) {

            u.set('isSuperuser', isSuperuser);

            return u.save();
        });

};

module.exports.deleteUser = function(email) {

    return UserModel.where({email: email}).destroy();

};

module.exports.setUserPassword = function(email, plainTextPassword) {

    return password.encryptPassword(plainTextPassword)
        .then(function(hash) {

            return module.exports.read(email)
                .then(function(u) {

                    u.set('passwordHash', hash);

                    return u.save();
                });
        });

};