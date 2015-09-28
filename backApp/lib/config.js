'use strict';

var nconf = require('nconf');

var def = require(__dirname + '/../../defines');

nconf.env();

var env = nconf.get('NODE_ENV');

var envSuffix = '';

if(env) {
    envSuffix = '.' + env;
}

var configFileName = def.PATH_TO_CONF + 'config' + envSuffix + '.json';

nconf.file(configFileName);

module.exports = nconf;
