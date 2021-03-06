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
            templateUrl: 'html/pages/login.html',
            controller: 'LoginCtrl',
            access: {
                requiredLogin: false
            }
        })
        .when('/', {
            templateUrl: 'html/pages/home.html',
            controller: 'HomeCtrl',
            access: {
                requiredLogin: true
            }
        })
        .when('/userlist', {
            templateUrl: 'html/pages/userlist.html',
            controller: 'UserListCtrl',
            access: {
                requiredLogin: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });

}

function runMyApp($rootScope, $location, AuthService) {

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