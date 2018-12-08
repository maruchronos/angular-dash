angular.module('chartCardModule', ['chart.js', 'doughnut'])
  .component('chartCard', {
    // isolated scope binding
    bindings: {
      title: '@',
      type: '@'
    },

    // Inline template which is binded to message variable
    // in the component controller
    template: `
      <div class="card card-primary" ng-controller="DoughnutCtrl">
        <div class="card-header">
          <div class="header-block">
            <p class="title">
              JS Frameworks Usage
            </p>
          </div>
        </div>
        <div class="card-body">
          <div class="row justify-content-center" ng-if="!chartLoaded">
            <img class="placeholder" src="app/img/pchart-placeholder.png" />
          </div>
          <div ng-if="chartLoaded">
            <canvas 
              id="doughnut" 
              class="chart chart-doughnut" 
              chart-data="data" 
              chart-labels="labels"
              chart-options="options"
              chart-colors="colors"
              chart-click="onClick">
            </canvas> 
            <p class="card-text">
              This is a sample of a Donut chart inside an Agular 1.5, using Angular Material and angular-chart, 
              a wrapper to Chart.js. Here I'm using firebase sync objects
              to track real-time changes. Original data from <b>stateofjs.com</b>
            </p>
          </div>
        </div>
      </div>
    `,
  }).controller('chartCardController', () => { });