from rest_framework import serializers
from reservations.models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('room', 'start_date', 'end_date', 'description', 'approval', 'requester', 'submit_date')
