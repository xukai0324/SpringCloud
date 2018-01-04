/**
 * Created by zxp on 2017/4/26.  该指令仅为图标阿米巴列表视图所用
 */
 define(['../module'],function(moduleApp) {
    'use strict';
    moduleApp.directive('datatableamb', function() {  
        return {
            scope :{
                click: '&clickfunc',
                clickass: '&clickfuncass',
                source: '=data'
            },
            restrict: 'E',
            template: '<table id="datatable" class="table table-bordered table-striped table-hover" width="100%">'
                +'<thead>'
                +'<tr>                                                                                '
                +'    <th style=\'width:20%\'><i class="fa fa-group"></i>阿米巴名称</th>                                                 '
                +'    <th><i class="fa fa-laptop"></i>前端</th>                                                 '
                +'    <th><i class="fa fa-gears"></i>后端</th>                                                 '
                +'    <th><i class="fa fa-tablet"></i>移动端</th>                                               '
                +'    <th><i class="fa fa-bookmark-o"></i>需求</th>                                                 '
                +'    <th><i class="fa fa-file-text-o"></i>项目</th>                                                     '
                +'    <th><i class="fa fa-line-chart"></i>查看</th>                                                     '
                +'    </tr>                                                               '
                +'    </thead>                                                            '
                +'    <tbody>                                                             '
                +'    <tr ng-repeat="AmbRadar in source">              '//{ambid:iidd}
                +'    <td>{{AmbRadar.amoebaName}}</td>                                     '
                +'    <td><a ng-click=\"clickass({ambid:AmbRadar.amoeba_id,assType:\'1\',ambname:AmbRadar.amoebaName})\">{{AmbRadar.front}}</a></td>                                         '
                +'    <td><a ng-click=\"clickass({ambid:AmbRadar.amoeba_id,assType:\'2\',ambname:AmbRadar.amoebaName})\">{{AmbRadar.back}}</a></td>                                          '
                +'    <td><a ng-click=\"clickass({ambid:AmbRadar.amoeba_id,assType:\'3\',ambname:AmbRadar.amoebaName})\">{{AmbRadar.mobile}}</a></td>                                        '
                +'    <td>{{AmbRadar.demand}}</td>                                        '
                +'    <td>{{AmbRadar.product}}</td>                                       '
                +'    <td align=\'center\'><button ng-click=\"click({ambid:AmbRadar.amoeba_id})\" type=\"button\" class=\"btn-xs btn-info\">雷达</button><button ng-click=\"clickass({ambid:AmbRadar.amoeba_id,assType:\'\',ambname:AmbRadar.amoebaName})\" type=\"button\" class=\"btn-xs btn-info\">组件</button></td>                                       '
                +'    </tr>                                                               '
                +'</tbody>                                                                '
                +'</table>',
            link:function(scope,element){
                function initDatatable(){
                    if (!scope.source) {
                        return;
                    }
                    require(['jquery', 'datatables.net','datatables.net-bs'], function initDatatable($) {
                        $('#datatable').dataTable({
                            "info": true,
                            "sDom":'<"top"f<"clear">>rt<"bottom"ip<"clear">>'  ,
                            "pagingType":   "simple",
                            "oLanguage" : {    // 汉化    
                                "sLengthMenu": "每页显示 _MENU_条",  
                                "sZeroRecords": "没有找到符合条件的数据",  
                                "sProcessing": "加载中...",  
                                "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",  
                                "sInfoEmpty": "没有记录",  
                                "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",  
                                "sSearch": "&nbsp;&nbsp;&nbsp;&nbsp;搜索：",
                                "oPaginate": {  
                                    "sPrevious": "<i class=\"fa fa-arrow-left\"></i>",  
                                    "sNext": "<i class=\"fa fa-arrow-right\"></i>",  
                                }
                            }
                        }); 
                    });
                }
                scope.$watch(function () {
                    return scope.source;
                }, function (value) {
                    if (value) {
                        initDatatable();
                    }
                }, true);
            }
        }
    })
});






