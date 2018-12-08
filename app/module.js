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
      <p class="flex layout-padding">
        This project is intended to be a personal learning tool, some kind of sand box, where
        I can explore some features of AngularJS and Angular Material. Some contents and data
        may be fictional, so don't take it seriously.
      </p>
      <chart-card
          title="Doughnut Chart">
      </chart-card>
      <bar-chart
          title="Bars Chart"
          description="
              Now, this is a sample of a Bars chart. Also using angular-chart and Angular Material. In this case I'm using a static reference from
              firebase, like consuming an API, so real-time changes will not be noticed.
          ">
      </bar-chart>`
  };

  const DONUT = {
    name: 'donut',
    url: '/donut',
    template: `
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