define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessGleanComponent = angular.module('business.glean.component',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    //TODO what is it
    businessGleanComponent.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessGleanComponent.controller = $controllerProvider.register;
            businessGleanComponent.directive = $compileProvider.directive;
            businessGleanComponent.filter = $filterProvider.register;
            businessGleanComponent.factory = $provide.factory;
            businessGleanComponent.service = $provide.service;
            businessGleanComponent.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var componentPath = "components/glean/component";
        $stateProvider.state('main.componentPage',{
            url : "/componentPage",
            templateUrl : componentPath+"/tpl/componentPage.html",
            controller: 'componentPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentPage.ctrl.js',
                        componentPath+'/service/gleanComponent.serv.js'
                    ]);
                }]
            }
        }).state('main.componentView',{
            url : "componentView/:componentId",
            templateUrl : componentPath+"/tpl/componentView.html",
            controller: "componentViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentView.ctrl.js',
                        componentPath+'/service/gleanComponent.serv.js'
                    ]);
                }]
            }
        }).state('main.componentEdit',{
            url:"componentEdit/:componentId",
            templateUrl : componentPath+"/tpl/componentEdit.html",
            controller : "gleanComponentEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentEdit.ctrl.js',
                        componentPath+'/service/gleanComponent.serv.js']);
                }]
            }
        }).state('main.componentAdd',{
            url:"/componentAdd",
            templateUrl : componentPath+"/tpl/componentAdd.html",
            controller : "gleanComponentAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentAdd.ctrl.js',
                        componentPath+'/service/gleanComponent.serv.js']);
                }]
            }
        }).state('main.componentListAdd',{
            url:"/componentListAdd/:masterId/:id",
            templateUrl : componentPath+"/tpl/componentListEdit.html",
            controller : "gleanComponentListEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentListEdit.ctrl.js',
                        componentPath+'/service/gleanComponentList.serv.js']);
                }]
            }
        }).state('main.componentListPage',{
            url:"/componentListPage/:masterId",
            templateUrl : componentPath+"/tpl/componentListPage.html",
            controller : "componentListPageCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentListPage.ctrl.js',
                        componentPath+'/service/gleanComponentList.serv.js']);
                }]
            }
        }).state('main.componentListView',{
            url:"/componentListView/:componentId/:masterId",
            templateUrl : componentPath+"/tpl/componentListView.html",
            controller : "componentListViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        componentPath+'/controller/componentListView.ctrl.js',
                        componentPath+'/service/gleanComponentList.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessGleanComponent.config(['$stateProvider',routerFn]);

    return businessGleanComponent;
});