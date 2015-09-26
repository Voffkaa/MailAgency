#!/bin/sh

node bin/manageAppDatabase.js rawSql backApp/database/10_clearDatabase.sql
node bin/manageAppDatabase.js rawSql backApp/database/20_initializeStructure.sql
