const app = angular.module("app", [
  'firebase',
  'sidebarModule',
  'chartCardModule',
  'bars',
  'ui.router',
  'search'
]);

app.controller('appController', () => {});

app.config(function config($stateProvider) {
  const HOME = {
    name: 'home',
    url: '/',
    template: `
      <div class="title-block">
        <h3 class="title"> Welcome </h3>        
        <p class="title-description">
          This project is intended to be a personal learning tool, some kind of sand box, where
          I can explore some features of AngularJS and Angular Material. Some contents and data
          may be fictional, so don't take it seriously.
        </p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <chart-card title="Doughnut Chart"></chart-card>
        </div>
        <div class="col-md-6">
          <bar-chart
            title="Bars Chart"
              description="
              Now, this is a sample of a Bars chart. Also using angular-chart and Angular Material. In this case I'm using a static reference from
              firebase, like consuming an API, so real-time changes will not be noticed.
            ">
          </bar-chart>
        </div>
      </div>
    `
  };

  const DONUT = {
    name: 'donut',
    url: '/donut',
    template: `
      <div class="title-block">
        <h3 class="title"> Donut Chart </h3>
      </div>
      <chart-card
          title="Doughnut Chart">
      </chart-card>`
  };
  
  const STORE = {
    name: 'store',
    url: '/store',
    template: `<search></search>`
  };

  const BARS = {
    name: 'bars',
    url: '/bars',
    template: `
      <div class="title-block">
        <h3 class="title"> Bars Chart </h3>
      </div>
      <bar-chart
        title="Bars Chart"
        description="
          Now, this is a sample of a Bars chart. Also using angular-chart and Angular Material. In this case I'm using a static reference from
          firebase, like consuming an API, so real-time changes will not be noticed.
        ">
      </bar-chart>`
  };

  $stateProvider.state(HOME);
  $stateProvider.state(DONUT);
  $stateProvider.state(BARS);
  $stateProvider.state(STORE);
});