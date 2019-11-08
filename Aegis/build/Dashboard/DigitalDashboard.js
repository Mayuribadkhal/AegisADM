appdash.controller('DigitalDashboardController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('AB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    var codeofuser = "";
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
        codeofuser = $sessionStorage.CUserCode;
    }
    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        codeofuser = $sessionStorage.PUserCode;
    }
    switch (flag) {
        case 'H':
            if (Hsfor == "PG") {
                $scope.Title1 = 'GoGas Card Sales Potential ';
                $scope.Title2 = 'GoGas Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'GoGas Consumers ';
                $scope.Title2 = 'GoGas Live Distributors Status';
                $scope.Title3 = 'Digital On-boarded Distributors';
            }
            $scope.c1Tiltle = "GoGas Refill Transaction Status";
            $scope.c3Tiltle = "Digital Payments against GoGas Deliveries";
            $scope.forhi = true;
            break;
        case 'I':
            if (Hsfor == "PG") {
                $scope.Title1 = 'XPRESSGAS Card Sales Potential ';
                $scope.Title2 = 'XPRESSGAS Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'XPRESSGAS Consumers ';
                $scope.Title2 = 'XPRESSGAS Live Distributors Status';
                $scope.Title3 = 'Digital On-boarded Distributors';
            }
            $scope.c1Tiltle = "XPRESSGAS Refill Transaction Status";
            $scope.c3Tiltle = "Digital Payments against XPRESSGAS Deliveries";
            $scope.forhi = false;
            break;
        case 'E':
            if (Hsfor == "PG") {
                $scope.Title1 = 'EZETAP Card Sales Potential ';
                $scope.Title2 = 'EZETAP Potential';
                $scope.Title3 = 'Digital Payments On-boarding Potential';
            }
            else {
                $scope.Title1 = 'EZETAP Consumers ';
                $scope.Title2 = 'EZETAP Live Distributors Status';
                $scope.Title3 = 'Digital On-boarded Distributors';
            }
            $scope.c1Tiltle = "EZETAP Refill Transaction Status";
            $scope.c3Tiltle = "Digital Payments against EZETAP Deliveries";
            $scope.forhi = false;
            break;
        default:
            break;
    }
    $scope.Getdivhide = false;
    $scope.hideMiddle = true;
    $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');// $sessionStorage.date;//
    //$sessionStorage.ZoneId = "";
    //$sessionStorage.RegionId = "";


    $scope.getData = function (date, ZoneId, RegionId, HsId) {
        $scope.c1 = false;
        $scope.c2 = false;
        $scope.l1 = false;
        $scope.c3 = false;
        $scope.c4 = false;
        $scope.c5 = false;
        $scope.c6 = false;
        $scope.Getdivhide = false;
        $scope.labels1 = [];
        $scope.data1 = [];
        $scope.labels2 = [];
        $scope.data2 = [];
        $scope.labels = [];
        $scope.data = [];
        $scope.labels3 = [];
        $scope.data3 = [];
        $scope.labels4 = [];
        $scope.data4 = [];
        $scope.labels5 = [];
        $scope.data5 = [];
        $scope.labels6 = [];
        $scope.data6 = [];
        // $sessionStorage.date = date;
        $sessionStorage.ZoneId = ZoneId = ZoneId == null ? "" : ZoneId;
        $sessionStorage.RegionId = RegionId = RegionId == null ? "" : RegionId;
        $sessionStorage.HsId = HsId = HsId == null ? "" : HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";

        $http.get(uriadmin + 'Dashboard/GetDigPaymentDashboardHistory?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsId=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.labels = [];
                $scope.trns = [];
                $scope.data = [];
                var line = response.data.Data;
                for (i = 0; i < response.data.Data.length; i++) {
                    $scope.labels.push(line[i].advdt);
                    $scope.trns.push(line[i].TotalDigitalPayment);
                }

                $scope.data[0] = $scope.trns;
                for (var i = 0; i < $scope.data[0].length; i++) {
                    if ($scope.data[0][i] != 0) {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1 && $scope.data.length != 0) {
                    $scope.l1 = true;
                }
                else {
                    $scope.l1 = false;
                    $scope.labels = [];
                    $scope.data = [];
                }
                $scope.datasetOverride = [{
                    datasetFill: false,
                    fill: false,
                    pointBackgroundColor: 'red',
                    pointHoverBackgroundColor: 'green',
                    pointRadius: 4,
                    pointHitRadius: 10
                }];
                $scope.options = {
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],

                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function (tooltipItem, data) {
                                return 'Count:' + data['datasets'][0]['data'][tooltipItem['index']];
                            }
                        },
                        backgroundColor: '#FFF',
                        titleFontSize: 12,
                        titleFontColor: '#282828',
                        bodyFontColor: '#000',
                        bodyFontSize: 12,
                        displayColors: true
                    }
                };
            }
            else {
                $scope.labels = [];
                $scope.data = [];
                $scope.l1 = false;
            }
        })

        $http.get(uriadmin + 'Dashboard/GetDigPaymentDashboardSummary?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (res) {
            if (res.data.StatusCode == 1) {
                if (res.data.Data.length != 0) {
                    $scope.gridOptions1.data = res.data.Data;
                    $scope.Total = $filter('filter')(res.data.Data, { Name: 'GRAND TOTAL' });
                    $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.Total[0].Area, width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                    angular.forEach($scope.gridOptions1.data, function (value, key) {
                        $scope.gridOptions1.data[key].merchantwiseTotal = $scope.gridOptions1.data[key].TotalDigitalPayment;
                    });
                    var AllPieData = $scope.Total[0];
                    $scope.toolsData = [{ "Count": AllPieData.Aadhar }, { "Count": AllPieData.UPI }, { "Count": AllPieData.NetBanking },
                        { "Count": AllPieData.BharatQR }, { "Count": AllPieData.CreditOrDebit },
                       { "Count": AllPieData.Wallet }];// { "Count": AllPieData.Mosambee }, 
                    if (AllPieData.TotalDigitalPayment != 0) {
                        $scope.labels2 = ["Aadhar", "UPI", "Net Banking", "BharatQR", "Debit/Credit Card", "eWallet"];
                        $scope.data2 = [((AllPieData.Aadhar / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                            ((AllPieData.UPI / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                             ((AllPieData.NetBanking / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                             ((AllPieData.BharatQR / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                             ((AllPieData.CreditOrDebit / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                             //((AllPieData.Mosambee / AllPieData.TotalDigitalPayment) * 100).toFixed(2),
                             ((AllPieData.Wallet / AllPieData.TotalDigitalPayment) * 100).toFixed(2)];


                        //for data4

                        $scope.labels4 = [];
                        $scope.bars4 = [];
                        $scope.data4 = [];
                        $scope.aadhar = [];
                        $scope.upi = [];
                        $scope.netbank = [];
                        $scope.bharatqr = [];
                        $scope.creditordebit = [];
                        //$scope.mosambeemode = [];
                        $scope.wallet = [];
                        //  res.data.Data.splice(res.data.Data.length - 1, 1);
                        var result = res.data.Data;
                        for (i = 0; i < res.data.Data.length; i++) {
                            if (res.data.Data[i].Name != 'GRAND TOTAL') {
                                $scope.labels4.push(result[i].Name);
                                $scope.bars4.push(result[i].TotalDigitalPayment);
                                $scope.aadhar.push(result[i].Aadhar);
                                $scope.upi.push(result[i].UPI);
                                $scope.netbank.push(result[i].NetBanking)
                                $scope.bharatqr.push(result[i].BharatQR)
                                $scope.creditordebit.push(result[i].CreditOrDebit)
                                //$scope.mosambeemode.push(result[i].MosambeeMode)
                                $scope.wallet.push(result[i].Wallet);
                            }
                        }
                        $scope.data4 = [$scope.aadhar, $scope.upi, $scope.netbank, $scope.bharatqr, $scope.creditordebit, $scope.wallet, $scope.bars4]


                    }
                    else {
                        $scope.data2 = [0, 0, 0, 0, 0, 0, 0];
                        $scope.labels2 = [];

                        $scope.data3 = [0, 0, 0, 0, 0];
                        $scope.labels3 = [];

                        $scope.data4 = [0];
                        $scope.labels4 = [];
                    }
                    $scope.SumofCount2 = AllPieData.TotalDigitalPayment;
                    var d = $scope.data2;
                    for (var i = 0; i < d.length; i++) {
                        if (d[i] != "0.00") {
                            $scope.flagE = 1;
                            break;
                        }
                        else {
                            $scope.flagE = 0;
                        }
                    }
                    if ($scope.flagE == 1) {
                        $scope.c2 = true;
                        $scope.c3 = true;
                        $scope.c4 = true;
                    }
                    else {
                        $scope.c2 = false;
                        $scope.c3 = false;
                        $scope.c4 = false;
                        $scope.labels2 = [];
                        $scope.labels3 = [];
                        $scope.labels4 = [];
                    }
                    $scope.options2 = {
                        responsive: true,
                        maintainAspectRatio: true,
                        animationEnabled: true,
                        animateRotate: true,
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontSize: 12,
                                boxWidth: 10
                            },

                        },
                        pieceLabel: {
                            render: 'percentage',
                            fontSize: 11,
                            fontColor: ['black']
                        },
                        tooltips: {
                            callbacks: {
                                title: function (tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                },
                                label: function (tooltipItem, data) {
                                    return ['Count:' + $scope.toolsData[tooltipItem['index']].Count, 'Percentage:' + data['datasets'][0]['data'][tooltipItem['index']] + '%'];
                                }
                            },
                            backgroundColor: '#FFF',
                            titleFontSize: 12,
                            titleFontColor: '#282828',
                            bodyFontColor: '#000',
                            bodyFontSize: 12,
                            displayColors: true
                        }
                    };

                    //for data4
                    $scope.colors = ['#d16902', '#af0a76', '#043575', '#12cbe8', '#0aa801', '#930202'];
                    $scope.series = ['Series A', 'Series B', 'Series A', 'Series B', 'Series A'];
                    $scope.datasetOverride2 = [

                    {
                        label: "Aadhar",
                        borderWidth: 2,
                        type: 'line',
                        fill: false
                    },
                   {
                       label: "UPI",
                       borderWidth: 2,
                       type: 'line',
                       fill: false
                   },
                   {
                       label: "NetBanking",
                       borderWidth: 2,
                       type: 'line',
                       fill: false
                   },
                   {
                       label: "BharatQR",
                       borderWidth: 2,
                       type: 'line',
                       fill: false
                   },
                   {
                       label: "Credit/Debit Card",
                       borderWidth: 2,
                       type: 'line',
                       fill: false
                   },
                   {
                       label: "eWallet",
                       borderWidth: 2,
                       type: 'line',
                       fill: false
                   },
                              {
                                  label: "Total",
                                  type: 'bar'
                              }
                    ];
                    $scope.options4 = {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 10
                            },
                        },
                        scales: {
                            xAxes: [{
                                barPercentage: 0.2,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 15,
                                    minRotation: 15
                                },
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }],
                        },
                    }
                }
                else {
                    $scope.labels1 = [];
                    $scope.data1 = [];
                    $scope.labels2 = [];
                    $scope.data2 = [];
                    $scope.c1 = false;
                    $scope.c2 = false;
                }
            }
            else {
                $scope.c2 = false;
                $scope.c3 = false;
                // $scope.l1 = false;
                $scope.labels1 = [];
                $scope.data2 = [];
                $scope.labels2 = [];
                $scope.data3 = [];
                $scope.labels3 = [];
                // $scope.data = [];
            }
            $scope.Getdivhide = true;
        });

        $http.get(uriadmin + 'Dashboard/GetDigPaymentDashboard?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (res) {
            if (res.data.StatusCode == 1) {
                if (res.data.Data.length != 0) {
                    var result = res.data.Data;
                    //for data3
                    $scope.labels3 = [];
                    $scope.bar3 = [];
                    $scope.data3 = [];
                    $scope.Aadhar1 = [];
                    $scope.UPI1 = [];
                    $scope.NetBanking1 = [];
                    $scope.BharatQR1 = [];
                    $scope.CreditOrDebit1 = [];
                    $scope.Wallet1 = [];
                    for (i = 0; i < res.data.Data.length; i++) {
                        $scope.labels3.push(result[i].mertype);
                        $scope.bar3.push(result[i].TotalDigitalPayment);
                        $scope.Aadhar1.push(result[i].Aadhar);
                        $scope.UPI1.push(result[i].UPI);
                        $scope.NetBanking1.push(result[i].NetBanking);
                        $scope.BharatQR1.push(result[i].BharatQR);
                        $scope.CreditOrDebit1.push(result[i].CreditOrDebit);
                        $scope.Wallet1.push(result[i].Wallet);
                    }
                    $scope.colors = ['#d16902', '#af0a76', '#920303', '#043575', '#12cbe8', '#0aa801', '#930202'];
                    $scope.data3 = [$scope.Aadhar1, $scope.UPI1, $scope.NetBanking1, $scope.BharatQR1, $scope.CreditOrDebit1, $scope.Wallet1, $scope.bar3]
                }
                else {
                    $scope.data3 = [0, 0, 0, 0, 0];
                    $scope.labels3 = [];
                }
                var d = $scope.data3;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != 0) {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1) {
                    $scope.c3 = true;
                }
                else {
                    $scope.c3 = false;
                    $scope.labels3 = [];
                }
                $scope.options3 = {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10
                        },
                    },
                    scales: {
                        xAxes: [{
                            barPercentage: 0.2,
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                };

                //for data3
                $scope.datasetOverride1 = [
                {
                    label: "Aadhar",
                    borderWidth: 2,
                    type: 'line',
                    fill: false
                },
               {
                   label: "UPI",
                   borderWidth: 2,
                   type: 'line',
                   fill: false
               },
               {
                   label: "NetBanking",
                   borderWidth: 2,
                   type: 'line',
                   fill: false
               },
               {
                   label: "BharatQR",
                   borderWidth: 2,
                   type: 'line',
                   fill: false
               },
               {
                   label: "Credit/Debit Card",
                   borderWidth: 2,
                   type: 'line',
                   fill: false
               },
               {
                   label: "Wallet",
                   borderWidth: 2,
                   type: 'line',
                   fill: false
               },
                 {
                     label: "Total",
                     type: 'bar',
                     barwidth: 2
                 }
                ];
            }
            else {
                $scope.labels3 = [];
                $scope.data3 = [];
                $scope.c3 = false;
            }
        })
    }
    //$scope.getData($scope.date1, $sessionStorage.ZoneId, $sessionStorage.RegionId,$sessionStorage.HsId);

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered grid-label-center';
        } else {
            return 'grid-label-center';
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
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{\'custom\':row.entity.Name==\'GRAND TOTAL\' }" ui-grid-cell></div>',
        columnDefs: [
               {
                   name: 'View', displayName: '', headerCellTemplate: '<div></div>',
                   cellTemplate: '<button class="btn-primary btn-xs"  ng-click="grid.appScope.select(row.entity)" ng-hide="row.entity.Name==\'GRAND TOTAL\'" data-title="Edit"><span>View</span></button>',
                   width: "50", enableFiltering: false, enableHiding: false
               },
                  { name: 'ZoneId', displayName: 'Zone Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                     { name: 'RegionId', displayName: 'Region Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                      { name: 'DistCode', displayName: 'Distributor Code', width: "80", cellTemplate: '<div>{{row.entity.DistCode==0?\'\':row.entity.DistCode}}</div>', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                {
                    name: 'Name', displayName: 'Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                },

                 { name: 'TotalDigitalPayment', displayName: 'Pay Mode wise Total', width: "120", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

                // { name: 'TotalDigitalPayment', displayName: 'Total Digital Payment', width: "115", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'Aadhar', displayName: 'Aadhar', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'BharatQR', displayName: 'BharatQR', width: "85", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                //{ name: 'Citrus', displayName: 'Citrus', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'CreditOrDebit', displayName: 'Credit/Debit Card', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  //{ name: 'Ezetap', displayName: 'Ezetap', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                //{ name: 'JusPay', displayName: 'JusPay', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               // { name: 'Mosambee', displayName: 'Mosambee', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'NetBanking', displayName: 'Net Banking', width: "80", type: 'number', cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                //{ name: 'Payphi', displayName: 'Payphi', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },               
                { name: 'UPI', displayName: 'UPI', width: "60", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Wallet', displayName: 'eWallet', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'merchantwiseTotal', displayName: 'Pay Gateway wise Total', width: "120", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 { name: 'Citrus', displayName: 'Citrus', width: "70", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                      { name: 'Ezetap', displayName: 'Ezetap', width: "70", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                       { name: 'JusPay', displayName: 'JusPay', width: "75", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                        { name: 'Mosambee', displayName: 'Mosambee', width: "95", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                         { name: 'Payphi', displayName: 'Payphi', width: "85", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                                                   { name: 'HPRefuel', displayName: 'Go Re-Fuel', width: "85", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterMenuPdf:false,
        exporterMenuCsv:false,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Live Digital Dashboard Details.xlsx',
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
            cols.push({ value: 'Live Digital Dashboard Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.core.getVisibleRows();
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;
    $scope.bread1 = [];
    switch ($sessionStorage.RoleLevel) {
        case 1:
            $scope.ZoneTitle = "Zone wise Details";
            break;
        case 2:
            $scope.ZoneTitle = "RO wise Details";
            break;
        case 3:
            $scope.ZoneTitle = "Sales Area wise Details";
            break;
        case 4:
            $scope.hideMiddle = true;
            $scope.gridOptions1.columnDefs[0].visible = false;
            $scope.gridOptions1.columnDefs[3].visible = true;
            $scope.ZoneTitle = "Distributor wise Detail";
            break;
        default:
            break;
    }
    $scope.dateChange = function () {
        //if ($sessionStorage.date != $scope.date1) {
        //    $scope.bread1 = [];

        switch ($sessionStorage.RoleLevel) {
            case 1:
                $scope.hideMiddle = false;
                $scope.gridOptions1.columnDefs[0].visible = true;
                $scope.gridOptions1.columnDefs[3].visible = false;
                break;
            case 2:
                $scope.hideMiddle = false;
                $scope.gridOptions1.columnDefs[0].visible = true;
                $scope.gridOptions1.columnDefs[3].visible = false;
                break;
            case 3:
                $scope.hideMiddle = false;
                $scope.gridOptions1.columnDefs[0].visible = true;
                $scope.gridOptions1.columnDefs[3].visible = false;
                break;
            default:
                $scope.hideMiddle = true;
                $scope.gridOptions1.columnDefs[0].visible = false;
                $scope.gridOptions1.columnDefs[3].visible = true;
                $scope.ZoneTitle = "Distributor wise Details";
                break;
        }
        //    $scope.getData($scope.date1);
        //}
        //else {
        ZoneId = $sessionStorage.ZoneId == null ? "" : $sessionStorage.ZoneId;
        RegionId = $sessionStorage.RegionId == null ? "" : $sessionStorage.RegionId;
        HsId = $sessionStorage.HsId == null ? "" : $sessionStorage.HsId;
        //if (RegionId != "" || $sessionStorage.RoleLevel >= 4) {
        //    $scope.hideMiddle = false;
        //    $scope.gridOptions1.columnDefs[0].visible = false;
        //    $scope.gridOptions1.columnDefs[3].visible = false;
        //}
        if (HsId != "" || $sessionStorage.RoleLevel >= 4) {
            $scope.hideMiddle = true;
            $scope.gridOptions1.columnDefs[0].visible = false;
            $scope.gridOptions1.columnDefs[3].visible = true;
        }
        $scope.bread1 = $sessionStorage.bread1 != null ? $sessionStorage.bread1 : [];
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        $scope.getData($scope.date1, ZoneId, RegionId, HsId);

        //     }
        $scope.ZoneTitle = $sessionStorage.ZoneId != "" || $sessionStorage.RoleLevel == 2 ? "RO wise Details" : $sessionStorage.RegionId != "" || ($sessionStorage.RoleLevel == 3 && $sessionStorage.HsId == "") ? "Sales Area wise Details" : $sessionStorage.HsId != "" || $sessionStorage.RoleLevel >= 4 ? "Distributor wise Details" : "Zone wise Details";
    }
    $scope.dateChange();
    $scope.bread1 = $scope.bread1 != null ? $scope.bread1 : [];


    $scope.select = function (id) {
        var date = $filter('date')(new Date(), 'dd-MMM-yyyy'); //$sessionStorage.date;//
        for (i = 0; id != null ; i++) {
            $scope.bread1.push(id);
            //if (id.RegionId != null) {
            //    $scope.gridOptions1.columnDefs[0].visible = true;
            //    $scope.gridOptions1.columnDefs[3].visible = false;
            //    $scope.hideMiddle = false;
            //}
            //break;
            if (id.HsId != null) {
                $scope.gridOptions1.columnDefs[0].visible = false;
                $scope.gridOptions1.columnDefs[3].visible = true;
                //$scope.gridOptions1.columnDefs[5].visible = false;
                //$scope.gridOptions1.columnDefs[6].visible = false;
                //$scope.gridOptions1.columnDefs[7].visible = false;
                //$scope.gridOptions1.columnDefs[8].visible = false;
                $scope.hideMiddle = true;
            }
            break;
        }
        $sessionStorage.bread1 = [];
        $sessionStorage.bread1 = $scope.bread1;
        $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.Total[0].Area, width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader })
        window.scrollTo(0, 0);
        $scope.ZoneTitle = id.ZoneId != null ? "RO wise Details" : id.RegionId != null ? "Sales Area wise Details" : id.HsId != null ? "Distributor wise Details" : "";;
        $sessionStorage.ZoneIdfrDet = id.ZoneId != null ? id.ZoneId : $sessionStorage.ZoneIdfrDet;
        $sessionStorage.RegionIdfrDet = id.RegionId != null ? id.RegionId : $sessionStorage.RegionIdfrDet;
        $sessionStorage.HsIdIdfrDet = id.HsId != null ? id.HsId : $sessionStorage.HsIdIdfrDet;
        $scope.getData(date, id.ZoneId, id.RegionId, id.HsId);
    }

    $scope.breadClick = function (Zone, Region, HsId) {
        var date = $filter('date')(new Date(), 'dd-MMM-yyyy');// $sessionStorage.date;//
        if (Zone == "Home") {
            Zone = "", Region = ""; HsId = ""; $scope.hideMiddle = false; codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode;
            if ($sessionStorage.RoleLevel < 4) {
                $scope.gridOptions1.columnDefs[0].visible = true;
                $scope.gridOptions1.columnDefs[3].visible = false;
            }
            else {
                $scope.gridOptions1.columnDefs[0].visible = false;
                $scope.gridOptions1.columnDefs[3].visible = true;
                $scope.hideMiddle = true;
            }
            $scope.bread1 = [];
            $sessionStorage.ZoneIdfrDet = null;
            $sessionStorage.RegionIdfrDet = null;
            $sessionStorage.HsIdIdfrDet = null;
        }
        if (Zone != null && $scope.bread1.length > 1) {
            $scope.hideMiddle = false;
            $scope.gridOptions1.columnDefs[0].visible = true;
            $scope.gridOptions1.columnDefs[3].visible = false;
            var index = $scope.bread1.length - 1
            $scope.bread1.splice($scope.bread1.length - index, $scope.bread1.length - 1);
            $sessionStorage.RegionIdfrDet = null;
            $sessionStorage.HsIdIdfrDet = null;
        }
        if (Region != null && $scope.bread1.length > 2) {
            $scope.hideMiddle = false;
            $scope.gridOptions1.columnDefs[0].visible = true;
            $scope.gridOptions1.columnDefs[3].visible = false;
            $scope.bread1.splice($scope.bread1.length - 1, 1);
            $sessionStorage.HsIdIdfrDet = null;
        }
        $scope.ZoneTitle = (Zone != "" && Zone != null) || ($sessionStorage.RoleLevel == 2 && Region == "" && HsId == "") ? "RO wise Details" : (Region != "" && Region != null) || ($sessionStorage.RoleLevel == 3 && HsId == "") ? "Sales Area wise Details" : (HsId != "" && HsId != null) || $sessionStorage.RoleLevel >= 4 ? "Distributor wise Details" : "Zone wise Details";
        $sessionStorage.bread1 = $scope.bread1;
        $scope.getData(date, Zone, Region, HsId);
    }

    $interval(function () {
        $scope.dateChange();
        window.clearInterval();
    }, Math.pow(300, 2) * 2);
});