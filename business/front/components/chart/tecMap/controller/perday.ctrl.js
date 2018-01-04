/**
 * Created by zxp on 2017/4/26.
 */
 define(['../module'],function(moduleApp) {
    'use strict';
    var perdayFunc = function($scope,$state,ApiPath,tecMapServ) {
        tecMapServ.getPreDay().then(
            function(answer){
                // var lineData = answer.data[2];
                // var linePremium={};
                // //var linePolicy={};
                // linePremium.name="组件使用";
                // //linePolicy.name="22222";
                // var premiumdatapoints=[];
                // //var policydatapoints=[];
                // for(var i=0;i<lineData.xdata.length;i++){
                //     premiumdatapoints[i]={x:lineData.xdata[i],y:lineData.ydata[i]}
                //     //policydatapoints[i]={x:lineData.prpDstatList[i].statSubject,y:lineData.prpDstatList[i].sumItem}
                // }
                // var nullNum={x:"",y:0};
                // premiumdatapoints.unshift(nullNum);
                // //premiumdatapoints.push(nullNum);
                // //policydatapoints.unshift(nullNum);
                // //policydatapoints.push(nullNum);
                // linePremium.datapoints=premiumdatapoints;
                // //linePolicy.datapoints=policydatapoints;
                // $scope.lineMultiple=[];
                // $scope.lineMultiple.push(linePremium);
                // //$scope.lineMultiple.push(linePolicy);
                //调整为3条线
                var lineDatas = answer.data;
                $scope.lineMultiple = [];
                $scope.lineItem = [];
                $scope.lineLegend = [];
                for(var index=0;index<lineDatas[0].xdata.length;index++){
                    $scope.lineItem.push(lineDatas[0].xdata[index]);//设置X轴内容
                }
                for(var index=0;index < lineDatas.length;index++){
                    $scope.lineLegend.push(lineDatas[index].name);//设置线条名称

                    
                    var dataArray = [];
                    for(var i=0;i<lineDatas[index].ydata.length;i++){
                        dataArray.push(lineDatas[index].ydata[i]);
                    }
                    $scope.lineMultiple.push(dataArray);
                }
            },
            function(error){
            }
        );  
    //////////////////////////遗弃的方式////////////////////////////////////////
    // tecMapServ.getPreDay().then(
    // function(answer) {
    //     require( [ 'echarts-all', 'lib/echarts/chart/line', 'lib/echarts/chart/bar'],function DrawEchart (ec) {
    //     var echarts_active_line=echarts.init(document.getElementById('echarts_active_line'),'macarons');

    //     $scope.option1 = {
    //             tooltip : {
    //                 trigger: 'axis',
    //                 formatter :'{b}<br/>{a}:{c} 次'
    //             },
    //             legend: {
    //                 data:['活跃度']
    //             },
    //             toolbox: {
    //                 show : true,
    //                 feature : {
    //                     //mark : {show: true},
    //                     dataView : {show: true, readOnly: false},
    //                     magicType : {show: true, type: ['line', 'bar']},
    //                     restore : {show: true},
    //                     //saveAsImage : {show: true}
    //                 }
    //             },
    //             calculable : true,
    //             xAxis : [
    //                 {
    //                     type : 'category',
    //                     boundaryGap : false,
    //                     data : answer.data.xdata
    //                 }
    //             ],
    //             yAxis : [
    //                 {
    //                     type : 'value',
    //                     axisLabel : {
    //                         formatter: '{value} 次'
    //                     }
    //                 }
    //             ],
    //             series : [
    //                 {
    //                     name:'新增使用次数',
    //                     type:'line',
    //                     data:answer.data.ydata,
    //                     markPoint : {
    //                         data : [
    //                             {type : 'max', name: '最大值'},
    //                             {type : 'min', name: '最小值'}
    //                         ]
    //                     },
    //                     markLine : {
    //                         data : [
    //                             {type : 'average', name: '平均值'}
    //                         ]
    //                     }
    //                 }
    //             ]
    //         };
    //         echarts_active_line.setOption($scope.option1);
    //     });
    // });
};

moduleApp.controller('perdayCtrl',["$scope","$state","ApiPath","tecMapServ",perdayFunc]);
});




