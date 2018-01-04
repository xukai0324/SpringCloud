/**
 * Created by pengju on 2017/5/5.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessQuesDetail = angular.module('business.ques.quesDetail',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessQuesDetail.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessQuesDetail.controller = $controllerProvider.register;
            businessQuesDetail.directive = $compileProvider.directive;
            businessQuesDetail.filter = $filterProvider.register;
            businessQuesDetail.factory = $provide.factory;
            businessQuesDetail.service = $provide.service;
            businessQuesDetail.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var typePath = "components/ques/quesDetail";
        $stateProvider.state('main.quesDetail',{
            url : "/quesDetail/:quesId",
            templateUrl : typePath+"/tpl/quesDetail.html",
            controller : 'quesDetailCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/quesDetail.ctrl.js',
                        typePath+'/service/quesDetail.serv.js']);
                }]
            }
        });
    };

    //定义路由,使用方法前必须在前面先定义
    businessQuesDetail.config(['$stateProvider',routerFn]);

    return businessQuesDetail;
});