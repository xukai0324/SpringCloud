/**
* 云字符的angularjs指令实现，angular-echarts做了很久都没有加成功，故单独写了一个
*
*/

var app = angular.module('angular-wordcloud', []);
app.directive('cloudChart', [function () {
	return {
		restrict: 'EA',
		template: '<div></div>',
		scope: {
			data: '='
		},
		link: function(scope,element){
			function setOptions(){
				if (!scope.data) {
	                return;
	            }
				var chart =  element.find('div')[0];
				// var parent = element.parent()[0];
				// chart.style.width =parent.clientWidth+'px';
				// chart.style.height =parent.clientHeight+'px';
				// chart.style.width = scope.data.style.width + 'px';

				chart.style.width = '100%';
				chart.style.height = scope.data.style.height + 'px';
				var myChart = echarts.init(chart);
				var option = {
					tooltip: {
						show: false
					},
					series: [{
						name: scope.data.name,
						type: 'wordCloud',
						size: ['150%', '80%'],
						textRotation : [0, 45, 90, -45],
						textPadding: 0,
						autoSize: {
							enable: true,
							minSize: 14
						},
						data:scope.data.datapoints
					}]
				};
				myChart.setOption(option);
				myChart.resize();
				//绑定方法
				try{
 					myChart.on(echarts.config.EVENT.CLICK, function (a){
                    	scope.$parent.cloudClick(a.name);
                	}); 
				}catch(E){}
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
}]);
