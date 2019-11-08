appdash.controller('StateMasterGridController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, userService, uri, Name, Password) {
    var valueof = userService.Success('BA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'State Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'StateCode', title: 'State Code' },
             { columnid: 'StateDesc', title: 'State Name' },
             { columnid: 'StateFlag', title: 'State Flag' },
             { columnid: 'IsActive', title: 'Is Active' },
             { columnid: 'IsHomeState', title: 'Is HomeState' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }
        $scope.GetStateMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'State/GetStateDetails',
                params:
                    {
                        StateCode: null, StateFlag: null, StateDesc: null, IsActive: '', IsHomeState: null

                    }
            }).then(function (response) {

                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);

            })
        }
        $scope.GetStateMaster();
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'StateCode', displayName: 'State Code ', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StateDesc', displayName: 'State Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StateFlag', displayName: 'State Flag', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsHomeState', displayName: 'Is Home State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.StateCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "70"
                  , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("State Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (StateCode) {
            $sessionStorage.SCode = StateCode;
            $sessionStorage.iflag = 'UP';
            $state.go('app.dashboard.state_master');
        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.clear1 = function () {
            $sessionStorage.SCode = null;
            $sessionStorage.iflag = 'IN';
        }

        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;

        };
        $scope.ClearDistSession();
    }
});
appdash.controller('StateMasterController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.SCode != null) {
        document.getElementById('scd').disabled = true;
        document.getElementById('sfg').disabled = true;
        $scope.GetStateIdWise = function () {


            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'State/GetStateDetails',
                params:
                    {
                        StateCode: $sessionStorage.SCode, StateFlag: null, StateDesc: null, IsActive: '', IsHomeState: null
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allstate = response.data.Data;
                    $scope.state = $scope.allstate[0];
                    $scope.state.StateDesc = $scope.state.StateDesc;
                    $scope.state.StateCode = $scope.state.StateCode;
                    $scope.state.StateFlag = $scope.state.StateFlag;
                    $scope.state.IsHomeState = $scope.state.IsHomeState;
                    $scope.state.IsActive = $scope.state.IsActive;

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }


            })
            //  $sessionStorage.dCode = null

        }
        $scope.GetStateIdWise();
        $scope.submit = 'Update';

    }
    else {
        $scope.submit = 'Submit';
        document.getElementById('scd').disabled = false;
        document.getElementById('sfg').disabled = false;

    }
    $scope.SaveStateDetails = function (valid, state) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.iflag == 'UP') {
                $scope.state = state;
                $scope.state.CreatedBy = $sessionStorage.ucode;
                $scope.state.flag = 'UP';
                var json = angular.toJson($scope.state)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/PostState',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {

                            $scope.divshow = true;
                            $scope.divhide = false;

                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.state_master_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $scope.clear();

                            //$state.go('app.dashboard.state_master_grid');

                            $sessionStorage.iflag == null;

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);


                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();

            }
            else if ($sessionStorage.iflag == 'IN') {

                $scope.state = state;
                $scope.state.CreatedBy = $sessionStorage.ucode;
                $scope.state.IsActive = 'Y';
                $scope.state.IsHomeState = 'Y';
                $scope.state.Region = '';
                $scope.state.flag = 'IN';
                var json = angular.toJson($scope.state)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/PostState',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {

                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.SmartCardDisable = true;
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.state_master_grid');
                                window.clearInterval(h);
                            }, 3000);
                            $scope.clear();
                            // $state.go('app.dashboard.state_master_grid');
                            $sessionStorage.iflag == null;

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();

            }
        }
    };

    $scope.clear = function () {
        $scope.state.StateDesc = '';
        $scope.state.StateCode = '';
        $scope.state.StateFlag = '';
        $scope.state.IsHomeState = '';
        $scope.state.IsActive = '';

    }

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();

});

appdash.controller('DistrictMasterGridController', function ($http, $scope, $filter, $window, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, userService, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('BB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'District Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistrictName', title: 'District Name' },
             { columnid: 'StateDesc', title: 'State Name' },
             { columnid: 'IsActive', title: 'Is Active' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        }

        $scope.GetDistrictMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetDistrictDetails',
                params:
                    {
                        StateCode: null, DistrictCode: null, IsActive: ''

                    }
            }).then(function (response) {

                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);

            })
        }
        $scope.GetDistrictMaster();
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
                { name: 'DistrictCode', displayName: 'District Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'DistrictName', displayName: 'District Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'StateCode', displayName: 'State Code ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'StateDesc', displayName: 'State Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

                { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

                {
                    name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                    cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistrictCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                    width: "70"
                      , enableFiltering: false,
                }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("District Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (DistrictCode) {
            $sessionStorage.dCode = DistrictCode;
            $state.go('app.dashboard.district_master');
        }

        $scope.clear1 = function () {
            $sessionStorage.dCode = null;
        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;

        };
        $scope.ClearDistSession();
    }

});
appdash.controller('DistrictMasterController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;


    $scope.GetAllState = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uri + 'State/GetStateDetails',
            params:
                {
                    StateCode: null, StateFlag: null, StateDesc: null, IsActive: 'Y', IsHomeState: null

                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getState1 = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetAllState();
    $scope.GetDistrictIdWise = function () {
        if ($sessionStorage.dCode != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetDistrictDetails',
                params:
                    {
                        StateCode: null, DistrictCode: $sessionStorage.dCode, IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.district = response.data.Data;
                    $scope.dist = $scope.district[0];
                    $scope.dist.DistrictName = $scope.dist.DistrictName;
                    $scope.dist.StateCode = $scope.dist.StateCode;

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.GetDistrictIdWise();
    $scope.SaveDistrictDetails = function (valid, dist) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ("DistrictCode" in dist) {
                $scope.dist.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.dist)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/Putdistrict',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            //SmartAlert.Success(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.SmartCardDisable = true;
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.District_master_grid');
                                window.clearInterval(h);
                            }, 3000);
                            //$scope.clear();

                            // $state.go('app.dashboard.District_master_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();

            }
            else {
                $scope.dist = dist;
                $scope.dist.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.dist)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/Postdistrict',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            //SmartAlert.Success(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.SmartCardDisable = true;
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.District_master_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $scope.clear();
                            //$state.go('app.dashboard.District_master_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();

            }
        }
    };

    $scope.clear = function () {
        $scope.dist.DistrictName = '';
        $scope.dist.StatusCode = '';
        $scope.dist.IsActive = '';
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();
});

appdash.controller('TalukaMasterGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BC');
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
                    title: 'Taluka Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


              { columnid: 'TalukaName', title: 'Taluka Name' },
               { columnid: 'StateDesc', title: 'State Name' },
              { columnid: 'DistrictName', title: 'District Name' },
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'TalukaCode', displayName: 'Taluka Code ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'TalukaName', displayName: 'Taluka Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StateCode', displayName: 'State Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

            { name: 'DistrictCode', displayName: 'District Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'StateDesc', displayName: 'State Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'DistrictName', displayName: 'District Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.TalukaCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Taluka Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (TalukaCode) {
            $sessionStorage.tCode = TalukaCode;
            $state.go('app.dashboard.taluka_master');
        }

        $scope.clear1 = function () {
            $sessionStorage.tCode = null;
        }
        $scope.GetTalukaMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetTalukaDetails',
                params:
                    { TalukaCode: null, StateCode: null, DistrictCode: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {  // vm.alert(response.data.Message);
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);
            })
        }

        $scope.GetTalukaMaster();
    }

});
appdash.controller('TalukaMasterController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.GetAllState = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uri + 'State/GetStateDetails',
            params:
                {
                    StateCode: null, StateFlag: null, StateDesc: null, IsActive: 'Y', IsHomeState: null

                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getState1 = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetAllState();
    $scope.GetDistrict = function (StateCode) {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'master/GetDistrictDetails',
            params:
                {
                    StateCode: StateCode, DistrictCode: null, IsActive: 'Y'

                }
        }).then(function (response) {

            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getdistrict1 = response.data.Data;
            }
        })
    }
    $scope.GetTalukaIdWise = function () {

        if ($sessionStorage.tCode != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetTalukaDetails',
                params:
                    {
                        TalukaCode: $sessionStorage.tCode, StateCode: null, DistrictCode: null, IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.tal = response.data.Data;
                    $scope.Taluka = $scope.tal[0];
                    $scope.Taluka.TalukaCode = $scope.Taluka.TalukaCode;
                    $scope.Taluka.DistrictCode = $scope.Taluka.DistrictCode;
                    $scope.Taluka.StateCode = $scope.Taluka.StateCode;
                    $scope.Taluka.TalukaName = $scope.Taluka.TalukaName;
                    $scope.Taluka.Isactive = $scope.Taluka.IsActive;
                    $scope.GetDistrict($scope.Taluka.StateCode);

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })

        }
    }
    $scope.GetTalukaIdWise();
    $scope.SaveTalukaDetails = function (valid, Taluka) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("TalukaCode" in Taluka) {
                $scope.Taluka.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.Taluka)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/PutTaluka',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            //SmartAlert.Success(response.data.Message);
                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.SmartCardDisable = true;
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.taluka_master_grid');
                                window.clearInterval(h);
                            }, 3000);

                            $scope.submit = 'Submit';
                            // $state.go('app.dashboard.taluka_master_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();
            }
            else {
                $scope.Taluka = Taluka;
                $scope.Taluka.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.Taluka)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth = function () {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http({
                        method: "POST",
                        url: uriadmin + 'Master/PostTaluka',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {

                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.SmartCardDisable = true;
                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.taluka_master_grid');
                                window.clearInterval(h);
                            }, 3000);
                            // $scope.clear();

                            // $state.go('app.dashboard.taluka_master_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);

                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                $scope.getAuth();

            }
        }
    };
    $scope.clear = function () {
        $scope.Taluka.DistrictCode = '';
        $scope.Taluka.StateCode = '';
        $scope.Taluka.TalukaName = '';
        $scope.Taluka.IsActive = '';
    }
});

appdash.controller('BlockSmartCardGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('BD');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }

    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Block Smart Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'BlockFlag', title: 'Block Flag' },
              { columnid: 'BlockReason', title: 'Block Reason' },
               { columnid: 'IsActive', title: 'Is Active' },
            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'BlockFlag', displayName: 'Block Flag ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BlockReason', displayName: 'Block Reason', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CreatedBy', displayName: 'Is Home State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'CreatedDt', displayName: 'Is Home State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'UpdatedBy', displayName: 'Is Home State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'UpdateDt', displayName: 'Is Home State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.BlockFlag)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "70"
                  , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Block Smart Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (BlockFlag) {
            $sessionStorage.bflag = BlockFlag;
            $sessionStorage.inflag = 'UP';
            $sessionStorage.mflag = 'B';
            $state.go('app.dashboard.block_smart_card_reasons');
        }

        $scope.clear1 = function () {
            $sessionStorage.bflag = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'B';
        }

        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;

        };

        $scope.ClearDistSession();
        $scope.GetBLockCardReasonInfo = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'master/GetBLockCardReasonInfo',
                params: { BlockFlag: null, BlockReason: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'B')
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
        if ($sessionStorage.mflag == 'B')
            $scope.GetBLockCardReasonInfo();

        $scope.gridOptions1.data = $sessionStorage.grddata;


    }
});
appdash.controller('BlockSmartCardController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();

    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.bflag != null) {
        document.getElementById('bflag').disabled = true;
        $scope.getCardFlagWise = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'master/GetBLockCardReasonInfo',
                params: { BlockFlag: $sessionStorage.bflag, BlockReason: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allcard = response.data.Data;
                    $scope.block = $scope.allcard[0];
                    $scope.block.BlockFlag = $scope.block.BlockFlag;
                    $scope.block.BlockReason = $scope.block.BlockReason;

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';


            })
            //  $sessionStorage.dCode = null

        }
        $scope.getCardFlagWise();
    }
    else {
        $scope.submit = 'Submit';
        document.getElementById('bflag').disabled = false;
    }

    $scope.saveBlockSmartCardDetails = function (valid, block) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.inflag == "UP") {
                $scope.block = block;
                $scope.block.CreatedBy = $sessionStorage.ucode;
                $scope.block.flag = 'UP';
                var json = angular.toJson($scope.block)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else if ($sessionStorage.inflag == 'IN') {
                $scope.block = block;
                $scope.block.CreatedBy = $sessionStorage.ucode;
                $scope.block.flag = 'IN';
                $scope.block.IsActive = 'Y';
                var json = angular.toJson($scope.block)
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
            url: uriadmin + 'Master/postblocksmartcardreason',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;
                $scope.SmartCardDisable = true;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.block_smart_card_reasons_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.clear();
                $sessionStorage.inflag = '';
                // $scope.submit = 'Submit';
                // $state.go('app.dashboard.block_smart_card_reasons_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {
        $scope.block.BlockFlag = '';
        $scope.block.BlockReason = '';
        $scope.block.IsActive = '';
    }
});

appdash.controller('RegionMasterGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {
    var valueof = userService.Success('BE');
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
                title: 'Regional Mailing Information',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
          { columnid: 'RegCode', title: 'Region Code' },
          { columnid: 'RegDesc', title: 'Region Description' },
          { columnid: 'HostEmail', title: 'Host Email' },
          { columnid: 'Port', title: 'Port' },
          { columnid: 'SMTPServer', title: 'SMTP Server' },
          { columnid: 'EnableSSL', title: 'Enable SSL' },
          { columnid: 'UseDefaultCredentials', title: 'Use Default Credentials?' },
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

            },

        };
        $scope.mystyle = [];

        $sessionStorage.rCode = null;

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
            { name: 'RegCode', displayName: 'Region Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RegDesc', displayName: 'Region Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'HostEmail', displayName: 'Host Email', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Port', displayName: 'Port', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'SMTPServer', displayName: 'SMTP Server', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'EnableSSL', displayName: 'Enable SSL', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UseDefaultCredentials', displayName: 'Use Default Credentials', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.SelectRegionCode(row.entity.RegCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Regional Mailing Information.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.SelectRegionCode = function (RegionCode) {
            $sessionStorage.rCode = RegionCode;
            $sessionStorage.mflag = 'R';
            $state.go('app.dashboard.region_master');
        }

        $scope.clear1 = function () {
            $sessionStorage.rCode = null;
            $sessionStorage.mflag = 'R';
        }
        $scope.GetRegionMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/getregion',
                params:
                    { RegCode: null, RegDesc: null, IsActive: '', HostEmail: null, SMTPServer: null }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'R')
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
        if ($sessionStorage.mflag == 'R')
            $scope.GetRegionMaster();
        $scope.gridOptions1.data = $sessionStorage.grddata;

    }
});
appdash.controller('RegionMasterController', function ($http, $scope, $filter, $timeout, userService, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;

    $scope.myFunction = function () {
        document.getElementById("regionmailid").style.textTransform = "lowercase";
    }
    if ($sessionStorage.rCode != null) {
        $scope.GetRegionWise = function () {

            document.getElementById('regcode').disabled = true;
            document.getElementById('rd').disabled = true;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/getregion',
                params:
                    {
                        RegCode: $sessionStorage.rCode, RegDesc: null, IsActive: '', HostEmail: null, SMTPServer: null
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.region = response.data.Data;
                    $scope.Region = $scope.region[0];

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';
            })
        }
        $scope.GetRegionWise();
    }
    else {
        document.getElementById('regcode').disabled = false;
        document.getElementById('rd').disabled = false;
    }
    $scope.SaveRegionDetails = function (valid, Region) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.rCode == null) {
                $scope.Region = Region;
                $scope.Region.CreatedBy = $sessionStorage.ucode;
                $scope.Region.flag = 'IN';
                if ($scope.Region.EnableSSL == '' || $scope.Region.EnableSSL == null) {
                    $scope.Region.EnableSSL = 'N';
                }
                else {
                    $scope.Region.EnableSSL = 'Y';
                }
                if ($scope.Region.UseDefaultCredentials == '' || $scope.Region.UseDefaultCredentials == null) {
                    $scope.Region.UseDefaultCredentials = 'N';
                }
                else {
                    $scope.Region.UseDefaultCredentials = 'Y';
                }
                $scope.Region.IsActive = 'Y';
                var json = angular.toJson($scope.Region)
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
                $scope.Region = Region;
                $scope.Region.CreatedBy = $sessionStorage.ucode;
                $scope.Region.flag = 'UP';
                var json = angular.toJson($scope.Region)
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
            url: uriadmin + 'Master/postregioncode',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.region_master_grid');
                    window.clearInterval(h);
                }, 3000);

                // $scope.clear();
                //$state.go('app.dashboard.region_master_grid');

            }
            else {
                SmartAlert.Errmsg(response.data.Message);

            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }

    $scope.clear = function () {
        $scope.Region.RegCode = '';
        $scope.Region.RegDesc = '';
        $scope.Region.HostEmail = '';
        $scope.Region.password = '';
        $scope.Region.Port = '';
        $scope.Region.SMTPServer = '';
    }

});

appdash.controller('LanguageMasterGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('BF');
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
                    title: 'Language Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [

              { columnid: 'LangCode', title: 'Language Code' },
              { columnid: 'LangDesc', title: 'Language' },
              { columnid: 'IsActive', title: 'Is Active' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                },

            };
            $scope.mystyle = [];
        $sessionStorage.LangCode = null;


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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'LangCode', displayName: 'Language Code ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LangDesc', displayName: 'Language', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.LangCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Language Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.select = function (LangCode) {
            $sessionStorage.LangCode = LangCode;
            $sessionStorage.mflag = 'L';
            $state.go('app.dashboard.language_master');
        }
        $scope.clear1 = function () {
            $sessionStorage.LangCode = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'L';
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetStateMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'Distributor/GetLanguageInfo',
                params:
                    { LangCode: null, LangDesc: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'L')
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
        if ($sessionStorage.mflag == 'L')
            $scope.GetStateMaster();

        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('LanguageMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.LangCode != null) {
        $scope.submit = 'Update';
        document.getElementById('LCode').disabled = true;
        $scope.GetLangIdWise = function () {

            if ($sessionStorage.LangCode != null) {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: uri + 'Distributor/GetLanguageInfo',
                    params:
                          { LangCode: $sessionStorage.LangCode, LangDesc: null, IsActive: '' }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.tal = response.data.Data;
                        $scope.Language = $scope.tal[0];
                    }
                    else {

                    }

                })

            }
        }
        $scope.GetLangIdWise();
    }
    else {
        $scope.submit = 'Submit';
        document.getElementById('LCode').disabled = false;
    }
    $scope.SaveLanguageDetails = function (valid, Language) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.LangCode == null) {
                $scope.Language = Language;
                $scope.Language.CreatedBy = $sessionStorage.ucode;
                $scope.Language.flag = "IN";
                $scope.Language.IsActive = 'Y';
                var json = angular.toJson($scope.Language)
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
                $scope.Language.CreatedBy = $sessionStorage.ucode;
                $scope.Language.flag = "UP";
                var json = angular.toJson($scope.Language)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'Master/postlanguage',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.language_master_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.clear();
                //$state.go('app.dashboard.language_master_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {
        $scope.Language.LangCode = '';
        $scope.Language.LangDesc = '';
        $scope.Language.IsActive = '';
    }

});

appdash.controller('BankMasterGridController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    var valueof = userService.Success('BG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Bank Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
               { columnid: 'BankCode', title: 'Bank Code' },
              { columnid: 'BankName', title: 'Bank Name' },
              { columnid: 'AccountNo', title: 'Account No' },
              { columnid: 'BranchName', title: 'Branch Name' },
              { columnid: 'IsActive', title: 'Is Active' },

            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }
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
            { name: 'BankCode', displayName: 'Bank Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BankName', displayName: 'Bank Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AccountType', displayName: 'Account Type', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AccountNo', displayName: 'Account No', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'IfscCode', displayName: 'Ifsc Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BranchName', displayName: 'Branch Name', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.SelectRegionCode(row.entity.BankCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Bank Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.SelectRegionCode = function (BankCode) {
            $sessionStorage.BankCode = BankCode;
            $sessionStorage.mflag = 'BK';
            $state.go('app.dashboard.bank_master');
        }

        $scope.clear1 = function () {
            $sessionStorage.BankCode = null;
            $sessionStorage.mflag = 'BK';
        }
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();
        $scope.getBankMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/getbanks',
                params:
                    { BankCode: null, BankName: null, AccountNo: null, BranchName: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'BK')
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
        if ($sessionStorage.mflag == 'BK')
            $scope.getBankMaster();

        $scope.gridOptions1.data = $sessionStorage.grddata;


    }
});
appdash.controller('BankMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {

        if (flagvalue == 'E') {
            $scope.nameonly = 'EzeTap';
        }
        else {
            $scope.nameonly = 'Pushpam';
        }
    }
    else {
        $scope.nameonly = 'Pushpam';
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;

    $scope.div = false;
    if ($sessionStorage.BankCode != null) {
        $scope.submit = 'Update';

        $scope.GetBankIdWise = function () {

            if ($sessionStorage.BankCode != null) {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: uriadmin + 'master/getbanks',
                    params:
                        { BankCode: $sessionStorage.BankCode, BankName: null, AccountNo: null, BranchName: null, IsActive: '' }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.tal = response.data.Data;
                        $scope.bank = $scope.tal[0];
                        if ($scope.bank.AcType == '' || $scope.bank.AcType == null) {
                            $scope.accept = 'N';
                            $scope.show = false;
                        }
                        else {
                            $scope.accept = 'Y';
                            $scope.show = true;
                        }
                    }
                    else {

                    }

                })

            }
        }
        $scope.GetBankIdWise();
    }
    else {
        $scope.submit = 'Submit';
    }
    $scope.Accept = function (accept) {

        if (accept == 'Y') {
            $scope.show = true;
        }
        else {
            $scope.show = false;
        }
    }

    $scope.SaveBankDetails = function (valid, bank, accept) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.BankCode == null) {
                $scope.bank = bank;
                if (accept == 'Y') {
                    if ($scope.bank.AcType == undefined && $scope.bank.AccountNo == undefined && $scope.bank.IfscCode == undefined && $scope.bank.BranchName == undefined) {
                        SmartAlert.Errmsg('Please fill all mandatory fields');
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                    else {

                        $scope.bank.UserCode = $sessionStorage.ucode;
                        $scope.bank.Flag = "IN";
                        $scope.bank.IsActive = 'Y';
                        var json = angular.toJson($scope.bank)
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
                else {
                    $scope.bank.UserCode = $sessionStorage.ucode;
                    $scope.bank.Flag = "IN";
                    $scope.bank.IsActive = 'Y';
                    var json = angular.toJson($scope.bank)
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
            else {
                if (accept == 'Y') {
                    if ($scope.bank.AcType == undefined && $scope.bank.AccountNo == undefined && $scope.bank.IfscCode == undefined && $scope.bank.BranchName == undefined) {
                        SmartAlert.Errmsg('Please fill all mandatory fields');
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                    else {

                        $scope.bank.UserCode = $sessionStorage.ucode;
                        $scope.bank.Flag = "UP";

                        var json = angular.toJson($scope.bank)
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
                else {
                    $scope.bank.UserCode = $sessionStorage.ucode;
                    $scope.bank.Flag = "UP";

                    var json = angular.toJson($scope.bank)
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
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Master/postBankDetails',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.bank_master_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.clear();
                //$state.go('app.dashboard.language_master_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }

    $scope.clear = function () {
        $scope.Language.LangCode = '';
        $scope.Language.LangDesc = '';
        $scope.Language.IsActive = '';
    }

});

appdash.controller('PaymentModeGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BH');
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
                    title: 'Payment Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'PayMode', title: 'PayMent Mode' },
                { columnid: 'PayDesc', title: 'PayMent Description' },
                { columnid: 'TrCharges', title: 'Transaction Charges' },
                { columnid: 'BankName', title: 'Bank Name' },
                 { columnid: 'IsActive', title: 'Is Active' },

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },

                },

            };
            $scope.mystyle = [];

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
            { name: 'PayMode', displayName: 'Payment Mode ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayDesc', displayName: 'Payment Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TrCharges', displayName: 'Transaction Charges', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BankName', displayName: 'Bank Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'TrChargesflag', displayName: 'Transaction Flag',  width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.PayMode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (PayMode) {
            $sessionStorage.pmode = PayMode;
            $sessionStorage.inflag = 'UP';
            $sessionStorage.mflag = 'PT';
            $state.go('app.dashboard.payment_mode');
        }

        $scope.clear1 = function () {
            $sessionStorage.pmode = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'PT';
        }

        $scope.getPaymentMaster = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/getpaymentmode',
                params:
                    { PayMode: null, PayDesc: null, TrCharges: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'PT')
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
        if ($sessionStorage.mflag == 'PT')
            $scope.getPaymentMaster();
        $scope.gridOptions1.data = $sessionStorage.grddata;

    }

});
appdash.controller('PaymentModeController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;

    $scope.getBankMaster = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'master/getbanks',
            params:
                { BankCode: null, BankName: null, AccountNo: null, BranchName: null, IsActive: '' }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.bankdetails = response.data.Data;
            }
        })
    }
    $scope.getBankMaster();
    if ($sessionStorage.pmode != null) {
        document.getElementById('pmode').disabled = true;
        $scope.getPaymentIdWise = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/getpaymentmode',
                params:
                    { PayMode: $sessionStorage.pmode, PayDesc: null, TrCharges: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allpay = response.data.Data;
                    $scope.pay = $scope.allpay[0];
                    $scope.pay.PayMode = $scope.pay.PayMode;
                    $scope.pay.PayDesc = $scope.pay.PayDesc;
                    $scope.pay.TrCharges = $scope.pay.TrChargesflag;
                    $scope.pay.BankName = $scope.pay.BankName;
                    $scope.pay.IsActive = $scope.pay.IsActive;
                    document.getElementById('pmode').disabled = true;
                }
                $scope.submit = 'Update';
            })
        }
        $scope.getPaymentIdWise();
    }
    else {
        document.getElementById('pmode').disabled = false;
    }
    $scope.savePayMentDetails = function (valid, pay) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.inflag == "UP") {
                $scope.pay = pay;
                $scope.pay.CreatedBy = $sessionStorage.ucode;
                $scope.pay.flag = 'UP';
                var json = angular.toJson($scope.pay)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else if ($sessionStorage.inflag == 'IN') {
                $scope.pay = pay;
                $scope.pay.CreatedBy = $sessionStorage.ucode;
                $scope.pay.flag = 'IN';
                $scope.pay.IsActive = 'Y';
                var json = angular.toJson($scope.pay)
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
            url: uriadmin + 'Master/postpaymentmode',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;
                $scope.SmartCardDisable = true;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.payment_mode_grid');
                    window.clearInterval(h);
                }, 3000);
                // $scope.clear();
                $sessionStorage.inflag = '';
                // $scope.submit = 'Submit';
                //$state.go('app.dashboard.payment_mode_grid');

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {

        $scope.pay.PayMode = '';
        $scope.pay.PayDesc = '';
        $scope.pay.TrCharges = '';
        $scope.pay.BankName = '';
        $scope.pay.IsActive = '';
    }

});

appdash.controller('TransportMasterGridController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('BI');
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
                title: 'Transport Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

         // { columnid: 'TransportCode', title: 'Transport Code' },
          { columnid: 'TransportDesc', title: 'Transport Name' },
          { columnid: 'TransportPerson', title: 'Transport Person' },
          { columnid: 'TransportCity', title: 'Transport City' },
          { columnid: 'MobileNo', title: 'Mobile No' },
           { columnid: 'PhoneNo', title: 'Phone No' },
          { columnid: 'TransportAdd1', title: 'Address1' },
          { columnid: 'TransportAdd2', title: 'Address2' },
          { columnid: 'TransportAdd3', title: 'Address3' },
          { columnid: 'EmailAdd', title: 'Email Id' },
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
        $sessionStorage.TransportCode = null;

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
            { name: 'TransportCode', displayName: 'Transport Code ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'TransportDesc', displayName: 'Transport Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransportPerson', displayName: 'Transport Person', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransportCity', displayName: 'Transport City', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MobileNo', displayName: 'Mobile No', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PhoneNo', displayName: 'Phone No', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransportAdd1', displayName: 'Address1', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransportAdd2', displayName: 'Address2', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransportAdd3', displayName: 'Address3', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'EmailAdd', displayName: 'Email Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.TransportCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Transport Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.select = function (TransportCode) {
            $sessionStorage.TransportCode = TransportCode;
            $sessionStorage.mflag = 'T';
            $state.go('app.dashboard.transport_mode');
        }
        $scope.clear1 = function () {
            $sessionStorage.TransportCode = null;
            $sessionStorage.mflag = 'T';
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetTransportMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({

                method: 'GET',
                url: uriadmin + 'master/gettransport',
                params:
            { TransportCode: null, TransportDesc: null, TransportPerson: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'T')
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
        if ($sessionStorage.mflag == 'T')
            $scope.GetTransportMaster();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('TransportMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.myFunction = function () { document.getElementById("emailid").style.textTransform = "lowercase"; }
    if ($sessionStorage.TransportCode != null) {
        $scope.submit = 'Update';
        $scope.GetTransportIdWise = function () {


            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/gettransport',
                params:
                      { TransportCode: $sessionStorage.TransportCode, TransportDesc: null, TransportPerson: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.tal = response.data.Data;
                    $scope.Transport = $scope.tal[0];
                    $scope.Transport.TransportDesc = $scope.Transport.TransportDesc;


                }
                else {

                }

            })


        }
        $scope.GetTransportIdWise();
    }
    else {
        $scope.submit = 'Submit';

    }
    $scope.SaveTransportDetails = function (valid, Transport) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.TransportCode == null) {
                $scope.Transport = Transport;
                $scope.Transport.CreatedBy = $sessionStorage.ucode;

                $scope.Transport.flag = "IN";
                $scope.Transport.IsActive = 'Y';
                var json = angular.toJson($scope.Transport)
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

                $scope.Transport = Transport;
                if ($scope.Transport.PhoneNo == '')
                    $scope.Transport.PhoneNo = null;
                else
                    $scope.Transport.PhoneNo = $scope.Transport.PhoneNo;
                $scope.Transport.CreatedBy = $sessionStorage.ucode;
                $scope.Transport.flag = "UP";
                var json = angular.toJson($scope.Transport)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'Master/posttransport',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.transport_mode_grid');
                    window.clearInterval(h);
                }, 3000);


                // $state.go('app.dashboard.transport_mode_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }


});

appdash.controller('UserRoleGridController', function ($http, $scope, $filter, $timeout, $state, $rootScope, SmartAlert, userService, $sessionStorage, base64, uri, uriadmin, Name, Password) {

    var valueof = userService.Success('BJ');
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
        $scope.AlertMessage = function (Message) {
            $.bigBox({
                title: Message,
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                timeout: 6000
            });
        }
        $scope.SuccessMessage = function (Message) {
            $.bigBox({
                title: Message,
                color: "#296191",
                icon: "fa fa-thumbs-up animated bounce ",
                timeout: "4000"
            });
        }

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'User Role Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
         { columnid: 'RoleCode', title: 'Role Code' },
         { columnid: 'RoleDesc', title: 'Role Name' },
         { columnid: 'RoleFor', title: 'Role For' },
         { columnid: 'Rolesr', title: 'Role Squence' },
         { columnid: 'IsActive', title: 'Is Active' }
         ,
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
            },

        };
        $scope.mystyle = [];

        $sessionStorage.UserRole = null;



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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
           // { name: 'RoleCode', displayName: 'Role Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleDesc', displayName: 'Role Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RoleFor', displayName: 'Role For', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Rolesr', displayName: 'Role Sequence', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CreatedBy', displayName: 'Created By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'CreatedDt', displayName: 'Created Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'UpdatedBy', displayName: 'Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'UpdateDt', displayName: 'Update Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.GetRoleCode(row.entity.RoleCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("User Role Information.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.GetRoleCode = function (RoleCode) {
            $sessionStorage.UserRole = RoleCode;
            $sessionStorage.mflag = 'U';
            $state.go('app.dashboard.user_role');
        }
        $scope.clear1 = function () {
            $sessionStorage.UserRole = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'U';
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
        $scope.GetRoleInfo = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'Role/GetRoleInfo',
                params:
                    {
                        RoleCode: null, RoleDesc: null, RoleFor: null, IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'U')
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
        if ($sessionStorage.mflag == 'U')
            $scope.GetRoleInfo();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('UserRoleController', function ($http, $scope, $filter, $timeout, $state, $rootScope, SmartAlert, $sessionStorage, base64, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
   
     if (flagvalue == 'H') {
        $scope.Roleforn = 'GoGas Company';
        $scope.GetRoleFor = [{ RoleFor: 'DI', RoleForName: 'Distributor' }, { RoleFor: 'PG', RoleForName: 'GoTech Group' }, { RoleFor: 'CO', RoleForName: 'GoGas Company' }];
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
    // $scope.GetRoleFor = [{ RoleFor: 'DI', RoleForName: 'Distributor' }, { RoleFor: 'PG', RoleForName: 'Pushpam Group' }, { RoleFor: 'CO', RoleForName: $scope.Roleforn }];
    if ($sessionStorage.UserRole != null) {
        document.getElementById('rolecodeid').disabled = true;
        $scope.GetUserRole = function () {

            $scope.divshow = false;
            $scope.divhide = true;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uri + 'Role/GetRoleInfo',
                params:
                    {
                        RoleCode: $sessionStorage.UserRole, RoleDesc: null, RoleFor: null, IsActive: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    var GetDetails = response.data.Data;
                    $scope.UserRole = GetDetails[0];
                    $scope.UserRole.RoleLevel = GetDetails[0].RoleLevel.toString();
                    $scope.submit = 'Update';
                }
                else {

                }
            })
            $scope.divshow = true;
            $scope.divhide = false;

        }
        $scope.GetUserRole();
    }
    else {
        document.getElementById('rolecodeid').disabled = false;
    }
    //dropdown for preffered dashboard
    //$scope.GetPreffered = function () {
    //            $http({
    //                method: 'GET',
    //                url: uri + 'Setting/GetForms?FId&MainMenuID=1&IsActive=Y',
    //            }).then(function (response) {
    //                if (response.data.Data != null || response.data.Data == 0) {
    //                    $scope.allpreffered = response.data.Data;
    //                }
    //                else {
    //                    SmartAlert.Errmsg(response.data.Message);
    //                }
    //            })
    //    }
    //$scope.GetPreffered();

    $scope.GetPreffered = function () {
        $http.get(uriadmin + 'Setting/GetForms?FId&MainMenuID=1&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.allpreffered = response.data.Data;
                // SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }



        })
    }
    $scope.GetPreffered();

    $scope.SaveUserRole = function (valid, UserRole) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.UserRole == null) {
                $scope.UserRole = UserRole;
                $scope.UserRole.CreatedBy = $sessionStorage.ucode;
                $scope.UserRole.IsActive = 'Y';
                $scope.UserRole.Flag = 'IN';
                var json = angular.toJson($scope.UserRole)
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
                $scope.UserRole = UserRole;
                $scope.UserRole.CreatedBy = $sessionStorage.ucode;
                $scope.UserRole.Flag = 'UP';
                var json = angular.toJson($scope.UserRole)
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
            url: uriadmin + 'Master/postuserroles',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                // SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.user_role_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.submit = 'Submit';
                //$state.go('app.dashboard.user_role_grid');

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
});

appdash.controller('ApplicationNameGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BK');
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
                title: 'Applications Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'AFlag', title: 'App Flag' },
              { columnid: 'AppName', title: 'App Name' },
              { columnid: 'AppType', title: 'App Type' },
            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } }

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
            { name: 'AppId', displayName: 'App ID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'AFlag', displayName: 'Application Flag', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AppName', displayName: 'App Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'AppType', displayName: 'App Type', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.AppId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false,
            },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Applications.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.select = function (AppId) {
            $sessionStorage.AppId = AppId;
            $sessionStorage.mflag = 'AN';
            $state.go('app.dashboard.xpressg_application');

        }
        $scope.clear1 = function () {
            $sessionStorage.AppId = null;
            $sessionStorage.mflag = 'AN';
            $state.go('app.dashboard.xpressg_application');
        }
        $scope.getAppMenu = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GettblMApplications',
                params:
                    { AppId: null, AppType: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'AN')
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
        if ($sessionStorage.mflag == 'AN')
            $scope.getAppMenu();
        else {
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});
appdash.controller('ApplicationNameController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;


    $scope.getMainMenuIdWise = function () {

        if ($sessionStorage.AppId != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GettblMApplications',
                params:
                    { AppId: $sessionStorage.AppId, AppType: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {

                    $scope.allmenu = response.data.Data;
                    $scope.app = $scope.allmenu[0];
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
    $scope.saveAppDetails = function (valid, app) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("AppId" in app) {
                $scope.app.Flag = 'UP';
                $scope.app.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.app)
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
                $scope.app = app;
                $scope.app.AppId = null;
                $scope.app.IsActive = 'Y';
                $scope.app.Flag = 'IN';
                $scope.app.UserCode = $sessionStorage.ucode;
                var json = angular.toJson($scope.app)
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
            url: uriadmin + 'master/ManagetblMApplications',
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
                    $state.go('app.dashboard.xpressg_appgrid');
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

appdash.controller('ZoneMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.ZoneId != null) {
        $scope.submit = 'Update';
        $scope.GetZoneIdWise = function () {

            if ($sessionStorage.ZoneId != null) {
                $http.get(uriadmin + 'master/GetZone?ZoneId=' + $sessionStorage.ZoneId + '&ZoneDesc&IsActive=').then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.zonedata = response.data.Data;
                        $scope.zone = $scope.zonedata[0];
                    }
                    else {


                    }

                })

            }

        }
        $scope.GetZoneIdWise();
    }
    else {
        $scope.submit = 'Submit';
        // document.getElementById('LCode').disabled = false;
    }
    $scope.SaveZoneDetails = function (valid, zone) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.ZoneId == null) {
                $scope.zone = zone;
                $scope.zone.UserCode = $sessionStorage.ucode;
                $scope.zone.flag = "IN";
                $scope.zone.IsActive = 'Y';
                var json = angular.toJson($scope.zone)
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
                $scope.zone.UserCode = $sessionStorage.ucode;
                $scope.zone.flag = "UP";
                var json = angular.toJson($scope.zone)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'master/PostZone ',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.zonemaster_grid');
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


});
appdash.controller('ZoneGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BL');
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
                title: 'Zone Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

          { columnid: 'ZoneId', title: 'Zone Id' },
          { columnid: 'ZoneDesc', title: 'Zone Description' },
          { columnid: 'Isactive', title: 'Isactive' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
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
            { name: 'ZoneId', displayName: 'Zone Id ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ZoneDesc', displayName: 'Zone Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Isactive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.ZoneId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Zone Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };

        //for edit
        $scope.select = function (ZoneId) {
            $sessionStorage.ZoneId = ZoneId;
            $state.go('app.dashboard.zonemaster');
        }

        //For add new 
        $scope.sessionnull = function () {
            $sessionStorage.ZoneId = null;
            $state.go('app.dashboard.zonemaster');
        }

        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetZone = function () {
            $http.get(uriadmin + 'master/GetZone?ZoneId&ZoneDesc&IsActive=').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    // SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data = [];
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.mystyle.push($scope.mystyle1);
            })
        }
        $scope.GetZone();
    }
});

appdash.controller('RegionController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.RegionId != null) {
        $scope.submit = 'Update';
        $scope.GetRegionIdWise = function () {

            if ($sessionStorage.RegionId != null) {
                $http.get(uriadmin + 'master/GetRegionDtls?ZoneId=&RegionId=' + $sessionStorage.RegionId + '&Region=&IsActive=').then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.regiondata = response.data.Data;
                        $scope.region = $scope.regiondata[0];
                    }
                    else {
                    }
                })
            }
        }
        $scope.GetRegionIdWise();
    }
    else {
        $scope.submit = 'Submit';
    }
    //Dropdown for zone
    $scope.GetZone = function () {
        $http.get(uriadmin + 'master/GetZone?ZoneId&ZoneDesc&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.allzone = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetZone();

    $scope.SaveRegionDetails = function (valid, region) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.RegionId == null) {
                $scope.region = region;
                $scope.region.UserCode = $sessionStorage.ucode;
                $scope.region.flag = "IN";
                // $scope.region.RegionId = "";
                $scope.region.IsActive = 'Y';
                var json = angular.toJson($scope.region)
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
                $scope.region.UserCode = $sessionStorage.ucode;
                $scope.region.flag = "UP";
                var json = angular.toJson($scope.region)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'master/PostRegion',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.region_grid');
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


});
appdash.controller('RegionGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BM');
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
                title: 'Region Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

          //{ columnid: 'ZoneId', title: 'Zone Id' },
          { columnid: 'ZoneDesc', title: 'Zone Description' },
          //{ columnid: 'RegionId', title: 'Region Id' },
          { columnid: 'Region', title: 'Region' },
          { columnid: 'Isactive', title: 'Isactive' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
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
            { name: 'ZoneId', displayName: 'Zone Id ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ZoneDesc', displayName: 'Zone Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RegionId', displayName: 'RegionId', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Region', displayName: 'Region', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Isactive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.RegionId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Region Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };

        //for edit
        $scope.select = function (RegionId) {
            $sessionStorage.RegionId = RegionId;
            $state.go('app.dashboard.region');
        }

        //For add new 
        $scope.Rsessionnull = function () {
            $sessionStorage.RegionId = null;
            $state.go('app.dashboard.region');
        }

        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetRegion = function () {
            $http.get(uriadmin + 'master/GetRegionDtls?ZoneId=&RegionId=&Region=&IsActive=').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    // SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data = [];
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.mystyle.push($scope.mystyle1);
            })
        }
        $scope.GetRegion();
    }
});

appdash.controller('ExcludeROGridController', function ($http, $scope, $filter, $timeout, $state, $sessionStorage, base64, SmartAlert, userService, Name, Password, uriadmin) {

    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var codeofuser = "";
    var valueof = userService.Success('BN');
    $sessionStorage.currentstate = $state.current.name;
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
        codeofuser = $sessionStorage.CUserCode;
    }

    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        codeofuser = $sessionStorage.PUserCode;
    }
    $scope.mystyle1 = {
        headers: true,
        style: 'font-size:19px;color:black',
        caption: {
            title: 'Exclude RO Master',
        },
        column: {
            style: 'font-size:15px;color:black'
        },
        columns: [

      { columnid: 'ZoneDesc', title: 'Zone Description' },
       { columnid: 'Region', title: 'Region Description' },
        { columnid: 'HsDesc', title: 'Sales Area Description' },
         { columnid: 'Remark', title: 'Remark' },
      { columnid: 'IsActive', title: 'IsActive' },
        ],

        rows: {
            0: { cell: { style: 'color:black' } },
            1: { cell: { style: 'color:black' } },
            2: { cell: { style: 'color:black' } },
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
        { name: 'ZoneDesc', displayName: 'Zone Description ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Region', displayName: 'Region Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'HsDesc', displayName: 'Sales Area Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as excel',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Exclude_RO_Master.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            },
            order: 110
        }]
    };
    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    //for edit
    $scope.select = function (data) {
        $sessionStorage.excludeData = data;
        $state.go('app.dashboard.exclude_ro');
    }

    $scope.getRO = function () {
        $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
        $scope.RegionId = $scope.RegionId == null ? "" : $scope.RegionId;
        $scope.HsId = $scope.HsId == null ? "" : $scope.HsId;
        $http.get(uriadmin + 'master/GetExcludeRo?ZoneID=&RegionId=&HsId=&IsActive=&USerCode').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
            }
            else {
                $scope.gridOptions1.data = [];
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.mystyle.push($scope.mystyle1);
        })
    }
    $scope.getRO();
})
appdash.controller('ExcludeROController', function ($http, $scope, $filter, $timeout, $state, $sessionStorage, SmartAlert, base64, userService, Name, Password, uriadmin) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var codeofuser = "";
    var valueof = userService.Success('BQ');
    $sessionStorage.currentstate = $state.current.name;
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
        codeofuser = $sessionStorage.CUserCode;
    }

    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        codeofuser = $sessionStorage.PUserCode;
    }
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.disabled = false;
    $scope.drdSalesArea = true;
    $scope.allSalesArea = false;
    $scope.ero = { IsActive: 'Y', IsAll: 'N' };

    $scope.GetZone = function () {
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=&RoleCode=&Level=1&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Zonedata = response.data.Data;
            }
            else {
                $scope.Zonedata = [];
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetZone();
    $scope.GetRegion = function () {
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ero.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Regiondata = response.data.Data;
            }
            else {
                $scope.Regiondata = [];
            }
        })
    }
    $scope.gethierarchy = function () {
        $scope.allSalesArea = $scope.disabled == true ? false : true;
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ero.ZoneId + '&RegionId=' + $scope.ero.RegionId + '&RoleCode=&Level=3&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Heararchydata = response.data.Data;
            }
            else {
                $scope.Heararchydata = [];
            }
        })
    }
    // $scope.gethierarchy();
    if ($sessionStorage.excludeData != null) {
        $scope.ero = $sessionStorage.excludeData;
        $scope.disabled = true;
        $scope.saDisabled = true;
        $scope.allSalesArea = false;
        $scope.GetRegion();
        $scope.gethierarchy()
        $sessionStorage.excludeData = null;
    }

    $scope.isAllSalesArea = function () {
        $scope.allHsId = [];
        $scope.drdSalesArea = $scope.ero.IsAll == "Y" ? false : true;
        $scope.saDisabled = $scope.ero.IsAll == "Y" ? true : false;
        $scope.ero.HsId = null;
        if ($scope.ero.IsAll == "Y") {
            angular.forEach($scope.Heararchydata, function (value, key) {
                $scope.allHsId.push({ 'HsId': value.HsId });
            });
        }
    }
    $scope.saveData = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.ero.Flag = $scope.ero.ExdId == null ? "IN" : "UP";
            $scope.ero.UserCode = codeofuser;
            $scope.ero.Data = $scope.ero.HsId != null ? [{ 'HsId': $scope.ero.HsId }] : $scope.allHsId;
            $http.post(uriadmin + 'master/PostExcludeTransport', $scope.ero).then(function (response) {
                if (response.data.StatusCode != 0) {
                    SmartAlert.Success(response.data.Message);
                    $state.go('app.dashboard.exclude_ro_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            })
        }
    }
})

//If bolow code is not used then delete it...
appdash.controller('PaymentModeDeviceGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('EA');
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Payment Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'PayModeType', title: 'Pay Mode Type' },
                { columnid: 'PayModeDesc', title: 'Pay Mode Description' },
                { columnid: 'IsActive', title: 'Is Active' },

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },



                },

            };
            $scope.mystyle = [];

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
            { name: 'PayModeId', displayName: 'Payment Mode Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'PayModeType', displayName: 'Pay Mode Type', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayModeDesc', displayName: 'Pay Mode Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.PayModeId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (PayModeId) {
            $sessionStorage.PayModeId = PayModeId;
            $sessionStorage.mflag = 'PMO';
            $state.go('app.dashboard.pay_mode');
        }

        $scope.clear1 = function () {
            $sessionStorage.PayModeId = null;
            $sessionStorage.mflag = 'PMO';
        }



        $scope.getPayMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/GetPaymentMode',
                params:
                    { PayModeId: null, PayModeType: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'PMO')
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
        if ($sessionStorage.mflag == 'PMO')
            $scope.getPayMaster();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('PayModeController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    if ($sessionStorage.PayModeId != null) {


        $scope.getPayMasterIdwise = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/GetPaymentMode',
                params:
                    { PayModeId: $sessionStorage.PayModeId, PayModeType: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.payall = response.data.Data;
                    $scope.pay = $scope.payall[0];

                }

                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';
            })
        }
        $scope.getPayMasterIdwise();

    }
    else {
        $scope.submit = 'Submit';

    }
    $scope.SaveDistPayDetails = function (valid, pay) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ("PayModeId" in pay) {

                $scope.pay.Flag = 'UP';
                var json = angular.toJson($scope.pay)
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

                $scope.pay = pay;
                $scope.pay.PayModeId = 0;
                $scope.pay.Flag = 'IN';
                $scope.pay.IsActive = 'Y';
                var json = angular.toJson($scope.pay)
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
            url: uriadmin + 'Pay/ManagePayMode',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.pay_mode_grid');
                    window.clearInterval(h);
                }, 3000);
                // $scope.clear();


            }
            else {
                SmartAlert.Errmsg(response.data.Message);


            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {
        $scope.state.StateDesc = '';
        $scope.state.StateCode = '';
        $scope.state.StateFlag = '';
        $scope.state.IsHomeState = '';
        $scope.state.IsActive = '';

    }

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();



});

appdash.controller('TransportationChargesGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BL');
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
                title: 'Tranportation Charges Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

            { columnid: 'ProdName', title: 'Product' },
          { columnid: 'QuantityF', title: 'Quantity From' },
          { columnid: 'QuantityT', title: 'Quantity To' },
          { columnid: 'Charges', title: 'Charges' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
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
                 { name: 'ProdName', displayName: 'Product', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TrChargeId', displayName: 'TrChargeId ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'QuantityF', displayName: 'Quantity From', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'QuantityT', displayName: 'Quantity To', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Charges', displayName: 'Charges', width: "*", cellClass: 'grid-align', cellTooltip: true, cellFilter: 'number:2', headerCellClass: $scope.highlightFilteredHeader },

            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.TrChargeId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Tranportation Charges Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.select = function (TrChargeId) {
            $sessionStorage.TrChargeId = TrChargeId;
            $sessionStorage.mflag = 'TC';
            $state.go('app.dashboard.transport_charges');
        }
        $scope.clear1 = function () {
            $sessionStorage.TrChargeId = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'TC';
            $state.go('app.dashboard.transport_charges');
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetTransChargeMaster = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Distributor/GetTransPortCharges',
                params:
                    { TrChargeId: '', Amount: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'TC') {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }

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
        if ($sessionStorage.mflag == 'TC')
            $scope.GetTransChargeMaster();

        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('TransportationChargesController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.GetProductSearch = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.getProduct = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.mshow = true;
            $scope.mhide = false;
        })
    };
    $scope.GetProductSearch();
    if ($sessionStorage.TrChargeId != null) {
        $scope.submit = 'Update';

        $scope.GetLangIdWise = function () {

            if ($sessionStorage.TrChargeId != null) {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: uriadmin + 'Distributor/GetTransPortCharges',
                    params:
                        { TrChargeId: $sessionStorage.TrChargeId, Amount: null }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.tal = response.data.Data;
                        $scope.Tran = $scope.tal[0];
                    }
                    else {

                    }

                })

            }
        }
        $scope.GetLangIdWise();
    }
    else {
        $scope.submit = 'Submit';

    }

    $scope.qtymatch = function (minqty, maxqty) {

        if (Number(minqty) > Number(maxqty)) {
            SmartAlert.Errmsg('Quantity to should be greater or equal to qunatity from');
            document.getElementById('btnsbt').disabled = true;

        }
        else {
            document.getElementById('btnsbt').disabled = false;
        }
    }

    $scope.SaveTCDetails = function (valid, Tran) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.TrChargeId == null) {
                $scope.Tran = Tran;
                $scope.Tran.CreatedBy = $sessionStorage.ucode;
                $scope.Tran.flag = "IN";
                $scope.Tran.IsActive = 'Y';
                var json = angular.toJson($scope.Tran)
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
                $scope.Tran.CreatedBy = $sessionStorage.ucode;
                $scope.Tran.flag = "UP";
                var json = angular.toJson($scope.Tran)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'Master/ManageTransPortCharges',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.transport_charges_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.clear();
                //$state.go('app.dashboard.language_master_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {
        $scope.Tran = '';

    }

});

appdash.controller('EmailDetailsGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('BM');
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
                title: 'Communication Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

         { columnid: 'MFlag', title: 'MailFlag' },
            { columnid: 'MailIds', title: 'To Mail ID' },
            { columnid: 'CCMailIds', title: 'Cc Mail ID'},
            { columnid: 'BCCMailIDs', title: 'Bcc Mail ID' },
            { columnid: 'MailSubject', title: 'Subject' },
            { columnid: 'IsActive', title: 'Is Active'},
          { columnid: 'Charges', title: 'Charges' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
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
                { name: 'MFlag', displayName: 'MailFlag', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TaskMailID', displayName: 'TaskMailID ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'MailIds', displayName: 'To Mail ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CCMailIds', displayName: 'Cc Mail ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BCCMailIDs', displayName: 'Bcc Mail ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MailSubject', displayName: 'Subject', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'MailText', displayName: 'Mail Text', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.TaskMailID)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Communication Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.select = function (TaskMailID) {
            $sessionStorage.TaskMailID = TaskMailID;
            $sessionStorage.mflag = 'MTC';
            $state.go('app.dashboard.mail_master');
        }
        $scope.clear1 = function () {
            $sessionStorage.TaskMailID = null;
            $sessionStorage.inflag = 'IN';
            $sessionStorage.mflag = 'MTC';
            $state.go('app.dashboard.mail_master');
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetMAilDetails = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetMEmailDetails',
                params:
                    { TaskMailID: '', Flag: '', IsActive: '', FromDate: '', ToDate: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'MTC') {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }

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
        if ($sessionStorage.mflag == 'MTC')
            $scope.GetMAilDetails();

        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('EmailDetailsController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    if ($sessionStorage.TaskMailID != null) {
        $scope.submit = 'Update';

        $scope.GetMailIdWise = function () {

            if ($sessionStorage.TaskMailID != null) {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: uriadmin + 'master/GetMEmailDetails',
                    params:{ TaskMailID: $sessionStorage.TaskMailID, Flag: '', IsActive: '', FromDate: '', ToDate: '' }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.tal = response.data.Data;
                        $scope.mail = $scope.tal[0];
                        document.getElementById('mflag').disabled = true;
                        document.getElementById('lsub').disabled = true;
                        document.getElementById('dsub').disabled = true;
                        document.getElementById('mbl').disabled = true;
                        document.getElementById('mbd').disabled = true;
                        document.getElementById('dispname').disabled = true;
                        // document.getElementById('mob').disabled = true;
                        document.getElementById('regards').disabled = true;
                    }
                    else {

                    }

                })

            }
        }
        $scope.GetMailIdWise();
        $scope.submit = 'Update';
    }
    else {
        document.getElementById('mflag').disabled = false;
        document.getElementById('lsub').disabled = false;
        document.getElementById('dsub').disabled = false;
        document.getElementById('mbl').disabled = false;
        document.getElementById('mbd').disabled = false;
        document.getElementById('dispname').disabled = false;
        // document.getElementById('mob').disabled = false;
        document.getElementById('regards').disabled = false;
        $scope.submit = 'Submit';

    }
    $scope.SaveMCDetails = function (valid, mail) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.TaskMailID == null) {
                $scope.mail = mail;
                $scope.mail.UserCode = $sessionStorage.ucode;
                $scope.mail.flag = "IN";
                // scope.mail.MFlag = "OPF";
                $scope.mail.IsActive = 'Y';
                var json = angular.toJson($scope.mail)
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
                delete $scope.mail.CreatedBy;
                delete $scope.mail.CreateDt;
                delete $scope.mail.UpdateDt;
                delete $scope.mail.UpdatedBy;
                $scope.mail.TaskMailID = $sessionStorage.TaskMailID;
                $scope.mail.UserCode = $sessionStorage.ucode;
                $scope.mail.flag = "UP";
                var json = angular.toJson($scope.mail)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key });
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
            url: uriadmin + 'master/ManageEmailDetails',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.mail_master_grid');
                    window.clearInterval(h);
                }, 3000);
                //$scope.clear();
                //$state.go('app.dashboard.language_master_grid');
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.clear = function () {
        $scope.main = '';

    }

});

appdash.controller('ViewPDCQuestionController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, urianalysis, uriadmin, Name, Password) {

    var valueof = userService.Success('BP');
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
                title: 'PDC Questions',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [

           { columnid: 'index', title: 'SR.No. '},
            { columnid: 'QrefNo', title: 'Question Ref.No '},
            { columnid: 'Qdesc', title: 'Question Description' },
            { columnid: 'IsMandatory', title: 'Is Mandatory'},
            { columnid: 'Rating', title: 'Rating'},
          { columnid: 'Isactive', title: 'Isactive' },
            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
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
            { name: 'index', displayName: 'SR.No. ', width: "*", cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'QrefNo', displayName: 'Question Ref.No ', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'Qdesc', displayName: 'Question Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsMandatory', displayName: 'Is Mandatory', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'Rating', displayName: 'Rating', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Isactive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.QrefNo)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("PDC Questions.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };

        $scope.select = function (QrefNo) {
            $sessionStorage.QrefNo = QrefNo;
            $scope.EditPDCQuestion();
        }

        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetPDCQuestion = function () {
            $http.get(urianalysis + 'GetInspectionQuetions?LangaugeCode&QrefNo&InspTypePD&Isactive').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data = [];
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.mystyle.push($scope.mystyle1);
            })
        }
        $scope.GetPDCQuestion();
    }

    $scope.EditPDCQuestion = function () {

        $http.get(urianalysis + 'GetInspectionQuetions?LangaugeCode&QrefNo=' + $sessionStorage.QrefNo + '&InspTypePD&Isactive=').then(function (response) {
            if (response.data.StatusCode != 0) {
                $sessionStorage.PDCQuestion = response.data.Data[0];
                $state.go('app.dashboard.pdc_question')
            }
        })

    }
});
appdash.controller('PDCQuestionController', function ($http, $scope, $filter, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64,uri, urianalysis, uriadmin, Name, Password) {

    //$scope.GetLanguage = [{ LanguageCode: 'MA', LanguageDesc: 'Marathi' }, { LanguageCode: 'EN', LanguageDesc: 'English' }, { LanguageCode: 'HN', LanguageDesc: 'Hindi' }];
    $scope.GetIsMandatory = [{ IsMandatory: 'Y', IsMandatoryDesc: 'Yes' }, { IsMandatory: 'N', IsMandatoryDesc: 'No' }];
    $scope.GetInspType = [{ InspType: 'PD', IsnpDesc: 'PreDelivery' }, { InspType: 'RP', IsnpDesc: 'Rapid Inspection' }];
    $scope.GetCorrectAns = [{ CorrectAnswer: 'Y', AnsDesc: 'Yes' }, { CorrectAnswer: 'N', AnsDesc: 'No' }];
    $scope.GetControlType = [{ AnsCntrlType: 'R', AnsCntrlTypeDesc: 'Radio Button' }, { AnsCntrlType: 'C', AnsCntrlTypeDesc: 'Check Box' }];

    $scope.getLang = function () {
        $http({
            method: 'GET',
            url: uri + 'Distributor/GetLanguageInfo',
            params:
                { LangCode: null, LangDesc: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.GetLanguage = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.getLang();

    if ($sessionStorage.PDCQuestion != null) {
        $scope.PDCQuestion = $sessionStorage.PDCQuestion;
        $scope.PDCQuestion.LanguageCode = $scope.PDCQuestion.LanguageCode == "MA" ? "MR" : $scope.PDCQuestion.LanguageCode;
        $sessionStorage.PDCQuestion = null;

    }

    $scope.PostPDCQuestion = function (valid, PDCQuestion) {

        if (valid) {

            PDCQuestion.Qtype = PDCQuestion.InspType;
            PDCQuestion.flag = PDCQuestion.QrefNo == null ? "IN" : "UP";
            PDCQuestion.LanguageCode = PDCQuestion.LanguageCode == "MR" ? "MA" : PDCQuestion.LanguageCode;
            var json = angular.toJson(PDCQuestion);
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
                url: urianalysis + 'cyldel/IUDInspectionQuestion',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {
                //$scope.divshow = true;
                //$scope.divhide = false;
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $state.go('app.dashboard.pdc_question_grid');


                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
    }

});


appdash.controller('ManufactureMasterGridController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

 $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Manufacture Master',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns:     [

              { columnid: 'ManfactId', title: 'Manufacture ID' },
              { columnid: 'ManfactName', title: 'Manufacture Name' },
              { columnid: 'AddressLine1', title: 'AddressLine1' },
              { columnid: 'AddressLine2', title: 'AddressLine1' },
              { columnid: 'AddressLine3', title: 'AddressLine1' },
              { columnid: 'PinCode', title: 'PinCode' },
              { columnid: 'IsActive', title: 'Is Active' },
              

            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }
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
            { name: 'ManfactId', displayName: 'Manufacturer ID', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ManfactName', displayName: 'Manufacturer Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AddressLine1', displayName: 'AddressLine1', width:"*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AddressLine2', displayName: 'AddressLine2',  width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'AddressLine3', displayName: 'AddressLine3', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PinCode', displayName: 'Pin Code', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Edit(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Manufacture Master.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

       
        $scope.getManufacturerDetails = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetManufacturerDetails',
                params:
                    { ManfactId: null, IsActive:'' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data;
                  
                     SmartAlert.SuccessGrid(response.data.Message);
                }

                else 
                {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }

               
                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }

        $scope.getManufacturerDetails();

        $scope.Edit = function (data)
        {
            $sessionStorage.mData = data;
            $state.go('app.dashboard.manufacture')

        }

});
appdash.controller('ManufactureMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.manufature = {};
    $scope.manufature.IsActive = true;

    if ($sessionStorage.mData != null)
    {

        $scope.manufature = $sessionStorage.mData;

        $sessionStorage.mData = null;

    }
   
$scope.PostmanufatureData = function (valid) {

        if (valid)
        {
            $scope.manufature.UserCode = $sessionStorage.ucode;

            $scope.manufature.Flag = $scope.manufature.ManfactId == null || $scope.manufature.ManfactId == undefined ? 'IN' : 'UP';
            $scope.divshow = false;
            $scope.divhide = true;
         
            $http({
                method: "POST",
                url: uriadmin + 'Master/IUDManufacturer',
                data: $scope.manufature
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    //SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $state.go('app.dashboard.manufacture_grid');
                     
                }
                else
                {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    }

  

});

appdash.controller('PlantMasterGridController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    var valueof = userService.Success('BG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Bank Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns:
                   [
               { columnid: 'PlantId', title: 'Plant Code' },
              { columnid: 'PlantName', title: 'Plant Name' },
              { columnid: 'ManfactId', title: 'Manufacture ID' },
              { columnid: 'ManfactName', title: 'Manufacture Name' },
              { columnid: 'AddressLine1', title: 'AddressLine1' },
              { columnid: 'AddressLine2', title: 'AddressLine1' },
              { columnid: 'AddressLine3', title: 'AddressLine1' },
              { columnid: 'PinCode', title: 'PinCode' },
              { columnid: 'IsActive', title: 'Is Active' },
              

                   ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }
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
              
            { name: 'PlantId', displayName: 'Plant Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PlantName', displayName: 'Plant Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ManfactId', displayName: 'Manufacture ID', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ManfactName', displayName: 'Manufacture Name',  width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AddressLine1', displayName: 'AddressLine1', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AddressLine2', displayName: 'AddressLine2', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'AddressLine3', displayName: 'AddressLine3', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PinCode', displayName: 'PinCode', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active',  width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Edit(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Bank Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.GetPlant = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'master/GetPlantDetails',
                params:
                    { PlantId: null, ManfactId: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;

                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }

                $scope.mystyle.push($scope.mystyle1);
                $sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }

        $scope.GetPlant();
        $scope.Edit = function (data) {
            $sessionStorage.pData = data;
            $state.go('app.dashboard.plant')

        }
    }
});
appdash.controller('PlantMasterController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password, flag) {


    $scope.divshow = true;
    $scope.divhide = false;
    $scope.Plant = {};
    $scope.Plant.IsActive = true;




    $scope.GetManufacturer = function ()
    {

        $http.get(uriadmin + 'master/GetManufacturerDetails?ManfactId=&IsActive=Y')
            .then(function (response) {

                if (response.data.StateCode != 0)
                {
                    $scope.ManufacturerData = response.data.Data;

                } }) }
    $scope.GetManufacturer();


    if ($sessionStorage.pData != null) {

        $scope.plant = $sessionStorage.pData;

        $sessionStorage.pData = null;

    }

    $scope.PostPlantData = function (valid) {

        if (valid) {
            $scope.plant.UserCode = $sessionStorage.ucode;
       
            $scope.plant.Flag = $scope.plant.PlantId == null || $scope.plant.PlantId == undefined ? 'IN' : 'UP';
           
            $scope.divshow = false;
            $scope.divhide = true;

            $http({
                method: "POST",
                url: uriadmin + 'Master/IUDPlant',
                data: $scope.plant
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    //SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $state.go('app.dashboard.plant_grid');

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    }



});

appdash.controller('CylProviderDetailController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, Name, Password) {
    $sessionStorage.CydlProvideData = null;
    var valueof = userService.Success('BG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Cylinder Provider Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
               { columnid: 'ProviderId', title: 'Bank Code' },
              { columnid: 'ProviderName', title: 'Bank Name' },
              //{ columnid: 'AccountNo', title: 'Account No' },
             // { columnid: 'BranchName', title: 'Branch Name' },
              { columnid: 'IsActive', title: 'Is Active' },

            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }
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
            { name: 'ProviderId', displayName: 'Provider Id', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProviderName', displayName: 'Provider Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'AccountType', displayName: 'Account Type', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'AccountNo', displayName: 'Account No', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            //{ name: 'IfscCode', displayName: 'Ifsc Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'BranchName', displayName: 'Branch Name', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.Edit(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "30", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Cylinder Provider Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function ()
        {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };

        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.getCydlProvider = function ()
        {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: urianalysis + 'GoFR/GetProviderDetails',
                params:
                    { IsActive: '' }
            }).then(function (response) {
                if (response.data.StateCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                //$sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                //$sessionStorage.ConsumerwiseData = $scope.gridOptions1.data;
            })
        }
        $scope.getCydlProvider();

        $scope.Edit = function (Data)
        {
            $sessionStorage.CydlProvideData = Data;
            $state.go('app.dashboard.cylinder_providers');
        }
    }
});
appdash.controller('CylProviderController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, urianalysis, Name, Password, flag) {

    $scope.divshow = true;
    $scope.divhide = false;
    $scope.Cydl = {};
    //$scope.cydl.IsActive = 'Y';
    if ($sessionStorage.CydlProvideData != null)
    {
        $scope.Cydl= $sessionStorage.CydlProvideData
      

 }

    $scope.PostCydlProviderData = function (valid, Cydl)
    {

        if (valid && Cydl!=null)
        {
            Cydl.UserCode = $sessionStorage.ucode;

            Cydl.Flag = Cydl.ProviderId == null || Cydl.ProviderId == undefined ? 'IN' : 'UP';

            $scope.divshow = false;
            $scope.divhide = true;

            $http({
                method: "POST",
                url: urianalysis + 'GoFR/IUDCylProvider',
                data: Cydl
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    //SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $state.go('app.dashboard.cylinder_providers_grid');

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
        $sessionStorage.CydlProvideData = null;
    }

});