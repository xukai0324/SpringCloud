/**
 * Created by sunfm on 2017-06-08.
 */

define([
        'angular',
    './release/module'
    ],function(angular) {
    'use strict';
    return angular.module('business.techrepo',[
        'business.techrepo.release'
    ])
});