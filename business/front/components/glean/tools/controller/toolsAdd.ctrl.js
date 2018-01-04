/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(
		[ '../module' ],
		function(moduleApp) {
			'use strict';

			var gleanToolsAddCtrlFunc = function($scope, $state, ApiPath,
					gleanToolsServ, $stateParams) {

				$scope.alertLayer = true;
				$scope.exit = function() {
					$state.go('main.toolsPage');
				};

				$scope.closeLayer = function() {
					$state.go('main.toolsPage');
				};

				$scope.toolsAddReset = function() {
					$scope.tools.toolName = $scope.tools.toolTypeId = $scope.tools.descript = "";
					$scope.submitted = false;
				};
				$scope.submitted = false;
				$scope.saveTools = function() {
					if ($scope.toolsAddForm.$valid) {
						$scope.saveDisableFlag = true;
						gleanToolsServ
								.saveTools($scope.tools)
								.then(
										function(answer) {
											if (answer.data == '1') {
												console.log('保存成功');
												$scope.message = '保存成功';
												$scope.tip = "tip_1";
												$scope.alertLayer = false;
												// console.log();
											} else {
												$scope.message = "保存失败，请稍后重试";
												$scope.tip = 'tip_2';
												$scope.alertLayer = false;
											}

										},
										function(error) {
											$scope.message = JSON
													.stringify(error.data);
											$scope.tip = 'tip_2';
											$scope.alertLayer = false;
											console.log('出现错误');
										});
						$scope.exit = function() {
							console.log('exit function .');
							$state.go('main.toolsPage');
						};
					} else {
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

			moduleApp.controller('gleanToolsAddCtrl', [ "$scope", "$state",
					"ApiPath", "gleanToolsServ", '$stateParams',
					gleanToolsAddCtrlFunc ])
			moduleApp.directive("checkToolName", [ "gleanToolsServ",
					gleanToolsCheckToolNameDirectiveFunc ]);
		});
