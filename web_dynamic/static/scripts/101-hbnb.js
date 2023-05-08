$(document).ready(function () {
  // Function to fetch and display reviews
  function showReviews() {
    const placeId = $('.reviews').data('place-id');

    $.get(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`, function (data, textStatus) {
      if (textStatus === 'success') {
        $('.reviews ul').empty();

        data.forEach((review) => {
          const username = review.user_id;
          const dateStr = new Date(review.created_at).toDateString();
          const text = review.text;

          const reviewHtml = `
            <li>
              <h3>From ${username} on ${dateStr}</h3>
              <p>${text}</p>
            </li>
          `;

          $('.reviews ul').append(reviewHtml);
        });
      }
    });
  }

  // Click handler for show/hide reviews button
  $('h2:contains("Reviews") + span').on('click', function () {
    const buttonText = $(this).text().trim();

    if (buttonText === 'show') {
      // Fetch and display reviews
      showReviews();
      $(this).text('hide');
    } else {
      // Hide reviews
      $('.reviews ul').empty();
      $(this).text('show');
    }
  });
});

