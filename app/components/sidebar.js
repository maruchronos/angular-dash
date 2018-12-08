angular.module('sidebarModule', [])
  .component('sidebar', {
    template: `
      <aside class="sidebar">
        <div class="sidebar-container">
          <div class="sidebar-header">
            <div class="brand">
              <div class="logo">
                <span class="l l1"></span>
              </div> Angular dashboard
            </div>
          </div>
          <nav class="menu" ng-controller="sidebarController">
            <ul id="menu" class="sidebar-menu metismenu">
              <li
                ng-class="{ 'active' : isSelected(item.url) }"                
                ng-repeat="item in menu"> 
                <a ng-click="focusSection(item.url)"
                  href="{{item.url}}">    
                  <span class="ng-binding ng-scope">                    
                    <img class="menu-icon" src="{{item.icon}}"/>
                    {{ item.title }}
                  </span>
                </a>                    
              </li>
            </ul>
          </nav>
        </div>
    </aside>`})
.controller('sidebarController', ($scope, $location) => {
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
            icon: 'app/img/icons/store.svg'
        }
    ];
    $scope.selected = `/#${$location.url()}`;    
    
    $scope.isSelected = (item) => {
        return $scope.selected === item;
    }

    $scope.focusSection = (item) => {
        $scope.selected = item;
    }
});