appdash.controller('licensevalidityController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
     if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:2099",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }




        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'License Validity Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                     { columnid: 'RegDate', title: 'Registration Date' },
                     { columnid: 'ActDate', title: 'Activation Date' },
                     { columnid: 'ValidityDays', title: 'Validity Days' },
                     { columnid: 'ExpDate', title: 'Expiry Date' },
                     { columnid: 'Updatedby', title: 'Last Update By' },
                     { columnid: 'UpdateDt', title: 'Last Update Date' }
            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
             { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'RegDate', displayName: 'Registration Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ActDate', displayName: 'Activation Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ValidityDays', displayName: 'Validity Days', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ExpDate', displayName: 'Expiry Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Updatedby', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'LicenseValidityReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "License Validity Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.clear = function () {
            $scope.gridOptions1.data.length = 0;
            // document.getElementById('Dist').disabled = true;
            $scope.DistCode = "";
        }

        $scope.clear1 = function () {
            $scope.gridOptions1.data.length = 0;

            $scope.Fromdate = "";
            $scope.Todate = "";
        }

        $scope.divshow = true;
        $scope.divhide = false;

        $scope.GetLicenseValidityReport = function (Fromdate, Todate, DistCode) {

            $scope.divshow = false;
            $scope.divhide = true;
            if (Fromdate == '' || Fromdate == undefined) {
                $scope.Fdate = '';

            }
            else {
                $scope.Fdate = Fromdate;

            }

            if (Todate == '' || Todate == undefined) {
                $scope.Tdate = '';
            }
            else {
                $scope.Tdate = Todate;

            }


            if ((DistCode != '' || DistCode != undefined) && ($scope.Tdate == '' || $scope.Tdate == undefined) && ($scope.Fdate == '' || $scope.Fdate == undefined)) {
                $scope.DistCode = DistCode;
            }
            else {
                $scope.DistCode = "";

            }
            $http.get(uriadmin + 'Report/GetValidityDetails?DistCode=' + $scope.DistCode + '&FromDate=' + $scope.Fdate + '&ToDate=' + $scope.Tdate).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.Success(response.data.Message);
                    $scope.mystyle.push($scope.mystyle1);
                    document.getElementById('Dist').disabled = false;
                    document.getElementById('fd').disabled = false;
                    document.getElementById('td').disabled = false;
                    if (Todate != null && Fromdate != null && (DistCode == undefined || DistCode == '')) {
                        // $scope.DistCode = "";
                    }
                    else if ((Todate == undefined || Todate == '') && (Fromdate == undefined || Fromdate == '') && (DistCode != '')) {
                        //$scope.Fromdate = "";
                        //$scope.Todate = "";
                    }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    if ((Fromdate == '' || Fromdate == undefined) && (Todate == undefined || Todate == '') && (DistCode == undefined || DistCode == '')) {
                        SmartAlert.Errmsg('Please Select From Date & To Date OR Distributor Code');
                    }
                    else if (Fromdate != null && (Todate == undefined || Todate == '') && (DistCode == undefined || DistCode == '')) {
                        SmartAlert.Errmsg('Please Select To Date');
                    }
                    else if (Todate != null && (Fromdate == undefined || Fromdate == '') && (DistCode == undefined || DistCode == '')) {
                        SmartAlert.Errmsg('Please Select From Date');
                    }
                    else
                        SmartAlert.Errmsg(response.data.Message);


                    document.getElementById('Dist').disabled = false;
                    document.getElementById('fd').disabled = false;
                    document.getElementById('td').disabled = false;
                }
                $scope.divshow = true;
                $scope.divhide = false;
            })

        }
    }



});
appdash.controller('SyncErrorLogController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('DB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }




        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'License Validity Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'MacId', title: 'Mac Id' },
                     { columnid: 'ErrorMessage', title: 'Error Message' },
                     { columnid: 'ErrorSeverity', title: 'Error Severity' },
                     { columnid: 'ErrorNumber', title: 'Error Number' },
                     { columnid: 'ErrorState', title: 'Error State' },
                    { columnid: 'ErrorProcedure', title: 'Error Procedure' },
                   { columnid: 'ProcParameters', title: 'Proccess Parameters' },
                   { columnid: 'ErrorLine', title: 'Error Line' },
                    { columnid: 'ErrorTime', title: 'Error Time' }
            ],
            row: {
            },
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
                9: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
             { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'MacId', displayName: 'Mac Id', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ErrorMessage', displayName: 'Error Message', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ErrorSeverity', displayName: 'Error Severity', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            // { name: 'ErrorNumber', displayName: 'Error Number', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            // { name: 'ErrorState', displayName: 'Error State', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'ErrorProcedure', displayName: 'Error Procedure', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'ProcParameters', displayName: 'Proccess Parameters', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ErrorLine', displayName: 'Error Line', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdatedDt', displayName: 'Error Time', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'LicenseValidityReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "License Validity Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetSyncErrorReport = function (Fromdate, Todate, DistCode) {

            $scope.divshow = false;
            $scope.divhide = true;
            if (DistCode == '' || DistCode == undefined) {

                $scope.DistCode = '';
            }
            else {
                $scope.DistCode = DistCode;

            }
            $http.get(uriadmin + 'Distributor/GetSyncErrorLog?DistCode=' + $scope.DistCode + '&FromDate=' + Fromdate + '&ToDate=' + Todate).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.Success(response.data.Message);
                    $scope.mystyle.push($scope.mystyle1);
                    $scope.DistCode = '';



                }
                else {

                    SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data.length = 0;


                }
                $scope.divshow = true;
                $scope.divhide = false;
            })

        }
    }



});
appdash.controller('ViewHierarchyController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
   if (flagvalue == 'H') {
        $scope.newname = 'Pushpam'
        $scope.hpappli = false;
    }

    var valueof = userService.Success('DC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.Gethierarchy = function (hfor) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'setting/GetHierarchyInfo',
                params:
                    {
                        HsId: null, HsType: null, HsFor: hfor, IsActive: 'Y',

                    }
            }).then(function (response) {
                if (response.data.Data.Table != null || response.data.Data.Table == 0) {
                    $scope.hdetails = response.data.Data.Table;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }

        //document.getElementById('fd').onkeydown = function () { return false; }
        //document.getElementById('td').onkeydown = function () { return false; }

        //$scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //var dateFormat = "dd-M-yy",
        //   from = $("#fd")
        //   .datepicker({
        //       yearRange: "1960:2099",
        //       changeMonth: true,
        //       changeYear: true,
        //       numberOfMonths: 1,
        //       dateFormat: "dd-M-yy"
        //   })
        //   .on("change", function () {
        //       to.datepicker("option", "minDate", getDate(this));
        //   }),
        //   to = $("#td").datepicker({
        //       yearRange: "1960:2099",
        //       defaultDate: "+1w",
        //       changeMonth: true,
        //       numberOfMonths: 1,
        //       minDate: 0,
        //       dateFormat: "dd-M-yy"
        //   })
        //function getDate(element) {
        //    var date;
        //    try {
        //        date = $.datepicker.parseDate(dateFormat, element.value);
        //    } catch (error) {
        //        date = null;
        //    }
        //    return date;
        //}
        //$scope.defaultDate = function (date) {
        //    
        //    $scope.ToDate = date;
        //}




        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'View Hierarchy Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'distcode', title: 'Distributor Code' },
                     { columnid: 'distname', title: 'Distributor Name' },
                     { columnid: 'StateDesc', title: 'State' },
                     { columnid: 'Hierarchy_Code', title: 'Hierarchy Code' },
                     { columnid: 'HsDesc', title: 'Hierarchy' },

            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }

            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
             { name: 'distcode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'distname', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'StateDesc', displayName: 'State', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Hierarchy_Code', displayName: 'Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'HsDesc', displayName: 'Hierarchy', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'View Hierarchy.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "License Validity Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("View Hierarchy Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetViewHierarchyReport = function (valid, Hfor, HId) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                if (Hfor == '' || Hfor == undefined) {

                    SmartAlert.Errmsg('Please Selcet Hierarchy For');
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.gridOptions1.data.length = 0;

                }
                else {

                    if (HId == '' || HId == undefined) {

                        $scope.HsId = '';

                    }
                    else {
                        $scope.HsId = HId;
                    }

                    $http.get(uriadmin + 'Report/GetMyHierarchyStatuswise?HsFor=' + Hfor + '&HsId=' + $scope.HsId).then(function (response) {
                        if (response.data.StatusCode == 1) {
                            $scope.divshow = true;
                            $scope.divhide = false;
                            $scope.gridOptions1.data = response.data.Data;
                            SmartAlert.Success(response.data.Message);
                            $scope.mystyle.push($scope.mystyle1);
                            $scope.DistCode = '';



                        }
                        else {

                            SmartAlert.Errmsg(response.data.Message);
                            $scope.gridOptions1.data.length = 0;
                            $scope.divshow = true;
                            $scope.divhide = false;


                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    })

                }
            }
        }
    }



});
appdash.controller('ConsumerReviewAreawiseController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, urianalysis, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DDC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Startdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Enddate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
               maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Consumer Review Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'ConsumerNo', title: 'Consumer No' },
                     { columnid: 'ConsumerName', title: 'Consumer Name' },
                     { columnid: 'CashMemoNo', title: 'CashMemo No' },
                     { columnid: 'AreaName', title: 'Area Name' },
                     { columnid: 'Delivery Boy Name', title: 'Delivery Boy Name' },
                       { columnid: 'Comment', title: 'Comment' },

            ],

            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }

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
             { name: 'ConsumerNo', displayName: 'Consumer No', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ConsumerName', displayName: 'Consumer Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CashMemoNo', displayName: 'CashMemo No', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AreaName', displayName: 'Area Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Delivery Boy Name', displayName: 'Delivery Boy', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Comment', displayName: 'Comment', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'View Hierarchy.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "License Validity Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Consumer Review Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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



        $scope.GetAreawiseFeedback = function (valid, DistCode, AreaCode, delboycode, Startdate, Enddate) {
            if (valid) {
                if (AreaCode == undefined || AreaCode == '')
                    AreaCode = null;
                else
                    AreaCode = AreaCode;
                if (delboycode == undefined || delboycode == '')
                    delboycode = null;
                else
                    delboycode = delboycode;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Feedback/GetFeedbackAreaWiseAndDelboyWise',
                    params:
                        {
                            distCode: DistCode, AreaCode: null, delboycode: null, Startdate: Startdate, Enddate: Enddate
                        }
                }).then(function (response) {

                    if (response.data.Data != null || response.data.Data == 0) {

                        if ($sessionStorage.mflag == 'CA')
                            SmartAlert.SuccessGrid(response.data.Message);
                        $sessionStorage.grddata = response.data.Data;
                        $scope.gridOptions1.data = $sessionStorage.grddata;
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

        }




    }
});
appdash.controller('consumerReviewBoywiseCtrl', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, urianalysis, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }

    var valueof = userService.Success('DDE');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Delivery Boy Wise Consumer Review Summary',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistributorCode', title: 'Distributor Code' },
                     { columnid: 'Del Boy Code', title: 'Delivery Boy Code' },
                     { columnid: 'Delivery Boy Name', title: 'Delivery Boy Name' },
                     { columnid: 'Count', title: 'Count' }

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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Startdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }
        $scope.GetDetails = function (valid, DistCode, Startdate, EndDate) {

            if (valid == true) {


                //$scope.divshow = false;
                //$scope.divhide = true;
                //$sessionStorage.ConsFromDate = Startdate;
                //$sessionStorage.ConsToDate = EndDate;

                if (Startdate == '' || Startdate == undefined) {
                    Startdate = '';

                } else {
                    Startdate = Startdate;
                }
                if (EndDate == '' || EndDate == undefined) {
                    EndDate = '';

                } else {
                    EndDate = EndDate;
                }


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Feedback/GetFeedbackDelboywiseSummary?distCode=' + DistCode + '&Startdate=' + Startdate + '&EndDate=' + EndDate
                    //params: { DistCode: $scope.DistCode, Consno: Consno, Startdate: Startdate, Enddate: EndDate }
                }).then(function (response) {

                    if (response.data.Data != null || response.data.Data == 0) {

                        if ($sessionStorage.mflag == 'CDS')
                            SmartAlert.SuccessGrid(response.data.Message);
                        $sessionStorage.grddata = response.data.Data;
                        $scope.gridOptions1.data = $sessionStorage.grddata;
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

        }

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
            { name: 'DistributorCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Del Boy Code', displayName: 'Delivery Boy Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Delivery Boy Name', displayName: 'Delivery Boy Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Count', displayName: 'Count', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Delivery Boy Wise Consumer Review Summary.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
    }
});
appdash.controller('consumerNumberwiseReviewCtrl', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, urianalysis, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('DDB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Consumer Number Wise Review Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [


                     { columnid: 'ConsumerNo', title: 'Consumer Number' },
                     { columnid: 'ConsumerName', title: 'Consumer Name' },
                     { columnid: 'CashMemoNo', title: 'Cash Memo No' },

                    // { columnid: 'UniqueConsumerId', title: 'Unique Consumer Id' },
                     { columnid: 'ConsumerAddress', title: 'Consumer Address' },
                    { columnid: 'Refill Booking Exp', title: 'Refill Booking Experience' },
                   { columnid: 'Timely Delivery', title: 'Timely Delivery' },
                   { columnid: 'Q and Q', title: 'Quantity & Quality' },
                    { columnid: 'Refill Delivery Exp', title: 'Refill Delivery Experience' },
                    { columnid: 'Billing and Payment Exp', title: 'Billing and Payment Experience' },
                    { columnid: 'Comment', title: 'Feedback' }
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

            }
        };
        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Startdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var dateFormat = "dd-M-yy",
          from = $("#fd")
          .datepicker({
              yearRange: "1960:2099",
              changeMonth: true,
              changeYear: true,
              maxDate: 0,
              numberOfMonths: 1,

              dateFormat: "dd-M-yy"
          })
          .on("change", function () {
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }
        $scope.GetDetails = function (valid, DistCode, Consno, Startdate, EndDate) {
            if (valid == true) {

                //$scope.divshow = false;
                //$scope.divhide = true;
                //$sessionStorage.ConsFromDate = Startdate;
                //$sessionStorage.ConsToDate = EndDate;
                if (Consno == '' || Consno == undefined) {
                    Consno = '';

                } else {
                    Consno = Consno;
                }
                if (Startdate == '' || Startdate == undefined) {
                    Startdate = '';

                } else {
                    Startdate = Startdate;
                }
                if (EndDate == '' || EndDate == undefined) {
                    EndDate = '';

                } else {
                    EndDate = EndDate;
                }


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Feedback/GetFeedback?DistCode=' + DistCode + '&Consno=' + Consno + '&Startdate=' + Startdate + '&EndDate=' + EndDate
                    //params: { DistCode: $scope.DistCode, Consno: Consno, Startdate: Startdate, Enddate: EndDate }
                }).then(function (response) {

                    if (response.data.Data != null || response.data.Data == 0) {

                        if ($sessionStorage.mflag == 'CF')
                            SmartAlert.SuccessGrid(response.data.Message);
                        $sessionStorage.grddata = response.data.Data;
                        $scope.gridOptions1.data = $sessionStorage.grddata;
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

        }

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
            { name: 'Id', displayName: 'Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

            { name: 'ConsumerNo', displayName: 'Consumer No.', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ConsumerName', displayName: 'Consumer Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CashMemoNo', displayName: 'Cash Memo No', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            //{ name: 'UniqueConsumerId', displayName: 'Unique Consumer Id', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ConsumerAddress', displayName: 'Consumer Address', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Refill Booking Exp', displayName: 'Refill Booking Experience', cellClass: 'grid-align', width: "270", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Timely Delivery', displayName: 'Timely Delivery', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Q and Q', displayName: 'Quantity & Quality', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Refill Delivery Exp', displayName: 'Refill Delivery Experience', cellClass: 'grid-align', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Billing and Payment Exp', displayName: 'Billing and Payment Experience', cellClass: 'grid-align', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Comment', displayName: 'Feedback', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },


            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Consumer Number Wise Review Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
    }
});
appdash.controller('consumerReviewAreaCtrl', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, urianalysis, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DDD');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Area Wise Consumer Review Summary',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistributorCode', title: 'Distributor Code' },
                     { columnid: 'AreaName', title: 'Area Name' },
                     { columnid: 'Count', title: 'Count' }

            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },

            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
        };

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Area Wise Consumer Review Summary',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'DistributorCode', title: 'Distributor Code' },
                     { columnid: 'AreaName', title: 'Area Name' },
                     { columnid: 'Count', title: 'Count' }
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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Startdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }

        $scope.GetDetails = function (valid, DistCode, Startdate, EndDate) {

            if (valid == true) {


                //$scope.divshow = false;
                //$scope.divhide = true;
                //$sessionStorage.ConsFromDate = Startdate;
                //$sessionStorage.ConsToDate = EndDate;

                if (Startdate == '' || Startdate == undefined) {
                    Startdate = '';

                } else {
                    Startdate = Startdate;
                }
                if (EndDate == '' || EndDate == undefined) {
                    EndDate = '';

                } else {
                    EndDate = EndDate;
                }


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Feedback/GetFeedbackAreaWiseSummary?distCode=' + DistCode + '&Startdate=' + Startdate + '&EndDate=' + EndDate
                    //params: { DistCode: $scope.DistCode, Consno: Consno, Startdate: Startdate, Enddate: EndDate }
                }).then(function (response) {

                    if (response.data.Data != null || response.data.Data == 0) {

                        if ($sessionStorage.mflag == 'CAS')
                            SmartAlert.SuccessGrid(response.data.Message);
                        $sessionStorage.grddata = response.data.Data;
                        $scope.gridOptions1.data = $sessionStorage.grddata;
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

        }

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
            { name: 'DistributorCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AreaName', displayName: 'Area Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Count', displayName: 'Count', width: "*", cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Area Wise Consumer Review Summary.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
    }

});
appdash.controller('DistributorWiseFeedbackReport', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, urianalysis, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DDA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Distributor Wise Review Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'Distributor Name', title: 'Distributor Name' },
             //{ columnid: 'Count', title: 'Count' },
             { columnid: 'Feedback Count', title: 'Feedback Count' },
             { columnid: 'Link Sent Count', title: 'Link Sent Count' },
            ],
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                // 3: { cell: { style: 'color:black' } },
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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Startdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }

        $scope.GetDetails = function (valid, DistCode, Startdate, EndDate) {

            if (valid == true) {


                //$scope.divshow = false;
                //$scope.divhide = true;
                //$sessionStorage.ConsFromDate = Startdate;
                //$sessionStorage.ConsToDate = EndDate;

                if (Startdate == '' || Startdate == undefined) {
                    Startdate = '';

                } else {
                    Startdate = Startdate;
                }
                if (EndDate == '' || EndDate == undefined) {
                    EndDate = '';

                } else {
                    EndDate = EndDate;
                }


                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Feedback/GetFeedbackDistWiseSummary?DistCode=' + DistCode + '&Startdate=' + Startdate + '&EndDate=' + EndDate

                    //params: { DistCode: $scope.DistCode, Consno: Consno, Startdate: Startdate, Enddate: EndDate }
                }).then(function (response) {

                    if (response.data.Data != null || response.data.Data == 0) {

                        if ($sessionStorage.mflag == 'CAS')
                            SmartAlert.SuccessGrid(response.data.Message);
                        $sessionStorage.grddata = response.data.Data;
                        $scope.gridOptions1.data = $sessionStorage.grddata;
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

        }

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

            { name: 'Distributor Name', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'Count', displayName: 'Count', width: "*", cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Feedback Count', displayName: 'Feedback Count', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Link Sent Count', displayName: 'Link Sent Count', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },


            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Distributor Wise Review Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
    }

});
appdash.controller('GetOPFDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, imageurl, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DED');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'OPF Details Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                      { columnid: 'OrderNo', title: 'Order No' },
                       { columnid: 'OrderDt', title: 'Order Date' },
                     { columnid: 'OpfNo', title: 'OPF No.' },
                     { columnid: 'OpfDate', title: 'OPF Date' },
                   //  { columnid: 'Count', title: 'Count' },
                      { columnid: 'VerifyDt', title: 'Verify Date' },
                     { columnid: 'TallyBillNo', title: 'Tally Bill No' },
                     { columnid: 'TallyBillDt', title: 'Tally Bill Date' },
                      { columnid: 'TallyAmount', title: 'Tally Amount' },
                       { columnid: 'Updatedby', title: 'Last Updated By' },
                      { columnid: 'UpdateDt', title: 'Last Update Date' },


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
                //  9: { cell: { style: 'color:black' } },
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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }

        $scope.GetDetails = function (DistCode, Startdate, EndDate, OpfNo) {

            if (Startdate == '' || Startdate == undefined) {
                Startdate = '';

            } else {
                Startdate = Startdate;
            }
            if (OpfNo == '' || OpfNo == undefined) {
                OpfNo = '';

            } else {
                OpfNo = OpfNo;
            }
            if (DistCode == '' || DistCode == undefined) {
                DistCode = '';

            } else {
                DistCode = DistCode;
            }
            if (EndDate == '' || EndDate == undefined) {
                EndDate = '';

            } else {
                EndDate = EndDate;
            }
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'report/GetOPFDetails?OpfNo=' + OpfNo + '&OrderNo=&DistCode=' + DistCode + '&IsVerify=&FromDate=' + Startdate + '&ToDate=' + EndDate
                //params: { DistCode: $scope.DistCode, Consno: Consno, Startdate: Startdate, Enddate: EndDate }
            }).then(function (response) {

                if (response.data.Data != null || response.data.Data == 0) {

                    if ($sessionStorage.mflag == 'CAS')
                        SmartAlert.SuccessGrid(response.data.Message);
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
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
            { name: 'opfDownLoad', displayName: 'DownLoad', headerCellTemplate: '<div>OPF Download</div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.OrderNo,row.entity.OrderCode,row.entity.OpfNo)" data-title="Edit"><span class="glyphicon glyphicon-download-alt"></span></button>', width: "70", enableFiltering: false, },
            { name: 'InvcDownLoad', displayName: 'InvcDownLoad', headerCellTemplate: '<div>Invioce Download</div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.invcDownload(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-download-alt"> </span></button>', width: "70", enableFiltering: false, },
            { name: 'DistCode', displayName: 'Distributor Code', width: "140", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "320", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderNo', displayName: 'Order No', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderCode', displayName: 'OrderCode', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'OrderDt', displayName: 'Order Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OpfNo', displayName: 'OPF No', width: "170", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OpfDate', displayName: 'OPF Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'VerifyDt', displayName: 'Verify Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TallyBillNo', displayName: 'Tally Bill No.', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'TallyBillDt', displayName: 'TallyBill Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'TallyAmount', displayName: 'Tally Amount', width: "150", cellTooltip: true, cellFilter: 'number:2', cellClass: 'grid-align', visible: false, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("OPF Details Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.select = function (Distcode, OrderNo, OrderCode, OpfNo) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'OPF/CallGenOPF?OrderNo=' + OrderNo + '&DistCode=' + Distcode + '&OrderCode=' + OrderCode + '&OPFNo=' + OpfNo
            }).then(function (response) {

                if (response.data.Message != null || response.data.Message == 0) {
                    $scope.FileName = response.data.Message;
                    //var f = $scope.FileName.substr(0, $scope.FileName.lastIndexOf('.'));
                    //var ext = $scope.FileName.substr(0, $scope.FileName.lastIndexOf('.'));
                    window.open(uripdf + $scope.FileName, '_blank');
                    //window.location = uripdf + $scope.FileName;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }

            })
        }

        $scope.invcDownload = function (data) {
            if (data.InvoiceFile != null)
                window.open(imageurl + 'Invoice/' + data.InvoiceFile);
            else
                SmartAlert.Errmsg('File not available');
        };
    }

});
appdash.controller('OrderDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DEA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Order Report',
            },
            columns: [
                      { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'DistName', title: 'Distributor Name' },
                       { columnid: 'OrderNo', title: 'Order No.' },
                      { columnid: 'OrderDt', title: 'Order Date' },
                      { columnid: 'PayMode', title: 'PayModeDesc' },
                      { columnid: 'OrgAmount', title: 'Original Amount' },
                      { columnid: 'TranDate', title: 'Transaction Date' },
                      { columnid: 'TranAmt', title: 'Transaction Amount' },
                      { columnid: 'TaxPer', title: 'Tax(%)' },
                      { columnid: 'BankName', title: 'Bank' },
                      { columnid: 'IsPaymentVerify', title: 'Payment Verify' },
                      { columnid: 'VerifyDate', title: 'Verify Date' },
                      { columnid: 'VerifyAmt', title: 'Verify Amount' },
                      { columnid: 'DiffAmt', title: 'Amount Difference' },
                      { columnid: 'OrdGrandTotal', title: 'Grand Total' },
                       { columnid: 'PayGrandTotal', title: 'Pay Grand Total' },
                       { columnid: 'UpdatedbyName', title: 'Last Updated By' },
                      { columnid: 'UpdateDt', title: 'Last Updated Date' },
                      { columnid: 'Remark', title: 'Remark' }
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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromOrdDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToOrdDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



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
                    name: 'View', displayName: 'View', headerCellTemplate: '<div></div>',
                    cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.OrderNo)" data-title="Edit">View</button>',
                    width: "50"
               , enableFiltering: false,
                },
          { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistName', displayName: 'Distributor Name', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderNo', displayName: 'Order No', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderDt', displayName: 'Order Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrgAmount', displayName: 'Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
          { name: 'PayMode', displayName: 'PayMode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          { name: 'TranCharges', displayName: 'Transaction Charges', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          { name: 'IsPaymentVerify', displayName: 'Payment Verify', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
           { name: 'UpdatedbyName', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'UpdateDt', displayName: 'Last Updated Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Remark', displayName: 'Remark', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Order Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.select = function (DistCode, OrderNo) {

            $sessionStorage.DCode = DistCode;

            $sessionStorage.OrderNo = OrderNo;


            $state.go('app.dashboard.order_in_report');
        }

        $scope.GetSearch = function (valid, DistCode, FromDate, ToDate, OrderStatus, Region) {

            if (valid) {
                $scope.divshow = true;
                $scope.divhide = false;
                if (DistCode == '' || DistCode == undefined)
                    DistCode = ''
                else
                    DistCode == DistCode;
                if (FromDate == '' || FromDate == undefined)
                    FromDate = ''
                else
                    FromDate == FromDate;
                if (ToDate == '' || ToDate == undefined)
                    ToDate = ''
                else
                    ToDate == ToDate;
                if (OrderStatus == '' || OrderStatus == undefined)
                    OrderStatus = ''
                else
                    OrderStatus == OrderStatus;
                //if (OrderStage == '' || OrderStage == undefined)
                //    OrderStage = ''
                //else
                //    OrderStage == OrderStage;
                if (Region == '' || Region == undefined)
                    Region = ''
                else
                    Region == Region;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=Y&IsPaymentVerify=&OrderStatus=' + OrderStatus + '&OrderStage=&Region=' + Region)
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            $scope.gridOptions1.data = response.data.Data;
                            //if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                            //}
                        }
                        else {
                            $scope.gridOptions1.data.length = 0;
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $sessionStorage.mflag == null;
                        $scope.mystyle.push($scope.mystyle1);
                    })
            };
        }


    }

});
appdash.controller('OrderInDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password) {

    $scope.mystyle1 = {
        headers: true,
        style: 'font-size:19px;color:black',
        caption: {
            title: 'Order Details Report',
        },
        columns: [
                  { columnid: 'DistCode', title: 'Distributor Code' },
                  { columnid: 'DistName', title: 'Distributor Name' },
                  { columnid: 'OrderNo', title: 'Order No.' },
                  { columnid: 'OrderDt', title: 'Order Date' },
                  { columnid: 'ProductDesc', title: 'Product Description' },
                  { columnid: 'ProdRate', title: 'Product Rate' },
                  { columnid: 'ProdAmt', title: 'Product Amount' },
                  { columnid: 'tax', title: 'Tax' },
                  { columnid: 'TranCharges', title: 'Transaction Charges' },
                  { columnid: 'CouponCode', title: 'Coupon Code' },
                  { columnid: 'DiscountAmt', title: 'Discount Amount' },
                  { columnid: 'GrandTotal', title: 'GrandTotal' },


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



    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];

    document.getElementById('fd').onkeydown = function () { return false; }
    document.getElementById('td').onkeydown = function () { return false; }

    $scope.FromOrdDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.ToOrdDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
          to.datepicker("option", "minDate", getDate(this));
      }),
      to = $("#td").datepicker({
          yearRange: "1960:2099",
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1,
          minDate: 0,
          maxDate: 0,
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
    $scope.defaultDate = function (date) {

        $scope.ToDate = date;
    }



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

      //{ name: 'DistCode', displayName: 'Distributor Code', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      //{ name: 'DistName', displayName: 'Distributor Name', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'OrderNo', displayName: 'Order No', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'OrderDt', displayName: 'Order Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'ProductDesc', displayName: 'Product Description', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'ProdRate', displayName: 'Product Rate', width: "150", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
      { name: 'ProdAmt', displayName: 'Product Amount', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
      { name: 'IgstAmt', displayName: 'IGST Amt', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
       { name: 'CgstAmt', displayName: 'CGST Amt', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
        { name: 'SgstAmt', displayName: 'SGST Amt', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
      { name: 'TranCharges', displayName: 'Transaction Charges', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
      { name: 'CouponCode', displayName: 'Coupon Code', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
    { name: 'DiscountAmt', displayName: 'Discount Amt', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
    { name: 'GrandTotal', displayName: 'Grand Total', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },


       ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false,
        exporterCsvFilename: 'ConusmerFeedbackReport.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
            title: 'Export all data as excel',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Order Details Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


    $scope.GetSearch = function () {
        $scope.divshow = true;
        $scope.divhide = false;


        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Distributor/GetPlaceOrderDetails?OrderNo=' + $sessionStorage.OrderNo + '&DistCode=' + $sessionStorage.DCode + '&ProdCode=&ProdName= &FromOrdDate=&ToOrdDate=&IsActive')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.gridOptions1.data = response.data.Data;
                    //if ($sessionStorage.mflag == 'VP') {
                    SmartAlert.SuccessGrid(response.data.Message);
                    //}
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;

                $scope.mystyle.push($scope.mystyle1);
            })
    };
    $scope.GetSearch();

    $scope.clear1 = function () {
        $sessionStorage.OrderNo = null;
        $sessionStorage.DCode = null;
    }
});
appdash.controller('PaymentDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DEB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Payment Details Report',
            },
            columns: [
                      { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'DistName', title: 'Distributor Name' },
                      { columnid: 'OrderNo', title: 'Order No.' },
                      { columnid: 'OrderDt', title: 'Order Date' },
                      { columnid: 'PaymentDate', title: 'Payment Verify Date' },
                      { columnid: 'TranRefNo', title: 'Transaction Reference No.' },
                      { columnid: 'ProdName', title: 'Product' },
                      { columnid: 'ProdQty', title: 'Quantity' },
                      { columnid: 'TranAmt', title: 'Amount' },
                     { columnid: 'Updatedby', title: 'Approved By' },
                     { columnid: 'Remark', title: 'Approval Remarks' }
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



        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



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

          { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistName', displayName: 'Distributor Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderNo', displayName: 'Order No', width: "140", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         // { name: 'OrderDt', displayName: 'Order Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'PaymentDate', displayName: 'Payment Verify Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         // { name: 'TranDate', displayName: 'Transaction Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'TranRefNo', displayName: 'Transaction Reference No.', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'ProdName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'ProdQty', displayName: 'Quantity', width: "100", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
          { name: 'TranAmt', displayName: 'Amount', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
          //{ name: 'VerifyAmt', displayName: 'Verified Amt.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
           { name: 'Updatedby', displayName: 'Approved By', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Remark', displayName: 'Approval Remarks', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        //  { name: 'PayType', displayName: 'Pay Type', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //  { name: 'TaxAmt', displayName: 'Tax Amt.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },

        //{ name: 'DiffAmt', displayName: 'Different Amt.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', cellClass: 'grid-align' },
        // { name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //  { name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Payment Details Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.GetSearch = function (DistCode, FromDate, ToDate) {
            $scope.divshow = true;
            $scope.divhide = false;
            if (DistCode == '' || DistCode == undefined)
                DistCode = ''
            else
                DistCode == DistCode;
            if (FromDate == '' || FromDate == undefined)
                FromDate = ''
            else
                FromDate == FromDate;
            if (ToDate == '' || ToDate == undefined)
                ToDate = ''
            else
                ToDate == ToDate;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetTMyPaymentdetails?DistCode=' + DistCode + '&BankNameName=&FromDate=' + FromDate + '&ToDate=' + ToDate + '&IsActive=&IsPaymentVerify')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        //if ($sessionStorage.mflag == 'VP') {
                        SmartAlert.SuccessGrid(response.data.Message);
                        //}
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;

                    $scope.mystyle.push($scope.mystyle1);
                })
        };


        $scope.clear1 = function () {
            $sessionStorage.OrderNo = null;
            $sessionStorage.DCode = null;
        }
    }
});
appdash.controller('OutwardDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DEC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Outward Details Report',
            },
            columns: [
                      { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'DistName', title: 'Distributor Name' },
                      { columnid: 'OrderNo', title: 'Order No.' },
                      { columnid: 'OrderDt', title: 'Order Date' },
                      { columnid: 'OutwardDate', title: 'Outward Date' },

                      { columnid: 'ProdName', title: 'ProdName' },
                      { columnid: 'ProdQty', title: 'ProdQty' },
                      { columnid: 'ProdSrNo', title: 'Serial No. From' },
                      { columnid: 'ProdSrTo', title: 'Serial No. To' },
                      { columnid: 'AcceptDt', title: 'Accepted Date' },
                       { columnid: 'Updatedby', title: 'Last Updated By' },
                      { columnid: 'UpdateDt', title: 'Last Update Date' },
                      { columnid: 'Remark', title: 'Remark' }


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



        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.mystyle = [];

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



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

          { name: 'DistCode', displayName: 'Distributor Code', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'DistName', displayName: 'Distributor Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderNo', displayName: 'Order No', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'OrderDt', displayName: 'Order Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OutwardDate', displayName: 'Outward Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ProdName', displayName: 'Product Name', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'ProdQty', displayName: 'Product Qty.', width: "130", cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'ProdSrNo', displayName: 'Serial no. From', width: "180", cellClass: 'grid-align', number: "2", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'ProdSrTo', displayName: 'Serial no. To', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'AcceptDt', displayName: 'Accepted Date.', width: "140", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Remark', displayName: 'Remark', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,

            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Outward Details Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.GetSearch = function (DistCode, FromDate, ToDate) {
            $scope.divshow = true;
            $scope.divhide = false;
            if (DistCode == '' || DistCode == undefined)
                DistCode = ''
            else
                DistCode == DistCode;
            if (FromDate == '' || FromDate == undefined)
                FromDate = ''
            else
                FromDate == FromDate;
            if (ToDate == '' || ToDate == undefined)
                ToDate = ''
            else
                ToDate == ToDate;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetOutwardInfo?OrderCode=&DistCode=' + DistCode + '&ProdCode=&ProdName= &FromDate=' + FromDate + '&ToDate=' + ToDate + '&IsAccept= ')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        //if ($sessionStorage.mflag == 'VP') {
                        SmartAlert.SuccessGrid(response.data.Message);
                        //}
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;

                    $scope.mystyle.push($scope.mystyle1);
                })
        };

    }

});
appdash.controller('DispatchDetailsController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DEE');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Dispatch Details Report',
            },
            columns: [
                      { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'DistName', title: 'Distributor Name' },
                      { columnid: 'OrderNo', title: 'Order No.' },
                      { columnid: 'OrgAmount', title: 'Original Amount' },
                      { columnid: 'DocketNo', title: 'Docket No' },

                      { columnid: 'TransportDesc', title: 'Transport' },
                      { columnid: 'DelvDistAddress', title: 'Delivery Address' },
                      { columnid: 'DispatchDate', title: 'Dispatch Date' },
                      { columnid: 'ReachDate', title: 'Reach Date' },
                      { columnid: 'Updatedby', title: 'Last Updated By' },
                      { columnid: 'UpdateDt', title: 'Last Update Date' },
                { columnid: 'DisRemark', title: 'Remark' }



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

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



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

          { name: 'DistCode', displayName: 'Distributor Code', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderNo', displayName: 'Order No', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrgAmount', displayName: 'Original Amount', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align', cellFilter: 'number:2' },

          { name: 'DocketNo', displayName: 'Docket No', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

          { name: 'TransportDesc', displayName: 'Transport Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

          { name: 'DelvDistAddress', displayName: 'Delivery Address', width: "210", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'DispatchDate', displayName: 'Dispatch Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'ReachDate', displayName: 'Reach Date', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
          { name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'DisRemark', displayName: 'Remark', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'ConusmerFeedbackReport.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Conusmer Feedback Report(Consumer No. :  " + $sessionStorage.ConsNo + ")", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Dispatch Details Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.GetSearch = function (DistCode, FromDate, ToDate) {


            $scope.divshow = true;
            $scope.divhide = false;
            if (DistCode == '' || DistCode == undefined)
                DistCode = ''
            else
                DistCode == DistCode;
            if (FromDate == '' || FromDate == undefined)
                FromDate = ''
            else
                FromDate == FromDate;
            if (ToDate == '' || ToDate == undefined)
                ToDate = ''
            else
                ToDate == ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=&IsPaymentVerify=&OrderStatus=&OrderStage=DI')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        //if ($sessionStorage.mflag == 'VP') {
                        SmartAlert.SuccessGrid(response.data.Message);
                        //}
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;

                    $scope.mystyle.push($scope.mystyle1);
                })
        };
    }



});
appdash.controller('InwardProductReportController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password) {
    var valueof = userService.Success('DEF');
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
                    title: 'Inward Product Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                      { columnid: 'InwardDate', title: 'Inward Date' },
                       { columnid: 'DocRefCode', title: 'Documnet Reference Code' },
                      { columnid: 'DocRefDate', title: 'Documnet Reference Date' },
                       { columnid: 'BatchCode', title: 'Batch Code' },
                      { columnid: 'ProdName', title: 'Product Name' },
                      { columnid: 'ProdQty', title: 'Product Quantity' },
                      { columnid: 'ProdSrNo', title: 'Product Serial Number From' },
                      { columnid: 'ProdSrTo', title: 'Product Serial Number To' },
                      { columnid: 'Updatedby', title: 'Last Updated By' },
                      { columnid: 'UpdateDt', title: 'Last Update Date' },
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
                },

            };
            $scope.mystyle = [];
        }
        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:2099",
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 1,
              minDate: 0,
              maxDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
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

            { name: 'InwardCode', displayName: 'Inward Code', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'InwardDate', displayName: 'Inward Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DocRefCode', displayName: 'Documnet Reference Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'DocRefDate', displayName: 'Documnet Reference Date', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
           // { name: 'BatchCode', displayName: 'Batch Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdName', displayName: 'Product Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Product Quantity', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrNo', displayName: 'Product Serial No. From', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrTo', displayName: 'Product Serial No. To', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'Inward Product Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Inward Product Report", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Inward Product Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetSearch = function (FromDate, ToDate) {
            $scope.divshow = false;
            $scope.divhide = true;
            if (FromDate == '' || FromDate == undefined)
                FromDate = ''
            else
                FromDate == FromDate;
            if (ToDate == '' || ToDate == undefined)
                ToDate = ''
            else
                ToDate == ToDate;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetInwardInfo?InwardCode=&ProdCode=&BatchCode=&IsActive=&FromDate=' + FromDate + '&ToDate=' + ToDate)
            .then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {

                    $scope.gridOptions1.data = response.data.Data;

                    SmartAlert.SuccessGrid(response.data.Message);

                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
                $sessionStorage.mflag == null;
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);
            })
        };



    }
});
appdash.controller('UserAuthenticationController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('DF');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Distributor Authentication Code Details',
            },
            columns: [
                      { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'DistName', title: 'Distributor Name' },
                      { columnid: 'AuthCode', title: 'Authentication Code' },
                      { columnid: 'IsActive', title: 'Is Active' }



            ],

            rows: {

                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3.: { cell: { style: 'color:black' } }


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
                    { name: 'DistCode', displayName: 'Distributor Code', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'DistName', displayName: 'Distributor Name', width: "600", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'AuthCode', displayName: 'Authentication Code', width: "300", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'IsActive', displayName: 'Is Active', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Distributor Authentication Code Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.GetSearch = function (valid, DistCode, FromDate, ToDate) {

            if (valid) {
                $scope.divshow = true;
                $scope.divhide = false;
                if (DistCode == '' || DistCode == undefined)
                    DistCode = ''

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Report/GettblMDistAuthenticationRpt?DistCode=' + DistCode + '&IsActive=Y' + '&FromDate=&ToDate=')
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            $scope.gridOptions1.data = response.data.Data;
                            //if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                            //}
                        }
                        else {
                            $scope.gridOptions1.data.length = 0;
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $sessionStorage.mflag == null;
                        $scope.mystyle.push($scope.mystyle1);
                    })
            };
        }


    }

});
appdash.controller('AuthenticationController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.submit = 'Submit';
    $scope.SaveDetails = function (valid, Auth) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.Auth = Auth;
            $scope.Auth.DistCode = $scope.Auth.DistCode;
            $scope.Auth.UserCode = $sessionStorage.ucode;
            $scope.Auth.flag = "IN";
            $scope.Auth.IsActive = 'Y';
            var json = angular.toJson($scope.Auth)
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $scope.getAuth();



        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Report/PostDistAuthenticationCode',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.user_authentication');
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
        $scope.Auth.DistCode = '';

    }

});
appdash.controller('RefillDeliveryCountReportController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password) {
    var valueof = userService.Success('DGA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        var codeofuser = "";
        if ($sessionStorage.CUserCode != null) {
            var Hsfor = 'CO';
            codeofuser = $sessionStorage.CUserCode;
        }
        else if ($sessionStorage.PUserCode != null) {
            var Hsfor = 'PG';
            codeofuser = $sessionStorage.PUserCode;
        }
        $(document).ready(function () {
            $('#txtDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'MM yy',

                onClose: function () {
                    var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                },

                beforeShow: function () {
                    if ((selDate = $(this).val()).length > 0) {
                        iYear = selDate.substring(selDate.length - 4, selDate.length);
                        iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                        $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                    }
                }
            });
        });
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            enableSelectAll: false,
            columnDefs: [
                      { name: 'ZoneId', displayName: 'Zone Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                         { name: 'RegionId', displayName: 'Region Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                    {
                        name: 'distcode', displayName: 'Distributor Code', width: "130", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                    },
                    { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Refill Delivery Count Report.xlsx',
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
                cols.push({ value: 'Refill Delivery Count Report', metadata: { style: formatterId.id } });
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
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $scope.divshow = true;
        $scope.divhide = false;
        $scope.Filters = [{ Name: 'GoGas', Appl: 'EZYGAS' }];
        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.refill.Appl = $scope.refill.Appl != null ? $scope.refill.Appl : "";
                $http.get(uriadmin + 'Report/GetRefillDeliveryCntReport?DateFormat=' + $scope.refill.DateFormat + '&Appl=' + $scope.refill.Appl + '&HsFor=' + Hsfor + '&UserCode=' + codeofuser)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        for (i = 0; i < response.data.Data.Table.length; i++) {
                            $scope.gridOptions1.data = response.data.Data.Table;
                            $scope.gridOptions1.columnDefs = getColumnDefs(response.data.Data.Table[i]);
                        }
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.columnDefs = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
            };
        };

        function getColumnDefs(row) {
            var columnDefs = new Array();
            angular.forEach(row, function (value, key) {
                $scope.gridOptions1.data[i][key] = $scope.gridOptions1.data[i][key] == null ? 0 : $scope.gridOptions1.data[i][key];
                columnDefs.push({
                    name: key,
                    displayName: key == "distcode" ? "Distributor Code" : key == "DistName" ? "Distributor Name" : key,
                    width: key == "distcode" ? "130" : key == "DistName" ? "250" : "110", cellClass: key != "distcode" && key != "DistName" ? 'right-align' : '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                });

            });
            return columnDefs;
        };
    }
});
appdash.controller('DigPaymentDashboardHistoryReportController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('DGB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        var codeofuser = "";
        if ($sessionStorage.CUserCode != null) {
            var Hsfor = 'CO';
            codeofuser = $sessionStorage.CUserCode;
        }
        else if ($sessionStorage.PUserCode != null) {
            var Hsfor = 'PG';
            codeofuser = $sessionStorage.PUserCode;
        }
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            enableSelectAll: false,
            columnDefs: [
                   {
                       name: 'distcode', displayName: 'Distributor Code', width: "130", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                   },
                    { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Digital Payment Count Report.xlsx',
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
                cols.push({ value: 'Digital Payment Count Report', metadata: { style: formatterId.id } });
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
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $scope.divshow = true;
        $scope.divhide = false;

        $scope.GetAMCPaymentgetway = function () {
            $http.get(uriadmin + 'Pay/getpaymentgateway?PgId&PgType&PgDesc&IsActive=Y').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Filters = response.data.Data;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.GetAMCPaymentgetway();
        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.digital.PgType = $scope.digital.PgType == null ? '' : $scope.digital.PgType;
                $http.get(uriadmin + 'Report/GetDigitalPaymentReport?DateFormat=' + $scope.digital.DateFormat + '&MerType=' + $scope.digital.PgType + '&HsFor=' + Hsfor + '&UserCode=' + codeofuser)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        for (i = 0; i < response.data.Data.Table.length; i++) {
                            $scope.gridOptions1.data = response.data.Data.Table;
                            $scope.gridOptions1.columnDefs = getColumnDefs(response.data.Data.Table[i]);
                        }
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.columnDefs = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            };
        };

        function getColumnDefs(row) {
            var columnDefs = new Array();
            angular.forEach(row, function (value, key) {
                $scope.gridOptions1.data[i][key] = $scope.gridOptions1.data[i][key] == null ? 0 : $scope.gridOptions1.data[i][key];
                columnDefs.push({
                    name: key,
                    displayName: key == "distcode" ? "Distributor Code" : key == "DistName" ? "Distributor Name" : key,
                    width: key == "distcode" ? "130" : key == "DistName" ? "250" : "110", cellClass: key != "distcode" && key != "DistName" ? 'right-align' : '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                });

            });
            return columnDefs;
        };

    }
});
appdash.controller('CardActReportController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DGD');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        var codeofuser = "";
        if ($sessionStorage.CUserCode != null) {
            var Hsfor = 'CO';
            codeofuser = $sessionStorage.CUserCode;
        }
        else if ($sessionStorage.PUserCode != null) {
            var Hsfor = 'PG';
            codeofuser = $sessionStorage.PUserCode;
        }
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            enableSelectAll: false,
            columnDefs: [
                   {
                       name: 'distcode', displayName: 'Distributor Code', width: "130", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                   },
                    { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Card Activation Count Report.xlsx',
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
                    "alignment": { "wrapText": true, "text-align": "center" }
                };
                var formatterId = stylesheet.createFormat(aFormatDefn);
                sheet.mergeCells('B1', 'C1');
                var cols = [];
                cols.push({ value: '' });
                cols.push({ value: 'Card Activation Count Report', metadata: { style: formatterId.id } });
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
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;


        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $http.get(uriadmin + 'Report/GetCardActCntReport?DateFormat=' + $scope.card.DateFormat + '&HsFor=' + Hsfor + '&UserCode=' + codeofuser)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        for (i = 0; i < response.data.Data.Table.length; i++) {
                            $scope.gridOptions1.data = response.data.Data.Table;
                            $scope.gridOptions1.columnDefs = getColumnDefs(response.data.Data.Table[i]);

                            //if ($scope.gridOptions1.data[i].)
                        }
                        SmartAlert.SuccessGrid(response.data.Message);

                    }
                    else {
                        $scope.gridOptions1.columnDefs = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            };
        };

        function getColumnDefs(row) {
            var columnDefs = new Array();
            angular.forEach(row, function (value, key) {
                //  var a = Object.keys(response.data.Data.Table[i]).length;

                $scope.gridOptions1.data[i][key] = $scope.gridOptions1.data[i][key] == null ? 0 : $scope.gridOptions1.data[i][key];

                columnDefs.push({
                    name: key,
                    displayName: key == "distcode" ? "Distributor Code" : key == "DistName" ? "Distributor Name" : key,
                    width: key == "distcode" ? "130" : key == "DistName" ? "250" : "110", cellClass: key != "distcode" && key != "DistName" ? 'right-align' : '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                });

            });
            return columnDefs;
        };

    }
});
appdash.controller('BookingCountReportController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DGC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        var codeofuser = "";
        if ($sessionStorage.CUserCode != null) {
            var Hsfor = 'CO';
            codeofuser = $sessionStorage.CUserCode;
        }
        else if ($sessionStorage.PUserCode != null) {
            var Hsfor = 'PG';
            codeofuser = $sessionStorage.PUserCode;
        }
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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            enableSelectAll: false,
            columnDefs: [
                   {
                       name: 'distcode', displayName: 'Distributor Code', width: "130", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                   },
                    { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            exporterMenuPdf: false,
            exporterMenuCsv: false,

            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Booking Count Report.xlsx',
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
                cols.push({ value: 'Booking Count Report', metadata: { style: formatterId.id } });
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
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

        $scope.Filters = [{ Name: 'Go Delivery', Appl: 'RD' }, { Name: 'Go Suvidha', Appl: 'ES' }, { Name: 'Distributor Panel', Appl: 'DI' }];
        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.book.Appl = $scope.book.Appl != null ? $scope.book.Appl : "";
                $http.get(uriadmin + 'Report/GetBookingCntReport?DateFormat=' + $scope.book.DateFormat + '&Appl=' + $scope.book.Appl)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        for (i = 0; i < response.data.Data.Table.length; i++) {
                            $scope.gridOptions1.data = response.data.Data.Table;
                            $scope.gridOptions1.columnDefs = getColumnDefs(response.data.Data.Table[i]);
                        }
                        SmartAlert.SuccessGrid(response.data.Message);

                    }
                    else {
                        $scope.gridOptions1.columnDefs = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            };
        };

        function getColumnDefs(row) {
            var columnDefs = new Array();
            angular.forEach(row, function (value, key) {
                $scope.gridOptions1.data[i][key] = $scope.gridOptions1.data[i][key] == null ? 0 : $scope.gridOptions1.data[i][key];
                columnDefs.push({
                    name: key,
                    displayName: key == "DistCode" ? "Distributor Code" : key == "DistName" ? "Distributor Name" : key == "Apptype" ? "App Type" : key,
                    width: key == "distcode" ? "130" : key == "DistName" ? "250" : "110", cellClass: key != "distcode" && key != "DistName" ? 'right-align' : '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                });

            });
            return columnDefs;
        };

    }
});
appdash.controller('WeightReportController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;

    var valueof = userService.Success('DH');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.Weight = { Startdate: $filter('date')(new Date(), 'dd-MMM-yyyy') };
        $scope.Weight.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:2099",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'License Validity Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                     { columnid: 'RegDate', title: 'Registration Date' },
                     { columnid: 'ActDate', title: 'Activation Date' },
                     { columnid: 'ValidityDays', title: 'Validity Days' },
                     { columnid: 'ExpDate', title: 'Expiry Date' }
            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
             { name: 'DealerCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'DistName', displayName: 'Distributor Name', width: "620", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Count of Delivered Orders', displayName: 'Total Delivery', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'EW Weight Per', displayName: 'Weight Per', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Without Weight Delivery', displayName: 'Without weight Delivery', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'With Weight Delivery', displayName: 'Weight Delivery', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'Weight Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Weight Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.GetWeightReport = function (Weight, valid) {

            $scope.divshow = false;
            $scope.divhide = true;

            if (valid && Weight != null) {

                $http.get(urianalysis + 'GetWeightDistwiseSummary?distcode=' + $scope.Weight.DistCode + '&Consno&AreaCode&DbCode&Sdate=' + $scope.Weight.Startdate + '&Edate=' + $scope.Weight.EndDate).then(function (response) {

                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message + ' ' + 'Record Found');

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.gridOptions1.data.length = 0;
                    }
                })

            }
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }

});
appdash.controller('RejectOrdersController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin) {
    var valueof = userService.Success('DEG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Rejected Orders Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                  { columnid: 'OrderNo', title: 'Order No.' },
                 { columnid: 'OrderDt', title: 'Order Date' },
                   { columnid: 'UpdatedbyName', title: 'Last Updated By' },
                 { columnid: 'UpdateDt', title: 'Last Update Date' },
                   { columnid: 'Remark', title: 'Remark' }
            ],

            rows: {

                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } }

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
                { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No.', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdatedbyName', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdateDt', displayName: 'Last Update Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Remark', displayName: 'Remark', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Rejected_Orders_Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.divshow = true;
        $scope.divhide = false;
        $scope.getRejectedOrders = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=&DistCode=&DistName=&FromOrdDate=' + $scope.Fromdate + '&ToOrdDate=' + $scope.Todate + '&IsActive=N&IsPaymentVerify=&OrderStatus=RJ&OrderStage=')
                    .then(function (response) {
                        if (response.data.StatusCode != 0) {
                            $scope.gridOptions1.data = response.data.Data;
                            SmartAlert.Success(response.data.Message);
                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                        $scope.mystyle.push($scope.mystyle1);
                    });
            }
        }
    }
});
appdash.controller('OpeningPayCountController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DI');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Opening Pay Count Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                  { columnid: 'OpenPayCount', title: 'Open Pay Count' },
            ],

            rows: {

                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } }

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
                { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OpenPayCount', displayName: 'Open Pay Count', width: "200", cellClass: "grid-align", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Opening_Pay_Count_Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.getOpeningPayCount = function (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.DistCode = $scope.DistCode == null ? "" : $scope.DistCode;
            $http.get(uriadmin + 'Report/GetOpenPayReport?DistCode=' + $scope.DistCode)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.mystyle.push($scope.mystyle1);
                });
        }
        $scope.getOpeningPayCount();
    }
});
appdash.controller('MISReportController', function ($http, $scope, $filter, $location, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DK');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {

        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');

        var updateModel = function (dateText) {
            var tempDate = new Date(dateText[0].value);
            // $scope.minD = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
            $scope.maxD = new Date(tempDate.getFullYear(), tempDate.getMonth() + 3, 0);
            $scope.Todate = $scope.Fromdate;
            $("#td").datepicker("destroy");
            to = $("#td").datepicker({
                yearRange: "1960:year",
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                minDate: tempDate,
                maxDate: $scope.maxD,
                dateFormat: "dd-M-yy"
            });
        };

        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:year",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               dateFormat: "dd-M-yy",
               onClose: function (dateText, inst) {
                   //  updateModel($(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1)));
                   updateModel($(this).datepicker('setDate', new Date(this.value)));
               },
           })
        //.on("change", function () {
        //    updateModel($(this).datepicker('setDate', new Date(this.value)));
        //})
        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }

        $scope.downloadExcel = function (valid, rbtn) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                var xhttp;
                if (window.XMLHttpRequest) {
                    xhttp = new XMLHttpRequest();
                } else {
                    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (rbtn == "r") {
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            if (this.response.startsWith('{')) {
                                var status = JSON.parse(this.response);
                                SmartAlert.Errmsg(status.Message);
                            }
                            else {
                                window.location.href = uriadmin + 'Report/GetMISReports?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate;
                            }
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    };
                    xhttp.open("GET", uriadmin + 'Report/GetMISReports?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate, true);
                    xhttp.send();
                }
                else if (rbtn == "e") {
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            if (this.response.startsWith('{')) {
                                var status = JSON.parse(this.response);
                                SmartAlert.Errmsg(status.Message);
                            }
                            else {
                                window.location.href = uriadmin + 'Report/GetMISBookDelvStatusReport?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&RptFlag=BK';
                            }
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    };
                    xhttp.open("GET", uriadmin + 'Report/GetMISBookDelvStatusReport?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&RptFlag=BK', true);
                    xhttp.send();

                }
                else {
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            if (this.response.startsWith('{')) {
                                var status = JSON.parse(this.response);
                                SmartAlert.Errmsg(status.Message);
                            }
                            else {
                                window.location.href = uriadmin + 'Report/GetMISBookDelvStatusReport?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&RptFlag=DB';
                            }
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    };
                    xhttp.open("GET", uriadmin + 'Report/GetMISBookDelvStatusReport?DistCode=&Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&RptFlag=DB', true);
                    xhttp.send();
                }
            }
        }
    }
});
appdash.controller('DigitalPaymentReportController', function ($http, $scope, $filter, $location, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DL');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $scope.dateFun = function () {
            //if ($scope.aUnd == undefined) {
            Date.prototype.addDays = function (days) {
                var dat = new Date(this.valueOf());
                dat.setDate(dat.getDate() + days);
                return dat;
            }

            var d = new Date();
            var year = d.getFullYear();

            var dateFormat = "dd-M-yy",
               from = $("#fd")
               .datepicker({
                   yearRange: "1960:year",
                   changeYear: true,
                   changeMonth: true,
                   numberOfMonths: 1,
                   maxDate: new Date(),
                   dateFormat: "dd-M-yy"
               })
               .on("change", function () {
                   var d = new Date();
                   var getd = getDate(this);
                   var mbd = getd.addDays();
                   var abc;
                   if (mbd > d) {
                       abc = d;
                   }
                   else {
                       abc = mbd;
                   }

                   to.datepicker("option", "minDate", getDate(this));
                   to.datepicker("option", "maxDate", abc);

               }),
               to = $("#td").datepicker({
                   yearRange: "1960:year",
                   changeYear: true,
                   defaultDate: "+1w",
                   changeMonth: true,
                   numberOfMonths: 1,
                   minDate: 0,
                   //maxDate: 0,
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
        $scope.dateFun();

        $scope.GetPaymentDetail = function (valid) {
            if (valid == true) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.DistCode = $scope.DistCode == null ? "" : $scope.DistCode;
                $scope.TransNo = $scope.TransNo == null ? "" : $scope.TransNo;
                $scope.ConsNo = $scope.ConsNo == null ? "" : $scope.ConsNo;
                $http({
                    method: 'GET',
                    url: urianalysis + 'Payments/GetDigitalPaymentDetails',
                    params:
                        {
                            DistCode: $scope.DistCode, FromDate: $scope.fromDate, ToDate: $scope.toDate, TransNo: $scope.TransNo, ConsNo: $scope.ConsNo
                        }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
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
         //   { name: 'ConsId', displayName: 'ConsId', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ConsNo', displayName: 'Consumer No.', width: "90", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ConsName', displayName: 'Consumer Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransNo', displayName: 'Transaction No.', width: "180", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayDate', displayName: 'Payment Date', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayUseDate', displayName: 'Payment Closed Date', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MerchantName', displayName: 'Merchant Name', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PaymentMode', displayName: 'Payment Mode', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CardType', displayName: 'Card Type', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PaidAmount', displayName: 'Paid Amount', width: "90", cellTooltip: true, cellFilter: 'number: 2', headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align' },
            { name: 'ClosingAmt', displayName: 'Closing Amount', cellClass: 'grid-align', width: "90", cellTooltip: true, cellFilter: 'number: 2', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BalAmt', displayName: 'Balance Amount', width: "100", cellClass: 'grid-align', cellTooltip: true, cellFilter: 'number: 2', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TaxAmount', displayName: 'Transaction Amount', width: "120", cellClass: 'grid-align', cellFilter: 'number: 2', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalAmount', displayName: 'Total Amount', cellClass: 'grid-align', width: "100", cellFilter: 'number: 2', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayId', displayName: 'Pay Id', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'AppType', displayName: 'AppType', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Application', displayName: 'Application', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Company', displayName: 'Company', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TransferFlag', displayName: 'Transfer Flag', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PaymentFlag', displayName: 'Payment Status', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterExcelFilename: 'Digital Payment Report.xlsx',
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
                sheet.mergeCells('A1', 'S1');
                var cols = [];
                // cols.push({ value: '' });
                cols.push({ value: 'Digital Payment Report', metadata: { style: formatterId.id } });
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
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
    }
});
appdash.controller('ConsumerBaseLocationReportController', function ($http, $scope, $filter, $location, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DM');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $scope.GetLocDetail = function (valid) {
            if (valid == true) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.DistCode = $scope.DistCode == null ? "" : $scope.DistCode;
                $scope.TransNo = $scope.TransNo == null ? "" : $scope.TransNo;
                $scope.ConsNo = $scope.ConsNo == null ? "" : $scope.ConsNo;
                $http({
                    method: 'GET',
                    url: uri + 'Consumer/GetConsumersLocation',
                    params:
                        {
                            DistCode: $scope.DistCode, ConsumerNo: $scope.ConsNo
                        }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
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
         //   { name: 'ConsId', displayName: 'ConsId', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ConsumerNo', displayName: 'Consumer No.', width: "90", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ConsumerName', displayName: 'Consumer Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LatPos', displayName: 'Latitude Position', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LonPos', displayName: 'Longitude Position', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterExcelFilename: 'Consumer Base Location Report.xlsx',
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
                sheet.mergeCells('A1', 'S1');
                var cols = [];
                // cols.push({ value: '' });
                cols.push({ value: 'Consumer Base Location Report' + ' [Distributor Code:' + $scope.DistCode + ']', metadata: { style: formatterId.id } });
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
        };
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;
    }
});
appdash.controller('MosambeeDelBoyReportController', function ($http, $scope, $filter, $location, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, uridigezygas) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DN');
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
            {
                name: 'View', displayName: 'View', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.edit(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "40"
               , enableFiltering: false,
            },
            { name: 'UserCode', displayName: 'User Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StaffName', displayName: 'Delivery Boy Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TID', displayName: 'TID', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MID', displayName: 'MID', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'EmailId', EmailId: 'Email Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdatedbyName', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Updatedt', displayName: 'Last Updated Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'IsActive', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: true,
            exporterExcelFilename: 'Masambee Delivery Boy Report.xlsx',
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
                cols.push({ value: 'Masambee Delivery Boy Report', metadata: { style: formatterId.id } });
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

        $scope.getDetails = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $sessionStorage.delbDistCode = $scope.DistCode;
                $http.get(uriadmin + 'Report/GetMosbDelBoyDtls?UserCode=&DistCode=' + $scope.DistCode)
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
                   })
            }
        }
        if ($sessionStorage.delbDistCode) {
            $scope.DistCode = $sessionStorage.delbDistCode;
            $scope.getDetails(true);
        }

        $scope.edit = function (data) {
            $sessionStorage.mddata = data;
            $state.go('app.dashboard.mosambee_delboy');
        }
    }

});
appdash.controller('MosambeeDelBoyController', function ($http, $scope, $filter, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, urianalysis, uriadmin, Name, Password) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.mosambee = { IsActive: 'Y' };
    $scope.getDelBoy = function (distcode) {
        if (distcode != "" && distcode != null) {
            $http({
                method: 'GET',
                url: uri + 'Distributor/GetDistUsers',
                params:
                    { UserCode: null, DistCode: distcode, Name: null, IsActive: 'Y', EmailAddress: null, RoleCode: 'DELB' }
            }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.DelBoyDetails = response.data.Data;
                }
                else {
                    $scope.DelBoyDetails = [];
                    SmartAlert.Errmsg("Delivery Boy not available OR not valid Distributor Code.");
                }
            })
        }
    }
    //$scope.getDelBoy();
    $scope.disabled = false;
    if ($sessionStorage.mddata != null) {
        $scope.mosambee = $sessionStorage.mddata;
        $scope.getDelBoy($scope.mosambee.DistCode);
        $scope.disabled = true;
        $sessionStorage.mddata = null;

    }

    $scope.PostMD = function (valid, DelBoyDetails) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $sessionStorage.delbDistCode = $scope.mosambee.DistCode;
            $scope.mosambee.PUserCode = $sessionStorage.ucode;
            $scope.mosambee.EmailId = $scope.mosambee.EmailId == null ? $filter('filter')(DelBoyDetails, { UserCode: $scope.mosambee.UserCode })[0].EmailAddress : $scope.mosambee.EmailId;
            $scope.mosambee.Flag = $scope.mosambee.MosbId != null ? "UP" : "IN";
            var json = angular.toJson($scope.mosambee);
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http({
                method: 'POST',
                url: uriadmin + 'Report/ManageMosbDelBoyDtls',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $state.go('app.dashboard.mosambee_delboy_report');


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
appdash.controller('PendingCashMemoReportController', function ($http, $scope, $filter, $location, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password,urianalysis,uri) {
    $scope.divshow = true;
    $scope.divhide = false;
    var valueof = userService.Success('DO');
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
           // { name: 'Distributor Code', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'Consumer No', displayName: 'Consumer No.', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Consumer Name', displayName: 'Consumer Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Cash Memo No', displayName: 'Cash Memo No', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Cash Memo Date', displayName: 'Cash Memo Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Refill Quantity', displayName: 'Refill Quantity', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DAC Code', displayName: 'DAC Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: true,
            exporterExcelFilename: 'Pending Cash Memo Report.xlsx',
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
                cols.push({ value: 'Pending Cash Memo Report[Distributor Code: ' + $scope.DistCode + ', Area Code: ' + $scope.AreaName + ']', metadata: { style: formatterId.id } });
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

        $scope.GetAreaData = function () {

            $http.get(uri + 'Area/GetAreaDetails?DistCode=' + $scope.DistCode + '&AreaCode').then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.GetArea = response.data.Data;
                }
                else {
                    $scope.GetArea = [];
                }
            })
        }

        $scope.getDetails = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.AreaCode = $scope.AreaCode == null ? '' : $scope.AreaCode;
                $scope.AreaName = $scope.AreaCode != '' ? $filter('filter')($scope.GetArea, { AreaCode: $scope.AreaCode })[0].AreaName : 'NA';
                $http.get(urianalysis + 'OrderManagement/GetPendingCashMemo?DistCode=' + $scope.DistCode + '&ConsNo=&AreaCode=' + $scope.AreaCode + '&DmanCode')
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
                   })
            }
        }
    }

});

appdash.controller('OutwardSummaryController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;

    var valueof = userService.Success('DP');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.OS = { Startdate: $filter('date')(new Date(), 'dd-MMM-yyyy') };
        $scope.OS.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:2099",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



 $scope.Getproduct = function () {
     $http.get(uriadmin + 'product/GetItemDetails?ItemCode=').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Pdata = response.data.Data;

                }
            })
        }

$scope.Getproduct();



        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Outward Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                     { columnid: 'PlantId', title: 'Plant Code' },
                     { columnid: 'PlantName', title: 'Plant Name' },
                     { columnid: 'DocRefCode', title: 'Invoice No.' },
                     { columnid: 'ItemName', title: 'Product' },
                     { columnid: 'InwardRefNo', title: 'Inward Ref.No.' },
                     { columnid: 'OrderStatus', title: 'Order Status' },
                     { columnid: 'SoundQty', title: 'Sound Qty' },
                     { columnid: 'Amount', title: 'Amount' },
                     { columnid: 'AmountPerCyl', title: 'Amount Per Cylinder' },
            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
              {
                  name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.EditDetails(row.entity)"  data-title="Close" ng-if="row.entity.OrderStatus==\'Pending\'">&nbsp;Edit&nbsp;</button>    <button ng-if="row.entity.OrderStatus!=\'Pending\'" style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.edit(row.entity)"  data-title="Close">View</button>'
                , width: "48",
                  headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
              },
             { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'PlantId', displayName: 'Plant Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'PlantName', displayName: 'Plant Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DocRefCode', displayName: 'Invoice No.', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DocRefDate', displayName: 'Date', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ItemName', displayName: 'Product', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'InwardRefNo', displayName: 'Inward Ref.No.', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'OrderStatus', displayName: 'Order Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'SoundQty', displayName: 'Sound Qty', width: "*", cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Amount', displayName: 'Amount', width: "*", cellFilter: 'number: 2',cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AmountPerCyl', displayName: 'Amount Per Cylinder',cellFilter: 'number: 2', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
             //cellTemplate": "<div ng-if=\"row.entity.type != 'FILE'\" ng-click=\"grid.appScope.rowClick(row)\" style=\"cursor:pointer;\" class=\"ui-grid-cell-contents\">{{COL_FIELD CUSTOM_FILTERS}}</div><a ng-if=\"row.entity.type == 'FILE'\" href=\"{{'path/toUrl/FileId=' + row.entity.id}}\">{{COL_FIELD CUSTOM_FILTERS}}</a>"



            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: true,
            exporterMenuCsv: true,
            exporterMenuExcel: true,
            exporterCsvFilename: 'Outward Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Outward Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Outward Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.GetWeightReport = function (valid, OS) {
          
            $scope.divshow = false;
            $scope.divhide = true;

            if (valid && OS != null) {
                OS.DistCode = OS.DistCode == null || OS.DistCode == undefined ? '' : OS.DistCode;
                OS.ItemCode = OS.ItemCode == null || OS.ItemCode == undefined ? '' : OS.ItemCode;

                $http.get(uriadmin + 'plant/GetItemInwardSummary?PlantId=&DistCode=' + OS.DistCode + '&ItemCode=' + OS.ItemCode + '&FromDate=' + OS.Startdate + '&ToDate=' + OS.EndDate).then(function (response) {

                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                        $sessionStorage.Date = [];
                        $sessionStorage.Date.Fdate = OS.Startdate;
                        $sessionStorage.Date.Tdate = OS.EndDate;


                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.gridOptions1.data.length = 0;
                    }
                })

            }
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }

    //if ($sessionStorage.BackData != null) {
    //    $scope.Os = $sessionStorage.BackData;
    //    $scope.Os.Startdate = $sessionStorage.Date.Fdate;
    //    $scope.Os.Enddate = $sessionStorage.Date.Tdate;
    //    $scope.GetWeightReport(true, $scope.Os);
    //    $sessionStorage.BackData = null;
    //    $sessionStorage.Date = null;

    //}

    $scope.edit = function (data)
    {
        $sessionStorage.OutwardData = data;
        $state.go('app.dashboard.outward_summary_report_details');


    }
    $scope.EditDetails = function (data)
    {
        $sessionStorage.OutwardData = data;
        $state.go('app.dashboard.update_invoice_details');
    }
   
});
appdash.controller('OutwardDetailsController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {

    var valueof = userService.Success('DP');
    $sessionStorage.currentstate = $state.current.name;
    

        if ($sessionStorage.OutwardData != null)
        {

            $scope.Outward = $sessionStorage.OutwardData;
            //$sessionStorage.OutwardData = null;


        }

       $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'License Validity Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                     { columnid: 'RegDate', title: 'Registration Date' },
                     { columnid: 'ActDate', title: 'Activation Date' },
                     { columnid: 'ValidityDays', title: 'Validity Days' },
                     { columnid: 'ExpDate', title: 'Expiry Date' }
            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
            
             { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'InvoiceNo', displayName: 'Invoice No.', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ItemName', displayName: 'Product', width: "300", cellTooltip: true, filterCellFiltered: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'CylBarCode', displayName: 'Bar Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'CreatedDt', displayName: 'Plant Outward Date', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'TareWeight', displayName: 'Plant Tare Weight', cellFilter: 'number: 2', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'LPGWeight', displayName: 'Plant LPG Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'GrossWeight', displayName: 'Plant Gross Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistTareWeight', displayName: 'Distributor Tare Weight', cellFilter: 'number: 2', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistLPGWeight', displayName: 'Distributor LPG Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistGrossWeight', displayName: 'Distributor Gross Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'DistDiffWeight', displayName: 'Diff. Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'LPGAmount', displayName: 'Rate per Cylinder', width: "100", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: true,
            exporterMenuCsv: true,
            exporterMenuExcel: true,
            exporterCsvFilename: 'Weight Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Weight Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetWeightReport = function () {

        
            $http.get(uriadmin + 'plant/GetItemInwardWeigthDtilsDistPanel?DistCode=&ItemCode=&tblRefNo=' + $scope.Outward.InwardRefNo + '&CylBarCode=').then(function (response) {

                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.gridOptions1.data.length = 0;
                    }
                })

         
        }
        $scope.GetWeightReport();
    
        $scope.Back = function ()
        {
            $sessionStorage.BackData = $scope.Outward;
            $state.go('app.dashboard.outward_summary_report')

        }
});
appdash.controller('InvoiceDetailsController', function ($http, $scope, $filter, $timeout, $state, $rootScope,urianalysis, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
  
    $scope.divshow = true;
   $scope.divhide = false;


   if ($sessionStorage.OutwardData != null) {

       $scope.invoice = $sessionStorage.OutwardData;
       $sessionStorage.OutwardData = null;

   }
   else { $state.go('app.dashboard.outward_summary_report'); }

    $scope.GetAmount=function()
    {
     $scope.invoice.AmountPerCyl = $scope.invoice.Amount / $scope.invoice.SoundQty;

    }
    $scope.GetAmount();
    $scope.InvoiceDetailsDetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.invoice.Flag = 'UP';
            $scope.invoice.UserCode = $sessionStorage.PUserCode != null || $sessionStorage.PUserCode != undefined?$sessionStorage.PUserCode:$sessionStorage.CUserCode;
            $http({
                method: "POST",
                url: urianalysis + 'Stock/IUDItemInwardDetails',
                data: $scope.invoice

            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $state.go('app.dashboard.outward_summary_report');

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
appdash.controller('InwardSummaryController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;

    var valueof = userService.Success('DP');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.OS = { Startdate: $filter('date')(new Date(), 'dd-MMM-yyyy') };
        $scope.OS.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "1960:2099",
               changeMonth: true,
               changeYear: true,
               numberOfMonths: 1,
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               to.datepicker("option", "minDate", getDate(this));
           }),
           to = $("#td").datepicker({
               yearRange: "1960:2099",
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }



        $scope.Getproduct = function () {
            $http.get(uriadmin + 'product/GetItemDetails?ItemCode=').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Pdata = response.data.Data;

                }
            })
        }

        $scope.Getproduct();




        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'License Validity Report',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                     { columnid: 'DistCode', title: 'Distributor Code' },
                     { columnid: 'DistName', title: 'Distributor Name' },
                     { columnid: 'RegDate', title: 'Registration Date' },
                     { columnid: 'ActDate', title: 'Activation Date' },
                     { columnid: 'ValidityDays', title: 'Validity Days' },
                     { columnid: 'ExpDate', title: 'Expiry Date' }
            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } },
                5: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                    }
                }
            }
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
              {
                  name: 'View', displayName: 'View', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.edit(row.entity)" data-title="Edit">View</button>',
                  width: "45"
               , enableFiltering: false,
              },
             { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
             { name: 'PlantId', displayName: 'Plant Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'PlantName', displayName: 'Plant Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ItemName', displayName: 'Product', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DocRefDate', displayName: 'Date', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'InwardRefNo', displayName: 'Inward Ref.No.', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'OrderStatus', displayName: 'Order Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'EmptyQty', displayName: 'Empty Qty', width: "*",  cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DeffectiveQty', displayName: 'Deffective Qty',  width: "*", cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'Amount', displayName: 'Amount', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'SoundQty', displayName: 'Weight Delivery', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            exporterCsvFilename: 'Weight Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Weight Report", style: 'headerStyle', alignment: 'center', color: 'red' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 600,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.GetWeightReport = function (OS, valid) {

            $scope.divshow = false;
            $scope.divhide = true;

            if (valid && OS != null) {
                OS.DistCode = OS.DistCode == null || OS.DistCode == undefined ? '' : OS.DistCode;
                OS.ItemCode = OS.ItemCode == null || OS.ItemCode == undefined ? '' : OS.ItemCode;

                $http.get(uriadmin + 'plant/GetItemReturnSummary?PlantId=&DistCode=' + OS.DistCode + '&ItemCode=' + OS.ItemCode + '&FromDate=' + OS.Startdate + '&ToDate=' + OS.EndDate).then(function (response) {

                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                        $scope.gridOptions1.data.length = 0;
                    }
                })

            }
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }

    $scope.edit = function (data) {
        $sessionStorage.OutwardData = data;
        $state.go('app.dashboard.inward_summary_report_details');


    }
});
appdash.controller('InwardDetailsController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {

    var valueof = userService.Success('DP');
    $sessionStorage.currentstate = $state.current.name;


    if ($sessionStorage.OutwardData != null) {

        $scope.Outward = $sessionStorage.OutwardData;
        //$sessionStorage.OutwardData = null; 
    }





    $scope.mystyle1 = {
        headers: true,
        style: 'font-size:19px;color:black',
        caption: {
            title: 'License Validity Report',
        },
        column: {
            style: 'font-size:15px;color:black'
        },
        columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                 { columnid: 'RegDate', title: 'Registration Date' },
                 { columnid: 'ActDate', title: 'Activation Date' },
                 { columnid: 'ValidityDays', title: 'Validity Days' },
                 { columnid: 'ExpDate', title: 'Expiry Date' }
        ],
        row: {
        },
        rows: {
            0: { cell: { style: 'color:black' } },
            1: { cell: { style: 'color:black' } },
            2: { cell: { style: 'color:black' } },
            3: { cell: { style: 'color:black' } },
            4: { cell: { style: 'color:black' } },
            5: { cell: { style: 'color:black' } }
        },
        cells: {
            2: {
                2: {
                }
            }
        }
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

         { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistName', displayName: 'Distributor Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'ItemName', displayName: 'Product', width: "250", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'CylBarCode', displayName: 'Cyl Bar Code', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'TareWeight', displayName: 'Tare Weight', width: "150", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'LPGWeight', displayName: 'LPG Weight', width: "150", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'GrossWeight', displayName: 'Gross Weight', width: "150", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistTareWeight', displayName: 'Distributor Tare Weight', cellFilter: 'number: 2', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistLPGWeight', displayName: 'Distributor LPG Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistGrossWeight', displayName: 'Distributor Gross Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         //{ name: 'DistDiffWeight', displayName: 'Difference Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DiffWeight', displayName: 'Difference Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'LPGAmount', displayName: 'LPG Amount', width: "150", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         //{ name: 'Amount', displayName: 'Amount', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         //{ name: 'SoundQty', displayName: 'Weight Delivery', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        enableGridMenu: false,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false,
        exporterCsvFilename: 'Weight Report.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Weight Report", style: 'headerStyle', alignment: 'center', color: 'red' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
            return docDefinition;
        },
        exporterPdfOrientation: 'Landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as excel',
            action: function ($event) {
                alasql('SELECT * INTO XLS("LicenseValidityReport.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    $scope.GetWeightReport = function () {


        $http.get(uriadmin + 'plant/GetItemInwardWeigthDetails?DistCode=&ItemCode=&tblRefNo=' + $scope.Outward.ReturnRefNo + '&CylBarCode=').then(function (response) {

            if (response.data.StatusCode == 1) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.Success(response.data.Message);

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
                $scope.gridOptions1.data.length = 0;
            }
        })


    }
    $scope.GetWeightReport();


});

app.controller('DistCrDrDetailController', function ($http, $scope, $filter, $element, $state, $rootScope, SmartAlert, $localStorage, $sessionStorage, base64, uri, urianalysis, Name, Password) {
    

    //document.getElementById('fd').onkeydown = function ()
    //{ return false; }
    //document.getElementById('td').onkeydown = function ()
    //{ return false; }
    $scope.Getdivshow = true;
    $scope.Getdivhide - false

    $scope.dateFun = function () {
        //if ($scope.aUnd == undefined) {
        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;

        }

        var d = new Date();
        var year = d.getFullYear();


        var dateFormat = "dd-M-yy",
           from = $("#fd")
           .datepicker({
               yearRange: "2000:year",
               changeYear: true,
               changeMonth: true,
               numberOfMonths: 1,
               maxDate: new Date(),
               dateFormat: "dd-M-yy"
           })
           .on("change", function () {
               var d = new Date();
               var getd = getDate(this);
               var mbd = getd.addDays(180);
               var abc;
               if (mbd > d) {
                   abc = d;
               }
               else {
                   abc = mbd;
               }

               to.datepicker("option", "minDate", getDate(this));
               to.datepicker("option", "maxDate", abc);

           }),
           to = $("#td").datepicker({
               yearRange: "2000:year",
               changeYear: true,
               defaultDate: "+1w",
               changeMonth: true,
               numberOfMonths: 1,
               minDate: 0,
               maxDate: 0,
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
    $scope.dateFun();

    $scope.fromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.toDate = $filter('date')(new Date(), 'dd-MMM-yyyy');






    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.stylesFun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Area',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
              { columnid: 'AreaCode', title: 'Area Code' },
              { columnid: 'AreaName', title: 'Area Name' },
              { columnid: 'IsActive', title: 'Area Active' },
            ],
            row: {
                //style: function (sheet, row, rowidx) {
                //   return 'background:' + (row?'red' : 'yellow');
                //}
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },
                4: { cell: { style: 'color:black' } }
            },
            cells: {
                2: {
                    2: {
                        //style: 'font-size:45px;background:pink',
                        // value: function (value) { return value.substr(1, 3); }
                    }
                }
            },
        };
        $scope.mystyle = [];
    }
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
         { name: 'DistCode', displayName: 'Dist Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistName', displayName: 'Dist Name', width: "300", cellTooltip: true, filterCellFiltered: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'ItemName', displayName: 'Product', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'PlantId', displayName: 'Plant Id', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
         { name: 'CylBarCode', displayName: 'Bar Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'TransDate', displayName: 'Date', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'LPGWeight', displayName: 'LPG Weight', cellFilter: 'number: 2', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'Rate', displayName: 'Rate', cellFilter: 'number: 2', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'CreditAmt', displayName: 'Amount', width: "*", cellFilter: 'number: 2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: false,
        enableSelectAll: true,

        exporterCsvFilename: 'Area.csv',
        exporterHeaderFilter: function (displayName) {
            if (displayName == 'ID') {
                return 'Person Name';
            } else {
                return displayName;
            }
        },


        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Inward", style: 'headerStyle', alignment: 'center', color: 'red' },
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
        exporterPdfMaxGridWidth: 475,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as xls',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Inward.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    $scope.noGrid = true;


  

        $scope.GetstockOrderDetails = function (valid, fromDate, toDate) {
       
            if (valid) {
                $http({
                    method: "GET",
                    url: urianalysis + 'Stock/GetDistributorCreditDebitDtls',
                    params: { DistCode: $sessionStorage.DistCode, PlantId: null, FromDate: fromDate, ToDate: toDate, }
                }).then(function (response) {
                    if (response.data.StatusCode == 0) {
                        SmartAlert.Errmsg(response.data.Message);

                    }
                    else {
                        SmartAlert.Success(response.data.Message);
                        $scope.gridOptions1.data = response.data.Data;

                    }
                    $scope.stylesFun();
                    $scope.mystyle.push($scope.mystyle1);


                })
            }
        }





})
app.controller('NewConnectionReqDtlsController', function ($window, $http, $scope, $filter, $timeout, $state, $rootScope,  uri, SmartAlert,SweetAlert, $localStorage, $sessionStorage, base64, uri,uriadmin, urisafety, urianalysis) {

    $scope.Getdivshow = true;
    $scope.Getdivhide = false;


    $scope.SalutationData = [{ scode: 'Mr', sdesc: 'Mr.' }, { scode: 'Mrs', sdesc: 'Mrs.' }, { scode: 'Ms', sdesc: 'Miss.' }];

    //$scope.GetAreaData = function () {

    //    $scope.GetArea = $localStorage.areaData;
    //}
    //$scope.GetAreaData();

    $scope.GetFRList = function () {
        $http.get(urianalysis + 'GoFR/GetFRList').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Pdata = response.data.Data;

            }
        })
    }

    $scope.GetFRList();

    //$scope.GetRetailerData = function () {
    //    $http.get(uri + 'Distributor/GetDistUsers?DistCode=' + $sessionStorage.DistCode + '&UserCode&Name&EmailAddress&IsActive&RoleCode=RTLR&EnblCardIssue&EnblOfflineApp&EnblBooking&EnblMasterDAC&StaffName').then(function (response) {
    //        $scope.Rdata = response.data.Data;
    //    })
    //}
    //$scope.GetRetailerData();

    $scope.New = {};
    $scope.New.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.New.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

    $scope.Getstatus = [{ statusCode: 'PE', Status: 'Pending' }, { statusCode: 'CV', Status: 'Converted' }, { statusCode: 'OH', Status: 'On Hold' }, { statusCode: 'CN', Status: 'Cancel' }];
    $scope.GetstatusData = [{ statusCode: 'OH', Status: 'On Hold' }, { statusCode: 'CN', Status: 'Cancel' }];

    //For Avoiding characters in Datepicker
    document.getElementById('FD').onkeydown = function () { return false; }
    document.getElementById('TD').onkeydown = function () { return false; }

    //For Default Date
    var dateFormat = "dd-M-yy",
       from = $("#FD")
       .datepicker({
           changeMonth: true,
           numberOfMonths: 1,
           changeYear: true,
           maxDate: new Date(),
           dateFormat: "dd-M-yy"
       })
       .on("change", function () {
           to.datepicker("option", "minDate", getDate(this));
       }),
       to = $("#TD").datepicker({
           defaultDate: "+1w",
           changeMonth: true,
           changeYear: true,
           numberOfMonths: 1,
           minDate: $scope.New.FromDate,
           maxDate: new Date(),
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

    $scope.value = false;
    $scope.get_details_btn_main = true;
    $scope.filtertext = 'Advanced Filter';

    $scope.ChangeDivs = function () {
        if ($scope.value == false) {
            $scope.filtertext = 'Hide Filter';
            $scope.value = true;
            $scope.get_details_btn_main = false;
        }
        else if ($scope.value == true) {
            $scope.filtertext = 'Advanced Filter';
            $scope.value = false;
            $scope.get_details_btn_main = true;
        }
    }

    $scope.styleFun = function () {
        $scope.mystyle1 =
            {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'New Connection Req Detail Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'BusinessName', title: 'Business Name' },
                  { columnid: 'OwnerName', title: 'Owner Name' },
                  { columnid: 'Email', title: 'Email' },
                  { columnid: 'MobileNo', title: 'Mobile No.', },
                  { columnid: 'AddressLine1', title: 'AddressLine 1' },
                  { columnid: 'AddressLine2', title: 'AddressLine 2' },
                  { columnid: 'AddressLine3', title: 'AddressLine 3' },
                  { columnid: 'Pincode', title: 'Pin code' },
                  { columnid: 'AreaCode', title: 'Area Code' },
                  { columnid: 'AreaName', title: 'Area Name' },
                  { columnid: 'CylinderProviderId', title: 'Cylinder Provider Id' },
                  { columnid: 'ItemRefNo', title: 'Item Ref No.' },
                  { columnid: 'ItemName', title: 'Item Name', },
                  { columnid: 'ProviderName', title: 'Provider Name' },
                  { columnid: 'MonthlyConsumption', title: 'Monthly Consumption' },
                  { columnid: 'Date', title: 'Date' },
                  { columnid: 'FromTime', title: 'From Time', },
                  { columnid: 'ToTime', title: 'To Time' },
                  { columnid: 'MinuteDiff', title: 'Minute Difference' },
                  { columnid: 'Reason', title: 'Reason' },
                  { columnid: 'StatusText', title: 'Status' },
                //{ columnid: 'DeliveryMode', title: 'Delivery Mode' }
                ],
                row: {
                },
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
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

                },
                cells: {
                    2: {
                        2: {
                            //style: 'font-size:45px;background:pink',
                            // value: function (value) { return value.substr(1, 3); }
                        }
                    }
                },
            };

        $scope.mystyle = [];
    }


    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderInd) {
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
        [//{ name: 'Select', displayName: '', cellTemplate: '<button class="btn-primary btn-xs" data-toggle="modal" data-target="#addcust" ng-click="grid.appScope.AddCons(row)" data-title="Select"><span></span>Add</button>', width: "40", enableFiltering: false },
          //{ name: 'Select1', displayName: '', cellTemplate: '<button class="btn-primary btn-xs" data-toggle="modal" data-target="#updatestatus" ng-click="grid.appScope.UpdateStatus(row)" data-title="Select"><span></span>Update</button>', width: "58", enableFiltering: false },
          {
              name: 'Select', displayName: '', headerCellTemplate: '<div style="margin:5px 5px;text-align:center;">Map</div>',
              cellTemplate: '<button class="btn-info btn-xs" style="margin:3px 11px;text-align:center;" data-toggle="modal" data-target="#map" ng-click="grid.appScope.map(row.entity)" data-title="Select"><span class="glyphicon glyphicon-map-marker"></span> Map</button>',
              width: "85"
             , enableFiltering: false
          },
         { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'BusinessName', displayName: 'Business Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OwnerName', displayName: 'Owner Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'MobileNo', displayName: 'Mobile No.', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'AreaCode', displayName: 'Area Code', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, },
          { name: 'AreaName', displayName: 'Area Name', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'CylinderProviderId', displayName: 'Cylinder Provider Id', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, },
          { name: 'ItemRefNo', displayName: 'Item Ref No.', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, },
          { name: 'ItemName', displayName: 'Item Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ProviderName', displayName: 'Provider Name', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'MonthlyConsumption', displayName: 'Monthly Consumption', cellClass: 'grid-align', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Date', displayName: 'Date', cellClass: 'grid-align', width: "200", type: Date, cellFilter: 'date:\'dd/MM/yyyy  h: mma\'', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'FromTime', displayName: 'From Time', cellClass: 'grid-align', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ToTime', displayName: 'To Time', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'MinuteDiff', displayName: 'Minute Difference', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'FRName', displayName: 'FR Name', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'StatusText', displayName: 'Status', cellClass: 'grid-align', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Reason', displayName: 'Reason', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'AddressLine1', displayName: 'Address One', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'AddressLine2', displayName: 'Address Two', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'AddressLine3', displayName: 'Address Three', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Pincode', displayName: 'Pin code', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Email', displayName: 'Email', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //visible: false
          
          //{ name: 'AgencyDist', displayName: 'Agency Distance', visible: false, cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'GoDownDist', displayName: 'Godown Distance', visible: false, cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Latitude', displayName: 'Latitude', visible: false, width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Longitude', displayName: 'Longitude', visible: false, width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         // { name: 'DeliveryMode', displayName: 'Delivery Mode', width: "110", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'New Connection Req Detail Report.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Delivery Order Report(" + $sessionStorage.frmdateTotoDate + ")", style: 'headerStyle', alignment: 'center', color: 'red' },
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
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as xls',
            action: function ($event) {
                alasql('SELECT * INTO XLS("New Connection Req Detail Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    //Display FromDate in Todate
    $scope.DefaultDate = function (FromDate) {
        $scope.New.ToDate = FromDate;
    }

    //$scope.gridOptions1.columnDefs[0].visible = false;
   // $scope.gridOptions1.columnDefs[1].visible = false;
    $scope.gridOptions1.columnDefs[18].visible = false;

    //Bind Records To Grid
    $scope.GetData = function (valid) {
        if (valid) {
            $scope.Getdivshow = false;
            $scope.Getdivhide = true;
         
            $scope.gridOptions1.columnDefs[18].visible = false;
            $scope.New.DistCode = $scope.New.DistCode == undefined ? null : $scope.New.DistCode;
            $scope.New.UserCode = $scope.New.UserCode == undefined ? null : $scope.New.UserCode;
            $scope.New.statusCode = $scope.New.statusCode == undefined ? null : $scope.New.statusCode

            $http({
                method: 'GET',
                url: urianalysis + 'GoFR/GetNewConnectionDetails',
                params: { DistCode: $scope.New.DistCode, FromDate: $scope.New.FromDate, ToDate: $scope.New.ToDate, Status: $scope.New.statusCode, UserCode: $scope.New.UserCode }
            }).then(function (response) {
                $scope.Getdivshow = true;
                $scope.Getdivhide = false;
                //$scope.gridOptions1.data = response.data.Data;
                if (response.data.StatusCode == 0) {

                    SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data.length = 0;

                   // $scope.gridOptions1.columnDefs[0].visible = false;
                    //$scope.gridOptions1.columnDefs[1].visible = false;
                    $scope.gridOptions1.columnDefs[18].visible = false;

                }
                else {
                    SmartAlert.Success(response.data.Message);

                    if ($scope.New.statusCode == 'CV') {

                        //$scope.gridOptions1.columnDefs[0].visible = false;
                        //$scope.gridOptions1.columnDefs[1].visible = false;
                        $scope.gridOptions1.data = response.data.Data;
                    }
                    else if ($scope.New.statusCode == 'CN') {
                        //$scope.gridOptions1.columnDefs[0].visible = false;
                        //$scope.gridOptions1.columnDefs[1].visible = false;
                        $scope.gridOptions1.columnDefs[18].visible = true;
                        $scope.gridOptions1.data = response.data.Data;
                    }
                    else if ($scope.New.statusCode == 'OH') {
                       // $scope.gridOptions1.columnDefs[0].visible = true;
                       // $scope.gridOptions1.columnDefs[1].visible = true;
                        $scope.gridOptions1.columnDefs[18].visible = true;
                        $scope.gridOptions1.data = response.data.Data;
                    }
                    else {
                        $scope.gridOptions1.data = response.data.Data;
                    }


                }
                //$sessionStorage.frmdateTotoDate = FromDate + " To " + ToDate;
                $scope.styleFun();
                $scope.mystyle.push($scope.mystyle1);

            })
        }

    }
    $scope.map = function (Data) {
        
            $scope.showModal = true;
            $scope.latlon = {};
            $scope.latlon.Latitude = Data.Lat;
            $scope.latlon.Longitude = Data.Lon;


            $scope.Mains = $scope.latlon;
            var markers = [$scope.Mains];

            if (markers != null) {
                var mapOptions = {
                    center: new google.maps.LatLng(markers[0].Latitude, markers[0].Longitude),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
                // var mapurl = "https://www.google.co.in/maps/preview?q=" + lat + "+" + lon;
                var infoWindow = new google.maps.InfoWindow();
                var lat_lng = new Array();
                var latlngbounds = new google.maps.LatLngBounds();
                for (i = 0; i < markers.length; i++) {
                    var data = markers[i]
                    var myLatlng = new google.maps.LatLng(data.Latitude, data.Longitude);
                    lat_lng.push(myLatlng);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: 'Consumer Name:'+Data.BusinessName,
                    });
                    latlngbounds.extend(marker.position);
                    (function (marker, data) {
                        google.maps.event.addListener(marker, "click", function (e) {
                            infoWindow.setContent('Consumer Name:'+Data.BusinessName);
                            infoWindow.open(map, marker);
                        });
                    })(marker, data);

                    //$window.open(mapurl, '_blank');
                }
                //map.setCenter(latlngbounds.getCenter());
                //map.fitBounds(latlngbounds);
            }      
    }
   
})
app.controller('NewConnectionReqSummaryController', function ($window, $http, $scope, $filter, $timeout, $state, $rootScope, uri, SmartAlert, $localStorage, $sessionStorage, base64, uri, uriadmin, urisafety, urianalysis) {
    $scope.Getdivshow = true;
    $scope.Getdivhide = false;

 
    $scope.SalutationData = [{ scode: 'Mr', sdesc: 'Mr.' }, { scode: 'Mrs', sdesc: 'Mrs.' }, { scode: 'Ms', sdesc: 'Miss.' }];

    //$scope.GetAreaData = function () {

    //    $scope.GetArea = $localStorage.areaData;
    //}
    //$scope.GetAreaData();

    $scope.GetFRList = function () {
        $http.get(urianalysis + 'GoFR/GetFRList').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Pdata = response.data.Data;

            }
        })
    }

    $scope.GetFRList();


    $scope.New = {};
    $scope.New.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.New.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

    $scope.Getstatus = [{ statusCode: 'PE', Status: 'Pending' }, { statusCode: 'CV', Status: 'Converted' }, { statusCode: 'OH', Status: 'On Hold' }, { statusCode: 'CN', Status: 'Cancel' }];
    $scope.GetstatusData = [{ statusCode: 'OH', Status: 'On Hold' }, { statusCode: 'CN', Status: 'Cancel' }];

    //For Avoiding characters in Datepicker
    document.getElementById('FD').onkeydown = function () { return false; }
    document.getElementById('TD').onkeydown = function () { return false; }

    //For Default Date
    var dateFormat = "dd-M-yy",
       from = $("#FD")
       .datepicker({
           changeMonth: true,
           numberOfMonths: 1,
           changeYear: true,
           maxDate: new Date(),
           dateFormat: "dd-M-yy"
       })
       .on("change", function () {
           to.datepicker("option", "minDate", getDate(this));
       }),
       to = $("#TD").datepicker({
           defaultDate: "+1w",
           changeMonth: true,
           changeYear: true,
           numberOfMonths: 1,
           minDate: $scope.New.FromDate,
           maxDate: new Date(),
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

    $scope.value = false;
    $scope.get_details_btn_main = true;
    $scope.filtertext = 'Advanced Filter';

    $scope.ChangeDivs = function () {
        if ($scope.value == false) {
            $scope.filtertext = 'Hide Filter';
            $scope.value = true;
            $scope.get_details_btn_main = false;
        }
        else if ($scope.value == true) {
            $scope.filtertext = 'Advanced Filter';
            $scope.value = false;
            $scope.get_details_btn_main = true;
        }
    }

    $scope.styleFun = function () {
        $scope.mystyle1 =
            {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'New Connection Req Summary Report',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'DistCode', title: 'Dist Code' },
                  { columnid: 'FRName', title: 'FR Name' },
                  { columnid: 'Date', title: 'Date' },
                  { columnid: 'Pending', title: 'Pending' },
                  { columnid: 'Converted', title: 'Converted' },
                  { columnid: 'OnHold', title: 'OnHold' },
                  { columnid: 'Cancel', title: 'Cancel' },
                  { columnid: 'Total', title: 'Total' },
                  //{ columnid: 'AreaCode', title: 'Area Code' },
                  //{ columnid: 'AreaName', title: 'Area Name' },
                  //{ columnid: 'CylinderProviderId', title: 'Cylinder Provider Id' },
                  //{ columnid: 'ItemRefNo', title: 'Item Ref No.' },
                  //{ columnid: 'ItemName', title: 'Item Name', },
                  //{ columnid: 'ProviderName', title: 'Provider Name' },
                  //{ columnid: 'MonthlyConsumption', title: 'Monthly Consumption' },
                  //{ columnid: 'Date', title: 'Date' },
                  //{ columnid: 'FromTime', title: 'From Time', },
                  //{ columnid: 'ToTime', title: 'To Time' },
                  //{ columnid: 'MinuteDiff', title: 'Minute Difference' },
                  //{ columnid: 'Reason', title: 'Reason' },
                  //{ columnid: 'ReturnDiffAmt', title: 'Return Diff. Amount' },
                //{ columnid: 'DeliveryMode', title: 'Delivery Mode' }
                ],
                row: {
                },
                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },
                    3: { cell: { style: 'color:black' } },
                    4: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    5: { cell: { style: 'color:black' } },
                    6: { cell: { style: 'color:black' } },
                    7: { cell: { style: 'color:black' } },
                    //8: { cell: { style: 'color:black' } },
                    //9: { cell: { style: 'color:black' } },
                    //10: { cell: { style: 'color:black' } },
                    //11: { cell: { style: 'color:black' } },
                    //12: { cell: { style: 'color:black' } },
                    //13: { cell: { style: 'color:black' } },
                    //14: { cell: { style: 'color:black' } },
                    //15: { cell: { style: 'color:black' } },
                    //16: { cell: { style: 'color:black' } },
                    //17: { cell: { style: 'color:black' } },
                    //18: { cell: { style: 'color:black' } },
                    //19: { cell: { style: 'color:black' } },
                    //20: { cell: { style: 'color:black' } },
                    //21: { cell: { style: 'color:black' } },
                    //22: { cell: { style: 'color:black' } },

                },
                cells: {
                    2: {
                        2: {
                            //style: 'font-size:45px;background:pink',
                            // value: function (value) { return value.substr(1, 3); }
                        }
                    }
                },
            };

        $scope.mystyle = [];
    }


    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderInd) {
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
        [//{ name: 'Select', displayName: '', cellTemplate: '<button class="btn-primary btn-xs" data-toggle="modal" data-target="#addcust" ng-click="grid.appScope.AddCons(row)" data-title="Select"><span></span>Add</button>', width: "40", enableFiltering: false },
          //{ name: 'Select1', displayName: '', cellTemplate: '<button class="btn-primary btn-xs" data-toggle="modal" data-target="#updatestatus" ng-click="grid.appScope.UpdateStatus(row)" data-title="Select"><span></span>Update</button>', width: "58", enableFiltering: false },
          { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'FRName', displayName: 'FR Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'OwnerName', displayName: 'Owner Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Email', displayName: 'Email', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'MobileNo', displayName: 'Mobile No.', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         // { name: 'AddressLine1', displayName: 'Address One', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'AddressLine2', displayName: 'Address Two', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'AddressLine3', displayName: 'Address Three', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Pincode', displayName: 'Pin code', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'AreaCode', displayName: 'Area Code', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'AreaName', displayName: 'Area Name', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'CylinderProviderId', displayName: 'Cylinder Provider Id', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'ItemRefNo', displayName: 'Item Ref No.', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'ItemName', displayName: 'Item Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'ProviderName', displayName: 'Provider Name', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'MonthlyConsumption', displayName: 'Monthly Consumption', cellClass: 'grid-align', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Date', displayName: 'Date', cellClass: 'grid-align', width: "*", type: Date,  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Pending', displayName: 'Pending', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Converted', displayName: 'Converted', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OnHold', displayName: 'OnHold', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Cancel', displayName: 'Cancel', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Total', displayName: 'Total', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //visible: false{ name: 'RefillDelDist', displayName: 'Refill Delivery Distance', visible: false, cellClass: 'grid-align', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'AgencyDist', displayName: 'Agency Distance', visible: false, cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'GoDownDist', displayName: 'Godown Distance', visible: false, cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Latitude', displayName: 'Latitude', visible: false, width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Longitude', displayName: 'Longitude', visible: false, width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         // { name: 'DeliveryMode', displayName: 'Delivery Mode', width: "110", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'New Connection Req Summary Report.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "New Connection Req Summary Report", style: 'headerStyle', alignment: 'center', color: 'red' },
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
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        gridMenuCustomItems: [{
            title: 'Export all data as xls',
            action: function ($event) {
                alasql('SELECT * INTO XLS("New Connection Req Summary Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    //Display FromDate in Todate
    $scope.DefaultDate = function (FromDate) {
        $scope.New.ToDate = FromDate;
    }



    //Bind Records To Grid
    $scope.GetData = function (valid) {
        if (valid) {
            $scope.Getdivshow = false;
            $scope.Getdivhide = true;
            $scope.New.DistCode = $scope.New.DistCode == undefined ? null : $scope.New.DistCode;
            $scope.New.UserCode = $scope.New.UserCode == undefined ? null : $scope.New.UserCode;

            $http({
                method: 'GET',
                url: urianalysis + 'GoFR/GetNewConnectionDetailssummary',
                params: { DistCode: $scope.New.DistCode, FromDate: $scope.New.FromDate, ToDate: $scope.New.ToDate, Status: $scope.New.statusCode, UserCode: $scope.New.UserCode }
            }).then(function (response) {
                $scope.Getdivshow = true;
                $scope.Getdivhide = false;
                //$scope.gridOptions1.data = response.data.Data;
                if (response.data.StatusCode == 0) {

                    SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data.length = 0;


                }
                else {
                    SmartAlert.Success(response.data.Message);

                  $scope.gridOptions1.data = response.data.Data;
                    


                }
                //$sessionStorage.frmdateTotoDate = FromDate + " To " + ToDate;
                $scope.styleFun();
                $scope.mystyle.push($scope.mystyle1);

            })
        }

    }
   
})



app.directive("coupondatepicker", function () {
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
                //maxDate: new Date(),
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
})
app.directive("monthpicker", function ($filter) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText[0].value);
                });
            };
            var options = {
                yearRange: "1960:year",
                showButtonPanel: true,
                changeMonth: true,
                changeYear: true,
                dateFormat: "M-yy",
                maxDate: new Date(),
                onClose: function (dateText, inst) {
                    updateModel($(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1)));
                },
            };
            elem.datepicker(options);
        }
    }

});