# Authentication models
# Author: DG Kim

from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# necessary to standardize majors
class Major(models.Model):
    abbreviation    = models.CharField(max_length=3)
    name            = models.CharField(max_length=255)
    
# necessary to standardize officer positions
class Position(models.Model):
    title           = models.CharField(max_length=255)

# necessary for extra fields for directory
class Member(models.Model):
    user            = models.OneToOneField(User, on_delete=models.CASCADE) # link to Django user class
    birthday        = models.DateField() # member birthday
    hometown        = models.CharField(max_length=255) # member birthday
    year            = models.IntegerField() # member graduation year
    major           = models.ForeignKey(Major, on_delete=models.CASCADE)
    title           = models.ForeignKey(Position, on_delete=models.CASCADE)
    email           = models.EmailField() # member email
    bio             = models.TextField() # member biography
    approved        = models.BooleanField() # bool which shows whether or not the member has been approved by the admins
    current         = models.BooleanField() # bool which shows whether or not the member is a current member
    