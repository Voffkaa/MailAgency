/*jshint -W024*/
'use strict';

var fs = require('fs');

var def = require(__dirname + '/../backApp/lib/defines');
var knex = require(__dirname + '/../backApp/lib/knex');

console.log("MailAgency Application database utility");

var cmd = process.argv[2];
var arg = process.argv[3];

function execRawSql(fileName) {

    if(!fileName) {

        console.log("Invalid file");
        process.exit(def.EXIT_CODE.INVALID_ARGUMENT);

    } else {

        var sql = fs.readFileSync(fileName, 'utf8');

        knex.raw(sql)
            .then(function() {
                return knex.destroy();
            })
            .then(function() {
                console.log("Done");
                process.exit(def.EXIT_CODE.OK);
            })
            .catch(function(err) {
                console.log("Database error: ", err.message);
                process.exit(def.EXIT_CODE.DATABASE_TRANSACTION_ERROR);
            });
    }

}

if(cmd) {
    switch(cmd) {
        case 'rawSql': execRawSql(arg); break;
        default: console.log("Unknown command"); process.exit(def.EXIT_CODE.INVALID_ARGUMENT);
    }

} else {
    console.log("No command specified");
    process.exit(def.EXIT_CODE.OK);
}
