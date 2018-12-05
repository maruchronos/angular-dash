const doughnut = angular.module("doughnut", []);

doughnut.controller("DoughnutCtrl", 
  ($scope, $firebaseArray) => {
    const ref = firebase.database().ref().child("frameworks");
    const frameworks = $firebaseArray(ref);
    frameworks.$watch(() => {
      $scope.data = frameworks.map(el => el.$value);
    });
    $scope.labels = ['Angular', 'Angular 2', 'No framework', 'React', 'Vue'];
    $scope.colors = ['#ff6384', '#ff9f40', '#9966ff', '#36a2eb', '#4bc0c0'];
    $scope.options = {
      legend: {
        display: true
      }
    };    
  }
);