/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandScheduleEditCtrlFunc = function ($scope,$state,ApiPath,demandScheduleServ,$stateParams,FormFocus) {
        console.log('init demandschEdit.ctrl.js');
        var demandschId=$stateParams.demandschId;
        var id = $stateParams.demandid;
        if(demandschId!=''){
            console.log('demandschId is not null ');
            demandScheduleServ.getDemandschById(demandschId).then(
                function (answer) {
                    console.log(answer.data);
                    $scope.demandsch = answer.data;
                }
            )
        }
        $scope.alertLayer = true;
        $scope.updateDemandschDisableFlag = false;
        $scope.exit = function () {
            console.log('exit function .');
            $state.go('main.demandschPage',{demandid:$scope.demandsch.demandId,demandId:id});
        };

       $scope.closeLayer = function () {
           console.log('closeLayer function . ');
            $state.go('main.demandschPage',{demandid:$scope.demandsch.demandId,demandId:id});
        };

       $scope.saveDemandsch = function () {
           if (this.demandschEditFrom.$invalid) {
               FormFocus.focusEle("demandschEditFrom");
               return;
           }
           console.log('saveDemandsch function .');
           $scope.updateDemandschDisableFlag = true;
           demandScheduleServ.saveDemandsch($scope.demandsch).then(
               function (answer) {
                   console.log("保存Demandsch，返回信息为",answer.data);
                   if(answer.data == '1'){
                       console.log('保存成功');
                       $scope.message = '保存成功-demandsch';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       console.log('保存失败');
                       $scope.message = "保存失败，请稍后重试 - demandsch";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.updateDemandschDisableFlag = false;
                   }

               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.updateDemandschDisableFlag = false;
                   console.log('出现错误');
               }
           );
           $scope.exit = function () {
               console.log('exit function .');
               $state.go('main.demandschPage');
           };
       }

        $scope.updateDemandsch = function () {
            if (this.demandschEditFrom.$invalid) {
                FormFocus.focusEle("demandschEditFrom");
                return;
            }
            console.log('updateDemandsch function .');
            $scope.updateDemandschDisableFlag = true;
            demandScheduleServ.updateDemandschById($scope.demandsch).then(
                function (answer) {
                    console.log("修改Demandsch，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-demandsch';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - demandsch";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                        $scope.updateDemandschDisableFlag = false;
                    }

                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                    $scope.updateDemandschDisableFlag = false;
                    console.log('出现错误');
                }
            );
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.demandschPage');
            };
        }
    };

    moduleApp.controller('demandScheduleEditCtrl',["$scope","$state","ApiPath","demandScheduleServ",'$stateParams','FormFocus',demandScheduleEditCtrlFunc]);
});
