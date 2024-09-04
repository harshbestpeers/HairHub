from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'salons', SalonViewSet, basename='salon')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'salonservice', SalonServiceViewSet, basename='salonservice')


urlpatterns = [
    path('api/', include(router.urls)),  # This should create '/api/salons/' endpoint
    path('salonserviceslist/', SalonServiceListView.as_view(), name='salonservice-list'),
]