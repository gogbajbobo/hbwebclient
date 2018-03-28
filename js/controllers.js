myApp.controller("HeaderCtrl", HeaderController);
myApp.controller("HomeCtrl", HomeController);
myApp.controller("UserListCtrl", UserListController);

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

function HomeController($scope, $http) {

    $scope.name = "Home Controller";

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

function UserListController($scope) {
    $scope.name = "User List Controller";
}

// myApp.controller("Page1Ctrl", ['$scope',
//
//     function($scope) {
//         $scope.name = "Page1 Controller";
//     }
//
// ]);
//
// myApp.controller("Page2Ctrl", ['$scope',
//
//     function($scope) {
//         $scope.name = "Page2 Controller";
//         // below data will be used by checkmark filter to show a ✓ or ✘ next to it
//         $scope.list = ['yes', 'no', true, false, 1, 0];
//     }
//
// ]);
//
// myApp.controller("Page3Ctrl", ['$scope', 'todosFactory',
//
//     function($scope, todosFactory) {
//         $scope.name = "Page3 Controller";
//         $scope.todos = [];
//
//         // Access the factory and get the latest Todos list
//         todosFactory.getTodos().then(function(data) {
//             $scope.todos = data.data;
//         });
//
//     }
//
// ]);
