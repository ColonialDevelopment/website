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

    OFFICER_CHOICES = (
        ('President', 'President'),
        ('Vice President', 'Vice President'),
        ('Social Chair', 'Social Chair'),
        ('Treasurer', 'Treasurer'),
        ('House Manager', 'House Manager'),
        ('Beverage Chair', 'IM Chair'),
        ('Community Chair', 'Publicity Chair'),
        ('Assistant Social Chair', 'Assistant Social Chair'),
        ('Sophomore Representative', 'Sophomore Representative'),
        ('Co-Finance Chair', 'Co-Finance Chair'),
        ('Colonial Development Lead', 'Colonial Development Lead')
    )

    officer_pos		= models.CharField(max_length = 30, choices = OFFICER_CHOICES)
    birthday	    = models.DateField()
    class_year	    = models.CharField(max_length = 10, choices = YEAR_IN_SCHOOL_CHOICES)
