from django.shortcuts import render
import datetime

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.decorators import login_required
from .models import CreateForm, Event

@login_required
def index(request):
    title = "Events Page"
    template = 'events/index.html'
    component = 'events.js'


    context = {
            'title': title,
            'component': component,
            }

    return render(request, template, context)

@login_required
def view(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    if event.status == 'Open':
        if request.user in event.members.all():
            return render(request, 'events/view_going.html', {'event': event, })
        else:
            return render(request, 'events/view_notgoing.html', {'event': event, })

    elif event.status == 'Closed':
        if request.user in event.members.all():
            return render(request, 'events/view_going_closed.html', {'event': event, })
        else:
            return render(request, 'events/view_notgoing_closed.html', {'event': event, })

    else:
        # Something here about officer permissions
        return HttpResponse("This is a hidden event.")



@login_required
def create(request):
    if request.method == 'POST':
        form = CreateForm(request.POST)
        if form.is_valid():
            new_event = form
            new_event.instance.status = 'Hidden'
            new_event.save()
            return HttpResponseRedirect('/events/view/' + new_event.instance.id.__str__())
    else:
        form = CreateForm()
    return render(request, "events/create.html", {'form': form})



@login_required
def rsvp(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    url = '/events/view/' + event.id.__str__()

#    if request.user in event.members.all():
#        string = "You are already signed up for this event."
#        return redirect(url, 'events/view_going.html', {'event': event, 'message': string})
#    else:
#        event.members.add(request.user)
#        string = "You are now signed up for this event."
#        return redirect(url, 'events/view_going.html', {'event': event, 'message': string})

    if request.user not in event.members.all():
        event.members.add(request.user)
    return HttpResponseRedirect(url)



@login_required
def cancel(request, event_id):
    try:
        event = Event.objects.get(pk = event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")

    url = '/events/view/' + event.id.__str__()

#    if request.user in event.members.all():
#        event.members.remove(request.user)
#        string = "You have cancelled your attendance for this event."
#        return redirect(url, 'events/view_notgoing.html', {'event': event, 'message': string})
#    else:
#        string = "You were not signed up for this event."
#        return redirect(url, 'events/view_notgoing.html', {'event': event, 'message': string})

    if request.user in event.members.all():
        event.members.remove(request.user)
    return HttpResponseRedirect(url)
