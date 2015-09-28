'use strict';

var readline = require('readline');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

var def = require(__dirname + '/../../defines');
var config = require(__dirname + '/config');

var readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var roundsNumber = config.get(def.CONFIG_OPTIONS.BCRYPT_ROUNDS_NUMBER);

module.exports.encryptPassword = function(plainText) {
    return new Promise(function(resolve, reject) {

        bcrypt.genSalt(roundsNumber, function(err, salt) {

            if(err) {
                reject(err);
            } else {
                bcrypt.hash(plainText, salt, function(err, hash) {

                    if(err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }

                });
            }

        });

    });
};

module.exports.readPassword = function(query) {
    return new Promise(function(resolve, reject) {

        var stdin = process.openStdin();

        process.stdin.on("error", function() {
            reject(new Error("stdin error"));
        });

        process.stdin.on("data", function (character) {
            character += "";
            switch (character) {
                case "\n":
                case "\r":
                case "\x04":
                    stdin.pause();
                    break;
                default:
                    var arr = new Array(readlineInterface.line.length + 1);
                    process.stdout.write("\x1B[2K\x1B[200D" + query + arr.join("*"));
                    break;
            }
        });

        readlineInterface.question(query, function (value) {
            readlineInterface.history = readlineInterface.history.slice(1);
            resolve(value);
            readlineInterface.close();

        });

    });
};

module.exports.checkPassword = function(plainText, hash) {
    return new Promise(function(resolve, reject) {

        bcrypt.compare(plainText, hash, function(err, res) {

            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });

    });
};

module.exports.encryptPasswordSync = function(plainText) {

    var salt = bcrypt.genSaltSync(roundsNumber);

    return bcrypt.hashSync(plainText, salt);
};