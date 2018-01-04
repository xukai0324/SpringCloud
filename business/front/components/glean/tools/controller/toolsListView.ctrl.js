/**
 * Created by MaWenzheng on 2017/5/2.
 */
define([ '../module' ], function(moduleApp) {
	'use strict';
	var gleanToolsViewCtrlFunc = function($scope, $state, ApiPath,
			gleanToolsListServ, gleanToolsServ, $stateParams) {
		$scope.backRoute = "main.toolsListPage";
        //指定返回路由
        if($stateParams.backRoute != ""){
        	$scope.backRoute = "main.toolsListAudit";
        }
		
		var toolsVersionId = $stateParams.toolsVersionId;
		var master = [];// 主表
		if (toolsVersionId != '') {
			gleanToolsServ.getToolsById($stateParams.toolsId).then(
					function(answer) {
						master = answer.data;
						gleanToolsListServ.getToolsById(toolsVersionId).then(
								function(answer) {
									$scope.tools = answer.data;
									$scope.tools.name = master.toolName;

								});
					})
		}
		if ($stateParams.isAudit) {
			$scope.isAudit = true;
		} else {
			$scope.isAudit = false;
		}
		$scope.alertLayer = true;
		$scope.closeLayer = function() {
			$state.go($scope.backRoute, {
				toolsId : $stateParams.toolsId
			});
		};
		$scope.exit = function() {
			$state.go($scope.backRoute, {
				toolsId : $stateParams.toolsId
			});
		}
		$scope.confirmLayer = true;
		$scope.closeConfirm = function() {
			$scope.confirmLayer = true;
			$scope.message = "";
		};

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
		
		$scope.pass = function () {
			$scope.tools.auditStatus = $scope.type;
            gleanToolsListServ.auditToolsVersion($scope.tools).then(
                function (answer) {
                    if(answer.data == '1'){
                        $scope.message = '审核成功';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                    }else{
                        $scope.message = "审核失败，请稍后重试";
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
                $state.go($scope.backRoute,{
    				toolsId : $stateParams.toolsId
    			});
            };
        }
	};
	moduleApp.controller('gleanToolsListViewCtrl', [ "$scope", "$state",
			"ApiPath", "gleanToolsListServ", "gleanToolsServ", '$stateParams',
			gleanToolsViewCtrlFunc ]);
});