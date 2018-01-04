/**
 * Created by pengju on 2017/5/5.
 */
define([
    'angular',
    './quesDetail/module',
    './pbInfo/module',
    './putQues/module'
],function(angular) {
    'use strict';
    return angular.module('business.ques',[
        'business.ques.quesDetail',
        'business.ques.pbInfo',
        'business.ques.putQues'
    ])
});