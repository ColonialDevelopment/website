# Room Reservation Views
# Author: Nicholas Yang '18 (nyang@)

import datetime

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.generic.dates import DayArchiveView, MonthArchiveView
from .models import ReservationForm, Reservation

def index(request):
    return render(request, 'reservations/index.html')

def view(request, reservation_id):
    reservation = get_object_or_404(Reservation, pk = reservation_id)
    return render(request, 'reservations/view.html', {'reservation': reservation})

def request(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            new_reservation = form
            new_reservation.instance.requestor = request.user
            new_reservation.instance.approval = 'Submitted'
            new_reservation.instance.submit_date = datetime.datetime.now()
            new_reservation.save()
            return HttpResponseRedirect('confirmation')
    else:
        form = ReservationForm()
    return render(request, "reservations/request.html", {'form': form, })

def confirmation(request):
    return render(request, 'reservations/confirmation.html')

class ReservationMonthView(MonthArchiveView):
    queryset = Reservation.objects.all()
    date_field = "start_date"
    make_object_list = True
    allow_future = True
    
class ReservationDayView(DayArchiveView):
    queryset = Reservation.objects.all()
    date_field = "start_date"
    make_object_list = True
    allow_future = True
