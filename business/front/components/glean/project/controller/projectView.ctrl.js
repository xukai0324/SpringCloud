/**
 * Created by gaofeng on 2017/5/2.
 */
define(['../module'], function (moduleApp) {
    'use strict';

    console.log("load view");
    var projectViewCtrlFunc = function($scope,$state,$stateParams,projectServ) {
        $scope.projectAlertLayer = true;
        var gleanProjectInfoId = $stateParams.id;
        $scope.hideFrameworkDetail=true;
        $scope.exit = function() {
            $state.go("main.gleanProjectPage");
        };
        $scope.closeLayer = function() {
            $scope.projectAlertLayer = true;
        };
        $scope.showFrameDetails=function(){
        	if($scope.hideFrameworkDetail){
        		$scope.hideFrameworkDetail=false;
        	}else{
        		$scope.hideFrameworkDetail=true;
        	}
        }
        
        //赋值
        projectServ.queryProjectById(gleanProjectInfoId).then(

            function(answer){
                $scope.gleanProjectInfoDto = answer.data;
            }/*,
             function(error) {
             $scope.message="获取信息失败";
             $scope.tip = "tip_2";
             $scope.projectAlertLayer = false;
             $scope.projectSaveDisableFlag = false;
             }*/);

    };


    moduleApp.controller('projectViewCtrl',['$scope','$state','$stateParams','projectServ',projectViewCtrlFunc]);

});