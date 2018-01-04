/**
 * Created by gaofeng on 2017/5/1.
 */


define([ 'angular','moment'],function (angular,moment) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider) {
        var gleanPath = 'components/glean/project';
        $stateProvider
            .state("main.gleanProjectPage", {
                url:"/gleanProjectPage",
                templateUrl:gleanPath+ "/tpl/projectPage.html",
                controller:'projectPageCtrl',
                resolve:{
                    loadAreaquota:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            gleanPath+'/controller/projectPage.ctrl.js',
                            gleanPath+'/service/project.serv.js']);
                    }]
                }
            }).state("main.gleanProjectEdit", {
            url:"/gleanProjectEdit/:id",
            templateUrl:gleanPath+ "/tpl/projectEdit.html",
            controller:'projectEditCtrl',
            resolve:{
                loadAreaquota:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        gleanPath+'/controller/projectEdit.ctrl.js',
                        gleanPath+'/service/project.serv.js']);
                }]
            }
            }).state("main.gleanProjectView", {
                url:"/gleanProjectView/:id",
                templateUrl:gleanPath+ "/tpl/projectView.html",
                controller:'projectViewCtrl',
                resolve:{
                    loadAreaquota:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                             gleanPath+'/controller/projectView.ctrl.js',
                             gleanPath+'/service/project.serv.js']);
                    }]
                }
                });
    };

    /*模块定义*/
    var businessGleanProject = angular.module('business.glean.project', [])
    .directive('dateBefore',function(){
        return{
            require: "ngModel",
            link:function (scope, element, attrs, ngModel) {
                if(!ngModel) {
                    throw new error("beforeToday can't find ng-model directive");
                }

                function formatDate(value){
                    if((typeof(value) == "object") || (typeof(value) == "string")){
                        if(moment(value).isValid){
                            return value;
                        }
                    }
                    return undefined;
                }

                function compareDate(d1,d2){
                    return moment(d1).isSame(d2) || moment(d1).isBefore(d2);
                }

                //判断是否为undefined;
                function checkValue(value,msg){
                    if(typeof value == "undefined"){
                        throw new Error(msg);
                    }
                }

                var customValidator = function (value) {
                    if(!value){
                        ngModel.$setValidity("dateAfterNull", false);
                        return;
                    }else{
                    	ngModel.$setValidity("dateAfterNull", true);
                    }

                    //如果attrs.dateAfter没有计算出来的时候，直接返回value
                    if(attrs.dateBefore == ""){
                        return value;
                    }

                    //获得待比较的值
                    var cmpDate = formatDate(attrs.dateBefore);
                    //获取model的值
                    var valueDate = formatDate(value);
                    //如果model的值有问题
                    checkValue(valueDate,'model有问题');
                    //如果待比较的值有问题。
                    checkValue(cmpDate,'dateBefore有问题');
                    //验证值的是否在待比较日期之前
                    var validity = ngModel.$isEmpty(value) || (compareDate(valueDate,cmpDate));
                    ngModel.$setValidity("dateBefore", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        }
    }).directive('dateAfter',function($timeout){
        return{
            require: "ngModel",
            priority:1,
            link:function (scope, element, attrs, ngModel) {
                if(!ngModel) {
                    throw new Error("dateAfter can't find ng-model directive");
                }


                function formatDate(value){
                    if((typeof(value) == "object") || (typeof(value) == "string")){
                        if(moment(value).isValid){
                            return value;
                        }
                    }
                    return undefined;
                }

                function compareDate(d1,d2){
                    //console.log(d1,d2);
                    return moment(d1).isSame(d2) || moment(d1).isAfter(d2);
                }

                //判断是否为undefined;
                function checkValue(value,msg){
                    if(typeof value == "undefined"){
                        throw new Error(msg);
                    }
                }

                //用于表单值本身变化时做校验
                var customValidator = function (value) {
                    //console.log('customValidator',ngModel);
                    if(!value){
                        ngModel.$setValidity("dateAfter", true);
                        return;
                    }

                    //如果attrs.dateAfter没有计算出来的时候，直接返回value
                    if(attrs.dateAfter == ""){
                        return "";
                    }
                    //获得待比较的值
                    var cmpDate = formatDate(attrs.dateAfter);
                    //获取model的值
                    var valueDate = formatDate(value);
                    //如果model的值有问题
                    checkValue(valueDate,'model有问题');
                    //如果待比较的值有问题。
                    checkValue(cmpDate,'dateAfter有问题');
                    //验证值的是否在待比较日期之后
                    var validity = ngModel.$isEmpty(value) || (compareDate(valueDate,cmpDate));
                    //设置验证结果
                    ngModel.$setValidity("dateAfter", validity);
                    return validity?value:undefined;
                };

                //Model的数据转换为View交互控件显示的值
                ngModel.$formatters.push(customValidator);
                //将交互控件得到的View值转换为Model数据
                ngModel.$parsers.push(customValidator);

                
            }
        }
    });
    businessGleanProject.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            businessGleanProject.controller = $controllerProvider.register;
            businessGleanProject.directive = $compileProvider.directive;
            businessGleanProject.filter = $filterProvider.register;
            businessGleanProject.factory = $provide.factory;
            businessGleanProject.service = $provide.service;
            businessGleanProject.constant = $provide.constant;
        }]);
   
    /*定义路由*/
    businessGleanProject.config(['$stateProvider',routerFn]);
    return businessGleanProject;
});