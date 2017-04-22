from django.contrib import admin
from .models import Reservation

class ReservationAdmin(admin.ModelAdmin):
    fields = ['requester', 'submit_date', 'room', 'start_date', 'end_date', 'description', 'approval']
    readonly_fields = ['requester', 'submit_date']
    list_display = ('room', 'requester', 'start_date', 'submit_date', 'approval',)
    list_filter = ['approval', 'room', 'submit_date',]
    #search_fields = ['requester'] search is buggy?


admin.site.register(Reservation, ReservationAdmin)
