from rest_framework import serializers
from .models import Salon, User
from contact.models import Address

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class SalonSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    owner = UserSerializer()
    class Meta:
        model = Salon
        fields = ['id', 'name', 'address', 'owner']