# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-29 15:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('start_date', models.DateTimeField(verbose_name='start date and time')),
                ('end_date', models.DateTimeField(verbose_name='end date and time')),
                ('description', models.CharField(max_length=150)),
                ('location', models.CharField(max_length=50)),
            ],
        ),
    ]
