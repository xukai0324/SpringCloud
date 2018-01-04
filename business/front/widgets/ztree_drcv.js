
define(['jquery', 'angular', 'ztree'], function($, angular){
	'use strict';
	angular.module("ztreeM", []).directive("ztree", [
		function(){
			return {
				require:"?ngModel",
				restrict: "A",
				replace: false,
				link : function($scope, ele, attrs, ngModel){
					
					var zTreeOnCheck = function(event, treeId, treeNode){
//						alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.id +" : "+ treeNode.checked);
						var checkedIds = [];
						var treeObj = $.fn.zTree.getZTreeObj("tree");
						var nodes = treeObj.getCheckedNodes(true);
						angular.forEach(nodes , function(n, i){
							checkedIds.push(n.id);
						});
						ngModel.$setViewValue(checkedIds);
					};
						// 初始化ztree
					$scope.$emit("getNodes", 'getNodes');
					$scope.$on("ztreeConfig", function(even, config){
						console.log(config.zNodes);
						config.treeSettings.callback = {
							onCheck: zTreeOnCheck
						};
						$.fn.zTree.init(ele, config.treeSettings, config.zNodes);
					});
				}
			};
		
		}
	]);
});