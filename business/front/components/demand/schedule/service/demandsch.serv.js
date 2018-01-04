/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandScheduleServFunc;
    demandScheduleServFunc = function ($http, $q, ApiPath) {
        return {
            saveDemandsch: function (demandsch) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.saveDemandsch,
                    data: demandsch
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
            getDemandschList: function (demandschQueryCondition) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getDemandschList,
                    data: demandschQueryCondition
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
            getDemandschById: function (demandschId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getDemandschById,
                    data: demandschId
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
            delDemandschById: function (demandschId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.delDemandschById,
                    data: demandschId
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
            updateDemandschById: function (demandschId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.updateDemandschById,
                    data: demandschId
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

    moduleApp.service('demandScheduleServ',['$http','$q','ApiPath',demandScheduleServFunc]);
});