from rest_framework import serializers
from events.models import Event

class EventSerializer(serializers.ModelSerializer):
	rsvp_status=serializers.SerializerMethodField();

	class Meta:
		model = Event
		fields = ('pk', 'title', 'start_date', 'end_date', 'image', 'rsvp_status',
			'recurring', 'description', 'category', 'location', 'status', 'members')

	def get_rsvp_status(self, obj):
		user = self.context['request'].user.id
		rsvp = obj.members.all().values().filter(id=user)
		if rsvp:
			return True
		return False