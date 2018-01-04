/**
 * Created by MaWenzheng on 2017/5/2.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var gleanComponentViewCtrlFunc = function ($scope,$state,ApiPath,gleanComponentServ,$stateParams) {
      // console.log('gleanComponentViewCtrl view ctrl ......' );
      var componentId= $stateParams.componentId;
      if(componentId != ''){
          gleanComponentServ.getComponentById(componentId).then(function (answer) {
              // console.log('view success ..');
              // console.log(answer.data);
              /*var labelStr='';
              for(var i=0;i<answer.data.labelList.length;i++){
                  labelStr+=answer.data.labelList[i].name+',';
              }
              answer.data.labelList=labelStr.substr(0,labelStr.length-1);*/
              console.log('============================================');
              console.log(answer);
              $scope.component=answer.data;
          });
      }
      $scope.exit = function () {
          // console.log('view exit . .. . ');
          $state.go('main.componentPage');
      }
    };

    moduleApp.controller('componentViewCtrl',["$scope","$state","ApiPath","gleanComponentServ",'$stateParams',gleanComponentViewCtrlFunc]);
});