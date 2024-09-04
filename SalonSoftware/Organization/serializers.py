from rest_framework import serializers
from .models import Salon, User, SalonService,Appointment, Staff
from contact.models import Address, Contact

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class SalonServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonService
        fields = ['id', 'service_img', 'name', 'description', 'price']

class SalonSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    contact = ContactSerializer()
    salonservice = SalonServiceSerializer(many=True)
    class Meta:
        model = Salon
        fields = ['id', 'name', 'address', 'contact', 'salonservice']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'