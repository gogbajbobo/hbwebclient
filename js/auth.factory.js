myApp.factory('AuthenticationFactory', AuthenticationFactory);
myApp.factory('UserAuthFactory', UserAuthFactory);
myApp.factory('TokenInterceptor', TokenInterceptor);

function AuthenticationFactory($window) {

    return auth = {
        isLogged: false,
        check: function() {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    };

}

function UserAuthFactory($window, $location, $http, AuthenticationFactory, BroadcastService) {

    return {
        login: function(username, password) {

            return $http.post('http://localhost:8887/login', {
                username: username,
                password: password
            }).catch(err => {
                console.log(err);
            });

        },
        logout: function() {

            if (AuthenticationFactory.isLogged) {

                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                BroadcastService.userLoggedOut();

                $location.path("/login");

            }

        },
        username: AuthenticationFactory.user
    }

}

function TokenInterceptor($q, $window) {

    return {
        request: function(config) {

            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {

                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = "application/json";

            }
            return config || $q.when(config);

        },
        response: response => response || $q.when(response)

    };

}