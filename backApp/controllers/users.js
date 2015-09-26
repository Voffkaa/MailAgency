'use strict';

var _ = require('underscore');

var password = require(__dirname + '/../lib/password');

var UserModel = require(__dirname + '/../models/user');

module.exports.readAll = function() {
    return UserModel.forge().fetchAll();
};

module.exports.createUser = function(email, plainTextPassword) {

    return password.encryptPassword(plainTextPassword)
        .then(function(hash) {
            var u = new UserModel({email: email, passwordHash: hash});

            return u.save(null, {method: 'insert'});
        });

};

//module.exports.read = function(userId, require) {
//
//    var r = require || true;
//
//    return UserModel.forge()
//        .where({id: userId})
//        .fetch({
//            require: r,
//            withRelated: ['permissions', 'organization', 'department', 'post']
//        })
//};
//
//module.exports.authenticate = function(email, plainTextPassword) {
//    return UserModel.forge().where({email: email}).fetch({columns: ['id', 'passwordHash']})
//        .then(function(user) {
//
//            if(!_.isNull(user)) {
//
//                var hash = user.get('passwordHash');
//
//                return password.checkPassword(plainTextPassword, hash)
//                    .then(function(isValidPassword) {
//
//                        if(isValidPassword) {
//                            return user;
//                        }
//
//                        return false;
//
//                    });
//
//            } else {
//                return false;
//            }
//        })
//};
//
//var extractProfile = function(u) {
//
//    var answer = {};
//
//    answer.userId = u.get('id');
//    answer.email = u.get('email');
//    answer.firstName = u.get('firstName');
//    answer.patronymicName = u.get('patronymicName');
//    answer.lastName = u.get('lastName');
//    answer.fullName = u.get('fullName');
//    answer.shortName = u.get('shortName');
//
//    answer.organizationId = u.get('organizationId');
//    answer.organizationName = (answer.organizationId) ? u.related('organization').get('name') : null;
//
//    answer.departmentId = u.get('departmentId');
//    answer.departmentName = (answer.departmentId) ? u.related('department').get('name') : null;
//
//    answer.postId = u.get('postId');
//    answer.postName = (answer.postId) ? u.related('post').get('name') : null;
//
//    return answer;
//};
//
//module.exports.getProfile = function(userId) {
//
//    return this.read(userId)
//        .then(function(e) {
//            return extractProfile(e);
//        })
//};
//
//module.exports.getAllProfilesOfOrganization = function(organizationId) {
//
//    return UserModel.forge()
//        .where({organizationId: organizationId})
//        .fetchAll({withRelated: ['organization', 'department', 'post']})
//        .then(function(es) {
//
//            var answer = {};
//
//            _.each(es.models, function(e) {
//
//                var p = extractProfile(e);
//
//                answer[p.userId] = p;
//
//            });
//
//            return answer;
//
//        });
//};
//
//module.exports.getUsersWithPermission = function(permissionId, organizationId) {
//
//    var withPermission = knex(UserPermissionModel.forge().tableName)
//        .select('userId')
//        .where('permissionId', '=', permissionId);
//
//    return knex(UserModel.forge().tableName)
//        .select('id')
//        .whereIn('id', withPermission)
//        .andWhere('organizationId', '=', organizationId)
//        .then(function(u) {
//
//            return _.map(u, function(uo) {
//                return uo.id;
//            })
//
//        });
//
//};