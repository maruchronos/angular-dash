// Making the angular material card part of component
const bars = angular.module("bars", ['chart.js']);

// TODO - Read data from API 
// Controller to manipulate data
bars.controller("barsCtrl", function ($scope, $http) {
    $scope.years = [];
    $scope.frameworks = [];
    $scope.stars = [];
    $scope.colors = ['#ff6384', '#36a2ff', '#4bffc0'];

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
        <div flex layout="column">
            <md-card ng-controller="barsCtrl">
                <canvas 
                    id="bar" 
                    class="chart chart-bar" 
                    chart-data="stars"
                    chart-series="frameworks"
                    chart-labels="years"
                    chart-colors="colors"
                    chart-click="onClick"> </canvas> 
                <md-card-title>
                    <md-card-title-text>
                        <span class="md-headline">{{$ctrl.title}}</span>
                    </md-card-title-text>
                </md-card-title>
                <md-card-content>
                    <p>{{$ctrl.description}}</p>
                </md-card-content>
                <md-card-actions layout="row" layout-align="end center">
                    <md-button>Details</md-button>
                    <md-button>Hide Chart</md-button>
                </md-card-actions>
            </md-card>
        </div>
    `,
});