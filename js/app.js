'use strict';

angular.module('swSearch', [])
    .controller('SearchController', function(apiService){
        var sc = this;

        sc.results = [];

        sc.search = function(searchText) {
            if(searchText) {
                apiService.getPeople(searchText).then(function(res) {
                    sc.results[0] = res.results;
                });

                apiService.getStarships(searchText).then(function(res) {
                    sc.results[1] = res.results;
                });

                apiService.getPlanets(searchText).then(function(res) {
                    sc.results[2] = res.results;
                });
            }
        };
    })
    .service('apiService', function($http){
        var apiURL = 'https://swapi.co/api/';
        var apiService = {
            getPeople: function(search) {
                return $http.get(apiURL + 'people/?search=' + search + '&format=json')
                    .then(function(res){
                        return res.data;
                    }, function(err){
                        console.log(err);
                    });
            },
            getStarships: function(search) {
                return $http.get(apiURL + 'starships/?search=' + search)
                    .then(function(res){
                        return res.data;
                    }, function(err){
                        console.log(err);
                    });
            },
            getPlanets: function(search) {
                return $http.get(apiURL + 'planets/?search=' + search)
                    .then(function(res){
                        return res.data;
                    }, function(err){
                        console.log(err);
                    });
            }
        };
        return apiService;
    })
    .component('contentSection', {
        bindings: {
            data: '='
        },
        template: `
            <div>
                <tile value="value" ng-repeat="value in $ctrl.data"></tile>
            </div>
        `
    })
    .component('tile', {
        bindings: {
            type: '@',
            data: '='
        },
        template: `
            <i ng-show="$ctrl.type === 'people'" class="fa fa-user"></i>
            <i ng-show="$ctrl.type === 'starship'" class="fa fa-space-shuttle"></i>
            <i ng-show="$ctrl.type === 'planet'" class="fa fa-globe"></i>
            <h1>{{$ctrl.data.name}}</h1>
            <p ng-show="$ctrl.type === 'people'">
                Gender: {{$ctrl.data.gender}}</br>
                Born: {{$ctrl.data.birth_year}}</br>
                Hair: {{$ctrl.data.hair_color}}</br>
                Eyes: {{$ctrl.data.eye_color}}</br>
                Height: {{$ctrl.data.height}}</br>
                Weight: {{$ctrl.data.mass}}
            </p>
            <p ng-show="$ctrl.type === 'starship'">
                Model: {{$ctrl.data.model}}</br>
                Manufacturer: {{$ctrl.data.manufacturer}}</br>
                Type: {{$ctrl.data.starship_class}}</br>
                Hyperdrive: {{$ctrl.data.hyperdrive_rating}}
            </p>
            <p ng-show="$ctrl.type === 'planet'">
                Climate: {{$ctrl.data.climate}}</br>
                Terrain: {{$ctrl.data.terrain}}</br>
                Size: {{$ctrl.data.diameter}}
            </p>
        `
    });
