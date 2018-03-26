myApp.factory('AuthenticationFactory', $window => {

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

});

myApp.factory('UserAuthFactory', ($window, $location, $http, AuthenticationFactory) => {

    return {
        login: (username, password) => {

            return $http.post('http://localhost:3000/login', {
                username: username,
                password: password
            });

        },
        logout: () => {

            if (AuthenticationFactory.isLogged) {

                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                $location.path("/login");

            }

        }
    }

});

myApp.factory('TokenInterceptor', ($q, $window) => {

    return {
        request: config => {

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

});
