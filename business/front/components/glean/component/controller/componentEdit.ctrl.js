/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentEditCtrlFunc = function ($scope,$state,ApiPath,gleanComponentServ,$stateParams,FormFocus) {
        var componentId=$stateParams.componentId;
        $scope.isAdd=true;
//        $scope.codePattern= "/^[A-Z][0-9a-zA-Z]{0,19}$/";
        $scope.namePattern=  "/^([\u4e00-\u9fa5a-zA-Z0-9]|[-()]){1,19}$/";
        if(componentId!=''){
            gleanComponentServ.getComponentById(componentId).then(
                function (answer) {
                    var condition = {'codeType':answer.data.componentNameId};
                    gleanComponentServ.queryGleanComponentInfoVersionById(condition).then(function(answer){
                        $scope.versionList=answer.data.codeData;
                    },function (error) {
                        $scope.message = "加载失败，请稍后重试";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                    });
                    /*var labelStr='';
                    for(var i=0;i<answer.data.labelList.length;i++){
                        labelStr+=answer.data.labelList[i].name+',';
                    }
                    answer.data.labelList = labelStr.substr(0,labelStr.length-1);*/
                    $scope.component = answer.data;
                }
            );
            $scope.isAdd=false;
        }
        $scope.alertLayer = true;
        $scope.exit = function () {
            $state.go('main.componentPage');
        };

       $scope.closeLayer = function () {
    		if($scope.tip== "tip_1"){
    			$state.go('main.componentPage');
    		}
    		 $scope.alertLayer  = true;
        };

        $scope.addProject = function(item) {
            var gleanProjectComponentDto = {
                projectId:item.codeCode,
                projectName:item.codeName
            };
            $scope.component.gleanProjectComponentDtos.push(gleanProjectComponentDto);
        };

        $scope.delProject = function(idx) {
            $scope.component.gleanProjectComponentDtos.splice(idx,1);
        };

        $scope.OnSelect = function () {
            queryGleanComponentInfoVersionById($scope.component.componentNameId);
        };
        /**
         *根据组件名称ID查找对应的版本信息
         */
        var queryGleanComponentInfoVersionById = function (componentNameId) {
            var condition = {'codeType':componentNameId};
            gleanComponentServ.queryGleanComponentInfoVersionById(condition).then(function(answer){
                $scope.versionList=answer.data.codeData;
            },function (error) {
                $scope.message = "加载失败，请稍后重试";
                $scope.tip = 'tip_2';
                $scope.alertLayer = false;
            })
        };

        $scope.saveComponent = function () {
        	 
            if (this.componentSaveForm.$invalid) {
                FormFocus.focusEle("componentSaveForm");
                return;
            }
            $scope.saveDisableFlag = true;
            /*console.log($scope.component.labelList+"---------");
            if($scope.component.labelList==undefined || $scope.component.labelList==null){
                $scope.component.labelList=JSON.parse([JSON.parse("")]);
            }*/
            
            var component = $scope.component;
            console.log(JSON.stringify(component));
            component.codeType = "copType";
            gleanComponentServ.saveComponent(component).then(
                function (answer) {
                	if(typeof(component.id) != 'undefined' && component.id != ''){
                		if(answer.data == '1'){
                            $scope.message = '更新成功';
                            $scope.tip = "tip_1";
                            $scope.alertLayer  = false;
                        }else if(answer.data == '5'){
                        	 $scope.message = '更新失败,组件名称不可以重复';
                             $scope.tip = "tip_5";
                             $scope.alertLayer = false;
                        }else if(answer.data == '6'){
                        	 $scope.message = '更新失败,组件代码不可以重复';
                             $scope.tip = "tip_6";
                             $scope.alertLayer = false;
                        }else{
                            $scope.message = "更新失败，请稍后重试";
                           
                            $scope.tip = 'tip_2';
                            $scope.alertLayer = false;
                        }
                	}else{
                		if(answer.data == '1'){
                            $scope.message = '保存成功';
                            $scope.tip = "tip_1";
                            $scope.alertLayer  = false;
                        }else if(answer.data == '5'){
                        	 $scope.message = '保存失败,组件名称不可以重复';
                             $scope.tip = "tip_5";
                             $scope.alertLayer = false;
                        }else if(answer.data == '6'){
                        	 $scope.message = '保存失败,组件代码不可以重复';
                             $scope.tip = "tip_6";
                             $scope.alertLayer = false;
                        }else{
                            $scope.message = "保存失败，请稍后重试";
                           
                            $scope.tip = 'tip_2';
                            $scope.alertLayer = false;
                        }
                	}
                	
                    
                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                }
            );
        }
    };

    moduleApp.controller('gleanComponentEditCtrl',["$scope","$state","ApiPath","gleanComponentServ",'$stateParams','FormFocus',gleanComponentEditCtrlFunc]);
});
