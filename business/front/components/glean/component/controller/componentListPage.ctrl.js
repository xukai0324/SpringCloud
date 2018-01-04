/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var componentPageFunc = function($scope,$state,ApiPath,componentListServ,componentServ,$stateParams) {

        var masterId = $stateParams.masterId;
        if(masterId!=''&& masterId!=undefined){
            componentServ.getComponentById(masterId).then(function (answer) {
                $scope.master=answer.data;
            })
        }else{
            console.log('masterid 没传过来。。真尴尬');
        }
        $scope.alertLayer = true;
        $scope.componentPageQuery = function() {
            getComponentList();
        };
        $scope.exit = function() {
            $state.go("main.componentPage");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.componentListPage",{masterId:masterId});
            getComponentList();
        };

        $scope.componentEdit = function(id) {
            $state.go("main.componentListAdd",{masterId:masterId,id:id});
        };

        $scope.componentView = function(componentId) {
            $state.go("main.componentListView",{componentId:componentId,masterId:masterId});
        };

        $scope.projectComponentEdit = function(component) {
            $state.go("main.componentProjectEdit",{component:JSON.stringify(component)});
        };

        $scope.componentDel = function(componentId) {
            componentListServ.delComponentById(componentId).then(
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
        var getComponentList = function() {
            $scope.componentQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.componentQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.componentQueryCondition.componentId=masterId;
            var componentQueryCondition = $scope.componentQueryCondition;
            componentListServ.getComponentList(componentQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.componentList = answer.data.list;
                })
        };

        //组件清单
        var componentList = function (componentId) {
            $state.go("main.componentListPage",{componentId:componentId});
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
    moduleApp.controller('componentListPageCtrl',["$scope","$state","ApiPath","gleanComponentListServ","gleanComponentServ","$stateParams",componentPageFunc]);
});