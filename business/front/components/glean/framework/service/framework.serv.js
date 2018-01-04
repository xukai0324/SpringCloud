/**
 * Created by ZhangYi on 2017/6/6.
 */

define(['../module'], function (moduleApp) {
    'use strict';
    console.log("load service");
    var frameWorkServFunc = function ($http, $q,ApiPath) {
        return {
            queryFrameWorkPage:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.queryFrameWorkPage,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            saveFrameWork:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.saveFrameWork,
                    data:condition
                });
                promise.then(
                    function(answer){
                        console.log("1111111111");
                        console.log(answer);
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            removeFrameWork:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.removeFrameWork,
                    data:condition
                });
                promise.then(
                    function(answer){
                        console.log(answer);
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            updateFrameWork:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.updateFrameWork,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            queryFrameWorkById:function (gleanFrameWorkInfoId){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.queryFrameWorkById,
                    data:gleanFrameWorkInfoId
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            getComponentVersionList:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.getComponentVersionList,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            queryComponentsPage:function(gleanComponentCondition){
           	 var deferred = $q.defer();
           	 var promise  = $http({
	                 method:'POST',
	                 url:ApiPath.api.queryComponentsPage,
	                 data:gleanComponentCondition
	             });
           	 promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
           }
        }
    };
    moduleApp.service('frameworkServ',['$http','$q','ApiPath',frameWorkServFunc]);
});