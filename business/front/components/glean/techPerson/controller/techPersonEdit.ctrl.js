/**
 * Created by gaofeng on 2017/5/2.
 */
define(['../module'], function (moduleApp) {
    'use strict';


    var techPersonEditCtrlFunc = function($scope,$state,$stateParams,techPersonServ,FormFocus) {
        var gleanTechPersonId = $stateParams.id;
        $scope.techPersonAlertLayer = true;
        $scope.techPersonSaveDisableFlag = false;
        $scope.namePattern = "/^[1-9a-zA-Z\u4e00-\u9fa5]{0,20}$/";
        $scope.exit = function() {
            $state.go("main.gleanTechPersonPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.gleanTechPersonPage");
        };



        //赋值
        if(gleanTechPersonId!='') {
            techPersonServ.queryTechPersonById(gleanTechPersonId).then(
                function(answer){
                    $scope.gleanTechPersonInfoDto = answer.data;
                    console.log(answer.data);
                }/*,
                 function(error) {
                 $scope.message="获取信息失败";
                 $scope.tip = "tip_2";
                 $scope.techPersonAlertLayer = false;
                 $scope.techPersonSaveDisableFlag = false;
                 }*/);
        }

        //获取checkbox数据
        techPersonServ.queryDefaultTechData().then(
            function(answer){
                $scope.gleanTechDefaultDto = answer.data;
            }
        );
        $scope.isChecked = function(skill) {
            /*var skillJson = JSON.parse(skill);
            for(i=0;i<$scope.gleanTechPersonInfoDto.gleanTechPersonSkillsDtos.length;i++) {
                var data = $scope.gleanTechPersonInfoDto.gleanTechPersonSkillsDtos[i];
                if(data.skillCodeType==skillJson.codeType && data.skillCodeCode==skillJson.codeCode) {
                    return true;
                }
            }*/
            return true;
        };

        $scope.techPersonSave = function() {
            //检测ng-pattern是否合理 不合理则定位到相应位置
            var gleanTechPersonInfoDto = $scope.gleanTechPersonInfoDto;
            gleanTechPersonInfoDto.codeType = "sysType";
            if (this.techPersonSaveForm.$invalid) {
                FormFocus.focusEle("techPersonSaveForm");
                return;
            }

            if($scope.gleanTechPersonInfoDto.id == undefined) {
                save(gleanTechPersonInfoDto);
            }else {
                update(gleanTechPersonInfoDto);
            }
        };

        var save = function(gleanTechPersonInfoDto){
            $scope.techPersonSaveDisableFlag = true;
            techPersonServ.save(gleanTechPersonInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        $scope.message ="\""+gleanTechPersonInfoDto.techPersonName+"\"保存成功";
                        $scope.tip = "tip_1";
                        $scope.techPersonAlertLayer = false;
                    }else{
                        $scope.message = techPersonSaveData.resultMsg;
                        $scope.tip = "tip_2";
                        $scope.techPersonAlertLayer = false;
                        $scope.techPersonSaveDisableFlag = false;
                    }
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.techPersonAlertLayer = false;
                    $scope.techPersonSaveDisableFlag = false;
                })
        };

        var update = function(gleanTechPersonInfoDto){
            TechPersonServ.update(gleanTechPersonInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        //更新成功
                        $scope.message ="\""+gleanTechPersonInfoDto.techPersonName+"\"修改成功";
                        $scope.tip = "tip_1";
                        $scope.techPersonAlertLayer = false;
                    }else{
                        $scope.message=answer.data.resultMsg;
                        $scope.tip = "tip_2";
                        $scope.techPersonAlertLayer = false;
                    }
                },
                function(error){
                    $scope.message=answer.data.resultMsg;
                    $scope.tip = "tip_2";
                    $scope.techPersonAlertLayer = false;
                })
        };



        var updateSelected = function (action, codeCode, name) {
            codeCode = "" + codeCode + "";
            if (action == 'add' && $scope.selected.indexOf(codeCode) == -1) {
                $scope.selected.push(codeCode);
            }
            if (action == 'remove' && $scope.selected.indexOf(codeCode) != -1) {
                var codeCodex = $scope.selected.indexOf(codeCode);
                $scope.selected.splice(codeCodex, 1);
            }
            console.log("==", $scope.selected);
        };
        //判断是在集合$scope.selected里去掉此codeCode，还是加上codeCode
        $scope.updateSelection = function ($event, codeType,codeCode) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, codeType, codeCode);
        }
    };


    moduleApp.controller('techPersonEditCtrl',['$scope','$state','$stateParams','techPersonServ','FormFocus',techPersonEditCtrlFunc]);

});