$(document).ready(function () {
    const url = "http://0.0.0.0:5001/api/v1/places_search/";
    const placesSection = $("section.places");

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            for (let place of response) {
                const article = $('<article>');

                $('<div>', {
                    class: 'title',
                    html: `<h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div>`
                }).appendTo(article);

                $('<div>', {
                    class: 'information',
                    html: `<div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${place.number_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`
                }).appendTo(article);

                $('<div>', {
                    class: 'description',
                    text: place.description
                }).appendTo(article);

                placesSection.append(article);
            }
        }
    });
});

