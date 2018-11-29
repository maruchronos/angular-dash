angular.module("percentChart", ['chart.js','doughnut'])
    .component('percentChartComponent', {
        // isolated scope binding
        bindings: {
            message: '@'
        },

        // Inline template which is binded to message variable
        // in the component controller
        template: `
            <div flex-xs flex-gt-xs="30" layout="column">
                <md-card ng-controller="DoughnutCtrl">
                    <!-- <img ng-src="app/img/pchart-placeholder.png" class="md-card-image" alt="Washed Out"> -->                    
                    <canvas id="doughnut" class="chart chart-doughnut" chart-data="data" chart-labels="labels" chart-click="onClick"> </canvas> 
                    <md-card-title>
                        <md-card-title-text>
                            <span class="md-headline">Percent Chart</span>
                        </md-card-title-text>
                    </md-card-title>
                    <md-card-content>
                        <p>
                            This is a sample of a percent chart inside an Agular 1.5 app using Angular Material
                        </p>
                    </md-card-content>
                    <md-card-actions layout="row" layout-align="end center">
                        <md-button>Details</md-button>
                        <md-button>Hide Chart</md-button>
                    </md-card-actions>
                </md-card>
            </div>
        `,

        // The controller that handles our component logic        
    }).controller('PercentChartController', function ($scope) { });

// console.log(document.getElementById("doughnut"));