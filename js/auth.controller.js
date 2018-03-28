myApp.controller('LoginCtrl', LoginController);

function LoginController($scope, $window, $location, BroadcastService, AuthService) {

    $scope.login = () => {

        const
            username = $scope.username,
            password = $scope.password;

        if (username !== undefined && password !== undefined) {

            AuthService.login(username, password).then(() => {
                $location.path("/");
            }).catch(err => {
                console.log(err);
            });

        } else {
            alert('Invalid credentials');
        }

    };

}