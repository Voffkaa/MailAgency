#!/bin/sh

CONFIG_FILE_NAME_PREFIX="webpack.config"
FALLBACK_ENV="master"

if [ -n "$NODE_ENV" ]
    then
        if [ -f $CONFIG_FILE_NAME_PREFIX.$NODE_ENV.js ]
            then
                CONFIG_FILE_NAME=$CONFIG_FILE_NAME_PREFIX.$NODE_ENV.js
            else
                CONFIG_FILE_NAME=$CONFIG_FILE_NAME_PREFIX.$FALLBACK_ENV.js
        fi
    else
        CONFIG_FILE_NAME=$CONFIG_FILE_NAME_PREFIX.js
fi


echo "Configuration file name: $CONFIG_FILE_NAME"

node node_modules/.bin/webpack --config $CONFIG_FILE_NAME --progress --color