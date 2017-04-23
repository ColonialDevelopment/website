from django.shortcuts import render
import coloauth as accounts
from menus.models import MenuCategory, Menu, Dish, Rating, getMealList
from menus.serializers import MenuCategorySerializer, MenuSerializer, DishSerializer, RatingSerializer
from django.contrib.auth.decorators import login_required

from rest_framework import viewsets

import datetime
# Create your views here.

@login_required
def index(request):
    title = "Menus"
    template = 'menus/index.html'
    component = 'menus.entry.js'


    context = {
            'title': title,
            'component': component,
            }

    return render(request, template, context)


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

class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all().order_by('category')
    serializer_class = MenuCategorySerializer