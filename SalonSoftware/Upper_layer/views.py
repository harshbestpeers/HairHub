from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from Organization.models import Salon
from contact.models import Contact, Address
from django.shortcuts import get_object_or_404
from .forms import UserProfileForm, AddressForm
from django.contrib import messages


# Create your views here.


def UserHomePage(request):
    return render(request, "Upper_layer/userHomePage.html")


class SalonView(LoginRequiredMixin, View):
    def get(self, request):
        salons = Salon.objects.all()
        batch_size = 3
        batches = [salons[i:i + batch_size] for i in range(0, len(salons), batch_size)]
        print(salons[0].image)
        print(salons[0].image)
        print(salons[0].image)
        print(salons[0].image)

        contact = get_object_or_404(Contact, user=request.user)

        return render(
            request, "Upper_layer/salon.html", {"user": request.user, "type": type, 'salon_batches': batches, "contact":contact}
        )


class Profile(LoginRequiredMixin, View):
    def get(self, request):

        contact = get_object_or_404(Contact, user=request.user)
        return render(request, "Upper_layer/profile.html", {"contact":contact})
    
