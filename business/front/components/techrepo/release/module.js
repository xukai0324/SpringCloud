define([ 'angular'],function (angular) {
    'use strict';
    //定义模块
    var techRepo = angular.module('business.techrepo.release',[]);

    //这个必须得加 是将下面的controller service等注册到angular里面
    techRepo.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            techRepo.controller = $controllerProvider.register;
            techRepo.directive = $compileProvider.directive;
            techRepo.filter = $filterProvider.register;
            techRepo.factory = $provide.factory;
            techRepo.service = $provide.service;
            techRepo.constant = $provide.constant;
        }]);

    //定义路由的实现方法
    var routerFn = function($stateProvider) {
        var techRepoPath = "components/techrepo/release";
        $stateProvider.state('main.techrepoPage',{
            url : "/techrepoPage",
            templateUrl : techRepoPath+"/tpl/techrepoPage.html",
            controller: 'techrepoPage',
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        techRepoPath+'/controller/techrepoPage.ctrl.js',
                        techRepoPath+'/service/techrepo.serv.js'
                    ]);
                }]
            }
        }).state('main.techrepoView',{
            url : "techrepoView/:techrepoId",
            templateUrl : techRepoPath+"/tpl/techrepoView.html",
            controller: "techrepoViewCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        techRepoPath+'/controller/techrepoView.ctrl.js',
                        techRepoPath+'/service/techrepo.serv.js'
                    ]);
                }]
            }
        }).state('main.techrepoEdit',{
            url:"techrepoEdit/:techrepoId",
            templateUrl : techRepoPath+"/tpl/techrepoEdit.html",
            controller : "techrepoEditCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        techRepoPath+'/controller/techrepoEdit.ctrl.js',
                        techRepoPath+'/service/techrepo.serv.js']);
                }]
            }
        }).state('main.techrepoAdd',{
            url:"/techrepoAdd",
            templateUrl : techRepoPath+"/tpl/techrepoAdd.html",
            controller : "techrepoAddCtrl",
            resolve : {
                loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        techRepoPath+'/controller/techrepoAdd.ctrl.js',
                        techRepoPath+'/service/techrepo.serv.js']);
                }]
            }
        })
    };


    //定义路由,使用方法前必须在前面先定义
    techRepo.config(['$stateProvider',routerFn]);

    return techRepo;
});