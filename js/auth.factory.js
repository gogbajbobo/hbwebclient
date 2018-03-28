myApp.factory('AuthenticationFactory', AuthenticationFactory);
myApp.factory('TokenInterceptor', TokenInterceptor);

function AuthenticationFactory($window) {

    return auth = {
        isLogged: false,
        check: function() {
            if ($window.localStorage.token && $window.localStorage.username) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    };

}

function TokenInterceptor($q, $window) {

    return {
        request: function(config) {

            config.headers = config.headers || {};

            if ($window.localStorage.token) {

                config.headers['X-Access-Token'] = $window.localStorage.token;
                config.headers['X-Key'] = $window.localStorage.username;
                config.headers['Content-Type'] = "application/json";

            }
            return config || $q.when(config);

        },
        response: response => response || $q.when(response)

    };

}