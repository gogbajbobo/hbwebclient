myApp.factory('TokenInterceptor', TokenInterceptor);

function TokenInterceptor($q, $window) {

    return {
        request: config => {

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