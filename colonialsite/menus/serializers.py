from django.contrib.auth.models import User
from models import Menu, Dish, MEAL_CHOICES

from rest_framework import serializers

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ('name', 'rating')

class MenuSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Menu
        fields = ('date', 'meal', 'dishes')

