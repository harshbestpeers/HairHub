from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'salons', SalonViewSet, basename='salon')

urlpatterns = [
    path('api/', include(router.urls)),  # This should create '/api/salons/' endpoint
]