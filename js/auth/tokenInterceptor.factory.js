myApp.factory('TokenInterceptor', TokenInterceptor);

function TokenInterceptor($injector) {

    return {
        request: config => {

            const AuthService = $injector.get('AuthService');

            if (AuthService.token) {
                config.headers.Authorization = 'Bearer ' + AuthService.token;
            }

            console.log(config.url, config.headers);

            return config;

        }
    };

}