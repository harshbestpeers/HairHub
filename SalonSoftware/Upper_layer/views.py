from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.
def UserHomePage(request):
    return render(request, 'Upper_layer/userHomePage.html')
    
class Salon(View):
    def get(self, request):
        return render(request, 'Upper_layer/salon.html')
