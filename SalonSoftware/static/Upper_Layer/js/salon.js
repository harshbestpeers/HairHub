document.querySelectorAll('.iconbtn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.iconbtn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});



$(document).ready(function () {
    const $container = $('#container');

    $('.salon-type').on('click', function () {
        const type = $(this).data('type');
        const category = $(this).data('category');
        fetchData(category, type);
        $container.empty();
    });

    function fetchData(category,type) {
        const apiUrl = `http://127.0.0.1:8000/organization/api/${category}s/?salon_type=${type}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $container.empty();

                data.forEach(function (item) {
                    const card = $('<div class="col-md-4"></div>').append(
                        $('<div class="card"></div>').append(
                            $('<img class="card-img-top" alt="Image">').attr('src', category === 'salon' ? "/static/images/mens_salon.jpg" : item.image),
                            $('<div class="card-body"></div>').append(
                                $('<h5 class="card-title"></h5>').text(category === 'salon' ? item.name : category === 'product' ? item.title : item.description),
                                $('<button class="btn btn-primary openNestedModal"></button>').text('Open Details').data('button-id', item.id)
                            )
                        )
                    );

                    $container.append(card);
                });
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

function fetchSalonDetails(itemId) {
    $.ajax({
        url: `http://127.0.0.1:8000/organization/api/salons/${itemId}/`,
        method: 'GET',
        dataType: 'json',
        success: function (salonDetails) {
            window.salonDetails = salonDetails;
            $('#nestedModalLabel').html(`
                <h2 class="text-center">${salonDetails.name}</h2>
            `);

            $('#nestedModalBody').html(`
                <nav class="navbar navbar-expand-lg ">
                    <div class="container-fluid">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="#" onclick="overview(window.salonDetails)">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onclick="service()">Service</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onclick="photo()">Photo</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onclick="contact(window.salonDetails)">Contact</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onclick="appointment()">Appointment</a></li>
                        </ul>
                    </div>
                </nav>
                <div id="modal-content"></div>
            `);
            overview();
            const modal = new bootstrap.Modal(document.getElementById('nestedModal'));
            modal.show();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching salon details:', textStatus, errorThrown);
        }
    });
}
