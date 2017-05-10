# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Announcement

# Register your models here.
class AnnouncementAdmin(admin.ModelAdmin):
	list_display = ['title', 'poster', 'start_date', 'end_date']
	list_filter = ['start_date', 'end_date']

admin.site.register(Announcement, AnnouncementAdmin)