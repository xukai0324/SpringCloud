define(['app','constants','angular'
], function (app,constants,angular) {
    'use strict';
    app.controller('mainCtrl', ['$scope','$rootScope','$state','$q','$$user',
        function ($scope,$rootScope,$state,$q,$$user) {

            /**
             * 编辑个人信息
             */
            $scope.editTechPerson = function() {
                $state.go("main.gleanTechPersonEdit",{"id":1});
            }
            /* *
            *登录注销响应
            * */
            $scope.logout = function(){
                $$user.logout(function(){
                    var deffer = $q.defer();
                    angular.comfirm("确定要注销吗?",{okCallback:function(ok){
                        deffer.resolve();
                    },closeCallback:function(cancel){
                        deffer.reject();
                    }});
                    return deffer.promise;

                    /*var deffer = $q.defer();
                    if(confirm('确定要注销吗?'))
                        deffer.resolve();
                    else
                        deffer.reject();
                    return deffer.promise;*/
                });
            };

            /* *
             * 导航栏刷新控制
            * */
            var onStateChange = function(state){
                if(state=="main.index") {
                    $scope.showMainNagiv = false;
                }else{
                    $scope.showMainNagiv = true;
                }
            };
            $scope.$on('$stateChangeSuccess', function(event, toState) {
                console.log("current.state.name="+$state.$current.self.name);
                var stateName = $state.$current.self.name;
                if (angular.isDefined(stateName)) {
                    onStateChange(stateName);
                }
            });

            /* *
            * 获取用户已登录信息
            * */
            var user = $$user.getUser();
            $scope.loginUser = {};
            $scope.loginUser.userCode = user.userCode;
            $scope.loginUser.userInfo_Name = user.userName;

            console.info("welcode:",user.userName);

            /* *
             * 页面最小高度控制
             * */
            var winH = $(window).height()-68;
            $(".main_right").css("min-height",winH+'px');

            /* *
             * 菜单开关
             * */
            $scope.isActive=true;
            $scope.navClick = function(){
                $scope.$broadcast('SHOWNAVMENU');
                $scope.isActive=!$scope.isActive;
                $scope.leftFlag = !$scope.leftFlag;
                $scope.rightFlag = !$scope.rightFlag;
            };

        }]);
});