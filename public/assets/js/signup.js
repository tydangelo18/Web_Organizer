$(document).ready(function () {
$('.signup').on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let name = $('#email-input').val().trim()
    let password = $('#password-input').val().trim()
    
    // Send the POST request.
    $.ajax('/api/users', {
      type: 'POST',
      data: {email:name, password:password},
      credentials: "include"
    }).then(
      function() {
        console.log('created new user');
        // Reload the page to get the updated list
        location.reload();
        window.location.replace("/login");
      }
    );
  });
});