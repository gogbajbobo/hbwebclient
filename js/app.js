const myApp = angular.module('hbwebclient', ['ngRoute', 'angular-jwt']);

myApp.config(configMyApp);
myApp.run(runMyApp);
myApp.factory("BroadcastService", broadcastService);

function broadcastService($rootScope){

    return broadcastService = {
        userLoggedIn: () => {
            $rootScope.$broadcast('login');
        },
        userLoggedOut: () => {
            $rootScope.$broadcast('logout');
        }
    };

}

function configMyApp($httpProvider, $routeProvider) {

    $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider
        .when('/login', {
            templateUrl: 'html/login.html',
            controller: 'LoginCtrl',
            access: {
                requiredLogin: false
            }
        })
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'HomeCtrl',
            access: {
                requiredLogin: true
            }
        })
        // .when('/userlist', {
        //     templateUrl: 'html/userlist.html',
        //     controller: 'UserListCtrl',
        //     access: {
        //         requiredLogin: true
        //     }
        // })
        // .when('/page2', {
        //     templateUrl: 'html/page2.html',
        //     controller: 'Page2Ctrl',
        //     access: {
        //         requiredLogin: true
        //     }
        // })
        // .when('/page3', {
        //     templateUrl: 'html/page3.html',
        //     controller: 'Page3Ctrl',
        //     access: {
        //         requiredLogin: true
        //     }
        // })
        .otherwise({
            redirectTo: '/'
        });

}

function runMyApp($rootScope, $window, $location, AuthService) {

    AuthService.check();

    $rootScope.$on("$routeChangeStart", (event, nextRoute, currentRoute) => {

        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthService.isLogged) {

            $location.path("/login");

        }

    });

    $rootScope.$on('$routeChangeSuccess', (event, nextRoute, currentRoute) => {

        $rootScope.showMenu = AuthService.isLogged;
        $rootScope.role = AuthService.user.role;

        if (AuthService.isLogged === true && $location.path() === '/login') {
            $location.path('/');
        }

    });

}