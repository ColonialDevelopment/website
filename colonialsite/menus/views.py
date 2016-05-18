from django.shortcuts import render
import coloauth as accounts
import datetime
# Create your views here.

def index(request):
    if request.user.is_authenticated():
        context = {
                'date': datetime.datetime.now(),
                }
        return render(request, 'menus/index.html', context)
    else:
        return redirect('coloauth:login_page')

def create(request):
    if request.user.is_staff:
        context = {
                'date':datetime.datetime.now(),
                }
        return render(request, 'menus/create.html', context)
    else:
        return redirect('dashboard:dashboard-index')
