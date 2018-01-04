/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessInfogaterInfo = angular.module('business.infogater.infogaterInfo',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessInfogaterInfo.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessInfogaterInfo.controller = $controllerProvider.register;
            businessInfogaterInfo.directive = $compileProvider.directive;
            businessInfogaterInfo.filter = $filterProvider.register;
            businessInfogaterInfo.factory = $provide.factory;
            businessInfogaterInfo.service = $provide.service;
            businessInfogaterInfo.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var infoPath = "components/infogater/infogaterInfo";
        $stateProvider.state('main.infogaterInfoPage',{
            url : "/infogaterInfoList",
            templateUrl : infoPath+"/tpl/infogaterInfoPage.html",
            controller : 'infogaterInfoPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoPath+'/controller/infogaterInfoPage.ctrl.js',
                        infoPath+'/service/infogaterInfo.serv.js']);
                }]
            }
        }).state('main.infogaterInfoAdd',{
            url:"infogaterInfoAdd",
            templateUrl : infoPath+"/tpl/infogaterInfoAdd.html",
            controller : "infogaterInfoAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoPath+'/controller/infogaterInfoAdd.ctrl.js',
                        infoPath+'/service/infogaterInfo.serv.js']);
                }]
            }
        }).state('main.infogaterInfoEdit',{
            url:"infogaterInfoEdit/:infogaterInfoId",
            templateUrl : infoPath+"/tpl/infogaterInfoEdit.html",
            controller : "infogaterInfoEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoPath+'/controller/infogaterInfoEdit.ctrl.js',
                        infoPath+'/service/infogaterInfo.serv.js']);
                }]
            }
        }).state('main.infogaterInfoView',{
                url:"infogaterInfoView/:infogaterInfoId",
                templateUrl : infoPath+"/tpl/infogaterInfoView.html",
                controller : "infogaterInfoViewCtrl",
                resolve : {
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            infoPath+'/controller/infogaterInfoView.ctrl.js',
                            infoPath+'/service/infogaterInfo.serv.js']);
                    }]
                }
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessInfogaterInfo.config(['$stateProvider',routerFn]);

    return businessInfogaterInfo;
});