appdash.run(function ($sessionStorage, uriadmin, $http, $filter, $rootScope) {
    //$rootScope.$on('$stateChangeSuccess', function (toState, toParams) {
    $rootScope.$on('$stateChangeSuccess', function (ev, toParams, from, fromParams) {
        switch (toParams.module) {
            case 'newdashboard':
                $sessionStorage.date;
                break;
            case 'mosambee':
                $sessionStorage.delbDistCode;
                break;
            default:
                $sessionStorage.date = $filter('date')(new Date().setDate(new Date().getDate() - 1), 'dd-MMM-yyyy');
                $sessionStorage.bread1 = [];
                $sessionStorage.ZoneIdfrDet = null;
                $sessionStorage.RegionIdfrDet = null;
                $sessionStorage.HsIdIdfrDet = null;
                $sessionStorage.delbDistCode = null;
                break;
        }
        switch ($sessionStorage.RoleLevel) {
            case 1:
                $rootScope.hidedropdown1 = true;
                $rootScope.hidedropdown2 = true;
                $rootScope.hidedropdown3 = true;
                break;
            case 2:
                $rootScope.hidedropdown1 = false;
                $rootScope.hidedropdown2 = true;
                $rootScope.hidedropdown3 = true;
                break;
            case 3:
                $rootScope.hidedropdown1 = false;
                $rootScope.hidedropdown2 = false;
                $rootScope.hidedropdown3 = true;
                break;
            default:
                $rootScope.hidedropdown1 = false;
                $rootScope.hidedropdown2 = false;
                $rootScope.hidedropdown3 = false;
                break;
        }
    })
});
appdash.directive("dashdatepicker", function ($filter) {
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

                yearRange: "1960:year",
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-M-yy",
                maxDate: $filter('date')(new Date().setDate(new Date().getDate() - 1), 'dd-MMM-yyyy'),
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
})
  // Formats number as currency
.filter('noFractionCurrency', function ($filter, $locale) {
    var currencyFilter = $filter('currency');
    var formats = $locale.NUMBER_FORMATS;

    return function (amount, currencySymbol) {
        amount = amount || '0.00';

        var value = currencyFilter(amount, currencySymbol);
        var sep = value.indexOf(formats.DECIMAL_SEP);

        if (amount >= 0) {
            return value.substring(0, sep);
        }
        return value.substring(0, sep) + ')';
    };
})
appdash.controller('NewAdminDashboardController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('AB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    };
    $scope.ClearDistSession();
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
        default:
            break;
    }
    $scope.Getdivhide = false;
    $scope.hideMiddle = false;
    $scope.date1 = $sessionStorage.date;
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
        $sessionStorage.date = date;
        $sessionStorage.ZoneId = ZoneId = ZoneId == null ? "" : ZoneId;
        $sessionStorage.RegionId = RegionId = RegionId == null ? "" : RegionId;
        $sessionStorage.HsId = HsId = HsId == null ? "" : HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";

        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummery?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                if (response.data.Data.Table.length != 0) {
                    var AllPieData = response.data.Data.Table[0];
                    $scope.AllPieData = response.data.Data.Table[0];
                    $scope.labels1 = ["Delivered ", "Un-Delivered "];
                    $scope.data1 = [AllPieData.TotalDeliveredCount, AllPieData.UndeliveredAttempts];
                    $scope.SumofCount = AllPieData.TotalDeliveredCount + AllPieData.UndeliveredAttempts;
                    //  $scope.colors1 = ['#ed7d31', '#5b9bd5'];
                    var d = $scope.data1;
                    for (var i = 0; i < d.length; i++) {
                        if (d[i] != 0) {
                            $scope.flagE = 1;
                            break;
                        }
                        else {
                            $scope.flagE = 0;
                            $scope.labels1 = [];
                        }
                    }
                    if ($scope.flagE == 1 && d.length != 0) {
                        $scope.c1 = true;
                    }
                    else {
                        $scope.c1 = false;
                        $scope.labels1 = [];
                    }
                    $scope.options1 = {
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
                            render: 'value',
                            fontSize: 11,
                            fontColor: ['black']
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
                    $scope.labels1 = [];
                    $scope.data1 = [];
                    //$scope.labels2 = [];
                    // $scope.data2 = [];
                    $scope.c1 = false;
                    //  $scope.c2 = false;
                }
                if (response.data.Data.Table1.length != 0) {
                    $scope.labels = [];
                    $scope.trns = [];
                    $scope.data = [];
                    var line = response.data.Data.Table1;
                    for (i = 0; i < response.data.Data.Table1.length; i++) {
                        $scope.labels.push(line[i].TransDate);
                        $scope.trns.push(line[i].TransactedDistCount);
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
            }
            else {
                $scope.c1 = false;
                $scope.c2 = false;
                $scope.l1 = false;
                $scope.labels1 = [];
                $scope.data1 = [];
                // $scope.labels2 = [];
                // $scope.data2 = [];
                $scope.labels = [];
                $scope.data = [];
            }
            $scope.Getdivhide = true;
        })

        $http.get(uriadmin + 'Dashboard/GetDigPaymentAdvDashSummary?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                if (response.data.Data.Table.length != 0) {

                    $scope.AllPieData = response.data.Data.Table[0];

                    $scope.toolsData = [{
                        "Count": $scope.AllPieData.AadharPayCount
                    }, { "Count": $scope.AllPieData.UPIPayCount }, { "Count": $scope.AllPieData.BharatQRPayCount },
                    { "Count": $scope.AllPieData.CreditOrDebitPayCount }, { "Count": $scope.AllPieData.NetBankingPayCount },
                    { "Count": $scope.AllPieData.WalletPayCount }]
                    if ($scope.AllPieData.DigitalPayCount != 0) {
                        $scope.labels2 = ["Aadhaar", "UPI", "BharatQR", "Debit/Credit Card", "Net Banking", "eWallet"];
                        $scope.data2 = [(($scope.AllPieData.AadharPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2),
                            (($scope.AllPieData.UPIPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2),
                             (($scope.AllPieData.BharatQRPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2),
                             (($scope.AllPieData.CreditOrDebitPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2),
                             (($scope.AllPieData.NetBankingPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2),
                             (($scope.AllPieData.WalletPayCount / $scope.AllPieData.DigitalPayCount) * 100).toFixed(2)];
                    }
                    else {
                        $scope.data2 = [0, 0, 0, 0, 0, 0];
                        $scope.labels2 = [];
                    }
                    $scope.SumofCount2 = ($scope.AllPieData.AadharPayCount + $scope.AllPieData.UPIPayCount + $scope.AllPieData.BharatQRPayCount + $scope.AllPieData.CreditOrDebitPayCount
                        + $scope.AllPieData.NetBankingPayCount + $scope.AllPieData.WalletPayCount);
                    //$scope.colors2 = ['#d16902', '#af0a76', '#043575', '#930202', '#12cbe8', '#0aa801'];;
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
                    }
                    else {
                        $scope.c2 = false;
                        $scope.labels2 = [];
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
                }
            }
            else {
                $scope.labels2 = [];
                $scope.data2 = [];
                $scope.c2 = false;
            }

        })

        //var zid, rid;
        //zid = HsId != null && HsId != "" ? '' : ZoneId;
        //rid = HsId != null && HsId != "" ? '' : RegionId;
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + date + '&ToDate=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (res) {
            if (res.data.StatusCode == 1) {
                $scope.c3 = true;
                $scope.c4 = true;
                $scope.c5 = true;
                $scope.res = res.data.Data;
                $scope.gridOptions1.data = res.data.Data;
                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    if ($scope.gridOptions1.data[i].TotalPayment != 0)
                        $scope.gridOptions1.data[i].NoofDigitalPay = parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalPayment)).toFixed(2));
                    else
                        $scope.gridOptions1.data[i].NoofDigitalPay = 0;
                    if ($scope.gridOptions1.data[i].TotalEzygasDeliveredCount != 0) {
                        $scope.gridOptions1.data[i].EzyDelDigiPay = parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalEzygasDeliveredCount)).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].EzyDelDigiPay = "0";
                    }
                    $scope.gridOptions1.data[i].ActualCdcmsDeliveryCount = $scope.gridOptions1.data[i].TotalDeliveryCount - $scope.gridOptions1.data[i].TotalEzygasDeliveredCount;
                    if ($scope.gridOptions1.data[i].TotalDeliveryCount != 0) {
                        //  $scope.gridOptions1.data[i].TotalDelDigiPay = parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalDeliveryCount)).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].TotalDelDigiPay = parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalDeliveryCount)).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].EZYGASDelivery = parseFloat((($scope.gridOptions1.data[i].TotalEzygasDeliveredCount * 100) / ($scope.gridOptions1.data[i].TotalDeliveryCount)).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].CDCMSDelivery = parseFloat((($scope.gridOptions1.data[i].CdcmsDeliveryCount * 100) / ($scope.gridOptions1.data[i].TotalDeliveryCount)).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].TotalDelDigiPay = "0";
                        $scope.gridOptions1.data[i].EZYGASDelivery = "0";
                        $scope.gridOptions1.data[i].CDCMSDelivery = "0";
                    }
                    if ($scope.gridOptions1.data[i].AllDistributorCount != 0)
                        $scope.gridOptions1.data[i].PerTransactedDistCount = parseFloat(((($scope.gridOptions1.data[i].TransactedDistCount * 100) / ($scope.gridOptions1.data[i].AllDistributorCount)).toFixed(2)) + '%');
                    else
                        $scope.gridOptions1.data[i].PerTransactedDistCount = "0";


                    $scope.gridOptions1.data[i].EZYUSAGETotalDeliveredCount = $scope.gridOptions1.data[i].TotalEzygasDeliveredCount;
                }
                var total = $filter('filter')(res.data.Data, { Name: 'Total' }); //$scope.res.splice($scope.res.indexOf($filter('filter')(res.data.Data, { Name: 'Total' })[0]), 1);
                $scope.Total = total;
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.Total[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                if ($sessionStorage.RoleCode == "ZOPG" && $scope.res.length != 0 && $scope.res[0].HsID != null) {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                var res = $scope.res;
                $scope.labels3 = [];
                $scope.data3 = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].Name != "GRAND TOTAL") {
                        $scope.labels3.push(res[i].Name);
                        if (res[i].TotalPayment != 0) {
                            $scope.data3.push((((res[i].DigitalPayCount) * 100) / ($scope.Total[0].DigitalPayCount)).toFixed(2));
                        }
                        else {
                            $scope.data3.push((0).toFixed(2));
                        }
                    }
                }
                var d = $scope.data3;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != "0.00") {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1 && d.length != 0) {
                    $scope.c3 = true;
                }
                else {
                    $scope.c3 = false;
                    $scope.labels3 = [];
                }
                $scope.colors3 = ['#a5a5a5', '#5b9bd5', '#ed7d31', '#45bfbd', '#4472c4', '#ffc000'];
                $scope.options3 = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animationEnabled: true,
                    animateRotate: true,
                    legend: {

                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 11,
                            boxWidth: 10
                        },
                    },
                    pieceLabel: {
                        render: 'percentage',
                        fontSize: 11,
                        fontColor: ['black'],
                        precision: 2
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function (tooltipItem, data) {
                                return ['Digital Payment Count:' + $scope.res[tooltipItem['index']].DigitalPayCount, 'Refill Delivered Count:' + $scope.res[tooltipItem['index']].TotalEzygasDeliveredCount, '% of Digital Payments:' + data['datasets'][0]['data'][tooltipItem['index']] + '%'];
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

                $scope.labels4 = [];
                $scope.data4 = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].Name != "GRAND TOTAL") {
                        $scope.labels4.push(res[i].Name);
                        if (Hsfor == "PG") {
                            if (res[i].TotalConsumerBase != 0)
                                $scope.data4.push((((res[i].TotalConsumerBase - res[i].TotalEzygasConsumerBase) * 100) / res[i].TotalConsumerBase).toFixed(2));
                            else {
                                $scope.data4.push(0);
                            }
                        }
                        else {
                            if (res[i].TotalConsumerBase != 0)
                                $scope.data4.push(((res[i].TotalEzygasConsumerBase * 100) / res[i].TotalConsumerBase).toFixed(2));
                            else {
                                $scope.data4.push(0);
                            }
                        }
                    }
                }
                var d = $scope.data4;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != "0.00") {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1 && d.length != 0) {
                    $scope.c4 = true;
                }
                else {
                    $scope.c4 = false;
                    $scope.labels4 = [];
                }
                $scope.colors4 = ['#a5a5a5', '#5b9bd5', '#ed7d31', '#45bfbd', '#4472c4', '#ffc000'];
                $scope.options4 = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animationEnabled: true,
                    animateRotate: true,
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 11,
                            boxWidth: 10
                        },
                    },
                    pieceLabel: {
                        render: 'percentage',
                        fontSize: 11,
                        fontColor: ['black'],
                        precision: 2
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function (tooltipItem, data) {
                                totalconsbase = (total[0].TotalConsumerBase - total[0].TotalEzygasConsumerBase);
                                return ['Count:' + totalconsbase, 'Percentage:' + data['datasets'][0]['data'][tooltipItem['index']] + '%'];
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

                $scope.labels5 = [];
                $scope.data5 = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].Name != "GRAND TOTAL") {
                        $scope.labels5.push(res[i].Name);
                        if (Hsfor == "PG") {
                            if (res[i].TotalDistributor != 0)
                                $scope.data5.push(((res[i].TotalDistributor - res[i].AllDistributorCount) * 100 / res[i].TotalDistributor).toFixed(2));
                            else {
                                $scope.data5.push((0).toFixed(2));
                            }
                        }
                        else {
                            if (res[i].TotalDistributor != 0)
                                $scope.data5.push(((res[i].AllDistributorCount * 100) / res[i].TotalDistributor).toFixed(2));
                            else {
                                $scope.data5.push((0).toFixed(2));
                            }
                        }
                    }
                }
                var d = $scope.data5;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != "0.00") {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1 && d.length != 0) {
                    $scope.c5 = true;
                }
                else {
                    $scope.c5 = false;
                    $scope.labels5 = [];
                }
                $scope.colors5 = ['#a5a5a5', '#5b9bd5', '#ed7d31', '#45bfbd', '#4472c4', '#ffc000'];
                $scope.options5 = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animationEnabled: true,
                    animateRotate: true,
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 11,
                            boxWidth: 10
                        },
                    },
                    pieceLabel: {
                        render: 'percentage',
                        fontSize: 11,
                        fontColor: ['black'],
                        precision: 2
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function (tooltipItem, data) {
                                var totaldelcount;
                                if (Hsfor == "PG") {
                                    totaldelcount = $scope.res[tooltipItem['index']].AllDistributorCount; //$scope.res[tooltipItem['index']].CdcmsDeliveryCount - $scope.res[tooltipItem['index']].TotalDeliveredCount;
                                }
                                else {
                                    totaldelcount = $scope.res[tooltipItem['index']].AllDistributorCount;//TotalDeliveredCount
                                }
                                return ['Count:' + totaldelcount, 'Percentage:' + data['datasets'][0]['data'][tooltipItem['index']] + '%'];
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
                $scope.labels3 = [];
                $scope.data3 = [];
                $scope.labels4 = [];
                $scope.data4 = [];
                $scope.labels5 = [];
                $scope.data5 = [];
                $scope.c3 = false;
                $scope.c4 = false;
                $scope.c5 = false;
            }
            $scope.Getdivhide = true;
        })

        $http.get(uriadmin + 'Dashboard/GetTtlDigPayDtls?Date=' + date + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.c6 = true;
                $scope.labels6 = [];
                $scope.data6 = [];
                $scope.response = response.data.Data.Table;
                var total = $scope.response.splice($scope.response.indexOf($filter('filter')(response.data.Data.Table, { Name: 'TOTAL' })[0]), 1);
                // $scope.labels6 = ['Citrus', 'Payphi', 'Mosambee', 'Ezetap', 'Jus Pay'];
                for (var i = 0; i < $scope.response.length; i++) {
                    if ($scope.response[i].Name != "GRAND TOTAL") {
                        $scope.labels6.push($scope.response[i].Name);
                        if (Hsfor == "PG") {
                            if ($scope.response[i].TotalDistributor != 0)
                                $scope.data6.push((($scope.response[i].TtlDigOnboarding * 100) / $scope.response[i].TotalCdcmsDistributor).toFixed(2));
                            else {
                                $scope.data6.push(0);
                            }
                        }
                        else {
                            if ($scope.response[i].TotalDistributor != 0)
                                $scope.data6.push((($scope.response[i].TtlDigOnboarding * 100) / $scope.response[i].TotalCdcmsDistributor).toFixed(2));
                            else {
                                $scope.data6.push(0);
                            }
                        }
                    }
                }
                var d = $scope.data6;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != "0.00") {
                        $scope.flagE = 1;
                        break;
                    }
                    else {
                        $scope.flagE = 0;
                    }
                }
                if ($scope.flagE == 1 && d.length != 0) {
                    $scope.c6 = true;
                }
                else {
                    $scope.c6 = false;
                    $scope.labels6 = [];
                }
                $scope.colors6 = ['#a5a5a5', '#5b9bd5', '#ed7d31', '#45bfbd', '#4472c4', '#ffc000'];
                $scope.options6 = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animationEnabled: true,
                    animateRotate: true,
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 11,
                            boxWidth: 10
                        },
                    },
                    pieceLabel: {
                        render: 'percentage',
                        fontSize: 11,
                        fontColor: ['black'],
                        precision: 2
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function (tooltipItem, data) {
                                return ['Count:' + $scope.response[tooltipItem['index']].TtlDigOnboarding, 'Percentage:' + data['datasets'][0]['data'][tooltipItem['index']] + '%'];
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
                $scope.c6 = false;
                $scope.data6 = [];
                $scope.labels6 = [];
            }
        });
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
        exporterMenuPdf: false,
        exporterMenuCsv: false,
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
                   name: 'View', displayName: 'View', headerCellTemplate: '<div></div>',
                   cellTemplate: '<button class="btn-primary btn-xs"  ng-click="grid.appScope.select(row.entity)" ng-hide="row.entity.Name==\'GRAND TOTAL\'" data-title="Edit"><span>View</span></button>',
                   width: "50", enableFiltering: false, enableHiding: false
               },
                  { name: 'ZoneId', displayName: 'Zone Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                     { name: 'RegionId', displayName: 'Region Id', width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                      { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTemplate: '<div>{{row.entity.DistCode==0?\'\':row.entity.DistCode}}</div>', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
                {
                    name: 'Name', displayName: 'Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
                },
                { name: 'TotalDistributor', displayName: 'Total Distributors', width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'AllDistributorCount', displayName: 'GoGas Distributors', width: "115", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                { name: 'TransactedDistCount', displayName: 'No. of Live Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'PerTransactedDistCount', displayName: '% of Live Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'TotalDeliveryCount', displayName: 'Total Delivered', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'CdcmsDeliveryCount', displayName: 'CDCMS Refill Delivered', width: "115", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                { name: 'TotalEzygasDeliveredCount', displayName: 'GoGas Refill Delivered', width: "120", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                { name: 'EZYGASDelivery', displayName: '% of GoGas Refill Delivered', width: "120", type: 'number', cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                 { name: 'CDCMSDelivery', displayName: '% of CDCMS Refill Delivered', width: "120", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                { name: 'DigitalPayCount', displayName: 'No. of Digital Payments', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'CashPayCount', displayName: 'No. of Cash Payments', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              //  { name: 'NoofDigitalPay', displayName: '% of No. of Digital Payments', width: "145", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,visible:false },
               // { name: 'EZYUSAGETotalDeliveredCount', displayName: 'EZYGAS Usage', width: "100", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                { name: 'EzyDelDigiPay', displayName: '% of GoGas Delivery Against Digital Payment', type: "number", cellClass: 'right-align', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                { name: 'TotalDelDigiPay', displayName: '% of Total Delivery Against Digital Payment', type: "number", cellClass: 'right-align', width: "180", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Main Dashboard Details.xlsx',
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
            cols.push({ value: 'Main Dashboard Details', metadata: { style: formatterId.id } });
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
        default:
            $scope.hideMiddle = true;
            $scope.gridOptions1.columnDefs[0].visible = false;
            $scope.gridOptions1.columnDefs[3].visible = true;
            $scope.ZoneTitle = "Distributor wise Details";
            break;
    }
    $scope.dateChange = function () {
        if ($sessionStorage.date != $scope.date1) {
            $scope.bread1 = [];

            switch ($sessionStorage.RoleLevel) {
                case 1:
                    $scope.hideMiddle = false;
                    $scope.gridOptions1.columnDefs[0].visible = true;
                    $scope.gridOptions1.columnDefs[5].visible = true;
                    $scope.gridOptions1.columnDefs[6].visible = true;
                    $scope.gridOptions1.columnDefs[7].visible = true;
                    $scope.gridOptions1.columnDefs[8].visible = true;
                    break;
                case 2:
                    $scope.hideMiddle = false;
                    $scope.gridOptions1.columnDefs[0].visible = true;
                    $scope.gridOptions1.columnDefs[5].visible = true;
                    $scope.gridOptions1.columnDefs[6].visible = true;
                    $scope.gridOptions1.columnDefs[7].visible = true;
                    $scope.gridOptions1.columnDefs[8].visible = true;
                    break;
                case 3:
                    $scope.hideMiddle = false;
                    $scope.gridOptions1.columnDefs[0].visible = true;
                    $scope.gridOptions1.columnDefs[3].visible = false;
                    $scope.gridOptions1.columnDefs[5].visible = true;
                    $scope.gridOptions1.columnDefs[6].visible = true;
                    $scope.gridOptions1.columnDefs[7].visible = true;
                    $scope.gridOptions1.columnDefs[8].visible = true;
                    break;
                default:
                    $scope.hideMiddle = true;
                    $scope.gridOptions1.columnDefs[0].visible = false;
                    $scope.gridOptions1.columnDefs[3].visible = true;
                    $scope.ZoneTitle = "Distributor wise Details";
                    break;
            }
            $scope.getData($scope.date1);
        }
        else {
            ZoneId = $sessionStorage.ZoneId == null ? "" : $sessionStorage.ZoneId;
            RegionId = $sessionStorage.RegionId == null ? "" : $sessionStorage.RegionId;
            HsId = $sessionStorage.HsId == null ? "" : $sessionStorage.HsId;
            if (HsId != "" || $sessionStorage.RoleLevel >= 4) {
                $scope.hideMiddle = true;
                $scope.gridOptions1.columnDefs[0].visible = false;
                $scope.gridOptions1.columnDefs[3].visible = true;
            }
            $scope.bread1 = $sessionStorage.bread1 != null ? $sessionStorage.bread1 : [];
            codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
            $scope.getData($scope.date1, ZoneId, RegionId, HsId);

        }
        $scope.ZoneTitle = $sessionStorage.ZoneId != "" || $sessionStorage.RoleLevel == 2 ? "RO wise Details" : $sessionStorage.RegionId != "" || ($sessionStorage.RoleLevel == 3 && $sessionStorage.HsId == "") ? "Sales Area wise Details" : $sessionStorage.HsId != "" || $sessionStorage.RoleLevel >= 4 ? "Distributor wise Details" : "Zone wise Details";
    }
    $scope.dateChange();
    $scope.bread1 = $scope.bread1 != null ? $scope.bread1 : [];

    $scope.select = function (id) {
        var date = $sessionStorage.date;
        for (i = 0; id != null ; i++) {
            $scope.bread1.push(id);
            if (id.HsId != null) {
                $scope.gridOptions1.columnDefs[0].visible = false;
                $scope.gridOptions1.columnDefs[3].visible = true;
                $scope.gridOptions1.columnDefs[5].visible = false;
                $scope.gridOptions1.columnDefs[6].visible = false;
                $scope.gridOptions1.columnDefs[7].visible = false;
                $scope.gridOptions1.columnDefs[8].visible = false;
                $scope.hideMiddle = true;
            }
            break;
        }
        $sessionStorage.bread1 = [];
        $sessionStorage.bread1 = $scope.bread1;
        $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.Total[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader })
        window.scrollTo(0, 0);
        $scope.ZoneTitle = id.ZoneId != null ? "RO wise Details" : id.RegionId != null ? "Sales Area wise Details" : id.HsId != null ? "Distributor wise Details" : "";
        $sessionStorage.ZoneIdfrDet = id.ZoneId != null ? id.ZoneId : $sessionStorage.ZoneIdfrDet;
        $sessionStorage.RegionIdfrDet = id.RegionId != null ? id.RegionId : $sessionStorage.RegionIdfrDet;
        $sessionStorage.HsIdIdfrDet = id.HsId != null ? id.HsId : $sessionStorage.HsIdIdfrDet;
        $scope.getData(date, id.ZoneId, id.RegionId, id.HsId)
    }

    $scope.breadClick = function (Zone, Region, HsId) {
        var date = $sessionStorage.date;
        if (Zone == "Home") {
            Zone = "", Region = ""; HsId = ""; $scope.hideMiddle = false; codeofuser = $sessionStorage.PUserCode != null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode;
            if ($sessionStorage.RoleLevel < 4) {
                $scope.gridOptions1.columnDefs[0].visible = true;
                $scope.gridOptions1.columnDefs[3].visible = false;
                $scope.gridOptions1.columnDefs[5].visible = true;
                $scope.gridOptions1.columnDefs[6].visible = true;
                $scope.gridOptions1.columnDefs[7].visible = true;
                $scope.gridOptions1.columnDefs[8].visible = true;
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
            $scope.gridOptions1.columnDefs[5].visible = true;
            $scope.gridOptions1.columnDefs[6].visible = true;
            $scope.gridOptions1.columnDefs[7].visible = true;
            $scope.gridOptions1.columnDefs[8].visible = true;
            var index = $scope.bread1.length - 1
            $scope.bread1.splice($scope.bread1.length - index, $scope.bread1.length - 1);
            $sessionStorage.RegionIdfrDet = null;
            $sessionStorage.HsIdIdfrDet = null;
        }
        if (Region != null && $scope.bread1.length > 2) {
            $scope.hideMiddle = false;
            $scope.gridOptions1.columnDefs[0].visible = true;
            $scope.gridOptions1.columnDefs[3].visible = false;
            $scope.gridOptions1.columnDefs[5].visible = true;
            $scope.gridOptions1.columnDefs[6].visible = true;
            $scope.gridOptions1.columnDefs[7].visible = true;
            $scope.gridOptions1.columnDefs[8].visible = true;
            $scope.bread1.splice($scope.bread1.length - 1, 1);
            $sessionStorage.HsIdIdfrDet = null;
        }
        $scope.ZoneTitle = (Zone != "" && Zone != null) || ($sessionStorage.RoleLevel == 2 && Region == "" && HsId == "") ? "RO wise Details" : (Region != "" && Region != null) || ($sessionStorage.RoleLevel == 3 && HsId == "") ? "Sales Area wise Details" : (HsId != "" && HsId != null) || $sessionStorage.RoleLevel >= 4 ? "Distributor wise Details" : "Zone wise Details";
        $sessionStorage.bread1 = $scope.bread1;
        $scope.getData(date, Zone, Region, HsId);
    }
})

appdash.controller('NewAdminDeliveryDetController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var codeofuser = "";
    var valueof = userService.Success('EE');
    $sessionStorage.currentstate = $state.current.name;
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
            $scope.c1Tiltle = "GoGas Refill Transaction Status";
            break;       
        default:
            break;
    }

    $scope.c1 = false;
    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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

    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;

    $scope.fromGetdetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $rootScope.hidebackbtn = false;
            $scope.getData();
        }
    }
    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        var zid, rid;
        zid = HsId != null && HsId != "" ? '' : ZoneId;
        rid = HsId != null && HsId != "" ? '' : RegionId;
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + zid + '&RegionId=' + rid + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data;
                //  var total = $scope.res.splice($scope.res.indexOf($filter('filter')($scope.res, { Name: 'Total' })[0]), 1);
                $scope.gridOptions1.data = response.data.Data;
                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    //    var sumofcount = $scope.gridOptions1.data[i].TotalDeliveryCount + $scope.gridOptions1.data[i].TotalEzygasDeliveredCount;
                    if ($scope.gridOptions1.data[i].TotalDeliveryCount != 0) {

                        $scope.gridOptions1.data[i].EZYGASDelivery = parseFloat((($scope.gridOptions1.data[i].TotalEzygasDeliveredCount * 100) / $scope.gridOptions1.data[i].TotalDeliveryCount).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].CDCMSDelivery = parseFloat((($scope.gridOptions1.data[i].CdcmsDeliveryCount * 100) / $scope.gridOptions1.data[i].TotalDeliveryCount).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].EZYGASDelivery = "0";
                        $scope.gridOptions1.data[i].CDCMSDelivery = "0";
                    }
                }
                if (HsId != null && HsId != "") {
                    $scope.gridOptions1.columnDefs[0].visible = true;
                }
                else {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                var temp = $scope.res.length != 0 ? $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }) : $scope.res;
                var barData = $scope.res;
                var barsValue = [];
                var barsLabels = [];
                var CDCMSDeliverd = [];
                var EzyGasDeliverdLine = [];
                var CDCMSUnDeliverd = [];
                var EzyGasUnDeliverdLine = [];
                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsValue.push(barData[i].TotalDeliveryCount);
                        barsLabels.push(barData[i].Name);
                      //  CDCMSDeliverd.push(barData[i].CdcmsDeliveryCount);
                        EzyGasDeliverdLine.push(barData[i].TotalEzygasDeliveredCount);
                       // CDCMSUnDeliverd.push(barData[i].CdcmsUndeliveryCount);
                        EzyGasUnDeliverdLine.push(barData[i].EzygasUndeliveryCount);
                    }
                }
                $scope.labels = barsLabels;
                $scope.series = ['Series A', 'Series B'];
                $scope.data = [
                    barsValue,
                    EzyGasDeliverdLine,
                    EzyGasUnDeliverdLine
                ];
                $scope.colors = ['#ed7d31'];

                $scope.options = {
                    scales: {
                        xAxes: [{
                            isFixedWidth: false,
                            barPercentage: 0.5,
                            //  barThickness: 20,
                            categoryPercentage: 1.0,
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },
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
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        },
                    }
                };

                $scope.datasetOverride = [
                {
                    label: "Total",
                    type: 'bar'
                }
                ,
                {
                    label: "GoGas Delivered",
                    borderWidth: 2,
                    type: 'line',
                    fill: false
                }
                ,
                {
                    label: "GoGas Un-Delivered",
                    borderWidth: 2,
                    type: 'line',
                    fill: false
                }
                ];
                $scope.c1 = true;
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);

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
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',
        columnDefs: [
                { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
              { name: 'Name', displayName: 'Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalDistributor', displayName: 'Total Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AllDistributorCount', displayName: 'GoGas Distributors', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
             { name: 'TotalDeliveryCount', displayName: 'Total Delivered', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           // { name: 'CdcmsDeliveryCount', displayName: 'CDCMS Delivered', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalEzygasDeliveredCount', displayName: 'GoGas Delivered', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'EZYGASDelivery', displayName: 'GoGas Delivered %', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
       // { name: 'CDCMSDelivery', displayName: 'CDCMS Delivered %', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Delivery Details.xlsx',
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
            cols.push({ value: 'Delivery Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = false;
    $scope.gridOptions1.enableRowSelection = false;

})

appdash.controller('DigitalPaymentDetController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('EF');
    $sessionStorage.currentstate = $state.current.name;
    var codeofuser = "";
    if ($sessionStorage.CUserCode != null) {
        var Hsfor = 'CO';
        codeofuser = $sessionStorage.CUserCode;
    }

    else if ($sessionStorage.PUserCode != null) {
        var Hsfor = 'PG';
        codeofuser = $sessionStorage.PUserCode;
    }
    $scope.c1 = false;
    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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
        $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Regiondata = response.data.Data;
            }
            else {
                $scope.Regiondata = [];
                //     SmartAlert.Errmsg(response.data.Message);
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
                //  SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.gethierarchy();


    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;
    $scope.fromGetdetails = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $rootScope.hidebackbtn = false;
            $scope.getData();
        }
    }

    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        var zid, rid;
        zid = HsId != null && HsId != "" ? '' : ZoneId;
        rid = HsId != null && HsId != "" ? '' : RegionId;
        //    $http.get(uriadmin + 'Dashboard/GetDigPaymentDashboardSummary?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsID=' + HsId).then(function (response) {
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + zid + '&RegionId=' + rid + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data;
                var total = $filter('filter')(response.data.Data, { Name: 'GRAND TOTAL' });
                $scope.gridOptions1.data = $scope.res;
                if (HsId != null && HsId != "") {
                    $scope.gridOptions1.columnDefs[0].visible = true;
                }
                else {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });

                var barData = $scope.res;
                var barsLabels = [], AdharPay = [], UPI = [], BharatQR = [], NetBanking = [], DebitCredit = [], eWallet = [], Other = [];

                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsLabels.push(barData[i].Name);
                        AdharPay.push(barData[i].Aadhar);
                        UPI.push(barData[i].UPI);
                        BharatQR.push(barData[i].BharatQR);
                        DebitCredit.push(barData[i].CreditOrDebit);
                        NetBanking.push(barData[i].NetBanking);
                        eWallet.push(barData[i].Wallet);
                        Other.push(barData[i].OtherPayCount);
                    }
                }
                $scope.labels = barsLabels;
                $scope.data = [
                    AdharPay,
                    UPI,
                    BharatQR,
                    DebitCredit,
                    NetBanking,
                    eWallet,
                    Other
                ];
                $scope.colors = ['#d16902', '#af0a76', '#043575', '#930202', '#12cbe8', '#0aa801', '#35fd4400'];
                // $scope.colors = ['#ff0000', '#2bb20a', '#250fde', '#fd9635', '#ffff00', '#35fd4400'];

                $scope.options = {
                    scales: {
                        xAxes: [{
                            isFixedWidth: false,
                            barPercentage: 0.5,
                            //   barThickness: 20,
                            // categoryPercentage: 1.0,
                            stacked: true,
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                        }],
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        },
                    }
                };

                $scope.datasetOverride = [
                        {
                            label: "Aadhaar"
                        },
                        {
                            label: "UPI"
                        }
                        ,
                        {
                            label: "BharatQR"
                        }
                        ,
                        {
                            label: "Debit/Credit Card"
                        },
                        {
                            label: "Net Banking"
                        },
                        {
                            label: "eWallet"
                        },
                          {
                              label: "Other"
                          }
                ];

                $scope.c1 = true;
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);
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
        columnDefs: $scope.columns,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',

        columnDefs: [
            { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
             { name: 'Name', displayName: 'Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'DigitalPayCount', displayName: 'Total Payment', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'Aadhar', displayName: 'Aadhaar', width: "89", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'UPI', displayName: 'UPI', width: "59", cellTooltip: true, type: "number", cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader },
            { name: 'BharatQR', displayName: 'BharatQR', width: "90", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CreditOrDebit', displayName: 'Debit/Credit Card', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'NetBanking', displayName: 'Net Banking', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Wallet', displayName: 'eWallet', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'OtherPayCount', displayName: 'Other', width: "70", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'Citrus', displayName: 'Citrus', width: "70", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                      { name: 'Ezetap', displayName: 'Ezetap', width: "70", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                       { name: 'JusPay', displayName: 'JusPay', width: "75", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                        { name: 'Mosambee', displayName: 'Mosambee', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                         { name: 'Payphi', displayName: 'Payphi', width: "75", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                          { name: 'HPRefuel', displayName: 'Go Re-Fuel', width: "75", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
           //  { name: 'AdvancePayments', displayName: 'Advance Payment', width: "85", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'SmsInvPayCount', displayName: 'SMS Invoicing', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalDeliveryCount', displayName: 'Total Delivered', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          // { name: 'CdcmsDeliveryCount', displayName: 'CDCMS Delivered', type: "number", width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
               { name: 'TotalEzygasDeliveredCount', displayName: 'GoGas Delivered', type: "number", width: "85", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalDistributor', displayName: 'Total Distributors', type: "number", width: "80", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AllDistributorCount', displayName: 'GoGas Distributors', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
            { name: 'TransactedDistCount', displayName: 'Live Distributors', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Digital Payment Details.xlsx',
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
            cols.push({ value: 'Digital Payment Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

})

appdash.controller('TotalDigitalPaymentsController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('EG');
    $sessionStorage.currentstate = $state.current.name;
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
            $scope.c3Tiltle = "Digital Payments against GoGas Deliveries";
            break;       
        default:
            break;
    }

    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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
        $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Regiondata = response.data.Data;
                // SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.Regiondata = [];
                // SmartAlert.Errmsg(response.data.Message);
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
                // SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.gethierarchy();


    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;
    $scope.fromGetdetails = function () {
        $scope.divshow = false;
        $rootScope.hidebackbtn = false;
        $scope.getData();
    }

    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        //ZoneId = ZoneId == null  ? "" : ZoneId;
        //RegionId = RegionId == null ? "" : RegionId;
        //HsId = HsId == null ? "" : HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        var zid, rid;
        zid = HsId != null && HsId != "" ? '' : ZoneId;
        rid = HsId != null && HsId != "" ? '' : RegionId;
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + zid + '&RegionId=' + rid + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data;
                var total = $filter('filter')(response.data.Data, { Name: 'Total' });
                $scope.gridOptions1.data = $scope.res;

                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    $scope.gridOptions1.data[i].PerDigitalPay = total[0].DigitalPayCount != 0 ? parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / (total[0].DigitalPayCount)).toFixed(2) + '%') : "0";
                    //  $scope.gridOptions1.data[i].PerAdvancePay = total[0].AdvancePayments != 0 ? parseFloat((($scope.gridOptions1.data[i].AdvancePayments * 100) / (total[0].AdvancePayments)).toFixed(2) + '%') : "0";

                    $scope.gridOptions1.data[i].PerDigitalTotalDeliveries = $scope.gridOptions1.data[i].TotalDeliveryCount != 0 ? parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalDeliveryCount)).toFixed(2) + '%') : "0";
                    $scope.gridOptions1.data[i].PerDigitalEZYGASDeliveries = $scope.gridOptions1.data[i].TotalEzygasDeliveredCount != 0 ? parseFloat((($scope.gridOptions1.data[i].DigitalPayCount * 100) / ($scope.gridOptions1.data[i].TotalEzygasDeliveredCount)).toFixed(2) + '%') : "0";

                }
                if (HsId != null && HsId != "") {
                    $scope.gridOptions1.columnDefs[0].visible = true;
                }
                else {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                $scope.c1 = true;
                var barData = $scope.res;
                var barsLabels = [], TotalPayment = [], DigitalPayCount = [], AdvancePayments = [];

                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsLabels.push(barData[i].Name);
                        //  TotalPayment.push(barData[i].TotalPayment);
                        DigitalPayCount.push(barData[i].DigitalPayCount);
                        // AdvancePayments.push(barData[i].AdvancePayments);
                    }
                }
                $scope.labels = barsLabels;
                $scope.type = 'Bar';
                $scope.data = [
                //    TotalPayment,
                    DigitalPayCount,
                   // AdvancePayments
                ];

                var d = $scope.data;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != 0) {
                        $scope.flagE = 1;
                    }
                }
                if ($scope.flagE == 1) {
                    $scope.c1 = true;
                }
                else {
                    $scope.c1 = false;
                }

                $scope.colors = ['#ed7d31'];
                $scope.options = {
                    scales: {
                        xAxes: [{
                            barPercentage: 0.5,
                            //   barThickness: 30,
                            stacked: false,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },

                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        },
                    }
                };

                $scope.datasetOverride = [
                        //{
                        //    label: "Total Payment",
                        //},
                        {
                            label: "Digital Payment",
                        }
                        //,
                        //{
                        //    label: "Advance Payment",
                        //}
                ];
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }

            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);

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
        columnDefs: $scope.columns,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{\'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',

        columnDefs: [
            { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
        { name: 'Name', displayName: 'Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                 //    { name: 'TotalPayment', displayName: 'Total Payments', width: "155", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   { name: 'DigitalPayCount', displayName: 'Digital Payments', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                   //  { name: 'AdvancePayments', displayName: 'Advance Payments', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                       { name: 'PerDigitalPay', displayName: 'Contribution in Digital Payments(%)', width: "170", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'PerAdvancePay', displayName: '% Advance Payments', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'TotalDeliveryCount', displayName: 'Total Delivered', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalEzygasDeliveredCount', displayName: 'GoGas Deliveries', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'PerDigitalTotalDeliveries', displayName: 'Digital Payment % on Total Deliveries', width: "160", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'PerDigitalEZYGASDeliveries', displayName: 'Digital Payment % on GoGas Deliveries', width: "160", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

             { name: 'TotalDistributor', displayName: 'Total Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AllDistributorCount', displayName: 'GoGas Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
                 // { name: 'TotalConsumerBase', displayName: 'Total Consumer Base', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Digital Payment Details.xlsx',
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
            cols.push({ value: 'Digital Payment Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

})

appdash.controller('SmartCardPotentialsController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('EH');
    $sessionStorage.currentstate = $state.current.name;
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
                $scope.Title3 = 'Digital Payments On-boarded Potential';
            }
            else {
                $scope.Title1 = 'GoGas Consumers ';
                $scope.Title2 = 'GoGas On-boarded Distributors';
                $scope.Title3 = 'Digital Mode On-boarded Distributors';
            }
            break;   
        default:
            break;
    }
    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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
        $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Regiondata = response.data.Data;
                // SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.Regiondata = [];
                //    SmartAlert.Errmsg(response.data.Message);
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

    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;
    $scope.fromGetdetails = function () {
        $scope.divshow = false;
        $rootScope.hidebackbtn = false;
        $scope.getData();
    }

    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        //ZoneId = ZoneId == null  ? "" : ZoneId;
        //RegionId = RegionId == null ? "" : RegionId;
        //HsId = HsId == null ? "" : HsId;

        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        var zid, rid;
        zid = HsId != null && HsId != "" ? '' : ZoneId;
        rid = HsId != null && HsId != "" ? '' : RegionId;
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + zid + '&RegionId=' + rid + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data;
                var total = $filter('filter')(response.data.Data, { Name: 'Total' });
                $scope.gridOptions1.data = $scope.res;
                $scope.c1 = true;
                var barData = $scope.res;
                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    if ($scope.gridOptions1.data[i].TotalConsumerBase != 0) {
                        $scope.gridOptions1.data[i].PerIssuedSmartCard = parseFloat((($scope.gridOptions1.data[i].TotalSmartCardConsumers * 100) / ($scope.gridOptions1.data[i].TotalConsumerBase)).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].PerIssuedSmartCard = "0";
                    }
                    if ($scope.gridOptions1.data[i].TotalEzygasConsumerBase != 0) {
                        $scope.gridOptions1.data[i].PerIssuedSmartCardEZYGAS = parseFloat((($scope.gridOptions1.data[i].TotalSmartCardConsumers * 100) / ($scope.gridOptions1.data[i].TotalEzygasConsumerBase)).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].PerIssuedSmartCardEZYGAS = "0";
                    }
                }
                if (HsId != null && HsId != "") {
                    $scope.gridOptions1.columnDefs[0].visible = true;
                }
                else {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                if (HsId != null && HsId != "") {
                    $scope.gridOptions1.columnDefs[0].visible = true;
                }
                else {
                    $scope.gridOptions1.columnDefs[0].visible = false;
                }
                var barsLabels = [], TotalConsumerBase = [], PendingSmartCard = [], TotalEzygasConsumerBase = [], TotalSmartCardConsumers = [];

                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsLabels.push(barData[i].Name);
                        TotalConsumerBase.push(barData[i].TotalConsumerBase);
                        TotalEzygasConsumerBase.push(barData[i].TotalEzygasConsumerBase);
                        TotalSmartCardConsumers.push(barData[i].TotalSmartCardConsumers);
                        //  PendingSmartCard.push(barData[i].PendingCards);
                    }
                }
                $scope.labels = barsLabels;
                $scope.type = 'StackedBar';
                $scope.series = ['Total Delivered'];
                $scope.data = [
                    TotalConsumerBase,
                    TotalEzygasConsumerBase,
                    TotalSmartCardConsumers,
                  //   PendingSmartCard,
                ];
                $scope.colors = ['#ed7d31'];

                var d = $scope.data;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != 0) {
                        $scope.flagE = 1;
                    }
                }
                if ($scope.flagE == 1) {
                    $scope.c1 = true;
                }
                else {
                    $scope.c1 = false;
                }

                $scope.options = {
                    scales: {
                        xAxes: [{
                            barPercentage: 0.5,
                            // barThickness: 25,
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        }
                    }
                };

                $scope.datasetOverride = [
                                    {
                                        label: "Total Consumers",
                                    },
                                    {
                                        label: "GoGas Consumers",
                                    },
                                        {
                                            label: "GoGas Card Holders",
                                        }];
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);

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
        columnDefs: $scope.columns,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',

        columnDefs: [
            { name: 'DistCode', displayName: 'Distributor Code', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
        { name: 'Name', displayName: 'Name', width: "250", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'TotalConsumerBase', displayName: 'Total Consumer Base', type: "number", width: "120", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalEzygasConsumerBase', displayName: 'GoGas Consumer Base', type: "number", width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PurchasedCard', displayName: 'GoGas Purchased Card', type: "number", width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AvilCardStock', displayName: 'Remaining GoGas Card', type: "number", width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
           { name: 'TotalSmartCardConsumers', displayName: 'GoGas Card Holder', width: "120", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PerIssuedSmartCard', displayName: '% of Issued Smart Card Against Total Consumer Base', type: "number", width: "200", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PerIssuedSmartCardEZYGAS', displayName: '% of Issued Smart Card Against GoGas Consumer Base', type: "number", width: "220", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //       { name: 'PendingCard', displayName: 'Pending Smart Card', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'PerPendingSmartCard', displayName: '% of Pending Smart Card', width: "170", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'TotalDistributor', displayName: 'Total Distributors', type: "number", width: "90", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AllDistributorCount', displayName: 'GoGas Distributors', type: "number", width: "90", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Digital Payment Details.xlsx',
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
            cols.push({ value: 'Digital Payment Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

})

appdash.controller('EZYGASPotentialsController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('EI');
    $sessionStorage.currentstate = $state.current.name;
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
                $scope.Title3 = 'Digital Payments On-boarded Potential';
            }
            else {
                $scope.Title1 = 'GoGas Consumers ';
                $scope.Title2 = 'GoGas Live Distributors Status';
                $scope.Title3 = 'Digital On-boarded Distributors';
            }
            break;
        default:
            break;
    }

    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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

    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;


    $scope.fromGetdetails = function () {
        $scope.divshow = false;
        $rootScope.hidebackbtn = false;
        $scope.getData();
    }

    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        //ZoneId = ZoneId == null  ? "" : ZoneId;
        //RegionId = RegionId == null ? "" : RegionId;
        //HsId = HsId == null ? "" : HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        var zid, rid;
        zid = HsId != null && HsId != "" ? '' : ZoneId;
        rid = HsId != null && HsId != "" ? '' : RegionId;
        $http.get(uriadmin + 'Dashboard/GetNewDashboardSummeryDtls?Date=' + $scope.Fromdate + '&ToDate=' + $scope.Todate + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + zid + '&RegionId=' + rid + '&HsID=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data;
                var total = $filter('filter')(response.data.Data, { Name: 'TOTAL' }); //$scope.res.splice($scope.res.indexOf($filter('filter')(response.data.Data, { Name: 'TOTAL' })[0]), 1);
                // $scope.res[$scope.res.indexOf($filter('filter')(response.data.Data, { Name: 'TOTAL' })[0])].Name="GRAND TOTAL";
                $scope.gridOptions1.data = $scope.res;

                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    if ($scope.gridOptions1.data[i].AllDistributorCount != 0) {
                        $scope.gridOptions1.data[i].PerLiveDist = parseFloat((($scope.gridOptions1.data[i].TransactedDistCount * 100) / $scope.gridOptions1.data[i].AllDistributorCount).toFixed(2) + '%');

                    }
                    else {
                        $scope.gridOptions1.data[i].PerLiveDist = "0";

                    }
                    if ($scope.gridOptions1.data[i].TotalDistributor != 0) {
                        $scope.gridOptions1.data[i].PerLiveTotalDist = parseFloat((($scope.gridOptions1.data[i].TransactedDistCount * 100) / $scope.gridOptions1.data[i].TotalDistributor).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].PerLiveTotalDist = "0";
                    }
                }
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                $scope.c1 = true;
                var barData = $scope.res;
                var barsLabels = [], TotalDistributor = [], AllDistributorCount = [], TransactedDistCount = [];

                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsLabels.push(barData[i].Name);
                        TotalDistributor.push(barData[i].TotalDistributor);
                      //  AllDistributorCount.push(barData[i].AllDistributorCount);
                        TransactedDistCount.push(barData[i].TransactedDistCount);
                    }
                }
                $scope.labels = barsLabels;
                $scope.type = 'StackedBar';
                $scope.series = ['Total Delivered'];
                $scope.data = [
                    TotalDistributor,
                 //   AllDistributorCount,
                    TransactedDistCount
                ];

                var d = $scope.data;
                for (var i = 0; i < d.length; i++) {
                    if (d[i] != 0) {
                        $scope.flagE = 1;
                    }
                }
                if ($scope.flagE == 1) {
                    $scope.c1 = true;
                }
                else {
                    $scope.c1 = false;
                }

                $scope.colors = ['#ed7d31'];
                $scope.options = {
                    scales: {
                        xAxes: [{
                            barPercentage: 0.5,
                            //    barThickness: 30,
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        }
                    }
                };

                $scope.datasetOverride = [
                        {
                            label: "Total Distributors",
                        },
                        //{
                        //    label: "GoGas Distributors",
                        //}
                        //,
                        {
                            label: "Live Distributors",
                        }
                ];
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);

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
        columnDefs: $scope.columns,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',

        columnDefs: [
           // { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        {
            name: 'Name', displayName: 'Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader
        },
                  //{ name: 'TotalConsumerBase', displayName: 'Total Consumer Base', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  // { name: 'TotalEzygasConsumerBase', displayName: 'EZYGAS Consumer Base', type: "number", width: "*", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  //   { name: 'TotalEzygasDeliveredCount', displayName: 'EZYGAS Usage', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                     //  { name: 'PerEzyGasUsage', displayName: '% EZYGAS Usage', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'CdcmsDeliveryCount', displayName: 'CDCMS Usage', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'PerCDCMSUsage', displayName: '% CDCMS Usage', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'TotalDistributor', displayName: 'Total Distributors', cellClass: 'blue', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'AllDistributorCount', displayName: 'GoGas Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
            { name: 'TransactedDistCount', displayName: 'Live Distributors on GoGas', type: "number", width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PerLiveDist', displayName: '% Live Distributors Against GoGas Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
             { name: 'PerLiveTotalDist', displayName: '% Live Distributors Against Total Distributors', width: "*", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Digital Payment Details.xlsx',
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
            cols.push({ value: 'Digital Payment Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

})

appdash.controller('DigitalPaymentOnboardingPotentialsController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    var valueof = userService.Success('EJ');
    $sessionStorage.currentstate = $state.current.name;
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
                $scope.Title2 = 'GoGas On-boarding Distributors';
                $scope.Title3 = 'Digital On-boarded Distributors';
            }
            break; 
        default:
            break;
    }

    $scope.divshow = true;
    $rootScope.hidebackbtn = true;
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
        $scope.ZoneId = $scope.ZoneId == null ? "" : $scope.ZoneId;
        $http.get(uriadmin + 'Dashboard/GetAreaUserWise?UserCode=' + codeofuser + '&ZoneId=' + $scope.ZoneId + '&RegionId=&RoleCode=&Level=2&HsFor=' + Hsfor).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.Regiondata = response.data.Data;
                // SmartAlert.SuccessGrid(response.data.Message);
            }
            else {
                $scope.Regiondata = [];
                // SmartAlert.Errmsg(response.data.Message);
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
                //  SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.gethierarchy();

    $scope.ZoneId = $sessionStorage.ZoneIdfrDet == null ? "" : $sessionStorage.ZoneIdfrDet;
    $scope.RegionId = $sessionStorage.RegionIdfrDet == null ? "" : $sessionStorage.RegionIdfrDet;
    $scope.HsId = $sessionStorage.HsIdIdfrDet == null ? "" : $sessionStorage.HsIdIdfrDet;
    $scope.Fromdate = $sessionStorage.date;
    $scope.Todate = $sessionStorage.date;

    $scope.fromGetdetails = function () {

        $scope.divshow = false;
        $rootScope.hidebackbtn = false;
        $scope.getData();

    }

    $scope.getData = function (ZoneId, RegionId, HsId) {
        ZoneId = $scope.ZoneId == null ? ZoneId : $scope.ZoneId;
        RegionId = $scope.RegionId == null ? RegionId : $scope.RegionId;
        HsId = $scope.HsId == null ? HsId == null ? "" : HsId : $scope.HsId;
        //ZoneId = ZoneId == null  ? "" : ZoneId;
        //RegionId = RegionId == null ? "" : RegionId;
        //HsId = HsId == null ? "" : HsId;
        codeofuser = ZoneId == "" && RegionId == "" && HsId == "" ? $sessionStorage.CUserCode == null ? $sessionStorage.PUserCode : $sessionStorage.CUserCode : "";
        $http.get(uriadmin + 'Dashboard/GetTtlDigPayDtls?Date=&UserCode=' + codeofuser + '&HsFor=' + Hsfor + '&ZoneId=' + ZoneId + '&RegionId=' + RegionId + '&HsId=' + HsId).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.res = response.data.Data.Table;
                var total = $filter('filter')(response.data.Data.Table, { Name: 'TOTAL' });
                $scope.gridOptions1.data = $scope.res;
                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    if ($scope.gridOptions1.data[i].TotalEzygasDistributor != 0) {
                        $scope.gridOptions1.data[i].PerPayphi = parseFloat((($scope.gridOptions1.data[i].Payphi * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].PerMosambee = parseFloat((($scope.gridOptions1.data[i].Mosambee * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].PerJusPay = parseFloat((($scope.gridOptions1.data[i].JusPay * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].PerCitrus = parseFloat((($scope.gridOptions1.data[i].Citrus * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].PerHPCLRefuel = parseFloat((($scope.gridOptions1.data[i].HPCLRefuel * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        $scope.gridOptions1.data[i].PerEzetap = parseFloat((($scope.gridOptions1.data[i].Ezetap * 100) / $scope.gridOptions1.data[i].TotalEzygasDistributor).toFixed(2) + '%');
                        // $scope.gridOptions1.data[i].PerPendingOnboarding = (($scope.gridOptions1.data[i].PendigEzygasOnBoarding * 100) / $scope.gridOptions1.data[i].TotalCdcmsDistributor).toFixed(2) + '%';
                    }
                    else {
                        $scope.gridOptions1.data[i].PerPayphi = '0';
                        $scope.gridOptions1.data[i].PerMosambee = '0';
                        $scope.gridOptions1.data[i].PerJusPay = '0';
                        $scope.gridOptions1.data[i].PerCitrus = '0';
                        $scope.gridOptions1.data[i].PerEzetap = '0';
                    }
                    if ($scope.gridOptions1.data[i].TotalCdcmsDistributor != 0) {
                        $scope.gridOptions1.data[i].PerPendingOnboarding = parseFloat((($scope.gridOptions1.data[i].PendigEzygasOnBoarding * 100) / $scope.gridOptions1.data[i].TotalCdcmsDistributor).toFixed(2) + '%');
                    }
                    else {
                        $scope.gridOptions1.data[i].TotalCdcmsDistributor = "0";
                    }
                }
                $scope.gridOptions1.columnDefs.push({ name: 'Name', displayName: $scope.res[0].Area, width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader });
                $scope.c1 = true;
                $scope.c2 = true;
                $scope.l1 = true;
                var barData = $scope.res;
                var barsLabels = [], AllDistributorCount = [], Payphi = [], Mosambee = [], JusPay = [], Citrus = [], HPRefuel = [], Ezetap = [];

                for (var i = 0; i < barData.length; i++) {
                    if (barData[i].Name != "GRAND TOTAL") {
                        barsLabels.push(barData[i].Name);
                        AllDistributorCount.push(barData[i].TotalCdcmsDistributor);
                        Payphi.push(barData[i].Payphi);
                        Mosambee.push(barData[i].Mosambee);
                        JusPay.push(barData[i].JusPay);
                        Citrus.push(barData[i].Citrus);
                        HPRefuel.push(barData[i].HPCLRefuel)
                    }
                }
                $scope.labels = barsLabels;
                $scope.series = ['Total Delivered'];
                $scope.data = [
                    AllDistributorCount,
                    Payphi,
                    Mosambee,
                    JusPay,
                    Citrus,
                    HPRefuel
                ];
                $scope.colors = ['#ed7d31'];

                $scope.options = {
                    scales: {
                        xAxes: [{
                            barPercentage: 0.3,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        }
                    }
                };

                $scope.datasetOverride = [
                    {
                        label: "Total Distributors",
                        type: 'bar'
                    },
                    {
                        label: "PayPhi",
                        type: 'line',
                        fill: false
                    },
                    {
                        label: "Mosambee",
                        borderWidth: 2,
                        type: 'line',
                        fill: false
                    }
                    ,
                    {
                        label: "Jus Pay",
                        borderWidth: 2,
                        type: 'line',
                        fill: false
                    }
                    ,
                    {
                        label: "Citrus",
                        borderWidth: 2,
                        type: 'line',
                        fill: false
                    }
                     ,
                    {
                        label: "Go Re-Fuel",
                        borderWidth: 2,
                        type: 'line',
                        fill: false
                    }
                ];
            }
            else {
                $scope.c1 = false;
                $scope.gridOptions1.data = [];
            }
            $scope.divshow = true;
            $rootScope.hidebackbtn = true;
        })
    }
    $scope.getData($sessionStorage.ZoneId, $sessionStorage.RegionId, $sessionStorage.HsId);

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
        columnDefs: $scope.columns,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        enableSelectAll: false,
        rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\':grid.options.rowStyle(row) }" ui-grid-cell></div>',
        rowStyle: function (row) {
            if (row.entity.Name == "GRAND TOTAL") {
                return true;
            }
            else {
                return false;
            }
        },
        columnDefs: [
        //    { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        { name: 'Name', displayName: 'Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalCdcmsDistributor', displayName: 'Total Distributors', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'TotalEzygasDistributor', displayName: 'GoGas Distributors', width: "120", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
            // { name: 'AllDistributorCount', displayName: 'Digital on-boarded Distributors', width: "150", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'PendigEzygasOnBoarding', displayName: 'Pending EZYGAS On-boarding', width: "140", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            //{ name: 'PerPendingOnboarding', displayName: '% of Pending EZYGAS On-boarding', width: "150", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              //{ name: 'TotalConsumerBase', displayName: 'Total Consumer Base', width: "160", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                  { name: 'TtlDigOnboarding', displayName: 'Digital On-boarded Distributors', width: "155", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Payphi', displayName: 'Payphi', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'PerPayphi', displayName: '% of PayPhi On-boarded', type: "number", width: "130", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Mosambee', displayName: 'Mosambee', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'PerMosambee', displayName: '% of Mosambee On-boarded', type: "number", width: "130", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'JusPay', displayName: 'Jus Pay', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'PerJusPay', displayName: '% of Jus Pay On-boarded', type: "number", width: "130", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Citrus', displayName: 'Citrus', width: "100", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'PerCitrus', displayName: '% of Citrus On-boarded', type: "number", width: "130", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'HPCLRefuel', displayName: 'Go Re-Fuel', width: "75", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
              { name: 'PerHPCLRefuel', displayName: '% of Go Re-Fuel On-boarded', type: "number", width: "130", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, enableHiding: false, visible: false },
           //  { name: 'Ezetap', displayName: 'Ezetap', width: "80", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          //  { name: 'PerEzetap', displayName: '% of Ezetap On-boarded', width: "130", type: "number", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Digital Payment Details.xlsx',
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
            cols.push({ value: 'Digital Payment Details', metadata: { style: formatterId.id } });
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
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    }
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.enableRowSelection = true;

});
