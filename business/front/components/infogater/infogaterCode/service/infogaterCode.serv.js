/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var infogaterCodeServFunc = function($http, $q,ApiPath) {
        return {
            saveInfogaterCode:function(infogaterCode){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.saveInfogaterCode,
                    data:infogaterCode
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
            getInfogaterCodeList:function(infogaterCodeQueryCondition){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getInfogaterCodeList,
                    data:infogaterCodeQueryCondition
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
            getInfogaterCodeById:function(infogaterCodeType,infogaterCodeCode){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getInfogaterCodeById,
                    data:{codeCode:infogaterCodeCode,codeType:infogaterCodeType}
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
            delInfogaterCodeById:function(infogaterCodeType,infogaterCodeCode){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.delInfogaterCodeById,
                    data:{codeCode:infogaterCodeCode,codeType:infogaterCodeType}
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
            updateInfogaterCodeById:function(infogaterCode){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.updateInfogaterCodeById,
                    data:infogaterCode
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
            setUpperCodeTypeList:function(condition){
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

    moduleApp.service('infogaterCodeServ',['$http','$q','ApiPath',infogaterCodeServFunc]);
});
