from django.shortcuts import render
import datetime

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.urlresolvers import reverse
from django.views.generic.dates import DayArchiveView, MonthArchiveView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils import timezone
from .models import CreateForm, Event

@login_required
def index(request):
    return render(request, 'events/index.html', {'date': datetime.datetime.now()})

@login_required
def view(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    return render(request, 'events/view.html', {'event': event})

@login_required
def create(create):
    if create.method == 'POST':
        form = EventForm(event.POST)
	if form.is_valid():
	    new_event = form
	    new_event.instance.submit_date = datetime.datetime.now()
	    new_event.save()
	    return HttpResponseRedirect('/events/view/' + new_event.instance.id.__str__())
	else:
	    form = CreateForm()
        return render(request, "events/create.html", {'form': form, })
