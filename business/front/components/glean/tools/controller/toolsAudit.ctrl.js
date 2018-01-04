/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsAuditCtrlFunc = function ($scope,$state,ApiPath,gleanToolsServ,$stateParams) {
      console.log('gleanToolsAuditCtrl view ctrl ......' );
      
      $scope.alertLayer = true;
      $scope.exit = function () {
          $state.go('main.toolsPage');
      };

     $scope.closeLayer = function () {
          $state.go('main.toolsPage');
      };
      
      //审核确认框
	  $scope.confirmTpl = function (type) {
		  if(type == "1"){
			  $scope.message = "是否审核通过？";
		  }else{
		 	  $scope.message = "是否审核不通过？";
		  }
          $scope.type = type;
          angular.comfirm($scope.message,$scope);
	  }
	  
	  $scope.okCallback = function(){
		  $scope.pass();
  	  }
	  
	  
      var toolsId= $stateParams.toolsId;
      if(toolsId != ''){
          gleanToolsServ.getToolsById(toolsId).then(function (answer) {
              $scope.tools=answer.data;
          });
      }
      $scope.exit = function () {
          $state.go('main.toolsPage');
      }
      $scope.pass = function () {
		  $scope.saveDisableFlag = true;
    	  $scope.tools.auditStatus = $scope.type;
          gleanToolsServ.updateToolById($scope.tools).then(
              function (answer) {
                  if(answer.data == '1'){
                      console.log('审核成功');
                      $scope.message = '审核成功';
                      $scope.tip = "tip_1";
                      $scope.alertLayer  = false;
                  }else{
                      console.log('审核失败');
                      $scope.message = "审核失败，请稍后重试";
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
          $scope.exit = function () {
              console.log('exit function .');
              $state.go('main.toolsPage');
          };
      }
    };

    moduleApp.controller('gleanToolsAuditCtrl',["$scope","$state","ApiPath","gleanToolsServ",'$stateParams',gleanToolsAuditCtrlFunc]);
});