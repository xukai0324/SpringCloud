/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var componentPageFunc = function($scope,$state,ApiPath,componentServ) {
        $scope.alertLayer = true;
        $scope.componentPageQuery = function() {
            getComponentList();
        };
        $scope.componentPageReset = function() {
            $scope.componentQueryCondition={
                componentNameId:"",
                codeCodeId:""
            };
        };
        $scope.exit = function() {
            console.log('exit function ..');
            $state.go("main.index");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.componentPage");
            getComponentList();
        };

        $scope.componentEdit = function(componentId) {
            console.log('componentEdit function .');
            $state.go("main.componentEdit",{componentId:componentId});
        };
        $scope.componentAdd = function() {
            console.log('componentAdd function .');
            $state.go("main.componentAdd");
        };

        $scope.componentView = function(componentId) {
            console.log('componentView function .');
            $state.go("main.componentView",{componentId:componentId});
        };

        $scope.projectComponentEdit = function(component) {
            $state.go("main.componentProjectEdit",{component:JSON.stringify(component)});
        };

        $scope.componentDel = function(componentId) {
            console.log('componentDel function ..',componentId);
            componentServ.delComponentById(componentId).then(
                function(answer){
                    console.log('component delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('component delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getComponentList = function() {
            $scope.componentQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.componentQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var componentQueryCondition = $scope.componentQueryCondition;
            componentServ.getComponentList(componentQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.componentListData = answer.data.list;
                })
        };

        //组件清单
        $scope.componentList = function (id) {
            $state.go("main.componentListPage",{masterId:id});
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
            $scope.componentQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getComponentList);
        };
        initPage();
    };
    moduleApp.controller('componentPage',["$scope","$state","ApiPath","gleanComponentServ",componentPageFunc]);
});