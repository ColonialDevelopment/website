from django.contrib import admin
from .models import Member

class MemberAdmin(admin.ModelAdmin):
	fields = ['name', 'netid', 'pref_name', 'officer_pos', 'birthday',
			 'class_year', 'major', 'dorm', 'room_num', 'email',
			 'hometown', 'bio',]
	readonly_fields = ['name', 'netid', 'birthday', 'class_year', 'major',
						'dorm', 'room_num', 'email', 'hometown',]
	list_display = ['name', 'netid', 'class_year',]
	search_fields = ['name', 'netid', 'pref_name', 'class_year', 'major', 'dorm', 'hometown']
	list_filter = ['class_year',]

admin.site.register(Member, MemberAdmin)
