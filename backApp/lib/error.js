'use strict';

var def = require(__dirname + '/defines');

function ApiError(message, responseCode) {
    this.name = 'ApiError';
    this.message = message;
    this.responseCode = responseCode || def.RESPONSE_CODES.API_ERROR;
}

function ServerError(message, responseCode) {
    this.name = 'ServerError';
    this.message = message;
    this.responseCode = responseCode || def.RESPONSE_CODES.SERVER_ERROR;
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

module.exports.ApiError = ApiError;
module.exports.ServerError = ServerError;
