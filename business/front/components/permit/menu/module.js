/**
 * Created by changweican on 2017/5/3.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessPermitMenu = angular.module('business.permit.menu',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessPermitMenu.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessPermitMenu.controller = $controllerProvider.register;
            businessPermitMenu.directive = $compileProvider.directive;
            businessPermitMenu.filter = $filterProvider.register;
            businessPermitMenu.factory = $provide.factory;
            businessPermitMenu.service = $provide.service;
            businessPermitMenu.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var permitMenuPath = "components/permit/menu";
        $stateProvider.state('main.permitMenuView',{
            url : "/permitMenuView",
            templateUrl : permitMenuPath+"/tpl/permitMenuView.html",
            controller : 'menuViewCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/permitMenuView.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
            }
        }).state('main.createParentMenu',{
            url : "/createParentMenu",
            templateUrl : permitMenuPath+"/tpl/createParentMenu.html",
            controller : 'createParentMenuCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/createParentMenu.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
            }
        }).state('main.createChildMenu',{
            url : "/createChildMenu/:menuData",
            templateUrl : permitMenuPath+"/tpl/createChildMenu.html",
            controller : 'createChildMenuCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/createChildMenu.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
            }
        }).state('main.parentMenuList',{
            url : "/parentMenuList",
            templateUrl : permitMenuPath+"/tpl/parentMenuList.html",
            controller : 'parentMenuListCtrl',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/parentMenuList.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
            }
        }).state("main.createMenu", {
        	url: "/createMenu/{menuId}",
        	templateUrl : permitMenuPath+"/tpl/createMenu.html",
        	controller : 'createMenuCtrl',
        	resolve : {
        		loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/optMenu.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
        	}
        }).state("main.showMenu", {
        	url:"/showMenu/{menuId}",
        	templateUrl: permitMenuPath + "/tpl/showMenu.html",
        	controller : 'showMenuCtrl',
        	resolve : {
        		loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        permitMenuPath+'/controller/optMenu.ctrl.js',
                        permitMenuPath+'/service/permitMenu.serv.js']);
                }]
        	}
        })
    };

    //定义路由,使用方法前必须在前面先定义
    businessPermitMenu.config(['$stateProvider',routerFn]);

    return businessPermitMenu;
});