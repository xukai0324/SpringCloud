/**
 * Created by ZhangJiansen on 2016/9/20.
 * upload by Guoxianglian on 2016/10/10.
 * url处理工具
 */
define([], function () {
    'use strict';
    function commFactoryHandler($http,$q) {
        return {
            getData:function (url,params){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'GET',
                    url:url,
                    param:params
                });
                promise.then(
                    //通讯成功
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    //通讯失败
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                //返回promise对象，交由Controller继续处理
                return deferred.promise;
            },
            postObject:function (url,params){
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:url,
                    data:params
                });
                promise.then(
                    //通讯成功
                    function(answer){
                        answer.status = true;
                        deferred.resolve(answer);
                    },
                    //通讯失败
                    function(error){
                        error.status = false;
                        deferred.reject(error);
                    });
                //返回promise对象，交由Controller继续处理
                return deferred.promise;
            },
            postData:function (url,params){
	            var deferred = $q.defer();
	            var promise  = $http({
	                method:'POST',
	                url:url,
	                param:params
	            });
	            promise.then(
	                //通讯成功
	                function(answer){
	                    answer.status = true;
	                    deferred.resolve(answer);
	                },
	                //通讯失败
	                function(error){
	                    error.status = false;
	                    deferred.reject(error);
	                });
	            //返回promise对象，交由Controller继续处理
	            return deferred.promise;
	        },
            intValue:function(num){  //将js页面的number类型转换为java的int类型
		        var MAX_VALUE = 0x7fffffff;  
		        var MIN_VALUE = -0x80000000;  
		        if(num > MAX_VALUE || num < MIN_VALUE)  
		        {  
		            return num &= 0xFFFFFFFF;  
		        }  
		        return num;  
		    },
		    hashCode:function(strKey){  
		        var hash = 0;  
		        if(strKey && strKey != ''){  
		            for (var i = 0; i < strKey.length; i++){  
		                hash = hash * 31 + strKey.charCodeAt(i);  
		                hash = this.intValue(hash);  
		            }  
		        }  
		        return hash;  
		    }
        };
    }

    return commFactoryHandler;
});