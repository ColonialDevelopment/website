from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Event(models.Model):


    start_date = models.DateTimeField('start date/time')
    end_date = models.DateTimeField('end date/time')
    title = models.CharField(max_length=
