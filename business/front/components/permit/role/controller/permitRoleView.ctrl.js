/**
 * Created by changweican on 2017/5/7.
 */
define(['../module'],function(moduleApp) {
    'use strict';

    var permitRoleCtrlFunc = function($scope,$state,ApiPath,permitRoleServ,$stateParams) {
        $scope.roleBindMenus = function() {
            $scope.permitRole.menuIds=$scope.copyData;
            var jsonReq = JSON.stringify($scope.permitRole);
            console.log("jsonReq:"+jsonReq);
            permitRoleServ.roleBindMenus(jsonReq).then(
                function(answer) {
                    // $scope.menu = answer.data;
                    console.log("响应结果:"+answer.data);
                }
            );
        };
        // $scope.permitRoleMenu = JSON.parse($stateParams.menuData);
        // console.log("menus:"+$stateParams.menuData);

        //代码规范，设置初始状态
        $scope.permitRole = {
            roleName: '',
            roleCode: '',
            menuIds: ''
        };


        // 获取机构树
        $scope.getMenuTree = function (node){
            // if($scope.PowerConditionDto.userCode ==""||$scope.PowerConditionDto.userCode ==null){
            //     angular.alert("登录账号不允许为空！");
            //     return;
            // }
            // var powerConditionDto = {};
            // powerConditionDto.userCode = $scope.PowerConditionDto.userCode;
            // powerConditionDto.taskId = $scope.PowerConditionDto.taskId;
            // var answer = $scope.treeData;
            // if(node ){
            //     powerConditionDto.comCode = node.comCode;
            //     powerConditionDto.checked = node.checked;
            // }
            permitRoleServ.getMenuTree().then(
                function(answer){
                    if(node){
                        node.nodes = answer.data[0].nodes;
                    }else{
                        console.log(JSON.stringify(answer.data));
                        $scope.data = answer.data;
                    }
                    // if($scope.data){
                    //     $scope.underwritingTree=false;
                    // }else{
                    //     $scope.underwritingTree=true;
                    // }
                },function(error){
                    $scope.message = "系统异常，请联系管理员";
                    angular.alert("系统异常，请联系管理员！");
                    //暂时隐藏
                    /*$scope.underwritingFailLayer=false;*/
                }
            );
        };
        //开关触发器
        $scope.toggleNode = function (scope,node) {
            if(node.nodes && node.collapsed && node.nodes.length == 0){
                $scope.getMenuTree(node);
                scope.toggle();
            }
            node.collapsed = !node.collapsed;
            scope.toggle();
        };
        //折叠所有节点
        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };
        //打开所有节点
        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        //当checked发生变化 执行本方法
        $scope.copyData = [];
        $scope.changeNode = function (node, parent, parentNode) {
            changeChildrenNodeStatus(node);
            checkBrotherNodeStatus(parentNode);
            getCheckedData($scope.data);
            console.log("menuIds:"+JSON.stringify($scope.copyData));

        };

        //改变兄弟级的状态
        function changeChildrenNodeStatus(node) {
            angular.forEach(node.nodes, function (childrenNode) {
                childrenNode.checked = node.checked;
                $scope.nodeData = childrenNode.title;
                //如果还有子集
                if (childrenNode.nodes && childrenNode.nodes.length > 0) {
                    changeChildrenNodeStatus(childrenNode);
                }
            })
        };

        //获取选中的节点
        function getCheckedData(data) {
            angular.forEach(data, function (childData) {
                var treeNodeDto={};
                if (childData.checked) {
                    // treeNodeDto.id = childData.id;
                    // treeNodeDto.upperId = childData.upperId;
                    if($scope.copyData.indexOf(childData.id) < 0){
                        $scope.copyData.push(childData.id);
                    }
                }else{
                    if($scope.copyData.indexOf(childData.id) >= 0){
                        $scope.copyData.splice($scope.copyData.indexOf(childData.id), 1)
                    }
                }
                if (childData.nodes && childData.nodes.length > 0) {
                    getCheckedData(childData.nodes);
                }
            })
        };

        //检查兄弟级的状态
        function checkBrotherNodeStatus(nodeScope) {
            //判断是否到达了顶级
            if (!nodeScope) {
                return false;
            }
            //父节点的值
            var parentNodeValue = nodeScope.$modelValue;
            //父节点上次的状态
            var lastStatus = parentNodeValue.checked;

            var checkedAll = true;

            angular.forEach(parentNodeValue.nodes, function (brotherNode) {
                if (!brotherNode.checked) {
                    checkedAll = false;
                    return false
                }
            });
            // parentNodeValue.checked = checkedAll;//子节点不选中不影响父节点的选中状态

            if (lastStatus == parentNodeValue.checked) {
            } else {
                //如果状态改变了，则要继续向上延伸
                if (parentNodeValue.checked) {
                } else {
                }
                checkBrotherNodeStatus(nodeScope.$parentNodeScope);
            }

        };
        /*
        $scope.treeData = [
            {
                "id":"A000000000000000012",
                "upperId":"0",
                "title":"技术地图首页",
                "checked":false,
                "nodes":[]
            },
            {
                "id":"A000000000000000002",
                "upperId":"0",
                "title":"信息收集",
                "checked":false,
                "nodes":[
                    {
                        "id":"A000000000000000021",
                        "upperId":"A000000000000000002",
                        "title":"项目收集维护",
                        "checked":false,
                        "nodes":[]
                    },
                    {
                        "id":"A000000000000000021",
                        "upperId":"A000000000000000002",
                        "title":"人员技能收集",
                        "checked":false,
                        "nodes":[]
                    },
                    {
                        "id":"A000000000000000006",
                        "upperId":"A000000000000000002",
                        "title":"组件收集",
                        "checked":false,
                        "nodes":[]
                    },
                    {
                        "id":"A000000000000000007",
                        "upperId":"A000000000000000002",
                        "title":"工具收集",
                        "checked":false,
                        "nodes":[]
                    },
                    {
                        "id":"A000000000000000008",
                        "upperId":"A000000000000000002",
                        "title":"部署环境维护",
                        "checked":false,
                        "nodes":[]
                    }
                ]
            },
            {
                "id":"A000000000000000010",
                "upperId":"0",
                "title":"数据维护",
                "checked":false,
                "nodes":[]
            },
            {
                "id":"A000000000000000009",
                "upperId":"0",
                "title":"权限管理",
                "checked":false,
                "nodes":[
                    {
                        "id":"A000000000000000091",
                        "upperId":"A000000000000000009",
                        "title":"菜单管理",
                        "checked":false,
                        "nodes":[]
                    },
                    {
                        "id":"A000000000000000092",
                        "upperId":"A000000000000000009",
                        "title":"角色管理",
                        "checked":false,
                        "nodes":[]
                    }
                ]
            }
        ];
        */

           $scope.exit = function() {
               $state.go("main.permitRoleList");
           }
    };

    moduleApp.controller('permitRoleCtrl',["$scope","$state","ApiPath","permitRoleServ","$stateParams",permitRoleCtrlFunc]);
});