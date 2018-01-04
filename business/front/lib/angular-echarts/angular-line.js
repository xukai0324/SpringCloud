/**
* line图的angularjs指令实现，angular-echarts封装多条线不可用，单独写
*
*/

var app = angular.module('angular-line', []);

app.directive('lineMuilt', function() {  
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:260px;"></div>',
        replace: true,
        link: function(scope, element, attrs, controller) {
            function setOptions(){
                if (!scope.data) {
                    return;
                }
                var option = {
                    // 提示框，鼠标悬浮交互时的信息提示
                    tooltip: {
                        show: true,
                        trigger: 'item'
                    },
                    // 图例
                    legend: {
                        data: scope.legend
                    },
                    // 横轴坐标轴
                    xAxis: [{
                        type: 'category',
                        boundaryGap : false,
                        data: scope.item
                    }],
                    // 纵轴坐标轴
                    yAxis: [{
                        type: 'value'
                    }],
                    // dataZoom : {
                    //     show : true,
                    //     realtime : true,
                    //     //orient: 'vertical',   // 'horizontal'
                    //     //x: 0,
                    //     y: 36,
                    //     //width: 400,
                    //     height: 20,
                    //     backgroundColor: 'rgba(221,160,221,0.5)',
                    //     //dataBackgroundColor: 'rgba(138,43,226,0.5)',
                    //     //fillerColor: 'rgba(38,143,26,0.6)',
                    //     //handleColor: 'rgba(128,43,16,0.8)',
                    //     //xAxisIndex:[],
                    //     //yAxisIndex:[],
                    //     start : 40,
                    //     end : 60
                    // },
                     toolbox: {
                        show : true,
                        feature : {
                            dataZoom : {show: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    // 数据内容数组
                    series: function(){
                        var serie=[];
                        for(var i=0;i<scope.legend.length;i++){
                            var item = {
                                name : scope.legend[i],
                                type: 'line',
                                data: scope.data[i]
                            };
                            serie.push(item);
                        }
                        return serie;
                    }()
                };
                var myChart = echarts.init(document.getElementById(scope.id),'macarons');
                myChart.setOption(option);
            }
            scope.$watch(function () {
                return scope.data;
            }, function (value) {
                if (value) {
                    setOptions();
                }
            }, true);

        }
    };
});