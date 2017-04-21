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

# Create your models here.

class Menu(models.Model):
    date = models.DateField('meal date')
    meal = models.CharField(max_length=10, choices=MEAL_CHOICES)
    meal_permissions = models.CharField(max_length=10, choices=PERMISSION_CHOICES, default="ALL")

class Dish(models.Model):
    menus = models.ManyToManyField(Menu, blank=False)
    name = models.CharField(max_length=50)

class Rating(models.Model):
    dish = models.ForeignKey(Dish)
    reviewingUser = models.OneToOneField(User, blank=True)
    value = models.FloatField(default=0.0, 
                              validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])

def getMealList(date):
    if date.weekday() > 4:
        return ["Brunch", "Dinner"]
    else:
        return ["Breakfast 7:30AM-10:00AM", "Lunch 11:30AM-1:30PM", "Dinner 5:45PM-7:45PM"]
