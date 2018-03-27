myApp.factory('AuthenticationFactory', AuthenticationFactory);
myApp.factory('TokenInterceptor', TokenInterceptor);

function AuthenticationFactory($window) {

    return auth = {
        isLogged: false,
        check: function() {
            if ($window.sessionStorage.token && $window.sessionStorage.username) {
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

            if ($window.sessionStorage.token) {

                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.username;
                config.headers['Content-Type'] = "application/json";

            }
            return config || $q.when(config);

        },
        response: response => response || $q.when(response)

    };

}