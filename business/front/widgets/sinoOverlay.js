/**
 * Created by ZhangJiansen on 2016/10/6.
 * 遮罩组件
 */
define(['angular'],
    function(angular){
        'use strict';
        var myOverlayDirective =function($q, $timeout, $window, httpInterceptor, sinoOverlayConfig,ApiPath){
            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    myOverlayDelay: "@"
                },
                replace:true,
                template: '<div id="overlay-container" class="overlayContainer">' +
                '<div id="overlay-background" class="overlayBackground"></div>' +
                '<div id="overlay-content" class="overlayContent" data-ng-transclude>' +
                '</div>' +
                '</div>',
                link: function(scope, element, attrs){
                    var overlayContainer = null,
                        timePromise = null,
                        timerPromiseHide = null,
                        inSession = false,
                        queue = [],
                        overlayConfig = sinoOverlayConfig.getConfig();
                    init();
                    //初始化
                    function init(){
                        overlayConfig.exceptUrl=ApiPath.exceptUrl;
                        wireUpHttpInterceptor();
                        /*if(window.jQuery) {
                         wirejQueryInterceptor();
                         }*/
                        overlayContainer = document.getElementById('overlay-container');
                    }
                    //自定义Angular的http拦截器
                    function wireUpHttpInterceptor(){
                        //请求拦截
                        httpInterceptor.request = function(config){
                            //判断是否满足显示遮罩的条件
                            if(shouldShowOverlay(config.method, config.url)){
                                processRequest();
                            }
                            return config || $q.when(config);
                        };
                        //响应拦截
                        httpInterceptor.response = function(response){
                            processResponse();
                            return response || $q.when(response);
                        };
                        //异常拦截
                        httpInterceptor.responseError = function(rejection){
                            processResponse();
                            return $q.reject(rejection);
                        };
                    }
                    //自定义jQuery的http拦截器
                    /*function wirejQueryInterceptor(){
                     $(document).ajaxStart(function(){
                     processRequest();
                     });
                     $(document).ajaxComplete(function(){
                     processResponse();
                     });
                     $(document).ajaxError(function(){
                     processResponse();
                     });
                     }*/
                    //处理请求
                    function processRequest(){
                        queue.push({});
                        if(queue.length == 1){
                            timePromise = $timeout(function(){
                                if(queue.length) {
                                    showOverlay();
                                }
                            }, scope.myOverlayDelay ? scope.myOverlayDelay : overlayConfig.delay);
                        }
                    }
                    //处理响应
                    function processResponse(){
                        queue.pop();
                        if(queue.length == 0){
                            timerPromiseHide = $timeout(function(){
                                hideOverlay();
                                if(timerPromiseHide) {
                                    $timeout.cancel(timerPromiseHide);
                                }
                            },scope.myOverlayDelay ? scope.myOverlayDelay : overlayConfig.delay);
                        }
                    }
                    //显示遮罩层
                    function showOverlay(){
                        var w = 0;
                        var h = 0;
                        if(!$window.innerWidth){
                            if(!(document.documentElement.clientWidth == 0)){
                                w = document.documentElement.clientWidth;
                                h = document.documentElement.clientHeight;
                            } else {
                                w = document.body.clientWidth;
                                h = document.body.clientHeight;
                            }
                        }else{
                            w = $window.innerWidth;
                            h = $window.innerHeight;
                        }
                        var content = document.getElementById('overlay-content');
                        var contentWidth = parseInt(getComputedStyle(content, 'width').replace('px',''));
                        var contentHeight = parseInt(getComputedStyle(content, 'height').replace('px',''));
                        content.style.top = h / 2 - contentHeight / 2 + 'px';
                        content.style.left = w / 2 - contentWidth / 2 + 'px';

                        overlayContainer.style.display = 'block';
                    }
                    function hideOverlay(){
                        if(timePromise) {
                            $timeout.cancel(timePromise);
                        }
                        overlayContainer.style.display = 'none';
                    }
                    //得到一个函数的执行结果
                    var getComputedStyle = function(){
                        var func = null;
                        if(document.defaultView && document.defaultView.getComputedStyle){
                            func = document.defaultView.getComputedStyle;
                        } else if(typeof(document.body.currentStyle) !== "undefined"){
                            func = function(element, anything){
                                return element["currentStyle"];
                            }
                        }
                        return function(element, style){
                            return func(element, null)[style];
                        }
                    }();
                    //决定是否显示遮罩层
                    function shouldShowOverlay(method, url){
                        var searchCriteria = {
                            method: method,
                            url: url
                        };
                        return angular.isUndefined(findUrl(overlayConfig.exceptUrl, searchCriteria));
                    }
                    function findUrl(urlList, searchCriteria){
                        var retVal = undefined;
                        angular.forEach(urlList, function(url){
                            if(angular.equals(url, searchCriteria.url)){
                                retVal = true;
                                return false;//退出循环
                            }
                        });
                        return retVal;
                    }
                }
            }
        };
        //自定义interceptor
        var httpInterceptor = function(){
            return {};
        };
        //配置$httpProvider
        /*var _httpProvider = function($httpProvider){
            $httpProvider.interceptors.push('httpInterceptor');
        };*/
        //提供配置
        var myOverlayConfig = function(){
            //默认配置
            var config = {
                delay: 500,
                exceptUrl: []
            };
            //设置延迟
            this.setDelay = function(delayTime){
                config.delay = delayTime;
            };
            //设置异常处理url
            this.setExceptUrl = function(urlList){
                config.exceptUrl = urlList;
            };
            //获取配置
            this.$get = function(){
                function _getDelayTime(){
                    return config.delay;
                }
                function _getExceptUrls(){
                    return config.exceptUrl;
                }
                function _getConfig(){
                    return config;
                }
                return {
                    getDelayTime: _getDelayTime,
                    getExceptUrls: _getExceptUrls,
                    getConfig: _getConfig
                };
            };
        };
        angular.module('sino.overlay',[])
            .provider('sinoOverlayConfig', myOverlayConfig)
            .factory('httpInterceptor', httpInterceptor)
            .directive('sinoOverlay', ['$q','$timeout','$window','httpInterceptor','sinoOverlayConfig','ApiPath', myOverlayDirective])
            //.config('$httpProvider', _httpProvider)
        ;

    });
