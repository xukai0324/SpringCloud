/**
 * Created by MaWenzheng
 * 组件标签选择框
 */
define(['angular'],
    function(angular) {
        'use strict';
        angular.module('sino.sinoSelectDraw',[])
            .factory('QuerySelectDrawCode',['$q','$http','ApiPath',function($q,$http,ApiPath){
                return {
                    //获取接口数据
                    getData: function (conditions) {
                        var deferred = $q.defer();
                        var urlGetData = ApiPath.api.selectDraw; //"/gscore-pa-web/commonSelect/initSelectTag";
                        var promise = $http({
                            method: 'POST',
                            url: urlGetData,
                            data: conditions
                        });
                        promise.then(
                            //通讯成功
                            function (answer) {
                                console.log(answer);
                                answer.status = true;
                                deferred.resolve(answer);
                            },
                            //通讯失败
                            function (error) {
                                error.status = false;
                                deferred.reject(error);
                            });
                        return deferred.promise;
                    },
                    getDataMock: function (conditions) {
                        var deferred = $q.defer();
                        var url='';
                        // console.log(conditions);
                        if(conditions.drawType=='componentNameId'){
                            url="mock/data/selectDrawNameCode.js";
                        }else if(conditions.drawType=='versionId'){
                            url="mock/data/selectDrawVersionCode.js";
                        }else{
                            console.log('-----真尴尬-----')
                        }

                        var promise = $http({
                            method: 'GET',
                            url: url
                        });
                        promise.then(
                            //通讯成功
                            function (answer) {
                                if(conditions.drawType=='componentNameId'){
                                    answer.data=[{
                                        'codeCode': '1',
                                        'codeName': '大版本',
                                        'child': 'true',
                                        'childList': [{
                                            'codeCode': '11',
                                            'codeName': '版本',
                                            'child': 'true',
                                            'childList': [{
                                                'codeCode': '111',
                                                'codeName': 'A',
                                                'child': 'false'}
                                                ]
                                        }]
                                    }];
                                }else if(conditions.drawType=='versionId'){
                                   answer.data=[{
                                       'codeCode': '1',
                                       'codeName': '大版本',
                                       'child': 'true',
                                       'childList': [{
                                           'codeCode': '11',
                                           'codeName': '版本',
                                           'child': 'true',
                                           'childList':[{
                                               'codeCode': '111',
                                               'codeName': 'A',
                                               'child': 'true',
                                               'childList':[
                                                   {'codeCode': '11111',
                                                   'codeName': 'A',
                                                   'child': 'false'}
                                                   ]
                                           }
                                           ]
                                       }]
                                   }];
                                }else{
                                    console.log('-----真尴尬-----')
                                }
                                deferred.resolve(answer);
                            },
                            //通讯失败
                            function (error) {
                                error.status = false;
                                deferred.reject(error);
                            });

                        return deferred.promise;
                    }
                };
            }])
            .directive('selectDraw', ['$compile','$timeout', '$rootScope','QuerySelectDrawCode',
              function ($compile,$timeout, $rootScope,QuerySelectDrawCode) {
            	var setSelectStatus=function(theSelectList,code){
            		if(theSelectList == undefined||theSelectList ==null||theSelectList.length==0){
            			return ;
            		}
                	for(var i=0;i<theSelectList.length;i++){
                		if(theSelectList[i].codeCode==code.codeCode){
                			
                			theSelectList[i]._selected=true;
                		}
                		setSelectStatus(theSelectList[i].codeChilds,code);
                	}
                }
            	var checkSelected=function (array, obj) {
                     var reback=true;
                     for(var i=0 ; i<array.length;i++){
                        if(array[i].codeCode==obj.codeCode){
                            array.splice(i,1);//删除当前数据
                            reback=false;
                            break;
                        }
                     }
                     return reback;
                 }
                return {
                    require: '^ngModel',
                    restrict: 'E',
                    priority: 520,
                    scope: {
                        riskCode:'=',
                        relationCode:'=',
                        ngDisabled: '=',
                        baseCode:"=",
                        upperCode:"@",
                        ngModel: '=',
                        drawType:'@',
                        onSelect: '&',
                        onReady: '&',
                        selectDrawMenus:'=',
                        isFuzzy:'=',
                        child:'=',
                        drawShow:'@'
                    },
                    template:
                    '<div class="form-control_inner">' +
                        '<ul class="selectDraw" ng-show="drawShow">' +
                            '<li ng-repeat="code in codeList">' +
                                '<a href="" ng-bind="code.codeName" ng-click="selectCode(this)"></a>' +
                                '<ul ng-if="code.codeChilds.length>0">' +
                                    '<li ng-repeat="code in code.codeChilds">' +
                                        '<a href="" ng-bind="code.codeName" <!--ng-click="selectCode(this)"-->></a>' +
                                        '<ul ng-if="code.codeChilds.length>0" >' +
                                            '<li>' +
                                                '<div class="selectDrawContent">' +
                                                    '<div  class="selectDraw_child" ng-class="{selectDraw_child_selected:code._selected}"  ng-repeat="code in code.codeChilds" ng-bind="code.codeName" ng-click="selectCode(this)"></div>' +
                                                '</div>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</li>' +
                                '</ul>' +
                            '</li>' +
                        '</ul>' +
                    '<div  ng-show="false"><input type="text" ng-model="ngModel"/></div>&nbsp;&nbsp;&nbsp;' +
                    /*'<div class="selectDrawData"><input type="text" ng-model="ngModel" width="100%" ng-readonly="true" placeholder="请选择..."/></div>' +*/

                    '<span ng-repeat="gleanComponentLabelListDto in ngModel">'+
                    '<label>{{gleanComponentLabelListDto.codeName}}&nbsp;&nbsp; </label>'+
                    '</span>'+
                    '</div>',
                    compile:function() {
                        return function (scope, element, attrs, ngCtrl) {
                            scope.codeList = [];
                            var queryData=function () {
                                    var conditions={'codeType':scope.drawType};
                                    var promise=QuerySelectDrawCode.getData(conditions);
                                    promise.then(function (answer) {
                                        var datatmp=answer.data;
                                        var dataArray="[{"+
                                            "'codeCode': 'root',"+
                                            "'codeName': '标签',"+
                                            "'child': 'true',"+
                                                "'codeChilds': " +JSON.stringify(datatmp)+
                                            "}]";
                                        var finaldata=eval('('+dataArray+')')
                                        console.log(finaldata);
                                        //begin to fix the bug of tag review
                                        if(scope.ngModel!= undefined){
	                                        for(var theCurPos=0;theCurPos<scope.ngModel.length;theCurPos++){
	                                        	 var tmp={'codeCode':scope.ngModel[theCurPos].codeCode,'codeName':scope.ngModel[theCurPos].codeName};
	                                        	 if(scope.strs==undefined){
	                                                 scope.strs=[tmp];
	                                             }else{
	                                                 if(checkSelected(scope.strs,tmp)){
	                                                     scope.strs.push(tmp);
	                                                 }
	                                             }
	                                        	setSelectStatus(finaldata[0].codeChilds,scope.ngModel[theCurPos]);
	                                        }
                                        }
                                        //end fix the bug of tag review
                                        scope.codeList=finaldata;
                                        // scope.codeList=answer.data;
                                    },function (error) {
                                        console.log(error);
                                    });
                            }
                            queryData();
                        }
                    },
                    controller:function ($scope,$element) {
                        /**
                         * 返回true，说明未选中
                         * 返回false，说明以选中
                         * @param array
                         * @param obj
                         */
                        var checkSelected=function (array, obj) {
                            var reback=true;
                            for(var i=0 ; i<array.length;i++){
                               if(array[i].codeCode==obj.codeCode){
                                   array.splice(i,1);//删除当前数据
                                   reback=false;
                                   break;
                               }
                            }
                            return reback;
                        }
                         /**
                         * 点击事件
                         * @param para
                         */
                        $scope.selectCode = function(para){
                            if(para.code.codeCode=='root')
                                return;
                            para.code._selected=!para.code._selected;
                            /////////拼值///////////////////////////////
                            var tmp={'codeCode':para.code.codeCode,'codeName':para.code.codeName};
                            if($scope.strs==undefined){
                                $scope.strs=[tmp];
                            }else{
                                if(checkSelected($scope.strs,tmp)){
                                    $scope.strs.push(tmp);
                                }
                            }
                            $scope.ngModel=$scope.strs;
                        }
                    }
                }
            }])
    });