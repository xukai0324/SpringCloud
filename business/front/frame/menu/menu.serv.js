/**
 * Created by ZhangJiansen on 2016/9/16.
 * 菜单服务
 */
define(['app'], function (app) {
    'use strict';
    app.factory('menuServ',['$http','$q','ApiPath',function($http,$q,ApiPath){

        var Menu = function(){
            this.menuData = [];
        };

       /* Menu.prototype.getRemoteMenu = function(appCode){
            var deferred = $q.defer();
            var urlGetData = ApiPath.api.getMenus+"/"+appCode;
            var promise  = $http({
                method:'GET',
                url:urlGetData
            });
            promise.then(
                //通讯成功
                function(answer){
                    console.log("获取菜单成功");
                    answer.status = true;
                    refresh(answer.data);
                    deferred.resolve(answer);
                },
                //通讯失败
                function(error){
                    error.status = false;
                    refresh([]);
                    deferred.reject(error);
                });
            //返回promise对象，交由Controller继续处理
            return deferred.promise;
        };*/

        /* *
        *获取已加载菜单信息
        * */
        Menu.prototype.getMenus= function(){
            return this.menuData;
        };

        /* *
        *菜单数据是否有值
        * */
        Menu.prototype.hasData = function(){
            return (this.menuData.length > 0);
        };

        /* *
        * 某个路由地址是否存在
        * */
        Menu.prototype.hasState = function(states){
            if(!states){
                return false;
            }

            var _self = this;
            if(this.hasData()){
                var found = false;
                _self.menuData.some(function(menu){
                    if (menu.actionURL == states){
                        found = true;
                        return true;
                    }
                });
                return found;
            }else{
                return false;
            }
        };

        /* *
         *根据路由名称获取对应菜单的名字
         * */
        Menu.prototype.getMenuName = function(state,level){
            var menuName = "";
            level = level||2;

            var _self = this;
            var targetState = _getStateByLevel(state,level);

            _self.menuData.some(function(menu){
                if(menu.actionURL == targetState){
                    menuName = menu.menuCName;
                    return true;
                }
            });
            return menuName;
        };

        Menu.prototype.getMenuByState = function(state){
            var _self = this;
            var menuItem = null;
            _self.menuData.some(function(menu){
                if(menu.actionURL == state){
                    menuItem = menu;
                    return true;
                }
            });
            return menuItem;
        };

        var menu = new Menu();
        menu.menuData = [];

        //刷新菜单对象的值
        var refresh = function(_menuData){
            if(!_menuData){
                menu.menuData = [];
            }else{
                menu.menuData = _menuData;
            }
        };

        //截取传入路由字符串中对应层级的路由值
        var _getStateByLevel = function(state,level){
            if(level < 0){
                return state;
            }
            var states = state.split(".");
            var len = (states.length > level ? level:states.length);
            var result = "";
            for(var i=0;i<len;i++){
                result += states[i]+".";
            }

            return result.substr(0,result.length-1);
        };

        return {
            /*菜单查询*/
            /*
            getData:function(appCode) {
                var deferred = $q.defer();
                var urlGetData = ApiPath.api.getMenus+"/"+appCode;
                var promise  = $http({
                    method:'GET',
                    url:urlGetData
                });
                promise.then(
                    //通讯成功
                    function(answer){
                        console.log("获取菜单成功");
                        answer.status = true;
                        refresh(answer.data);
                        deferred.resolve(answer);
                    },
                    //通讯失败
                    function(error){
                        error.status = false;
                        refresh([]);
                        deferred.reject(error);
                    });
                //返回promise对象，交由Controller继续处理
                return deferred.promise;
            },
            */
            /*菜单查询  changweican*/
            getData:function(json) {
                console.log("json:"+json);
                var deferred = $q.defer();
                var promise  = $http({
                    method:'POST',
                    url:ApiPath.api.queryPermitMenusByUserId,
                    data:json
                });
                promise.then(
                    //通讯成功
                    function(answer){
                        console.log("获取菜单成功");
                        answer.status = true;
                        refresh(answer.data);
                        deferred.resolve(answer);
                    },
                    //通讯失败
                    function(error){
                        error.status = false;
                        refresh([]);
                        deferred.reject(error);
                    });
                //返回promise对象，交由Controller继续处理
                return deferred.promise;
            },
            /*根据菜单获取名字*/
            getMenuName:function (state,level) {
                return menu.getMenuName(state,level);
            },
            /*判断是否存在某个路由*/
            hasState:function(state) {
                return menu.hasState(state);
            },
            /*根据路由名获取对应菜单对象*/
            getMenuByState:function(state){
                return menu.getMenuByState(state);
            },
            /*判断离开某个菜单时是否需要告警*/
            needAlert:function (fromState,toState){
                //判断目标路由是否为菜单，不是菜单则不提示
                if(!menu.hasState(toState)){
                    return false;
                }
                //针对投保录入页面做特殊处理
                if(fromState=='main.application' || fromState=='main.endorseInsured' || fromState=='main.endorseBusiness' || fromState=='main.endorseSurrend'){
                    return true;
                }
                //获取现菜单对象，不是菜单则不提示
                var menuItem = menu.getMenuByState(fromState);
                if(!menuItem){
                    return false;
                }
                //判断警示标志
                return menuItem['flag'] == 'Y'?true:false;
            }
        };
    }]);
});