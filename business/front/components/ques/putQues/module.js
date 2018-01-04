/**
 * Created by pengju on 2017/6/17.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessPutQues = angular.module('business.ques.putQues',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessPutQues.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessPutQues.controller = $controllerProvider.register;
            businessPutQues.directive = $compileProvider.directive;
            businessPutQues.filter = $filterProvider.register;
            businessPutQues.factory = $provide.factory;
            businessPutQues.service = $provide.service;
            businessPutQues.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var typePath = "components/ques/putQues";
        $stateProvider.state('main.putQues',{
            url : "/putQues",
            templateUrl : typePath+"/tpl/putQues.html",
            controller : 'putQuesCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        typePath+'/controller/putQues.ctrl.js',
                        typePath+'/service/putQues.serv.js']);
                }]
            }
        });
    };

    //定义路由,使用方法前必须在前面先定义
    businessPutQues.config(['$stateProvider',routerFn]);

    return businessPutQues;
});