safa.controller('mainCtrl', function ($scope) {
    $scope.tab_content = "templates/tabs/users.html";

    $scope._switch = function ($template) {
        $scope.tab_content = "templates/tabs/" + $template + ".html";
    };

    $scope.search_modal = function () {
        $('#mysrach').modal('show');
    };
});
