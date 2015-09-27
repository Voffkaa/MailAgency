/*global describe, it, before*/
'use strict';

var supertest = require('supertest');
var test = require('unit.js');

var app = require(__dirname + '/../../backApp/app');

var testUsers = require(__dirname + '/../conf/users');
var options = require(__dirname + '/../conf/options');
var expectUtils = require(__dirname + '/../lib/expectUtils');

var request = supertest(app);

describe("/api/auth", function() {

    this.timeout(options.MOCHA_TIMEOUT);

    it("Get access token", function(done) {

        request.post('/auth/session')
            .send(testUsers.goodUserCredentials)
            .expect(expectUtils.acceptReturnCodes)
            .end(function(err, result) {

                if(err) {
                    return done(err);
                }

                test.object(result).hasProperty('status', 200);

                var answer = JSON.parse(result.text);

                //console.log(answer);

                test.object(answer).hasProperty('access_token');
                test.string(answer.access_token).isNotEmpty();

                done();

            });
    });

    it("Get access token with invalid username", function(done) {

        request.post('/auth/session')
            .send(testUsers.invalidUserCredentials)
            .expect(expectUtils.acceptReturnCodes)
            .end(function(err, result) {

                if(err) {
                    return done(err);
                }

                test.object(result).hasProperty('status', 596);

                var answer = JSON.parse(result.text);

                //console.log(answer);

                test.object(answer).hasProperty('message', 'Invalid credentials');

                done();

            });
    });

    it("Get access token with invalid password", function(done) {

        request.post('/auth/session')
            .send(testUsers.invalidPasswordCredentials)
            .expect(expectUtils.acceptReturnCodes)
            .end(function(err, result) {

                if(err) {
                    return done(err);
                }

                test.object(result).hasProperty('status', 596);

                var answer = JSON.parse(result.text);

                //console.log(answer);

                test.object(answer).hasProperty('message', 'Invalid credentials');

                done();

            });
    });

});
