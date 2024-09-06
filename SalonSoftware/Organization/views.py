from rest_framework import viewsets
from .models import Salon, Appointment, SalonService
from contact.models import Contact
from .serializers import (
    SalonSerializer,
    AppointmentSerializer,
    SalonServiceSerializer,
)
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from datetime import datetime, timedelta, time



class SalonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()

    def get_queryset(self):
        salon_type = self.request.query_params.get("salon_type", None)
        if salon_type:
            return Salon.objects.filter(salon_type=salon_type)
        return super().get_queryset()




class AppointmentViewSet(APIView):
    """
    View to list and create appointments.
    """

    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        contact = get_object_or_404(Contact, user=request.user)
        appointments = Appointment.objects.filter(customer=contact)
        serializer = AppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        service_id = data.get('service')
        salon_id = data.get('salon')

        if not service_id or not salon_id:
            return JsonResponse({'error': 'Service ID and Salon ID are required.'}, status=status.HTTP_400_BAD_REQUEST)

        contact = get_object_or_404(Contact, user=request.user)

        # Prepare data for the serializer
        serializer_data = {
            'appointment_date': data.get('appointment_date'),
            'time': data.get('time'),
            'status': data.get('status'),
            'customer': contact.id,  # Provide customer ID
            'service': service_id,  # Provide service ID
            'salon': salon_id,  # Provide salon ID
        }

        # Instantiate the serializer with the provided data
        serializer = AppointmentSerializer(data=serializer_data)

        # Validate and save the serialized data
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

        # Return errors if the serializer is not valid
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SalonServiceViewSet(viewsets.ModelViewSet):
    queryset = SalonService.objects.all()
    serializer_class = SalonServiceSerializer


class SalonServiceListView(APIView):
    def get(self, request, *args, **kwargs):
        salon_id = request.GET.get("salon", None)
        if salon_id:
            services = SalonService.objects.filter(salon_id=salon_id)
        else:
            services = SalonService.objects.all()

        serializer = SalonServiceSerializer(services, many=True)
        return JsonResponse(
            serializer.data, safe=False, json_dumps_params={"indent": 2}
        )



class AvailableTime(APIView):
    def get(self, request, *args, **kwargs):
        current_datetime = datetime.now()
        today_date = current_datetime.date()
        today_time = current_datetime.time()

        print(today_time)
        print(today_date)

        salon_id = request.query_params.get("salon", None)
        date = request.query_params.get("date", None)
        appointment_date = datetime.strptime(date, "%Y-%m-%d").date()
        salon = get_object_or_404(Salon, id=salon_id)
        opening_time = salon.opening_time
        closing_time = salon.closing_time
        appointments = Appointment.objects.filter(salon=salon, appointment_date=appointment_date)
        booked_times = [appointment.time for appointment in appointments]
        available_times = []

        if (today_date == appointment_date):
            current_time = time(today_time.hour+1)
            print(current_time)
        else:
            current_time = opening_time
        while current_time < closing_time:
            if current_time not in booked_times:
                available_times.append(current_time)
            current_time = (datetime.combine(datetime.min, current_time) + timedelta(hours=1)).time()
        return JsonResponse({"available_times": [t.strftime("%H:%M") for t in available_times]}, status=status.HTTP_200_OK)