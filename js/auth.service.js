myApp.service('AuthService', AuthService);

function AuthService($window, $location, $http, AuthenticationFactory, BroadcastService) {

    return {
        login,
        logout,
        user: {
            username: $window.localStorage.username
        }
    };

    function login(username, password) {

        return $http.post('http://localhost:8887/login', {
            username: username,
            password: password
        }).catch(err => {
            console.log(err);
        });

    }

    function logout() {

        if (AuthenticationFactory.isLogged) {

            AuthenticationFactory.isLogged = false;
            delete AuthenticationFactory.user;
            delete AuthenticationFactory.userRole;

            delete $window.localStorage.token;
            delete $window.localStorage.username;
            delete $window.localStorage.userRole;

            BroadcastService.userLoggedOut();

            $location.path("/login");

        }

    }

}
