from rest_framework import serializers
from members.models import Member

class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = '__all__'
		read_only_fields = ('name', 'netid', 'birthday', 'class_year', 'major',
						'dorm', 'room_num', 'email', 'hometown',)

