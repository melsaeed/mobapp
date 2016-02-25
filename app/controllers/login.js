safa.controller('loginCtrl', function ($scope, $http, $location, $cookies) {

    $scope.credintials = {email: "", password: ""};
    $scope.login = function () {
        $http({
            url: api_url + 'auth/login',
            withCredentials: true,
            params: {email: $scope.credintials.email, password: calcMD5($scope.credintials.password)},
            method: 'GET'
        }).then(function (response) {
            if (response.data.error) {
                error.fire(response.data.message);
                response.data.token
            }
            else{
                //window.localStorage.setItem('token', response.data.token);
                $location.path('users');
            }
        });
    };

    //dropdowns.countries('.countries');
    //$('.loginform').submit(function (e) {
    //    e.preventDefault();
    //    $.getJSON(api_url + 'auth/login', {
    //        email: $('input[name=email]').val(),
    //        password: calcMD5($('input[name=password]').val())
    //    }, function (response) {
    //        if (response.data.error)
    //            error.fire(response.data.message);
    //        else
    //            $location.path('/profile');
    //    });
    //});
    //loading.stop();

});
