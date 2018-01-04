define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessGleanFrameWork = angular.module('business.glean.framework',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    businessGleanFrameWork.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessGleanFrameWork.controller = $controllerProvider.register;
            businessGleanFrameWork.directive = $compileProvider.directive;
            businessGleanFrameWork.filter = $filterProvider.register;
            businessGleanFrameWork.factory = $provide.factory;
            businessGleanFrameWork.service = $provide.service;
            businessGleanFrameWork.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var frameworkPath = "components/glean/framework";
        $stateProvider.state('main.frameworkPage',{
            url : "/frameworkPage",
            templateUrl : frameworkPath+"/tpl/frameworkPage.html",
            controller: 'frameworkPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        frameworkPath+'/controller/frameworkPage.ctrl.js',
                        frameworkPath+'/service/framework.serv.js'
                    ]);
                }]
            }
        }).state('main.frameworkView',{
            url : "frameworkView/:frameworkId",
            templateUrl : frameworkPath+"/tpl/frameworkView.html",
            controller: "frameworkViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        frameworkPath+'/controller/frameworkView.ctrl.js',
                        frameworkPath+'/service/framework.serv.js'
                    ]);
                }]
            }
        }).state('main.frameworkEdit',{
            url:"frameworkEdit/:frameworkId",
            templateUrl : frameworkPath+"/tpl/frameworkEdit.html",
            controller : "gleanFrameworkEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        frameworkPath+'/controller/frameworkEdit.ctrl.js',
                        frameworkPath+'/service/framework.serv.js']);
                }]
            }
        }).state('main.frameworkAdd',{
            url:"/frameworkAdd",
            templateUrl : frameworkPath+"/tpl/frameworkAdd.html",
            controller : "gleanFrameworkEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        frameworkPath+'/controller/frameworkAdd.ctrl.js',
                        frameworkPath+'/service/framework.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessGleanFrameWork.config(['$stateProvider',routerFn]);

    return businessGleanFrameWork;
});