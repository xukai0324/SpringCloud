/**
 * Created by ZhangJiansen on 2016/10/6.
 * 不支持H5的元素，以指令形式实现
 */
define(['angular'],
    function(angular) {
        'use strict';
        angular.module('sino.H5Element',[])
            .directive("mcPlaceholder", [
                '$timeout',
                function ($timeout) {

                    return {
                        require:'ngModel',
                        restrict:'A',
                        compile:function () {
                            return function ($scope, element, attrs, ctrl) {

                                //设置密码节点及虚拟密码节点(只做placeholder提示)
                                var real_pass = $(element);
                                real_pass.after('<input type="text" class="fake_pass"  required ng-model=' + attrs.ngModel +'  placeholder=' + attrs.mcPlaceholder +' style="display: none;">');

                                //获取虚拟密码节点
                                var fake_pass = $(element).parent().find('.fake_pass');

                                $timeout(function () {
                                    if(ctrl.$modelValue == "" || angular.isUndefined(ctrl.$modelValue)) {
                                        //设置密码节点和虚拟密码节点默认展示方式
                                        real_pass.hide();
                                        fake_pass.show();
                                    }
                                },650);

                                $scope.$on("changeValue",function(){
                                    $timeout(function(){
                                        if(ctrl.$modelValue == "" || angular.isUndefined(ctrl.$modelValue)) {
                                            //设置密码节点和虚拟密码节点默认展示方式
                                            real_pass.hide();
                                            fake_pass.show();
                                        }else{
                                            real_pass.show();
                                            fake_pass.hide();
                                        }
                                    },200)
                                });

                                //虚拟密码节点获取焦点后,隐藏该节点,同时展示密码节点及设置焦点
                                fake_pass.focus(function () {
                                    fake_pass.hide();
                                    real_pass.show().focus();
                                });

                                //录入密码后,如果为空,隐藏密码节点,展示虚拟密码节点
                                real_pass.blur(function () {
                                    if(real_pass.val() == ""){
                                        real_pass.hide();
                                        fake_pass.show();
                                    }
                                });
                            }
                        }
                    }
                }
            ]);
});