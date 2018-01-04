/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentListServFunc;
    gleanComponentListServFunc = function ($http, $q, ApiPath) {
        return {
            saveComponent: function (component) {
                var deferred = $q.defer();
                var varPath = ApiPath.api.saveComponentList;
                console.log('======ser.js');
                if(typeof(component.id) != 'undefined' && component.id != ''){
                    console.log('===update');
                    varPath = ApiPath.api.updateComponentList;
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
                    url: ApiPath.api.getComponentListList,
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
                    url: ApiPath.api.getComponentListById,
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
                    url: ApiPath.api.delComponentListById,
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
                    url: ApiPath.api.updateComponentList,
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
            }
        }

    };

    moduleApp.service('gleanComponentListServ',['$http','$q','ApiPath',gleanComponentListServFunc]);
});