myApp.controller("HeaderCtrl", HeaderController);

function HeaderController($scope, $location, AuthService) {

    $scope.$on('login', function () {

        console.log('login', AuthService.user.username);
        $scope.username = AuthService.user.username;

    });

    $scope.$on('logout', function () {

        console.log('logout', AuthService.user.username);
        $scope.username = undefined;

    });

    $scope.isActive = route => route === $location.path();
    $scope.logout = () => { AuthService.logout(); };
    $scope.username = AuthService.user.username;

}
