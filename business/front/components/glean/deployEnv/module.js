/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessDeployEnv = angular.module('business.glean.deployEnv',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessDeployEnv.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessDeployEnv.controller = $controllerProvider.register;
            businessDeployEnv.directive = $compileProvider.directive;
            businessDeployEnv.filter = $filterProvider.register;
            businessDeployEnv.factory = $provide.factory;
            businessDeployEnv.service = $provide.service;
            businessDeployEnv.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var deployPath = "components/glean/deployEnv";
        $stateProvider.state('main.deployEnvPage',{
            url : "/deployEnvList",
            templateUrl : deployPath+"/tpl/deployEnvPage.html",
            controller : 'deployEnvPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        deployPath+'/controller/deployEnvPage.ctrl.js',
                        deployPath+'/service/deployEnv.serv.js']);
                }]
            }
        }).state('main.deployEnvEdit',{
            url:"deployEnvEdit/:deployEnvId",
            templateUrl : deployPath+"/tpl/deployEnvEdit.html",
            controller : "deployEnvEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        deployPath+'/controller/deployEnvEdit.ctrl.js',
                        deployPath+'/service/deployEnv.serv.js']);
                }]
            }
        }).state('main.deployEnvView',{
            url:"deployEnvView/:deployEnvId",
            templateUrl : deployPath+"/tpl/deployEnvView.html",
            controller : "deployEnvViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        deployPath+'/controller/deployEnvView.ctrl.js',
                        deployPath+'/service/deployEnv.serv.js']);
                }]
            }
        }).state('main.deployEnvUpdate',{
            url:"deployEnvUpdate/:deployEnvId",
            templateUrl : deployPath+"/tpl/deployEnvUpdate.html",
            controller : "deployEnvUpdateCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        deployPath+'/controller/deployEnvUpdate.ctrl.js',
                        deployPath+'/service/deployEnv.serv.js']);
                }]
            }
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessDeployEnv.config(['$stateProvider',routerFn]);

    return businessDeployEnv;
});