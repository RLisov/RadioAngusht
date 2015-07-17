angular.module('starter.services', [])

.factory('Schedule', function($http, $q) {
	var BASE_URL = "http://www.workplay.in/today_radio.json";

	var schedule = [];

	return {
		all: function() {
			return $http.get(BASE_URL).then(function (response) {
				items = response.data;
				return items;
			});
		}
	}
});