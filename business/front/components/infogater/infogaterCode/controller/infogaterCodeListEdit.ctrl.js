/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterCodeListEditFunc = function($scope,$state,ApiPath,infogaterCodeServ,$stateParams) {
        var infogaterCodeType = $stateParams.infogaterCodeType;
        if(infogaterCodeType!=''&&infogaterCodeCode!='') {
            infogaterCodeServ.getInfogaterCodeById(infogaterCodeType).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterCode = answer.data;
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterCodePage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterCodePage");
        };

        $scope.addCode = function(){
            $scope.infogaterCodeAllListData.push({
                codeCode:'',
                codeName:''
            });
        };

        $scope.deleCode = function(){
            var index=$scope.infogaterCodeAllListData.indexOf(this.codeCode);
            $scope.infogaterCodeAllListData.splice(index,1);
        },
        
        $scope.saveInfogaterCodeList = function() {
            $scope.saveDisableFlag = true;
            infogaterCodeServ.saveInfogaterCodeList($scope.infogaterCode).then(
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

    moduleApp.controller('infogaterCodeListEditCtrl',["$scope","$state","ApiPath","infogaterCodeServ",'$stateParams',infogaterCodeListEditFunc]);
});