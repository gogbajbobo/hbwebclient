myApp.service('AuthService', AuthService);

function AuthService($window, $location, $http, AuthenticationFactory, BroadcastService) {

    return {
        login,
        logout,
        user: {
            username: $window.sessionStorage.username
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

            delete $window.sessionStorage.token;
            delete $window.sessionStorage.username;
            delete $window.sessionStorage.userRole;

            BroadcastService.userLoggedOut();

            $location.path("/login");

        }

    }

}
