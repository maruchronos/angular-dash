const doughnut = angular.module("doughnut", []);

doughnut.controller("DoughnutCtrl", function ($scope, $firebaseArray) {
  const ref = firebase.database().ref().child("frameworks");
  const frameworks = $firebaseArray(ref);
  frameworks.$watch(() => {
    $scope.data = frameworks.map(el => el.$value);
  });
  console.log($scope.data);
  $scope.labels = ['Angular', 'Angular 2', 'No framework', 'React', 'Vue'];
  $scope.colors = ['#ff6384', '#ff9f40', '#9966ff', '#36a2eb', '#4bc0c0'];
  $scope.options = {
    legend: {
      display: true
    }
  };


    // // dados carregados com base em https://2017.stateofjs.com/2017/front-end/worldwide/
    // $http.get("https://angulardash-b52ea.firebaseio.com/frameworks.json")
    // .then(result => {
    //   if(result.status === 200){
    //     const { data } = result;        
    //     $scope.data = Object.values(data);
    //     $scope.labels = Object.keys(data);
    //   }
    // })
    // .catch(err => console.log(err));
  }
);