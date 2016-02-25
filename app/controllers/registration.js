safa.controller('registrationCtrl', function () {
  dropdowns.countries('.countries');
  $('.registerform').submit(function (e) {
     e.preventDefault();
     $.getJSON(api_url + 'user', $(this).serialize(), function (response) {
         if (response.error) {
             error.fire(response.message);
         }
         else {
             error.fire("Confirmation email has been sent to your email shortly");
         }
     });
  });
});
