from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.http import HttpResponse
from .forms import SignUpForm


def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(
                "UserHomePage"
            )  # Redirect to a profile or another page after registration
    else:
        form = SignUpForm()
    return render(request, "contact/signup.html", {"form": form})


# login view
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("UserHomePage")  # Redirect to a profile or another page after login
    else:
        form = AuthenticationForm()
    return render(request, "contact/login.html", {"form": form})


# Logout view
@login_required
def logout_view(request):
    logout(request)
    return redirect("login")  # Redirect to login page or home page after logout



