from django.http import JsonResponse
from django.shortcuts import render
from API import api
# Create your views here.

# class CategoryList(generics.ListCreateAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategoryListSerializer


def fares_list(request):
    fares = {'fares': api.fares}
    return JsonResponse(fares, status=200)