/**
 * http://usejsdoc.org/
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var topQuesFunc = function($scope,$state,ApiPath,tecMapServ) {
        $scope.alertLayer = true;
        $scope.tip = "请注意，组件发布与组件使用并不相同，使用组件可以使用其他团队发布的组件。";
        
        tecMapServ.getTopQues().then(
            function(answer) {
                $scope.topQuesData = answer.data;
            }
        );
        $scope.exit = function() {
           $state.go("main.tecMap");
        }

        $scope.showDetail = function(quesId){
            $state.go('main.quesDetail', {quesId: quesId});
        }
    };

    moduleApp.controller('topQuesCtrl',["$scope","$state","ApiPath","tecMapServ",topQuesFunc]);
});

