/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsEditCtrlFunc = function ($scope,$state,ApiPath,gleanToolsServ,$stateParams) {
        console.log('init toolsEdit.ctrl.js');
        var toolsId=$stateParams.toolsId;
        if(toolsId!=''){
            console.log('toolsId is not null ');
            gleanToolsServ.getToolsById(toolsId).then(
                function (answer) {
                    console.log(answer.data);
                    $scope.tools = answer.data;
                }
            )
        }
        $scope.alertLayer = true;
        $scope.exit = function () {
            console.log('exit function .');
            $state.go('main.toolsPage');
        };

       $scope.closeLayer = function () {
           console.log('closeLayer function . ');
            $state.go('main.toolsPage');
        };
       $scope.submitted = false;
       $scope.saveTools = function () {
           $scope.saveDisableFlag = true;
           gleanToolsServ.saveTools($scope.tools).then(
               function (answer) {
                   console.log("保存Tools，返回信息为",answer.data);
                   if(answer.data == '1'){
                       console.log('保存成功');
                       $scope.message = '保存成功';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       console.log('保存失败');
                       $scope.message = "保存失败，请稍后重试";
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

        $scope.updateTools = function () {
        	if($scope.toolsEditForm.$valid){
	            $scope.saveDisableFlag = true;
	            gleanToolsServ.updateToolById($scope.tools).then(
	                function (answer) {
	                    console.log("修改Tools，返回信息为",answer.data);
	                    if(answer.data == '1'){
	                        console.log('修改成功');
	                        $scope.message = '修改成功';
	                        $scope.tip = "tip_1";
	                        $scope.alertLayer  = false;
	                        // console.log();
	                    }else{
	                        console.log('修改失败');
	                        $scope.message = "修改失败，请稍后重试";
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
        	}else{
        		$scope.submitted = true;
        	}
        }
    };
    
    
    var gleanToolsCheckToolNameDirectiveFunc = function(gleanToolsServ) {
		return {
			restrict : "A",
			require : 'ngModel',
			link : function(scope, elem, attrs, ctrl) {
				elem.on("change", function() {
					if (!elem.val())
						return;
					gleanToolsServ.queryGleanToolsInfoByToolName(elem.val())
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

    moduleApp.controller('gleanToolsEditCtrl',["$scope","$state","ApiPath","gleanToolsServ",'$stateParams',gleanToolsEditCtrlFunc]);
    moduleApp.directive("checkToolName", [ "gleanToolsServ",gleanToolsCheckToolNameDirectiveFunc]);
});
