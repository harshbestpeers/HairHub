function overview() {
    const $container = $('#modal-content');
    $container.html(`
<div class="container mt-4">
    <!-- Salon Introduction -->
    <section class="mb-5">
        <h2 class="text-center mb-4">Welcome to ${salonDetails.name}</h2>
        <p class="text-center">
            Experience the best salon services in town! At ${salonDetails.name}, we provide top-notch beauty and hair care services with a team of expert professionals dedicated to making you look and feel your best.
        </p>
    </section>

    <!-- Salon Services Section -->
    <div id="imageCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        {% for service in salonDetails.services %}
            <li data-target="#imageCarousel" data-slide-to="{{ forloop.counter0 }}" class="{% if forloop.first %}active{% endif %}"></li>
        {% endfor %}
    </ol>

    <!-- Carousel Items -->
    <div class="carousel-inner">
        {% for service in salonDetails.services %}
            {% if forloop.first or forloop.counter|divisibleby:3 %}
            <div class="carousel-item {% if forloop.first %}active{% endif %}">
                <div class="row">
            {% endif %}
                    <div class="col-md-4">
                        <img src="{{ service.service_img.url }}" class="d-block w-100" alt="{{ service.name }}">
                        <div class="carousel-caption">
                            <h5>{{ service.name }}</h5>
                            <p>{{ service.description }}</p>
                            <p>Price: {{ service.price }}</p>
                        </div>
                    </div>
            {% if forloop.counter|divisibleby:3 or forloop.last %}
                </div>
            </div>
            {% endif %}
        {% endfor %}
    </div>

    <!-- Controls -->
    <a class="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>

    <!-- Opening Hours Section -->
    <section class="mb-5">
        <h3 class="mb-4">Opening Hours</h3>
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>Monday - Friday</td>
                    <td>9:00 AM - 7:00 PM</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>10:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>Closed</td>
                </tr>
            </tbody>
        </table>
    </section>

    <!-- Customer Reviews Section -->
    <section class="mb-5">
        <h3 class="mb-4">Customer Reviews</h3>
        <div id="reviews-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <blockquote class="blockquote text-center">
                        <p class="mb-0">"The best salon experience ever! The staff is friendly, and I love my new hairstyle!"</p>
                        <footer class="blockquote-footer">Emily R.</footer>
                    </blockquote>
                </div>
                <div class="carousel-item">
                    <blockquote class="blockquote text-center">
                        <p class="mb-0">"Great ambiance and professional service. Highly recommended!"</p>
                        <footer class="blockquote-footer">John D.</footer>
                    </blockquote>
                </div>
                <!-- Add more customer reviews here -->
            </div>
            <a class="carousel-control-prev" href="#reviews-carousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#reviews-carousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="mb-5">
        <h3 class="mb-4">Our Gallery</h3>
        <div class="row">
            <!-- Gallery Image 1 -->
            <div class="col-md-4 mb-4">
                <img src="gallery1.jpg" class="img-fluid rounded" alt="Salon Interior">
            </div>
            <!-- Gallery Image 2 -->
            <div class="col-md-4 mb-4">
                <img src="gallery2.jpg" class="img-fluid rounded" alt="Salon Styling Area">
            </div>
            <!-- Gallery Image 3 -->
            <div class="col-md-4 mb-4">
                <img src="gallery3.jpg" class="img-fluid rounded" alt="Salon Products">
            </div>
        </div>
    </section>
</div>

    `);
}

function service() {
    const $container = $('#modal-content');
    $container.empty()
    $container.html(`
        <!-- Services Section -->
        <section id="services" class="container mt-5">
            <h2 class="text-center mb-4">Our Services</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <img src="haircut.jpg" class="card-img-top" alt="Haircut Service">
                        <div class="card-body">
                            <h5 class="card-title">Haircuts</h5>
                            <p class="card-text">From classic to trendy, our stylists offer the best haircuts tailored to your preferences.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img src="manicure.jpg" class="card-img-top" alt="Manicure Service">
                        <div class="card-body">
                            <h5 class="card-title">Manicures & Pedicures</h5>
                            <p class="card-text">Pamper yourself with our luxurious manicure and pedicure treatments.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img src="facial.jpg" class="card-img-top" alt="Facial Service">
                        <div class="card-body">
                            <h5 class="card-title">Facials</h5>
                            <p class="card-text">Rejuvenate your skin with our customized facial treatments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `);
}

function stylelist(){
    const $container = $('#modal-content');
    $container.empty()
    $container.html(`
        <section id="stylists" class="container mt-5">
        <h2 class="text-center mb-4">Meet Our Stylists</h2>
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="stylist1.jpg" class="rounded-circle mb-3" alt="Stylist 1" width="150" height="150">
                <h5>Jane Doe</h5>
                <p>Senior Stylist</p>
            </div>
            <div class="col-md-4 text-center">
                <img src="stylist2.jpg" class="rounded-circle mb-3" alt="Stylist 2" width="150" height="150">
                <h5>John Smith</h5>
                <p>Color Specialist</p>
            </div>
            <div class="col-md-4 text-center">
                <img src="stylist3.jpg" class="rounded-circle mb-3" alt="Stylist 3" width="150" height="150">
                <h5>Mary Johnson</h5>
                <p>Hair Designer</p>
            </div>
        </div>
        </section>
    `);

}

function contact(salonDetails) {
    const $container = $('#modal-content');
    $container.empty()
    console.log(salonDetails)
    $container.html(`
<!-- Header Section -->
<section class="contact-header">
    <div class="container">
        <h2>Get in Touch with Us</h2>
        <p>We'd love to hear from you! Reach out to us with any questions or feedback.</p>
    </div>
</section>

<!-- Contact Info Section -->
<section id="contact" class="container mt-5 mb-5">
    <div class="row">
        <div class="col-md-6 contact-info">
            <h5>Address</h5>
            <p>${salonDetails.address.number} ${salonDetails.address.street}</p>
            <p>${salonDetails.address.city}, ${salonDetails.address.state}</p>
            <p>${salonDetails.address.country}</p>

            <h5>Phone</h5>
            <p>${salonDetails.contact.phone_number}</p>
        </div>
        <div class="col-md-6 contact-info">
            <h5>Email</h5>
            <p>${salonDetails.contact.email}</p>

            <h5>Follow Us</h5>
            <div class="social-links">
                <a href="#" >Facebook</a> | 
                <a href="#" >Instagram</a> | 
                <a href="#" >Twitter</a>
            </div>
        </div>
    </div>

    <!-- Contact Form Section -->
    <div class="row contact-form">
        <div class="col-md-12">
            <h5>Send Us a Message</h5>
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Your Name">
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Your Email">
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea class="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </div>
</section>


    `);
}


function appointment() {
    console.log(salonDetails)
    const $container = $('#modal-content');
    $container.empty(); // Clear any existing content

    const services = salonDetails.salonservice || []; // Ensure this array exists in salonDetails

    // Convert services array to HTML options
    const serviceOptions = services.map(service => `<option value="${service.id}" data-price="${service.price}">${service.name}</option>`).join('');

    $container.html(`
        <section id="appointment" class="container mt-5 mb-5 p-4 border rounded shadow-sm bg-light position-relative overflow-hidden">
            <!-- Background Image -->
            <div class="position-absolute top-0 start-0 w-100 h-100 bg-image" style="background-image: url('your-image-url.jpg'); opacity: 0.2;"></div>
            
            <h2 class="text-center mb-4 text-primary fw-bold">Book an Appointment</h2>

            <!-- Description -->
            <p class="text-center mb-5 fs-5 text-muted">
                Schedule your appointment with our professional team today! Choose a date and time that fits your schedule, and we'll take care of the rest.
            </p>

            <!-- Trigger Modal Button -->
            <div class="text-center mb-5">
                <button type="button" class="btn btn-lg btn-primary text-white fw-bold" data-toggle="modal" data-target="#appointmentModal">
                    Book Appointment
                </button>
            </div>

            <!-- Information Box -->
            <div class="info-box mt-4 pt-3">
                <div class="row text-center">
                    <div class="col-md-4">
                        <i class="fas fa-calendar-alt fa-3x mb-3 text-primary"></i>
                        <h5 class="fw-bold">Flexible Scheduling</h5>
                        <p>Choose the time that suits you best, from early mornings to late evenings.</p>
                    </div>
                    <div class="col-md-4">
                        <i class="fas fa-user-md fa-3x mb-3 text-primary"></i>
                        <h5 class="fw-bold">Expert Staff</h5>
                        <p>Our experienced professionals are here to provide top-notch service.</p>
                    </div>
                    <div class="col-md-4">
                        <i class="fas fa-map-marker-alt fa-3x mb-3 text-primary"></i>
                        <h5 class="fw-bold">Convenient Location</h5>
                        <p>Visit us at our easy-to-access location with ample parking.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal Structure -->
        <div class="modal fade" id="appointmentModal" tabindex="-1" role="dialog" aria-labelledby="appointmentModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="appointmentModalLabel">Book an Appointment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-row mb-3">
                            <div class="col">
                                <label for="appointmentDate" class="fw-bold">Date</label>
                                <input type="date" class="form-control" id="appointmentDate" required>
                            </div>
                            <div class="col">
                                <label for="appointmentTime" class="fw-bold">Time</label>
                                <input type="time" class="form-control" id="appointmentTime" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="service">Select Service</label>
                            <select class="form-control" id="service">
                                <option value="">Select a service</option>
                                ${serviceOptions}
                            </select>
                        </div>
                        <div class="form-group mb-3">
                                <label for="price">Price</label>
                                <div id="price" class="form-control-plaintext">$0.00</div>
                        </div>

                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="submitAppointment">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    `);

    $('#service').on('change', function() {
        const selectedOption = $(this).find('option:selected');
        const price = selectedOption.data('price');
        $('#price').text(`$${price}`);
    });

    $('#submitAppointment').on('click', function() {
        fetchAppointmentData(salonDetails);
    });
}


function fetchAppointmentData(salonDetails) {
    var userInfoDiv = document.getElementById('dropdownMenuButton');
    var username = userInfoDiv.getAttribute('data-username');

    const formData = {
        appointment_date: $('#appointmentDate').val(),
        status: 'Scheduled', // Default status
        customer: username , // Assuming customer ID is from salonDetails
        service: $('#service').val(), // Pass the service ID; adjust based on your model
        staff: 1, // Set staff ID if available
        salon: salonDetails.id
    };
    

console.log(username);
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
        url: 'http://127.0.0.1:8000/organization/api/appointments/', // URL to your Django API endpoint
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'X-CSRFToken': csrfToken // Directly embed the CSRF token from Django template
        },
        
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('Appointment created successfully', response);
            // Handle success (e.g., show a success message, redirect, etc.)
        },
        error: function(xhr, status, error) {
            console.error('Error creating appointment:', error);
            // Handle error (e.g., show an error message)
        }
    });
}