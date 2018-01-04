/**
 * Created by GuoXiangLian on 2016/10/12.
 */
define(['angular'],
    function (angular) {
        'use strict';
        angular.module('sino.pdf',[])
            .directive('ngPdf8', ['$compile','$timeout', '$rootScope',
                function ($compile,$timeout, $rootScope) {
                    return {
                        require: '^ngModel',
                        restrict: 'E',
                        //replace:true,
                        priority: 520,
                        scope: {
                            ngModel: '='
                        },
                        compile:function () {
                            return function ($scope, element, attrs, ctrl) {
                                $timeout(function(){
                                    var pdfDom = '<object ng-if="ngModel" id="PDFViewObject" type="application/pdf" width="100%" height="800" data="'+$scope.ngModel+'">' +
                                        '<div id="PDFNotKnown">你需要先安装pdf阅读器(Acrobat Reader)才能正常浏览文件，请点击<a href="https://get.adobe.com/cn/reader/" target="_blank">这里</a>下载.</div>' +
                                        '</object>';
                                    var body = $compile(pdfDom)($scope);
                                    $(element).after(body);
                                },200);
                            }
                        }
                    }
                }]);
});

