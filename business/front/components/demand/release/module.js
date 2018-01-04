define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessDemand = angular.module('business.demand.release',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    businessDemand.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessDemand.controller = $controllerProvider.register;
            businessDemand.directive = $compileProvider.directive;
            businessDemand.filter = $filterProvider.register;
            businessDemand.factory = $provide.factory;
            businessDemand.service = $provide.service;
            businessDemand.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var demandPath = "components/demand/release";
        $stateProvider.state('main.demandPage',{
            url : "/demandPage",
            templateUrl : demandPath+"/tpl/demandPage.html",
            controller: 'demandPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandPath+'/controller/demandPage.ctrl.js',
                        demandPath+'/service/demand.serv.js'
                    ]);
                }]
            }
        }).state('main.demandView',{
            url : "demandView/:demandId",
            templateUrl : demandPath+"/tpl/demandView.html",
            controller: "demandReleaseViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandPath+'/controller/demandView.ctrl.js',
                        demandPath+'/service/demand.serv.js'
                    ]);
                }]
            }
        }).state('main.demandEdit',{
            url:"demandEdit/:demandId",
            templateUrl : demandPath+"/tpl/demandEdit.html",
            controller : "demandReleaseEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandPath+'/controller/demandEdit.ctrl.js',
                        demandPath+'/service/demand.serv.js']);
                }]
            }
        }).state('main.demandAdd',{
            url:"/demandAdd",
            templateUrl : demandPath+"/tpl/demandAdd.html",
            controller : "demandReleaseAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandPath+'/controller/demandAdd.ctrl.js',
                        demandPath+'/service/demand.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessDemand.config(['$stateProvider',routerFn]);

    return businessDemand;
});