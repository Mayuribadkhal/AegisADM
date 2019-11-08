appdash.controller('ManageQuestionMasterGridController', function ($http, $scope, $filter, $timeout, uriadmin,userService, urisafety, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    var valueof = userService.Success('FA');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {
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
                    title: 'Inspection Questions',
                },
                column: {
                    style: 'font-size:15px;color:black'
                },
                columns: [
             { columnid: 'QrefNo', title: 'Question Ref. No' },
             { columnid: 'QuestionType', title: 'Question Type' },
             { columnid: 'Question', title: 'Questions' },
             { columnid: 'Mandatory', title: 'Mandatory?' },
              { columnid: 'Points', title: 'Rating' },
             { columnid: 'Question', title: 'Questions' },
             { columnid: 'Mandatory', title: 'Mandatory?' },
              { columnid: 'isactive', title: 'Is Active' },
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
             { name: 'id', displayName: 'id', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: false },
           { name: 'QrefNo', displayName: 'Question Ref. No', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'QuestionType', displayName: 'Question Type', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'Question', displayName: 'Question', width: "500", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
              { name: 'Mandatory', displayName: 'Mandatory ?', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'Points', displayName: 'Rating', width: "*", cellClass: 'grid-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'RightAnswer', displayName: 'Right Answer', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },

            { name: 'isactive', displayName: 'Is Active', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            {
                name: 'Edit', displayName: 'Edit', headerCellTemplate: '<div></div>',
                cellTemplate: '<button class="btn-info btn-xs"  ng-click="grid.appScope.select(row.entity.id)" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>',
                width: "*"
                , enableFiltering: false,
            }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: 'Inspection Questions.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 10, 10, 10] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'blue' },
            exporterPdfHeader: { text: "Inspection Questions", style: 'headerStyle', alignment: 'center', color: 'Black' },
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
                title: 'Export all data as xls',
                action: function ($event) {
                    alasql('SELECT * INTO XLS("Inspection Questions.xls",?) FROM ?', [$scope.mystyle[0], $scope.gridOptions1.data]);
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
            $http({
                method: 'GET',
                url: urisafety + 'Safety/getQuestions',
                params:
                    {
                        Qtype: null, LanguageCode: null, IsActive: '', InspType: ''

                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $sessionStorage.grddata = response.data.Data;
                    $scope.gridOptions1.data = $sessionStorage.grddata;
                    if ($sessionStorage.mflag == 'SF') {
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

        };
       
        $scope.select = function (id) {
            
            $sessionStorage.id = id;
            $sessionStorage.mflag = 'SF';
            $state.go('app.dashboard.manage_question_master');
        }
        $scope.clear1 = function () {
            $sessionStorage.id = null;
            $sessionStorage.mflag = 'SF';
        }
        if ($sessionStorage.mflag == 'SF')
            $scope.GetSearch();
        $scope.gridOptions1.data = $sessionStorage.grddata;
    }
});

appdash.controller('ManageQuestionMasterController', function ($http, $scope, $filter, $timeout, uri, uriadmin, urisafety, $state, $rootScope, $sessionStorage, base64, SmartAlert, Name, Password) {
    $scope.ClearDistSession = function () {
        $sessionStorage.ConnectDistCode = null;
        $sessionStorage.ConnectDistName = null;
        $sessionStorage.ConnectCity = null;
    }
    $scope.ClearDistSession();

    $scope.submit = 'Submit';
    $scope.divshow = true;
    $scope.divhide = false;
    $scope.mshow = false;

    $scope.GetAllLanguage = function () {
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: uri + 'Distributor/GetLanguageInfo',
            params:
                {
                    LangCode: null, LangDesc: null,  IsActive: 'Y'

                }
        }).then(function (response) {
            if (response.data.Data != null || response.data.Data == 0) {
                $scope.getlang = response.data.Data;
            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
        })
    }
    $scope.GetAllLanguage();

    $scope.Rating = function (safety) {
        $scope.safety = safety;
        if($scope.safety.Rating>100)
        {
            $scope.errorMessage = "Rating should be less or equal to 100";
            document.getElementById('btnrating').disabled = true;
        }
        else
        {
            $scope.errorMessage = "";
            document.getElementById('btnrating').disabled = false;
        }

    }

    $scope.Getquestions = function () {
        
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: 'GET',
            url: urisafety + 'Safety/getQuestions',
            params:
                {
                    Qtype: null, LanguageCode: 'EN', IsActive: '', InspType: ''

                }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.getquestions = response.data.Data;
            }
            else {
              
                SmartAlert.Errmsg(response.data.Message);

            }
           
        })

    };
    $scope.Getquestions();
    $scope.GetquestionIdWise = function () {
        
        if ($sessionStorage.id != null) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            $http({
                method: 'GET',
                //url: uriadmin + 'Safety/getQuestions',
                url: uriadmin + 'Safety/getQuestions',
                params:
                    {
                        id: $sessionStorage.id, Qtype: null, LanguageCode: null, IsActive: '', InspType: ''
                    }
            }).then(function (response) {
                if (response.data.Data != null || response.data.Data == 0) {
                    $scope.idwisequest = response.data.Data;
                    $scope.safety = $scope.idwisequest[0];
                   
                    $scope.safety.Qtype = $scope.safety.QuestionType;
                    $scope.safety.LanguageCode = $scope.safety.LanguageCode;
                    if ($scope.safety.LanguageCode == 'EN')
                        $scope.mshow = false;
                    else
                        $scope.mshow = true;
                    $scope.safety.Isactive = $scope.safety.isactive;
                    $scope.safety.QrefNo = $scope.safety.QrefNo;                   
                    $scope.safety.Qdesc = $scope.safety.Question;
                    $scope.safety.Rating = $scope.safety.Points;
                    $scope.safety.CorrectAnswer = $scope.safety.RightAnswer;
                    $scope.safety.IsMandatory = $scope.safety.Mandatory;
                    $scope.safety.Isactive = $scope.safety.Isactive;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }
                $scope.submit = 'Update';

            })
            //  $sessionStorage.dCode = null

        }
    }
    $scope.GetquestionIdWise();
    $scope.dropdownshow = function (Lcode)
    {
        if (Lcode == 'EN')
            $scope.mshow = false;
        else
            $scope.mshow = true;
    }
    $scope.SaveInspectionQuestions = function (valid, safety) {
        
        if (valid == true) {
            $scope.divshow = false;
            $scope.divhide = true;

            if ("id" in safety) {
                if ($scope.safety.LanguageCode == 'EN')
                    $scope.safety.QrefNo = null;
                else
                    $scope.safety.QrefNo = $scope.safety.QrefNo;
                $scope.safety.AnsCntrlType = null;
               
                $scope.safety.CntrlString = null;
                $scope.safety.Version = '2';
                $scope.safety.InspType = 'MD';
                $scope.safety.Flag = 'UP';
                $scope.safety.CreatedBy = $sessionStorage.ucode;
                var json = angular.toJson($scope.safety)
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
                $scope.safety = safety;
                if ($scope.safety.LanguageCode == 'EN')
                    $scope.safety.QrefNo = null;
                else
                    $scope.safety.QrefNo = $scope.safety.QrefNo;
                $scope.safety.AnsCntrlType = null;
                $scope.safety.CntrlString = null;
                $scope.safety.Isactive = 'Y';
                $scope.safety.Version = '2';
                $scope.safety.InspType = 'MD';
                $scope.safety.Flag = 'IN';
                $scope.safety.CreatedBy = $sessionStorage.ucode;
                var json = angular.toJson($scope.safety)
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
        if ($scope.mshow == true && ($scope.safety.QrefNo == null || $scope.safety.QrefNo == undefined))
        {
            SmartAlert.Errmsg('Please select reference question.');
            $scope.divshow = true;
            $scope.divhide = false;
           
        }
        else{
        var base65 = base64.encode(Name + ':' + Password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
        $http({
            method: "POST",
             url: uriadmin + 'Safety/postquestionmaster',
            
            data: {
                Data: $scope.ciphertext
            }
        }).then(function (response) {
            if (response.data.StatusCode == 1) {
              
                $scope.divshow = true;
                $scope.divhide = false;
                $scope.SmartCardDisable = true;
                SmartAlert.Success(response.data.Message);
                var h = setInterval(function () {
                    $state.go('app.dashboard.manage_question_master_grid');
                    window.clearInterval(h);
                }, 3000);
               
                $scope.submit = 'Submit';
              

            }
            else {
                SmartAlert.Errmsg(response.data.Message);
            }
            $scope.divshow = true;
            $scope.divhide = false;
        });
    }
    }
    $scope.clear = function () {
        $scope.dist.DistrictName = '';
        $scope.dist.StatusCode = '';
        $scope.dist.IsActive = '';
    }

});

appdash.controller('PDCController', function ($http, $scope, $filter, $timeout, $state, $rootScope, userService, $sessionStorage, base64, SmartAlert, uri, urianalysis, uriadmin, Name, Password, flag) {
    var valueof = userService.Success('FB');
    $sessionStorage.currentstate = $state.current.name;
    if (valueof == 'N') {
    }
    else {

        $scope.divshow = true;
        $scope.divhide = false;

        document.getElementById('fd').onkeydown = function () { return false; }
        document.getElementById('td').onkeydown = function () { return false; }

        $scope.PDC = { Startdate: $filter('date')(new Date(), 'dd-MMM-yyyy') };
        $scope.PDC.EndDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
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
             { name: 'DistCode', displayName: 'Distributor Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'AreaName', displayName: 'Area Name', width: "620", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'CashMemoNo', displayName: 'Cash Memo No', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'ConsNo', displayName: 'Consumer No', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             //{ name: 'DBCode', displayName: 'Without weight Delivery', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
             { name: 'DangerZone', displayName: 'Danger Zone', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'View', displayName: 'View', headerCellTemplate: '<div>Details</div>', cellTemplate: '<button class="btn-info btn-xs"  data-toggle="modal" data-target="#pdc_modal" ng-click="grid.appScope.GetPDCDetails(row.entity)" data-title="Edit"><span class="glyphicon glyphicon-eye-open"> View</span></button>', width: "70", enableFiltering: false, },
            ],
            enableGridMenu: false,
            enableSelectAll: true,
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
                title: 'Export all data as xls',
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


        $scope.GetPDCReport = function (PDC, valid) {

            $scope.divshow = false;
            $scope.divhide = true;
            if (PDC.Consno == undefined) {
                PDC.Consno = '';

            }
            $sessionStorage.Sdate = PDC.Startdate;
            $sessionStorage.Edate = PDC.EndDate;
            if (valid && PDC != null) {

                $http.get(urianalysis + 'GetPDCSummary?distcode=' + PDC.DistCode + '&Consno=' + PDC.Consno + '&AreaCode&DbCode&Sdate=' + PDC.Startdate + '&Edate=' + PDC.EndDate).then(function (response) {

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

        $scope.GetPDCDetails = function (data) {

            $http.get(urianalysis + 'GetPDCDetails?distcode=' + data.DistCode + '&Consno=' + data.ConsNo + '&cashmemono=' + data.CashMemoNo + '&AreaCode&DbCode&Sdate=' + $sessionStorage.Sdate + '&Edate=' + $sessionStorage.Edate).then(function (response) {
                if (response.data.StatusCode == 1) {
                    $scope.data = response.data.Data;
                    $scope.RCons = $scope.data[0].ConsNo;
                    $scope.RCashM = $scope.data[0].cashmemono;
                    $scope.RDangZ = $scope.data[0].DangerZone;
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);

                }
            })
        }
    }
});