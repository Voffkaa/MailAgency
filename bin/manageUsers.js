/*jshint -W024*/
'use strict';

var _ = require('underscore');
var validator = require('validator');
var Promise = require('bluebird');

var def = require(__dirname + '/../backApp/lib/defines');
var password = require(__dirname + '/../backApp/lib/password');

var UsersController = require(__dirname + '/../backApp/controllers/users');

console.log("MailAgency users utility");

var cmd = process.argv[2];

function listUsers() {

    console.log("Users:");

    UsersController.readAll()
        .then(function(list) {

            var i = 0;

            _.each(list.models, function(u) {

                console.log("#%d:%s:%s:%s",
                    i,
                    u.get('id'),
                    u.get('isSuperuser') ? "superuser": "user",
                    u.get('email'));
                i++;

            });

            return list.length;

        })
        .then(function(usersNumber) {
            console.log("Total: ", usersNumber);
            process.exit(def.EXIT_CODE.OK);
        })
        .catch(function(err) {
                console.log(err);
                process.exit(def.EXIT_CODE.DATABASE_TRANSACTION_ERROR);
            });

}

function addUser() {

    var email = process.argv[3];

    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
        console.log("Invalid email");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    } else {
        var pwd = process.argv[4];

        var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);

        actionPromise
            .then(function(p) {

                return UsersController.createUser(email, p);

            })
            .then(function() {
                console.log("User created");
                process.exit(def.EXIT_CODE.OK);
            })
            .catch(function(err) {
                console.log(err);
                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
            });

    }

}

function setSuperuser() {

    var email = process.argv[3];
    var onOff = process.argv[4];

    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
        console.log("Invalid email");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    } else if(!validator.isIn(onOff, ["on", "off"])) {
        console.log("Invalid state argument");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    } else {

        UsersController.setSuperuser(email, onOff === "on")
            .then(function() {
                console.log("User changed");
                process.exit(def.EXIT_CODE.OK);
            })
            .catch(function(err) {
                console.log(err);
                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
            });

    }

}


function deleteUser() {

    var email = process.argv[3];

    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
        console.log("Invalid email");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    } else {

        UsersController.deleteUser(email)
            .then(function() {
                console.log("User deleted");
                process.exit(def.EXIT_CODE.OK);
            })
            .catch(function(err) {
                console.log(err);
                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
            });

    }

}

function setUserPassword() {

    var email = process.argv[3];

    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
        console.log("Invalid email");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    } else {

        var pwd = process.argv[4];

        var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);

        actionPromise
            .then(function(p) {

                return UsersController.setUserPassword(email, p);

            })
            .then(function() {
                console.log("User password changed");
                process.exit(def.EXIT_CODE.OK);
            })
            .catch(function(err) {
                console.log(err);
                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
            });

    }

}

function hashPassword() {

    var pwd = process.argv[3];

    var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);

    actionPromise
        .then(function(p) {

            console.log("Password hash: \"%s\"", password.encryptPasswordSync(p));

            process.exit(def.EXIT_CODE.OK);

        })
        .catch(function(err) {
            console.log(err);
            process.exit(def.EXIT_CODE.EXECUTION_ERROR);
        });
}

if(cmd) {
    switch(cmd) {
        case 'listUsers': listUsers(); break;
        case 'addUser': addUser(); break;
        case 'setSuperuser': setSuperuser(); break;
        case 'deleteUser': deleteUser(); break;
        case 'setPassword': setUserPassword(); break;
        case 'hashPassword': hashPassword(); break;
        default: console.log("Unknown command"); process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    }

} else {
    console.log("No command specified");
    console.log("Usage: manageUsers listUsers");
    console.log("Usage: manageUsers addUser <email> [<password>]");
    console.log("Usage: manageUsers setSuperuser <email> on|off");
    console.log("Usage: manageUsers deleteUser <email>");
    console.log("Usage: manageUsers setPassword <email> [<password>]");
    console.log("Usage: manageUsers hashPassword <password>");
    process.exit(def.EXIT_CODE.OK);
}
