from django.shortcuts import render

# Create your views here.

@login_required
def index(request):
    return render(request, 'events/index.html', {})

@login_required
def list(request):

