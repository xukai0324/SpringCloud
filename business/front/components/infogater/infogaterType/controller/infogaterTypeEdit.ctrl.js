/**
 * Created by Administrator on 2017/4/13.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var infogaterTypeEditFunc = function($scope,$state,ApiPath,infogaterTypeServ,$stateParams) {
        var infogaterTypeId = $stateParams.infogaterTypeId;
        $scope.codeType = infogaterTypeId;
        if(infogaterTypeId!='') {
            infogaterTypeServ.getInfogaterTypeById(infogaterTypeId).then(
                function(answer) {
                    console.log(answer.data);
                    $scope.infogaterType = answer.data;
                })
        }
        $scope.alertLayer = true;

        $scope.exit = function() {
            $state.go("main.infogaterTypePage");
        };

        $scope.closeLayer = function() {
            $state.go("main.infogaterTypePage");
        };

        $scope.updateInfogaterType = function () {
            console.log('updateInfogaterType function .');
            $scope.saveDisableFlag = true;
            var infogaterType = $scope.infogaterType;
            infogaterType.codeType = $scope.codeType;
            infogaterTypeServ.updateInfogaterTypeById(infogaterType).then(
                function (answer) {
                    console.log("InfogaterType，返回信息为",answer.data);
                    if(answer.data == '1'){
                        console.log('修改成功');
                        $scope.message = '修改成功-InfogaterType';
                        $scope.tip = "tip_1";
                        $scope.alertLayer  = false;
                        // console.log();
                    }else{
                        console.log('修改失败');
                        $scope.message = "修改失败，请稍后重试 - InfogaterType";
                        $scope.tip = 'tip_2';
                        $scope.alertLayer = false;
                    }

                },function (error) {
                    $scope.message = JSON.stringify(error.data);
                    $scope.tip = 'tip_2';
                    $scope.alertLayer = false;
                    console.log('出现错误');
                }
            );
        }
    };

    moduleApp.controller('infogaterTypeEditCtrl',["$scope","$state","ApiPath","infogaterTypeServ",'$stateParams',infogaterTypeEditFunc]);
});