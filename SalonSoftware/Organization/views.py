from rest_framework import viewsets
from .models import Salon
from .serializers import SalonSerializer

class SalonViewSet(viewsets.ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer

