/**
 * Created by gaofeng on 2017/5/1.
 */

define([
        'angular',
    './release/module',
    './schedule/module'
    ],function(angular) {
    'use strict';
    return angular.module('business.demand',[
        'business.demand.release',
        'business.demand.schedule'
    ])
});