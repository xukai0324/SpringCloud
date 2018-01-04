/**
 * Created by zxp on 2017/4/26.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var radarCapFunc = function($scope,$state,ApiPath,tecMapServ) {
        $scope.ambrpshow = true;
        $scope.radarConfig = {
            //width: 300,
            toolbox: {
                show : true,
                feature : {
                    saveAsImage : {show: true}
                }
            },
            height: 400,
            calculable : true,
            tooltip : {
                trigger: 'axis'
            },
            polar : [
                {
                    indicator : [
                        { text: '前端', max: 5},
                        { text: '后端', max: 5},
                        { text: '移动端', max: 5},
                        { text: '项目', max: 5},
                        { text: '需求发布', max: 5}
                    ]
                }
            ]
        }
        $scope.radarData = [
            {
                name: '阿米巴技术雷达图',
                type: 'radar',
                data : [
                    {
                        value : [0,0,0,0,0],
                        name : '阿米巴技术能力'
                    }
                ]
            }
        ];
        $scope.alertLayer = true;
        tecMapServ.getAmbRadarList().then(
            function(answer) {
                $scope.AmbRadarList = answer.data;
            }
        )
        $scope.ambClick = function(ambid){
            $scope.ambrpshow = true;
            tecMapServ.getAmbRadar(ambid).then(
                function(answer) {
                    $scope.radarData[0].name = '“'+answer.data.amoebaName+'”技术雷达图';
                    $scope.radarData[0].data[0].name = '“'+answer.data.amoebaName+'”技术能力';
                    $scope.radarData[0].data[0].value[0] = answer.data.front;
                    $scope.radarData[0].data[0].value[1] = answer.data.back;
                    $scope.radarData[0].data[0].value[2] = answer.data.mobile;
                    $scope.radarData[0].data[0].value[3] = answer.data.product;
                    $scope.radarData[0].data[0].value[4] = answer.data.demand;
                    for(var i = 0;i < $scope.radarConfig.polar[0].indicator.length;i++){
                        $scope.radarConfig.polar[0].indicator[i].max = answer.data.maxvalue;
                    }
                }
            )
        }


        $scope.ambClickAss = function(ambid,assType,ambname){
            $scope.ambrpshow = false;
            $scope.queryAssRankByAMB = {'assType':assType,'ambId':ambid};
            $scope.pieConfig.title.subtext = "———“"+ambname+"”";
            // $scope.queryAssRankByAMB.assType = assType;
            // $scope.queryAssRankByAMB.ambid = ambid;
            tecMapServ.getAssRankByAMB($scope.queryAssRankByAMB).then(
                function(answer) {
                    var pieData= answer.data;
                    var pieObj={};
                    pieObj.name=ambname+assType+"组件使用排行";
                    var datapoints=[];
                    angular.forEach(pieData, function(data){
                        datapoints.push({x:data.name,y:data.value});
                    });
                    pieObj.datapoints=datapoints;
                    $scope.ambMultiple=[pieObj];
                }
            )
        }
        
        
        $scope.exit = function() {
           $state.go("main.tecMap");
        }


        $scope.pieConfig = {
            calculable: true,
            title : {
                text: '阿米巴组件使用排行',
                subtext: '小标题'
            },
            label:{
              normal:{
                show:true ,
                position : 'outer'
              },
              emphasis:{
                show :true
              }
            },
            series: [{
                  name: '组件数据',
                  type: 'pie',
                  //radius: '95%',
                  center: ['50%', '48%'],
                  data: [],
                  labelLine:true,
                  legendHoverLink:true
            }],
            debug: true,
            saveAsImage: {
                show: true,
                title: "保存图片"
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {
                        show: true,
                        title: "重置"
                    },
                    saveAsImage: {
                        show: true,
                        title: "保存图片"
                    }
                    //,magicType : {show: true, type: ['pie']}
                }
            }
        };
        
    };

    moduleApp.controller('radarCapCtrl',["$scope","$state","ApiPath","tecMapServ",radarCapFunc]);
});




