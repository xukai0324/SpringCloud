/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentAddCtrlFunc = function ($scope,$state,ApiPath,gleanComponentServ,$stateParams,FormFocus) {
        $scope.alertLayer = true;
        $scope.exit = function () {
            $state.go('main.componentPage');
        };

       $scope.closeLayer = function () {
            $state.go('main.componentPage');
        };

       $scope.OnSelect = function () {
           console.log('项目名称选择完毕，加载对应的版本信息');
           console.log($scope.component.componentNameId);
           queryGleanComponentInfoVersionById($scope.component.componentNameId);
       }
       /**
         *根据组件名称ID查找对应的版本信息
         */
       var queryGleanComponentInfoVersionById = function (componentNameId) {
           var condition = {'codeType':componentNameId};
           gleanComponentServ.queryGleanComponentInfoVersionById(condition).then(function(answer){
               console.log(answer);
               $scope.versionList=answer.data.codeData;
           },function (error) {
               console.log(error);
           })
       }
       $scope.saveComponent = function () {
           $scope.saveDisableFlag = true;
           console.log('-----------新增组件------------');
           $scope.component.labelList=[];
           gleanComponentServ.saveComponent($scope.component).then(
               function (answer) {
                   console.log(answer);
                   if(answer.data == '1'){
                       $scope.message = '添加成功';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                   }else{
                       $scope.message = "添加失败，请稍后重试";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                   }
               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
               }
           );
           $scope.exit = function () {
               $state.go('main.componentPage');
           };
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.componentPage');
            };
        }
    };

    moduleApp.controller('gleanComponentAddCtrl',["$scope","$state","ApiPath","gleanComponentServ",'$stateParams','FormFocus',gleanComponentAddCtrlFunc]);
});
