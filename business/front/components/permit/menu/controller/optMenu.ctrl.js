define(['../module'], function(module){
	
	
	var createMenuController = function($scope,$state,ApiPath,permitMenuServ,$stateParams){
		var menuId4Update = $stateParams.menuId;
		$scope.menu = {};
		// 获取所有目录, 供选择
		permitMenuServ.queryAllMenuList().then(
			function(answer){
				$scope.allMenu = answer.data;
				var emptyMenu = {
					menuLevel :'0',
					menuCName : '无'
				}
				$scope.allMenu.splice(0, 0, emptyMenu);
				if(menuId4Update != '-1'){ // 如果有需要修改的目录ID, 则是修改操作, 需要加载目录
					permitMenuServ.getMenuById(menuId4Update).then(
						function(answerInner){
							$scope.menu = answerInner.data;
							if($scope.menu.upperId && $scope.allMenu && $scope.allMenu.length > 0){
								angular.forEach($scope.allMenu , function(data, i){
									if(data.id == $scope.menu.upperId){
										$scope.upperMenu = data;
									}
								});
							}
						}
					);
				}
			}
		);
		// 选择父菜单后计算添加或修改的菜单的属性
		$scope.changeUpper = function(){
			console.log($scope.upperMenu);
			if($scope.upperMenu && $scope.upperMenu.menuLevel != '0'){
				$scope.menu.menuLevel = parseInt($scope.upperMenu.menuLevel)+1+'';
				$scope.menu.upperId = $scope.upperMenu.id;
				$scope.menu.isLeaf = '1';
			} else{
				$scope.menu.menuLevel = '1';
				$scope.menu.upperId ='0';
				$scope.menu.isLeaf ='0';
			}
			console.log($scope.upperMenu);
			console.log($scope.menu);
		}
		$scope.doSave = function(){
			var menuInsert = $scope.menu;
			if($scope.menu.id){// 修改
				permitMenuServ.updateMenu(menuInsert).then(
					function(anwser){
						if(anwser.data != 1){
							alert("操作失败");
						}
					}
				);
			} else{ // 新增
				permitMenuServ.saveMenu(menuInsert).then(
					function(anwser){
						if(anwser.data != 1){
							alert("操作失败");
						}
					}
				);
			}
			$state.go("main.parentMenuList",null,{ reload:true});
		};
		$scope.exit = function(){
			$state.go("main.parentMenuList");
		}
	}
	var showMenuCtrl = function($scope,$state,ApiPath,permitMenuServ,$stateParams){
		var menuId4show = $stateParams.menuId;
		$scope.menu = {};
		permitMenuServ.getMenuById(menuId4show).then(
			function(answer){
				$scope.menu = answer.data;
				if($scope.menu.upperId && $scope.menu.upperId != ''){
					permitMenuServ.getMenuById($scope.menu.upperId).then(
						function(answerInner){
							if(answerInner && answerInner.data && answerInner.data.menuCName){
								$scope.upperName = answerInner.data.menuCName;
							} else{
								$scope.upperName = '无';	
							}
						}
					)
				}
			}
		);
		$scope.exit = function(){
			$state.go("main.parentMenuList");
		}
	}
	module.controller("createMenuCtrl",['$scope','$state','ApiPath','permitMenuServ','$stateParams',createMenuController]);
	module.controller("showMenuCtrl", ['$scope','$state','ApiPath','permitMenuServ','$stateParams',showMenuCtrl])
});