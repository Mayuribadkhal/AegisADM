appdash.controller('AdminLoginController', function ($http, $scope, $filter, $timeout, uriuserimage, $state, SmartAlert, $window, $localStorage, $sessionStorage, $rootScope, base64, uri, uriadmin, Name, Password, flag) {

    var flagvalue = flag;

    $scope.myFunction = function () {
        document.getElementById("loginemail").style.textTransform = "lowercase";
    }
    if ($sessionStorage.a == undefined) {
        $sessionStorage.a = 0;
    }
    $scope.refresh = "refreshed";
    if ($sessionStorage.a == 0) {
        $scope.refresh = "refresh"
        $sessionStorage.a = 1;
    }
    else
        $scope.refresh = "refreshed";

    $scope.divshow = true;
    $scope.divhide = false;
  if (flagvalue == 'H') {
      $scope.GetCompany = [{ Panel: 'Pushpam', PanelName: 'AEGISTech' }, { Panel: 'HPCL', PanelName: 'AEGIS' }];
        $scope.loginimage = 'styles/img/aegislogo.gif';
        $scope.title = "GoGas";
        $scope.vers = "Version 8.6";
        $scope.tollnumber = "00000000";
    }

    $scope.divshow = true;
    $scope.divhide = false;



    $scope.AdminLogin = function (valid, LoginAdmin) {
        if (valid == true) {
            if (LoginAdmin.EmailAddress != null && LoginAdmin.UserPWD != null && LoginAdmin.UserPWD != '') {
                // localStorage.clear();
                $sessionStorage.hasReloaded1 = false;
                $scope.divshow = false;
                $scope.divhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: "GET",
                    url: uriadmin + 'setting/GetAdminLogin',
                    params: { Panel: LoginAdmin.Panel, EmailAddress: LoginAdmin.EmailAddress, UserPWD: LoginAdmin.UserPWD }
                }).then(function (response) {

                    if (response.data.StatusCode != 0) {
                        $scope.GetAdminloginData = response.data.Data;
                        $scope.GetAdminloginData = response.data.Data;
                        if ($scope.GetAdminloginData[0] == null) {
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                        else {
                            $sessionStorage.loginresponsemsg = response.data.Message;
                            $scope.usernamesp = $scope.GetAdminloginData[0];
                            if (LoginAdmin.Panel == 'HPCL') {
                                $localStorage.CUserCode = $scope.GetAdminloginData[0].CUserCode;
                                $localStorage.ucode = $scope.GetAdminloginData[0].CUserCode;
                                $sessionStorage.ucode = $localStorage.CUserCode;
                                $sessionStorage.CUserCode = $localStorage.CUserCode;
                                $localStorage.PUserCode = null;
                                $sessionStorage.PUserCode = $localStorage.PUserCode;
                                $sessionStorage.PlantId = $scope.GetAdminloginData[0].PlantId;
                            }                        
                            if (LoginAdmin.Panel == 'Pushpam') {
                                $localStorage.PUserCode = $scope.GetAdminloginData[0].PUserCode;
                                $localStorage.ucode = $scope.GetAdminloginData[0].PUserCode;
                                $sessionStorage.ucode = $scope.GetAdminloginData[0].PUserCode;
                                $sessionStorage.PUserCode = $localStorage.PUserCode;
                                $localStorage.CUserCode = null;
                                $sessionStorage.CUserCode = $localStorage.CUserCode;
                            }
                            $localStorage.RoleCode = $scope.GetAdminloginData[0].RoleCode;
                            $localStorage.FirstName = $scope.GetAdminloginData[0].FirstName;
                            $localStorage.LastName = $scope.GetAdminloginData[0].LastName;
                            $localStorage.EmailAddress = $scope.GetAdminloginData[0].EmailAddress;
                            $localStorage.ImageName = $scope.GetAdminloginData[0].ImageName;
                            $localStorage.UserPwd = $scope.GetAdminloginData[0].UserPwd;
                            $sessionStorage.RoleCode =$scope.GetAdminloginData[0].RoleCode;
                            $sessionStorage.EmailAddress = $scope.GetAdminloginData[0].EmailAddress;
                            $sessionStorage.profileimg = uriuserimage + $scope.GetAdminloginData[0].ImageName;
                            $sessionStorage.company = response.data.Status;
                            $sessionStorage.PathRedirect = "Login";
                            //alert($sessionStorage.company);
                            $sessionStorage.UserPwd = $localStorage.UserPwd;
                            $sessionStorage.FirstName = $scope.GetAdminloginData[0].FirstName;
                            $sessionStorage.LastName = $scope.GetAdminloginData[0].LastName;
                            $scope.divshow = true;
                            $scope.divhide = false;
                            //$scope.MenuDetails($sessionStorage.RoleCode);
                            var base65 = base64.encode(Name + ':' + Password);
                            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                            $http({
                                method: 'GET',
                                url: uriadmin + 'Setting/GetRoleEnable',
                                params:
                                    { RoleID: null, RoleCode: $sessionStorage.RoleCode, IsActive: 'Y' }
                            }).then(function (response) {
                                if (response.data.Data != null || response.data.Data == 0) {
                                    var status = response.data.Data;
                                    $scope.statusrole = status[0].RoleStatus;
                                    $sessionStorage.RoleStatus = $scope.statusrole;
                                    $sessionStorage.PreferedDashboard = status[0].PreferedDashboard;
                                    $sessionStorage.RoleID = status[0].RoleID;
                                    $sessionStorage.RoleLevel = status[0].RoleLevel;
                                    if ($scope.statusrole == '*') {
                                        if ($sessionStorage.AdminFormstatus == null) {
                                            $http({
                                                method: 'GET',
                                                url: uriadmin + 'Setting/GetFormsInfoForLogin',
                                                params:
                                                    { RoleCode: $sessionStorage.RoleCode }
                                            }).then(function (response) {
                                                if (response.data.Data != 0) {
                                                    $sessionStorage.AdminFormstatus = response.data.Data;
                                                    if (flagvalue == 'I' || flagvalue == 'E') {
                                                        //  $state.go('app.dashboard.dashboard_My_Express_gas');
                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_My_Express_gas', 'app.dashboard.dashboard_My_Express_gas') : ($sessionStorage.PreferedDashboard == "AB" ? ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard') : ($sessionStorage.currentstate = 'app.dashboard.dashboard_mechanical', 'app.dashboard.dashboard_mechanical')));
                                                    }
                                                    else if (flagvalue == 'H') {
                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_ezy_gas', 'app.dashboard.dashboard_ezy_gas') : ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard'));
                                                        // $state.go('app.dashboard.new_dashboard');
                                                        //$state.go('app.dashboard.dashboard_ezy_gas');
                                                    }
                                                    $sessionStorage.forbackstate = $sessionStorage.currentstate;
                                                }
                                                else {
                                                    if (flagvalue == 'I' || flagvalue == 'E') {
                                                        //  $state.go('app.dashboard.dashboard_My_Express_gas');
                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_My_Express_gas', 'app.dashboard.dashboard_My_Express_gas') : ($sessionStorage.PreferedDashboard == "AB" ? ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard') : ($sessionStorage.currentstate = 'app.dashboard.dashboard_mechanical', 'app.dashboard.dashboard_mechanical')));
                                                    }
                                                    else if (flagvalue == 'H') {
                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_ezy_gas', 'app.dashboard.dashboard_ezy_gas') : ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard'));
                                                        // $state.go('app.dashboard.new_dashboard');
                                                        //$state.go('app.dashboard.dashboard_ezy_gas');
                                                    }
                                                    $sessionStorage.forbackstate = $sessionStorage.currentstate;
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        var base65 = base64.encode(Name + ':' + Password);
                                        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                                        $http({
                                            method: 'GET',
                                            url: uriadmin + 'Setting/GetFormsInfoForLogin',
                                            params:
                                                { RoleCode: $sessionStorage.RoleCode }
                                        }).then(function (response) {
                                            if (response.data.Data != null || response.data.StatusCode == 1) {
                                                $scope.alldetails = response.data.Data;
                                                $sessionStorage.Formstatus = $scope.alldetails;
                                                if ($sessionStorage.PreferedDashboard != null) {
                                                    if (flagvalue == 'I') {
                                                        //$state.go('app.dashboard.dashboard_My_Express_gas');
                                                        $scope.DashboardMenu = "Xpressgas Dashboard";
                                                        //$scope.DashboardMenu = "Standard Dashboard";
                                                        $scope.dashboardlink = "app.dashboard.dashboard_My_Express_gas";

                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_My_Express_gas', 'app.dashboard.dashboard_My_Express_gas') : ($sessionStorage.PreferedDashboard == "AB" ? ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard') : ($sessionStorage.currentstate = 'app.dashboard.dashboard_mechanical', 'app.dashboard.dashboard_mechanical')));
                                                    }
                                                    else if (flagvalue == 'H') {
                                                        // $state.go('app.dashboard.dashboard_ezy_gas');
                                                        $scope.DashboardMenu = "EZYGas Dashboard";
                                                        //$scope.DashboardMenu = "Standard Dashboard";
                                                        $scope.dashboardlink = "app.dashboard.dashboard_ezy_gas";

                                                        $state.go($sessionStorage.PreferedDashboard == "AA" ? ($sessionStorage.currentstate = 'app.dashboard.dashboard_ezy_gas', 'app.dashboard.dashboard_ezy_gas') : ($sessionStorage.currentstate = 'app.dashboard.new_dashboard', 'app.dashboard.new_dashboard'));

                                                    }
                                                    $sessionStorage.forbackstate = $sessionStorage.currentstate;
                                                }
                                                else {
                                                    SmartAlert.Errmsg("Your account is inactive, contact to Helpdesk");
                                                }
                                            }
                                            else {
                                                SmartAlert.Errmsg(response.data.Message);
                                            }

                                        })

                                    }
                                }
                                else {
                                    SmartAlert.Errmsg("Your account is inactive, contact to Helpdesk");
                                }
                            })

                        }
                    }
                    else {
                        //$.bigBox({
                        //    title: response.data.Message,
                        //    color: "#C46A69",
                        //    icon: "fa fa-warning shake animated",
                        //    timeout: 6000
                        //});
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                });

            }
        }
    }
    $scope.GetSession = function () {
        if ($sessionStorage.EmailAddress != null || $sessionStorage.ucode != null || $sessionStorage.PUserCode != null || $sessionStorage.EmailAddress == "undefined" || $sessionStorage.ucode == "undefined" || $sessionStorage.PUserCode == "undefined") {
            $sessionStorage.EmailAddress = $sessionStorage.EmailAddress;
            $sessionStorage.UserPwd = $localStorage.UserPwd;
            $sessionStorage.FirstName = $sessionStorage.FirstName;
            $sessionStorage.LastName = $sessionStorage.LastName;

        }
        else {
            $sessionStorage.EmailAddress = $sessionStorage.EmailAddress;
            $sessionStorage.UserPwd = $localStorage.UserPwd;
            $sessionStorage.FirstName = $sessionStorage.FirstName;
            $sessionStorage.LastName = $sessionStorage.LastName;
            $state.go('login');
            window.location.href = 'index.html#/login';
        }
    }
    $scope.GetSession();


    $sessionStorage.DisableForwardButton = null;
    /*DisableBack on Login*/
    $scope.DisableForward = function () {
        if ($sessionStorage.PathRedirect == "Login" && $state.$current.self.name != "login" && $state.$current.self.name != "") {
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
        }
        //else {
        //    $scope.$on('$locationChangeStart', function (event, next, current) {
        //        event.preventDefault();
        //    });
        //}
        /*LogOut on new Tab in Browser*/
        if ($sessionStorage.PUserCode == null && $sessionStorage.CUserCode == null) {
            $state.go('login');
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
            // window.location.href = 'index.html#/login';

        }
    }
    $scope.DisableForward();

    $scope.LogOut = function () {
        $sessionStorage.$reset();
        $localStorage.$reset();
        $state.go('login');
        window.location.href = 'index.html#/login';

    }

    $rootScope.$emit("CallParentMethod", function () { });

});
appdash.controller('HeaderController', function ($http, $scope, $filter, $timeout, $state, noimage, $localStorage, $sessionStorage, $window, $rootScope, base64, uri, uriadmin, uriuserimage, Name, Password, flag) {

    $scope.loginmsg = function () {
        if ($sessionStorage.loginmsg == null) {
            $.bigBox({
                title: "Welcome" + " " + $sessionStorage.FirstName,
                content: $sessionStorage.loginresponsemsg,
                color: "#296191",
                icon: "fa fa-thumbs-up animated bounce ",
                timeout: "4000"
            })
            $sessionStorage.loginmsg = true;
        }
    }
    $scope.loginmsg();
    var flagvalue = flag;
   if (flagvalue == 'H') {

        $scope.loginimage = 'styles/img/gogaslogo.png';
        $scope.title = "GoGas";
        $scope.tollnumber = "00000000";
    }   

    $rootScope.$on("CallParentMethod", function () {
        $scope.GetprofilePhoto();
    });

    $scope.GetprofilePhoto = function () {
        if ($sessionStorage.EmailAddress != null) {
            $scope.username = $sessionStorage.FirstName + ' ' + $sessionStorage.LastName;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetPushpamUsers',
                params:
                    { PUserCode: $sessionStorage.ucode, EmailAddress: $sessionStorage.EmailAddress, IsActive: 'Y', RoleCode: $sessionStorage.RoleCode }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.alldata = response.data.Data;
                    $scope.details = $scope.alldata[0];

                    if ($scope.details.ImageName == null || $scope.details.ImageName == '' || $scope.details.ImageName == undefined) {
                        $scope.userimg = noimage + 'styles/img/avatars/male.png';
                    }
                    else {
                        $scope.userimg = uriuserimage + $scope.details.ImageName;
                    }
                    $sessionStorage.filename = $scope.details.ImageName;
                }
                else {
                    $scope.userimg = noimage + 'styles/img/avatars/male.png';
                }

            })
        }
    }
});
appdash.controller('ForgotPasswordController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $window, $localStorage, $sessionStorage, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;
    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.loginimage = 'styles/img/gogaslogo.png';
        $scope.title = "GoGas";
        $scope.vers = "Version 8.6";
        $scope.tollnumber = "00000000";
    }   

    $scope.forgotPassword = function (valid, Email) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Master/forgetpassword',
                params:
                     { Email: Email }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $state.go('login');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }

                $scope.divshow = true;
                $scope.divhide = false;
            })
        }
    }
});
