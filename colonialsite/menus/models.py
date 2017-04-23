from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

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
    ('Soups', 'Soups'),
    ('Hot Line', 'Hot Line'),
    ('On the Grill', 'On the Grill'),
    ('On the Chafer', 'On the Chafer'),
    ('Dessert', 'Dessert'),
    )
# Create your models here.

class Menu(models.Model):
    date = models.DateField('meal date')
    meal = models.CharField(max_length=10, choices=MEAL_CHOICES)
    meal_permissions = models.CharField(max_length=10, choices=PERMISSION_CHOICES, default="ALL")

    def __str__(self):
        return '%s %s' % (self.date, self.meal)

class MenuCategory(models.Model):
    menu = models.ForeignKey(Menu, blank=False)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return '%s %s %s' % (self.menu.date, self.menu.meal, self.category)

class Dish(models.Model):
    menus = models.ManyToManyField(MenuCategory, blank=False)
    name = models.CharField(max_length=50)
    
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
                              validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])

def getMealList(date):
    if date.weekday() > 4:
        return ["Brunch", "Dinner"]
    else:
        return ["Breakfast 7:30AM-10:00AM", "Lunch 11:30AM-1:30PM", "Dinner 5:45PM-7:45PM"]
