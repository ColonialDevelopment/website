# Authentication views
# Author: DG Kim

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login

# login view
def login_page(request):
    username = password = ''
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
                return HttpResponse('disabled account')
        else:
            # Return an 'invalid login' error message.
            return HttpResponse('wrong login')
    else:
        template = loader.get_template('coloauth/login.html')
        context = {}
        return HttpResponse(template.render(context, request))