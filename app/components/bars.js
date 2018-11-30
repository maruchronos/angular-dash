// Making the angular material card part of component
const bars = angular.module("bars", ['chart.js']);

// TODO - Read data from API 
// Controller to manipulate data
bars.controller("barsCtrl", function ($scope, $http) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.colors = ['#ff6384', '#ff9f40'];
    $http.get("https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3")
        .then(result => {
            if(result.status === 200){
                console.log(result.data)
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
                    chart-data="data"
                    chart-series="series"
                    chart-labels="labels"
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