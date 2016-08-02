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

def getMealList(date):
    if date.weekday() > 4:
        return ["Brunch", "Dinner"]
    else:
        return ["Breakfast 7:30AM-10:00AM", "Lunch 11:30AM-1:30PM", "Dinner 5:45PM-7:45PM"]