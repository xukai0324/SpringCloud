/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterTypePageFunc = function($scope,$state,ApiPath,infogaterTypeServ) {
        $scope.alertLayer = true;
        $scope.infogaterTypeList = function() {
            getInfogaterTypeList();
        };
        $scope.infogaterTypePageReset = function() {
            $scope.infogaterTypeQueryCondition={
                codeType:"",
                codeTypeDesc:""
            };
        };

        $scope.exit = function() {
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.infogaterTypePage");
        };

        $scope.infogaterTypeAdd = function() {
            $state.go("main.infogaterTypeAdd");
        };
        
        $scope.infogaterTypeEdit = function(infogaterTypeId) {
            $state.go("main.infogaterTypeEdit",{infogaterTypeId:infogaterTypeId});
        };

        $scope.infogaterTypeView = function(infogaterTypeId) {
            $state.go("main.infogaterTypeView",{infogaterTypeId:infogaterTypeId});
        };

        $scope.infogaterTypeDel = function(infogaterTypeId) {
            infogaterTypeServ.delInfogaterTypeById(infogaterTypeId).then(
                function(answer){
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };

        $scope.infogaterCodePage = function(infogaterTypeId,infogaterTypeDesc) {
            $state.go("main.infogaterCodePage",{infogaterTypId:infogaterTypeId,infogaterTypDesc:infogaterTypeDesc});
        };

        var getInfogaterTypeList = function() {
            $scope.infogaterTypeQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.infogaterTypeQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var infogaterTypeQueryCondition = $scope.infogaterTypeQueryCondition;
            infogaterTypeServ.getInfogaterTypeList(infogaterTypeQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.infogaterTypeListData = answer.data.list;
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
            $scope.infogaterTypeQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getInfogaterTypeList);
        };
        initPage();
    };

    moduleApp.controller('infogaterTypePage',["$scope","$state","ApiPath","infogaterTypeServ",infogaterTypePageFunc]);
});