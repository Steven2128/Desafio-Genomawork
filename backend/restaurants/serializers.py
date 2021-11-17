#Rest_framework
#Django
from rest_framework import serializers
#Models
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    """Definición de serializer para Restaurante"""
    class Meta:
        """Definición de meta para Restaurante"""
        model = Restaurant
        fields = '__all__'