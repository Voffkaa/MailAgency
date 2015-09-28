'use strict';

var knex = require('knex');

var config = require(__dirname + '/config');
var def = require(__dirname + '/../../defines');

var dbOptions = config.get(def.CONFIG_OPTIONS.APP_DATABASE);

module.exports = knex({
    client: 'pg',
    connection: dbOptions,
    debug: config.get(def.CONFIG_OPTIONS.LOGS).sqlQueries
});
