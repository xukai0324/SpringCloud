/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessInfogaterInfoList = angular.module('business.infogater.infogaterInfoList',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessInfogaterInfoList.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessInfogaterInfoList.controller = $controllerProvider.register;
            businessInfogaterInfoList.directive = $compileProvider.directive;
            businessInfogaterInfoList.filter = $filterProvider.register;
            businessInfogaterInfoList.factory = $provide.factory;
            businessInfogaterInfoList.service = $provide.service;
            businessInfogaterInfoList.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var infoListPath = "components/infogater/infogaterInfoList";
        $stateProvider.state('main.infogaterInfoListPage',{
            url : "/infogaterInfoListList/:infogaterInfo",
            templateUrl : infoListPath+"/tpl/infogaterInfoListPage.html",
            controller : 'infogaterInfoListPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoListPath+'/controller/infogaterInfoListPage.ctrl.js',
                        infoListPath+'/service/infogaterInfoList.serv.js']);
                }]
            }
        }).state('main.infogaterInfoListAdd',{
            url:"infogaterInfoListAdd/:infoMainId",
            templateUrl : infoListPath+"/tpl/infogaterInfoListAdd.html",
            controller : "infogaterInfoListAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoListPath+'/controller/infogaterInfoListAdd.ctrl.js',
                        infoListPath+'/service/infogaterInfoList.serv.js']);
                }]
            }
        }).state('main.infogaterInfoListEdit',{
            url:"infogaterInfoListEdit/:infogaterInfo/:infogaterInfoListId",
            templateUrl : infoListPath+"/tpl/infogaterInfoListEdit.html",
            controller : "infogaterInfoListEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        infoListPath+'/controller/infogaterInfoListEdit.ctrl.js',
                        infoListPath+'/service/infogaterInfoList.serv.js']);
                }]
            }
        }).state('main.infogaterInfoListListEdit',{
                 url:"infogaterInfoListListEdit/:infogaterInfoListId",
                 templateUrl : infoListPath+"/tpl/infogaterInfoListListEdit.html",
                 controller : "infogaterInfoListListEditCtrl",
                 resolve : {
                     loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                         return $ocLazyLoad.load([
                             infoListPath+'/controller/infogaterInfoListListEdit.ctrl.js',
                             infoListPath+'/service/infogaterInfoList.serv.js']);
                }]
            }
        }).state('main.infogaterInfoListView',{
                url:"infogaterInfoListView/:infogaterInfo/:infogaterInfoListId",
                templateUrl : infoListPath+"/tpl/infogaterInfoListView.html",
                controller : "infogaterInfoListViewCtrl",
                resolve : {
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            infoListPath+'/controller/infogaterInfoListView.ctrl.js',
                            infoListPath+'/service/infogaterInfoList.serv.js']);
                    }]
                }
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessInfogaterInfoList.config(['$stateProvider',routerFn]);

    return businessInfogaterInfoList;
});