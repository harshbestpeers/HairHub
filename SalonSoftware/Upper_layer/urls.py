from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path("", UserHomePage, name="UserHomePage"),
    path("salon/", Salon.as_view(), name='salon'),
]
