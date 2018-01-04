/**根据name去后台查询数据，展示到页面上**/
function clud_chart_click(name){
	load_bar(name);
}

function load_bar(namestr){
	 require.config( {
			paths : {
			echarts : '/js/source'
				}
			});
	    require( [ 'echarts', 'echarts/chart/bar', 'echarts/chart/line'],function DrawEchart (ec) {
	        var ecConfig = require('echarts/config');
	        $('#clud_chart').hide();
	        //$('#clud_chart_temp').empty();
	        $('#clud_chart_temp').show();
	        
	        var clud_chart=ec.init(document.getElementById('clud_chart_temp'));
	        ec.isLoading=true;
	        option = {
	        	    title : {
	        	        text: '项目组使用次数',
	        	        subtext: '纯属虚构'
	        	    },
	        	    tooltip : {
	        	        trigger: 'axis',
	        	        formatter :'{b}<br/>'+namestr+'{a}:{c} 次'
	        	    },
	        	    legend: {
	        	        data:['使用次数']
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            dataView : {show: true, readOnly: false},
	        	            magicType : {show: true, type: ['line', 'bar']},
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    calculable : true,
	        	    xAxis : [
	        	        {
	        	            type : 'category',
	        	            data : ['项目1组','项目2组','项目3组','项目4组','项目5组','项目6组','项目7组','项目8组','项目9组','项目10组','项目11组','项目12组']
	        	        }
	        	    ],
	        	    yAxis : [
	        	        {
	        	            type : 'value'
	        	        }
	        	    ],
	        	    series : [
	        	        {
	        	            name: '使用次数',
	        	            type:'bar',
	        	            data:[2, 4, 7, 23, 25, 76, 13, 16, 32, 20, 6, 3],
	        	            markPoint : {
	        	                data : [
	        	                    {type : 'max', name: '最大值'},
	        	                    {type : 'min', name: '最小值'}
	        	                ]
	        	            },
	        	            markLine : {
	        	                data : [
	        	                    {type : 'average', name: '平均值'}
	        	                ]
	        	            }
	        	        }
	        	    ]
	        	};
	        clud_chart.setOption(option);
	    });
}