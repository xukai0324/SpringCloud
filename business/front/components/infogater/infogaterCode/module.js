/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessInfogaterCode = angular.module('business.infogater.infogaterCode',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessInfogaterCode.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessInfogaterCode.controller = $controllerProvider.register;
            businessInfogaterCode.directive = $compileProvider.directive;
            businessInfogaterCode.filter = $filterProvider.register;
            businessInfogaterCode.factory = $provide.factory;
            businessInfogaterCode.service = $provide.service;
            businessInfogaterCode.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var codePath = "components/infogater/infogaterCode";
        $stateProvider.state('main.infogaterCodePage',{
            url : "/infogaterCodeList/:infogaterTypId/:infogaterTypDesc",
            templateUrl : codePath+"/tpl/infogaterCodePage.html",
            controller : 'infogaterCodePage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        codePath+'/controller/infogaterCodePage.ctrl.js',
                        codePath+'/service/infogaterCode.serv.js']);
                }]
            }
        }).state('main.infogaterCodeAdd',{
            url:"infogaterCodeAdd/:infogaterCodeType/:infogaterCodeTypeDesc",
            templateUrl : codePath+"/tpl/infogaterCodeAdd.html",
            controller : "infogaterCodeAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        codePath+'/controller/infogaterCodeAdd.ctrl.js',
                        codePath+'/service/infogaterCode.serv.js']);
                }]
            }
        }).state('main.infogaterCodeEdit',{
            url:"infogaterCodeEdit/:infogaterCodeType/:infogaterCodeCode/:infogaterCodeTypeDesc",
            templateUrl : codePath+"/tpl/infogaterCodeEdit.html",
            controller : "infogaterCodeEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        codePath+'/controller/infogaterCodeEdit.ctrl.js',
                        codePath+'/service/infogaterCode.serv.js']);
                }]
            }
        }).state('main.infogaterCodeListEdit',{
                 url:"infogaterCodeListEdit/:infogaterCodeType",
                 templateUrl : codePath+"/tpl/infogaterCodeListEdit.html",
                 controller : "infogaterCodeListEditCtrl",
                 resolve : {
                     loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                         return $ocLazyLoad.load([
                             codePath+'/controller/infogaterCodeListEdit.ctrl.js',
                             codePath+'/service/infogaterCode.serv.js']);
                }]
            }
        }).state('main.infogaterCodeView',{
                url:"infogaterCodeView/:infogaterCodeType/:infogaterCodeCode/:infogaterCodeTypeDesc",
                templateUrl : codePath+"/tpl/infogaterCodeView.html",
                controller : "infogaterCodeViewCtrl",
                resolve : {
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            codePath+'/controller/infogaterCodeView.ctrl.js',
                            codePath+'/service/infogaterCode.serv.js']);
                    }]
                }
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessInfogaterCode.config(['$stateProvider',routerFn]);

    return businessInfogaterCode;
});