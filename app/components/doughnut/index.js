angular.module("doughnut", []).controller("DoughnutCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    $scope.onClick = function () {
      console.log('points, evt');
    };
  });