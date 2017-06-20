from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render

from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework import viewsets

from menus.models import MenuCategory, Dish, Rating
from menus.serializers import MenuCategorySerializer, DishSerializer, RatingSerializer

# Create your views here.

@login_required
def index(request):
    title = "Colonial Menus"
    template = 'menus/index.html'
    context = {
            'title': title
            }

    return render(request, template, context)

class DishViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    """ API endpoint that allows dishes to be viewed or edited """
    queryset = Dish.objects.all().order_by('name')
    serializer_class = DishSerializer

    @detail_route(methods=['delete'])
    def remove_dish_from_menu(self, request, pk=None):
        dish = self.get_object()
        remove_menu = request.data['menu']
        deleteSet = MenuCategory.objects.filter(id=remove_menu)
        for d in deleteSet:
            dish.menus.remove(d)
        return Response({'status':'removed from menu'})

def update_dish_rating(dish, new_rating, rating_pk):
    ratings = []
    # Get the dish related to this rating
    obj = Dish.objects.get(pk=dish)
    ratings_obj = obj.rating_set.all().values()

    for rating in ratings_obj:
        if rating.get('pk') == rating_pk:
            ratings.append(new_rating)
        else:
            ratings.append(rating.get('value'))
    
    f = reduce(lambda x, y: x + y, ratings) / len(ratings)
    value = str("%.1f" % round(f, 2))
    num_ratings = len(ratings)
    obj.avg_rating = value
    obj.num_ratings = num_ratings
    obj.save()

def update_all_dishes():
    for obj in Dish.objects.all():
        ratings = []
        # Get the dish related to this rating
        ratings_obj = obj.rating_set.all().values()

        for rating in ratings_obj:
            ratings.append(rating.get('value'))
        value = 0.0
        num_ratings = 0

        if len(ratings) > 0:
            f = reduce(lambda x, y: x + y, ratings) / len(ratings)
            value = str("%.1f" % round(f, 2))
            num_ratings = len(ratings)
        
        obj.avg_rating = value
        obj.num_ratings = num_ratings
        obj.save()

class RatingViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('value')
    serializer_class = RatingSerializer

    # on update or create of new rating, update average and number of ratings
    def perform_create(self, serializer):
        new_rating = serializer.save(reviewingUser=self.request.user)
        update_dish_rating(serializer.data['dish'], serializer.data['value'], serializer.data['id'])
    
    def perform_update(self, serializer):
        new_rating = serializer.save()
        print serializer.data
        update_dish_rating(serializer.data['dish'], serializer.data['value'], serializer.data['id'])

class MenuCategoryViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all().order_by('category')
    serializer_class = MenuCategorySerializer


