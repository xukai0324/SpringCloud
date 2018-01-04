/**
 * Created by ZhangJiansen on 2016/11/8.
 * 公共弹窗提示服务
 */
define(['app','constants','angular'
], function (app,constants,angular) {
    'use strict';
    app.service('promptServ',['$http','$q','$modal','$rootScope',
        function($http,$q,$modal,$rootScope){

            //TODO:判断如果已存在一个弹窗，则只更新内容或不再弹新窗口
            /*var tipModalInstance;
            var confirmModalInstance;*/

            var _showTipDialog = function(title, content,options,isAppend,maxDisplay){
                /*if(angular.isDefined(tipModalInstance)){
                    tipModalInstance.opened.then(
                        function(){
                            console.log("已经有一个打开的提示窗");
                        },function(){
                            console.log("没有打开的提示窗");
                            _showDialog(title, content,'tipModal',{}||options);
                        }
                    );
                }else{
                    console.log("未定义");
                    _showDialog(title, content,'tipModal',{}||options);
                }*/

                _showDialog(title, content,'tipModal',options,isAppend,maxDisplay);
            };

            var _showConfirmDialog = function(title, content,options){
                /*if(angular.isDefined(confirmModalInstance)){
                    confirmModalInstance.opened.then(
                        function(){
                            console.log("已经有一个打开的提示窗");
                        },function(){
                            console.log("没有打开的提示窗");
                            _showDialog(title, content,'confirmModal',{}||options);
                        }
                    );
                }else{
                    console.log("未定义");
                    _showDialog(title, content,'confirmModal',{}||options);
                }*/
                _showDialog(title, content,'confirmModal',options);

            };

            //自定义提示公共方法
            var _showDialog = function (title, content, modalType, options) {
                var ModalInstanceCtrl = function ($scope, $modalInstance, title, content) {
                    $scope.ok = function () {
                        $modalInstance.close("弹框关闭参数");
                        $rootScope.$broadcast('contents','')
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                        $rootScope.$broadcast('contents','')
                    };
                    var init = function () {
                        $scope.content = content;
                        $scope.title = title;
                    };
                    init();
                };

                //确认操作弹框
                if (modalType == 'confirmModal') {
                    var confirmModalInstance = $modal.open({
                        backdrop: 'static',
                        animation: true,
                        templateUrl: 'frame/common/prompt/tpl/confirmModal.html',
                        controller: ModalInstanceCtrl,
                        size: 'sm',
                        resolve: {
                            title: function () {
                                return title;
                            },
                            content: function () {
                                return content;
                            }
                        }
                    });

                    //弹框关闭参数接收
                    confirmModalInstance.result.then(
                        function (ok) {
                            //执行ok方法时的回调函数
                            console.log("ok");
                            if(angular.isDefined(options) && angular.isFunction(options.okCallback)){
                                options.okCallback(ok);
                            }
                        },function(cancel){
                            console.log("cancel");
                            if(angular.isDefined(options) && angular.isFunction(options.closeCallback)){
                                options.closeCallback(cancel);
                            }
                        }
                    );
                }

                //提示弹框
                if (modalType == 'tipModal') {
                    var tipModalInstance = $modal.open({
                        backdrop: 'static',
                        animation: true,
                        templateUrl: 'frame/common/prompt/tpl/tipModal.html',
                        controller: ModalInstanceCtrl,
                        size: 'sm',
                        resolve: {
                            title: function () {
                                return title;
                            },
                            content: function () {
                                return content;
                            }
                        }
                    });

                    //弹框关闭参数接收
                    tipModalInstance.result.then(
                        function (ok) {
                            //执行ok方法时的回调函数
                            console.log("ok");
                            if(angular.isDefined(options) && angular.isFunction(options.okCallback)){
                                options.okCallback(ok);
                            }
                        },function(error){
                            console.log("cancel");
                            if(angular.isDefined(options) && angular.isFunction(options.okCallback)){
                                options.okCallback(ok);
                            }
                        }
                    );
                }


            };
            return {
                //自定义提示功能
                //showDialog:_showDialog
                showTipDialog:_showTipDialog,
                showConfirmDialog:_showConfirmDialog
            };
        }]);
});
