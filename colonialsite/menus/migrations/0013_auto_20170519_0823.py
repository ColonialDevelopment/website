# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-19 12:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0012_auto_20170515_1510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menucategory',
            name='category',
            field=models.CharField(choices=[('On the Grill', 'On the Grill'), ('On the Chafer', 'On the Chafer'), ('Hot Line', 'Hot Line'), ('Soups', 'Soups'), ('Dessert', 'Dessert'), ('Drinks', 'Drinks'), ('Other', 'Other')], max_length=20),
        ),
    ]
