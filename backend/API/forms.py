from django import forms

class FaresForm(forms.Form):
    origin = forms.CharField(label='Departure Origin', max_length=3)
    departureDate = forms.DateTimeField(label='Departure Date')
    returnDate = forms.DateTimeField(label='Return Date')
    minFare = forms.FloatField(label='Minimum Fare')
    destinationFilter = forms.CharField(label='Destination Filter', max_length=13)


class FareDetailForm(forms.Form):
    origin = forms.CharField(label='Origin', max_length=3)
    destination = forms.CharField(label='Destination', max_length=3)
    departureDate = forms.DateTimeField(label='Departure Date', input_formats=['%Y-%m-%dT%H:%M:%S'])
    returnDate = forms.DateTimeField(label='Return Date', input_formats=['%Y-%m-%dT%H:%M:%S'])
    price = forms.FloatField(label='Minimum Fare')