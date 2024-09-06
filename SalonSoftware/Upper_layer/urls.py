from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", UserHomePage, name="UserHomePage"),
    path("salon/<str:type>/", SalonView.as_view(), name="salon"),
]
