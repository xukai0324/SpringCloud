/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterCodeAddFunc = function($scope,$state,ApiPath,infogaterCodeServ,$stateParams) {
        var infogaterCodeType = $stateParams.infogaterCodeType;
        var typeDesc = $stateParams.infogaterCodeTypeDesc;
        $scope.codeType = infogaterCodeType;
        $scope.typeDesc = typeDesc;
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterCodePage",{infogaterTypId:$scope.codeType,infogaterTypDesc:$scope.typeDesc});
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterCodePage",{infogaterTypId:$scope.codeType,infogaterTypDesc:$scope.typeDesc});
        };
        $scope.setUpperCodeTypeList = function () {
            var condition = {codeType:$scope.codeType};
            console.log("condition.codeType="+condition.codeType);
            infogaterCodeServ.setUpperCodeTypeList(condition).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.upperCodeList = answer.data.codeData;
                }, function (error) {
                    $scope.upperCodeList = [];
                })
        }
        $scope.saveInfogaterCode = function() {
            $scope.saveDisableFlag = true;
            var infogaterCode = $scope.infogaterCode;
            infogaterCode.codeType = $scope.codeType;
            infogaterCodeServ.saveInfogaterCode(infogaterCode).then(
                function(answer){
                    console.log("保存返回信息为", answer.data);
                    if(answer.data=="1"){
                        $scope.message = "保存成功";
                        $scope.tip = "tip_1";
                        $scope.alertLayer = false;
                    }else{
                        $scope.message = "保存失败，请稍后重试！";
                        $scope.tip = "tip_2";
                        $scope.alertLayer = false;
                    }
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        }
    };

    moduleApp.controller('infogaterCodeAddCtrl',["$scope","$state","ApiPath","infogaterCodeServ",'$stateParams',infogaterCodeAddFunc]);
});