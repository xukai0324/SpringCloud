/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoPageFunc = function($scope,$state,ApiPath,infogaterInfoServ) {
        $scope.alertLayer = true;
        $scope.infogaterInfoList = function() {
            getInfogaterInfoList();
        };
        $scope.infogaterInfoPageReset = function() {
            $scope.infogaterInfoQueryCondition={
                codeType:"",
                codeTypeDesc:""
            };
        };

        $scope.exit = function() {
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.infogaterInfoPage");
        };

        $scope.infogaterInfoAdd = function() {
            $state.go("main.infogaterInfoAdd");
        };
        
        $scope.infogaterInfoEdit = function(infogaterInfoId) {
            $state.go("main.infogaterInfoEdit",{infogaterInfoId:infogaterInfoId});
        };

        $scope.infogaterInfoView = function(infogaterInfoId) {
            $state.go("main.infogaterInfoView",{infogaterInfoId:infogaterInfoId});
        };

        $scope.infogaterInfoDel = function(infogaterInfoId) {
            infogaterInfoServ.delInfogaterInfoById(infogaterInfoId).then(
                function(answer){
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                    getInfogaterInfoList();
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };

        $scope.infogaterInfoListPage = function(infogaterInfo) {
            $state.go("main.infogaterInfoListPage",{infogaterInfo:JSON.stringify(infogaterInfo)});
        };

        var getInfogaterInfoList = function() {
            $scope.infogaterInfoQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.infogaterInfoQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var infogaterInfoQueryCondition = $scope.infogaterInfoQueryCondition;
            infogaterInfoServ.getInfogaterInfoList(infogaterInfoQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.infogaterInfoListData = answer.data.list;
                })
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
            $scope.infogaterInfoQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getInfogaterInfoList);
        };
        initPage();
    };

    moduleApp.controller('infogaterInfoPage',["$scope","$state","ApiPath","infogaterInfoServ",infogaterInfoPageFunc]);
});