# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-13 02:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0010_merge'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='menucategory',
            options={'verbose_name_plural': 'Menu Categories'},
        ),
        migrations.AlterField(
            model_name='dish',
            name='menus',
            field=models.ManyToManyField(related_name='dishes', to='menus.MenuCategory'),
        ),
        migrations.AlterField(
            model_name='dish',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
