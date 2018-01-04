/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterTypeAddFunc = function($scope,$state,ApiPath,infogaterTypeServ,$stateParams) {

        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterTypePage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterTypePage");
        };

        $scope.saveInfogaterType = function() {
            $scope.saveDisableFlag = true;
            infogaterTypeServ.saveInfogaterType($scope.infogaterType).then(
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
        $scope.updateInfogaterType = function () {
            console.log('updateInfogaterType function .');
            $scope.saveDisableFlag = true;
            infogaterTypeServ.updateInfogaterTypeById($scope.infogaterType).then(
                function (answer) {
                    console.log("InfogaterType，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-InfogaterType';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - InfogaterType";
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

    moduleApp.controller('infogaterTypeAddCtrl',["$scope","$state","ApiPath","infogaterTypeServ",'$stateParams',infogaterTypeAddFunc]);
});