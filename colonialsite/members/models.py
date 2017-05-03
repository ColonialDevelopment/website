from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django import forms
import re

'''
Member model that contains a member's name, netid, preferred name, officer
position (if applicable), birthday, class year, major, dorm/room number, email,
hometown, and bio
'''
@python_2_unicode_compatible
class Member(models.Model):

    OFFICER_CHOICES = (
        ('President', 'President'),
        ('Vice President', 'Vice President'),
        ('Social Chair', 'Social Chair'),
        ('Treasurer', 'Treasurer'),
        ('House Manager', 'House Manager'),
        ('Beverage Chair', 'Beverage Chair'),
        ('IM Chair', 'IM Chair'),
        ('Community Chair', 'Community Chair'),
        ('Publicity Chair', 'Publicity Chair'),
        ('Assistant Social Chair', 'Assistant Social Chair'),
        ('Sophomore Representative', 'Sophomore Representative'),
        ('Finance Chair', 'Finance Chair'),
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

    def __str__(self):
        return self.name

'''
Form to modify certain Member fields (notably bio, birthday, preferred name).
Will likely be replaced later by post methods in views.
'''
class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['name', 'netid', 'pref_name', 'officer_pos', 'birthday', 'class_year',
        'major', 'dorm', 'room_num', 'email', 'hometown', 'bio']

    name = forms.CharField(disabled=True, required=False)
    netid = forms.CharField(disabled=True, required=False)
    pref_name = forms.CharField(required=False, label="Preferred Name")
    officer_pos = forms.CharField(disabled=True, required=False, label = "Officer Position")
    birthday = forms.DateField(required=False)
    class_year = forms.CharField(disabled=True, required=False)
    major = forms.CharField(disabled=True, required=False)
    dorm = forms.CharField(disabled=True, required=False)
    room_num = forms.CharField(disabled=True, required=False, label = "Room Number")
    email = forms.CharField(disabled=True, required=False)
    hometown = forms.CharField(disabled=True, required=False)
    bio = forms.CharField(required=False, widget=forms.Textarea)

    def clean(self):
        super(MemberForm, self).clean()
        preferred = self.cleaned_data.get('pref_name')
        bday = self.cleaned_data.get('birthday')
        bio = self.cleaned_data.get('bio')
