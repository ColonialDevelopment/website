from django.contrib import admin
from .models import Reservation

class ReservationAdmin(admin.ModelAdmin):
    fields = ['requestor', 'submit_date', 'room', 'start_date', 'end_date', 'description', 'approval']
    list_display = ('room', 'requestor', 'start_date', 'submit_date', 'approval',)
    list_filter = ['approval', 'room', 'submit_date',]
    #search_fields = ['requestor'] search is buggy?
    

admin.site.register(Reservation, ReservationAdmin)
