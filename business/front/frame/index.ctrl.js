/**
 * Created by ZhangJiansen on 2016/9/16.
 * 首页控制
 */
define(['app','constants'
], function (app,constants) {
    'use strict';
    app.controller('IndexCtrl', ['$scope','$rootScope','$state','$window','$$user','$timeout',
        function ($scope,$rootScope,$state,$window,$$user,$timeout) {

            /*
            * 页面跳转滚动条顶部显示
            * */
            $rootScope.$on("$stateChangeSuccess",
                function(event) {
                    $timeout(function(){
                        if(document.getElementById('test') != null){
                            document.getElementById('test').scrollTop=0;
                        }
                    },50)
                });

            /*
            * 菜单刷新高亮显示
            * */
            $scope.currentURL ={
                currentType:""
            };
            $rootScope.$on("$stateChangeSuccess",function (event) {
                $timeout(function(){
                    $scope.currentURL.currentType = $state.$current.name;
                },200)
            });

            //$scope.constants = constants;

            var setUpEventListener = function () {
                //异步请求 loading
                /*$rootScope.$on(constants.EVENTS.AUTH_REJECT, function (event) {
                    alert('没有权限');
                });*/

                //浏览器关闭清除token(记录浏览器关闭时间)
                var clearToken = function(){
                    console.info("关闭了浏览器");
                    /*var user = localStorageService.get(config.localstorage.user);
                     var subDate = Date.parse(new Date()).toString().length-3;
                     user.newTime = parseInt(Date.parse(new Date()).toString().substr(0,subDate));
                     localStorageService.set(config.localstorage.user, user);
                     */
                };

                $window.onunload = clearToken;
            };

            setUpEventListener();

            /* *
             * 获取用户已登录信息
             * */
            $$user.getLoginUser({
                success: function (user) {
                    console.info("login success:",user.userCode);
                    $timeout(function(){
                        if($state.current.name != "pdf" && $state.current.name != "chargePdf"){
                            //$state.current.name='';
                            console.log("current state:",$state.current.name);
                            $state.go('main.index');/*,{}, {reload: true}*/
                        }
                    },500);
                },error: function(error){
                    console.error("login error");
                }
            });
        }]);
});