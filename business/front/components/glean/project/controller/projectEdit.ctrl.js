/**
 * Created by gaofeng on 2017/5/2.
 */
define(['../module'], function (moduleApp) {
    'use strict';


    var projectEditCtrlFunc = function($scope,$state,$stateParams,projectServ,FormFocus) {
        var gleanProjectInfoId = $stateParams.id;        
        $scope.addLayer=false;
        $scope.addFrameworkLayer=false;
        $scope.projectAlertLayer = true;
        $scope.addLayerForFramework=false;
        $scope.projectSaveDisableFlag = false;
//        $scope.namePattern = "/^[1-9a-zA-Z\u4e00-\u9fa5]{0,20}$/";
        $scope.namePattern = "/^([\u4e00-\u9fa5a-zA-Z0-9]|[-()]){1,19}$/";
        $scope.gleanComponentCondition = {
        	pageNo:1,
        	pageSize:10
        }
        $scope.gleanToolCondition = {
        	pageNo:1,
        	pageSize:10
        }
        $scope.gleanFrameworkCondition = {
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
        /**
         * 工具分页类
         */
        $scope.paginationConfTools = {
            currentPage: 1,     //当前所在的页
            totalItems: 1,      //总共有多少条记录
            itemsPerPage: 10,   //每页展示的数据条数
            pagesLength: 5,    //分页条目的长度（如果设置建议设置为奇数）
            perPageOptions: [10, 20, 30 , 40, 50]   // 可选择显示条数的数组
        };
        $scope.paginationConfFrameworks = {
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
        
        $scope.addTool=function(){
        	initToolPage();
            $scope.addToolsLayer=true;
        };
        $scope.addFramework=function(){
        	initFrameworkPage();
        	$scope.addFrameworkLayer=true;
        }
        $scope.addhideInsure=function(){
        	$scope.addLayer=false;
        	$scope.addToolsLayer=false;
        	$scope.addFrameworkLayer=false;
        	$scope.addLayerForFramework=false;
        }
        $scope.addhideInsureForFramework=function(){
	       /* var result=$scope.checkComponentsForFramework();
		  	if(result!=null){
		  		alert("请选择"+result+"框架组件的版本");
		  		$scope.message ="请选择"+result+"框架组件的版本";
		  		$scope.tip = "tip_2";
		  		$scope.projectAlertLayer = true;
		  		return ;
		  	}*/
        	$scope.addLayer=false;
        	$scope.addToolsLayer=false;
        	$scope.addFrameworkLayer=false;
        	$scope.addLayerForFramework=false;
        }
        
        $scope.checkComponentsForFramework =function(){
        	for(var pos=0;pos<$scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.length;pos++){
        		if($scope.getComponentById($scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[pos].componentId)){
        			continue;
        		}
        		return $scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[pos].componentName;
        	}
        	return null;
        }
        $scope.delComponent=function(idx){
            var gleanProjectComponentDtoList = $scope.gleanProjectInfoDto.gleanProjectComponentDtoList;
            if(gleanProjectComponentDtoList[idx].id != undefined) {
                $scope.gleanProjectInfoDto.delGleanProjectComponentDtoIds.push(gleanProjectComponentDtoList[idx].id);
            }
            gleanProjectComponentDtoList.splice(idx,1);
        };
        $scope.delTool=function(idx){
            var gleanProjectToolDtoList = $scope.gleanProjectInfoDto.gleanProjectToolDtoList;
            gleanProjectToolDtoList.splice(idx,1);
        };
        $scope.delFramework=function(idx){
        	$scope.gleanProjectInfoDto.gleanFrameworkInfoDto=null;
            $scope.addFrameworkLayer=false;
        };
        $scope.changeComponent=function(parentIdx,idx){
        	var theCurComponent=$scope.allComponents[parentIdx];
        	var theCurVersion=theCurComponent.geComponentInfoListDtos[idx];
        	
        	var tempComponentDto=null;
        	for(var tempPos=0;tempPos<$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.length;tempPos++){
        		if($scope.gleanProjectInfoDto.gleanProjectComponentDtoList[tempPos].componentListId==theCurVersion.id){
        			tempComponentDto=tempPos;
        		}
        	}
        	if(tempComponentDto==null){
        		var newComponentDto={
        			componentId:theCurVersion.componentId,
            		componentListId:theCurVersion.id,
            		componentName:theCurComponent.name,
            		componentVersion:theCurVersion.version
            	}
        		$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.push(newComponentDto);
        	}else{
        		$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.splice(tempComponentDto,1);
        		console.log($scope.gleanProjectInfoDto.gleanProjectComponentDtoList);
        	}
        	$scope.changeComponentsSelected();
        };
        
        $scope.changeComponentForFramework=function(parentIdx,idx){
        	var theCurComponent=$scope.allComponentsForFramework[parentIdx];
        	var theCurVersion=theCurComponent.geComponentInfoListDtos[idx];
        	
        	var tempComponentDto=null;
        	for(var tempPos=0;tempPos<$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.length;tempPos++){
        		if($scope.gleanProjectInfoDto.gleanProjectComponentDtoList[tempPos].componentListId==theCurVersion.id){
        			tempComponentDto=tempPos;
        		}
        	}
        	if(tempComponentDto==null){
        		var newComponentDto={
        			componentId:theCurVersion.componentId,
            		componentListId:theCurVersion.id,
            		componentName:theCurComponent.name,
            		componentVersion:theCurVersion.version
            	}
        		$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.push(newComponentDto);
        	}else{
        		$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.splice(tempComponentDto,1);
        		console.log($scope.gleanProjectInfoDto.gleanProjectComponentDtoList);
        	}
        	$scope.changeComponentsSelectedForFramework();
        };
        $scope.changeTool=function(parentIdx,idx){
        	var theCurTool=$scope.allTools[parentIdx];
        	var theCurVersion=theCurTool.geToolsInfoListDtos[idx];
        	
        	var tempToolDto=null;
        	for(var tempPos=0;tempPos<$scope.gleanProjectInfoDto.gleanProjectToolDtoList.length;tempPos++){
        		if($scope.gleanProjectInfoDto.gleanProjectToolDtoList[tempPos].toolListId==theCurVersion.id){
        			tempToolDto=tempPos;
        		}
        	}
        	if(tempToolDto==null){
        		var newToolDto={
        			toolId:theCurVersion.toolsId,
            		toolListId:theCurVersion.id,
            		toolName:theCurTool.toolName,
            		toolVersion:theCurVersion.version
            	}
        		$scope.gleanProjectInfoDto.gleanProjectToolDtoList.push(newToolDto);
        	}else{
        		$scope.gleanProjectInfoDto.gleanProjectToolDtoList.splice(tempToolDto,1);
        	}
        	$scope.changeToolsSelected();
        };
        
        $scope.changeFramework=function(parentIdx,idx){
        	$scope.gleanProjectInfoDto.gleanFrameworkInfoDto=$scope.allFrameworks[parentIdx];
        	$scope.addFrameworkLayer=false;
//        	$scope.addLayerForFramework=true;
        };
        $scope.changeComponentsSelected=function(){
        	for(var curPos=0;curPos<$scope.allComponents.length;curPos++){
				for(var nextPos=0;nextPos<$scope.allComponents[curPos].geComponentInfoListDtos.length;nextPos++){
					$scope.allComponents[curPos].geComponentInfoListDtos[nextPos].isSelected=$scope.isComponentSelected
						($scope.allComponents[curPos].id, $scope.allComponents[curPos].geComponentInfoListDtos[nextPos].id);
				}
        	}
        }
        $scope.changeComponentsSelectedForFramework=function(){
        	for(var curPos=0;curPos<$scope.allComponentsForFramework.length;curPos++){
				for(var nextPos=0;nextPos<$scope.allComponentsForFramework[curPos].geComponentInfoListDtos.length;nextPos++){
					$scope.allComponentsForFramework[curPos].geComponentInfoListDtos[nextPos].isSelected=$scope.isComponentSelected
						($scope.allComponentsForFramework[curPos].id, $scope.allComponentsForFramework[curPos].geComponentInfoListDtos[nextPos].id);
				}
        	}
        }
        $scope.changeToolsSelected=function(){
        	for(var curPos=0;curPos<$scope.allTools.length;curPos++){
				for(var nextPos=0;nextPos<$scope.allTools[curPos].geToolsInfoListDtos.length;nextPos++){
					$scope.allTools[curPos].geToolsInfoListDtos[nextPos].isSelected=$scope.isToolSelected
						($scope.allTools[curPos].id, $scope.allTools[curPos].geToolsInfoListDtos[nextPos].id);
				}
        	}
        }
        $scope.isComponentSelected=function(componentId,componentListId){
        	for(var curPos=0;curPos<$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.length;curPos++){
        		if($scope.gleanProjectInfoDto.gleanProjectComponentDtoList[curPos].componentId==componentId&&$scope.gleanProjectInfoDto.gleanProjectComponentDtoList[curPos].componentListId==componentListId){
        			return true;
        		}
        	}
        	return false;
        }
        $scope.isToolSelected=function(toolId,toolListId){
        	for(var curPos=0;curPos<$scope.gleanProjectInfoDto.gleanProjectToolDtoList.length;curPos++){
        		if($scope.gleanProjectInfoDto.gleanProjectToolDtoList[curPos].toolId==toolId&&$scope.gleanProjectInfoDto.gleanProjectToolDtoList[curPos].toolListId==toolListId){
        			return true;
        		}
        	}
        	return false;
        }
        $scope.getComponentVersionList = function(obj) {
            console.log("选择下拉框后的数据"+obj.gleanProjectComponentDto.componentId);
            componentVersionList(obj);
        };

        var componentVersionList = function (obj) {
            var condition = {componentId:obj.gleanProjectComponentDto.componentId};
            projectServ.getComponentVersionList(condition).then(
                function(answer) {
                    obj.componentVersionList = answer.data;
                }, function (error) {
                    $scope.componentVersionList = [];
                })
        };
        $scope.getToolVersionList = function(obj) {
            toolVersionList(obj);
        };

        var toolVersionList = function (obj) {
            var condition = {toolId:obj.gleanProjectToolDto.toolId};
            projectServ.getToolVersionList(condition).then(
                function(answer) {
                    obj.toolVersionList = answer.data;
                }, function (error) {
                    $scope.toolVersionList = [];
                })
        };
        
        $scope.exit = function() {
            $state.go("main.gleanProjectPage");
        };

        $scope.closeLayer = function() {
        	if( $scope.tip== "tip_2"){
        		 $scope.projectAlertLayer = true;
        	}else{
        		$state.go("main.gleanProjectPage");
        	}
        };

        //赋值
        if(gleanProjectInfoId!='') {
            projectServ.queryProjectById(gleanProjectInfoId).then(
                function(answer){
                    $scope.gleanProjectInfoDto = answer.data;
                }/*,
                 function(error) {
                 $scope.message="获取信息失败";
                 $scope.tip = "tip_2";
                 $scope.projectAlertLayer = false;
                 $scope.projectSaveDisableFlag = false;
                 }*/);
        }else {
            $scope.gleanProjectInfoDto={
                gleanProjectComponentDtoList:[],
            	gleanProjectToolDtoList:[],
            	gleanFrameworkInfoDto:{
            		gleanFrameworkComponentDtos:[]
            	}
            };
        }
        $scope.checkComponents =function(){
        	for(var pos=0;pos<$scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.length;pos++){
        		if($scope.getComponentById($scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[pos].componentId)){
        			continue;
        		}
        		return $scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[pos].componentName;
        	}
        	return null;
        }
        $scope.getComponentById =function(id){
        	for(var pop=0;pop<$scope.gleanProjectInfoDto.gleanProjectComponentDtoList.length;pop++){
        		if($scope.gleanProjectInfoDto.gleanProjectComponentDtoList[pop].componentId==id){
        			return true;
        		}
        	}
        	return false;
        }
        $scope.projectSave = function() {
            //检测ng-pattern是否合理 不合理则定位到相应位置
            var gleanProjectInfoDto = $scope.gleanProjectInfoDto;
            console.log($scope.gleanProjectInfoDto.delGleanProjectComponentDtoIds);
            gleanProjectInfoDto.codeType = "sysType";
            if (this.projectSaveForm.$invalid) {
                FormFocus.focusEle("projectSaveForm");
                return;
            }
            //检查框架是否合法
           /* var result=$scope.checkComponents();
            if(result!=null){
            	 $scope.message ="请选择"+result+"框架组件的版本";
                 $scope.tip = "tip_2";
                 $scope.projectAlertLayer = false;
                 return ;
            }*/
            if($scope.gleanProjectInfoDto.id == undefined) {
                save(gleanProjectInfoDto);
            }else {
                update(gleanProjectInfoDto);
            }
        };

        var save = function(gleanProjectInfoDto){
            $scope.projectSaveDisableFlag = true;
            projectServ.save(gleanProjectInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        $scope.message ="\""+gleanProjectInfoDto.projectName+"\"保存成功";
                        $scope.tip = "tip_1";
                        $scope.projectAlertLayer = false;
                    }else{
                        $scope.message = projectSaveData.resultMsg;
                        $scope.tip = "tip_2";
                        $scope.projectAlertLayer = false;
                        $scope.projectSaveDisableFlag = false;
                    }
                },
                function(error) {
                    $scope.message=JSON.stringify(error.data);
                    $scope.tip = "tip_2";
                    $scope.projectAlertLayer = false;
                    $scope.projectSaveDisableFlag = false;
                })
        };

        var update = function(gleanProjectInfoDto){
            projectServ.update(gleanProjectInfoDto).then(
                function(answer){
                    if(answer.data=="1"){
                        //更新成功
                        $scope.message ="\""+gleanProjectInfoDto.projectName+"\"修改成功";
                        $scope.tip = "tip_1";
                        $scope.projectAlertLayer = false;
                    }else if(answer.data=="3"){
                        $scope.message="权限不足更新失败";
                        $scope.tip = "tip_2";
                        $scope.projectAlertLayer = false;
                    }else{
                        $scope.message=answer.data;
                        $scope.tip = "tip_2";
                        $scope.projectAlertLayer = false;
                    }
                },
                function(error){
                    $scope.message=error.data.resultMsg;
                    $scope.tip = "tip_2";
                    $scope.projectAlertLayer = false;
                })
        };
        
        
        
        
        var getComponentsVersionList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanComponentCondition.pageNo = $scope.paginationConfComponents.currentPage;
            $scope.gleanComponentCondition.pageSize=$scope.paginationConfComponents.itemsPerPage;
            var gleanComponentCondition = $scope.gleanComponentCondition;
            gleanComponentCondition.codeType = "sysType";
            projectServ.queryComponentsPage(gleanComponentCondition).then(
                function(answer){
                    $scope.paginationConfComponents.totalItems = answer.data.totalCount;
                    $scope.allComponents=answer.data.list;
                    $scope.changeComponentsSelected();
                },function(error){
                    //cconsole.log(JSON.stringify(error.data));
                }
            );
        };
        var getToolsVersionList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanToolCondition.pageNo = $scope.paginationConfTools.currentPage;
            $scope.gleanToolCondition.pageSize=$scope.paginationConfTools.itemsPerPage;
            var gleanToolCondition = $scope.gleanToolCondition;
            gleanToolCondition.codeType = "sysType";
            projectServ.queryToolsPage(gleanToolCondition).then(
                function(answer){
                    $scope.paginationConfTools.totalItems = answer.data.totalCount;
                    $scope.allTools=answer.data.list;
                    $scope.changeToolsSelected();
                },function(error){
                    //cconsole.log(JSON.stringify(error.data));
                }
            );
        };
        var getFrameworkList = function(){
            $scope.col=['-versionNo','salesLimit'];
            $scope.gleanFrameworkCondition.pageNo = $scope.paginationConfFrameworks.currentPage;
            $scope.gleanFrameworkCondition.pageSize=$scope.paginationConfFrameworks.itemsPerPage;
            var gleanFrameworkCondition = $scope.gleanFrameworkCondition;
            gleanFrameworkCondition.codeType = "sysType";
            projectServ.queryFrameworksPage(gleanFrameworkCondition).then(
                function(answer){
                    $scope.paginationConfFrameworks.totalItems = answer.data.totalCount;
                    $scope.allFrameworks=answer.data.list;
                },function(error){
                    //cconsole.log(JSON.stringify(error.data));
                }
            );
        };
        var initComponentPage = function(){
           
            $scope.gleanComponentCondition = {
                name:"",
                pageNo: $scope.paginationConfComponents.currentPage,
                pageSize: $scope.paginationConfComponents.itemsPerPage
            };
            $scope.$watch('paginationConfComponents.currentPage + paginationConfComponents.itemsPerPage', getComponentsVersionList);
        };
        $scope.searchComponent=function(){
        	getComponentsVersionList();
        }
        $scope.searchTool=function(){
        	getToolsVersionList();
        }
        var initToolPage = function(){
            
            $scope.gleanToolCondition = {
                pageNo: $scope.paginationConfTools.currentPage,
                pageSize: $scope.paginationConfTools.itemsPerPage
            };
            $scope.$watch('paginationConfTools.currentPage + paginationConfTools.itemsPerPage', getToolsVersionList);
        };
        
        var initFrameworkPage = function(){
            
            $scope.gleanFrameworkCondition = {
                pageNo: $scope.paginationConfFrameworks.currentPage,
                pageSize: $scope.paginationConfFrameworks.itemsPerPage
            };
            $scope.$watch('paginationConfFrameworks.currentPage + paginationConfFrameworks.itemsPerPage', getFrameworkList);
        };
        $scope.choseframework=function(index){
        	$scope.gleanProjectInfoDto.gleanFrameworkInfoDto=$scope.allFrameworks[index];
       	 	$scope.addFrameworkLayer=false;
       	 	$scope.addLayerForFramework=true;
       	 	var names="";
       	 	for(var pos=0;;pos++){
       	 		names+=$scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos[pos].componentName;
       	 		if(pos==$scope.gleanProjectInfoDto.gleanFrameworkInfoDto.gleanFrameworkComponentDtos.length-1){
       	 			break;
       	 		}
       	 		names+=",";
       	 	}
       	 	var gleanComponentCondition={
       	 		name:names	
       	 	};
       	 	projectServ.allComponentsForFramework(gleanComponentCondition).then(
                    function(answer){
                        $scope.paginationConfComponents.totalItems = answer.data.totalCount;
                        $scope.allComponentsForFramework=answer.data;
                        $scope.changeComponentsSelectedForFramework();
                    },function(error){
                        //cconsole.log(JSON.stringify(error.data));
                    }
                );
        }
    };


    moduleApp.controller('projectEditCtrl',['$scope','$state','$stateParams','projectServ','FormFocus',projectEditCtrlFunc]);

});