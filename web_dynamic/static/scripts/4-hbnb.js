const url = 'http://0.0.0.0:5001/api/v1/places_search';

$(document).ready(function () {
  $('input[type="checkbox"]').click(function () {
    if (this.checked) {
      console.log(`Checkbox ${this.id} checked`);
    } else {
      console.log(`Checkbox ${this.id} unchecked`);
    }
  });

  $('button').click(function () {
    const amenities = [];
    $('input[type="checkbox"]:checked').each(function () {
      amenities.push($(this).attr('data-id'));
    });

    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenities }),
      success: function (data) {
        console.log(`Success: ${data}`);
        $('section.places').empty();
        for (const place of data) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">${place.description}</div>
            </article>`
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(`Error: ${textStatus} - ${errorThrown}`);
      }
    });
  });
});

