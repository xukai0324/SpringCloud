/**
 * Created by zxp on 2017/4/26.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    //创建云字符样式
    var createRandomItemStyle = function() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                    ].join(',') + ')'
            }
        };
    }   

    
    var assTendencyFunc = function($scope,$state,ApiPath,tecMapServ) {
        $scope.showcc = true;
        $scope.showbc = false;
        $scope.clickBack = function(namestr){
            $scope.showcc = true;
            $scope.showbc = false;
        }
        //点击云字符的事件定义
        $scope.cloudClick = function(namestr){
            tecMapServ.getCloudAmb(namestr).then(
                function(answer) {
                    $scope.showcc = false;
                    $scope.showbc = true;
                    var barData= answer.data;
                    var barUseage={};
                    barUseage.name="组件“"+namestr+"”使用次数";
                    var datapoints=[];
                    for(var i=0;i<barData.xdata.length;i++){
                        datapoints[i]={x:barData.xdata[i],y:barData.ydata[i]};
                    }
                    barUseage.datapoints=datapoints;
                    $scope.barMultiple=[];
                    $scope.barMultiple.push(barUseage);

                },
                function(error){
                }
            ); 
        }
        //热门组件TOP7
        tecMapServ.getAssRank('0').then(
            function(answer) {
                $scope.Top7CloudAssData = answer.data;
            }
        );
        //云字符组件概览
        tecMapServ.getTendByAss().then(
            function(answer) {
                var cloudData= answer.data;
                var cloudAss={};
                cloudAss.name="组件概览";
                var datapoints=[];
                angular.forEach(cloudData, function(data,index){
                    datapoints.push({name:data.name,value:data.value,itemStyle:createRandomItemStyle()});
                });
                cloudAss.datapoints = datapoints;
                cloudAss.style = {
                    height: 280
                };
                $scope.assMultiple=cloudAss;
            }
        );
        //柱图的配置
        $scope.barConfig = {
            text: '阿米巴组件使用次数',
            subtext: '数据来源于实际提交的内容',
            debug: true,
            stack: true
        };  
};

moduleApp.controller('assTendencyCtrl',["$scope","$state","ApiPath","tecMapServ",assTendencyFunc]);

});




