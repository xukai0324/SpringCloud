/**
 * Created by gaofeng on 2017/5/1.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var techPersonPageCtrlFunc = function($scope,techPersonServ,$state,QuerySelectCode) {
        $scope.techPersonAlertLayer = true;
        /*搜索按钮*/
        $scope.techPersonQuery = function(){
            $scope.paginationConf.currentPage=1;
            getTechPersonList();
        };
        /*重置按钮*/
        $scope.techPersonReset = function() {
            $scope.gleanTechPersonDto = {
                techPersonName:"",
                amoebaId:"",
                techPersonType:""
            }
        };
        /*关闭提示提示框*/
        $scope.closeLayer = function() {
            $scope.techPersonAlertLayer = true;
        };
        /*新增项目*/
        $scope.techPersonEdit = function(id) {
            $state.go("main.gleanTechPersonEdit",{"id":id});
        };
        /*查看项目*/
        $scope.techPersonView = function(id) {
            $state.go("main.gleanTechPersonView",{"id":id});
        };
        /*退出*/
        $scope.exit = function() {
            $state.go("main.index");
        };
        /*排序图标方法*/
        $scope.resultSort=function(num) {
            for(var i=0;i<=3;i++){
                if(i !=num){
                    eval("("+"$scope.desc"+i+"=''"+")");
                }
            }
        };
        /*分页初始化*/
        var getTechPersonList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanTechPersonDto.pageNo = $scope.paginationConf.currentPage;
            $scope.gleanTechPersonDto.pageSize=$scope.paginationConf.itemsPerPage;
            var gleanTechPersonDto = $scope.gleanTechPersonDto;
            techPersonServ.queryTechPersonPage(gleanTechPersonDto).then(
                function(answer){
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.techPersonData=answer.data.list;
                },function(error){
                    //cconsole.log(JSON.stringify(error.data));
                }
            );
        };
        var initPage = function(){
            $scope.paginationConf = {
                currentPage: 1,     //当前所在的页
                totalItems: 1,      //总共有多少条记录
                itemsPerPage: 10,   //每页展示的数据条数
                pagesLength: 5,    //分页条目的长度（如果设置建议设置为奇数）
                perPageOptions: [10, 20, 30 , 40, 50]   // 可选择显示条数的数组
            };
            $scope.gleanTechPersonDto = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getTechPersonList);
        };
        initPage();
    };

    moduleApp.controller('techPersonPageCtrl',['$scope','techPersonServ','$state','QuerySelectCode',techPersonPageCtrlFunc]);
});