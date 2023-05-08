$(document).ready(function () {
  const amenitiesChecked = {};
  const statesChecked = {};
  const citiesChecked = {};

  // Update the h4 tag inside the div Locations with the list of States or Cities checked
  function updateLocations () {
    const locations = [];
    for (const stateId in statesChecked) {
      locations.push(statesChecked[stateId]);
    }
    for (const cityId in citiesChecked) {
      locations.push(citiesChecked[cityId]);
    }
    const locationsText = locations.join(', ');
    $('div.locations h4').text(locationsText);
  }

  // Listen to changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const input = $(this);
    const itemId = input.data('id');
    const itemName = input.data('name');
    const itemChecked = input.prop('checked');
    if (input.hasClass('amenity')) {
      if (itemChecked) {
        amenitiesChecked[itemId] = itemName;
      } else {
        delete amenitiesChecked[itemId];
      }
    } else if (input.hasClass('state')) {
      if (itemChecked) {
        statesChecked[itemId] = itemName;
      } else {
        delete statesChecked[itemId];
      }
      // Update cities checkboxes visibility based on the state checked
      $(`.cities[data-state="${itemId}"]`).toggle(itemChecked);
    } else if (input.hasClass('city')) {
      if (itemChecked) {
        citiesChecked[itemId] = itemName;
      } else {
        delete citiesChecked[itemId];
      }
    }
    updateLocations();
  });

  // Make a new POST request to places_search when the button is clicked
  $('button').click(function () {
    const placesSearchData = {
      amenities: Object.keys(amenitiesChecked),
      states: Object.keys(statesChecked),
      cities: Object.keys(citiesChecked),
    };
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(placesSearchData),
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          const placeTemplate = `
            <article>
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
            </article>
          `;
          $('section.places').append(placeTemplate);
        }
      },
    });
  });
});

