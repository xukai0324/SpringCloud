/**
 * Created by ZhangJiansen on 2016/9/10.
 * requireJS入口文件
 */
require.config({
    baseUrl: '/front',
    urlArgs: 'v='+ window.CACTUS.version,
    paths: { 
        /*第三方库文件*/
        'domReady': 'lib/requirejs-domReady/domReady', 
        'jquery': 'lib/jquery/jquery.min', 
        'angular': 'lib/angular/angular1.2.20', 
        'uiRouter': 'lib/angular-ui-router/angular-ui-router.min', 
        'ocLazyLoad':'lib/ocLazyLoad/ocLazyLoad.require.min', 
        'ngCookies': 'lib/angular-cookies/angular-cookies', 
        'bootstrap': 'lib/bootstrap/bootstrap.min', 
        'uiBootstrap': 'lib/ui-bootstrap/ui-bootstrap-tpls.min', 
        'ngAnimate': 'lib/angular-animate/angular-animate', 
        'tmPagination': 'lib/angular-tm-pagination/tm.pagination.min', 
        'jedate': 'lib/angular-jedate/jedate', 
        'angular-jeDate': 'lib/angular-jedate/angular-jedate', 
        'echarts-all': 'lib/angular-echarts/echarts-all', 
        'angular-echarts': 'lib/angular-echarts/angular-echarts', 
        'angular-wordcloud': 'lib/angular-echarts/angular-wordcloud', 
        'angular-line': 'lib/angular-echarts/angular-line', 
        'ui-select' : 'lib/angular-ui-select/select', 
        'angular-sanitize' : 'lib/angular-sanitize/angular-sanitize.min', 
        'angular-file-uplaod':'lib/angular-file-upload/angular-file-upload.min', 
        'ngLocalStorage':'lib/angular-local-storage/angular-local-storage.min', 
        'angular-ui-tree':'lib/angular-ui-tree/angular-ui-tree.min',  //机构树插件
        'lightbox':'lib/lightbox/lightbox',
        'constants':'frame/common/constants',
        'modernizr' : 'lib/modernizr/modernizr-2.0.6.min',
        'placeholder' : 'lib/placeholder',
        'ztree' : 'lib/ztree/js/jquery.ztree.all.min',
        // 'ztreec': 'lib/ztree/js/jquery.ztree.excheck.min',
        //'ueditor.config':'lib/ueditor/ueditor.config',
        //'ueditor.all':'lib/ueditor/ueditor.all',
        //'angular-ueditor':'lib/ueditor/angular-ueditor',
        /*
         *首页嵌套界面的依赖
         * mawenzheng
         * */
        'bootstrap-progressbar':'lib/bootstrap-progressbar/bootstrap-progressbar.min',
        'echarts':'lib/source/echarts',
        'index_chart':'lib/index_chart',//字符云的点击事件
        'Chart.min':'lib/Chart.js/dist/Chart.min',
        'fastclick':'lib/fastclick/lib/fastclick',
        'gauge.min':'lib/gauge.js/dist/gauge.min',
        'icheck.min':'lib/iCheck/icheck.min',
        'skycons':'lib/skycons/skycons',
        'jquery.flot':'lib/Flot/jquery.flot',
        'jquery.flot.pie':'lib/Flot/jquery.flot.pie',
        'jquery.flot.time':'lib/Flot/jquery.flot.time',
        'jquery.flot.stack':'lib/Flot/jquery.flot.stack',
        'jquery.flot.resize':'lib/Flot/jquery.flot.resize',
        /*datatable*/
        'datatables.net' : 'lib/datatables/jquery.dataTables',
        'datatables.net-bs' : 'lib/datatables/dataTables.bootstrap',
        /*框架模块入口文件*/
        'framework':'frame/frame.mod',
        'utility': 'utilities/utilities.mod',
        'widget': 'widgets/widgets.mod',
        /*业务模块入口文件*/
        'business': 'components/business.mod',
        'angular-mocks': 'lib/angular-mocks/angular-mocks',
        'moment':'lib/moment/moment'
    },
    /*如果需要加载的模块库不符合AMD规范则需要shim定义他们的特征*/
    shim: {
        /*exports值（输出的变量名），表明这个模块外部调用时的名称*/
        'angular': {'exports': 'angular'},
        'uiRouter':['angular'],
        'ocLazyLoad':['angular'],
        'ngAnimate':['angular'],
        'ngCookies':['angular'],
        'tmPagination': ['angular'],
        'angular-echarts': ['angular','echarts-all'],
        'angular-wordcloud': ['angular','echarts-all'],
        'angular-line': ['angular','echarts-all'],
        'angular-sanitize': ['angular'],
        'angular-ui-tree':['angular'],
        'angular-file-uplaod':['angular'],
        'ui-select': ['angular-sanitize'],
        'uiBootstrap':['angular'],
        'ngLocalStorage':['angular'],
        'lightbox':['jquery'],
        'angular-mocks': {
            deps: ['angular']
        },
        'ztree' :{deps:['jquery'], 'exports':'ztree'}
        // ,
        // 'ztreec':{deps:['jquery'], 'exports':'ztreec'}
    },
    /*优先加载*/
    priority: [
        'jquery',
        'angular',
        'uiRouter',
        'bootstrap'
    ],
    waitSeconds: 100
});

require([
        'jquery', /*jquery要在前面*/
        'angular',
        'app',
        'route',
        'uiBootstrap',
        'placeholder'
    ],
    function ($, angular) {
        angular.element(document).ready(function () {
            //手工装配Angular APP
            /*document:是绑定ng-app的dom元素；
             appIndex：绑定的模块名字*/
            angular.bootstrap(document, ['appIndex']);
            //关闭启动画面
            //$('.splash-window').remove();
        });
    }
);
