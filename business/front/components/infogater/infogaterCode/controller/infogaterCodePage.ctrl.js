/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterCodePageFunc = function ($scope, $state, ApiPath, infogaterCodeServ,$stateParams) {
        $scope.codeType = $stateParams.infogaterTypId;
        $scope.codeTypeDesc = $stateParams.infogaterTypDesc;
        $scope.alertLayer = true;
        $scope.infogaterCodeList = function () {
            getInfogaterCodeList();
        };
        $scope.infogaterCodePageReset = function () {
            $scope.infogaterCodeQueryCondition = {
                codeCode: "",
                codeName: ""
            };
        };

        $scope.exit = function () {
            $state.go("main.infogaterTypePage");
        };

        $scope.closeLayer = function () {
            $scope.alertLayer = true;
            $state.go("main.infogaterCodePage");
        };

        $scope.infogaterCodeAdd = function (infogaterCodeType, infogaterCodeTypeDesc) {
            $state.go("main.infogaterCodeAdd", {
                infogaterCodeType: infogaterCodeType,
                infogaterCodeTypeDesc: infogaterCodeTypeDesc
            });
        };
        
        $scope.infogaterCodeEdit = function (infogaterCodeType, infogaterCodeCode, infogaterCodeTypeDesc) {
            $state.go("main.infogaterCodeEdit", {
                infogaterCodeType: infogaterCodeType,
                infogaterCodeCode: infogaterCodeCode,
                infogaterCodeTypeDesc: infogaterCodeTypeDesc
            });
        };

        $scope.infogaterCodeListEdit = function (infogaterCodeType) {
            $state.go("main.infogaterCodeListEdit", {infogaterCodeType: infogaterCodeType});
        };

        $scope.infogaterCodeView = function (infogaterCodeType, infogaterCodeCode, infogaterCodeTypeDesc) {
            $state.go("main.infogaterCodeView", {
                infogaterCodeType: infogaterCodeType,
                infogaterCodeCode: infogaterCodeCode,
                infogaterCodeTypeDesc: infogaterCodeTypeDesc
            });
        };

        $scope.infogaterCodeDel = function (infogaterCodeType, infogaterCodeCode) {
            infogaterCodeServ.delInfogaterCodeById(infogaterCodeType, infogaterCodeCode).then(
                function (answer) {
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                    getInfogaterCodeList();
                },
                function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };

        var getInfogaterCodeList = function () {
            $scope.infogaterCodeQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.infogaterCodeQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var infogaterCodeQueryCondition = $scope.infogaterCodeQueryCondition;
            infogaterCodeQueryCondition.codeType = $stateParams.infogaterTypId;
            infogaterCodeServ.getInfogaterCodeList(infogaterCodeQueryCondition).then(
                function (answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.infogaterCodeListData = answer.data.list;
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
            $scope.infogaterCodeQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getInfogaterCodeList);
        };
        initPage();
    };

    moduleApp.controller('infogaterCodePage',["$scope","$state","ApiPath","infogaterCodeServ",'$stateParams',infogaterCodePageFunc]);
});