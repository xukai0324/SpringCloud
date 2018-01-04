/**
 * Created by Administrator on 2017/4/13.
 */
define(['angular'],function(angular) {
    'use static';

    //定义模块
    var businessTecMap = angular.module('business.collection.tecMap',[]);
    //这个必须得加 是将下面的controller service等注册到angular里面
    businessTecMap.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessTecMap.controller = $controllerProvider.register;
            businessTecMap.directive = $compileProvider.directive;
            businessTecMap.filter = $filterProvider.register;
            businessTecMap.factory = $provide.factory;
            businessTecMap.service = $provide.service;
            businessTecMap.constant = $provide.constant;
        }]);

    //定义路由
    var routerFn = function($stateProvider) {
        var toolPath = "components/chart/tecMap";
        $stateProvider.state(
		   'main.index',{
	            url : "/tecMap",
	            views: {
	                '': {
	                    templateUrl: toolPath+"/tpl/tecMap.html"
	                },
	            'rankall@main.index': {
	                templateUrl: toolPath+"/tpl/rank/rankall.html",
	                controller : 'rankallCtrl',
	                resolve : {
	                    loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
	                        return $ocLazyLoad.load([
	                            toolPath+'/controller/rankall.ctrl.js',
	                            toolPath+'/service/tecMap.serv.js']);
	                    }]
	                }
                },
                'pop@main.index': {
                    templateUrl: toolPath+"/tpl/rank/rankpop.html",
                    controller : 'rankPopCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/rankPop.ctrl.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                },
                'shownum@main.index': {
                    templateUrl: toolPath+"/tpl/shownum/shownum.html",
                    controller : 'showNumCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/shownum.ctrl.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                },
                'assTendency@main.index': {
                    templateUrl: toolPath+"/tpl/tendency/assTendency.html",
                    controller : 'assTendencyCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/assTendency.ctrl.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                },
                'perday@main.index': {
                    templateUrl: toolPath+"/tpl/perday/perday.html",
                    controller : 'perdayCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/perday.ctrl.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                },
                'radar@main.index': {
                    templateUrl: toolPath+"/tpl/radarcap/radarcap.html",
                    controller : 'radarCapCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/radarcap.ctrl.js',
                                toolPath+'/directive/chart.dirc.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                } ,
                'topQues@main.index': { //热门问题 topQues\topQues.html
                    templateUrl: toolPath+"/tpl/topQues/topQues.html",
                    controller : 'topQuesCtrl',
                    resolve : {
                        loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([
                                toolPath+'/controller/topQues.ctrl.js',
                                toolPath+'/service/tecMap.serv.js']);
                        }]
                    }
                }
                // ,
                // 'amoebaTendency@main.tecMap': {
                //     templateUrl: toolPath+"/tpl/tendency/amoebaTendency.html"
                // }


                
            } 
        })
    };
    // var routerFn = function($stateProvider) {
    //     var toolPath = "components/chart/tecMap";
    //     $stateProvider.state('main.tecMap',{
    //         url : "/tecMap",
    //         views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
    //             '': {
    //                 templateUrl: toolPath+"/tpl/tecMap.html",
    //                 controller : 'tecMapCtrl',
    //                 resolve : {
    //                     loadCommunity:['$ocLazyLoad',function($ocLazyLoad){
    //                         return $ocLazyLoad.load([
    //                             toolPath+'/controller/tecMap.ctrl.js',
    //                             toolPath+'/service/tecMap.serv.js']);
    //                     }]
    //                 }
    //             },
    //             'rankfront@main.tecMap': {
    //                 templateUrl: toolPath+"/tpl/rank.html"
    //             }
    //         } 
    //     })
    // };

    //定义路由,使用方法前必须在前面先定义
    businessTecMap.config(['$stateProvider',routerFn]);

    return businessTecMap;
});