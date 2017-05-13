# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Announcement

# Register your models here.
class AnnouncementAdmin(admin.ModelAdmin):
	def contains_attachment(self, obj):
		if obj.attachment:
			return 'Yes'
		return 'No'
	contains_attachment.short_description = "Contains attachment?"

	list_display = ['title', 'poster', 'start_date', 'end_date', 'contains_attachment']
	list_filter = ['poster', 'start_date', 'end_date']
	search_fields = ['title', 'description']

admin.site.register(Announcement, AnnouncementAdmin)