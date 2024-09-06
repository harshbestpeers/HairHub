from django.db import models
from django.contrib.auth.models import User


class Salon(models.Model):
    SALON_TYPE_CHOICES = (("men", "men"), ("women", "women"), ("unisex", "unisex"))
    salon_type = models.CharField(
        max_length=32,
        choices=SALON_TYPE_CHOICES,
        default="unisex",
        verbose_name=("Salon Type"),
    )
    name = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="salon name"
    )
    phone_number = models.CharField(
        max_length=15, null=True, blank=True, verbose_name="Phome number"
    )
    email = models.EmailField(null=True, blank=True, verbose_name="email")
    opening_time = models.TimeField(null=True, blank=True, verbose_name="opening time")
    closing_time = models.TimeField(null=True, blank=True, verbose_name="closing time")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created at")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="update at")

    contact = models.ForeignKey(
        "contact.Contact",
        on_delete=models.CASCADE,
        related_name="contact_salons",
        verbose_name="contact",
    )
    address = models.ForeignKey(
        "contact.Address",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="address",
        verbose_name="address",
    )

    def __str__(self):
        return self.name


class Staff(models.Model):
    """
    This model Maintain staff related informaion. it's associated with
    contact and salon model.
    """

    STAFF_TYPE_CHOICES = (
        ("Receptionists", "Receptionists"),
        ("Assistants", "Assistants"),
        ("Hair Stylists", "Hair Stylists"),
        ("Managers", "Managers"),
    )
    specialization = models.CharField(
        max_length=32,
        choices=STAFF_TYPE_CHOICES,
        default="Hair Stylists",
        verbose_name=("specialization"),
    )
    available = models.BooleanField(default=True)

    contact = models.OneToOneField(
        "contact.Contact",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=("contact"),
    )
    salon = models.ForeignKey(
        Salon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=("salon")
    )

    def __str__(self):
        return str(self.contact)


class SalonService(models.Model):
    """this model is created for salon service and price"""

    SALON_SERVICES_TYPE = (
        ("hair cut", "hair cut"),
        ("Facial", "Facial"),
        ("back massage", "back massage"),
        ("head massage", "head massage"),
        ("face wash", "face wash"),
        ("bleach", "bleach"),
    )
    service_img = models.ImageField(upload_to="media/", blank=True, null=True)
    name = models.CharField(
        max_length=100,
        choices=SALON_SERVICES_TYPE,
        verbose_name="service name",
        blank=True,
        null=True,
    )
    description = models.TextField(max_length=100, blank=True, null=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="price"
    )

    salon = models.ForeignKey(
        Salon,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=("salon"),
        related_name="salonservice",
    )

    def __str__(self):
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("Scheduled", "Scheduled"),
        ("Completed", "Completed"),
        ("Canceled", "Canceled"),
    ]
    appointment_date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="Scheduled",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    customer = models.ForeignKey(
        "contact.Contact",
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )
    service = models.ForeignKey(
        SalonService, on_delete=models.CASCADE, blank=True, null=True
    )
    staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)
    salon = models.ForeignKey(
        Salon,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"Appointment for {self.customer} "


class SalonReview(models.Model):
    rating = models.PositiveSmallIntegerField(
        choices=[(i, i) for i in range(1, 6)], null=True, blank=True
    )  # 1 to 5 star rating
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey("contact.Contact", on_delete=models.CASCADE)

    def __str__(self):
        return f"Review by {self.user} for {self.salon}"


class SalonImage(models.Model):

    image = models.ImageField(upload_to="media/", blank=True, null=True)
    upload_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    salon = models.ForeignKey(
        Salon, on_delete=models.CASCADE, related_name="images", null=True, blank=True
    )
    service = models.ForeignKey(
        SalonService,
        on_delete=models.CASCADE,
        related_name="images",
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        "contact.Contact",
        on_delete=models.CASCADE,
        related_name="images",
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"Image {self.id} for {self.salon or self.service or self.user}"
