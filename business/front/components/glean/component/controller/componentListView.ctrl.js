/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var gleanComponentViewCtrlFunc = function ($scope,$state,ApiPath,gleanComponentListServ,gleanComponentServ,$stateParams) {
      var componentId= $stateParams.componentId;
      var master=[];//主表
      if(componentId != ''){
          gleanComponentServ.getComponentById($stateParams.masterId).then(function (answer) {
              master=answer.data;
              gleanComponentListServ.getComponentById(componentId).then(function (answer) {
                  $scope.component=answer.data;
                  $scope.component.code=master.code;
                  $scope.component.name=master.name;
              });
          })

      }
      $scope.exit = function () {
          $state.go('main.componentListPage',{masterId:$stateParams.masterId});
      }
    };
    moduleApp.controller('componentListViewCtrl',["$scope","$state","ApiPath","gleanComponentListServ","gleanComponentServ",'$stateParams',gleanComponentViewCtrlFunc]);
});