/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var infogaterInfoServFunc = function($http, $q,ApiPath) {
        return {
            saveInfogaterInfo:function(infogaterInfo){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.saveInfogaterInfo,
                    data:infogaterInfo
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
            getInfogaterInfoList:function(infogaterInfoQueryCondition){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getInfogaterInfoList,
                    data:infogaterInfoQueryCondition
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
            getInfogaterInfoById:function(infogaterInfoId){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getInfogaterInfoById,
                    data:infogaterInfoId
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
            delInfogaterInfoById:function(infogaterInfoId){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.delInfogaterInfoById,
                    data:infogaterInfoId
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
            updateInfogaterInfoById:function(infogaterInfo){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.updateInfogaterInfoById,
                    data:infogaterInfo
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
            setInfoTypeList:function(condition){
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

    moduleApp.service('infogaterInfoServ',['$http','$q','ApiPath',infogaterInfoServFunc]);
});
