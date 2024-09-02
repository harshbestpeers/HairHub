from rest_framework import viewsets
from .models import Salon,Appointment
from .serializers import SalonSerializer,AppointmentSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated


class SalonViewSet(viewsets.ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer