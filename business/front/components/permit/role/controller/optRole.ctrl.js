/**
 * 角色操作控制器
 */
define(['../module'], function(module){
	
	var createRole = function($scope,$state,ApiPath,permitRoleServ,permitMenuServ,$stateParams){
		var roleId = $stateParams.roleId;
		$scope.readonly = $stateParams.isShow == 1; // 如果是1就是查看模式
		$scope.role = {};
		
		$scope.allMenu;
		$scope.selectedMenus;
		var treeSettings = {
			check: {enable: !$scope.readonly},
			data: {
				simpleData: {
					enable: true,
					idKey: "id",  
                    pIdKey: "pId",  
                    rootPId: '0'
				}
			}
		};
		var ztreeConfig = {
			treeSettings : treeSettings
		};
		// 向ztree子scope传递ztree的参数
		$scope.$on("getNodes", function(evne, param){
			// 获取所有菜单
			permitMenuServ.queryAllMenuList().then(
				function(answer){
					if(answer){
						$scope.allMenu = answer.data;
						if(roleId && roleId != '-1'){
							permitRoleServ.getSelectedMenuByRoleId({"roleId":roleId}).then(
								function(answer){
									$scope.selectedMenus = answer.data;
									buildtreeNode($scope.allMenu, $scope.selectedMenus);
								}
							);
						} else{
							buildtreeNode($scope.allMenu);
						}
					}
					
				}
			);
		});
		
		if(roleId && roleId != '-1'){
			permitRoleServ.getRoleById(roleId).then(
				function(answer){
					$scope.role = answer.data;
				}
			);
		}
		var buildtreeNode = function(menus, selectedMenus){
			var nodes = [];
			angular.forEach(menus, function(m){
				var n = {};
				n.id = m.id;
				n.pId = m.upperId;
				n.name = m.menuCName;
				n.open = true;
				if(selectedMenus && selectedMenus.length > 0){
					for(var i = 0; i < selectedMenus.length; i++){
						if(selectedMenus[i] == m.id){
							n.checked = true;
						}
					}
				}
				if($scope.readonly){
					if(n.checked) nodes.push(n);
				} else{
					nodes.push(n);
				}
				
			});
			ztreeConfig.zNodes = nodes;
			$scope.$broadcast("ztreeConfig", ztreeConfig);
		};
		$scope.optRole = function(){
			var dto = {};
			dto.role = $scope.role;
			dto.menuIds = $scope.treeSelected;
			permitRoleServ.updateOrCreateRole(dto).then(
				function(answer){
					if(answer.data){
						alert("操作成功");
					} else{
						alert("操作失败");
					}
					$state.go("main.permitRoleList", null, {reload:true});
				}
			);
		};
		$scope.exit = function(){
			$state.go("main.permitRoleList");
		};
	};
	module.controller('createRoleCtrl', ["$scope","$state","ApiPath","permitRoleServ","permitMenuServ","$stateParams",createRole]);
});
