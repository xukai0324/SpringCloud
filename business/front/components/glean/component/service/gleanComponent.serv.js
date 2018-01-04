/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentServFunc;
    gleanComponentServFunc = function ($http, $q, ApiPath) {
        return {
            saveComponent: function (component) {
                var deferred = $q.defer();
                var varPath = ApiPath.api.saveComponent;
                if(typeof(component.id) != 'undefined' && component.id != ''){
                    varPath = ApiPath.api.updateComponent;
                }
                var promise = $http({
                    method: 'POST',
                    url: varPath,
                    data: component
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
            getComponentList: function (componentQueryCondition) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getComponentList,
                    data: componentQueryCondition
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
            getComponentById: function (componentId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getComponentById,
                    data: componentId
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
            delComponentById: function (componentId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.delComponentById,
                    data: componentId
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
            updateComponentById: function (componentId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.updateComponentById,
                    data: componentId
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
            queryGleanComponentInfoVersionById:function (componentId) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.getDictCode,
                    data: componentId
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
            saveProjectComponent: function (component) {
                var deferred = $q.defer();
                var promise = $http({
                    method: 'POST',
                    url: ApiPath.api.saveProjectComponent,
                    data: component
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

    moduleApp.service('gleanComponentServ',['$http','$q','ApiPath',gleanComponentServFunc]);
});