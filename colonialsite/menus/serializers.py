from django.contrib.auth.models import User
from menus.models import Rating, Menu, Dish, MenuCategory, MEAL_CHOICES

from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.fields import CurrentUserDefault

class DishSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    num_ratings = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()
    class Meta:
        model = Dish
        fields = ('id', 'name', 'rating', 'num_ratings', 'menus', 'avg_rating', 'allergens',
                    'vegetarian', 'vegan', 'kosher_halal', 'dairy_free', 'soy_free', 'nut_free')

    def get_avg_rating(self, obj):
        ratings = []
        for x in obj.rating_set.all().values():
            ratings.append(x.get('value'))
        if ratings:
            return reduce(lambda x, y: x + y, ratings) / len(ratings)
        else:
            return 0.0

    def get_rating(self, obj):
        user = self.context['request'].user.id
        rating = obj.rating_set.all().filter(reviewingUser=user, dish=obj.id)
        if len(rating.all().values()) is 0:
            return 0.0
        else:
            return rating[0].value

    def get_num_ratings(self, obj):
        return len(obj.rating_set.all().values())

class MenuCategorySerializer(serializers.ModelSerializer):
    dishes = serializers.SerializerMethodField()

    class Meta:
        model = MenuCategory
        fields = ('dishes', 'menu', 'category')

    def get_dishes(self, obj):
        return (obj.dish_set.all().values())

class MenuSerializer(serializers.ModelSerializer):
    menu_categories = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ('menu_categories', 'date', 'meal')

    def get_menu_categories(self, obj):
        return (obj.menucategory_set.all().values())

class RatingSerializer(serializers.ModelSerializer):
    dish_name = serializers.SerializerMethodField()
    reviewingUser = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Rating
        fields = ('value', 'dish', 'dish_name', 'reviewingUser')
        validators = [
            UniqueTogetherValidator(
                queryset=Rating.objects.all(),
                fields=('reviewingUser', 'dish')
            )
        ]

    def get_dish_name(self, obj):
        return obj.dish.name

    def get_reviewingUser_name(self, obj):
        return obj.reviewingUser.username