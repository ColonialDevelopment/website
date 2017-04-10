from __future__ import unicode_literals

from django.db import models
from django import forms
from django.contrib.auth.models import User

import uuid, os

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s-%s.%s" % (instance.title, uuid.uuid4(), ext)
    return os.path.join('event_uploads/', filename)

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

	CATEGORY_CHOICES = (
		('IMs', 'IMs'),
		('Friday Party', 'Friday Party'),
		('Semiformal', 'Semiformal'),
		('Study Break', 'Study Break'),
		('Sophomore Dinner', 'Sophomore Dinner'),
		('Language Table', 'Language Table'),
		('Other', 'Other'),
	)


	title		= models.CharField(max_length = 30)
	start_date	= models.DateTimeField('start date and time')
	end_date	= models.DateTimeField('end date and time')
	description	= models.TextField()
	location	= models.CharField(max_length = 20, choices = LOCATION_CHOICES, default='Colonial')
	status      = models.CharField(max_length = 10, choices = STATUS_CHOICES, default='Hidden')
	category	= models.CharField(max_length = 20, choices = CATEGORY_CHOICES, default='Other')
	members     = models.ManyToManyField(User, blank = True)
	recurring	= models.BooleanField(default=False)
	# image		= models.FilePathField(blank=True)
	image 		= models.FileField(upload_to=get_file_path, blank=True)

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
