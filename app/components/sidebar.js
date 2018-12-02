angular.module('sidebarModule', []).component('sidebar', {template: `
    <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left">
        <md-content id="sidenav" flex layout-padding ng-controller="sidebarController" class="flex">
            <md-toolbar class="md-theme-indigo">
                <h1 class="md-toolbar-tools">
                Sidenav - Angular Material
                </h1>
            </md-toolbar>
            <p>
            This project is intended to be a personal learning tool, some kind of sand box, where
            I can explore some features of AngularJS and Angular Material. Some contents and data
            may be fictional, so don't take it seriously.
            </p>
            <ul id="menu" layout="column">
                <li class="ng-scope" ng-repeat="item in menu">            
                    <a class="md-button md-ink-ripple" href="{{item.url}}">    
                        <span class="ng-binding ng-scope">{{ item.title }}</span>
                    </a>                    
                </li>
            </ul>
        </md-content>
    </md-sidenav>`})
.controller('sidebarController', function($scope) {
    $scope.menu = [
        {
            title: 'Charts',
            url: '/charts'
        },
        {
            title: 'Lists',
            url: '/lists'
        }
    ];
});