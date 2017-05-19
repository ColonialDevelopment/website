from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible

import uuid, os

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s-%s.%s" % (instance.title, uuid.uuid4(), ext)
    return os.path.join('event_uploads/', filename)

@python_2_unicode_compatible
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
		('Lawn', 'Lawn'),
		('Colonial', 'Colonial'),
		('Other', 'Other (See Description)'),
	)

	CATEGORY_CHOICES = (
		('IMs', 'IMs'),
		('Friday Party', 'Friday Party'),
		('Semiformal', 'Semiformal'),
		('Study Break', 'Study Break'),
		('Sophomore Dinner', 'Sophomore Dinner'),
		('Language Table', 'Language Table'),
		("Members' Nights", "Members' Nights"),
		('Weekly Events', 'Weekly Events'),
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

	def __str__(self):
		return self.title
