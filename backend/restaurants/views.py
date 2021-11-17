#Rest_framework
from rest_framework import viewsets
#Django
from django.shortcuts import render
#Models
from .models import Restaurant
#serializers
from .serializers import RestaurantSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    """ViewSet Restaurant"""
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
