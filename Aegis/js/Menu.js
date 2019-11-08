


appdash.factory('menuServices', function($sessionStorage,$http, $filter, $state, SmartAlert, base64, uri,uriadmin,Name,Password){
    return {
        getSessions: function(rcode) {
            var base65 = base64.encode(Name + ':' + Password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base65;
            return $http({
                method: 'GET',
                url: uriadmin + 'Setting/GetFormsInfoForLogin',
                params:
                    { RoleCode: rcode }
            }).then(function (response) {
                if (response.data.Data != null || response.data.StatusCode == 1) {
                    var alldetails = response.data.Data;
                    SmartAlert.Success(alldetails);
                }
                else {
                    SmartAlert.Errmsg(response.data.Message);
                }

            })
        }
    };
});