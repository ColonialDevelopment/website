# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-26 18:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcements', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='announcement',
            old_name='data',
            new_name='description',
        ),
    ]
