/**
 * Created by changweican on 2017/5/3.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var menuServFunc = function($http, $q,ApiPath) {
        return {
            insertMenu:function(permitMenuDto){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.insertParentMenu,
                    data:permitMenuDto
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
            insertChildMenu:function(permitMenuDto){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.insertChildMenu,
                    data:permitMenuDto
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
            getPermitMenusById:function(userId){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.queryPermitMenusByUserId,
                    data:userId
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
            getParentMenuList:function(parentMenuQueryCondition){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.queryAllPermitMenu,
                    data:parentMenuQueryCondition
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
			getMenuById : function(jsonReq){
            	var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getMenuById,
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
            deleteMenuById : function(jsonReq){
            	var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.deleteMenuById,
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
            updateMenu : function(jsonReq){
            	var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.updateMenu,
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
            queryAllMenuList : function(){
            	var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.queryAllMenuList
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
            saveMenu: function(jsonReq){
            	var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.insertPermitMenu,
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
            }
        }
    };

    moduleApp.service('permitMenuServ',['$http','$q','ApiPath',menuServFunc]);
});
