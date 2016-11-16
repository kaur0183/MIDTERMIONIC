angular.module('starter.services', [])

.factory("bookService", function ($http) {
	return {
		all: function () {
			return $http.get("../data.json");
		}
	}
});