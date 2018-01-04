/**
 * Created by pengju on 2017/5/5.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var quesDetailEditFunc = function($scope,$state,ApiPath,quesDetailServ,$stateParams) {

        /**查询结果主dto*/
        $scope.QuesDetailMainDto = {};
        $scope.tempDto = {};
        /**提交的dto*/
        $scope.submitDiscussDto = {};
        var quesId = $stateParams.quesId;
        $scope.tempDto.quesId = quesId;
        var getDetailMainInfo = function (quesId) {
            var quesProblemDto = {};
            quesProblemDto.id = quesId;
            if (quesProblemDto.id != '') {
                quesDetailServ.getQuesDetailById(quesProblemDto).then(
                    function (answer) {
                        console.log(answer.data);
                        $scope.QuesDetailMainDto = answer.data;
                        var isMyQues = "";
                        if(answer.data.quesUserId==answer.data.userId && answer.data.quesProblemDto.pbState =='1'){
                            isMyQues = true;
                        }else{
                            isMyQues = false;
                        }
                        $scope.QuesDetailMainDto.isMyQues = isMyQues;
                        $scope.submitDiscussDto.toID=$scope.QuesDetailMainDto.quesProblemDto.updateBy;
                        $scope.submitDiscussDto.toPeopleName=$scope.QuesDetailMainDto.quesUserName;
                        $scope.submitDiscussDto.fromId=$scope.QuesDetailMainDto.userId;
                        $scope.submitDiscussDto.pbId = $scope.QuesDetailMainDto.quesProblemDto.id;
                        //以下为了做重置用
                        $scope.tempDto.toID = $scope.submitDiscussDto.toID;
                        $scope.tempDto.toPeopleName = $scope.submitDiscussDto.toPeopleName;
                    }
                )
            }
        };
        //设置回复人
        $scope.setReplyPeople = function(fromId,userName,pbNum){
            $scope.submitDiscussDto.toID = fromId;
            $scope.submitDiscussDto.toPeopleName = userName;
            $scope.submitDiscussDto.pbAnsNum = pbNum;
        };
        //重置回复人
        $scope.reSetReplyPeople = function(){
            console.log(JSON.stringify($scope.tempDto));
            var toID = $scope.tempDto.toID;
            $scope.submitDiscussDto.toID =toID;
            var toPeopleName = $scope.tempDto.toPeopleName;
            $scope.submitDiscussDto.toPeopleName = toPeopleName;
        };

        //提交评论
        $scope.submitReply = function(){
            var submitDiscDto = $scope.submitDiscussDto;
            if(submitDiscDto.answerCon == undefined){
                angular.alert("请输入评论后再提交！！");
                return;
            }
            quesDetailServ.submitDiscuss(submitDiscDto).then(
                function (answer) {
                    console.log(answer.data);
                    var thisTempDto = $scope.tempDto;
                    getDetailMainInfo(thisTempDto.quesId);
                }
            )
        };

        /*重置评论框*/
        $scope.resetReply = function(){
            console.log(JSON.stringify($scope.tempDto));
            var toID = $scope.tempDto.toID;
            $scope.submitDiscussDto.toID =toID;
            var toPeopleName = $scope.tempDto.toPeopleName;
            $scope.submitDiscussDto.toPeopleName = toPeopleName;
            $scope.submitDiscussDto.answerCon = "";
        };

        /**返回问题答疑主页*/
        $scope.goQuesMain = function(){
            $state.go('main.pbInfo');
        };

        /**问题采纳*/
        $scope.acceptAnsw  = function(quesId,answId,fromId){
            var acceptQuesDto = {};
            acceptQuesDto.id = quesId;
            acceptQuesDto.answId = answId;
            acceptQuesDto.fromId = fromId;
            quesDetailServ.acceptAnsw(acceptQuesDto).then(
                function (answer) {
                    console.log(answer.data);
                    var thisTempDto = $scope.tempDto;
                    getDetailMainInfo(thisTempDto.quesId);
                }
            )
        };

        getDetailMainInfo(quesId);

    };


    moduleApp.controller('quesDetailCtrl',["$scope","$state","ApiPath","quesDetailServ",'$stateParams',quesDetailEditFunc]);
});