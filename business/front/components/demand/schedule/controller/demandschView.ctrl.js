/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandScheduleViewCtrlFunc = function ($scope,$state,ApiPath,demandScheduleServ,$stateParams) {
      console.log('demandScheduleViewCtrl view ctrl ......' );
      var demandschId= $stateParams.demandschId;
      var id = $stateParams.demandid;
      if(demandschId != ''){
          demandScheduleServ.getDemandschById(demandschId).then(function (answer) {
              console.log('view success ..');
              console.log(answer.data);
              $scope.demandsch=answer.data;
          });
      }
      $scope.exit = function () {
          console.log('view exit . .. . ');
          $state.go('main.demandschPage',{demandid:$scope.demandsch.demandId,demandId:id});
      }
    };

    moduleApp.controller('demandScheduleViewCtrl',["$scope","$state","ApiPath","demandScheduleServ",'$stateParams',demandScheduleViewCtrlFunc]);
});