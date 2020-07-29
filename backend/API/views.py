from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import api
from .forms import FaresForm, FareDetailForm
import json

sabreToken = api.getToken()


def cleanupSearchDict(searchDict):
    searchDict['departureDate'] = searchDict['departureDate'].strftime(
        '%Y-%m-%d')
    searchDict['returnDate'] = searchDict['returnDate'].strftime('%Y-%m-%d')
    searchDict['token'] = sabreToken
    return searchDict


@csrf_exempt
def getFares(request):
    if request.method == 'POST':
        data = json.load(request)
        form = FaresForm(data)
        if form.is_valid():
            searchDict = cleanupSearchDict(form.cleaned_data)
            faresJson = api.getFares(**searchDict)
            fares = api.filterFares(faresJson, searchDict['destinationFilter'])
            fares = {'fares': fares}
            return JsonResponse(fares, status=200)


@csrf_exempt
def getFareDetails(request):
    if request.method == 'POST':
        data = json.load(request)
        form = FareDetailForm(data)
        if form.is_valid():
            detailDict = cleanupSearchDict(form.cleaned_data)
            faresJson = api.getFareDetails(**detailDict)
            fares = api.filterDetails(faresJson, detailDict['price'])
            fares = {'details': fares}
            return JsonResponse(fares, status=200)
