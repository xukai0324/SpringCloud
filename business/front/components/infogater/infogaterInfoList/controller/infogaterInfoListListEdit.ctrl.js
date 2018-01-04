/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterInfoListListEditFunc = function($scope,$state,ApiPath,infogaterInfoListServ,$stateParams) {
        var infogaterInfoListType = $stateParams.infogaterInfoListType;
        if(infogaterInfoListType!=''&&infogaterInfoListCode!='') {
            infogaterInfoListServ.getInfogaterInfoListById(infogaterInfoListType).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterInfoList = answer.data;
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterInfoListPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterInfoListPage");
        };

        $scope.addCode = function(){
            $scope.infogaterInfoListAllListData.push({
                codeCode:'',
                codeName:''
            });
        };

        $scope.deleCode = function(){
            var index=$scope.infogaterInfoListAllListData.indexOf(this.codeCode);
            $scope.infogaterInfoListAllListData.splice(index,1);
        },
        
        $scope.saveInfogaterInfoListList = function() {
            $scope.saveDisableFlag = true;
            infogaterInfoListServ.saveInfogaterInfoListList($scope.infogaterInfoList).then(
                function(answer){
                    console.log("保存返回信息为", answer.data);
                    if(answer.data=="1"){
                        $scope.message = "保存成功";
                        $scope.tip = "tip_1";
                        $scope.alertLayer = false;
                    }else{
                        $scope.message = "保存失败，请稍后重试！";
                        $scope.tip = "tip_2";
                        $scope.alertLayer = false;
                    }
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.alertLayer = false;
                })
        }
    };

    moduleApp.controller('infogaterInfoListListEditCtrl',["$scope","$state","ApiPath","infogaterInfoListServ",'$stateParams',infogaterInfoListListEditFunc]);
});