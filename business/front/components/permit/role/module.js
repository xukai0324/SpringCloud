/**
 * Created by changweican on 2017/5/7.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessPermitRole = angular.module('business.permit.role',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessPermitRole.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessPermitRole.controller = $controllerProvider.register;
            businessPermitRole.directive = $compileProvider.directive;
            businessPermitRole.filter = $filterProvider.register;
            businessPermitRole.factory = $provide.factory;
            businessPermitRole.service = $provide.service;
            businessPermitRole.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var permitRolePath = "components/permit/role";
        $stateProvider.state('main.permitRoleView',{
            url : "/permitRoleView/{roleId}/{isShow}",
            templateUrl : permitRolePath+"/tpl/permitRoleView.html",
//          controller : 'permitRoleCtrl',
            controller : 'createRoleCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
//                      permitRolePath+'/controller/permitRoleView.ctrl.js',
						'components/permit/menu/service/permitMenu.serv.js',
                        permitRolePath+'/controller/optRole.ctrl.js',
                        permitRolePath+'/service/permitRole.serv.js']);
                }]
            }
        }).state('main.permitRoleList', {
        	url : "/permitRoleList",
        	templateUrl : permitRolePath + "/tpl/pernitRoleList.html",
        	controller: 'permitRoleListCtrl',
        	resolve : {
        		loadCommunity : [ '$ocLazyLoad', function($ocLazyLoad){
        			return $ocLazyLoad.load([
        				permitRolePath+'/controller/permitRoleList.ctrl.js',
        				permitRolePath+'/service/permitRole.serv.js'
        			]);
        		}]
        	}
        })
        ;
    };

    //定义路由,使用方法前必须在前面先定义
    businessPermitRole.config(['$stateProvider',routerFn]);

    return businessPermitRole;
});