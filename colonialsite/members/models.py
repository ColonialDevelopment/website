from __future__ import unicode_literals

from django.db import models
from django import forms
from django.contrib.auth.models import User

class Member(models.Model):
    YEAR_IN_SCHOOL_CHOICES = (
        ('Sophomore', 'Sophomore'),
        ('Junior', 'Junior'),
        ('Senior', 'Senior'),
    )

    officer_pos		= models.CharField(max_length = 30) # should I make choices?
    birthday	    = models.DateField()
    class_year	    = models.CharField(max_length = 10)
