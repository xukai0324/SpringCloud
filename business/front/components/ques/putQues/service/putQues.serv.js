/**
 * Created by pengju on 2017/6/17.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var putQuesServFunc = function($http, $q,ApiPath) {
        return {
            getQuesTypeList: function (data) {
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getQuesTypeList,
                    data:data
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },
            getMyInfo: function (data) {
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getMyInfo,
                    data:data
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },
            submitQuestion: function (data) {
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.submitQuestion,
                    data:data
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            }
        }
    };

    moduleApp.service('putQuesServ',['$http','$q','ApiPath',putQuesServFunc]);
});
