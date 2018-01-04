/**
 * Created by changweican on 2017/5/7.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var permitRoleServFunc = function($http, $q, ApiPath) {
        return {
            roleList :function(){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.roleList,
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
            }
        }
    };

    moduleApp.service('permitRoleServ',['$http','$q','ApiPath',permitRoleServFunc]);
});
