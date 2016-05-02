from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    fields = ['title', 'status', 'start_date', 'end_date', 'description', 'location', 'members']
    list_display = ['title', 'start_date', 'status']
    list_filter = ['start_date', 'status']

admin.site.register(Event, EventAdmin)
