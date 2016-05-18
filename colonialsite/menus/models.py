from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Menu(models.Model):
    MEAL_CHOICES = (
            ('Breakfast', 'Breakfast'),
            ('Lunch', 'Lunch'),
            ('Brunch', 'Brunch'),
            ('Dinner', 'Dinner'),
    )

    date = models.DateField('meal date')
    meal = models.CharField(max_length=10, choices=MEAL_CHOICES)


class Dish(models.Model):

    name = models.CharField(max_length=50)
    related_menus = models.ManyToManyField(Menu, blank=True)

class Rating(models.Model):

    associatedDish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    reviewingUsers = models.ManyToManyField(User, blank=True)
    value = models.FloatField()





