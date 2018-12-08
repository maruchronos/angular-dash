const search = angular.module('search', ['ngSanitize']);

search.controller('searchCtrl', ($scope, $http) => {
  $scope.rawQuery = '';
  $scope.query = '';
  $scope.results = [];
  $scope.loading = true;
  $scope.initialized = false;
  $scope.types = [];
  $scope.brands = [];

  init = () => {
    // Get brands and Types from DB
    Promise.all([
      $http.get('https://angulardash-b52ea.firebaseio.com/types.json'),
      $http.get('https://angulardash-b52ea.firebaseio.com/brands.json')
    ]).then(value => {
      const types = Object.values(value[0].data);
      $scope.types = types.map(item => item.name);

      const brands = Object.values(value[1].data);
      $scope.brands = brands.map(item => item.name);
      $scope.initialized = true;
      $scope.$apply();
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

  findBestFit = (list, target) => {
    let bestFit = '';
    list.map((element) => {
      const regex = new RegExp(element, 'ig');

      // Check if user query has current element
      if (regex.test(target)) {
        // Update bestfit using string length
        if (element.length > bestFit.length) {
          bestFit = element;
        }
      }
    });
    return bestFit;
  }

  $scope.updateQuery = (target) => {
    // Add bold style to brand
    target = formatQuery(findBestFit($scope.brands, target), 'b', target);

    // Add italic style to type
    target = formatQuery(findBestFit($scope.types, target), 'i', target);    

    return target;
  }

  fetchResults = () => {
    // Fetch all data from DB. Firebase doesn't support %LIKE% queries
    // And it's not great for searching.
    // In the future I can use Cloud Functions and Other tools like
    // Algolia to make the search online
    $http.get('https://angulardash-b52ea.firebaseio.com/clothing.json')
      .then(result => {
        if (result.status === 200) {
          const { data } = result;

          // Fuzzy search data using query
          const options = {
            keys: ['name']
          };

          const keys = Object.values(data);
          fuse = new Fuse(keys, options);
          $scope.results = fuse.search($scope.rawQuery);

          // Format result with bold and italic
          $scope.results = $scope.results.map(item => $scope.updateQuery(item.name));
          
          $scope.loading = false;
        }
      })
      .catch(err => {
        alert('Something went wrong!');
        console.log(err);
      });
  }

  $scope.search = (query) => {
    $scope.rawQuery = query;
    // console.log('searching', $scope.rawQuery);
    if ($scope.rawQuery === '') {
      alert('Nothing to search!');
    }
    $scope.results = '';
    $scope.loading = true;
    $scope.query = $scope.rawQuery;
    $scope.query = $scope.updateQuery($scope.query);
    fetchResults();
  }

  init();
});


// Create component as a new Dom
search.component('search', {
  template: `
    <div ng-controller="searchCtrl" class="container" data-ng-init="init()">
      <div class="title-block">
        <h3 class="title"> Up to some clothing? </h3>
        <p class="title-description">
          Use this page to search some of the clothing on my store.
        </p>
      </div>
      <div ng-if="!initialized" class="row justify-content-center">
        <img src="app/img/loading.gif" />
      </div>
      <div class="row justify-content-center" ng-if="initialized">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <img src="app/img/icons/search.svg">            
          </div>
          <div class="col-auto">
            <input type="text" class="form-control" ng-model="rawQuery" type="text" placeholder="Search">
          </div>
          <div class="col-auto">
            <button id="search-button" type="button" class="btn-primary" ng-click="search(rawQuery)">SEARCH</button>        
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
            <div class="li-text" ng-bind-html="result"></div>            
            <md-divider ng-if="!$last"></md-divider>
          </li>
        </ul>
      </div>
    </div>
  `,
});