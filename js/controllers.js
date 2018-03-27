myApp.controller("HeaderCtrl", HeaderController);
myApp.controller("HomeCtrl", HomeController);
myApp.controller("UserListCtrl", UserListController);

function HeaderController($scope, $location, UserAuthFactory) {

    $scope.$on('login', function () {
        console.log('login');
        $scope.username = UserAuthFactory.username;
    });

    $scope.$on('logout', function () {
        console.log('logout');
        $scope.username = undefined;
    });

    $scope.isActive = route => route === $location.path();
    $scope.logout = () => { UserAuthFactory.logout(); }
    $scope.username = UserAuthFactory.username;

}

function HomeController($scope) {
    $scope.name = "Home Controller";
}

function UserListController($scope) {
    $scope.name = "User List Controller";
}

myApp.controller("Page1Ctrl", ['$scope',

    function($scope) {
        $scope.name = "Page1 Controller";
    }

]);

myApp.controller("Page2Ctrl", ['$scope',

    function($scope) {
        $scope.name = "Page2 Controller";
        // below data will be used by checkmark filter to show a ✓ or ✘ next to it
        $scope.list = ['yes', 'no', true, false, 1, 0];
    }

]);

myApp.controller("Page3Ctrl", ['$scope', 'todosFactory',

    function($scope, todosFactory) {
        $scope.name = "Page3 Controller";
        $scope.todos = [];

        // Access the factory and get the latest Todos list
        todosFactory.getTodos().then(function(data) {
            $scope.todos = data.data;
        });

    }

]);
