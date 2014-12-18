"use strict"

var $ = require('jquery');

(function($) {
	var url = '//notifications-findly.rhcloud.com/doodle/notification/541/listen';
	var connect = function() {
		$.ajax({
			type: 'GET',
			url: url,
			async: true,
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				// create and dispatch the event
				var event = new CustomEvent(json.data.eventType, {"detail": json.data.eventData });
				document.dispatchEvent(event);
				connect();
			},
			error: function(e) {
				console.log(e.message);
				connect();
			}
		});
	}
	connect();
})($);