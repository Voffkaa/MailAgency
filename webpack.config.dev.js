var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var envSuffix = process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '.';
var configFileName = './config' + envSuffix + '.json';

var def = require(__dirname + '/defines');
var config = require(__dirname + '/' + configFileName);

var staticDir = config.staticDir || __dirname + '/static';

console.log("Output dir: ", staticDir);

module.exports = {};
module.exports.module = {};
module.exports.resolve = {};

module.exports.output = {
        path: staticDir,
        filename: def.FRONTAPP_NAME
};

module.exports.entry = {
    dashboard: [
        'dashboard/logout.js',
        'dashboard/navbar.jsx'
    ],
    vendors: [
        'underscore',
        'backbone',
        'react',
        'react-bootstrap'
    ]
};

module.exports.plugins = [
    new CommonsChunkPlugin('vendors', 'vendors.js'),
    new ExtractTextPlugin('app.css', { allChunks: true })
];

module.exports.module.loaders = [
    {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
    },
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    }

];

module.exports.resolve.root = [__dirname + '/frontApp'];
module.exports.resolve.alias = {
    'react': __dirname + '/node_modules/react'
};