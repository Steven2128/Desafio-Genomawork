#Django
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator



class Restaurant(models.Model):
    """Definición de modelo para Restaurante"""
    name = models.CharField("Nombre de restaurante", max_length=50, null=False, blank=False, unique=True)
    location = models.CharField("Ubicacion de restaurante", max_length=150, null=False, blank=False)
    kind_food = models.CharField("Tipo de comida", max_length=50, null=False, blank=False)
    rating = models.PositiveIntegerField("Calificación", validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
    visited = models.BooleanField("Restaurante visitado", null=False, blank=False, default=False)
    
    class Meta:
        """Definición de meta para Restaurante"""
        verbose_name = "Restaurante"
        verbose_name_plural = "Restaurantes"

    def __str__(self):
        return self.name