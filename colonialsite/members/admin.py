
from datetime import timedelta
import operator

from django.contrib import admin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q

from .models import Member


class BirthdayFilter(admin.SimpleListFilter):
	"""Year-insensitive birthday filter"""
	# corner case: 2/29?

	title = _('birthday')
	parameter_name = 'date_filter'

	def lookups(self, request, model_admin):
		return (
			('today', _('Today')),
			('tomorrow', _('Tomorrow')),
			('week', _('Next 7 days')),
			('yesterday', _('Yesterday')),
			('last_week', _('Last 7 days')),
			('none', _('None Listed')),
		)

	def queryset(self, request, queryset):
		if self.value() == 'none':
			return queryset.filter(birthday = None)

		lowdate = timezone.localdate() #TZ aware
		hidate = timezone.localdate()

		if self.value() == 'today':
			return queryset.filter(create_query(lowdate, hidate))

		if self.value() == 'tomorrow':
			lowdate += timedelta(days=1)
			hidate += timedelta(days=1)
			return queryset.filter(create_query(lowdate, hidate))

		if self.value() == 'yesterday':
			lowdate -= timedelta(days=1)
			hidate -= timedelta(days=1)
			return queryset.filter(create_query(lowdate, hidate))

		if self.value() == 'week':
			hidate += timedelta(days=7)
			return queryset.filter(create_query(lowdate, hidate))

		if self.value() == 'last_week':
			lowdate -= timedelta(days=7)
			return queryset.filter(create_query(lowdate, hidate))

		# require no else so that full pass ("all") returns all

		

class MemberAdmin(admin.ModelAdmin):
	fields = ['name', 'netid', 'pref_name', 'officer_pos', 'birthday',
			 'class_year', 'major', 'dorm', 'room_num', 'email',
			 'hometown', 'bio',]
	readonly_fields = ['name', 'netid', 'birthday', 'class_year', 'major',
						'dorm', 'room_num', 'email', 'hometown',]
	list_display = ['name', 'netid', 'class_year', 'birthday',]
	search_fields = ['name', 'netid', 'pref_name', 'class_year', 'major', 'dorm', 'hometown']
	list_filter = ['class_year', BirthdayFilter,]



# http://stackoverflow.com/questions/6128921/queryset-of-people-with-a-birthday-in-the-next-x-days
def create_query(lowdate, hidate):
	"""Create a database query of all Members with birthday between lowdate and hidate."""
	d = lowdate

	# build month/day tuples
	monthdays = []
	while d <= hidate:
		monthdays.append((d.month, d.day))
		d += timedelta(days = 1)

	# transform into regex
	monthdays = (dict(zip(("birthday__month", "birthday__day"), t)) 
				 for t in monthdays)

	# combine into query
	query = reduce(operator.or_, (Q(**d) for d in monthdays))
	return query


admin.site.register(Member, MemberAdmin)
