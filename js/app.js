var myApp = angular.module('hbwebclient', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'htmls/home.html',
      controller: 'HomeCtrl'
    }).when('/page1', {
      templateUrl: 'htmls/page1.html',
      controller: 'Page1Ctrl'
    }).when('/page2', {
      templateUrl: 'htmls/page2.html',
      controller: 'Page2Ctrl'
    }).when('/page3', {
      templateUrl: 'htmls/page3.html',
      controller: 'Page3Ctrl'
    }).otherwise({
      redirectTo: '/'
    });
});
