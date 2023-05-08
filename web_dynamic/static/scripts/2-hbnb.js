$(document).ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, function (data) {
    if (data.status === "OK") {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});

