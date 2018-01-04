/**
 * Created by zxp on 2017/4/26.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var rankPopFunc = function($scope,$state,ApiPath,tecMapServ) {
        $scope.alertLayer = true;
        tecMapServ.getTopNPop().then(
            function(answer) {
                $scope.TopNPopData = answer.data;
                $scope.TopNPopDataUpd = answer.data[0].pop_othm;
            }
        );
        $scope.exit = function() {
           $state.go("main.tecMap");
        }
        
    };

    moduleApp.controller('rankPopCtrl',["$scope","$state","ApiPath","tecMapServ",rankPopFunc]);
});




