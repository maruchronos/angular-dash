const SEARCH = angular.module('search', ['ngSanitize']);

SEARCH.controller('searchCtrl', ($scope, $http) => {    
  $scope.rawQuery = 'Gap Floral Pants';
  $scope.query = '';
  $scope.results = [];
  $scope.loading = false;
  $scope.types = ['Pants', 'Denim', 'Sweaters', 'Skirts', 'Dresses'];
  $scope.brands = ['Gap', 'Banana Republic', 'Hugo Boss', 'Boss', 'Taylor', 'Rebeca Taylor'];
  
  formatQuery = (type, format) => {
    if (type === '') return;
    // Make best fit italic or bold
    $scope.query = $scope.query.replace(
      new RegExp(type, 'ig'), 
      `<${format}>${type}</${format}>`
    );
  };

  findBestFit = (list) => {    
    let bestFit = '';
    list.map((element) => {
      const regex = new RegExp(element, 'ig');
      
      // Check if user query has current element
      if (regex.test($scope.rawQuery)){
        // Update bestfit using string length
        if (element.length > bestFit.length){
          bestFit = element;
        }
      }
    });
    return bestFit;
  }

  updateQuery = () => {
    $scope.query = $scope.rawQuery;
    
    // Add bold style to brand
    formatQuery(findBestFit($scope.brands), 'b');
    
    // Add italic style to type
    formatQuery(findBestFit($scope.types), 'i');
  }

  fetchResults = () => {
    $http.get('https://angulardash-b52ea.firebaseio.com/clothing.json')
      .then(result => {
        if(result.status === 200){
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
    $scope.results = '';
    $scope.loading = true;
    updateQuery();
    fetchResults();
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
        <div ng-if="loading" layout="row" layout-sm="column" layout-align="space-around">
          <md-progress-circular md-mode="indeterminate"></md-progress-circular>
        </div>
        <ul>
          <li ng-repeat="result in results">
            <p>{{result.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  `,
});