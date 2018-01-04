/**
 * Created by ZhangJiansen on 2016/9/19.
 */
define(['app','uiRouter'], function (app) {
    'use strict';
    app.controller('navigationCtrl', ['$rootScope','$scope','$state','eventBus','menuServ',
        function($rootScope,$scope, $state,eventBus,menuServ) {

            function navChange(toState){
                var title = menuServ.getMenuName(toState);
                if(title != null && title != ""){
                    $scope.state = toState;
                    $scope.title = title;
                }
            }

            $scope.$on('$stateChangeSuccess', function(event, toState) {
                var stateName = $state.$current.self.name;
                if (angular.isDefined(stateName)) {
                    navChange(stateName);
                }
            });

            $scope.state = "main.index";
            $scope.title = "首页";
        }]);
});