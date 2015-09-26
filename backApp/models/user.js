'use strict';

var bookshelf = require(__dirname + '/../lib/bookshelf');

var User = bookshelf.Model.extend({
    tableName: 'Users'
});

module.exports = bookshelf.model('User', User);