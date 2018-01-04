/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterCodeEditFunc = function($scope,$state,ApiPath,infogaterCodeServ,$stateParams) {
        var infogaterCodeType = $stateParams.infogaterCodeType;
        var infogaterCodeCode = $stateParams.infogaterCodeCode;
        $scope.codeType = infogaterCodeType;
        if(infogaterCodeType!=''&&infogaterCodeCode!='') {
            infogaterCodeServ.getInfogaterCodeById(infogaterCodeType,infogaterCodeCode).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterCode = answer.data;
                    $scope.codeType = answer.data.codeType;
                    $scope.codeCode = answer.data.codeCode;
                })
        }
        $scope.alertLayer = true;

        var typeDesc = $stateParams.infogaterCodeTypeDesc;
        $scope.typeDesc = typeDesc;
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
        $scope.updateInfogaterCode = function () {
            console.log('updateInfogaterCode function .');
            $scope.saveDisableFlag = true;
            var infogaterCode = $scope.infogaterCode;
            infogaterCode.codeType = $scope.codeType;
            infogaterCode.codeCode = $scope.codeCode;
            infogaterCodeServ.updateInfogaterCodeById(infogaterCode).then(
                function (answer) {
                    console.log("InfogaterCode，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-InfogaterCode';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - InfogaterCode";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                    }

                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                    console.log('出现错误');
                }
            );
        }
    };

    moduleApp.controller('infogaterCodeEditCtrl',["$scope","$state","ApiPath","infogaterCodeServ",'$stateParams',infogaterCodeEditFunc]);
});