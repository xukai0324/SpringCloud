/* Created by sunfm on 2017/6/6. */

define(['../module'],function(moduleApp) {
    'use strict';

    var techrepoPageFunc = function($scope,$state,ApiPath,techrepoServ) {
        $scope.alertLayer = true;
        $scope.techrepoPageQuery = function() {
            getTechrepoList();
        };
        $scope.techrepoPageReset = function() {
            $scope.techrepoQueryCondition={
                userCode:"",
                techrepoLevel:"",
                status:"",
                expectDate:""
            };
        };
        
        $scope.exit = function() {
            // console.log('exit function ..');
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.techrepoPage");
            getTechrepoList();
        };

        $scope.techrepoEdit = function(techrepoId) {
            console.log('techrepoEdit function .');
            $state.go("main.techrepoEdit",{techrepoId:techrepoId});
        };
        $scope.techrepoAdd = function() {
            console.log('techrepoAdd function .');
            $state.go("main.techrepoAdd");
        };

        $scope.techrepoView = function(techrepoId) {
            console.log('techrepoView function .');
            $state.go("main.techrepoView",{techrepoId:techrepoId});
        };

        $scope.techrepoDel = function(techrepoId) {
            console.log('techrepoDel function ..',techrepoId);
            techrepoServ.deltechrepoById(techrepoId).then(
                function(answer){
                    console.log('techrepo delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('techrepo delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getTechrepoList = function() {
            $scope.techrepoQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.techrepoQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var techrepoQueryCondition = $scope.techrepoQueryCondition;
            techrepoServ.getTechrepoList(techrepoQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.techrepoListData = answer.data.list;
                })
        };
        //需求进度
        /*$scope.techrepoSchedule = function (id) {
            $state.go("main.techrepoSchedulePage",{masterId:id});
        };*/
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
            $scope.techrepoQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getTechrepoList);
        };
        initPage();
    };
    moduleApp.controller('techrepoPage',["$scope","$state","ApiPath","techrepoServ",techrepoPageFunc]);
});