/**
 * Created by changweican on 2017/5/3.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var createParentMenuCtrlFunc = function($scope,$state,ApiPath,permitMenuServ) {
        //添加父菜单
        $scope.insertParentMenu = function() {
            var permitMenuDto = $scope.permitMenu;
            permitMenuServ.insertMenu(permitMenuDto).then(
                function(answer) {
                    // $scope.menu = answer.data;
                    // console.log("响应结果:"+answer.data);
                    $state.go("main.parentMenuList");
                }
            );
        };
        //代码规范，设置初始状态
        $scope.permitMenu = {
            actionUrl: '',
            menuName: '',
            displayNo: '',
            image: '',
            target: ''
        };
        $scope.exit = function() {
            $state.go("main.parentMenuList");
        }
    };

    moduleApp.controller('createParentMenuCtrl',["$scope","$state","ApiPath","permitMenuServ",createParentMenuCtrlFunc]);
});