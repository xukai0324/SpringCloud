/**
 * Created by pengju on 2017/6/17.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var putQuesEditFunc = function($scope,$state,ApiPath,putQuesServ,$stateParams) {

        /**查询条件展示--问题类型*/
        $scope.pbInfoDto = {};
        var getQuesType = function(){
            var infogaterQuesTypeDto = {};
            infogaterQuesTypeDto.codeType = "quesType";
            putQuesServ.getQuesTypeList(infogaterQuesTypeDto).then(
                function (answer){
                    $scope.pbInfoDto = answer.data;
                }
            )
        };

        /**初始化加载个人信息 */
        $scope.myInfoDto = {};
        $scope.tempDto = {};
        var initMyInfo = function(){
            putQuesServ.getMyInfo().then(
                function (answer){
                    $scope.myInfoDto = answer.data;
                    $scope.tempDto = $scope.myInfoDto;
                }
            )
        };

        /**问题提交对象*/
        $scope.putQuesDto = {};
        $scope.submitQues = function (){
            var putQuesDto = $scope.putQuesDto;
            var userId  = $scope.myInfoDto.userId;
            putQuesDto.id = userId;
            var myInfoDto = $scope.myInfoDto;
            var pbScore ={};
            if(putQuesDto.pbScore!=undefined){
                pbScore = parseInt(putQuesDto.pbScore);
            }
            var userMarkNum = {};
            if(myInfoDto.userMarkNum!=undefined){
                userMarkNum = parseInt(myInfoDto.userMarkNum);
            }
            if(pbScore > userMarkNum){
                angular.alert("您的分数不足");
                return;
            }

            if(putQuesDto.pbScore == undefined || putQuesDto.pbScore == ''){
                angular.alert("请输入问题奖励分数，若是您分数不足，请努力赚取分数哟！");
                return;
            }

            if(putQuesDto.pbTitle == undefined){
                angular.alert("请输入问题标题");
                return;
            }
            if(putQuesDto.pbContent == undefined){
                angular.alert("请输入问题内容");
                return;
            }
            if(putQuesDto.pbType == undefined){
                angular.alert("请选择问题类型");
                return;
            }
            putQuesServ.submitQuestion(putQuesDto).then(
                function (answer){
                    if("ok"==answer.data){
                        angular.alert("问题发表成功！获得奖励分数1分！");
                        $state.go('main.pbInfo');
                    }else{
                        angular.alert("问题发表失败！");
                    }
                }
            )


        };


        /** 重置所有 */
        $scope.resetQues = function(){
            $scope.putQuesDto = {};
        };

        getQuesType();
        initMyInfo();

    };


    moduleApp.controller('putQuesCtrl',["$scope","$state","ApiPath","putQuesServ",'$stateParams',putQuesEditFunc]);
});