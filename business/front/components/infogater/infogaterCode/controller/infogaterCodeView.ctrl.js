/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterCodeViewFunc = function($scope,$state,ApiPath,infogaterCodeServ,$stateParams) {
        var infogaterCodeType = $stateParams.infogaterCodeType;
        var infogaterCodeCode = $stateParams.infogaterCodeCode;
        infogaterCodeServ.getInfogaterCodeById(infogaterCodeType,infogaterCodeCode).then(
            function(answer) {
                $scope.infogaterCode = answer.data;
            }
        );
        var typeDesc = $stateParams.infogaterCodeTypeDesc;
        $scope.codeType = infogaterCodeType;
        $scope.typeDesc = typeDesc;
        $scope.exit = function() {
            $state.go("main.infogaterCodePage",{infogaterTypId:$scope.codeType,infogaterTypDesc:$scope.typeDesc});
        }
    };

    moduleApp.controller('infogaterCodeViewCtrl',["$scope","$state","ApiPath","infogaterCodeServ",'$stateParams',infogaterCodeViewFunc]);
});