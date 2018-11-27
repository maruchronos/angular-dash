const percentChart = angular.module("percentChart")
    .component('percentChartComponent', {
        // isolated scope binding
        bindings: {
            message: '@'
        },

        // Inline template which is binded to message variable
        // in the component controller
        template: '<div>Hello {{$ctrl.message}}</div>',

        // The controller that handles our component logic        
    }).controller('PercentChartController', function ($scope) { });

export default percentChart;