angular.module('sidebarModule', ['ngSanitize']).component('sidebar', {template: `
    <md-sidenav id="sidenav" class="md-sidenav-left md-whiteframe-z2" md-component-id="left">
        <md-toolbar class="md-theme-indigo md-toolbar-tools" layout="row" ng-controller="sidebarController">
            <md-button class="md-icon-button" aria-label="Settings" ng-click="toggleSidebar()">
                <md-icon md-svg-icon="app/img/icons/menu.svg"></md-icon>
            </md-button>
            <h1 class="md-toolbar-tools">
            Sidenav
            </h1>
        </md-toolbar>
        <md-content flex ng-controller="sidebarController" class="flex">
            <p class="flex layout-padding">
            This project is intended to be a personal learning tool, some kind of sand box, where
            I can explore some features of AngularJS and Angular Material. Some contents and data
            may be fictional, so don't take it seriously.
            </p>
            <ul id="menu" layout="column" class="flex">
                <li class="ng-scope" ng-repeat="item in menu">            
                    <a class="md-button md-ink-ripple" 
                        ng-class="{'active' : isSelected(item.title)}"
                        ng-click="focusSection(item.title)"
                        href="{{item.url}}">    
                        <span class="ng-binding ng-scope">
                            <md-icon class="menu-icon" md-svg-icon="{{item.icon}}"></md-icon>
                            {{ item.title }}
                        </span>
                    </a>                    
                </li>
            </ul>
        </md-content>
    </md-sidenav>`})
.controller('sidebarController', ($scope, $mdSidenav) => {
    $scope.menu = [
        {
            title: 'Home',
            url: '/#/',
            icon: 'app/img/icons/home.svg'
        },
        {
            title: 'Donut',
            url: '/#/donut',
            icon: 'app/img/icons/chart.svg'
        },
        {
            title: 'Bars',
            url: '/#/bars',
            icon: 'app/img/icons/bars.svg'
        },
        {
            title: 'Store',
            url: '/#/store',
            icon: 'app/img/icons/cloth.svg'
        }
    ];
    $scope.selected = 'Charts';
    const buildToggler = (navID) => {
        return function() {
            console.log('toggle sidebar');
            $mdSidenav(navID).toggle();
        }
    }
    $scope.toggleSidebar = buildToggler('left');    
    $scope.isSelected = (item) => {
        return $scope.selected === item;
    }

    $scope.focusSection = (item) => {
        $scope.selected = item;
        $scope.toggleSidebar();
    }
});