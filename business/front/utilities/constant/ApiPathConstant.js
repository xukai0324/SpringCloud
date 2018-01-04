/**
 * Created by ZhangJiansen on 2016/10/10.
 */
define([], function () {
    'use strict';
    //配置应用的path
    var app= {
        gscoreWeb:"/gscore-pa-web",
        commWeb:"/comm-web",
        commFileServer: "/comm-fileserver",
        jikeWeb : "/jike",
        timWeb : "/tim-web",
        platformWeb : "/platform"
    };

    //配置公共模块服务的path
    var api={
        //技术信息收集功能--start
        //工作收集--start
        saveDevTool : app.timWeb+"/devTool/saveDevTool",
        getDevToolList : app.timWeb+"/devTool/getDevToolList",
        getDevToolById : app.timWeb+"/devTool/getDevToolById",
        delDevToolById : app.timWeb+"/devTool/delDevToolById",
        //工作收集--end
        //项目收集--start
        saveProject:app.timWeb+"/gleanProjectInfo/save",
        logicRemoveProject:app.timWeb+"/gleanProjectInfo/logicRemove",
        updateProject:app.timWeb+"/gleanProjectInfo/update",
        queryProjectPage:app.timWeb+"/gleanProjectInfo/queryPage",
        queryProjectById:app.timWeb+"/gleanProjectInfo/queryGleanProjectInfoById",
        queryComponentsPage:app.timWeb+"/gleanProjectInfo/queryComponentsPage",
        queryToolsPage:app.timWeb+"/gleanProjectInfo/queryToolsPage",
        allComponentsForFramework:app.timWeb+"/gleanComponentInfo/allComponentsForFramework",
        //项目收集--end
        //人员技能收集--start
        queryTechPersonPage:app.timWeb+"/gleanTechPerson/queryPage",
        saveTechPersonPage:app.timWeb+"/gleanTechPerson/save",
        queryTechPersonById:app.timWeb+"/gleanTechPerson/queryGleanTechPersonById",
        queryDefaultTechData:app.timWeb+"/gleanTechPerson/queryDefaultTechData",
        //人员技能收集--end

        //***组件收集--工具收集**/
        selectDraw : app.timWeb+"/infogaterCode/queryChildByExample",
        saveComponent : app.timWeb+"/gleanComponentInfo/save",
        updateComponent:app.timWeb+"/gleanComponentInfo/update",
        getComponentList : app.timWeb+"/gleanComponentInfo/queryPage",
        getComponentById : app.timWeb+"/gleanComponentInfo/queryGleanComponentInfoById",

        delComponentById : app.timWeb+"/gleanComponentInfo/logicRemove",
        //组件版本清单
        getComponentListList : app.timWeb+"/gleanComponentInfoList/queryPage",
        saveComponentList : app.timWeb+"/gleanComponentInfoList/save",
        updateComponentList:app.timWeb+"/gleanComponentInfoList/update",
        delComponentListById : app.timWeb+"/gleanComponentInfoList/logicRemove",
        getComponentListById : app.timWeb+"/gleanComponentInfoList/queryGleanComponentInfoListById",
        //
        queryGleanComponentInfoVersionById:app.timWeb+'/gleanComponentInfo/queryGleanComponentInfoVersionById',
        getComponentVersionList:app.timWeb+'/gleanComponentInfoList/queryList',
        getToolVersionList:app.timWeb+'/gleanToolsInfoList/queryList',
        saveTool : app.timWeb+"/gleanToolsInfo/save",
        updateToolById:app.timWeb+"/gleanToolsInfo/update",
        getToolsList : app.timWeb+"/gleanToolsInfo/queryPage",
        getToolById : app.timWeb+"/gleanToolsInfo/queryGleanToolsInfoById",
        delToolById : app.timWeb+"/gleanToolsInfo/logicRemove",
        queryGleanToolsInfoByToolName : app.timWeb+"/gleanToolsInfo/queryGleanToolsInfoByToolName",
        gleanToolsInfoBatchAudit : app.timWeb+"/gleanToolsInfo/batchAudit",
        queryToolsDealCount : app.timWeb + "/gleanToolsInfo/queryToolsDealCount",
        getToolsVersionList : app.timWeb+"/gleanToolsInfoList/queryPage",
        getToolsListById : app.timWeb+"/gleanToolsInfoList/queryGleanToolsInfoListById",
        saveToolsVersionList : app.timWeb+"/gleanToolsInfoList/save",
        updateToolsVersionList : app.timWeb+"/gleanToolsInfoList/update",
        delToolsListById : app.timWeb+"/gleanToolsInfoList/logicRemove",
        queryGleanToolsListInfoByVersion : app.timWeb+"/gleanToolsInfoList/queryByVerison",
        auditToolsVersion : app.timWeb+"/gleanToolsInfoList/updateAudit",
        queryAuditPage : app.timWeb+"/gleanToolsInfoList/queryAuditPage",
        gleanToolsInfoListBatchAudit : app.timWeb+"/gleanToolsInfoList/batchAudit",
        //框架收集接口信息
        queryFrameWorkPage:app.timWeb+"/gleanFrameworkInfo/queryPage",
        queryPageWithComponents:app.timWeb+"/gleanFrameworkInfo/queryPageWithComponents",
        saveFrameWork:app.timWeb+"/gleanFrameworkInfo/save",
        removeFrameWork:app.timWeb+"/gleanFrameworkInfo/logicRemove",
        updateFrameWork:app.timWeb+"/gleanFrameworkInfo/update",
        queryFrameWorkById:app.timWeb+"/gleanFrameworkInfo/queryGleanFrameworkInfoById",
        //***组件收集--工具收集*end*/

        //部署环境收集--start
        getDeployEnvList : app.timWeb+"/gleanDeployEnvInfo/queryPage",
        saveDeployEnv : app.timWeb+"/gleanDeployEnvInfo/save",
        getDeployEnvById : app.timWeb+"/gleanDeployEnvInfo/queryGleanDeployEnvInfoById",
        delDeployEnvById : app.timWeb+"/gleanDeployEnvInfo/logicRemove",
        updateDeployEnv : app.timWeb+"/gleanDeployEnvInfo/update",
        //部署环境收集--end
        //权限管理模块-start
        
        
        
        insertParentMenu : app.timWeb+"/permit/insertParentMenu",
        insertChildMenu : app.timWeb+"/permit/insertChildMenu",
        queryPermitMenusByUserId : app.timWeb+"/permit/queryPermitMenuByUserId",
        queryAllPermitMenu : app.timWeb+"/permit/queryAllPermitMenu",
        queryAllMenuList: app.timWeb + "/permitMenu/queryList",
        insertPermitMenu : app.timWeb + "/permitMenu/save",
        deleteMenuById : app.timWeb+"/permitMenu/logicRemove",
        getMenuById : app.timWeb+"/permitMenu/queryPermitMenuById",
        updateMenu : app.timWeb+"/permitMenu/update",
        roleList : app.timWeb + "/permitRole/queryPage",
        roleBindMenus : app.timWeb+"/permit/roleBindMenus",
        initTreeNodes : app.timWeb+"/permit/initTreeNodes",
        getRoleById : app.timWeb + "/permitRole/queryPermitRoleById",
        getSelectedMenuByRoleId : app.timWeb + "/permitRoleMenu/getSelectedMunuList",
        updateOrCreateRole : app.timWeb + "/permitRole/updateOrCreateRole",
        deleteRole : app.timWeb + "/permitRole/logicRemove",
        getAllRole : app.timWeb + "/permitRole/queryList", // 获取所有角色
        listUser : app.timWeb +　"/permit_user/query_user",
        getADNames : app.timWeb +　"/permit_user/getADNames",
        getRolesByUserId : app.timWeb + "/permitRoleUser/getRolesByUserId",
        userBindRole : app.timWeb +"/permitRoleUser/saveBatch",
        
        
        //权限管理模块-end
        //技术信息收集功能--end
        //基础信息维护功能--start
        //信息维护--start
        saveInfogaterInfo : app.timWeb+"/infogaterInfo/save",
        updateInfogaterInfoById : app.timWeb+"/infogaterInfo/update",
        getInfogaterInfoList : app.timWeb+"/infogaterInfo/queryPage",
        getInfogaterInfoById : app.timWeb+"/infogaterInfo/queryInfogaterInfoById",
        delInfogaterInfoById : app.timWeb+"/infogaterInfo/logicRemove",
        //信息维护--end
        //版本维护--start
        saveInfogaterInfoList : app.timWeb+"/infogaterInfolist/save",
        updateInfogaterInfoListById : app.timWeb+"/infogaterInfolist/update",
        getInfogaterInfoListList : app.timWeb+"/infogaterInfolist/queryPage",
        getInfogaterInfoListById : app.timWeb+"/infogaterInfolist/queryInfogaterInfolistById",
        delInfogaterInfoListById : app.timWeb+"/infogaterInfolist/logicRemove",
        //版本维护--end
        //代码类型维护--start
        saveInfogaterType : app.timWeb+"/infogaterType/save",
        updateInfogaterTypeById : app.timWeb+"/infogaterType/update",
        getInfogaterTypeList : app.timWeb+"/infogaterType/queryPage",
        getInfogaterTypeById : app.timWeb+"/infogaterType/queryInfogaterTypeById",
        delInfogaterTypeById : app.timWeb+"/infogaterType/logicRemove",
        //代码类型维护--end
        //代码清单维护--start
        saveInfogaterCode : app.timWeb+"/infogaterCode/save",
        updateInfogaterCodeById : app.timWeb+"/infogaterCode/update",
        getInfogaterCodeList : app.timWeb+"/infogaterCode/queryPage",
        getInfogaterCodeById : app.timWeb+"/infogaterCode/queryInfogaterCodeById",
        delInfogaterCodeById : app.timWeb+"/infogaterCode/logicRemove",
        getQuesTypeList : app.timWeb+"/infogaterCode/queryList",
        getDepartmentList :  app.timWeb+"/quesProblem/initDepartment",
        //代码清单维护--end
        //基础信息维护功能--end

        //技术问题问答--start
        getFirstQuesList:app.timWeb+"/quesProblem/queryQuesList",
        getQuesDetailById:app.timWeb+"/quesDetail/queryDetailAllIInfo",
        submitDiscuss:app.timWeb+"/quesDetail/saveQuesAnswer",
        getQuesListByPage:app.timWeb+"/quesProblem/queryPage",
        getMyInfo:app.timWeb+"/quesProblem/initPutQues",
        submitQuestion:app.timWeb+"/quesDetail/savePutQues",
        acceptAnsw:app.timWeb+"/quesProblem/acceptAnsw",
        //技术问题问答--end

        
        //技术地图展示--start
        getTendByAss : app.timWeb+"/chart/tendency/getCloudAss",//技术组件趋势图（组件纬度）
        getCloudAmb : app.timWeb+"/chart/tendency/getCloudAmb",//阿米巴组件使用次数（组件纬度）
        getPreDay : app.timWeb+"/chart/tendency/getPreDay",//获取技术组件日线图数据
        getAmbRadarList : app.timWeb+"/chart/tendency/getAmbRadarList",//获得阿米巴能力列表
        getAmbRadar : app.timWeb+"/chart/tendency/getAmbRadar",//获得阿米巴能力
        
        getTopNPop : app.timWeb+"/chart/rank/getTopNPop",//流行开源技术排名
        getAssRank : app.timWeb+"/chart/rank/getAssRank",//组件综合排名
        getAssRankByAMB : app.timWeb+"/chart/rank/getAssRankByAMB",//阿米巴组件排名
        getAmoebaRank : app.timWeb+"/chart/rank/getAmoebaRank",//阿米巴登记组件排名
        getShowNum : app.timWeb+"/chart/shownum/getShowNum",//获取首页显示数字
        getTopQuesUrl : app.timWeb+"/quesProblem/topQues",//热门问题
        getProType : app.timWeb+"/chart/rank/getProType",//项目类型排名
        getToolType : app.timWeb+"/chart/rank/getToolType",//工具类型排名
        getProjectFrameWork : app.timWeb+"/chart/rank/getProjectFrameWork",//框架使用排名
        //技术地图展示--end

        //***需求发布**/
        saveDemand : app.timWeb+"/demandReleaseInfo/save",
        updateDemandById:app.timWeb+"/demandReleaseInfo/update",
        getDemandList : app.timWeb+"/demandReleaseInfo/queryPage",
        getDemandById : app.timWeb+"/demandReleaseInfo/queryDemandReleaseInfoById",
        delDemandById : app.timWeb+"/demandReleaseInfo/logicRemove",       

        //***进度发布**/
        saveDemandsch : app.timWeb+"/demandScheduleInfo/save",
        updateDemandschById:app.timWeb+"/demandScheduleInfo/update",
        getDemandschList : app.timWeb+"/demandScheduleInfo/queryPage",
        getDemandschById : app.timWeb+"/demandScheduleInfo/queryDemandScheduleInfoById",
        delDemandschById : app.timWeb+"/demandScheduleInfo/logicRemove",
        
        
        //***技术资源***/
        saveTechrepo : app.timWeb+"/techRepo/save",
        updateTechrepoById:app.timWeb+"/techRepo/update",
        getTechrepoList : app.timWeb+"/techRepo/queryPage",
        getTechrepoById : app.timWeb+"/techRepo/queryTechRepoById",
        delTechrepoById : app.timWeb+"/techRepo/logicRemove",
        //***技术资源***/
        
        
        getMenuQueryList : app.jikeWeb+"/agent/getMenuQueryList",
        //getMenuQueryList : app.jikeWeb+"/agentMenu/list",
        getMenuQuery : app.jikeWeb+"/agent/menuQuery",
        menuUpdate : app.jikeWeb+"/agent/menuUpdate",
        menuSave : app.jikeWeb+"/agent/saveMenu",
        menuDel : app.jikeWeb+"/agent/delMenu",
        queryMenuTypeList: app.jikeWeb + "/agent/queryMenuTypeList",        //框架使用api
        getLoginUser:app.timWeb+"/login/userInfo",
        getMenus:app.gscoreWeb+"/menu/tree",
        logout:app.timWeb+"/logout",

        //公共模块api
        /*getDictCode:app.gscoreWeb+"/commonSelect/initSelectTag",*/
        getDictCode:app.timWeb+"/commonSelect/initSelectTag",
        //加载标签
        getLabelCode:app.timWeb+"/infogaterLabel/queryList",

        //文件上传服务
        uploadFile: app.commFileServer + "/uploadFile",
        downloadFile: app.commFileServer + "/downloadFile",

        //文件下载服务
        downloadFileByShortLinkId: app.commFileServer + "/downloadFileByShortLinkId",

        //ecif 模块
        getCifIdvList: app.commWeb + "/CIFCustomerInfo/getCifIdvList",
        getCifUnitList: app.commWeb + "/CIFCustomerInfo/getCifUnitList",

        //ims服务地址
        queryCompany: app.commWeb + "/company/queryCompany",
        queryCompanyIdType: app.commWeb + "/company/queryCompanyIdType",
        queryUpperCompany: app.commWeb + "/company/queryUpperCompany",
        qeuryPrpDCompanyList: app.commWeb + "/company/qeuryPrpDCompanyList",
        queryCompanyByComcode: app.commWeb + "/company/queryCompanyByComcode",
        saveCompany: app.commWeb + "/company/saveCompany",
        updateCompany: app.commWeb + "/company/updateCompany",
        passwdUpdate: app.commWeb + "/user/updatePasswd",
        userUpdate: app.commWeb + "/user/updateUser",
        userSave: app.commWeb + "/user/saveUser",
        queryUserInfo: app.commWeb + "/user/queryUserInfo",
        checkUserCode: app.commWeb + "/user/checkUserCode",
        queryDownComCode: app.commWeb + "/user/queryDownComCode",
        queryHeadComCode: app.commWeb + "/user/queryHeadComCode",
        configUserGrade: app.commWeb + "/user/configUserGrade",
        queryGradeList: app.commWeb + "/user/queryGradeList",
        queryUserList: app.commWeb + "/user/queryUserList",
        userImportExcel: app.commWeb + "/user/importExcelUser",
        downUserInfo: app.commWeb + "/user/downUserInfo",
        downloadExcelTemplate: app.commWeb + "/user/downloadExcelTemplate",
        checkePwd: app.commWeb + "/user/checkePwd",
        getCompanyTree: app.gscoreWeb + "/underwriting/getCompanyTree",
        configUserPermitCompany: app.gscoreWeb + "/underwriting/configUserPermitCompany",

        //pms 服务地址
        queryAreaLimitList: app.commWeb + "/areaLimit/queryAreaLimitList",
        saveAreaLimit: app.commWeb + "/areaLimit/saveAreaLimit",
        queryLateAreaLimit: app.commWeb + "/areaLimit/queryLateAreaLimit",
        quereyCoinsRateList: app.commWeb + "/coinsRate/quereyCoinsRateList",
        queryLateCoinsRate: app.commWeb + "/coinsRate/queryLateCoinsRate",
        saveCoinsRateList: app.commWeb + "/coinsRate/saveCoinsRateList",
        quereySalesRateList: app.commWeb + "/saleRate/quereySalesRateList",
        saveSalesRate: app.commWeb + "/saleRate/saveSalesRate",
        getRiskList: app.commWeb+'/risk/getRiskList',
        //EQ02
        getSubsidyDetail: app.commWeb+'/subsidy/getSubsidyDetail',

        //index 模块
        statDataQuery: app.gscoreWeb+'/stat/statDataQuery',
        summaryProposalQuantity: app.gscoreWeb+'/proposal/summaryProposalQuantity',
        newProposalMenu: app.gscoreWeb+'/proposal/newProposalMenu',
        suspendProposalMenu: app.gscoreWeb+'/proposal/suspendProposalMenu',
        suspendEndorseMenu: app.gscoreWeb+'/endorse/suspendEndorseMenu',
        summaryEndorseQuantity: app.gscoreWeb+'/endorse/summaryEndorseQuantity',

        //document模块
        queryEpolicyPage: app.gscoreWeb+'/epolicy/queryEpolicyPage',
        queryEendorsePage: app.gscoreWeb+'/epolicy/queryEendorsePage',
        queryEpolicyFileId: app.gscoreWeb+'/epolicy/queryEpolicyFileId',
        downloadFileDoc: app.gscoreWeb+'/file/downloadFile',
        sendToEpolicyEmail: app.gscoreWeb+'/epolicy/sendToEpolicyEmail',

        //clearFile 模块
        dealExceptionData: app.gscoreWeb+'/clearFile/dealExceptionData',
        checkExceptionData: app.gscoreWeb+'/clearFile/checkExceptionData',
        downLoadClearFile: app.gscoreWeb+'/clearFile/downLoadClearFile',
        genClearFileShortLink:app.gscoreWeb+'/clearFile/genClearFileShortLink',
        checkReclear: app.gscoreWeb+'/clearFile/checkReclear',
        reclear: app.gscoreWeb+'/clearFile/reclear',
        buildReport: app.gscoreWeb+'/report/buildReport',
        downloadReport: app.gscoreWeb+'/report/downloadReport',
        importClaimExcel: app.gscoreWeb+'/clearFile/importClaimExcel',



        //payment 支付模块
        queryPayInfo: app.gscoreWeb+'/proposal/queryPayInfo',
        createPayNoticeEdocByKey: app.gscoreWeb+'/epolicy/createPayNoticeEdocByKey',
        onLineGoToPay: app.gscoreWeb+'/proposal/onLineGoToPay',
        createProposalEdocByKey: app.gscoreWeb+'/epolicy/createProposalEdocByKey',
        queryOnLinePayStatus: app.gscoreWeb+'/policy/queryOnLinePayStatus',
        queryOffLinePayPageInfo: app.gscoreWeb+'/proposal/queryOffLinePayPageInfo',
        proposalOffLindDoPay: app.gscoreWeb+'/proposal/proposalOffLindDoPay',
        savePayExch: app.gscoreWeb+'/payexch/savePayExch',
        queryTranPolicyInsured: app.gscoreWeb+'/proposal/queryTranPolicyInsured',
        queryTranPolicy: app.gscoreWeb+'/proposal/queryTranPolicy',
        queryReceiptPage: app.gscoreWeb+'/commonquery/queryReceiptPage',
        saveInvoice: app.gscoreWeb+'/policy/saveInvoice',
        //BCP 模块
        queryPayBack: app.gscoreWeb+'/bcp/queryPayBack',
        savePayBack: app.gscoreWeb+'/bcp/savePayBack',
        //material模块
        queryFile: app.gscoreWeb+'/prpfile/queryFile',
        deleteFile: app.gscoreWeb+'/prpfile/deleteFile',
        saveFileId: app.gscoreWeb+'/prpfile/saveFileId',

        //prpins 模块
        forEndorse: app.gscoreWeb + "/commonquery/forEndorse",
        validatePolicyForEndorse: app.gscoreWeb + "/endorse/validatePolicyForEndorse",
        saveInitEndorse: app.gscoreWeb + "/endorse/saveInitEndorse",
        backUpdateEndorse: app.gscoreWeb + "/endorse/backUpdateEndorse",
        saveEndorse: app.gscoreWeb + "/endorse/saveEndorse",
        deleteEndorse: app.gscoreWeb + "/endorse/deleteEndorse",
        submitEndorse: app.gscoreWeb + "/endorse/submitEndorse",
        checkIDUpload: app.gscoreWeb + "/endorse/checkIDUpload",
        queryImgFilePage: app.gscoreWeb + "/file/queryImgFilePage",
        saveImageFile: app.gscoreWeb + "/file/saveImageFile",
        deleteImgFile: app.gscoreWeb + "/file/deleteImgFile",
        initEdit: app.gscoreWeb + "/customer/initEdit",
        proInitEdit: app.gscoreWeb + "/proposal/initEdit",
        saveSingleInsured: app.gscoreWeb + "/insured/saveSingleInsured",
        queryInsuredPageInfo: app.gscoreWeb + "/insured/queryInsuredPageInfo",
        deleteTinsuredPropByPK: app.gscoreWeb + "/insured/deleteTinsuredPropByPK",
        saveBatchInsureds: app.gscoreWeb + "/insured/saveBatchInsureds",
        queryBatchImportErr: app.gscoreWeb + "/insured/queryBatchImportErr",
        downloadModel: app.gscoreWeb + "/file/downloadModel",
        queryImportResult: app.gscoreWeb + "/insured/queryImportResult",
        downloadInsuredsAll: app.gscoreWeb + "/insured/downloadInsuredsAll",
        queryImportErrHis: app.gscoreWeb + "/insured/queryImportErrHis",
        deleteInsured: app.gscoreWeb + "/insured/deleteInsured",
        queryTInsuredPropInfo: app.gscoreWeb + "/insured/queryTInsuredPropInfo",
        summaryItemProp: app.gscoreWeb + "/proposal/summaryItemProp",
        createProposalEdocByDto: app.gscoreWeb + "/epolicy/createProposalEdocByDto",
        save: app.gscoreWeb + "/proposal/save",
        submitUndwrt: app.gscoreWeb + "/proposal/submitUndwrt",
        queryProposalByPK: app.gscoreWeb + "/proposal/queryProposalByPK",
        copyProposalOrPolicy: app.gscoreWeb + "/proposal/copyProposalOrPolicy",
        deleteProposal: app.gscoreWeb + "/proposal/deleteProposal",
        searchUnderWrtStat:app.gscoreWeb+"/proposal/searchUnderWrtStat",
        checkTInsuredPropData: app.gscoreWeb + "/insured/checkTInsuredPropData",
        queryPageInfo: app.gscoreWeb + "/commonquery/queryPageInfoByPower",
        queryEndorseHistory: app.gscoreWeb + "/endorse/queryEndorseHistory",
        queryPreEndorse: app.gscoreWeb + "/endorse/queryPreEndorse",
        queryEndorseTranPolicy: app.gscoreWeb + "/endorse/queryEndorseTranPolicy",
        queryPolicyInsured: app.gscoreWeb + "/endorse/queryPolicyInsured",
        poQueryPolicyInsured: app.gscoreWeb + "/policy/queryPolicyInsured",
        queryPolicy: app.gscoreWeb + "/policy/queryPolicy",
        querySuspend: app.gscoreWeb + "/endorse/querySuspend",
        querySuspendProposalPageInfo: app.gscoreWeb + "/proposal/querySuspendProposalPageInfo",
        queryApproval: app.gscoreWeb + "/endorse/queryApproval",
        validateApproval: app.gscoreWeb + "/endorse/validateApproval",
        surrenderConfirm: app.gscoreWeb + "/endorse/surrenderConfirm",
        queryAllOpinions: app.gscoreWeb + "/endorse/queryAllOpinions",
        updateEndorseDecide: app.gscoreWeb + "/endorse/updateEndorseDecide",
        querySurrender: app.gscoreWeb + "/endorse/querySurrender",
        surrenderGiveUp: app.gscoreWeb + "/endorse/surrenderGiveUp",
        recalculateFpremium: app.gscoreWeb + "/proposal/recalculateFpremium",
        checkMaxSubsidy: app.gscoreWeb + "/proposal/checkMaxSubsidy",
        delBatchTInsured: app.gscoreWeb + "/proposal/delBatchTInsured",
        queryPrpPpayeeAccount:app.gscoreWeb+"/endorse/queryPrpPpayeeAccount"
    };
    var exceptUrl=[
        app.gscoreWeb + "/insured/queryImportResult"
    ];



    var ApiPathConstant = {
        app:app,
        api:api,
        exceptUrl:exceptUrl
    };

    return ApiPathConstant;
});
