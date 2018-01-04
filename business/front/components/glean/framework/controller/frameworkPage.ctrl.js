/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var frameworkPageFunc = function($scope,$state,ApiPath,frameworkServ) {
        $scope.alertLayer = true;
        $scope.frameworkPageQuery = function() {
            getFrameworkList();
        };
        $scope.frameworkPageReset = function() {
            $scope.frameworkQueryCondition={
            	frameworkName:"",
                auditStatus:"",
                createBy:"",
                isDeleted:""
            };
        };
        $scope.exit = function() {
            console.log('exit function ..');
            $state.go("main.index");
        };
        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.frameworkPage");
            getFrameworkList();
        };
        $scope.frameworkEdit = function(frameworkId) {
            console.log('frameworkEdit function .');
            $state.go("main.frameworkEdit",{frameworkId:frameworkId});

        };
        $scope.frameworkAdd = function() {
            $state.go("main.frameworkEdit");
        };
        $scope.frameworkView = function(frameworkId) {
            $state.go("main.frameworkView",{frameworkId:frameworkId});
        };
        $scope.frameworkDel = function(frameworkId) {
            console.log('frameworkDel function ..',frameworkId);
            frameworkServ.removeFrameWork(frameworkId).then(
                function(answer){
                    console.log('framework delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('framework delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getFrameworkList = function() {
            $scope.frameworkQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.frameworkQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var frameworkQueryCondition = $scope.frameworkQueryCondition;
            frameworkServ.queryFrameWorkPage(frameworkQueryCondition).then(
                function(answer) {
                    console.log('-------answer =======');
                    console.log(answer);
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.frameworkListData = answer.data.list;
                })
        };
        
        $scope.frameworkList = function (frameworkId) {
        	 console.log('frameworkView function --.',frameworkId);
        	 $state.go("main.frameworkListPage",{frameworkId:frameworkId});
        };
        
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
            $scope.frameworkQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getFrameworkList);
        };
        initPage();
    };
    //定义controller
    moduleApp.controller('frameworkPage',["$scope","$state","ApiPath","frameworkServ",frameworkPageFunc]);
});