from __future__ import unicode_literals

from django.db import models
from django import forms
from django.contrib.auth.models import User

class Event(models.Model):
	STATUS_CHOICES = (
		('Closed', 'Closed'),   # Viewable, closed to RSVPs
		('Open', 'Open'),       # Viewable, open to RSVPs
		('Hidden', 'Hidden'),   # Not viewable to members
	)

	LOCATION_CHOICES = (
		('Cluster', 'Cluster'),
		('Del Vento', 'Del Vento'),
		('Dining Area', 'Dining Area'),
		('Elk Room', 'Elk Room'),
		('Game Room', 'Game Room'),
		('Library', 'Library'),
		('Movie Room', 'Movie Room'),
		('Taproom', 'Taproom'),
		('Colonial', 'Colonial'),
	)

	title		= models.CharField(max_length = 30)
	start_date	= models.DateTimeField('start date and time')
	end_date	= models.DateTimeField('end date and time')
	description	= models.TextField()
	location	= models.CharField(max_length = 50, choices = LOCATION_CHOICES)
	status      = models.CharField(max_length = 10, choices = STATUS_CHOICES)
	members     = models.ManyToManyField(User, blank = True)
	recurring	= models.BooleanField(default=False)
	image		= models.FilePathField(blank=True)

class CreateForm(forms.ModelForm):
	class Meta:
		model = Event
		fields = ['title', 'start_date', 'end_date', 'description', 'location',]

	def clean(self):
		super(CreateForm, self).clean()
		tle = self.cleaned_data.get('title')
		end = self.cleaned_data.get('end_date')
		start = self.cleaned_data.get('start_date')
		descr = self.cleaned_data.get('description')
		loc = self.cleaned_data.get('location')

		# check non-null
		# I shouldn't have to manually do this
		if tle == None or start == None or end == None or descr == None or loc == None:
		    raise forms.ValidationError("All fields are required")

		# check if start is in the future
		if start < timezone.now():
		    raise forms.ValidationError("Cannot start reservation in the past.")

		# check if end is after start
		if end <= start:
		    raise forms.ValidationError("End date/time must be after start date/time.")
