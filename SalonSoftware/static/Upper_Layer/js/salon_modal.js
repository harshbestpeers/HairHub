function overview() {
    const $container = $('#modal-content');
    overview_content();
    $container.html(`
<div class="container mt-4">
    <!-- Salon Introduction -->
    <section class="mb-5 text-center">
        <h2 class="display-4 mb-4">Welcome to ${salonDetails.name}</h2>
        <p class="lead">
            Experience the best salon services in town! At ${salonDetails.name}, we provide top-notch beauty and hair care services with a team of expert professionals dedicated to making you look and feel your best.
        </p>
    </section>

    <!-- Salon Services Section -->
    <section class="mb-5">
        <h5 class="font-weight-bold mb-4">Salon Services</h5>
        <div class="row service-section">
            <!-- Dynamic content will be inserted here -->
        </div>
    </section>

    <!-- Opening Hours Section -->
    <section class="mb-5">
        <h3 class="font-weight-bold mb-4">Opening Hours</h3>
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
        <h3 class="font-weight-bold mb-4">Customer Reviews</h3>
        <div id="reviews-carousel" class="carousel slide" data-bs-ride="carousel">
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
            <a class="carousel-control-prev" href="#reviews-carousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#reviews-carousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="mb-5">
        <h3 class="font-weight-bold mb-4">Our Gallery</h3>
        <div class="row">
            <!-- Dynamic content will be inserted here -->
        </div>
    </section>
</div>
    `);
}


function overview_content() {
    $.ajax({
        url: `http://127.0.0.1:8000/organization/salonserviceslist/?salon=${salonDetails.id}`,
        type: 'GET',
        success: function (response) {
            const service = response;
            let carouselIndicators = '';
            let carouselInner = '';

            response.forEach((service, index) => {
                // Add indicators

                carouselIndicators += `
                  <button type="button" data-bs-target="#serviceCarousel" data-bs-slide-to="${index}" 
                          class="btn btn-dark ${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : ''}" aria-label="Slide ${index + 1}">
                  </button>`;

                // Create carousel items
                carouselInner += `
                   <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <div class="card" style="width: 100%; margin: 0 auto;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${service.service_img}" class="img-fluid" alt="${service.name}" style="height: 200px; object-fit: cover;">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${service.name}</h5>
                                        <p class="card-text">${service.description ? service.description : 'No description available.'}</p>
                                        <p class="card-text"><strong>Price: $${service.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> `


            });

            // Insert carousel into the HTML
            $('.service-section').html(`
                <div id="serviceCarousel" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    ${carouselIndicators}
                  </div>
                  <div class="carousel-inner">
                    ${carouselInner}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
            `);

            // Re-initialize the carousel after dynamically adding the content
            var myCarousel = new bootstrap.Carousel(document.getElementById('serviceCarousel'), {
                interval: 2000,
                wrap: true
            });



        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            $('.service-section').html(`<p>Failed to load services. Please try again. Error: ${xhr.statusText}</p>`);
        }
    });
}



function service() {
    const $container = $('#modal-content');
    $container.empty(); // Clear existing content

    $.ajax({
        url: `http://127.0.0.1:8000/organization/salonserviceslist/?salon=${salonDetails.id}`,
        type: 'GET',
        success: function (response) {
            // Assuming response is an array of service objects
            const services = response; // or response.services if the data is nested

            // Create HTML content for each service
            let servicesHtml = services.map(service => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${service.service_img}" class="card-img-top" alt="${service.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${service.name}</h5>
                            <p class="card-text">${service.description ? service.description : 'No description available.'}</p>
                            <p class="card-text"><strong>Price: $${service.price}</strong></p>
                        </div>
                    </div>
                </div>
            `).join('');

            // Append the generated HTML to the container
            $container.html(`
                <div class="container mt-4">
                    <div class="row">
                        ${servicesHtml}
                    </div>
                </div>
            `);
        },
        error: function () {
            // Handle errors here
            $container.html('<p class="text-danger">Failed to load services. Please try again later.</p>');
        }
    });
}




function stylelist() {
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
    console.log(salonDetails.address.id)
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


