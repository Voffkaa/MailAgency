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

                console.log("#%d: %s:\t%s:\t%s",
                    i,
                    u.get('id'),
                    u.get('email'),
                    u.get('isSuperuser') ? "superuser": "user");
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
//
//function removeUser() {
//
//    var email = process.argv[3];
//
//    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
//        console.log("Invalid email");
//        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
//    } else {
//
//        UsersController.removeUser(email)
//            .then(function() {
//                console.log("User removed");
//                process.exit(def.EXIT_CODE.OK);
//            })
//            .catch(function(err) {
//                console.log(err);
//                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
//            });
//
//    }
//
//}
//
//function setUserPassword() {
//
//    var email = process.argv[3];
//
//    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
//        console.log("Invalid email");
//        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
//    } else {
//
//        var pwd = process.argv[4];
//
//        var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);
//
//        actionPromise
//            .then(function(p) {
//
//                return UsersController.setUserPassword(email, p);
//
//            })
//            .then(function() {
//                console.log("User password changed");
//                process.exit(def.EXIT_CODE.OK);
//            })
//            .catch(function(err) {
//                console.log(err);
//                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
//            });
//
//    }
//
//}
//
//function checkUserPassword() {
//
//    var email = process.argv[3];
//
//    if(!validator.isEmail(email, {allow_utf8_local_part: false})) {
//        console.log("Invalid email");
//        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
//    } else {
//
//        var pwd = process.argv[4];
//
//        var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);
//
//        actionPromise
//            .then(function(p) {
//
//                return UsersController.checkUserPassword(email, p);
//
//            })
//            .then(function(res) {
//
//                if(res) {
//                    console.log("Valid password");
//                } else {
//                    console.log("Invalid password");
//                }
//
//                process.exit(def.EXIT_CODE.OK);
//            })
//            .catch(function(err) {
//                console.log(err);
//                process.exit(def.EXIT_CODE.EXECUTION_ERROR);
//            });
//
//    }
//
//}
//
//function hashString() {
//
//    var pwd = process.argv[3];
//
//    var actionPromise = (_.isEmpty(pwd)) ? password.readPassword("Enter password: ") : Promise.resolve(pwd);
//
//    actionPromise
//        .then(function(p) {
//
//            console.log("Password hash: \"%s\"", password.encryptPasswordSync(p));
//
//            process.exit(def.EXIT_CODE.OK);
//
//        })
//        .catch(function(err) {
//            console.log(err);
//            process.exit(def.EXIT_CODE.EXECUTION_ERROR);
//        });
//
//}

if(cmd) {
    switch(cmd) {
        case 'list': listUsers(); break;
        case 'add': addUser(); break;
        //case 'remove': removeUser(); break;
        //case 'passwd': setUserPassword(); break;
        //case 'check': checkUserPassword(); break;
        //case 'hash': hashString(); break;
        default: console.log("Unknown command"); process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    }

} else {
    console.log("No command specified");
    console.log("Usage: manageUsers list");
    console.log("Usage: manageUsers add <email> [<password>]");
    process.exit(def.EXIT_CODE.OK);
}
