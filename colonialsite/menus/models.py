from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.encoding import python_2_unicode_compatible

MEAL_CHOICES = (
    ('Breakfast', 'Breakfast'),
    ('Lunch', 'Lunch'),
    ('Brunch', 'Brunch'),
    ('Dinner', 'Dinner'),
)
PERMISSION_CHOICES = (
    ('NG', 'No Guests or Meal Exchanges'),
    ('NME', 'No Meal Exchanges'),
    ('SGO', 'Sophomore Guests Only'),
    ('NTO', 'No Boxes for Take-out'),
    ('ALL', 'Guests and Meal Exchanges Allowed')
)
CATEGORY_CHOICES = (
    ('On the Grill', 'On the Grill'),
    ('On the Chafer', 'On the Chafer'),
    ('Hot Line', 'Hot Line'),
    ('Soups', 'Soups'),
    ('Dessert', 'Dessert'),
    ('Drinks', 'Drinks'),
    ('Other', 'Other'),
)

@python_2_unicode_compatible
class MenuCategory(models.Model):
    class Meta:
        verbose_name_plural = 'Menu Categories'

    date = models.DateField('meal date', blank=True)
    meal = models.CharField(max_length=10, choices=MEAL_CHOICES)
    meal_permissions = models.CharField(max_length=10, choices=PERMISSION_CHOICES, default="ALL")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return '%s %s %s' % (self.date, self.meal, self.category)

@python_2_unicode_compatible
class Dish(models.Model):
    class Meta:
        verbose_name_plural = 'dishes'

    menus = models.ManyToManyField(MenuCategory, blank=False, related_name='dishes')
    name = models.CharField(max_length=200)
    avg_rating = models.FloatField(default=0.0,
                              validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])
    num_ratings = models.IntegerField(default=0)
    
    allergens = models.CharField(max_length=20, blank=True)
    vegetarian = models.BooleanField(default=False)
    kosher_halal = models.BooleanField(default=False)
    vegan = models.BooleanField(default=False)
    dairy_free = models.BooleanField(default=False)
    soy_free = models.BooleanField(default=False)
    nut_free = models.BooleanField(default=False)

    def __str__(self):
        return '%s' % (self.name)

class Rating(models.Model):

    class Meta:
        unique_together = (('dish', 'reviewingUser'),)

    dish = models.ForeignKey(Dish)
    reviewingUser = models.ForeignKey(User, blank=True)
    value = models.FloatField(default=0.0,
                              validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])