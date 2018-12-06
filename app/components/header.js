angular.module("headerModule", ['search']).component('appHeader', {
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
            <search></search>         
        </div>
    </md-toolbar>`
}).controller('headerController', ($scope, $mdSidenav) =>  {
    const buildToggler = (navID) => {
        return () => {
            $mdSidenav(navID).toggle();
        }
    }
    $scope.toggleSidebar = buildToggler('left');
});