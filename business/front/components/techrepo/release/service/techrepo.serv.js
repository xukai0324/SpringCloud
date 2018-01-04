/*  Created by sunfm on 2017/6/6. */
define(['../module'],function(moduleApp) {
    'use strict';

    var techrepoServFunc;
    techrepoServFunc = function ($http, $q, ApiPath) {
        return {
        getTechrepoList: function (techrepoQueryCondition) {
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: ApiPath.api.getTechrepoList,
                data: techrepoQueryCondition
            });
            promise.then(
                function (answer) {
                    // console.log('successfully get Respond');
                    answer.status = true;
                    deferred.resolve(answer);
                },
                function (error) {
                    // console.log('did not get Respond');
                    error.status = false;
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        },
        getTechrepoById: function (techrepoId) {
            var deferred = $q.defer();
            console.log('request one techRepo ');
            var promise = $http({
                method: 'POST',
                url: ApiPath.api.getTechrepoById,
                data: techrepoId
            });
            promise.then(
                function (answer) {
                    answer.status = true;
                    deferred.resolve(answer);
                },
                function (error) {
                    error.status = false;
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        },
        saveTechrepo: function (techrepo) {
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: ApiPath.api.saveTechrepo,
                data: techrepo
            });
            promise.then(
                function (answer) {
                    answer.status = true;
                    deferred.resolve(answer);
                },
                function (error) {
                    error.status = false;
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        },
        delTechrepoById: function (techrepoId) {
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: ApiPath.api.delTechrepoById,
                data: techrepoId
            });
            promise.then(
                function (answer) {
                    answer.status = true;
                    deferred.resolve(answer);
                },
                function (error) {
                    error.status = false;
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        },
        updateTechrepoById: function (techrepoId) {
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: ApiPath.api.updateTechrepoById,
                data: techrepoId
            });
            promise.then(
                function (answer) {
                    answer.status = true;
                    deferred.resolve(answer);
                },
                function (error) {
                    error.status = false;
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        }
        }
    };
    moduleApp.service('techrepoServ',['$http','$q','ApiPath',techrepoServFunc]);
});