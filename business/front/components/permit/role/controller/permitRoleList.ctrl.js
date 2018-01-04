/**
 * Created by changweican on 2017/5/7.
 */
define(['../module'],function(moduleApp) {
    'use strict';

	var roleListCtrl = function($scope,$state,ApiPath,permitRoleServ,$stateParams){
    	 $scope.getRoleList = function(){
	        getRoleListData();
        }
        var getRoleListData =  function() {
        	$scope.roleListCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.roleListCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var roleListCondition = $scope.roleListCondition;
            permitRoleServ.roleList(roleListCondition).then(
                function(answer) {
                	$scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.roleList = answer.data.list;
                	
                }
            );
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
            $scope.roleListCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getRoleListData);
        };
        initPage();
        
        $scope.rolePageReset = function(){
        	$scope.roleListCondition.name = "";
        	$scope.roleListCondition.roleCode = "";
        };
        $scope.toDetail = function(roleId, isShow){
        	$state.go("main.permitRoleView", {roleId: roleId, isShow:isShow});
        };
        $scope.deleteRole = function(roleId){
        	if(confirm("确定删除吗?")){
        		permitRoleServ.deleteRole(roleId).then(
        			function(answer){
        				$state.go("main.permitRoleList", null, {reload: true});
        			}
        		);
        	}
        }
    };

    moduleApp.controller('permitRoleListCtrl',["$scope","$state","ApiPath","permitRoleServ","$stateParams",roleListCtrl]);
});