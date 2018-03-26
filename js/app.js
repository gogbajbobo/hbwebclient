const myApp = angular.module('hbwebclient', ['ngRoute']);

myApp.config($routeProvider => {

    $routeProvider
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'HomeCtrl'
        })
        .when('/page1', {
            templateUrl: 'html/page1.html',
            controller: 'Page1Ctrl'
        })
        .when('/page2', {
            templateUrl: 'html/page2.html',
            controller: 'Page2Ctrl'
        })
        .when('/page3', {
            templateUrl: 'html/page3.html',
            controller: 'Page3Ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });

});
