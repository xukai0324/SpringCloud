/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var demandReleaseViewCtrlFunc = function ($scope,$state,ApiPath,demandReleaseServ,$stateParams) {
      console.log('demandReleaseViewCtrl view ctrl ......' );
      var demandId= $stateParams.demandId;
      if(demandId != ''){
          demandReleaseServ.getDemandById(demandId).then(function (answer) {
              console.log('view success ..');
              console.log(answer.data);
              $scope.demand=answer.data;
          });
      }
      $scope.exit = function () {
          console.log('view exit . .. . ');
          $state.go('main.demandPage');
      }
    };

    moduleApp.controller('demandReleaseViewCtrl',["$scope","$state","ApiPath","demandReleaseServ",'$stateParams',demandReleaseViewCtrlFunc]);
});