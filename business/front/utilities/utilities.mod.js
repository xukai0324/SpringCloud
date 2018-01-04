/**
 * Created by ZhangJiansen on 2016/9/18.
 * 基础库模块总入口
 */

/*引入依赖模块的定义文件*/
define([
    'angular',
    'utilities/provider/eventBus',
    'utilities/factory/urlUtil',
    'utilities/factory/commFactory',
    'utilities/constant/ApiPathConstant'
],function (angular,
            eventBusHandler,
            urlUtilHandler,
            commFactoryHandler,
            ApiPathConstant)
{
    'use strict';
    console.log("load utilities module");

    /*增加模块依赖*/
    return angular.module('utilities', [])
        .provider('eventBus',eventBusHandler)
        .factory('urlUtil',urlUtilHandler)
        .factory('commFactory',commFactoryHandler)
        .constant('ApiPath',ApiPathConstant);
});