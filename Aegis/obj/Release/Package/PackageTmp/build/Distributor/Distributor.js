appdash.controller('DistributorOnboardingGridController', function ($http, $scope, $filter, $timeout, uriadmin, $state, userService, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {

    $scope.getAgencyAddressDetails = function () {
        $sessionStorage.dCode = null;
        $http.get(uriadmin + 'Distributor/GetDistributorDtlsToUpdate?DistCode=').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.Success(response.data.Message);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.getAgencyAddressDetails();

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
                 name: 'Edit', displayName: '', headerCellTemplate: '<div>Edit</div>',
                 cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                 width: "40", enableFiltering: false, enableHiding: false
             },
        { name: 'DistCode', displayName: 'Distributor Code', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'AuthCode', displayName: 'Authentication Code', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'GstnNo', displayName: 'GST No.', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'MobileNo', displayName: 'Mobile No.', width: "120", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'EmailAddress', displayName: 'Email Address', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'StockiestName', displayName: 'Stockiest Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
   
        ],
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuExcel: true,
        exporterMenuCsv: false,
        enableSelectAll: true,
        exporterSuppressColumns: ['Edit'],
        exporterExcelFilename: 'On-boarding Distributors.xlsx',
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
            cols.push({ value: 'On-boarding Distributors', metadata: { style: formatterId.id } });
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


    $scope.select = function (DistCode) {
        $sessionStorage.dCode = DistCode;
        $state.go('app.dashboard.distributor_onboarding');
    }
});
appdash.controller('DistributorOnboadringController', function ($http, $scope, $filter, $element, $timeout, $state, uriadmin, uri, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag, globalService) {
    globalService.state().then(function (response) {
        $scope.allStates = response == null ? {} : response;
    });
    $scope.getDistrict = function (StateCode) {
        globalService.district(StateCode).then(function (response) {
            $scope.allDistricts = response == null ? {} : response;
        });
    }
    $scope.getCity = function (StateCode, DistrictCode) {
        globalService.city(StateCode, DistrictCode).then(function (response) {
            $scope.allCities = response == null ? {} : response;
        });
    }
    $scope.distinfo = { IsGST: 'GS' };
    $scope.aggaddr = {};
    $scope.DIFlag = $sessionStorage.dCode != null ? 'UP' : null;
    //$scope.hideForm = function (flag) {
    //    if (flag == null) {
    //        $scope.DIFlag = null;
    //        $scope.distinfo = { IsGST: 'Y' };
    //    }
    //    else if (flag == "UP" && $scope.distinfo.DistCode != null) {
    //        $scope.DIFlag = "UP";
    //    }
    //}
    $scope.getStockiest = function () {
        $http.get(uriadmin + 'Distributor/GetDistributorStockist?IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.stockiestData = response.data.Data;
                $scope.stockiestData.unshift({
                    "distcode": "Self",
                    "distname": "Self"
                })



            }
            else {
                $scope.stockiestData=[{
                    "distcode": "Self",
                    "distname": "Self"
                }]
            }
            
        });
    }
    $scope.getStockiest();
    $scope.setNull = function () {
        if ($scope.distinfo.PartnerName != null && $scope.distinfo.PartnerName != "") {
            $scope.distinfo.PartnerName = null;
        }
        if ($scope.distinfo.PartnerName1 != null && $scope.distinfo.PartnerName1 != "") {
            $scope.distinfo.PartnerName1 = null;
        }
    }

    $scope.toChangeFlag = function () {
        if ($scope.distinfo.IsGST == "GS" && $scope.distinfo.GstnNo) {
            $scope.distinfo.ProvGstNo = $scope.DIFlag == "UP" ? $scope.distinfo.ProvGstNo : null;
            $scope.distinfo.ReqGstNo = $scope.DIFlag == "UP" ? $scope.distinfo.ReqGstNo : null;
        }
        else {
            $scope.distinfo.GstnNo = $scope.DIFlag == "UP" ? $scope.distinfo.GstnNo : null;
        }
    }

    $scope.getOwnerDetails = function () {
        $http.get(uriadmin + 'Distributor/GetDistributorOwnerDtls?DistCode=' + $scope.distinfo.DistCode).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.ownerdet = angular.merge($scope.ownerdet, response.data.Data[0]);
                $scope.ownerdet.FirstName = $scope.ownerdet.OwnerFirstName;
                $scope.ownerdet.LastName = $scope.ownerdet.OwnerLastName;
                $scope.ODFlag = "UP";
            }
            $scope.getAgencyAddressDetails('OW');
        });
    }

    $scope.getAgencyAddressDetails = function (addrType) {
        $http.get(uriadmin + 'Distributor/GetDistributorAddressDtls?AddressRefNo=&DistCode=' + $scope.distinfo.DistCode + '&AddressType=' + addrType).then(function (response) {
            if (response.data.StatusCode != 0) {
                if (addrType == "") {
                    $scope.AgAddrDet = response.data.Data;
                    var index = $scope.AgAddrDet.indexOf($filter('filter')($scope.AgAddrDet, { AddressType: "OW" })[0]);
                    if ($scope.AgAddrDet.length == 1 && $scope.AgAddrDet[0].AddressType == "OW") {
                        $scope.AgAddrDet = {};
                    }
                    else {
                        $scope.AgAddrDet.splice(1, index);
                    }
                }
                else {
                    $scope.ownerdet = angular.merge($scope.ownerdet, response.data.Data[0]);
                    $scope.getDistrict($scope.ownerdet.StateCode);
                    $scope.getCity($scope.ownerdet.StateCode, $scope.ownerdet.DistrictCode);
                    $scope.OAFlag = "UP";
                }
                $scope.getAgAddrType("VJ");
            }
            else {
                $scope.AgAddrDet = null;
            }
        });
    }

    $scope.getAgAddrType = function (type) {
        $scope.AAFlag = null;
        if ($scope.AgAddrDet != null) {
            $scope.sas = $filter('filter')($scope.AgAddrDet, { AddressType: type });
            if ($scope.sas.length != 0 && type == "AG") {
                $scope.AAFlag = "UP";
            }
            else if ($scope.sas.length != 0 && type == "GD") {
                $scope.AAFlag = "UP";
            }
        }
    }

    $scope.getDistributorInformation = function (distcode) {
        $scope.distinfo.DistCode = distcode;
        if ($scope.distinfo.DistCode) {
            $http.get(uriadmin + 'Distributor/GetDistributorDtlsToUpdate?DistCode=' + $scope.distinfo.DistCode).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.distinfo = response.data.Data[0];
                    $scope.distinfo.RegDate = $filter('date')(new Date($scope.distinfo.RegDate), 'dd-MMM-yyyy');
                    $scope.distinfo.GstRegDate = $filter('date')(new Date($scope.distinfo.GstRegDate), 'dd-MMM-yyyy');
                    //  $scope.aggaddr = response.data.Data[0];
                    $scope.ownerdet = response.data.Data[0];
                    $scope.DIFlag = "UP";
                    $scope.distinfo.IsGST = "GS";
                    $scope.getAgencyAddressDetails('');
                    $scope.getOwnerDetails();
                }
                else {
                    $scope.distinfo = { IsGST: 'GS', DistCode: $scope.distinfo.DistCode };
                    $scope.ownerdet = null;
                    $scope.AgAddrDet = [];
                    $scope.allDistricts = [];
                    $scope.allCities = [];
                }
            });
        }
        else {
            $scope.distinfo = { IsGST: 'GS' };
            $scope.ownerdet = null;
            $scope.AgAddrDet = [];
            $scope.allDistricts = [];
            $scope.allCities = [];
        }
    }
    $scope.getDistributorInformation($sessionStorage.dCode);

    $scope.setStep = function (step) {
        var $prev = $('[data-smart-wizard-prev]', $element);
        $('[data-smart-wizard-pane=' + step + ']', $element).addClass('active').siblings('[data-smart-wizard-pane]').removeClass('active');
        $('[data-smart-wizard-tab=' + step + ']', $element).addClass('active').siblings('[data-smart-wizard-tab]').removeClass('active');
        $prev.toggleClass('disabled', step == 1)
    }

    $scope.saveDistInfo = function (valid) {
        if (valid) {
            $scope.distinfo.UserCode = $sessionStorage.UserCode;
            $scope.distinfo.StkiestDistCode = $scope.distinfo.StkiestDistCode == 'Self' ? $scope.distinfo.DistCode : $scope.distinfo.StkiestDistCode;
            var ladda = Ladda.create(document.activeElement)
            if ($scope.DIFlag != "UP") {
                ladda.start();
                //$scope.ciphertext = globalService.create($scope.onboard);  InsertNewDistributorAndAuthCode
                $http.post(uriadmin + 'Distributor/InsertNewDistributorBriefInfo', $scope.distinfo).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        //$scope.setStep(2);
                        $scope.distinfo = { IsGST: 'GS' };
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
            else {
                ladda.start();
                $http.post(uriadmin + 'Distributor/UpdateDistributorInfo', $scope.distinfo).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        //   SmartAlert.Success(response.data.Message);
                        $scope.setStep(2);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
        }
    };

    $scope.saveAgencyAddress = function (valid, addrtype) {
        if (valid) {
            $scope.aggaddr.UserCode = $sessionStorage.ucode;
            $scope.aggaddr.AddressType = addrtype;
            $scope.aggaddr.DistCode = $scope.distinfo.DistCode;
            var ladda = Ladda.create(document.activeElement);
            if ($scope.AAFlag != "UP") {
                ladda.start();
                $http.post(uriadmin + 'Distributor/InsertDistributorAddress', $scope.aggaddr).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        // SmartAlert.Success(response.data.Message);
                        $scope.getAgencyAddressDetails("");
                        $scope.aggaddr = null;
                        // $scope.setStep(3);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
            else {
                ladda.start();
                $http.post(uriadmin + 'Distributor/UpdateDistributorAddress', $scope.aggaddr).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        // SmartAlert.Success(response.data.Message);
                        $scope.getAgencyAddressDetails("");
                        $scope.aggaddr = null;
                        //  $scope.setStep(3);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
        }
    };

    $scope.viewAGAddr = function (data) {
        $scope.aggaddr = data;
        $scope.getCity(data.StateCode, data.DistrictCode);
    }

    $scope.saveOwnerDetails = function (valid) {
        if (valid) {
            $scope.ownerdet.UserCode = $sessionStorage.ucode;
            var ladda = Ladda.create(document.activeElement);
            if ($scope.ODFlag != "UP") {
                ladda.start();
                $http.post(uriadmin + 'Distributor/InsertDistributorOwnerDetails', $scope.ownerdet).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        //    SmartAlert.Success(response.data.Message);
                        $scope.getOwnerDetails();
                        $scope.setStep(4);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
            else {
                ladda.start
                $http.post(uriadmin + 'Distributor/UpdateDistributorOwnerDetails', $scope.ownerdet).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        //     SmartAlert.Success(response.data.Message);
                        $scope.getOwnerDetails();
                        $scope.setStep(4);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
        }
    };

    $scope.saveOwnerAddress = function (valid, addrtype) {
        if (valid) {
            $scope.ownerdet.UserCode = $sessionStorage.ucode;
            $scope.ownerdet.AddressType = addrtype;
            var ladda = Ladda.create(document.activeElement);
            if ($scope.OAFlag != "UP") {
                ladda.start();
                $http.post(uriadmin + 'Distributor/InsertDistributorAddress', $scope.ownerdet).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        // $scope.getAgencyAddressDetails("OW");
                        //$scope.ownerdet = null;
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
            else {
                ladda.start();
                $http.post(uriadmin + 'Distributor/UpdateDistributorAddress', $scope.ownerdet).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        //$scope.getAgencyAddressDetails("OW");
                        // $scope.ownerdet = null;
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    ladda.stop();
                });
            }
        }
    };

});

appdash.controller('ConnectDistributorController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('CB');
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
                    style: 'font-size:15px;color:black',
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'DistName', title: 'Distributor Name' },
             { columnid: 'City', title: 'City' },
                ],

                rows: {
                    0: { cell: { style: 'color:black' } },
                    1: { cell: { style: 'color:black' } },
                    2: { cell: { style: 'color:black' } },

                },

            };
            $scope.mystyle = [];
        }
        $scope.getDistCode = [{ DistCode: 'C', DistType: 'Distributor Code' }, { DistCode: 'N', DistType: 'Distributor Name' }];
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

            { name: 'DistCode', displayName: 'Distributor Code', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ExpDate', displayName: 'Expire Date', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, Visible: false },
            { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'City', displayName: 'City', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },


            {
                name: 'Connect', displayName: 'Connect', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs" id="btngrid" ng-click="grid.appScope.select(row.entity.DistCode,row.entity.DistName,row.entity.City,row.entity.ExpDate)" data-title="Edit">Connect</button>',
                width: "70"
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
                    alasql('SELECT * INTO XLS("Connect Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (DistCode, DistName, City, ExpDate) {

            $sessionStorage.ConnectDistCode = DistCode;
            $sessionStorage.ConnectDistName = DistName;
            $sessionStorage.ConnectCity = City;
            $sessionStorage.ExpDate = ExpDate;
            SmartAlert.Success('Distributor is connected' + '  ' + $sessionStorage.ConnectDistCode);


        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetSearch = function (valid, Connect) {
            if (valid == true) {
                $scope.divshow = false;
                $scope.divhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

                if ($scope.Connect.DistType == 'C') {
                    $scope.DistCode = $scope.Connect.Search;
                    $scope.DistName = ' ';
                }
                if ($scope.Connect.DistType == 'N') {
                    $scope.DistCode = ' ';
                    $scope.DistName = $scope.Connect.Search;
                }
                $http.get(uriadmin + 'Distributor/getconnect?DistCode=' + $scope.DistCode + '&DistName=' + $scope.DistName + '&IsActive=')
                .then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'CD') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.Stylefun();
                    $scope.mystyle.push($scope.mystyle1);
                })

                $scope.divshow = true;
                $scope.divhide = false;
            }
            else {
                //SmartAlert.Errmsg('Please Provide Distributor Code Or Distributor Name');
            }

        };
        $scope.FirstInitialization = function () {
            $scope.disConnectcode = true;
            $scope.disConnectname = false;
            $scope.valueOf = 'Distributor Code';

        }
        $scope.FirstInitialization();

        $scope.change = function (DistType) {
            $scope.DistType = DistType;
            if ($scope.DistType == 'C') {
                $scope.disConnectcode = true;
                $scope.disConnectname = false;
                $scope.Connect.Search = '';
                $scope.valueOf = 'Distributor Code';
            }
            if ($scope.DistType == 'N') {
                $scope.disConnectcode = false;
                $scope.disConnectname = true;
                $scope.Connect.Search = '';
                $scope.valueOf = 'Distributor Name';
            }
        };
    }

});

appdash.controller('DistInfoController', function ($http, $scope, $filter, $timeout, userService, uriadmin, SweetAlert, uri, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    $scope.newArr = [];
    $scope.columns = [];
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
        if (flagvalue == 'E') {
            $scope.nameof = 'EzeTap';
            $scope.columns =
                [
                 { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'PushHCode', displayName: 'EzeTap Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'CompHCode', displayName: 'Company Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                {
                    name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-danger btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove">&nbsp;<span class="glyphicon glyphicon-remove"></span></button>', width: "50", enableFiltering: false, enableCellEdit: false, enableSorting: false, showSortMenu: false, enableColumnMenu: false,
                }
                ];
            //$scope.gridOptions1.columnDefs = $scope.columns;
        }
        else {
            $scope.nameof = 'Pushpam';

            $scope.columns =
                [
                 { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'PushHCode', displayName: 'Pushpam Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'CompHCode', displayName: 'Company Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                {
                    name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-danger btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove">&nbsp;<span class="glyphicon glyphicon-remove"></span></button>', width: "50", enableFiltering: false, enableCellEdit: false, enableSorting: false, showSortMenu: false, enableColumnMenu: false,
                }
                ];
            //$scope.gridOptions1.columnDefs = $scope.columns;
        }
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
        $scope.nameof = 'Pushpam';

        $scope.columns =
            [
             { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
             { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
             { name: 'PushHCode', displayName: 'Pushpam Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
             { name: 'CompHCode', displayName: 'Company Hierarchy Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            {
                name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-danger btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove">&nbsp;<span class="glyphicon glyphicon-remove"></span></button>', width: "50", enableFiltering: false, enableCellEdit: false, enableSorting: false, showSortMenu: false, enableColumnMenu: false,
            }
            ];
        // $scope.gridOptions1.columnDefs = $scope.columns;
    }
    var valueof = userService.Success('CC');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        {
            $sessionStorage.currentstate = $state.current.name;

            $scope.j = 0;
            $scope.AddRow = function (DistInfo, valid) {
                if (valid == true) {
                    $scope.already = false;
                    $scope.dis = true;
                    $scope.DistInfo = DistInfo;
                    $scope.dis = $scope.DistInfo.DistCode;
                    $scope.distc = $scope.dis.split(",");
                    if ($scope.j < $scope.distc.length) {
                        var j = $scope.j != null ? $scope.j : 0;
                    }
                    else {
                        $scope.j = 0;
                        $scope.DistInfo.DistCode = null;
                        return;
                    }
                    if ($sessionStorage.row == null || $sessionStorage.row == undefined) {
                        $scope.DistCode = $scope.distc[$scope.j];
                        $http({
                            method: 'GET',
                            url: uriadmin + 'Distributor/getconnect',
                            params:
                                {
                                    DistCode: $scope.DistCode, DistName: null, IsActive: null
                                }
                        })
                            .then(function (response) {
                                if (response.data.StatusCode != 0) {
                                    $scope.getdistinfo = response.data.Data;
                                    $scope.getdisti = $scope.getdistinfo[0];
                                    $scope.DistName = $scope.getdisti.DistName;
                                    var sc = {
                                        DistCode: $scope.DistCode, DistName: $scope.DistName, PushHCode: $scope.DistInfo.PushHCode, CompHCode: $scope.DistInfo.CompHCode
                                    }
                                    if ($scope.gridOptions1.data.length > 0) {
                                        for (var i = 0; i < $scope.gridOptions1.data.length; i++) {

                                            if (($scope.gridOptions1.data[i].DistCode == $scope.DistCode) && ($scope.gridOptions1.data[i].PushHCode == $scope.DistInfo.PushHCode) && ($scope.gridOptions1.data[i].CompHCode == $scope.DistInfo.CompHCode)) {
                                                $scope.already = true;
                                            }
                                            if (($scope.gridOptions1.data[i].DistCode == $scope.DistCode)) {
                                                $scope.already = true;
                                            }
                                        }
                                        if ($scope.already == false) {
                                            $scope.gridOptions1.data.push(sc);
                                        }
                                        else {
                                            SmartAlert.Errmsg('Distributor already exists of this hierarchy !');
                                        }
                                    } else {
                                        $scope.gridOptions1.data.push(sc);
                                    }

                                }
                                else {

                                    $scope.newArr.push($scope.DistCode);
                                    $sessionStorage.newArrdata = $scope.newArr;
                                    SweetAlert.swal
                                    ({
                                        title: '',
                                        text: ' Following Distributor does not exists !\n\n' + $scope.newArr + ' .'
                                    },
                                function (isConfirm) {
                                    $scope.newArr = [];
                                });


                                    // SmartAlert.Errmsg('Distributor does not exists !');
                                    //SmartAlert.Errmsg(response.data.Message);
                                }
                                $scope.j = $scope.j + 1;
                                $scope.AddRow($scope.DistInfo, true);
                            })
                    }
                    else {
                        var base65 = base64.encode(Name + ':' + Password);
                        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                        $http({
                            method: 'GET',
                            url: uriadmin + 'Distributor/getconnect',
                            params:
                                {
                                    DistCode: $scope.DistCode, DistName: null, IsActive: null
                                }
                        }).then(function (response) {
                            if (response.data.StatusCode != 0) {

                                $scope.getdistinfo = response.data.Data;
                                $scope.getdisti = $scope.getdistinfo[0];
                                $scope.DistName = $scope.getdisti.DistName;
                                var sc = {
                                    DistCode: $scope.DistCode, DistName: $scope.DistName, PushHCode: $scope.DistInfo.PushHCode, CompHCode: $scope.DistInfo.CompHCode
                                }
                                var arr = $scope.gridOptions1.data;

                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].$$hashKey === $sessionStorage.row) {
                                        arr[i] = sc;
                                    }
                                }
                            }
                            else {
                                SmartAlert.Errmsg('Distributor does not exists !');
                                //SmartAlert.Errmsg(response.data.Message);
                            }
                        })
                    }
                    //  }
                    //  $scope.getValue();
                }

            }

            $scope.UpdateInfo = function (DistInfo) {

                if (DistInfo != null) {
                    if ($scope.gridOptions1.data.length > 0) {
                        $scope.DistInfo = DistInfo;
                        $scope.DistInfo.UserCode = $sessionStorage.ucode;

                        $scope.obj = $scope.gridOptions1.data;

                        for (var i = 0; i < $scope.obj.length; i++) {
                            delete $scope.obj[i].$$hashKey;
                            delete $scope.obj[i].DistName;
                            delete $scope.obj[i].PushHCode;
                            delete $scope.obj[i].CompHCode;
                        }

                        $scope.getAuth();
                    }
                    else {
                        SmartAlert.Errmsg("No record found in grid");
                    }

                }
            };
            $scope.getAuth = function () {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: "POST",
                    url: uriadmin + 'Distributor/UpdateHierarchy',
                    data: {
                        Data: $scope.obj,
                        "PushHCode": $scope.DistInfo.PushHCode,
                        "CompHCode": $scope.DistInfo.CompHCode,
                        "UserCode": $scope.DistInfo.UserCode

                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.divshow = true;
                        $scope.divhide = false;
                        SmartAlert.Success(response.data.Message);
                        $scope.submit = 'Submit';
                        $scope.DistInfo.PushHCode = '';
                        $scope.DistInfo.CompHCode = '';
                        $scope.DistInfo.DistCode = '';
                        $scope.gridOptions1.data.length = 0;
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }

                    $scope.divshow = true;
                    $scope.divhide = false;
                });

            }
            $scope.AssignValue = function () {
                $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
                $scope.ConnectDistName = $sessionStorage.ConnectDistName;
                $scope.ConnetDistCity = $sessionStorage.ConnectCity;
            }
            $scope.AssignValue();
        }

    }
    //grid1
    $scope.mystyle = {
        headers: true,
        style: 'font-size:19px;color:black',
        caption: {
            title: 'Place Order Details',
        },
        column: {
            style: 'font-size:15px;color:black'
        },
        columns: [
         { columnid: 'DistCode', title: 'Distributor Code' },
         { columnid: 'DistName', title: 'Distributor Name' }

        ],
        rows: {
            0: { cell: { style: 'color:black' } },
            1: { cell: { style: 'color:black' } }

        },
        cells: {
            2: {
                2: {
                }
            }
        },
    };
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.Remove = function (row) {
        var index = $scope.gridOptions1.data.indexOf(row.entity);
        $scope.gridOptions1.data.splice(index, 1);
        var countitem = $scope.gridOptions1.data.length;
    }
    //var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
    $scope.gridOptions1 = {
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },

        paginationPageSizes: [25, 50, 100, 500, 1000],
        paginationPageSize: 25,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        columnDefs: $scope.columns,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false,
        gridMenuCustomItems: [{
            title: 'Export all data as excel',
            action: function ($event) {
                alasql('SELECT * INTO XLS("Distributor Hierarchy.xls",?) FROM ?', [$scope.mystyle, $scope.gridOptions1.data]);
            },
            order: 110
        }]

    };

    $scope.forpushpam = function () {
        $http.get(uriadmin + 'setting/GetHierarchyInfo?HsId=&HsType&HsFor=PG&IsActive&ZoneId=&RegionId=').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.dropData = response.data.Data.Table;
            }
            else {
                $scope.dropData = [];
            }
        })
    }
    $scope.forpushpam();

    $scope.forcompany = function () {
        $http.get(uriadmin + 'setting/GetHierarchyInfo?HsId=&HsType&HsFor=CO&IsActive&ZoneId=&RegionId=').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.dropDataCo = response.data.Data.Table;
            }
            else {
                $scope.dropData = [];
            }
        })
    }
    $scope.forcompany();
});

appdash.controller('ProductAllocationController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.ezyhide = false;
    }
    var valueof = userService.Success('CDA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {


        if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
            $state.go('app.dashboard.connect_distributor');
        }
        else {
            $sessionStorage.currentstate = $state.current.name;
            $scope.GetSearch = function () {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Distributor/getprodallocation?PAllocId=' + ' ' + '&DistCode=' + $sessionStorage.ConnectDistCode)
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            var GetDetails = response.data.Data;
                            $scope.Product = GetDetails[0];
                            $sessionStorage.PAllocId = $scope.Product.PAllocId;
                            $scope.submit = 'Update';
                        }
                        else {
                            $scope.submit = 'Submit';
                            //SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.mshow = true;
                        $scope.mhide = false;
                    })


            };
            $scope.GetSearch();
            $scope.SaveProductDetails = function (valid, Product) {

                if (valid == true) {

                    if ($sessionStorage.PAllocId != null) {
                        $scope.Product = Product;
                        $scope.Product.CreatedBy = $sessionStorage.ucode;
                        $scope.Product.Flag = 'UP';
                        $scope.Product.DistCode = $sessionStorage.ConnectDistCode;
                        if ($scope.Product.IsXpGas == '' || $scope.Product.IsXpGas == undefined || $scope.Product.IsXpGas == null) {
                            $scope.Product.IsXpGas = 'N';
                        }
                        if ($scope.Product.IsXpSafety == '' || $scope.Product.IsXpSafety == undefined || $scope.Product.IsXpSafety == null) {
                            $scope.Product.IsXpSafety = 'N';
                        }
                        if ($scope.Product.IsXpConnect == '' || $scope.Product.IsXpConnect == undefined || $scope.Product.IsXpConnect == null) {
                            $scope.Product.IsXpConnect = 'N';
                        }
                        if ($scope.Product.IsXpPay == '' || $scope.Product.IsXpPay == undefined || $scope.Product.IsXpPay == null) {
                            $scope.Product.IsXpPay = 'N';
                        }
                        if ($scope.Product.IsXpReview == '' || $scope.Product.IsXpReview == undefined || $scope.Product.IsXpReview == null) {
                            $scope.Product.IsXpReview = 'N';
                        }
                        if ($scope.Product.IsXpMantra == '' || $scope.Product.IsXpMantra == undefined || $scope.Product.IsXpMantra == null) {
                            $scope.Product.IsXpMantra = 'N';
                        }
                        if ($scope.Product.IsXpSuvidha == '' || $scope.Product.IsXpSuvidha == undefined || $scope.Product.IsXpSuvidha == null) {
                            $scope.Product.IsXpSuvidha = 'N';
                        }
                        if ($scope.Product.IsXpSupport == '' || $scope.Product.IsXpSupport == undefined || $scope.Product.IsXpSupport == null) {
                            $scope.Product.IsXpSupport = 'N';
                        }
                        if ($scope.Product.IsXpSocial == '' || $scope.Product.IsXpSocial == undefined || $scope.Product.IsXpSocial == null) {
                            $scope.Product.IsXpSocial = 'N';
                        }

                        var json = angular.toJson($scope.Product)
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
                        $scope.Product = Product;
                        $scope.Product.CreatedBy = $sessionStorage.ucode;
                        $scope.Product.Flag = 'IN';
                        $scope.Product.DistCode = $sessionStorage.ConnectDistCode;
                        if ($scope.Product.IsXpGas == '' || $scope.Product.IsXpGas == undefined || $scope.Product.IsXpGas == null) {
                            $scope.Product.IsXpGas = 'N';
                        }
                        if ($scope.Product.IsXpSafety == '' || $scope.Product.IsXpSafety == undefined || $scope.Product.IsXpSafety == null) {
                            $scope.Product.IsXpSafety = 'N';
                        }
                        if ($scope.Product.IsXpConnect == '' || $scope.Product.IsXpConnect == undefined || $scope.Product.IsXpConnect == null) {
                            $scope.Product.IsXpConnect = 'N';
                        }
                        if ($scope.Product.IsXpPay == '' || $scope.Product.IsXpPay == undefined || $scope.Product.IsXpPay == null) {
                            $scope.Product.IsXpPay = 'N';
                        }
                        if ($scope.Product.IsXpReview == '' || $scope.Product.IsXpReview == undefined || $scope.Product.IsXpReview == null) {
                            $scope.Product.IsXpReview = 'N';
                        }
                        if ($scope.Product.IsXpMantra == '' || $scope.Product.IsXpMantra == undefined || $scope.Product.IsXpMantra == null) {
                            $scope.Product.IsXpMantra = 'N';
                        }
                        if ($scope.Product.IsXpSuvidha == '' || $scope.Product.IsXpSuvidha == undefined || $scope.Product.IsXpSuvidha == null) {
                            $scope.Product.IsXpSuvidha = 'N';
                        }
                        if ($scope.Product.IsXpSupport == '' || $scope.Product.IsXpSupport == undefined || $scope.Product.IsXpSupport == null) {
                            $scope.Product.IsXpSupport = 'N';
                        }
                        if ($scope.Product.IsXpSocial == '' || $scope.Product.IsXpSocial == undefined || $scope.Product.IsXpSocial == null) {
                            $scope.Product.IsXpSocial = 'N';
                        }

                        var json = angular.toJson($scope.Product)
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
                    url: uriadmin + 'Distributor/postallocation',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.divshow = true;
                        $scope.divhide = false;
                        SmartAlert.Success(response.data.Message);
                        $scope.submit = 'Update';

                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
                $sessionStorage.PAllocId = null;
                $scope.GetSearch();
            }
            $scope.AssignValue = function () {
                $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
                $scope.ConnectDistName = $sessionStorage.ConnectDistName;
                $scope.ConnetDistCity = $sessionStorage.ConnectCity;
            }
            $scope.AssignValue();
        }

    }

});

appdash.controller('ManageServiceController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    var valueof = userService.Success('CDB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
            $state.go('app.dashboard.connect_distributor');
        }
        else {
            $sessionStorage.currentstate = $state.current.name;
            $scope.GetSearch = function () {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Distributor/getservices?Mserid=' + ' ' + '&DistCode=' + $sessionStorage.ConnectDistCode)
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            var GetDetails = response.data.Data;
                            $scope.Manage = GetDetails[0];
                            $scope.Manage.IsFeedbackl = $scope.Manage.IsFeedbackDel == 'Y' ? 'Y' : 'N';
                            $sessionStorage.Mserid = $scope.Manage.Mserid;
                            $scope.submit = 'Update';
                        }
                        else {
                            $scope.submit = 'Submit';
                            //SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.mshow = true;
                        $scope.mhide = false;
                    })


            };
            $scope.GetSearch();
            $scope.SaveManageDetails = function (valid, Manage) {

                if (valid == true) {

                    if ($sessionStorage.Mserid != null) {
                        $scope.Manage = Manage;
                        $scope.Manage.CreatedBy = $sessionStorage.ucode;
                        $scope.Manage.Flag = 'UP';
                        $scope.Manage.DistCode = $sessionStorage.ConnectDistCode;
                        if ($scope.Manage.IsDac == '' || $scope.Manage.IsDac == null) {
                            $scope.Manage.IsDac = 'N';
                        }
                        if ($scope.Manage.IsOffPunching == '' || $scope.Manage.IsOffPunching == null) {
                            $scope.Manage.IsOffPunching = 'N';
                        }
                        if ($scope.Manage.IsMissedCallBook == '' || $scope.Manage.IsMissedCallBook == null) {
                            $scope.Manage.IsMissedCallBook = 'N';
                        }
                        if ($scope.Manage.IsNewSmartCard == '' || $scope.Manage.IsNewSmartCard == null) {
                            $scope.Manage.IsNewSmartCard = 'N';
                        }
                        if ($scope.Manage.IsWelcomeMsg == '' || $scope.Manage.IsWelcomeMsg == null) {
                            $scope.Manage.IsWelcomeMsg = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == '' || $scope.Manage.IsFeedbackl == null) {
                            $scope.Manage.IsFeedbackDel = 'N';
                            $scope.Manage.IsFeedbackSafety = 'N';
                            $scope.Manage.IsSMSSending = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == 'N') {
                            $scope.Manage.IsFeedbackDel = 'N';
                            $scope.Manage.IsFeedbackSafety = 'N';
                            $scope.Manage.IsSMSSending = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == 'Y') {
                            $scope.Manage.IsFeedbackDel = 'Y';
                            $scope.Manage.IsFeedbackSafety = 'Y';
                            $scope.Manage.IsSMSSending = 'Y';
                        }


                        var json = angular.toJson($scope.Manage)
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
                        $scope.Manage = Manage;
                        $scope.Manage.CreatedBy = $sessionStorage.ucode;
                        $scope.Manage.Flag = 'IN';
                        $scope.Manage.DistCode = $sessionStorage.ConnectDistCode;
                        if ($scope.Manage.IsDac == '' || $scope.Manage.IsDac == undefined || $scope.Manage.IsDac == null) {
                            $scope.Manage.IsDac = 'N';
                        }
                        if ($scope.Manage.IsOffPunching == '' || $scope.Manage.IsOffPunching == undefined || $scope.Manage.IsOffPunching == null) {
                            $scope.Manage.IsOffPunching = 'N';
                        }
                        if ($scope.Manage.IsMissedCallBook == '' || $scope.Manage.IsMissedCallBook == undefined || $scope.Manage.IsMissedCallBook == null) {
                            $scope.Manage.IsMissedCallBook = 'N';
                        }
                        if ($scope.Manage.IsNewSmartCard == '' || $scope.Manage.IsNewSmartCard == undefined || $scope.Manage.IsNewSmartCard == null) {
                            $scope.Manage.IsNewSmartCard = 'N';
                        }
                        if ($scope.Manage.IsWelcomeMsg == '' || $scope.Manage.IsWelcomeMsg == undefined || $scope.Manage.IsWelcomeMsg == null) {
                            $scope.Manage.IsWelcomeMsg = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == '' || $scope.Manage.IsFeedbackl == undefined || $scope.Manage.IsFeedbackl == null) {
                            $scope.Manage.IsFeedbackDel = 'N';
                            $scope.Manage.IsFeedbackSafety = 'N';
                            $scope.Manage.IsSMSSending = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == 'N') {
                            $scope.Manage.IsFeedbackDel = 'N';
                            $scope.Manage.IsFeedbackSafety = 'N';
                            $scope.Manage.IsSMSSending = 'N';
                        }
                        if ($scope.Manage.IsFeedbackl == 'Y') {
                            $scope.Manage.IsFeedbackDel = 'Y';
                            $scope.Manage.IsFeedbackSafety = 'Y';
                            $scope.Manage.IsSMSSending = 'Y';
                        }

                        var json = angular.toJson($scope.Manage)
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
                    url: uriadmin + 'Distributor/postmyservices',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.divshow = true;
                        $scope.divhide = false;
                        $sessionStorage.Mserid = null;
                        SmartAlert.Success(response.data.Message);
                        $scope.submit = 'Update';
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
                $sessionStorage.PAllocId = null;
                $scope.GetSearch();
            }

            $scope.AssignValue = function () {
                $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
                $scope.ConnectDistName = $sessionStorage.ConnectDistName;
                $scope.ConnetDistCity = $sessionStorage.ConnectCity;
            }
            $scope.AssignValue();
        }

    }

});

appdash.controller('ManageUserController', function ($http, $scope, $filter, $timeout, uriadmin, userService, $state, $rootScope, $sessionStorage, uri, base64, SmartAlert, Name, Password) {

    var valueof = userService.Success('CDC');
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
                    title: 'Manage User Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistName', title: 'Distributor Name' },
             { columnid: 'StaffCode', title: 'Staff Code' },
             { columnid: 'FirstName', title: 'First Name' },
             { columnid: 'LastName', title: 'Last Name' },
             { columnid: 'EmailAddress', title: 'Email Address' },
                { columnid: 'Updatedby1', title: 'Last Updated By' },
              { columnid: 'UpdateDt', title: 'Last Updated Date' },
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

            { name: 'DistName', displayName: 'Distributor Name', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'StaffCode', displayName: 'Staff Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'LastName', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UserPwd', displayName: 'Last Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'EmailAddress', displayName: 'Email Address', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'RoleDesc', displayName: 'Role', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Updatedby1', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'UpdateDt', displayName: 'Last Updated Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'View Password', displayName: 'View Password', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.UserPwd)" data-title="Edit">View Password</button>',
                width: "100", enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            enableSelectAll: true,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Manage User Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
            $state.go('app.dashboard.connect_distributor');
        }
        else {
            $scope.select = function (UserPassword) {
                $sessionStorage.UserPassword = UserPassword;
                SmartAlert.Success('Password is  ' + $sessionStorage.UserPassword);
            }

            $scope.GetSearch = function () {

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;


                $http.get(uri + 'Distributor/GetDistUsers?DistCode=' + $sessionStorage.ConnectDistCode + '&UserCode&Name&EmailAddress&IsActive=Y')
                    .then(function (response) {
                        if (response.data.Data != null || response.data.Data == 0) {
                            $sessionStorage.grddata = response.data.Data;
                            $scope.gridOptions1.data = $sessionStorage.grddata;
                            if ($sessionStorage.mflag == 'MU') {
                                SmartAlert.SuccessGrid(response.data.Message);
                            }
                        }
                        else {
                            $scope.gridOptions1.data.length = 0;
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $sessionStorage.mflag = null;
                        $scope.Stylefun();
                        $scope.mystyle.push($scope.mystyle1);
                        $scope.mshow = true;
                        $scope.mhide = false;


                    })
            };


            $scope.AssignValue = function () {
                $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
                $scope.ConnectDistName = $sessionStorage.ConnectDistName;
                $scope.ConnetDistCity = $sessionStorage.ConnectCity;
            }
            $scope.AssignValue();
            if ($sessionStorage.mflag == 'MU')
                $scope.GetSearch();
            $scope.gridOptions1.data = $sessionStorage.grddata;
        }
    }

});

appdash.controller('SettingSmsGridController', function ($http, $scope, $filter, $timeout, uriadmin, $state, userService, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {

    var valueof = userService.Success('CEA');
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
                    title: 'SMS Credentials Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'DistCode', title: 'Distributor Code' },
             { columnid: 'UserName', title: 'User Name' },
             { columnid: 'UID', title: 'User ID' },
             { columnid: 'SmsPin', title: 'SmsPin' },
             { columnid: 'SmsSender', title: 'Sms Sender' },
             { columnid: 'SMSGateway', title: 'SMS Gateway' }
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
        $scope.getSMSCredentials = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/getsmscredentials?Distcode')
        .then(function (response) {

            if (response.data.Data != null || response.data.Data == 0) {
                $sessionStorage.grddata = response.data.Data;
                $scope.gridOptions1.data = $sessionStorage.grddata;
                if ($sessionStorage.mflag == 'SC') {
                    SmartAlert.SuccessGrid(response.data.Message);
                }
            }
            else {
                $scope.gridOptions1.data.length = 0;
                SmartAlert.Errmsg(response.data.Message);
            }
            $sessionStorage.mflag == null;
            $scope.Stylefun();
            $scope.mystyle.push($scope.mystyle1);
        })
        }
        $scope.getSMSCredentials();
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
            { name: 'SmsSetDistId', displayName: 'SmsSetDistId', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'DistCode', displayName: 'Distributor Code', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UserName', displayName: 'User Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'UID', displayName: 'User ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'SmsPin', displayName: 'Sms Pincode', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'SmsSender', displayName: 'Sms Sender', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'SMSGateway', displayName: 'SMS Gateway', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Isactive', displayName: 'Is Active', width: "*",
                name: 'Manage', displayName: 'Manage', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "70"
                , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            enableSelectAll: true,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("SMS Credentials Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (DistCode) {
            $sessionStorage.dCode = DistCode;
            $sessionStorage.iflag = 'UP';
            $state.go('app.dashboard.setting_sms');
        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.clear1 = function () {
            $sessionStorage.dCode = null;
            $sessionStorage.iflag = 'IN';
            $sessionStorage.mflag = 'SC';
        }
        if ($sessionStorage.mflag == 'SC')
            $scope.getSMSCredentials();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('SettingSMSController', function ($http, $scope, $filter, $timeout, $state, uriadmin, uri, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {

    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.mshow = true;
    $scope.mhide = false;
    $scope.divhide = false;
    $('#mono').attr('disabled', 'disabled');
    $scope.sms = { Mobileno: null };
    $scope.IsRequired = true;
    $scope.drpdwn = [{ code: 'A', name: 'Achariya SMS Gateway' }, { code: 'D', name: 'DoveSoft SMS Gateway' }];
    $scope.getCredentialIdWise = function () {
        if ($sessionStorage.dCode != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/getsmscredentials?Distcode=' + $sessionStorage.dCode)
            .then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.allSMS = response.data.Data;
                    $scope.sms = $scope.allSMS[0];
                    $scope.sms.DistCode = $scope.sms.DistCode;
                    $scope.sms.UserName = $scope.sms.UserName;
                    $scope.sms.SmsPin = $scope.sms.SmsPin;
                    $scope.sms.SmsSender = $scope.sms.SmsSender;
                    $scope.sms.Uid = $scope.sms.UID;
                    $scope.sms.isactive = $scope.sms.Isactive;
                    if ($scope.sms.DistCode == '1234567') {
                        document.getElementById('dcd').disabled = true;
                        document.getElementById('spin').disabled = true;
                        document.getElementById('ssnder').disabled = true;
                        document.getElementById('usrid').disabled = true;
                        document.getElementById('unm').disabled = true;
                    }
                    else
                        document.getElementById('dcd').disabled = true;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';
                $sessionStorage.mflag = 'SC';

            })
        }
    }
    $scope.getCredentialIdWise();
    $scope.saveSMSDetails = function (valid, sms) {
        $scope.IsRequired = true;
        if (valid == true) {

            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.iflag == 'UP') {
                $scope.sms = sms;
                $scope.sms.Flag = 'UP';
                var json = angular.toJson($scope.sms)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth();
            }
            else if ($sessionStorage.iflag == 'IN') {
                $scope.sms = sms;
                $scope.sms.Flag = 'IN';
                $scope.sms.isactive = 'Y';
                var json = angular.toJson($scope.sms)
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
            url: uriadmin + 'Distributor/postsmscredentials',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                // SmartAlert.Success(response.data.Message);
                $scope.divshow = true;
                $scope.divhide = false;
                $sessionStorage.iflag == '';
                $scope.SmartCardDisable = true;
                $scope.clear();
                $scope.submit = 'Submit';
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.setting_sms_grid');
                    window.clearInterval(h);
                }, 3000);
                // $state.go('app.dashboard.setting_sms_grid');

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    $scope.testSMS = function (valid) {
        $scope.IsRequired = false;
        if (valid) {
            if ($scope.sms.Mobileno != null) {
                $scope.mshow = false;
                $scope.mhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uri + 'Connect/sendtestsms?m_userid=' + $scope.sms.Uid + '&m_userpin=' + $scope.sms.SmsPin + '&m_sender=' + $scope.sms.SmsSender + '&mobileno=' + $scope.sms.Mobileno + '&DistCode=' + $scope.sms.DistCode + '&m_gateway=' + $scope.sms.GatewayFlag)
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.mshow = true;
                    $scope.mhide = false;
                });
            }

            else {
                SmartAlert.Errmsg('Please provide the valid mobile no.');
            }
        }
    }
    $scope.disabledText = function () {
        $('#mono').removeAttr('disabled');
    }
    $scope.clear = function () {
        $scope.sms = false;
        //$scope.sms.DistCode = '';
        //$scope.sms.UserName = '';
        //$scope.sms.SmsPin = '';
        //$scope.sms.smssender = '';
        //$scope.sms.isactive = '';

    }

});

appdash.controller('IncreaseValidityController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, SweetAlert, $rootScope, $sessionStorage, uri, base64, SmartAlert, Name, Password) {
    document.getElementById('td').onkeydown = function () { if (event.keyCode == 8) event.preventDefault(); return false; }
    $scope.ExpDate = $sessionStorage.ExpDate;
    $scope.ShowText = false;
    var dt = new Date($sessionStorage.ExpDate);
    dt.setDate(dt.getDate() + 1);
    //var valueof = userService.Success('DE');
    //$sessionStorage.currentstate = $state.current.name;
    //if (valueof == 'N') {

    //}
    //else {

    to = $("#td").datepicker({
        //changeMonth: true,
        //changeYear: true,
        //dateFormat: "dd-M-yy",
        //yearRange: "1999:2099"
        yearRange: "year:2050",
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        //numberOfMonths: 1,
        minDate: 0,
        dateFormat: "dd-M-yy"
    })

    $scope.changeday = function (date) {
        var daysDiff1;
        var startDate = Date.parse(date);
        var endDate = Date.parse($sessionStorage.ExpDate);
        var newdate = new Date();
        var todaysDate = Date.parse(newdate);
        if (endDate <= todaysDate) {
            var timeDiff1 = startDate - todaysDate;
            daysDiff1 = Math.floor(timeDiff1 / (1000 * 60 * 60 * 24) + 1);
            var msg = 'from today';
        }
        else if (endDate <= startDate) {
            var timeDiff1 = startDate - endDate;
            daysDiff1 = Math.floor(timeDiff1 / (1000 * 60 * 60 * 24));
            var msg = 'current expiry date.';
        }
        else if (endDate > startDate && startDate > todaysDate) {
            var timeDiff1 = startDate - endDate;
            daysDiff1 = Math.floor(timeDiff1 / (1000 * 60 * 60 * 24));
            var msg = 'current expiry date.';
        }
        else {
            daysDiff1 = 0
        }

        //var timeDiff1 = startDate - endDate;
        $rootScope.days = daysDiff1;
        $rootScope.msg = msg;
        //$rootScope.daysfromtoday = daysDiff1;
        $scope.Increase = {};
        $scope.Increase.ValidityDays = $rootScope.days;
        $scope.ShowText = true;
    }

    //if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
    //    $state.go('app.dashboard.connect_distributor');
    //}
    //else {

    $scope.getAllDistributors = function () {


        $http({
            method: 'GET',
            url: uriadmin + 'Distributor/getconnect',
            params:
                {
                    DistCode: null, DistName: null, IsActive: 'Y'
                }
        }).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
            }
            else {
                SmartAlert.Errmsg('Distributor does not exists !');
                //SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.getAllDistributors();

    $scope.formatters = {};
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
                 {
                     name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                     cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.addDistributor(row.entity)" data-title="Edit">Add</button>',
                     width: "40", enableFiltering: false, enableHiding: false
                 },
        { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistName', displayName: 'Distributor Name', width: "370", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'ExpDate', displayName: 'Expiry Date', width: "170", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

        ],
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false
    };

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = true;

    $scope.addDistributor = function (data) {
        var index = $scope.gridOptions2.data.indexOf(data);
        if (index == -1)
            $scope.gridOptions2.data.push(data);
        else
            SmartAlert.Errmsg('Already exists in table.');
    }

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
                 {
                     name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                     cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.removeDistributor(row.entity)" data-title="Edit">Remove</button>',
                     width: "60", enableFiltering: false, enableHiding: false
                 },
        { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'DistName', displayName: 'Distributor Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ExpDate', displayName: 'Expiry Date', width: "170", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterMenuExcel: false
    };

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions2.multiSelect = false;
    $scope.gridOptions2.enableRowSelection = true;

    $scope.removeDistributor = function (data) {
        var index = $scope.gridOptions2.data.indexOf(data);
        if (index != -1)
            $scope.gridOptions2.data.splice(index, 1);
        else
            SmartAlert.Errmsg('Please try again.');
    }

    $sessionStorage.currentstate = $state.current.name;
    $scope.submit = 'Submit';

    $scope.SaveIncreaseDetails = function (valid, Increase, Date1) {

        if (valid == true) {

            SweetAlert.swal
                          ({
                              title: '',
                              text: 'New Extended Date: ' + Date1 + ' is set to all selected distributors.',
                              type: "info",
                              showCancelButton: true,
                              confirmButtonColor: "#2877b6",
                              confirmButtonText: "Confirm",
                              closeOnConfirm: true,
                              closeOnCancel: true
                          },
                      function (isConfirm) {
                          if (isConfirm) {
                              if ($sessionStorage.Increase == null) {
                                  $scope.Increase = {};
                                  //  $scope.Increase.DistCode = $sessionStorage.ConnectDistCode;
                                  $scope.Increase.IsActive = "Y";
                                  $scope.Increase.IsVerify = "N";
                                  $scope.Increase.ExpiryDt = Date1;
                                  $scope.Increase.data = $scope.gridOptions2.data;
                                  $scope.Increase.UserCode = $sessionStorage.ucode;
                                  //$scope.Increase.ValidityDays = $rootScope.days;
                                  //var json = angular.toJson($scope.Increase)
                                  //$scope.source_string = json;
                                  //var encrypted = CryptoJS.AES.encrypt(
                                  //$scope.source_string,
                                  //$rootScope.base64Key,
                                  //{ iv: $rootScope.base64Key }
                                  //);
                                  //$scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                                  $scope.getAuth();
                              }
                          }
                          else {
                              SweetAlert.swal("Record Not Deleted");
                          }
                      });
        }
        // SmartAlert.Errmsg('Extended number of days= 0')
    };

    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Distributor/BulkIncreaseValidity',//IncreaseValidity
            data: $scope.Increase
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                document.getElementById('td').value = "";
                $scope.gridOptions2.data = [];
                SmartAlert.Success(response.data.Message);
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
        $sessionStorage.PAllocId = null;
        // $scope.GetSearch();
    }

    $scope.AssignValue = function () {
        $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
        $scope.ConnectDistName = $sessionStorage.ConnectDistName;
        $scope.ConnetDistCity = $sessionStorage.ConnectCity;
        $http.get(uriadmin + 'Report/GetValidityDetails?DistCode=' + $sessionStorage.ConnectDistCode + '&FromDate=&ToDate=')
            .then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.UpdatedBy = response.data.Data[0].Updatedby;
                    $scope.UpdatedDt = response.data.Data[0].UpdateDt;
                }
            });
    }
    $scope.AssignValue();
    //}

    //}

});

appdash.controller('DistributorPaymentGatewayGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CG');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
            $state.go('app.dashboard.connect_distributor');
        }
        else {
            $sessionStorage.currentstate = $state.current.name;
            $scope.Stylefun = function () {
                $scope.mystyle1 = {
                    headers: true,
                    style: 'font-size:19px;color:black',
                    caption: {
                        title: 'Distributor Payment Gateway Details',
                    },
                    column: {
                        style: 'font-size:15px;color:black'
                    },
                    columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'PgDesc', title: 'Pay Gateway Type' },
                 { columnid: 'PayModeDesc', title: 'PayMode Type' },
                 { columnid: 'Parameter1', title: 'Parameter1' },
                 { columnid: 'Parameter2', title: 'Parameter2' },
                 { columnid: 'Parameter3', title: 'Parameter3' },
                 { columnid: 'Parameter4', title: 'Parameter4' },
                 { columnid: 'Parameter5', title: 'Parameter5' },
                 { columnid: 'Updatedby', title: 'Last Updated By' },
                 { columnid: 'Updatedt', title: 'Last Updated Date' },
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
                             name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                             cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.PayID)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                             width: "40", enableFiltering: false,
                         },
                { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'DistName', displayName: 'Distributor Name', width: "225", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                //{ name: 'PayID', displayName: 'Pay Id', cellClass: 'grid-align', width: "50", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'PgDesc', displayName: 'Pay Gateway Name', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'PayModeDesc', displayName: 'PayMode Name', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Parameter1', displayName: 'Parameter1', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'Parameter2', displayName: 'Parameter2', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'Parameter3', displayName: 'Parameter3', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Parameter4', displayName: 'Parameter4', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'Parameter5', displayName: 'Parameter5', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'Updatedby', displayName: 'Last Updated By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Updatedt', displayName: 'Last Updated Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'IsActive', displayName: 'Is Active', width: "90", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

                ],
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterMenuExcel: false,
                exporterMenuCsv: false,
                gridMenuCustomItems: [{
                    title: 'Export all data as excel',
                    action: function ($event) {
                        alasql('SELECT * INTO XLS("Distributor Payment Gateway Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

            $scope.GetSearch = function () {

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;


                $http.get(uriadmin + 'Pay/GetDistPGatewayDtls?DistCode=' + $sessionStorage.ConnectDistCode + '&PayID&PgType&PayModeType&IsActive')
                    .then(function (response) {
                        if (response.data.Data != null || response.data.Data == 0) {
                            $sessionStorage.grddata = response.data.Data;
                            $scope.gridOptions1.data = $sessionStorage.grddata;
                            if ($sessionStorage.mflag == 'DPG') {
                                SmartAlert.SuccessGrid(response.data.Message);
                            }
                        }
                        else {
                            $scope.gridOptions1.data.length = 0;
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $sessionStorage.mflag = null;
                        $scope.Stylefun();
                        $scope.mystyle.push($scope.mystyle1);
                        $scope.mshow = true;
                        $scope.mhide = false;
                    })


            };


            $scope.select = function (PayID) {
                $sessionStorage.PayID = PayID;
                $sessionStorage.mflag = 'DPG';
                $state.go('app.dashboard.distributor_payment_gateway');
            }
            $scope.clear1 = function () {
                $sessionStorage.PayID = null;
                $state.go('app.dashboard.distributor_payment_gateway');
                $sessionStorage.mflag = 'DPG';
            }

            $scope.AssignValue = function () {
                $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
                $scope.ConnectDistName = $sessionStorage.ConnectDistName;
                $scope.ConnetDistCity = $sessionStorage.ConnectCity;
            }
            $scope.AssignValue();

            if ($sessionStorage.mflag == 'DPG') {
                $scope.GetSearch();
                $scope.gridOptions1.data = $sessionStorage.grddata;
            }
            else {
                $scope.gridOptions1 = { data: [] };
            }
        }

    }

});
appdash.controller('DistributorPaymentGatewayController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {
    if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
        $state.go('app.dashboard.connect_distributor');
    }
    else {
        $scope.xyz = true;
        $scope.abc = true;
        $scope.pqr = true;
        $scope.div1 = false; $scope.div2 = false; $scope.div3 = false; $scope.div4 = false; $scope.div5 = false;
        $scope.DistPay = { IsActive: 'Y' };
        $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
        $scope.ConnectDistName = $sessionStorage.ConnectDistName;
        $scope.ConnetDistCity = $sessionStorage.ConnectCity;

        $scope.getUser = function (RoleCode, UserCode) {
            RoleCode = RoleCode != null ? RoleCode : '';
            UserCode = UserCode == null ? '' : UserCode;
            $http.get(uri + 'Distributor/GetDistUsers?DistCode=' + $scope.ConnetDistCode + '&UserCode=' + UserCode + '&Name&EmailAddress&IsActive=Y&RoleCode=' + RoleCode).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Users = response.data.Data;
                    if ($scope.Users.length == 0)
                        $scope.DistPay.RoleCode = $scope.Users[0].RoleCode;
                }
                else {
                    $scope.Users = [];
                }
            })
        }

        $scope.pgateway = function () {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/getpaymentgateway',
                params:
                    {
                        PgId: null, PgType: null, PgDesc: null, IsActive: 'Y'

                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.getpgway = response.data.Data;
                    $rootScope.getpgway = response.data.Data;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.pgateway();

        $scope.pgmode = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/GetPaymentMode',
                params:
                    {
                        PayModeId: null, PayModeType: null, IsActive: 'Y'

                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.getpmode = response.data.Data;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.pgmode();

        $scope.onpgatewaychange = function (pgtype) {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/getpaymentgateway',
                params:
                    {
                        PgId: null, PgType: pgtype, PgDesc: null, IsActive: 'Y'

                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.getpgway1 = response.data.Data;
                    $scope.Fields = $scope.getpgway1[0].Fields;
                    $scope.par1 = $scope.Fields.split('#')[0];
                    $sessionStorage.par1 = $scope.par1;
                    $scope.par2 = $scope.Fields.split('#')[1];
                    $sessionStorage.par2 = $scope.par2;
                    $scope.par3 = $scope.Fields.split('#')[2];
                    $sessionStorage.par3 = $scope.par3;
                    $scope.par4 = $scope.Fields.split('#')[3];
                    $sessionStorage.par4 = $scope.par4;
                    $scope.par5 = $scope.Fields.split('#')[4];

                    $sessionStorage.par5 = $scope.par5;
                    if (pgtype == 'CITR' || pgtype == 'PAYP') {
                        $scope.div1 = true; $scope.div2 = true; $scope.div3 = true;
                        $scope.abc = true;
                        $scope.xyz = true;
                        $scope.pqr = true;
                    }
                    else if (pgtype == 'MOSB' || pgtype == 'MOSA') {
                        $scope.div1 = true; $scope.div2 = true; $scope.div3 = false;
                        $scope.abc = true;
                        $scope.xyz = true;
                        $scope.pqr = false;
                    }
                    else if (pgtype == 'EZYT' || pgtype == 'PYPA' || pgtype == 'JSPE') {
                        $scope.div1 = true; $scope.div2 = false; $scope.div3 = false;
                        $scope.abc = true;
                        $scope.pqr = false;
                        $scope.xyz = false;
                    }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })

        }

        if ($sessionStorage.PayID != null) {
            $scope.GetDistPGMDetailsIdWise = function () {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http({
                    method: 'GET',
                    url: uriadmin + 'Pay/GetDistPGatewayDtls',
                    params:
                        {
                            DistCode: $sessionStorage.ConnectDistCode, PayID: $sessionStorage.PayID, IsActive: ''
                        }
                }).then(function (response) {
                    if (response.data.Data != null || response.data.Data == 0) {
                        $scope.alldistpay = response.data.Data;
                        $scope.DistPay = $scope.alldistpay[0];
                        $scope.DistPay.PayModeType = $scope.DistPay.PayModeType;
                        $scope.DistPay.PgType = $scope.DistPay.PgType;
                        $scope.getUser('', $scope.DistPay.UserCode);
                        $scope.Fields = $filter('filter')($rootScope.getpgway, { PgType: $scope.DistPay.PgType })[0].Fields;
                        $scope.par1 = $scope.Fields.split('#')[0];
                        $sessionStorage.par1 = $scope.par1;
                        $scope.par2 = $scope.Fields.split('#')[1];
                        $sessionStorage.par2 = $scope.par2;
                        $scope.par3 = $scope.Fields.split('#')[2];
                        $sessionStorage.par3 = $scope.par3;
                        $scope.par4 = $scope.Fields.split('#')[3];
                        $sessionStorage.par4 = $scope.par4;
                        $scope.par5 = $scope.Fields.split('#')[4];
                        $sessionStorage.par5 = $scope.par5;



                        if ($scope.DistPay.PgType == 'CITR') {
                            //$scope.par1 = 'Secret Key';
                            //$scope.par2 = 'Access Key';
                            //$scope.par3 = 'Vanity URL';
                            $scope.div1 = true; $scope.div2 = true; $scope.div3 = true;
                            $scope.abc = true;
                            $scope.pqr = true;
                            $scope.xyz = true;
                        }
                        else if ($scope.DistPay.PgType == 'PAYP') {
                            //$scope.par1 = 'App Id';
                            //$scope.par2 = 'Agregator Id';
                            //$scope.par3 = 'MID';
                            $scope.div1 = true; $scope.div2 = true; $scope.div3 = true;
                            $scope.abc = true;
                            $scope.pqr = true;
                            $scope.xyz = true;
                        }
                        else if ($scope.DistPay.PgType == 'MOSB' || $scope.DistPay.PgType == 'MOSA') {
                            //$scope.par1 = 'User Id';
                            //$scope.par2 = 'Password';
                            $scope.div3 = false;
                            $scope.div1 = true; $scope.div2 = true;
                            $scope.abc = true;
                            $scope.pqr = false;
                            $scope.xyz = true;

                        }

                        else if ($scope.DistPay.PgType == 'EZYT' || $scope.DistPay.PgType == 'PYPA' || $scope.DistPay.PgType == 'JSPE') {
                            //   $scope.par1 = 'Secret key';
                            $scope.div1 = true; $scope.div2 = false; $scope.div3 = false;
                            $scope.abc = true;
                            $scope.pqr = false;
                            $scope.xyz = false;
                        }
                        //else if ($scope.DistPay.PgType == 'PYPA') {
                        //    $scope.div1 = true; $scope.div2 = false; $scope.div3 = true;
                        //    $scope.abc = true;
                        //    $scope.pqr = true;
                        //    $scope.xyz = true;
                        //}
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.submit = 'Update';


                })
                //  $sessionStorage.dCode = null

            }
            $scope.GetDistPGMDetailsIdWise();

        }
        else {
            $scope.submit = 'Submit';

        }
        $scope.SaveDistPayDetails = function (valid, DistPay) {

            if (valid == true) {
                $scope.DistPay = DistPay;

                $scope.divshow = false;
                $scope.divhide = true;

                if ("PayID" in DistPay) {

                    $scope.DistPay.DistCode = $scope.ConnetDistCode;
                    $scope.DistPay.PUserCode = $sessionStorage.ucode;
                    $scope.DistPay.UserCode = $sessionStorage.ucode;// $scope.DistPay.UserCode == null ? null : $scope.DistPay.UserCode;
                    //  $scope.DistPay.UpdatedBy = $sessionStorage.ucode;
                    $scope.DistPay.Flag = 'UP';
                    $scope.DistPay.Parameter4 = null;
                    $scope.DistPay.Parameter5 = null;
                    if ($scope.DistPay.PgType == 'MOSB' || $scope.DistPay.PgType == 'MOSA')
                        $scope.DistPay.Parameter3 = null;
                    else if ($scope.DistPay.PgType == 'EZYT' || $scope.DistPay.PgType == 'PYPA' || $scope.DistPay.PgType == 'JSPE') {
                        $scope.DistPay.Parameter2 = null;
                        $scope.DistPay.Parameter3 = null;
                    }

                    var json = angular.toJson($scope.DistPay)
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

                    $scope.DistPay = DistPay;
                    $scope.DistPay.PayID = 0;
                    $scope.DistPay.DistCode = $scope.ConnetDistCode;
                    $scope.DistPay.PUserCode = $sessionStorage.ucode;
                    $scope.DistPay.UserCode = $sessionStorage.ucode; //$scope.DistPay.UserCode == null ? null : $scope.DistPay.UserCode;
                    $scope.DistPay.CreatedBy = $sessionStorage.ucode;
                    $scope.DistPay.Flag = 'IN';
                    $scope.DistPay.IsActive = 'Y';
                    if ($scope.DistPay.PgType == 'MOSB' || $scope.DistPay.PgType == 'MOSA')
                        $scope.DistPay.Parameter3 = null;
                    else if ($scope.DistPay.PgType == 'EZYT' || $scope.DistPay.PgType == 'PYPA' || $scope.DistPay.PgType == 'JSPE') {
                        $scope.DistPay.Parameter2 = null;
                        $scope.DistPay.Parameter3 = null;
                    }
                    $scope.DistPay.Parameter4 = null;
                    $scope.DistPay.Parameter5 = null;
                    var json = angular.toJson($scope.DistPay)
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
                url: uriadmin + 'Pay/ManageDistPGatewayDtls',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {

                    $scope.divshow = true;
                    $scope.divhide = false;

                    SmartAlert.Success(response.data.Message);
                    var h = setInterval(function () {
                        $state.go('app.dashboard.distributor_payment_gateway_grid');
                        window.clearInterval(h);
                    }, 3000);
                    // $scope.clear();
                    $scope.submit = 'Submit'

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
        //$scope.ClearDistSession();



    }

});

appdash.controller('PreLoginController', function ($http, $scope, $filter, $timeout, $state, userService, $rootScope, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, PreLoginUrl) {

    $scope.checkstatus = function (formno) {
        if (formno == 'CH') {
            var valueof = userService.Success('CH');
            $sessionStorage.currentstate = $state.current.name;
        }
        if (valueof == 'N') { }
        else {
            $sessionStorage.currentstate = $state.current.name;
            $scope.PreLogin = function () {
                if ($sessionStorage.ConnectDistCode == null || $sessionStorage.ConnectDistCode == undefined) {
                    $state.go('app.dashboard.connect_distributor');
                }

                else {
                    //production and local
                    $scope.encryptvb = { DistCode: $sessionStorage.ConnectDistCode, mflag: 'auto', adminucode: $sessionStorage.ucode };
                    var json = angular.toJson($scope.encryptvb)
                    var encrypted = CryptoJS.AES.encrypt(json, $rootScope.base64Key, { iv: $rootScope.base64Key });
                    $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                    window.open(PreLoginUrl + $scope.ciphertext);
                    //window.open(PreLoginUrl + 'DistCode=' + $sessionStorage.ConnectDistCode + '&mflag=auto');
                    // sandbox
                    // window.open(PreLoginUrl + 'DistCode=' + $sessionStorage.ConnectDistCode + '&mflag=auto');
                }
            }
            $scope.PreLogin();
        }

    };

});

appdash.controller('HierarchyDetailsofDistributorController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, userService, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var valueof = userService.Success('CI');
    $sessionStorage.currentstate = $state.current.name;

    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.newname = 'Pushpam';
        $scope.hpappli = false;
        $scope.for = [{ rolefor: 'PG', name: 'GoTech' }, { rolefor: 'CO', name: 'GoGas' }];
        $scope.maxlen = '10';
    }
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.date = $filter('date')(new Date(), 'dd-MMM-yyyy 12:00:00');
    $scope.getHierarchyData = function (valid) {
        var base65 = base64.encode(Name + ':' + Password);
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.DistCode = $scope.DistCode != null ? $scope.DistCode : ""
            $http.get(uriadmin + 'Distributor/GetDistributorHierarchyDtls?HsFor=' + $scope.rolefor + '&DistCode=' + $scope.DistCode).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;

                    angular.forEach(response.data.Data, function (value, key) {

                        if (Date.parse(response.data.Data[key].ExpDate) >= Date.parse($scope.date)) {
                            $scope.gridOptions1.data[key].ExpStatus = 'No';
                        }
                        else {
                            $scope.gridOptions1.data[key].ExpStatus = 'Yes';
                        }
                        switch ($scope.gridOptions1.data[key].IsActive) {
                            case 'Y':
                                $scope.gridOptions1.data[key].IsActive = 'GoGas';
                                break;
                            case 'O':
                                $scope.gridOptions1.data[key].IsActive = 'Not On-boarded';
                                break
                                //case 'C':
                                //    $scope.gridOptions1.data[key].IsActive = 'CDCMS';
                                //    break;
                            default:
                                break;
                        }
                    })
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.gridOptions1.data = [];
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
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{\'vis-hidden\':row.entity.ExpDate>=$scope.date }" ui-grid-cell></div>',
        columnDefs:
        [
        { name: 'DistCode', displayName: 'Distributor Code', width: "125", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
         { name: 'ZoneDesc', displayName: 'Zone', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'Region', displayName: 'Region', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'HsDesc', displayName: 'Sales Area', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //{ name: 'HsFor', displayName: 'For', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'RM', displayName: 'RM', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        { name: 'SO', displayName: 'SO', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
                // { name: 'IsActive', displayName: 'Application', width: "120", cellTemplate: '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'ExpDate', displayName: 'License Expiry Date', width: "120", cellTemplate: '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
            { name: 'ExpStatus', displayName: 'License Expiry Status', width: "120", cellTemplate: '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        { name: 'IsActive', displayName: 'Is Active', width: "120", cellTemplate: '', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterExcelFilename: 'Hierarchy Details of Distributor.xlsx',
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
            cols.push({ value: 'Hierarchy Details of Distributor', metadata: { style: formatterId.id } });
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




});

appdash.controller('UpdateDistributorController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, userService, SweetAlert, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var valueof = userService.Success('CJ');
    $sessionStorage.currentstate = $state.current.name;

    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.newname = 'Pushpam';
        $scope.hpappli = false;
        $scope.for = [{ rolefor: 'PG', name: 'Pushpam' }, { rolefor: 'CO', name: 'GoGas' }];
        $scope.maxlen = '10';
    }
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.btnshow = true;

    $scope.getAllDistData = function (valid) {
        var base65 = base64.encode(Name + ':' + Password);
        $scope.divshow = false;
        $scope.divhide = true;
        $scope.DistCode = $scope.DistCode != null ? $scope.DistCode : ""
        $http.get(uriadmin + 'Distributor/GetDistributorDtls?Distcode=&DistName&PhoneNo&GstnNo&FromDate&ToDate').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $scope.divhide = false;
        })
    }
    $scope.getAllDistData();

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
        { name: 'DistCode', displayName: 'Distributor Code', width: "130", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        // { name: 'ZoneDesc', displayName: 'Zone', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //  { name: 'Region', displayName: 'Region', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //{ name: 'HsDesc', displayName: 'Sales Area', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        // { name: 'RM', displayName: 'RM', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
        { name: 'IsActive', displayName: 'Is Active', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
         { name: 'Updatedby', displayName: 'Last Updated By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'Updatedt', displayName: 'Last Updated Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        //{
        //    name: 'Inactive', displayName: 'Inactive', width: '80', headerCellTemplate: '<div></div>',
        //    cellTemplate: '<button class="btn-primary btn-xs"  ng-click="grid.appScope.UpdateDistributor(row.entity)"ng-show="row.entity.IsActive!=\'N\'" data-title="Edit"><span>Deactivate</span></button><button class="btn-primary btn-xs"  ng-click="grid.appScope.UpdateDistributor(row.entity)" ng-show="row.entity.IsActive==\'N\'" data-title="Edit"><span>Activate</span></button>',
        //    enableFiltering: false, enableHiding: false
        //},
        {
            name: 'update', displayName: 'Update', width: '80', headerCellTemplate: '<div></div>',
            cellTemplate: '<button class="btn-primary btn-xs"  ng-click="grid.appScope.UpdateAct(row.entity)"><span class="glyphicon glyphicon-pencil"></span></button>',
            enableFiltering: false, enableHiding: false
        }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterExcelFilename: 'Hierarchy Details of Distributor.xlsx',
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
            cols.push({ value: 'Hierarchy Details of Distributor', metadata: { style: formatterId.id } });
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
    $scope.UpdateAct = function (data) {
        $sessionStorage.Distdata = data;
        $state.go('app.dashboard.update_act_deact');
    }

    $scope.UpdateDistributor = function (data) {
        SweetAlert.swal
                        ({
                            title: data.IsActive == 'N' ? "Do you want to Activate Distributor" : "Do you want to Deactivate Distributor",
                            text: data.DistName,
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#2877b6",
                            confirmButtonText: "Confirm",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                    function (isConfirm) {
                        if (isConfirm) {
                            $scope.btnshow = false;
                            data.UserCode = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode;
                            data.IsActive = data.IsActive != "N" ? "N" : "Y";
                            var json = angular.toJson(data);
                            $scope.source_string = json;
                            var encrypted = CryptoJS.AES.encrypt(
                            $scope.source_string,
                            $rootScope.base64Key,
                            { iv: $rootScope.base64Key }
                            );
                            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                            $http.post(uriadmin + 'Distributor/UpdateDistributor', { Data: $scope.ciphertext }).then(function (response) {
                                if (response.data.StatusCode != 0) {
                                    SmartAlert.Success(response.data.Message);
                                    $scope.getAllDistData();
                                }
                                else {
                                    SmartAlert.Errmsg(response.data.Message);
                                }
                                $scope.btnshow = true;
                            })
                        }
                        else {
                            // SweetAlert.swal("Record Not Deleted");
                        }
                    });
    }


});
appdash.controller('UpdateDistributorDataController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, userService, SweetAlert, SmartAlert, uri, uriadmin, Name, Password, flag) {
    var valueof = userService.Success('CJ');
    $sessionStorage.currentstate = $state.current.name;

    var flagvalue = flag;
    if (flagvalue == 'H') {
        $scope.newname = 'Pushpam';
        $scope.hpappli = false;
        $scope.maxlen = '10';
    }
    $scope.btnshow = true;
    if ($sessionStorage.Distdata != null) {
        $scope.dist = $sessionStorage.Distdata;
        $sessionStorage.Distdata = null;
    }
    $scope.dropdown = [{ IsActive: 'O', Value: 'On-board' }, { IsActive: 'Y', Value: 'Active' }, { IsActive: 'N', Value: 'Deactivate' }];

    $scope.UpdateDistributor = function (valid) {
        if (valid) {
            SweetAlert.swal
                            ({
                                title: $scope.dist.IsActive != 'N' ? "Do you want to Convert Distributor in " + $filter('filter')($scope.dropdown, { IsActive: $scope.dist.IsActive })[0].Value : "Do you want to Deactivate Distributor",
                                text: $scope.dist.DistName,
                                type: "info",
                                showCancelButton: true,
                                confirmButtonColor: "#2877b6",
                                confirmButtonText: "Confirm",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            },
                        function (isConfirm) {
                            if (isConfirm) {
                                $scope.btnshow = false;
                                $scope.dist.UserCode = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode;
                                //$scope.dist.IsActive = $scope.dist.IsActive != "N" ? "N" : "Y";
                                var json = angular.toJson($scope.dist);
                                $scope.source_string = json;
                                var encrypted = CryptoJS.AES.encrypt(
                                $scope.source_string,
                                $rootScope.base64Key,
                                { iv: $rootScope.base64Key }
                                );
                                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                                $http.post(uriadmin + 'Distributor/UpdateDistributor', { Data: $scope.ciphertext }).then(function (response) {
                                    if (response.data.StatusCode != 0) {
                                        SmartAlert.Success(response.data.Message);
                                        $state.go('app.dashboard.update_distributor');
                                    }
                                    else {
                                        SmartAlert.Errmsg(response.data.Message);
                                    }
                                    $scope.btnshow = true;
                                })
                            }
                            else {
                                // SweetAlert.swal("Record Not Deleted");
                            }
                        });
        }
    }
});

appdash.controller('PushDigitalPaymentGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CK');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.sdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.edate = $filter('date')(new Date(), 'dd-MMM-yyyy');

        $scope.divshow = true;
        $scope.divhide = false;

        var dateFormat = "dd-M-yy",
          from = $("#fd")
          .datepicker({
              yearRange: "1960:year",
              changeMonth: true,
              changeYear: true,
              numberOfMonths: 1,
              maxDate: new Date(),
              dateFormat: "dd-M-yy"
          })
          .on("change", function () {
              to.datepicker("option", "minDate", getDate(this));
          }),
          to = $("#td").datepicker({
              yearRange: "1960:year",
              defaultDate: "+1w",
              changeMonth: true,
              changeYear: true,
              numberOfMonths: 1,
              minDate: 0,
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
        $scope.defaultDate = function (date) {

            $scope.ToDate = date;
        }
        $scope.formatters = {};
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
                     {
                         name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                         cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                         width: "40", enableFiltering: false, enableHiding: false
                     },
            { name: 'PayId', displayName: 'Pay Id', width: "40", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableHiding: false },
             { name: 'PayRefId', displayName: 'Token No.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AdvKey', displayName: 'Transaction Id', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AdvAmt', displayName: 'Amount', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align' },
            { name: 'TaxAmount', displayName: 'Tax Amount', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align' },
            { name: 'TotalAmount', displayName: 'Total Amount', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align' },
             { name: 'AdvDt', displayName: 'Payment Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AdvUseDt', displayName: 'Payment Used Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'AdvFlag', displayName: 'Insert Flag', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'MerTypeD', displayName: 'Merchant Type', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'PaymentModeD', displayName: 'Payment Mode', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'CardType', displayName: 'Card Type', width: "70", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'ConsNo', displayName: 'Consumer No.', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                      { name: 'ConsumerName', displayName: 'Consumer Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CashMemoNo', displayName: 'Cash Memo No.', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'CreatedBy', displayName: 'Created By', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CreatedDt', displayName: 'Created Date', width: "125", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'UpdatedBy', displayName: 'Last Updated By', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UpdatedDt', displayName: 'Last Updated Date', width: "125", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: true,
            exporterSuppressColumns: ['Edit'],
            exporterExcelFilename: 'Push Digital Payment.xlsx',
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
                cols.push({ value: 'Push Digital Payment[Distributor Code: ' + $scope.DistCode + ']', metadata: { style: formatterId.id } });
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

        $scope.GetSearch = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $rootScope.sdate = $scope.sdate;
                $rootScope.edate = $scope.edate;
                $rootScope.DistCode = $scope.DistCode;
                $http.get(uriadmin + 'Admin/GetDigitalPaymentForUpdate?DistCode=' + $scope.DistCode + '&InsertFlag=M&sdate=' + $scope.sdate + '&edate=' + $scope.edate)
                    .then(function (response) {
                        if (response.data.StatusCode != 0) {
                            $scope.gridOptions1.data = response.data.Data;
                            SmartAlert.Success(response.data.Message);
                        }
                        else {
                            $scope.gridOptions1.data = [];
                            SmartAlert.Errmsg(response.data.Message);
                        }
                    });
                $scope.divshow = true;
                $scope.divhide = false;
            }
        };
        if ($rootScope.sdate && $rootScope.edate) {
            $scope.sdate = $rootScope.sdate;
            $scope.edate = $rootScope.edate;
            $scope.DistCode = $rootScope.DistCode;
            $scope.GetSearch(true);
        }

        $scope.select = function (data) {
            $sessionStorage.payData = data;
            $state.go('app.dashboard.push_digital_payment');
        }
    }

});
appdash.controller('PushDigitalPaymentController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, uriadmin, Name, Password) {

    $scope.divshow = true;
    $scope.divhide = false;
    $scope.ConnetDistCode = $sessionStorage.ConnectDistCode;
    $scope.ConnectDistName = $sessionStorage.ConnectDistName;
    $scope.ConnetDistCity = $sessionStorage.ConnectCity;
    $scope.submit = "Submit";
    $scope.pgateway = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'Pay/getpaymentgateway',
            params:
                {
                    PgId: null, PgType: null, PgDesc: null, IsActive: 'Y'
                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getpgway = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.pgateway();

    $scope.pgmode = function () {
        $http({
            method: 'GET',
            url: uriadmin + 'Pay/GetPaymentMode',
            params:
                {
                    PayModeId: null, PayModeType: null, IsActive: 'Y'
                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getpmode = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.pgmode();

    if ($sessionStorage.payData != null) {
        $scope.pushpay = $sessionStorage.payData;
        $scope.pushpay.TransactionID = $scope.pushpay.AdvKey;
        $scope.pushpay.TransactionDt = $scope.pushpay.AdvDt;
        $scope.pushpay.ConsumerNo = $scope.pushpay.ConsNo;
        $scope.pushpay.MerchantType = $scope.pushpay.MerType;
        $scope.pushpay.RefillAmount = $scope.pushpay.AdvAmt;
        $scope.pushpay.PayRefID = $scope.pushpay.PayRefId;
        $scope.submit = "Update";
        $sessionStorage.payData = null;
    }

    $scope.PushPayment = function (valid, pushpay) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.pushpay.CreatedBy = $sessionStorage.ucode;
            $scope.pushpay.UserCode = $sessionStorage.ucode;
            if ("PayId" in pushpay) {
                $scope.pushpay.InsertFlag = 'M';
                var json = angular.toJson($scope.pushpay)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $scope.getAuth('Admin/UpdateDigitalPayment');

            }
            else {
                $scope.pushpay.InsertFlag = 'M';
                var json = angular.toJson($scope.pushpay)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                $scope.getAuth('Admin/PushDigitalPayment');

            }
        }
    };
    $scope.getAuth = function (api) {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + api,
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.push_digital_payment_grid');
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
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    //$scope.ClearDistSession();
});

appdash.controller('PriceAllocationGridController', function ($http, $scope, $filter, $timeout, userService, uri, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CV');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

        $scope.sdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.divshow = true;
        $scope.divhide = false;
        var dateFormat = "dd-M-yy",
          from = $("#fd")
          .datepicker({
              yearRange: "year:2100",
              changeMonth: true,
              changeYear: true,
              numberOfMonths: 1,
              minDate: new Date(),
              dateFormat: "dd-M-yy"
          });
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
        $scope.formatters = {};
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
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            columnDefs:
            [
            { name: 'ItemCode', displayName: 'Item Code', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
             { name: 'ItemName', displayName: 'Item Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
             { name: 'Price', displayName: 'Price', width: "80", cellTemplate: '<input type="number" class="\'form-control\'" ng-input="COL_FIELD" ng-model="row.entity.Price" required/>', cellClass: 'grid-align', type: 'number', headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { name: 'PriceCode', displayName: 'Price Code', width: "70", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeade, enableCellEdit: false },
            { name: 'EffectiveDate', displayName: 'Effective Date', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            //   { name: 'CreatedBy', displayName: 'Created By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'CreatedDt', displayName: 'Created Date', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'UpdatedBy', displayName: 'Last Updated By', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false },
            { name: 'UpdatedDt', displayName: 'Last Updated Date', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableCellEdit: false }
            ],
            enableGridMenu: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: true,
            exporterSuppressColumns: ['Edit'],
            exporterExcelFilename: 'Price Allocation.xlsx',
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
                sheet.mergeCells('A1', 'C1');
                var cols = [];
                // cols.push({ value: '' });
                cols.push({ value: 'Price Allocation [Distributor Code: ' + $scope.DistCode + ']', metadata: { style: formatterId.id } });
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
        $scope.gridOptions1.enableRowSelection = false;


        $scope.getLastEffectiveDate = function () {
            $http.get(uriadmin + 'product/GetLastEffectiveDate?Flag=SO').then(function (response) {
                if (response.data.StatusCode != "0") {
                    $scope.sdate = $filter('date')(new Date(response.data.Data[0].LastEffectiveDate), 'dd-MMM-yyyy');
                    $scope.sdateTemp = $scope.sdate;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.getLastEffectiveDate();
        $scope.GetSearch = function (valid) {
            //   if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.DistCode = $scope.DistCode != null ? $scope.DistCode : "";
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetPriceallocation?DistCode=' + $scope.DistCode + '&UserCode='+$sessionStorage.ucode+'&ItemCode=&IsActive=Y&EffectiveDt=' + $scope.sdate)
                .then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($scope.DistCode!="")
                            $scope.sdate = $filter('date')(new Date(response.data.Data[0].LastEffectiveDate), 'dd-MMM-yyyy');
                        else
                            $scope.sdate = $scope.sdateTemp;
                        $scope.priceBulkData = [];
                        //for (i = 0; i < response.data.Data.length; i++) {
                        //    $scope.priceBulkData.push({ItemCode:response.data.Data[i].ItemCode,})
                        //}
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                });
            $scope.divshow = true;
            $scope.divhide = false;
            //  }
        };

        $scope.savePrice = function (valid) {
            if (valid) {
                if ($scope.gridOptions1.data.length != 0) {
                    $scope.divshow = false;
                    $scope.divhide = true;
                    $scope.priceData = {};
                    $scope.priceData.UserCode = $sessionStorage.ucode,
                    $scope.priceData.DistCode = $scope.DistCode != null ? $scope.DistCode : '';
                    $scope.priceData.IsActive = 'Y';
                    $scope.priceData.PUserCode = $sessionStorage.ucode;
                    $scope.priceData.EffectiveDt = $scope.sdate;
                    $scope.priceData.Flag = "IN";
                    $scope.priceData.data = $scope.gridOptions1.data;
                    $http.post(uriadmin + 'product/ManagePriceallocation', $scope.priceData).then(function (response) {
                        if (response.data.StatusCode != 0) {
                            SmartAlert.Success(response.data.Message);
                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });
                }
                else {
                    SmartAlert.Errmsg('No data in table for submit.')
                }
            }
        }
    }
});

app.directive("importSheetJs", [SheetJSImportDirective]);


app.controller('ImportXlsxController', function ($scope, $http, $filter, $interval, $state, $localStorage, $sessionStorage, userService,SweetAlert, uriadmin) {

    var valueof = userService.Success('CX');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    } else {
        $scope.btnshow = true;

        $scope.Getproduct = function () {
            $http.get(uriadmin + 'product/GetItemDetails?ItemCode=').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.Pdata = response.data.Data;

                }
            })
        }

        $scope.Getproduct();



        $scope.loader = {
            loading: false
        };
        //$scope.loader.loading = true;
        var vm = this;
        vm.alert = function (messege) {
            SweetAlert.swal(messege);
        }

        var ImportXlsxData;

        $scope.ImportGrid = function () {
            ImportXlsxData = JSON.parse(localStorage.getItem('Data'));
            if (ImportXlsxData != null) {
                $scope.gridOptions1.data = ImportXlsxData;
                $scope.btnshow = false;
                localStorage.removeItem('Data');
            }
            else {
                vm.alert("Select Excel file");
                $scope.btnshow = true;
            }
        }
        $scope.checkfile = function (sender) {
            var validExts = new Array(".xlsx", ".xls");
            var fileExt = sender.value;
            fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
            if (validExts.indexOf(fileExt) < 0) {
                alert("Invalid file selected, valid files are of " +
                         validExts.toString() + " types.");
                return false;
            }
            else return true;
        }

        //GET MISSING FOLLOW UP GRID

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: ' Upload Cylinder Data',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            //columns: [
            //      { columnid: 'mobileno', title: 'Mobile No.' },
            //      { columnid: 'custname', title: 'Customer Name' },
            //      { columnid: 'emailaddress', title: 'Email Id' },
            //      { columnid: 'city', title: 'City' },
            //       { columnid: 'comment', title: 'Comment' },
            //         { columnid: 'nxtfloowupdt', title: 'Follow-Date' },
            //],
            //rows: {
            //    0: { cell: { style: 'color:black' } },
            //},
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

            columnDefs:
            [
                  { name: 'ManufacturerName', displayName: 'Manufacturer Name', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'FactoryNumber', displayName: 'Factory Number', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'CylinderCatergory', displayName: 'Cylinder Catergory', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'SerialNo', displayName: 'Serial No.', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'BarcodeNo', displayName: 'Barcode No.', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'CylinderBatchNo', displayName: 'Cylinder Batch No.', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'TareWeight', displayName: 'Tare Weight', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'NetWeight', displayName: 'Net Weight', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'GrossWeight', displayName: 'Gross Weight', cellTooltip: true, width: "200", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'CylinderTestingDate', displayName: 'Cylinder Testing Date', cellTooltip: true, width: "200", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'CylinderExpiryDate', displayName: 'Cylinder Expiry Date', cellTooltip: true, width: "200", headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'EntryPerson', displayName: 'Entry Person', cellTooltip: true, width: "250", headerCellClass: $scope.highlightFilteredHeader },
                 //{ name: 'city', displayName: 'City', cellTooltip: true, width: "150", headerCellClass: $scope.highlightFilteredHeader },
                 // { name: 'comment', displayName: 'Comment', cellTooltip: true, width: "250", headerCellClass: $scope.highlightFilteredHeader },
                  //{ name: 'nxtfloowupdt', displayName: 'Follow-Date', cellTooltip: true, width: "180", cellFilter: 'date:\'dd-MMM-yyyy h:mma\'', filterCellFiltered: true, headerCellClass: $scope.highlightFilteredHeader },
            ],
            enableGridMenu: true,
            enableSelectAll: false,
            exporterCsvFilename: ' Upload Cylinder Data.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 9, bold: false };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [{
                title: 'Export all data as xls',
                action: function ($event) {
                    alasql('SELECT * INTO XLS(" Upload Cylinder Data.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                    $http
     ({
         //method: 'POST',
         //url: uri + 'log/postexportlog',
         //data: {
         //    userid: $sessionStorage.userid, export_form: 'Import Data(in xls)'
         //}
     })
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.getalldata = function (missingfollowups) {
            $scope.loader.loading = true;
            $scope.loader.loading = false;
        }

        $scope.SaveInDatabase = function (valid) {
            if (valid && ImportXlsxData != null)
            {
                // ImportXlsxData = JSON.parse(localStorage.getItem('Data'));
                //  if (ImportXlsxData[0].custname != null) {
                $scope.TempImportData = [];
                for (i = 0; i < ImportXlsxData.length; i++) {
                    //var consno, custname, custadd1, custadd2, custadd3, custpin, custgstnno, statecode, custpanno;
                    $scope.TempImportData.push({
                        "Manufacturer Name": ImportXlsxData[i].ManufacturerName != null ? ImportXlsxData[i].ManufacturerName : " ",
                        "Factory Number": ImportXlsxData[i].FactoryNumber != null ? ImportXlsxData[i].FactoryNumber : " ",
                        "Cylinder Catergory": ImportXlsxData[i].CylinderCatergory != null ? ImportXlsxData[i].CylinderCatergory : "",
                        "Serial No.": ImportXlsxData[i].SerialNo != null ? ImportXlsxData[i].SerialNo : "",
                        "Barcode No.": ImportXlsxData[i].BarcodeNo != null ? ImportXlsxData[i].BarcodeNo : "",
                        "Cylinder Batch No.": ImportXlsxData[i].CylinderBatchNo != null ? ImportXlsxData[i].CylinderBatchNo : "",
                        "Tare Weight": ImportXlsxData[i].TareWeight != null ? ImportXlsxData[i].TareWeight*1000 : "",
                        "Net Weight": ImportXlsxData[i].NetWeight != null ? ImportXlsxData[i].NetWeight * 1000 : "",
                        "Gross Weight": ImportXlsxData[i].GrossWeight != null ? ImportXlsxData[i].GrossWeight * 1000 : "",
                        "Cylinder Testing Date": tempcomment = ImportXlsxData[i].CylinderTestingDate != null ? ImportXlsxData[i].CylinderTestingDate : "",
                        "Cylinder Expiry Date": tempcomment = ImportXlsxData[i].CylinderExpiryDate != null ? ImportXlsxData[i].CylinderExpiryDate : "",
                        "Entry Person": tempcomment = ImportXlsxData[i].EntryPerson != null ? ImportXlsxData[i].EntryPerson : "",
                        //"nxtfloowupdt": tempnextfollowdate = ImportXlsxData[i].nxtfloowupdt != null ? ImportXlsxData[i].nxtfloowupdt : null
                    })
                }
                $scope.ImportData = { "Data": angular.toJson($scope.TempImportData), "PlantId": $sessionStorage.PlantId, "ItemCode": $scope.ItemCode, "UserCode": $sessionStorage.CUserCode }


                $scope.gridOptions1.data = ImportXlsxData;

                if ($scope.ImportData != null) {
                    $http({
                        url: uriadmin + 'plant/UploadExcel',
                        method: 'Post',
                        data: $scope.ImportData
                    }).then(function (response) {
                        if (response.data.StatusCode != 0) {
                            vm.alert(response.data.Message);
                            document.getElementById("myForm").reset();
                            $scope.gridOptions1.data.length = 0;
                            $scope.ItemCode = '';
                        }
                        else {
                            vm.alert(response.data.Message);
                            $scope.gridOptions1.data.length = 0;
                            $scope.ItemCode = '';
                            ImportXlsxData = null;

                        }
                    })

                }
            }

        }

    }   //else {
        //    vm.alert("Please Import the Data");
        //}
    
});

app.controller('CylinderMasterController', function ($window, $http, $scope, $filter, $timeout, $state, $rootScope, uri, SmartAlert, $localStorage, $sessionStorage, base64, uricydl, uriadmin, urisafety, urianalysis) {

  $scope.Getdivshow = true;
  $scope.Getdivhide = false;
  $scope.New = {}

 $scope.styleFun = function () {
        $scope.mystyle1 =
            {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Cylinder Master',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                  { columnid: 'BarCodeNo', title: 'BarCode No.' },
                  { columnid: 'ManfactId', title: 'Manufacturer ID' },
                  { columnid: 'ManufacturerName', title: 'Manufacturer Name' },
                  { columnid: 'BatchNo', title: 'Batch No.' },
                  { columnid: 'SerialNo', title: 'Serial No.' },
                  { columnid: 'TareWeight', title: 'Tare Weight' },
                  { columnid: 'NetWeight', title: 'Net Weight' },
                  { columnid: 'TestingDate', title: 'Testing Date' },
                  { columnid: 'CylinderExpiryDate', title: 'Cylinder Expiry Date' },
                  //{ columnid: 'PlantId', title: 'Plant Id' },
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
          { name: 'BarCodeNo', displayName: 'BarCode No.', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ManfactId', displayName: 'Manufacturer Id', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          { name: 'ManufacturerName', displayName: 'Manufacturer Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'BatchNo', displayName: 'Batch No. ', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'SerialNo', displayName: 'Serial No.', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'TareWeight', displayName: 'Tare Weight', width: "160", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'NetWeight', displayName: 'Net Weight', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'TestingDate', displayName: 'Testing Date ',  width: "180", cellClass: 'grid-align', type: Date, cellFilter: 'date:\'dd/MM/yyyy  h: mma\'', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'CylinderExpiryDate', displayName: 'Cylinder Expiry Date', cellClass: 'grid-align', type: Date, cellFilter: 'date:\'dd/MM/yyyy  h: mma\'', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'PlantId', displayName: 'PlantId', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          { name: 'Plant Name', displayName: 'Plant Name', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          { name: 'ItemRefNo ', displayName: 'Item Ref No. ', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
          
          //{ name: 'ItemRefNo', displayName: 'Item Ref No.', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'ItemName', displayName: 'Item Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'ProviderName', displayName: 'Provider Name', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'MonthlyConsumption', displayName: 'Monthly Consumption', cellClass: 'grid-align', width: "190", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Date', displayName: 'Date', cellClass: 'grid-align', width: "*", type: Date, cellFilter: 'date:\'dd/MM/yyyy  h: mma\'', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Pending', displayName: 'Pending', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Converted', displayName: 'Converted', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'OnHold', displayName: 'OnHold', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Cancel', displayName: 'Cancel', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //{ name: 'Total', displayName: 'Total', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
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
        exporterPdfHeader: { text: "Cylinder Master", style: 'headerStyle', alignment: 'center', color: 'red' },
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
                alasql('SELECT * INTO XLS("Cylinder Master.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
            $scope.New.BarCode = $scope.New.BarCode == undefined ? null : $scope.New.BarCode;
          

            $http({
                method: 'GET',
                url: uricydl +'CylDel/GetCylinderDetails',
                params: { BarCode: $scope.New.BarCode, PlantNo: $sessionStorage.PlantId, ManfactId: null }
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



app.directive("distdatepicker", function () {
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
app.directive("productdatepicker", function () {
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
                yearRange: "1999:years",
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
});