/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanFrameworkViewCtrlFunc = function ($scope,$state,ApiPath,frameworkServ,$stateParams) {
      console.log('gleanToolsViewCtrl view ctrl ......' );
      var frameworkId= $stateParams.frameworkId;
      if(frameworkId != ''){
          frameworkServ.queryFrameWorkById(frameworkId).then(function (answer) {
              console.log(answer);
              $scope.frameworkDto=answer.data;
          });
      }
      $scope.exit = function () {
          $state.go('main.frameworkPage');
      }
    };

    moduleApp.controller('frameworkViewCtrl',["$scope","$state","ApiPath","frameworkServ",'$stateParams',gleanFrameworkViewCtrlFunc]);
});