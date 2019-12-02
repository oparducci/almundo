import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import hotelService from '../services/hotel/hotel.service';
import hotelPanel from '../directives/hotelPanel/hotelPanel.directive';

export class MainController {
  $http;
  hotelService;

  allStars;
  error;
  hotels;
  hotelName;
  stars;

  /*@ngInject*/
  constructor($http, hotelService) {
    this.$http = $http;
    this.hotelService = hotelService;
  }

  $onInit() {
    this.allStars = true;
    this.error = false;
    this.stars = [{
      "value": 5, "selected": false
    },{
      "value": 4, "selected": false
    },{
      "value": 3, "selected": false
    },{
      "value": 2, "selected": false
    },{
      "value": 1, "selected": false
    }];

    this.hotelService.get().then(response => {
      this.hotels = response;
    });
  }

  // hack para poder hacer un for con el ng-repeat
  range = function(n) {
    return new Array(n);
  }

  filter(){
    this.error = false;

    var query = {};
    if(this.hotelName){
      query['name'] = this.hotelName;
    }

    var selectedStars = _.map(_.filter(this.stars, { 'selected': true }), 'value');
    if(selectedStars && selectedStars.length > 0){
      this.allStars = false;
      query.stars = selectedStars.join(',');
    }

    this.hotelService.get(query).then(response => {
      this.hotels = response;
    }, function(response){
      this.error = true;
    });
  }

  clickAllStars(){
    this.allStars = true;
    for (var i = this.stars.length - 1; i >= 0; i--) {
      this.stars[i].selected = false;
    }
    this.filter();
  }
}

export default angular.module('almundoApp.main', [uiRouter, hotelService, hotelPanel])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
