# Author: Nicholas Yang '18 (nyang@)

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Reservations index")

def view(request, reservation_id):
    return HttpResponse("Reservation number %s." % reservation_id)

def request(request):
    return HttpResponse("Reservation request")
