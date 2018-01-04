/**
 * Created by changweican on 2017/5/3.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var menuViewCtrlFunc = function($scope,$state,ApiPath,permitMenuServ,$stateParams) {
        //添加父菜单
        // $scope.insertParentMenu = function() {
        //     var permitMenuDto = $scope.permitMenu;
        //     permitMenuServ.insertMenu(permitMenuDto).then(
        //         function(answer) {
        //             // $scope.menu = answer.data;
        //             console.log("响应结果:"+answer.data);
        //         }
        //     );
        // };
        // $scope.insertChildMenu = function() {
        //     var permitMenuDto = $scope.childMenu;
        //     permitMenuServ.insertChildMenu(permitMenuDto).then(
        //         function(answer) {
        //             // $scope.menu = answer.data;
        //             console.log("响应结果:"+answer.data);
        //         }
        //     );
        // };
        // //代码规范，设置初始状态
        // $scope.permitMenu = {
        //     actionUrl: '',
        //     menuName: '',
        //     displayNo: '',
        //     image: ''
        // };
        //
        // var upperId = $stateParams.upperId;
        // console.log("upperId:"+upperId);
        // //代码规范，设置初始状态
        // $scope.childMenu = {
        //     actionUrl: '',
        //     menuName: '',
        //     displayNo: '',
        //     upperId: upperId,
        //     image: ''
        // };
        // //根据userId查询菜单权限
        // $scope.getPermitMenusByUserId = function(userId) {
        //     console.log("userId:"+userId);
        //     permitMenuServ.getPermitMenusById(userId).then(
        //         function(answer) {
        //             console.log(answer.data);
        //             // $scope.menu = answer.data;
        //         }
        //     );
        // };
        //
        //
        // //获取所有的菜单
        // $scope.parentMenuList = function() {
        //     getParentMenuList();
        // };
        //
        // var getParentMenuList = function() {
        //     $scope.parentMenuQueryCondition.pageNo = $scope.paginationConf.currentPage;
        //     $scope.parentMenuQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
        //     var parentMenuQueryCondition = $scope.parentMenuQueryCondition;
        //     permitMenuServ.getParentMenuList(parentMenuQueryCondition).then(
        //         function(answer) {
        //             $scope.paginationConf.totalItems = answer.data.totalCount;
        //             $scope.parentMenuListData = answer.data.list;
        //         })
        // };
        //
        // //加载分页
        // var initPage = function () {
        //     $scope.paginationConf = {
        //         currentPage: 1, // 当前所在的页
        //         totalItems: 0, // 总共有多少条记录
        //         itemsPerPage: 20, // 每页展示的数据条数
        //         pagesLength: 5, // 分页条目的长度（如果设置建议设置为奇数）
        //         perPageOptions: [10, 20, 30, 40, 50]
        //         // 可选择显示条数的数组
        //     };
        //     $scope.parentMenuQueryCondition = {
        //         pageNo: $scope.paginationConf.currentPage,
        //         pageSize: $scope.paginationConf.itemsPerPage
        //     };
        //
        //     $scope.$watch(
        //         'paginationConf.currentPage + paginationConf.itemsPerPage', getParentMenuList);
        // };
        // initPage();
        //
        //
        // //跳转到新增父菜单界面
        // $scope.openParentMenu = function() {
        //     $state.go("main.createParentMenu");
        // };
        //
        //
        // //跳转到新增子菜单界面
        // $scope.openChildMenu = function(upperId) {
        //     $state.go("main.createChildMenu",{upperId:upperId});
        // };
        // //跳转到菜单列表界面
        // $scope.openPermitMenuList = function() {
        //     $state.go("main.parentMenuList");
        // };
        //
        // $scope.exit = function() {
        //     $state.go("main.parentMenuList");
        // }
    };

    moduleApp.controller('menuViewCtrl',["$scope","$state","ApiPath","permitMenuServ","$stateParams",menuViewCtrlFunc]);
});