/**
 * Created by gaofeng on 2017/5/2.
 */
define(['../module'], function (moduleApp) {
    'use strict';

    console.log("load view");
    var techPersonViewCtrlFunc = function($scope,$state,$stateParams,techPersonServ) {
        $scope.techPersonAlertLayer = true;
        var gleanTechPersonId = $stateParams.id;
        alert(gleanTechPersonId);
        $scope.exit = function() {
            $state.go("main.gleanTechPersonPage");
        };
        $scope.closeLayer = function() {
            $scope.techPersonAlertLayer = true;
        };
        //赋值
        techPersonServ.queryTechPersonById(gleanTechPersonId).then(

            function(answer){
                $scope.gleanTechPersonDto = answer.data;
            }/*,
             function(error) {
             $scope.message="获取信息失败";
             $scope.tip = "tip_2";
             $scope.techPersonAlertLayer = false;
             $scope.techPersonSaveDisableFlag = false;
             }*/);

    };


    moduleApp.controller('techPersonViewCtrl',['$scope','$state','$stateParams','techPersonServ',techPersonViewCtrlFunc]);

});