/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsListServFunc;
    gleanToolsListServFunc = function ($http, $q, ApiPath) {
        return {
            saveToolsVersion: function (tools) {
                var deferred = $q.defer();
                var varPath = ApiPath.api.saveToolsVersionList;
                console.log('======ser.js');
                if(typeof(tools.id) != 'undefined' && tools.id != ''){
                    console.log('===update');
                    console.log('tools id',tools);

                    varPath = ApiPath.api.updateToolsVersionList;
                }
                var promise = $http({
                    method: 'POST',
                    url: varPath,
                    data: tools
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
            getToolsVersionList: function (toolsQueryCondition) {
                console.log('===toolsQueryCondition',toolsQueryCondition);
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getToolsVersionList,
                    data: toolsQueryCondition
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
            getToolsById: function (toolsId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getToolsListById,
                    data: toolsId
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
            delToolsById: function (toolsVersionId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.delToolsListById,
                    data: toolsVersionId
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
            updateToolsById: function (toolsId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.updateToolsVersionList,
                    data: toolsId
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
            auditToolsVersion:function (tools) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.auditToolsVersion,
                    data: tools
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
            queryAuditPage:function (toolsQueryCondition) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.queryAuditPage,
                    data:toolsQueryCondition
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
            batchAudit:function(id,auditStatus){
            	var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.gleanToolsInfoListBatchAudit,
                    data: {id : id, auditStatus : auditStatus}
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

    moduleApp.service('gleanToolsListServ',['$http','$q','ApiPath',gleanToolsListServFunc]);
});