import datetime

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate
from django.template.context_processors import csrf
import coloauth as accounts

# Create views for the dashboard here.

# This is just a dummy version so that there is something to
# see when you hit the home page
def index(request):
    if request.user.is_authenticated():

        context = {
                'date': datetime.datetime.now(),
        }
        return render(request, 'dashboard/index.html', context)
    else:
        return redirect('coloauth:login_page')

