appdash.controller('PaymentGatewayGrid1Controller', function ($http, $scope, $filter, $timeout, $state, SmartAlert, userService, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    var valueof = userService.Success('EA');
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
                    title: 'Payment Gateway Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [

             // { columnid: 'PgId', title: 'Payment Id' },
              { columnid: 'PgType', title: 'Payment Gateway Code' },
              { columnid: 'PgDesc', title: 'Payment Gateway Name' },
                { columnid: 'ImageName', title: 'Image Name' },
                { columnid: 'Fields', title: 'Fields' },
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
        }
        $sessionStorage.PaymentCode = null;
        $scope.GetPayMaster = function () {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({

                method: 'GET',
                url: uriadmin + 'Pay/getpaymentgateway',
                params:
            { PgId: null, PgType: null, PgDesc: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'PGW') {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else { }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag = null;
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);
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
            { name: 'PgId', displayName: 'Payment Gateway Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'PgType', displayName: 'Payment Gateway Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PgDesc', displayName: 'Payment Gateway  Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ImageName', displayName: 'Image Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Fields', displayName: 'Fields', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.PgId)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Payment Gateway Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
        $scope.select = function (PgId) {
            $sessionStorage.PgId = PgId;
            $sessionStorage.mflag = 'PGW';
            $state.go('app.dashboard.payment_gateway');
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.Clear1 = function () {
            $sessionStorage.PgId = null;
            $sessionStorage.mflag = 'PGW';
            $state.go('app.dashboard.payment_gateway');

        }
        if ($sessionStorage.mflag == 'PGW')
            $scope.GetPayMaster();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('PaymentGatewayController', function ($http, $scope, $filter, $timeout, noimage, $state, uripaygateway, SmartAlert, $rootScope, $sessionStorage, base64, uri, uriadmin, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.onEdit = false;
    if ($sessionStorage.PgId != null) {
        $scope.submit = 'Update';
        $scope.onEdit = true;
        $scope.GetPaymentgateway = function () {


            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'Pay/getpaymentgateway',
                params:
                      { PgId: $sessionStorage.PgId, PgType: null, IsActive: '' }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.tal = response.data.Data;
                    $scope.Payment = $scope.tal[0];
                    $scope.nimg1 = uripaygateway + $scope.Payment.ImageName;
                    $sessionStorage.ImageName = $scope.Payment.ImageName;
                    if ($scope.Payment.ImageName == null || $scope.Payment.ImageName == '' || $scope.Payment.ImageName == undefined) {
                        //$scope.filepreview = 'http://localhost:12950/css/images/no-image.png';
                        //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';
                        $scope.filepreview = noimage + 'css/images/no-image.png';
                    }
                    else {
                        $scope.filepreview = $scope.nimg1;
                    }

                    $scope.submit = 'Update';
                }
                else {


                }

            })
        }
        $scope.GetPaymentgateway();
    }
    else {
        //$scope.filepreview = 'http://localhost:12950/css/images/no-image.png';
        //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';
        $scope.filepreview = noimage + 'css/images/no-image.png';
        $scope.submit = 'Submit';

    }
    $scope.SavePayment = function (valid, Payment) {


        $scope.Payment = Payment;
        $scope.Payment.ImageName = $sessionStorage.ImageName;
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.PgId == null) {

                if ($sessionStorage.ImageData == null || $sessionStorage.ImageData == '' || $sessionStorage.ImageData == undefined) {
                    SmartAlert.Errmsg("Please select image");
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    $scope.Payment = Payment;
                    $scope.PgId = 0;
                    $scope.Payment.Flag = "IN";
                    $scope.Payment.IsActive = 'Y';
                    fileName = $scope.Payment.ImageName;
                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var ext = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == 'bmp' || ext == 'png') {
                        $scope.getAuth($scope.PgId, $scope.Payment.PgType, $scope.Payment.PgDesc, $scope.Payment.IsActive, $sessionStorage.ImageData, $scope.Payment.Fields, $scope.Payment.Flag);
                    }
                    else {
                        SmartAlert.Errmsg("Please select only image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }

                }
            }
            else {
                $scope.Payment = Payment;
                if ($scope.filepreview == '' || $scope.filepreview == undefined) {
                    SmartAlert.Errmsg("Please select image");
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    $scope.Payment = Payment;
                    $scope.Payment.PgId = $sessionStorage.PgId;
                    $scope.Payment.Flag = "UP";
                    fileName = $sessionStorage.ImageName;
                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var ext = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == 'bmp' || ext == 'png') {
                        $scope.getAuth($scope.Payment.PgId, $scope.Payment.PgType, $scope.Payment.PgDesc, $scope.Payment.IsActive, $sessionStorage.ImageData, $scope.Payment.Fields, $scope.Payment.Flag);
                    }
                    else {
                        SmartAlert.Errmsg("Please select only image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                }
            }
        }


    };
    $scope.getAuth = function (Id, PaygType, Paygdesc, IsActive, Data, fields, flag) {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Pay/postpaymentgateway',
            data: {

                PgId: Id,
                PgType: PaygType,
                PgDesc: Paygdesc,
                IsActive: IsActive,
                Data: Data,
                Fields: fields,
                Flag: flag
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {

                var base65 = base64.encode(Name + ':' + Password);
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.payment_gateway_grid');
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
    $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {

        if (fileObj.filetype != "image/gif" && fileObj.filetype != "" && fileObj.filetype != "application/javascript" && fileObj.filetype != "application/pdf" && fileObj.filetype != "text/plain" && fileObj.filetype != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && fileObj.filetype != "application/vnd.ms-excel" && fileObj.filetype != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            var imageData = fileObj.base64;
            $sessionStorage.ImageData = imageData;
            $scope.filepreview = 'data:image/png;base64,' + $sessionStorage.ImageData;
            var name = file.name;
            $sessionStorage.ImageName = name;
        }
        else {
            $scope.filepreview = 'data:image/png;base64,' + "";
            var name = file.name;
            $sessionStorage.ImageName = name;
        }
    }

});

appdash.controller('PaymentModeDeviceGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, Name, Password) {

    var valueof = userService.Success('EB');
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
                    title: 'Payment Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'PayModeType', title: 'Pay Mode Type' }, { columnid: 'PayModeDesc', title: 'Pay Mode Description' },
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
            exporterMenuExcel: false,
            exporterMenuCsv: false,
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

appdash.controller('AMCPaymentGetwayGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('EC');
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
                    title: 'Payment Getway Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'PgName', title: 'Payment Getway' }, { columnid: 'PgDescription', title: 'Payment Getway Description' },
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
            { name: 'PgName', displayName: 'Payment Getway', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'PgDescription', displayName: 'Payment Getway Description', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("AMC Payment Getway Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (amcdata) {
            $sessionStorage.amcdata = amcdata;
            $sessionStorage.flag = 'UP';
            $state.go('app.dashboard.amc_payment_gateway');
        }
        $scope.Addnew = function () {
            $sessionStorage.amcdata = null;
            $sessionStorage.flag = 'IN';
            $state.go('app.dashboard.amc_payment_gateway');
        }

        $scope.clear1 = function () {
            $sessionStorage.PayModeId = null;
            $sessionStorage.mflag = 'PMO';
        }

        $scope.GetAMCPaymentgetway = function () {
            $http.get(uri + 'Payment/GetAMCPaymentGateway?PgName&IsActive').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.GetAMCPaymentgetway();

    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('AMCPaymentGetwayController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    if ($sessionStorage.amcdata != null) {
        $scope.amc = $sessionStorage.amcdata;
        $scope.amc.Flag = 'UP'
        $scope.submit = 'Update';
    } else {
        $scope.submit = 'Submit';
    }

    $scope.SaveAmcPayDetails = function (valid, amc) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.flag != 'IN') {

                $scope.amc.Flag = 'UP';
                var json = angular.toJson($scope.amc)
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

                $scope.amc = amc;
                $scope.amc.Flag = 'IN';
                $scope.amc.UserCode = $sessionStorage.ucode;
                $scope.amc.IsActive = 'Y';
                var json = angular.toJson($scope.amc)
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
            url: uri + 'Payment/IUDAMCPaymentGateway',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.amc_payment_gateway_grid');
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
    //$scope.clear = function () {
    //    $scope.state.StateDesc = '';
    //    $scope.state.StateCode = '';
    //    $scope.state.StateFlag = '';
    //    $scope.state.IsHomeState = '';
    //    $scope.state.IsActive = '';

    //}

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();



});

appdash.controller('ProductGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('ED');
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
                    title: 'Product Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'ProductCode', title: 'Product Code' }, { columnid: 'ProductName', title: 'Product Name' },
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
            { name: 'ProductCode', displayName: 'Product Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'ProductName', displayName: 'Product Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Product Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (prod) {
            $sessionStorage.prod = prod;
            $sessionStorage.flag = 'UP';
            $state.go('app.dashboard.product');
        }
        $scope.AddnewProduct = function () {
            $sessionStorage.prod = null;
            $sessionStorage.flag = 'IN';
            $state.go('app.dashboard.product');
        }

        $scope.GetProduct = function () {
            $http.get(uri + 'Payment/GetAMCProduct?ProductCode&isactive').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.GetProduct();

    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('ProductController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    if ($sessionStorage.prod != null) {
        $scope.proddata = $sessionStorage.prod;
        $scope.proddata.Flag = 'UP'
        $scope.submit = 'Update';
    } else {
        $scope.submit = 'Submit';
    }

    $scope.SaveProductDetails = function (valid, proddata) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.flag != 'IN') {

                $scope.proddata.Flag = 'UP';
                var json = angular.toJson($scope.proddata)
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

                $scope.proddata = proddata;
                $scope.proddata.Flag = 'IN';
                $scope.proddata.UserCode = $sessionStorage.ucode;
                $scope.proddata.IsActive = 'Y';
                var json = angular.toJson($scope.proddata)
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
            url: uri + 'Payment/IUDAMCProduct',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.product_grid');
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

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();



});

appdash.controller('PlansValidityGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('EE');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Plans validity Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [


                { columnid: 'PlanId', title: 'Plan Id' },
                { columnid: 'Description', title: 'Plan Name' },
                { columnid: 'Amount', title: 'Amount' },
                { columnid: 'ProductDesc', title: 'Product Name' },
                { columnid: 'Quantity', title: 'Quantity' },
                { columnid: 'DefaultDays', title: 'Default Days' },
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
                        name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs" ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                        width: "70", enableFiltering: false,
                    },
            { name: 'PlanId', displayName: 'Plan Id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Description', displayName: 'Plan Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Amount', displayName: 'Amount', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProductCode', displayName: 'Product Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProductDesc', displayName: 'Product Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Quantity', displayName: 'Quantity', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DefaultDays', displayName: 'Default Days', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FromCons', displayName: 'From Consumer', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ToCons', displayName: 'To Consumer', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Plans validity Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (plans) {
            $sessionStorage.plans = plans;
            $sessionStorage.flag = 'UP';
            $state.go('app.dashboard.plans');
        }
        $scope.Addnewplan = function () {
            $sessionStorage.plans = null;
            $sessionStorage.flag = 'IN';
            $state.go('app.dashboard.plans');
        }

        $scope.GetPlansDetails = function () {
            $http.get(uri + 'Payment/GetValidityPlanDetails?Planid&ProductCode&IsActive').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.mystyle.push($scope.mystyle1);
            })
        }
        $scope.GetPlansDetails();

    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('PlansValidityController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, amcproductcode, uriadmin, uri, Name, Password) {
    $scope.plansdata = { IsActive: 'Y' };
    document.getElementById('urlshowhide').disabled = true;
    $scope.URLShow = function (plansdata) {
        if (plansdata == 'Y') {
            document.getElementById('urlshowhide').disabled = false;
        } else {
            document.getElementById('urlshowhide').disabled = true;
        }
    }

    if ($sessionStorage.plans != null) {
        $scope.plansdata = $sessionStorage.plans;
        $scope.plansdata.Flag = 'UP';
        document.getElementById('urlshowhide').disabled = false;
        $scope.submit = 'Update';
    } else {
        $scope.submit = 'Submit';
    }


    //product & PG dropdown
    $scope.GetProduct = function () {
        $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + amcproductcode + '&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.allproduct = response.data.Data;
            }
            else {
                $scope.allproduct = [];
            }
        });
    }
    $scope.GetProduct();

    $scope.SavePlansDetails = function (valid, plansdata) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ($sessionStorage.flag != 'IN') {

                $scope.plansdata.Flag = 'UP';
                var json = angular.toJson($scope.plansdata)
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

                $scope.plansdata = plansdata;
                $scope.plansdata.Flag = 'IN';
                $scope.plansdata.UserCode = $sessionStorage.ucode;
                $scope.plansdata.IsActive = 'Y';
                var json = angular.toJson($scope.plansdata)
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
            url: uri + 'Payment/ManageValidityPlanDetails',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.plans_grid');
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
    //$scope.clear = function () {
    //    $scope.state.StateDesc = '';
    //    $scope.state.StateCode = '';
    //    $scope.state.StateFlag = '';
    //    $scope.state.IsHomeState = '';
    //    $scope.state.IsActive = '';

    //}

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();



});

appdash.controller('TransactionGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, $rootScope, $sessionStorage, base64, uriadmin, uri, Name, Password) {

    var valueof = userService.Success('EF');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
        $sessionStorage.currentstate = $state.current.name;

            $scope.mystyle1 = {
                headers: true,
                style: 'font-size:19px;color:black',
                caption: {
                    title: 'Transaction Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                { columnid: 'TokenNo', title: 'Token No' },
                { columnid: 'TokenDt', title: 'Token Dt' },
                { columnid: 'DistCode', title: 'Dist Code' },
                { columnid: 'PGNameDesc', title: 'Payment Gateway Name' },
                { columnid: 'Quantity', title: 'Quantity' },
                { columnid: 'Amount', title: 'Amount' },
                { columnid: 'TaxAmt', title: 'Tax Amount' },
                { columnid: 'GrandTotal', title: 'Total Amount' },
                { columnid: 'StatusDesc', title: 'Status' },
                { columnid: 'PayTypeDesc', title: 'Pay Type' },
                { columnid: 'IsActive', title: 'Is Active' }
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
            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "40", enableFiltering: false, },
            { name: 'TokenNo', displayName: 'TokenNo', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'TokenDt', displayName: 'Token Date', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'Distcode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
                 { name: 'PGNameDesc', displayName: 'Payment Gateway Name', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'PGNameDesc', displayName: 'Proforma Invoice No.', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
           // { name: 'PiInvoiceDt', displayName: 'Proforma Invoice Date', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
           // { name: 'ProductCode', displayName: 'Product Code', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'Quantity', displayName: 'Quantity', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
              { name: 'Amount', displayName: 'Amount', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
              { name: 'TaxAmt', displayName: 'Tax Amount', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
             { name: 'GrandTotal', displayName: 'Total Amount', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
            { name: 'StatusDesc', displayName: 'Status', width: "90", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PayTypeDesc', displayName: 'Pay Type', width: "90", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'IsActive', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Transaction Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        //product dropdown
        $scope.GetAllProduct = function () {
            $http.get(uri + 'Payment/GetAMCProduct?ProductCode&isactive=Y').then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.allprod = response.data.Data;
                    //SmartAlert.SuccessGrid(response.data.Message);
                }
                else {
                    // SmartAlert.Errmsg(response.data.Message);
                }
            })
        }
        $scope.GetAllProduct();
        $scope.allStatus = [{ status: 'Success', code: 'PS' }, { status: 'Failed', code: 'PF' }, { status: 'Pending', code: 'PE' }]
        $scope.select = function (paydata) {
            $sessionStorage.paydata = paydata;
            $sessionStorage.flag = 'UP';
            $state.go('app.dashboard.pay_transaction_new');
        }
        $scope.AddnewTransaction = function () {
            $sessionStorage.prod = null;
            $sessionStorage.flag = 'IN';
            $state.go('app.dashboard.product');
        }

        $scope.GetTransaction = function (valid, ProductCode, TokenNo, FromDate, ToDate) {
            if (valid) {
                if (ProductCode == undefined) {
                    $scope.PCode = "";
                } else {
                    $scope.PCode = ProductCode;
                }
                if (TokenNo == undefined) {
                    $scope.tno = "";
                } else {
                    $scope.tno = TokenNo;
                }
                if (FromDate == undefined) {
                    $scope.fdate = "";
                } else {
                    $scope.fdate = FromDate;
                }
                if (ToDate == undefined) {
                    $scope.tdate = "";
                } else {
                    $scope.tdate = ToDate;
                }
                $http.get(uriadmin + 'Payment/GetAMCPaymentDetails?ProductCode=' + $scope.PCode + '&TokenNo=' + $scope.tno + '&FromDate=' + $scope.fdate + '&ToDate=' + $scope.tdate + '&IsOPF&Status='+$scope.status).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.mystyle.push($scope.mystyle1);
                })
            }
        }
        // $scope.GetTransaction();

    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('TransactionController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, uri, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    //$scope.divshow = true;
    //$scope.divhide = false;
    if ($sessionStorage.paydata != null) {
        $scope.transdata = $sessionStorage.paydata;
        $scope.transdata.Flag = 'UP'
        //$scope.transdata.tkno = $scope.transdata.TokenNo;
        $scope.submit = 'Update';
    } else {
        $scope.submit = 'Submit';
    }

    //product dropdown
    $scope.GetAllProduct = function () {
        $http.get(uri + 'Payment/GetAMCProduct?ProductCode&isactive').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.allprod = response.data.Data;

                //SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                // SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetAllProduct();

    //$scope.SavepayDetails = function (valid, status) {

    //    if (valid == true) {
    //       // $scope.divshow = false;
    //        //$scope.divhide = true;

    //        if ($sessionStorage.flag != 'IN') {

    //            $scope.tdata = [];
    //            $scope.tdata.TokenNo = $scope.transdata.tkno;
    //            $scope.tdata.Status = status;
    //            $scope.tdata.Flag = 'UP';
    //            $scope.tdata.TokenDt = null;
    //            $scope.tdata.Distcode = null;
    //            $scope.tdata.InvoiceNo = null;
    //            $scope.tdata.InvoiceDt = null;
    //            $scope.tdata.InvType = null;
    //            $scope.tdata.ProductCode = null;
    //            $scope.tdata.Quantity = null;
    //            $scope.tdata.Amount = null;
    //            $scope.tdata.PayType = null;
    //            $scope.tdata.TransRefNo = null;
    //            $scope.tdata.TransDate = null;
    //            $scope.tdata.ApiExecuted = null;
    //            $scope.tdata.UserCode = $sessionStorage.ucode;
    //            $scope.getAuth();

    //        }
    //        else {

    //            $scope.transdata = transdata;
    //            $scope.transdata.Flag = 'IN';
    //            $scope.transdata.UserCode = $sessionStorage.ucode;
    //            $scope.transdata.IsActive = 'Y';
    //            var json = angular.toJson($scope.transdata)
    //            $scope.source_string = json;
    //            var encrypted = CryptoJS.AES.encrypt(
    //            $scope.source_string,
    //            $rootScope.base64Key,
    //            { iv: $rootScope.base64Key }
    //            );
    //            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    //            $scope.getAuth();

    //        }
    //    }
    //};
    $scope.SavepayDetails = function (valid, tdata) {
        $scope.tdata = tdata,
        $http({
            method: "POST",
            url: uri + 'Payment/IUDAMCPaymentDetails',
            data: {
                // Data: $scope.tdata,
                TokenNo: $scope.tdata.TokenNo,
                Status: $scope.tdata.Status,
                Flag: "UP",
                TokenDt: null,
                Distcode: $scope.tdata.DistCode,
                InvoiceNo: null,
                InvoiceDt: null,
                InvType: $scope.tdata.Invtype,
                ProductCode: $scope.tdata.ProductCode,
                Quantity: $scope.tdata.Quantity,
                Amount: $scope.tdata.Amount,
                TransRefNo: $scope.tdata.TransRefNo,
                TransDate: $scope.tdata.TransDate,
                PGname: $scope.transdata.pgname,
                PayType: $scope.transdata.PayType,
                ApiExecuted: $scope.transdata.apiexecuted,
                UserCode: $sessionStorage.ucode

            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.transaction_grid');
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

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();



});
appdash.controller('PaymentTransactionController', function ($q, $http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, base64, SmartAlert, amcproductcode, uriadmin, uri, Name, Password) {
    $scope.transaction = { IsActive: 'Y', ProductCode: amcproductcode };
    $scope.ishide = false;
    $scope.isshow = true;
    $scope.isIGST = true;
    //product & PG dropdown
    $scope.GetAllProduct = function () {
        $q.all([$http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + amcproductcode + '&IsActive=Y'), $http.get(uriadmin + 'Pay/getpaymentgateway?PgId&PgType&PgDesc&IsActive=Y')]).then(function (response) {
            if (response[0].data.StatusCode != 0) {
                $scope.allprod = response[0].data.Data;
            }
            else {
                $scope.allprod = [];
            }
            if (response[1].data.StatusCode != 0) {
                $scope.pgGateWay = response[1].data.Data;
                $scope.pgGateWay.push({ PgType: 'CASH', PgDesc: 'Cash' });
            }
            else {
                $scope.pgGateWay = [];
            }
        })
    }
    $scope.GetAllProduct();
    $scope.getDistHome = function () {
        $http.get(uriadmin + 'Distributor/GetDistributorDtls?Distcode=' + $scope.transaction.Distcode + '&DistName&PhoneNo&GstnNo&FromDate&ToDate').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.isHomeState = response.data.Data[0].IsHomeState;
                $scope.ishide = $scope.isHomeState == "Y" ? true : false;
                $scope.isshow = $scope.isHomeState == "Y" ? true : false;
                $scope.isIGST = false;
                //$scope.transaction.CgstRate = $scope.allprod[0].CgstRate;
                //$scope.transaction.SgstRate = $scope.allprod[0].SgstRate;
                //$scope.transaction.IgstRate = $scope.allprod[0].IgstRate;
            }
            else {
                $scope.ishide = false;
                $scope.isshow = true;
                $scope.isIGST = true;
                $scope.transaction.ProductCode = null;
                $scope.transaction.CgstRate = null;
                $scope.transaction.SgstRate = null;
                $scope.transaction.IgstRate = null;
            }
        })
    }
    $scope.getProductDtls = function () {
        $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + ' ' + '&IsActive=' + ' ').then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.transaction.CgstRate = response.data.Data[0].CgstRate;
                $scope.transaction.SgstRate = response.data.Data[0].SgstRate;
                $scope.transaction.IgstRate = response.data.Data[0].IgstRate;

            }
        })
    }
    $scope.calculations = function () {
        $scope.Amount = parseFloat($scope.transaction.Amount) * parseInt($scope.transaction.Quantity);
        if ($scope.isHomeState == "Y") {
            $scope.transaction.CgstAmt = ($scope.Amount * $scope.transaction.CgstRate) / 100;
            $scope.transaction.SgstAmt = ($scope.Amount * $scope.transaction.SgstRate) / 100;
            $scope.transaction.TaxPer = $scope.transaction.CgstRate + $scope.transaction.SgstRate;
        }
        else {
            $scope.transaction.IgstAmt = ($scope.Amount * $scope.transaction.IgstRate) / 100;
            $scope.transaction.TaxPer = $scope.transaction.IgstRate;
        }
        $scope.transaction.TaxAmt = ($scope.Amount * $scope.transaction.TaxPer) / 100;
        $scope.transaction.GrandTotal = $scope.Amount + $scope.transaction.TaxAmt;
    }
    $scope.disabledText = function () {
        document.getElementById('trid').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid1').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid2').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid').required = $scope.transaction.PGname == "CASH" ? false : true;
        document.getElementById('trid1').required = $scope.transaction.PGname == "CASH" ? false : true;
        document.getElementById('trid2').required = $scope.transaction.PGname == "CASH" ? false : true;
        $scope.transaction.PgTax = $scope.transaction.PGname == "CASH" ? 0 : null;
        $scope.transaction.RecAmt = $scope.transaction.PGname == "CASH" ? $scope.transaction.GrandTotal : null;

    }

    if ($sessionStorage.paydata != null) {
        $scope.transaction = $sessionStorage.paydata;
        $scope.getDistHome();
        document.getElementById('trid').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid1').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid2').disabled = $scope.transaction.PGname == "CASH" ? true : false;
        document.getElementById('trid').required = $scope.transaction.PGname == "CASH" ? false : true;
        document.getElementById('trid1').required = $scope.transaction.PGname == "CASH" ? false : true;
        document.getElementById('trid2').required = $scope.transaction.PGname == "CASH" ? false : true;
        $sessionStorage.paydata = null;
    }

    $scope.SavepayDetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.transaction.Flag = $scope.transaction.TokenNo == null ? "IN" : "UP";
            $scope.transaction.Invtype = "MG";
            $scope.transaction.Status = "PS";
            $scope.source_string = angular.toJson($scope.transaction);
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http({
                method: "POST",
                url: uriadmin + 'Payment/IUDAMCPaymentDetails',
                data: { Data: $scope.ciphertext }
            }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    SmartAlert.Success(response.data.Message);
                    var h = setInterval(function () {
                        $state.go('app.dashboard.transaction_grid');
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
    }
});

appdash.controller('AMCArrearsGridController', function ($http, $scope, $filter, $timeout, $state, userService, SmartAlert, uriadmin, $rootScope, $sessionStorage, base64, uri, Name, Password) {

    var valueof = userService.Success('EG');
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
                    title: 'AMC Arrears Details',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
                { columnid: 'DistCode', title: 'Dist Code' },
                { columnid: 'DistName', title: 'DistName' },
                { columnid: 'BillDate', title: 'Bill Date' },
                { columnid: 'Amount', title: 'Amount' },
                { columnid: 'TaxAmount', title: 'Tax Amount' },
                { columnid: 'TotalAmount', title: 'Total Amount' },
                { columnid: 'FromDate', title: 'From Date' },
                { columnid: 'ToDate', title: 'To Date' },
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
            { name: 'DistCode', displayName: 'DistCode', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Dist Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BillDate', displayName: 'Bill Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'FromDate', displayName: 'From Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ToDate', displayName: 'To Date', width: "120", cellFilter: 'date: "dd MM yyyy"', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Amount', displayName: 'Amount', width: "*", cellTooltip: true, type: 'number', cellClass: 'grid-align_right', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TaxAmount', displayName: 'Tax Amount', width: "*", cellTooltip: true, type: 'number', cellClass: 'grid-align_right', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalAmount', displayName: 'Total Amount', width: "*", cellTooltip: true, type: 'number', cellClass: 'grid-align_right', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'IsActive', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },


            { name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>', width: "70", enableFiltering: false, },
               ],


            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuExcel: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("AMC Arrears Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


        $scope.select = function (paydata) {
            $sessionStorage.arrearsdata = paydata;
            $state.go('app.dashboard.amc_arrears');
        }


        $scope.GetAMCArrears = function (valid, Dcode) {
            if (valid) {
                $http.get(uriadmin + 'Pay/GettblTArrears?ArrearId=&DistCode=' + Dcode + '&IsActive').then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                })
            }

        }
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

});
appdash.controller('AMCArrearsController', function ($http, $scope, $filter, $timeout, $state, $rootScope, $sessionStorage, uriadmin, base64, SmartAlert, uri, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.arrears = {
        IsActive: 'Y'
    };
    $scope.divshow = true;
    $scope.divhide = false;

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

    //for edit
    if ($sessionStorage.arrearsdata != null) {
        $scope.arrears = $sessionStorage.arrearsdata;
        $scope.frdate = $scope.arrears.FromDate
        $scope.todate = $scope.arrears.ToDate
        $scope.BDate = $scope.arrears.BillDate;
        $scope.arrears.ToDate = $scope.todate.slice(0, 12);
        $scope.arrears.FromDate = $scope.frdate.slice(0, 12);
        $scope.arrears.BillDate = $scope.BDate.slice(0, 12);
        $scope.dc = true;
        $sessionStorage.arrearsdata = null;
        $scope.submit = 'Update';
    } else {
        $scope.submit = 'Submit';
        $scope.dc = false;
    }

    $scope.totalAmount = function (amount, taxamount) {
        $scope.arrears.TotalAmount = parseInt($scope.arrears.Amount) + parseInt($scope.arrears.TaxAmount);
    }


    $scope.SubmitArrears = function (valid, arrears) {
        $scope.arrears = arrears;
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.arrears.Flag = $scope.arrears.ArrearId != null ? "UP" : "IN";

            var json = angular.toJson($scope.arrears)
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
                url: uriadmin + 'Pay/IUDtblTArrears ',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    SmartAlert.Success(response.data.Message);
                    $state.go('app.dashboard.amc_arrears_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    }


    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();
});


