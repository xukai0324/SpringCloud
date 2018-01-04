/**
 * Created by gaofeng on 2017/5/1.
 */


define([ 'angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider) {
        var techPersonPath = 'components/glean/techPerson';
        $stateProvider
            .state("main.gleanTechPersonPage", {
                url:"/techPersonPage",
                templateUrl:techPersonPath+ "/tpl/techPersonPage.html",
                controller:'techPersonPageCtrl',
                resolve:{
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            techPersonPath+'/controller/techPersonPage.ctrl.js',
                            techPersonPath+'/service/techPerson.serv.js']);
                    }]
                }
            }).state("main.gleanTechPersonEdit", {
            url:"/techPersonTechPersonEdit/:id",
            templateUrl:techPersonPath+ "/tpl/techPersonEdit.html",
            controller:'techPersonEditCtrl',
            resolve:{
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                           techPersonPath+'/controller/techPersonEdit.ctrl.js',
                           techPersonPath+'/service/techPerson.serv.js']);
                }]
            }
            }).state("main.gleanTechPersonView", {
                url:"/techPersonView/:id",
                templateUrl:techPersonPath+ "/tpl/techPersonView.html",
                controller:'techPersonViewCtrl',
                resolve:{
                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                             techPersonPath+'/controller/techPersonView.ctrl.js',
                             techPersonPath+'/service/techPerson.serv.js']);
                    }]
                }
                });
    };

    /*模块定义*/
    var businessTechPerson = angular.module('business.glean.techPerson', []);
    businessTechPerson.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessTechPerson.controller = $controllerProvider.register;
            businessTechPerson.directive = $compileProvider.directive;
            businessTechPerson.filter = $filterProvider.register;
            businessTechPerson.factory = $provide.factory;
            businessTechPerson.service = $provide.service;
            businessTechPerson.constant = $provide.constant;
        }]);

    /*定义路由*/
    businessTechPerson.config(['$stateProvider',routerFn]);
    return businessTechPerson;
});