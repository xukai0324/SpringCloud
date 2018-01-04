/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var deployEnvEditFunc = function($scope,$state,ApiPath,deployEnvServ,$stateParams,FormFocus) {
        var deployEnvId = $stateParams.deployEnvId;
        if(deployEnvId!='') {
            deployEnvServ.getDeployEnvById(deployEnvId).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.deployEnv = answer.data;
                    queryServerVersionIdList();
                    querySoftwareVersionIdList();
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.deployEnvPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.deployEnvPage");
        };

        $scope.saveDeployEnv = function() {
            $scope.deployEnvSaveDisableFlag = true;
            //$scope.deployEnv.softwareList = $scope.softwareList;
            if (this.deployEnvSaveForm.$invalid) {
                FormFocus.focusEle("deployEnvSaveForm");
                $scope.deployEnvSaveDisableFlag = false;
                return;
            }
            deployEnvServ.saveDeployEnv($scope.deployEnv).then(
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

        $scope.exit = function() {
            $state.go("main.deployEnvPage");
        }

        $scope.softwareList=[{id:1}];
        $scope.addDiv=function(){
            var obj={id:1};
            $scope.softwareList.push(obj);
        }

        $scope.delDiv=function(idx){
            $scope.softwareList.splice(idx,1);
        }

        $scope.setServerVersionIdList = function() {
            queryServerVersionIdList();
        }

        $scope.setSoftwareVersionIdList = function() {
            querySoftwareVersionIdList();
        }

        var queryServerVersionIdList = function () {
            var condition = {codeType:$scope.deployEnv.serverNameId};
            console.log("condition.codeType="+condition.codeType);
            deployEnvServ.setServerVersionIdList(condition).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.serverVersionIdList = answer.data.codeData;
                }, function (error) {
                    $scope.serverVersionIdList = [];
                })
        }

        var querySoftwareVersionIdList = function () {
            var condition = {codeType:$scope.deployEnv.softwareNameId};
            console.log("condition.codeType="+condition.codeType);
            deployEnvServ.setServerVersionIdList(condition).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.softwareVersionIdList = answer.data.codeData;
                }, function (error) {
                    $scope.softwareVersionIdList = [];
                })
        }

    };

    moduleApp.controller('deployEnvEditCtrl',["$scope","$state","ApiPath","deployEnvServ",'$stateParams','FormFocus',deployEnvEditFunc]);
});