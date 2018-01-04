/**
 * Created by ZhangJiansen on 2016/11/10.
 * 异常处理模块
 */
define(['angular',
    'constants'
], function (angular,constants) {
    'use strict';

    angular.module('sino.exception', [])
        .config(['$httpProvider', function($httpProvider){
            $httpProvider.interceptors.push(['$q',function($q){
                return {
                    "request":function(config){
                        /*if(config.method=='GET'){
                         var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                         config.url = config.url+separator+'noCache=' + new Date().getTime();
                         }*/
                        return config;
                    },
                    'responseError': function(response) {
                        if(response.status === 401 ||  response.status === 300){
                            //由权限模块处理
                        }else{
                            console.error("response error:",response.status);
                            var retMsg = response.headers(constants.HEADERS.RESP_MSG_NAME);
                            if(angular.isDefined(retMsg)){
                                retMsg = decodeURI(retMsg);
                            }

                            var errMsg;
                            if(response.status === 403){
                                errMsg = '您没有访问此功能的权限';
                            }else if(response.status==400){
                                errMsg = '服务器不理解请求的语法';
                            }else if (response.status==404){
                                errMsg = '服务器找不到请求的网页';
                            }else if (response.status==408){
                                errMsg = '服务器等候请求时发生超时';
                            }else if (response.status==500){
                                errMsg = '服务器遇到错误，无法完成请求';
                            }else if (response.status==501){
                                errMsg = '服务器不具备完成请求的功能';
                            }else if (response.status==502){
                                errMsg = '错误网关';
                            }else if (response.status==503){
                                errMsg = '服务器目前无法使用(由于超载或停机维护)';
                            }else if (response.status==504){
                                errMsg = '网关超时';
                            }else if (response.status==505){
                                errMsg = '服务器不支持请求中所用的 HTTP 协议版本';
                            }

                            if(retMsg != null && retMsg != "" && retMsg!="null"){
                                errMsg += ":"+retMsg;
                            }
                            if(angular.isDefined(errMsg)){
                                angular.alert(errMsg);
                            }
                        }
                        return $q.reject(response);
                    },
                    'response': function(response) {
                        var respObj = response.data;
                        if(angular.isDefined(respObj.resultCode)){
                            if(respObj.resultCode != constants.RESULT_CODE.SUCCESS){
                                angular.alert(respObj.resultMsg);
                                return $q.reject(response);
                            }
                            response.data = respObj.resultObj;
                        }

                        return response;
                    }

                };
            }]);
        }]);
});