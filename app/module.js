const app = angular.module("app", [
    'ngMaterial',
    'firebase',
    'headerModule',
    'sidebarModule',
    'chartCardModule',
    'bars',
    'ngRoute'
]);

app.controller('appController', function ($scope, $firebaseObject) {
    // const ref = firebase.database().ref();
    // // download the data into a local object
    // const syncData = $firebaseObject(ref);
    // syncData.$bindTo($scope, "data");
    // console.log($scope.data);
});

app.config(function config($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
        template: `
            <chart-card
                title="Doughnut Chart">
            </chart-card>
            <bar-chart
                title="Bars Chart"
                description="
                    Now, this is a sample of a Bars chart. Also using angular-chart and Angular Material. In this case I'm using a static reference from
                    firebase, like consuming an API, so real-time changes will not be noticed.
                ">
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