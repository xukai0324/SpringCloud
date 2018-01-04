/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessInfogaterType = angular.module('business.infogater.infogaterType',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessInfogaterType.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessInfogaterType.controller = $controllerProvider.register;
            businessInfogaterType.directive = $compileProvider.directive;
            businessInfogaterType.filter = $filterProvider.register;
            businessInfogaterType.factory = $provide.factory;
            businessInfogaterType.service = $provide.service;
            businessInfogaterType.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var typePath = "components/infogater/infogaterType";
        var infoPath = "components/infogater/infogaterInfo";
        $stateProvider.state('main.infogaterTypePage',{
            url : "/infogaterTypeList",
            templateUrl : typePath+"/tpl/infogaterTypePage.html",
            controller : 'infogaterTypePage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/infogaterTypePage.ctrl.js',
                        typePath+'/service/infogaterType.serv.js']);
                }]
            }
        }).state('main.infogaterTypeAdd',{
            url:"infogaterTypeAdd",
            templateUrl : typePath+"/tpl/infogaterTypeAdd.html",
            controller : "infogaterTypeAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/infogaterTypeAdd.ctrl.js',
                        typePath+'/service/infogaterType.serv.js']);
                }]
            }
        }).state('main.infogaterTypeEdit',{
            url:"infogaterTypeEdit/:infogaterTypeId",
            templateUrl : typePath+"/tpl/infogaterTypeEdit.html",
            controller : "infogaterTypeEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/infogaterTypeEdit.ctrl.js',
                        typePath+'/service/infogaterType.serv.js']);
                }]
            }
        }).state('main.infogaterTypeView',{
                url:"infogaterTypeView/:infogaterTypeId",
                templateUrl : typePath+"/tpl/infogaterTypeView.html",
                controller : "infogaterTypeViewCtrl",
                resolve : {
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            typePath+'/controller/infogaterTypeView.ctrl.js',
                            typePath+'/service/infogaterType.serv.js']);
                    }]
                }
        }).state("main.infogaterTab", {
            url:"/infogaterTab",
            templateUrl: typePath+"/tpl/infogaterTab.html",
            controller : "infogaterTabCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/infogaterTab.ctrl.js',
                        typePath+'/service/infogaterType.serv.js',
                        typePath+'/controller/infogaterTypePage.ctrl.js',
                        infoPath+'/service/infogaterInfo.serv.js',
                        infoPath+'/controller/infogaterInfoPage.ctrl.js'
                       ]);
                }]
            }
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessInfogaterType.config(['$stateProvider',routerFn]);

    return businessInfogaterType;
});