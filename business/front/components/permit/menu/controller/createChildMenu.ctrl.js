/**
 * Created by changweican on 2017/5/3.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var createChildMenuCtrlFunc = function($scope,$state,ApiPath,permitMenuServ,$stateParams) {
        $scope.insertChildMenu = function() {
            var permitMenuDto = $scope.childMenu;
            permitMenuServ.insertChildMenu(permitMenuDto).then(
                function(answer) {
                    // $scope.menu = answer.data;
                    // console.log("响应结果:"+answer.data);
                    $state.go("main.parentMenuList");

                }
            );
        };
        $scope.childMenu = JSON.parse($stateParams.menuData);
        console.log("menus:"+$stateParams.menuData);

        $scope.exit = function() {
            $state.go("main.parentMenuList");
        }
    };

    moduleApp.controller('createChildMenuCtrl',["$scope","$state","ApiPath","permitMenuServ","$stateParams",createChildMenuCtrlFunc]);
});