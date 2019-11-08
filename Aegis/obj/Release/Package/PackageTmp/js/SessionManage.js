

appdash.factory('userService', function ($sessionStorage, $filter, $state, SmartAlert) {
    var enable = [];
    var self;
       return {
           Success: function (Message) {
               var filterall = $sessionStorage.Formstatus;
               if ($sessionStorage.Formstatus == null) { var filterall = 'Y'; }
               else {var filterall = $sessionStorage.Formstatus;}
               if (filterall == 'Y') { enable = 'Y';var s = enable.IsFormEnable;return enable.IsFormEnable;}
               else {enable = $filter('filter')(filterall, { FormNumber: Message })[0]; }
            if (enable.IsFormEnable == 'N'){$state.go($sessionStorage.currentstate);SmartAlert.Errmsgauth('You are not authenticated');}
            return enable.IsFormEnable;
        },
       }; 
});