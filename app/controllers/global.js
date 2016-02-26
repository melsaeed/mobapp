
safa.controller('forgetPasswordCtrl', function ($scope, $http) {
    $scope.forget_password = function () {
        if ($scope.email.length == 0) {
            error.fire("���� �������� ��� ����");
        }
        else {
            $http({
                url: api_url + 'user/forget_password',
                method: 'post',
                data: {email: $scope.email}
            }).then(function (response) {
                if (response.data.error)
                    error.fire("���� �������� ��� �����");
                else
                    error.fire("�� ����� ���� �������� ����� ������ ���� �����ѡ ���� ��");
            });
        }
    }
});

safa.controller('activity_dashboardCtrl', function () {

});

safa.controller('team_lastactivityCtrl', function () {

});
