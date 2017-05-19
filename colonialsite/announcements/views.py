# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse, Http404
from django.shortcuts import render

from rest_framework import generics, views, parsers

from .serializers import AnnouncementSerializer
from .models import Announcement, get_file_path


class AnnouncementListAll(LoginRequiredMixin, generics.ListAPIView):
	"""Class-based view to return all announcements. Supports GET only."""
	queryset = Announcement.objects.all()
	serializer_class = AnnouncementSerializer

class AnnouncementDetail(LoginRequiredMixin, generics.RetrieveAPIView):
	"""Class-based view to return a single announcement. Supports GET only."""
	queryset = Announcement.objects.all()
	serializer_class = AnnouncementSerializer

class AnnouncementPost(LoginRequiredMixin, views.APIView):
	"""Class-based view allowing creation and editing of announcements.
	Supports POST and PUT only."""

	parser_classes = (parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser,)

	def post(self, request):

		new_announcement = Announcement.objects.create(
			poster = request.user,
			title = request.data['title'],
			start_date = request.data['start_date'],
			end_date = request.data['end_date'],
			description = request.data['description'],
			attachment = request.data['file'],
			file_title = request.data['file_title']
		)
		new_announcement.save()
		return HttpResponse(status=204)


	def put(self, request, filename, format=None):
		try:
			announcement = Announcement.objects.get(pk = request.data['pk'])
		except Announcement.DoesNotExist:
			raise Http404("No such announcement")

		file_obj = request.data['file']
		file_path = get_file_path(announcement, filename)
		with open(file_path, 'wb+') as destination:
			for chunk in file_obj.chunks():
				destination.write(chunk)

		announcement.title = request.data['title']
		announcement.start_date = request.data['start_date']
		announcement.end_date = request.data['end_date']
		announcement.description = request.data['description']
		announcement.file_title = file_path
		announcement.attachment = open(file_path)
		announcement.save()
		return HttpResponse(status=204)


@login_required(login_url = '/staff/login/')
def index(request):
	"""User-facing announcements index view."""

	if not request.user.has_perm('announcements.add_announcement'):
		raise PermissionDenied

	title = "Staff Dashboard"
	template = 'announcements/index.html'
	context = {
			'title': title
			}

	return render(request, template, context)

