/**
 * Created by gaofeng on 2017/5/2.
 */
define(['../module'], function (moduleApp) {
    'use strict';


    var frameworkEditCtrlFunc = function($scope,$state,$stateParams,frameworkServ,FormFocus) {
        var gleanFrameworkInfoId = $stateParams.frameworkId;
        $scope.addLayer=false;
        $scope.frameworkAlertLayer = true;
        $scope.frameworkSaveDisableFlag = false;
        $scope.namePattern = "/^([\u4e00-\u9fa5a-zA-Z0-9]|[-()]){1,19}$/";
        $scope.gleanComponentCondition = {
            name:"",
        	pageNo:1,
        	pageSize:10
        }
        $scope.paginationConfComponents = {
            currentPage: 1,     //当前所在的页
            totalItems: 1,      //总共有多少条记录
            itemsPerPage: 10,   //每页展示的数据条数
            pagesLength: 5,    //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 20, 30 , 40, 50]   // 可选择显示条数的数组
        };
        $scope.addComponent=function(){
        	initComponentPage();
            $scope.addLayer=true;
        };
        
        $scope.addhideInsure=function(){
        	$scope.addLayer=false;
        }
        $scope.delComponent=function(idx){
            var gleanFrameworkComponentDtoList = $scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos;
            gleanFrameworkComponentDtoList.splice(idx,1);
        };
        $scope.changeComponent=function(idx){
        	var theCurComponent=$scope.allComponents[idx];
        	
        	var tempComponentDto=null;
        	for(var tempPos=0;tempPos<$scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.length;tempPos++){
        		if($scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[tempPos].componentId==theCurComponent.id){
        			tempComponentDto=tempPos;
        		}
        	}
        	if(tempComponentDto==null){
        		var newComponentDto={
        			componentId:theCurComponent.id,
            		componentName:theCurComponent.name
            	}
        		$scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.push(newComponentDto);
        	}else{
        		$scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.splice(tempComponentDto,1);
        		console.log($scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtoList);
        	}
        	$scope.changeComponentsSelected();
        };
        
        $scope.changeComponentsSelected=function(){
        	for(var curPos=0;curPos<$scope.allComponents.length;curPos++){
				$scope.allComponents[curPos].isSelected=$scope.isComponentSelected($scope.allComponents[curPos].id);
        	}
        }
        $scope.isComponentSelected=function(componentId){
        	for(var curPos=0;curPos<$scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.length;curPos++){
        		if($scope.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[curPos].componentId==componentId){
        			return true;
        		}
        	}
        	return false;
        }
        $scope.getComponentVersionList = function(obj) {
            console.log("选择下拉框后的数据"+obj.gleanFrameworkComponentDto.componentId);
            componentVersionList(obj);
        };
        $scope.searchComponent=function(){
        	getComponentsVersionList();
        }
        var componentVersionList = function (obj) {
            var condition = {componentId:obj.gleanFrameworkComponentDto.componentId};
            frameworkServ.getComponentVersionList(condition).then(
                function(answer) {
                    obj.componentVersionList = answer.data;
                }, function (error) {
                    $scope.componentVersionList = [];
                })
        };
        $scope.exit = function() {
            $state.go("main.frameworkPage");
        };

        $scope.closeLayer = function() {
            $state.go("main.frameworkPage");
        };

        //赋值
        if(gleanFrameworkInfoId!='') {
        	frameworkServ.queryFrameWorkById(gleanFrameworkInfoId).then(
                function(answer){
                    $scope.gleanFrameworkInfoDto = answer.data;
                }/*,
                 function(error) {
                 $scope.message="获取信息失败";
                 $scope.tip = "tip_2";
                 $scope.FrameworkAlertLayer = false;
                 $scope.FrameworkSaveDisableFlag = false;
                 }*/);
        }else {
            $scope.gleanFrameworkInfoDto={
            	gleanFrameworkComponentDtos:[],
            };
        }


        $scope.frameworkSave = function() {
            //检测ng-pattern是否合理 不合理则定位到相应位置
            var gleanFrameworkInfoDto = $scope.gleanFrameworkInfoDto;
            console.log($scope.gleanFrameworkInfoDto.delGleanFrameworkComponentDtoIds);
            gleanFrameworkInfoDto.codeType = "sysType";
            if (this.frameworkSaveForm.$invalid) {
                FormFocus.focusEle("frameworkSaveForm");
                return;
            }

            if($scope.gleanFrameworkInfoDto.id == undefined) {
                save(gleanFrameworkInfoDto);
            }else {
                update(gleanFrameworkInfoDto);
            }
        };

        var save = function(gleanFrameworkInfoDto){
            $scope.frameworkSaveDisableFlag = true;
            frameworkServ.saveFrameWork(gleanFrameworkInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        $scope.message ="\""+gleanFrameworkInfoDto.frameworkName+"\"保存成功";
                        $scope.tip = "tip_1";
                        $scope.frameworkAlertLayer = false;
                    }else{
                        $scope.message = frameworkSaveData.resultMsg;
                        $scope.tip = "tip_2";
                        $scope.frameworkAlertLayer = false;
                        $scope.frameworkSaveDisableFlag = false;
                    }
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.frameworkAlertLayer = false;
                    $scope.frameworkSaveDisableFlag = false;
                })
        };

        var update = function(gleanFrameworkInfoDto){
        	frameworkServ.updateFrameWork(gleanFrameworkInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        //更新成功
                        $scope.message ="\""+gleanFrameworkInfoDto.frameworkName+"\"修改成功";
                        $scope.tip = "tip_1";
                        $scope.frameworkAlertLayer = false;
                    }else{
                        $scope.message=answer.data.resultMsg;
                        $scope.tip = "tip_2";
                        $scope.frameworkAlertLayer = false;
                    }
                },
                function(error){
                    $scope.message=answer.data.resultMsg;
                    $scope.tip = "tip_2";
                    $scope.frameworkAlertLayer = false;
                })
        };
        
        
        
        
        var getComponentsVersionList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanComponentCondition.pageNo = $scope.paginationConfComponents.currentPage;
            $scope.gleanComponentCondition.pageSize=$scope.paginationConfComponents.itemsPerPage;
            var gleanComponentCondition = $scope.gleanComponentCondition;
            gleanComponentCondition.codeType = "sysType";
            frameworkServ.queryComponentsPage(gleanComponentCondition).then(
                function(answer){
                    $scope.paginationConfComponents.totalItems = answer.data.totalCount;
                    $scope.allComponents=answer.data.list;
                    $scope.changeComponentsSelected();
                },function(error){
                    //cconsole.log(JSON.stringify(error.data));
                }
            );
        };
        var initComponentPage = function(){
           
            $scope.gleanComponentCondition = {
                pageNo: $scope.paginationConfComponents.currentPage,
                pageSize: $scope.paginationConfComponents.itemsPerPage
            };
            $scope.$watch('paginationConfComponents.currentPage + paginationConfComponents.itemsPerPage', getComponentsVersionList);
        };
    };


    moduleApp.controller('gleanFrameworkEditCtrl',['$scope','$state','$stateParams','frameworkServ','FormFocus',frameworkEditCtrlFunc]);

});