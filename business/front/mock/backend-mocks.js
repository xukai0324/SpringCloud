/**
 * Created by GuoXiangLian on 2016/11/28.
 */
define([
    'angular',
    'angular-mocks',
    'mock/jsonDB'
],function(angular,ngMock,jsonDB) {
    'use strict';
    /**codes,
     * This module is used to simulate backend server for this demo application.
     */
    angular.module('backend-mocks',['ngMockE2E'])
        .run(function($httpBackend) {

            console.log('模拟后台启动....');

            var respondFunc = function(method, url, data, apiInfo){
                console.info("[%s]-发起[%s]接口调用,URL:%s",apiInfo.name,apiInfo.desc,url);
                console.trace("[%s]-请求参数:%s",apiInfo.name,JSON.stringify(data));
                if(angular.isDefined(apiInfo.callback) && angular.isFunction(apiInfo.callback)){
                    console.info("[%s]-已定义回调方法，不使用默认处理",apiInfo.name);
                    return apiInfo.callback(method, url, data, apiInfo.data);
                }
                return [200, apiInfo.data];
            };

            /* *
            * 定义具体mock处理
            * */
            jsonDB.forEach(function(apiInfo){
                if(apiInfo.method.toUpperCase() == "POST"){
                    $httpBackend.whenPOST(apiInfo.url).respond(function(method, url, data) {
                        return respondFunc(method, url, data, apiInfo);
                    });
                }else if(apiInfo.method.toUpperCase() == "GET"){
                    $httpBackend.whenGET(apiInfo.url).respond(function(method, url, data) {
                        return respondFunc(method, url, data, apiInfo);
                    });
                }else{
                    console.error("unsupported http method:{}",apiInfo.method);
                }
            });

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();

        });
});
