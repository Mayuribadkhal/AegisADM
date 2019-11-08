appdash.controller('DataMigrationLoghGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('KA');
    $scope.divshow = true;
    $scope.divhide = false;
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
                    title: 'Data Migration Log Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'Status', title: 'Status' },
             { columnid: 'ProcedureName', title: 'Procedure Name' },
             { columnid: 'NoOfRecords', title: 'No. Of Records' },
             { columnid: 'ApiName', title: 'Api Name' },
           

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
        $sessionStorage.CouponCode = null;
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
             { name: 'ID', displayName: 'Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,visible:false },
               { name: 'StatusCode', displayName: 'Status Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Status', displayName: 'Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ProcedureName', displayName: 'Procedure Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'NoOfRecords', displayName: 'No. Of Records', width: "*",cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ApiName', displayName: 'Api Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'CreatedDt', displayName: 'Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },             
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button id="rebtn" class="btn-info btn-xs" ng-show="row.entity.StatusCode==\'0\'" ng-click="grid.appScope.select(row.entity)" data-title="Edit">Re-Process</button> <button ng-show="false" id="rebtn" class="btn-info btn-xs" data-title="Edit"><i class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></i>Wait</button>',
                width: "*"
                , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Data Migration Log Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
       
      
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetSearch = function (valid, distcode) {
            if (valid == true)
            {
                $scope.ans=false;
                $scope.divshow = false;
                $scope.divhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Data/GetDataMigrationLog?ID=&DistCode=' + distcode + '&Status=&ProcedureName')
                .then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.Stylefun();
                    $scope.mystyle.push($scope.mystyle1);
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            }
          
        };
        $scope.select=function(entity)
        {
            $scope.distuser = {};
            $scope.distuser.DistCode = entity.DistCode;
            $scope.distuser.UserCode = $sessionStorage.PUserCode;
            $scope.divshow = false;
            $scope.divhide = true;
       //     $scope.gridOptions1.columnDefs[8].cellTemplate= '<button id="rebtn" class="btn-info btn-xs" data-title="Edit">Wait</button>' ;
            if (entity.ProcedureName == 'uspMigrateBlockSmartCardData') {
    
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigrateBlockSmartCardData',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }
            if(entity.ProcedureName == 'uspMigrateDistUsers')
            {
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigrateDistUsers',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;
                     
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }

            if (entity.ProcedureName == 'uspMigrateIssueSmartCardData') {
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigrateIssueSmartCardData',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }

            if (entity.ProcedureName == 'uspMigrateAdvancePaymentData') {
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigrateAdvancePaymentData',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }
            if (entity.ProcedureName == 'uspMigratePaymentGateWayData') {
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigratePaymentGateWayData',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }


            if (entity.ProcedureName == 'uspMigrateSmsCredentialsData') {
                var json = angular.toJson($scope.distuser)
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
                    url: uriadmin + 'Data/MigrateSmsCredentialsData ',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.divshow = true;
                        $scope.divhide = false;

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            }

        }
           
    }

});