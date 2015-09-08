'use strict';

var app = require(__dirname + '/../backApp/app');
var def = require(__dirname + '/../backApp/lib/defines');

var server = app.listen(app.config.get(def.CONFIG_OPTIONS.SERVER), function() {

    app.log.info("Started at: ", server.address());

});
