/* Created by sunfm on 2017/6/6. */
define(['../module'],function(moduleApp) {
    'use strict';

    var techrepoViewCtrlFunc = function ($scope,$state,ApiPath,techrepoServ,$stateParams) {
      var techrepoId= $stateParams.techrepoId;
      // console.log('techrepoViewCtrl view ctrl ......' + techrepoId);
      if(techrepoId != ''){
          techrepoServ.getTechrepoById(techrepoId).then(function (answer) {
              console.table(answer);
              $scope.techrepo=answer.data;
          });
      }
      $scope.exit = function () {
          console.log('view exit . .. . ');
          $state.go('main.techrepoPage');
      }
    };

    moduleApp.controller('techrepoViewCtrl',["$scope","$state","ApiPath","techrepoServ",'$stateParams',techrepoViewCtrlFunc]);
});