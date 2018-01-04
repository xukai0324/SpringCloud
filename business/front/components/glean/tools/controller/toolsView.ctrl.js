/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanToolsViewCtrlFunc = function ($scope,$state,ApiPath,gleanToolsServ,$stateParams) {
      console.log('gleanToolsViewCtrl view ctrl ......' );
      var toolsId= $stateParams.toolsId;
      console.log('----1----');
      if(toolsId != ''){
          console.log('----2----');
          gleanToolsServ.getToolsById(toolsId).then(function (answer) {
              console.log('view success');
              console.log(answer);
              $scope.tools=answer.data;
          });
          console.log('----3----');
      }
        console.log('----4----');
      $scope.exit = function () {
          console.log('view exit . .. . ');
          $state.go('main.toolsPage');
      }
      console.log('----5----');
    };

    moduleApp.controller('toolsViewCtrl',["$scope","$state","ApiPath","gleanToolsServ",'$stateParams',gleanToolsViewCtrlFunc]);
});