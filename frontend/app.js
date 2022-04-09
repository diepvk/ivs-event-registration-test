$(document).ready(function () {
  $("form").submit(function (event) {
    const formData = {
      name: $("#name").val(),
      email: $("#email").val()
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/registrations",
      data: formData,
      dataType: "json",
      encode: true,
    }).fail( function(xhr) {
      const response = JSON.parse(xhr.responseText)
      if (response.message && response.message[0]) {
        alert(response.message[0]);
      } else {
        alert('something went wrong')
      }
    }).done(function (data) {
      alert('Sign up for event successfully!')
    });

    event.preventDefault();
  });
});
