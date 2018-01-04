/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var toolsPageFunc = function($scope,$rootScope,$state,ApiPath,toolsServ) {
        /**弹窗*/
    	$scope.alertLayer = true;
        $scope.closeLayer = function() {
            $scope.alertLayer = true;
        };
        
        /**权限设置*/
        $scope.auditPower = false;
        angular.forEach($rootScope.user.permitRoleDto, function (i) {
        	if(i.roleCode == "aujj"){
        		$scope.auditPower = true;
        	}
        });
        /**工具查询*/
        $scope.toolsPageQuery = function() {
            getToolsList();
        };
        /**菜单重置*/
        $scope.toolsPageReset = function() {
            $scope.toolsQueryCondition={
                toolName:"",
                auditStatus:"",
                createBy:"",
                isDeleted:""
            };
        };
        $scope.exit = function() {
            console.log('exit function ..');
            $state.go("main.index");
        };
        
        /** 待处理任务 */
        $scope.showCount = false;
        $scope.notPassCount = 0;
        $scope.toolsAuditCount = 0;
        $scope.versionAuditCount = 0;
        $scope.versionNotPassCount = 0;
        $scope.initCount = function () {
        	toolsServ.queryToolsDealCount().then(
                    function(answer){
                    	$scope.notPassCount = answer.data.notPassCount;
                    	$scope.toolsAuditCount = answer.data.toolsAuditCount;
                    	$scope.versionAuditCount = answer.data.versionAuditCount;
                    	$scope.versionNotPassCount = answer.data.versionNotPassCount;
                    	if($scope.auditPower){
                    		if($scope.toolsAuditCount > 0 || $scope.versionAuditCount > 0){
                    			$scope.showCount = true;
                    		}
                    	}else{
                    		if($scope.notPassCount > 0 || $scope.versionNotPassCount > 0) {
                    			$scope.showCount = true;
                    		}
                    	}
                    },
                    function(error) {
                        $scope.message=JSON.stringify(error.data);
                        $scope.tip = "tip_2";
                        $scope.alertLayer = false;
                    });
        }
        $scope.initCount();
        
        /** 版本审核 */
        $scope.versionAudit = function () {
        	 $state.go("main.toolsListAudit");
        }
        
        $scope.toolsEdit = function(toolsId) {
            console.log('toolsEdit function .');
            $state.go("main.toolsEdit",{toolsId:toolsId});

        };
        $scope.toolsAdd = function() {
            $state.go("main.toolsAdd");
        };
        $scope.toolsView = function(toolsId) {
            $state.go("main.toolsView",{toolsId:toolsId});
        };
        $scope.toolsAudit = function(toolsId) {
            $state.go("main.toolsAudit",{toolsId:toolsId});
        };
        $scope.toolsDel = function(toolsId) {
            console.log('toolsDel function ..',toolsId);
            toolsServ.delToolsById(toolsId).then(
                function(answer){
                    console.log('tools delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('tools delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getToolsList = function() {
            $scope.toolsQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.toolsQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var toolsQueryCondition = $scope.toolsQueryCondition;
            toolsServ.getToolsList(toolsQueryCondition).then(
                function(answer) {
                    console.log('-------answer =======');
                    console.log(answer);
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.toolsListData = answer.data.list;
                    angular.forEach($scope.toolsListData, function (i) {
                    	i.canEdit = true;
                        if($scope.auditPower){
                        	i.canAudit = true;
                        }
                        if(i.auditStatus == "1"){
                        	i.canAudit = false;
                        	if(!$scope.auditPower){
                        		i.canEdit = false;
                        	}
                        }
                    });
                })
        };
        
        $scope.toolsList = function (toolsId) {
        	 console.log('toolsView function --.',toolsId);
        	 $state.go("main.toolsListPage",{toolsId:toolsId});
        };
        
        /** CheckBox设置 */
        $scope.select_all = false;
        $scope.m = [];
        $scope.checked = [];
        $scope.selectAll = function () {
        	if($scope.canAuditLength() == 0){
        		$scope.select_all = false;
        		return;
        	}
            if($scope.select_all) {
                $scope.checked = [];
                angular.forEach($scope.toolsListData, function (i) {
                    if(i.auditStatus == "9"){
                    	i.isChecked = true;
                        $scope.checked.push(i.id);
                    }
                })
            }else {
                angular.forEach($scope.toolsListData, function (i) {
                    i.isChecked = false;
                    $scope.checked = [];
                })
            }
            console.log($scope.checked);
        };
        
        $scope.selectOne = function () {
        	angular.forEach($scope.toolsListData , function (i) {
        		if(i.auditStatus == "9"){
        			var index = $scope.checked.indexOf(i.id);
                    if(i.isChecked && index === -1) {
                        $scope.checked.push(i.id);
                    } else if (!i.isChecked && index !== -1){
                        $scope.checked.splice(index, 1);
                    };
        		}else{
        			i.isChecked = false;
        		}
            })
            var canAuditLen = $scope.canAuditLength();
            if (canAuditLen > 0 && canAuditLen === $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        }
        
        $scope.canAuditLength = function () {
        	var length = 0;
        	angular.forEach($scope.toolsListData , function (i) {
                if(i.auditStatus == "9"){
                	length ++;
                }
            });
        	return length;
        }
        
        /** 批量审核 */
        $scope.batchAudit = function (auditStatus) {
        	if($scope.checked.length > 0){
        		toolsServ.batchAudit($scope.checked,auditStatus).then(
                        function(answer){
                            $scope.message = "批量审核成功";
                            $scope.tip = "tip_1";
                            $scope.alertLayer = false;
                            $scope.closeLayer = function() {
                            	$state.reload("main.toolsPage");
                            };
                        },
                        function(error) {
                            $scope.message=JSON.stringify(error.data);
                            $scope.tip = "tip_2";
                            $scope.alertLayer = false;
                        });
        	}else{
        		$scope.message = "请至少选择一条任务";
                $scope.tip = "tip_1";
                $scope.alertLayer = false;
        	}
        		
        }
        
        //加载分页
        var initPage = function () {
            $scope.paginationConf = {
                currentPage: 1, // 当前所在的页
                totalItems: 0, // 总共有多少条记录
                itemsPerPage: 10, // 每页展示的数据条数
                pagesLength: 5, // 分页条目的长度（如果设置建议设置为奇数）
                perPageOptions: [10, 20, 30, 40, 50]
                // 可选择显示条数的数组
            };
            $scope.toolsQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getToolsList);
        };
        initPage();
    };
    moduleApp.controller('toolsPage',["$scope","$rootScope","$state","ApiPath","gleanToolsServ",toolsPageFunc]);
});