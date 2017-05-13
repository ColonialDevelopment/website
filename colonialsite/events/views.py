from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.shortcuts import render

from rest_framework import generics

from events.serializers import EventSerializer
from members.models import Member
from .models import Event


@login_required
def index(request):
    title = "Events Page"
    template = 'events/index.html'
    component = 'events.entry.js'

    context = {
            'title': title,
            'component': component,
            }

    return render(request, template, context)

@login_required
def rsvp(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    if event.status != 'Open':
        return HttpResponseForbidden("Closed or Hidden Event")

    if request.user not in event.members.all():
        event.members.add(request.user)
    return HttpResponse("User added to RSVPs")

@login_required
def cancel(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    if event.status != 'Open':
        return HttpResponseForbidden("Closed or Hidden Event")

    if request.user in event.members.all():
        event.members.remove(request.user)
    return HttpResponse("User removed from RSVPs")


class EventListAll(LoginRequiredMixin, generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(LoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

@login_required
def list_all(request, event_id):
    if not request.user.has_perm('events.change_event'):
        return HttpResponseForbidden()

    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    template = 'events/list.html'

    members = []
    users = event.members.all()
    for user in users:
        try:
            members.append(Member.objects.get(netid=user))
        except Member.DoesNotExist:
            pass

    context = {
        'title': event.title,
        'date': event.start_date.date(),
        'members': members,
    }

    return render(request, template, context)


@login_required
def list_sophs(request, event_id):
    if not request.user.has_perm('events.change_event'):
        return HttpResponseForbidden()

    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    template = 'events/list.html'

    members = []
    users = event.members.all()
    for user in users:
        try:
            m = Member.objects.get(netid=user)
            if m.class_year == settings.SOPHOMORE_YEAR:
                members.append(m)
        except Member.DoesNotExist:
            pass

    context = {
        'title': event.title,
        'date': event.start_date.date(),
        'members': members,
    }

    return render(request, template, context)