/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterTypeViewFunc = function($scope,$state,ApiPath,infogaterTypeServ,$stateParams) {
        var infogaterTypeId = $stateParams.infogaterTypeId;
        infogaterTypeServ.getInfogaterTypeById(infogaterTypeId).then(
            function(answer) {
                $scope.infogaterType = answer.data;
            }
        );
        $scope.exit = function() {
            $state.go("main.infogaterTypePage");
        }
    };

    moduleApp.controller('infogaterTypeViewCtrl',["$scope","$state","ApiPath","infogaterTypeServ",'$stateParams',infogaterTypeViewFunc]);
});