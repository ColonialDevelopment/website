# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-02-24 20:08
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('menus', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rating',
            name='associatedDish',
        ),
        migrations.RemoveField(
            model_name='rating',
            name='reviewingUsers',
        ),
        migrations.RemoveField(
            model_name='dish',
            name='related_menus',
        ),
        migrations.AddField(
            model_name='dish',
            name='rating',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='dish',
            name='reviewingUsers',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='menu',
            name='dishes',
            field=models.ManyToManyField(blank=True, to='menus.Dish'),
        ),
        migrations.DeleteModel(
            name='Rating',
        ),
    ]
