/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */
var safa = angular.module('safa', [
    'ngRoute',
    'ngCookies',
]);
safa.config(function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/welcome_screen', {templateUrl: 'templates/welcome_screen.html', controller: 'welcome_screenCtrl'}).
        when('/login', {templateUrl: 'templates/login.html', controller: 'loginCtrl'}).
        when('/logout', {templateUrl: 'templates/login.html',controller: 'logoutCtrl'}).
        when('/forget_pass', {templateUrl: 'templates/forget_pass.html', controller: 'forgetPasswordCtrl'}).
        when('/registration', {templateUrl: 'templates/registration.html', controller: 'registrationCtrl'}).
        when('/activity_dashboard', {templateUrl: 'templates/activity_dashboard.html', controller: 'activity_dashboardCtrl'}).
        when('/main_dashboard', {templateUrl: 'templates/main_dashboard.html', controller: 'main_dashboardCtrl'}).
        when('/main', {templateUrl: 'templates/main.html', controller: 'mainCtrl'}).
        when('/users', {templateUrl: 'templates/users.html', controller: 'usersCtrl'}).
        when('/circles', {templateUrl: 'templates/circles.html', controller: 'circlesCtrl'}).
        when('/edit_group/:id', {templateUrl: 'templates/edit_group.html', controller: 'edit_groupCtrl'}).
        when('/create_group', {templateUrl: 'templates/edit_group.html', controller: 'create_groupCtrl'}).
        when('/circle_comp/:type/:id', {templateUrl: 'templates/transport_emp.html', controller: 'circle_compCtrl'}).
        when('/team_lastactivity', {templateUrl: 'templates/team_lastactivity.html', controller: 'team_lastactivityCtrl'}).
        when('/company_orders', {templateUrl: 'templates/company_orders.html', controller: 'company_ordersCtrl'}).
        otherwise({redirectTo: '/login'});
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

safa.factory('httpRequestInterceptor', function ($cookies) {
    return {
        request: function (config) {
          console.log($cookies.get('token'));
            config.headers['X-Auth-Token'] = $cookies.get('token');//window.localStorage.getItem("token");
            return config;
        }
    };
});

safa.run(['$http', function ($http) {
    $http.defaults.withCredentials = true;
//    //if(typeof token != 'undefined' && token != '')
//    //if ($cookies.get('token'))
//    //    $http.defaults.headers.common['X-Auth-Token'] = $cookies.get('token');
//    //else
//    //    $http.defaults.headers.common['X-Auth-Token'] = window._token;
//
//    //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);
