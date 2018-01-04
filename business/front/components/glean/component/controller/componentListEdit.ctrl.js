/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentEditCtrlFunc = function ($scope,$state,ApiPath,gleanComponentListServ,gleanComponentServ,$stateParams,FormFocus) {
        var master=[];
        $scope.isAdd=true;
        $scope.versionPattern="/^[0-9a-zA-Z\\.]{0,20}$/";
        gleanComponentServ.getComponentById($stateParams.masterId).then(function (answer) {
            master=answer.data;
            $scope.componentName=master.name;
        });
        if($stateParams.id!=''){
            gleanComponentListServ.getComponentById($stateParams.id).then(
                function (answer) {
                    console.log( answer.data);
                    $scope.component = answer.data;
                }
            );
            $scope.isAdd=false;
        }
        $scope.alertLayer = true;
        $scope.exit = function () {
            $state.go('main.componentListPage',{masterId:$stateParams.masterId});
        };

       $scope.closeLayer = function () {
    	   if( $scope.tip == "tip_1"){
    		   $state.go('main.componentListPage',{masterId:$stateParams.masterId});
    	   }
    	   $scope.alertLayer  = true;
        };
        $scope.saveComponent = function () {
        	 if (this.componentListSaveForm.$invalid) {
                 FormFocus.focusEle("componentSaveForm");
                 return;
             }
            $scope.saveDisableFlag = true;
            $scope.component.componentId=master.id;
            console.log($scope.component.componentId);
            $scope.component.name='';
            var component = $scope.component;
            gleanComponentListServ.saveComponent(component).then(
                function (answer) {
                	
                	if(typeof(component.id) != 'undefined' && component.id != ''){
                		 if(answer.data == '1'){
                             $scope.message = '组件版本修改成功';
                             $scope.tip = "tip_1";
                             $scope.alertLayer  = false;
                         }else if(answer.data == '4'){
                         	$scope.message = '版本不允许重复,请填写别的';
                             $scope.tip = "tip_2";
                             $scope.alertLayer  = false;
                         }else{
                             $scope.message = "保存失败，请稍后重试";
                             $scope.tip = 'tip_2';
                             $scope.alertLayer = false;
                         }
                	}else{
                		 if(answer.data == '1'){
                             $scope.message = '组件版本保存成功';
                             $scope.tip = "tip_1";
                             $scope.alertLayer  = false;
                         }else if(answer.data == '4'){
                         	$scope.message = '版本不允许重复,请填写别的';
                             $scope.tip = "tip_2";
                             $scope.alertLayer  = false;
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

    moduleApp.controller('gleanComponentListEditCtrl',["$scope","$state","ApiPath","gleanComponentListServ",'gleanComponentServ','$stateParams','FormFocus',gleanComponentEditCtrlFunc]);
});
