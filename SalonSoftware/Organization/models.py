
from django.db import models
from django.contrib.auth.models import User

class Salon(models.Model):
    SALON_TYPE_CHOICES=(
        ('men', 'men'),
        ('women','women'),
        ('unisex', 'unisex')
    )
    staff_type = models.CharField(max_length=32, choices=SALON_TYPE_CHOICES, default='unisex', verbose_name=('Salon Type'))
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name="salon name")
    phone_number = models.CharField(max_length=15, null=True, blank=True, verbose_name="Phome number")
    email = models.EmailField(null=True, blank=True, verbose_name="email")
    opening_time = models.TimeField(null=True, blank=True, verbose_name="opening time")
    closing_time = models.TimeField(null=True, blank=True, verbose_name="closing time")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created at")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="update at")

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_salons', verbose_name="owner")
    address = models.ForeignKey('contact.Address',null=True, on_delete=models.SET_NULL, verbose_name="address")

    def __str__(self):
        return self.name
    

class Staff(models.Model):
    """
    This model Maintain staff related informaion. it's associated with
    contact and salon model.
    """
    STAFF_TYPE_CHOICES = (
        ('Receptionists', 'Receptionists'),
        ('Assistants','Assistants'),
        ('Hair Stylists','Hair Stylists'),
        ('Managers','Managers')
    )

    contact = models.OneToOneField('contact.Contact', on_delete=models.SET_NULL, null=True, blank=True, verbose_name=('contact'))
    salon = models.ForeignKey(Salon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=('salon'))
    staff_type = models.CharField(max_length=32, choices=STAFF_TYPE_CHOICES, default='Hair Stylists', verbose_name=('Staff Type'))


    def __str__(self):
        return str(self.contact)
    
class SalonService(models.Model):
    """this model is created for salon service and price"""
    SALON_SERVICES_TYPE=(
        ("hair cut", "hair cut"),
        ("Facial", "Facial"),
        ("back massage", "back massage"),
        ("head massage", "head massage"),
        ("face wash", "face wash"),
        ("bleach", "bleach"),
    )
    name = models.CharField(max_length=100, choices=SALON_SERVICES_TYPE, verbose_name="service name", blank=True, null=True)  
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True, verbose_name="price")  

    salon = models.ForeignKey(Salon, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=('salon'))

    def __str__(self):
        return self.name
