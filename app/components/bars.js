// Making the angular material card part of component
const bars = angular.module("bars", ['chart.js']);

// TODO - Read data from API 
// Controller to manipulate data
bars.controller("barsCtrl", ($scope, $http) => {
    $scope.years = [];
    $scope.frameworks = [];
    $scope.stars = [];
    $scope.colors = ['#ff6384', '#36a2ff', '#4bffc0'];
    $scope.options = {
        legend: {
          display: true
        }
    };

    $scope.chartLoaded = false;

    //Get data from frebase API
    $http.get("https://angulardash-b52ea.firebaseio.com/stars.json")
        .then(result => {
            if(result.status === 200){
                const { data } = result;
                const arrayResult = Object.values(data);

                // Stars must be defined as [
                    // [fw1(y1), fw1(y2), ..., fw1(yN)]]
                    // ...
                    // [ fwN(y1), fw1(y2), ..., fw1(yN)]]
                // ];
                
                
                // Define Frameworks
                $scope.frameworks = Object.keys(data);
                
                // Define Years
                $scope.years = Object.keys(arrayResult[0]);

                // Define Stars
                $scope.stars = arrayResult.map(star => Object.values(star));

                $scope.chartLoaded = true;

            }
        })
        .catch(err => console.log(err));
  }
);

// Create component as a new Dom
bars.component('barChart', {
  // isolated scope binding
  bindings: {
    title: '@',
    description: '@',
    type: '@'
  },

  // Inline template binded to barsController
  template: `
    <div class="card card-primary" ng-controller="barsCtrl">
      <div class="card-header">
        <div class="header-block">
          <p class="title">
            Github Stars by Framework
          </p>
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-center" ng-if="!chartLoaded">
          <img class="placeholder" src="app/img/bars-placeholder.png" />
        </div>
        <div ng-if="chartLoaded">
          <canvas 
            id="bar" 
            class="chart chart-bar" 
            chart-data="stars"
            chart-series="frameworks"
            chart-options="options"
            chart-labels="years"
            chart-colors="colors"
            chart-click="onClick"> 
          </canvas> 
          <p class="card-text">{{$ctrl.description}}</p>
        </div>
      </div>
    </div>
  `,
});