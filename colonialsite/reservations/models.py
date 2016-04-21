# Room Reservation models
# Nicholas Yang '18 (nyang@)

from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User

# general reservation info
class Reservation(models.Model):
    ROOM_CHOICES = (
        ('Elk Room', 'Elk Room'),
        ('Del Vento', 'Del Vento Room'),
        ('Library', 'Library'),
        ('DHall', 'Dining Hall'),
        ('Taproom', 'Taproom'),
        ('Movie Room', 'Movie Room'),
    )

    STATUS_CHOICES = (
        ('Submitted', 'Submitted'),
        ('Approved', 'Approved'),
        ('Denied', 'Denied'),
    )
    
    room        = models.CharField(max_length = 10, choices = ROOM_CHOICES)
    start_date  = models.DateTimeField('start date/time')
    end_date    = models.DateTimeField('end date/time')
    description = models.TextField()
    approval    = models.CharField(max_length = 10, choices = STATUS_CHOICES)
    requestor   = models.ForeignKey(User, on_delete=models.CASCADE)
    submit_date = models.DateTimeField('creation date/time')
    
    def __str__(self):
        return self.requestor.__str__() + ": " + self.room.__str__() + " @ " + self.start_date.replace(tzinfo=None).ctime()
    

    
# a form for creating reservations
class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ['room', 'start_date', 'end_date', 'description',]
