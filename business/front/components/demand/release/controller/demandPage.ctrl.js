/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var demandPageFunc = function($scope,$state,ApiPath,releaseServ) {
        $scope.alertLayer = true;
        $scope.demandPageQuery = function() {
            getDemandList();
        };
        $scope.demandPageReset = function() {
            $scope.demandQueryCondition={
                userCode:"",
                demandLevel:"",
                status:"",
                expectDate:""
            };
        };
        console.log("========1.========");
        $scope.exit = function() {
            console.log('exit function ..');
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.demandPage");
            getDemandList();
        };

        $scope.demandEdit = function(demandId) {
            console.log('demandEdit function .');
            $state.go("main.demandEdit",{demandId:demandId});
        };
        $scope.demandAdd = function() {
            console.log('demandAdd function .');
            $state.go("main.demandAdd");
        };

        $scope.demandView = function(demandId) {
            console.log('demandView function .');
            $state.go("main.demandView",{demandId:demandId});
        };

        $scope.demandDel = function(demandId) {
            console.log('demandDel function ..',demandId);
            releaseServ.delDemandById(demandId).then(
                function(answer){
                    console.log('demand delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('demand delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getDemandList = function() {
            $scope.demandQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.demandQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var demandQueryCondition = $scope.demandQueryCondition;
            releaseServ.getDemandList(demandQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.demandListData = answer.data.list;
                })
        };
        //需求进度
        $scope.demandSchedule = function (demandid,id) {
            $state.go("main.demandschPage",{demandid:demandid,demandId:id});
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
            $scope.demandQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getDemandList);
        };
        initPage();
    };
    moduleApp.controller('demandPage',["$scope","$state","ApiPath","demandReleaseServ",demandPageFunc]);
});