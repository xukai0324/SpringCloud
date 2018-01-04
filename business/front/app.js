/**
 * Created by ZhangJiansen on 2016/9/10.
 * Angular入口模块
 */
define([
        'angular',
        'constants',
        'ngCookies',
        'ngAnimate',
        'tmPagination',
        'uiRouter',
        'ocLazyLoad',
        'angular-jeDate',
        'angular-echarts',
        'angular-wordcloud',
        'angular-line',
        'angular-sanitize',
        'angular-file-uplaod',
        'angular-ui-tree',
        'ui-select',
        'uiBootstrap',
        'ngLocalStorage',
        'lightbox',
        'framework',
        'utility',
        'widget',
        //'ueditor.config',
        //'ueditor.all',
        //'angular-ueditor',
        'mock/backend-mocks',//mock模拟机制打开，注释掉即关闭，同时需要注释如下module
        'business'
    ],
    function (angular,constants) {
        'use  strict';
        var app = angular.module('appIndex', [
            'ngCookies',
            'ngAnimate',
            'tm.pagination',
            'ui.router',
            'oc.lazyLoad',
            'ui.router.state',
            'angular-jedate',
            'angular-echarts',
            'angular-wordcloud',
            'angular-line',
            'angularFileUpload',
            'LocalStorageModule',
            'ngSanitize',
            'ui.select',
            'ui.tree',
            'ui.bootstrap',
            'framework',
            'utilities',
            'widgets',
            //'ueditor.config',
            //'ueditor.all',
            //'angular-ueditor',
            'backend-mocks',//mock模拟机制打开，注释掉即关闭，同时需要注释如下module
            'business'
        ]);
        /*初始化总线事件表*/
        app.config(function(eventBusProvider){
            eventBusProvider.setEvent("locationChangeOver");
            eventBusProvider.setEvent("scopeInitOver");
        });

        /*初始化本地存储服务*/
        app.config(['localStorageServiceProvider',function(localStorageServiceProvider){
            localStorageServiceProvider.setPrefix(""); //constants.APP.APP_CODE
        }]);

        app.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service,
                    provider: $provide.provider
                };
            }]);

        //全局遮罩配置
        app.config(['sinoOverlayConfigProvider','$httpProvider', function (sinoOverlayConfigProvider,$httpProvider) {
            sinoOverlayConfigProvider.setDelay(0); //300毫秒以上交互显示遮罩效果
            $httpProvider.interceptors.push('httpInterceptor'); //全局遮罩拦截器
        }]);

        //禁用ie的 ajax request caching
        app.config(['$httpProvider','treeConfig',function($httpProvider,treeConfig){
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            treeConfig.defaultCollapsed = true;     //true折叠，false展开

            // Enables Request.IsAjaxRequest()
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }]);

        app.run(['$state', '$stateParams', '$rootScope','$location','promptServ','menuServ',
            function ($state, $stateParams, $rootScope,$location,promptServ,menuServ) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                /*定义全局的提示方法*/
                var  isAppend =  true;              //isAppend设置true 追加或false不追加
                var  maxDisplay = 4;                 //maxDisplay最大显示条数，值为数字，当为null时，提示信息全部显示
                $rootScope.isFirstOpen = 0;
                var contents = [];
                $rootScope.$on('contents',
                    function(event, toState, toParams, fromState, fromParams,options){
                        contents = [];
                        $rootScope.isFirstOpen = 0;
                    });
                angular.alert=function(msg){
                    // for(var i=0;i<10;i++){       //模拟多次调用弹框测试
                    try{
                        $rootScope.isFirstOpen++;
                        if($rootScope.isFirstOpen == 1){//只有当isFirstOpen为1时，才弹框，否则进行追加
                            contents.push(msg);
                            promptServ.showTipDialog('提示',contents,{},isAppend,maxDisplay);
                        }
                        //通过参数isAppend是否追加，值为true或false；maxDisplay最大显示条数，值为数字
                        else if(!isAppend||(maxDisplay&&contents.length>=maxDisplay)){
                            return;
                        }else{
                            contents.push(msg);
                        }
                    }catch(e){
                        console.error(e);
                    }
                    // }
                };

                /*定义全局的确认提示方法*/
                angular.comfirm=function(msg,options){
                    promptServ.showConfirmDialog('请确认',msg,options);
                };

                /*离开页面时做提示*/
                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams,options){

                        /*if(!menuServ.getMenuByState(toState.name)){
                            console.log("toState=",toState.name);
                            event.preventDefault();
                            angular.alert("您没有访问此功能的权限!");
                            return;
                        }*/

                        /*更换菜单的时候不需要提示*/
                        /*if(menuServ.needAlert(fromState.name,toState.name) && options.leaveAlert!='N')
                        {
                            event.preventDefault();
                            angular.comfirm("确定要离开此页面吗？",{okCallback:function(ok){
                                $state.go(toState.name,toParams,{reload:fromState.name,leaveAlert:'N'});
                            },closeCallback:function(cancel){
                                //do nothing
                            }});
                        }*/
                    });
            }
        ]);
        console.log('app process over');
        return app;
    }
);