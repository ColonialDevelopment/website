from django.conf.urls import url
from . import views


urlpatterns = [
        url(r'^create', views.menu_entry_page, name='menus_entry_page'),
        url(r'^$', views.index, name='menus_index'),
]
