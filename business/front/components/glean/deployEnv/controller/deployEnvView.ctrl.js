/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var deployEnvViewFunc = function($scope,$state,ApiPath,deployEnvServ,$stateParams) {
        var deployEnvId = $stateParams.deployEnvId;
        deployEnvServ.getDeployEnvById(deployEnvId).then(
            function(answer) {
                $scope.deployEnv = answer.data;
            }
        );
        $scope.exit = function() {
            $state.go("main.deployEnvPage");
        }
    };

    moduleApp.controller('deployEnvViewCtrl',["$scope","$state","ApiPath","deployEnvServ",'$stateParams',deployEnvViewFunc]);
});