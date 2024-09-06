from rest_framework import serializers
from .models import Salon, User, SalonService, Appointment, Staff
from contact.models import Address, Contact


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class SalonServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonService
        fields = ["id", "service_img", "name", "description", "price"]


class SalonSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    contact = ContactSerializer()
    salonservice = SalonServiceSerializer(many=True)

    class Meta:
        model = Salon
        fields = ["id", "name", "address", "contact", "salonservice"]


class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=SalonService.objects.all(), write_only=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Contact.objects.all(), write_only=True)
    salon = serializers.PrimaryKeyRelatedField(queryset=Salon.objects.all(), write_only=True)

    # Use nested serializers for read-only representation
    service_details = SalonServiceSerializer(source='service', read_only=True)
    customer_details = ContactSerializer(source='customer', read_only=True)
    salon_details = SalonSerializer(source='salon', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "appointment_date",
            "time",
            "status",
            "customer",
            "service",
            "salon",
            "service_details",
            "customer_details",
            "salon_details",
        ]




