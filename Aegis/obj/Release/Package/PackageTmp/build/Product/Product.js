appdash.controller('ProductGroupGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CL');
    $sessionStorage.currentstate = $state.current.name;
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
        { name: 'ItemGroupName', displayName: 'Item Group Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemGroup', displayName: 'Item Group', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        {
            name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
            cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
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
        }
    };
    $scope.select = function (data) {
        $sessionStorage.itemGroupData = data;
        $state.go('app.dashboard.product_group');
    }

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = true;

    $scope.GetSearch = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Master/GetItemGroup?ItemGroupId=&ItemGroup=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.gridOptions1.data = [];
                SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetSearch();

});
appdash.controller('ProductGroupController', function ($http, $scope, $filter, noimage, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.submit = "Submit";
    $scope.groupData = { IsActive: 'Y' };
    if ($sessionStorage.itemGroupData != null) {
        $scope.groupData = $sessionStorage.itemGroupData;
        $scope.submit = "Update";
        $sessionStorage.itemGroupData = null;
    }

    $scope.SaveGroupDetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.groupData.PUserCode = $sessionStorage.ucode;
            $scope.groupData.Flag = $scope.groupData.ItemGroupId != null ? "UP" : "IN";
            $scope.source_string = angular.toJson($scope.groupData);
            var encrypted = CryptoJS.AES.encrypt($scope.source_string, $rootScope.base64Key, { iv: $rootScope.base64Key });
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http.post(uriadmin + 'Master/ManageItemGroup', { Data: $scope.ciphertext }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    SmartAlert.Success(response.data.Message);
                    $scope.groupData = false;
                    $state.go('app.dashboard.product_group_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    };
});

appdash.controller('ProductClassGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CM');
    $sessionStorage.currentstate = $state.current.name;
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
        { name: 'ItemClassName', displayName: 'Item Class Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemClass', displayName: 'Item Class', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'IsActive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        {
            name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
            cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
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
        }
    };
    $scope.select = function (data) {
        $sessionStorage.itemClassData = data;
        $state.go('app.dashboard.product_class');
    }

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = true;

    $scope.GetSearch = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Master/GetItemClass?ItemClassId=&ItemClass=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.gridOptions1.data = [];
                SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetSearch();

});
appdash.controller('ProductClassController', function ($http, $scope, $filter, noimage, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.submit = "Submit";
    $scope.classData = { IsActive: 'Y' };

    $scope.GetSearch = function () {        
        $http.get(uriadmin + 'Master/GetItemGroup?ItemGroupId=&ItemGroup=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.prodGroups = response.data.Data;
            }
            else {
                $scope.prodGroups = [];
                SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetSearch();

    if ($sessionStorage.itemClassData != null) {
        $scope.classData = $sessionStorage.itemClassData;
        $scope.submit = "Update";
        $sessionStorage.itemClassData = null;
    }

    $scope.SaveClassDetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.classData.PUserCode = $sessionStorage.ucode;
            $scope.classData.Flag = $scope.classData.ItemClassId != null ? "UP" : "IN";
            $scope.source_string = angular.toJson($scope.classData);
            var encrypted = CryptoJS.AES.encrypt($scope.source_string, $rootScope.base64Key, { iv: $rootScope.base64Key });
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http.post(uriadmin + 'Master/ManageItemClass', { Data: $scope.ciphertext }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    SmartAlert.Success(response.data.Message);
                    $scope.classData = false;
                    $state.go('app.dashboard.product_class_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    };
});

appdash.controller('ActualProductGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CN');
    $sessionStorage.currentstate = $state.current.name;
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
        { name: 'ItemCode', displayName: 'Item Code', width: "150",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemName', displayName: 'Item Name', width: "280", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemSchemeName', displayName: 'Item Scheme Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemScheme', displayName: 'Item Scheme', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemClassName', displayName: 'Item Class Name', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemGroupName', displayName: 'Item Group Name', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'ItemNature', displayName: 'Item Nature', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
       { name: 'UM', displayName: 'Unit', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'AUM', displayName: 'AUM', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'HSNCode', displayName: 'HSN Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'IsActive', displayName: 'Is Active', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        {
            name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
            cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
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
        }
    };
    $scope.select = function (data) {
        $sessionStorage.itemActualData = data;
        $state.go('app.dashboard.actual_product');
    }

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = true;

    $scope.GetSearch = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Master/GetItemDtls?ItemRefNo=&ItemClassId=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.gridOptions1.data = response.data.Data;
                SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.gridOptions1.data = [];
                SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetSearch();

});
appdash.controller('ActualProductController', function ($http, $scope, $filter, noimage, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.submit = "Submit";
    $scope.actualData = { IsActive: 'Y' };

    $scope.GetItemGroup= function () {
        $http.get(uriadmin + 'Master/GetItemGroup?ItemGroupId=&ItemGroup=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.prodGroups = response.data.Data;
            }
            else {
                $scope.prodGroups = [];
                //SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetItemGroup();

    $scope.GetSearch = function () {
        $http.get(uriadmin + 'Master/GetItemClass?ItemClassId=&ItemClass=&ItemGroupId=&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.prodClass = response.data.Data;
               // SmartAlert.Success(response.data.Message);
            }
            else {
                $scope.prodClass = [];
               // SmartAlert.Errmsg(response.data.Message);
            }
        });
    }
    $scope.GetSearch();

    if ($sessionStorage.itemActualData != null) {
        $scope.actualData = $sessionStorage.itemActualData;
        $scope.submit = "Update";
        $sessionStorage.itemActualData = null;
    }

    $scope.SaveActualDetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.actualData.PUserCode = $sessionStorage.ucode;
            $scope.actualData.Flag = $scope.actualData.ItemRefNo != null ? "UP" : "IN";
            $scope.source_string = angular.toJson($scope.actualData);
            var encrypted = CryptoJS.AES.encrypt($scope.source_string, $rootScope.base64Key, { iv: $rootScope.base64Key });
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http.post(uriadmin + 'Master/ManageItemDetails', { Data: $scope.ciphertext }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    SmartAlert.Success(response.data.Message);
                    $scope.actualData = false;
                    $state.go('app.dashboard.actual_product_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }
    };
});



//If no need of below code, delete it.
appdash.controller('PrimaryProductMasterGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
        $scope.gridOptions1.data.length = 0;
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
                title: 'Primary Product Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
         //{ columnid: 'ProdCode', title: 'Product Code' },
         { columnid: 'ProdName', title: 'Product Name' },
         { columnid: 'ProductDesc', title: 'Product Description' },
         { columnid: 'ImgName', title: 'Image' },
         { columnid: 'ProdType', title: 'Product Type' },
         { columnid: 'SerType', title: 'Serial Code' },
         { columnid: 'ProdRate', title: 'Product Rate' },
         { columnid: 'MinQty', title: 'Minimum Quantity' },
         { columnid: 'IsRenewal', title: 'Renewal Applicable' },
         { columnid: 'RenewalDays', title: 'Renewal Days' },
         { columnid: 'CgstRate', title: 'CGST Rate' },
         { columnid: 'SgstRate', title: 'SGST Rate' },
         { columnid: 'IgstRate', title: 'IGST Rate' },
          { columnid: 'IsAccept', title: 'Distributor Acceptence' },
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
                10: { cell: { style: 'color:black' } },
                11: { cell: { style: 'color:black' } },
                12: { cell: { style: 'color:black' } },
                13: { cell: { style: 'color:black' } },

            },

        };
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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

            { name: 'ProdCode', displayName: 'Product Code', cellClass: 'grid-align', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdName', displayName: 'Product Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProductDesc', displayName: 'Product Description', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ImgName', displayName: 'Image', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdType', displayName: 'Product Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'SerType', displayName: 'Serial Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdRate', displayName: 'Product Rate', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MinQty', displayName: 'Min. Qty', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MaxQty', displayName: 'Max. Qty', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsRenewal', displayName: 'Renewal Applicable', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RenewalDays', displayName: 'Renewal Days', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CgstRate', displayName: 'Cgst Rate', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'SgstRate', displayName: 'Sgst Rate', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'IgstRate', displayName: 'Igst Rate', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'IsAccept', displayName: 'Distributor Acceptence', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'IsActive', displayName: 'Is Active', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.ProdCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
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
                    alasql('SELECT * INTO XLS("Primary Product Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (ProductCode) {
            $sessionStorage.ProdCode = ProductCode;
            $sessionStorage.mflag = 'PP';
            $state.go('app.dashboard.primary_product_master');
        }
        $scope.clear1 = function () {
            $sessionStorage.ProdCode = null;
            $sessionStorage.mflag = 'PP';
        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetSearch = function () {
            $scope.divshow = false;
            $scope.divhide = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + ' ' + '&IsActive=' + ' ')
            .then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'PP') {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
            })

        }
        if ($sessionStorage.mflag == 'PP')
            $scope.GetSearch();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }

});
appdash.controller('PrimaryProductMasterController', function ($http, $scope, $filter, noimage, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.divshow = true;
    $scope.divhide = false;
    document.getElementById('renewaldaysid').disabled = true;
    $scope.getProductType = [{ ProdType: 'H', ProName: 'Hardware' }, { ProdType: 'S', ProName: 'Software' }, { ProdType: 'C', ProName: 'Cards' }, { ProdType: 'O', ProName: 'Others' }];
    $scope.getSerialType = [{ SerType: 'S', SerName: 'Single serial' }, { SerType: 'F', SerName: 'Serial From To' }, { SerType: 'N', SerName: 'Not Applicable' }];
    $scope.IsRenewal = function (Product) {
        if (Product == 'Y') {
            document.getElementById('renewaldaysid').disabled = true;
        }
        else {
            document.getElementById('renewaldaysid').disabled = false;
        }
    }
    //$scope.uptofive = function (text) {
    //    if (text) {
    //        var a = text.split('.')[1];
    //        if (a != null && (a.length > 5 && a.length<=6)) {
    //            $scope.Product.ProdRate = text.replace(/(\.[\d]{5})./g, '$1');               
    //        }
    //        else if (a.length <= 5) {
    //            $scope.Product.ProdRate;
    //        }
    //        else {
    //            $scope.Product.ProdRate = text.split('.')[0];
    //        }
    //    }
    //}
    if ($sessionStorage.ProdCode != null) {

        $scope.GetSearch = function () {
            $scope.divshow = true;
            $scope.divhide = false;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + $sessionStorage.ProdCode + '&IsActive=')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.allProduct = response.data.Data;
                    $scope.Product = $scope.allProduct[0];
                    if ($scope.Product.IsRenewal == 'N') {
                        $scope.Product.RenewalDays = "0";
                    }
                    $scope.Product.ImgName = $scope.Product.ImgName;
                    $scope.Product.ser = $scope.Product.ImgName;
                    $scope.Product.TranCharges = ($scope.Product.tranCharges).toFixed(2);
                    $scope.Product.ProdRate = ($scope.Product.ProdRate).toFixed(5);
                    $scope.Product.Frequency = $scope.Product.Frequency;

                    if ($scope.Product.CgstRate == '' || $scope.Product.CgstRate == null || $scope.Product.CgstRate == undefined) {
                        $scope.Product.CgstRate = 0
                    }
                    else
                        if ($scope.Product.SgstRate == '' || $scope.Product.SgstRate == null || $scope.Product.SgstRate == undefined) {
                            $scope.Product.SgstRate = 0

                        }
                    $scope.Product.CgstRate = ($scope.Product.CgstRate).toFixed(2);


                    $scope.Product.SgstRate = ($scope.Product.SgstRate).toFixed(2);
                    $scope.Product.IgstRate = ($scope.Product.IgstRate).toFixed(2);

                    if ($scope.Product.ImgName == null || $scope.Product.ImgName == '') {
                        // $scope.filepreview = '../../css/images/images.jpg';ss
                        //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';
                        $scope.filepreview = 'styles/img/cover.png';
                    }
                    else {
                        $scope.nimg1 = uriproductimage + $scope.Product.ImgName;
                        $scope.filepreview = $scope.nimg1;
                    }
                    $scope.IsRenewal($scope.Product.IsRenewal);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        };
        $scope.GetSearch();
        $scope.submit = 'Update';
    }
    else {
        // $scope.filepreview = '../../css/images/images.jpg';ss
        //$scope.filepreview = $window.location.origin + '/XpressAdmin/css/images/no-image.png';
        $scope.filepreview = noimage + 'css/images/no-image.png';
        $scope.submit = 'Submit';
    }
    $scope.qtymatch = function (minqty, maxqty) {

        if (Number(minqty) > Number(maxqty)) {
            SmartAlert.Errmsg('Max quantity should be greater or equal to Min qunatity');
            document.getElementById('btnsbt').disabled = true;

        }
        else {
            document.getElementById('btnsbt').disabled = false;
        }
    }
    $scope.SaveProductDetails = function (valid, Product) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($sessionStorage.ProdCode != null) {
                $scope.Product = Product;
                if ($sessionStorage.ImageData == null || $sessionStorage.ImageData == '' || $sessionStorage.ImageData == undefined || $sessionStorage.ImageData == 'undefined') {
                    $sessionStorage.ImageData == null;
                    fileName = $sessionStorage.ImageName;
                    if (fileName == null || fileName == undefined || fileName == '') {
                        $scope.getupdateauth();
                    }
                    else {
                        var idxDot = fileName.lastIndexOf(".") + 1;
                        var ext = fileName.substr(idxDot, fileName.length).toLowerCase()
                        if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == '.bmp' || ext == 'png') {
                            $scope.getupdateauth();
                        }
                        else {
                            SmartAlert.Errmsg('Please select image only');
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    }
                }
                else {
                    fileName = $sessionStorage.ImageName;
                    if (fileName == null || fileName == undefined || fileName == '') {
                        $scope.getupdateauth();
                    }
                    else {
                        var idxDot = fileName.lastIndexOf(".") + 1;
                        var ext = fileName.substr(idxDot, fileName.length).toLowerCase()
                        if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == '.bmp' || ext == 'png') {
                            $scope.getupdateauth();
                        }
                        else {
                            SmartAlert.Errmsg('Please select image only');
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }

                    }

                }
            }
            else {

                $scope.Product = Product;
                if ($sessionStorage.ImageData == null || $sessionStorage.ImageData == '' || $sessionStorage.ImageData == undefined || $sessionStorage.ImageData == 'undefined') {
                    $sessionStorage.ImageData == null;
                    fileName = $sessionStorage.ImageName;
                    if (fileName == null || fileName == undefined || fileName == '') {
                        $scope.getsubmitauth();
                    }
                    else {
                        var idxDot = fileName.lastIndexOf(".") + 1;
                        var ext = fileName.substr(idxDot, fileName.length).toLowerCase()
                        if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == '.bmp' || ext == 'png') {
                            $scope.getsubmitauth();
                        }
                        else {
                            SmartAlert.Errmsg('Please select image only');
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    }
                }
                else {
                    fileName = $sessionStorage.ImageName;
                    if (fileName == null || fileName == undefined || fileName == '') {
                        $scope.getsubmitauth();
                    }
                    else {
                        var idxDot = fileName.lastIndexOf(".") + 1;
                        var ext = fileName.substr(idxDot, fileName.length).toLowerCase()
                        if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == '.bmp' || ext == 'png') {
                            $scope.getsubmitauth();
                        }
                        else {
                            SmartAlert.Errmsg('Please select image only');
                            $scope.divshow = true;
                            $scope.divhide = false;
                        }
                    }
                }
            }
        }
    };
    $scope.getsubmitauth = function () {

        $scope.divshow = false;
        $scope.divhide = true;
        if ($scope.Product.IsRenewal == 'Y' && $scope.Product.RenewalDays == null) {
            SmartAlert.Errmsg('Enter Renewal Days');
        }
        else {
            if ($scope.Product.IsRenewal == 'Y') {

            }
            else {
                $scope.Product.IsRenewal = 'N';
                $scope.Product.RenewalDays = '0';

            }
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: "POST",
                url: uriadmin + 'product/Postproductinfo',
                data: {
                    ProductDesc: $scope.Product.ProductDesc,
                    Data: $sessionStorage.ImageData,
                    ProdType: $scope.Product.ProdType,
                    SerType: $scope.Product.SerType,
                    ProdRate: $scope.Product.ProdRate,
                    MinQty: $scope.Product.MinQty,
                    IsRenewal: $scope.Product.IsRenewal,
                    RenewalDays: $scope.Product.RenewalDays,
                    IgstRate: $scope.Product.IgstRate,
                    CgstRate: $scope.Product.CgstRate,
                    SgstRate: $scope.Product.SgstRate,
                    PUserCode: $sessionStorage.ucode,
                    IsAccept: $scope.Product.IsAccept,
                    TranCharges: $scope.Product.TranCharges,
                    IsActive: 'Y',
                    ProdName: $scope.Product.ProdName,
                    Frequency: $scope.Product.Frequency,
                    IsReferTransCharge: $scope.Product.IsReferTransCharge,
                    IsInclusive: $scope.Product.IsInclusive,
                    MaxQty: $scope.Product.MaxQty,

                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    SmartAlert.Success(response.data.Message);
                    $scope.submit = 'Submit';
                    $sessionStorage.ImageData = null;
                    $state.go('app.dashboard.primary_product_master_grid');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                }

            });
        }

    };
    $scope.getupdateauth = function () {
        $scope.divshow = false;
        $scope.divhide = true;

        if ($scope.Product.IsRenewal == 'Y' && $scope.Product.RenewalDays == null) {
            SmartAlert.Errmsg('Enter Renewal Days');
        }
        else {
            if ($scope.Product.IsRenewal == 'Y') {
                $scope.Renewalis = 'Y';
                $scope.RenewalDay = $scope.Product.RenewalDays;
            }
            else {
                $scope.Product.IsRenewal = 'N';
                $scope.Renewalis = 'N';
                $scope.RenewalDay = '0';
                $scope.Product.RenewalDays = '0';

            }
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: "POST",
                url: uriadmin + 'product/Putproductinfo',
                data: {
                    ProdCode: $sessionStorage.ProdCode,
                    ProdName: $scope.Product.ProdName,
                    ProductDesc: $scope.Product.ProductDesc,
                    Data: $sessionStorage.ImageData,
                    ProdType: $scope.Product.ProdType,
                    SerType: $scope.Product.SerType,
                    ProdRate: $scope.Product.ProdRate,
                    MinQty: $scope.Product.MinQty,
                    IsRenewal: $scope.Product.IsRenewal,
                    RenewalDays: $scope.RenewalDay,
                    IgstRate: $scope.Product.IgstRate,
                    CgstRate: $scope.Product.CgstRate,
                    SgstRate: $scope.Product.SgstRate,
                    PUserCode: $sessionStorage.ucode,
                    IsAccept: $scope.Product.IsAccept,
                    TranCharges: $scope.Product.TranCharges,
                    IsActive: $scope.Product.IsActive,
                    Frequency: $scope.Product.Frequency,
                    IsReferTransCharge: $scope.Product.IsReferTransCharge,
                    IsInclusive: $scope.Product.IsInclusive,
                    MaxQty: $scope.Product.MaxQty,

                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.divshow = true;
                    $scope.divhide = false;
                    SmartAlert.Success(response.data.Message);
                    $scope.submit = 'Submit';
                    $sessionStorage.ImageData = null;
                    $state.go('app.dashboard.primary_product_master_grid');

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                }

            });
        }

    };
    $scope.SumGST = function (CgstRate, SgstRate, Product) {

        if (CgstRate == '' || CgstRate == null || CgstRate == undefined) {
            CgstRate = 0
        }
        else
            if (SgstRate == '' || SgstRate == null || SgstRate == undefined) {
                SgstRate = 0

            }
        $scope.IgstRate = parseFloat(CgstRate) + parseFloat(SgstRate);


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
            var name = file.name;
            $sessionStorage.ImageName = name;

        }
    }
});
appdash.controller('NewCouponGridGridController', function ($http, $scope, $filter, $timeout, userService, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {


    var valueof = userService.Success('CB');
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
                title: 'New Coupon Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
         { columnid: 'DistCode', title: 'Distributor Code' },
         { columnid: 'CouponCode', title: 'Coupon Code' },
         { columnid: 'CouponDesc', title: 'Coupon Description' },
         { columnid: 'CrDate', title: 'Coupon Created Date' },
         { columnid: 'MaxDisValue', title: 'Maximum Discount Value' },
         { columnid: 'MinPurValue', title: 'Minimum Purchase Value' },
         { columnid: 'DisType', title: 'Discount Type' },
         { columnid: 'DisValue', title: 'Discount Value' },
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


            },

        };
        $scope.mystyle = [];

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
            paginationPageSizes: [25, 50, 100, 500, 1000],
            paginationPageSize: 25,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs:
            [
                   { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'ProdName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CouponCode', displayName: 'Coupon Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'CouponDesc', displayName: 'Coupon Description', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CrDate', displayName: 'Active On', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MaxDisValue', displayName: 'Maximum Distributor Value', width: "220", cellFilter: 'number:2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'MinPurValue', displayName: 'Minimum Purchase Value', cellClass: 'grid-align', cellFilter: 'number:2', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'DisType', displayName: 'Discount Type', width: "150", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'DisValue', displayName: 'Discount Value', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'IsActive', displayName: 'Is Active', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.CouponCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
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
                    alasql('SELECT * INTO XLS("New Coupon Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (CouponCode) {
            $sessionStorage.CouponCode = CouponCode;
            $sessionStorage.mflag = 'NC';
            $state.go('app.dashboard.new_coupon');
        }
        $scope.clear1 = function () {
            $sessionStorage.CouponCode = null;
            $sessionStorage.mflag = 'NC';
        }

        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetSearch = function () {
            $scope.divshow = false;
            $scope.divhide = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'coupon/getcouponinfo?DistCode=' + ' ' + '&CouponCode=' + ' ' + '&IsActive=' + ' ')
            .then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'NC') {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
            })

        };
        if ($sessionStorage.mflag == 'NC')
            $scope.GetSearch();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }

});
appdash.controller('NewCouponController', function ($http, $scope, $filter, $timeout, userService, uri, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {

    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('CB');
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
        document.getElementById('dis').disabled = true;
        document.getElementById('dt').disabled = true;
        document.getElementById('disty').disabled = true;
        document.getElementById('disval').disabled = true;
        document.getElementById('dismax').disabled = true;
        document.getElementById('dismin').disabled = true;
        document.getElementById('prod').disabled = true;


        document.getElementById('dt').onkeypress = function () { return false; }
        $scope.getDiscountType = [{ DisType: 'PE', DisName: 'Percentage' }, { DisType: 'AM', DisName: 'Amount' }];

        $scope.divshow = true;
        $scope.divhide = false;

        if ($sessionStorage.CouponCode != null) {
            $scope.submit = 'Update';
            $scope.divshow = true;
            $scope.divhide = false;
            $scope.verifyenable = false;
            document.getElementById('distcodeenable').disabled = true;
            $scope.GetSearch = function () {

                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'coupon/getcouponinfo?DistCode=&CouponCode=' + $sessionStorage.CouponCode + '&IsActive=')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        document.getElementById('dis').disabled = false;
                        document.getElementById('dt').disabled = false;
                        document.getElementById('disty').disabled = false;
                        document.getElementById('disval').disabled = false;
                        document.getElementById('dismax').disabled = false;
                        document.getElementById('dismin').disabled = false;
                        document.getElementById('prod').disabled = false;
                        document.getElementById('sumbitenable').disabled = true;
                        $scope.allCoupon = response.data.Data;
                        $scope.Coupon = $scope.allCoupon[0];
                        $scope.DistCode = $scope.Coupon.DistCode;
                        $scope.Coupon.MinPurValue = ($scope.Coupon.MinPurValue).toFixed(2);
                        $scope.Coupon.DisValue = ($scope.Coupon.DisValue).toFixed(2);
                        $scope.Coupon.MaxDisValue = ($scope.Coupon.MaxDisValue).toFixed(2);
                        $scope.GetCoupon($scope.DistCode);
                    }
                    else {
                        SmartAlert.Errmsg('Invalid distributor code');
                    }

                })
            };
            $scope.GetSearch();

        }
        else {
            document.getElementById('sumbitenable').disabled = true;
            $scope.verifyenable = true;
            $scope.submit = 'Submit';
        }
        $scope.GetCouponVerification = function (DistCode) {


            if (DistCode == '' || DistCode == null || DistCode == undefined) {
                SmartAlert.Errmsg('Please enter distributor code');
            }
            else {
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

                $http.get(uri + 'Distributor/GetDIGLPGDistributorInfo?DistCode=' + DistCode)
                .then(function (response) {
                    if (response.data.StatusCode == 1) {

                        $scope.Coupon = {};
                        document.getElementById('sumbitenable').disabled = false;
                        document.getElementById('dis').disabled = false;
                        document.getElementById('dt').disabled = false;
                        document.getElementById('disty').disabled = false;
                        document.getElementById('prod').disabled = false;
                        document.getElementById('disval').disabled = false;
                        document.getElementById('dismax').disabled = false;
                        document.getElementById('dismin').disabled = false;
                        $scope.allCoupon = response.data.Data;
                        $scope.Coupon = $scope.allCoupon[0];
                        $scope.Coupon.DistName = $scope.Coupon.DistName;
                        $scope.Coupon.PinCode = $scope.Coupon.PinCode;
                        $sessionStorage.DistName = $scope.Coupon.DistName;
                        $sessionStorage.PinCode = $scope.Coupon.PinCode;
                        //$scope.Coupon = null;
                        //$scope.Coupon = {};
                        //$scope.Coupon.DistName = $sessionStorage.DistName;
                        //$scope.Coupon.PinCode = $sessionStorage.PinCode;

                    }
                    else {
                        document.getElementById('sumbitenable').disabled = true;
                        SmartAlert.Errmsg('Invalid distributor code');
                        $scope.Coupon.DistName = '';
                        $scope.Coupon.PinCode = '';

                    }

                })
            }
        };

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

            })
        };
        $scope.GetProductSearch();

        $scope.GetCoupon = function (DistCode) {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

            $http.get(uri + 'Distributor/GetDIGLPGDistributorInfo?DistCode=' + DistCode)
            .then(function (response) {
                if (response.data.StatusCode == 1) {

                    document.getElementById('sumbitenable').disabled = false;

                    $scope.allCoupon = response.data.Data;
                    $scope.CouponValue = $scope.allCoupon[0];
                    $scope.Coupon.DistName = $scope.CouponValue.DistName;
                    $scope.Coupon.PinCode = $scope.CouponValue.PinCode;

                }
                else {
                    SmartAlert.Errmsg('Invalid distributor code');
                }

            })
        };

        $scope.PostNewCoupon = function (valid, Coup, DistCode) {

            if (valid == true) {
                $scope.Coup = Coup;
                if ($scope.Coup.DisValue > $scope.Coup.MaxDisValue) {
                    SmartAlert.Errmsg('Discount value should be less or equal to maximum discount value');
                }
                else {
                    $scope.divshow = false;
                    $scope.divhide = true;
                    if ($sessionStorage.CouponCode != null) {
                        $scope.Coup = Coup;
                        $scope.Coup.DistCode = DistCode;
                        $scope.Coup.PUserCode = $sessionStorage.ucode;
                        $scope.Coup.Flag = 'UP';
                        $scope.Coup.CouponCode = $sessionStorage.CouponCode;
                        $scope.Coup.IsActive = $scope.Coup.IsActive;

                        var json = angular.toJson($scope.Coup)
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
                            url: uriadmin + 'product/ManageNewCoupons',
                            data: {
                                Data: $scope.ciphertext
                            }
                        }).then(function (response) {
                            if (response.data.StatusCode != 0) {
                                $scope.GetSignInData = response.data.Data;
                                SmartAlert.Success(response.data.Message);
                                $sessionStorage.Policyid = null;

                                var h = setInterval(function () {
                                    $state.go('app.dashboard.new_coupon_grid');
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

                        $scope.Coup = Coup;
                        $scope.Coup.DistCode = DistCode;
                        $scope.Coup.PUserCode = $sessionStorage.ucode;
                        $scope.Coup.Flag = 'IN';
                        $scope.Coup.CouponCode = null;
                        $scope.Coup.IsActive = 'Y';
                        var json = angular.toJson($scope.Coup)

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
                            url: uriadmin + 'product/ManageNewCoupons',
                            data: {
                                Data: $scope.ciphertext
                            }
                        }).then(function (response) {
                            if (response.data.StatusCode != 0) {
                                $scope.GetSignInData = response.data.Data;
                                SmartAlert.Success(response.data.Message);
                                var h = setInterval(function () {
                                    $state.go('app.dashboard.new_coupon_grid');
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
            }
        }
    }
});
appdash.controller('ManageCouponController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('CC');
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
        $scope.Fromdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        $scope.Todate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
                title: 'Manage Coupon Details',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                 { columnid: 'CouponCode', title: 'Coupon Code' },
                 { columnid: 'CouponDesc', title: 'Coupon Description' },
                 { columnid: 'CrDate', title: 'Created Date' },
                 { columnid: 'DisType', title: 'Discount Type(Current)' },
                 { columnid: 'DisValue', title: 'Discount Value(Current)' },
                 { columnid: 'MaxDisValue', title: 'Maximum Discount Value(Current)' },
                 { columnid: 'MinPurValue', title: 'Minimum Purchase Value(Current)' },
                 { columnid: 'DistTypeA', title: 'Discount Type(New)' },
                 { columnid: 'DisValueA', title: 'Discount Value(New)' },
                 { columnid: 'MaxDisValueA', title: 'Maximum Discount Value(New)' },
                 { columnid: 'MinPurValueA', title: 'Minimum Purchase Value(New)' },
                 { columnid: 'Remark', title: 'Remark' },
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
                12: { cell: { style: 'color:black' } },
                13: { cell: { style: 'color:black' } },

            },

        };
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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
             { name: 'DistName', displayName: 'Distributor Name', width: "430", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'CouponCode', displayName: 'Coupon Code', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'CouponDesc', displayName: 'Coupon Description', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CrDate', displayName: 'Active On', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            // { name: 'DisType', displayName: 'Discount Type(Current)', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //  { name: 'DisValue', displayName: 'Discount Value(Current)', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'MaxDisValue', displayName: 'Maximum Discount Value(Current)', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'MinPurValue', displayName: 'Minimum Purchase Value(Current)', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //  { name: 'DistTypeA', displayName: 'Discount Type(New)', width: "250",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              //{ name: 'DisValueA', displayName: 'Discount Value(New)', width: "150", cellFilter: 'number:2', cellTooltip: true, cellClass: 'grid-align', headerCellClass: $scope.highlightFilteredHeader },
             // { name: 'MaxDisValueA', displayName: 'Maximum Discount Value(New)', cellFilter: 'number:2', width: "230", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'MinPurValueA', displayName: 'Minimum Purchase Value(New)', cellFilter: 'number:2', width: "230", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'ProdCode', displayName: 'ProdCode', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'Remark', displayName: 'Remark', width: "280", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'IsActive', displayName: 'Is Active', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'View', displayName: 'View', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.CouponCode,row.entity.ProdCode)" data-title="Edit">View</button>',
                width: "100"
                , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Manage Coupon Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.GetSearch = function (distcode, sdate, edate) {
            $scope.divshow = false;
            $scope.divhide = true;

            if (distcode == '' || distcode == undefined)
                dcode = null;
            else
                dcode = distcode;
            if (sdate == '' || sdate == undefined)
                fdate = null;
            else
                fdate = sdate;
            if (edate == '' || edate == undefined)
                tdate = null;
            else
                tdate = edate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'coupon/getcouponinfo',
                params:
                    {
                        DistCode: dcode, Fromdate: fdate, Todate: tdate, IsActive: ''

                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'MC') {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
                $scope.divshow = true;
                $scope.divhide = false;
            })

        };

        $scope.select = function (CouponCode, ProdCode) {
            $sessionStorage.CCode = CouponCode;
            $sessionStorage.PCode = ProdCode;
            $sessionStorage.mflag = 'MC';
            $state.go('app.dashboard.manage_coupon_view');
        }
        $scope.clear1 = function () {
            $sessionStorage.CCode = null;
            $sessionStorage.mflag = 'MC';
        }
        //if ($sessionStorage.mflag == 'MC')
        //    $scope.GetSearch();
        //$scope.gridOptions1.data = $sessionStorage.grddata;
    }
});
appdash.controller('ManageCouponViewController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
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

    $scope.divshow = true;
    $scope.divhide = false;

    $scope.GetSearchbycode = function () {

        if ($sessionStorage.CCode != null) {

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'coupon/getcouponinfo?CouponCode=' + $sessionStorage.CCode + '&IsActive')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.allcoupon = response.data.Data;
                    $scope.coupon = $scope.allcoupon[0];
                    $scope.coupon.DistCode = $scope.coupon.DistCode;
                    $scope.coupon.CouponCode = $scope.coupon.CouponCode;
                    $scope.coupon.CouponDesc = $scope.coupon.CouponDesc;
                    $scope.coupon.CrDate = $scope.coupon.CrDate;
                    $scope.coupon.DisType = $scope.coupon.DisType;
                    $scope.coupon.DisValue = ($scope.coupon.DisValue).toFixed(2);
                    $scope.coupon.MaxDisValue = ($scope.coupon.MaxDisValue).toFixed(2);
                    $scope.coupon.MinPurValue = ($scope.coupon.MinPurValue).toFixed(2);
                    if ($scope.coupon.DistTypeA == '' || $scope.coupon.DistTypeA == null || $scope.coupon.DistTypeA == undefined)
                        $scope.coupon.DisTypeA = '';
                    else
                        $scope.coupon.DisTypeA = $scope.coupon.DistTypeA;
                    if ($scope.coupon.DisValueA == '' || $scope.coupon.DisValueA == null || $scope.coupon.DisValueA == undefined)
                        $scope.coupon.DisValueA = '';
                    else
                        $scope.coupon.DisValueA = ($scope.coupon.DisValueA).toFixed(2);
                    if ($scope.coupon.MaxDisValueA == '' || $scope.coupon.MaxDisValueA == null || $scope.coupon.MaxDisValueA == undefined)
                        $scope.coupon.MaxDisValueA = '';
                    else
                        $scope.coupon.MaxDisValueA = ($scope.coupon.MaxDisValueA).toFixed(2);
                    if ($scope.coupon.MinPurValueA == '' || $scope.coupon.MinPurValueA == null || $scope.coupon.MinPurValueA == undefined)
                        $scope.coupon.MinPurValueA = '';
                    else
                        $scope.coupon.MinPurValueA = ($scope.coupon.MinPurValueA).toFixed(2);
                    $scope.submit = 'Update';


                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }

            })
        }

        else {

        }

    };
    $scope.GetSearchbycode();




    $scope.ManageCoupon = function (valid, coupon) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ("CouponCode" in coupon) {

                if ($scope.coupon.DisValueA > $scope.coupon.MaxDisValueA) {
                    SmartAlert.Errmsg('Discount value should be less or equal to maximum discount value');
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    delete $scope.coupon.DisValue;
                    delete $scope.coupon.DisType;
                    delete $scope.coupon.MaxDisValue;
                    delete $scope.coupon.MinPurValue;
                    delete $scope.coupon.CrDate;
                    delete $scope.coupon.DistName;
                    delete $scope.coupon.CouponDesc;
                    delete $scope.coupon.AprovDate;
                    delete $scope.coupon.AUserCode;
                    delete $scope.coupon.OrderCode;
                    delete $scope.coupon.DistTypeA;
                    delete $scope.coupon.ProdName;
                    delete $scope.coupon.UseDate;
                    $scope.coupon.ProdCode = $sessionStorage.PCode;
                    $scope.coupon.PUserCode = $sessionStorage.ucode;
                    $scope.coupon.Flag = 'IN';
                    $scope.coupon.IsActive = 'A';
                    var json = angular.toJson($scope.coupon)
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
                        url: uriadmin + 'product/ManageCoupons',
                        data: {
                            Data: $scope.ciphertext
                        }
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {

                            SmartAlert.Success(response.data.Message);
                            var h = setInterval(function () {
                                $state.go('app.dashboard.Manage_coupon');
                                window.clearInterval(h);
                            }, 3000);
                            //$scope.clear();
                            $scope.submit = 'Submit';
                            $sessionStorage.CCode = null;
                            // $state.go('app.dashboard.District_master_grid');

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });


                }

            } else {
                SmartAlert.Errmsg('Invalid Coupon Code');
            }

        }
    };

    $scope.RejectCoupon = function (valid, coupon) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ("CouponCode" in coupon) {

                if ($scope.coupon.DisValueA > $scope.coupon.MaxDisValueA) {
                    SmartAlert.Errmsg('Discount value should be less or equal to maximum discount value');
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    delete $scope.coupon.DisValue;
                    delete $scope.coupon.DisType;
                    delete $scope.coupon.MaxDisValue;
                    delete $scope.coupon.MinPurValue;
                    delete $scope.coupon.CrDate;
                    delete $scope.coupon.DistName;
                    delete $scope.coupon.CouponDesc;
                    delete $scope.coupon.AprovDate;
                    delete $scope.coupon.AUserCode;
                    delete $scope.coupon.OrderCode;
                    delete $scope.coupon.DistTypeA;
                    delete $scope.coupon.ProdName;
                    delete $scope.coupon.UseDate;
                    $scope.coupon.ProdCode = $sessionStorage.PCode;
                    $scope.coupon.PUserCode = $sessionStorage.ucode;

                    $scope.coupon.Flag = 'IN';
                    $scope.coupon.IsActive = 'R';
                    var json = angular.toJson($scope.coupon)
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
                            url: uriadmin + 'product/ManageCoupons',
                            data: {
                                Data: $scope.ciphertext
                            }
                        }).then(function (response) {
                            if (response.data.StatusCode == 1) {

                                SmartAlert.Success(response.data.Message);
                                var h = setInterval(function () {
                                    $state.go('app.dashboard.Manage_coupon');
                                    window.clearInterval(h);
                                }, 3000);
                                //$scope.clear();
                                $scope.submit = 'Submit';
                                $sessionStorage.CCode = null;
                                // $state.go('app.dashboard.District_master_grid');

                            }
                            else {
                                SmartAlert.Errmsg(response.data.Message);
                            }
                            $scope.divshow = true;
                            $scope.divhide = false;
                        });
                    }
                }

            } else {
                SmartAlert.Errmsg('Invalid Coupon Code');
            }

        }
    };

});
appdash.controller('InwardMasterGridController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CD');
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
                title: 'Inward Master',
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

        $sessionStorage.InwardCode = null;
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

            { name: 'InwardCode', displayName: 'Inward Code', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'InwardDate', displayName: 'Inward Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DocRefCode', displayName: 'Documnet Reference Code', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'DocRefDate', displayName: 'Documnet Reference Date', cellClass: 'grid-align', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
           // { name: 'BatchCode', displayName: 'Batch Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdName', displayName: 'Product Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Product Quantity', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrNo', displayName: 'Product Serial No. From', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrTo', displayName: 'Product Serial No. To', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'IsActive', displayName: 'Is Active', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.InwardCode)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "70"
                , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Inward Master.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
                },
                order: 110
            }]
        };
        $scope.select = function (InwardCode) {
            $sessionStorage.InwardCode = InwardCode;
            $sessionStorage.mflag = 'IN';
            $state.go('app.dashboard.inword_master');
        }
        $scope.clear1 = function () {
            $sessionStorage.InwardCode = null;
            $sessionStorage.mflag = 'IN';
        }
        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        }
        $scope.gridOptions1.multiSelect = false;
        $scope.gridOptions1.enableRowSelection = true;

        $scope.GetSearch = function () {
            $scope.divshow = false;
            $scope.divhide = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetInwardInfo?InwardCode=&ProdCode=&BatchCode=&IsActive=')
            .then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'IN') {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
                $sessionStorage.mflag == null;
                $scope.mystyle.push($scope.mystyle1);
            })
        };
        if ($sessionStorage.mflag == 'IN')
            $scope.GetSearch();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }

});
appdash.controller('InwardMasterController', function ($http, $scope, $filter, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password, flag) {
    var flagvalue = flag;
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();


    document.getElementById('docdate').onkeypress = function () { return false; }
    document.getElementById('psrt').disabled = true;
    $scope.GetProductSearch = function () {
        $scope.divshow = false;
        $scope.divhide = true;
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

    $scope.GetProductbind = function (code) {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'product/getmyproductinfo?ProdCode=' + code + '&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.getProduct1 = response.data.Data[0];
                $scope.serialtype = $scope.getProduct1.SerType;
                $rootScope.SerType = $scope.serialtype;
                if ($scope.serialtype == 'F') {
                    $scope.showsrF = true;
                    $scope.showsrT = true;
                    $scope.prodlabel = 'Serial No. From';

                }

                else if ($scope.serialtype == 'S') {
                    $scope.showsrF = true;
                    $scope.showsrT = false;
                    $scope.prodlabel = 'Serial No.';
                }
                else if ($scope.serialtype == 'N') {
                    $scope.showsrF = false;
                    $scope.showsrT = false;
                }

            }

            else {
                SmartAlert.Errmsg(response.data.Message);
            }

        })

    };

    $scope.InwardDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

    if ($sessionStorage.InwardCode != null) {

        $scope.GetSearch = function () {
            $scope.divshow = true;
            $scope.divhide = false;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetInwardInfo?InwardCode=' + $sessionStorage.InwardCode + '&ProdCode=&BatchCode=&IsActive=')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.allInward = response.data.Data;
                    $scope.Inward = $scope.allInward[0];
                    $sessionStorage.srtype = $scope.Inward.SerType;
                    if ($scope.Inward.SerType == 'F') {
                        $scope.showsrF = true;
                        $scope.showsrT = true;
                        $scope.prodlabel = 'Serial No. From';
                        $scope.Inward.ProdSrNo = $scope.Inward.ProdSrNo;
                        $rootScope.ProdSrNo = $scope.Inward.ProdSrNo;
                    }
                    else if ($scope.Inward.SerType == 'S') {
                        $scope.showsrF = true;
                        $scope.showsrT = false;
                        $scope.prodlabel = 'Serial No.';
                    }
                    else if ($scope.Inward.SerType == 'N') {
                        $scope.showsrF = false;
                        $scope.showsrT = false;
                    }
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
        };
        $scope.GetSearch();
        $scope.submit = 'Update';
    }
    else {
        $scope.submit = 'Submit';
        $scope.divshow = true;
        $scope.divhide = false;
    }

    //$scope.SerialNo = function (Inward, value) {
    //    
    //    $scope.Inward = Inward;
    //    if (value == 0) {

    //        $scope.Inward.ProdSrTo = '';
    //        document.getElementById('btninward').disabled = true;
    //    }
    //    else {
    //        if ($scope.Inward.ProdSrTo < $scope.Inward.ProdSrNo) {
    //            SmartAlert.Errmsg('Product Serial No. To should be greater thnn Product Serial No. From');
    //            document.getElementById('btninward').disabled = true;
    //        }
    //        else {
    //            document.getElementById('btninward').disabled = false;
    //        }
    //    }
    //};

    $scope.Total1 = function (Inward) {
        $scope.Inward = Inward;

        if ($scope.prodlabel == 'Serial No. From') {

            if (flagvalue == 'H') {
                var x = $scope.Inward.ProdSrNo;
                x.toString().length;
                if (x.toString().length > 16 || x.toString().length < 16) {
                    $scope.msg1 = 'Smart Card number should be 16 digits.';
                    $scope.Inward.ProdQty = '';
                    $scope.Inward.ProdSrTo = '';
                    document.getElementById('btninward').disabled = true;
                }
                else {
                    $scope.Inward.ProdSrNo = $scope.Inward.ProdSrNo;
                    $scope.msg1 = '';
                    // $scope.Inward.ProdQty = ($scope.Inward.ProdSrTo - $scope.Inward.ProdSrNo) + 1;

                    document.getElementById('btninward').disabled = false;
                }

            }
            if (flagvalue == 'I') {
                var x = $scope.Inward.ProdSrNo;
                x.toString().length;
                if (x.toString().length > 10 || x.toString().length < 10) {
                    $scope.msg1 = 'Smart Card number should be 10 digits.';
                    $scope.Inward.ProdQty = '';
                    $scope.Inward.ProdSrTo = '';
                    document.getElementById('btninward').disabled = true;
                }
                else {
                    $scope.Inward.ProdSrNo = $scope.Inward.ProdSrNo;
                    $scope.msg1 = '';
                    //$scope.Inward.ProdQty = ($scope.Inward.ProdSrTo - $scope.Inward.ProdSrNo) + 1;

                    document.getElementById('btninward').disabled = false;
                }
            }
            if ($sessionStorage.company == 'P') {
                var x = $scope.Inward.ProdSrNo;
                x.toString().length;
                if (x.toString().length < 8 || x.toString().length > 16) {
                    $scope.msg1 = 'Invalid Smart Card number.';
                    $scope.Inward.ProdQty = '';
                    $scope.Inward.ProdSrTo = '';
                    document.getElementById('btninward').disabled = true;
                }
                else {
                    $scope.Inward.ProdSrNo = $scope.Inward.ProdSrNo;
                    $scope.msg1 = '';
                    // $scope.Inward.ProdQty = ($scope.Inward.ProdSrTo - $scope.Inward.ProdSrNo) + 1;

                    document.getElementById('btninward').disabled = false;
                }

            }









        }

    }
    $scope.Check = function (Inward) {
        $scope.Inward = Inward;
        if ($scope.prodlabel == 'Serial No. From') {

            if ($scope.Inward.ProdQty < 0) {
                $scope.Inward.ProdQty = '';
                SmartAlert.Errmsg('Quantity must be greater than 0');
            } else {
                $scope.Inward.ProdSrTo = (Number($scope.Inward.ProdSrNo) + Number($scope.Inward.ProdQty)) - 1;
            }

        }

    }

    $scope.SaveInwardDetails = function (valid, Inward, InwardDate) {
        if (valid == true) {
            $scope.Inward = Inward;
            if ($scope.Inward.ProdQty == '0') {
                SmartAlert.Errmsg('0 will not be accepted as a quantity.');
            }
            else {

                if ($sessionStorage.InwardCode == null) {
                    if ($scope.Inward.ProdSrTo <= $scope.Inward.ProdSrNo) {
                        SmartAlert.Errmsg('Serial No. To should be equal or greater than Serial No. From');

                    }
                    else if ($rootScope.SerType == 'F') {
                        if ($scope.Inward.ProdSrTo == null || $scope.Inward.ProdSrTo == undefined || $scope.Inward.ProdSrTo == '' || $scope.Inward.ProdSrNo == null || $scope.Inward.ProdSrNo == undefined || $scope.Inward.ProdSrNo == '')
                            SmartAlert.Errmsg('Serial No. From and Serial No. To are required');

                        else {
                            $scope.Inward = Inward;
                            if ($scope.Inward.ProdQty < 0) {
                                $scope.Inward.ProdQty = '';
                                SmartAlert.Errmsg('Quantity must be greater than 0');
                            }
                            else {
                                $scope.Inward.PUserCode = $sessionStorage.ucode;
                                $scope.Inward.IsActive = 'Y';
                                $scope.Inward.Flag = 'IN';
                                var json = angular.toJson($scope.Inward)
                                $scope.source_string = json;
                                var encrypted = CryptoJS.AES.encrypt(
                                $scope.source_string,
                                $rootScope.base64Key,
                                { iv: $rootScope.base64Key }
                                );
                                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                                $scope.getSavedValue();
                            }

                        }
                    }
                    else if ($rootScope.SerType == 'S') {
                        if ($scope.Inward.ProdSrNo == null || $scope.Inward.ProdSrNo == undefined || $scope.Inward.ProdSrNo == '')
                            SmartAlert.Errmsg('Serial No. is required');

                        else {
                            $scope.Inward = Inward;
                            $scope.Inward.PUserCode = $sessionStorage.ucode;
                            $scope.Inward.IsActive = 'Y';
                            $scope.Inward.Flag = 'IN';
                            var json = angular.toJson($scope.Inward)
                            $scope.source_string = json;
                            var encrypted = CryptoJS.AES.encrypt(
                            $scope.source_string,
                            $rootScope.base64Key,
                            { iv: $rootScope.base64Key }
                            );
                            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                            $scope.getSavedValue();
                        }
                    }
                    else if ($rootScope.SerType == 'N') {

                        $scope.Inward = Inward;
                        $scope.Inward.PUserCode = $sessionStorage.ucode;
                        $scope.Inward.IsActive = 'Y';
                        $scope.Inward.Flag = 'IN';
                        var json = angular.toJson($scope.Inward)
                        $scope.source_string = json;
                        var encrypted = CryptoJS.AES.encrypt(
                        $scope.source_string,
                        $rootScope.base64Key,
                        { iv: $rootScope.base64Key }
                        );
                        $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                        $scope.getSavedValue();

                    }

                }
                else {
                    $scope.Inward = Inward;
                    if ($scope.Inward.ProdSrTo < $scope.Inward.ProdSrNo) {
                        SmartAlert.Errmsg('Serial No. To should be equal or greater than Serial No. From');

                    }
                    else if ($sessionStorage.srtype == 'F') {
                        if ($scope.Inward.ProdSrTo == null || $scope.Inward.ProdSrTo == undefined || $scope.Inward.ProdSrTo == '' || $scope.Inward.ProdSrNo == null || $scope.Inward.ProdSrNo == undefined || $scope.Inward.ProdSrNo == '')
                            SmartAlert.Errmsg('Serial No. From and Serial No. To are required');

                        else {
                            if ($scope.Inward.ProdQty < 0) {
                                $scope.Inward.ProdQty = '';
                                SmartAlert.Errmsg('Quantity must be greater than 0');
                            }
                            else {
                                $scope.Inward.PUserCode = $sessionStorage.ucode;

                                $scope.Inward.Flag = 'UP';
                                $scope.Inward.InwardCode = $sessionStorage.InwardCode;
                                var json = angular.toJson($scope.Inward)
                                $scope.source_string = json;
                                var encrypted = CryptoJS.AES.encrypt(
                                $scope.source_string,
                                $rootScope.base64Key,
                                { iv: $rootScope.base64Key }
                                );
                                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                                $scope.getSavedValue();
                            }
                        }
                    }
                    else if ($sessionStorage.srtype == 'S') {
                        if ($scope.Inward.ProdSrNo == null || $scope.Inward.ProdSrNo == undefined || $scope.Inward.ProdSrNo == '')
                            SmartAlert.Errmsg('Serial No. is required');

                        else {
                            $scope.Inward.PUserCode = $sessionStorage.ucode;

                            $scope.Inward.Flag = 'UP';
                            $scope.Inward.InwardCode = $sessionStorage.InwardCode;
                            var json = angular.toJson($scope.Inward)
                            $scope.source_string = json;
                            var encrypted = CryptoJS.AES.encrypt(
                            $scope.source_string,
                            $rootScope.base64Key,
                            { iv: $rootScope.base64Key }
                            );
                            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                            $scope.getSavedValue();
                        }
                    }
                    else if ($sessionStorage.srtype == 'N') {

                        $scope.Inward.PUserCode = $sessionStorage.ucode;

                        $scope.Inward.Flag = 'UP';
                        $scope.Inward.InwardCode = $sessionStorage.InwardCode;
                        var json = angular.toJson($scope.Inward)
                        $scope.source_string = json;
                        var encrypted = CryptoJS.AES.encrypt(
                        $scope.source_string,
                        $rootScope.base64Key,
                        { iv: $rootScope.base64Key }
                        );
                        $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                        $scope.getSavedValue();

                    }

                }
            }

        }
    };
    $scope.getSavedValue = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'product/ManageInward',
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.inword_master_grid');
                    window.clearInterval(h);
                }, 3000);

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });

    };
});
appdash.controller('VerifyPaymentGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CE');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Verify Payment Details',
            },
            column: {
                style: 'font-size:15px;color:black'
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
                 { columnid: 'PayOrdRemark', title: 'Remark' },
                 { columnid: 'VerifyDate', title: 'Verify Date' },
                 { columnid: 'VerifyAmt', title: 'Verify Amount' },
                 { columnid: 'DiffAmt', title: 'Amount Difference' },
                 { columnid: 'OrdGrandTotal', title: 'Grand Total' },
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' },
                   { columnid: 'ordsumUpdatedBy', title: 'Last Update By' },
             { columnid: 'UpdateDt', title: 'Last Update Date' }

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
        $sessionStorage.ProdCode = null;
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
                      name: 'Verify', displayName: 'Verify', headerCellTemplate: '<div></div>',
                      cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.PaymentCode,row.entity.DistCode,row.entity.OrderNo,row.entity.DistName,row.entity.PayMode,row.entity.TranCharges)" data-title="Edit">Verify</button>',
                      width: "60"
                , enableFiltering: false,
                  },
                { name: 'PaymentCode', displayName: 'PaymentCode', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'DistCode', displayName: 'Distributor Code', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No.', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrgAmount', displayName: 'Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
           { name: 'PayMode', displayName: 'Pay Mode', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'TranCharges', displayName: 'Transaction Charges', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'IsPaymentVerify', displayName: 'Payment Verify', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

             { name: 'PayOrdRemark', displayName: 'Remark', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },

            //    { name: 'TranRefNo', displayName: 'Transaction Reference No.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            //{ name: 'TaxAmt', displayName: 'Tax Amount', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            // { name: 'GrandTotal', displayName: 'Total Amount', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ordsumUpdatedBy', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Verify Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (PaymentCode, DistCode, OrderNo, DistName, PayMode, TC) {
            $sessionStorage.PaymentCode = PaymentCode;
            $sessionStorage.DCode = DistCode;
            $sessionStorage.DName = DistName;
            $sessionStorage.OrderNo = OrderNo;
            $sessionStorage.PayMode = PayMode;
            $sessionStorage.TC = TC;
            $sessionStorage.mflag = 'VP';
            $state.go('app.dashboard.make_payment');
        }
        $scope.clear1 = function () {
            $sessionStorage.PaymentCode = null;
            $sessionStorage.mflag = 'VP';
            $state.go('app.dashboard.make_payment');
        }
        $scope.GetSearch = function (DistCode, FromDate, ToDate, OrderNo) {
            $scope.divshow = true;
            $scope.divhide = false;
            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            OrderNo = OrderNo == null || OrderNo == '' ? '' : OrderNo;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=' + OrderNo + '&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=&IsPaymentVerify=&OrderStatus=PE&OrderStage=AC')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;

                    $scope.mystyle.push($scope.mystyle1);
                })
        };
        $scope.GetSearch(null, null, null, null);

    }


});
appdash.controller('VerifyPaymentController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.gridshow = true;
    $scope.gridhide = false;
    $scope.Distcode = $sessionStorage.DCode;
    $scope.DistName = $sessionStorage.DName;
    $scope.TC = ($sessionStorage.TC).toFixed(2);
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    $scope.Paymenttype = function () {
        $http({
            method: 'GET',
            url: uriadmin + 'master/getpaymentmode',
            params:
                { PayMode: null, PayDesc: null, TrCharges: null, IsActive: 'Y' }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.allpaymode = response.data.Data;
            }
        });
    }
    $scope.Paymenttype();


    $scope.Bank = function () {
        $http.get(uriadmin + 'master/getbanks?BankCode&BankName&AccountNo&BranchName&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.allbank = response.data.Data;
            }
        });
    }
    $scope.Bank();

    $scope.Payment = function () {
        $http.get(uriadmin + 'master/getpaymentmode?PayMode&PayDesc&TrCharges&BankCode&IsActive=Y')
        .then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.allpay = response.data.Data;
            }
        })
    }
    $scope.Payment();

    $scope.GetSearchbycode = function () {
        if ($sessionStorage.DCode != null && $sessionStorage.OrderNo != null) {
            $http.get(uriadmin + 'Distributor/GetMyOrderDetails?DistCode=' + $sessionStorage.DCode + '&DistName=&FromOrdDate&ToOrdDate&IsActive&IsPaymentVerify=N&&OrderNo=' + $sessionStorage.OrderNo + '&OrderStatus=PE&OrderStage=AC')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.verify = response.data.Data[0];

                        $scope.verify.OrgAmount = $scope.verify.OrgAmount.toFixed(2);
                        $scope.verify.TranAmt = $scope.verify.TranAmt.toFixed(2);

                        // $scope.verify.PayGrandTotal = $scope.verify.PayGrandTotal.toFixed(2);
                        $scope.verify.DiscountAmt = $scope.verify.DiscountAmt.toFixed(2);
                        $scope.verify.TaxPer = $scope.verify.TaxPer.toFixed(2);

                        // $scope.verify.BankCode = parseInt($scope.verify.BankCode);
                        //$scope.verify.PayMode = $scope.verify.PayMode;
                        //$scope.verify.OrderCode = $scope.verify.OrderCode;
                        $rootScope.ocode = $scope.verify.OrderCode;
                        $scope.submit = 'Update';
                        //document.getElementById('oreder').disabled = true;
                        //document.getElementById('orederdt').disabled = true;
                        //document.getElementById('netpay').disabled = true;
                        document.getElementById('sel1').disabled = true;
                        document.getElementById('sel2').disabled = true;
                        document.getElementById('sel3').disabled = true;
                        document.getElementById('sel4').disabled = true;
                        document.getElementById('sel5').disabled = true;
                        document.getElementById('sel6').disabled = true;
                        document.getElementById('sel7').disabled = true;
                        document.getElementById('sel8').disabled = true;
                        document.getElementById('sel9').disabled = true;
                        document.getElementById('sel10').disabled = true;
                        // document.getElementById('sel11').disabled = true;
                        document.getElementById('sel12').disabled = true;
                        $scope.verify.TaxAmt = $scope.verify.TotalTaxRateAmt.toFixed(2);
                    }
                    else {
                        $scope.submit = 'Submit';
                        SmartAlert.Errmsg(response.data.Message);
                    }
                })
        }
        else {

        }
    };
    $scope.GetSearchbycode();

    $scope.UpdatePayment = function () {
        document.getElementById('sel1').disabled = false;
        document.getElementById('sel2').disabled = false;
        document.getElementById('sel3').disabled = false;
        document.getElementById('sel4').disabled = false;
        document.getElementById('sel9').disabled = false;
        document.getElementById('sel6').disabled = false;
    }

    $scope.VerifyPaymnet = function (valid, verify) {

        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.verify1 = {};
            if ($sessionStorage.DCode != null && $sessionStorage.OrderNo != null && $sessionStorage.PaymentCode != null) {

                $scope.verify1.PayMode = $scope.verify.PayMode;
                $scope.verify1.TrCharges = $scope.verify.TrCharges;
                $scope.verify1.TranRefNo = $scope.verify.TranRefNo;
                $scope.verify1.TranDate = $scope.verify.TranDate;
                $scope.verify1.BankCode = $scope.verify.BankCode;
                $scope.verify1.Remark = $scope.verify.Remark;
                $scope.verify1.UserCode = $sessionStorage.ucode;
                $scope.verify1.IsPaymentVerify = $scope.verify.IsPaymentVerify;
                $scope.verify1.PaymentCode = $sessionStorage.PaymentCode;
                $scope.verify1.Flag = 'VF';
                $scope.verify1.VerifyAmt = $scope.verify.TranAmt;
                $scope.verify1.OrderCode = $rootScope.ocode;
                $scope.verify1.TranAmt = $scope.verify.TranAmt;
                $scope.verify1.OrgAmount = $scope.verify.OrgAmount;
                if ($scope.verify1.TranAmt < $scope.verify1.OrgAmount) {
                    SmartAlert.Errmsg('Transfer amount should be greater than or equal to net payable');
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    var json = angular.toJson($scope.verify1)
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
                        url: uriadmin + 'Distributor/PostPaymentDetails',
                        data: {
                            Data: $scope.ciphertext
                        }
                        //data: $scope.verify1
                    }).then(function (response) {
                        if (response.data.StatusCode == 1) {

                            SmartAlert.Success('Payment Verified Successfully');
                            var h = setInterval(function () {
                                $state.go('app.dashboard.make_payment_grid');
                                window.clearInterval(h);
                            }, 3000);
                            //$scope.clear();
                            $scope.submit = 'Submit';
                            $sessionStorage.PayDesc = null;

                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    });


                }
            } else {
                //SmartAlert.Errmsg('Invalid Coupon Code');
            }

        }
    };
    $scope.isReject = false;
    $scope.rejectOrder = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        if ($scope.verify != null && $scope.verify.Remark != null && $scope.verify.Remark != "") {
            if ($scope.verify.OrderCode != null && $scope.verify.OrderNo != null) {
                $scope.rejectOrdr = {
                    DistCode: $scope.Distcode, OrderCode: $scope.verify.OrderCode, OrderNo: $scope.verify.OrderNo, CUserCode: $sessionStorage.ucode,
                    IsActive: "N", Remark: $scope.Remark
                };
                var json = angular.toJson($scope.rejectOrdr)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $http.post(uriadmin + 'Distributor/CancelOrderDetails', { Data: $scope.ciphertext }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        $state.go('app.dashboard.make_payment_grid');
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.isReject = false;
                })
            }
        }
        else {
            $scope.divshow = true;
            $scope.divhide = false;
            $scope.isReject = true;
        }
    }

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
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' }


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
        $scope.mystyle = [];
    }
    $sessionStorage.ProdCode = null;
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
            { name: 'ProdName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Quantity', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdRate', displayName: 'Rate', cellClass: 'grid-align', width: "100", cellFilter: 'number:2', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdAmt', displayName: 'Amount', cellClass: 'grid-align', cellFilter: 'number:2', width: "110", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'CouponCode', displayName: 'Coupon Code', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'DiscountAmt', displayName: 'Adjustment(+/-)', width: "130", cellFilter: 'number:2', cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'tax', displayName: 'Total Tax', cellClass: 'grid-align', cellFilter: 'number:2', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'TranCharges', displayName: 'Transport Charges', cellClass: 'grid-align', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
            { name: 'GrandTotal', displayName: 'Net Payable', cellClass: 'grid-align', cellFilter: 'number:2', cellClass: 'grid-align', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'SgstAmt', displayName: 'Sgst Amount', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'IgstAmt', displayName: 'Igst Amount', width: "200", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Product Details.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Product Details()", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    $scope.placeorderdetails = function () {
        $scope.divshow = true;
        //$scope.gridshow = false;
        $scope.gridhide = true;
        $scope.divhide = false;

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Distributor/GetPlaceOrderDetails?OrderNo=' + $sessionStorage.OrderNo + '&DistCode=' + $sessionStorage.DCode + '&ProdCode=&ProdName=&FromOrdDate=&ToOrdDate=&IsActive')
        .then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.gridOptions1.data = response.data.Data;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.Stylefun();
            $scope.mystyle.push($scope.mystyle1);
        })
    }
    $scope.placeorderdetails();

    $scope.CloseDiv = function () {
        $scope.gridshow = true;
        $scope.gridhide = false;
    }
});
appdash.controller('OutwordManagementGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CF');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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

        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Outward Details',
            },
            column: {
                style: 'font-size:15px;color:black'
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
                 { columnid: 'PayRemark', title: 'Remark' },
                 { columnid: 'IsPaymentVerify', title: 'Payment Verify' },
                 { columnid: 'VerifyDate', title: 'Verify Date' },
                 { columnid: 'VerifyAmt', title: 'Verify Amount' },
                 { columnid: 'DiffAmt', title: 'Amount Difference' },
                 { columnid: 'OrdGrandTotal', title: 'Grand Total' },
                   { columnid: 'PayGrandTotal', title: 'Pay Grand Total' },
                   { columnid: 'ordsumUpdatedBy', title: 'Last Update By' },
             { columnid: 'UpdateDt', title: 'Last Update Date' }


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
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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
                       name: 'Process', displayName: 'Process', headerCellTemplate: '<div></div>',
                       cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit">Process</button>',
                       width: "60"
                , enableFiltering: false,
                   },
                { name: 'DistCode', displayName: 'Distributor Code', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "320", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No.', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'OrgAmount', displayName: 'Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
                { name: 'OpfNo', displayName: 'OPF No', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'IsVerify', displayName: 'Is Verify', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OrderCode', displayName: 'Order Code', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'PayRemark', displayName: 'Remark', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'DelvDistAddress', displayName: 'Dist Address', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableHiding: false },
                   { name: 'ordsumUpdatedBy', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Outward Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (data) {

            $sessionStorage.DCode = data.DistCode;
            $sessionStorage.DName = data.DistName;
            $sessionStorage.OrderNo = data.OrderNo;
            $sessionStorage.DelvDistAddress = data.DelvDistAddress;
            $sessionStorage.ocode = data.OrderCode;
            $sessionStorage.mflag = 'OW';
            if (data.IsVerify == null || data.IsVerify == undefined || data.IsVerify == '') {
                data.IsVerify == '';
            }
            else {
                data.IsVerify == data.IsVerify;
            }
            $sessionStorage.IsVerify = data.IsVerify;
            $state.go('app.dashboard.outword_process');
        }
        $scope.clear1 = function () {
            $sessionStorage.PaymentCode = null;
            $sessionStorage.mflag = 'OW';
            $state.go('app.dashboard.outword_process');
        }
        $scope.GetSearch = function (DistCode, FromDate, ToDate, Verify) {
            $scope.divshow = true;
            $scope.divhide = false;
            if (Verify == 'Y') {
                Verify = 'Y';
                $scope.OrderStatus = '';
                $scope.OrderStage = ''
            }
            else {
                Verify = '';
                $scope.OrderStatus = 'IP';
                $scope.OrderStage = 'LO'
            }

            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive&IsPaymentVerify=Y&OrderStatus=' + $scope.OrderStatus + '&OrderStage=' + $scope.OrderStage + '&IsVerify=' + Verify)

                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'OW') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })
        };
        $scope.GetSearch(null, null, null, null);

    }


});
appdash.controller('OutwordManagementController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();

    $scope.divshow = true;
    $scope.divhide = false;
    $scope.inwardshow = false;
    $scope.gridshow = true;
    $scope.gridhide = false;
    $scope.showserialF = false;
    $scope.showserialT = false;
    $scope.showsrl = false;
    $scope.showqty = false;
    if ($sessionStorage.IsVerify == 'Y') {
        $scope.submit = 'Update';
        // $scope.gridOptions1.columnDefs[7].visible = false;
        // $scope.gridOptions1.column['remaining'].visible = false;
    }


    else
        $scope.submit = 'Submit';

    $scope.Distcode = $sessionStorage.DCode;
    $scope.DistName = $sessionStorage.DName;
    $scope.OrderNo = $sessionStorage.OrderNo;
    $scope.DelvDistAddr = $sessionStorage.DelvDistAddress;

    $scope.Stylefun = function () {
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Outword Management',
            },
            column: {
                style: 'font-size:15px;color:black'
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
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' }


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
        $scope.mystyle = [];
    }
    $sessionStorage.ProdCode = null;
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
             { name: 'ProdCode', displayName: 'Prod Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderQty', displayName: 'Ordered Qty', cellClass: 'grid-align', width: "110", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdAmt', displayName: 'Amount', cellFilter: 'number:2', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'SerType', displayName: 'SerType', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'OutQty', displayName: 'Outward', width: "90", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'grid-align' },
            { name: 'remaining', displayName: 'Remaining Qty', cellClass: 'grid-align', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'OrderCode', displayName: 'OrderCode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },

              {
                  name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                  cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.add(row.entity.ProdCode,row.entity.ProdName,row.entity.SerType,row.entity.OrderQty,row.entity.remaining)" data-title="Edit">&nbsp;<span class="glyphicon glyphicon-plus" ></span></button>',
                  width: "42"
                  , enableFiltering: false,
              }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Product Details.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Product Details()", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                alasql('SELECT * INTO XLS("Outword Management.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

    $scope.add = function (ProdCode, ProdName, SerType, ProdQty, remaining) {
        $sessionStorage.PCode = ProdCode;
        $sessionStorage.PName = ProdName;
        $sessionStorage.SerType = SerType;
        $sessionStorage.ProdQty = ProdQty;
        $sessionStorage.remaining = remaining;
        $sessionStorage.mflag = 'OW';

        if ($sessionStorage.SerType == 'F') {
            $scope.out = {};
            $scope.showserialF = true;
            $scope.showserialT = true;
            $scope.showqty = true;
            $scope.inwardshow = false;
            $scope.showsrl = false;
            // document.getElementById('qty').disabled = true;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetOutwardLastSeries?OrderCode=&DistCode=&ProdCode=' + $sessionStorage.PCode + '&ProdName= &FromDate=&ToDate=&IsAccept')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.get = response.data.Data;
                    $scope.lastseriasl = response.data.Data[0].ProdSrTo;
                    $scope.new = Number($scope.lastseriasl) + 1;
                    if ($scope.lastseriasl != 0 || $scope.lastseriasl != null || $scope.lastseriasl != '' || $scope.lastseriasl != undefined) {

                        var base65 = base64.encode(Name + ':' + Password);
                        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                        $http.get(uriadmin + 'product/GetInwardInfo?InwardCode&ProdCode=' + $sessionStorage.PCode + '&BatchCode&SeriesF=' + $scope.new + '&SeriesT=' + $scope.new + '&IsActive=Y&ProdQty=' + $sessionStorage.ProdQty)
                        .then(function (response) {

                            if (response.data.StatusCode == 1) {
                                // document.getElementById('srf').disabled = true;
                                $scope.out.ProdSrNo = Number($scope.lastseriasl) + 1;
                                //$scope.out.ProdQty = $sessionStorage.ProdQty;
                                $scope.out.ProdQty = $sessionStorage.remaining;
                                if ($sessionStorage.remaining == 0) {
                                    SmartAlert.Errmsg1('Insufficient quantity in inward');
                                    $scope.inwardshow = false;
                                    $scope.showserialF = false;
                                    $scope.showserialT = false;
                                    $scope.showqty = false;
                                }
                                else if ($scope.out.ProdQty > $sessionStorage.ProdQty) {
                                    SmartAlert.Errmsg('Invalid Quantity');
                                }
                                else {
                                    $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                                }
                                //document.getElementById('btnadd').disabled = false;

                                //else {
                                //    $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                                //    document.getElementById('btnadd').disabled = false;
                                //}

                            }
                            else {
                                $scope.out.ProdSrNo = '';
                                //do new code
                                var base65 = base64.encode(Name + ':' + Password);
                                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                                $http.get(uriadmin + 'product/GetInwardInfo?InwardCode&ProdCode=' + $sessionStorage.PCode + '&BatchCode&SeriesF=&SeriesT=&IsActive=Y&ProdQty')
                                .then(function (response) {
                                    if (response.data.StatusCode == 1) {
                                        // document.getElementById('srf').disabled = true;
                                        $scope.out.ProdSrNo = response.data.Data[0].ProdSrNo;
                                        // $scope.out.ProdQty = $sessionStorage.ProdQty;
                                        $scope.out.ProdQty = $sessionStorage.remaining;
                                        if ($sessionStorage.remaining == 0) {
                                            SmartAlert.Errmsg1('Insufficient quantity in inward');
                                            $scope.inwardshow = false;
                                            $scope.showserialF = false;
                                            $scope.showserialT = false;
                                            $scope.showqty = false;

                                        }

                                        else if ($scope.out.ProdQty > $sessionStorage.remaining) {
                                            SmartAlert.Errmsg('Invalid Quantity');
                                        }
                                        else {
                                            $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                                        }

                                    }
                                })
                                //document.getElementById('srf').disabled = false;
                                //document.getElementById('srt').disabled = true;
                            }
                        })
                    }

                    else {
                        $scope.out.ProdSrNo = '';
                        document.getElementById('srf').disabled = false;
                    }
                }
                else {
                    var base65 = base64.encode(Name + ':' + Password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                    $http.get(uriadmin + 'product/GetInwardInfo?InwardCode&ProdCode=' + $sessionStorage.PCode + '&BatchCode&SeriesF=&SeriesT=&IsActive=Y&ProdQty')
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            // document.getElementById('srf').disabled = true;
                            $scope.out.ProdSrNo = response.data.Data[0].ProdSrNo;
                            $scope.out.ProdQty = $sessionStorage.remaining;
                            if ($sessionStorage.remaining == 0) {
                                SmartAlert.Errmsg1('Insufficient quantity in inward');
                                $scope.inwardshow = false;
                                $scope.showserialF = false;
                                $scope.showserialT = false;
                                $scope.showqty = false;

                            }

                            else if ($scope.out.ProdQty > $sessionStorage.remaining) {
                                SmartAlert.Errmsg('Invalid Quantity');
                            }
                            else {
                                $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                            }



                        }
                    })
                }

            })



        }

        else if ($sessionStorage.SerType == 'S') {
            $scope.showserialF = false;
            $scope.showserialT = false;
            $scope.showqty = true;
            $scope.showsrl = true;
            document.getElementById('qty').disabled = false;
            $scope.out.ProdQty = '';
            $scope.out.ProdSrNo = '';
            $scope.out.ProdSrTo = '';
            $scope.out.ProdSr = '';

        }
        else if ($sessionStorage.SerType == 'N') {
            $scope.showserialF = false;
            $scope.showserialT = false;
            $scope.showqty = false;
            $scope.showsrl = false;
            $scope.inwardshow = true;
            $scope.inwardnm = $sessionStorage.PName;
            document.getElementById('qty').disabled = false;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'product/GetInwardStatus?ProdCode=' + $sessionStorage.PCode)
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    if ($sessionStorage.remaining == 0) {
                        SmartAlert.Errmsg1('Outward Done');
                        $scope.inwardremain = response.data.Data[0].Remaining;;
                    }
                    else if (response.data.Data[0].Remaining > 0) {
                        $scope.already = false;
                        $scope.inwardremain = response.data.Data[0].Remaining;
                        if (response.data.Data[0].Remaining >= $sessionStorage.ProdQty) {
                            if ($sessionStorage.row == null || $sessionStorage.row == undefined) {
                                var sc = {
                                    ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.PName, ProdQty: $sessionStorage.ProdQty, ProdSrNo: null, ProdSrTo: null, SerType: $sessionStorage.SerType
                                }

                                if ($scope.gridOptions2.data.length > 0) {
                                    for (var i = 0; i < $scope.gridOptions2.data.length; i++) {
                                        if ($scope.gridOptions2.data[i].ProdCode == $sessionStorage.PCode) {
                                            $scope.already = true;
                                        }
                                    }
                                    if ($scope.already == false) {
                                        $scope.gridOptions2.data.push(sc);
                                    }
                                    else {
                                        SmartAlert.Errmsg('Product already exists !');
                                    }
                                } else {
                                    $scope.gridOptions2.data.push(sc);
                                }


                                //$scope.gridOptions2.data.push(sc);

                            }
                            else {

                                var sc = {
                                    ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.P1Name, ProdQty: $sessionStorage.ProdQty, ProdSrNo: null, ProdSrTo: null, SerType: $sessionStorage.SerType1
                                }
                                var arr = $scope.gridOptions2.data;


                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].$$hashKey === $sessionStorage.row) {
                                        arr[i] = sc;
                                    }
                                }
                                $sessionStorage.P1Name = '';
                                $sessionStorage.SerType1 = '';

                            }
                        }
                        else {
                            SmartAlert.Errmsg1('Insufficient quantity in inward');
                        }
                    }
                    else {
                        SmartAlert.Errmsg1('Insufficient quantity in inward');
                        $scope.inwardremain = response.data.Data[0].Remaining;
                    }


                }
                else {
                    SmartAlert.Errmsg1('Insufficient quantity in inward');
                }

            })


            $sessionStorage.row = null;
            $scope.showserialF = false;
            $scope.showserialT = false;
            $scope.showqty = false;
            $scope.showsrl = false;

        }



    }
    $scope.addqty = function () {
        if ($sessionStorage.IsVerify == 'Y') {
            if ($scope.out.ProdQty > $sessionStorage.Pq) {
                SmartAlert.Errmsg1('Quantity should be equal to or less than the purchased quantity');
                document.getElementById('btnadd').disabled = true;
            }
            else {
                $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                document.getElementById('btnadd').disabled = false;
            }
        }
        else {
            if ($scope.out.ProdQty > $sessionStorage.ProdQty) {
                SmartAlert.Errmsg1('Quantity should be equal to or less than the purchased quantity');
                document.getElementById('btnadd').disabled = true;
            }
            else {
                $scope.out.ProdSrTo = (Number($scope.out.ProdSrNo) + Number($scope.out.ProdQty)) - 1;
                document.getElementById('btnadd').disabled = false;
            }
        }



        if ($scope.out.ProdQty == '' || $scope.out.ProdQty == undefined || $scope.out.ProdQty == null || $scope.out.ProdSrNo == '' || $scope.out.ProdSrNo == undefined || $scope.out.ProdSrNo == null) {
            $scope.out.ProdSrTo = '';
        }


    }
    $scope.placeorderdetails = function () {

        $scope.divshow = true;
        $scope.gridshow = false;
        $scope.gridhide = true;
        $scope.divhide = false;

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Distributor/GetSumOrderOutDetails?OrderNo=' + $sessionStorage.OrderNo + '&DistCode=' + $sessionStorage.DCode + '&ProdCode=&IsActive')
        .then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.gridOptions1.data = response.data.Data;
                if ($sessionStorage.IsVerify == 'Y') {

                    $scope.gridOptions1.columnDefs[7].visible = false;
                    //$scope.gridApi.gridOptions1.refresh();

                }
                else

                    $scope.gridOptions1.columnDefs[7].visible = true;
                // $scope.gridApi.gridOptions1.refresh();


            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.Stylefun();
            $scope.mystyle.push($scope.mystyle1);
        })
    }
    $scope.placeorderdetails();

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
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' }


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
        $scope.mystyle = [];
    }
    $sessionStorage.ProdCode = null;
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];
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
            { name: 'ProdCode', displayName: 'Prod Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Quantity', cellClass: 'grid-align', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrNo', displayName: 'Serial No. From', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrTo', displayName: 'Serial No. To', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'SerType', displayName: 'SerType', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'OutwardCode', displayName: 'OutwardCode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
    {
        name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
        cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.$$hashKey,row.entity.ProdCode,row.entity.ProdName,row.entity.ProdQty,row.entity.ProdSrNo,row.entity.ProdSrTo,row.entity.SerType,row.entity.OutwardCode)" data-title="Edit">&nbsp;<span class="glyphicon glyphicon-pencil" ></span></button>',
        width: "50"
              , enableFiltering: false,
        enableCellEdit: false,
        enableSorting: false,
        showSortMenu: false,
        enableColumnMenu: false,
    },
     {
         name: 'Remove', displayName: 'Remove', headerCellTemplate: '<div></div>',
         cellTemplate: '<button class="btn-danger btn-xs"  ng-click="grid.appScope.Remove(row)" data-title="Remove" >&nbsp;<span class="glyphicon glyphicon-remove"></span></button>',
         width: "50", enableFiltering: false, enableCellEdit: false, enableSorting: false, showSortMenu: false, enableColumnMenu: false,
     }

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Product Details.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Product Details()", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            },
            order: 110
        }]
    };

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions2.multiSelect = false;
    $scope.gridOptions2.enableRowSelection = true;


    $sessionStorage.row = null;
    $scope.AddRow = function (valid, out) {

        if (valid) {
            $scope.out = out;
            if ($scope.out == undefined) {
                SmartAlert.Errmsg('Please fill required fields');
            }

            else {
                if ($sessionStorage.IsVerify == 'Y') {
                    if ($sessionStorage.SerType == 'F' || $sessionStorage.SerType1 == 'F' || $scope.out.ProdSrNo != null || $scope.out.ProdSrTo != null) {
                        if (($scope.out.ProdSrNo == undefined || $scope.out.ProdSrNo == null || $scope.out.ProdSrNo == '') || ($scope.out.ProdQty == undefined || $scope.out.ProdQty == null || $scope.out.ProdQty == '') || ($scope.out.ProdSrTo == undefined || $scope.out.ProdSrTo == null || $scope.out.ProdSrTo == '')) {
                            SmartAlert.Errmsg('Please fill all required fields');
                            $scope.showserialF = true;
                            $scope.showserialT = true;
                            $scope.showqty = true;
                            $scope.showsrl = false;
                        }

                        else {
                            if ((parseFloat($scope.out.ProdSrTo)) < (parseFloat($scope.out.ProdSrNo))) {
                                SmartAlert.Errmsg1('SrNo TO should be Grater than SrNo From');

                                $scope.out.ProdQty = '';

                            }
                            else if ($scope.out.ProdQty < 0) {
                                SmartAlert.Errmsg1('Quantity must be greater than 0');
                                $scope.out.ProdQty = '';
                            }

                            else {
                                $scope.flagc = false;
                                var base65 = base64.encode(Name + ':' + Password);
                                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                                $http.get(uriadmin + 'product/GetInwardInfo?InwardCode&ProdCode=&BatchCode&SeriesF=' + $scope.out.ProdSrNo + '&SeriesT=' + $scope.out.ProdSrTo + '&IsActive=Y')
                                .then(function (response) {
                                    if (response.data.StatusCode == 1) {
                                        for (var i = 0; i < $scope.gridOptions2.data.length; i++) {
                                            if ($scope.gridOptions2.data[i]["ProdSrNo"] == $scope.out.ProdSrNo || $scope.gridOptions2.data[i]["ProdSrNo"] == $scope.out.ProdSrTo || $scope.gridOptions2.data[i]["ProdSrTo"] == $scope.out.ProdSrNo || $scope.gridOptions2.data[i]["ProdSrTo"] == $scope.out.ProdSrTo)
                                                $scope.flagc = true;
                                            //SmartAlert.Errmsg('SmartCard Series can not be same');
                                        }
                                        if ($scope.flagc == true) {
                                            SmartAlert.Errmsg('SmartCard Series can not be same');
                                        }
                                        else {
                                            if ($sessionStorage.row == null || $sessionStorage.row == undefined) {
                                                var sc = {
                                                    ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.PName, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSrNo, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType, OutwardCode: null
                                                }
                                                $scope.gridOptions2.data.push(sc);
                                                $scope.out.ProdSrNo = '';
                                                $scope.out.ProdSrTo = '';

                                            }
                                            else {

                                                if ($scope.out.ProdQty > $sessionStorage.Pq) {
                                                    SmartAlert.Errmsg('Invalid Quantity');
                                                }
                                                else {
                                                    var sc = {
                                                        ProdCode: $sessionStorage.P1Code, ProdName: $sessionStorage.P1Name, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSrNo, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType1, OutwardCode: $sessionStorage.outcode
                                                    }
                                                    var arr = $scope.gridOptions2.data;

                                                    for (var i = 0; i < arr.length; i++) {
                                                        if (arr[i].$$hashKey === $sessionStorage.row) {
                                                            arr[i] = sc;
                                                        }
                                                    }
                                                    $scope.out.ProdSrNo = '';
                                                    $scope.out.ProdSrTo = '';

                                                }

                                            }

                                        }


                                        $sessionStorage.row = null;
                                        $scope.showserialF = false;
                                        $scope.showserialT = false;
                                        $scope.showqty = false;
                                        $scope.showsrl = false;

                                    }
                                    else {
                                        SmartAlert.Errmsg('Invalid SmartCard Serial Numbers');
                                    }

                                })
                            }

                        }

                    }

                    else if ($sessionStorage.SerType == 'S' || $sessionStorage.SerType1 == 'S' || $scope.out.ProdSrNo != null) {


                    }

                }
                else {
                    if ($sessionStorage.SerType == 'F' || $sessionStorage.SerType1 == 'F') {
                        if (($scope.out.ProdSrNo == undefined || $scope.out.ProdSrNo == null || $scope.out.ProdSrNo == '') || ($scope.out.ProdQty == undefined || $scope.out.ProdQty == null || $scope.out.ProdQty == '') || ($scope.out.ProdSrTo == undefined || $scope.out.ProdSrTo == null || $scope.out.ProdSrTo == '')) {
                            SmartAlert.Errmsg('Please fill all required fields');
                            $scope.showserialF = true;
                            $scope.showserialT = true;
                            $scope.showqty = true;
                            $scope.showsrl = false;
                        }


                        else {
                            if ((parseFloat($scope.out.ProdSrTo)) < (parseFloat($scope.out.ProdSrNo))) {
                                SmartAlert.Errmsg1('SrNo TO should be Grater than SrNo From');

                                $scope.out.ProdQty = '';

                            }
                            else if ($scope.out.ProdQty < 0) {
                                SmartAlert.Errmsg1('Quantity must be greaterthan 0');

                                $scope.out.ProdQty = '';

                            }

                            else {
                                $scope.flagc = false;
                                $scope.f = false;
                                var base65 = base64.encode(Name + ':' + Password);
                                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                                $http.get(uriadmin + 'product/GetInwardInfo?InwardCode&ProdCode=&BatchCode&SeriesF=' + $scope.out.ProdSrNo + '&SeriesT=' + $scope.out.ProdSrTo + '&IsActive=Y')
                                .then(function (response) {
                                    if (response.data.StatusCode == 1) {
                                        for (var i = 0; i < $scope.gridOptions2.data.length; i++) {
                                            if ($scope.gridOptions2.data[i]["ProdSrNo"] == $scope.out.ProdSrNo || $scope.gridOptions2.data[i]["ProdSrNo"] == $scope.out.ProdSrTo || $scope.gridOptions2.data[i]["ProdSrTo"] == $scope.out.ProdSrNo || $scope.gridOptions2.data[i]["ProdSrTo"] == $scope.out.ProdSrTo)
                                                $scope.flagc = true;
                                            //SmartAlert.Errmsg('SmartCard Series can not be same');
                                        }
                                        if ($scope.flagc == true) {
                                            SmartAlert.Errmsg('SmartCard Series can not be same');
                                            $scope.out.ProdSrNo = '';
                                            $scope.out.ProdSrTo = '';
                                            $scope.showserialF = true;
                                            $scope.showserialT = true;
                                        }
                                        else {
                                            if ($scope.out.ProdQty > $sessionStorage.ProdQty) {
                                                SmartAlert.Errmsg('Invalid Quantity');
                                            }
                                            else {
                                                if ($sessionStorage.row == null || $sessionStorage.row == undefined) {

                                                    var sc = {
                                                        ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.PName, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSrNo, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType
                                                    }

                                                    if ($scope.gridOptions2.data.length > 0) {
                                                        for (var i = 0; i < $scope.gridOptions2.data.length; i++) {
                                                            if ($scope.gridOptions2.data[i].ProdCode == $sessionStorage.PCode) {
                                                                $scope.f = true;
                                                            }
                                                        }
                                                        if ($scope.f == false) {
                                                            $scope.gridOptions2.data.push(sc);
                                                        }
                                                        else {
                                                            SmartAlert.Errmsg('Product already exists !');
                                                        }
                                                    } else {
                                                        $scope.gridOptions2.data.push(sc);
                                                    }

                                                    $scope.out.ProdSrNo = '';
                                                    $scope.out.ProdSrTo = '';
                                                }
                                                else {

                                                    var sc = {
                                                        ProdCode: $sessionStorage.Prodcode, ProdName: $sessionStorage.P1Name, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSrNo, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType1
                                                    }
                                                    var arr = $scope.gridOptions2.data;

                                                    for (var i = 0; i < arr.length; i++) {
                                                        if (arr[i].$$hashKey === $sessionStorage.row) {
                                                            arr[i] = sc;
                                                        }
                                                    }

                                                    $scope.out.ProdSrNo = '';
                                                    $scope.out.ProdSrTo = '';
                                                }
                                            }
                                        }

                                        $sessionStorage.row = null;
                                        $scope.showserialF = false;
                                        $scope.showserialT = false;
                                        $scope.showqty = false;
                                        $scope.showsrl = false;

                                    }
                                    else {
                                        SmartAlert.Errmsg('Invalid SmartCard Serial Numbers');
                                    }

                                })
                            }

                        }

                    }

                    else if ($sessionStorage.SerType == 'S' || $sessionStorage.SerType1 == 'S') {
                        if (($scope.out.ProdQty == undefined || $scope.out.ProdQty == null || $scope.out.ProdSr == null || $scope.out.ProdSr == undefined)) {
                            SmartAlert.Errmsg('Please fill all required fields');
                            $scope.showserialF = false;
                            $scope.showserialT = false;
                            $scope.showqty = true;
                            $scope.showsrl = true;
                        }
                        else {

                            $scope.out.ProdSrTo = null;

                            if ($sessionStorage.row == null || $sessionStorage.row == undefined) {
                                var sc = {
                                    ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.PName, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSr, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType
                                }

                                $scope.gridOptions2.data.push(sc);
                                $scope.out.ProdSrNo = '';

                            }
                            else {

                                var sc = {
                                    ProdCode: $sessionStorage.PCode, ProdName: $sessionStorage.P1Name, ProdQty: $scope.out.ProdQty, ProdSrNo: $scope.out.ProdSr, ProdSrTo: $scope.out.ProdSrTo, SerType: $sessionStorage.SerType1
                                }
                                var arr = $scope.gridOptions2.data;

                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].$$hashKey === $sessionStorage.row) {
                                        arr[i] = sc;
                                    }
                                }
                                $sessionStorage.P1Name = '';
                                $sessionStorage.SerType1 = '';
                                $scope.out.ProdSrNo = '';


                            }

                            $sessionStorage.row = null;
                            $scope.showserialF = false;
                            $scope.showserialT = false;
                            $scope.showqty = false;
                            $scope.showsrl = false;
                        }
                    }
                }

            }

        }
        else {
            SmartAlert.Errmsg('Quantity should be valid');
        }

    }
    $scope.Total = function (out) {
        $scope.out = out;

        $scope.out.ProdQty = ($scope.out.ProdSrTo - $scope.out.ProdSrNo) + 1;
    }
    $scope.Total1 = function (out) {
        $scope.out = out;

        if ($scope.out.ProdSrTo < $scope.out.ProdSrNo) {
            $scope.out.ProdQty = ($scope.out.ProdSrTo - $scope.out.ProdSrNo) - 1;
            if ($scope.out.ProdQty < 0) {
                $scope.out.ProdQty = '';
                SmartAlert.Errmsg('Serial No. To must be greater than Serial No. From');
                document.getElementById('btnadd').disabled = true;
            }
            else if ($scope.out.ProdQty > $sessionStorage.ProdQty || $scope.out.ProdQty > $sessionStorage.Pq) {
                SmartAlert.Errmsg('Quantity must be greater than or equal to purchased quantity');
                document.getElementById('btnadd').disabled = true;
            }
        }

        else {
            $scope.out.ProdQty = ($scope.out.ProdSrTo - $scope.out.ProdSrNo) + 1;
            document.getElementById('btnadd').disabled = false;
        }


    }
    $scope.Getoutword = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'product/GetOutwardInfo?OrderCode=' + $sessionStorage.ocode + '&DistCode=&ProdCode=&ProdName= &FromDate=&ToDate=&IsAccept')
        .then(function (response) {
            if (response.data.StatusCode == 1) {

                $scope.gridOptions2.data = response.data.Data;

                $scope.gridOptions2.columnDefs[8].visible = false;

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.Stylefun();
            $scope.mystyle.push($scope.mystyle1);
        })
    }
    if ($sessionStorage.IsVerify == 'Y') {
        $scope.Getoutword();
    }

    $scope.select = function (h, pc, pn, pq, psf, pst, pt, outcode) {
        $sessionStorage.row = h;

        if (pt == 'F') {
            $scope.showserialF = true;
            $scope.showserialT = true;
            $scope.showqty = true;
            $scope.showsrl = false;
            $scope.out.ProdSrNo = psf;
            $scope.out.ProdSrTo = pst;
            $scope.out.ProdQty = pq;

            $sessionStorage.Prodcode = pc;
            $sessionStorage.P1Name = pn;
            $sessionStorage.SerType1 = pt;
            //document.getElementById('qty').disabled = true;

        }

        else if (pt == 'S') {

            $scope.showserialF = false;
            $scope.showserialT = false;
            $scope.showqty = true;
            $scope.showsrl = true;
            $scope.out.ProdSr = psf;
            $scope.out.ProdQty = pq;
            $sessionStorage.P1Name = pn;
            $sessionStorage.SerType1 = pt;
            document.getElementById('qty').disabled = false;

        }
        else if (pt == 'N') {
            SmartAlert.Errmsg('Quantity Can not be Changed');
        }
        else if (psf != null && pst != null) {
            $scope.out = {};
            $scope.showserialF = true;
            $scope.showserialT = true;
            $scope.showqty = true;
            $scope.showsrl = false;
            $scope.out.ProdSrNo = psf;
            $scope.out.ProdSrTo = pst;
            $scope.out.ProdQty = pq;
            $sessionStorage.P1Code = pc;
            $sessionStorage.P1Name = pn;
            $sessionStorage.Pq = pq;
            $sessionStorage.SerType1 = pt;
            $sessionStorage.outcode = outcode;
            //document.getElementById('qty').disabled = true;
        }
        else if (psf == null && pst == null) {
            SmartAlert.Errmsg('Quantity can not be changed');
        }


    }
    $scope.Remove = function (row) {


        var index = $scope.gridOptions2.data.indexOf(row.entity);
        $scope.gridOptions2.data.splice(index, 1);
        $sessionStorage.row = null;
        $scope.out.ProdSrNo = '';
        $scope.out.ProdSrTo = '';
        $scope.out.ProdQty = '';
        $scope.showserialF = false;
        $scope.showserialT = false;
        $scope.showsrl = false;
        $scope.showqty = false;
    }
    $scope.isReject = false;
    $scope.rejectOrder = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        if ($scope.Remark != null && $scope.Remark != "") {
            if ($sessionStorage.ocode != null && $sessionStorage.OrderNo != null) {
                $scope.rejectOrdr = {
                    DistCode: $scope.Distcode, OrderCode: $sessionStorage.ocode, OrderNo: $sessionStorage.OrderNo, CUserCode: $sessionStorage.ucode,
                    IsActive: "N", Remark: $scope.Remark
                };
                var json = angular.toJson($scope.rejectOrdr)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $http.post(uriadmin + 'Distributor/CancelOrderDetails', { Data: $scope.ciphertext }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        $state.go('app.dashboard.outword_management_grid');
                    }
                    else {
                        SmartAlert.Errmsg(verifyopfverifyopfresponse.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.isReject = false;
                })
            }
        }
        else {
            $scope.isReject = true;
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }
    $scope.SaveProduct = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        //insert/update
        var obj = $scope.gridOptions2.data;
        for (var i = 0; i < obj.length; i++) {
            //delete obj[i].$$hashKey;
            //delete obj[i].ProdName;
            delete obj[i].ProdType;
        }
        if (obj.length == 0) {
            SmartAlert.Errmsg('Please add atleast one record in grid');
            $scope.divshow = true;
            $scope.divhide = false;
        }
        else {
            if ($sessionStorage.IsVerify == 'Y') {
                $scope.flag = 'UP';
            }
            else {
                $scope.flag = 'IN';
            }
            $http({
                url: uriadmin + 'product/ManageOutward',
                method: 'POST',
                data: {
                    "Data": obj,
                    "PUserCode": $sessionStorage.ucode,
                    "OrderNo": $sessionStorage.OrderNo,
                    "OrderCode": $sessionStorage.ocode,
                    "IsActive": 'Y',
                    "DistCode": $sessionStorage.DCode,
                    "Remark": $scope.Remark,
                    "Flag": $scope.flag
                }
            }).then(function (response) {

                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);

                    var h = setInterval(function () {
                        $state.go('app.dashboard.outword_management_grid');
                        window.clearInterval(h);
                    }, 3000);
                    $scope.gridOptions2.data.length = 0;
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                    $sessionStorage.row = h;
                    $scope.divshow = true;
                    $scope.divhide = false;

                }

            })
        }
    };

});
appdash.controller('OPFGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CG');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Order Processing Form List',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                  { columnid: 'OrderNo', title: 'Order No.' },
                 { columnid: 'OrderDt', title: 'Order Date' },
                 { columnid: 'PayMode', title: 'PayModeDesc' },
                   { columnid: 'PayGrandTotal', title: 'Pay Grand Total' },
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
                  { columnid: 'OpfNo', title: 'Opf No' },
                  { columnid: 'OutRemark', title: 'Remark' },
                   { columnid: 'OPFUpdatedBy', title: 'Last Update By' },
             { columnid: 'OPFUpdateDt', title: 'Last Update Date' }


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

            },

        };
        $scope.mystyle = [];
        $sessionStorage.ProdCode = null;
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
                //{ name: 'PaymentCode', displayName: 'PaymentCode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                {
                    name: 'Verify', displayName: 'Verify', headerCellTemplate: '<div></div>',
                    cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.DistName,row.entity.OrderCode,row.entity.OrderNo,row.entity.OrderDt,row.entity.OpfNo,row.entity.OpfDate,row.entity.OpfAutoNo,row.entity.OrgAmount,row.entity.IsVerify,row.entity.TallyBillNo,row.entity.TallyBillDt,row.entity.TallyAmount,row.entity.DispOpfNo,row.entity.DocketNo)" data-title="Edit">Verify</button>',
                    width: "60"
                , enableFiltering: false,
                },
                { name: 'DistCode', displayName: 'Distributor Code', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'OpfAutoNo', displayName: 'OpfAutoNo', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OrderNo', displayName: 'Order No.', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'OrderCode', displayName: 'OrderCode', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OrderDt', displayName: 'Order Date', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OpfNo', displayName: 'Opf No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'OpfDate', displayName: 'OpfDate', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'OrgAmount', displayName: 'Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
                   { name: 'IsVerify', displayName: 'Is Verify', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'TallyBillNo', displayName: 'Tally Bill No', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'TallyAmount', displayName: 'Tally Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', visible: false },
                   { name: 'TallyBillDt', displayName: 'Tally Bill Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                     { name: 'InTransit', displayName: 'In Transit', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                      { name: 'DispOpfNo', displayName: 'DispOpfNo', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'DocketNo', displayName: 'Docket No', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'OutRemark', displayName: 'Remark', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'OPFUpdatedBy', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'OPFUpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Order Processing Form List.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (DistCode, DistName, OrderCode, OrderNo, OrderDt, OpfNo, OpfDate, OpfAutoNo, OrgAmount, IsVerify, TallyBillNo, TallyBillDt, TallyAmount, DispOpfNo, DocketNo) {
            $sessionStorage.OpfAutoNo = OpfAutoNo;
            $sessionStorage.DCode = DistCode;
            $sessionStorage.DName = DistName;
            $sessionStorage.OrderNo = OrderNo;
            $sessionStorage.OrderCode = OrderCode;
            $sessionStorage.OrderDt = OrderDt;
            $sessionStorage.OpfNo = OpfNo;
            $sessionStorage.OpfDate = OpfDate;
            $sessionStorage.OrgAmount = OrgAmount;
            $sessionStorage.IsVerify = IsVerify;
            $sessionStorage.TallyBillNo = TallyBillNo;
            $sessionStorage.TallyBillDt = TallyBillDt;
            $sessionStorage.TallyAmount = TallyAmount;
            if (IsVerify == 'Y') {
                $scope.submit = 'Update';
            }
            else {
                $scope.submit = 'Submit';
            }


            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetDispatchDetails?DispatchAutoNo=&OrderCode=' + $sessionStorage.OrderCode + '&OpfNo=' + $sessionStorage.OpfNo + '&DispatchDate=&InTransit=&FromDate=&ToDate')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Errmsg('Already Dispatched');
                    }
                    else {
                        $sessionStorage.isBacktoUpdateOPF = "No"
                        $state.go('app.dashboard.opf_manage');
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })
        }
        $scope.clear1 = function () {
            $sessionStorage.PaymentCode = null;
            $sessionStorage.mflag = 'VP';
            $state.go('app.dashboard.make_payment');
        }
        $scope.GetSearch = function (DistCode, FromDate, ToDate) {

            $scope.divshow = true;
            $scope.divhide = false;
            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetailsOD?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=Y&IsPaymentVerify&OrderStatus=IP&OrderStage=OP&IsVerify=N')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })
        };
        $scope.GetSearch(null, null, null);
    }
});
appdash.controller('ManageOPFController', function ($http, $scope, $filter, $timeout, uriadmin, $state, $rootScope, $sessionStorage, Upload, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    document.getElementById('td').onkeypress = function () { return false; }
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.showserial = false;
    $scope.gridshow = true;
    $scope.gridhide = false;
    $scope.showqty = false;

    $scope.Distcode = $sessionStorage.DCode;
    $scope.DistName = $sessionStorage.DName;
    $scope.OrderNo = $sessionStorage.OrderNo;
    $scope.OrderDt = $sessionStorage.OrderDt;
    $scope.OpfDate = $sessionStorage.OpfDate;
    $scope.OpfNo = $sessionStorage.OpfNo;
    $scope.IsVerify = $sessionStorage.IsVerify;
    $scope.TallyBillNo = $sessionStorage.TallyBillNo;
    $scope.TallyBillDt = $sessionStorage.TallyBillDt;
    $scope.InTransit = $sessionStorage.InTransit;
    $scope.TallyAmount = $sessionStorage.TallyAmount;

    $scope.isUpdateDisable = $sessionStorage.isBacktoUpdateOPF == "Yes" ? true : false;
    if ($scope.IsVerify == 'Y') {
        $scope.submit = 'Update';
    }
    else {
        $scope.submit = 'Submit';
    }

    $scope.verification = function () {
        $scope.opf = {};
        if ($scope.IsVerify == 'Y') {
            $scope.opf.TallyBillNo = $scope.TallyBillNo;
            $scope.opf.IsVerify = $scope.IsVerify;
            $scope.opf.TallyBillDt = $scope.TallyBillDt;
            $scope.opf.TallyAmount = $sessionStorage.TallyAmount != null ? ($sessionStorage.TallyAmount).toFixed(2) : 0;
        }
        else {
            $scope.opf.TallyBillNo = '';
            $scope.opf.TallyBillDt = '';
            $scope.opf.IsVerify = '';
            $scope.opf.TallyAmount = $sessionStorage.OrgAmount != null ? ($sessionStorage.OrgAmount).toFixed(2) : 0;
        }
    }
    $scope.verification();

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
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' }


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
        $scope.mystyle = [];
    }
    $sessionStorage.ProdCode = null;
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
            { name: 'ProdCode', displayName: 'Prod Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'ProdName', displayName: 'Product', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Quantity', cellClass: 'grid-align', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'ProdAmt', displayName: 'Amount', cellClass: 'grid-align', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Product Details.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Product Details()", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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


    $scope.requestorderdetails = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'Distributor/GetPlaceOrderDetails?OrderNo=' + $sessionStorage.OrderNo + '&DistCode=' + $sessionStorage.DCode + '&ProdCode=&ProdName=&FromOrdDate=&ToOrdDate=&IsActive')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.gridOptions1.data = response.data.Data;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);
            })
    }
    $scope.requestorderdetails();

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
                  { columnid: 'PayGrandTotal', title: 'Pay Grand Total' }


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
        $scope.mystyle = [];
    }
    $sessionStorage.ProdCode = null;
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.mystyle = [];
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

            { name: 'ProdName', displayName: 'Product', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdQty', displayName: 'Quantity', width: "80", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrNo', displayName: 'Sr.No. From', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdSrTo', displayName: 'Sr.No. To', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Product Details.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
        exporterPdfHeader: { text: "Product Details()", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                alasql('SELECT * INTO XLS("Payment Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
            },
            order: 110
        }]
    };

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }
    $scope.gridOptions2.multiSelect = false;
    $scope.gridOptions2.enableRowSelection = true;

    $scope.outwardorderdetails = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'product/GetOutwardInfo?OrderCode=' + $sessionStorage.OrderCode + '&DistCode=' + $sessionStorage.DCode + '&ProdCode=&ProdName=&FromOrdDate=&ToDate=&IsAccept&OpfNo=' + $scope.OpfNo)
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.gridOptions2.data = response.data.Data;
                    $sessionStorage.alldata = $scope.gridOptions2.data;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.Stylefun();
                $scope.mystyle.push($scope.mystyle1);
            })
    }
    $scope.outwardorderdetails();
    $scope.isReject = false;
    $scope.rejectOrder = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        if ($scope.opf != null && $scope.opf.Remark != null && $scope.opf.Remark != "") {
            if ($sessionStorage.OrderCode != null && $sessionStorage.OrderNo != null) {
                $scope.rejectOrdr = {
                    DistCode: $scope.Distcode, OrderCode: $sessionStorage.OrderCode, OrderNo: $sessionStorage.OrderNo,
                    CUserCode: $sessionStorage.ucode, IsActive: 'N', Remark: $scope.opf.Remark
                };
                var json = angular.toJson($scope.rejectOrdr)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $http.post(uriadmin + 'Distributor/CancelOrderDetails', { Data: $scope.ciphertext }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        $state.go('app.dashboard.opf_grid');
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $scope.isReject = false;
                })
            }
        }
        else {
            $scope.isReject = true;
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }

    $scope.UploadInvoice = function () {
        if ($scope.opf.InvoiceName != null) {
            if ($scope.opf.InvoiceName.name != undefined) {
                File[0] = $scope.opf.InvoiceName;
                var ext = File[0].name.substring(File[0].name.lastIndexOf('.')).toLowerCase();
                if (ext == '.pdf' || ext == '.docx' || ext == '.doc') {
                    var timeStamp = $filter('date')(new Date(), 'yyyyMMddhhmmsss');
                    if ($scope.opf.InvoiceName.name != null) {
                        name: Upload.rename($scope.opf.InvoiceName, 'INV' + $sessionStorage.OrderNo + ext);
                    }
                    var selectedFile = [1];
                    selectedFile[0] = $scope.opf.InvoiceName;
                    var s = [1];
                    s[0] = selectedFile[0];
                    Upload.upload({
                        url: uriadmin + 'product/postFileInfo',
                        name: s,
                        data: { file: selectedFile },
                    }).then(function (response) {
                        response.data.Data;
                    });
                } else {
                    SmartAlert.Errmsg("Please select pdf or docx file type");
                    $scope.opf.InvoiceName = null;
                    $scope.divshow = true;
                    $scope.divhide = false;
                    throw '';
                }
            }
        }
    }

    $scope.verifyopf = function (validfrm, OpfNo, opf) {
        $scope.isReject = false;
        valid = $sessionStorage.isBacktoUpdateOPF == "Yes" ? true : validfrm;
        if (valid) {
            if ($sessionStorage.alldata == null) {
                SmartAlert.Errmsg('No Record found in order details');
            }
            else {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.opf = opf;
                $scope.opf.OpfNo = OpfNo;
                $scope.opf.OpfAutoNo = $sessionStorage.OpfAutoNo;
                $scope.opf.OrderCode = $sessionStorage.OrderCode;
                $scope.opf.UserCode = $sessionStorage.ucode;
                $scope.opf.Flag = $sessionStorage.isBacktoUpdateOPF == "Yes" ? "VI" : "UP";
                $scope.UploadInvoice();
                $scope.opf.InvoiceFile = $scope.opf.InvoiceName != null ? $scope.opf.InvoiceName.ngfName : null;
                var json = angular.toJson($scope.opf)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                $http({
                    url: uriadmin + 'product/ManageOPF',
                    method: 'POST',
                    data: {
                        Data: $scope.ciphertext
                    }
                }).then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Success(response.data.Message);
                        $scope.gridOptions2.data.length = null;
                        var h = setInterval(function () {

                            if ($sessionStorage.isBacktoUpdateOPF == "Yes") {
                                $state.go('app.dashboard.update_opf');
                            }
                            else {
                                $state.go('app.dashboard.opf_grid');
                            }

                            //$state.go('app.dashboard.opf_grid');
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
        }
        $sessionStorage.DCode = null;
        $sessionStorage.DName = null;
        $sessionStorage.OrderNo = null;
        $sessionStorage.ocode = null;
        $sessionStorage.PCode = null;
        $sessionStorage.PName = null;
        $sessionStorage.ProdType = null;
    };

    $scope.IsBack = function () {
        if ($sessionStorage.isBacktoUpdateOPF == "Yes") {
            $state.go('app.dashboard.update_opf');
        }
        else {
            $state.go('app.dashboard.opf_grid');
        }
    }
});
appdash.controller('DispatchGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CH');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Dispatch Details',
            },
            column: {
                style: 'font-size:15px;color:black'
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
                  { columnid: 'OPFRemark', title: 'Remark' },
                { columnid: 'odrsumUpdatedBy', title: 'Last Update By' },
                { columnid: 'UpdateDt', title: 'Last Update Date' }

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
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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
                //{ name: 'PaymentCode', displayName: 'PaymentCode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                {
                    name: 'Dispatch', displayName: 'Dispatch', headerCellTemplate: '<div></div>',
                    cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.DistName,row.entity.OrderCode,row.entity.OrderNo,row.entity.OrderDt,row.entity.OpfNo,row.entity.OpfDate,row.entity.OpfAutoNo,row.entity.InTransit,row.entity.DispOpfNo,row.entity.DocketNo)" data-title="Edit">Dispatch</button>',
                    width: "80"
         , enableFiltering: false,
                },
                { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'OrgAmount', displayName: 'Amount', width: "100", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
              { name: 'InTransit', displayName: 'InTransit', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                 { name: 'DispOpfNo', displayName: 'DispOpfNo', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'DocketNo', displayName: 'Docket No', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                      { name: 'OpfNo', displayName: 'Opf No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                    { name: 'OPFRemark', displayName: 'Remark', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                    { name: 'odrsumUpdatedBy', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }


            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Dispatch Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (DistCode, DistName, OrderCode, OrderNo, OrderDt, OpfNo, OpfDate, OpfAutoNo, InTransit, DispOpfNo, DocketNo) {
            $sessionStorage.OpfAutoNo = OpfAutoNo;
            $sessionStorage.DCode = DistCode;
            $sessionStorage.DName = DistName;
            $sessionStorage.OrderNo = OrderNo;
            $sessionStorage.OrderCode = OrderCode;
            $sessionStorage.OrderDt = OrderDt;
            $sessionStorage.OpfNo = OpfNo;
            $sessionStorage.OpfDate = OpfDate;
            $sessionStorage.InTransit = InTransit;
            $sessionStorage.DispOpfNo = DispOpfNo;
            $sessionStorage.DocketNo = DocketNo;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetDispatchDetails?DispatchAutoNo=&OrderCode=&OpfNo=' + $sessionStorage.OpfNo + '&DispatchDate=&InTransit=&FromDate=&ToDate')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        SmartAlert.Errmsg('Already Dispatched');
                    }
                    else {

                        $state.go('app.dashboard.manage_dispatch');
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })

            //if (DispOpfNo != null && DocketNo != null)
            //{
            //    SmartAlert.Errmsg('Already Dispatched');
            //}
            //else {
            //    $state.go('app.dashboard.manage_dispatch');
            //}

        }

        $scope.GetSearch = function (DistCode, FromDate, ToDate) {

            $scope.divshow = true;
            $scope.divhide = false;
            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetailsOD?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=&IsPaymentVerify=Y&OrderStatus=&OrderStage=DI&IsOutward')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })
        };
        $scope.GetSearch(null, null, null);
    }
});
appdash.controller('DispatchManageController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
    document.getElementById('fd').onkeypress = function () { return false; }
    $scope.divshow = true;
    $scope.divhide = false;
    document.getElementById('id1').disabled = true;
    document.getElementById('id2').disabled = true;
    document.getElementById('id3').disabled = true;
    document.getElementById('id4').disabled = true;


    $scope.Distcode = $sessionStorage.DCode;
    $scope.DistName = $sessionStorage.DName;
    $scope.OrderNo = $sessionStorage.OrderNo;
    $scope.OrderDt = $sessionStorage.OrderDt;
    $scope.OpfDate = $sessionStorage.OpfDate;
    $scope.OpfNo = $sessionStorage.OpfNo;
    $scope.InTransit = $sessionStorage.InTransit;
    //if ($scope.InTransit == 'Y') {
    //    document.getElementById('btnsubmit').disabled = true;
    //    SmartAlert.SuccessGrid('Already Dispatched');
    //}
    //else {
    //    document.getElementById('btnsubmit').disabled = false;
    //}

    $scope.Gettransport = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'master/gettransport?TransportCode&TransportDesc&TransportPerson&IsActive=Y')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.transport = response.data.Data;
                }

            })
    }
    $scope.Gettransport();

    $scope.Gettransportmobno = function (dispatch) {
        $scope.dispatch = dispatch;
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http.get(uriadmin + 'master/gettransport?TransportCode=' + dispatch.TransportCode + '&TransportDesc&TransportPerson&IsActive=Y')
            .then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.trans = response.data.Data;
                    $scope.dispatch.MobileNo = $scope.trans[0].MobileNo;
                    document.getElementById('mobno').disabled = true;
                    //alert($rootScope.mobno);
                }

            })
    }
    $scope.isReject = false;
    $scope.rejectOrder = function () {
        $scope.divshow = false;
        $scope.divhide = true;
        if ($scope.dispatch != null && $scope.dispatch.Remark != null && $scope.dispatch.Remark != "") {
            if ($sessionStorage.OrderCode != null && $sessionStorage.OrderNo != null) {
                $scope.rejectOrdr = {
                    DistCode: $scope.Distcode, OrderCode: $sessionStorage.OrderCode, OrderNo: $sessionStorage.OrderNo,
                    CUserCode: $sessionStorage.ucode, IsActive: 'N', Remark: $scope.dispatch.Remark
                };
                var json = angular.toJson($scope.rejectOrdr)
                $scope.source_string = json;
                var encrypted = CryptoJS.AES.encrypt(
                $scope.source_string,
                $rootScope.base64Key,
                { iv: $rootScope.base64Key }
                );
                $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                $http.post(uriadmin + 'Distributor/CancelOrderDetails', { Data: $scope.ciphertext }).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.Success(response.data.Message);
                        $state.go('app.dashboard.dispatch_grid');
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.isReject = false;
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            }
        }
        else {
            $scope.isReject = true;
            $scope.divshow = true;
            $scope.divhide = false;
        }
    }

    // $scope.Gettransportmobno();
    $scope.Dispatch = function (valid, OpfNo, dispatch) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.dispatch = dispatch;
            $scope.dispatch.OpfNo = OpfNo;
            $scope.dispatch.InTransit = 'Y';
            $scope.dispatch.OrderCode = $sessionStorage.OrderCode;
            $scope.dispatch.PUserCode = $sessionStorage.ucode;
            $scope.dispatch.ReachDate = null;
            $scope.dispatch.Flag = 'IN';
            var json = angular.toJson($scope.dispatch)
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

            $http({
                url: uriadmin + 'Distributor/PostDispatchDetails',
                method: 'POST',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {

                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);

                    var h = setInterval(function () {
                        $state.go('app.dashboard.dispatch_grid');
                        window.clearInterval(h);
                    }, 3000);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.divshow = true;
                $scope.divhide = false;

            })


        }


        $sessionStorage.DCode = null;
        $sessionStorage.DName = null;
        $sessionStorage.OrderNo = null;
        $sessionStorage.ocode = null;
        $sessionStorage.PCode = null;
        $sessionStorage.PName = null;
        $sessionStorage.ProdType = null;
    };
});
appdash.controller('PendingOrderGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CI');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Pending Outward Details',
            },
            column: {
                style: 'font-size:15px;color:black'
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
                      { columnid: 'ordsumUpdatedBy', title: 'Last Update By' },
         { columnid: 'UpdateDt', title: 'Last Update Date' }
          //  {columnid:'Remark',title:'Remark'}

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
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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
                      name: 'Process', displayName: 'Process', headerCellTemplate: '<div></div>',
                      cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.DistName,row.entity.OrderNo,row.entity.OrderCode)" data-title="Edit">Process</button>',
                      width: "60"
                , enableFiltering: false,
                  },
                { name: 'DistCode', displayName: 'Distributor Code', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No', width: "220", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'OrgAmount', displayName: 'Amount', width: "200", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },

                { name: 'OrderCode', displayName: 'OrderCode', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                   { name: 'ordsumUpdatedBy', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
                               // { name: 'Remark', displayName: 'Remark', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Pending Outward Details.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (DistCode, DistName, OrderNo, ocode) {

            $sessionStorage.DCode = DistCode;
            $sessionStorage.DName = DistName;
            $sessionStorage.OrderNo = OrderNo;

            $sessionStorage.ocode = ocode;
            // $sessionStorage.mflag = 'OW';
            $scope.pending = {};
            $scope.pending.CUserCode = $sessionStorage.ucode;
            $scope.pending.OrderCode = $sessionStorage.ocode;
            $scope.pending.OrderNo = $sessionStorage.OrderNo;
            $state.go('app.dashboard.outword_process');

        }

        $scope.GetSearch = function (DistCode, FromDate, ToDate) {
            $scope.divshow = true;
            $scope.divhide = false;

            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetPendingOrderDetails?OrderNo=&DistCode=' + DistCode + '&OrderCode=&IsOutward=PP&IsActive=Y&FromDate=' + FromDate + '&ToDate=' + ToDate)

                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        // if ($sessionStorage.mflag == 'OW') {
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
        $scope.GetSearch(null, null, null);
    }
});
appdash.controller('CancellationRequestGridController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CJ');
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
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Cancellation Requests',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                 { columnid: 'DistCode', title: 'Distributor Code' },
                 { columnid: 'DistName', title: 'Distributor Name' },
                  { columnid: 'OrderNo', title: 'Order No.' },
                 { columnid: 'OrderDt', title: 'Order Date' },
                     { columnid: 'Remark', title: 'Remark' },
                            { columnid: 'UpdatedbyName', title: 'Last Update By' },
         { columnid: 'UpdateDt', title: 'Last Update Date' }
           //     { columnid: 'VerifyDate', title: 'Verify Date' },
           // { columnid: 'CreatedDt', title: 'Outword Date' },
           //   { columnid: 'UpdatedBy', title: 'Outword By' },
           //    { columnid: 'TallyBillNo', title: 'OPF Tally No.' },
           //     { columnid: 'OpfDate', title: 'OPF Date' },
           //    { columnid: 'Invceverifyby', title: 'Invoice By' },
           //  { columnid: 'TallyAmount', title: 'Amount' },
           //{ columnid: 'Dispatchby', title: 'Dispatch By' },
           // { columnid: 'DispatchDate', title: 'Dispatch Date' },
           //   { columnid: 'TransportDesc', title: 'Courier By' }

          //  {columnid:'Remark',title:'Remark'}

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
        $scope.mystyle = [];

        $sessionStorage.ProdCode = null;
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
                      name: 'Verify', displayName: 'Verify', headerCellTemplate: '<div></div>',
                      cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity)" data-title="Edit">Verify</button>',
                      width: "50", enableFiltering: false, enableHiding: false
                  },
                { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'OrderNo', displayName: 'Order No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderDt', displayName: 'Order Date', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'Remark', displayName: 'Remark', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                       { name: 'UpdatedbyName', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

           //  { name: 'PayVirifyby', displayName: 'Verify Payment By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //     { name: 'VerifyDate', displayName: 'Verify Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'CreatedDt', displayName: 'Outword Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //   { name: 'UpdatedBy', displayName: 'Outword By', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //    { name: 'TallyBillNo', displayName: 'OPF Tally No.', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //     { name: 'OpfDate', displayName: 'OPF Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, },
           //    { name: 'Invceverifyby', displayName: 'Invoice By', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //  { name: 'TallyAmount', displayName: 'Amount', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //{ name: 'Dispatchby', displayName: 'Dispatch By', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'DispatchDate', displayName: 'Dispatch Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           //   { name: 'TransportDesc', displayName: 'Courier By', width: "160", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Cancellation Requests.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (data) {
            $sessionStorage.orderData = data;
            $state.go('app.dashboard.cancellation_report');
        }

        $scope.GetSearch = function (DistCode, FromDate, ToDate) {
            $scope.divshow = false;
            $scope.divhide = true;

            DistCode = DistCode == null ? '' : DistCode;
            FromDate = FromDate == null ? '' : FromDate;
            ToDate = ToDate == null ? '' : ToDate;
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Distributor/GetMyOrderDetails?OrderNo=&DistCode=' + DistCode + '&DistName=&FromOrdDate=' + FromDate + '&ToOrdDate=' + ToDate + '&IsActive=C&IsPaymentVerify=&OrderStatus=&OrderStage=&IsVerify=&Region=&IsOutward=')
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        SmartAlert.Success(response.data.Message);
                    }
                    else {
                        $scope.gridOptions1.data = [];
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.mystyle.push($scope.mystyle1);
                    $scope.divshow = true;
                    $scope.divhide = false;
                });
        };
        $scope.GetSearch(null, null, null);
    }
});
appdash.controller('CancellationRequestController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, SweetAlert, Name, Password) {
    if ($sessionStorage.orderData != null) {
        $scope.orderDetails = $sessionStorage.orderData;
        $sessionStorage.orderData = null;
    }
    if ($scope.orderDetails == null) {
        $state.go('app.dashboard.cancellation_report_grid');
    }
    $scope.divshow = true;
    $scope.approveRequest = function (valid, btn) {
        if (valid) {
            $scope.divshow = false;
            SweetAlert.swal
                ({
                    title: '',
                    text: '<span style="color:black;">Are you sure to ' + btn + ' request ?</span>',
                    html: true,
                    animation: true,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#2877b6",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        var value = btn == "approve" ? "N" : "Y";
                        $scope.rejectOrdr = {
                            DistCode: $scope.orderDetails.DistCode, OrderCode: $scope.orderDetails.OrderCode, OrderNo: $scope.orderDetails.OrderNo,
                            CUserCode: $sessionStorage.ucode, IsActive: value, Remark: $scope.Remark
                        };
                        var json = angular.toJson($scope.rejectOrdr)
                        $scope.source_string = json;
                        var encrypted = CryptoJS.AES.encrypt(
                        $scope.source_string,
                        $rootScope.base64Key,
                        { iv: $rootScope.base64Key }
                        );
                        $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                        $http.post(uriadmin + 'Distributor/CancelOrderDetails', { Data: $scope.ciphertext }).then(function (response) {
                            if (response.data.StatusCode != 0) {
                                SmartAlert.Success(response.data.Message);
                                $state.go('app.dashboard.cancellation_report_grid');
                            }
                            else {
                                SmartAlert.Errmsg(response.data.Message);
                            }
                            $scope.divshow = true;
                        });
                    }
                    else {
                        $scope.divshow = true;
                    }

                })
        }
    }
});
appdash.controller('orderDocGridController', function ($http, $scope, $filter, $timeout, $state, imageurl, uripdf, $rootScope, userService, $sessionStorage, base64, SmartAlert, uriadmin, Name, Password, flag) {
    var flagvalue = flag;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }
    var valueof = userService.Success('GL');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {

    }
    else {
        $sessionStorage.currentstate = $state.current.name;
        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Order Documents Report',
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
                     // { columnid: 'VerifyDt', title: 'Verify Date' },
                     //{ columnid: 'TallyBillNo', title: 'Tally Bill No' },
                     //{ columnid: 'TallyBillDt', title: 'Tally Bill Date' },
                     // { columnid: 'TallyAmount', title: 'Tally Amount' },
                     //  { columnid: 'Updatedby', title: 'Last Updated By' },
                     // { columnid: 'UpdateDt', title: 'Last Update Date' },


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
            { name: 'DistCode', displayName: 'Distributor Code', width: "140", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'DistName', displayName: 'Distributor Name', width: "320", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderNo', displayName: 'Order No', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OrderCode', displayName: 'OrderCode', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            { name: 'OrderDt', displayName: 'Order Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OpfNo', displayName: 'OPF No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OpfDate', displayName: 'OPF Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'VerifyDt', displayName: 'Verify Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'TallyBillNo', displayName: 'Tally Bill No.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            //{ name: 'TallyBillDt', displayName: 'TallyBill Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
            //{ name: 'TallyAmount', displayName: 'Tally Amount', width: "150", cellTooltip: true, cellFilter: 'number:2', cellClass: 'grid-align', visible: false, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'Updatedby', displayName: 'Last Updated By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'UpdateDt', displayName: 'Last Update Date', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'OpfDownLoad', displayName: 'OpfDownLoad', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.opfDownload(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-download-alt"> </span>OPF Download</button>', width: "120", enableFiltering: false, },
            { name: 'InvcDownLoad', displayName: 'InvcDownLoad', headerCellTemplate: '<div></div>', cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.invcDownload(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-download-alt"> </span>Invoice Download</button>', width: "140", enableFiltering: false, },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Order Documents Report.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
        $scope.opfDownload = function (data) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                url: uriadmin + 'OPF/CallGenOPF?OrderNo=' + data.OrderNo + '&DistCode=' + data.DistCode + '&OrderCode=' + data.OrderCode + '&OPFNo=' + data.OpfNo
            }).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.FileName = response.data.Message;
                    window.open(uripdf + $scope.FileName, '_blank');
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }

            })
        };

        $scope.invcDownload = function (data) {
            if (data.InvoiceFile != null)
                window.open(imageurl + 'Invoice/' + data.InvoiceFile);
            else
                SmartAlert.Errmsg('File not available');
        };
    }

});
appdash.controller('OPFUpdateController', function ($http, $scope, $filter, userService, $window, $timeout, uriadmin, uriproductimage, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('CK');
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

        document.getElementById('fd').onkeypress = function () { return false; }
        document.getElementById('td').onkeypress = function () { return false; }
        //$scope.FromDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
        //$scope.ToDate = $filter('date')(new Date(), 'dd-MMM-yyyy');

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


        $scope.mystyle1 = {
            headers: true,
            style: 'font-size:19px;color:black',
            caption: {
                title: 'Update Invoice List',
            },
            column: {
                style: 'font-size:15px;color:black'
            },
            columns: [
                { columnid: 'DistCode', title: 'Distributor Code' },
                { columnid: 'DistName', title: 'Distributor Name' },
                 { columnid: 'OpfAutoNo', title: 'OpfAutoNo' },
                { columnid: 'OrderNo', title: 'Order No.' },
                  { columnid: 'OrderCode', title: 'OrderCode' },
                { columnid: 'OrderDt', title: 'Order Date' },
                { columnid: 'OpfNo', title: 'Opf No' },
                { columnid: 'OpfDate', title: 'OpfDate' },

                   { columnid: 'IsVerify', title: 'Is Verify' },
                { columnid: 'TallyBillNo', title: 'Tally Bill No' },
                  { columnid: 'TallyAmount', title: 'Tally Amount' },
                   { columnid: 'TallyBillDt', title: 'Tally Bill Date' },
                     { columnid: 'InTransit', title: 'In Transit' },
                      { columnid: 'DispOpfNo', title: 'DispOpfNo' },
                  { columnid: 'DocketNo', title: 'Docket No' },
                    { columnid: 'Remark', title: 'Remark' },

                    { columnid: 'Updatedby', title: 'Last Update By' },
                  { columnid: 'UpdateDt', title: 'Last Update Date' }
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

            },

        };
        $scope.mystyle = [];
        $sessionStorage.ProdCode = null;
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
                //{ name: 'PaymentCode', displayName: 'PaymentCode', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  {
                      name: 'Update', displayName: 'Update', headerCellTemplate: '<div></div>',
                      cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.DistCode,row.entity.DistName,row.entity.OrderCode,row.entity.OrderNo,row.entity.OrderDt,row.entity.OpfNo,row.entity.OpfDate,row.entity.OpfAutoNo,row.entity.OrgAmount,row.entity.IsVerify,row.entity.TallyBillNo,row.entity.TallyBillDt,row.entity.TallyAmount,row.entity.DispOpfNo,row.entity.DocketNo)" data-title="Edit">Update</button>',
                      width: "60"
                , enableFiltering: false,
                  },
                { name: 'DistCode', displayName: 'Distributor Code', width: "130", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'DistName', displayName: 'Distributor Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'OpfAutoNo', displayName: 'OpfAutoNo', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OrderNo', displayName: 'Order No.', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'OrderCode', displayName: 'OrderCode', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OrderDt', displayName: 'Order Date', width: "10", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'OpfNo', displayName: 'Opf No', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'OpfDate', displayName: 'OpfDate', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
               //   { name: 'OrgAmount', displayName: 'Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2' },
                   { name: 'IsVerify', displayName: 'Is Verify', width: "120", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                { name: 'TallyBillNo', displayName: 'Tally Bill No', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'TallyAmount', displayName: 'Tally Amount', width: "120", number: "2", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'number:2', visible: false },
                   { name: 'TallyBillDt', displayName: 'Tally Bill Date', width: "170", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                     { name: 'InTransit', displayName: 'In Transit', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                      { name: 'DispOpfNo', displayName: 'DispOpfNo', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                  { name: 'DocketNo', displayName: 'Docket No', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                                  { name: 'Remark', displayName: 'Remark', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                                    { name: 'Updatedby', displayName: 'Last Update By', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         { name: 'UpdateDt', displayName: 'Last Update Date', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            exporterMenuExcel: false,
            gridMenuCustomItems: [{
                title: 'Export all data as excel',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Update Invoice List.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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

        $scope.select = function (DistCode, DistName, OrderCode, OrderNo, OrderDt, OpfNo, OpfDate, OpfAutoNo, OrgAmount, IsVerify, TallyBillNo, TallyBillDt, TallyAmount, DispOpfNo, DocketNo) {
            $sessionStorage.OpfAutoNo = OpfAutoNo;
            $sessionStorage.DCode = DistCode;
            $sessionStorage.DName = DistName;
            $sessionStorage.OrderNo = OrderNo;
            $sessionStorage.OrderCode = OrderCode;
            $sessionStorage.OrderDt = OrderDt;
            $sessionStorage.OpfNo = OpfNo;
            $sessionStorage.OpfDate = OpfDate;
            $sessionStorage.OrgAmount = OrgAmount;
            $sessionStorage.IsVerify = IsVerify;
            $sessionStorage.TallyBillNo = TallyBillNo;
            $sessionStorage.TallyBillDt = TallyBillDt;
            $sessionStorage.TallyAmount = TallyAmount;
            if (IsVerify == 'Y') {
                $scope.submit = 'Update';
            }
            else {
                $scope.submit = 'Submit';
            }
            $sessionStorage.isBacktoUpdateOPF = "Yes";
            $state.go('app.dashboard.opf_manage');
        }


        $scope.clear1 = function () {
            $sessionStorage.PaymentCode = null;
            $sessionStorage.mflag = 'VP';
            $state.go('app.dashboard.make_payment');
        }
        $scope.GetSearch = function (DistCode, FromDate, ToDate) {

            $scope.divshow = true;
            $scope.divhide = false;
            DistCode = DistCode == null || DistCode == '' ? '' : DistCode;
            FromDate = FromDate == null || FromDate == '' ? '' : FromDate;
            ToDate = ToDate == null || ToDate == '' ? '' : ToDate;

            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'report/GetOPFDetails?OpfNo=&OrderNo=&DistCode=' + DistCode + '&IsVerify=&FromDate=' + FromDate + '&ToDate=' + ToDate)
                .then(function (response) {
                    if (response.data.StatusCode == 1) {
                        $scope.gridOptions1.data = response.data.Data;
                        if ($sessionStorage.mflag == 'VP') {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                    }
                    else {
                        $scope.gridOptions1.data.length = 0;
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $sessionStorage.mflag == null;
                    $scope.mystyle.push($scope.mystyle1);
                })
        };
        $scope.GetSearch(null, null, null);
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
app.directive("tdatepicker", function () {
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
app.directive("tallydatepicker", function () {
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
                yearRange: "2000:year",
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
});
app.directive("dispatchdatepicker", function () {
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
                minDate: 0 - 30,
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
});