/**
 * Created by GuoXiangLian on 2016/11/24.
 */
define(
    [],function () {
        return {"resultCode":"0000","resultMsg":"成功","resultObj":[
            /*{"actionURL":"main.indexdis","displayNo":1,"id":"A000000000000000001","image":"i_1","menuCName":"首页_MOCK","menuLevel":1,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.homepage","taskId":"A000000000000000003","upperId":"0"},
            {"actionURL":"main.devToolPage","displayNo":2,"flag":"Y","id":"A000000000000000002","image":"i_2","menuCName":"开发工具收集","menuLevel":1,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addproposal","taskId":"A000000000000000004","upperId":"0"},
            {"actionURL":"main.menu","displayNo":3,"flag":"Y","id":"A000000000000000004","image":"i_4","menuCName":"菜单维护","menuLevel":1,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addendorse","taskId":"A000000000000000005","upperId":"0"},*/
            {"actionURL":"main.index","displayNo":1,"flag":"Y","id":"A000000000000000012","image":"i_1","menuCName":"技术地图首页","menuLevel":1,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.getchart","taskId":"A000000000000000012","upperId":"0"},

            {"displayNo":2,"flag":"Y","id":"A000000000000000002","image":"i_6","menuCName":"信息收集","menuLevel":1,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addendorse","taskId":"A000000000000000002","upperId":"0"},
            {"actionURL":"main.gleanProjectPage","displayNo":21,"flag":"Y","id":"A000000000000000021","image":"i_6","menuCName":"项目收集维护","menuLevel":2,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addendorse","taskId":"A000000000000000021","upperId":"A000000000000000002"},
            {"actionURL":"main.gleanTechPersonPage","displayNo":22,"flag":"Y","id":"A000000000000000022","image":"i_6","menuCName":"人员技能收集","menuLevel":2,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addendorse","taskId":"A000000000000000022","upperId":"A000000000000000002"},
            /*{
                "actionURL": "main.statIndex",
                "displayNo": 4,
                "flag": "Y",
                "id": "A000000000000000005",
                "image": "i_5",
                "menuCName": "静态嵌套",
                "menuLevel": 1,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addendorse",
                "taskId": "A000000000000000006",
                "upperId": "0"
            },*/ {
                "displayNo": 3,
                "id": "A000000000000000010",
                "image": "i_6",
                "menuCName": "数据维护",
                "menuLevel": 1,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addType",
                "taskId": "A000000000000000011",
                "upperId": "0"
            },{
                "actionURL": "main.infogaterInfoPage",
                "displayNo": 7,
                "flag": "Y",
                "id": "A000000000000000016",
                "image": "i_6",
                "menuCName": "信息维护",
                "menuLevel": 2,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addendorse",
                "taskId": "A000000000000000017",
                "upperId": "A000000000000000010"
            },{
                "actionURL": "main.infogaterTypePage",
                "displayNo": 8,
                "flag": "Y",
                "id": "A000000000000000017",
                "image": "i_6",
                "menuCName": "代码维护",
                "menuLevel": 2,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addendorse",
                "taskId": "A000000000000000017",
                "upperId": "A000000000000000010"
            },{
                "actionURL": "main.componentPage",
                "displayNo": 4,
                "flag": "Y",
                "id": "A000000000000000006",
                "image": "i_6",
                "menuCName": "组件收集",
                "menuLevel": 2,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addendorse",
                "taskId": "A000000000000000007",
                "upperId": "A000000000000000002"
            },{
                "actionURL": "main.toolsPage",
                "displayNo": 5,
                "flag": "Y",
                "id": "A000000000000000007",
                "image": "i_8",
                "menuCName": "工具收集",
                "menuLevel": 2,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.addendorse",
                "taskId": "A000000000000000007",
                "upperId": "A000000000000000002"
            },
            {
                "actionURL": "main.quesDetail",
                "displayNo": 6,
                "id": "A000000000000000016",
                "image": "i_7",
                "menuCName": "技术问题答疑",
                "menuLevel": 1,
                "systemCode": "gscore-front",
                "target": "page",
                "taskCode": "gscore-front.quesDetail",
                "taskId": "A000000000000000016",
                "upperId": "0"
            },{"actionURL":"main.deployEnvPage","displayNo":4,"flag":"Y","id":"A000000000000000007","image":"i_6","menuCName":"部署环境维护","menuLevel":2,"systemCode":"gscore-front","target":"page","taskCode":"gscore-front.addendorse","taskId":"A000000000000000008","upperId":"A000000000000000002"}
            ]};
    }
);
