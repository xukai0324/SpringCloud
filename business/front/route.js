/**
 * Created by ZhangJiansen on 2016/9/10.
 * Angular 路由控制
 * 只有主框架的模块才可以在此文件中引入，业务模块请在components/business.mod中定义依赖
 */
define(['app',
    'frame/index.ctrl',
    'frame/common/prompt/prompt.serv',
    'frame/main/main.ctrl',
    'frame/menu/menu.ctrl',
    'frame/navigation/navigation.ctrl',
    'frame/login/login.ctrl'
    ], function (app) {
    'use strict';

    return app.config(['$urlRouterProvider', '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                /*登录页*/
                .state("login",{
                    url:"/login?msg",
                    templateUrl:"frame/login/login.tpl.html"
                })
                /*登录后框架主页*/
                .state("main",{
                    url:"/main",
                    resolve: {
                        access:function($$user){ return $$user.isAuthenticated()}
                    },
                    templateUrl:"frame/main/main.tpl.html"
                }).state("404",{
                    url:"/404",
                    templateUrl:"frame/exception/tpl/404.tpl.html"
                });
                //$locationProvider.html5Mode(true);
        }]);
});