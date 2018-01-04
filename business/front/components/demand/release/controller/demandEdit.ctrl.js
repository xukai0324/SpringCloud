/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandReleaseEditCtrlFunc = function ($scope,$state,ApiPath,demandReleaseServ,$stateParams,FormFocus) {
        console.log('init demandEdit.ctrl.js');
        var demandId=$stateParams.demandId;
        if(demandId!=''){
            console.log('demandId is not null ');
            demandReleaseServ.getDemandById(demandId).then(
                function (answer) {
                    console.log(answer.data);
                    $scope.demand = answer.data;
                }
            )
        }
        $scope.alertLayer = true;
        $scope.updateDemandDisableFlag = false;
        $scope.exit = function () {
            console.log('exit function .');
            $state.go('main.demandPage');
        };

       $scope.closeLayer = function () {
           console.log('closeLayer function . ');
            $state.go('main.demandPage');
        };

       $scope.saveDemand = function () {
           if (this.demandEditFrom.$invalid) {
               FormFocus.focusEle("demandEditFrom");
               return;
           }
           console.log('saveDemand function .');
           $scope.updateDemandDisableFlag = true;
           demandReleaseServ.saveDemand($scope.demand).then(
               function (answer) {
                   console.log("保存Demand，返回信息为",answer.data);
                   if(answer.data == '1'){
                       console.log('保存成功');
                       $scope.message = '保存成功-demand';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       console.log('保存失败');
                       $scope.message = "保存失败，请稍后重试 - demand";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.updateDemandDisableFlag = false;
                   }

               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.updateDemandDisableFlag = false;
                   console.log('出现错误');
               }
           );
           $scope.exit = function () {
               console.log('exit function .');
               $state.go('main.demandPage');
           };
       }

        $scope.updateDemand = function () {
            if (this.demandEditFrom.$invalid) {
                FormFocus.focusEle("demandEditFrom");
                return;
            }
            console.log('updateDemand function .');
            $scope.updateDemandDisableFlag = true;
            demandReleaseServ.updateDemandById($scope.demand).then(
                function (answer) {
                    console.log("修改Demand，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-demand';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - demand";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                        $scope.updateDemandDisableFlag = false;
                    }

                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                    $scope.updateDemandDisableFlag = false;
                    console.log('出现错误');
                }
            );
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.demandPage');
            };
        }
    };

    moduleApp.controller('demandReleaseEditCtrl',["$scope","$state","ApiPath","demandReleaseServ",'$stateParams','FormFocus',demandReleaseEditCtrlFunc]);
});
