/**
 * Created by zxp on 2017/4/26.
 */
define(['../module'],function(moduleApp) {
    'use strict';
    var rankallFunc = function($scope,$state,ApiPath,tecMapServ) {
        tecMapServ.getAssRank('1').then(
            function(answer) {
                var pieData= answer.data;
                var pieFront={};
                pieFront.name="前端组件使用排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieFront.datapoints=datapoints;
                $scope.frontMultiple=[pieFront];
            }
        );

        tecMapServ.getAssRank('2').then(
            function(answer) {
                var pieData= answer.data;
                var pieBack={};
                pieBack.name="后端组件使用排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieBack.datapoints=datapoints;
                $scope.backMultiple=[pieBack];
            }
        );

        tecMapServ.getAmoebaRank().then(
            function(answer) {
                var pieData= answer.data;
                var pieAmoeba={};
                pieAmoeba.name="阿米巴使用组件排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieAmoeba.datapoints=datapoints;
                $scope.amoebaMultiple=[pieAmoeba];
            }
        );

        tecMapServ.getProType().then(
            function(answer) {
                var pieData= answer.data;
                var pieType={};
                pieType.name="阿米巴项目类型排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieType.datapoints=datapoints;
                $scope.proTypeMultiple=[pieType];
            }
        );

        tecMapServ.getToolType().then(
            function(answer) {
                var pieData= answer.data;
                var pieType={};
                pieType.name="阿米巴工具类型排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieType.datapoints=datapoints;
                $scope.toolTypeMultiple=[pieType];
            }
        );

        tecMapServ.getProjectFrameWork().then(
            function(answer) {
                var pieData= answer.data;
                var pieType={};
                pieType.name="阿米巴框架使用排行";
                var datapoints=[];
                angular.forEach(pieData, function(data){
                    datapoints.push({x:data.name,y:data.value});
                });
                pieType.datapoints=datapoints;
                $scope.projectFrameWorkMultiple=[pieType];
            }
        );

        $scope.pieConfig = {
            calculable: true,
            // title : {
            //     text: '大标题',
            //     subtext: '小标题'
            // },
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
                  radius: '75%',
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
                }
            }
        };  





///////////////////////////遗弃的方式//////////////////////////////////////
        //此处应该传入1前端，目前数据未知，先写成0，全查
        // tecMapServ.getAssRank('1').then(
        //     function(answer) {
        //         var echart_pie_front = echarts.init(document.getElementById('echart_pie_front'), tecMapServ.getBarChartTheme());
        //         $scope.echart_pie_front_Option = {
        //             tooltip: {
        //               trigger: 'item',
        //               formatter: "{a} <br/>{b} : {c} ({d}%)"
        //             },
        //             legend: {
        //               x: 'center',
        //               y: 'bottom',
        //               data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
        //             },
        //             toolbox: {
        //               show: true,
        //               feature: {
        //               magicType: {
        //                 show: true,
        //                 type: ['pie', 'funnel'],
        //                 option: {
        //                 funnel: {
        //                   x: '25%',
        //                   width: '50%',
        //                   funnelAlign: 'left',
        //                   max: 1548
        //                 }
        //                 }
        //               },
        //               restore: {
        //                 show: true,
        //                 title: "Restore"
        //               },
        //               saveAsImage: {
        //                 show: true,
        //                 title: "Save Image"
        //               }
        //               }
        //             },
        //             calculable: true,
        //             series: [{
        //               name: '组件数据',
        //               type: 'pie',
        //               radius: '55%',
        //               center: ['50%', '48%'],
        //               data: answer.data
        //             }]
        //         };
        //         var legendData = new Array();
        //         angular.forEach(answer.data, function(data,index,array){
        //             legendData[index] = array[index].name;

        //         });
        //         $scope.echart_pie_front_Option.legend.data = legendData;
        //         echart_pie_front.setOption($scope.echart_pie_front_Option);
        //     }
        // );
        // //此处应该传入2后端，目前数据未知，先写成0，全查
        // tecMapServ.getAssRank('1').then(
        //     function(answer) {
        //         var echart_pie_back = echarts.init(document.getElementById('echart_pie_back'), tecMapServ.getBarChartTheme());
        //         $scope.echart_pie_back_Option = {
        //             tooltip: {
        //               trigger: 'item',
        //               formatter: "{a} <br/>{b} : {c} ({d}%)"
        //             },
        //             legend: {
        //               x: 'center',
        //               y: 'bottom',
        //               data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
        //             },
        //             toolbox: {
        //               show: true,
        //               feature: {
        //               magicType: {
        //                 show: true,
        //                 type: ['pie', 'funnel'],
        //                 option: {
        //                 funnel: {
        //                   x: '25%',
        //                   width: '50%',
        //                   funnelAlign: 'left',
        //                   max: 1548
        //                 }
        //                 }
        //               },
        //               restore: {
        //                 show: true,
        //                 title: "Restore"
        //               },
        //               saveAsImage: {
        //                 show: true,
        //                 title: "Save Image"
        //               }
        //               }
        //             },
        //             calculable: true,
        //             series: [{
        //               name: '组件数据',
        //               type: 'pie',
        //               radius: '55%',
        //               center: ['50%', '48%'],
        //               data: answer.data
        //             }]
        //         };
        //         var legendData = new Array();
        //         angular.forEach(answer.data, function(data,index,array){
        //             legendData[index] = array[index].name;

        //         });
        //         $scope.echart_pie_back_Option.legend.data = legendData;
        //         echart_pie_back.setOption($scope.echart_pie_back_Option);
        //     }
        // );

        // //此处应该传入2后端，目前数据未知，先写成0，全查
        // tecMapServ.getAmoebaRank().then(
        //     function(answer) {
        //         var echart_pie_amoeba = echarts.init(document.getElementById('echart_pie_amoeba'), tecMapServ.getBarChartTheme());
        //         $scope.echart_pie_amoeba_Option = {
        //             tooltip: {
        //               trigger: 'item',
        //               formatter: "{a} <br/>{b} : {c} ({d}%)"
        //             },
        //             legend: {
        //               x: 'center',
        //               y: 'bottom',
        //               data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6']
        //             },
        //             toolbox: {
        //               show: true,
        //               feature: {
        //                 magicType: {
        //                   show: true,
        //                   type: ['pie', 'funnel']
        //                 },
        //                 restore: {
        //                   show: true,
        //                   title: "Restore"
        //                 },
        //                 saveAsImage: {
        //                   show: true,
        //                   title: "Save Image"
        //                 }
        //               }
        //             },
        //             calculable: true,
        //             series: [{
        //           name: '阿米巴数据',
        //           type: 'pie',
        //           radius: [25, 90],
        //           center: ['50%', 170],
        //           roseType: 'area',
        //           x: '50%',
        //           max: 40,
        //           sort: 'ascending',
        //           data: answer.data
        //         }]
        //         };
        //         var legendData = new Array();
        //         angular.forEach(answer.data, function(data,index,array){
        //             legendData[index] = array[index].name;

        //         });
        //         $scope.echart_pie_amoeba_Option.legend.data = legendData;
        //         echart_pie_amoeba.setOption($scope.echart_pie_amoeba_Option);
        //     }
        // );

    };

moduleApp.controller('rankallCtrl',["$scope","$state","ApiPath","tecMapServ",rankallFunc]);
});




