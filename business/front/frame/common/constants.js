/**
 * Created by ZhangJiansen on 2016/11/1.
 */
define({
    APP:{
        APP_CODE:'gscore-front',
        APP_NAME:'巨灾保险运营平台'
    },

    HEADERS:{
        AUTH_URL_NAME:'AuthLocation',
        REDIRECT_URL_NAME:'RedirectLocation',
        RESP_MSG_NAME:'RetMsg'
    },

    RESULT_CODE:{
        SUCCESS:'0000',
        FAIL:'9999'
    },

    EVENTS:{
        APP_READY: 'event:app-ready',
        HTTP_WAIT:'event:http-wait',//http请求中
        AUTH_VALID_FAIL:'event:valid-fail',//身份验证失败
        AUTH_VALID: 'event:auth-valid', //登录成功
        LOGOUT_SUCCESS: 'event:logout-success', //注销成功
        AUTH_REJECT: 'event:auth-reject' //权限不够
    },

    AUTH:{
        OK: 200,                //正常
        REDIRECT:300,           //跳转
        UNAUTHORIZED: 401,      //没有登录
        FORBIDDEN: 403          //没有权限
    },

    ROLE:{
        NB: '001'               //录单员
    },

    LOCALSTORAGE:{
        USER: 'user'          //用户信息
    }
});