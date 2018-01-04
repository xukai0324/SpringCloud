/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandScheduleAddCtrlFunc = function ($scope,$state,ApiPath,demandScheduleServ,FormFocus,$stateParams) {
        $scope.alertLayer = true;
        $scope.saveDemandschDisableFlag = false;
        var demandId = $stateParams.demandId;
        var id = $stateParams.demandid;
        $scope.demandId = demandId;
        $scope.exit = function () {
            $state.go('main.demandschPage',{demandid:demandId,demandId:id});
        };

       $scope.closeLayer = function () {
            $state.go('main.demandschPage',{demandid:demandId,demandId:id});
        };

       $scope.saveDemandsch = function () {
           if (this.demandschSaveFrom.$invalid) {
               FormFocus.focusEle("demandschSaveFrom");
               return;
           }
           console.log('saveDemandsch function .');
           $scope.saveDemandschDisableFlag = true;
           var demandsch = $scope.demandsch;
           demandsch.demandId = demandId;
           demandScheduleServ.saveDemandsch(demandsch).then(
               function (answer) {
                   if(answer.data == '1'){
                       $scope.message = '保存成功-demandsch';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       $scope.message = "保存失败，请稍后重试 - demandsch";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.saveDemandschDisableFlag = false;
                   }

               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.saveDemandschDisableFlag = false;
               }
           );
           $scope.exit = function () {
               $state.go('main.demandschPage');
           };
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.demandschPage');
            };
        }
    };

    moduleApp.controller('demandScheduleAddCtrl',["$scope","$state","ApiPath","demandScheduleServ",'FormFocus','$stateParams',demandScheduleAddCtrlFunc]);
});
