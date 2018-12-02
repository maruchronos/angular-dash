angular.module("headerModule", []).component('appHeader', {
    template: `
    <md-toolbar>
        <div class="md-toolbar-tools" ng-controller="headerController">
            <md-button class="md-icon-button" aria-label="Settings" ng-click="toggleSidebar()">
                <md-icon md-svg-icon="app/img/icons/menu.svg"></md-icon>
            </md-button>
            <h2>
                <span>Angular 1.5 - Dashboard</span>
            </h2>
            <span flex></span>
            <md-button class="md-icon-button" aria-label="More">
                <md-icon md-svg-icon="app/img/icons/more_vert.svg"></md-icon>
            </md-button>
        </div>
    </md-toolbar>`
}).controller('headerController', function($scope, $mdSidenav) {
    $scope.toggleSidebar = buildToggler('left');    
    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID).toggle();
        }
      }
});