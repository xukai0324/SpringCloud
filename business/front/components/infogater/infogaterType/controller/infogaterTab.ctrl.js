/**
 * Created by zhoujianlong on 2016/9/28.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var infogaterTabFunc = function($scope){

        //初始化界面
        var initFunc = function(){
            /*tab切换响应方法*/
            $scope.infogaterInfoTab = function(){
                $scope.curActive='Info';
                $scope.infogaterTabInclude = 'components/infogater/infogaterInfo/tpl/infogaterInfoPage.html';
                //$state.go('main.infogaterInfoPage');
            };
            $scope.infogaterTypeTab=function(){
                $scope.curActive='Type';
                $scope.infogaterTabInclude = 'components/infogater/infogaterType/tpl/infogaterTypePage.html';
                //$state.go('main.infogaterTypePage');
            };
        };
        initFunc();

        //$scope.curActive='Info';
        //$scope.infogaterTabInclude = 'components/infogater/infogaterInfo/tpl/infogaterInfoPage.html';
        //$state.go("main.infogaterTypePage");


        /**提示框相关方法**/
        $scope.alert=function(opt){
            $scope.showAlertMsg=opt.msg;
            $scope.showAlertOneLayer=true;
        }
        $scope.showAlertOnlyOneClose =function(){
            $scope.showAlertOneLayer=false;
        }
    }

    moduleApp.controller( 'infogaterTabCtrl',["$scope",infogaterTabFunc]);
});
