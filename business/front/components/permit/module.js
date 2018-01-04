/**
 * Created by changweican on 2017/5/7.
 */
define([
    'angular',
    './menu/module',
    './role/module',
    './user/module'
],function(angular) {
    'use strict';
    return angular.module('business.permit',[
        'business.permit.menu',
        'business.permit.role',
        'business.permit.user'
    ])
});
