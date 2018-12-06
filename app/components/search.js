const SEARCH = angular.module("search", []);

SEARCH.controller("searchCtrl", ($scope) => {    
  $scope.rawQuery = 'Gap Floral Pants';
  $scope.query = '';
  $scope.types = ['Pants', 'Denim', 'Sweaters'];
  $scope.brands = ['Gap', 'Boss', 'Banana Republic'];

  replaceBrands = (brands) => {
    $scope.query = $scope.rawQuery;
    brands.map((brand) => { 
      $scope.query = $scope.query.replace(brand, `<b>${brand}</b>`)
      console.log('updating->'+brand, $scope.query);
    });
  };

  replaceTypes = (types) => {
    types.map((type) => { 
      $scope.query = $scope.query.replace(type, `<i>${type}</i>`)
      console.log('updating->'+type, $scope.query);
    });
  };

  $scope.updateQuery = () => {
    replaceBrands($scope.brands);
    replaceTypes($scope.types);
  }

});

// Create component as a new Dom
SEARCH.component('search', {     
  template: `
    <div ng-controller="searchCtrl" >
      <span>Search:</span>
      <input type="text" ng-model="rawQuery">
      {{query}}
      <md-button ng-click="updateQuery()">pesquisar</md-button>
    </div>
  `,
});