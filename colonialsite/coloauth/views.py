from django.conf import settings
from django.contrib.auth import authenticate, login, logout, REDIRECT_FIELD_NAME
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader

# login view
def login_page(request):

    next_page = request.GET.get(REDIRECT_FIELD_NAME)
    if not next_page:
        next_page = settings.STAFF_LOGIN_REDIRECT

    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)

                return redirect(next_page)
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
        if request.user.is_authenticated():
            return redirect(next_page)

        template = loader.get_template('coloauth/login.html')
        context = {}
        return HttpResponse(template.render(context, request))

# logout view
def logout_page(request):
    logout(request)
    return redirect(settings.STAFF_LOGIN_REDIRECT)

