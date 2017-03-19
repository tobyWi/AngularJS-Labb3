var app = angular.module('myApp', ['ui.router']);

app.run(function($rootScope) {
    	$rootScope.x = {};    
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");  
    $stateProvider.state('home', {
        templateUrl: 'home.html',
        url: '/home'
    }).state('page1', {
        controller: 'ageController',
        templateUrl: 'page1.html',
        url: '/page1'
    }).state('page2', {
        controller: 'birthdayController',
        templateUrl: 'page2.html',
        url: '/page2'
    }).state('cities', {
        controller: 'citiesController',
        resolve: {
            cities: function ($http) {
                return $http({
                    method: 'GET',
                    url: 'http://cities.jonkri.se/0.0.0/cities'
                });
            }
        },
        templateUrl: 'cities.html',
        url: '/cities'
    });
});

app.controller('ageController', function($scope, $rootScope) {
	
    $scope.age = function (){
    	var ssn = String($rootScope.x.ssn);
		var a = new Date();
		var y = a.getFullYear();
		var m =	a.getMonth() + 1;
		var d =	a.getDate();
		var ssn_Year = ssn.slice(0, 4);
		var ssn_MonthDay = ssn.slice (4, 8);

			if (m < 10){
				m = '0' + m;
			}
			if (d < 10){
				d = '0' + d;
			}
			
		var md = m + '' + d;
		var sum = y - ssn_Year;

			if (ssn_MonthDay > md){
				sum--;
			}
			return sum;
	};
});

app.controller('birthdayController', function($scope, $rootScope) {

	$scope.birthday = function(){

		var ssn = String($rootScope.x.ssn);
		ssn = ssn.slice(4, 8);
		var a = new Date();
		var m =	a.getMonth() + 1;
		var d =	a.getDate();

			if (m < 10){
				m = '0' + m;
			}
			if (d < 10){
				d = '0' + d;
			}

		var md = m+''+d;

		return ssn == md;
	}  
});

app.controller('citiesController', function($scope, $rootScope, $http) {
	$scope.cities = $scope.$resolve.cities.data.items;
	$scope.addCity = function (){
	$scope.citiesVar = {name: $scope.newCity, population: $scope.newPopulation};
	console.log($scope.citiesVar);
		$http.post('http://cities.jonkri.se/0.0.0/cities', $scope.citiesVar);

	}
});



