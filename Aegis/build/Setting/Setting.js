appdash.controller('GetSynchronizeSettingController', function ($http, $scope, $filter, SmartAlert, userService, $timeout, $state, $localStorage, $sessionStorage, $rootScope, base64, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('FA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.divshow = true;
        $scope.divhide = false;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Synchronize',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [

                  { columnid: 'PolicyName', title: 'Policy Name' },
                  { columnid: 'ConsumersFrom', title: 'Consumers From' },
                  { columnid: 'ConsumersTo', title: 'Consumers To' },
                  { columnid: 'BasicMaster', title: 'Basic Master(Sec)' },
                  { columnid: 'CmGet', title: 'Get Consumer(Sec)' },
                  { columnid: 'CmPost', title: 'Post Consumer(Sec)' },
                  { columnid: 'TransGet', title: 'Get Transaction(Sec)' },
                  { columnid: 'TransPost', title: 'Post Transaction(Sec)' },
                  { columnid: 'DashRefreshTime', title: 'Dashboard Refresh Time(Sec)' },
                  { columnid: 'IsActive', title: 'Is Active' },


                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } },
                    8: { cell: { style: 'color:black' } },
                    9: { cell: { style: 'color:black' } },


                },

            };
            $scope.mystyle = [];
        }

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };

        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'PolicyId', displayName: 'Policy Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'PolicyName', displayName: 'Policy Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ConsumersFrom', displayName: 'Consumers From', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ConsumersTo', displayName: 'Consumers To', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BasicMaster', displayName: 'Basic Master', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CmGet', displayName: 'Get Consumer ', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CmPost', displayName: 'Post Consumer ', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransGet', displayName: 'Get Transaction', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransPost', displayName: 'Post Transaction', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DashRefreshTime', displayName: 'Dashboard Refresh Time', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Update(row.entity.PolicyId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "70"
                  , enableFiltering: false,
            }

         //{
         //    name: 'Select', displayName: 'Details', cellTemplate: '<button class="btn-default btn-xs"  ng-click="grid.appScope.viewdetail(row.entity.InspectionNo,row.entity.ConsNo,row.entity.ConsumerName,row.entity.InspectionDate,row.entity.TotalAmount,row.entity.PercentageScore,row.entity.MechanicName,row.entity.InspectionCharge,row.entity.SurkshaHoseAmount,row.entity.RegulatorAmount,row.entity.OtherAmount,row.entity.Image1,row.entity.Image2,row.entity.Image3,row.entity.ImageSign,row.entity.Latitude,row.entity.Longitude,row.entity.GSTAmount,row.entity.DiscountAmount)" data-title="Select"><span class="glyphicon glyphicon-eye-open"></span>View Detail</button>'
         //       , width: "100",
         //    headerCellTemplate: '<div style="text-align: center;margin-top: 21px;">Details</div>', enableFiltering: false
         //},

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Synchronize.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.divshow = true;
        $scope.divhide = false;


        $scope.Update = function (policyid) {
            $sessionStorage.Policyid = policyid;
            $sessionStorage.mflag = 'SY';
            $state.go('app.dashboard.syncronise');
        }

        $scope.clear1 = function () {
            $sessionStorage.Policyid = null;
            $sessionStorage.mflag = 'SY';
        }
        $scope.GetSynchronize = function () {

            $scope.divshow = false;
            $scope.divhide = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetSyncTimePolicy',
                params:
                    {
                        PolicyId: '', IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'SY')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'SY')
            $scope.GetSynchronize();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('SynchronizeSettingController', function ($http, $scope, $filter, SmartAlert, $timeout, $state, $localStorage, $sessionStorage, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.submit = 'Submit';
    $scope.GetPolicyType = [{ IsActive: 'C', IsActiveName: 'Common Policy' }, { IsActive: 'S', IsActiveName: 'Special Policy' }, { IsActive: 'B', IsActiveName: 'Blocked' }];
    $scope.divshow = true;
    $scope.divhide = false;

    if ($sessionStorage.Policyid != null) {
        $scope.GetSynchronize = function () {

            $scope.divshow = false;
            $scope.divhide = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetSyncTimePolicy',
                params:
                    {
                        PolicyId: $sessionStorage.Policyid, IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    var GetDetails = response.data.Data;
                    $scope.Synchronize = GetDetails[0];
                    $scope.submit = 'Update';
                }
                else {

                }
            })
            $scope.divshow = true;
            $scope.divhide = false;

        }
        $scope.GetSynchronize();
    }
    $scope.PostSynchronize = function (valid, Synchronize) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.userSynchronize = {};

            $scope.userSynchronize.PolicyName = Synchronize.PolicyName;
            $scope.userSynchronize.ConsumersFrom = Synchronize.ConsumersFrom;
            $scope.userSynchronize.ConsumersTo = Synchronize.ConsumersTo;
            var ele = $scope.userSynchronize.ConsumersTo

            //if (parseInt(ele.value, 10) > 12) {
            //    alert('value is bigger than 12');
            //    return false;
            //}
            $scope.userSynchronize.BasicMaster = Synchronize.BasicMaster;
            $scope.userSynchronize.CmGet = Synchronize.CmGet;
            $scope.userSynchronize.CmPost = Synchronize.CmPost;
            $scope.userSynchronize.TransGet = Synchronize.TransGet;
            $scope.userSynchronize.TransPost = Synchronize.TransPost;
            $scope.userSynchronize.DashRefreshTime = Synchronize.DashRefreshTime;

            $scope.userSynchronize.UserCode = $sessionStorage.ucode;

            $scope.userSynchronize.UserRole = $sessionStorage.RoleCode;
            $scope.userSynchronize.IsActive = Synchronize.IsActive;
            if ($sessionStorage.Policyid != null) {

                $scope.userSynchronize.PolicyId = $sessionStorage.Policyid;

                var json = angular.toJson($scope.userSynchronize)

                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'POST',
                    url: uriadmin + 'setting/PutSyncTimePolicy',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.GetSignInData = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                        $sessionStorage.Policyid = null;
                        $scope.submit = 'Submit';
                        var h = setInterval(function () {
                            $state.go('app.dashboard.syncronize_grid');
                            window.clearInterval(h);
                        }, 3000);
                        // $state.go('app.dashboard.syncronize_grid');
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);

                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });

            }
            else {
                var json = angular.toJson($scope.userSynchronize)

                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'POST',
                    url: uriadmin + 'setting/PostSyncTimePolicy',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.GetSignInData = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                        //$state.go('app.dashboard.syncronize_grid');
                        var h = setInterval(function () {
                            $state.go('app.dashboard.syncronize_grid');
                            window.clearInterval(h);
                        }, 3000);

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                });
            }
        }
    }

});
appdash.controller('NewsManagementController', function ($http, $scope, $filter, $timeout, userService, $state, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'News Management',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'applicationflag', title: 'Application' },
                  { columnid: 'NewsHead', title: 'News Head' },
                   { columnid: 'locationflag', title: 'Location' },
                  { columnid: 'priorityflag', title: 'P' },
                   { columnid: 'nMarkBold', title: 'Application' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }


        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'NewsId', displayName: 'News Id ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'applicationflag', displayName: 'Application Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'NewsHead', displayName: 'News Headline', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'locationflag', displayName: 'Location', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'priorityflag', displayName: 'Priority', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'nMarkBold', displayName: 'Mark Bold', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.NewsId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("News_management.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (NewsId) {
            $sessionStorage.nId = NewsId;
            $sessionStorage.mflag = 'NM';
            $state.go('app.dashboard.news');

        }
        $scope.clear1 = function () {
            $sessionStorage.nId = null;
            $sessionStorage.mflag = 'NM';
        }

        $scope.getNewsManagement = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetNews',
                params:
                    { NewsId: null, Location: null, Application: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'NM')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'NM')
            $scope.getNewsManagement();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('NewsController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.newspu = 'Pushpam';
        $scope.hpappli = false;
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;

    $scope.getNewsIdWise = function () {

        if ($sessionStorage.nId != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetNews',
                params:
                    { NewsId: $sessionStorage.nId, Location: null, Application: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allnews = response.data.Data;
                    $scope.news = $scope.allnews[0];
                    $scope.news.NewsHead = $scope.news.NewsHead;
                    $scope.news.IsActive = $scope.news.IsActive;
                    $scope.news.MarkBold = $scope.news.nMarkBold;
                    $scope.news.Priority = $scope.news.nPriority;
                    $scope.news.Location = $scope.news.nLocation;
                    $scope.news.Application = $scope.news.nApplication;

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getNewsIdWise();
    $scope.saveNewsDetails = function (valid, news) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ("NewsId" in news) {
                $scope.news.NewsId = $sessionStorage.nId;
                $scope.news.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.news)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else {
                $scope.news = news;
                $scope.news.NewsId = 0;
                $scope.news.IsActive = 'Y';
                if ($scope.news.MarkBold == undefined)
                    $scope.news.MarkBold = 'N';
                else
                    $scope.news.MarkBold = 'Y';
                $scope.news.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.news)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'master/manageNews',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;
                $scope.SmartCardDisable = true;
                //$scope.clear();
                $scope.submit = 'Submit';
                //$state.go('app.dashboard.news_management');
                SmartAlert.Success(response.data.Message);
                $rootScope.$emit("CallParentMethod");
               
                var h = setInterval(function () {
                    $state.go('app.dashboard.news_management');
                    window.clearInterval(h);
                }, 3000);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }

    $scope.clear = function () {

        $scope.news.NewsHead = '';
        $scope.news.IsActive = '';
        $scope.news.MarkBold = '';
        $scope.news.Priority = '';
        $scope.news.Location = '';
        $scope.news.Application = '';
    }

});
appdash.controller('ImageManagementGridController', function ($http, $scope, $filter, $timeout, userService, $state, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Image Management',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                  { columnid: 'ImageName', title: 'Image Name' },
                  { columnid: 'ImgTitle', title: 'Image Title' },
                  { columnid: 'cProductDesc', title: 'Product Description' },
                  { columnid: 'IsAdvertisement', title: 'Is Advertisement' },
                  { columnid: 'StartDt', title: 'Start Date' },
                  { columnid: 'EndDt', title: 'End Date' },
                  { columnid: 'RedirectURL', title: 'Redirect URL' },
                  { columnid: 'IsActive', title: 'Is Active' },

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }


        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'ImageId', displayName: 'Image Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'ImageName', displayName: 'Image Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'ImgTitle', displayName: 'Image Title', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CProductCode', displayName: 'Product Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'cProductDesc', displayName: 'Product Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsAdvertisement', displayName: 'IsAdvertisement', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StartDt', displayName: 'Start Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'EndDt', displayName: 'End Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'RedirectURL', displayName: 'Redirect URL', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Update(row.entity.ImageId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Image_Management.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.Update = function (ImageId) {
            $sessionStorage.ImageId = ImageId;
            $sessionStorage.mflag = 'IM';
            $state.go('app.dashboard.image_management');
        }
        $scope.clear1 = function () {
            $sessionStorage.ImageId = null;
            $sessionStorage.mflag = 'IM';
        }
        $scope.getImageManagement = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetallImages',
                params:
                    { ImageId: null, CProductCode: null, IsAdvertisement: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'IM')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'IM')
            $scope.getImageManagement();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }
});
appdash.controller('ImageManagementController', function ($http, $scope, $filter, $timeout, noimage, $state, $rootScope, $sessionStorage, base64, $imagebase64, SmartAlert, uri, uriadmin, uriadminimage, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    document.getElementById('fd').onkeydown = function () { if (event.keyCode == 8) event.preventDefault(); return false; }
    document.getElementById('td').onkeydown = function () { if (event.keyCode == 8) event.preventDefault(); return false; }
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.dateall = function () {
        var dateFormat = "dd-M-yy",
     from = $("#fd")
     .datepicker({
         changeMonth: true,
         changeYear: true,
         numberOfMonths: 1,
         minDate: new Date(),
         dateFormat: "dd-M-yy"
     })
     .on("change", function () {
         to.datepicker("option", "minDate", getDate(this));
     }),
     to = $("#td").datepicker({
         defaultDate: "+1w",
         changeMonth: true,
         changeYear: true,
         numberOfMonths: 1,
         minDate: 0,
         // maxDate: new Date(),
         dateFormat: "dd-M-yy"
     })
        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
    }
    $scope.dateall();

    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    $scope.daterr = function (flag, days) {
        $scope.StartDt = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var d = new Date();
        var year = d.addDays(365);
        var yeardate = $filter('date')(year, 'dd-MMM-yyyy');
        $scope.EndDt = yeardate;
    }
    $scope.daterr(365);

    $scope.getApplicationAll = function () {


        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'master/getapplications',
            params:
                { ProductCode: null, cProductDesc: null, AppType: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.allapp = response.data.Data;

            }


        })

        //  $sessionStorage.dCode = null


    }
    $scope.getApplicationAll();

    if ($sessionStorage.ImageId != null) {
        $scope.getImagedata = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetallImages',
                params: { ImageId: $sessionStorage.ImageId, CProductCode: null, IsAdvertisement: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    var GetDetails = response.data.Data;
                    $scope.image = GetDetails[0];
                    $scope.image.ImageTitle = $scope.image.ImgTitle;
                    $scope.image.ImageName = $scope.image.ImageName;
                    $scope.nimg1 = uriadminimage + $scope.image.ImageName;
                    //if ($scope.details.ImageName == null || $scope.details.ImageName == '' || $scope.details.ImageName == undefined) {

                    //    $scope.filepreview = 'http://localhost:12950/css/images/no-image.png';
                    //    //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';

                    //}
                    //else {
                    $scope.filepreview = $scope.nimg1;
                    //}

                    $scope.submit = 'Update';
                }
            })
        }
        $scope.getImagedata();
    }
    else {
        //$scope.filepreview = 'http://localhost:12950/css/images/no-image.png';
        //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';
        $scope.filepreview = noimage + 'css/images/no-image.png';
    }
    $scope.UploadPhoto = function (valid, image) {

        $scope.divshow = false;
        $scope.divhide = true;
        $scope.image = image;
        if ($sessionStorage.ImageId != null) {
            var image = $scope.image.ImageName.filename
            if (image == 'undefined' || image == undefined) {
                $sessionStorage.ImageName = $scope.image.ImageName;

            }
            else {
                $sessionStorage.ImageName = $scope.image.ImageName.filename;

            }

        }
        else {

        }


        //$scope.image = image;

        if (valid == true) {
            $scope.image.ImageName = $sessionStorage.ImageName;


            if ($sessionStorage.ImageId == null) {

                if ($sessionStorage.ImageData == '' || $sessionStorage.ImageData == undefined || $sessionStorage.ImageData == null) {
                    SmartAlert.Errmsg("Please select image");
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {

                    fileName = $scope.image.ImageName;
                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var ext = fileName.substr(idxDot, fileName.length).toLowerCase()

                    if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == '.bmp' || ext == 'png') {

                        $scope.getAuth = function () {
                            $scope.image.ImageId = 0;
                            if ($scope.image.RedirectURL == "" || $scope.image.RedirectURL == null || $scope.image.RedirectURL == undefined) {
                                $scope.image.RedirectURL = "#";
                            }
                            if ($scope.image.IsAdvertisement == '' || $scope.image.IsAdvertisement == null) {
                                $scope.image.IsAdvertisement = 'N';
                            }
                            else {
                                $scope.image.IsAdvertisement = 'Y';
                            }
                            var base65 = base64.encode(Name + ':' + Password);
                            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                            $http({
                                method: "POST",
                                url: uriadmin + 'master/postimages',
                                data: {
                                    ImageName: $scope.image.ImageName,
                                    ImageId: "0",
                                    CProductCode: $scope.image.CProductCode,
                                    IsAdvertisement: $scope.image.IsAdvertisement,
                                    StartDt: $scope.image.StartDt,
                                    EndDt: $scope.image.EndDt,
                                    RedirectURL: $scope.image.RedirectURL,
                                    IsActive: 'Y',
                                    ImageTitle: $scope.image.ImageTitle,
                                    data: $sessionStorage.ImageData
                                }
                            }).then(function (response) {
                                if (response.data.StatusCode == 1) {

                                    $scope.divshow = true;
                                    $scope.divhide = false;
                                    SmartAlert.Success(response.data.Message);
                                    var h = setInterval(function () {
                                        $state.go('app.dashboard.image_management_grid');
                                        window.clearInterval(h);
                                    }, 3000);
                                    $sessionStorage.ImageData = null;
                                    $sessionStorage.ImageName = null;

                                }
                                else {
                                    SmartAlert.Errmsg(response.data.Message);
                                    $scope.divshow = true;
                                    $scope.divhide = false;
                                }
                            });
                        }
                        $scope.getAuth();
                    }
                    else {
                        SmartAlert.Errmsg("Please select only image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                }
            }
            else {
                if ($scope.filepreview == '' || $scope.filepreview == undefined || $scope.filepreview == null) {
                    SmartAlert.Errmsg("Please select image");
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {

                    fileName = $sessionStorage.ImageName;
                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var ext = fileName.substr(idxDot, fileName.length).toLowerCase()

                    if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == 'bmp' || ext == 'png') {

                        $scope.getAuth = function () {
                            if ($scope.image.RedirectURL == "" || $scope.image.RedirectURL == null || $scope.image.RedirectURL == undefined) {
                                $scope.image.RedirectURL = "#";
                            }
                            var base65 = base64.encode(Name + ':' + Password);
                            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                            if ($scope.image.IsAdvertisement == '' || $scope.image.IsAdvertisement == null) {
                                $scope.image.IsAdvertisement = 'N';
                            }
                            else {
                                $scope.image.IsAdvertisement = 'Y';
                            }
                            $http({
                                method: "POST",
                                url: uriadmin + 'master/postimages',
                                data: {
                                    ImageName: $sessionStorage.ImageName,
                                    ImageId: $sessionStorage.ImageId,
                                    CProductCode: $scope.image.CProductCode,
                                    IsAdvertisement: $scope.image.IsAdvertisement,
                                    StartDt: $scope.image.StartDt,
                                    EndDt: $scope.image.EndDt,
                                    RedirectURL: $scope.image.RedirectURL,
                                    IsActive: $scope.image.IsActive,
                                    ImageTitle: $scope.image.ImageTitle,
                                    data: $sessionStorage.ImageData
                                }
                            }).then(function (response) {
                                if (response.data.StatusCode == 1) {
                                    // SmartAlert.Success(response.data.Message);
                                    //$state.go('app.dashboard.image_management_grid');
                                    $scope.divshow = true;
                                    $scope.divhide = false;
                                    SmartAlert.Success(response.data.Message);
                                    var h = setInterval(function () {
                                        $state.go('app.dashboard.image_management_grid');
                                        window.clearInterval(h);
                                    }, 3000);
                                    $sessionStorage.ImageData = null;
                                    $sessionStorage.ImageName = null;
                                }
                                else {
                                    SmartAlert.Errmsg(response.data.Message);
                                    $scope.divshow = true;
                                    $scope.divhide = false;

                                }
                            });
                        }
                        $scope.getAuth();
                    }
                    else {
                        SmartAlert.Errmsg("Please select only image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                }
            }
        }


        else {
            $scope.divshow = true;
            $scope.divhide = false;
        }

    };
    $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {

        if (fileObj.filetype != "image/gif" && fileObj.filetype != "" && fileObj.filetype != "application/javascript" && fileObj.filetype != "application/pdf" && fileObj.filetype != "text/plain" && fileObj.filetype != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && fileObj.filetype != "application/vnd.ms-excel" && fileObj.filetype != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            var imageData = fileObj.base64;
            $sessionStorage.ImageData = imageData;
            $scope.filepreview = 'data:image/png;base64,' + $sessionStorage.ImageData;
            var name = file.name;
            $sessionStorage.ImageName = name;
        }
        else {
            $sessionStorage.ImageData = "";
        }
    }

});
appdash.controller('UserAccountPushpamGridController', function ($http, $scope, $filter, $timeout, userService, $state, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FD');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'User Account Pushpam',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                  { columnid: 'PUserCode', title: 'User Code' },
                  { columnid: 'RoleCode', title: 'Role Code' },
                  { columnid: 'RoleDesc', title: 'Role' },
                  { columnid: 'FirstName', title: 'First Name' },
                  { columnid: 'LastName', title: 'Last Name' },
                  { columnid: 'Gender', title: 'Gender' },
                  { columnid: 'BirthDate', title: 'Birth date' },
                  { columnid: 'MobileNo', title: 'Mobile No' },
                  { columnid: 'MobileNoe', title: 'Mobile No(Optional)' },
                  { columnid: 'EmailAddress', title: 'Email Id' },
                    { columnid: 'LangDesc', title: 'Language' },
                    { columnid: 'Updatedby', title: 'Last Updated By' },
           { columnid: 'UpdateDt', title: 'Last Updated Date' },
                  { columnid: 'IsActive', title: 'Is Active' },

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } },
                    8: { cell: { style: 'color:black' } },
                    9: { cell: { style: 'color:black' } },
                    10: { cell: { style: 'color:black' } },
                    11: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }
        $sessionStorage.PUserCodeval = null;

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };

        $scope.filterOptions = {

            filterText: 'RoleCode:SYST',
            useExternalFilter: true
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {

            filterOptions: $scope.filterOptions,
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'PUserCode', displayName: 'User Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'RoleDesc', displayName: 'Role', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'BirthDate', displayName: 'Birthdate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LangDesc', displayName: 'Language', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'UpdateDt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Update(row.entity.PUserCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Account Pushpam.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.Update = function (PUserCode) {
            $sessionStorage.PUserCodeval = PUserCode;
            $sessionStorage.mflag = 'UP';
            $state.go('app.dashboard.user_accounts_pushpam');
        }
        $scope.clear1 = function () {
            //$sessionStorage.PUserCode = null;
            $sessionStorage.mflag = 'UP';
        }
        $scope.getUserPushpam = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetPushpamUsers',
                params:
                    { PUserCode: null, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'UP')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'UP')
            $scope.getUserPushpam();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('UserAccountPushpamController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.CheckIsLoginCred = false;
    $scope.checked1 = true;
    $scope.isPasswordShow = true;
    if ($sessionStorage.PUserCode != null) {
    }
    else {
        $scope.checkisactive = true;
    }
    $scope.value = true;
    $scope.inputTypeOne = 'password';
    $scope.inputTypeTwo = 'password';
    $scope.classNameOne = 'glyphicon-eye-close';
    $scope.classNameTwo = 'glyphicon-eye-close';
    document.getElementById('birthdate').onkeypress = function () { return false; }
    $scope.getGender = [{ GenderCode: 'M', GenderType: 'Male' }, { GenderCode: 'F', GenderType: 'Female' }];
    $scope.myFunction = function () { document.getElementById("emailid").style.textTransform = "lowercase"; }

    $scope.IsEmail = function (UserPushpam) {

        $scope.value = false;
        if (UserPushpam == 'Y') {
            $scope.value = true;
            $scope.enableCheck = 'y';
            document.getElementById('enablecheckid').disabled = true;

        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
            $scope.enableCheck = 'n';
            document.getElementById('enablecheckid').disabled = false;

        }
    }
    $scope.HideShowPasswordOne = function () {
        if ($scope.inputTypeOne == 'password') {
            $scope.inputTypeOne = 'text';
            $scope.classNameOne = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeOne = 'password';
            $scope.classNameOne = 'glyphicon-eye-close';
        }
    };
    $scope.HideShowPasswordTwo = function () {
        if ($scope.inputTypeTwo == 'password') {
            $scope.inputTypeTwo = 'text';
            $scope.classNameTwo = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeTwo = 'password';
            $scope.classNameTwo = 'glyphicon-eye-close';
        }
    };
    $scope.IsLoginCred = function (UserPushpam) {

        $scope.value = false;
        if (UserPushpam == 'y') {
            $scope.value = true;
        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
        }
    }
    $scope.getPuspamAccountWise = function () {

        if ($sessionStorage.PUserCodeval != null) {

            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetPushpamUsers',
                params:
                    { PUserCode: $sessionStorage.PUserCodeval, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allUserPushpam = response.data.Data;
                    $scope.UserPushpam = $scope.allUserPushpam[0];
                    $scope.UserPushpam.ConfirmUserPwd = $scope.UserPushpam.UserPwd;
                    var rolecd = $scope.UserPushpam.RoleCode;
                    if (rolecd == 'SYST') {
                        // document.getElementById('sel1').disabled = true;
                    }
                    else {
                        document.getElementById('sel1').disabled = false;
                    }
                    //  $scope.isPasswordShow = ($sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode) == "admi" ? true : false;

                    if ($sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode == "admi") {
                        $scope.isPasswordShow = true;
                    }
                    else if ($scope.UserPushpam.UserCode == $sessionStorage.PUserCode) {
                        $scope.isPasswordShow = true;
                    }
                    else {
                        $scope.isPasswordShow = false;
                    }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }

    }
    $scope.getPuspamAccountWise();
    $scope.getRole = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                { RoleCode: null, RoleDesc: null, RoleFor: 'PG', IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {

                $scope.getRoleValue = response.data.Data;
                var a = { "RoleCode": $scope.getRoleValue };
                var b = $filter('filter')(a.RoleCode, { RoleCode: "SYST" })[0];
                $scope.getRoleValue.splice($scope.getRoleValue.indexOf(b), 1);

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getRole();
    $scope.getLanguage = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Distributor/GetLanguageInfo',
            params:
                { LangCode: null, LangDesc: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getLanguageValue = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getLanguage();
    $scope.ConfirmPassword = function (UserPushpam) {
        if ($scope.value == true) {
            if (UserPushpam.UserPwd != UserPushpam.ConfirmUserPwd) {
                $scope.error = true;
                var emailid = document.getElementById('emailid');
                var pass1 = document.getElementById('pass1');
                var pass2 = document.getElementById('pass2');
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if (UserPushpam.UserPwd == "" && UserPushpam.ConfirmUserPwd) {
                    $scope.errorMessage = "Please fill out required fields";
                }
                else {
                    $scope.errorMessage = "Password does not match";
                }
            } else {
                $scope.error = false;
                $scope.CheckIsLoginCred = false;
            }
        }
    };
    $scope.CheckOperationalUsersData = function (UserPushpam, valid) {

        if ($scope.value == true) {
            if (UserPushpam.EmailAddress != null && UserPushpam.UserPwd != null && UserPushpam.EmailAddress != "" && UserPushpam.UserPwd != "" && UserPushpam.ConfirmUserPwd != null && UserPushpam.ConfirmUserPwd != "undefined" && $scope.error != true) {
                $scope.error = false;
                $scope.PostOperationalUsersData(UserPushpam, valid);

            }
            else {
                $scope.CheckIsLoginCred = true;
                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (UserPushpam.UserPwd == '' && UserPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = "Please fill out required fields";
                }



            }
        } else {
            $scope.CheckIsLoginCred = false;
            $scope.PostOperationalUsersData(UserPushpam, valid);
        }
    }
    $scope.PostOperationalUsersData = function (UserPushpam, valid) {

        if (valid == true) {
            if ($scope.error != true) {
                $scope.UserPushpam = UserPushpam;
                //if ($scope.UserPushpam.AlertSMS == '' || $scope.UserPushpam.AlertSMS == null) {
                //    $scope.UserPushpam.AlertSMS = 'N';

                //}
                //if ($scope.UserPushpam.AlertMail == '' || $scope.UserPushpam.AlertMail == null) {
                //    $scope.UserPushpam.AlertMail = 'N';

                //}
                //if ($scope.UserPushpam.IsSendAllMail == '' || $scope.UserPushpam.IsSendAllMail == null)
                //{
                //    $scope.UserPushpam.IsSendAllMail='N';
                //}
                //else {
                //    $scope.UserPushpam.IsSendAllMail = 'Y';
                //}
                if ($sessionStorage.PUserCodeval != null) {
                    $scope.UserPushpam.PUserCode = $sessionStorage.PUserCodeval;
                    var json = angular.toJson($scope.UserPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PutPushpamUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_pushpam_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $state.go('app.dashboard.user_account_pushpam_grid');

                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }
                else {
                    var json = angular.toJson($scope.UserPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PostPushpamUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_pushpam_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $state.go('app.dashboard.user_account_pushpam_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }


            }
            else {

                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (UserPushpam.UserPwd == '' && UserPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = " ";
                }

            }
        }

    }
});
appdash.controller('UserAccountHPCLGridController', function ($http, $scope, $filter, $timeout, $state, userService, $window, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FE');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        //$scope.LoadOnce = function () {
        //    $sessionStorage.hasReloaded = true;
        //    $window.location.reload();
        //}
        //if (!$sessionStorage.hasReloaded) $scope.LoadOnce();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'User Account Pushpam',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'CUserCode', title: 'User Code' },
                  { columnid: 'RoleCode', title: 'Role Code' },
                  { columnid: 'FirstName', title: 'First Name' },
                  { columnid: 'LastName', title: 'Last Name' },
                  { columnid: 'Gender', title: 'Gender' },
                  { columnid: 'BirthDate', title: 'Birth date' },
                  { columnid: 'MobileNo', title: 'Mobile No' },
                  { columnid: 'MobileNoe', title: 'Mobile No(Optional)' },
                  { columnid: 'EmailAddress', title: 'Email Id' },
                  { columnid: 'LangDesc', title: 'Language' },
                   { columnid: 'Updatedby', title: 'Last Updated By' },
                 { columnid: 'UpdateDt', title: 'Last Updated Date' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } },
                    8: { cell: { style: 'color:black' } },
                    9: { cell: { style: 'color:black' } },
                    10: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }


        $sessionStorage.CUserCodeval = null;

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'CUserCode', displayName: 'User Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'BirthDate', displayName: 'Birthdate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'LangDesc', displayName: 'Language', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'UpdateDt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Update(row.entity.CUserCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Account HPCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.Update = function (CUserCode) {
            $sessionStorage.CUserCodeval = CUserCode;
            $sessionStorage.mflag = 'UI';
            $state.go('app.dashboard.user_accounts_hpcl');
        }
        $scope.clear1 = function () {
            $sessionStorage.CUserCode = null;
            $sessionStorage.mflag = 'UI';
        }

        $scope.getUserPushpam = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetCompanyUsers',
                params:
                    { CUserCode: null, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                //$sessionStorage.hasReloaded = false;
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'UI')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'UI')
            $scope.getUserPushpam();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('UserAccountHPCLController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
        $scope.Plant = false;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.CheckIsLoginCred = false;
    $scope.checked1 = true;
    $scope.isPasswordShow = true;
    if ($sessionStorage.CUserCode != null) {
    }
    else {
        $scope.checkisactive = true;
    }
    $scope.value = true;
    $scope.inputTypeOne = 'password';
    $scope.inputTypeTwo = 'password';
    $scope.classNameOne = 'glyphicon-eye-close';
    $scope.classNameTwo = 'glyphicon-eye-close';
    document.getElementById('birthdate').onkeypress = function () { return false; }
    $scope.getGender = [{ GenderCode: 'M', GenderType: 'Male' }, { GenderCode: 'F', GenderType: 'Female' }];
    $scope.myFunction = function () { document.getElementById("emailid").style.textTransform = "lowercase"; }

    $scope.HideShowPasswordOne = function () {
        if ($scope.inputTypeOne == 'password') {
            $scope.inputTypeOne = 'text';
            $scope.classNameOne = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeOne = 'password';
            $scope.classNameOne = 'glyphicon-eye-close';
        }
    };
    $scope.HideShowPasswordTwo = function () {
        if ($scope.inputTypeTwo == 'password') {
            $scope.inputTypeTwo = 'text';
            $scope.classNameTwo = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeTwo = 'password';
            $scope.classNameTwo = 'glyphicon-eye-close';
        }
    };


    $scope.IsEmail = function (UserPushpam) {

        $scope.value = false;
        if (UserPushpam == 'Y') {
            $scope.value = true;
            $scope.enableCheck = 'y';
            document.getElementById('enablecheckid').disabled = true;

        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
            $scope.enableCheck = 'n';
            document.getElementById('enablecheckid').disabled = false;

        }
    }
    $scope.IsLoginCred = function (HPCLPushpam) {

        $scope.value = false;
        if (HPCLPushpam == 'y') {
            $scope.value = true;
        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
        }
    }

    $scope.getPuspamAccountWise = function () {

        if ($sessionStorage.CUserCodeval != null) {
            // document.getElementById('sel1').disabled = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetCompanyUsers',
                params:
                    { CUserCode: $sessionStorage.CUserCodeval, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allHPCLPushpam = response.data.Data;
                    $scope.HPCLPushpam = $scope.allHPCLPushpam[0];
                    $scope.GetPlant($scope.HPCLPushpam.RoleCode);
                    $scope.HPCLPushpam.ConfirmUserPwd = $scope.HPCLPushpam.UserPwd;
                    //  $scope.isPasswordShow = $sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode == "admi" ? true : false;
                    if ($sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode == "admi") {
                        $scope.isPasswordShow = true;
                    }
                    else if ($scope.HPCLPushpam.UserCode == $sessionStorage.CUserCode) {
                        $scope.isPasswordShow = true;
                    }
                    else {
                        $scope.isPasswordShow = false;
                    }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getPuspamAccountWise();

    $scope.getRole = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                { RoleCode: null, RoleDesc: null, RoleFor: 'CO', IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getRoleValue = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getRole();

    $scope.getLanguage = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Distributor/GetLanguageInfo',
            params:
                { LangCode: null, LangDesc: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getLanguageValue = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getLanguage();

    
    $scope.GetPlant = function (RoleCode)
    {
        if (RoleCode == 'PLUS') {
            $scope.Plant = true;

            $http({
                method: 'GET',
                url: uriadmin + 'master/GetPlantDetails',
                params:
                    { PlantId: null, ManfactId: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.PlantData = response.data.Data;
                }
            })
        }
        else { $scope.Plant = false; }
}
   // $scope.GetPlant();



    $scope.ConfirmPassword = function (HPCLPushpam) {

        if ($scope.value == true) {
            if (HPCLPushpam.UserPwd != HPCLPushpam.ConfirmUserPwd) {
                $scope.error = true;

                var emailid = document.getElementById('emailid');
                var pass1 = document.getElementById('pass1');
                var pass2 = document.getElementById('pass2');
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if (HPCLPushpam.UserPwd == "" && HPCLPushpam.ConfirmUserPwd) {
                    $scope.errorMessage = "Please fill out required fields";
                }
                else {
                    $scope.errorMessage = "Password does not match";
                }



            } else {
                $scope.error = false;
                $scope.CheckIsLoginCred = false;
            }
        }
    };
    $scope.CheckOperationalUsersData = function (HPCLPushpam, valid) {

        if ($scope.value == true) {
            if (HPCLPushpam.EmailAddress != null && HPCLPushpam.UserPwd != null && HPCLPushpam.EmailAddress != "" && HPCLPushpam.UserPwd != "" && HPCLPushpam.ConfirmUserPwd != null && HPCLPushpam.ConfirmUserPwd != "undefined" && $scope.error != true) {
                $scope.PostOperationalUsersData(HPCLPushpam, valid);
            }
            else {
                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (HPCLPushpam.UserPwd == '' && HPCLPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else
                    {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = "Please fill out required fields";
                }


            }
        } else {
            $scope.CheckIsLoginCred = false;
            $scope.error = false;
            $scope.PostOperationalUsersData(HPCLPushpam, valid);
        }
    }
    $scope.PostOperationalUsersData = function (HPCLPushpam, valid) {

        if (valid == true) {

            if ($scope.error != true) {
                $scope.HPCLPushpam = HPCLPushpam;



                //if ($scope.HPCLPushpam.AlertSMS == '' || $scope.HPCLPushpam.AlertSMS == null) {
                //    $scope.HPCLPushpam.AlertSMS = 'N';

                //}
                //if ($scope.HPCLPushpam.AlertMail == '' || $scope.HPCLPushpam.AlertMail == null) {
                //    $scope.HPCLPushpam.AlertMail = 'N';

                //}
                if ($scope.HPCLPushpam.EmailAddress == '' || $scope.HPCLPushpam.EmailAddress == null) {
                    $scope.HPCLPushpam.EmailAddress = null;

                }
                if ($scope.HPCLPushpam.UserPwd == '' || $scope.HPCLPushpam.UserPwd == null) {
                    $scope.HPCLPushpam.UserPwd = null;

                }
                //if ($scope.HPCLPushpam.IsSendAllMail == '' || $scope.HPCLPushpam.IsSendAllMail == null) {
                //    $scope.HPCLPushpam.IsSendAllMail = 'N';
                //}
                //else {
                //    $scope.HPCLPushpam.IsSendAllMail = 'Y';
                //}
                $scope.HPCLPushpam.PUserCode = $sessionStorage.ucode;
                $scope.HPCLPushpam.ImeiNoA = null;
                $scope.HPCLPushpam.ImageName = null;
                if ($sessionStorage.CUserCodeval != null) {
                    $scope.HPCLPushpam.CUserCode = $sessionStorage.CUserCodeval;
                    var json = angular.toJson($scope.HPCLPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PutCompanyUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            //$.bigBox({
                            //    title: response.data.Message,
                            //    //content:response.data.Message,
                            //    color: "#296191",
                            //    icon: "fa fa-thumbs-up animated bounce ",
                            //    timeout: "4000"
                            //})
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_gogas_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $state.go('app.dashboard.user_account_pushpam_grid');
                            //$state.go('app.dashboard.user_account_HPCL_grid');

                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }
                else {
                    var json = angular.toJson($scope.HPCLPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PostCompanyUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_gogas_grid');
                                window.clearInterval(h);
                            }, 3000);

                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }

            }
            else {

                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (HPCLPushpam.UserPwd == '' && HPCLPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = " ";
                    // $scope.errorMessage = "Please fill out required fields";
                }
            }

        }

    }
});
//DISTRIBUTOR=>HIERARCHY=>HIERARCHY
appdash.controller('HierarchyController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.newname = 'Pushpam';
        $scope.hpappli = false;
        $scope.for = [{ rolefor: 'PG', name: 'GoTech' }, { rolefor: 'CO', name: 'GoGas' }];
    }
    $scope.submits = 'Submit';
    document.getElementById('date').onkeydown = function () { if (event.keyCode == 8) event.preventDefault(); return false; }
    $scope.date = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.bindRole = function (flag) {
        if ($sessionStorage.for != null) {

        } else {
            $scope.gridOptions1.data.length = 0;
            $scope.gridOptions2.data.length = 0;
        }
        $scope.delcol = "delete";
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                { RoleCode: null, RoleDesc: null, RoleFor: flag, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {

                $scope.getRoleValue = response.data.Data;
            }
            else { SmartAlert.Errmsg(response.data.Message); $scope.getRoleValue = []; }

        })
    }
    $scope.getHierarchyData = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uriadmin + 'setting/GetHierarchyInfo',
            params: { HsId: $sessionStorage.HsId, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions2.data = response.data.Data.Table1;
            }
            else {
                //SmartAlert.Errmsg(response.data.Message);
                $scope.gridOptions1.data.length = 0
            }
        })
    }

    //region dropdown
    $scope.getregion = function (zid) {
        $http.get(uriadmin + 'master/GetRegionDtls?ZoneId=' + zid + '&RegionId=&Region=&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Dallregion = response.data.Data;

            }
            else {
                //SmartAlert.Errmsg(response.data.Message);
                $scope.RegionId = null;
                $scope.Dallregion = null;
                //$sessionStorage.ZoneId = null;
            }
        })
    }

    if ($sessionStorage.for != null) {
        $scope.submits = 'Update';
        if ($scope.hpappli == false) {
            $scope.rolefor = $sessionStorage.for;
        }
        $scope.HsDesc = $sessionStorage.hierarchyname;
        $scope.date = $sessionStorage.hierdate;
        $scope.RegionId = $sessionStorage.RegionId;
        $scope.ZoneId = $sessionStorage.ZoneId;
        $scope.bindRole($sessionStorage.for);
        $scope.getregion($sessionStorage.ZoneId);
        $scope.getHierarchyData();
    }


    //zone dropdown
    $scope.Getzone = function () {
        $http.get(uriadmin + 'master/GetZone?ZoneId&ZoneDesc&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Dallzone = response.data.Data;
            }
            else {
                // SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.Getzone();


    //$scope.getregion();

    $scope.Stylefun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'User Account Pushpam',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [


              { columnid: 'CUserCode', title: 'User Code' },
              { columnid: 'RoleCode', title: 'Role Code' },
              { columnid: 'FirstName', title: 'First Name' },
              { columnid: 'LastName', title: 'Last Name' },
              { columnid: 'BirthDate', title: 'Birthdate' },
              { columnid: 'MobileNo', title: 'Mobile No' },
              { columnid: 'EmailAddress', title: 'Email Id' },


            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } },
                6: { cell: { style: 'color:black' } },
            },

        };
        $scope.mystyle = [];
    }



    $scope.getUser = function (code) {
        var role = $scope.rolefor;
        if (role == "PG") { $scope.getUserData(code, "setting/GetPushpamUsers?PUserCode") }
        else if (role == "CO") { $scope.getUserData(code, "setting/GetCompanyUsers?CUserCode&EmailAddress") }
    }


    $scope.getUserData = function (rolecode, url) {
        if (rolecode != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + url,
                params:
                    { RoleCode: rolecode, IsActive: 'Y' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data;
                }
                else {
                    //SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data.length = 0
                }
            })
        }
    }

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];

    $scope.grid1column = function () {
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'UserCode', displayName: 'User Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'BirthDate', displayName: 'Birthdate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, visible: false },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Add', displayName: 'Add', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Add(row.entity)" data-title="Add"><span class="glyphicon glyphicon-plus">Add</span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
    }
    $scope.grid2column = function () {
        $scope.gridOptions2 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'HsId', displayName: 'HsId', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'UserCode', displayName: 'User Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'BirthDate', displayName: 'Birthdate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, visible: false },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            //{ name: 'Special', visible: true, enableFiltering: false, field: 'IsSpecial', width: "*", type: 'boolean', cellTemplate: '<input type="checkbox" ng-model="row.entity.IsSpecial">' },

            //  { name: 'Delete', visible: true, enableFiltering: false, field: 'Delete', width: "70", type: 'char', cellTemplate: '<input type="button" value={{delcol}} ng-click="grid.appScope.check(row.entity.IsActive,row)" ng-model="row.entity.IsActive">' },

          { name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove"><span class="glyphicon glyphicon-minus">Remove</span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions2.multiSelect = false;
        $scope.gridOptions2.enableRowSelection = true;
    }
    $scope.grid1column();
    $scope.grid2column();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.Add = function (entity) {
        entity.Isspecial = false;
        if ($scope.gridOptions2.data.length != 0) {
            if ($sessionStorage.for != null) {
                $scope.second = [];
                $scope.second = $scope.gridOptions2.data;
                var b;
                b = false;
                for (i = 0; i < $scope.gridOptions2.data.length; i++) { if ($scope.second[i].UserCode == entity.UserCode) { b = true; } }
                if (b == false) { $scope.second.push(entity); }
                else { SmartAlert.Errmsg("You can not add duplicate record"); }
            } else { if ($scope.second.indexOf(entity) == -1) { $scope.second.push(entity); } else { SmartAlert.Errmsg("You can not add duplicate record"); } }
        }
        else { $scope.second = []; $scope.second.push(entity); }
        $scope.gridOptions2.data = $scope.second;
    }
    $scope.Remove = function (row) {
        if (row.entity.HsId != null) {
            if (row.entity.IsActive == "Y") { row.entity.IsActive = "N"; }
            else if (row.entity.IsActive == "N") { row.entity.IsActive = "Y"; }
        }
        else {
            var index = $scope.gridOptions2.data.indexOf(row.entity);
            $scope.gridOptions2.data.splice(index, 1);
        }
    }
    $scope.datagenerate = function () {
        var posts = [$scope.gridOptions1.data.length];
        for (i = 0; i < $scope.gridOptions2.data.length; i++) {
            var postdata = {};
            postdata["HsId"] = null;
            postdata["HsdId"] = null;
            postdata["UserCode"] = $scope.gridOptions2.data[i].UserCode;
            postdata["RoleCode"] = $scope.gridOptions2.data[i].RoleCode;
            if ($scope.gridOptions2.data[i].IsSpecial == true) { postdata["AddType"] = "SP" }
            if ($scope.gridOptions2.data[i].IsSpecial == false) { postdata["AddType"] = "RE" }
            postdata["IsActive"] = "Y";
            posts[i] = postdata;
        }
        $scope.abc = angular.toJson(posts);
    }
    $scope.datagenerateforUpdate = function () {
        var posts = [$scope.gridOptions1.data.length];
        for (i = 0; i < $scope.gridOptions2.data.length; i++) {
            var postdata = {};
            postdata["HsId"] = $scope.gridOptions2.data[i].HsId;
            postdata["HsdId"] = $scope.gridOptions2.data[i].HsdId;
            postdata["UserCode"] = $scope.gridOptions2.data[i].UserCode;
            postdata["RoleCode"] = $scope.gridOptions2.data[i].RoleCode;
            if ($scope.gridOptions2.data[i].IsSpecial == true) { postdata["AddType"] = "SP" }
            if ($scope.gridOptions2.data[i].IsSpecial == false) { postdata["AddType"] = "RE" }
            postdata["IsActive"] = "Y";
            if ($scope.gridOptions2.data[i].IsActive == 'N') { postdata["IsActive"] = "N" }
            if ($scope.gridOptions2.data[i].IsActive == 'Y') { postdata["IsActive"] = "Y" }
            posts[i] = postdata;
        } $scope.abc = angular.toJson(posts);
    }
    $scope.savePostData = function (valid) {

        if (valid == true) {
            if ($scope.gridOptions2.data.length != 0) {
                $scope.divshow = false;
                $scope.divhide = true;
                if ($scope.submits == "Submit") {
                    $scope.datagenerate();
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PostHierarchyInfo',
                        data: {
                            Data: $scope.abc,
                            HsDesc: $scope.HsDesc,
                            HsFor: $scope.rolefor,
                            HsType: "NE",
                            PUserCode: $sessionStorage.ucode,
                            WDate: $scope.date,
                            ZoneId: $scope.ZoneId,
                            RegionID: $scope.RegionId
                        }
                    }).then(function (response) {

                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            $scope.clear();
                            $scope.submit = 'Submit';
                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                else if ($scope.submits == "Update") {

                    $scope.datagenerateforUpdate();
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PutHierarchyInfo',
                        data: {
                            Data: $scope.abc,
                            HsId: $sessionStorage.HsId,
                            HsDesc: $scope.HsDesc,
                            HsDesc: $scope.HsDesc,
                            HsFor: $scope.rolefor,
                            HsType: "NE",
                            PUserCode: $sessionStorage.ucode,
                            WDate: $scope.date,
                            ZoneId: $scope.ZoneId,
                            RegionID: $scope.RegionId
                        }
                    }).then(function (response) {

                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            $scope.clear();
                            $scope.submit = 'Submit';
                            $state.go('app.dashboard.hierarchy_grid');
                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                else {
                    SmartAlert.Errmsg("Please Add Employee!");
                }
                // $state.go('app.dashboard.hierarchy_grid');

                $sessionStorage.for = null;
                $sessionStorage.hierarchyname = null;
                $sessionStorage.hierdate = null;
                $sessionStorage.HsId = null;
            }

        }


    };
    $scope.clear = function () {
        $scope.HsDesc = '';
        $scope.rolefor = '';
        $scope.RoleCode = '';
        $scope.date = '';
        $scope.ZoneId = '';
        $scope.RegionId = '';

        $scope.gridOptions1.data.length = 0;
        $scope.gridOptions2.data.length = 0;

    }
});
appdash.controller('HierarchyGridController', function ($http, $scope, $filter, $timeout, $state, userService, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('CO');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.addnew = function () {
            $state.go('app.dashboard.hierarchy');
            $sessionStorage.for = null;
            $sessionStorage.hierarchyname = null;
            $sessionStorage.hierdate = null;
            $sessionStorage.HsId = null;
        }
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Hierarchy',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                   { columnid: 'HsDesc', title: 'Hierarchy Name' },
                { columnid: 'HSTypeDesc', title: 'Hierarchy Type' },
                { columnid: 'HsForDesc', title: 'Description' },
                { columnid: 'OldHsId', title: 'Old Hierarchy Id' },
                { columnid: 'ADate', title: 'Application Date' },
                 { columnid: 'CrDate', title: 'CrDate' },
                { columnid: 'WDate', title: 'Applicable Date' },
                 { columnid: 'Updatedby', title: 'Last Updated By' },
                { columnid: 'UpdateDate', title: 'Last Updated Date' },
                { columnid: 'IsActive', title: 'IsActive' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }
        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        $scope.grid1column = function () {
            $scope.gridOptions1 = {
                enableFiltering: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                paginationPageSizes: [25, 50, 100, 500, 1000],
                paginationPageSize: 25,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                columnDefs:
                [
                    { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Edit(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"> Edit</span></button>', width: "70", enableFiltering: false, },
                { name: 'HsId', displayName: 'HsId', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'HsDesc', displayName: 'Hierarchy Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'HSTypeDesc', displayName: 'Hierarchy Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'HsForDesc', displayName: 'Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'OldHsId', displayName: 'Old Hierarchy Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'ADate', displayName: 'Application Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'CrDate', displayName: 'CrDate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'WDate', displayName: 'Applicable Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'UpdateDate', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'IsActive', displayName: 'IsActive', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, visible: false },
               { name: 'PUserCode', displayName: 'UserCode', width: "*",cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },                
                ],
                enableGridMenu: false,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterMenuExcel: false,
                exporterMenuCsv: false,
                gridMenuCustomItems: [{
                    title: 'Export all data as excel',
                    action: function ($event) {
                        alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                    },
                    order: 110
                }]
            };
            $scope.toggleFiltering = function () {
                $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            };
            $scope.gridOptions1.multiSelect = false;
            $scope.gridOptions1.enableRowSelection = true;
        }
        $scope.grid1column();
        $scope.Edit = function (entity) {
            $sessionStorage.for = entity.HsFor;
            $sessionStorage.hierarchyname = entity.HsDesc;
            $sessionStorage.hierdate = entity.WDate;
            $sessionStorage.HsId = entity.HsId;
            $sessionStorage.ZoneId = entity.ZoneId;
            $sessionStorage.RegionId = entity.RegionId;
            $sessionStorage.mflag = 'HI';
            $state.go('app.dashboard.hierarchy');

        }
        $scope.gethierarchy = function () {
            $sessionStorage.for = null;
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetHierarchyInfo',
                params: { IsActive: 'Y' }
            }).then(function (response) {

                if (response.data.StatusCode != 0) {
                    // $scope.gridOptions1.data = response.data.Data.Table;
                    $sessionStorage.grddata = response.data.Data.Table;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                }
                else { SmartAlert.Errmsg(response.data.Message); $scope.gridOptions1.data.length = 0 }
                $sessionStorage.mflag = null;
            })
        }
        if ($sessionStorage.mflag == 'HI')
            $scope.gethierarchy();
        $scope.gridOptions1.data = $sessionStorage.grddata;
        $scope.submit = 'Submit';
        $scope.divshow = true;
        $scope.divhide = false;
        $scope.Remove = function (entity) {
            var index = $scope.gridOptions2.data.indexOf(entity);
            $scope.gridOptions2.data.splice(index, 1);
        }
        $scope.datagenerate = function () {
            var posts = [$scope.gridOptions1.data.length];
            for (i = 0; i < $scope.gridOptions2.data.length; i++) {
                var postdata = {};
                postdata["HsId"] = null;
                postdata["HsdId"] = null;
                postdata["UserCode"] = $scope.gridOptions2.data[i].UserCode;
                postdata["RoleCode"] = $scope.gridOptions2.data[i].RoleCode;
                if ($scope.gridOptions2.data[i].Isspecial == true) { postdata["AddType"] = "SP" }
                if ($scope.gridOptions2.data[i].Isspecial == false) { postdata["AddType"] = "RE" }
                postdata["IsActive"] = "Y";
                posts[i] = postdata;
            }
            $scope.abc = angular.toJson(posts);
        }
        $scope.savePostData = function (valid) {
            if (valid == true) {
                if ($scope.gridOptions2.data.length != 0) {
                    $scope.datagenerate();
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PostHierarchyInfo',
                        data: {
                            Data: $scope.abc,
                            HsDesc: $scope.HsDesc,
                            HsFor: $scope.rolefor,
                            HsType: "NE",
                            PUserCode: $sessionStorage.ucode,
                            WDate: $scope.date
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            $state.go('app.dashboard.hierarchy_grid');
                            $scope.clear();
                            $scope.submit = 'Submit';

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                else {
                    SmartAlert.Errmsg("Please Add Employee!");
                }

            }
        };
        $scope.clear = function () { $scope.gridOptions1.data.length = 0; }
        $scope.clear1 = function () {
            $sessionStorage.mflag = 'HI';
            $sessionStorage.for = null;
        }
    }
});
//DISTRIBUTOR=>HIERARCHY=>UPDATE HIERARCHY
appdash.controller('UpdateHierarchyController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, userService, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
   if (flagvalue == 'H') {
        $scope.ioclappli = true;
        $scope.hpappli = false;
        $scope.newname = 'GoTech'
    }

    var valueof = userService.Success('CP');

    if (valueof == 'N') {
    }
    else {
        $scope.date = $filter('date')(new Date(), 'dd-MMM-yyyy');
        // document.getElementById('date').onkeydown = function () { if (event.keyCode == 8) event.preventDefault(); return false; }

        $scope.gethierarchy = function (flag) {
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetHierarchyInfo',
                params: { HsFor: flag, IsActive: 'Y' }
            }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.getHierarchyinfo = response.data.Data.Table;
                }
                else { SmartAlert.Errmsg(response.data.Message); }
            })
        }
        //  $scope.gethierarchy();


        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'User Account Pushpam',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                  { columnid: 'CUserCode', title: 'User Code' },
                  { columnid: 'RoleCode', title: 'Role Code' },
                  { columnid: 'FirstName', title: 'First Name' },
                  { columnid: 'LastName', title: 'Last Name' },
                  { columnid: 'BirthDate', title: 'Birthdate' },
                  { columnid: 'MobileNo', title: 'Mobile No' },
                  { columnid: 'EmailAddress', title: 'Email Id' },


                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }

        $scope.selecHierarchyrData = function (flag, Id) {
            if (flag == "OL")
            { $scope.getHierarchyrData(flag, Id); }

            else if (flag == "NE" && $scope.OldHsId != Id) {
                if ($scope.OldHsId != null) {
                    $scope.getHierarchyrData(flag, Id);
                }
                else { SmartAlert.Errmsg("Please select old hierarchy"); }
            }
            else {
                SmartAlert.Errmsg("You can not select same hierarchy");
                $scope.gridOptions2.data.length = 0;
            }
        }

        $scope.getHierarchyrData = function (flag, Id) {
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetHierarchyInfo',
                params:
                    { HsId: Id, IsActive: 'Y' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    if (flag == "NE") { $scope.gridOptions2.data = response.data.Data.Table1; }
                    else if (flag == "OL") { $scope.gridOptions1.data = response.data.Data.Table1; }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message); if (flag == "NE") { $scope.gridOptions1.data.length = 0; }
                    else if (flag == "OL") { $scope.gridOptions2.data.length = 0; }
                }
            })

        }

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        $scope.grid1column = function () {
            $scope.gridOptions1 = {
                enableFiltering: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                paginationPageSizes: [25, 50, 100, 500, 1000],
                paginationPageSize: 25,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                columnDefs:
                [
                { name: 'UserCode', displayName: 'User Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                 { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, visible: false, enableFiltering: false },
                //     { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                //{ name: 'Updateddt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
               { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                ],
                enableGridMenu: false,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterMenuExcel: false,
                exporterMenuCsv: false,
                gridMenuCustomItems: [{
                    title: 'Export all data as excel',
                    action: function ($event) {
                        alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                    },
                    order: 110
                }]
            };
            $scope.toggleFiltering = function () {
                $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            };
            $scope.gridOptions1.multiSelect = false;
            $scope.gridOptions1.enableRowSelection = true;
        }
        $scope.grid2column = function () {
            $scope.gridOptions2 = {
                enableFiltering: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                paginationPageSizes: [25, 50, 100, 500, 1000],
                paginationPageSize: 25,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                columnDefs:
                [
                { name: 'UserCode', displayName: 'User Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                   { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableFiltering: false },
                { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, visible: false, enableFiltering: false },
                //     { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                //{ name: 'Updateddt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                ],
                enableGridMenu: false,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterMenuExcel: false,
                exporterMenuCsv: false,
                gridMenuCustomItems: [{
                    title: 'Export all data as excel',
                    action: function ($event) {
                        alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                    },
                    order: 110
                }]
            };
            $scope.toggleFiltering = function () {
                $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            };
            $scope.gridOptions2.multiSelect = false;
            $scope.gridOptions2.enableRowSelection = true;
        }

        $scope.grid1column();
        $scope.grid2column();



        $scope.updateHierachy = function (valid) {
            if (valid == true) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.uphie = {};
                $scope.uphie.HsId = $scope.HsId;
                $scope.uphie.OldHsId = $scope.OldHsId;
                $scope.uphie.PUserCode = $sessionStorage.ucode;
                $scope.uphie.WDate = $scope.date;

                var json = angular.toJson($scope.uphie);
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: "POST",
                    url: uriadmin + 'setting/UpdateHierarchyInfo',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {

                    $scope.divshow = true;
                    $scope.divhide = false;
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.clear();
                        $scope.gethierarchy($scope.rolefor);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag = null;

                });

            }
        }


        $scope.clear = function () {
            $scope.HsId = '';
            $scope.OldHsId = '';
            $scope.date = '';
            $scope.gridOptions1.data.length = 0;
            $scope.gridOptions2.data.length = 0;
            $scope.date = $filter('date')(new Date(), 'dd-MMM-yyyy');
        }
    }
});
//DISTRIBUTOR=>HIERARCHY=>UPDATE EMPLOYEE TO HIERARCHY
appdash.controller('UpdateEmployeeHierarchyController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, userService, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var valueof = userService.Success('CQ');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        var flagvalue = flag;
        $scope.submit = 'Submit';
        $scope.divshow = true;
        $scope.divhide = true;
        if (flagvalue == 'I' || flagvalue == 'E') {
            $scope.hpappli = true;
            $scope.ioclappli = false;
            if (flagvalue == 'E')
                $scope.newname = 'EzeTap'
            else
                $scope.newname = 'Pushpam'
        }
        else if (flagvalue == 'H') {
            $scope.newname = 'Pushpam'
            $scope.ioclappli = true;
            $scope.hpappli = false;
        }

        $scope.date = $filter('date')(new Date(), 'dd-MMM-yyyy');

        $scope.GetEmp = function (code, flag) {
            if (flag == 'PG') {
                var uriall = 'setting/GetPushpamUsers?PUserCode&EmailAddress&IsActive=Y&RoleCode=' + code;
                $sessionStorage.code = $sessionStorage.PUserCode;
            }
            else {
                var uriall = 'setting/GetCompanyUsers?CUserCode&EmailAddress&IsActive=Y&RoleCode=' + code;
                $sessionStorage.code = $sessionStorage.CUserCode;
            }
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + uriall
            }).then(function (response) {
                if (response.data.Data != 0) {
                    $scope.gridOptions1.data = response.data.Data;

                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.getbindRole = function (flag) {

            $scope.delcol = "delete";
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uri + 'Role/GetRoleInfo',
                params:
                    { RoleCode: null, RoleDesc: null, RoleFor: flag, IsActive: 'Y' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.getRoleVal = response.data.Data;
                }
                else { SmartAlert.Errmsg(response.data.Message); $scope.getRoleVal = []; }

            })
        }

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'User Account Pushpam',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                  { columnid: 'FullName', title: 'Full Name' },
                  { columnid: 'PUserCode', title: 'PUser Code' },
                  { columnid: 'RoleCode', title: 'Role Code' },
                  { columnid: 'EmailAddress', title: 'Email Address' },
                  { columnid: 'MobileNo', title: 'Mobile No' },
                     { columnid: 'Updatedby', title: 'Last Updated By' },
                { columnid: 'UpdateDt', title: 'Last Updated Date' }

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } }
                },

            };
            $scope.mystyle = [];
        }


        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        $sessionStorage.rowData = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            columnDefs:
            [

            { name: 'FullName', displayName: 'Full Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
            { name: 'PUserCode', displayName: 'User Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
            { name: 'EmailAddress', displayName: 'Email Address', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
            { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                       { name: 'Updatedby', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
                { name: 'UpdateDt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $sessionStorage.rowData.push({ UserCode: row.entity.UserCode, RoleCode: row.entity.RoleCode });
                        $sessionStorage.Eselect = $sessionStorage.rowData.length;
                    }
                    else {
                        $scope.index = $sessionStorage.rowData.indexOf(row.entity);
                        $sessionStorage.rowData.splice($scope.index, 1);
                    }

                });
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Hierarchy Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = true;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.getSelectedRows = function () {
            $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
        }

        //function for manage next and single  tab/page
        $scope.next = function (flag) {
            $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
            if ($scope.mySelectedRows.length >= 2) {
                $sessionStorage.fflag = flag;
                $state.go('app.dashboard.assign_and_view_hierarchy')
            } else if ($scope.mySelectedRows.length == 1) {
                $state.go('app.dashboard.add_remove_hierarchy')
                $sessionStorage.fflag = flag;
                $scope.rowusercode = $sessionStorage.rowData[0];
                $sessionStorage.coduser = $scope.rowusercode.UserCode;
                $sessionStorage.rolecodeuser = $scope.rowusercode.RoleCode;
            }
            else {
                SmartAlert.Errmsg("To proceed please select employee");
            }

        }


        $scope.getauth = function () {
            $http({
                method: "POST",
                url: uriadmin + 'Setting/UpdateEmpHierarchy',
                data: $scope.ciphertext
            }).then(function (response) {
                if (response.data.StatusCode == '1') {
                    SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = true;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = true;
                    $scope.clear();
                }
            })
        };

    }

});
appdash.controller('ManageFRHierarachyController', function ($http, $scope,SweetAlert, $filter, $timeout, uriadmin, $state, userService, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    ($scope.GetEmp = function () {
        $http({
            method: 'GET',
            url: uriadmin + 'setting/GetCompanyUsers?CUserCode&EmailAddress&IsActive=Y&RoleCode=GOFR'
        }).then(function (response) {
            if (response.data.Data != 0) {
                $scope.FRdata = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    })();
    $scope.divshow = true;
   
    $scope.getAgencyFRDetails = function () {
        $scope.divshow = false;
        $scope.DistCode = $scope.DistCode == undefined ? '' : $scope.DistCode;
        $scope.CUserCode = $scope.CUserCode == undefined ? '' : $scope.CUserCode;
        $http.get(uriadmin + 'Distributor/GetDistFRLookUp?DistCode=' + $scope.DistCode + '&FRUserCode=' + $scope.CUserCode).then(function (response) {
            $scope.divshow = true;
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.Success(response.data.Message);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
                $scope.gridOptions1.data = [];
            }
        });
    }
   // $scope.getAgencyAddressDetails();

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.formatters = {};
    $scope.gridOptions1 = {
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        paginationPageSizes: [25, 50, 100, 500, 1000],
        paginationPageSize: 25,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        columnDefs:
        [
             {
                 name: 'Remove', displayName: '', headerCellTemplate: '<div></div>',
                 cellTemplate: '<button class="btn-danger btn-xs" style="margin:2px;"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>',
                 width: "40", enableFiltering: false, enableHiding: false
             },
        { name: 'DistCode', displayName: 'Distributor Code', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'CUserCode', displayName: 'User Code', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,visible:false },
        { name: 'UserName', displayName: 'FR Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Address1', displayName: 'Address Line 1', width: "250",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Address2', displayName: 'Address Line 2', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Address3', displayName: 'Address Line 3', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuExcel: true,
        exporterMenuCsv: false,
        enableSelectAll: true,
        exporterSuppressColumns: ['Edit'],
        exporterExcelFilename: 'Field Representative.xlsx',
        exporterExcelSheetName: 'Sheet1',
        exporterExcelCustomFormatters: function (grid, workbook, docDefinition) {
            var stylesheet = workbook.getStyleSheet();
            var stdStyle = stylesheet.createFontStyle({
                size: 9, fontName: 'Calibri'
            });
            var boldStyle = stylesheet.createFontStyle({
                size: 9, fontName: 'Calibri', bold: true
            });
            var aFormatDefn = {
                "font": boldStyle.id,
                "alignment": { "wrapText": true }
            };
            var formatter = stylesheet.createFormat(aFormatDefn);
            $scope.formatters['bold'] = formatter;
            var dateFormatter = stylesheet.createSimpleFormatter('date');
            $scope.formatters['date'] = dateFormatter;

            aFormatDefn = {
                "font": stdStyle.id,
                "fill": { "type": "pattern", "patternType": "solid", "fgColor": "FFFFC7CE" },
                "alignment": { "wrapText": true }
            };
            var singleDefn = {
                font: stdStyle.id,
                format: '#,##0.0'
            };
            formatter = stylesheet.createFormat(aFormatDefn);
            $scope.formatters['red'] = formatter;

            Object.assign(docDefinition.styles, $scope.formatters);

            return docDefinition;
        },
        exporterExcelHeader: function (grid, workbook, sheet, docDefinition) {
            var stylesheet = workbook.getStyleSheet();
            var aFormatDefn = {
                "font": { "size": 15, "fontName": "Calibri", "bold": true },
                "alignment": { "wrapText": true }
            };
            var formatterId = stylesheet.createFormat(aFormatDefn);
            sheet.mergeCells('A1', 'E1');
            var cols = [];
            // cols.push({ value: '' });
            cols.push({ value: 'Field Representative', metadata: { style: formatterId.id } });
            sheet.data.push(cols);
        },
        exporterFieldFormatCallback: function (grid, row, gridCol, cellValue) {
            var formatterId = null;
            if (gridCol.field === 'name' && cellValue && cellValue.startsWith('W')) {
                formatterId = $scope.formatters['red'].id;
            }

            if (gridCol.field === 'updatedDate') {
                formatterId = $scope.formatters['date'].id;
            }

            if (formatterId) {
                return { metadata: { style: formatterId } };
            } else {
                return null;
            }
        },
        exporterColumnScaleFactor: 4.5,
        exporterFieldApplyFilters: true
    };

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = true;

   
    $scope.agencyUpdateFR = function (valid,isact) {
        if (valid) {
            $http({
                method: "POST",
                url: uriadmin + 'Distributor/IUDDistFRLookUp',
                data: {
                    DistCode: $scope.FRDistCode,
                    FRUserCode: $scope.FRUserCode,
                    IsActive: isact,
                    UserCode: $sessionStorage.PUserCode

                }
            }).then(function (response) {
                if (response.data.StatusCode == '1') {
                    SmartAlert.Success(response.data.Message);
                    $scope.getAgencyFRDetails();
                    $scope.FRDistCode = null;
                    $scope.FRUserCode = undefined;
                    $('#frModal').modal('hide');

                }
                else {
                   
                    SmartAlert.Errmsg(response.data.Message);

                }


            });
        }
    }
    $scope.select = function (Data) {
        SweetAlert.swal
                          ({
                              title: 'Are you sure want to remove FR',
                              text: Data.UserName,
                              type: "info",
                              showCancelButton: true,
                              confirmButtonColor: "#2877b6",
                              confirmButtonText: "Confirm",
                              closeOnConfirm: true,
                              closeOnCancel: true
                          },
                      function (isConfirm) {
                          if (isConfirm) {
                              if (Data != null) {
                                  $scope.FRDistCode = Data.DistCode;
                                  $scope.FRUserCode = Data.CUserCode;
                                  $scope.agencyUpdateFR(true,'N');
                                  // $('#frModal').modal('show')
                              }
                          }
                      });


       
    }

    
});
appdash.controller('AssignViewHierarchyController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, userService, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {

    $scope.GetHierarchy = function () {
        $http.get(uriadmin + 'setting/GetHierarchyInfo?HsId&HsType&HsFor=' + $sessionStorage.fflag + '&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data.Table;
                // SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.gridOptions1.data.length = 0;
                SmartAlert.Errmsg(response.data.Message);
            }



        })
    }
    $scope.GetHierarchy();

    $scope.Stylefun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'User Account Pushpam',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [


              { columnid: 'HsDesc', title: 'Hs Desc' },
              { columnid: 'HsId', title: 'Hs Id' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
            },

        };
        $scope.mystyle = [];
    }


    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];

    $sessionStorage.rowData1 = [];
    $scope.gridOptions1 = {
        enableFiltering: true,
        paginationPageSizes: [25, 50, 100, 500, 1000],
        paginationPageSize: 25,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        columnDefs:
        [
        { name: 'HsId', displayName: 'ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },
        { name: 'HsDesc', displayName: 'Hierarchy', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableFiltering: false },

        ],
        enableGridMenu: false,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuExcel: false,
        exporterMenuCsv: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $sessionStorage.rowData1.push({ HsId: row.entity.HsId });
                    $sessionStorage.Hselect = $sessionStorage.rowData1.length;
                }
                else {
                    $scope.index = $sessionStorage.rowData1.indexOf(row.entity);
                    $sessionStorage.rowData1.splice($scope.index, 1);
                }

            });
        },
        gridMenuCustomItems: [{
            title: 'Export all data as excel',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Assign View Hierarchy Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            },
            order: 110
        }]
    };
    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

    $scope.getSelectedRows = function () {
        $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
    }

    //post selected data
    $scope.getauth = function () {
        var postdata = [];
        if ($sessionStorage.rowData1.length == 0) {
            SmartAlert.Errmsg("To process please select hierarchy");
        }
        else {
            for (i = 0; i < $sessionStorage.rowData1.length; i++) {
                if ($sessionStorage.rowData1.length != i) {
                    for (j = 0; j < $sessionStorage.rowData1.length; j++) {
                        postdata.push({ UserCode: $sessionStorage.rowData[i].UserCode, RoleCode: $sessionStorage.rowData[i].RoleCode, Hsdid: "", HsId: $sessionStorage.rowData1[j].HsId });
                    }
                }
                else {
                    postdata.push({ UserCode: $sessionStorage.rowData[i].UserCode, RoleCode: $sessionStorage.rowData[i].RoleCode, Hsdid: "", HsId: $sessionStorage.rowData1[j - 1].HsId });
                }
            }


            $http({
                method: "POST",
                url: uriadmin + 'Setting/UpdateEmpHierarchy',
                data: {
                    data: postdata,
                    Hsdid: "",
                    HsFor: "",
                    IsActive: 'Y',
                    AddType: "RE",
                    PUserCode: $sessionStorage.code,
                    Flag: "IN"
                }
            }).then(function (response) {
                if (response.data.StatusCode == '1') {
                    SmartAlert.Success(response.data.Message);

                    // $scope.divshow = true;
                    //$scope.divhide = true;
                    var count, countB;
                    count = response.data.Data.split(":");
                    var countA = count[1].split(" ")[0];
                    $scope.countaa = countA;
                    countB = response.data.Data.split(":").reverse()[0];
                    $scope.countbb = countB;
                    $sessionStorage.countA = countA;
                    $sessionStorage.countB = countB;
                    $state.go('app.dashboard.hierarchy_result');
                }
                else {
                    var count, countB;
                    count = response.data.Data.split(":");
                    var countA = count[1].split(" ")[0];
                    $scope.countaa = countA;
                    countB = response.data.Data.split(":").reverse()[0];
                    $scope.countbb = countB;
                    $sessionStorage.countA = countA;
                    $sessionStorage.countB = countB;
                    SmartAlert.Errmsg(response.data.Message);
                    $state.go('app.dashboard.hierarchy_result');
                    $scope.divshow = true;
                    $scope.divhide = true;
                }


            })
        };
    }

})
appdash.controller('SingleAddRemovecontroller', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {

    $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
    if ($sessionStorage.PUserCode != null) {
        $sessionStorage.code = $sessionStorage.PUserCode;
    }
    else {
        $sessionStorage.code = $sessionStorage.CUserCode;
    }
    $scope.getHierarchyData = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetHierarchyUserwise?HsId=&UserCode=' + $sessionStorage.coduser + '&RoleCode=&HsFor=' + $sessionStorage.fflag + '&IsActive=Y&Flag=PR',
            params: { HsId: $sessionStorage.HsId, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions2.data = response.data.Data;
                //  $scope.grid2column();
            }
            else { SmartAlert.Errmsg(response.data.Message); $scope.gridOptions2.data.length = 0 }
        })
    }
    $scope.getHierarchyData();


    $scope.Stylefun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'User Account Pushpam',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [


              { columnid: 'CUserCode', title: 'User Code' },
              { columnid: 'RoleCode', title: 'Role Code' },
              { columnid: 'FirstName', title: 'First Name' },
              { columnid: 'LastName', title: 'Last Name' },
              { columnid: 'BirthDate', title: 'Birthdate' },
              { columnid: 'MobileNo', title: 'Mobile No' },
              { columnid: 'EmailAddress', title: 'Email Id' },


            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } },
                6: { cell: { style: 'color:black' } },
            },

        };
        $scope.mystyle = [];
    }



    //$scope.getUser = function (code) {
    //    var role = $scope.rolefor;
    //    if (role == "PG") { $scope.getUserData(code, "setting/GetPushpamUsers?PUserCode") }
    //    else if (role == "CO") { $scope.getUserData(code, "setting/GetCompanyUsers?CUserCode&EmailAddress") }
    //}


    $scope.getUserData = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetHierarchyUserwise?HsId=&UserCode=' + $sessionStorage.coduser + '&RoleCode=&HsFor=' + $sessionStorage.fflag + '&IsActive=&Flag=NP',

        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.gridOptions1.data = response.data.Data;
            }
            else { SmartAlert.Errmsg(response.data.Message); $scope.gridOptions1.data.length = 0 }
        })

    }
    $scope.getUserData();

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];
    $sessionStorage.RemoverowData = [];
    $sessionStorage.AddrowData = [];
    $scope.grid1column = function () {
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;

            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            columnDefs:
            [

            { name: 'HsId', displayName: 'ID', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'HsDesc', displayName: 'Hierarchy', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                //gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                //    if (row.isSelected) {
                //        var pushdata = [];
                //        pushdata.push({ UserCode: $sessionStorage.coduser, RoleCode: $sessionStorage.rolecodeuser, Hsdid: "", HsId: row.entity.HsId });
                //        $sessionStorage.rowpendingData = pushdata;
                //        $sessionStorage.Eselectdata = $sessionStorage.rowpendingData.length;
                //    }
                //    else {
                //        $scope.index = $sessionStorage.rowpendingData.indexOf(row.entity);
                //        $sessionStorage.rowpendingData.splice($scope.index, 1);
                //    }

                //});

                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $sessionStorage.AddrowData.push({ UserCode: $sessionStorage.coduser, RoleCode: $sessionStorage.rolecodeuser, Hsdid: "", HsId: row.entity.HsId });
                        $sessionStorage.Eselectdata = $sessionStorage.AddrowData.length;
                    }
                    else {
                        $scope.index = $sessionStorage.AddrowData.indexOf(row.entity);
                        $sessionStorage.AddrowData.splice($scope.index, 1);
                    }

                });
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Hierarchy Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = true;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.getSelectedRows = function () {
            $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
        }
    }
    $scope.grid2column = function () {
        $scope.gridOptions2 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            columnDefs:
            [

            { name: 'HsdId', displayName: 'HsdId', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'HsId', displayName: 'ID', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'HsDesc', displayName: 'Hierarchy', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                //gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                //    if (row.isSelected) {
                //        var pushvbariable=[];
                //        pushvbariable.push({HsId: row.entity.HsId,HsdId: row.entity.HsdId,AddType:'', UserCode: $sessionStorage.coduser, RoleCode: $sessionStorage.rolecodeuser,IsActive:'' });
                //        $sessionStorage.rowpushData=pushvbariable;
                //        $sessionStorage.Eselect = $sessionStorage.rowpushData.length;
                //    }
                //    else {
                //        $scope.index = $sessionStorage.rowpushData.indexOf(row.entity);
                //        $sessionStorage.rowpushData.splice($scope.index, 1);
                //    }

                //});


                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $sessionStorage.RemoverowData.push({ HsId: row.entity.HsId, HsdId: row.entity.HsdId, AddType: '', UserCode: $sessionStorage.coduser, RoleCode: $sessionStorage.rolecodeuser, IsActive: '' });
                        $sessionStorage.Eselect = $sessionStorage.RemoverowData.length;
                    }
                    else {
                        $scope.index = $sessionStorage.RemoverowData.indexOf(row.entity);
                        $sessionStorage.RemoverowData.splice($scope.index, 1);
                    }

                });

            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Hierarchy Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions2.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions2.multiSelect = true;
        $scope.gridOptions2.enableRowSelection = true;

        $scope.getSelectedRows = function () {
            $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
        }
    }
    $scope.grid1column();
    $scope.grid2column();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.addrowhierarchy = function () {
        var postdata = [];
        if ($sessionStorage.AddrowData.length == 0) {
            SmartAlert.Errmsg("To process please select hierarchy");
        }
        else {
            for (i = 0; i < $sessionStorage.AddrowData.length; i++) {
                postdata.push({ UserCode: $sessionStorage.AddrowData[i].UserCode, RoleCode: $sessionStorage.AddrowData[i].RoleCode, Hsdid: "", HsId: $sessionStorage.AddrowData[i].HsId });
            }

            $http({
                method: "POST",
                url: uriadmin + 'Setting/UpdateEmpHierarchy',
                data: {
                    data: postdata,
                    Hsdid: "",
                    HsFor: "",
                    IsActive: 'Y',
                    AddType: "RE",
                    PUserCode: $sessionStorage.code,
                    Flag: "IN"
                }
            }).then(function (response) {
                if (response.data.StatusCode == '1') {
                    SmartAlert.Success(response.data.Message);
                    $scope.getHierarchyData();
                    $scope.getUserData();
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        };
    }
    $scope.removerowhierarchy = function () {
        var postdata = [];
        if ($sessionStorage.RemoverowData.length == 0) {
            SmartAlert.Errmsg("To process please select hierarchy to remove");
        }
        else {
            for (i = 0; i < $sessionStorage.RemoverowData.length; i++) {

                postdata.push({ HsId: $sessionStorage.RemoverowData[i].HsId, HsdId: $sessionStorage.RemoverowData[i].HsdId, AddType: '', UserCode: $sessionStorage.RemoverowData[i].UserCode, RoleCode: $sessionStorage.RemoverowData[i].RoleCode, IsActive: '' });
            }

            $http({
                method: "POST",
                url: uriadmin + 'Setting/RemoveHierarchyInfo',
                data: {
                    Data: postdata,
                    HsId: '10002',
                    HsFor: "",
                    HsDesc: "",
                    HsType: "",
                    PUserCode: $sessionStorage.code,
                    WDate: $scope.date1,
                    Flag: "RM"

                }
            }).then(function (response) {
                if (response.data.StatusCode == '1') {
                    SmartAlert.Success(response.data.Message);
                    $scope.getHierarchyData();
                    // $scope.getUserData();
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);

                }


            })
        }

    }


});
appdash.controller('HirarchyResultcontroller', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.countaa = $sessionStorage.countA;
    $scope.countbb = $sessionStorage.countB;
    $scope.Ecount = $sessionStorage.Eselect;
    $scope.Hcount = $sessionStorage.Hselect
});
app.directive("hierarchydatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                yearRange: "2017:2099",
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-M-yy",
                minDate: new Date(),
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }

    }
});
appdash.controller('RolestatusGridController', function ($http, $scope, $filter, $timeout, userService, $state, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FH');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'News Management',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'RoleCode', title: 'RoleCode' },
                  { columnid: 'RoleStatus', title: 'Role Status' },
                  { columnid: 'RoleDesc', title: 'Role Description' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },

                },

            };
            $scope.mystyle = [];
        }


        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'RoleID', displayName: 'Role Id ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleStatus', displayName: 'Role Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleDesc', displayName: 'Role Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.RoleID)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("News_management.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (RoleID) {
            $sessionStorage.RoleID = RoleID;
            $sessionStorage.mflag = 'RS';
            $state.go('app.dashboard.role_status');

        }
        $scope.clear1 = function () {
            $sessionStorage.RoleID = null;
            $sessionStorage.mflag = 'RS';
            $state.go('app.dashboard.role_status');
        }
        $scope.getRoleStatus = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetRoleEnable',
                params:
                    { RoleID: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'RS')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'RS')
            $scope.getRoleStatus();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('RolestatusController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.GetRoleInfo = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                {
                    RoleCode: null, RoleDesc: null, RoleFor: null, IsActive: 'Y'
                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getallrole = response.data.Data;
                var a = { "RoleDesc": $scope.getallrole };
                var b = $filter('filter')(a.RoleDesc, { RoleDesc: "System" })[0];
                $scope.getallrole.splice($scope.getallrole.indexOf(b), 1);
            }
            else {

                SmartAlert.Errmsg(response.data.Message);
            }

        })
    }
    $scope.GetRoleInfo();

    $scope.getRoleStatusIdWise = function () {

        if ($sessionStorage.RoleID != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetRoleEnable',
                params:
                    { RoleID: $sessionStorage.RoleID, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allrole = response.data.Data;
                    $scope.role = $scope.allrole[0];
                    // document.getElementById('sel1').disabled = true;

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getRoleStatusIdWise();
    $scope.saveRolesDetails = function (valid, role) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("RoleID" in role) {
                $scope.role.Flag = 'UP';
                $scope.role.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.role)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else {
                $scope.role = role;
                $scope.role.RoleID = 0;
                $scope.role.IsActive = 'Y';
                $scope.role.Flag = 'IN';
                $scope.role.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.role)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Setting/ManageRoleEnable',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;
                document.getElementById('sel1').disabled = false;
                $scope.submit = 'Submit';
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.rolestatus_grid');
                    window.clearInterval(h);
                }, 3000);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }

    $scope.clear = function () {

        $scope.news.NewsHead = '';
        $scope.news.IsActive = '';
        $scope.news.MarkBold = '';
        $scope.news.Priority = '';
        $scope.news.Location = '';
        $scope.news.Application = '';
    }

});
appdash.controller('MainMenuGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('FF');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Main Menu Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'MainMenu', title: 'Main Menu Name' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } }

                },

            };
            $scope.mystyle = [];
        }

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'MainMenuID', displayName: 'Main Menu ID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'MainMenu', displayName: 'Main Menu', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.MainMenuID)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Main Menu Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (MainMenuID) {
            $sessionStorage.MainMenuID = MainMenuID;
            $sessionStorage.mflag = 'MM';
            $state.go('app.dashboard.main_menu');

        }
        $scope.clear1 = function () {
            $sessionStorage.MainMenuID = null;
            $sessionStorage.mflag = 'MM';
            $state.go('app.dashboard.main_menu');
        }
        $scope.getMainMenu = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetMainMenu',
                params:
                    { MainMenuID: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'MM')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'MM')
            $scope.getMainMenu();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('MainMenuController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;

    $scope.menu = { IsActive: 'Y' };
    $scope.getMainMenuIdWise = function () {

        if ($sessionStorage.MainMenuID != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetMainMenu',
                params:
                    { MainMenuID: $sessionStorage.MainMenuID, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allmenu = response.data.Data;
                    $scope.menu = $scope.allmenu[0];

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getMainMenuIdWise();
    $scope.saveMenuDetails = function (valid, menu) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("MainMenuID" in menu) {
                $scope.menu.Flag = 'UP';
                $scope.menu.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.menu)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else {
                $scope.menu = menu;
                $scope.menu.MainMenuID = 0;
                $scope.menu.IsActive = 'Y';
                $scope.menu.Flag = 'IN';
                $scope.menu.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.menu)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Setting/ManageMainMenu',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;
                $scope.submit = 'Submit';
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.mainmenu_grid');
                    window.clearInterval(h);
                }, 2000);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }

    $scope.clear = function () {

        $scope.news.NewsHead = '';
        $scope.news.IsActive = '';
        $scope.news.MarkBold = '';
        $scope.news.Priority = '';
        $scope.news.Location = '';
        $scope.news.Application = '';
    }

});
appdash.controller('FormsGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('FG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Form Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'MainMenu', title: 'Main Menu Name' },
                  { columnid: 'FormNumber', title: 'Form Number' },
                  { columnid: 'FormName', title: 'FormName' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } }

                },

            };
            $scope.mystyle = [];
        }

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
                { name: 'FId', displayName: 'Form ID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'MainMenuID', displayName: 'Main Menu ID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'MainMenu', displayName: 'Main Menu  ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FormNumber', displayName: 'Form Number', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FormName', displayName: 'Form Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.FId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Form Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (FId) {
            $sessionStorage.FId = FId;
            $sessionStorage.mflag = 'SM';
            $state.go('app.dashboard.forms');

        }
        $scope.clear1 = function () {

            $sessionStorage.FId = null;
            $sessionStorage.mflag = 'SM';
            $state.go('app.dashboard.forms');
        }
        $scope.getForms = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetForms',
                params:
                    { FId: null, MainMenuID: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'SM')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'SM')
            $scope.getForms();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('FormsController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.forms = { IsActive: 'Y' };
    $scope.getMainMenu = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetMainMenu',
            params:
                { MainMenuID: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.allmenu = response.data.Data;
            }

            else {  // vm.alert(response.data.Message);

                SmartAlert.Errmsg(response.data.Message);
            }

        })
    }
    $scope.getMainMenu();
    $scope.getFormsIdWise = function () {

        if ($sessionStorage.FId != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetForms',
                params:
                    { FId: $sessionStorage.FId, MainMenuID: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.formsdetails = response.data.Data;
                    $scope.forms = $scope.formsdetails[0];

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getFormsIdWise();
    $scope.saveformsDetails = function (valid, forms) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("FId" in forms) {
                $scope.forms.Flag = 'UP';
                $scope.forms.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.forms)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else {
                $scope.forms = forms;
                $scope.forms.FId = 0;
                $scope.forms.IsActive = 'Y';
                $scope.forms.Flag = 'IN';
                $scope.forms.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.forms)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Setting/ManageForms',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;
                $scope.submit = 'Submit';
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.forms_grid');
                    window.clearInterval(h);
                }, 2000);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }


});
appdash.controller('UserAuthGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('FI');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Enabled Form in Bulk Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [

                  { columnid: 'RoleDesc', title: 'Role Description' },
                  { columnid: 'MainMenu', title: 'Main Menu' },
                  { columnid: 'IsEnable', title: 'Is Enable' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
                 { name: 'RoleCode', displayName: ' RoleCode ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'MainMenuID', displayName: 'MainMenuID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

                { name: 'RoleDesc', displayName: 'Role Description ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'MainMenu', displayName: 'MainMenu ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'IsEnable', displayName: 'Is Enable  ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.RoleCode,row.entity.MainMenuID)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (RoleCode, MainMenuID) {
            $sessionStorage.RoleCode = RoleCode;
            $sessionStorage.MainMenuID = MainMenuID;
            $sessionStorage.mflag = 'UA';
            $state.go('app.dashboard.user_auth');

        }
        $scope.clear1 = function () {
            $sessionStorage.RoleCode = null;
            $sessionStorage.MainMenuID = null;
            $state.go('app.dashboard.user_auth');
            $sessionStorage.mflag = 'UA';
        }
        $scope.getForms = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetFormEnable',
                params:
                    { RoleCode: null, MainMenuID: null, IsActive: 'Y' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'UA')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'UA')
            $scope.getForms();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('UserAuthController', function ($http, $scope, $filter, uiGridConstants, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, userService, uri, uriadmin, Name, Password) {

    $sessionStorage.currentstate = $state.current.name;
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divmsg = false;
    $scope.divgrid = true;
    $scope.getRoleStatusIdWise = function (role) {


        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetRoleEnable',
            params:
                { RoleID: null, RoleCode: role, IsActive: '' }
        }).then(function (response) {
            if (role == undefined || role == '') {
                $scope.divmsg = false;
                $scope.divgrid = true;
                $scope.Msg1 = ''
                document.getElementById('sel2').disabled = false;
            } else {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allrole = response.data.Data;
                    $scope.role = $scope.allrole[0];
                    if ($scope.role.RoleCode == '') {
                        $scope.auth.MainMenuID = '';
                        $scope.Msg1 = '';
                    }

                    var msg = $scope.role.RoleStatus;

                    if (msg == '*') {
                        $scope.divmsg = true;
                        $scope.Msg1 = 'All Menus are visible. '
                        $scope.divgrid = false;
                        document.getElementById('sel2').disabled = true;
                        document.getElementById('sel2').value = '';
                    }

                    else if (msg == "Y") {
                        $scope.divmsg = true;
                        $scope.divgrid = true;
                        $scope.Msg1 = 'Only Selected forms will be enabled.'
                        document.getElementById('sel2').disabled = false;
                    }

                    else if (msg == "N") {
                        $scope.divmsg = true;
                        $scope.divgrid = true;
                        $scope.Msg1 = 'Only Selected forms will be disabled.'
                        document.getElementById('sel2').disabled = false;
                    }

                }
                else {
                    SmartAlert.Errmsg('Please update role setup.');
                    $scope.gridOptions1.data.length = 0;
                }
                $scope.submit = 'Update';

            }


        })
        //  $sessionStorage.dCode = null


    }

    $scope.GetRoleInfo = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                {
                    RoleCode: null, RoleDesc: null, RoleFor: null, IsActive: 'Y'
                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getallrole = response.data.Data;
                var a = { "RoleDesc": $scope.getallrole };
                var b = $filter('filter')(a.RoleDesc, { RoleDesc: "System" })[0];
                $scope.getallrole.splice($scope.getallrole.indexOf(b), 1);
            }
            else {

                SmartAlert.Errmsg(response.data.Message);
            }

        })
    }
    $scope.GetRoleInfo();

    $scope.getMainMenu = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetMainMenu',
            params:
                { MainMenuID: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.allmenu = response.data.Data;
            }

            else {  // vm.alert(response.data.Message);

                //SmartAlert.Errmsg(response.data.Message);
            }

        })
    }
    $scope.getMainMenu();



    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];


    $scope.gridOptions1 = {

        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;

        },
        paginationPageSizes: [25, 50, 100, 500, 1000],
        paginationPageSize: 25,
        enableRowSelection: true,
        enableSelectAll: true,
        enableRowHeaderSelection: false,
        columnDefs:
        [
        { name: 'IsFormEnable', displayName: 'Select Form(s)', field: 'Enable', width: "*", type: 'boolean', cellTemplate: '<input type="checkbox" ng-model="row.entity.IsFormEnable">' },
        { name: 'TId', displayName: 'TId ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
        { name: 'FormNumber', displayName: 'Form Number', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'FormName', displayName: 'Form Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
       // { name: 'IsFormEnable', displayName: 'Form Enable', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellTemplate: '<input type="checkbox" ng-model="row.entity.IsFormEnable">'}
        ],
        enableGridMenu: false,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuExcel: false,
        exporterMenuCsv: false,
        //gridMenuCustomItems: [{
        //    title: 'Export all data as xls',
        //    action: function ($event) {
        //        alasql('SELECT * INTO XLS("Main Menu Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
        //    },
        //    order: 110
        //}]
    };
    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };
    //
    $scope.toggleRowSelection = function () {
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;
    $scope.getFormsinBulkSelect = function (id, MainMenuID) {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'Setting/GetFormEnableBulk',
            params:
                { RoleCode: id, MainMenuID: MainMenuID }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                document.getElementById('btnsub').disabled = false;
                $scope.gridOptions1.data = response.data.Data;
                //  SmartAlert.SuccessGrid(response.data.Message);
                $timeout(function () {
                    for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                        if ($scope.gridOptions1.data[i].IsFormEnable == true) {
                            if ($scope.gridApi.selection.selectRow) {
                                $scope.gridApi.selection.selectRow($scope.gridOptions1.data[i]);
                            }
                        }
                    }
                });
            }
            else {

                $scope.gridOptions1.data.length = 0;
                SmartAlert.Errmsg(response.data.Message);
                document.getElementById('btnsub').disabled = true;
            }
            //$scope.Stylefun();
            //$scope.mystyle.push($scope.mystyle1);

        })

    }
    if ($sessionStorage.RoleCode != null && $sessionStorage.MainMenuID != null) {
        $scope.auth = {};
        document.getElementById('ddl1').disabled = true;
        $scope.auth.RoleCode = $sessionStorage.RoleCode;
        $scope.auth.MainMenuID = $sessionStorage.MainMenuID;
        $scope.getRoleStatusIdWise($sessionStorage.RoleCode);
        $scope.getFormsinBulkSelect($sessionStorage.RoleCode, $sessionStorage.MainMenuID);
    }
    else {
        document.getElementById('ddl1').disabled = false;
    }


    $scope.SaveSelectedBulk = function (valid, auth) {
        $scope.auth = auth;

        if (valid == true) {
            var SelectedRow = $scope.gridApi.selection.getSelectedRows();

            var array = [];
            for (j = 0; j < SelectedRow.length; j++) {
                array[j] = SelectedRow[j].FormNumber;
            }
            var post = [$scope.gridOptions1.data.length];
            var postdata = "[";
            var j = 0;
            $sessionStorage.tid = null;
            for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                post[i] = $scope.gridOptions1.data[i];
                if ($scope.gridOptions1.data[i].IsFormEnable == true) {
                    if (((post[i].TId == undefined || post[i].TId == null))) {
                        postdata = postdata + "{FormNumber:'" + post[i].FormNumber + "',TId:null,IsActive:'Y'},"
                    }
                    else {
                        $sessionStorage.tid = post[i].TId;
                        postdata = postdata + "{FormNumber:'" + post[i].FormNumber + "',TId:" + post[i].TId + ",IsActive:'Y'},"
                    }
                }
                else if (post[i].TId != undefined || post[i].TId != null) {
                    $sessionStorage.tid = post[i].TId;
                    postdata = postdata + "{FormNumber:'" + post[i].FormNumber + "',TId:" + post[i].TId + ",IsActive:'N'},"
                }
                j++;
            }
            postdata = postdata + "]";


            $scope.auth.Data = postdata;
            $scope.auth.UserCode = $sessionStorage.ucode;
            if ($sessionStorage.tid != null) {
                $scope.auth.Flag = 'UP';
            }
            else {
                $scope.auth.IsActive = 'Y';
                $scope.auth.Flag = 'IN';
            }
            var json = angular.toJson($scope.auth)
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $scope.getauth();


        }


    }
    $scope.getauth = function () {
        $http({
            method: "POST",
            url: uriadmin + 'Setting/ManageFormEnable',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == '1') {
                SmartAlert.Success(response.data.Message);
                $scope.Msg1 = ''
                $state.go('app.dashboard.userauth_grid');
                $sessionStorage.RoleCode = null;
                $sessionStorage.MainMenuID = null;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

            $scope.divmsg = false;

        })
    };
});

appdash.controller('VersionGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('FJ');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Application Version Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'AppName', title: 'Application Name' },
               { columnid: 'VNo', title: 'Version' },
                { columnid: 'RDate', title: 'Release Date' },

              { columnid: 'Isactive', title: 'Is Active' },

            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } }

            },

        };



        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'VId', displayName: 'VId', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'AppName', displayName: 'App Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'VNo', displayName: 'Version', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RDate', displayName: 'Release Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Isactive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.VId,row.entity.VNo,row.entity.AppId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Application Version Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.select = function (VId, VNo, AppId) {
            $sessionStorage.VId = VId;
            $sessionStorage.VNo = VNo;
            $sessionStorage.AppId = AppId;
            $sessionStorage.mflag = 'VM';
            $state.go('app.dashboard.app_version');

        }
        $scope.clear1 = function () {
            $sessionStorage.VId = null;
            $sessionStorage.VNo = null;
            $sessionStorage.AppId = null;
            $sessionStorage.mflag = 'VM';
            $state.go('app.dashboard.app_version');
        }
        $scope.getVersion = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetVersion',
                params:
                    { VId: null, VNo: null, AppId: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $sessionStorage.grddata = response.data.Data.Table;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'VM')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);

                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'VM')
            $scope.getVersion();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('VersionController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;

    $scope.AllApp = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'master/GettblMApplications?AppId&AppType&IsActive=Y').then(function (response) {
            $scope.allapp = response.data.Data;
        })
    }
    $scope.AllApp();
    $scope.GetVersionIdwise = function () {
        if ($sessionStorage.VNo != null && $sessionStorage.AppId != null) {


            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetVersion',
                params:
                    { VNo: $sessionStorage.VNo, AppId: $sessionStorage.AppId, IsActive: '' }
            }).then(function (response) {

                if (response.data.Data.Table != null || response.data.Data.Table == 0) {
                    $scope.basicall = response.data.Data.Table;
                    $scope.ver = $scope.basicall[0];

                    $scope.submit = 'Update';
                }
                if (response.data.Data.Table1 != null || response.data.Data.Table1 == 0) {
                    $scope.gridOptions1.data = response.data.Data.Table1;
                    $scope.details = $scope.gridOptions1.data;
                    $scope.ver.DType = $scope.details[0].DType;
                    $scope.ver.Description = $scope.details[0].Description;

                    $scope.submit = 'Update';
                }
                document.getElementById('lng').disabled = true;
            })
        }
        else {
            $scope.submit = 'Submit';
        }
    }
    $scope.GetVersionIdwise();
    $sessionStorage.row = null;
    $scope.AddRow = function (valid, ver) {

        if (valid) {
            $scope.dis = true;
            //if (ver.DType == 'FI')
            //{
            //    ver.DType = 'Fix';
            //}
            //else if (ver.DType == 'NE')
            //    ver.DType = 'New';
            //else if (ver.DType == 'OP')
            //{
            //    ver.DType = 'Optimisation';
            //}

            if ($sessionStorage.row == null || $sessionStorage.row == undefined) {
                var sc = {
                    VDetailId: null, VId: null, DType: ver.DType, Description: ver.Description
                }

                $scope.gridOptions1.data.push(sc);




            }
            else {
                alert($sessionStorage.row);
                var sc = {
                    VDetailId: null, VId: null, DType: ver.DType, Description: ver.Description
                }
                var arr = $scope.gridOptions1.data;

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].$$hashKey === $sessionStorage.row) {
                        arr[i] = sc;
                    }
                }

            }

            $sessionStorage.row = null;

        }

    }
    $scope.Stylefun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Sub Product Category',
            },
            column: {
                style: 'font-ssize:15px;color:black'
            },
            columns: [
         { columnid: 'DType', title: 'Description Type' },
         { columnid: 'Description', title: 'Description' },

            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },

            },

        };
        $scope.mystyle = [];
    }
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
    $scope.gridOptions1 = {
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },

        paginationPageSizes: [25, 50, 100, 500, 1000],
        paginationPageSize: 25,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        columnDefs:
        [
        { name: 'VDetailId', displayName: 'Spec Code', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
        { name: 'VId', displayName: 'Specification Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
        { name: 'DType', displayName: 'Description Type', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Description', displayName: 'Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

       {
           name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
           cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.$$hashKey,row.entity.VDetailId,row.entity.VId,row.entity.DType,row.entity.Description)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
           width: "70"
              , enableFiltering: false,
           enableCellEdit: false,
           enableSorting: false,
           showSortMenu: false,
           enableColumnMenu: false,
       },
        {
            name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>',
            cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove"><span class="glyphicon glyphicon-minus"></span></button>',
            width: "70"
      , enableFiltering: false,
            enableCellEdit: false,
            enableSorting: false,
            showSortMenu: false,
            enableColumnMenu: false,
        }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Sub Product Category.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Sub Product Category()", style: 'headerStyle', alignment: 'center', color: 'Black' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
            return docDefinition;
        },
        exporterPdfOrientation: 'Landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 800,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as xls',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Sub Product Category.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            },
            order: 110
        }]
    };

    $scope.select = function (c, vd, v, dt, d) {
        $sessionStorage.row = c;
        $scope.ver.VDetailId = vd;
        $scope.ver.VId = v;
        $scope.ver.DType = dt;

        $scope.ver.Description = d;
        $scope.ia = true;
    }
    $scope.Remove = function (row) {

        var index = $scope.gridOptions1.data.indexOf(row.entity);
        $scope.gridOptions1.data.splice(index, 1);

    }



    $scope.SaveVersion = function (valid, ver) {
        $scope.ver = ver;
        $scope.divshow = true;
        $scope.divhide = false;

        //insert/update
        //var obj = $scope.gridOptions1.data;
        var obj = $scope.gridOptions1.data;
        for (var i = 0; i < obj.length; i++) {
            delete obj[i].$$hashKey;
            delete obj[i].DTypeDesc;
        }
        if (obj.length == 0) {
            SmartAlert.Errmsg('Please add atleast one record in grid');
        }
        else {
            if ($sessionStorage.VNo == null && $sessionStorage.AppId == null) {
                $scope.ver.VId = null;
                $scope.ver.flag = 'IN';
                $scope.ver.IsActive = 'Y';
            }
            else {
                $scope.ver.VId = $sessionStorage.VId;
                $scope.ver.VNo = $sessionStorage.VNo;
                $scope.ver.AppId = $sessionStorage.AppId;
                $scope.ver.flag = 'UP';
            }

            $scope.ver.UserCode = $sessionStorage.ucode;
            delete $scope.ver.AppName;
            delete $scope.ver.DType;
            delete $scope.ver.Description;
            //delete $scope.ver.App


            $http({
                url: uriadmin + 'Setting/ManageVersion',
                method: 'POST',
                data: {
                    "Data": obj,
                    "VId": $scope.ver.VId,
                    "RDate": $scope.ver.RDate,
                    "VNo": $scope.ver.VNo,
                    "AppId": $scope.ver.AppId,
                    "UserCode": $scope.ver.UserCode,
                    "Isactive": $scope.ver.Isactive,
                    "Flag": $scope.ver.flag
                }
            }).then(function (response) {
                $scope.divshow = true;
                $scope.divhide = false;
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $scope.gridOptions1.data = null;

                    var h = setInterval(function () {
                        $state.go('app.dashboard.appversion_grid');
                        window.clearInterval(h);
                    }, 3000);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }


    };


});

appdash.controller('PDC&WeightSettingController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, userService, SmartAlert, uri, urianalysis, uriadmin, Name, Password) {
    var valueof = userService.Success('FK');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $scope.GetSettingInfo = function () {
            $http.get(urianalysis + 'cyldel/GetPDCAndWeightSetting').then(function (response) {
                if (response.data.StatusCode == 1) {

                    $scope.PDCsetting = response.data.Data[0];


                }
            })
        }
        $scope.GetSettingInfo();


        $scope.PostSettingInfo = function (valid) {

            if (valid) {


                var json = angular.toJson($scope.PDCsetting)

                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'POST',
                    url: urianalysis + 'Cyldel/ManageCommonSetting',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    //$scope.divshow = true;
                    //$scope.divhide = false;
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.GetSettingInfo();

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                })
            }


        }
    }
})

//If No need of this code then delete
appdash.controller('UserAccountIoclGridController', function ($http, $scope, $filter, $timeout, $state, userService, $window, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('IE');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        //$scope.LoadOnce = function () {
        //    $sessionStorage.hasReloaded = true;
        //    $window.location.reload();
        //}
        //if (!$sessionStorage.hasReloaded) $scope.LoadOnce();

        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'User Account Pushpam',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'CUserCode', title: 'User Code' },
                  { columnid: 'RoleCode', title: 'Role Code' },
                  { columnid: 'FirstName', title: 'First Name' },
                  { columnid: 'LastName', title: 'Last Name' },
                  { columnid: 'Gender', title: 'Gender' },
                  { columnid: 'BirthDate', title: 'Birth date' },
                  { columnid: 'MobileNo', title: 'Mobile No' },
                  { columnid: 'MobileNoe', title: 'Mobile No(Optional)' },
                  { columnid: 'EmailAddress', title: 'Email Id' },
                  { columnid: 'LangDesc', title: 'Language' },
                  { columnid: 'IsActive', title: 'Is Active' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } },
                    8: { cell: { style: 'color:black' } },
                    9: { cell: { style: 'color:black' } },
                    10: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }


        $sessionStorage.CUserCodeval = null;

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];
        $scope.gridOptions1 = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'CUserCode', displayName: 'User Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Gender', displayName: 'Gender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'BirthDate', displayName: 'Birthdate', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MobileNoe', displayName: 'Mobile No.(optional)', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'LangDesc', displayName: 'Language', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

           { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Update(row.entity.CUserCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Account IOCL.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.Update = function (CUserCode) {
            $sessionStorage.CUserCodeval = CUserCode;
            $sessionStorage.mflag = 'UI';
            $state.go('app.dashboard.user_accounts_iocl');
        }
        $scope.clear1 = function () {
            $sessionStorage.CUserCode = null;
            $sessionStorage.mflag = 'UI';
        }

        $scope.getUserPushpam = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetCompanyUsers',
                params:
                    { CUserCode: null, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                //$sessionStorage.hasReloaded = false;
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'UI')
                        SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        if ($sessionStorage.mflag == 'UI')
            $scope.getUserPushpam();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('UserAccountIoclController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.CheckIsLoginCred = false;
    $scope.checked1 = true;
    $scope.isPasswordShow = true;
    if ($sessionStorage.CUserCode != null) {
    }
    else {
        $scope.checkisactive = true;
    }
    $scope.value = true;
    $scope.inputTypeOne = 'password';
    $scope.inputTypeTwo = 'password';
    $scope.classNameOne = 'glyphicon-eye-close';
    $scope.classNameTwo = 'glyphicon-eye-close';
    document.getElementById('birthdate').onkeypress = function () { return false; }
    $scope.getGender = [{ GenderCode: 'M', GenderType: 'Male' }, { GenderCode: 'F', GenderType: 'Female' }];
    $scope.myFunction = function () { document.getElementById("emailid").style.textTransform = "lowercase"; }

    $scope.HideShowPasswordOne = function () {
        if ($scope.inputTypeOne == 'password') {
            $scope.inputTypeOne = 'text';
            $scope.classNameOne = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeOne = 'password';
            $scope.classNameOne = 'glyphicon-eye-close';
        }
    };
    $scope.HideShowPasswordTwo = function () {
        if ($scope.inputTypeTwo == 'password') {
            $scope.inputTypeTwo = 'text';
            $scope.classNameTwo = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeTwo = 'password';
            $scope.classNameTwo = 'glyphicon-eye-close';
        }
    };


    $scope.IsEmail = function (UserPushpam) {

        $scope.value = false;
        if (UserPushpam == 'Y') {
            $scope.value = true;
            $scope.enableCheck = 'y';
            document.getElementById('enablecheckid').disabled = true;

        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
            $scope.enableCheck = 'n';
            document.getElementById('enablecheckid').disabled = false;

        }
    }
    $scope.IsLoginCred = function (IoclPushpam) {

        $scope.value = false;
        if (IoclPushpam == 'y') {
            $scope.value = true;
        }
        else {
            $scope.value = false;
            $scope.CheckIsLoginCred = false;
        }
    }

    $scope.getPuspamAccountWise = function () {

        if ($sessionStorage.CUserCodeval != null) {
            // document.getElementById('sel1').disabled = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetCompanyUsers',
                params:
                    { CUserCode: $sessionStorage.CUserCodeval, EmailAddress: null, RoleCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allIoclPushpam = response.data.Data;
                    $scope.IoclPushpam = $scope.allIoclPushpam[0];
                    $scope.IoclPushpam.ConfirmUserPwd = $scope.IoclPushpam.UserPwd;
                    // $scope.isPasswordShow = $sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode == "admi" ? true : false;

                    if ($sessionStorage.RoleCode == "ADMI" || $sessionStorage.RoleCode == "admi") {
                        $scope.isPasswordShow = true;
                    }
                    else if ($scope.IoclPushpam.UserCode == $sessionStorage.CUserCode) {
                        $scope.isPasswordShow = true;
                    }
                    else {
                        $scope.isPasswordShow = false;
                    }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.getPuspamAccountWise();
    $scope.getRole = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Role/GetRoleInfo',
            params:
                { RoleCode: null, RoleDesc: null, RoleFor: 'CO', IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getRoleValue = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getRole();
    $scope.getLanguage = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http({
            method: 'GET',
            url: uri + 'Distributor/GetLanguageInfo',
            params:
                { LangCode: null, LangDesc: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getLanguageValue = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    }
    $scope.getLanguage();
    $scope.ConfirmPassword = function (IoclPushpam) {

        if ($scope.value == true) {
            if (IoclPushpam.UserPwd != IoclPushpam.ConfirmUserPwd) {
                $scope.error = true;

                var emailid = document.getElementById('emailid');
                var pass1 = document.getElementById('pass1');
                var pass2 = document.getElementById('pass2');
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if (IoclPushpam.UserPwd == "" && IoclPushpam.ConfirmUserPwd) {
                    $scope.errorMessage = "Please fill out required fields";
                }
                else {
                    $scope.errorMessage = "Password does not match";
                }



            } else {
                $scope.error = false;
                $scope.CheckIsLoginCred = false;
            }
        }
    };
    $scope.CheckOperationalUsersData = function (IoclPushpam, valid) {

        if ($scope.value == true) {
            if (IoclPushpam.EmailAddress != null && IoclPushpam.UserPwd != null && IoclPushpam.EmailAddress != "" && IoclPushpam.UserPwd != "" && IoclPushpam.ConfirmUserPwd != null && IoclPushpam.ConfirmUserPwd != "undefined" && $scope.error != true) {
                $scope.PostOperationalUsersData(IoclPushpam, valid);
            }
            else {
                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (IoclPushpam.UserPwd == '' && IoclPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = "Please fill out required fields";
                }


            }
        } else {
            $scope.CheckIsLoginCred = false;
            $scope.error = false;
            $scope.PostOperationalUsersData(IoclPushpam, valid);
        }
    }
    $scope.PostOperationalUsersData = function (IoclPushpam, valid) {

        if (valid == true) {

            if ($scope.error != true) {
                $scope.IoclPushpam = IoclPushpam;

                //if ($scope.IoclPushpam.AlertSMS == '' || $scope.IoclPushpam.AlertSMS == null) {
                //    $scope.IoclPushpam.AlertSMS = 'N';

                //}
                //if ($scope.IoclPushpam.AlertMail == '' || $scope.IoclPushpam.AlertMail == null) {
                //    $scope.IoclPushpam.AlertMail = 'N';

                //}
                if ($scope.IoclPushpam.EmailAddress == '' || $scope.IoclPushpam.EmailAddress == null) {
                    $scope.IoclPushpam.EmailAddress = null;

                }
                if ($scope.IoclPushpam.UserPwd == '' || $scope.IoclPushpam.UserPwd == null) {
                    $scope.IoclPushpam.UserPwd = null;

                }
                //if ($scope.IoclPushpam.IsSendAllMail == '' || $scope.IoclPushpam.IsSendAllMail == null) {
                //    $scope.IoclPushpam.IsSendAllMail = 'N';
                //}
                //else
                //{
                //    $scope.IoclPushpam.IsSendAllMail = 'Y';
                //}
                $scope.IoclPushpam.PUserCode = $sessionStorage.ucode;
                $scope.IoclPushpam.ImeiNoA = null;
                $scope.IoclPushpam.ImageName = null;
                if ($sessionStorage.CUserCodeval != null) {
                    $scope.IoclPushpam.CUserCode = $sessionStorage.CUserCodeval;
                    var json = angular.toJson($scope.IoclPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PutCompanyUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            //$.bigBox({
                            //    title: response.data.Message,
                            //    //content:response.data.Message,
                            //    color: "#296191",
                            //    icon: "fa fa-thumbs-up animated bounce ",
                            //    timeout: "4000"
                            //})
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_iocl_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $state.go('app.dashboard.user_account_pushpam_grid');
                            //$state.go('app.dashboard.user_account_iocl_grid');

                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }
                else {
                    var json = angular.toJson($scope.IoclPushpam);
                    $scope.source_string = json;
                    var encrypted = CryptoJS.AES.encrypt(
                    $scope.source_string,
                    $rootScope.base64Key,
                    { iv: $rootScope.base64Key }
                    );
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'setting/PostCompanyUserInfo',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.user_account_iocl_grid');
                                window.clearInterval(h);
                            }, 3000);

                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    });

                }

            }
            else {

                $scope.CheckIsLoginCred = true;
                var errormsg = document.getElementById('errormsg');
                errormsg.style.color = "red";
                if ($scope.errorMessage == "Password does not match") {
                    if (IoclPushpam.UserPwd == '' && IoclPushpam.ConfirmUserPwd == '') {
                        $scope.errorMessage = "Please fill out required fields";
                    }
                    else {
                        $scope.errorMessage = "Password does not match";
                    }
                }
                else {
                    $scope.errorMessage = " ";
                    // $scope.errorMessage = "Please fill out required fields";
                }
            }

        }

    }
});



app.directive("hierarchydatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                yearRange: "2017:2099",
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-M-yy",
                minDate: new Date(),
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
})
app.directive("settingdatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                yearRange: "2017:2099",
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-M-yy",
                maxDate: new Date(),
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
})
app.directive("fileinput", [function () {
    return {
        scope: {
            fileinput: "=",
            filepreview: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.fileinput = changeEvent.target.files[0];
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.filepreview = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(scope.fileinput);
            });
        }
    }
}]);
app.directive("birthdatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                yearRange: "1900:year",
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-M-yy",
                maxDate: new Date(),
                //   minDate: 0,
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
})
