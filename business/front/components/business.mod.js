/**
 * Created by ZhangJiansen on 2016/9/18.
 * 业务模块总入口
 * 增加新业务模块请在此文件中增加依赖
 */

/*引入依赖模块的定义文件*/
define([

    'angular',
    /*'components/index/module',
    'components/prpins/module',
    'components/ims/module',
    'components/pms/module',
    'components/agent/module',
    'components/intelligence/module',*/
    'components/infogater/module',/*
    'bootstrap-progressbar',
    'echarts',
    'index_chart',
    'Chart.min',
    'fastclick',
    'gauge.min',
    'icheck.min',
    'skycons',
    'jquery.flot',
    'jquery.flot.pie',
    'jquery.flot.time',
    'jquery.flot.stack',
    'jquery.flot.resize',*/
    'components/chart/module',
    'components/glean/module',
	'components/ques/module',
    'components/permit/module',
    'components/demand/module',
    'components/techrepo/module'
],function (angular) {    'use strict';
    console.log("load business module");
    /*增加模块依赖*/
    return angular.module('business',
        [
            /*'business.index',
            'business.prpins',
            'business.ims',
            'business.pms',
            'business.agent',*/
            'business.infogater',/*
            'business.collection',*/
            'business.chart',
            'business.glean',
            'business.permit',
			'business.ques',
            'business.demand',
			'business.techrepo'
        ]);
});