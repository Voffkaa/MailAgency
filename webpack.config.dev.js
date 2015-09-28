var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var envSuffix = process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '.';
var configFileName = './config' + envSuffix + '.json';

var def = require(__dirname + '/defines');
var config = require(__dirname + '/' + configFileName);

var staticDir = config.staticDir || __dirname + '/static';

console.log("Output dir: ", staticDir);

module.exports = {};

module.exports.output = {
        path: staticDir,
        filename: def.FRONTAPP_NAME
};

module.exports.entry = {
    vendors: ["jquery", "underscore", "backbone"]
};

module.exports.plugins = [
    new CommonsChunkPlugin("vendors", "vendors.js")
];
