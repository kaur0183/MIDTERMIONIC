angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('CategoryCtrl', function ($scope, $stateParams, bookService) {
		console.log('****', $stateParams.category_id);
		$scope.books = [];
		bookService.all().then(function (data) {
			$scope.books = data.data.books.filter(function (book) {
				//return only if book.cat_id equals 1
				if (book.cat_id == $stateParams.category_id) {
					return book;
				}
			});
		});
	})
	.controller('DetailsCtrl', function ($scope, $stateParams, bookService) {
		$scope.details = {};
		$scope.ratingsObject = {
			iconOn: 'ion-ios-star',
			iconOff: 'ion-ios-star-outline',
			iconOnColor: 'rgb(200, 200, 100)',
			iconOffColor: 'rgb(200, 100, 100)',
			rating: 1,
			minRating: 1,
			callback: function (rating) {
				$scope.ratingsCallback(rating);
			}
		};

		$scope.ratingsCallback = function (rating) {
			console.log('Selected rating is : ', rating);
			localStorage.setItem($stateParams.productId, rating);
		};

		bookService.all().then(function (data) {
			$scope.details = data.data.books.filter(function (book) {
				if (book._id == $stateParams.productId) {
					if (localStorage.getItem($stateParams.productId) == null) {
						$scope.ratingsObject.rating = book.rating;
					} else {
						$scope.ratingsObject.rating = localStorage.getItem($stateParams.productId);
					}
					return book;
				}
			})[0]
		});
	});