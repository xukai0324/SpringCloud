define(['../module'], function(module){

	var userController = function($scope, $state, ApiPath, permitUserServ, permitRoleServ){
        permitUserServ.getADNames().then(
            function(answer){
                $scope.amoebaNames = answer.data.amoebaNames;
                $scope.deptNames = answer.data.deptNames;
            }
        );
		$scope.userList = [];
		$scope.showSelector = false;
		/*搜索用户*/
		$scope.searchUser = function () {
            permitUserServ.listUser($scope.queryField).then(
            	function(answer){
            		$scope.userList = answer.data;
				}
			);
        };
        $scope.allRole = [];
		/*加载所有角色*/
        permitRoleServ.getAllRole().then(
        	function(answer){
        		$scope.allRole = answer.data;
			}
        );
        /*获取所有选择的用户code*/
        var getCheckedUser = function(){
            var checked = [];
            for(var i=0; i < $scope.userList.length; i++){
                var u =  $scope.userList[i];
                if(u.checked) checked.push(u.id);
            }
            return checked;
        };
        /*选择用户*/
        $scope.selectedUser = function($event, u){
            u.checked = $event.target.checked;
            $scope.allChecked = getCheckedUser().length === $scope.userList.length;
        };
        /*用户全选*/
        $scope.checkeAll = function($event){
            var f = $event.target.checked;
            if(f){
                $scope.allChecked = true;
                angular.forEach($scope.userList, function(n){
                    n.checked = true;
                });
            } else{
                $scope.allChecked = false;
                angular.forEach($scope.userList, function(n){
                    n.checked = false;
                });
            }
        };
       var unCheckedAllRole = function(){
            for(var i =0; i< $scope.allRole.length; i++){
                $scope.allRole[i].checked = false;
            }
            console.log($scope.allRole);
        };
        /*加载用户已经绑定的角色*/
        var loadUserBindedRole =function(userCode){
            unCheckedAllRole();
            permitUserServ.getRolesByUserId(userCode).then(
                function(answer){
                    var list = answer.data;
                    if(list && list.length > 0){
                        angular.forEach($scope.allRole, function(m){
                            var f = false;
                            for(var i = 0; i<list.length; i++){
                                var n = list[i];
                                if(n.roleId === m.id){
                                    f = true;
                                    break;
                                }
                            }
                            m.checked = f;
                        });
                    }
                }
            );
        };
        /*去单个用户绑定*/
        $scope.toBindRole = function(u){
            for(var i = 0; i < $scope.userList.length; i++) $scope.userList[i].checked = false;
            u.checked = true;
            // loadUserBindedRole(u.userCode);
            loadUserBindedRole(u.id);
            $scope.showSelector = true;
		};

		/*去批量绑定*/
		$scope.toBatchBind = function(){
            unCheckedAllRole();
            var userChecked = getCheckedUser();
            if(userChecked.length > 0){
                if(userChecked.length === 1) loadUserBindedRole(userChecked[0].id);
                $scope.showSelector = true;
            }
            else alert("请选择用户");
        };
		/*选择角色*/
        $scope.chooseRole = function ($event, r) {
            r.checked = $event.target.checked;
		};
        var getCheckedRole = function(){
            var checked = [];
            for(var i =0; i< $scope.allRole.length; i++) {
                var r = $scope.allRole[i];
                if(r.checked) checked.push(r.id);
            }
            return checked;
        };

        /*绑定操作*/
        $scope.doBind = function(){
            var checkedRoles = getCheckedRole();
            console.log(checkedRoles);
            var checkedUser = getCheckedUser();
            console.log(checkedUser);
            if(checkedRoles.length < 1 || checkedUser< 1) {
                alert("请选择用户或角色");
                return;
            }
            var ruList = [];
            angular.forEach(checkedUser, function(u){
                angular.forEach(checkedRoles, function(r){
                    ruList.push({roleId:r, userId: u});
                });
            });
            console.info(ruList);
            permitUserServ.userBindRole(ruList).then(
                function (answer) {
                    var count = answer.data;
                    if(count > 0){
                        $scope.showSelector = false;
                        alert("绑定成功");
                    }
                }
            );
        };
        /*关闭*/
        $scope.cancel = function(){
            $scope.showSelector = false;
        };
	};
	module.controller("userCtrl",['$scope','$state','ApiPath','permitUserServ','permitRoleServ',userController]);
});