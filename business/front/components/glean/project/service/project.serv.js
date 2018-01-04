/**
 * Created by gaofeng on 2017/5/1.
 */
define(['../module'], function (moduleApp) {
    'use strict';
    console.log("load service");
    var projectServFunc = function ($http, $q,ApiPath) {
        return {
            queryProjectPage:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.queryProjectPage,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            save:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.saveProject,
                    data:condition
                });
                promise.then(
                    function(answer){
                        console.log("1111111111");
                        console.log(answer);
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            logicRemove:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.logicRemoveProject,
                    data:condition
                });
                promise.then(
                    function(answer){
                        console.log(answer);
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            update:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.updateProject,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            queryProjectById:function (gleanProjectInfoId){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.queryProjectById,
                    data:gleanProjectInfoId
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            getComponentVersionList:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.getComponentVersionList,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            getToolVersionList:function (condition){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.getToolVersionList,
                    data:condition
                });
                promise.then(
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            queryComponentsPage:function(gleanComponentCondition){
            	 var deferred = $q.defer();
            	 var promise  = $http({
	                 method:'POST',
	                 url:ApiPath.api.queryComponentsPage,
	                 data:gleanComponentCondition
	             });
            	 promise.then(
                     function(answer){
                         answer.status = true;
                         deferred.resolve(answer);
                     },
                     function(error){
                         error.status = false;
                         deferred.reject(error);
                     });
                 return deferred.promise;
            },
            queryToolsPage:function(gleanToolCondition){
	           	 var deferred = $q.defer();
	           	 var promise  = $http({
		                 method:'POST',
		                 url:ApiPath.api.queryToolsPage,
		                 data:gleanToolCondition
		             });
	           	 promise.then(
	                    function(answer){
	                        answer.status = true;
	                        deferred.resolve(answer);
	                    },
	                    function(error){
	                        error.status = false;
	                        deferred.reject(error);
	                    });
	                return deferred.promise;
	           },
	           queryFrameworksPage:function(gleanFrameworkCondition){
		           	 var deferred = $q.defer();
		           	 var promise  = $http({
			                 method:'POST',
			                 url:ApiPath.api.queryPageWithComponents,
			                 data:gleanFrameworkCondition
			             });
		           	 promise.then(
		                    function(answer){
		                        answer.status = true;
		                        deferred.resolve(answer);
		                    },
		                    function(error){
		                        error.status = false;
		                        deferred.reject(error);
		                    });
		                return deferred.promise;
	           },allComponentsForFramework:function(gleanFrameworkCondition){
	        	   var deferred = $q.defer();
		           	 var promise  = $http({
			                 method:'POST',
			                 url:ApiPath.api.allComponentsForFramework,
			                 data:gleanFrameworkCondition
			             });
		           	 promise.then(
	                    function(answer){
	                        answer.status = true;
	                        deferred.resolve(answer);
	                    },
	                    function(error){
	                        error.status = false;
	                        deferred.reject(error);
	                    });
	                return deferred.promise;
	           }
         }
    };
    moduleApp.service('projectServ',['$http','$q','ApiPath',projectServFunc]);
});