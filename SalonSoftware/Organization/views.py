from rest_framework import viewsets
from .models import Salon,Appointment,SalonService
from contact.models import Contact
from .serializers import SalonSerializer,AppointmentSerializer, SalonServiceSerializer,UserAppointmentSerializer
from django.contrib.auth.decorators import login_required
from django.views import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


# class SalonViewSet(viewsets.ModelViewSet):
#     queryset = Salon.objects.all()
#     serializer_class = SalonSerializer

class SalonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()

    def get_queryset(self):
        salon_type = self.request.query_params.get('salon_type', None)
        if salon_type:
            return Salon.objects.filter(salon_type=salon_type)
        return super().get_queryset()
    

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class SalonServiceViewSet(viewsets.ModelViewSet):
    queryset = SalonService.objects.all()
    serializer_class = SalonServiceSerializer

class SalonServiceListView(View):
    def get(self, request, *args, **kwargs):
        salon_id = request.GET.get('salon', None)
        if salon_id:
            services = SalonService.objects.filter(salon_id=salon_id)
        else:
            services = SalonService.objects.all()
        
        serializer = SalonServiceSerializer(services, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'indent': 2})
    
class UserAppointmentView(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        contact = get_object_or_404(Contact, user=request.user)
        appointments = contact.appointments.all()
        serializer = UserAppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, safe=False)

        