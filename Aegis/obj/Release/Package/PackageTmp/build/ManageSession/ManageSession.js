appdash.directive('uiSrefIf', function ($compile, $filter, $rootScope, $http, $state, uriadmin, flag, $sessionStorage) {
    var enable = [];
    var filterall;
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
    }
    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
    }
    return {
        scope: {
            val: '@uiSrefVal',
            if: '=uiSrefIf'
        },
        link: function ($scope, $element, $attrs) {
            $element.removeAttr('ui-sref-if');
            $compile($element)($scope);
            if ($sessionStorage.Formstatus != null) {
                enable = $filter('filter')($sessionStorage.Formstatus, { FormNumber: $attrs.uiSrefIf })[0];
                if (enable) {
                    if ($sessionStorage.RoleStatus == "Y" && enable.IsFormEnable == null) {
                        filterall = "N";
                    }
                    else if ($sessionStorage.RoleStatus == "N" && enable.IsFormEnable == null) {
                        filterall = "Y";
                    }
                    else {
                        filterall = $sessionStorage.RoleStatus;
                    }

                    if (filterall == "Y") {
                        if (enable.IsFormEnable == "N" || enable.IsFormEnable == null) {
                            var formname = $element[0].innerText != null ? $element[0].innerText : enable.FormName;
                            var splitvilla = $element.context.text.endsWith("}}");
                            if (splitvilla == true) {
                                var formname = Hsfor != "PG" ? enable.FormName : $element.context.text.replace("}}",'');
                            }
                            else {
                                var formname = $element.context.text;
                            }
                            $element.context.outerHTML = '<a class="nav-menu-disable ng-isolate-scope ng-scope"><i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i> <span> ' + formname + '</span></a>';
                            $element.removeAttr('ui-sref');
                            $element.removeAttr('data-ui-sref');
                            $element.removeAttr('href');
                            $element.removeAttr('click');
                            $element.removeAttr('ng-click');
                            $element.attr('ng-click', '.');
                            $element.attr('class', 'nav-menu-disable submenudisable');
                        }
                        else {
                            $element.removeAttr('class');
                            var splitvilla = $element.context.text.endsWith("}}");
                            if (splitvilla == true) {
                                var formname = Hsfor != "PG" ? enable.FormName : $element.context.text.replace("}}", '');
                            }
                            else {
                                var formname = $element.context.text;
                            }
                            enable = $filter('filter')($sessionStorage.Formstatus, { FormNumber: $attrs.uiSrefIf })[0];
                            if (enable) {
                                $element.context.innerHTML = '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname;
                                $element.attr('innerHTML', '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname);
                            }
                            $element.attr('class', '');
                            $element.attr('data-ui-sref', $attrs.uiSref);
                            $element.attr('ng-click', $attrs.ngClick);
                        }
                    }
                    else {
                        if (enable.IsFormEnable == "N" || enable.IsFormEnable == null) {
                            var formname = $element[0].innerText != null ? $element[0].innerText : enable.FormName;
                            var splitvilla = $element.context.text.endsWith("}}");
                            if (splitvilla == true) {
                                var formname = Hsfor != "PG" ? enable.FormName : $element.context.text.replace("}}", '');
                            }
                            else {
                                var formname = $element.context.text;
                            }
                            $element.context.outerHTML = '<a class="nav-menu-disable ng-isolate-scope ng-scope"><i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i> <span> ' + formname + '</span></a>';
                            $element.removeAttr('ui-sref');
                            $element.removeAttr('data-ui-sref');
                            $element.removeAttr('href');
                            $element.removeAttr('click');
                            $element.removeAttr('ng-click');
                            $element.attr('ng-click', '.');
                            $element.attr('class', 'nav-menu-disable submenudisable');
                        }
                        else {
                            $element.removeAttr('class');
                            var splitvilla = $element.context.text.endsWith("}}");
                            if (splitvilla == true) {
                                var formname = Hsfor != "PG" ? enable.FormName : $element.context.text.replace("}}", '');
                            }
                            else {
                                var formname = $element.context.text;
                            }
                            enable = $filter('filter')($sessionStorage.Formstatus, { FormNumber: $attrs.uiSrefIf })[0];
                            if (enable) {
                                $element.context.innerHTML = '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname;
                                $element.attr('innerHTML', '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname);
                            }
                            $element.attr('class', '');
                            $element.attr('data-ui-sref', $attrs.uiSref);
                            $element.attr('ng-click', $attrs.ngClick);
                        }
                    }
                    //  }

                }
            }
            else {
                $element.removeAttr('class');
                var splitvilla = $element.context.text.endsWith("}}");
                if (splitvilla == true) {
                    var formname = $element.context.text.replace("}}", '');
                }
                else {
                    var formname = $element.context.text;
                }
                if ($sessionStorage.AdminFormstatus != null) {
                    enable = $filter('filter')($sessionStorage.AdminFormstatus, { FormNumber: $attrs.uiSrefIf })[0];
                    if (enable) {
                        $element.context.innerHTML = '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname;
                        $element.attr('innerHTML', '<i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>' + '' + formname);
                    }
                    $element.attr('class', '');
                    $element.attr('data-ui-sref', $attrs.uiSref);
                    $element.attr('ng-click', $attrs.ngClick);
                }
            }
        }
    };
});

appdash.controller('ManageSessionController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password, flag) {

    var flagvalue = flag;

    var sd = document.getElementsByTagName('ul');
    //master
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.safteymenu = false;
        $scope.syncerrormenu = false;
        $scope.synmenu = false;
        $scope.useraccgridhpcl = true;
        $scope.useraccgridiocl = false;
        $scope.datamig = true;
        $scope.userauthmenu = false;
        $scope.distauth = true;
        $scope.DashboardMenu = "Standard Dashboard";
        $scope.dashboardlink = "app.dashboard.dashboard_My_Express_gas";
        if (flagvalue == 'E') {
            $scope.nameofacc = 'EzeTap';
            $scope.DashboardMenu = "Standard Dashboard";
            $scope.userauthmenu = true;
        }
        else {
            $scope.nameofacc = 'Pushpam';
            $scope.DashboardMenu = "Standard Dashboard";
        }

    }
    else if (flagvalue == 'H') {
        $scope.nameofacc = 'Pushpam';
        $scope.DashboardMenu = "Standard Dashboard";
        $scope.dashboardlink = "app.dashboard.dashboard_ezy_gas";
        $scope.safteymenu = true;
        $scope.syncerrormenu = true;
        $scope.synmenu = true;
        $scope.useraccgridhpcl = false;
        $scope.useraccgridiocl = true;
        $scope.datamig = false;
        $scope.userauthmenu = false;
        $scope.distauth = true;
    }
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
    }
    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        $scope.nameofacc = 'Pushpam';
    }
    switch (flag) {
        case 'H':
            if (Hsfor == "PG") {
                $scope.Title1 = 'EZYGAS Card Sales Potential ';
                $scope.Title2 = 'EZYGAS Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'EZYGAS Consumers ';
                $scope.Title2 = 'EZYGAS On-boarded Distributors';
                $scope.Title3 = 'Digital Mode On-boarded Distributors';
            }
            break;
        case 'I':
            if (Hsfor == "PG") {
                $scope.Title1 = 'XPRESSGAS Card Sales Potential ';
                $scope.Title2 = 'XPRESSGAS Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'XPRESSGAS Consumers ';
                $scope.Title2 = 'XPRESSGAS On-boarding Distributors';
                $scope.Title3 = 'Digital Mode On-boarded Distributors';
            }
            break;
        case 'E':
            if (Hsfor == "PG") {
                $scope.Title1 = 'EZETAP Card Sales Potential ';
                $scope.Title2 = 'EZETAP Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'EZETAP Consumers ';
                $scope.Title2 = 'EZETAP On-boarding Distributors';
                $scope.Title3 = 'Digital Mode On-boarded Distributors';
            }
            break;
        default:
            break;
    }
    $scope.manageblock = function () {
        $sessionStorage.mflag = 'B';
    }
    $scope.manageregion = function () {
        $sessionStorage.mflag = 'R';
    }
    $scope.managelang = function () {
        $sessionStorage.mflag = 'L';
    }
    $scope.manageurole = function () {
        $sessionStorage.mflag = 'U';
    }
    $scope.managetport = function () {
        $sessionStorage.mflag = 'T';
    }
    $scope.manageptmode = function () {
        $sessionStorage.mflag = 'PT';
    }
    $scope.managebnk = function () {
        $sessionStorage.mflag = 'BK';
    }
    //product
    $scope.managePproduct = function () {
        $sessionStorage.mflag = 'PP';
    }

    $scope.managencoupon = function () {
        $sessionStorage.mflag = 'NC';
    }
    $scope.managemcoupon = function () {
        $sessionStorage.mflag = 'MC';
    }
    $scope.manageinward = function () {
        $sessionStorage.mflag = 'IN';
    }
    //distributor
    $scope.managecdist = function () {
        $sessionStorage.mflag = 'CD';
    }
    $scope.managePA = function () {
        $sessionStorage.mflag = 'PA';
    }
    $scope.manageDH = function () {
        $sessionStorage.mflag = 'DH';
    }
    $scope.manageSer = function () {
        $sessionStorage.mflag = 'MS';
    }
    $scope.manageusr = function () {
        $sessionStorage.mflag = 'MU';
    }
    $scope.manageappmail = function () {
        $sessionStorage.mflag = 'GAM';
    }
    $scope.manageDverifypmnt = function () {
        $sessionStorage.mflag = 'DVP';
    }
    $scope.manageOPF = function () {
        $sessionStorage.mflag = 'OPF';
    }
    $scope.manageOutWard = function () {
        $sessionStorage.mflag = 'OW';
    }
    $scope.manageSSerials = function () {
        $sessionStorage.mflag = 'SS';
    }
    $scope.manageSMS = function () {
        $sessionStorage.mflag = 'SC';
    }
    $scope.manageExtend = function () {
        $sessionStorage.mflag = 'EL';
    }
    $scope.manageDPG = function () {
        $sessionStorage.mflag = 'DPG';
    }
    $scope.managePR = function () {
        $sessionStorage.mflag = 'PR';
    }
    // Pay
    $scope.managePMode = function () {
        $sessionStorage.mflag = 'PMO';
    }
    $scope.managePGW = function () {
        $sessionStorage.mflag = 'PGW';
    }

    //Safety
    $scope.managesafety = function ()
    {
        $sessionStorage.mflag = 'SF';
    }

    //Setting
    $scope.manageSync = function () {
        $sessionStorage.mflag = 'SY';
    }

    $scope.managenews = function () {
        $sessionStorage.mflag = 'NM';
    }
    $scope.manageimage = function () {
        $sessionStorage.mflag = 'IM';
    }
    $scope.manageup = function () {
        $sessionStorage.mflag = 'UP';
    }
    $scope.manageui = function () {
        $sessionStorage.mflag = 'UI';
    }
    $scope.manageMM = function () {
        $sessionStorage.mflag = 'MM';
    }
    $scope.manageSM = function () {
        $sessionStorage.mflag = 'SM';
    }
    $scope.manageRS = function () {
        $sessionStorage.mflag = 'RS';
    }
    $scope.manageUA = function () {
        $sessionStorage.mflag = 'UA';
    }
    $scope.manageHI = function () {
        $sessionStorage.mflag = 'HI';
    }
    $scope.manageUHI = function () {
        $sessionStorage.mflag = 'UHI';
    }
    $scope.ManageReport = function () {
        $sessionStorage.mflag = 'LV';
    }
    $scope.ManageSync = function () {
        $sessionStorage.mflag = 'SYL';
    }
    $scope.Managehdetails = function () {
        $sessionStorage.mflag = 'VH';
    }
    $scope.ManageApp = function () {
        $sessionStorage.mflag = 'AN';
    }
    $scope.ManageVersion = function () {
        $sessionStorage.mflag = 'VM';
    }
    $scope.ManageVerify = function () {
        $sessionStorage.mflag = 'VP';
    }
    $scope.ManageOutWord = function () {
        $sessionStorage.mflag = 'OW';
    }
    $scope.ManageCons = function () {
        $sessionStorage.mflag = 'CF';
    }
    $scope.ManageArea = function () {
        $sessionStorage.mflag = 'CA';
    }
    $scope.ManageASummary = function () {
        $sessionStorage.mflag = 'CAS';
    }
    $scope.ManageDSummary = function () {
        $sessionStorage.mflag = 'CDS';
    }
    $scope.ManageTC = function () {
        $sessionStorage.mflag = 'TC';
    }
    $scope.ManageMTC = function () {
        $sessionStorage.mflag = 'MTC';
    }
    $scope.analyticalrptclick = function () {
        $rootScope.hidebackbtn = false;
    }
    $scope.purchase = function (code) {
        $sessionStorage.rflag = code;
    }
});