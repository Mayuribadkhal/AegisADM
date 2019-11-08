/**
@fileOverview

@toc

*/

'use strict';

angular.module('oitozero.ngSmartAlert', [])
.factory('SmartAlert', ['$rootScope', function ($rootScope) {

	var swal = window.swal;

	//public methods
	var self = {

	    Errmsg : function (Message) {
	        $.bigBox({
	            title: Message,
	            color: "#C46A69",
	            icon: "fa fa-warning shake animated",
	            timeout: 6000
	        });
	    },

	    Success : function (Message) {
		    $.bigBox({
		        title: Message,
		        color: "#296191",
		        icon: "fa fa-thumbs-up animated bounce ",
		        timeout: "8000"
		    });
		},

	    SuccessGrid : function (Message) {
	    $.bigBox({
	        title: Message,
	        color: "#296191",
	        icon: "fa fa-thumbs-up animated bounce ",
	        timeout: "1000"
	    });
	},

	    Errmsgauth : function (Message) {
	        $.bigBox({
	            title: Message,
	            color: "#C46A69",
	            icon: "fa fa-warning shake animated",
	            timeout: 4000
	        });
	    },

	    Errmsg1 : function (Message) {
	        $.bigBox({
	            title: Message,
	            color: "#C46A69",
	            icon: "fa fa-warning shake animated",
	            timeout: 2000
	        });
	    },
	};



	
	return self;
}]);


