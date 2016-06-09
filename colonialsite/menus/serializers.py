from django.contrib.auth.models import User
from models import Menu, Dish, MEAL_CHOICES

from rest_framework import serializers

class MenuSerializer(serializers.Serializer):
    class Meta:
        model = Menu
        fields = ('date', 'meal', 'dishes')


class DishSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dish
        fields = ('name', 'related_menus')
