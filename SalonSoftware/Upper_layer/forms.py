from django import forms
from contact.models import Contact,Address


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['username', 'email', 'phone_number', 'birthday']

class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['city', 'state']
