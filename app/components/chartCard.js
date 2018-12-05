angular.module("chartCardModule", ['chart.js', 'doughnut'])
    .component('chartCard', {
        // isolated scope binding
        bindings: {
            title: '@',
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
                        <p>
                            This is a sample of a Donut chart inside an Agular 1.5, using Angular Material and angular-chart, 
                            a wrapper to Chart.js. Here I'm using firebase sync objects
                            to track real-time changes. Original data from https://2017.stateofjs.com/2017/front-end/worldwide/
                        </p>
                    </md-card-content>
                </md-card>
            </div>
        `,
    }).controller('chartCardController', () => { });