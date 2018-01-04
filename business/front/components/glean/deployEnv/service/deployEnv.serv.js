/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var deployEnvServFunc = function($http, $q,ApiPath) {
        return {
            saveDeployEnv:function(deployEnv){
                var deferred = $q.defer();
                var varPath = ApiPath.api.saveDeployEnv;
                if(typeof(deployEnv.id) != 'undefined' && deployEnv.id != ''){
                    varPath = ApiPath.api.updateDeployEnv;
                }
                var promise = $http({
                    method:'POST',
                    url:varPath,
                    data:deployEnv
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
            getDeployEnvList:function(deployEnvQueryCondition){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getDeployEnvList,
                    data:deployEnvQueryCondition
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
            getDeployEnvById:function(deployEnvId){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getDeployEnvById,
                    data:deployEnvId
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
            delDeployEnvById:function(deployEnvId){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.delDeployEnvById,
                    data:deployEnvId
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
            setServerVersionIdList:function(condition){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getDictCode,
                    data:condition
                });
                promise.then(
                    //通讯成功
                    function (answer) {
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    //通讯失败
                    function (error) {
                        error.status = false;
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            }

        }
    };

    moduleApp.service('deployEnvServ',['$http','$q','ApiPath',deployEnvServFunc]);
});
