/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoEditFunc = function($scope,$state,ApiPath,infogaterInfoServ,$stateParams) {
        var infogaterInfoId = $stateParams.infogaterInfoId;
        if(infogaterInfoId!='') {
            infogaterInfoServ.getInfogaterInfoById(infogaterInfoId).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterInfo = answer.data;
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterInfoPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterInfoPage");
        };

        $scope.save = function() {
            if(infogaterInfoId=='') {
                saveInfogaterInfo();
            }else {
                updateInfogaterInfo();
            }
        };
        var saveInfogaterInfo = function() {
            console.log("123");
            $scope.saveDisableFlag = true;
            infogaterInfoServ.saveInfogaterInfo($scope.infogaterInfo).then(
                function(answer){
                    console.log("保存返回信息为", answer.data);
                    if(answer.data=="1"){
                        $scope.message = $scope.infogaterInfo.infoName+"保存成功";
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
        };
        var updateInfogaterInfo = function () {
            console.log('updateInfogaterInfo function .');
            $scope.saveDisableFlag = true;
            infogaterInfoServ.updateInfogaterInfoById($scope.infogaterInfo).then(
                function (answer) {
                    console.log("InfogaterInfo，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = $scope.infogaterInfo.infoName+'修改成功';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - InfogaterInfo";
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

    moduleApp.controller('infogaterInfoEditCtrl',["$scope","$state","ApiPath","infogaterInfoServ",'$stateParams',infogaterInfoEditFunc]);
});