const SEARCH = angular.module('search', ['ngSanitize']);

SEARCH.controller('searchCtrl', ($scope, $http, $mdToast) => {
  $scope.rawQuery = 'Gap Floral Pants';
  $scope.query = '';
  $scope.results = [];
  $scope.loading = true;
  $scope.types = [];
  $scope.brands = [];

  initialize = () => {
    Promise.all([
      $http.get('https://angulardash-b52ea.firebaseio.com/types.json'),
      $http.get('https://angulardash-b52ea.firebaseio.com/brands.json')
    ]).then(value => {
      const TYPES = Object.values(value[0].data);
      $scope.types = TYPES.map(item => item.name);

      const BRANDS = Object.values(value[1].data);
      $scope.brands = BRANDS.map(item => item.name);
      $scope.loading = false;
    });
  }

  formatQuery = (type, format, target) => {
    if (type === '') return;
    // Make best fit italic or bold
    return target.replace(
      new RegExp(type, 'ig'),
      `<${format}>${type}</${format}>`
    );
  };

  findBestFit = (list) => {
    let bestFit = '';
    list.map((element) => {
      const regex = new RegExp(element, 'ig');

      // Check if user query has current element
      if (regex.test($scope.rawQuery)) {
        // Update bestfit using string length
        if (element.length > bestFit.length) {
          bestFit = element;
        }
      }
    });
    return bestFit;
  }

  updateQuery = () => {
    $scope.query = $scope.rawQuery;

    // Add bold style to brand
    $scope.query = formatQuery(findBestFit($scope.brands), 'b', $scope.query);

    // Add italic style to type
    $scope.query = formatQuery(findBestFit($scope.types), 'i', $scope.query);
  }

  fetchResults = () => {
    $http.get('https://angulardash-b52ea.firebaseio.com/clothing.json')
      .then(result => {
        if (result.status === 200) {
          const { data } = result;

          const options = {
            keys: ['name']
          };

          const keys = Object.values(data);
          fuse = new Fuse(keys, options);
          $scope.results = fuse.search($scope.rawQuery);
          console.log($scope.results);
          $scope.loading = false;
        }
      })
      .catch(err => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Something went wrong!')
            .hideDelay(2000)
        );
        console.log(err);
      });
  }

  $scope.search = () => {
    if ($scope.rawQuery === '') {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Nothing to search!')
          .hideDelay(2000)
      );
    }
    $scope.results = '';
    $scope.loading = true;
    updateQuery();
    fetchResults();
  }
  initialize();
});

// Create component as a new Dom
SEARCH.component('search', {
  template: `
    <md-content ng-controller="searchCtrl" flex>
      <div layout="row" layout-align="center center">
        <md-input-container md-no-float class="md-block">
          <md-icon md-svg-src="app/img/icons/search.svg"></md-icon>
          <input ng-model="rawQuery" type="text" placeholder="Search">
        </md-input-container>
        <md-button class="md-raised md-primary" ng-click="search()">pesquisar</md-button>
      </div>
      <div ng-if="query !== ''" class="resultBox">
        Showing results for: "<span ng-bind-html="query"></span>"
        <div ng-if="loading" layout="row" layout-sm="column" layout-align="space-around">
          <md-progress-circular md-mode="indeterminate"></md-progress-circular>
        </div>
        <md-list>
          <md-list-item class="md-3-line" ng-repeat="result in results">
            <div class="md-list-item-text">
              <h3>{{result.name}}</h3>
              <h4><b>{{result.brand}}</b></h4>
            </div>            
            <md-divider ng-if="!$last"></md-divider>
          </md-list-item>
        </md-list>
      </div>
    </md-content>
  `,
});