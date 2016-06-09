from __future__ import unicode_literals


from django.db import models
from django.contrib.auth.models import User

MEAL_CHOICES = (
            ('Breakfast', 'Breakfast'),
            ('Lunch', 'Lunch'),
            ('Brunch', 'Brunch'),
            ('Dinner', 'Dinner'),
    )


# Create your models here.

class Dish(models.Model):

    name = models.CharField(max_length=50)
    reviewingUsers = models.ManyToManyField(User, blank=True)
    value = models.FloatField()

class Menu(models.Model):
    date = models.DateField('meal date')
    meal = models.CharField(max_length=10, choices=MEAL_CHOICES)
    dishes = models.ManyToManyField(Dish, blank=True)
