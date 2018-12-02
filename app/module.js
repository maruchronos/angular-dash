const app = angular.module("app", [
    'ngMaterial', 
    'chartCardModule',
    'bars',
    'ngRoute'
]);

app.controller('appController', function ($scope) { });

app.config(function config($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
        template: `
            <chart-card
                title="Doughnut Chart"
                description="This is a sample of a Donut chart inside an Agular 1.5 app using Angular Material">
            </chart-card>
            <bar-chart
                title="Bars Chart"
                description="Now, this is a sample of a Bars chart. Also using angular-chart, a wrapper to Chart.js">
            </bar-chart>`
        }).
        when('/charts', {
        templateUrl: '/pages/charts.html'
        }).
        otherwise('/');
    $locationProvider.html5Mode({
        enabled: true
    });

});