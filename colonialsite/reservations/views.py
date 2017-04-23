# Room Reservation Views
# Author: Nicholas Yang '18 (nyang@)

import datetime

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.urlresolvers import reverse
from django.views.generic.dates import DayArchiveView, MonthArchiveView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils import timezone

from rest_framework import generics
from .models import ReservationForm, Reservation
from .serializers import ReservationSerializer

@login_required
def index(request):
    return render(request, 'reservations/index.html', {'date': datetime.datetime.now()})

@login_required
def view(request, reservation_id):
    try:
        reservation = Reservation.objects.get(pk = reservation_id)
    except Reservation.DoesNotExist:
        raise Http404("Reservation does not exist.")

    if not request.user == reservation.requester:
        if not reservation.approval == "Approved":
            return HttpResponse("You may not view a non-approved reservation that is not yours.")

    return render(request, 'reservations/view.html', {'reservation': reservation})

@login_required
def request(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            new_reservation = form
            new_reservation.instance.requester = request.user
            new_reservation.instance.approval = 'Submitted'
            new_reservation.instance.submit_date = datetime.datetime.now()
            new_reservation.save()
            return HttpResponseRedirect('/reservations/confirmation/' + new_reservation.instance.id.__str__())
    else:
        form = ReservationForm()
    return render(request, "reservations/request.html", {'form': form, })



@login_required
def confirmation(request, reservation_id):
    reservation = get_object_or_404(Reservation, pk = reservation_id)
    return render(request, 'reservations/confirmation.html', {'reservation': reservation})



class ReservationMonthView(LoginRequiredMixin, MonthArchiveView):
    redirect_field_name = 'redirect_to'
    queryset = Reservation.objects.filter(approval = "Approved")
    date_field = "start_date"
    make_object_list = True
    allow_empty = True
    allow_future = True



class ReservationDayView(LoginRequiredMixin, DayArchiveView):
    redirect_field_name = 'redirect_to'
    queryset = Reservation.objects.filter(approval = "Approved")
    date_field = "start_date"
    make_object_list = True
    allow_empty = True
    allow_future = True

# ----------------------------------

class ReservationList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
