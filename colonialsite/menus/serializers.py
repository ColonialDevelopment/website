from django.contrib.auth.models import User
from models import Menu, Dish, Rating, MEAL_CHOICES

from rest_framework import serializers

class MenuSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    meal = serializers.ChoiceField(choices=MEAL_CHOICES)
   # dishes = serializers.ManyToManyField()
    def create(self, validated_data):
        return Menu.objects.create(**validated_data)
    def update(self, instance, validated_data):

        instance.meal = validated_data.get('meal', instance.meal)
        instance.dishes = validated_data.get('dishes', instance.dishes)



class DishSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dish
        fields = ('name', 'related_menus')

class RatingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rating
        fields = ('associatedDish', 'reviewingUsers', 'value')
