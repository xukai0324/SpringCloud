/* Created by sunfm on 2017/6/6. */
define(['../module'],function(moduleApp) {
    'use strict';

    var techrepoEditCtrlFunc = function ($scope,$state,ApiPath,techrepoServ,$stateParams,FormFocus) {
        console.log('init techrepoEdit.ctrl.js');
        var techrepoId=$stateParams.techrepoId;
        if(techrepoId!=''){
           techrepoServ.getTechrepoById(techrepoId).then(
                function (answer) {
                    console.log(answer.data);
                    $scope.techrepo = answer.data;
                }
           )
        }
        $scope.alertLayer = true;
        $scope.updatetechrepoDisableFlag = false;
        $scope.exit = function () {
           $state.go('main.techrepoPage');
        };

       $scope.closeLayer = function () {
           console.log('closeLayer function . ');
           $state.go('main.techrepoPage');
        };

       $scope.saveTechrepo = function () {
           if (this.techrepoEditFrom.$invalid) {
               FormFocus.focusEle("techrepoEditFrom");
               return;
           }
           console.log('savetechrepo function .');
           $scope.updatetechrepoDisableFlag = true;
           techrepoServ.saveTechrepo($scope.techrepo).then(
               function (answer) {
                   console.log("保存techrepo，返回信息为",answer.data);
                   if(answer.data == '1'){
                       console.log('保存成功');
                       $scope.message = '保存成功-techrepo';
                       $scope.tip = "tip_1";
                       $scope.alertLayer  = false;
                      // console.log();
                   }else{
                       console.log('保存失败');
                       $scope.message = "保存失败，请稍后重试 - techrepo";
                       $scope.tip = 'tip_2';
                       $scope.alertLayer = false;
                       $scope.updatetechrepoDisableFlag = false;
                   }

               },function (error) {
                   $scope.message = JSON.stringify(error.data);
                   $scope.tip = 'tip_2';
                   $scope.alertLayer = false;
                   $scope.updatetechrepoDisableFlag = false;
                   console.log('出现错误');
               }
           );
           $scope.exit = function () {
               console.log('exit function .');
               $state.go('main.techrepoPage');
           };
        }

        $scope.updateTechrepo = function () {
            if (this.techrepoEditFrom.$invalid) {
                FormFocus.focusEle("techrepoEditFrom");
                return;
            }
            console.log('updateTechrepo function .');
            $scope.updatetechrepoDisableFlag = true;
            techrepoServ.updateTechrepoById($scope.techrepo).then(
                function (answer) {
                    console.log("修改techrepo，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-techrepo';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - techrepo";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                        $scope.updatetechrepoDisableFlag = false;
                    }

                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                    $scope.updatetechrepoDisableFlag = false;
                    console.log('出现错误');
                }
            );
            $scope.exit = function () {
                console.log('exit function .');
                $state.go('main.techrepoPage');
            };
        }
    };

    moduleApp.controller('techrepoEditCtrl',["$scope","$state","ApiPath","techrepoServ",'$stateParams','FormFocus',techrepoEditCtrlFunc]);
});
