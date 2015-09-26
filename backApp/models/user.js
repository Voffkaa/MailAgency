'use strict';

var uuid = require('node-uuid');

var bookshelf = require(__dirname + '/../lib/bookshelf');

var User = bookshelf.Model.extend({
    tableName: 'Users',
    defaults: function() {
        this.set('id', uuid.v4());
    }
});

module.exports = bookshelf.model('User', User);