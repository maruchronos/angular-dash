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
                    <i class="{{item.icon}}"></i>
                    {{ item.title }}
                  </span>
                </a>                    
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    `
  })
  .controller('sidebarController', ($scope, $location) => {
    $scope.menu = [
      {
        title: 'Home',
        url: '/#/',
        icon: 'fa fa-home'
      },
      {
        title: 'Donut',
        url: '/#/donut',
        icon: 'fa fa-chart-pie'
      },
      {
        title: 'Bars',
        url: '/#/bars',
        icon: 'fa fa-bars'
      },
      {
        title: 'Store',
        url: '/#/store',
        icon: 'fa fa-store'
      }
    ];

    // TODO: Use regex to get only the path on url location
    // this implementation will probably break when user
    // navigate to some inner path such as /store/brands
    $scope.selected = `/#${$location.url()}`;    
      
    $scope.isSelected = (item) => {
      return $scope.selected === item;
    }

    $scope.focusSection = (item) => {
      $scope.selected = item;
    }
  });