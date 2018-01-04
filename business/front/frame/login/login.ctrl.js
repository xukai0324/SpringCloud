define(['app'], function (app) {
    'use strict';
    app.controller('LoginCtrl', ['$scope','$location','$stateParams','$$user',
        function ($scope,$location,$stateParams,$$user) {
            $scope.loginmessage = $stateParams.msg;
            //系统登录
            $scope.login = function(){
                try{
                    var authUser = $scope.auth.user;
                    $$user.login(authUser).then(
                        function(answer){
                            console.log(JSON.stringify(answer.data));

                            if(answer.status){
                                console.log("login success");
                                $location.path('/main');
                            }else{
                                console.log("login fail");
                                $scope.loginmessage = answer.statusText
                            }
                        },
                        function(error){
                            $scope.loginmessage = "系统登录异常";
                            console.log(JSON.stringify(error));
                        }
                    );
                }catch(e){
                    console.log(e);
                    $scope.loginmessage = "系统异常,请联系管理员";
                }
            };
        }]);
    //编写指令，用于页面repeatFinish渲染完成
//    app.directive('repeatFinish', function () {
//        return {
//            link: function (scope, element, attr) {
//                console.log(scope.$index)
//                if (scope.$last == true) {
//                    scope.$eval(attr.repeatFinish)
//                }
//            }
//        }
//    });
});