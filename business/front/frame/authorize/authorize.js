/**
 * Created by ZhangJiansen on 2016/9/15.
 * 授权服务
 */
define(['angular',
    'constants'
], function (angular,constants) {
   'use strict';
    /**
     * @ngdoc service
     * @name $sino.authorize
     *
     * @description
     * 用户及权限
     *
     */
    angular.module('sino.authorize', [])
        .config(['$httpProvider', function($httpProvider){
            $httpProvider.interceptors.push(['$rootScope','$q','$window','$location','$timeout', function($rootScope, $q, $window,$location,$timeout){
                return {
                    'request': function (req) {
                        req.headers = req.headers || {};
                        $rootScope.currentUser = $rootScope.currentUser || {token:''};
                        req.headers.Authorization = 'Bearer ' + $rootScope.currentUser.token;
                        return req;
                    },
                    'responseError': function(response) {
                        if(response.status === 401) {
                            var redirectUrl = response.headers(constants.HEADERS.AUTH_URL_NAME);
                            if(redirectUrl != null) {
                                console.log("未被授权的操作,准备跳转:"+redirectUrl+ $location.absUrl());
                                $window.location.href = redirectUrl+ $location.absUrl();
                            }else{
                                angular.alert("未被授权的操作");
                            }
                        }else if(response.status === 300) {
                            var redirectUrl = response.headers(constants.HEADERS.REDIRECT_URL_NAME);
                            if(!redirectUrl) {
                                console.log("未提供跳转地址");
                            }else{
                                //此判断为了做版本兼容
                                if(redirectUrl.indexOf("?") > 0){
                                    redirectUrl = redirectUrl+ $location.absUrl() +"&c=0";
                                }
                                //等待本地资源清理
                                $timeout(function(){
                                    $window.location.href = redirectUrl;
                                },500);
                            }
                        }
                        return $q.reject(response);
                    }
                };
            }]);
        }])
        .factory('$$user', ['$rootScope', '$http', '$timeout', '$q', 'localStorageService', '$state','ApiPath',
            function ($rootScope, $http, $timeout, $q, localStorageService, $state, ApiPath) {

                var User = function(){
                    this.userId = '';
                    this.userCode = '';
                    this.userName = '';
                    this.comCode = '';
                    this.roles = [];
                    this.rememberMe = false;
                    this.token = '';
                };

                User.prototype.logout = function(){
                    var _self = this;
                    if(!_self.rememberMe){
                        _self.userCode = _self.comCode = '';
                        _self.userName = '';
                    }
                    _self.token = '';
                    updateUserInLocalStorage(_self);
                    clearCookies();
                    refreshUser(_self);
                    $rootScope.$broadcast(constants.AUTH.UNAUTHORIZED);
                };

                User.prototype.isLogin = function(){
                    return (!this.userCode) ? false : true;
                };

                User.prototype.hasRoles = function(roles){
                    if(typeof(roles)=='string')
                        roles = [roles];
                    var _self = this;

                    if (!this.isLogin()) {
                        $rootScope.$broadcast(constants.AUTH.UNAUTHORIZED);
                        return false;
                    } else {
                        var found = true;
                        $.each(roles, function(index, role){
                            if (_self.roles.indexOf(role) < 0){
                                found = false;
                                return false;
                            }
                        });
                        return found;
                    }
                };

                var clearCookies = function(){
                    console.log("清除cookie:"+localStorageService.cookie.get("SHIESSO"));
                    localStorageService.cookie.clearAll();
                };
                var updateUserInLocalStorage = function (_user) {
                    var _userInLocalStorage = {};
                    _userInLocalStorage.userId = _user.userId;
                    _userInLocalStorage.userCode = _user.userCode;
                    _userInLocalStorage.userName = _user.userName;
                    _userInLocalStorage.comCode = _user.comCode;
                    _userInLocalStorage.roles = _user.roles;
                    _userInLocalStorage.rememberMe = _user.rememberMe;
                    _userInLocalStorage.permitRoleDto = _user.permitRoleDto;
                    _userInLocalStorage.token = _user.token;

                    localStorageService.set(constants.LOCALSTORAGE.USER, _userInLocalStorage);
                };

                //调用后台注销接口，注销token
                var cancelToken = function(){
                    var url = ApiPath.api.logout;
                    var deferred = $q.defer();
                    var promise = $http({
                        method:'GET',
                        url:url
                    });
                    promise.then(
                        function(data){
                            deferred.resolve(data);
                        },function(error){
                            deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                };

                var user = new User();

                var refreshUser = function(_user){
                    if (_user) {
                        user.userId= _user.userId;
                        user.userCode = _user.userCode;
                        user.userName = _user.userName;
                        user.comCode = _user.comCode;
                        user.roles = _user.roles;
                        user.rememberMe = _user.rememberMe;
                        user.permitRoleDto = _user.permitRoleDto;
                        user.token = _user.token;
                    }
                    $rootScope.currentUser = user;
                    $rootScope.user = user;
                };

                var init = function () {
                    //user = new User();
                    var _userInLocalStorage = localStorageService.get(constants.LOCALSTORAGE.USER);
                    refreshUser(_userInLocalStorage);
                };

                init();

                var setStorages = function(key, data){
                    localStorageService.set(key,data);
                };
                return {
                    //获取本地用户信息
                    getUser: function(){
                        return user;
                    },
                    //配合单点登录，从后台获取已登录的用户信息
                    getLoginUser: function(options){
                        $http({
                            method:'GET',
                            url:ApiPath.api.getLoginUser
                        }).then(
                            //通讯成功
                            function(data){
                                var _user = data.data;
                                user.userId = _user.userId;
                                user.userCode = _user.userCode;
                                user.userName = _user.userName;
                                user.comCode = _user.comCode;
                                user.roles = _user.roles;
                                user.permitRoleDto = _user.permitRoleDto;
                                user.token = data.data.token;
                                updateUserInLocalStorage(user);
                                refreshUser(user);
                                if(options && options.success && typeof(options.success=='function')){
                                    options.success(user);
                                }
                            },
                            //通讯失败
                            function(error){
                                if(options && options.error && typeof(options.error=='function')){
                                    options.error(error);
                                }
                            }
                        );
                    },
                    //用户登录
                    login: function(account, options){
                        $http({
                            method:'GET',
                            url:"data/login.json",
                            data:account
                         }).then(
                            function(data){
                                var _user = data.data.user;
                                if(data.data.success){
                                    user.userId = _user.userId;
                                    user.userCode = _user.userCode;
                                    user.userName = _user.userName;
                                    user.comCode = _user.comCode;
                                    user.roles = _user.roles;
                                    user.permitRoleDto = _user.permitRoleDto;
                                    user.token = data.data.token;
                                    updateUserInLocalStorage(user);
                                    refreshUser(user);
                                    $state.go('main');
                                    if(options && options.success && typeof(options.success=='function')){
                                        options.success(user);
                                    }
                                }else{
                                    if(options && options.error && typeof(options.error=='function')){
                                        options.error(data.data.msg);
                                    }
                                }
                            },
                            function(error){
                                if(options && options.error && typeof(options.error=='function')){
                                    options.error(error);
                                }
                            }
                        );
                    },
                    //登出
                    logout: function(confirmLogout){
                        console.log("logout");
                        confirmLogout = confirmLogout || function(){
                                var deffer = $q.defer();
                                if(confirm('确定要注销吗?'))
                                    deffer.resolve();
                                else
                                    deffer.reject();
                                return deffer.promise;
                            };
                        confirmLogout().then(
                            function(){
                                cancelToken().then(
                                    function(data){
                                        console.info("S-注销成功:",data.status);
                                        user.logout(); //清除本地存储
                                    },function(error){
                                        console.info("E-注销完成:",error.status);
                                        user.logout(); //清除本地存储
                                    }
                                );
                            }
                        );
                    },
                    //验证是否登录
                    isAuthenticated: function () {
                        var deferred = $q.defer();
                        if (user.isLogin()) {
                            deferred.resolve(constants.AUTH.OK);
                        } else {
                            $rootScope.$broadcast(constants.AUTH.UNAUTHORIZED);
                            deferred.reject(constants.AUTH.UNAUTHORIZED);
                        }
                        return deferred.promise;
                    },
                    //验证是否有权限
                    hasRoles: function(roles){
                        var deferred = $q.defer();
                        if(user.hasRoles(roles)){
                            deferred.resolve(constants.AUTH.OK);
                        } else {
                            $rootScope.$broadcast(constants.EVENTS.AUTH_REJECT);
                            deferred.reject(constants.AUTH.FORBIDDEN);
                        }
                        return deferred.promise;
                    },
                    //清除token
                    clearToken: function(){
                        user.token='';
                        setStorages(constants.LOCALSTORAGE.USER, user);//更新缓存
                        clearCookies();
                    }
                };
            }]);
});
