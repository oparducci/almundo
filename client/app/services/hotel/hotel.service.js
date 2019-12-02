'use strict';
const angular = require('angular');

/*@ngInject*/
export function hotelService($http) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var factory = {};
	factory.get = function(query){  
	  var queryString = '';
	  if(query)
	  	var queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

	  return $http.get('/api/hotels?' + queryString)
	  .then(response => {
	    return response.data;
	  });
	}

	return factory;
}

export default angular.module('almundoApp.hotel', [])
  .service('hotelService', hotelService)
  .name;
