myApp.controller("UserListCtrl", UserListController);

function UserListController($scope, $http) {

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
