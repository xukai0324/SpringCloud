define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessDemandsch = angular.module('business.demand.schedule',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    businessDemandsch.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessDemandsch.controller = $controllerProvider.register;
            businessDemandsch.directive = $compileProvider.directive;
            businessDemandsch.filter = $filterProvider.register;
            businessDemandsch.factory = $provide.factory;
            businessDemandsch.service = $provide.service;
            businessDemandsch.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var demandschPath = "components/demand/schedule";
        $stateProvider.state('main.demandschPage',{
            url : "/demandschPage/:demandid/:demandId",
            templateUrl : demandschPath+"/tpl/demandschPage.html",
            controller: 'demandschPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandschPath+'/controller/demandschPage.ctrl.js',
                        demandschPath+'/service/demandsch.serv.js'
                    ]);
                }]
            }
        }).state('main.demandschView',{
            url : "demandschView/:demandid/:demandschId",
            templateUrl : demandschPath+"/tpl/demandschView.html",
            controller: "demandScheduleViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandschPath+'/controller/demandschView.ctrl.js',
                        demandschPath+'/service/demandsch.serv.js'
                    ]);
                }]
            }
        }).state('main.demandschEdit',{
            url:"demandschEdit/:demandid/:demandschId",
            templateUrl : demandschPath+"/tpl/demandschEdit.html",
            controller : "demandScheduleEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandschPath+'/controller/demandschEdit.ctrl.js',
                        demandschPath+'/service/demandsch.serv.js']);
                }]
            }
        }).state('main.demandschAdd',{
            url:"/demandschAdd/:demandid/:demandId",
            templateUrl : demandschPath+"/tpl/demandschAdd.html",
            controller : "demandScheduleAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        demandschPath+'/controller/demandschAdd.ctrl.js',
                        demandschPath+'/service/demandsch.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessDemandsch.config(['$stateProvider',routerFn]);

    return businessDemandsch;
});