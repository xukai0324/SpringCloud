/**
 * Created by MaWenzheng on 2017/5/2.
 */

define(['../module'],function(moduleApp) {
    'use strict';

    var demandschPageFunc = function($rootScope,$scope,$state,ApiPath,demandScheduleServ,demandReleaseServ,$stateParams) {
        var demandId= $stateParams.demandId;
        var demandid = $stateParams.demandid;
        console.log("========2.========"+demandId);
        if(demandId!=''){
            console.log('demandId is not null ');
            demandReleaseServ.getDemandById(demandId).then(
                function (answer) {
                    console.log(answer.data);
                    $scope.demand = answer.data;
                }
            )
        }
        var demandschShow = {};
        var isShow = false;
        var roles = $rootScope.user.permitRoleDto;
        if(roles!=undefined){
            for(var i=0;i<roles.length;i++){
                if(roles[i].roleCode=='jszx'){
                    isShow = true;
                    break;
                }
            }
        }

        if(isShow){
            demandschShow.edit = true;
            demandschShow.del = true;
            demandschShow.add = true;
        }else{
            demandschShow.edit = false;
            demandschShow.del = false;
            demandschShow.add = false;
        }
        $scope.demandschShow =demandschShow;
        $scope.alertLayer = true;
        $scope.demandschPageQuery = function() {
            getDemandschList();
        };
        $scope.demandschPageReset = function() {
            $scope.demandschQueryCondition={
                userCode:"",
                status:""
            };
        };
        $scope.exit = function() {
            console.log('exit function ..');
            $state.go("main.demandPage");
        };

        $scope.closeLayer = function() {
            $scope.alertLayer = true;
            $state.go("main.demandschPage");
            getDemandschList();
        };

        $scope.demandschEdit = function(demandschId) {
            console.log('demandschEdit function .');
            $state.go("main.demandschEdit",{demandid:demandId,demandschId:demandschId});
        };
        $scope.demandschAdd = function() {
            console.log('demandschAdd function .');
            $state.go("main.demandschAdd",{demandid:demandId,demandId:$scope.demand.demandId});
        };

        $scope.demandschView = function(demandschId) {
            console.log('demandschView function .');
            $state.go("main.demandschView",{demandid:demandId,demandschId:demandschId});
        };

        $scope.demandschDel = function(demandschId) {
            console.log('demandschDel function ..',demandschId);
            demandScheduleServ.delDemandschById(demandschId).then(
                function(answer){
                    console.log('demandsch delete success .');
                    $scope.message = "删除成功";
                    $scope.tip = "tip_1";
                    $scope.alertLayer = false;
                },
                function(error) {
                    console.log('demandsch delete falier');
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        };
        var getDemandschList = function() {
            $scope.demandschQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.demandschQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var demandschQueryCondition = $scope.demandschQueryCondition;
            demandschQueryCondition.demandId = demandid;
            demandScheduleServ.getDemandschList(demandschQueryCondition).then(
                function(answer) {
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.demandschListData = answer.data.list;
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
            $scope.demandschQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getDemandschList);
        };
        initPage();
    };
    moduleApp.controller('demandschPage',["$rootScope","$scope","$state","ApiPath","demandScheduleServ","demandReleaseServ",'$stateParams',demandschPageFunc]);
});