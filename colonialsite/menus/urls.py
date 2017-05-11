from django.conf.urls import url
from . import views
from rest_framework import routers
from menus import views

urlpatterns = [
        url(r'^$', views.index, name='menus_index'),
]
