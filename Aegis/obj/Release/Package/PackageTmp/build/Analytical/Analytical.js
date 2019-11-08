appdash.controller('PaymentGatewayGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('EA');
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
                    title: 'All Distributor Payment Gateway Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'DistName', title: 'Distributor Name' },
             { columnid: 'PgDesc', title: 'Pay Gateway Type' },
             { columnid: 'PayModeDesc', title: 'PayMode Type' },
             { columnid: 'Parameter1', title: 'Parameter1' },
             { columnid: 'Parameter2', title: 'Parameter2' },
             { columnid: 'Parameter3', title: 'Parameter3' },
             { columnid: 'Parameter4', title: 'Parameter4' },
             { columnid: 'Parameter5', title: 'Parameter5' },
             { columnid: 'Updatedby', title: 'Updated By' },
             { columnid: 'Updatedt', title: 'Updated Date' },
             { columnid: 'IsActive', title: 'Is Active' }
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
                    10: { cell: { style: 'color:black' } }
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
            { name: 'DistCode', displayName: 'Distributor Code', width: "140", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "320", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayID', displayName: 'Pay Id', cellClass: 'grid-align', width: "60", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'PgDesc', displayName: 'Pay Gateway Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayModeDesc', displayName: 'PayMode Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Parameter1', displayName: 'Parameter1', width: "500", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Parameter2', displayName: 'Parameter2', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Parameter3', displayName: 'Parameter3', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Parameter4', displayName: 'Parameter4', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Parameter5', displayName: 'Parameter5', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Updatedby', displayName: 'Updated By', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Updatedt', displayName: 'Updated Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("All Distributor Payment Gateway Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.divshow = true;
        $scope.divhide = false;
        $scope.GetSearch = function (distcode) {
         //   if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $scope.DistCode = distcode == null ? "" : distcode;
                $http.get(uriadmin + 'Pay/GetDistPGatewayDtls?DistCode=' + $scope.DistCode + '&PayID&PgType&PayModeType&IsActive=Y')
                   .then(function (response) {
                       if (response.data.StatusCode == 1) {
                           $scope.gridOptions1.data = response.data.Data;
                           SmartAlert.Success(response.data.Message);
                       }
                       else {
                           $scope.gridOptions1.data.length = 0;
                           SmartAlert.Errmsg(response.data.Message);
                       }
                       $scope.divshow = true;
                       $scope.divhide = false;
                       $scope.Stylefun();
                       $scope.mystyle.push($scope.mystyle1);
                   });
           // }
        }
          $scope.GetSearch();
    }

});

appdash.controller('DailyTransactionController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $window, $rootScope, $sessionStorage, base64, SmartAlert, flag, Name, Password) {
    var valueof = userService.Success('HB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        document.getElementById('fd').onkeydown = function () { return false; }
        $scope.Date = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.GetSearch = function () {
            if (flag == "H")
                var url = 'http://ezygas.hpcl.co.in/myezygasnew/mail/FormatB.aspx?';
            else {
                var url = '';
            }
            window.open(url + 'Date=' + $scope.Date + '&HsFor=PG&UserCode=120095', '_blank');
        }

    }

});

appdash.controller('DeliveryManwiseGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var valueof = userService.Success('DB');
    $sessionStorage.currentstate = $state.current.name;
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Delivery Man Wise Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'DistName', title: 'Distributor Name' },
             { columnid: 'DManRef', title: 'DeliveryMan Reference No.' },
             { columnid: 'DManName', title: 'Delivery Man Name' },
             { columnid: 'Day_1', title: 'Day_1' },
             { columnid: 'Day_2', title: 'Day_2' },
             { columnid: 'Day_3', title: 'Day_3' },
             { columnid: 'Day_4', title: 'Day_4' },
             { columnid: 'Day_5', title: 'Day_5' },
             { columnid: 'Day_6', title: 'Day_6' },
             { columnid: 'Day_7', title: 'Day_7' },
             { columnid: 'Day_8', title: 'Day_8' },
             { columnid: 'Day_9', title: 'Day_9' },
             { columnid: 'Day_10', title: 'Day_10' },
             { columnid: 'Day_11', title: 'Day_11' },
             { columnid: 'Day_12', title: 'Day_12' },
             { columnid: 'Day_13', title: 'Day_13' },
             { columnid: 'Day_14', title: 'Day_14' },
             { columnid: 'Day_15', title: 'Day_15' },
             { columnid: 'Day_16', title: 'Day_16' },
             { columnid: 'Day_17', title: 'Day_17' },
             { columnid: 'Day_18', title: 'Day_18' },
             { columnid: 'Day_19', title: 'Day_19' },
             { columnid: 'Day_20', title: 'Day_20' },
             { columnid: 'Day_21', title: 'Day_21' },
             { columnid: 'Day_22', title: 'Day_22' },
             { columnid: 'Day_23', title: 'Day_23' },
             { columnid: 'Day_24', title: 'Day_24' },
             { columnid: 'Day_25', title: 'Day_25' },
             { columnid: 'Day_26', title: 'Day_26' },
             { columnid: 'Day_27', title: 'Day_27' },
             { columnid: 'Day_28', title: 'Day_28' },
             { columnid: 'Day_29', title: 'Day_29' },
             { columnid: 'Day_30', title: 'Day_30' },
             { columnid: 'Day_31', title: 'Day_31' },
              { columnid: 'Total', title: 'Total' }
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
                    12: { cell: { style: 'color:black' } },
                    13: { cell: { style: 'color:black' } },
                    14: { cell: { style: 'color:black' } },
                    15: { cell: { style: 'color:black' } },
                    16: { cell: { style: 'color:black' } },
                    17: { cell: { style: 'color:black' } },
                    18: { cell: { style: 'color:black' } },
                    19: { cell: { style: 'color:black' } },
                    20: { cell: { style: 'color:black' } },
                    21: { cell: { style: 'color:black' } },
                    22: { cell: { style: 'color:black' } },
                    23: { cell: { style: 'color:black' } },
                    24: { cell: { style: 'color:black' } },
                    25: { cell: { style: 'color:black' } },
                    26: { cell: { style: 'color:black' } },
                    27: { cell: { style: 'color:black' } },
                    28: { cell: { style: 'color:black' } },
                    29: { cell: { style: 'color:black' } },
                    30: { cell: { style: 'color:black' } },
                    31: { cell: { style: 'color:black' } },
                    32: { cell: { style: 'color:black' } },
                    33: { cell: { style: 'color:black' } },
                    34: { cell: { style: 'color:black' } },
                    35: { cell: { style: 'color:black' } },
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
            { name: 'DistCode', displayName: 'Distributor Code', width: "140", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "320", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DManRef', displayName: 'Delivery Man Reference No.', cellClass: 'grid-align', width: "60", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'DManName', displayName: 'Delivery Man Name', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_1', displayName: 'Day_1', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_2', displayName: 'Day_2', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_3', displayName: 'Day_3', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_4', displayName: 'Day_4', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_5', displayName: 'Day_5', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_6', displayName: 'Day_6', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_7', displayName: 'Day_7', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_8', displayName: 'Day_8', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_9', displayName: 'Day_9', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_10', displayName: 'Day_10', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_11', displayName: 'Day_11', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_12', displayName: 'Day_12', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_13', displayName: 'Day_13', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_14', displayName: 'Day_14', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_15', displayName: 'Day_15', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_16', displayName: 'Day_16', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_17', displayName: 'Day_17', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_18', displayName: 'Day_18', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_19', displayName: 'Day_19', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_20', displayName: 'Day_20', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_21', displayName: 'Day_21', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_22', displayName: 'Day_22', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_23', displayName: 'Day_23', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_24', displayName: 'Day_24', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_25', displayName: 'Day_25', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_26', displayName: 'Day_26', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_27', displayName: 'Day_27', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_28', displayName: 'Day_28', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_29', displayName: 'Day_29', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_30', displayName: 'Day_30', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Day_31', displayName: 'Day_31', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Total', displayName: 'Total', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Delivery Man Wise Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetMonth = [{ Monthcode: '1', Monthname: 'January' }, { Monthcode: '2', Monthname: 'February' }, { Monthcode: '3', Monthname: 'March' }, { Monthcode: '4', Monthname: 'April' }, { Monthcode: '5', Monthname: 'May' }, { Monthcode: '6', Monthname: 'June' }, { Monthcode: '7', Monthname: 'July' }, { Monthcode: '8', Monthname: 'August' }, { Monthcode: '9', Monthname: 'September' }, { Monthcode: '10', Monthname: 'October' }, { Monthcode: '11', Monthname: 'November' }, { Monthcode: '12', Monthname: 'December' }];
        $scope.GetYear = function () {
            var year = new Date().getFullYear();
            var range = [];

            for (var i = 0; i < 8; i++) {
                range.push({
                    label: year - i,
                    value: parseInt(String(year + i).slice(2, 4))
                });
            }

            $scope.years = range;
        }
        $scope.GetYear();
        $scope.divshow = true;
        $scope.GetSearch = function (valid, Delivery, label) {
            if (valid) {
                $scope.divshow = false;
                $scope.Delivery = Delivery;

                if ($scope.Delivery.DistCode == undefined) {
                    $scope.Delivery.DistCode = '';
                }
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

                $http.get(uriadmin + 'Report/GetRefillTransSummaryDmanWiseAdmin?DistCode=' + $scope.Delivery.DistCode + '&Month=' + $scope.Delivery.Monthname + '&Year=' + label + '')
                   .then(function (response) {
                       if (response.data.StatusCode == 1) {
                           $scope.gridOptions1.data = response.data.Data;
                           SmartAlert.Success(response.data.Message);
                       }
                       else {
                           $scope.gridOptions1.data.length = 0;
                           SmartAlert.Errmsg(response.data.Message);
                       }
                       $scope.divshow = true;
                       $scope.Stylefun();
                       $scope.mystyle.push($scope.mystyle1);
                   })
            }
        }
    }
});

appdash.controller('DistWisePDeviceCountController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var valueof = userService.Success('EC');
    $sessionStorage.currentstate = $state.current.name;
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Distributor Wise Payment Device Count Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'DistName', title: 'Distributor Name' },
            { name: 'PgType', displayName: 'Payment Gateway' },
            { name: 'DeviceCount', displayName: 'Device Count' }
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } }

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
            { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PgType', displayName: 'Payment Gateway', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DeviceCount', displayName: 'Device Count', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Distributor_Wise_Payment_Device_Count_Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetSearch = function (valid) {
            if (valid) {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

                $http.get(uriadmin + 'Report/GetDistributorWisePGCount?DistCode=' + $scope.DistCode)
                   .then(function (response) {
                       if (response.data.StatusCode == 1) {
                           $scope.gridOptions1.data = response.data.Data;
                           SmartAlert.Success(response.data.Message);
                       }
                       else {
                           $scope.gridOptions1.data.length = 0;
                           SmartAlert.Errmsg(response.data.Message);
                       }
                       $scope.Stylefun();
                       $scope.mystyle.push($scope.mystyle1);
                   })
            }

        }


    }

});

appdash.controller('TransSummDeliveryManwiseGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
        codeofuser = $sessionStorage.CUserCode;
    }

    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        codeofuser = $sessionStorage.PUserCode;
    }
    var valueof = userService.Success('ED');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var date = 0;
        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:2099",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               maxDate: 0,
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               to.datepicker("option", "maxDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               // minDate: 0,
               maxDate: date,
               dateFormat: "dd-M-yy"
           })
        function getDate(element) {
            date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            var a = date.getMonth();
            date = new Date(new Date(date).setMonth(date.getMonth() + parseInt(5)));
            return date;

        }
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }


        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Transaction Summary Delivery Man Wise Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
                   { columnid: 'DistName', title: 'Distributor Name' },
            { columnid: 'Region', title: 'Region' },
            { columnid: 'HsDesc', title: 'Sales Area' },
            { columnid: 'DManCode', title: 'Delivery Boy Code' },
            { columnid: 'DManName', title: 'Delivery Man Name' },
            { columnid: 'MobileNo', title: 'Mobile No' },
            { columnid: 'TotalDeliveredCount', title: 'Total Delivered Count' },
           // { columnid: 'UnDeliveredCount', title: 'UnDelivered Count' },
            { columnid: 'CashPaymentCount', title: 'Cash Payment Count' },
            { columnid: 'DigitalPaymentCount', title: 'Digital Payment Count' },
            { columnid: 'TotalPayment', title: 'Total Payment Count' },
            { columnid: 'AppBookings', title: 'App Bookings' },
            { columnid: 'NewCards', title: 'New Cards' },

                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } }
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
            { name: 'DistCode', displayName: 'Distributor Code', width: "125", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'Region', displayName: 'Region', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'HsDesc', displayName: 'Sales Area', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DManCode', displayName: 'Dilivery Man Code', width: "60", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'DManName', displayName: 'Delivery Boy Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'MobileNo', displayName: 'Mobile No.', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalDeliveredCount', displayName: 'Total Delivered Count', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'UnDeliveredCount', displayName: 'UnDelivered Count', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CashPaymentCount', displayName: 'Cash Payment Count', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DigitalPaymentCount', displayName: 'Digital Payment Count', width: "125", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalPayment', displayName: 'Total Payment Count', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'AppBookings', displayName: 'App Bookings', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'NewCards', displayName: 'New Cards', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Transaction_Summary_Delivery_Man_Wise_Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.divshow = true;

        $scope.GetRegion = function () {
            $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
            $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Regiondata = response.data.Data;
                    // SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    $scope.Regiondata = [];
                    //  SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.GetRegion();
        $scope.gethierarchy = function () {
            $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
            $scope.RegionId = $scope.RegionId == null ? "" : $scope.RegionId;
            $scope.HsId = $scope.HsId == null ? "" : $scope.HsId;
            $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=' + $scope.RegionId + '&RoleCode=&Level=3&HsFor=' + Hsfor).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Heararchydata = response.data.Data;
                }
                else {
                    $scope.Heararchydata = [];
                    //   SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.gethierarchy();

        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                RegionId = $scope.RegionId == null ? "" : $scope.RegionId;
                HsId = $scope.HsId == null ? "" : $scope.HsId;
                $scope.DistCode = $scope.DistCode != null ? $scope.DistCode : '';
                $http.get(uriadmin + 'Report/AdmnGetRefillTransSummaryDelManWise?DistCode=' + $scope.DistCode + '&FromDate=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&DManCode=&RegionId=' + RegionId + '&HsID=' + HsId)
                   .then(function (response) {
                       if (response.data.StatusCode == 1) {
                           $scope.gridOptions1.data = response.data.Data;
                           SmartAlert.Success(response.data.Message);
                       }
                       else {
                           $scope.gridOptions1.data.length = 0;
                           SmartAlert.Errmsg(response.data.Message);
                       }
                       $scope.divshow = true;
                       $scope.Stylefun();
                       $scope.mystyle.push($scope.mystyle1);
                   })

            }

        }


    }

});

appdash.controller('EzyDeliveryVersionDetController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('EK');
    $sessionStorage.currentstate = $state.current.name;
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.Stylefun = function () {
            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Ezy-Delivery Version Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'DistName', title: 'Distributor Name' },
             { columnid: 'AppVersion', title: 'App Version' },
             { columnid: 'DelBoyCount', title: 'Delivery Boy Count' }
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
            { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AppVersion', displayName: 'App Version', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DelBoyCount', displayName: 'Delivery Boy Count', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Ezy-Delivery Version Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.divhide = true;
        $scope.getEzydeliverDetails = function () {
            $http.get(uriadmin + 'Distributor/GetMobileAppVersionDetails')
               .then(function (response) {
                   if (response.data.StatusCode == 1) {
                       $scope.gridOptions1.data = response.data.Data;
                       SmartAlert.Success(response.data.Message);
                   }
                   else {
                       $scope.gridOptions1.data.length = 0;
                       SmartAlert.Errmsg(response.data.Message);
                   }
                   $scope.divhide = false;
                   $scope.Stylefun();
                   $scope.mystyle.push($scope.mystyle1);

               })
        }
        $scope.getEzydeliverDetails();
    }

});

//REPORT=>TRANSFERRED CONSUMER
appdash.controller('TranseferredConsController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('DJ');
    $sessionStorage.currentstate = $state.current.name;
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
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
            { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Noofconsumers', displayName: 'No Of Consumers', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: true,
            exporterExcelFilename: 'Transeferred Consumers Details.xlsx',
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
                sheet.mergeCells('B1', 'C1');
                var cols = [];
                cols.push({ value: '' });
                cols.push({ value: 'Transeferred Consumers Details', metadata: { style: formatterId.id } });
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
            //gridMenuCustomItems: [{
            //    title: 'Export all data as excel',
            //    action: function ($event) {
            //        alasql('SELECT * INTO XLS("Transeferred Consumers Details",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            //    },
            //    order: 110
            //}]
        };

        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.divhide = false;
        $scope.divshow = true;
        $scope.getConsDetails = function (valid) {
            if (valid) {
                $http.get(uriadmin + 'Report/GetDistTransConsumerCount?DistCode=' + $scope.cons.DistCode)
                   .then(function (response) {
                       if (response.data.StatusCode == 1) {
                           $scope.gridOptions1.data = response.data.Data;
                           SmartAlert.Success(response.data.Message);
                       }
                       else {
                           $scope.gridOptions1.data.length = 0;
                           SmartAlert.Errmsg(response.data.Message);
                       }
                       $scope.divhide = false;
                       //$scope.Stylefun();
                       //$scope.mystyle.push($scope.mystyle1);

                   })
            }
        }
        // $scope.getEzydeliverDetails();
    }

});
