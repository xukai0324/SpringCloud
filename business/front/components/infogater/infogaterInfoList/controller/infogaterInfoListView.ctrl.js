/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoListViewFunc = function($scope,$state,ApiPath,infogaterInfoListServ,$stateParams) {
        $scope.infogaterInfo = JSON.parse($stateParams.infogaterInfo);
        var infogaterInfoListId = $stateParams.infogaterInfoListId;

        infogaterInfoListServ.getInfogaterInfoListById(infogaterInfoListId).then(
            function(answer) {
                $scope.infogaterInfoList = answer.data;
            }
        );
        $scope.exit = function() {
            $state.go("main.infogaterInfoListPage",{infogaterInfo:JSON.stringify($scope.infogaterInfo)});
        }
    };

    moduleApp.controller('infogaterInfoListViewCtrl',["$scope","$state","ApiPath","infogaterInfoListServ",'$stateParams',infogaterInfoListViewFunc]);
});