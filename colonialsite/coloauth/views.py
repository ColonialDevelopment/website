# Authentication views
# Author: DG Kim

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

# login view
def login_page(request):
    username = password = ''
    if request.user.is_authenticated():
        return HttpResponse('already logged in')
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
      
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # Redirect to a success page.
                return HttpResponse('logged in')
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
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect("/books/")
    else:
        form = UserCreationForm()
    return render(request, "coloauth/register.html", {
        'form': form,
    })