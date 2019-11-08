$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0],
                y = item.datapoint[1],
            color = item.series.color;
            $("#tooltip").html("<strong>" + item.series.label + "<br>" + item.series.label + " : " + y + "</strong>")
            .css({ top: item.pageY + 5, left: item.pageX + 5, border: '2px solid ' + color })
            .fadeIn(200);
            $('<div id="tooltip"></div>').css({
                position: 'absolute',
                display: 'none',
                padding: '2px',
                'font-size': '9px',
                'border-radius': '5px',
                'background-color': '#fff',
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);

        } else {
            $("#tooltip").remove();
        }
    });
};
appdash.directive('deliverUndeliver', function ($http, base64, $filter, $state, $interval, $rootScope, CalendarEvent, $localStorage, $sessionStorage, $window, Name, Password, uriadmin) {
    return {
        restrict: 'A',
        $scope: {
            data: '=flotData',
            options: '=flotOptions'
        },
        link: function ($scope, element, attributes) {
            var ticks = [], bardata = [];
            $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
            $scope.getdelundelCount = function (d1) {

                if ($sessionStorage.CUserCode != null) {
                    var Hsfor = 'CO';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.CUserCode;
                    }

                }
                else if ($sessionStorage.PUserCode != null) {
                    var Hsfor = 'PG';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.PUserCode;
                    }

                }
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Dashboard/GetDashboardHierarchySummery?Date=' + d1 + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor)
            .then(function (response) {
                $rootScope.sc = response.data.StatusCode;
                if (response.data.StatusCode == 1) {

                    $scope.all = response.data.Data[0];
                    $scope.TotalDeliveredCount = $scope.all.TotalDeliveredCount;
                    $scope.UndeliveredAttempts = $scope.all.UndeliveredAttempts;
                    ticks = []; bardata = [];
                    ticks.push([0, 'Total Delivered'], [1, 'Total Undelivered']);
                    bardata.push([0, $scope.TotalDeliveredCount], [1, $scope.UndeliveredAttempts]);
                    $("#flotcontainer").UseTooltip();
                }
                else {


                }

            }).then(function (res) {

                var Delivered = {
                    label: "Count",
                    data: bardata,
                    color: '#a03131',
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.15
                    }
                };
                $scope.DeliveredShow = true;

                $scope.$watch('DeliveredShow', function (toggle) {
                    reveniewElementToggle(Delivered, toggle);
                });

                //var UnDelivered = {
                //    label: "UnDelivered",
                //    data: bardata,
                //    color: "#a03131",
                //    bars: {
                //        show: true,
                //        align: "center",
                //        barWidth: 0.2
                //    }
                //};
                //$scope.UnDeliveredShow = true;

                //$scope.$watch('UnDeliveredShow', function (toggle) {
                //    reveniewElementToggle(UnDelivered, toggle);
                //});

                $scope.revenewData = [Delivered];


                function reveniewElementToggle(element, toggle) {
                    if (toggle) {
                        if ($scope.revenewData.indexOf(element) == -1)
                            $scope.revenewData.push(element)
                    } else {
                        $scope.revenewData = _.without($scope.revenewData, element);
                    }
                }
                $scope.revenewDisplayOptions = {
                    grid: {
                        hoverable: true
                    },
                    xaxis: {
                        tickLength: 0,
                        ticks: ticks,
                        rotateTicks: 45,
                    },
                    yaxes: {
                        tickFormatter: function (val, axis) {
                            return val;
                        },
                        // max: 1200
                    },
                    legend: {
                        show: false
                    },

                };
                if ($rootScope.sc == 1) {

                    $scope.data = $scope.revenewData;
                    $scope.options = $scope.revenewDisplayOptions;
                    var plot = $.plot(element, $scope.data, $scope.options);
                    $rootScope.sc = null;
                    $("#flotcontainer").UseTooltip();
                }
                else {
                    ticks = [], bardata = [];
                    $scope.data = [0, 1];
                    $scope.options = [];
                    var plot = $.plot(element, $scope.data, $scope.options);
                    $scope.NoData = function () {
                        var canvas = plot.getCanvas();
                        var ctx = canvas.getContext("2d");
                        var x = canvas.width / 2;
                        var y = canvas.height / 2;
                        ctx.font = '30pt Calibri';
                        ctx.textAlign = 'center';
                        ctx.fillText('No data available!', x, y);
                    }
                    $scope.NoData();
                }

            })
            }
            $scope.getdelundelCount($scope.date1);

        }
    }
});
appdash.directive('dacMdac', function ($http, base64, $filter, $state, $interval, CalendarEvent, $rootScope, $localStorage, $sessionStorage, $window, Name, Password, uriadmin) {
    return {
        restrict: 'A',
        $scope: {
            data: '=flotData',
            options: '=flotOptions'
        },
        link: function ($scope, element, attributes) {
            var ticks2 = [], bardata = [];
            $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
            $scope.getdacmdacCount = function (d2) {

                if ($sessionStorage.CUserCode != null) {
                    var Hsfor = 'CO';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.CUserCode;
                    }

                }
                else if ($sessionStorage.PUserCode != null) {
                    var Hsfor = 'PG';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.PUserCode;
                    }


                }
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Dashboard/GetDashboardHierarchySummery?Date=' + d2 + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor)
            .then(function (response) {
                $rootScope.sc1 = response.data.StatusCode;
                if (response.data.StatusCode == 1) {
                    $scope.all = response.data.Data[0];
                    $scope.DACDeliveredCount = $scope.all.DACDeliveredCount;

                    $scope.MastDACDelCount = $scope.all.MastDACDelCount;
                    $scope.CardDeliveredCount = $scope.all.CardDeliveredCount;

                    ticks2 = []; bardata = [];
                    ticks2.push([0, 'DAC Delivered'], [1, 'Master DAC Delivered'], [2, 'SmartCard Delivered']);
                    bardata.push([0, $scope.DACDeliveredCount], [1, $scope.MastDACDelCount], [2, $scope.CardDeliveredCount]);
                    $("#flotcontainer1").UseTooltip();
                }
                else {

                    ticks2.push([0, 'DAC Delivered'], [1, 'Master DAC Delivered'], [2, 'SmartCard Delivered']);
                    bardata.push([0, null], [1, null], [2, null]);
                }

            }).then(function (res) {
                //var data = [
                //        { label: "Delivered", data: [["January", 10], ["February", 8],},
                //        { label: "UnDelivered", data: [["January", 20], ["February", 30], ["March", 5], ["April", 6], ["May", 9], ["June", 9]] }
                //];

                var Delivered = {
                    label: "Count",
                    data: bardata,
                    color: '#a03131',
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.15
                    }
                };
                $scope.DeliveredShow = true;

                $scope.$watch('DeliveredShow', function (toggle) {
                    reveniewElementToggle(Delivered, toggle);
                });


                $scope.revenewData1 = [Delivered];


                function reveniewElementToggle(element, toggle) {
                    if (toggle) {
                        if ($scope.revenewData1.indexOf(element) == -1)
                            $scope.revenewData1.push(element)
                    } else {
                        $scope.revenewData1 = _.without($scope.revenewData1, element);
                    }
                }
                $scope.revenewDisplayOptions1 = {
                    grid: {
                        hoverable: true
                    },
                    xaxis: {
                        tickLength: 0,
                        ticks: ticks2,
                        rotateTicks: 45,
                    },
                    yaxes: {
                        tickFormatter: function (val, axis) {
                            return val;
                        },
                        // max: 1200
                    },
                    legend: {
                        show: false
                    },

                };
                if ($rootScope.sc1 == 1) {
                    $scope.data1 = $scope.revenewData1;
                    $scope.options1 = $scope.revenewDisplayOptions1;
                    var plot = $.plot(element, $scope.data1, $scope.options1);
                    $rootScope.sc1 = null;
                    $("#flotcontainer1").UseTooltip();
                }
                else {
                    ticks2 = [], bardata = [];
                    $scope.data1 = [0, 1];
                    $scope.options1 = [];
                    var plot = $.plot(element, $scope.data1, $scope.options1);
                    $scope.NoData = function () {
                        var canvas = plot.getCanvas();
                        var ctx = canvas.getContext("2d");
                        var x = canvas.width / 2;
                        var y = canvas.height / 2;
                        ctx.font = '30pt Calibri';
                        ctx.textAlign = 'center';
                        ctx.fillText('No data available!', x, y);
                    }
                    $scope.NoData();
                }

            })
            }
            $scope.getdacmdacCount($scope.date1);


        }
    }
});
appdash.directive('payReport', function ($http, base64, $filter, $state, $interval, CalendarEvent, $rootScope, $localStorage, $sessionStorage, $window, Name, Password, uriadmin) {
    return {
        restrict: 'A',
        $scope: {
            data: '=flotData',
            options: '=flotOptions'
        },
        link: function ($scope, element, attributes) {
            var ticks3 = [], bardata = [];
            $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
            $scope.getpaymentCount = function (d3) {
                if ($sessionStorage.CUserCode != null) {
                    var Hsfor = 'CO';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.CUserCode;
                    }

                }
                else if ($sessionStorage.PUserCode != null) {
                    var Hsfor = 'PG';
                    if ($sessionStorage.codefor != null) {
                        var codeofuser = $sessionStorage.codefor;
                    }
                    else {
                        var codeofuser = $sessionStorage.PUserCode;
                    }
                }
                var base65 = base64.encode(Name + ':' + Password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                $http.get(uriadmin + 'Dashboard/GetDashboardHierarchySummery?Date=' + d3 + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor)
            .then(function (response) {
                $rootScope.sc2 = response.data.StatusCode;
                if (response.data.StatusCode == 1) {
                    $scope.all = response.data.Data[0];
                    $scope.UPIPayCount = $scope.all.UPIPayCount;
                    $scope.OtherPayCount = $scope.all.OtherPayCount;
                    $scope.AadharPayCount = $scope.all.AadharPayCount;
                    $scope.BharatQrPayCount = $scope.all.BharatQrPayCount;
                    $scope.DebitCreditCardPayCount = $scope.all.DebitCreditCardPayCount;
                    $scope.CashPayCount = $scope.all.CashPayCount;
                    $scope.AdvancePayments = $scope.all.AdvancePayments;

                    //$scope.UPIPayCount=10;
                    //$scope.OtherPayCount=2;
                    //$scope.AadharPayCount=5;
                    //$scope.BharatQrPayCount=8;
                    //$scope.DebitCreditCardPayCount=10;
                    //$scope.CashPayCount =8;
                    //$scope.AdvancePayments = 9;

                    ticks3 = []; bardata = [];
                    ticks3.push([0, 'UPI'], [1, 'Adhar'], [2, 'BharatQR'], [3, 'Debit/Credit'], [4, 'Advance'], [5, 'Other']);
                    bardata.push([0, $scope.UPIPayCount], [1, $scope.AadharPayCount], [2, $scope.BharatQrPayCount], [3, $scope.DebitCreditCardPayCount], [4, $scope.AdvancePayments], [5, $scope.OtherPayCount]);
                    $("#flotcontainer1").UseTooltip();
                }
                else {

                    ticks3.push([0, 'UPI'], [1, 'Adhar'], [2, 'BharatQR'], [3, 'Debit/Credit'], [4, 'Advance'], [5, 'Other']);
                    bardata.push([0, null], [1, null], [2, null], [3, null], [4, null], [5, null]);
                }

            }).then(function (res) {
                //var data = [
                //        { label: "Delivered", data: [["January", 10], ["February", 8],},
                //        { label: "UnDelivered", data: [["January", 20], ["February", 30], ["March", 5], ["April", 6], ["May", 9], ["June", 9]] }
                //];

                var Delivered = {
                    label: "Count",
                    data: bardata,
                    color: '#a03131',
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.25
                    }
                };
                $scope.DeliveredShow = true;

                $scope.$watch('DeliveredShow', function (toggle) {
                    reveniewElementToggle(Delivered, toggle);
                });

                //var UnDelivered = {
                //    label: "UnDelivered",
                //    data: bardata,
                //    color: "#a03131",
                //    bars: {
                //        show: true,
                //        align: "center",
                //        barWidth: 0.2
                //    }
                //};
                //$scope.UnDeliveredShow = true;

                //$scope.$watch('UnDeliveredShow', function (toggle) {
                //    reveniewElementToggle(UnDelivered, toggle);
                //});

                $scope.revenewData2 = [Delivered];


                function reveniewElementToggle(element, toggle) {
                    if (toggle) {
                        if ($scope.revenewData2.indexOf(element) == -1)
                            $scope.revenewData2.push(element)
                    } else {
                        $scope.revenewData2 = _.without($scope.revenewData2, element);
                    }
                }
                $scope.revenewDisplayOptions2 = {
                    grid: {
                        hoverable: true
                    },
                    xaxis: {
                        tickLength: 0,
                        ticks: ticks3,
                        rotateTicks: 45,
                    },
                    yaxes: {
                        tickFormatter: function (val, axis) {
                            return val;
                        },
                        // max: 1200
                    },
                    legend: {
                        show: false
                    },

                };
                if ($rootScope.sc2 == 1) {
                    $scope.data2 = $scope.revenewData2;
                    $scope.options2 = $scope.revenewDisplayOptions2;
                    var plot = $.plot(element, $scope.data2, $scope.options2);
                    $rootScope.sc2 = null;
                    $("#flotcontainer2").UseTooltip();
                }
                else {
                    ticks3 = [], bardata = [];
                    $scope.data2 = [0, 1];
                    $scope.options2 = [];
                    var plot = $.plot(element, $scope.data2, $scope.options2);
                    $scope.NoData = function () {
                        var canvas = plot.getCanvas();
                        var ctx = canvas.getContext("2d");
                        var x = canvas.width / 2;
                        var y = canvas.height / 2;
                        ctx.font = '30pt Calibri';
                        ctx.textAlign = 'center';
                        ctx.fillText('No data available!', x, y);
                    }
                    $scope.NoData();
                }

            })
            }
            $scope.getpaymentCount($scope.date1);
            //$scope.getdelundelCountbtn = function (date) {
            //    if ($localStorage.CUserCode != null) {
            //        var Hsfor = 'CO';
            //    }
            //    else if ($localStorage.PUserCode != null) {
            //        var Hsfor = 'PG';
            //    }
            //    var base65 = base64.encode(Name + ':' + Password);
            //    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            //    $http.get(uriadmin + 'Distributor/GetDashboardHierarchySummery?Date=13-MAR-2018&UserCode=120004&HsFor=' + Hsfor)
            //.then(function (response) {
            //    if (response.data.StatusCode == 1) {
            //        $scope.all = response.data.Data[0];
            //        $scope.TotalDeliveredCount = $scope.all.TotalDeliveredCount;
            //        $scope.UndeliveredAttempts = $scope.all.UndeliveredAttempts;

            //        ticks.push([0, 'Total Delivered'], [1, 'Undelivered']);
            //        bardata.push([0, $scope.TotalDeliveredCount], [1, $scope.UndeliveredAttempts]);
            //        $("#flotcontainer").UseTooltip();
            //    }
            //    else {
            //        $scope.TotalDeliveredCount = '0';
            //        $scope.UndeliveredAttempts = '0';
            //    }

            //}).then(function (res) {

            //    var Delivered = {
            //        label: "Delivered",
            //        data: bardata,
            //        color: '#71843F',
            //        bars: {
            //            show: true,
            //            align: "center",
            //            barWidth: 0.2
            //        }
            //    };
            //    $scope.DeliveredShow = true;

            //    $scope.$watch('DeliveredShow', function (toggle) {
            //        reveniewElementToggle(Delivered, toggle);
            //    });

            //    //var UnDelivered = {
            //    //    label: "UnDelivered",
            //    //    data: bardata,
            //    //    color: "#a03131",
            //    //    bars: {
            //    //        show: true,
            //    //        align: "center",
            //    //        barWidth: 0.2
            //    //    }
            //    //};
            //    //$scope.UnDeliveredShow = true;

            //    //$scope.$watch('UnDeliveredShow', function (toggle) {
            //    //    reveniewElementToggle(UnDelivered, toggle);
            //    //});

            //    $scope.revenewData = [Delivered];


            //    function reveniewElementToggle(element, toggle) {
            //        if (toggle) {
            //            if ($scope.revenewData.indexOf(element) == -1)
            //                $scope.revenewData.push(element)
            //        } else {
            //            $scope.revenewData = _.without($scope.revenewData, element);
            //        }
            //    }
            //    $scope.revenewDisplayOptions = {
            //        grid: {
            //            hoverable: true
            //        },
            //        xaxis: {
            //            tickLength: 0,
            //            ticks: ticks,
            //            rotateTicks: 45,
            //        },
            //        yaxes: {
            //            tickFormatter: function (val, axis) {
            //                return val;
            //            },
            //            // max: 1200
            //        },
            //        legend: {
            //            show: false
            //        },

            //    };
            //    if ($scope.all != null) {
            //        $scope.data = $scope.revenewData;
            //        $scope.options = $scope.revenewDisplayOptions;
            //        var plot = $.plot(element, $scope.data, $scope.options);
            //        //$scope.$watchCollection('data', function (newData, oldData) {
            //        //    if (newData != oldData) {
            //        //        plot.setData($scope.revenewDisplayOptions);
            //        //        plot.setupGrid();
            //        //        plot.draw();
            //        //    }
            //        //});
            //        $("#flotcontainer").UseTooltip();
            //    }
            //    else {
            //        ticks = [], bardata = [];
            //        $scope.data = [0, 1];
            //        $scope.options = [];
            //        var plot = $.plot(element, $scope.data, $scope.options);
            //        $scope.NoData = function () {
            //            var canvas = plot.getCanvas();
            //            var ctx = canvas.getContext("2d");
            //            var x = canvas.width / 2;
            //            var y = canvas.height / 2;
            //            ctx.font = '30pt Calibri';
            //            ctx.textAlign = 'center';
            //            ctx.fillText('No data available!', x, y);
            //        }
            //        $scope.NoData();
            //    }

            //})
            //}

        }
    }
});
appdash.controller('AdminDashboard', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, SmartAlert, uiGridConstants, userService, $rootScope, base64, uri, uriadmin, Name, Password) {


    var valueof = userService.Success('AA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        //$sessionStorage.currentstate = $state.current.name;
        $rootScope.$emit("CallParentMethod", function () { });
        $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
        document.getElementById('dashDate').onkeydown = function () { return false; }
        $scope.ClearDistSession = function () {
            $sessionStorage.ConnectDistCode = null;
            $sessionStorage.ConnectDistName = null;
            $sessionStorage.ConnectCity = null;
        };
        $scope.ClearDistSession();

        $scope.getAllCount = function (d4) {

            if ($sessionStorage.CUserCode != null) {
                var Hsfor = 'CO';
                var codeofuser = $sessionStorage.CUserCode;
            }
            else if ($sessionStorage.PUserCode != null) {
                var Hsfor = 'PG';
                var codeofuser = $sessionStorage.PUserCode;
            }
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http.get(uriadmin + 'Dashboard/GetDashboardHierarchySummery?Date=' + $scope.date1 + '&UserCode=' + codeofuser + '&HsFor=' + Hsfor)
        .then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.getdelundelCount($scope.date1);
                $scope.getdacmdacCount($scope.date1);
                $scope.getpaymentCount($scope.date1);
                $scope.all = response.data.Data[0];
                $scope.PendingDelivery1 = $scope.all.PendingDelivery;
                $scope.TotalDeliveredCount1 = $scope.all.TotalDeliveredCount;
                $scope.CardDeliveredCount1 = $scope.all.CardDeliveredCount;
                $scope.DACDeliveredCount1 = $scope.all.DACDeliveredCount;
                $scope.UndeliveredAttempts1 = $scope.all.UndeliveredAttempts;
                $scope.CashPayCount1 = $scope.all.CashPayCount;

                $scope.DigitalPayCount1 = $scope.all.DigitalPayCount;
                var cash = $scope.CashPayCount1;
                var cash1 = $scope.DigitalPayCount1;
                var cashtotal = cash + cash1;
                $scope.TotalPayment1 = cashtotal; //$scope.all.TotalPayment;
                $scope.AdvancePayments1 = $scope.all.AdvancePayments;
                $scope.AppBookings1 = $scope.all.AppBookings;
                $scope.NewCards1 = $scope.all.NewCards;
                $scope.OnFieldDMan1 = $scope.all.OnFieldDMan;

                if (Number($scope.TotalDeliveredCount1) == 0) {
                    $scope.pendper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal4 = [$scope.pendper, 100 - $scope.pendper];
                }
                else {
                    $scope.pendper = (Number($scope.PendingDelivery1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal4 = [$scope.pendper, 100 - $scope.pendper];
                }
                if (Number($scope.TotalDeliveredCount1) == 0) {
                    $scope.refillper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal = [$scope.refillper, 100 - $scope.refillper];
                }
                else {
                    $scope.refillper = (Number($scope.TotalDeliveredCount1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal = [$scope.refillper, 100 - $scope.refillper];
                }

                if (Number($scope.TotalDeliveredCount1) == 0) {
                    $scope.cardper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal1 = [$scope.cardper, 100 - $scope.cardper];

                }
                else {
                    $scope.cardper = ((Number($scope.CardDeliveredCount1) / Number($scope.TotalDeliveredCount1))) * 100;
                    $scope.labels = ["", ""];
                    $scope.dataTotal1 = [$scope.cardper, 100 - $scope.cardper];

                }
                if (Number($scope.TotalDeliveredCount1) == 0) {
                    $scope.DACper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal2 = [$scope.DACper, 100 - $scope.DACper];

                }
                else {
                    $scope.DACper = ((Number($scope.DACDeliveredCount1) / Number($scope.TotalDeliveredCount1))) * 100;
                    $scope.labels = ["", ""];
                    $scope.dataTotal2 = [$scope.DACper, 100 - $scope.DACper];

                }

                if (Number($scope.TotalDeliveredCount1) == 0) {
                    $scope.undelper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal3 = [$scope.undelper, 100 - $scope.undelper];
                }
                else {
                    $scope.undelper = Number(Number($scope.UndeliveredAttempts1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal3 = [$scope.undelper, 100 - $scope.undelper];
                }
                if (Number($scope.TotalPayment1) == 0) {
                    $scope.cashper = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal5 = [$scope.cashper, 100 - $scope.cashper];
                }
                else {
                    $scope.cashper = Number($scope.CashPayCount1) / Number($scope.TotalPayment1) * Number(100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal5 = [$scope.cashper, 100 - $scope.cashper];

                }
                if (Number($scope.TotalPayment1) == 0) {
                    $scope.digper = 0
                    $scope.labels = ["", ""];
                    $scope.dataTotal6 = [$scope.digper, 100 - $scope.digper];
                }
                else {
                    $scope.digper = Number($scope.DigitalPayCount1) / Number($scope.TotalPayment1) * Number(100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal6 = [$scope.digper, 100 - $scope.digper];
                }
                if (Number($scope.TotalPayment1) == 0) {
                    $scope.TotalPer = 0;
                    $scope.labels = ["", ""];
                    $scope.dataTotal7 = [$scope.TotalPer, 100 - $scope.TotalPer];
                }
                else {
                    $scope.TotalPer = Number($scope.TotalPayment1) / Number($scope.TotalPayment1) * Number(100);
                    $scope.labels = ["", ""];
                    $scope.dataTotal7 = [$scope.TotalPer, 100 - $scope.TotalPer];
                }




            }
            else {
                $sessionStorage.codefor = $scope.rowvalueSOUserCode;
                $scope.getdelundelCount($scope.date1);
                $scope.getdacmdacCount($scope.date1);
                $scope.getpaymentCount($scope.date1);
                $scope.TotalDeliveredCount1 = 0;
                $scope.refillper = 0;
                $scope.digper = 0;
                $scope.cashper = 0;
                $scope.cardper = 0;
                $scope.DACper = 0;
                $scope.TotalPer = 0;
                $scope.pendper = 0;
                $scope.CardDeliveredCount1 = 0;
                $scope.DACDeliveredCount1 = 0;
                $scope.UndeliveredAttempts1 = 0;
                $scope.undelper = 0;
                $scope.PendingDelivery1 = 0;
                $scope.CashPayCount1 = 0;
                $scope.DigitalPayCount1 = 0;
                $scope.TotalPayment1 = 0;
                $scope.AdvancePayments1 = 0;
                $scope.AppBookings1 = 0;
                $scope.NewCards1 = 0;
                $scope.OnFieldDMan1 = 0;
                $scope.dataTotal = [0, 0];
                $scope.dataTotal1 = [0, 0];
                $scope.dataTotal2 = [0, 0];
                $scope.dataTotal3 = [0, 0];
                $scope.dataTotal4 = [0, 0];
                $scope.dataTotal5 = [0, 0];
                $scope.dataTotal6 = [0, 0];
                $scope.dataTotal7 = [0, 0];

            }

        })
        }
        $scope.getAllCount();

        $scope.getAllCountonbtn = function (date) {

            $scope.getAllCount(date);
            ticks = [], bardata = [];
            ticks2 = null, bardata = null;
            tick3 = null, bardata = null;
            $scope.getdelundelCount(date);
            ticks2 = [], bardata = [];
            ticks = null, bardata = null;
            tick3 = null, bardata = null;
            $scope.getdacmdacCount(date);
            tick3 = [], bardata = [];
            $scope.getpaymentCount(date);
            $scope.GetHierarchy();

        }

        // $scope.divshow = true;
        //$scope.divhide = false;
        //$scope.disabled = true;
        $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var codeofuser = "";
        if ($sessionStorage.CUserCode != null) {
            var Hsfor = 'CO';
            codeofuser = $sessionStorage.CUserCode;
        }
        else if ($sessionStorage.PUserCode != null) {
            var Hsfor = 'PG';
            codeofuser = $sessionStorage.PUserCode;
        }
        $scope.GetHierarchy = function () {
            $sessionStorage.codefor = null;
            // $scope.CUserCode = CUserCode != null ? 130007 : 130186;
            var finalurl;
            $scope.finaldisplayname;
            if ($sessionStorage.CUserCode == undefined || $sessionStorage.CUserCode == null)
                finalurl = 'Dashboard/GetPushpamUserDashboardSummery?Date=' + $scope.date1 + '&RoleCode=' + $sessionStorage.RoleCode + '&UserCode=' + codeofuser + '';
            else
                finalurl = 'Dashboard/GetUserDashboardSummery?Date=' + $scope.date1 + '&RoleCode=' + $sessionStorage.RoleCode + '&UserCode=' + codeofuser + '';

            $http({
                method: 'GET',
                url: uriadmin + finalurl,
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.gridOptions1.data = response.data.Data.Table;
                    if ($sessionStorage.CUserCode == undefined || $sessionStorage.CUserCode == null) {
                        $scope.columns = [];
                        $scope.columns =
                            [
                              { name: 'CUserCode', displayName: 'CUserCode', enableColumnMenu: false, cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableHiding: false, enableRowGroup: true, rowGroup: false },
                              { name: 'RMName', displayName: 'Regional Manager', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, grouping: { groupPriority: 0 }, enableColumnMenu: false, enableHiding: false, cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>', },
                              { name: 'SOName', displayName: 'Area Manager', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                            ];
                        $scope.gridOptions1.columnDefs = $scope.columns;
                    }
                    else {
                        $scope.columns = null;
                        $scope.columns =
                            [
                               { name: 'CUserCode', displayName: 'CUserCode', enableColumnMenu: false, cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false, enableHiding: false, enableRowGroup: true, rowGroup: false },
                               { name: 'RMName', displayName: 'Regional Manager', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, grouping: { groupPriority: 0 }, enableColumnMenu: false, enableHiding: false, cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>', },
                               { name: 'SOName', displayName: 'Sales Officer', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
                            ];
                        $scope.gridOptions1.columnDefs = $scope.columns;
                    }

                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    SmartAlert.Errmsg(response.data.Message);
                }
            })
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
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            columnDefs: $scope.columns,
            enableGridMenu: true,
            enableSelectAll: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.index = 0;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {

                        $scope.rowvalueSOUserCode = row.entity.SOUserCode;
                        $('[href="#s1"]').tab('show');
                        if ($sessionStorage.CUserCode == undefined || $sessionStorage.CUserCode == null) {

                            var Hsfor = 'PG';
                        }
                        else {
                            var Hsfor = 'CO';
                        }

                        var base65 = base64.encode(Name + ':' + Password);
                        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
                        $http.get(uriadmin + 'Dashboard/GetDashboardHierarchySummery?Date=' + $scope.date1 + '&UserCode=' + $scope.rowvalueSOUserCode + '&HsFor=' + Hsfor)
                    .then(function (response) {
                        if (response.data.StatusCode == 1) {
                            $sessionStorage.codefor = $scope.rowvalueSOUserCode;
                            $scope.getdelundelCount($scope.date1);
                            $scope.getdacmdacCount($scope.date1);
                            $scope.getpaymentCount($scope.date1);
                            $scope.all = response.data.Data[0];
                            $scope.PendingDelivery1 = $scope.all.PendingDelivery;
                            $scope.TotalDeliveredCount1 = $scope.all.TotalDeliveredCount;
                            $scope.CardDeliveredCount1 = $scope.all.CardDeliveredCount;
                            $scope.DACDeliveredCount1 = $scope.all.DACDeliveredCount;
                            $scope.UndeliveredAttempts1 = $scope.all.UndeliveredAttempts;
                            $scope.CashPayCount1 = $scope.all.CashPayCount;
                            $scope.DigitalPayCount1 = $scope.all.DigitalPayCount;
                            var cash = $scope.CashPayCount1;
                            var cash1 = $scope.DigitalPayCount1;
                            var cashtotal = cash + cash1;
                            $scope.TotalPayment1 = cashtotal; //$scope.all.TotalPayment;
                            $scope.AdvancePayments1 = $scope.all.AdvancePayments;
                            $scope.AppBookings1 = $scope.all.AppBookings;
                            $scope.NewCards1 = $scope.all.NewCards;
                            $scope.OnFieldDMan1 = $scope.all.OnFieldDMan;

                            if (Number($scope.TotalDeliveredCount1) == 0) {
                                $scope.pendper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal4 = [$scope.pendper, 100 - $scope.pendper];
                            }
                            else {
                                $scope.pendper = (Number($scope.PendingDelivery1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal4 = [$scope.pendper, 100 - $scope.pendper];
                            }
                            if (Number($scope.TotalDeliveredCount1) == 0) {
                                $scope.refillper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal = [$scope.refillper, 100 - $scope.refillper];
                            }
                            else {
                                $scope.refillper = (Number($scope.TotalDeliveredCount1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal = [$scope.refillper, 100 - $scope.refillper];
                            }

                            if (Number($scope.TotalDeliveredCount1) == 0) {
                                $scope.cardper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal1 = [$scope.cardper, 100 - $scope.cardper];

                            }
                            else {
                                $scope.cardper = ((Number($scope.CardDeliveredCount1) / Number($scope.TotalDeliveredCount1))) * 100;
                                $scope.labels = ["", ""];
                                $scope.dataTotal1 = [$scope.cardper, 100 - $scope.cardper];

                            }
                            if (Number($scope.TotalDeliveredCount1) == 0) {
                                $scope.DACper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal2 = [$scope.DACper, 100 - $scope.DACper];

                            }
                            else {
                                $scope.DACper = ((Number($scope.DACDeliveredCount1) / Number($scope.TotalDeliveredCount1))) * 100;
                                $scope.labels = ["", ""];
                                $scope.dataTotal2 = [$scope.DACper, 100 - $scope.DACper];

                            }



                            if (Number($scope.TotalDeliveredCount1) == 0) {
                                $scope.undelper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal3 = [$scope.undelper, 100 - $scope.undelper];
                            }
                            else {
                                $scope.undelper = Number(Number($scope.UndeliveredAttempts1) / (Number($scope.TotalDeliveredCount1) + Number($scope.PendingDelivery1)) * 100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal3 = [$scope.undelper, 100 - $scope.undelper];
                            }
                            if (Number($scope.TotalPayment1) == 0) {
                                $scope.cashper = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal5 = [$scope.cashper, 100 - $scope.cashper];
                            }
                            else {
                                $scope.cashper = Number($scope.CashPayCount1) / Number($scope.TotalPayment1) * Number(100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal5 = [$scope.cashper, 100 - $scope.cashper];

                            }
                            if (Number($scope.TotalPayment1) == 0) {
                                $scope.digper = 0
                                $scope.labels = ["", ""];
                                $scope.dataTotal6 = [$scope.digper, 100 - $scope.digper];
                            }
                            else {
                                $scope.digper = Number($scope.DigitalPayCount1) / Number($scope.TotalPayment1) * Number(100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal6 = [$scope.digper, 100 - $scope.digper];
                            }
                            if (Number($scope.TotalPayment1) == 0) {
                                $scope.TotalPer = 0;
                                $scope.labels = ["", ""];
                                $scope.dataTotal7 = [$scope.TotalPer, 100 - $scope.TotalPer];
                            }
                            else {
                                $scope.TotalPer = Number($scope.TotalPayment1) / Number($scope.TotalPayment1) * Number(100);
                                $scope.labels = ["", ""];
                                $scope.dataTotal7 = [$scope.TotalPer, 100 - $scope.TotalPer];
                            }




                        }
                        else {
                            $sessionStorage.codefor = $scope.rowvalueSOUserCode;
                            $scope.getdelundelCount($scope.date1);
                            $scope.getdacmdacCount($scope.date1);
                            $scope.getpaymentCount($scope.date1);
                            $scope.TotalDeliveredCount1 = 0;
                            $scope.refillper = 0;
                            $scope.digper = 0;
                            $scope.cashper = 0;
                            $scope.cardper = 0;
                            $scope.DACper = 0;
                            $scope.TotalPer = 0;
                            $scope.pendper = 0;
                            $scope.CardDeliveredCount1 = 0;
                            $scope.DACDeliveredCount1 = 0;
                            $scope.UndeliveredAttempts1 = 0;
                            $scope.undelper = 0;
                            $scope.PendingDelivery1 = 0;
                            $scope.CashPayCount1 = 0;
                            $scope.DigitalPayCount1 = 0;
                            $scope.TotalPayment1 = 0;
                            $scope.AdvancePayments1 = 0;
                            $scope.AppBookings1 = 0;
                            $scope.NewCards1 = 0;
                            $scope.OnFieldDMan1 = 0;
                            $scope.dataTotal = [0, 0];
                            $scope.dataTotal1 = [0, 0];
                            $scope.dataTotal2 = [0, 0];
                            $scope.dataTotal3 = [0, 0];
                            $scope.dataTotal4 = [0, 0];
                            $scope.dataTotal5 = [0, 0];
                            $scope.dataTotal6 = [0, 0];
                            $scope.dataTotal7 = [0, 0];

                        }

                    })
                        // $scope.getAllCount($scope.date1)

                    }
                    else {

                    }
                });
            },
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Vendor Comparision.xlsx',
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
                cols.push({ value: 'Vendor Comparision', metadata: { style: formatterId.id } });
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


        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

        //  $scope.GetHierarchy();



        $scope.GetExcel = function (valid) {
            if (valid) {
                window.location.href = uriadmin + 'VendorComparison/VendorComparisonReport?ProductCode=' + $scope.compare.ProductCode + '&Quantity=' + $scope.compare.Quantity;
            }
        };

        $scope.productData = [];
        $scope.select = function (productData) {
            if (productData != null) {
                productData.IsPreferred = "Y";
                productData.Area = productData.Area == null ? null : productData.Area;
                productData.Quantity = productData.MinQty == null ? null : productData.MinQty;
                productData.Amount = productData.Amount == null ? null : productData.Amount;
                $scope.productData.push(productData)
            }
        }
        $scope.Save = function (valid) {
            if (valid) {
                $scope.divshow = false;
                $scope.divhide = true;
                $scope.productQData = [];
                if ($scope.productData.length != 0) {
                    for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                        if ($scope.gridOptions1.data[i].IsPreferred == "N" || $scope.gridOptions1.data[i].IsPreferred == false) {
                            $scope.productQData.push({ PartCode: $scope.gridOptions1.data[i].PartCode, ProductCode: $scope.gridOptions1.data[i].ProductCode, IsPreferred: "N", VendId: $scope.gridOptions1.data[i].VendId });
                        }
                        else {
                            $scope.productQData.push({ PartCode: $scope.gridOptions1.data[i].PartCode, ProductCode: $scope.gridOptions1.data[i].ProductCode, IsPreferred: "Y", VendId: $scope.gridOptions1.data[i].VendId });
                        }
                    }
                    $scope.productQData = { Data: $scope.productQData };
                    $scope.productQData.UserCode = $localStorage.UserId;
                    $http.post(uriadmin + 'Product/IUDComparisionSheet', $scope.productQData).then(function (response) {
                        if (response.data.StatusCode != 0) {
                            SmartAlert.SuccessGrid(response.data.Message);
                        }
                        else {
                            SmartAlert.Errmsg(response.data.Message);
                        }
                        $scope.divshow = true;
                        $scope.divhide = false;
                    })
                }
                else {
                    SmartAlert.Errmsg('Please select at least one record from table');
                    $scope.divshow = true;
                    $scope.divhide = false;
                }
            }
        }
    }
});
app.controller('NewsDisplayController', function ($http, $scope, $filter, $window, $interval, $state, $localStorage, $sessionStorage, $rootScope, base64, uri, uriadmin, Name, Password, flag) {
    var flagvalue = flag;  
    var dashvalue = '/dashboard/dashboard_gogas';
    $rootScope.$on("CallParentMethod", function () {
        $scope.GetNews();
    });

    $scope.GetNews = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "GET",
            url: uriadmin + 'master/GetNews?NewsId&Location&Application&IsActive=Y'
        }).then(function (response) {
            if (response.data.StatusCode != 0) {
                $scope.news = [];
                $scope.conf = {
                    news_length: false,
                    news_pos: 200,
                    news_margin: 20,
                    news_move_flag: true
                };
                $scope.allItems = [];
                for (var i = 0; i < response.data.Data.length; i++) {
                    if ($window.location.pathname == "/login" || $window.location.pathname == "/forgot-password") {
                        if (response.data.Data[i].nLocation == 'H' && response.data.Data[i].nApplication == 'PU') {
                            $scope.allItems.push({ "title": response.data.Data[i].NewsHead, "nMarkBold": response.data.Data[i].nMarkBold });
                        }
                    }
                    else  {
                        if (response.data.Data[i].nLocation == 'D' && response.data.Data[i].nApplication == 'PU') {
                            $scope.allItems.push({ "title": response.data.Data[i].NewsHead, "nMarkBold": response.data.Data[i].nMarkBold });
                        }
                     }

                }

                $scope.init = function () {
                    $scope.news = data;
                    $interval($scope.news_move, 50);

                };
            }
        })
    }
    $scope.GetNews();
    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
    $scope.go = function (attrs) {
        $state.go('app.dashboard.dashboard_My_Express_gas');
    }
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();

});
appdash.controller('ChangePasswordController', function ($http, $scope, $filter, $window, $timeout, $state, $localStorage, uriadmin, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {

    $scope.divshow = true;
    $scope.divhide = false;
    $scope.EmailAdd = $sessionStorage.EmailAddress;
    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
    $scope.inputTypeOne = 'password';
    $scope.inputTypeTwo = 'password';
    $scope.inputTypeZero = 'password';
    $scope.classNameOne = 'glyphicon-eye-close';
    $scope.classNameTwo = 'glyphicon-eye-close';
    $scope.classNameZero = 'glyphicon-eye-close';
    $scope.HideShowPasswordOne = function () {
        if ($scope.inputTypeOne == 'password') {
            $scope.inputTypeOne = 'text';
            $scope.classNameOne = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeOne = 'password';
            $scope.classNameOne = 'glyphicon-eye-close';
        }
    };
    $scope.HideShowPasswordTwo = function () {
        if ($scope.inputTypeTwo == 'password') {
            $scope.inputTypeTwo = 'text';
            $scope.classNameTwo = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeTwo = 'password';
            $scope.classNameTwo = 'glyphicon-eye-close';
        }
    };
    $scope.HideShowPasswordZero = function () {
        if ($scope.inputTypeZero == 'password') {
            $scope.inputTypeZero = 'text';
            $scope.classNameZero = 'glyphicon-eye-open';
        }
        else {
            $scope.inputTypeZero = 'password';
            $scope.classNameZero = 'glyphicon-eye-close';
        }
    };


    $scope.checkValidPassword = function () {
        if ($scope.change) {
            if ($sessionStorage.UserPwd == $scope.change.OldPawd) {
                $scope.msg1 = false;
                if ($scope.change.OldPawd != $scope.change.NewPawd) {
                    $scope.msg2 = false;
                    if ($scope.change.NewPawd == $scope.change.confPawd) {
                        $scope.msg3 = false;
                    }
                    else {
                        $scope.msg3 = true;
                    }
                }
                else {
                    $scope.msg2 = true;
                    if ($scope.change.NewPawd != $scope.change.confPawd && $scope.change.confPawd != null && $scope.change.confPawd != "") {
                        $scope.msg3 = true;
                    }
                    else {
                        $scope.msg3 = false;
                    }
                }
            }
            else {
                $scope.msg1 = true;
                if ($scope.change.OldPawd == $scope.change.NewPawd) {
                    $scope.msg2 = true;
                }
                else {
                    $scope.msg2 = false;
                }
            }
        }
    }

    $scope.changePassword = function (valid, email) {

        if (valid == true && $scope.msg1 == false && $scope.msg2 == false && $scope.msg3 == false) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.change.EmailAdd = email;
            $scope.change.UserCode = $sessionStorage.ucode;
            if ($localStorage.PUserCode != null)
                $scope.change.UserType = 'PU';
            else if ($localStorage.CUserCode != null)
                $scope.change.UserType = 'IO';
            var json = angular.toJson($scope.change)
            $scope.source_string = json;
            var encrypted = CryptoJS.AES.encrypt(
            $scope.source_string,
            $rootScope.base64Key,
            { iv: $rootScope.base64Key }
            );
            $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            $http({
                method: "POST",
                url: uriadmin + 'Master/changepassword',
                data: {
                    Data: $scope.ciphertext
                }
            }).then(function (response) {
                if (response.data.StatusCode == 1) {
                    SmartAlert.Success(response.data.Message);
                    $scope.divshow = true;
                    $scope.divhide = false;
                    $sessionStorage.UserPwd = $scope.change.NewPawd;
                    $scope.clear();
                    $state.go('app.dashboard.dashboard_My_Express_gas')

                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.msg1 = '';
                $scope.msg2 = '';
                $scope.divshow = true;
                $scope.divhide = false;
            });
        }

        else {
            $scope.divshow = true;
            $scope.divhide = false;
        }

    };

    $scope.clear = function () {
        $scope.change.OldPawd = '';
        $scope.change.NewPawd = '';
        $scope.change.confPawd = '';

    }

    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;

    };
    $scope.ClearDistSession();

});
appdash.controller('PhotoUploadController', function ($http, $scope, $filter, $window, $localStorage, uriuserimage, $timeout, $state, $rootScope, $sessionStorage, base64, $imagebase64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    $scope.FirstName = $sessionStorage.FirstName;
    $scope.LastName = $sessionStorage.LastName;
    $scope.getImage = function () {

        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uriadmin + 'setting/GetPushpamUsers',
            params:
                { PUserCode: $sessionStorage.ucode, EmailAddress: $sessionStorage.EmailAddress, IsActive: 'Y', RoleCode: $sessionStorage.RoleCode }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {

                var alldata = response.data.Data;
                $scope.details = alldata[0];
                var nimg1 = uriuserimage + $scope.details.ImageName;

                if ($scope.details.ImageName == null || $scope.details.ImageName == '' || $scope.details.ImageName == undefined) {
                    $scope.filepreview = 'css/images/no-image.png';
                }
                else {
                    $scope.filepreview = nimg1;
                }
                $sessionStorage.filename = $scope.details.ImageName;
            }
            else {
            }
        })
    }
    $scope.getImage();
    $scope.UploadPhoto = function (valid, ImageName) {

        if (valid == true && ImageName != null && ImageName != undefined) {
            $scope.divshow = false;
            $scope.divhide = true;
            if ($scope.filepreview == '' || $scope.filepreview == undefined || $scope.filepreview == null) {
                SmartAlert.Errmsg("Please select image");
                $scope.divshow = true;
                $scope.divhide = false;
            }
            else {
                if ($sessionStorage.ucode == $localStorage.PUserCode) {
                    $scope.Company = 'Pushpam';
                }
                else {
                    var flagvalue = flag;
                    if (flagvalue == 'I') {
                        $scope.Company = 'Client';
                    }
                    if (flagvalue == 'E') {
                        $scope.Company = 'Client';
                    }
                    if (flagvalue == 'H') {
                        $scope.Company = 'Client';
                    }
                }
                if ($sessionStorage.ImageData != null) {
                    fileName = ImageName.filename;
                    $scope.upfilename = fileName;
                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var ext = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (ext == 'jpeg' || ext == 'jpg' || ext == 'gif' || ext == 'bmp' || ext == 'png') {
                        $scope.getAuth();
                    }
                    else {
                        SmartAlert.Errmsg("Please select only image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                }
                else {
                    if ($sessionStorage.filename != null) {
                        SmartAlert.Errmsg("Please browse the new image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                        $sessionStorage.filename = null;
                    }
                    else {
                        SmartAlert.Errmsg("Please browse the new image");
                        $scope.divshow = true;
                        $scope.divhide = false;
                    }
                }
            }
        }
        else {
            $scope.divshow = true;
            $scope.divhide = false;
            SmartAlert.Errmsg("Please browse the new image");
        }
    };
    $scope.getAuth = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
            url: uriadmin + 'Master/UpdateProfileImage',
            data: {
                UserCode: $sessionStorage.ucode,
                Data: $sessionStorage.ImageData,
                Company: $scope.Company
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.divshow = true;
                $scope.divhide = false;
                SmartAlert.Success(response.data.Message);
                //var h = setInterval(function () {
                $state.go('app.dashboard.dashboard_My_Express_gas');
                //    window.clearInterval(h);
                //}, 3000);
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
            $sessionStorage.ImageData = "";
        }
    }

});
appdash.controller('HierarchyDashboardGridController', function ($http, $scope, $filter, $window, $localStorage, uriuserimage, $timeout, $state, $rootScope, $sessionStorage, base64, $imagebase64, SmartAlert, uri, uriadmin, Name, Password, flag) {
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.disabled = true;
    $scope.date1 = $filter('date')(new Date(), 'dd-MMM-yyyy');
    $scope.GetHierarchy = function () {

        $http({
            method: 'GET',
            url: uriadmin + 'Dashboard/GetUserDashboardSummery?Date=2018-05-30&UserCode=130186',
            //uriadmin + 'Dashboard/GetUserDashboardSummery?Date=2018-05-30&UserCode=130186'
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {

                $scope.gridOptions1.data = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetHierarchy();
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
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        columnDefs:
        [

        {
            name: 'RoleCode', displayName: 'RoleCode', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,
            grouping: { groupPriority: 1 },
            enableColumnMenu: false,
            cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>'
        },
          //{
          //    name: 'MinQty', displayName: 'Minimum Quantity', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,
          //    grouping: { groupPriority: 2 },
          //    enableColumnMenu: false,
          //    cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>'
          //},


        ],
        enableGridMenu: true,
        enableSelectAll: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.index = 0;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                //if (row.isSelected) {
                //    for (i = 0; i <= $scope.gridOptions1.data.length; i++) {
                //        if ($scope.productData[i] != null) {
                //            if ($scope.productData[i].PartCode == row.entity.PartCode) {
                //                $scope.gridApi.selection.unSelectRow(row.entity);
                //                SmartAlert.Errmsg('Part already selected');
                //            }
                //        }
                //    }
                //    $scope.productData = $scope.gridApi.selection.getSelectedRows();
                //    $scope.index = $scope.gridOptions1.data.indexOf(row.entity);
                //    $scope.gridOptions1.data[$scope.index].IsPreferred = 'Y';
                //}
                //else {
                //    $scope.index = $scope.gridOptions1.data.indexOf(row.entity);
                //    $scope.gridOptions1.data[$scope.index].IsPreferred = 'N';
                //    for (i = 0; i < $scope.productData.length; i++) {
                //        if ($scope.productData[i].PartCode == row.entity.PartCode)
                //            $scope.productData.splice(i, 1);
                //    }
                //}
            });
        },
        //gridMenuCustomItems: [{
        //    title: 'Export all data as xls',
        //    action: function ($event) {
        //        alasql('SELECT * INTO XLS("Vendor Comparision.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
        //    },
        //    order: 110
        //}]

        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'Vendor Comparision.xlsx',
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
            // save the formatter
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
            // save the formatter
            $scope.formatters['red'] = formatter;

            Object.assign(docDefinition.styles, $scope.formatters);

            return docDefinition;
        },
        exporterExcelHeader: function (grid, workbook, sheet, docDefinition) {
            // this can be defined outside this method
            var stylesheet = workbook.getStyleSheet();
            var aFormatDefn = {
                "font": { "size": 15, "fontName": "Calibri", "bold": true },
                "alignment": { "wrapText": true }
            };
            var formatterId = stylesheet.createFormat(aFormatDefn);

            // excel cells start with A1 which is upper left corner
            sheet.mergeCells('B1', 'C1');
            var cols = [];
            // push empty data
            cols.push({ value: '' });
            // push data in B1 cell with metadata formatter
            cols.push({ value: 'Vendor Comparision', metadata: { style: formatterId.id } });
            sheet.data.push(cols);
        },
        exporterFieldFormatCallback: function (grid, row, gridCol, cellValue) {
            // set metadata on export data to set format id. See exportExcelHeader config above for example of creating
            // a formatter and obtaining the id
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

    var base65 = base64.encode(Name + ':' + Password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;

    //  $scope.GetHierarchy();

    $scope.exeldisabe = function () {
        $scope.disabled = true;
    }



    $scope.GetProductForComp = function (valid) {
        if (valid) {
            $http.get(uriadmin + 'Product/GetVendorComparisonReport?ProductCode=' + $scope.compare.ProductCode + '&Quantity=' + $scope.compare.Quantity).then(function (response) {
                if (response.data.StatusCode != 0) {
                    $scope.gridOptions1.data = response.data.Data;
                    $rootScope.ProductName = response.data.Data[0].ProductName;
                    $rootScope.ProductCode = response.data.Data[0].ProductCode;
                    // SmartAlert.SuccessGrid(response.data.Message);
                    $scope.productData = [];
                    $timeout(function () {
                        for (j = 0; j < $scope.gridOptions1.data.length; j++) {
                            if ($scope.gridOptions1.data[j].IsPreferred == true) {
                                if ($scope.gridApi.selection.selectRow) {
                                    $scope.gridApi.selection.selectRow($scope.gridOptions1.data[j]);
                                }
                            }
                        }
                    });
                    $scope.disabled = false;
                }
                else {
                    $scope.gridOptions1.data.length = 0;
                    $scope.productData = [];
                    SmartAlert.Errmsg(response.data.Message);
                    $scope.disabled = true;
                }
                // $scope.mystyle1.caption.title = 'Vendor Comparision for ' + $rootScope.ProductName + '(' + $rootScope.ProductCode + ')';

            })
        }
    }

    $scope.GetExcel = function (valid) {
        if (valid) {
            window.location.href = uriadmin + 'VendorComparison/VendorComparisonReport?ProductCode=' + $scope.compare.ProductCode + '&Quantity=' + $scope.compare.Quantity;
        }
    };

    $scope.productData = [];
    $scope.select = function (productData) {
        if (productData != null) {
            productData.IsPreferred = "Y";
            productData.Area = productData.Area == null ? null : productData.Area;
            productData.Quantity = productData.MinQty == null ? null : productData.MinQty;
            productData.Amount = productData.Amount == null ? null : productData.Amount;
            $scope.productData.push(productData)
        }
    }
    $scope.Save = function (valid) {
        if (valid) {
            $scope.divshow = false;
            $scope.divhide = true;
            $scope.productQData = [];
            if ($scope.productData.length != 0) {
                for (i = 0; i < $scope.gridOptions1.data.length; i++) {
                    if ($scope.gridOptions1.data[i].IsPreferred == "N" || $scope.gridOptions1.data[i].IsPreferred == false) {
                        $scope.productQData.push({ PartCode: $scope.gridOptions1.data[i].PartCode, ProductCode: $scope.gridOptions1.data[i].ProductCode, IsPreferred: "N", VendId: $scope.gridOptions1.data[i].VendId });
                    }
                    else {
                        $scope.productQData.push({ PartCode: $scope.gridOptions1.data[i].PartCode, ProductCode: $scope.gridOptions1.data[i].ProductCode, IsPreferred: "Y", VendId: $scope.gridOptions1.data[i].VendId });
                    }
                }
                $scope.productQData = { Data: $scope.productQData };
                $scope.productQData.UserCode = $localStorage.UserId;
                $http.post(uriadmin + 'Product/IUDComparisionSheet', $scope.productQData).then(function (response) {
                    if (response.data.StatusCode != 0) {
                        SmartAlert.SuccessGrid(response.data.Message);
                    }
                    else {
                        SmartAlert.Errmsg(response.data.Message);
                    }
                    $scope.divshow = true;
                    $scope.divhide = false;
                })
            }
            else {
                SmartAlert.Errmsg('Please select at least one record from table');
                $scope.divshow = true;
                $scope.divhide = false;
            }
        }
    }

});