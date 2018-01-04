/**
 * Created by ZhangJiansen on 2016/9/18.
 * 框架模块总入口
 */

/*引入依赖模块的定义文件*/
define([
    'angular',
    'frame/authorize/authorize',
    'frame/exception/exception'
],function (angular) {
    'use strict';
    console.log("load framework module");

    /*增加模块依赖*/
    return angular.module('framework',
        ['sino.authorize','sino.exception']
    );
});