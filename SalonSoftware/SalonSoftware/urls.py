"""
URL configuration for SalonSoftware project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.urls import include
from django.contrib.auth import views as auth_views
from contact import views as contact_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("contact/", include("contact.urls")),  # create url for contact app
    path("Upper_layer/", include("Upper_layer.urls")),  # create url for Upper_layer app
    path('login/', contact_view.login_view, name='login'),
    path('logout/', contact_view.logout_view, name='logout'),
    path('signup/', contact_view.signup, name='signup'),
]
