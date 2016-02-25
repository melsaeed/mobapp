safa.controller('main_dashboardCtrl', function ($scope, $http, $location, $rootScope) {



    //loading.start();
    $http.get(api_url + "key")
        .then(function (response) {
            if (response.error) {
                $location.path("/login");
            }
            $scope.company = response.data.company;
            //dropdowns.countries($('select[name=country_id]'), response.data.company.country_id);
            //if($location.url() == '/company'){
            //$rootScope.userImage = response.data.company.logo;
            //$scope.user.img = response.data.company.logo;
            //}
            //loading.stop();
        }, function (response) {
            $location.path("/login");
        });
});
