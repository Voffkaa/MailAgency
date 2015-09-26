'use strict';

var bookshelfModule = require('bookshelf');

var knex = require(__dirname + '/knex');

var bookshelf = bookshelfModule(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('registry');

module.exports = bookshelf;
