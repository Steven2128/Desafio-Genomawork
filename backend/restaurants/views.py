#Rest_framework
from rest_framework import viewsets
#Django
from django.shortcuts import render
#Models
from .models import Restaurant
#serializers
from .serializers import RestaurantSerializer
#Django filter
from django_filters.rest_framework import DjangoFilterBackend

class RestaurantViewSet(viewsets.ModelViewSet):
    """ViewSet Restaurant"""
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
    filterset_fields = ['id', 'name', 'location', 'kind_food', 'rating', 'visited']
