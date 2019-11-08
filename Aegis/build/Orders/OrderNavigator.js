appdash.controller('OrderNavigatorController', function ($scope, $http, $state, $sessionStorage, $rootScope, userService, uriadmin, flag, base64, SmartAlert, SweetAlert, Name, Password, PreLoginUrl, placeorderurl, vieworderurl, acceptorderurl) {
    var flagvalue = flag;
    $scope.divshow = true;
    if (flagvalue == 'I' || flagvalue == 'E') {
        $scope.maxlen = '7';
    }
    else if (flagvalue == 'H') {
        $scope.maxlen = '10';
    }

    var valueof = userService.Success('LA');
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
        $scope.getDistDetails = function (valid) {
            if (valid) {
                $scope.rflag = $sessionStorage.rflag;
                $http.get(uriadmin + 'Distributor/getconnect?DistCode=' + $scope.DistCode + '&DistName=&IsActive=').then(function (response) {
                    if (response.data.StatusCode != 0) {
                        $scope.pageName = $scope.rflag == "PO" ? "Place Order" : $scope.rflag == "VO" ? "View Order" : "Accept Order";
                        SweetAlert.swal
                ({
                    title: '',
                    text: '<span style="color:black;">Are you sure to connect </span> <span style="line-height: 1.6;"><span style="color:black;font-weight:bold;">' + response.data.Data[0].DistName + '</span><span  style="color:black;"> to ' + $scope.pageName + '?</span></span> ',
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
                        $scope.encryptvb = { DistCode: $scope.DistCode, mflag: 'auto', rflag: $scope.rflag, adminucode: $sessionStorage.ucode };
                        var json = angular.toJson($scope.encryptvb)
                        var encrypted = CryptoJS.AES.encrypt(json, $rootScope.base64Key, { iv: $rootScope.base64Key });
                        $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                        if ($scope.rflag == "PO") {
                            window.open(placeorderurl + $scope.ciphertext);
                        }
                        else if ($scope.rflag == "VO") {
                            window.open(vieworderurl + $scope.ciphertext);
                        }
                        else {
                            window.open(acceptorderurl + $scope.ciphertext);
                        }
                    }
                })
                    }
                });
            }
        }
    }
});