from datetime import datetime, time, timedelta

from django.contrib import admin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .models import Event

class CustomDateFilter(admin.SimpleListFilter):
	title = _('start date')
	parameter_name = 'start'

	def lookups(self, request, model_admin):
		return (
			('today', _('Today')),
			('tomorrow', _('Tomorrow')),
			('week', _('Next 7 days')),
			('month', _('Next 30 days')),
			('last_week', _('Last 7 days')),
		)

	def queryset(self, request, queryset):
		daystart = timezone.make_aware(datetime.combine(timezone.localdate(), time.min))
		dayend = timezone.make_aware(datetime.combine(timezone.localdate(), time.max))


		# using daystart and dayend because I can't directly filter using start_date.day
		if self.value() == 'today':
			return queryset.filter(start_date__gte=daystart,
									start_date__lte=dayend)

		if self.value() == 'tomorrow':
			daystart += timedelta(days=1)
			dayend += timedelta(days=1)
			return queryset.filter(start_date__gte=daystart,
									start_date__lte=dayend)

		if self.value() == 'week':
			dayend += timedelta(days=7)
			return queryset.filter(start_date__gte=daystart,
									start_date__lte=dayend)

		if self.value() == 'month':
			dayend += timedelta(days=30)
			return queryset.filter(start_date__gte=daystart,
									start_date__lte=dayend)

		if self.value() == 'last_week':
			daystart -= timedelta(days=7)
			return queryset.filter(start_date__gte=daystart,
									start_date__lte=dayend)

		# no else to allow fall through to return all


class EventAdmin(admin.ModelAdmin):
	def attending_members_count(self, obj):
		return obj.members.count()
	attending_members_count.short_description = "Attending Members Count"

	fields = ['title', 'status', 'start_date', 'end_date', 'recurring',
			 'description', 'image', 'location', 'category', 'members',]
	readonly_fields = ['members',]
	list_display = ['title', 'start_date', 'status', 'category', 'attending_members_count']
	list_filter = [CustomDateFilter, 'status', 'recurring', 'location', 'category']
	search_fields = ['title', 'description']

admin.site.register(Event, EventAdmin)
