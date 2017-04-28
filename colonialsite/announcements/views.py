# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, Http404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics, views, parsers
from .serializers import AnnouncementSerializer
from .models import Announcement, get_file_path
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

class AnnouncementListAll(LoginRequiredMixin, generics.ListAPIView):
	queryset = Announcement.objects.all()
	serializer_class = AnnouncementSerializer

class AnnouncementDetail(LoginRequiredMixin, generics.RetrieveAPIView):
	queryset = Announcement.objects.all()
	serializer_class = AnnouncementSerializer

class AnnouncementPost(LoginRequiredMixin, views.APIView):
	parser_classes = (parsers.JSONParser, parsers.FileUploadParser, )

	def post(self, request, filename, format=None):
		file_obj = request.data['file']
		file_path = get_file_path(filename)
		with open(file_path, 'wb+') as destination:
			for chunk in file_obj.chunks():
				destination.write(chunk)

		new_announcement = Announcement.objects.create(
			poster = request.user,
			title = request.data['title'],
			start_date = request.data['start_date'],
			end_date = request.data['end_date'],
			description = request.data['description'],
			attachment = open(file_path),
			#attachment = request.data['file']
		)
		new_announcement.save()
		return HttpResponse(status_code = 204)

	def put(self, request, filename, format=None):
		try:
			announcement = Announcement.objects.get(pk = request.data['pk'])
		except Announcement.DoesNotExist:
			raise Http404("No such announcement")

		file_obj = request.data['file']
		file_path = get_file_path(filename)
		with open(file_path, 'wb+') as destination:
			for chunk in file_obj.chunks():
				destination.write(chunk)

		announcement.title = request.data['file']
		announcement.start_date = request.data['start_date']
		announcement.end_date = request.data['end_date']
		announcement.description = request.data['description']
		# announcement.attachment = file_path
		announcements.attachment = open(file_path)
		announcement.save()
		return HttpResponse(status_code = 204)

@login_required
def index(request):
    title = "Staff Dashboard"
    template = 'announcements/index.html'


    context = {
            'title': title
            }

    return render(request, template, context)

