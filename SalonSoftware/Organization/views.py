from rest_framework import viewsets
from .models import Salon,Appointment,SalonService
from .serializers import SalonSerializer,AppointmentSerializer, SalonServiceSerializer
from django.contrib.auth.decorators import login_required
from django.views import View
from django.http import JsonResponse
from rest_framework import generics


# class SalonViewSet(viewsets.ModelViewSet):
#     queryset = Salon.objects.all()
#     serializer_class = SalonSerializer

class SalonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()

    def get_queryset(self):
        # Get the 'salon_type' parameter from the request
        salon_type = self.request.query_params.get('salon_type', None)
        print(salon_type)
        print(salon_type)
        print(salon_type)
        print(salon_type)
        
        # If 'salon_type' is provided, filter the queryset
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