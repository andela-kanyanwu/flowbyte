angular.module('flowbyteApp', ['ngResource'])
  .config(['$httpProvider', function($httpProvider) {
  	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];    
  }])
  .controller('flowbyteController', ['$scope', 'flowbyteService', function ($scope, flowbyteService) {
	  $scope.test = 'it works o';

	  // var flowResource = $resource('http://localhost\\:3000/histories');
	  // flowResource.get(function (data) {
	  // 	console.log('resource return ', data);
	  // });

	  flowbyteService.getTry().query(function (data) {
	  	console.log('it returned this: ', data);
	  });

	  flowbyteService.test('Toyota').success(function (data) {
	  	console.log('car returns: ', data);
	  });
  }])
  .factory('flowbyteService', function ($resource, $http) {
  	return {
  		getHist: function () {
  			return $resource('http://localhost\\:3000/histories',
  				{ method: 'getTask', q: '*' }, // Query parameters
  				{'query': { method: 'GET' }}
  				);
  		},

  		getTry: function () {
  			return $resource('https://flowbyte-api.herokuapp.com/:history', {history:'histories'}, {      
        query: {method:'GET', isArray: true},
        save: {method:'POST', isArray: false}
     });     
  		},

  		test: function (carInput) {
  
  var rawUrl = "https://api.edmunds.com/api/vehicle/v2/"+carInput+"/models?";

  return $http.get(rawUrl, {
    params: {
      fmt: "json",
      api_key: "h8wvpc7n4jnsqxgna874tpez"
    }
  });

  } 

  		// getHistory: function () {
  		// 	return $resource('http://127.0.0.1\\:3000/histories', {query: {method:'GET', isArray: true}});
  		// }
  	}

  });