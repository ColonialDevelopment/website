from __future__ import unicode_literals

from django.db import models
from django import forms
from django.contrib.auth.models import User

class Member(models.Model):

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

    name            = models.CharField(max_length = 50)
    netid           = models.CharField(max_length = 10)
    pref_name       = models.CharField(max_length = 20, blank=True, verbose_name = 'Preferred Name')
    officer_pos		= models.CharField(max_length = 30, choices = OFFICER_CHOICES, blank=True, verbose_name = 'Officer Position')
    birthday	    = models.DateField(blank=True, null=True)
    class_year	    = models.CharField(max_length = 10)
    major           = models.CharField(max_length = 50)
    dorm            = models.CharField(max_length = 30)
    room_num        = models.CharField(max_length = 10, verbose_name = "Room Number")
    email           = models.EmailField()
    hometown        = models.CharField(max_length = 50)
    bio             = models.TextField(blank=True)
