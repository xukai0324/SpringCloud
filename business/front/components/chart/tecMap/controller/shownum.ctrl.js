/**
 * Created by zxp on 2017/4/26.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var shownumFunc = function($scope,$state,ApiPath,tecMapServ) {
        $scope.alertLayer = true;
        $scope.tip = "请注意，组件发布与组件使用并不相同，使用组件可以使用其他团队发布的组件。";
        
        tecMapServ.getShowNum().then(
            function(answer) {
                $scope.shownum = answer.data;
            }
        );
        $scope.exit = function() {
           $state.go("main.tecMap");
        }
    };

    moduleApp.controller('showNumCtrl',["$scope","$state","ApiPath","tecMapServ",shownumFunc]);
});




