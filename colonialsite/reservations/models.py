# Room Reservation models
# Nicholas Yang '18 (nyang@)

from django.db import models
from django import forms
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class Reservation(models.Model):
    ROOM_CHOICES = (
        ('Elk Room', 'Elk Room'),
        ('Del Vento', 'Del Vento Room'),
        ('Library', 'Library'),
        ('DHall', 'Dining Hall'),
        ('Taproom', 'Taproom'),
        ('Movie Room', 'Movie Room'),
        ('Rec Room', 'Rec Room'),
        ('Cluster', 'Cluster'),
        ('Game Room', 'Game Room'),
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
    requester   = models.ForeignKey(User, on_delete=models.CASCADE)
    submit_date = models.DateTimeField('creation date/time')

    def __str__(self):
        return self.requester.__str__() + ": " + self.room.__str__() + " @ " + self.start_date.replace(tzinfo=None).ctime()


def time_overlap(start_1, end_1, start_2, end_2):
    if start_1 <= start_2 <= end_1 or start_1 <= end_2 <= end_1 or start_2 <= start_1 <= end_2 or start_2 <= end_1 <= end_2:
        return True
    return False


# a form for creating reservations
class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['room', 'start_date', 'end_date', 'description',]

    def clean(self):
        super(ReservationForm, self).clean()
        end = self.cleaned_data.get('end_date')
        start = self.cleaned_data.get('start_date')
        rm = self.cleaned_data.get('room')
        descr = self.cleaned_data.get('description')
        reservations = Reservation.objects.filter(room = rm, approval = "Approved")

        # check non-null
        # I shouldn't have to manually do this
        if rm == None or start == None or end == None or descr == None:
            raise forms.ValidationError("All fields are required")

        # check if start is in the future
        if start < timezone.now():
            raise forms.ValidationError("Cannot start reservation in the past.")

        # check if end is after start
        if end <= start:
            raise forms.ValidationError("End date/time must be after start date/time.")

        # check for conflicts
        for reservation in reservations:
            if time_overlap(start, end, reservation.start_date, reservation.end_date):
                raise forms.ValidationError("Conflicts with existing reservation.")




