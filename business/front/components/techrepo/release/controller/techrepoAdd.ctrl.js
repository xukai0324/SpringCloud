/* Created by sunfm on 2017/6/6. */
define(['../module'],function(moduleApp) {
    'use strict';

    var techrepoAddCtrlFunc = function ($scope,$state,ApiPath,techrepoServ,FormFocus,$stateParams) {
        $scope.alertLayer = true;
        $scope.savetechrepoDisableFlag = false;
        $scope.exit = function () {
            $state.go('main.techrepoPage');
        };

       $scope.closeLayer = function () {
            $state.go('main.techrepoPage');
        };

       $scope.saveTechrepo = function () {
           if (this.techrepoSaveFrom.$invalid) {
               FormFocus.focusEle("techrepoSaveFrom");
               return;
           }
           console.log('savetechrepo function .');
           $scope.savetechrepoDisableFlag = true;
           techrepoServ.saveTechrepo($scope.techrepo).then(      // Here execute Service Function, next CallBack
               function (answer) {
                   if(answer.data == '1'){
                       $scope.message = '保存成功-技术资源';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       $scope.message = "保存失败，请稍后重试 - 技术资源";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.savetechrepoDisableFlag = false;
                   }
               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.savetechrepoDisableFlag = false;
               }
           );
           $scope.exit = function () {
               $state.go('main.techrepoPage');
           };
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.techrepoPage');
            };
        }
    };

    moduleApp.controller('techrepoAddCtrl',["$scope","$state","ApiPath","techrepoServ",'FormFocus','$stateParams',techrepoAddCtrlFunc]);
});
