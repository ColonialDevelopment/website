from django.shortcuts import render

from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from .models import Event
from events.serializers import EventSerializer
from rest_framework import generics

from django.contrib.auth.mixins import LoginRequiredMixin

@login_required
def index(request):
    title = "Colonial Events"
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
    queryset = Event.objects.exclude(status='Hidden')
    serializer_class = EventSerializer

    # def get_queryset(self):
    #     return Event.objects.exclude(status='Hidden')


# class EventDetail(LoginRequiredMixin, generics.RetrieveAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer