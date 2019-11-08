appdash.controller('ApiResponseLogController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('JA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
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
                     { columnid: 'ProcedureName', title: 'Procedure Name' },
                     { columnid: 'ApiName', title: 'Api Name' },
                     { columnid: 'Status', title: 'Status' },
                     { columnid: 'Message', title: 'Message' },

            ],
            row: {
            },
            rows: {
                0: { cell: { style: 'color:black' } },
                1: { cell: { style: 'color:black' } },
                2: { cell: { style: 'color:black' } },
                3: { cell: { style: 'color:black' } },

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
             { name: 'ProcedureName', displayName: 'Procedure Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ApiName', displayName: 'Api Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Status', displayName: 'Status', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Message', displayName: 'Message', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
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

        $scope.GetAPiResponse = function (Status) {

            $scope.divshow = false;
            $scope.divhide = true;



            if (Status == '' || Status == undefined || Status == null) {
                $scope.Status = '';
            }
            else {
                $scope.Status = Status;

            }
            $http.get(uriadmin + 'Report/GetAPIResponseLog?Status=' + $scope.Status + '&FromDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.Success(response.data.Message);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data.length
                }

                $scope.divshow = true;
                $scope.divhide = false;
                $scope.mystyle.push($scope.mystyle1);


            })

        }
    }



});
appdash.controller('RejectLogController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('JB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Rejected Order Log',
            },
            columns: [

            { columnid: 'DistCode', title: 'Distributor Code' },
                      { columnid: 'OrderNo', title: 'Order No' },
                      { columnid: 'OpfNo', title: 'Opf No' },
                      { columnid: 'ProdName', title: 'Product' },
                      { columnid: 'RejectDt', title: 'Rejected On' },
                      { columnid: 'RejectRemark', title: 'Remark' },
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
           [{ name: 'Id', displayName: 'Id', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
               { name: 'DistCode', displayName: 'Dist.Code', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OrderNo', displayName: 'Order No', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'OpfNo', displayName: 'Opf No', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'ProdName', displayName: 'Product', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'RejectDt', displayName: 'Rejected On', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RejectRemark', displayName: 'Remark', width: "210", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'OrderCode', displayName: 'OrderCode', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdCode', displayName: 'ProdCode', width: "210", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
              { name: 'StatusFlag', displayName: 'StatusFlag', width: "210", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

           {
               name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
               cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit">&nbsp;<span class="glyphicon glyphicon-pencil" ></span></button>',
               width: "60"
                  , enableFiltering: false,
           }],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Rejected Order Log.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (entity) {
            $sessionStorage.Id = entity.Id;
            $sessionStorage.OrderNo = entity.OrderNo;
            $sessionStorage.OpfNo = entity.OpfNo;
            $sessionStorage.ProdName = entity.ProdName;
            $sessionStorage.RejectDt = entity.RejectDt;
            $sessionStorage.DistCode = entity.DistCode;
            $sessionStorage.Remark = entity.Remark;
            $sessionStorage.OrderCode = entity.OrderCode;
            $sessionStorage.ProdCode = entity.ProdCode;
            $sessionStorage.StatusFlag = entity.StatusFlag;
            $state.go('app.dashboard.update_reject_log');
        }

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
            $http.get(uriadmin + 'product/GetRejectLog?OrderNo=&DistCode=' + DistCode + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&IsActive=&OrderNo=&ProdCode=&StatusFlag=PE')
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
appdash.controller('UpdateRejectLogController', function ($http, $scope, $filter, $timeout, $state, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.Id = $sessionStorage.Id;
    $scope.OrderNo = $sessionStorage.OrderNo;
    $scope.OpfNo = $sessionStorage.OpfNo;
    $scope.ProdName = $sessionStorage.ProdName;
    $scope.RejectDt = $sessionStorage.RejectDt;
    $scope.DistCode = $sessionStorage.DistCode;
    $scope.OrderCode = $sessionStorage.OrderCode;
    $scope.Remark = $sessionStorage.Remark;

    $scope.SaveUpdate = function (valid, Remark) {
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.reject = {};
            $scope.reject.ID = $sessionStorage.Id;
            $scope.reject.DistCode = $sessionStorage.DistCode;
            $scope.reject.OrderCode = $sessionStorage.OrderCode;
            $scope.reject.OrderNo = $sessionStorage.OrderNo;
            $scope.reject.OpfNo = $sessionStorage.OpfNo;
            $scope.reject.ProdCode = $sessionStorage.ProdCode;
            $scope.reject.StatusFlag = $sessionStorage.StatusFlag;
            $scope.reject.Remark = Remark;
            $scope.reject.UserCode = $sessionStorage.ucode;
            $scope.reject.Flag = 'UP';
            var json = angular.toJson($scope.reject)
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key });
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $scope.getAuth();
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'product/UpdateRejectLog',
            data: { Data: $scope.ciphertext }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                //SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;

                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.reject_log');
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
appdash.controller('OPFAMCLogController', function ($http, $scope, $filter, $timeout, $state, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('JC');
    $sessionStorage.currentstate = $state.current.name;
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
               //{
               //    name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
               //    cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit">&nbsp;<span class="glyphicon glyphicon-pencil" ></span></button>',
               //    width: "60"
               //   , enableFiltering: false,
               //},
               { name: 'LogID', displayName: 'Log Id', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
               { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'TokenNo', displayName: 'token No', width: "180", cellTooltip: true, type: 'numberStr', headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Module', displayName: 'Module', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'MFlag', displayName: 'Product', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'Status', displayName: 'Status', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'CreatedDt', displayName: 'Remark', width: "210", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //  { name: 'CreatedBy', displayName: 'OrderCode', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             

           ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: true,
            exporterMenuCsv: false,
            exporterExcelFilename: 'OPF AMC Log.xlsx',
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
                cols.push({ value: 'OPF AMC Log', metadata: { style: formatterId.id } });
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



        $scope.GetSearch = function () {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.DistCode = $scope.DistCode != null ? $scope.DistCode : "";
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Report/GetAMCOPFLog?LogID=&TokenNo=&Fromdate=&DistCode=' + $scope.DistCode + '&MFlag=&Status')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
        };
    }
});