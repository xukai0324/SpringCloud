/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoListAddFunc = function($scope,$state,ApiPath,infogaterInfoListServ,$stateParams) {
        var infoMainId = $stateParams.infoMainId;
        $scope.infogaterInfoList.infoMainId = infoMainId;
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterInfoListPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterInfoListPage");
        };

        $scope.saveInfogaterInfoList = function() {
            $scope.saveDisableFlag = true;
            infogaterInfoListServ.saveInfogaterInfoList($scope.infogaterInfoList).then(
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
        $scope.updateInfogaterInfoList = function () {
            console.log('updateInfogaterInfoList function .');
            $scope.saveDisableFlag = true;
            infogaterInfoListServ.updateInfogaterInfoListById($scope.infogaterInfoList).then(
                function (answer) {
                    console.log("InfogaterInfoList，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-InfogaterInfoList';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - InfogaterInfoList";
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

    moduleApp.controller('infogaterInfoListAddCtrl',["$scope","$state","ApiPath","infogaterInfoListServ",'$stateParams',infogaterInfoListAddFunc]);
});