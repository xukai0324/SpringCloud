/**
 * Created by ZhangJiansen on 2016/9/18.
 * 组件模块总入口
 */

/*引入依赖模块的定义文件*/
define([
    'angular',
    'widgets/sinoOverlay',
    'widgets/sinoSelect',

    /**测试引用**/
    'widgets/sinoSelectDraw',
    /**测试引用end**/

    'widgets/sinoValidity',
    'widgets/sinoPdf',
    'widgets/sinoTag',
    'widgets/sinoH5Element',
    'widgets/ztree_drcv'
],function (angular)
{
    'use strict';
    console.log("load widgets module");

    /*增加模块依赖*/
    return angular.module('widgets', ['sino.overlay','sino.select','sino.validity','sino.pdf','sino.Tag','sino.H5Element','sino.sinoSelectDraw','ztreeM'])
        .config(['$httpProvider',function($httpProvider){
            $httpProvider.interceptors.push('httpInterceptor');
        }]);
});