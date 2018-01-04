/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsEditCtrlFunc = function ($scope,$state,ApiPath,gleanToolsListServ,gleanToolsServ,$stateParams) {
        var master=[];
        $scope.isAdd=true;
        $scope.backRoute = "main.toolsListPage";
        //指定返回路由
        if($stateParams.backRoute != ""){
        	$scope.backRoute = "main.toolsListAudit";
        }
        gleanToolsServ.getToolsById($stateParams.toolsId).then(function (answer) {
            master=answer.data;
            $scope.toolsName=master.toolName;
            $scope.toolsId = master.id;
            console.log('master .',master);
        });
        if($stateParams.id!=''){
            gleanToolsListServ.getToolsById($stateParams.id).then(
                function (answer) {
                    $scope.toolsList = answer.data;
                }
            );
            $scope.isAdd=false;
        }
        $scope.alertLayer = true;
        $scope.exit = function () {
            $state.go($scope.backRoute,{toolsId:$stateParams.toolsId});
        };

       $scope.closeLayer = function () {
            $state.go($scope.backRoute,{toolsId:$stateParams.toolsId});
        };
        $scope.submitted = false;
        $scope.saveToolsList = function () {
        	if($scope.toolsListEditForm.$valid){
        		$scope.saveDisableFlag = true;
                $scope.toolsList.toolsId=master.id;
                $scope.toolsList.name='';
                var toolsList = $scope.toolsList;
                console.log('saveToolsList .');
                console.log(JSON.stringify(toolsList)+"---------");
                gleanToolsListServ.saveToolsVersion(toolsList).then(
                    function (answer) {
                        console.log("================="+answer.data);
                        if(answer.data == '1'){
                            $scope.message = '保存成功';
                            $scope.tip = "tip_1";
                            $scope.alertLayer  = false;
                        }else{
                            $scope.message = "保存失败，请稍后重试";
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
                    $state.go($scope.backRoute,{toolsId:$stateParams.toolsId});
                };
        	}else{
        		$scope.submitted = true;
        	}
        }
    };

    
    var gleanToolsCheckVersioneDirectiveFunc = function(gleanToolsServ) {
		return {
			restrict : "A",
			require : 'ngModel',
			link : function(scope, elem, attrs, ctrl) {
				elem.on("change", function() {
					if (!elem.val() || !scope.isAdd)
						return;
					gleanToolsServ.queryGleanToolsListInfoByVersion(elem.val(),scope.toolsId)
							.then(function(answer) {
								if (answer.data == null) {
									ctrl.$setValidity("unique", true);
								} else {
									ctrl.$setValidity("unique", false);
								}
							}, function(error) {
								ctrl.$setValidity("unique", false);
							});
				})
			}
		}
	}
    
    moduleApp.controller('gleanToolsListEditCtrl',["$scope","$state","ApiPath","gleanToolsListServ",'gleanToolsServ','$stateParams',gleanToolsEditCtrlFunc]);
    moduleApp.directive("checkVersion", [ "gleanToolsServ",
    	gleanToolsCheckVersioneDirectiveFunc ]);
});
