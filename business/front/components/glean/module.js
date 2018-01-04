/**
 * Created by gaofeng on 2017/5/1.
 * modify: add framework by xuyang at 2017/6/22
 */

define([
        'angular',
        './project/module',
    './component/module',
    './tools/module',
    './deployEnv/module',
    './techPerson/module',
    './framework/module'
    ],function(angular) {
    'use strict';
    return angular.module('business.glean',[
        'business.glean.project',
        'business.glean.component',
        'business.glean.tools',
        'business.glean.deployEnv',
        'business.glean.techPerson',
        'business.glean.framework'
    ])
});