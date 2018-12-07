const SEARCH = angular.module('search', ['ngSanitize']);

SEARCH.controller('searchCtrl', ($scope) => {    
  $scope.rawQuery = 'Gap Floral Pants';
  $scope.query = '';
  $scope.results = [];
  $scope.types = ['Pants', 'Denim', 'Sweaters'];
  $scope.brands = ['Gap', 'Boss', 'Banana Republic', 'Hugo Boss'];

  replaceBrands = (brands) => {
    $scope.query = $scope.rawQuery;
    brands.map((brand) => { 
      $scope.query = $scope.query.replace(new RegExp(brand, 'ig'), `<b>${brand}</b>`);
      console.log(`update brand: ${$scope.query}`);
    });
  };

  replaceTypes = (types) => {
    types.map((type) => { 
      $scope.query = $scope.query.replace(new RegExp(type, 'ig'), `<i>${type}</i>`);
      console.log(`update type: ${$scope.query}`);
    });
  };

  updateQuery = () => {
    replaceBrands($scope.brands);
    replaceTypes($scope.types);
  }

  $scope.search = () => {
    updateQuery();    
  }

});

// Create component as a new Dom
SEARCH.component('search', {     
  template: `
    <div ng-controller="searchCtrl" >
      <span>Search:</span>
      <input type="text" ng-model="rawQuery">
      <md-button md-no-ink class="md-primary" ng-click="search()">pesquisar</md-button>
      <div ng-if="query !== ''" class="resultBox">
        Showing results for: "<span ng-bind-html="query"></span>"
        <ul>
          <li ng-repeat="result in results">
            <p>{{result}}</p>
          </li>
        </ul>
      </div>
    </div>
  `,
});