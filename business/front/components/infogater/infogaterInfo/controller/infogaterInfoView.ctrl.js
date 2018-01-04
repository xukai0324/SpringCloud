/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoViewFunc = function($scope,$state,ApiPath,infogaterInfoServ,$stateParams) {
        var infogaterInfoId = $stateParams.infogaterInfoId;
        infogaterInfoServ.getInfogaterInfoById(infogaterInfoId).then(
            function(answer) {
                $scope.infogaterInfo = answer.data;
            }
        );
        $scope.exit = function() {
            $state.go("main.infogaterInfoPage");
        }
    };

    moduleApp.controller('infogaterInfoViewCtrl',["$scope","$state","ApiPath","infogaterInfoServ",'$stateParams',infogaterInfoViewFunc]);
});