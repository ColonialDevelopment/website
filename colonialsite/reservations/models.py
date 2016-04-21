# Room Reservation models
# Nicholas Yang '18 (nyang@)

from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User

# general reservation info
class Reservation(models.Model):
    ROOM_CHOICES = (
        ('EK', 'Elk Room'),
        ('DV', 'Del Vento Room'),
        ('LB', 'Library'),
        ('DH', 'Dining Hall'),
        ('TP', 'Taproom'),
        ('MV', 'Movie Room'),
    )

    STATUS_CHOICES = (
        ('A', 'Approved'),
        ('D', 'Denied'),
    )
    
    room        = models.CharField(max_length = 2, choices = ROOM_CHOICES)
    start_date  = models.DateTimeField('start date/time')
    end_date    = models.DateTimeField('end date/time')
    description = models.TextField()
    approved    = models.CharField(max_length = 1, choices = STATUS_CHOICES)
    requestor   = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.requestor.__str__() + ": " + self.room.__str__() + " @ " + self.start_date.ctime()

# a form for creating reservations
class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ['room', 'start_date', 'end_date', 'description',]
