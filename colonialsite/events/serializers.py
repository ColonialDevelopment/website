from rest_framework import serializers
from events.models import Event

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = ('title', 'start_date', 'end_date', 'description', 'location', 'status', 'members')

	def create(self, validated_data):
		"""
		Create and return a new `Event` instance, given the validated data.
		"""
		return Event.objects.create(**validated_data)

	def update(self, instance, validated_data):
		"""
		Update and return an existing `Event` instance, given the validated data.
		"""
		instance.title = validated_data.get('title', instance.title)
		instance.start_date = validated_data.get('start_date', instance.start_date)
		instance.end_date = validated_data.get('end_date', instance.end_date)
		instance.description = validated_data.get('description', instance.description)
		instance.location = validated_data.get('location', instance.location)
		instance.status = validated_data.get('status', instance.status)
		instance.members = validated_data.get('members', instance.members)
		instance.save()
		return instance