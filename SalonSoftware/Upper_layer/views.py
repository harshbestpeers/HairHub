from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.

def UserHomePage(request):
    return render(request, 'Upper_layer/userHomePage.html')


class SalonView(LoginRequiredMixin, View):
    def get(self, request, type):
        return render(request, 'Upper_layer/salon.html', {
        'user': request.user, 'type':type
    })

