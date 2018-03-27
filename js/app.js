const myApp = angular.module('hbwebclient', ['ngRoute']);

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

function runMyApp($rootScope, $window, $location, AuthenticationFactory) {

    AuthenticationFactory.check();

    $rootScope.$on("$routeChangeStart", (event, nextRoute, currentRoute) => {

        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {

            $location.path("/login");

        } else {

            if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.username;
            if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }

    });

    $rootScope.$on('$routeChangeSuccess', (event, nextRoute, currentRoute) => {

        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;

        if (AuthenticationFactory.isLogged === true && $location.path() === '/login') {
            $location.path('/');
        }

    });

}