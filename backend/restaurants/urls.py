#Rest_framework
from rest_framework.routers import DefaultRouter
#Django
from django.urls import path, include
#Views
from .views import RestaurantViewSet

router = DefaultRouter()
router.register('restaurants', RestaurantViewSet)

urlpatterns = [
    path('', include(router.urls))
]
