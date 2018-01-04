/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var pbinfoEditFunc = function($scope,$state,ApiPath,pbInfoServ,$stateParams) {

        /**查询结果主dto*/
        $scope.QuesProblemVo = {};
        $scope.tempDto = {};

        /** 查询条件Dto */
        $scope.QuesListQueryCondition = {};
        /** 查询结果Dto */
        $scope.QuesListDto = {};

        var getInitMainInfo = function () {
            $scope.paginationConf = {
                currentPage: 1, // 当前所在的页
                totalItems: 0, // 总共有多少条记录
                itemsPerPage: 10, // 每页展示的数据条数
                pagesLength: 5, // 分页条目的长度（如果设置建议设置为奇数）
                perPageOptions: [10, 20, 30, 40, 50]
                // 可选择显示条数的数组
            };
            $scope.QuesListQueryCondition = {
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage
            };

            $scope.$watch(
                'paginationConf.currentPage + paginationConf.itemsPerPage', initFindQuesList);

            pbInfoServ.getInitQuesList("111").then(
                function (answer) {
                    console.log(answer.data);
                    $scope.QuesProblemVo = answer.data;
                }
            )
        };
        /** 展示问题详情页面 */
        $scope.showDetail= function (quesId) {
            $state.go('main.quesDetail', {quesId: quesId});
        };

        /** 跳转到问题提问页面 */
        $scope.goPutQuesPage = function (){
            $state.go('main.putQues');
        };


        /** 按条件查询问题列表 */
        $scope.findQuesList = function() {
            initFindQuesList();
        };

        var initFindQuesList = function (){
            $scope.QuesListQueryCondition.pageNo = $scope.paginationConf.currentPage;
            $scope.QuesListQueryCondition.pageSize = $scope.paginationConf.itemsPerPage;
            var QuesListQueryCondition = $scope.QuesListQueryCondition;
            pbInfoServ.getQuesListByPage(QuesListQueryCondition).then(
                function (answer) {
                    console.log(answer.data.list);
                    $scope.paginationConf.totalItems = answer.data.totalCount;
                    $scope.QuesListDto = answer.data.list;
                }
            )
        };

        /**查询条件展示--问题类型*/
        $scope.pbInfoDto = {};
        var getQuesType = function(){
            var infogaterQuesTypeDto = {};
            infogaterQuesTypeDto.codeType = "quesType";
            pbInfoServ.getQuesTypeList(infogaterQuesTypeDto).then(
                function (answer){
                    $scope.pbInfoDto = answer.data;
                }
            )
        };

        /**查询条件展示--部门编码*/
        $scope.departMentDto = {};
        var getDepartMentDto = function(){
            var infogaterDepartMentDto = {};
            infogaterDepartMentDto.codeType = "departmentId";
            pbInfoServ.getDepartmentList(infogaterDepartMentDto).then(
                function (answer){
                    $scope.departMentDto = answer.data;
                }
            )
        };

        getInitMainInfo();
        getQuesType();
        getDepartMentDto();
    };

    moduleApp.controller('pbInfoCtrl',["$scope","$state","ApiPath","pbInfoServ",'$stateParams',pbinfoEditFunc]);
});