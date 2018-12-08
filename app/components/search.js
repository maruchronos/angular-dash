const search = angular.module('search', ['ngSanitize']);

search.controller('searchCtrl', ($scope, $http) => {
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
      const types = Object.values(value[0].data);
      $scope.types = types.map(item => item.name);

      const brands = Object.values(value[1].data);
      $scope.brands = brands.map(item => item.name);
      $scope.loading = false;
    });
  }

  formatQuery = (type, format, target) => {
    if (type === '') return target;
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
          // console.log($scope.results);
          $scope.loading = false;
        }
      })
      .catch(err => {
        alertt('Something went wrong!');
        console.log(err);
      });
  }

  $scope.search = () => {
    if ($scope.rawQuery === '') {
      alert('Nothing to search!');
    }
    $scope.results = '';
    $scope.loading = true;
    updateQuery();
    fetchResults();
  }
  initialize();
});

// Create component as a new Dom
search.component('search', {
  template: `
    <div ng-controller="searchCtrl" class="container">
      <div class="row justify-content-center">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <img src="app/img/icons/search.svg">
          </div>
          <div class="col-auto">
            <input type="text" class="form-control" ng-model="rawQuery" type="text" placeholder="Search">
          </div>
          <div class="col-auto">
            <button id="search-button" type="button" class="btn-primary" ng-click="search()">SEARCH</button>        
          </div>
        </div>
      </div>
      <div ng-if="query" class="result-box container">
        Showing results for: "<span ng-bind-html="query"></span>"
        <div ng-if="loading" class="row justify-content-center">
          <img src="app/img/loading.gif" />
        </div>
        <ul class="list-group result-list">
          <li class="list-group-item" ng-repeat="result in results">
            <div class="li-text">
              {{result.name}}
            </div>            
            <md-divider ng-if="!$last"></md-divider>
          </li>
        </ul>
      </div>
    </div>
  `,
});