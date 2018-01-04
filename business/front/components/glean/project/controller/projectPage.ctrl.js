/**
 * Created by gaofeng on 2017/5/1.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var projectPageCtrlFunc = function($scope,projectServ,$state,QuerySelectCode) {
        $scope.projectAlertLayer = true;
        /*搜索按钮*/
        $scope.projectQuery = function(){
            $scope.paginationConf.currentPage=1;
            getProjectList();
        };
        /*重置按钮*/
        $scope.projectReset = function() {
            $scope.gleanProjectInfoDto = {
                projectName:"",
                amoebaId:"",
                ProjectType:""
            }
        };
        /*关闭提示提示框*/
        $scope.closeLayer = function() {
            $scope.projectAlertLayer = true;
        };
        /*新增项目*/
        $scope.projectAdd = function(id) {
            $state.go("main.gleanProjectAdd");
        };
        /*修改项目*/
        $scope.projectEdit = function(id) {
            $state.go("main.gleanProjectEdit",{"id":id});
        };
        /*查看项目*/
        $scope.projectView = function(id) {
            $state.go("main.gleanProjectView",{"id":id});
        };
        /*退出*/
        $scope.exit = function() {
            $state.go("main.index");
        };
        /*删除项目*/
        $scope.logicRemove = function(id) {
            angular.comfirm("确定要删除吗?",{okCallback:function(ok){
                projectServ.logicRemove(id).then(
                    function(answer){
                    	 if(answer.data=="1"){
                             //更新成功
                             $scope.message ="删除成功";
                             $scope.tip = "tip_1";
                             getProjectList();
                         }else if(answer.data=="3"){
                             $scope.message="权限不足删除失败";
                             $scope.tip = "tip_2";
                             $scope.projectAlertLayer = false;
                         }else{
                             $scope.message=answer.data;
                             $scope.tip = "tip_2";
                             $scope.projectAlertLayer = false;
                         }
                       
                    },
                    function(error) {
                        $scope.message="删除失败请联系管理员。";
                        $scope.tip = "tip_2";
                        $scope.projectAlertLayer = false;
                    })
            },closeCallback:function(cancel){
            }});
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
        var getProjectList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanProjectInfoDto.pageNo = $scope.paginationConf.currentPage;
            $scope.gleanProjectInfoDto.pageSize=$scope.paginationConf.itemsPerPage;
            var gleanProjectInfoDto = $scope.gleanProjectInfoDto;
            gleanProjectInfoDto.codeType = "sysType";
            projectServ.queryProjectPage(gleanProjectInfoDto).then(
                function(answer){
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.projectData=answer.data.list;                                            
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
            $scope.gleanProjectInfoDto = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getProjectList);
   
            
        };

        initPage();
        //getProjectList();
    };

    moduleApp.controller('projectPageCtrl',['$scope','projectServ','$state','QuerySelectCode',projectPageCtrlFunc]);
});