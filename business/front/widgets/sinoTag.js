/**
 * Created by ZhangJiansen on 2016/12/15.
 * 自定义a标签，支持跳转前增加操作
 */
define(['angular'],
    function(angular) {
        'use strict';
        angular.module('sino.Tag',[])
            .directive("sinoA", ['$q','$timeout','$interval','$window',
                function ($q,$timeout,$interval,$window) {
                    return {
                        restrict:'E',
                        replace: true,
                        transclude: true,
                        scope:{
                            onBefore: '&',
                            stHref: '='
                        },
                        template:'<div ng-click="onTagClick()" ng-transclude></div>',
                        link:function (scope, element, attrs, ctrl) {
                            /*a标签点击事件响应方法*/
                            scope.onTagClick = function(){
                                var beforeClick = scope.onBefore || function(){
                                        var deffer = $q.defer();
                                        deffer.resolve();
                                        return deffer.promise;
                                    };

                                var execOver = false;
                                var w = $window.open(), num = 0;

                                beforeClick().then(
                                    function(succ){
                                        execOver = true;
                                    },function(fail){
                                        w.close();
                                    }
                                );

                                /*var link= $('<a id="triggerOpen" href="" target="_blank"><span id="tempSpan">a</span></a>');
                                 link.appendTo('body');
                                 $('#triggerOpen').attr('href', "pdf")[0].click();*/

                                var inter = $interval(function(){
                                    num ++;
                                    if(execOver){
                                        w.location = scope.stHref;
                                        $interval.cancel(inter);
                                    }

                                    if(num >= 15){
                                        $interval.cancel(inter);
                                        w.close();
                                    }
                                },500,20);

                            };
                        }
                    }
                }
            ]);
    });
