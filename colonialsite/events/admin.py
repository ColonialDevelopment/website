from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
	def attending_members_count(self, obj):
		return obj.members.count()
	attending_members_count.short_description = "Attending Members Count"

	fields = ['title', 'status', 'start_date', 'end_date', 'recurring',
			 'description', 'image', 'location', 'category', 'members',]
	readonly_fields = ['members',]
	list_display = ['title', 'start_date', 'status', 'category', 'attending_members_count']
	list_filter = ['start_date', 'status', 'recurring', 'location', 'category']
	search_fields = ['title']

admin.site.register(Event, EventAdmin)
