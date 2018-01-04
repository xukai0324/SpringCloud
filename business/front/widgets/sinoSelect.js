/**
 * Created by ZhangJiansen on 2016/10/6.
 * 下拉框组件
 * @example
 *  <example module="cherry.directive">
 *  <code-type base-code="producerCode" ng-model='proposal.salfInfo.producerCode' ></code-type>
 *  </example>
 */
define(['angular'],
    function(angular) {
        'use strict';
        angular.module('sino.select',[])
            .factory('QuerySelectCode',['$q','$http','ApiPath',function($q,$http,ApiPath){
                return {
                    //获取接口数据
                    getData: function (conditions) {
                        //var conditions = {};
                        //conditions.codeType = codeType;
                        //console.log("****conditions="+JSON.stringify(conditions));
                        var deferred = $q.defer();
                        var urlGetData = ApiPath.api.getDictCode; //"/gscore-pa-web/commonSelect/initSelectTag";
                        var promise = $http({
                            method: 'POST',
                            url: urlGetData,
                            data: conditions
                        });
                        promise.then(
                            //通讯成功
                            function (answer) {
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
                        var promise = $http({
                            method: 'GET',
                            url: "data/selectCode.json"
                        });
                        promise.then(
                            //通讯成功
                            function (answer) {
                                answer.status = true;
                                if(conditions.upperCode == ""){
                                    answer.data = answer.data.province;
                                }else if(conditions.upperCode.charAt(0) == "0"){
                                    answer.data = answer.data.city;
                                }else if(conditions.upperCode.charAt(0) == "1"){
                                    answer.data = answer.data.town;
                                }else{
                                    answer.data = [];
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
            .directive('codeType', ['$compile','$timeout', '$rootScope','QuerySelectCode',function ($compile,$timeout, $rootScope,QuerySelectCode) {
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
                        intypeCode:"@",
                        ngModel: '=',
                        onSelect: '&',
                        onReady: '&',
                        //ngCode: '=',
                        isFuzzy:'='
                        //ngSelect:'='
                    },
                    template:
                    '<ui-select ng-hide="ngDisabled" ng-if="isFuzzy" on-select="selectCode($select.selected)">' +
                    '<ui-select-match style="overflow: hidden"  ng-model="ngModel" allow-clear="true" placeholder="查询或选择...">{{$select.selected.codeName}}</ui-select-match>' +
                    '<ui-select-choices repeat="code.codeCode as code in codeList | filter: $select.search">' +
                    '<span ng-bind="code.codeName"></span> ' +
                    '</ui-select-choices></ui-select> ' +
                    '<input ng-show="ngDisabled" ng-if="isFuzzy" type="text" class="form-control" ng-value="ngModel" ng-disabled="disableReady || ngDisabled">' +



                    '<ui-select ng-hide="ngDisabled" ng-if="!isFuzzy" on-select="selectCode($select.selected)">' +
                    '<ui-select-match  style="overflow: hidden" ng-model="ngModel" allow-clear="true" placeholder="查询或选择..."> {{$select.selected.codeName}}</ui-select-match> ' +
                    '<ui-select-choices repeat="code.codeCode as code in codeList"> ' +
                    '<span ng-bind="code.codeName"></span> ' +
                    '</ui-select-choices> </ui-select> ' +
                    '<input ng-show="ngDisabled" ng-if="!isFuzzy" type="text" class="form-control" ng-value="ngModel" ng-disabled="disableReady || ngDisabled">',
                    compile:function() {
                        return function (scope, element, attrs, ngCtrl) {
                            scope.codeList = [];
                            scope.baseCode = attrs.baseCode;
                            scope.upperCode = attrs.upperCode;
                            //scope.modalValue = '';
                            //scope.disableReady = false;
                            if(attrs.baseCode == "upperCodeType"){
                                scope.baseCode = attrs.intypeCode;
                                console.log("select scope.baseCode="+scope.baseCode);
                            }

                            var queryData = function(){
                                var condition = {codeType:scope.baseCode};
                                if(angular.isDefined(scope.upperCode) && scope.upperCode.length > 0){
                                    condition.upperCode = scope.upperCode;
                                    console.log("condition.upperCode="+condition.upperCode);
                                }

                                if(angular.isDefined($rootScope.riskCode) && $rootScope.riskCode.length > 0){
                                    condition.riskCode = $rootScope.riskCode;
                                    console.log("condition.riskCode="+condition.riskCode);
                                }

                                var promise = QuerySelectCode.getData(condition);
                                promise.then(
                                    function (answer) {
                                        scope.codeList = answer.data.codeData;
                                        if(angular.isFunction(scope.onReady)){
                                            scope.onReady();
                                        }
                                    }, function (error) {
                                        scope.codeList = [];
                                        //console.log(error.data);
                                    }
                                );

                                return promise;
                            };

                            queryData();
                        }
                    },
                    controller:function ($scope, $element, $attrs) {
                        $scope.selectCode = function(item){
                            if(angular.isFunction($scope.onSelect)){
                                $scope.onSelect({item:item});
                            }
                        };

                    }
                }
            }])
    });