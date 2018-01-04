/**
 * Created by Administrator on 2017/4/13.
 */
define([
    'angular',
    './tecMap/module'
    ],function(angular) {
    'use strict';
    return angular.module('business.chart',[
        'business.collection.tecMap'
    ])
});