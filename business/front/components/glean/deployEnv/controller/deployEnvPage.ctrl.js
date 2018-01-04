/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var deployEnvPageFunc = function($scope,$state,ApiPath,deployEnvServ) {
        $scope.alertLayer = true;
        $scope.deployEnvList = function() {
            getDeployEnvList();
        };
        $scope.deployEnvPageReset = function() {
            $scope.deployEnvQueryCondition={
                serverNameId:"",
                softwareNameId:"",
                projectId:""
            };
        };

        $scope.exit = function() {
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.deployEnvPage");
            getDeployEnvList();
        };

        $scope.deployEnvEdit = function(deployEnvId) {
            $state.go("main.deployEnvEdit",{deployEnvId:deployEnvId});
        };

        $scope.deployEnvUpdate = function(deployEnvId) {
            $state.go("main.deployEnvUpdate",{deployEnvId:deployEnvId});
        };

        $scope.deployEnvView = function(deployEnvId) {
            $state.go("main.deployEnvView",{deployEnvId:deployEnvId});
        };

        $scope.deployEnvDel = function(deployEnvId) {
            angular.comfirm("确定要删除吗?",{okCallback:function(ok){
                deployEnvServ.delDeployEnvById(deployEnvId).then(
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
            },closeCallback:function(cancel){
            }});
        };

        var getDeployEnvList = function() {
            $scope.deployEnvQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.deployEnvQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var deployEnvQueryCondition = $scope.deployEnvQueryCondition;
            deployEnvServ.getDeployEnvList(deployEnvQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.deployEnvListData = answer.data.list;
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
            $scope.deployEnvQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', getDeployEnvList);
        };
        initPage();

        /*排序图标方法*/
        $scope.resultSort=function(num) {
            for(var i=0;i<=6;i++){
                if(i !=num){
                    eval("("+"$scope.desc"+i+"=''"+")");
                }
            }
        };

    };

    moduleApp.controller('deployEnvPage',["$scope","$state","ApiPath","deployEnvServ",deployEnvPageFunc]);
});