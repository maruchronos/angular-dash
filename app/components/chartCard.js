angular.module("chartCardModule", ['chart.js', 'doughnut'])
    .component('chartCard', {
        // isolated scope binding
        bindings: {
            title: '@',
            description: '@',
            type: '@'
        },

        // Inline template which is binded to message variable
        // in the component controller
        template: `
            <div flex layout="column">
                <md-card ng-controller="DoughnutCtrl">
                    <md-toolbar md-scroll-shrink>
                        <div class="md-toolbar-tools">JS Frameworks Usage</div>
                    </md-toolbar>
                    <canvas 
                        id="doughnut" 
                        class="chart chart-doughnut" 
                        chart-data="data" 
                        chart-labels="labels"
                        chart-options="options"
                        chart-colors="colors"
                        chart-click="onClick"> </canvas> 
                    <md-card-title>
                        <md-card-title-text>
                            <span class="md-headline">{{$ctrl.title}}</span>
                        </md-card-title-text>
                    </md-card-title>
                    <md-card-content>
                        <p>{{$ctrl.description}}</p>
                    </md-card-content>
                </md-card>
            </div>
        `,
    }).controller('chartCardController', function ($scope) { });