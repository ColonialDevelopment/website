from django.contrib import admin
from .models import Reservation

class ReservationAdmin(admin.ModelAdmin):
    fields = ['requester', 'submit_date', 'room', 'start_date', 'end_date', 'description', 'approval']
    list_display = ['room', 'requester', 'start_date', 'submit_date', 'approval',]
    list_filter = ['approval', 'room', 'submit_date',]
    search_fields = ['requester__username']

    def get_readonly_fields(self, request, obj=None):
        if obj: # editing an existing object
            return ['requester', 'submit_date']
        return []


admin.site.register(Reservation, ReservationAdmin)
