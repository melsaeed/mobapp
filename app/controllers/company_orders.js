safa.controller('company_ordersCtrl', function ($scope) {
    $scope.tab_content = "templates/tabs/in_orders.html";

    $scope._switch = function ($template) {
        $scope.tab_content = "templates/tabs/" + $template + ".html";
    };
});
