from django.shortcuts import render
import coloauth as accounts
from menus.models import Menu, Dish, Rating, getMealList
from menus.serializers import MenuSerializer, DishSerializer, RatingSerializer

from rest_framework import viewsets

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

def menu_entry_page(request):
    #if request.user.is_staff:
        context = {
                'date':datetime.datetime.now(),
                'meals':getMealList(datetime.datetime.now()),
                }
        return render(request, 'menus/create.html', context)
    #else:
    #    return redirect('dashboard:dashboard-index')

class MenuViewSet(viewsets.ModelViewSet):
    """

    API endpoint that allows menus to be viewed or edited
    """
    queryset = Menu.objects.all().order_by('date')
    serializer_class = MenuSerializer

class DishViewSet(viewsets.ModelViewSet):
    """

    API endpoint that allows dishes to be viewed or edited
    """
    queryset = Dish.objects.all().order_by('name')
    serializer_class = DishSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('value')
    serializer_class = RatingSerializer