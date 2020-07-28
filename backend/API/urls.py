from django.urls import path
from API import views

urlpatterns = [
    path('get-fares', views.getFares, name='getFares'),
    path('fare-details', views.getFareDetails, name='faresDetails'),
]