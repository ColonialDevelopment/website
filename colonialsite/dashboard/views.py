from datetime import datetime

from django.shortcuts import render, redirect
from colonialsite.settings import LOGIN_URL
from members.models import Member

# Create views for the dashboard here.

# This is just a dummy version so that there is something to
# see when you hit the home page
def index(request):
    if request.user.is_authenticated():
    	try:
        	member = Member.objects.get(netid = request.user)
        	new_member = (member.birthday == None)
    	except Member.DoesNotExist:
    		new_member = False

        context = {
            'date': datetime.now(),
            'new_member': new_member,
        }
        return render(request, 'dashboard/index.html', context)
    else:
        return redirect(LOGIN_URL)

