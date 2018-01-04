/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var toolsPageFunc = function($scope,$state,ApiPath,gleanToolsListServ,gleanToolsServ,$stateParams) {

        var toolsId = $stateParams.toolsId;
        if(toolsId!=''&& toolsId!=undefined){
            gleanToolsServ.getToolsById(toolsId).then(function (answer) {
                $scope.tools=answer.data;
            })
        }else{
            console.log('toolsId 没传过来。。真尴尬');
        }
        $scope.alertLayer = true;
        $scope.toolsPageQuery = function() {
            getToolsList();
        };
        $scope.exit = function() {
            console.log('exit');
            $state.go("main.toolsPage");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.toolsListPage",{toolsId:toolsId});
            getToolsList();
        };

        $scope.toolsEdit = function(id) {
            console.log('toolsId：',toolsId,id);
            $state.go("main.toolsListAdd",{toolsId:toolsId,id:id});
        };

        $scope.toolsView = function(toolsVersionId) {
            $state.go("main.toolsListView",{toolsVersionId:toolsVersionId,toolsId:toolsId});
        };

        $scope.toolsAudit = function(toolsVersionId) {
            $state.go("main.toolsListView",{toolsVersionId:toolsVersionId,toolsId:toolsId,isAudit:true});
        };
        
        $scope.projectToolsEdit = function(tools) {
            $state.go("main.toolsProjectEdit",{tools:JSON.stringify(tools)});
        };

        $scope.toolsDel = function(toolsVersionId) {
            gleanToolsListServ.delToolsById(toolsVersionId).then(
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
        var getToolsList = function() {
            $scope.toolsQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.toolsQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.toolsQueryCondition.toolsId=toolsId;
            var toolsQueryCondition = $scope.toolsQueryCondition;
            gleanToolsListServ.getToolsVersionList(toolsQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.toolsList = answer.data.list;
                    console.log('$scope toolsList .',$scope.toolsList);
                })
        };

        //组件清单
        var componentList = function (toolsId) {
            $state.go("main.toolsListPage",{toolsId:toolsId});
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
            $scope.toolsQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getToolsList);
        };
        initPage();
    };
    moduleApp.controller('gleanToolsListPageCtrl',["$scope","$state","ApiPath","gleanToolsListServ","gleanToolsServ","$stateParams",toolsPageFunc]);
});