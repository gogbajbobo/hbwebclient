myApp.service('AuthService', AuthService);

function AuthService($window, $location, $http, BroadcastService, jwtHelper) {

    return {
        check,
        login,
        logout,
        user: {
            username: $window.localStorage.username,
            role: $window.localStorage.role
        },
        isLogged: false
    };

    function check() {

        if ($window.localStorage.accessToken) {

            const tokenPayload = jwtHelper.decodeToken($window.localStorage.accessToken);

            this.user.username = tokenPayload.username;
            this.user.role = tokenPayload.role;

            this.isLogged = true;
        } else {
            this.isLogged = false;
            flush();
        }

    }
    
    function flush() {

        delete this.user;
        $window.localStorage.clear();

    }

    function login(username, password) {

        return $http
            .post('http://localhost:8887/login', {
                username: username,
                password: password
            })
            .then(response => {

                const data = response.data;

                this.isLogged = true;
                this.user = data.user;

                $window.localStorage.accessToken = data.accessToken;
                $window.localStorage.refreshToken = data.refreshToken;

                BroadcastService.userLoggedIn();

            })
            .catch(err => {
                console.log(err);
            });

    }

    function logout() {

        if (this.isLogged) {

            this.isLogged = false;

            flush();

            BroadcastService.userLoggedOut();

            $location.path("/login");

        }

    }

}
