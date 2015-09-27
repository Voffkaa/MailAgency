'use strict';

module.exports.goodUserCredentials = {
    email: "admin@example.com",
    password: "admin"
};

module.exports.invalidUserCredentials = {
    email: "badadmin@example.com",
    password: "admin"
};

module.exports.invalidPasswordCredentials = {
    email: "admin@example.com",
    password: "badPassword"
};
