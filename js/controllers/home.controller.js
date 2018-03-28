myApp.controller("HomeCtrl", HomeController);

function HomeController($scope, $http, AuthService) {

    $scope.isAdmin = AuthService.user.role === 'admin';
    $scope.username = AuthService.user.username;

    $scope.test = () => {

        return $http
            .post('http://localhost:8887/secret')
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });

    };

}
