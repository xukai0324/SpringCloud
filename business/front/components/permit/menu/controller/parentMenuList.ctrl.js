/**
 * Created by changweican on 2017/5/3.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var parentMenuListCtrlFunc = function($scope,$state,ApiPath,permitMenuServ,$stateParams) {
        //获取所有的菜单
        $scope.parentMenuList = function() {
            getParentMenuList();
        };

        var getParentMenuList = function() {
            $scope.parentMenuQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.parentMenuQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var parentMenuQueryCondition = $scope.parentMenuQueryCondition;
            permitMenuServ.getParentMenuList(parentMenuQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.parentMenuListData = answer.data.list;
                })
        };

        //加载分页
        var initPage = function () {
            $scope.paginationConf = {
                currentPage: 1, // 当前所在的页
                totalItems: 0, // 总共有多少条记录
                itemsPerPage: 20, // 每页展示的数据条数
                pagesLength: 5, // 分页条目的长度（如果设置建议设置为奇数）
                perPageOptions: [10, 20, 30, 40, 50]
                // 可选择显示条数的数组
            };
            $scope.parentMenuQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getParentMenuList);
        };
        initPage();
        //跳转到菜单列表界面
//      $scope.openPermitMenuList = function() {
//          $state.go("main.parentMenuList");
//      };
        //跳转到新增父菜单界面
//      $scope.openParentMenu = function() {
//          $state.go("main.createParentMenu");
//      };
        //跳转到新增子菜单界面
//      $scope.openChildMenu = function(menu) {
//          var menuChildEmpty = {
//              upperId:menu.id,
//              menuLevel:menu.menuLevel
//          };
//          $state.go("main.createChildMenu",{"menuData":JSON.stringify(menuChildEmpty)});
//      };
//      $scope.exit = function() {
//          $state.go("main.parentMenuList");
//      }
		
		// 跳转到查看
		$scope.menuView  = function(id){
			console.log(id);
			$state.go("main.showMenu", {menuId:id});
		}
		// 跳转到修改
		$scope.menuUpdate = function(id){
			$state.go("main.createMenu", {menuId:id});
		}
		// 菜单删除
		$scope.menuDel = function(id){
			console.log(id);
			if(confirm("确定删除吗？")){
				permitMenuServ.deleteMenuById(id).then(
					function(anwser){
						
						console.log("响应结果:"+answer.data);
						$state.go("main.parentMenuList",null,{ reload:true});
					}
				);
			}
		}
		
    };

    moduleApp.controller('parentMenuListCtrl',["$scope","$state","ApiPath","permitMenuServ","$stateParams",parentMenuListCtrlFunc]);
});