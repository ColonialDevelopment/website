# Authentication views
# Author: DG Kim

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login, logout
from .forms import ColoRegistrationForm
from django.template.context_processors import csrf
from dashboard import views as dash_views
import datetime

# login view
def login_page(request):
    username = password = ''
    if request.user.is_authenticated():
        return redirect('dashboard:dashboard-index')
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # Redirect to a success page.
                context = {
                        'date': datetime.datetime.now(),
                }

                return redirect('dashboard:dashboard-index')
            else:
                # Return a 'disabled account' error message
                template = loader.get_template('coloauth/login.html')
                context = {'error_message': 'Account not activated'}
                return HttpResponse(template.render(context, request))
        else:
            # Return an 'invalid login' error message.
            template = loader.get_template('coloauth/login.html')
            context = {'error_message': 'Invalid Password'}
            return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('coloauth/login.html')
        context = {}
        return HttpResponse(template.render(context, request))

# logout view
def logout_page(request):
    logout(request)
    return HttpResponse('logged out')

# register view
def register(request):
    if request.POST:
        form = ColoRegistrationForm(request.POST)     # create form object
        if form.is_valid():
            form.save()
            return HttpResponse('registered')
        else:
            return HttpResponse('no')
    else:
        template = loader.get_template('coloauth/register.html')
        context = {}
        context.update(csrf(request))
        context['form'] = ColoRegistrationForm()
        return HttpResponse(template.render(context, request))
