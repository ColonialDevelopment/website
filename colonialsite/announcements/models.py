# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible

from datetime import datetime

import uuid, os

def get_file_path(title, filename):
	""" Creates a file path with uuid to prevent collision."""

	ext = filename.split('.')[-1]
	filename = "%s-%s.%s" % (title, uuid.uuid4(), ext)
	return os.path.join('announcement_uploads/', filename)

# Create your models here.

@python_2_unicode_compatible
class Announcement(models.Model):
	"""
	An Announcement object which functions as a global announcement to members.
	"""

	poster 		= models.ForeignKey(User)
	title		= models.CharField(max_length = 30)
	start_date 	= models.DateTimeField(verbose_name = 'Announcement release')
	end_date 	= models.DateTimeField(verbose_name = 'Announcement expiration')
	description	= models.TextField()
	attachment	= models.FileField(upload_to=get_file_path, blank=True) 
	file_title  = models.CharField(max_length = 30, default="No file")

	def __str__(self):
		return self.title
