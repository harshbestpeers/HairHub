from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Contact(models.Model):
    TITLE_CHOICES = (
        ('Mr', 'Mr'),
        ('Mrs', 'Mrs'),
    )

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    CONTACT_TYPE_CHOICES = (
        ('client', 'client'),
        ('Owner', 'Owner'),
        ('staff', 'Staff'),
    )
    first_name = models.CharField(max_length = 30, null = True, blank = True, verbose_name = ('First Name'))
    middle_name = models.CharField(max_length = 30, null = True, blank = True, verbose_name = ('Middle Name'))
    last_name = models.CharField(max_length  = 30, null = True, blank = True, verbose_name = ('Last Name'))
    title = models.CharField(max_length = 32, choices = TITLE_CHOICES, null=True, blank=True, verbose_name = ('Title'))
    gender = models.CharField(max_length = 32, choices = GENDER_CHOICES, null=True, blank=True, verbose_name = ('Gender'))
    username = models.CharField(max_length = 30, null = True, blank = True, verbose_name = ('Username'))
    email = models.CharField(max_length = 256, null = True, blank = True, verbose_name = ('Email'))
    phone_number = models.CharField(max_length = 16, null = True, blank = True, verbose_name = ('Phone Number'))
    birthday = models.DateField(null = True, blank = True, verbose_name = ('Birthday'))
    password = models.CharField(max_length = 200,null = True, blank = True,verbose_name = 'password')
    company_name = models.CharField(max_length = 30, null = True, blank = True, verbose_name = ('Company Name'))
    contact_type = models.CharField(max_length = 30, choices = CONTACT_TYPE_CHOICES, default = 'client', verbose_name = ('Contact Type'))
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, verbose_name=('User'))
    Address = models.ForeignKey('contact.Address', on_delete=models.CASCADE, null=True, blank=True, verbose_name=('Address'))

    def __str__(self):
        value = ''
        if self.first_name or self.middle_name or self.last_name:
            middle_name =  f'{self.middle_name}' if self.middle_name else f''
            return f'{self.title} {self.first_name} {middle_name} {self.last_name}'

        return str(value) or u''
    

class Address (models.Model):
    """
    Store address of all contact type and it's associated contact
    model with one to many relationship.
    """
    ADDRESS_TYPE_CHOICES = (
        ('home', 'Home'),
        ('salon', 'salon'),
    )

    address_type = models.CharField(max_length = 32, choices = ADDRESS_TYPE_CHOICES, default = 'home', verbose_name =('Address Type'))
    street = models.CharField(max_length = 30, verbose_name = ('Street'))
    number = models.CharField(max_length = 30, verbose_name = ('Number'))
    postal_code = models.CharField(max_length = 30, verbose_name = ('Postal Code'))
    city = models.CharField(max_length = 30, verbose_name = ('City'))
    state = models.CharField(max_length = 30, verbose_name = ('State'))
    country = models.CharField(max_length = 30, verbose_name = ('Country'))


    def get_full_address(self):
        return '%s, %s, %s, %s, %s, %s' %(self.number, self.street, self.city, self.state, self.postal_code, self.country)
