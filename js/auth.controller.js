myApp.controller('LoginCtrl', LoginController);

function LoginController($scope, $window, $location, AuthenticationFactory, BroadcastService, AuthService) {

    // $scope.user = {
    //     // username: 'grimax',
    //     // password: '12345'
    // };

    $scope.login = () => {

        const
            username = $scope.user.username,
            password = $scope.user.password;

        if (username !== undefined && password !== undefined) {

            AuthService.login(username, password).then(response => {

                const data = response.data;

                AuthService.user = data.user;

                AuthenticationFactory.isLogged = true;
                AuthenticationFactory.user = data.user.username;
                AuthenticationFactory.userRole = data.user.role;

                $window.sessionStorage.token = data.token;
                $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
                $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

                BroadcastService.userLoggedIn();

                $location.path("/");

            }).catch(err => {
                console.log(err);
            });

        } else {
            alert('Invalid credentials');
        }

    };

}