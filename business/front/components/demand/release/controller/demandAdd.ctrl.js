/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandReleaseAddCtrlFunc = function ($scope,$state,ApiPath,demandReleaseServ,FormFocus,$stateParams) {
        $scope.alertLayer = true;
        $scope.saveDemandDisableFlag = false;
        $scope.exit = function () {
            $state.go('main.demandPage');
        };

       $scope.closeLayer = function () {
            $state.go('main.demandPage');
        };

       $scope.saveDemand = function () {
           if (this.demandSaveFrom.$invalid) {
               FormFocus.focusEle("demandSaveFrom");
               return;
           }
           console.log('saveDemand function .');
           $scope.saveDemandDisableFlag = true;
           demandReleaseServ.saveDemand($scope.demand).then(
               function (answer) {
                   if(answer.data == '1'){
                       $scope.message = '保存成功-demand';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       $scope.message = "保存失败，请稍后重试 - demand";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.saveDemandDisableFlag = false;
                   }

               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.saveDemandDisableFlag = false;
               }
           );
           $scope.exit = function () {
               $state.go('main.demandPage');
           };
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.demandPage');
            };
        }
    };

    moduleApp.controller('demandReleaseAddCtrl',["$scope","$state","ApiPath","demandReleaseServ",'FormFocus','$stateParams',demandReleaseAddCtrlFunc]);
});
