function appointment() {
    const $container = $('#modal-content');
    $container.empty(); // Clear any existing content

    const services = salonDetails.salonservice || []; // Ensure this array exists in salonDetails


    const serviceOptions = services.map(service => `<option value="${service.id}" data-price="${service.price}">${service.name}</option>`).join('');
    $container.html(`
        <section id="appointment" class="container mt-5 mb-5 p-4 border rounded shadow-sm bg-light position-relative overflow-hidden">
            <!-- Background Image -->
            <div class="position-absolute top-0 start-0 w-100 h-100 bg-image" ></div>
            
            <h2 class="text-center mb-4 text-primary fw-bold">Book an Appointment</h2>

            <!-- Description -->
            <p class="text-center mb-5 fs-5 text-muted">
                Schedule your appointment with our professional team today! Choose a date and time that fits your schedule, and we'll take care of the rest.
            </p>

            <!-- Trigger Modal Button -->
            <div class="text-center mb-5">
                <button type="button" onclick="date_time()" class="btn btn-lg btn-primary text-white fw-bold" data-toggle="modal" data-target="#appointmentModal">
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

            <!-- Previous Appointments -->
            <div id="previousAppointments" class="mt-5">
                <h3 class="text-center mb-4 text-primary fw-bold">Your Previous Appointments</h3>
                <div id="appointmentsList" class="list-group">
                    <!-- Appointments will be loaded here dynamically -->
                </div>
            </div>
        </section>

        <!-- Modal Structure -->
        <div class="modal fade" id="appointmentModal" tabindex="-1" role="dialog" aria-labelledby="appointmentModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="appointmentModalLabel">Book an Appointment</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-row mb-3">
                            <div class="col">
                                <label for="appointmentDate" class="fw-bold">Date</label>
                                <input type="date" class="form-control" id="appointmentDate" required>
                            </div>
                            <div class="col">
                                <label for="time">Select Available Time</label>
                                <select class="form-control" id="time">
                                    <option value="">Select a service</option>
                                    <!-- Time options will be inserted here dynamically -->
                                </select>
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
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="submitAppointment">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    `);

      // call this function to display to time
    displayAppointments();  // call this function to display previouse appointment
    // AvailableTime();
    $('#service').on('change', function () {
        const selectedOption = $(this).find('option:selected');
        const price = selectedOption.data('price');
        $('#price').text(`$${price}`);
    });

    $('#submitAppointment').on('click', function () {
        fetchAppointmentData(salonDetails);
    });
}



function date_time() {
    const dateInput = document.getElementById('appointmentDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;

    const updateTimeConstraints = () => {

        const selectedDate = dateInput.value;

        AvailableTime(selectedDate).then(availableTimes => {

            const timeOptions = availableTimes.map(time => `<option value="${time}">${time}</option>`).join('');
            $('#time').html(`
                <option value="">Select available time</option>
                ${timeOptions}
                `);
        }).catch(error => {
            console.error('Error fetching available times:', error);
        });
    };

    dateInput.addEventListener('change', updateTimeConstraints);
    updateTimeConstraints();
}


function displayAppointments() {
    const $list = $('#appointmentsList');
    $list.empty(); // Clear any existing appointments

    const appointment_data = fetchPreviousAppointments()
    appointment_data.then(data => {
            data.forEach(appointment => {
                const appointmentItem = `
                    <div class="list-group-item">
                        <h5>Appointment : ${appointment.customer_details.first_name}</h5>
                        <p>Date: ${appointment.appointment_date}</p>
                        <p>Time: ${appointment.time}</p>
                        <p>Service: ${appointment.service_details.name}</p>
                        <p>Status: ${appointment.status}</p>
                        <p>Salon: ${appointment.salon_details.name}</p>
                    </div>
                `;
                $list.append(appointmentItem);
            });
        })
        .catch(error => {
            console.error('Error handling appointments:', error);
        });
}


// call api
//  call api to get the data of user previouse appointment
function fetchPreviousAppointments() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://127.0.0.1:8000/organization/appointments/', // Update with your API URL
            method: 'GET',
            success: function (data) {
                resolve(data); // Resolve the promise with the fetched data
            },
            error: function (xhr, status, error) {
                console.error('Error fetching previous appointments:', error);
                alert('Failed to load previous appointments.');
                reject(error); // Reject the promise with the error
            }
        });
    });
}

// call ajax to store date into database
function fetchAppointmentData(salonDetails) {
    const formData = {
        appointment_date: $('#appointmentDate').val(),
        time: $('#time').val(),
        status: 'Scheduled', 
        service: $('#service').val(), 
        salon: salonDetails.id
    };
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
        url: 'http://127.0.0.1:8000/organization/appointments/', // URL to your Django API endpoint
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'X-CSRFToken': csrfToken // Directly embed the CSRF token from Django template
        },

        data: JSON.stringify(formData),
        success: function (response) {
            console.log('Appointment created successfully', response);
            displayAppointments();  // call api to get the update data
            date_time();  // call api to get available time 
            alert('Appointment booked successfully!');
        },
        error: function (xhr, status, error) {
            console.error('Error creating appointment:', error);
            // Handle error (e.g., show an error message)
            alert('Error booking appointment. Please try again.');
        }
    });
}

function AvailableTime(selectedDate){

    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://127.0.0.1:8000/organization/AvailableTime/?salon=${salonDetails.id}&date=${selectedDate}`, // URL to your Django API endpoint
            method: 'GET',
            success: function (data) {
                resolve(data.available_times);
                // Resolve the promise with the fetched data
                
            },
            error: function (xhr, status, error) {
                console.error('Error fetching previous appointments:', error);
                alert('Failed to load previous appointments.');
                reject(error); // Reject the promise with the error
            }
        });
    });
}