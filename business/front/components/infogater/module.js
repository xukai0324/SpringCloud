/**
 * Created by Administrator on 2017/4/13.
 */
define([
    'angular',
    './infogaterType/module',
    './infogaterCode/module',
    './infogaterInfo/module',
    './infogaterInfoList/module'
    ],function(angular) {
    'use strict';
    return angular.module('business.infogater',[
        'business.infogater.infogaterType',
        'business.infogater.infogaterCode',
        'business.infogater.infogaterInfo',
        'business.infogater.infogaterInfoList'
    ])
});