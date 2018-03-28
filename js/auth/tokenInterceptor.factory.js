myApp.factory('TokenInterceptor', TokenInterceptor);

function TokenInterceptor($injector) {

    return {
        request: config => {

            const AuthService = $injector.get('AuthService');

            if (AuthService.token) {

                console.log('1', config.headers);

                config.headers['Authorization'] = AuthService.token;
                config.headers['Content-Type'] = "application/json";

                console.log('2', config.headers);

            }
            return config;

        }
    };

}