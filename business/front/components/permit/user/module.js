/**
 * Created by changweican on 2017/5/3.
 */
define(['angular'],function(angular) {
    'use static';
    //定义模块
    var businessPermitUser = angular.module('business.permit.user',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessPermitUser.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessPermitUser.controller = $controllerProvider.register;
            businessPermitUser.directive = $compileProvider.directive;
            businessPermitUser.filter = $filterProvider.register;
            businessPermitUser.factory = $provide.factory;
            businessPermitUser.service = $provide.service;
            businessPermitUser.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var permitUserPath = "components/permit/user";
        $stateProvider.state('main.userList',{
            url : "/permitUserList",
            templateUrl : permitUserPath+"/tpl/permitUserList.html",
            controller : 'userCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitUserPath+'/controller/optUser.ctrl.js',
                        permitUserPath+'/service/permitUser.serv.js',
                        'components/permit/role/service/permitRole.serv.js'
                    ]);
                }]
            }
        });
    };

    //定义路由,使用方法前必须在前面先定义
    businessPermitUser.config(['$stateProvider',routerFn]);

    return businessPermitUser;
});