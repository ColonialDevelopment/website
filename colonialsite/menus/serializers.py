from django.contrib.auth.models import User
from menus.models import Rating, Menu, Dish, MEAL_CHOICES

from rest_framework import serializers

class DishSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Dish
        fields = ('id', 'name', 'rating', 'menus', 'rating')

    def get_rating(self, obj):
    	ratings = []
    	for x in obj.rating_set.all().values():
    		ratings.append(x.get('value'))
    	if ratings:
    		return reduce(lambda x, y: x + y, ratings) / len(ratings)
    	else:
    		return 0.0

class MenuSerializer(serializers.ModelSerializer):
    dishes = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ('date', 'meal', 'dishes', 'meal_permissions')

    def get_dishes(self, obj):
    	return (obj.dish_set.all().values())


class RatingSerializer(serializers.ModelSerializer):
	dish_name = serializers.SerializerMethodField()
	reviewingUser_name = serializers.SerializerMethodField()

	class Meta:
		model = Rating
		fields = ('value', 'dish', 'reviewingUser', 'dish_name', 'reviewingUser_name')

	def get_dish_name(self, obj):
		return obj.dish.name

	def get_reviewingUser_name(self, obj):
		return obj.reviewingUser.username