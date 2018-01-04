/**
 * Created by ZhangJiansen on 2016/10/13.
 * 表单校验模块
 */
define(['angular'],
    function(angular) {
    'use strict';

    /**
     * 判断证件号是否为空
     * @param cardNo
     * @returns {boolean}
     */
    var cardNoisEmpty = function(cardNo){
        if(!angular.isDefined(cardNo) || cardNo == null || cardNo == ""){
            return true;
        }
        return false;
    };

    /**
     *01.校验身份证
     **/
    var validateIDCard = function(card){

        var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
        };

        var checkIDCard = function(card)
        {
            //是否为空
            if(card === '')
            {
                return false;
            }
            //校验长度，类型
            if(isCardNo(card) === false)
            {
                return false;
            }
            //检查省份
            if(checkProvince(card) === false)
            {
                return false;
            }
            //校验生日
            if(checkBirthday(card) === false)
            {
                return false;
            }
            //检验位的检测
            if(checkParity(card) === false)
            {
                return false;
            }
            return true;
        };


        //检查号码是否符合规范，包括长度，类型
        var isCardNo = function(card)
        {
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if(reg.test(card) === false)
            {
                return false;
            }

            return true;
        };

        //取身份证前两位,校验省份
        var checkProvince = function(card)
        {
            var province = card.substr(0,2);
            if(vcity[province] == undefined)
            {
                return false;
            }
            return true;
        };

        //检查生日是否正确
        var checkBirthday = function(card)
        {
            var len = card.length;
            //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
            if(len == '15')
            {
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arr_data = card.match(re_fifteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date('19'+year+'/'+month+'/'+day);
                return verifyBirthday('19'+year,month,day,birthday);
            }
            //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
            if(len == '18')
            {
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arr_data = card.match(re_eighteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date(year+'/'+month+'/'+day);
                return verifyBirthday(year,month,day,birthday);
            }
            return false;
        };

        //校验日期
        var verifyBirthday =function(year,month,day,birthday)
        {
            var now = new Date();
            var now_year = now.getFullYear();
            //年月日是否合理
            if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
            {
                //判断年份的范围（0岁到100岁之间)
                var time = now_year - year;
                if(time >= 0 && time <= 100)
                {
                    return true;
                }
                return false;
            }
            return false;
        };

        //校验位的检测
        var checkParity =function(card)
        {
            //15位转18位
            card = changeFivteenToEighteen(card);
            var len = card.length;
            if(len == '18')
            {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0, i, valnum;
                for(i = 0; i < 17; i ++)
                {
                    cardTemp += card.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[cardTemp % 11];
                if (valnum == card.substr(17, 1))
                {
                    return true;
                }
                return false;
            }
            return false;
        };

        //15位转18位身份证号
        var changeFivteenToEighteen =function(card)
        {
            if(card.length == '15')
            {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0, i;
                card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                for(i = 0; i < 17; i ++)
                {
                    cardTemp += card.substr(i, 1) * arrInt[i];
                }
                card += arrCh[cardTemp % 11];
                return card;
            }
            return card;
        };

        return checkIDCard(card);
    };

    /**
    *99.校验其他证件类型,不允许输入汉字
    **/
    var validateOther = function(card){
        var creditNoRegexp = /^[^\u4e00-\u9fa5]{0,}$/;
        var validity = cardNoisEmpty(card) || creditNoRegexp.test(card);
        return validity ? card : undefined;
    };

    /**
     *证件类型校验函数表
     * key：证件类型
     * value：对应的校验方法
     **/
    var validateFuns = {
        "01":validateIDCard,
        "02":validateOther
    };


    /**
     * Created by ZhangJiansen on 2016/10/16.
     * 表单校验模块总入口
     **/
    angular.module("sino.validity", ["sino.validity.prompt","sino.validity.directive"]);

    /**
     * 自定义校验整理模块
     */
    angular.module("sino.validity.directive", [])
        .directive('svCredit', [function () {
            return {
                require: "ngModel",
                restrict:'A',
                link: function (scope, element, attr, ctrl) {

                    /**
                    *全局校验方法变量
                     */
                    var validateFun;

                    /**
                     * 用于根据证件类型更新校验方法
                     * @param type
                     */
                    var refreshValidateFun = function(type){
                        console.log("证件类型："+type);
                        validateFun = angular.isDefined(validateFuns[type])?validateFuns[type]:validateOther;
                    };


                    /**
                     * 证件类型变化响应方法
                     * @param newValue
                     * @param oldValue
                     * @param scope
                     */
                    var onCreditTypeChange = function(newValue, oldValue, scope){
                        if(newValue == oldValue){
                            return;
                        }

                        //更新校验方法体
                        refreshValidateFun(newValue);

                        if(!angular.isDefined(oldValue) || oldValue == ""){
                            console.log("oldValue is empty");
                            return;
                        }

                        var creditCode = !ctrl.$modelValue?ctrl.$viewValue:ctrl.$modelValue;
                        
                        if(!creditCode){
                            console.log("credit no is empty");
                            return;
                        }

                        //触发ctrl的$parses，重新校验
                        //ctrl.$setValidity("svCredit", true);
                        //ctrl.$error = {};
                        //ctrl.$invalid = false;
                        console.log("creditCode="+creditCode);
                        ctrl.$setViewValue(creditCode);
                        ctrl.$render();
                        
                        //customValidator(creditCode);

                        //焦点到证件号码，触发校验提示
                        if(!ctrl.$invalid){
                            $(element).next().css('display','none');
                        }else{
                            $(element).next().css('display','inline');
                            element.focus();
                        }

                    };

                    /**
                     * 监控证件类型变化
                     */
                    scope.$watch(attr.svCredit,onCreditTypeChange);

                    /**
                     * 设置默认的校验方法
                     */
                    var svCredit = scope.$eval(attr.svCredit);
                    refreshValidateFun(svCredit);

                    /**
                     * 自定义校验
                     * @param value
                     * @returns {undefined}
                     */
                    var customValidator = function (value) {
                        console.log("证件号码："+value+",validfun="+validateFun.name);
                        var validity = ctrl.$isEmpty(value) || validateFun(value);
                        ctrl.$setValidity("svCredit", validity);
                        return validity ? value : undefined;
                    };

                    ctrl.$formatters.push(customValidator);
                    ctrl.$parsers.push(customValidator);

                    //ctrl.$setViewValue = function(value){};

                }
            };
        }]);

    /**
     *表单校验提示处理模块
     **/
    angular.module("sino.validity.prompt",[])
        /**提交表单时，将焦点定位到第一个不符合规则的控件上*/
        .factory('FormFocus',function(){
            var checkIsIE = function () {
                if ((navigator.userAgent.indexOf('MSIE') >= 0)
                    && (navigator.userAgent.indexOf('Opera') < 0)){
                    return true;
                } else {
                    return false;
                }
            };
            return {
                focusEle:function(formName) {
                    var express = "[name="+formName+"] .ng-invalid:not(ng-form)";
                    var Ele = $(express);
                    $.each(Ele, function (index, ele) {
                        $(ele).addClass('ng-dirty');
                        if($(ele).next().length>0){
                            if($(ele).next()[0].className.indexOf('fake_pass') > -1){
                                $(ele).next().addClass('ng-dirty');
                            }
                        }
                    });

                    if (angular.isDefined(Ele[0])) {
                        if(Ele[0].nodeName == "CODE-TYPE"||Ele[0].nodeName == "code-type"){ //匹配下拉框
                            if( (Ele[0].attributes["is-fuzzy"] == undefined) || (Ele[0].attributes["is-fuzzy"].nodeValue == "false") ) {
                                if ((navigator.userAgent.indexOf('MSIE 8.0') >= 0)|| (navigator.userAgent.indexOf('MSIE 11.0') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
                                    Ele[0].children[3].children[0].children[0].focus();
                                    // scroll(0,-267);
                                }else{
                                    Ele[0].children[0].children[0].children[0].focus();
                                }
                            } else {
                                if ((navigator.userAgent.indexOf('MSIE 8.0') >= 0)|| (navigator.userAgent.indexOf('MSIE 11.0') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
                                    Ele[0].children[1].children[0].children[0].focus();
                                }else{
                                    Ele[0].children[0].children[0].children[0].focus();
                                }
                            }
                        }else if(Ele[0].nodeName == "DIV" && $(Ele[0]).hasClass('ui-select-container')) { //div匹配ui-select
                            Ele[0].children[4].focus();
                        } else {
                            //Ele[0].focus();
                            if($(Ele[0]).next().length>0 && $(Ele[0]).next()[0].className.indexOf('fake_pass') > -1&&
                                ($(Ele[0]).next().css("display")=="block"||$(Ele[0]).next().css("display")=="inline-block")){
                                $(Ele[0]).next().addClass('ng-dirty');
                                $(Ele[0]).next()[0].focus();
                            }else{
                                Ele[0].focus();
                            }
                        }
                    }
                }
            }
        })
        /**校验指令，用于在不符合规则的控件下自动生成提示信息*/
        .directive('warnText', ['$parse',function($parse) {
            return {
                restrict: 'A',
                require: 'ngModel',
                compile: function () {
                    return function ($scope, element, attrs, ctrl) {
                        $(element).after('<div class="validation-errorText"></div>');
                        var errorText = $(element).parent().find('div');
                        $(element).next().attr('name', $(element)[0].name);
                        element.on('blur', function () {

                            var obj;
                            try{
                                obj = eval('(' + attrs.warnText + ')');
                            }catch(e){
                                var str="{'NonEmpty':'','NonLength':'','ErrPattern':''}";
                                obj = angular.toJson(str);
                            }
                            //判断
                            if(angular.isDefined(attrs.jedate)&&document.querySelector(".jedatebox.jedateblue")!=null){
                            }else if (ctrl.$invalid) {
                                $(element).addClass('ng-dirty');
                                angular.forEach(errorText, function (error, index) {
                                    console.log("校验错误表:"+JSON.stringify(ctrl.$error));
                                    console.log("被校验值:"+ctrl.$viewValue);
                                    if(ctrl.$error.required){
                                        errorText[index].innerHTML = '不允许为空';
                                        error.style.display = "inline";
                                    }else if(ctrl.$error.minlength){
                                        errorText[index].innerHTML = '最小长度为'+attrs.ngMinlength;
                                        error.style.display = "inline";
                                    }else if(ctrl.$error.maxlength){
                                        errorText[index].innerHTML = '最大长度为'+attrs.ngMaxlength;
                                        error.style.display = "inline";
                                    }else if(ctrl.$error.svCredit){
                                        errorText[index].innerHTML = '不符合证件号码规则';
                                        error.style.display = "inline";
                                    }else if(ctrl.$error.pattern){
                                        if(obj.ErrPattern && obj.ErrPattern != ''){
                                            errorText[index].innerHTML = obj.ErrPattern;
                                        }else{
                                            errorText[index].innerHTML = attrs.warnText+'格式不正确';
                                        }
                                        //errorText[index].innerHTML = '不符合规则';
                                        error.style.display = "inline";
                                    }else{
                                        error.style.display = "none";
                                    }

                                });
                            }
                        });
                        element.on('focus', function () {
                            $(errorText).hide();
                        })
                    }
                }
            }
        }]);
});