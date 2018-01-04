/**
 * Created by GuoXiangLian on 2016/11/24.
 */
define(
    [
        "./data/menuQueryList",
        "./data/menuQuery",
        "./data/resultMenu",
        "./data/resultMenu",
        "./data/resultMenu",
        "./data/queryMenuTypeList",
        'utilities/constant/ApiPathConstant',
        "./data/userInfo",
        "./data/menu",
        "./data/initSelectTag",
        "./data/queryDownComCode",
        "./data/queryHeadComCode",
        "./data/checkUserCode",
        "./data/queryGradeList",
        "./data/queryUserList",
        "./data/saveUser",
        "./data/initEdit",
        /*"./data/application",
         "./data/endorse",
         "./data/endorseInsured",*/
        "./data/forEndorse",
        "./data/getCifIdvList",
        "./data/getRiskList",
        /*"./data/grade",
         "./data/group",
         "./data/insuredDatas",
         "./data/login",
         "./data/module",*/
        "./data/newProposalMenu",
        /*"./data/offlineCharge",*/
        "./data/onLineGoToPay",
        /*"./data/personal",
         "./data/proposalNo",*/
        "./data/queryAllOpinions",
        "./data/queryApproval",
        "./data/queryEpolicyFileId",
        /*"./data/queryFuzzyCopyInsuredPropPage",*/
        "./data/queryImgFilePage",
        "./data/queryImportErrHis",
        "./data/queryInsuredPageInfo",
        "./data/queryOnLinePayStatus",
        "./data/queryPayInfo",
        "./data/queryPolicy",
        "./data/queryPolicyInsured",
        "./data/querySurrender",
        /*"./data/reportModule",*/
        "./data/save",
        "./data/saveEndorse",
        "./data/saveInitEndorse",
        /*"./data/selectCode",*/
        "./data/statDataQuery",
        "./data/submitEndorse",
        "./data/submitUndwrt",
        "./data/summaryEndorseQuantity",
        "./data/summaryProposalQuantity",
        "./data/surrenderConfirm",
        "./data/updateEndorseDecide",
        "./data/validateApproval",
        "./data/validatePolicyForEndorse",
        // "./data/InfogaterTypeList",
        // "./data/InfogaterTypeView",
        // "./data/InfogaterCodeList",
        // "./data/InfogaterCodeView",
        // "./data/InfogaterInfoList",
        // "./data/InfogaterInfoView",
        // "./data/InfogaterInfoListList",
        // "./data/InfogaterInfoListView"
    ],function (menuQueryList,menuQuery,saveMenu,updateMenu,delMenu,queryMenuTypeList,ApiPath,userInfo,menu,initSelectTag, queryDownComCode,
                queryHeadComCode,checkUserCode,queryGradeList,queryUserList,
                saveUser,initEdit,forEndorse,getCifIdvList,
                getRiskList,newProposalMenu,onLineGoToPay,queryAllOpinions,queryApproval,
                queryEpolicyFileId,queryImgFilePage,queryImportErrHis,queryInsuredPageInfo,
                queryOnLinePayStatus,queryPayInfo,queryPolicy,
                queryPolicyInsured,querySurrender,save,saveEndorse,saveInitEndorse,
                statDataQuery,submitEndorse,submitUndwrt,summaryEndorseQuantity,
                summaryProposalQuantity,surrenderConfirm,updateEndorseDecide,validateApproval,
                validatePolicyForEndorse
                // ,InfogaterTypeList,InfogaterTypeView,InfogaterCodeList,InfogaterCodeView
                // ,InfogaterInfoList,InfogaterInfoView,InfogaterInfoListList,InfogaterInfoListView
    ) {

        /**
         * 此处定义接口处理回调方法，对于需要特殊处理的接口，定义回调，覆盖默认的返回处理
         * @author ZhangJiansen
         * @date   2016/12/14
         * @param method
         * @param url
         * @param req 请求数据
         * @param res 返回数据
         * @returns {*} api处理结果
         */
        var initSelectTagCallBack = function(method, url, req, res){
            var param = JSON.parse(req);
            if(param.codeType == "amoebaList") {
                return [200,res.amoebaList]
            }else if(param.codeType == "sysType") {
                return [200,res.sysType]
            }else if(param.codeType == "PersonalIdentifyType") {
                return [200,res.PersonalIdentifyType]
            }else if(param.codeType == "BusinessNature") {
                return [200,res.BusinessNature]
            }else if(param.codeType == "ConstructType") {
                return [200,res.ConstructType]
            }else if(param.codeType == "Company") {
                return [200,res.Company]
            }else if(param.codeType == "IdentifyType") {
                return [200,res.IdentifyType]
            }else if(param.codeType == "ProposalFileType") {
                return [200,res.ProposalFileType]
            }else if(param.codeType == "EndorFileType") {
                return [200,res.EndorFileType]
            }else if(param.codeType == "ProposalDelRes") {
                return [200,res.ProposalDelRes]
            }else if(param.codeType == "SuspendPStatus") {
                return [200,res.SuspendPStatus]
            }else if(param.codeType == "EndorType") {
                return [200,res.EndorType]
            }else if(param.codeType == "SubsidyType") {
                return [200,res.SubsidyType]
            }else if(param.codeType == "EndorseDelRes") {
                return [200,res.EndorseDelRes]
            }else if(param.codeType == "EndorStatus") {
                return [200,res.EndorStatus]
            }else if(param.codeType == "Insuredrelation") {
                return [200,res.Insuredrelation]
            }else if(param.codeType == "CapitalBankType") {
                return [200,res.CapitalBankType]
            }else if(param.codeType == "PayeePubPrivType") {
                return [200,res.PayeePubPrivType]
            }else if(param.codeType == "EndorReason") {
                return [200,res.EndorReason]
            }else if(param.codeType == "EndorStatus3and4") {
                return [200,res.EndorStatus3and4]
            }else if(param.codeType == "ProposalStatus") {
                return [200,res.ProposalStatus]
            }else if(param.codeType == "PolicyStatus") {
                return [200,res.PolicyStatus]
            }else {
                return [404];
            }
        };

        //首页面请求
        var indexCallBack=function(method, url, req, res){
            var param = JSON.parse(req);
            if(param.statCode=="itemCount"){
                return [200,res.mapData];
            }else if(param.statCode=="statPolicy"){
                return [200,res.lineData];
            }else{
                return [404];
            }
        };

        /**
         * 此处定义每个接口mock处理的映射表，相同系统接口请放在一起
         * name:接口名,无逻辑判断；desc:接口中文描述; method:接口处理方法(GET/POST); url:接口调用url,对应后台的url; data:接口返回值: callback:回调方法,用在需要对返回值特殊处理时,可空
         * @author ZhangJiansen
         * @date   2016/12/14
         */
        return [
            /*极客生活*/
            {"name":"getMenuQueryList", "desc":"菜单列表", "method":"POST", "url":ApiPath.api.getMenuQueryList, "data":menuQueryList},
            {"name":"getMenuQuery", "desc":"查看", "method":"GET", "url":ApiPath.api.getMenuQuery, "data":menuQuery},
            {"name":"saveMenu", "desc":"保存菜单","method":"POST", "url":ApiPath.api.menuSave, "data":saveMenu},
            {"name":"updateMenu", "desc":"更新菜单","method":"POST", "url":ApiPath.api.menuUpdate, "data":updateMenu},
            {"name":"delMenu", "desc":"删除菜单","method":"POST", "url":ApiPath.api.menuDel, "data":delMenu},
            {"name":"queryMenuTypeList", "desc":"类型列表","method":"GET", "url":ApiPath.api.queryMenuTypeList, "data":queryMenuTypeList},
        /** ims系统接口 */
            //{"name":"userInfo", "desc":"用户登录", "method":"GET", "url":ApiPath.api.getLoginUesr, "data":userInfo},
            {"name":"menu",      "desc":"菜单查询", "method":"GET", "url":ApiPath.api.getMenus+"/gscore-front", "data":menu},
            {"name":"queryDownComCode", "desc":"用户省级机构","method":"POST", "url":"/comm-web/user/queryDownComCode", "data":queryDownComCode},
            {"name":"queryHeadComCode", "desc":"所属保险公司","method":"POST", "url":"/comm-web/user/queryHeadComCode", "data":queryHeadComCode},
            {"name":"checkUserCode",    "desc":"登录账号校验","method":"POST", "url":"/comm-web/user/checkUserCode", "data":checkUserCode},
            {"name":"queryGradeList",   "desc":"查询岗位机构","method":"POST", "url":"/comm-web/user/queryGradeList", "data":queryGradeList},
            {"name":"queryUserList",   "desc":"查询用户列表","method":"POST", "url":"/comm-web/user/queryUserList", "data":queryUserList},
            {"name":"saveUser", "desc":"保存用户","method":"POST", "url":"/comm-web/user/saveUser", "data":saveUser},
        /** dms系统接口 */
            {"name":"initSelectTag", "desc":"下拉框初始化","method":"POST", "url":"/gscore-pa-web/commonSelect/initSelectTag", "data":initSelectTag,"callback":initSelectTagCallBack},
        /** pms系统接口 */
            {"name":"getRiskList","desc":".....","method":"POST", "url":"/comm-web/risk/getRiskList", "data":getRiskList},
        /** pa系统接口 */
        /**prpins系统接口*/
            {"name":"initEdit","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/initEdit", "data":initEdit},
            {"name":"forEndorse","desc":".....","method":"POST", "url":"/gscore-pa-web/commonquery/forEndorse", "data":forEndorse},
            {"name":"queryAllOpinions","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/queryAllOpinions", "data":queryAllOpinions},
            {"name":"queryApproval","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/queryApproval", "data":queryApproval},
            {"name":"queryImgFilePage","desc":".....","method":"POST", "url":"/gscore-pa-web/file/queryImgFilePage", "data":queryImgFilePage},
            {"name":"queryImportErrHis","desc":".....","method":"POST", "url":"/gscore-pa-web/insured/queryImportErrHis", "data":queryImportErrHis},
            {"name":"queryInsuredPageInfo","desc":".....","method":"POST", "url":"/gscore-pa-web/insured/queryInsuredPageInfo", "data":queryInsuredPageInfo},
            {"name":"queryPolicy","desc":".....","method":"POST", "url":"/gscore-pa-web/policy/queryPolicy", "data":queryPolicy},
            {"name":"queryPolicyInsured","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/queryPolicyInsured", "data":queryPolicyInsured},
            {"name":"querySurrender","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/querySurrender", "data":querySurrender},
            {"name":"save","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/save", "data":save},
            {"name":"saveEndorse","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/saveEndorse", "data":saveEndorse},
            {"name":"saveInitEndorse","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/saveInitEndorse", "data":saveInitEndorse},
            {"name":"submitEndorse","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/submitEndorse", "data":submitEndorse},
            {"name":"submitUndwrt","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/submitUndwrt", "data":submitUndwrt},
            {"name":"surrenderConfirm","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/surrenderConfirm", "data":surrenderConfirm},
            {"name":"surrenderConfirm","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/surrenderConfirm", "data":surrenderConfirm},
            {"name":"updateEndorseDecide","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/updateEndorseDecide", "data":updateEndorseDecide},
            {"name":"validateApproval","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/validateApproval", "data":validateApproval},
            {"name":"validatePolicyForEndorse","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/validatePolicyForEndorse", "data":validatePolicyForEndorse},

        /**ecif 模块*/
            {"name":"getCifIdvList","desc":".....","method":"POST", "url":"/comm-web/CIFCustomerInfo/getCifIdvList", "data":getCifIdvList},
        /**index 模块*/
            {"name":"newProposalMenu","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/newProposalMenu", "data":newProposalMenu},
            {"name":"statDataQuery","desc":".....","method":"POST", "url":"/gscore-pa-web/stat/statDataQuery", "data":statDataQuery,"callback":indexCallBack},
            {"name":"summaryEndorseQuantity","desc":".....","method":"POST", "url":"/gscore-pa-web/endorse/summaryEndorseQuantity", "data":summaryEndorseQuantity},
            {"name":"summaryProposalQuantity","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/summaryProposalQuantity", "data":summaryProposalQuantity},

        /**payment 支付模块*/
            {"name":"onLineGoToPay","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/onLineGoToPay", "data":onLineGoToPay},
            {"name":"queryOnLinePayStatus","desc":".....","method":"POST", "url":"/gscore-pa-web/policy/queryOnLinePayStatus", "data":queryOnLinePayStatus},
            {"name":"queryPayInfo","desc":".....","method":"POST", "url":"/gscore-pa-web/proposal/queryPayInfo", "data":queryPayInfo},

        /** document 模块*/
            {"name":"queryEpolicyFileId","desc":".....","method":"POST", "url":"/gscore-pa-web/epolicy/queryEpolicyFileId", "data":queryEpolicyFileId}
            // {"name":"getInfogaterTypeList", "desc":"代码类型列表", "method":"POST", "url":ApiPath.api.getInfogaterTypeList, "data":InfogaterTypeList},
            // {"name":"getInfogaterTypeById", "desc":"代码类型查看", "method":"POST", "url":ApiPath.api.getInfogaterTypeById, "data":InfogaterTypeView},
            // {"name":"getInfogaterCodeList", "desc":"代码清单列表", "method":"POST", "url":ApiPath.api.getInfogaterCodeList, "data":InfogaterCodeList},
            // {"name":"getInfogaterCodeById", "desc":"代码清单查看", "method":"POST", "url":ApiPath.api.getInfogaterCodeById, "data":InfogaterCodeView},
            // {"name":"getInfogaterInfoList", "desc":"代码类型列表", "method":"POST", "url":ApiPath.api.getInfogaterInfoList, "data":InfogaterInfoList},
            // {"name":"getInfogaterInfoById", "desc":"代码类型查看", "method":"POST", "url":ApiPath.api.getInfogaterInfoById, "data":InfogaterInfoView},
            // {"name":"getInfogaterInfoListList", "desc":"代码清单列表", "method":"POST", "url":ApiPath.api.getInfogaterInfoListList, "data":InfogaterInfoListList},
            // {"name":"getInfogaterInfoListById", "desc":"代码清单查看", "method":"POST", "url":ApiPath.api.getInfogaterInfoListById, "data":InfogaterInfoListView}
        ]
    }
);