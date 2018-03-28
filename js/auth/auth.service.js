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
        isLogged: false,
        token: $window.localStorage.accessToken
    };

    function check() {

        if (this.token) {

            const tokenPayload = jwtHelper.decodeToken(this.token);

            this.user.username = tokenPayload.username;
            this.user.role = tokenPayload.role;

            this.isLogged = true;
        } else {
            this.isLogged = false;
            flush(this);
        }

    }

    function flush(authService) {

        authService.user = {};
        authService.token = undefined;
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
                this.token = data.accessToken;

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

            flush(this);

            BroadcastService.userLoggedOut();

            $location.path("/login");

        }

    }

}
