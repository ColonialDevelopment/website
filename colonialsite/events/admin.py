from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    fields = ['title', 'status', 'start_date', 'end_date', 'recurring',
    		 'description', 'image', 'location', 'category', 'members']
    list_display = ['title', 'start_date', 'status']
    list_filter = ['start_date', 'status', 'recurring', 'location', 'category']

admin.site.register(Event, EventAdmin)
