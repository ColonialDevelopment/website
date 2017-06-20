from django.contrib.auth.models import User
from menus.models import Rating, Dish, MenuCategory, MEAL_CHOICES

from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.fields import CurrentUserDefault

class DishSerializer(serializers.ModelSerializer):
    your_rating_and_id = serializers.SerializerMethodField()

    class Meta:
        model = Dish
        fields = ('id', 'name', 'your_rating_and_id', 'num_ratings', 'menus', 'avg_rating', 'allergens',
                    'vegetarian', 'vegan', 'kosher_halal', 'dairy_free', 'soy_free', 'nut_free')

    def get_your_rating_and_id(self, obj):
        user = self.context['request'].user.id
        rating = obj.rating_set.all().filter(reviewingUser=user, dish=obj.id)
        if len(rating.all().values()) is 0:
            return [0.0, 0]
        else:
            return [rating[0].value, rating[0].id]

class MenuCategorySerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = ('id','dishes', 'date', 'category', 'meal', 'meal_permissions')
        validators = [
            UniqueTogetherValidator(
                queryset=MenuCategory.objects.all(),
                fields=('date', 'category', 'meal')
            )
        ]

    def get_dishes(self, obj):
        return (map(lambda x: DishSerializer(x).data, obj.dish_set.all().values()))

class RatingSerializer(serializers.ModelSerializer):
    dish_name = serializers.SerializerMethodField()
    reviewingUser = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Rating
        fields = ('id', 'value', 'dish', 'dish_name', 'reviewingUser')
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
