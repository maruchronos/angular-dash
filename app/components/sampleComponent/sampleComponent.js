const app = angular.module("app", ['ngMaterial'])
    .component('sampleComponent', {
        // isolated scope binding
        bindings: {
            message: '@'
        },

        // Inline template which is binded to message variable
        // in the component controller
        template: '<div>Hello {{$ctrl.message}}</div>',

        // The controller that handles our component logic        
    });
app.controller('AppCtrl', function ($scope) {
});