/**
 * Created by pengju on 2017/5/5.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var quesDetailServFunc = function($http, $q,ApiPath) {
        return {
            getQuesDetailById:function(quesProblemDto){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.getQuesDetailById,
                    data:quesProblemDto
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
            submitDiscuss:function(submitDiscDto){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.submitDiscuss,
                    data:submitDiscDto
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
            acceptAnsw:function(acceptQuesDto){
                var deferred = $q.defer();
                var promise = $http({
                    method:'POST',
                    url:ApiPath.api.acceptAnsw,
                    data:acceptQuesDto
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

    moduleApp.service('quesDetailServ',['$http','$q','ApiPath',quesDetailServFunc]);
});
