appdash.factory('globalService', function ($q, $http, $rootScope, $sessionStorage, base64, uriadmin) {
    var toEncrypt = {};
    toEncrypt.state = function () {
        return $http.get(uriadmin + 'master/GetStateDetails?StateCode=&StateFlag=&StateDesc=&IsActive=Y&IsHomeState=').then(function (response) {
            if (response.data.StatusCode != 0) {
                return response.data.Data;
            }
        });
    };
    toEncrypt.district = function (StateCode) {
        StateCode = StateCode == null ? "" : StateCode;
        return $http.get(uriadmin + 'master/GetDistrictDetails?StateCode=' + StateCode + '&DistrictCode&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                return response.data.Data;
            }
        });
    };
    toEncrypt.city = function (StateCode, DistrictCode) {
        StateCode = StateCode == null ? "" : StateCode;
        DistrictCode = DistrictCode == null ? "" : DistrictCode;
        return $http.get(uriadmin + 'master/GetTalukaDetails?TalukaCode&StateCode=' + StateCode + '&DistrictCode=' + DistrictCode + '&IsActive=Y').then(function (response) {
            if (response.data.StatusCode != 0) {
                return response.data.Data;
            }
        });
    };

    toEncrypt.create = function (data) {
        var source_string = angular.toJson(data)
        var encrypted = CryptoJS.AES.encrypt(source_string, $rootScope.base64Key, { iv: $rootScope.base64Key });
        return ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    };
    return toEncrypt;
})