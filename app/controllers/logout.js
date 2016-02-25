safa.controller('logoutCtrl', function($location){
  window.localStorage.clear();
  $location.path('login');
});
