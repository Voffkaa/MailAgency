'use strict';

var _ = require('underscore');

var options = require(__dirname + '/../conf/options');

module.exports.acceptReturnCodes = function(res) {

    var isAllowed = _.contains(options.ALLOWED_CODES, res.status);

    if(!isAllowed) {
        throw new Error("Status code is not allowed: ", res.text);
    }
};