/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsServFunc;
    gleanToolsServFunc = function ($http, $q, ApiPath) {
        return {
            saveTools: function (tools) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.saveTool,
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
            getToolsList: function (toolsQueryCondition) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getToolsList,
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
                    url: ApiPath.api.getToolById,
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
            delToolsById: function (toolsId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.delToolById,
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
            updateToolById: function (toolsId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.updateToolById,
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
            queryGleanToolsInfoByToolName: function(toolName){
            	var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.queryGleanToolsInfoByToolName,
                    data: toolName
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
            queryGleanToolsListInfoByVersion: function(version,toolsId){
            	var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.queryGleanToolsListInfoByVersion,
                    data: {version : version, toolsId : toolsId}
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
                    url: ApiPath.api.gleanToolsInfoBatchAudit,
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
            },
            queryToolsDealCount:function(){
            	var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.queryToolsDealCount
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

    moduleApp.service('gleanToolsServ',['$http','$q','ApiPath',gleanToolsServFunc]);
});