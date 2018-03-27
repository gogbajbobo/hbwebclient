myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', 'BroadcastService',

    function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory, BroadcastService) {

        $scope.user = {
            username: 'grimax1',
            password: '12345'
        };

        $scope.login = function() {

            const
                username = $scope.user.username,
                password = $scope.user.password;

            if (username !== undefined && password !== undefined) {

                UserAuthFactory.login(username, password).then(response => {

                    const data = response.data;

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

]);