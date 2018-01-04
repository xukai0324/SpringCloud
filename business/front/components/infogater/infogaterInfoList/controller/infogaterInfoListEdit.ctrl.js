/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoListEditFunc = function($scope,$state,ApiPath,infogaterInfoListServ,$stateParams) {
        /*var infogaterInfoListType = $stateParams.infogaterInfoListType;
        var infogaterInfoListCode = $stateParams.infogaterInfoListCode;*/
        $scope.infogaterInfo = JSON.parse($stateParams.infogaterInfo);
        var infogaterInfoListId = $stateParams.infogaterInfoListId;
        if(infogaterInfoListId!='') {
            infogaterInfoListServ.getInfogaterInfoListById(infogaterInfoListId).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterInfoList = answer.data;
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            //$state.go("main.infogaterInfoListPage");
            $state.go("main.infogaterInfoListPage",{infogaterInfo:JSON.stringify($scope.infogaterInfo)});
        };

        $scope.closeLayer = function() {
            //$state.go("main.infogaterInfoListPage");
            $state.go("main.infogaterInfoListPage",{infogaterInfo:JSON.stringify($scope.infogaterInfo)});
        };

        $scope.saveInfogaterInfoList = function() {
            $scope.infogaterInfoList.infoMainId = $scope.infogaterInfo.id;
            if(infogaterInfoListId=='') {
                save();
            }else {
                update();
            }
        };
        var save = function() {
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
        var update = function () {
            console.log('updateInfogaterInfoList function .');
            $scope.saveDisableFlag = true;
            infogaterInfoListServ.updateInfogaterInfoListById($scope.infogaterInfoList).then(
                function (answer) {
                    console.log("InfogaterInfoList，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功';
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

    moduleApp.controller('infogaterInfoListEditCtrl',["$scope","$state","ApiPath","infogaterInfoListServ",'$stateParams',infogaterInfoListEditFunc]);
});