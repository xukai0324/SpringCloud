define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var businessGleanTools = angular.module('business.glean.tools',[]);

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
        var toolsPath = "components/glean/tools";
        $stateProvider.state('main.toolsPage',{
            url : "/toolsPage",
            templateUrl : toolsPath+"/tpl/toolsPage.html",
            controller: 'toolsPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsPage.ctrl.js',
                        toolsPath+'/service/gleanTools.serv.js'
                    ]);
                }]
            }
        }).state('main.toolsView',{
            url : "toolsView/:toolsId",
            templateUrl : toolsPath+"/tpl/toolsView.html",
            controller: "toolsViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsView.ctrl.js',
                        toolsPath+'/service/gleanTools.serv.js'
                    ]);
                }]
            }
        }).state('main.toolsEdit',{
            url:"toolsEdit/:toolsId",
            templateUrl : toolsPath+"/tpl/toolsEdit.html",
            controller : "gleanToolsEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsEdit.ctrl.js',
                        toolsPath+'/service/gleanTools.serv.js']);
                }]
            }
        }).state('main.toolsAdd',{
            url:"/toolsAdd",
            templateUrl : toolsPath+"/tpl/toolsAdd.html",
            controller : "gleanToolsAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsAdd.ctrl.js',
                        toolsPath+'/service/gleanTools.serv.js']);
                }]
            }
        }).state('main.toolsAudit',{
            url:"/toolsAudit/:toolsId",
            templateUrl : toolsPath+"/tpl/toolsAudit.html",
            controller : "gleanToolsAuditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsAudit.ctrl.js',
                        toolsPath+'/service/gleanTools.serv.js']);
                }]
            }
        }).state('main.toolsListAdd',{
                url:"/toolsListAdd/:toolsId/:id/:backRoute",
            templateUrl : toolsPath+"/tpl/toolsListEdit.html",
            controller : "gleanToolsListEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsListEdit.ctrl.js',
                        toolsPath+'/service/gleanToolsList.serv.js']);
                }]
            }
        }).state('main.toolsListPage',{
        	url:"/toolsListPage/:toolsId",
            templateUrl : toolsPath+"/tpl/toolsListPage.html",
            controller : "gleanToolsListPageCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                    	toolsPath+'/controller/toolsListPage.ctrl.js',
                    	toolsPath+'/service/gleanToolsList.serv.js']);
                }]
            }
        }).state('main.toolsListView',{
            url:"/toolsListView/:toolsVersionId/:toolsId/:isAudit/:backRoute",
            templateUrl : toolsPath+"/tpl/toolsListView.html",
            controller : "gleanToolsListViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsListView.ctrl.js',
                        toolsPath+'/service/gleanToolsList.serv.js']);
                }]
            }
        }).state('main.toolsListAudit',{
            url:"/toolsListAudit",
            templateUrl : toolsPath+"/tpl/toolsListAudit.html",
            controller : "gleanToolsListAuditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        toolsPath+'/controller/toolsListAudit.ctrl.js',
                        toolsPath+'/service/gleanToolsList.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    businessGleanTools.config(['$stateProvider',routerFn]);

    return businessGleanTools;
});