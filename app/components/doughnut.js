const doughnut = angular.module("doughnut", []);

doughnut.controller("DoughnutCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    $scope.colors = ['#9966ff', '#36a2eb', '#4bc0c0'];
    $scope.onClick = function () {
      console.log('points, evt');
    };
  }
);