const SEARCH = angular.module('search', ['ngSanitize']);

SEARCH.controller('searchCtrl', ($scope, $http) => {    
  $scope.rawQuery = 'Gap Floral Pants';
  $scope.query = '';
  $scope.results = [];
  $scope.types = ['Pants', 'Denim', 'Sweaters'];
  $scope.brands = ['Gap', 'Banana Republic', 'Hugo Boss', 'Boss'];

  replaceBrand = (brand) => {
    $scope.query = $scope.rawQuery;

    if (brand === '') return;
    // Make best fit brand bold
    $scope.query = $scope.query.replace(new RegExp(brand, 'ig'), `<b>${brand}</b>`);
    // console.log(`update brand: ${$scope.query}`);
  };

  replaceTypes = (type) => {
    if (type === '') return;
    // Make best fit type italic
    $scope.query = $scope.query.replace(new RegExp(type, 'ig'), `<i>${type}</i>`);
    // console.log(`update type: ${$scope.query}`);
  };

  bestFitBrand = (brands) => {    
    let bestFit = '';
    brands.map((brand) => {
      const regex = new RegExp(brand, 'ig');
      
      // Check if user query has current brand
      if (regex.test($scope.rawQuery)){
        // Update bestfit using string length
        if (brand.length > bestFit.length){
          bestFit = brand;
        }
      }
    });
    return bestFit;
  }

  bestFitType = (types) => {    
    let bestFit = '';
    types.map((type) => {
      const regex = new RegExp(type, 'ig');
      
      // Check if user query has current type
      if (regex.test($scope.rawQuery)){
        // Update bestfit using string length
        if (type.length > bestFit.length){
          bestFit = type;
        }
      }
    });
    return bestFit;
  }

  updateQuery = () => {
    replaceBrand(bestFitBrand($scope.brands));
    replaceTypes(bestFitType($scope.types));
  }

  $scope.search = () => {
    updateQuery();
    $http.get('https://angulardash-b52ea.firebaseio.com/stars.json')
      .then(result => {
        if(result.status === 200){
          const { data } = result;
          $scope.results = data;
        }
      })
      .catch(err => console.log(err));
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