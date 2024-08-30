
document.querySelectorAll('.iconbtn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.iconbtn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});


$(document).ready(function () {
    const $container = $('#container');

    $('.iconbtn').on('click', function () {
        const category = $(this).data('category'); // Get category from data attribute
        fetchData(category);
        $container.empty();
    });

    function fetchData(category) {
        // Construct the API URL based on the category
        const apiUrl = `http://127.0.0.1:8000/organization/api/${category}s/`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $container.empty();

                data.forEach(function (item) {
                    const card = $('<div class="card"></div>');

                    // Adjust the fields based on the category
                    let imageSrc = '';
                    let title = '';

                    if (category === 'salon') {
                        imageSrc = "/static/images/mens_salon.jpg";
                        title = item.name;
                        card.html(`
                            <img src="${imageSrc}" alt="${title}">
                            <div class="card-title">${title}</div>
                            <button class="openNestedModal" data-button-id="${item.id}">Open Details</button>
                        `);
                    } else if (category === 'product') {
                        imageSrc = item.image;
                        title = item.title;
                    } else if (category === 'other') {
                        imageSrc = item.image;
                        title = item.description;
                    }

                    $container.append(card); // Append the card to the container
                });

                // After adding the dynamic content, bind the click event
                $('.openNestedModal').on('click', function () {
                    const itemId = $(this).data('button-id');
                    fetchSalonDetails(itemId);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            }
        });
    }
});


function fetchSalonDetails(itemId, category) {
    console.log(itemId)
    $.ajax({

        url: `http://127.0.0.1:8000/organization/api/salons/${itemId}/`,
        method: 'GET',
        dataType: 'json',
        success: function (salonDetails) {

            $('#nestedModal .nestedModal-content').html(`
                <span class="close" id="closeNestedModal">x</span>
                <h2>${salonDetails.name}</h2>
                <div style="background-color: white; border-bottom: 4px solid black; padding: 10px;">
                <nav style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <!-- Navigation Links -->
                    <ul style="list-style: none; display: flex; margin: 0; padding: 0;">
                    <li style="margin-right: 20px;"><button class="bar-button" data-bar="overview" onclick='xyz()' style="text-decoration: none; color: black;">Overview</button></li>
                    <li style="margin-right: 20px;"><button class="modal-bar" data-bar="service" style="text-decoration: none; color: black;">Service</button></li>
                    <li style="margin-right: 20px;"><a class="modal-bar" data-bar="review" onclick='xyz()' style="text-decoration: none; color: black;">Review</a></li>
                    <li style="margin-right: 20px;"><a href="#" class="modal-bar" data-bar="photo" style="text-decoration: none; color: black;">Photo</a></li>
                    <li style="margin-right: 20px;"><a href="#" class="modal-bar" data-bar="appointment" style="text-decoration: none; color: black;">Appointment</a></li>
                    <li><a href="#" style="text-decoration: none; color: black;">Contact</a></li>
                    </ul>
                </nav>
                </div>
                <div class="modal-content" id="modal-content">
                </div>
            `);
            $('#nestedModal').show();

            $('#closeNestedModal').on('click', function () {
                console.log("hello")
                const nestedModal = $('#nestedModal');

                nestedModal.hide();

            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching salon details:', textStatus, errorThrown);
        }
    });

}
//close the nested modal


$(window).on('click', function (event) {
    const nestedModal = $('#nestedModal');
    if (event.target == nestedModal[0]) {
        nestedModal.hide();
    }
});