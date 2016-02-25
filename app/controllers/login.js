safa.controller('loginCtrl', function ($scope, $http, $location, $cookies) {

    $scope.credintials = {email: "", password: ""};
    $scope.login = function () {
        //loading.start();
        $http({
            url: api_url + 'auth/login',
            withCredentials: true,
            params: {email: $scope.credintials.email, password: calcMD5($scope.credintials.password)},
            method: 'GET'
        }).then(function (response) {
            //loading.stop();
            if (response.data.error) {
                error.fire(response.data.message);
                response.data.token
            }
            else{
                window.localStorage.setItem('token', response.data.token);
                $location.path('users');
            }
        });
    };

    dropdowns.countries('.countries');
});
