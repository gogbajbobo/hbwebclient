myApp.service('AuthService', AuthService);

function AuthService($window, $location, $http, BroadcastService) {

    return {
        check,
        login,
        logout,
        user: {
            username: $window.localStorage.username,
            userRole: $window.localStorage.userRole
        },
        isLogged: false
    };

    function check() {

        if ($window.localStorage.token && $window.localStorage.username) {
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

        return $http.post('http://localhost:8887/login', {
            username: username,
            password: password
        }).catch(err => {
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
