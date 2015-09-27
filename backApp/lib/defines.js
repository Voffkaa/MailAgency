'use strict';

module.exports.PATH_TO_CONF = __dirname + '/../../';

module.exports.EXIT_CODE = {
    OK: 0,
    INVALID_ARGUMENT: 1,
    DATABASE_CONNECT_ERROR: 2,
    DATABASE_TRANSACTION_ERROR: 3,
    EXECUTION_ERROR: 4
};

module.exports.RESPONSE_CODES = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    API_ERROR: 597,
    BACKEND_ERROR: 596
};

module.exports.CONFIG_OPTIONS = {
    APP_DATABASE: 'appDatabase',
    LOGS: 'logs',
    SERVER: 'server',
    IS_BEHIND_PROXY: 'isBehindProxy',
    JWT_SECRET: 'jwtSecret',
    COOKIE_SECRET: 'cookieSecret',
    BCRYPT_ROUNDS_NUMBER: 'bcryptRoundsNumber',
    STATIC_DIR: 'staticDir'
};

module.exports.AUTH_URL = '/auth/session';
module.exports.AUTH_TIMEOUT = 16000;

module.exports.PASSWORD_LENGTH_RANGE = {
    MIN: 3,
    MAX: 16
};

module.exports.MAXIMAL_EMAIL_LENGTH = 64;