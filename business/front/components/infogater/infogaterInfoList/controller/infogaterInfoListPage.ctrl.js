/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoListPageFunc = function ($scope, $state, ApiPath, infogaterInfoListServ,$stateParams) {
        /*$scope.mainId = $stateParams.infogaterInfoId;*/
        $scope.infogaterInfo = JSON.parse($stateParams.infogaterInfo);

        console.log($stateParams.infogaterInfo);
        $scope.alertLayer = true;
        $scope.infogaterInfoListList = function () {
            getInfogaterInfoListList();
        };
        $scope.infogaterInfoListPageReset = function () {
            $scope.infogaterInfoListQueryCondition = {
                codeCode: "",
                codeName: ""
            };
        };

        $scope.exit = function () {
            $state.go("main.infogaterInfoPage");
        };

        $scope.closeLayer = function () {
            $scope.alertLayer = true;
            $state.go("main.infogaterInfoListPage");
        };

        $scope.infogaterInfoListAdd = function (infoMainId) {
            $state.go("main.infogaterInfoListAdd", {
                infoMainId: infoMainId
            });
        };
        
        $scope.infogaterInfoListEdit = function (infogaterInfoListId) {
            $state.go("main.infogaterInfoListEdit", {
                infogaterInfo:JSON.stringify($scope.infogaterInfo),
                infogaterInfoListId: infogaterInfoListId
            });
        };

        $scope.infogaterInfoListListEdit = function (infogaterInfoListId) {
            $state.go("main.infogaterInfoListListEdit", {
                infogaterInfoListId: infogaterInfoListId
            });
        };

        $scope.infogaterInfoListView = function (infogaterInfoListId) {
            $state.go("main.infogaterInfoListView", {
                infogaterInfo:JSON.stringify($scope.infogaterInfo),
                infogaterInfoListId: infogaterInfoListId
            });
        };

        $scope.infogaterInfoListDel = function (infogaterInfoListId) {
            infogaterInfoListServ.delInfogaterInfoListById(infogaterInfoListId).then(
                function (answer) {
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                    getInfogaterInfoListList();
                },
                function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };

        var getInfogaterInfoListList = function () {
            $scope.infogaterInfoListQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.infogaterInfoListQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var infogaterInfoListQueryCondition = $scope.infogaterInfoListQueryCondition;
            infogaterInfoListQueryCondition.infoMainId = $scope.infogaterInfo.id;
            infogaterInfoListServ.getInfogaterInfoListList(infogaterInfoListQueryCondition).then(
                function (answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.infogaterInfoListListData = answer.data.list;
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
            $scope.infogaterInfoListQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getInfogaterInfoListList);
        };
        initPage();
    };

    moduleApp.controller('infogaterInfoListPage',["$scope","$state","ApiPath","infogaterInfoListServ",'$stateParams',infogaterInfoListPageFunc]);
});