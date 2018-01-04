/**
 * Created by changweican on 2017/5/7.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var permitRoleServFunc = function($http, $q,ApiPath) {
        return {
            roleBindMenus:function(jsonReq){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.roleBindMenus,
                    data:jsonReq
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
            getMenuTree:function(){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.initTreeNodes
                    // data:jsonReq
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
			roleList :function(jsonReq){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.roleList,
                    data: jsonReq
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
           getRoleById: function(jsonReq){
           		var deferred = $q.defer();
           		var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getRoleById,
                    data: jsonReq
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
           	getSelectedMenuByRoleId: function(param){
           		var deferred = $q.defer();
           		var promise = $http({
                    method:'GET',
                    url:ApiPath.api.getSelectedMenuByRoleId,
                    params: param
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
           	updateOrCreateRole: function(jsonReq){
           		var deferred = $q.defer();
           		var promise = $http({
                    method:'POST',
                    url:ApiPath.api.updateOrCreateRole,
                    data: jsonReq
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
           	deleteRole : function(jsonReq){
           		var deferred = $q.defer();
           		var promise = $http({
                    method:'POST',
                    url:ApiPath.api.deleteRole,
                    data: jsonReq
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
            getAllRole : function () {
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getAllRole
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

    moduleApp.service('permitRoleServ',['$http','$q','ApiPath',permitRoleServFunc]);
});
