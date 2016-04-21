# Author: Nicholas Yang '18 (nyang@)

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import ReservationForm, Reservation

def index(request):
    return HttpResponse("Reservations index")

def view(request, reservation_id):
    reservation = get_object_or_404(Reservation, pk = reservation_id)
    return render(request, 'reservations/view.html', {'reservation': reservation})

def request(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            new_reservation = form
            new_reservation.instance.requestor = request.user
            new_reservation.save()
            return HttpResponseRedirect('confirmation')
    else:
        form = ReservationForm()
    return render(request, "reservations/request.html", {'form': form, })

def confirmation(request):
    return render(request, 'reservations/confirmation.html')
