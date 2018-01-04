define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessGleanTools = angular.module('business.ques.pbInfo',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    businessGleanTools.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessGleanTools.controller = $controllerProvider.register;
            businessGleanTools.directive = $compileProvider.directive;
            businessGleanTools.filter = $filterProvider.register;
            businessGleanTools.factory = $provide.factory;
            businessGleanTools.service = $provide.service;
            businessGleanTools.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var toolsPath = "components/ques/pbInfo";
        $stateProvider.state('main.pbInfo',{
            url : "/pbInfo",
            templateUrl : toolsPath+"/tpl/pbInfoPage.html",
            controller: 'pbInfoCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/pbInfo.ctrl.js',
                        toolsPath+'/service/pbInfo.serv.js'
                    ]);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessGleanTools.config(['$stateProvider',routerFn]);

    return businessGleanTools;
});