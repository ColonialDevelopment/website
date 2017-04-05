from rest_framework import serializers
from events.models import Event

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = ('pk', 'title', 'start_date', 'end_date', 'image',
			'recurring', 'description', 'location', 'status', 'members')
